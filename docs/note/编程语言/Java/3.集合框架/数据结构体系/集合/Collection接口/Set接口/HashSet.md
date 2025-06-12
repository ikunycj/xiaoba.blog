# [HashSet](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/HashSet.html)
`HashSet` 是 Java 集合框架中的一个实现了 `Set` 接口的类，用于存储不重复的元素。它基于哈希表（实际上是一个 `HashMap` 实例）实现，允许存储 `null` 元素，但不保证元素的迭代顺序。

## `HashSet` 的主要特点

- **不允许重复元素**：每个元素在集合中都是唯一的。
- **无序**：不保证元素的迭代顺序，特别是它不保证该顺序恒久不变。
- **无索引**
- **允许 `null` 元素**：可以包含一个 `null` 元素。
- **非线程安全**：如果多个线程同时访问一个 `HashSet`，并且至少一个线程修改了该集合，则它必须保持外部同步。

>[!注意]
>如果是自定义对象，需要重写对象的`hashCode()`和`equals()`方法
## `HashSet` 的常用方法
### **`boolean add(E e)`**
将指定的元素添加到此集合中（如果尚未存在）。
### **`void clear()`**
移除此集合中的所有元素。

### **`Object clone()`**
返回此 `HashSet` 实例的浅表副本：并没有复制这些元素本身。

### **`boolean contains(Object o)`**
如果此集合包含指定的元素，则返回 `true`。

### **`boolean isEmpty()`**
如果此集合不包含元素，则返回 `true`。

### **`Iterator<E> iterator()`**
返回对此集合中元素进行迭代的迭代器。

### **`boolean remove(Object o)`**
如果指定的元素存在于此集合中，则将其移除。

### **`int size()`**
返回此集合中的元素数（其基数）。

### **`Spliterator<E> spliterator()`**
在此集合中的元素上创建一个后期绑定和快速失败的 `Spliterator`。


## 注意事项

- **性能**：`HashSet` 为基本操作（如 `add`、`remove`、`contains` 和 `size`）提供了恒定时间的性能，假定哈希函数将元素正确地分布在桶中。
    
- **迭代顺序**：`HashSet` 不保证元素的迭代顺序，特别是它不保证该顺序恒久不变。如果需要维护插入顺序，可以使用 `LinkedHashSet`；如果需要排序，可以使用 `TreeSet`。

- **线程安全**：`HashSet` 不是线程安全的。如果多个线程同时访问一个 `HashSet`，并且至少一个线程修改了该集合，则它必须保持外部同步。这通常通过对自然封装该集合的对象执行同步操作来完成。如果不存在这样的对象，则应该使用 `Collections.synchronizedSet` 方法来包装集合。

- **`null` 元素**：`HashSet` 允许使用 `null` 元素，但在使用时需要注意避免 `NullPointerException`。

## 底层原理

`HashSet` 是基于 **哈希表（HashTable）** 实现的，它本质上是依赖于 `HashMap` 的一个实现。

每个 `HashSet` 实例实际上内部维护了一个 `HashMap`，所有元素都存储在这个 `HashMap` 中。具体来说，`HashSet` 的底层逻辑可以总结如下：

**哈希表组成：**
- JDK8以前：数组+链表
- JDK8以后：数组+链表+红黑树

### **一、HashSet 的内部结构**

1. `HashSet` 内部使用一个 `HashMap` 来存储元素。

    - 在 `HashSet` 中，元素是存储为 `HashMap` 的键（key）。
    - `HashMap` 的值（value）是一个固定的对象（通常是 `static final Object PRESENT`，仅用作占位符，表示键的存在）。
2. `HashSet` 的结构：
    
    - 元素是存储在 `HashMap` 的键中。
    - 值始终是 `HashSet` 中定义的一个常量 `PRESENT`。

```java
private transient HashMap<E, Object> map;
// 常量 PRESENT 用作占位符
private static final Object PRESENT = new Object();
```

---

### **二、HashSet 的操作流程**

以下是 `HashSet` 的主要操作及其底层原理：

#### **1. 添加元素（`add(E e)`）**

- **步骤**：
    1. 调用内部 `HashMap` 的 `put()` 方法，将元素作为键（key）存储，值（value）设置为 `PRESENT`。
    2. 如果 `put()` 方法返回 `null`，说明插入成功（元素之前不存在）；否则，说明该元素已存在，添加失败。
- **底层实现**：
    
    1. 使用元素的 `hashCode()` 方法计算哈希值，定位到哈希表中的一个桶（bucket）。
    2. 如果桶为空，则直接将元素放入；如果桶中已有元素，则通过 `equals()` 方法判断是否重复：
        - 如果 `equals()` 返回 `true`，说明元素重复，不插入。
        - 如果 `equals()` 返回 `false`，则在桶中以链表或红黑树形式存储该元素（具体实现由 `HashMap` 决定）。
- **代码示例**：
    

```java
public boolean add(E e) {
    return map.put(e, PRESENT) == null;
}

```

---

#### **2. 删除元素（`remove(Object o)`）**

- **步骤**：
    
    1. 调用内部 `HashMap` 的 `remove()` 方法，将指定元素作为键移除。
    2. 如果 `remove()` 返回非 `null`，说明删除成功；否则，说明元素不存在。
- **底层实现**：
    
    1. 通过元素的 `hashCode()` 计算哈希值，找到对应的桶。
    2. 在桶中查找与指定元素相等的键（通过 `equals()` 方法比较），找到后将其删除。
- **代码示例**：
    
```java
public boolean remove(Object o) {
    return map.remove(o) != null;
}
```

---

#### **3. 判断元素是否存在（`contains(Object o)`）**

- **步骤**：
    
    1. 调用内部 `HashMap` 的 `containsKey()` 方法，检查是否包含该键。
    2. 如果 `containsKey()` 返回 `true`，说明集合中存在该元素；否则，不存在。
- **底层实现**：
    
    1. 通过元素的 `hashCode()` 计算哈希值，找到对应的桶。
    2. 遍历桶中元素，通过 `equals()` 方法判断是否包含该元素。
- **代码示例**：
    
```java
public boolean contains(Object o) {
    return map.containsKey(o);
}
```
---

#### **4. 遍历元素（`iterator()`）**

- **步骤**：
    
    1. 返回 `HashMap` 键集合的迭代器。
    2. 遍历时只会迭代 `HashMap` 中的键。
- **底层实现**：
    
    - 调用 `HashMap.keySet().iterator()` 返回键集合的迭代器。
- **代码示例**：
    
```java
public Iterator<E> iterator() {
    return map.keySet().iterator();
}
```
---

#### **5. 获取元素数量（`size()`）**

- **步骤**：
    
    1. 调用内部 `HashMap` 的 `size()` 方法，返回存储元素的数量。
    2. 该数量等于 `HashMap` 中键的个数。
- **代码示例**：
    
```java
public int size() {
    return map.size();
}
```
---

### **三、HashSet 的底层细节**

#### **1. 哈希表**

- `HashSet` 的内部哈希表是 `HashMap` 的实现，哈希表的结构是一个数组 + 链表（或者数组 + 红黑树）。
- 元素通过哈希值定位到数组中的某个桶，如果发生哈希冲突（即多个元素映射到同一个桶），会通过链表或红黑树存储冲突的元素。

#### **2. 哈希冲突处理**

- **链表存储**：当冲突的元素较少时，使用链表存储。
- **红黑树存储**：当冲突的元素较多（桶中元素数量超过阈值 8）时，链表会转化为红黑树，提高查找效率。

#### **3. 负载因子**

- 默认初始容量：`16`。
- 默认负载因子：`0.75`。
- 当哈希表的使用比例超过负载因子时，会触发扩容（重新分配更大的数组），并重新计算所有元素的哈希值。

---

### **四、HashSet 的优缺点**

#### **优点**

1. **高效性**：添加、删除、查找元素的时间复杂度为 `O(1)`（假设哈希函数分布均匀）。
2. **自动去重**：内部通过 `hashCode()` 和 `equals()` 确保元素唯一性。
3. **灵活性**：允许存储一个 `null` 元素。

#### **缺点**
1. **无序性**：元素的存储顺序不固定。
2. **内存开销**：由于底层是基于 `HashMap`，需要额外存储 `PRESENT` 占位符，可能会占用更多内存。
3. **线程不安全**：在多线程环境下需要手动同步。

---

### **五、HashSet 的使用场景**

1. **去重**：用于存储不重复的元素，例如去重后的集合。
2. **快速查找**：通过 `contains()` 快速判断某个元素是否存在。
3. **集合运算**：可以通过 `addAll()`、`retainAll()` 等方法实现集合的并集、交集、差集等操作。