import { graphql, parse } from 'graphql';
import { checkQueryDepth } from './util';
import schema from './schema';


// TODO: Create Lambda to auto-confirm cognito users


export const handlerPublic = generateHandler(false);
export const handlerPrivate = generateHandler(true);


function generateHandler(authenticated=false) {

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

  return function (event, context, callback) {
    const { query, vars } = JSON.parse(event.body);
    const ctx = {
      ip_address: event.requestContext.identity.sourceIp
    };

    if (authenticated) {
      const { principalId } = event.requestContext.authorizer;
      ctx.principalId = principalId;
    }

    // Disallow query depth over ten levels.
    checkQueryDepth(parse(query), 10, callback);

    // Execute the query.
    graphql(schema, query, null, ctx, vars)
    .then(({ data, errors }) => {

      if (errors) {
        const error = errors[0];

        if (error.message.startsWith('!')) {
          const [
            match,
            statusCode,
            message
          ] = ERROR_REGEX.exec(error.message);

          return callback(null, {
            headers: HEADERS,
            statusCode,
            body: message
          });

        } else {
          console.error(`[handler:${authenticated ? 'private' : 'public'}] Error: ${error.message}`);
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
      console.error(`[handler:${authenticated ? 'private' : 'public'}] Error: ${error.message}`);
      return callback(null, {
        headers: HEADERS,
        statusCode: StatusCodes.INTERNAL_ERROR,
        body: ErrorMessages.UNKNOWN
      });
    });
  }
}
