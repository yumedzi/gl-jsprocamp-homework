/*
  Напишите функцию, которая принимает 1 аргумент и возварщает его тип
*/
function getDataType(variable) {
  return typeof variable;
}

/*
  Напишите функцию, которая принимает 1 аргумент и возвращает:
  'primitive' если тип данных относится к примивным
  'primitive-special' если тип данных специальный
  'object' - если простой обьект
  'object-array' - если массив
  'object-function' - если функция
*/
function getDataTypePseudoName(variable) {
  // primitives
  if ((variable === null) || (variable === undefined)) {
    return 'primitive-special';
  }

  if (['number', 'string', 'boolean', 'Symbol'].includes(typeof variable)) {
    return 'primitive';
  }

  const DataTypes = [
    ['object-array', Array],
    ['object-function', Function],
    ['object', Object],
  ];

  for (const group of DataTypes) { // eslint-disable-line no-restricted-syntax
    if (variable instanceof group[1]) {
      return group[0];
    }
  }

  throw new TypeError(`Type of ${variable} is not supported`);
}
/*
  Напишите функцию, которая принимает 2 аргумента,
  и возврвщает 1 если их значения и их типы равны,
  0 если равны только значения
  и -1 в другом случае
*/
function compareByType(a, b) {
  if (a == b) { // eslint-disable-line eqeqeq
    if (a === b) {
      return 1;
    }
    return 0;
  }
  return -1;
}

// Numbers

/*
  Напишите функцию, которая принимает 1 аргумент,
  и в случае если аргумент имеет числовой тип увеличивает его на 1
  и возврвщвет результат,
  в любом другом случае возврвщвет -1
*/
function increase(value) {
  if (typeof value === 'number') {
    return value + 1;
  }
  return -1;
}

/*
  Напишите функцию, которая принимает 1 аргумент(число),
  и в случае если аргумент не Infinity или NaN возвращает строку 'safe' иначе 'danger'
*/
function testForSafeNumber(value) {
  if (typeof value === 'number') {
    if (Number.isFinite(value) && !Number.isNaN(value)) {
      return 'safe';
    }
  }
  return 'danger';
}


// Strings

/*
  Напишите функцию, которая принимает 1 аргумент (строку),
  и возвращает массив из елементов строки разделенных по пробелу ' '
*/
function stringToArray(str) {
  return str.split(' ');
}


/*
  Напишите функцию, которая принимает 1 аргумент (строку),
  и возвращает часть этой строки до первой запятой
*/
function getStringPart(str) {
  return str.split(',')[0];
}

/*
  Напишите функцию, которая принимает 2 аргумента (строку и симовл),
  и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
  false в противоположном случае
*/
function isSingleSymbolMatch(str, symbol) {
  const count = (str.match(new RegExp(symbol, 'gi')) || []).length;
  if (count === 1) {
    return str.indexOf(symbol);
  }
  return false;
}

/*
  Напишите функцию, которая принимает 2 аргумента,
  массив в разделитель[опционально],
  и возвращает строку ввиде элементов массива c разделителями если разделитель задан
  или строку разделенную '-' если не задан
*/
function join(array, separator) {
  let sep = separator;
  if (!sep) {
    sep = '-';
  }
  return array.join(sep);
}


/*
  Напишите функцию, которая принимает 2 массива,
  и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
*/
function glue(arrA, arrB) {
  return [...arrA, ...arrB];
}


/*
  Напишите функцию, которая принимает 1 массив,
  и возвращает другой массив отсортированный от большего к меньшему
*/
function order(arr) {
  return arr.sort().reverse();
}


/*
  Напишите функцию, которая принимает 1 массив,
  и возвращает другой без чисел которые меньше 0
*/
function removeNegative(arr) {
  return arr.filter(x => x >= 0);
}

/*
  Напишите функцию, которая принимает 2 числовых массива,
  и возвращает новый массив, состоящий из элементов первого но без элементов
  которые присутствуют во втром
  [1,2,3], [1, 3] => [2]
*/
function without(arrA, arrB) {
  return arrA.filter(x => !arrB.includes(x));
}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение математической операции с двумя
  операндами (поддерживаются 4 базовых оператора + - / *).
  Функция вычисляет выражение и возвращает число либо NaN.
  '12/6' => 2
*/
function calcExpression(expression) {
  // Eval way: eval(expression); // eslint-disable-line no-eval
  const regex = /([+-]?\d+)\s*([+/*-])\s*([+-]?\d+)/g;
  const ops = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };
  const match = regex.exec(expression);
  if (match) {
    const [a, op, b] = [parseInt(match[1], 10), match[2], parseInt(match[3], 10)];
    return ops[op](a, b);
  }
  return NaN;
}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение логической операции с двумя
  операндами (поддерживаются 5 базовых операторов > < = >= <=).
  Функция вычисляет выражение и возвращает true / false,
  либо бросает exception в случае ошибки.
  '100>5' => true
*/
function calcComparison(expression) {
  // Eval way: return eval(`Boolean(${expression.replace(/\b(=)\b/, '==')})`); // eslint-disable-line no-eval
  const regex = /([+-]?\d+)\s*(=|>=|<=|>|<)\s*([+-]?\d+)/g;
  const ops = {
    '=': (x, y) => x === y,
    '>': (x, y) => x > y,
    '<': (x, y) => x < y,
    '>=': (x, y) => x >= y,
    '<=': (x, y) => x <= y,
  };
  const match = regex.exec(expression);
  if (match) {
    const [a, op, b] = [parseInt(match[1], 10), match[2], parseInt(match[3], 10)];
    return ops[op](a, b);
  }
  throw new Error('Logical expression is incorrect');
}

/*
  Напишите функцию, которая принимает обьект и строку,
  содержащую выражение доступа к свойствам обьекта.
  Функция возвращает значение запрашиваемого свойства либо
  бросает exception в случае ошибки.
  { a: { x: 2 }, b: 5 }, '.a.x' => 2
  { a: 1, b: 2 }, '.c' => exception
*/
function evalKey(obj, expression) {
  if (!expression.startsWith('.')) {
    throw new Error();
  }
  const parts = expression.split('.').filter(Boolean);
  let result = obj;

  for (const part of parts) { // eslint-disable-line no-restricted-syntax
    result = result[part];
  }

  if (result !== undefined) {
    return result;
  }
  throw new Error('Expression is wrong (most likely)');
}

export default {
  getDataType,
  getDataTypePseudoName,
  compareByType,
  increase,
  testForSafeNumber,
  stringToArray,
  getStringPart,
  isSingleSymbolMatch,
  join,
  glue,
  order,
  removeNegative,
  without,
  calcExpression,
  calcComparison,
  evalKey,
};
