# [TreeMap](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/TreeMap.html)

`TreeMap` 是 Java 中基于 **红黑树** 实现的有序 `Map`，是 `java.util.Map` 接口的一个实现类。

它按照**键的自然顺序**或**自定义的比较器顺序**对键值对进行排序。与 `HashMap` 和 `LinkedHashMap` 不同，`TreeMap` 提供了按顺序访问键值对的功能。

---

### **1. TreeMap 的特点**

|特性|描述|
|---|---|
|**排序性**|`TreeMap` 会按照键的自然顺序（如果键实现了 `Comparable` 接口）或指定的比较器顺序排序。|
|**底层实现**|基于红黑树的数据结构，提供对元素的平衡快速访问。|
|**键的要求**|键必须实现 `Comparable` 接口，或者在创建 `TreeMap` 时提供一个 `Comparator` 比较器。|
|**不允许空键**|`TreeMap` 中不允许键为 `null`，因为键的排序需要调用比较方法，这与 `HashMap` 不同。|
|**允许值为 null**|键的值可以为 `null`，没有限制。|
|**线程安全性**|不是线程安全的。如果需要线程安全的版本，可以使用 `Collections.synchronizedMap()` 方法包装。|

---

### **2. TreeMap 的构造方法**

`TreeMap` 提供以下几种构造方法：

|构造方法|描述|
|---|---|
|`TreeMap()`|默认构造一个空的 `TreeMap`，键按自然顺序排序（需要键实现 `Comparable` 接口）。|
|`TreeMap(Comparator<? super K> comparator)`|使用指定的比较器对键排序。|
|`TreeMap(Map<? extends K, ? extends V> m)`|根据现有的 `Map` 创建一个 `TreeMap`，键值对会被按顺序插入。|
|`TreeMap(SortedMap<K, ? extends V> m)`|从现有的 `SortedMap` 创建一个 `TreeMap`，保留键的顺序性。|

---

### **3. 常用方法和使用示例**

#### **1. put(K key, V value)**

- **描述**：插入一个键值对。如果键已存在，则更新对应的值。
- **示例**：
```java
TreeMap<String, Integer> treeMap = new TreeMap<>();
treeMap.put("apple", 3);
treeMap.put("banana", 5);
treeMap.put("cherry", 2);
System.out.println(treeMap); // 输出: {apple=3, banana=5, cherry=2}
```

---

#### **2. get(Object key)**

- **描述**：返回指定键对应的值。如果键不存在，则返回 `null`。
- **示例**：
```java
System.out.println(treeMap.get("banana")); // 输出: 5
System.out.println(treeMap.get("grape"));  // 输出: null
```

---

#### **3. remove(Object key)**

- **描述**：移除指定键及其对应的值。如果键不存在，则不进行任何操作。
- **示例**：
```java
treeMap.remove("apple");
System.out.println(treeMap); // 输出: {banana=5, cherry=2}
```

---

#### **4. firstKey() 和 lastKey()**

- **描述**：分别返回 `TreeMap` 中的第一个键（最小键）和最后一个键（最大键）。
- **示例**：
```java
System.out.println(treeMap.firstKey()); // 输出: banana
System.out.println(treeMap.lastKey());  // 输出: cherry
```

---

#### **5. ceilingKey(K key) 和 floorKey(K key)**

- **描述**：
    - `ceilingKey(K key)`：返回大于或等于给定键的最小键。如果不存在，则返回 `null`。
    - `floorKey(K key)`：返回小于或等于给定键的最大键。如果不存在，则返回 `null`。
- **示例**：
```java
System.out.println(treeMap.ceilingKey("blueberry")); // 输出: cherry
System.out.println(treeMap.floorKey("blueberry"));  // 输出: banana
```

---

#### **6. higherKey(K key) 和 lowerKey(K key)**

- **描述**：
    - `higherKey(K key)`：返回严格大于给定键的最小键。如果不存在，则返回 `null`。
    - `lowerKey(K key)`：返回严格小于给定键的最大键。如果不存在，则返回 `null`。
- **示例**：
```java
System.out.println(treeMap.higherKey("banana")); // 输出: cherry
System.out.println(treeMap.lowerKey("banana"));  // 输出: apple
```

---

#### **7. subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive)**

- **描述**：返回子 `Map`，包含从 `fromKey` 到 `toKey` 范围内的键值对。
- **示例**：
```java
System.out.println(treeMap.subMap("apple", true, "cherry", false));
```

## 底层原理

### **1. TreeMap 的底层数据结构**

- `TreeMap` 的底层数据结构是 **红黑树（Red-Black Tree）**。
- 红黑树是一种自平衡二叉搜索树，能够保证基本操作（插入、删除、查找）的时间复杂度为 O(log⁡n)O(\log n)O(logn)。
- 在 `TreeMap` 中，红黑树的每个节点用 `Entry<K,V>` 表示，每个节点存储一个键值对。

---

### **2. TreeMap 的核心类**

#### **`Entry` 节点类**

`TreeMap` 的核心是 `Entry<K, V>`，它表示红黑树中的一个节点，包含以下字段：
```java
static final class Entry<K,V> implements Map.Entry<K,V> {
    K key;                // 键
    V value;              // 值
    Entry<K,V> left;      // 左子节点
    Entry<K,V> right;     // 右子节点
    Entry<K,V> parent;    // 父节点
    boolean color = BLACK; // 颜色：红色或黑色

    Entry(K key, V value, Entry<K,V> parent) {
        this.key = key;
        this.value = value;
        this.parent = parent;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
    public V setValue(V value) {
        V oldValue = this.value;
        this.value = value;
        return oldValue;
    }
}
```

---

### **3. 核心变量**

`TreeMap` 的关键成员变量：
```java
private transient Entry<K,V> root;        // 红黑树的根节点
private transient int size = 0;          // 节点数
private final Comparator<? super K> comparator; // 自定义比较器（可选）
```

- `root`：树的根节点。
- `size`：当前红黑树中存储的节点数量。
- `comparator`：比较器，用于自定义排序规则。如果为 `null`，则使用键的自然顺序（键必须实现 `Comparable` 接口）。

---

### **4. 核心方法**

#### **(1) put()：插入键值对**

- `put()` 方法用于将键值对插入到 `TreeMap` 中，如果键已存在，则更新对应的值。

**主要步骤：**

1. 如果红黑树为空（`root == null`），创建根节点并设置为黑色。
2. 否则，从根节点开始，沿着树查找插入位置。
3. 使用比较器或键的自然顺序确定键的相对大小，决定插入到左子树还是右子树。
4. 插入新节点后，调整红黑树以保持平衡。

**红黑树调整：`fixAfterInsertion()`**

- 当新节点插入后，可能破坏红黑树的平衡性，因此需要通过旋转和重新着色进行修复。

---

#### **(2) get()：查找值**

- `get()` 方法用于根据键查找对应的值。
- 通过红黑树的二分搜索快速查找目标节点。

---

#### **(3) remove()：删除键值对**

- 删除节点后，需要调整红黑树以保持平衡。
- 删除过程：
    1. 如果节点有两个子节点，找到后继节点替换被删除节点。
    2. 删除叶子节点或只有一个子节点的节点。
    3. 调用 `fixAfterDeletion()` 修复红黑树。

---

### **5. 总结**

- `TreeMap` 通过红黑树保证了键值对的有序性和高效操作。
- 核心方法：
    - **`put()`**：插入键值对，调整红黑树。
    - **`get()`**：查找键对应的值。
    - **`remove()`**：删除键值对，调整红黑树。
- 时间复杂度：插入、删除、查找均为 O(log⁡n)O(\log n)O(logn)。

`TreeMap` 适用于需要按键排序或范围查询的场景，例如实现有序的排行榜或范围统计。