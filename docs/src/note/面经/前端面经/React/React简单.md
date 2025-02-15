# React简单
## 1.如果 React 组件的属性没有传值，它的默认值是什么？

如果一个 React 组件的属性没有传值，它的默认值是 `undefined`。这意味着组件内部如果直接访问这个属性会得到 `undefined`。
### 扩展

1）**设定默认属性值**： 虽然默认为 `undefined`，但我们可以为 React 组件的属性设定默认值。React 提供了一个非常方便的方式来实现这一点，那就是 `defaultProps`。下面是一个简单的例子：
```js
class MyComponent extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

MyComponent.defaultProps = {
  text: '默认文本'
};
```

在函数式组件中，也可以使用类似的方法：
```js
const MyComponent = ({ text }) => {
  return <div>{text}</div>;
};

MyComponent.defaultProps = {
  text: '默认文本'
};
```
这样，当属性 `text` 没有传值时，它会使用 `defaultProps` 中的默认值。

2）**使用 ES6 解构赋值设定默认值**： 在函数式组件中，可以使用 ES6 的解构赋值语法来设定默认属性值：
```js
const MyComponent = ({ text = '默认文本' }) => {
  return <div>{text}</div>;
};
```

这种方法和使用 `defaultProps` 是等价的。它可以让组件看起来更加简洁。

3）**PropTypes 校验**： 我们还可以使用 PropTypes 来定义组件的属性类型及设定默认值，确保传入的属性符合预期。也是一种对组件进行开发时的契约约束的好方法：
```jsx
import PropTypes from 'prop-types';

const MyComponent = ({ text }) => {
  return <div>{text}</div>;
};

MyComponent.defaultProps = {
  text: '默认文本'
};

MyComponent.propTypes = {
  text: PropTypes.string
};
```

PropTypes 用于检查传入组件的属性类型是否与预期的类型匹配，有助于捕获传值阶段的潜在 BUG。

4）**举个实际场景**： 假设我们有一个展示用户资料的组件 `UserProfile`，它接收 `name` 和 `age` 属性。为了保证即使父组件没有传值时也能够正常显示信息，我们可以为 `name` 和 `age` 设置默认值。

```js
import React from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ name, age }) => (
  <div>
    <p>姓名: {name}</p>
    <p>年龄: {age}</p>
  </div>
);

UserProfile.defaultProps = {
  name: '匿名用户',
  age: 0
};

UserProfile.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number
};

export default UserProfile;
```

如果父组件没有传 `name` 和 `age`，`UserProfile` 也会显示 "匿名用户" 和 0。这提高了组件的健壮性和用户体验。



















































































