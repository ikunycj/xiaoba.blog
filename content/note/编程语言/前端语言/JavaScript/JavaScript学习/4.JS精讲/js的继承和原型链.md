# 如何实现继承
在 JavaScript 中，可以通过多种方式实现继承。以下是一些常用的继承方式及其代码示例：

---

## 1. 原型链继承

### 原理
通过将子类的 `prototype` 指向父类的实例，从而实现继承。
### 代码
```javascript
// 父类构造函数
function Parent() {
  this.name = "Parent";
  this.age = 50;
}

Parent.prototype.sayHello = function () {
  console.log(`Hello, I am ${this.name}`);
};

// 子类构造函数
function Child() {
  this.name = "Child";
}

// 原型链继承
Child.prototype = new Parent();

const child = new Child();
child.sayHello(); // 输出: Hello, I am Child
console.log(child.age); // 输出: 50
```

### **缺点**
- 子类无法向父类传参。
- 子类共享父类实例的引用属性（例如数组或对象），容易导致问题。

---

## 2. 借用构造函数继承（经典继承）

### 原理
在子类构造函数中通过 `call` 或 `apply` 调用父类构造函数，实现属性的继承。
### 代码

```javascript
// 父类构造函数
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

// 子类构造函数
function Child(name, age) {
  Parent.call(this, name); // 借用父类构造函数
  this.age = age;
}

const child1 = new Child("Child1", 10);
const child2 = new Child("Child2", 15);

child1.colors.push("yellow");
console.log(child1.colors); // 输出: ["red", "blue", "green", "yellow"]
console.log(child2.colors); // 输出: ["red", "blue", "green"]
```

### **缺点**
- 方法不能继承（父类的原型方法不会被继承）。

---

## 3. 组合继承

### 原理
结合**原型链继承**和**借用构造函数继承**的优点，解决了两者的缺陷。

将 `Parent` 的实例赋值给 `Child.prototype`，使得 `Child` 的原型链上可以访问到 `Parent.prototype` 中定义的属性和方法。
修复 `constructor` 属性，使其指向正确的构造函数 `Child`。
```js
Child.prototype = new Parent(); 
Child.prototype.constructor = Child;
```

**为什么需要修复？**
- 在 JavaScript 中，`prototype` 对象上有一个默认的 `constructor` 属性，指向**构造函数本身**。
- 当执行 `Child.prototype = new Parent();` 时，`Child.prototype` 被替换成了一个新的对象（即 `new Parent()` 的实例），而这个对象的默认 `constructor` 是 `Parent`，所以会导致 `Child.prototype.constructor` 不再指向 `Child`，而是指向 `Parent`
- 为了修复这个问题，需要手动将 `Child.prototype.constructor` 设置回 `Child`：

### 代码
```javascript
// 父类构造函数
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

Parent.prototype.sayHello = function () {
  console.log(`Hello, I am ${this.name}`);
};

// 子类构造函数
function Child(name, age) {
  Parent.call(this, name); // 借用构造函数继承属性
  this.age = age;
}

// 原型链继承方法
Child.prototype = new Parent();  //继承方法
Child.prototype.constructor = Child;  // 修复构造函数引用

const child1 = new Child("Child1", 10);
const child2 = new Child("Child2", 15);

child1.colors.push("yellow");
console.log(child1.colors); // 输出: ["red", "blue", "green", "yellow"]
console.log(child2.colors); // 输出: ["red", "blue", "green"]

child1.sayHello(); // 输出: Hello, I am Child1
child2.sayHello(); // 输出: Hello, I am Child2
```

### **缺点**
- 父类构造函数会被调用两次（一次在 `Parent.call`，一次在 `new Parent`）。
---

## 4. 寄生组合继承（最佳实践）

### **原理**
优化了组合继承，通过避免调用父类构造函数两次，提高性能。

本质是将`Object.create(Parent.prototype)`创建的`Parent()`对象的副本给`Child.prototype`，避免了父类构造函数调用两次
### **代码**
```javascript
// 父类构造函数
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

Parent.prototype.sayHello = function () {
  console.log(`Hello, I am ${this.name}`);
};

// 子类构造函数
function Child(name, age) {
  Parent.call(this, name); // 借用构造函数继承属性
  this.age = age;
}

// 寄生组合继承
Child.prototype = Object.create(Parent.prototype); // 创建父类原型的副本
Child.prototype.constructor = Child;

const child1 = new Child("Child1", 10);
const child2 = new Child("Child2", 15);

child1.colors.push("yellow");
console.log(child1.colors); // 输出: ["red", "blue", "green", "yellow"]
console.log(child2.colors); // 输出: ["red", "blue", "green"]

child1.sayHello(); // 输出: Hello, I am Child1
child2.sayHello(); // 输出: Hello, I am Child2
```

### **优点**
- 避免了组合继承中调用父类构造函数两次的问题。
- 是目前最推荐的实现继承的方式。

---

## 5. 使用 `class` 语法（ES6+）

### **原理**
ES6 提供了更简洁的 `class` 语法，本质上是**语法糖**，背后依然是基于原型链的继承。

### **代码**
```javascript
class Parent {
  constructor(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  sayHello() {
    console.log(`Hello, I am ${this.name}`);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 调用父类构造函数
    this.age = age;
  }
}

const child1 = new Child("Child1", 10);
const child2 = new Child("Child2", 15);

child1.colors.push("yellow");
console.log(child1.colors); // 输出: ["red", "blue", "green", "yellow"]
console.log(child2.colors); // 输出: ["red", "blue", "green"]

child1.sayHello(); // 输出: Hello, I am Child1
child2.sayHello(); // 输出: Hello, I am Child2
```

### **优点**
- 语法简洁、可读性高。
- 原型链继承、借用构造函数的所有优点都包含。

---

## 6. Object.create() 实现继承

### **原理**

`Object.create()` 方法可以直接创建一个以指定对象为原型的对象，从而实现继承。

使用指定的原型对象和属性创建一个新对象。
### **代码**

```javascript
const Parent = {
  sayHello() {
    console.log(`Hello, I am ${this.name}`);
  }
};

const child = Object.create(Parent);
child.name = "Child";
child.sayHello(); // 输出: Hello, I am Child
```

### **优点**
- 简单直接，不需要构造函数。

### **缺点**
- 只能继承方法，不能传参继承属性。

---

## 7. 混入式继承

### **原理**

将多个对象的属性和方法混入到一个对象中，实现继承。

### **代码**

```javascript
function mixin(target, ...sources) {
  Object.assign(target, ...sources);
}

const canSayHello = {
  sayHello() {
    console.log(`Hello, I am ${this.name}`);
  }
};

const canWalk = {
  walk() {
    console.log(`${this.name} is walking`);
  }
};

const person = { name: "John" };
mixin(person, canSayHello, canWalk);

person.sayHello(); // 输出: Hello, I am John
person.walk(); // 输出: John is walking
```

### 优点

- 适用于多重继承场景（多个功能混入）。
- 简洁易用。

---

## 总结

|继承方式|特点|适用场景|
|---|---|---|
|原型链继承|继承方法简单，但共享引用类型|简单场景|
|借用构造函数继承|继承属性独立，但不能继承方法|属性继承多的场景|
|组合继承|结合两者优点，但父类构造函数会被调用两次|需要同时继承属性和方法的场景|
|寄生组合继承|最优方式，避免了组合继承的缺陷|最推荐的继承方式|
|`class` 语法继承|语法简洁、可读性高|ES6 及以上环境|
|`Object.create` 继承|简单直接，但不能传参继承属性|原型继承简单场景|
|混入式继承|适用于多重继承|多个功能模块组合的场景|

根据场景选择合适的继承方式，可以使代码更简洁、高效、易维护！