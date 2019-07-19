import { graphql, parse } from 'graphql';
import { checkQueryDepth } from './util';
import schema from './schema';

// const CVBABY_HOST_CLIENT = `https://${process.env.CVBABY_HOST_CLIENT}`;

export const handlerPublic = generateHandler(false);
export const handlerPrivate = generateHandler(true);

function generateHandler(authenticated = false) {
  const HEADERS = {
    'Access-Control-Allow-Origin': '*', // TODO: Change this
    'Access-Control-Allow-Credentials': true
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
    let query, vars;
    try {
      ({ query, vars } = JSON.parse(event.body));
    } catch (error) {
      console.error(error);
      return callback(null, {
        headers: HEADERS,
        statusCode: 400,
        body: 'Malformed JSON'
      });
    }

    const ctx = {
      ipAddress: event.requestContext.identity.sourceIp
    };

    if (authenticated) {
      ctx.userID = event.requestContext.authorizer.principalId;
      ctx.username = event.requestContext.authorizer.username;
    }

    // Disallow query depth over ten levels.
    try {
      checkQueryDepth(parse(query), 10);
    } catch (error) {
      console.error(error);
      console.log(`[depthLimit] IP: ${ctx.ipAddress}`); // TODO: Make this more accurate
      return callback(null, {
        headers: HEADERS,
        statusCode: 400,
        body: 'Query depth limit exceeded'
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
              }\n${error.stack}`
            );
            return callback(null, {
              headers: HEADERS,
              statusCode: StatusCodes.INTERNAL_ERROR,
              body: ErrorMessages.UNKNOWN
            });
          }
        } else {
          const body = JSON.stringify(data);
          return callback(null, {
            headers: HEADERS,
            statusCode: StatusCodes.OK,
            body
          });
        }
      })
      .catch(error => {
        console.error(
          `[handler:${authenticated ? 'private' : 'public'}] GQL Error: ${
            error.message
          }\n${error.stack}`
        );
        return callback(null, {
          headers: HEADERS,
          statusCode: StatusCodes.INTERNAL_ERROR,
          body: ErrorMessages.UNKNOWN
        });
      });
  };
}
