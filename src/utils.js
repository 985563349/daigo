function forEach(collection, iteratee) {
  if (collection == null) {
    return;
  }

  if (typeof collection !== 'object') {
    collection = [collection];
  }

  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (iteratee(collection[i], i, collection) === false) {
        return;
      }
    }
  } else {
    const keys = Object.getOwnPropertyNames(collection);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (iteratee(collection[key], key, collection) === false) {
        return;
      }
    }
  }
}

function extend(object, source, thisArg) {
  forEach(source, (value, key) => {
    if (typeof value === 'function') {
      object[key] = value.bind(thisArg);
    } else {
      object[key] = value;
    }
  });
}

function merge() {
  const result = {};

  for (let i = 0; i < arguments.length; i++) {
    forEach(arguments[i], (value, key) => {
      if (typeof result[key] === 'object' && typeof value === 'object') {
        result[key] = merge(result[key], value);
      } else {
        result[key] = value;
      }
    });
  }

  return result;
}

export default {
  forEach,
  extend,
  merge,
};
