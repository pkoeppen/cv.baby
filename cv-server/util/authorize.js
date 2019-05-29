export function authorize(fn) {
  return function(root, args, ctx) {
    if (!ctx.principalId) {
      throw new Error('![403] Unauthorized');
    }
    return fn(root, args, ctx);
  };
}
