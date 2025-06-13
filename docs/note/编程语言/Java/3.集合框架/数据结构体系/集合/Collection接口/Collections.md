# [Collections](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Collections.html)

此类仅包含对集合进行操作或返回集合的静态方法。它包含对集合、“包装器”进行操作的多态算法，“包装器”返回由指定集合支持的新集合，以及其他一些零碎的东西。

如果提供给它们的集合或类对象为空，则此类的方法都会抛出 `NullPointerException`。

在 Java 中，`Collections` 是一个 **工具类**，位于 `java.util` 包中，用于操作和增强集合类（如 `List`、`Set` 和 `Map`）。它提供了 **静态方法**，用于对集合进行常见操作，例如排序、搜索、同步化和不可变化等。

注意：`Collections` 是一个工具类，而 **`Collection` 是接口**，`Collection` 是 Java 集合框架的根接口，扩展出了 `List`、`Set` 等接口。


| 分类        | 方法示例                                      |
| --------- | ----------------------------------------- |
| **排序**    | `sort()`、`reverse()`                      |
| **查找**    | `binarySearch()`、`min()`、`max()`          |
| **修改**    | `reverse()`、`shuffle()`、`fill()`、`copy()` |
| **线程安全**  | `synchronizedList()`、`synchronizedMap()`  |
| **不可变集合** | `unmodifiableList()`、`unmodifiableMap()`  |
| **快速集合**  | `emptyList()`、`singletonList()`           |
| **添加改变**  | `addAll()`、`replaceAll()`                 |

---

## 1. Collections 的作用

`Collections` 类的主要作用包括：

1. **集合的操作**：
    
    - 排序（`sort`）
    - 搜索（`binarySearch`）
    - 填充（`fill`）
    - 反转（`reverse`）
    - 打乱顺序（`shuffle`）
    - 最值查找（`min/max`）
2. **线程安全**：
    
    - 将非线程安全的集合转换为线程安全（`synchronizedList`、`synchronizedMap` 等）。
3. **不可变集合**：
    
    - 创建不可修改的集合（`unmodifiableList`、`unmodifiableMap` 等）。
4. **空集合与单元素集合**：
    
    - 快速创建空集合（`emptyList`、`emptySet` 等）。
    - 快速创建只包含一个元素的集合（`singletonList`、`singletonMap` 等）。
5. **自定义功能**：
    
    - 自定义比较器操作集合（`sort` 方法支持传入 `Comparator`）。
    - 批量操作（`addAll` 等）。

## 2. Collections 的常用方法

以下是 `Collections` 类中的主要方法和用途：

### 1) 排序相关方法

#### sort(List`<T>` list)
- 对 `List` 进行 **自然排序**（基于元素的 `Comparable` 接口实现）。
- 时间复杂度：O(nlog⁡n)（基于==归并排序==）。
- 示例：
```java
List<Integer> list = new ArrayList<>(Arrays.asList(5, 2, 9, 1));
Collections.sort(list);
System.out.println(list); // 输出: [1, 2, 5, 9]
```
#### sort(List`<T>` list, Comparator`<? super T>` c)

- 对 `List` 进行 **自定义排序**，需要传入比较器。
- 示例：
```java
List<String> list = new ArrayList<>(Arrays.asList("apple", "banana", "cherry"));
Collections.sort(list, (a, b) -> b.compareTo(a)); // 按降序排序
System.out.println(list); // 输出: [cherry, banana, apple]
```

---

### 2) 查找相关方法

#### binarySearch(List`<? extends Comparable<? super T>>` list, T key)

- 使用二分查找在有序列表中查找元素，返回其索引。
- 注意：列表必须是 **升序排序**，否则结果不正确。
- 示例：
```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
int index = Collections.binarySearch(list, 3);
System.out.println(index); // 输出: 2
```

#### binarySearch(List`<T>` list, T key, Comparator`<? super T>` c)

- 使用自定义比较器进行二分查找。
- 示例：
```java
List<String> list = Arrays.asList("apple", "banana", "cherry");
int index = Collections.binarySearch(list, "banana", Comparator.naturalOrder());
System.out.println(index); // 输出: 1
```
---

#### **3) 修改集合的方法**

#### reverse(List`<?>` list)

- 反转 `List` 的顺序。
- 示例：
```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4));
Collections.reverse(list);
System.out.println(list); // 输出: [4, 3, 2, 1]
```

#### shuffle(List`<?>` list)

- 随机打乱集合顺序。
- 示例：
```java
List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4));
Collections.shuffle(list);
System.out.println(list); // 输出: 随机顺序，例如 [3, 1, 4, 2]
```

#### fill(List`<? super T>` list, T obj)

- 将 `List` 中的所有元素替换为指定对象。
- 示例：
```java
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c"));
Collections.fill(list, "z");
System.out.println(list); // 输出: [z, z, z]
```

#### copy(List`<? super T>` dest, List`<? extends T>` src)

- 将源列表的内容复制到目标列表中。
- 注意：目标列表必须足够大，否则会抛出异常。
- 示例：
```java
List<String> src = Arrays.asList("a", "b", "c");
List<String> dest = Arrays.asList("x", "y", "z");
Collections.copy(dest, src);
System.out.println(dest); // 输出: [a, b, c]
```

---

### 4) 获取最值

#### min(Collection`<? extends T>` coll)

- 获取集合中的最小值（基于自然顺序）。
- 示例：
```java
List<Integer> list = Arrays.asList(5, 2, 9, 1);
int min = Collections.min(list);
System.out.println(min); // 输出: 1
```

#### max(Collection`<? extends T>` coll)

- 获取集合中的最大值（基于自然顺序）。
- 示例：
```java
int max = Collections.max(list);
System.out.println(max); // 输出: 9
``` 

#### min(Collection`<? extends T>` coll, Comparator`<? super T>`comp)

- 使用自定义比较器查找最小值。
- 示例：
```java
String min = Collections.min(list, Comparator.reverseOrder());
System.out.println(min); // 输出: "cherry"
```

---

### 5) 创建线程安全集合

#### synchronizedList(List`<T>` list)

- 返回线程安全的 `List`。
- 示例：
```java
List<Integer> list = Collections.synchronizedList(new ArrayList<>());
synchronized (list) {
    list.add(1);
    list.add(2);
}
```

#### synchronizedMap(Map<K, V> map)

- 返回线程安全的 `Map`。
- 示例：
```java
Map<String, String> map = Collections.synchronizedMap(new HashMap<>());
synchronized (map) {
    map.put("key", "value");
}
```

---

### 6) 创建不可修改集合

#### unmodifiableList(List`<? extends T>` list)

- 创建不可修改的 `List`，对该集合的修改操作会抛出 `UnsupportedOperationException`。
- 示例：
```java
List<String> list = Collections.unmodifiableList(Arrays.asList("a", "b", "c"));
System.out.println(list); // 输出: [a, b, c]
// list.add("d"); // 抛出异常
```

#### unmodifiableMap(Map`<? extends K, ? extends V>` map)

- 创建不可修改的 `Map`。
- 示例：
```java
Map<String, String> map = Collections.unmodifiableMap(Map.of("key", "value"));
System.out.println(map); // 输出: {key=value}
```

---

### 7) 快速创建集合

#### emptyList() / emptySet() / emptyMap()

- 创建一个空的集合。
```java
List<String> emptyList = Collections.emptyList();
```

#### singletonList(T o)

- 创建一个只包含单个元素的 `List`。
- 示例：
```java
List<String> single = Collections.singletonList("onlyOne");
```

---

### 8）添加
#### addAll(Collection`<? super T>` c, T... elements)
将所有指定元素添加到指定集合。

要添加的元素可以单独指定或指定为数组。此便捷方法的行为类似于 `c.addAll(Collections.unmodifiableList(Arrays.asList(elements)))` 的行为。


