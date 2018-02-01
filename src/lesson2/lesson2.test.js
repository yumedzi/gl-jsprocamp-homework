import lesson2 from '../src/lesson2';
import { exec } from 'child_process';

describe('sum function', () => {
  test('sum works good', () => {
      expect(lesson2.task.sum(1, 2)).toBe(3)
  });

  test('sum with no args', () => {
      expect(lesson2.task.sum()).toBe(0)
  });

  test('sum with one arg', () => {
      expect(lesson2.task.sum(100500)).toBe(100500)
  });

  test('sum works with float', () => {
    expect(lesson2.task.sum(23, 34.6)).toBe(57.6)
  });
  
  test('sum works only with numbers', () => {
    let throwing_func = () => {
      lesson2.task.sum("12", "13")
    }

    expect(throwing_func).toThrowError(TypeError)
    expect(throwing_func).toThrowError('Arguments must be of number type')
  });
});

describe('sumAll function', () => {
  test('sumAll no args', () => {
    expect(lesson2.task.sumAll()).toBe(0)
  });

  test('sumAll one arg', () => {
    expect(lesson2.task.sumAll(100500)).toBe(100500)
  });

  test('sumAll three args', () => {
    expect(lesson2.task.sumAll(1, 2, 3)).toBe(6)
  });

  test('sumAll works with floats', () => {
    expect(lesson2.task.sumAll(1.5, 4.7)).toBe(6.2)
  });

  test('sumAll works only with numbers', () => {
    let throwing_func = () => {
      lesson2.task.sumAll("12", "13")
    }

    expect(throwing_func).toThrowError(TypeError)
    expect(throwing_func).toThrowError('Arguments must be of number type')
  });

});


describe('pow function', () => {
  test('pow 2 ^ 2', () => {
    expect(lesson2.task.pow(2, 2)).toBe(4)
  });

  test('pow 2 ^ 3', () => {
    expect(lesson2.task.pow(2, 3)).toBe(8)
  });

  test('pow one argument', () => {
    expect(lesson2.task.pow(7)).toBe(7)
  });

  test('pow works only with numbers', () => {
    let throwing_func = () => {
      lesson2.task.pow(4, "3")
    }

    expect(throwing_func).toThrowError(TypeError)
    expect(throwing_func).toThrowError('Arguments must be of number type')  
  })

});

describe('random function', () => {
  test('random from 1 to 10', () => {
    const [from, to] = [1, 10]
    let result = lesson2.task.random(from, to)
    
    expect((result >= from) && (result <= to)).toBe(true)
  });
  
  test('random from 0 to 5 (one argument)', () => {
    const [from, to] = [0, 5]
    let result = lesson2.task.random(to)

    expect((result >= from) && (result <= to)).toBe(true)
  });

  
  test('random won\'t work without arguments', () => {
    let throwing_func = () => {
      let result = lesson2.task.random()
    }
    
    expect(throwing_func).toThrowError(SyntaxError)
    expect(throwing_func).toThrowError('Function expects 1 or 2 int arguments')
  });

  test('random works only with int arguments', () => {
    let throwing_func = () => {
      lesson2.task.random(2, 9.3)
    }

    expect(throwing_func).toThrowError(TypeError)
    expect(throwing_func).toThrowError('Arguments must be of int type')
  })

});
