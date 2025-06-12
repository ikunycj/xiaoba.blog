# [java.lang](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/lang/package-summary.html)

  
包java.lang

提供对 Java 编程语言的设计至关重要的类。最重要的类是 `Object` ，它是类层次结构的根，和 `Class` ，它的实例代表运行时的类。

通常需要将原始类型的值表示为一个对象。包装类 `Boolean`、`Character`、`Integer`、`Long`、`Float` 和 `Double` 用于此目的。例如，类型为 `Double` 的对象包含一个类型为双精度的字段，表示该值的方式可以将对它的引用存储在引用类型的变量中。这些类还提供了许多用于在原始值之间进行转换的方法，并支持诸如 equals 和 hashCode 等标准方法。 `Void` 类是一个不可实例化的类，它持有对表示类型 void 的 `Class` 对象的引用。

`Math`类提供常用的数学函数，如正弦、余弦和平方根。类 `String` 、 `StringBuffer` 和 `StringBuilder` 同样提供对字符串的常用操作。

类 `ClassLoader` 、 `Process` 、 `ProcessBuilder` 、 `Runtime` 、 `SecurityManager` 和 `System` 提供“系统操作”来管理类的动态加载、外部进程的创建、主机环境查询（例如一天中的时间）和安全策略的执行。

类 `Throwable` 包含可能由 `throw` 语句抛出的对象。 `Throwable` 的子类表示错误和异常。

## 字符编码

[`java.nio.charset.Charset`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/nio/charset/Charset.html "class in java.nio.charset") 类的规范描述了字符编码的命名约定以及 Java 平台的每个实现都必须支持的标准编码集。

