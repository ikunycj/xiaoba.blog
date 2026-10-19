
| 获取方式 | 方法名 | 说明              |
| ---- | --- | --------------- |
| 单列集合 |     | Collection中默认方法 |
| 双列集合 |     | 无法直接使用stream流   |
| 数组   |     | Arrays工具类中静态方法  |
| 零散数据 |     | Stream接口中静态方法   |
### Stream的核心特点

1. **不存储数据**：Stream本身不存储元素，元素可能存储在底层的集合中，或者根据需要产生。
2. **不改变源数据**：操作Stream的过程中，原数据源不会改变。
3. **懒执行**：Stream的操作符可能会等到需要结果的时候才执行。

### Stream的基本操作

Stream的操作大体上可以分为两类：

- **中间操作**：可以连接起来形成一个流水线，除非流水线上触发一个终端操作，否则中间操作不会执行任何的处理！而且中间操作是延迟执行的，这意味着它们会等到需要结果的时候才执行。
- **终端操作**：终端操作会从流的流水线生成结果。之后流不能再被使用。

### 常见的Stream操作

下面是一些常见的Stream操作示例：

- **映射（map）**：转换流中的每个元素，应用函数到每个元素。
- **过滤（filter）**：排除不符合条件的元素。
- **排序（sorted）**：按照自然顺序或者定制化比较器排序流中的元素。
- **收集（collect）**：将流转换成其他形式，例如集合。
- **归约（reduce）**：通过某个连接性操作将所有元素汇总成一个汇总结果。
- **遍历（forEach）**：迭代流中的每个元素。
### 例子
```java
import java.util.Arrays;
import java.util.List;

public class StreamExample {
    public static void main(String[] args) {
        List<String> myList = Arrays.asList("apple", "banana", "cherry", "date");

        myList.stream()
              .filter(s -> s.startsWith("b"))  // 过滤出以'b'开头的元素
              .map(String::toUpperCase)        // 将元素转换成大写
              .sorted()                        // 排序
              .forEach(System.out::println);   // 输出每个元素
    }
}

```