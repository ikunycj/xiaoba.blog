# [Iterator](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Iterator.html)

## public interface Iterator`<E>`

==集合上的迭代器==。 `Iterator` 取代了 Java 集合框架中的 [`Enumeration`](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Enumeration.html "interface in java.util") 。迭代器在两个方面不同于枚举：
- 迭代器允许调用者在具有明确定义的语义的迭代期间从底层集合中删除元素。
- 方法名称已得到改进。

此接口是 [Java 集合框架](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/package-summary.html#CollectionsFramework) 的成员

>[!注意]
>1.迭代器遍历完毕指针不会复位(如果想再次遍历只能重新简历迭代器对象)
>2.迭代器遍历时，不能用集合的方法增加或者删除(否则报错：并发修改异常)
>.迭代器遍历不依赖索引
>4.一次循环只能用一次next()方法

## 方法
### hasNext()
boolean hasNext()
指针不移动，查看指针下一个位置是否有元素，如果有， 则返回 `true`。 （换句话说，如果 [`next()`](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Iterator.html#next()) 将返回一个元素而不是抛出异常，则返回 `true`。）

返回：
`true` 如果迭代有更多元素
### next
[E](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Iterator.html "type parameter in Iterator")  next()
先==返回==当==前指针位置元素==，再后移指针

>[!抛出：]
[NoSuchElementException](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/NoSuchElementException.html "class in java.util") - ==如果迭代没有更多元素==
### remove
default void remove()
>[!注意]
>不能用集合的remove()方法，否则会出现并发修改异常

从基础集合中移除此迭代器返回的最后一个元素（可选操作）。每次调用 [`next()`](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Iterator.html#next()) 只能调用一次此方法。

在迭代过程中以除调用此方法之外的任何方式修改了基础集合，则迭代器的行为是未指定的，除非重写类已指定并发修改策略。

如果在调用 [`forEachRemaining`](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Iterator.html#forEachRemaining(java.util.function.Consumer)) 方法之后调用此方法，则迭代器的行为未指定。

实现要求：
默认实现抛出一个 [`UnsupportedOperationException`](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/lang/UnsupportedOperationException.html "class in java.lang") 实例并且不执行任何其他操作。

>[!抛出：]
[UnsupportedOperationException](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/lang/UnsupportedOperationException.html "class in java.lang") - 如果此迭代器不支持 `remove` 操作
[IllegalStateException](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/lang/IllegalStateException.html "class in java.lang") -   `next` 方法，或者在上次调用 `next` 方法后已经调用了 `remove` 方法
### forEachRemaining
default void forEachRemaining([Consumer](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/function/Consumer.html "interface in java.util.function") `<? super [E]>` action)

对每个剩余元素执行给定的操作，直到处理完所有元素或操作引发异常。如果指定了迭代顺序，则将按迭代顺序执行操作。操作抛出的异常被转发给调用者。

如果操作以任何方式修改集合（即使通过调用 [`remove`](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Iterator.html#remove()) 方法或 `Iterator` 子类型的其他增变器方法），则迭代器的行为是未指定的，除非重写类已指定并发修改策略。

如果操作抛出异常，迭代器的后续行为是未指定的。

实现要求：
默认实现的行为就像：
```java
while (hasNext())
    action.accept(next());
```