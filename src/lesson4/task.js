/*
  Write a function that creates custom set object. Function
  accepts single optional parameter (array) do define initial
  set content.
  Set should have add(), has(), delete(), forEach() methods
  and size property. Should not use es6 objects Set, WeakSet,
  but work in similar way. Set should preserve addition order
  in forEach() method.
  mySet = createSet(['a', 'b', 'c'])
*/
export function createSet(arr) {
  const obj = {
    objects: [],
    size: 0,
  };
  // Init
  if (arr) {
    arr.forEach(item => obj.objects.push(item));
    obj.size = arr.length;
  }

  obj[Symbol.iterator] = function* () {
    let counter = 0;
    while (counter < this.length) {
      yield this.objects[counter++];
    }
  };

  obj.forEach = function (func) {
    let counter = 0;
    while (counter < this.size) {
      func(this.objects[counter++]);
    }
  };

  obj.add = function (key, value) {
    const index = this.objects.indexOf(key);
    if (index === -1) {
      this.objects.push(key);
      this.size = this.objects.length;
    }
  };

  obj.delete = function (key) {
    const index = this.objects.indexOf(key);
    if (index !== -1) {
      this.objects.splice(index, 1);
      this.size = this.objects.length;
    }
  };

  return obj;
}

/*
  Write a function that creates custom map object. Function
  accepts single optional parameter (array) do define initial
  map content.
  Map should have set(), get(), has(), delete(), forEach() methods
  and size property. Should not use es6 objects Map, WeakMap,
  but work in similar way. Map should preserve addition order
  in forEach() method.
  myMap = createMap([['a', 1], ['b', 2], ['c', 3]])
*/
export function createMap(arr) {
  const obj = {
    keys: [],
    values: [],
    size: 0,
  };
  // Init
  if (arr) {
    arr.forEach(pair => { obj.keys.push(pair[0]); obj.values.push(pair[1]); });
    obj.size = arr.length;
  }

  obj[Symbol.iterator] = function* () {
    let counter = 0;
    while (counter < this.length) {
      yield [this.keys[counter], this.values[counter]];
      counter++;
    }
  };

  obj.forEach = function (func) {
    let counter = 0;
    while (counter < this.size) {
      func(this.keys[counter], this.values[counter]);
      counter++;
    }
  };

  obj.set = function (key, value) {
    const index = this.keys.indexOf(key);
    if (index !== -1) {
      this.values[index] = value;
    } else {
      this.keys.push(key);
      this.values.push(value);
      this.size = this.keys.length;
    }
  };

  obj.delete = function (key) {
    const index = this.keys.indexOf(key);
    if (index !== -1) {
      this.keys.splice(index, 1);
      this.values.splice(index, 1);
      this.size = this.keys.length;
    }
  };

  return obj;
}

export default {
  createSet,
  createMap,
};
