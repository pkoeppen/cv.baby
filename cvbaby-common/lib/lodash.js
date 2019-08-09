import * as _ from 'lodash';

// This is a lodash mixin.
// It recursively calls a callback on all values of
// whatever object it is given. If the value is another object,
// the map is called again. If the value is an array, the
// map is called on each value of the array. Otherwise,
// the value is returned as-is and is passed to the callback.
_.mixin({
  deep: function(map) {
    return function(obj, fn) {
      return map(_.mapValues(obj, recursiveMapHandler(map, fn)), fn);
    };
  }
});

function recursiveMapHandler(map, fn) {
  return function(value) {
    if (_.isPlainObject(value)) {
      return _.deep(map)(value, fn);
    } else if (_.isArray(value)) {
      return value.map(recursiveMapHandler(map, fn));
    } else {
      return value;
    }
  };
}

export { _ };
