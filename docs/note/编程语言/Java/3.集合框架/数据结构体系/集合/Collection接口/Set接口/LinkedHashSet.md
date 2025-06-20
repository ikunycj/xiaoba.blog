# [LinkedHashSet](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/LinkedHashSet.html)

>[!特点]
 > - 相比于HashSet，存取有序
>  - 原理：多了双向链表记录顺序

`LinkedHashSet` 是 Java 集合框架中的一个实现了 `Set` 接口的类，继承自 `HashSet`，并通过维护一个双向链表来确保元素的插入顺序。这意味着，`LinkedHashSet` 既具有 `HashSet` 的快速访问特性，又能保持元素的插入顺序。

