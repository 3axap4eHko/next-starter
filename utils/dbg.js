export function log(target, name, descriptor) {

  const _value = descriptor.value;
  const targetName = typeof target === 'function' ? target.name : target.constructor.name;
  const reference = `${targetName}:${name}`;
  descriptor.value = function (...args) {
    console.log(reference);
    return _value.apply(this, args);
  };
  return descriptor;
}

export function dbg(value, message) {

  console.log('========================================================');
  message && console.log(message);
  console.log(value);
  console.log(new Error().stack.split('\n'));
  console.log('========================================================');
}
