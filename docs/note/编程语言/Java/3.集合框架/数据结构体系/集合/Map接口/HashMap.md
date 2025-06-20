# [HashMap](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/HashMap.html)
1. HashMap是Map的实现类
2. 相对于Map没有特殊方法
3. 底层和HashSet一样，是哈希表结构

## [底层原理](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.player.switch&vd_source=18ca776bf16158dfccdac44dbc1b2726&p=16)

`HashMap` 是 Java 中最常用的集合之一，底层基于 **哈希表（Hash Table）** 实现，用于以键值对的形式存储数据。以下是 HashMap 的核心设计与底层实现原理的详细剖析。

---

### **1. HashMap 的底层数据结构**

HashMap 的底层数据结构是 **数组 + 链表 + 红黑树** 的结合：

- **数组**：存储键值对的主干，每个数组的元素称为一个 **桶（bucket）**。
- **链表**：当多个键的哈希值冲突时，这些键值对被存储在同一个桶中，并用链表来解决冲突。
- **红黑树**：当链表长度超过一定阈值（默认为 8）时，链表会转化为红黑树，从而提升查找效率。

---

### **2. HashMap 的核心概念**

#### **1) 哈希函数**

- HashMap 使用键的 `hashCode()` 方法计算哈希值，通过哈希值决定该键值对存储在哪个桶中。
- 哈希值进一步通过取模运算或位运算与数组长度结合，定位具体的数组索引。
- 示例：
```java
int hash = key.hashCode();
int index = hash % array.length;  // 定位数组索引

```

Java 8 优化后使用了位运算：
```java
int index = (array.length - 1) & hash;  // 更高效的索引定位
```

#### **2) 冲突解决**

- 当两个或多个键的哈希值计算后映射到同一个数组索引（桶）时，就会产生哈希冲突。
- HashMap 使用 **拉链法** 来解决冲突：
    - 在桶中以链表的形式存储多个键值对。
    - 如果链表长度超过阈值（默认 8），链表会转化为红黑树，提高查询性能。

#### **3) 扩容机制**

- HashMap 的初始容量默认是 16，负载因子（`Load Factor`）为 0.75。
- 当元素数量超过 `容量 × 负载因子` 时（即默认 16 × 0.75 = 12），触发扩容。
- 扩容过程：
    - 数组长度加倍（变为原来的 2 倍）。
    - 重新计算每个键值对的索引位置，重新分布数据（称为 **rehash**）。

#### **4) 红黑树引入**

- 当某个桶中的`链表长度超过 8` 且`数组长度超过 64` 时，该链表会转换为红黑树。
- 红黑树的查找、插入、删除效率为 O(log⁡n)O(\log n)O(logn)，相比链表的 O(n)O(n)O(n) 有显著提升。

---

### **3. HashMap 的操作原理**

#### **1) put() 方法：插入键值对**

1. 计算键的哈希值，定位到对应的桶索引。
2. 检查桶中是否存在相同的键：
    - 如果存在，则覆盖原值。
    - 如果不存在，则将键值对插入到桶中。
3. 如果桶中链表长度超过 8，转化为红黑树。
4. 如果元素总数超过阈值，触发扩容。

**核心代码**（简化版）：
```java
public V put(K key, V value) {
    int hash = hash(key.hashCode());
    int index = (table.length - 1) & hash;
    
    // 如果桶为空，直接创建节点
    if (table[index] == null) {
        table[index] = new Node<>(hash, key, value, null);
    } else {
        // 遍历桶中的链表
        Node<K, V> node = table[index];
        while (node != null) {
            if (node.hash == hash && (node.key.equals(key))) {
                node.value = value;  // 覆盖旧值
                return;
            }
            node = node.next;
        }
        // 添加到链表或转为红黑树
        addNodeToBucket(hash, key, value);
    }
    size++;
    if (size > threshold) resize();  // 超过阈值，扩容
    return value;
}
```
---

#### **2) get() 方法：查找值**

1. 计算键的哈希值，定位到对应的桶索引。
2. 遍历桶中的链表或红黑树：
    - 如果找到与键相等的节点，返回值。
    - 如果未找到，返回 `null`。

**核心代码**（简化版）：
```java
public V get(Object key) {
    int hash = hash(key.hashCode());
    int index = (table.length - 1) & hash;

    Node<K, V> node = table[index];
    while (node != null) {
        if (node.hash == hash && (node.key.equals(key))) {
            return node.value;  // 返回匹配的值
        }
        node = node.next;
    }
    return null;  // 未找到
}
```

---

#### **3) remove() 方法：删除键值对**

1. 计算键的哈希值，定位到对应的桶索引。
2. 遍历链表或红黑树，找到与键匹配的节点。
3. 移除该节点并调整链表或红黑树结构。

**核心代码**（简化版）：
```java
public V remove(Object key) {
    int hash = hash(key.hashCode());
    int index = (table.length - 1) & hash;

    Node<K, V> node = table[index];
    Node<K, V> prev = null;

    while (node != null) {
        if (node.hash == hash && (node.key.equals(key))) {
            if (prev == null) {
                table[index] = node.next;  // 删除头节点
            } else {
                prev.next = node.next;    // 删除中间或尾部节点
            }
            size--;
            return node.value;
        }
        prev = node;
        node = node.next;
    }
    return null;  // 未找到
}
```

---

### **4. HashMap 的优缺点**

#### **优点**

1. **快速查询**：
    
    - 理想情况下，哈希表的查询时间复杂度为 O(1)O(1)O(1)。
    - 在哈希冲突较少时，性能非常高。
2. **动态扩容**：
    
    - 自动扩容机制，确保在大量数据下仍保持较好的性能。
3. **支持 `null` 键和值**：
    
    - HashMap 允许键为 `null`，且值也可以为 `null`。
4. **灵活的链表 + 红黑树结构**：
    
    - 通过链表和红黑树解决冲突，兼顾性能和稳定性。

#### **缺点**

1. **内存占用较高**：
    
    - 链表和红黑树结构需要额外的存储空间。
2. **线程不安全**：
    
    - 多线程环境下可能出现问题，例如数据覆盖或死循环。
    - 如果需要线程安全版本，可以使用 `Collections.synchronizedMap()` 或 `ConcurrentHashMap`。
3. **哈希冲突影响性能**：
    
    - 如果哈希函数设计不当，可能导致过多冲突，从而影响性能。

---

### **5. HashMap 与其他 Map 的对比**

| 特性            | **HashMap**              | **LinkedHashMap**        | **TreeMap**                          |
| ------------- | ------------------------ | ------------------------ | ------------------------------------ |
| **底层实现**      | 数组 + 链表 + 红黑树            | 数组 + 链表（维护插入顺序）          | 红黑树                                  |
| **有序性**       | 无序                       | 按插入顺序或访问顺序               | 按键的自然顺序或自定义顺序                        |
| **性能**        | 查询和插入时间复杂度为 O(1)O(1)O(1) | 查询和插入时间复杂度为 O(1)O(1)O(1) | 查询和插入时间复杂度为 O(log⁡n)O(\log n)O(logn) |
| **允许键为 null** | 是                        | 是                        | 否                                    |
| **适用场景**      | 快速查找，无序存储                | 需要保持插入顺序                 | 有序存储，范围查询                            |

---

### **6. 总结**

1. **核心结构**：HashMap 底层采用 **数组 + 链表 + 红黑树** 的组合结构，结合了时间复杂度和空间占用的平衡。
2. **高效性**：在哈希冲突较少时，查询效率非常高，为 O(1)O(1)O(1)。在冲突严重时，通过红黑树降低退化风险。
3. **适用场景**：适用于快速查找和插入的场景，特别是键值对数量较多时。对于多线程环境，推荐使用 `ConcurrentHashMap`。
4. 