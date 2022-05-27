### 实现 call 函数

```js
Function.prototype.wxcall = function (thisArg, ...arg) {
  var fn = this;
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fn = fn;
  return thisArg.fn(...arg);
};

console.log(foo.wxcall('abc', 10, 20));
console.log(foo.wxcall({}, 10, 20));
let result = foo.wxcall(null, 10, 20);
console.log(result);
```

### apply 函数实现

```js
Function.prototype.wxapply = function (thisArg, arrArg) {
  var fn = this;
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fn = fn;
  arrArg ? thisArg.fn(...arrArg) : thisArg.fn(); //是否有传入参数
  delete thisArg.fn;
};

function foo(a, b, c) {
  console.log(a + b + c);
}
foo.wxapply({}, [10, 20, 30]);
foo.wxapply({}, [10, 20, 30]);
```

### 实现 slice 函数

```js
Array.prototype.wxslice = function (start, end) {
  var arr = this;
  let newArr = [];
  for (let i = start; i < end; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};
console.log([1, 2, 3, 4, 5, 6, 7, 8].wxslice(0, 2));
```

### defineProperty

```js
const obj = {
  name: 'Tom',
  age: 18,
};

// Object.defineProperty(obj,'name',{
//     get:function(){
//         console.log('监听到name属性被访问到了');
//     },
//     set:function(){
//         console.log('监听到name属性被设置了');
//     }
// })

// console.log(obj.name); //监听到name属性被访问到了
// obj.name = 'Kobe' //监听到name属性被设置了

// 可以获取到对象所有的keys
Object.keys(obj).forEach(key => {
  let value = obj[key];
  console.log(key);
  /*  name
        age
     */
  Object.defineProperty(obj, key, {
    get: function () {
      console.log('监听到属性被访问了');
      return value;
    },
    set: function (newValue) {
      console.log('监听到name属性被设置了');
    },
  });
});
console.log(obj.name); //监听到name属性被访问到了
obj.name = 'Kobe'; //监听到name属性被设置了
```

### Proxy 代理

```js
const obj = {
  name: 'Tom',
  age: 18,
  height: 1.88,
};

// 创建一个proxy代理

// 参数一：对obj对象进行代理 参数二：捕获器(有13种捕获器)
const objProxy = new Proxy(obj, {
  // 获取值的捕获器(在获取值的时候自动回调该函数)
  get: function (target, key) {
    // target 是被代理的对象; key
    console.log(target); //{ name: 'Tom', age: 18, height: 1.88 }
    console.log(key); // name 获取了谁 key就是谁
    return target[key];
  },

  // 设置值的捕获器(在设置值的时候自动回调该函数)
  set: function (target, key, newValue) {
    target[key] = newValue;
  },
});
// 访问
// console.log(objProxy); // { name: 'Tom', age: 18, height: 1.88 }
// console.log(objProxy.name); // Tom
// console.log(objProxy.age); // 18
// 设置
// objProxy.name = "Kobe"; // 通过代理
console.log(objProxy.name); // Kobe
```

### 响应式原理

```js
class Depend {
  constructor() {
    this.reactiveFns = [];
  }
  // 收集依赖
  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn);
  }
  // 执行依赖
  notify() {
    // 遍历所有依赖并执行
    this.reactiveFns.forEach(fn => {
      fn();
    });
  }
}

const depend = new Depend();
const obj = {
  name: 'Tom',
  age: 18,
};
// 监听属性的变化(proxy,object.defineProperty)发生改变，执行depend.notify()
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // 将获取值返回出去
    return Reflect.get(target, key, receiver);
  },
  // 给代理对象设置值的时候会自动执行该方法
  set: function (target, key, newvalue, receiver) {
    Reflect.set(target, key, newvalue, receiver);
    // 设置值时通知depend执行依赖
    depend.notify();
  },
});
function foo() {
  console.log('执行代码');
}
depend.addDepend(foo); //收集依赖
objProxy.name = 'Lilei';
```

### 迭代器

```js
//迭代器需要满足以下条件
// 一、是一个对象
// 二、对象有一个next方法
// 三、该方法返回一个对象，且该对象有done和value属性
// const iterator = {
//   next: function () {
//     return { done: true, value: "" };
//   },
// };

// 数组
const arr = ['abc', 'cba', 'nba'];
// 使用迭代器遍历数组
// 创建一个迭代器对象来访问该数组
let index = 0;
const arrIterator = {
  next: function () {
    if (index < arr.length) {
      return { done: false, value: arr[index++] };
    } else {
      return { done: true, value: undefined };
    }
  },
};
console.log(index); //0
console.log(arrIterator.next()); //{ done: false, value: 'abc' }

console.log(index); //1
console.log(arrIterator.next()); //{ done: false, value: 'cba' }

console.log(index); //2
console.log(arrIterator.next()); //{ done: false, value: 'nba' }

console.log(index); //3
console.log(arrIterator.next()); //{ done: true, value: undefined }

console.log(index); //3

// 迭代器优化
```

### 迭代器生成函数

```js
function createArryIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { done: false, value: arr[index++] };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}

const names = ['Tom', 'Sily', 'Lusy'];
const nameIterator = createArryIterator(names);
console.log(nameIterator.next()); //{ done: false, value: 'Tom' }
console.log(nameIterator.next()); //{ done: false, value: 'Sily' }
console.log(nameIterator.next()); //{ done: false, value: 'Lusy' }

const nums = [1, 2, 3, 4, 5];
const numsIterator = createArryIterator(nums);
console.log(numsIterator.next()); //{ done: false, value: 1 }
console.log(numsIterator.next()); //{ done: false, value: 2 }
console.log(numsIterator.next()); //{ done: false, value: 3 }
console.log(numsIterator.next()); //{ done: false, value: 4 }

// 创建一个无限的迭代器
function createNumberIterator() {
  let index = 0;
  return {
    next: function () {
      return {
        done: false,
        value: index++,
      };
    },
  };
}
const numberInterator = createNumberIterator();
console.log(numberInterator.next()); //{ done: false, value: 0 }
console.log(numberInterator.next()); //{ done: false, value: 1 }
console.log(numberInterator.next()); //{ done: false, value: 2 }
console.log(numberInterator.next()); //{ done: false, value: 3 }
console.log(numberInterator.next()); //{ done: false, value: 4 }
console.log(numberInterator.next()); //{ done: false, value: 5 }     ......
```

### 迭代器对象

```js
// 该对象返回一个迭代器
const iterabalObj = {
  names: ['Tom', 'Sily', 'Lusy'],
  // 可迭代对象需要有 [Symbol.iterator] 这个属性，对应的是一个函数，该函数返回的是一个迭代器
  [Symbol.iterator]: function () {
    let index = 0;
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  },
};
console.log(iterabalObj[Symbol.iterator]); //[Function: [Symbol.iterator]]

// 调用该函数会为我们生成一个新的迭代器
const iterator = iterabalObj[Symbol.iterator]();
console.log(iterator.next()); //{ done: false, value: 'Tom' }
console.log(iterator.next()); //{ done: false, value: 'Sily' }
console.log(iterator.next()); //{ done: false, value: 'Lusy' }

// 新的迭代器
const iterator1 = iterabalObj[Symbol.iterator]();
console.log(iterator1.next()); //{ done: false, value: 'Tom' }
console.log(iterator1.next()); //{ done: false, value: 'Sily' }
console.log(iterator1.next()); //{ done: false, value: 'Lusy' }

for (const item of iterabalObj) {
  console.log(item);
  //   Tom
  //   Sily
  //   Lusy
}
```

### 生成器

```js
// 生成器函数(*)
function* foo() {
  console.log(1);
  yield;

  console.log(2);
  // yield 可以控制函数停止
  yield;

  console.log(3);
  yield;

  console.log(4);
}
// 调用生成器函数该函数不会直接执行，而是返回一个生成器对象
// console.log(foo()); // Object [Generator] {}
const Generator = foo();

// 开始执行第一段代码（yield之前的代码）执行next()
Generator.next(); //1

// 开始执行第二段代码
Generator.next(); //2

// 开始执行第三段代码
Generator.next(); //3

// 开始执行第四段代码
Generator.next(); //4
```

### 生成器函数执行流程

```js
function* foo() {
  console.log(1);
  yield '返回值'; //该段代码的返回值
  console.log(2);
  yield;
  console.log(3);
  yield;
  console.log(4);
}
const Generator = foo();
// 返回值是value ,done:false
console.log(Generator.next()); // { value: { name: 'tom', age: 18 }, done: false }
// Generator.next() // 1

// 生成器函数 function*
// yeild 关键字可以使代码在这里进行暂停
// 执行生成器函数会返回一个生成器对象
// 调用该生成器对象的next方法会依次执行yield之前的代码，
// 再次调用next()会继续执行下一个yield之前的代码
// 每个yield之前的代码若想返回某些值的话，可以将返回值写在yeild后面
```

### 生成器参数问题

```js
// 每段代码的参数问题
function* foo() {
  console.log(1);
  // 第二次执行next函数传入的参数会赋值给第一次yield的返回值
  const n = yield;

  // 第二段代码是执行第二次next执行的
  console.log(2 * n); // 20
  yield '返回值 :console.log(Generator.next()) // 返回值 ......';

  console.log(3);
  yield;

  console.log(4);
}

const Generator = foo();
Generator.next();
Generator.next(10);

// 执行两次 Generator.next()
// 第二次执行的时候有传入一个参数
// 该参数会作为第一个yield的返回值  const n = yield 使用 n 接受该返回值
```

### 宏任务&微任务

```js
// await 之后的代码属于微任务
// async function a() {
//     console.log('a')
//     await b()
//     console.log('a end')
// }

// async function b() {
//     console.log('b')
// }

// a()

// setTimeout(function () {
//     console.log('setTimeout')
// }, 0)

// new Promise(function (resolve, reject) {
//     console.log('promise')
//     resolve()
// }).then(function () {
//     console.log('then')
// })

// console.log('main end')

// //
setTimeout(function () {
  console.log('8');
}, 0);
async function async1() {
  console.log('1');
  const data = await async2();
  console.log('6');
  return data;
}
async function async2() {
  return new Promise(resolve => {
    console.log('2');
    resolve('async2的结果');
  }).then(data => {
    console.log('4');
    return data;
  });
}
async1().then(data => {
  console.log('7');
  console.log(data);
});
new Promise(function (resolve) {
  console.log('3');
  resolve();
}).then(function () {
  console.log('5');
});

//

console.log('script start');

async function async1() {
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
}
async1();

setTimeout(function () {
  console.log('setTimeout');
}, 0);

new Promise(resolve => {
  console.log('Promise');
  resolve();
})
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');

//

// console.log('script start')

// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
//     return Promise.resolve().then(()=>{
//         console.log('async2 end1')
//     })
// }
// async1()

// setTimeout(function() {
//     console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//     console.log('Promise')
//     resolve()
// })
// .then(function() {
//     console.log('promise1')
// })
// .then(function() {
//     console.log('promise2')
// })

// console.log('script end')

// async function async1(){
//   await async2()
//   console.log('async1 end')
// }
// async function async2(){}
// async1();
// new Promise(function(resolve){
//   resolve();
// }).then(function(){
//   console.log('promise2')
// }).then(function() {
//   console.log('promise3')
// }).then(function() {
//   console.log('promise4')
// })
```

### 防抖

```js
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 第一次是否直接执行
function debounce(fn, delay, isImmediately = true) {
  let timer = null;
  let Immediately = isImmediately;
  return (...args) => {
    if (timer) clearTimeout(timer);
    Immediately
      ? fn.apply(this, args)
      : (timer = setTimeout(() => fn.apply(this, args), delay));
    Immediately = !isImmediately;
  };
}
```

### 节流

```js
function throttle(fn, delay) {
  let pre = 0;
  return (...args) => {
    let now = new Date();
    if (now - pre > delay) {
      fn.apply(this, args);
    }
    pre = now;
  };
}
```

### 深拷贝

```js
function isObject(value) {
  const valueType = typeof value;
  return (value !== null && valueType === 'object') || valueType === 'function';
}

function deepClone(originValue) {
  // 判断是否是symbol类型，创建一个新的symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description);
  }
  if (typeof originValue === 'function') {
    // 判断是否是函数直接返回
    return originValue;
  }
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }
  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }
  //判断传入的origin是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue;
  }
  //判断传入的对象是数组还是对象
  const newObject = Array.isArray(originValue) ? [] : {};
  //遍历原始对象并将原始对象的属性值克隆到新对象中
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key]); //递归调用
  }
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const skey of symbolKeys) {
    newObject[skey] = deepClone(originValue[skey]);
  }
  return newObject;
}
const obj1 = {
  name: 'Tom',
  fridends: {
    one: {
      name: 'sily',
    },
    tow: {
      name: 'kobe',
    },
  },
};
console.log(deepClone(obj1));
```

### 事件总线

```js
class EventBus {
  constructor() {
    this.eventBus = {};
  }

  on(eventName, eventCallBack, thisArg) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    handlers.push({
      eventCallBack,
      thisArg,
    });
  }
  off() {}
  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach(handler => {
      handler.eventCallBack.apply(handler.thisArg, payload);
    });
  }
}
const eventBus = new EventBus();

// mian.js
eventBus.on(
  'a',
  function (payload) {
    console.log(payload);
  },
  this
);
// utill.js
eventBus.emit('a', { name: 'Tom' });
```
