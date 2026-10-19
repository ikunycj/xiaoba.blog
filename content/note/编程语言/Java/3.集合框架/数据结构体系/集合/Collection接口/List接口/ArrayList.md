# [`ArrayList` 详解](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/ArrayList.html)

`ArrayList` 是 Java 集合框架中最常用的实现之一，它实现了 `List` 接口，提供了一个可动态调整大小的数组。`ArrayList` 在需要随机访问数据时非常高效，但在频繁插入和删除操作时，相比于 `LinkedList`，它的性能较低。下面将从多个方面来详细讲解 `ArrayList`。

---

## 1. **`ArrayList` 的基本特性**

- **类型**：`ArrayList` 是一个实现了 `List` 接口的类，它存储元素的顺序与添加元素的顺序一致，允许重复的元素。
- **底层实现**：`ArrayList` 基于动态数组（`Object[]`）实现。当数组的容量满时，`ArrayList` 会自动扩展其底层数组。
- **有序**：`ArrayList` 中的元素是有序的，这意味着每个元素都有一个索引，并且可以根据索引进行访问。
- **允许 `null` 值**：`ArrayList` 允许存储 `null` 值。
- **线程不安全**：`ArrayList` 并非线程安全的。如果多个线程同时访问一个 `ArrayList`，并且其中至少一个线程修改了列表，则必须在外部进行同步。

>[!特色]
>优点：查询高效
>缺点：插入删除低效
---
## 2. **`ArrayList` 的构造方法**

`ArrayList` 提供了几种构造方法，可以根据需求创建不同容量的 `ArrayList`。
```java
ArrayList<Type> list1 = new ArrayList<>();               // 默认容量 10
ArrayList<Type> list2 = new ArrayList<>(int initialCapacity);  // 指定初始容量
ArrayList<Type> list3 = new ArrayList<>(Collection<? extends Type> c);  // 通过集合构造
```

- **`ArrayList()`**：创建一个初始容量为 10 的空列表。
- **`ArrayList(int initialCapacity)`**：创建一个具有指定初始容量的空列表。如果需要存储大量元素，建议使用此构造方法来避免多次扩容。
- **`ArrayList(Collection<? extends Type> c)`**：根据指定集合创建一个新的 `ArrayList`，并包含该集合中的所有元素。

---

## 3. **`ArrayList` 的常用方法**

### **add()**

- **`add(E e)`**：将元素添加到列表的末尾。
```java
ArrayList<Integer> list = new ArrayList<>();
list.add(1);  // 添加元素 1 到末尾
list.add(2);  // 添加元素 2 到末尾
```

- **`add(int index, E element)`**：在指定位置插入元素，后面的元素会向右移动。
```java
list.add(1, 5);  // 在索引 1 处插入元素 5，原索引 1 及之后的元素会后移
```
### **get()**
- **`get(int index)`**：根据索引获取指定位置的元素。
```java
Integer num = list.get(1);  // 获取索引 1 处的元素
```

### **set()**
- **`set(int index, E element)`**：用指定元素替换列表中指定位置的元素。
```java
list.set(1, 10);  // 将索引 1 处的元素替换为 10
```

### **remove()  clear()**
- **`remove(int index)`**：删除==指定位置的元素==，删除后，后续元素会向前移动。
```java
list.remove(1);  // 删除索引 1 处的元素
```

- **`remove(Object o)`**：删除==指定元素==，如果有多个相同元素，只删除第一个找到的元素。
```java
list.remove(Integer.valueOf(10));  // 删除元素 10
```

- **`clear()`**：删除 `ArrayList` 中的==所有元素==。
```java
list.clear();  // 清空所有元素
```

### **查询元素**
- **`contains(Object o)`**：检查列表是否包含指定元素。
```java
boolean contains = list.contains(10);  // 判断列表是否包含元素 10
```

- **`indexOf(Object o)`**：返回指定元素首次出现的位置，如果元素不存在，返回 -1。
```java
int index = list.indexOf(10);  // 获取元素 10 的索引位置
```

- **`isEmpty()`**：检查列表是否为空。
```java
boolean isEmpty = list.isEmpty();  // 判断列表是否为空
```

### **大小和容量**
- **`size()`**：返回列表中的元素个数。
```java
int size = list.size();  // 获取列表的大小
```

- **`ensureCapacity(int minCapacity)`**：==增加 `ArrayList` 的容量==，避免在添加大量元素时多次扩容。
```java
list.ensureCapacity(50);  // 确保至少有 50 个元素的空间
```

### **迭代器和遍历**
- **`iterator()`**：返回一个迭代器，用于遍历 `ArrayList`。
```java
Iterator<Integer> iterator = list.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

- **`for-each` 循环**：`ArrayList` 支持增强的 `for` 循环遍历。
```java
for (Integer num : list) {
    System.out.println(num);
}
```

---

## 4. **`ArrayList` 的性能特点**

- **查询效率**：`ArrayList` 提供基于索引的快速访问，查询时间复杂度为 O(1)。
- **插入和删除效率**：在 `ArrayList` 中，插入和删除操作的时间复杂度为 O(n)，其中 `n` 是列表的大小。插入或删除一个元素时，后续的元素需要移动，以保持数组的连续性。
- **自动扩容**：当 `ArrayList` 的容量满时，它会自动扩展其底层数组。通常扩展容量为原容量的 1.5 倍，这意味着在数据量较大的情况下，可能会有额外的内存开销。

---

## 5. **`ArrayList` 与 `LinkedList` 的对比**

| 特性      | `ArrayList`                | `LinkedList`          |
| ------- | -------------------------- | --------------------- |
| 存储方式    | 基于数组                       | 基于双向链表                |
| 访问元素    | 支持 O(1) 时间复杂度的随机访问         | 需要遍历链表，访问时间为 O(n)     |
| 插入/删除元素 | 在末尾添加元素 O(1)，在中间添加/删除 O(n) | 在任意位置插入/删除 O(1)，但需要遍历 |
| 内存开销    | 需要连续的内存块                   | 每个元素需要额外的内存存储指针       |
| 适用场景    | 随机访问多，频繁查询                 | 频繁插入/删除操作，尤其是中间位置     |

---

## 6. **`ArrayList` 扩容机制**

[ArryList源码课程](https://www.bilibili.com/video/BV17F411T7Ao?spm_id_from=333.788.player.switch&vd_source=18ca776bf16158dfccdac44dbc1b2726&p=190)

`ArrayList` 在初始时会分配一个默认容量为 10 的底层==数组==。如果添加元素的数量超过了当前容量，`ArrayList` 会将容量扩大为原来的一定比例（通常是 1.5 倍）。这种扩容的过程是耗费性能的，因为它需要分配新的数组，并将原来的元素复制过去。

例如，假设我们有一个 `ArrayList`，初始容量为 10，当我们向其中添加第 11 个元素时，`ArrayList` 会将容量扩展为 15，然后继续添加元素。每次扩容都会产生一定的性能开销，因此在创建 `ArrayList` 时，预估容量并通过 `ensureCapacity()` 方法避免不必要的扩容，可以提高效率。

---