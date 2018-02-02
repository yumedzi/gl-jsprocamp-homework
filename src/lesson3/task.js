/*
  Write a function, that has 2 required parameters, and any amount of optional parameters.
  Function should return a number - amount of optional parameters that were passed into function.
  Hint: you are allowed to modify both function definition and function body.
*/
export function countOptional(x, y, ...args) {
  return args.length;
}

/*
  Write your implementation of native Function.prototype.bind method
*/
export function bindContext(fn, context, ...args) {
  return () => fn.apply(context, args);
}


/*
  Write function that accepts 1 parameter - object. It should add to this object a log interface so as:
  const named = {name: 'Allen'}
  addLogCapability(named);
  named.log() // Log message #5: my name is Allen

  const unnamed = {msg: 'some text'}
  addLogCapability(unnamed);
  unnamed.log() // Log message #8: I dont have name
  unnamed.log() // Log message #9: I dont have name
  unnamed.log() // Log message #10: I dont have name

  Take to account, that you should track log call index starting from 1
*/
export function addLogCapability(object) {
  let counter = 1;
  object.log = function () { // eslint-disable-line func-names
    const content = this.name ? `my name is ${this.name}` : 'I dont have name';
    return `Log message #${counter++}: ${content}`; // eslint-disable-line no-plusplus
  };
}

/*
  Write a function that creates custom topic logger:
  myLogger = logger('My Topic')
  myLogger('first message'); //=> My Topic: first message
*/
export function logger(topic) {
  return function (msg) { // eslint-disable-line func-names
    return `${topic}: ${msg}`;
  };
}

/*
  Implement left to right compose function
*/
export function compose(...functions) {
  return (...args) => functions.reduce((value, func) => func(value), ...args);
}

/*
  Implement function that can turn function into partial application
  function sum(a, b) {
    return a+b;
  }

  const partialSum = partial(sum);
  const sumWith4 = partialSum(4);
  sumWith4(5) // 9
*/
export function partial(fn) {
  return (...args) => (...finalArgs) => fn(...args, ...finalArgs);
}

export default {
  countOptional,
  bindContext,
  addLogCapability,
  logger,
  compose,
  partial,
};
