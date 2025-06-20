# [Hashtable](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Hashtable.html)
## 定义
`Hashtable<K, V>` 是 Java 中用于存储 **键值对（Key-Value）** 的哈希表实现，继承自 `Dictionary<K, V>`，并实现了 `Map<K, V>` 接口。它从 Java 1.0 开始引入，是 Java 早期集合框架的一部分。

---

### **核心特性**

1. **键值映射**
    - `Hashtable` 将键（`Key`）映射到值（`Value`）。
    - 键和值都必须是非 `null` 对象，否则会抛出 `NullPointerException`。
2. **线程安全**
    - `Hashtable` 的方法是同步的（`synchronized`），因此它是线程安全的。
    - 在多线程环境中可以使用，但由于同步开销，其性能较低。
3. **Fail-Fast 迭代器**
    - 返回的集合视图（如 `entrySet()`、`keySet()` 等）的迭代器是 **Fail-Fast** 的。
    - 如果在迭代期间修改了 `Hashtable` 的结构（非迭代器自身的 `remove` 方法），会抛出 `ConcurrentModificationException`。
4. **不支持 `null` 键和值**
    - 插入 `null` 键或 `null` 值时会抛出异常，而 `HashMap` 支持一个 `null` 键和多个 `null` 值。
5. **容量和负载因子**
    - **初始容量**：哈希表桶的数量，可以在创建时指定。
    - **负载因子**：哈希表满载时，触发扩容（rehash）的比例。默认值为 `0.75`，在时间和空间成本之间提供良好平衡。
6. **Fail-Fast 和 Enumeration**
    - 使用迭代器访问 `Hashtable` 时是 Fail-Fast 的，但使用 `keys()` 和 `elements()` 返回的 `Enumeration` 是非 Fail-Fast 的。
7. **从 Java 2 开始实现 `Map` 接口**
    - 从 Java 2 开始，`Hashtable` 被改造为实现 `Map` 接口，成为 Java 集合框架的一部分。

---

### **性能参数**
- **初始容量**：
    - 控制桶的数量，直接影响空间使用和性能。
    - 如果知道将存储的条目数量，可以在创建时指定更大的初始容量，避免扩容（rehash）的开销。
- **负载因子**：
    - 默认值为 `0.75`，较高的负载因子会减少空间浪费，但增加查找的时间成本。
    - 较低的负载因子会提高查找效率，但会占用更多内存。
## 构造方法

## 方法