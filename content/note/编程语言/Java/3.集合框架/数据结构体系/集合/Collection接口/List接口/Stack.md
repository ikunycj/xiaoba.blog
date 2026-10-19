# [Stack](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Stack.html)
在 Java 中，`Stack` 是一个类，位于 `java.util` 包下，用于表示一种后进先出（LIFO, Last-In-First-Out）数据结构。可以把它理解为一根栈（堆叠）的模型，最上面的元素是最先被访问的。

---

## **1. 定义与继承结构**

`Stack` 是 Java 中的一个具体类，继承自 `Vector`。它的继承结构如下：
```
java.lang.Object
   ↳ java.util.AbstractCollection<E>
       ↳ java.util.Vector<E>
           ↳ java.util.Stack<E>
```

**特点**：
- `Stack` 是一个泛型类，允许存储特定类型的对象。
- 继承自 `Vector`，意味着 `Stack` 具有动态扩展容量的能力（即底层是基于数组实现的）。

---

## **2. 栈的核心方法**
`Stack` 提供了一些特定于栈的操作方法，同时也继承了 `Vector` 中的一些通用方法。
### `push(E item)`
将元素压入栈顶。
### `E pop()`
==移除==并==返回栈顶==元素。如果栈为空，则抛出 `EmptyStackException` 异常。
### `E peek()`
==返回栈顶==元素但==不移除==它。如果栈为空，则抛出 `EmptyStackException` 异常。
### `boolean empty()`
检查栈是否为空。返回 `true` 表示栈为空，`false` 表示非空。
### `int search(Object o)`
返回元素在栈中的 1 基索引位置（栈顶为索引 1），如果找不到元素则返回 -1。

---

## **3. 方法的示例代码**

以下是一些常见操作的代码示例：

```java
import java.util.Stack;

public class StackExample {
    public static void main(String[] args) {
        // 创建一个栈
        Stack<Integer> stack = new Stack<>();

        // 压栈 (push)
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("栈内容: " + stack);

        // 查看栈顶元素 (peek)
        System.out.println("栈顶元素: " + stack.peek());

        // 出栈 (pop)
        System.out.println("移除的栈顶元素: " + stack.pop());
        System.out.println("栈内容: " + stack);

        // 查找元素 (search)
        int position = stack.search(10); // 栈顶为 1，依次递增
        System.out.println("元素 10 的位置: " + position);

        // 判断是否为空 (empty)
        System.out.println("栈是否为空: " + stack.empty());
    }
}
```

**运行结果**：
```
栈内容: [10, 20, 30]
栈顶元素: 30
移除的栈顶元素: 30
栈内容: [10, 20]
元素 10 的位置: 2
栈是否为空: false
```

---

## **4. 应用场景**

`Stack` 常用于需要后进先出的应用场景，例如：

1. **表达式求值**：将操作数和操作符存入栈中。
2. **括号匹配**：检查括号是否正确匹配。
3. **浏览器历史记录**：实现页面前进和后退功能。
4. **递归模拟**：用栈模拟递归调用的过程。

---
## **5. 注意事项**

1. **性能问题**：
    
    - 由于继承自 `Vector`，`Stack` 的方法是线程安全的，但这种线程安全通过同步实现，性能可能不如非同步的栈实现。
2. **替代方案**：
    
    - 如果不需要线程安全，可以考虑使用 `Deque`（如 `ArrayDeque`）来实现栈的功能。`Deque` 是双端队列的一种，提供了更好的性能。

**示例（使用 `ArrayDeque` 实现栈功能）**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class ArrayDequeExample {
    public static void main(String[] args) {
        Deque<Integer> stack = new ArrayDeque<>();

        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("栈内容: " + stack);

        System.out.println("栈顶元素: " + stack.peek());

        System.out.println("移除的栈顶元素: " + stack.pop());
        System.out.println("栈内容: " + stack);
    }
}
```
---

## **6. 总结**

- `Stack` 是 Java 提供的经典栈实现，适合用于简单的栈操作。
- 对于更高效或复杂的需求，推荐使用 `Deque` 作为栈。
- 了解 `Stack` 的原理和方法，可以帮助更好地处理与后进先出相关的问题。