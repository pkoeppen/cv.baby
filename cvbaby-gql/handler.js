import { graphql, parse } from 'graphql';
import { checkQueryDepth } from './util';
import schema from './schema';

export const handlerPublic = generateHandler(false);
export const handlerPrivate = generateHandler(true);

function generateHandler(authenticated = false) {
  const HEADERS = {
    'Access-Control-Allow-Origin': '*'
  };
  const ERROR_REGEX = /(?:\[)([0-9]{3})(?:\]\s)(.*)/g;
  const ErrorMessages = {
    UNKNOWN: 'An unknown error occurred.'
  };
  const StatusCodes = {
    OK: 200,
    UNAUTHORIZED: 400,
    INTERNAL_ERROR: 500
  };

  return function(event, context, callback) {
    const { query, vars } = JSON.parse(event.body);
    const ctx = {
      ip_address: event.requestContext.identity.sourceIp
    };

    if (authenticated) {
      const { principalId } = event.requestContext.authorizer;
      ctx.userID = principalId;
    }

    // Disallow query depth over ten levels.
    try {
      checkQueryDepth(parse(query), 10);
    } catch (error) {
      console.log(`[depthLimit] IP: ${ctx.ip_address}`);
      return callback(null, {
        headers,
        statusCode: 400,
        body: 'Query depth limit exceeded.'
      });
    }

    // Execute the query.
    graphql(schema, query, null, ctx, vars)
      .then(({ data, errors }) => {
        if (errors) {
          const error = errors[0];

          if (error.message.startsWith('!')) {
            /* eslint-disable-next-line no-unused-vars */
            const [match, statusCode, message] = ERROR_REGEX.exec(
              error.message
            );

            return callback(null, {
              headers: HEADERS,
              statusCode,
              body: message
            });
          } else {
            console.error(
              `[handler:${authenticated ? 'private' : 'public'}] Error: ${
                error.message
              }`
            );
            return callback(null, {
              headers: HEADERS,
              statusCode: StatusCodes.INTERNAL_ERROR,
              body: ErrorMessages.UNKNOWN
            });
          }
        } else {
          return callback(null, {
            headers: HEADERS,
            statusCode: StatusCodes.OK,
            body: JSON.stringify(data)
          });
        }
      })
      .catch(error => {
        console.error(
          `[handler:${authenticated ? 'private' : 'public'}] GQL Error: ${
            error.message
          }`
        );
        return callback(null, {
          headers: HEADERS,
          statusCode: StatusCodes.INTERNAL_ERROR,
          body: ErrorMessages.UNKNOWN
        });
      });
  };
}
