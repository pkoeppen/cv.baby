import { GraphQLError, Kind } from 'graphql';

/**
 * Validates GraphQL ASTs by query depth.
 */
export function checkQueryDepth(ast, maxDepth, callback, options = {}) {
  try {
    const { definitions } = ast;
    const fragments = getFragments(definitions);
    const queries = getQueriesAndMutations(definitions);
    const queryDepths = {};
    for (let name in queries) {
      queryDepths[name] = determineDepth(queries[name], fragments, 0, maxDepth, name, options);
    }
    return ast;
  } catch (error) {
    console.log(`[depthLimit] IP: ${ctx.ip_address}`);
    callback(null, {
      headers,
      statusCode: 400,
      body: 'Query depth limit exceeded.'
    });
  }
}

function getFragments(definitions) {
  return definitions.reduce((map, definition) => {
    if (definition.kind === Kind.FRAGMENT_DEFINITION) {
      map[definition.name.value] = definition;
    }
    return map;
  }, {});
}

function getQueriesAndMutations(definitions) {
  return definitions.reduce((map, definition) => {
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      map[definition.name ? definition.name.value : ''] = definition;
    }
    return map;
  }, {});
}

function determineDepth(node, fragments, depthSoFar, maxDepth, operationName, options) {
  if (depthSoFar > maxDepth) {
      throw new Error(`'${operationName}' exceeds maximum operation depth of ${maxDepth}`, [ node ]);
  }
  switch (node.kind) {
    case Kind.FIELD:
      // By default, ignore introspection fields that begin with double underscores.
      const shouldIgnore = /^__/.test(node.name.value) || seeIfIgnored(node, options.ignore);
      if (shouldIgnore || !node.selectionSet) {
        return 0;
      }
      return 1 + Math.max(...node.selectionSet.selections.map(selection =>
        determineDepth(selection, fragments, depthSoFar + 1, maxDepth, operationName, options)
      ));
    case Kind.FRAGMENT_SPREAD:
      return determineDepth(fragments[node.name.value], fragments, depthSoFar, maxDepth, operationName, options);
    case Kind.INLINE_FRAGMENT:
    case Kind.FRAGMENT_DEFINITION:
    case Kind.OPERATION_DEFINITION:
      return Math.max(...node.selectionSet.selections.map(selection =>
        determineDepth(selection, fragments, depthSoFar, maxDepth, operationName, options)
      ));
    default:
      throw new Error('Depth crawler cannot handle: ' + node.kind);
  }
}

function seeIfIgnored(node, ignore) {
  for (let rule of (ignore || [])) {
    const fieldName = node.name.value;
    switch (rule.constructor) {
      case Function:
        if (rule(fieldName)) {
          return true;
        }
        break;
      case String:
      case RegExp:
        if (fieldName.match(rule)) {
          return true;
        }
        break;
      default:
        throw new Error(`Invalid ignore option: ${rule}`);
    }
  }
  return false;
}
