/*
  Напишите функцию, которая параметрами принимает 2 числа и возвращает их сумму
*/
export function sum(a = 0, b = 0) {
  // return parseFloat(a) + parseFloat(b);
  if ((typeof a !== 'number') || (typeof b !== 'number')) {
    throw new TypeError('Arguments must be of number type');
  }
  return a + b;
}

/*
  Напишите функцию, которая возвращает сумму всех чисел, что передаются параметрами
*/
export function sumAll(...args) {
  if (args) {
    if (args.map(x => typeof x !== 'number').includes(true)) {
      throw new TypeError('Arguments must be of number type');
    }
  }

  return args.reduce((a, b) => a + b, 0);
}

/*
  Напишите функцию, которая возвращает число x в степень n
*/
export function pow(x, n = 1) {
  if ((typeof x !== 'number') || (typeof n !== 'number')) {
    throw new TypeError('Arguments must be of number type');
  }
  return x ** n;
}

/*
  Напишите функцию, которая возвращает рандомное целое число от from до to
*/
export function random(from, to) {
  /* eslint-disable no-param-reassign */
  if (to === undefined) {
    if (from === undefined) {
      throw new SyntaxError('Function expects 1 or 2 int arguments');
    } else {
      to = from;
      from = 1;
    }
  }
  /* eslint-enable no-param-reassign */

  if (!Number.isInteger(from) || !Number.isInteger(to)) {
    throw new TypeError('Arguments must be of int type');
  }

  return Math.floor(Math.random() * (to - from + 1)) + from; // eslint-disable-line no-mixed-operators
}

export default {
  sum,
  sumAll,
  pow,
  random,
};
