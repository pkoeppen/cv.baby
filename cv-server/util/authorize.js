export function authorize(fn) {
  return function(root, args, ctx) {
    if (!ctx.userID) {
      throw new Error('![403] Unauthorized');
    }
    return fn(root, args, ctx);
  };
}
