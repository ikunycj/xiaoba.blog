do-while语句是 Java 中的一种循环结构，它先执行循环体中的代码，然后检查循环条件。如果条件为 `true`，则继续执行循环体；如果条件为 false，则退出循环。
do-while语句的基本语法如下：
```java
do {
    // 循环体(循环至少执行一次)
} while (循环条件);
```
其中，`do` 后面跟着需要重复执行的代码块，`while` 后面是循环的条件。需要注意的是，循环条件后面必须有分号。
`do-while` 语句保证循环体至少会被执行一次，即使循环条件一开始就为 `false`。这与 `while` 语句的不同之处在于条件检查的时机。
以下是一个简单的示例，演示了 `do-while` 语句的用法：
```java
public class DoWhileExample {
    public static void main(String[] args) {
        int i = 1;

        do {
            System.out.println("Count: " + i);
            i++;
        } while (i <= 5);
    }
}
```

在这个例子中，循环体会一直执行，直到 `i` 大于 5