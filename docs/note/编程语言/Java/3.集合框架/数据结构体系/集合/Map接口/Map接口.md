# [Map](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Map.html)
将键映射到值的对象。map==不能包含重复的键==；每个键最多可以映射到一个值。


在 Java 中，`Map` 是一个用于存储 **键值对（Key-Value）** 的接口，每个键对应唯一的值。它是 `java.util` 包的一部分。`Map` 不允许键重复，但允许值重复。常见的实现类包括 `HashMap`、`TreeMap`、`LinkedHashMap` 等。

>[!双列集合特点]
>1.双列集合一次需要存一对数据(即键值对)
>2.键不可以重复，值可以重复
>3.键和值唯一对应，每一个键对应一个值
>4.键+值，称为”键值对“或者”键值对对象“，在java中叫"`Entry`"

>[!注意]
如果将可变对象用作映射键，则必须格外小心。如果对象的值以影响 `equals` 比较的方式更改，而对象是map中的键，则未指定map的行为。此禁令的一个特例是map不允许将自身包含为键。虽然允许映射将自身包含为值，但建议格外小心：`equals` 和 `hashCode` 方法在此类映射上不再明确定义。


## Map 的主要特性

1. **键唯一性**：
    
    - 每个键必须唯一，否则会覆盖先前的键值对。
    - 键可以为 `null`（例如，在 `HashMap` 中允许一个键为 `null`）。
2. **高效访问**：
    
    - 通过键来快速访问值，具有较高的查找效率。
3. **常见的实现类**：
    
    - **`HashMap`**：基于哈希表实现，允许键和值为 `null`，无序。
    - **`TreeMap`**：基于红黑树实现，键值对有序（自然顺序或自定义比较器）。
    - **`LinkedHashMap`**：基于双向链表实现，保持插入顺序。

---
## 内部接口
### Map.Entry
## Map 的主要方法

以下是 `Map` 接口中常用方法的详细说明：

---

###  1. of()

- **描述**：返回一个不可修改的 `Map`，包含提供的键值对。
- **参数**：`(K, V)` 键值对，可以是 0 到 10 个。
- **注意**：如果键重复，会抛出 `IllegalArgumentException`，且返回的 `Map` 是不可修改的。

---

### 2. ofEntries()

- **描述**：返回一个不可修改的 `Map`，包含多个 `Map.Entry`。
- **参数**：一个或多个 `Map.Entry` 对象。
- **注意**：与 `of()` 方法类似，`ofEntries()` 也会抛出重复键的异常。

---

### 3. entrySet()

- **描述**：返回此 `Map` 中所有键值对的集合（`Set<Map.Entry<K,V>>`）。
- **返回值**：键值对的集合视图（`Set<Map.Entry<K,V>>`）。
---

### 4. keySet()

- **描述**：返回此 `Map` 中所有键的集合（`Set<K>`）。
- **返回值**：键的集合视图。

---

### 5. values()

- **描述**：返回此 `Map` 中所有值的集合（`Collection<V>`）。
- **返回值**：值的集合视图。

---

### 6. get(Object key)

- **描述**：根据键获取对应的值。
- **参数**：`key`：键。
- **返回值**：键对应的值。如果键不存在，返回 `null`。

---

### 7. put(K key, V value)

- **描述**：将键值对插入到 `Map` 中。如果键已经存在，则更新对应的值。
- **参数**：
    - `key`：键。
    - `value`：值。
- **返回值**：如果键已经存在，返回之前的值；否则返回 `null`。

---

### putAll(Map`<? extends K, ? extends V>` m)

- **描述**：将另一个 `Map` 中的所有键值对插入到当前 `Map` 中。
- **参数**：另一个 `Map`。

---

### 9. remove(Object key)

- **描述**：根据`键`移除`键值对`。
- **参数**：`key`：要移除的键。
- **返回值**：被移除键的值。如果键不存在，返回 `null`。

---

### 10. containsKey(Object key)

- **描述**：检查 `Map` 是否包含指定的键。
- **参数**：`key`：要检查的键。
- **返回值**：`true` 如果存在；`false` 如果不存在。


---

### 11. containsValue(Object value)

- **描述**：检查 `Map` 是否包含指定的值。
- **参数**：`value`：要检查的值。
- **返回值**：`true` 如果存在；`false` 如果不存在。

---

### 12. isEmpty()

- **描述**：检查 `Map` 是否为空。
- **返回值**：`true` 如果为空；`false` 如果不为空。

---

### 13. size()

- **描述**：返回 `Map` 中的键值对数量。
- **返回值**：`Map` 中键值对的数量。

---

### 14. clear()

- **描述**：移除 `Map` 中的所有键值对。

---

### 15. compute(K key, BiFunction`<? super K, ? super V, ? extends V>` remappingFunction)

- **描述**：根据键和一个函数，重新计算键的值。如果键不存在，可以添加新的值。

## Map集合的遍历方式
在 Java 中，`Map` 集合提供了多种遍历方式，用于访问键（key）、值（value）或键值对（key-value pair）。以下是常用的几种遍历方法及示例代码：

---

### 1. 使用 `entrySet()` 遍历键值对

`entrySet()` 方法返回一个包含所有键值对的 `Set<Map.Entry<K,V>>`，可以通过增强 for 循环或迭代器遍历。

#### **代码示例：增强 for 循环**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
}
// 输出：
// Key: key1, Value: 1
// Key: key2, Value: 2
// Key: key3, Value: 3
```
#### **代码示例：迭代器遍历**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
Iterator<Map.Entry<String, Integer>> iterator = map.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<String, Integer> entry = iterator.next();
    System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
}
```
---

### **2. 使用 `keySet()` 遍历所有键**

`keySet()` 方法返回一个包含所有键的 `Set<K>`，可以通过增强 for 循环或迭代器进行遍历。

#### **代码示例：增强 for 循环**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
for (String key : map.keySet()) {
    System.out.println("Key: " + key);
}
// 输出：
// Key: key1
// Key: key2
// Key: key3
```

#### **代码示例：迭代器遍历**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
Iterator<String> iterator = map.keySet().iterator();
while (iterator.hasNext()) {
    String key = iterator.next();
    System.out.println("Key: " + key);
}
```
---

### **3. 使用 `values()` 遍历所有值**

`values()` 方法返回一个包含所有值的 `Collection<V>`，可以通过增强 for 循环或迭代器遍历。

#### **代码示例：增强 for 循环**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
for (Integer value : map.values()) {
    System.out.println("Value: " + value);
}
// 输出：
// Value: 1
// Value: 2
// Value: 3
```

#### **代码示例：迭代器遍历**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
Iterator<Integer> iterator = map.values().iterator();
while (iterator.hasNext()) {
    Integer value = iterator.next();
    System.out.println("Value: " + value);
}
```
---

### **4. 使用 `forEach()` 方法（Java 8 引入）**

Java 8 开始，`Map` 接口支持 `forEach()` 方法，可以使用 Lambda 表达式对每个键值对进行操作。

#### **代码示例**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
map.forEach((key, value) -> {
    System.out.println("Key: " + key + ", Value: " + value);
});
// 输出：
// Key: key1, Value: 1
// Key: key2, Value: 2
// Key: key3, Value: 3
```

---

### **5. 使用流（Stream API）遍历（Java 8 引入）**

可以使用 `Stream API` 对 `Map` 进行遍历和操作，比如过滤、排序等。

#### **代码示例：通过 `entrySet` 转为流**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
map.entrySet().stream()
    .forEach(entry -> System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue()));
```

#### **代码示例：过滤并打印**
```java
Map<String, Integer> map = Map.of("key1", 1, "key2", 2, "key3", 3);
map.entrySet().stream()
    .filter(entry -> entry.getValue() > 1) // 过滤值大于1的键值对
    .forEach(entry -> System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue()));
// 输出：
// Key: key2, Value: 2
// Key: key3, Value: 3
```
---

### **6. 使用 `Iterator` 遍历并修改 Map**

如果需要在遍历过程中修改 `Map`（例如，删除某些键值对），可以使用 `Iterator`。

#### **代码示例**
```java
Map<String, Integer> map = new HashMap<>();
map.put("key1", 1);
map.put("key2", 2);
map.put("key3", 3);

Iterator<Map.Entry<String, Integer>> iterator = map.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<String, Integer> entry = iterator.next();
    if (entry.getValue() < 2) {
        iterator.remove(); // 删除值小于 2 的键值对
    }
}
System.out.println(map); // 输出: {key2=2, key3=3}
```

---

### **总结**

|方法|优点|使用场景|
|---|---|---|
|`entrySet()`|遍历键值对，最常用的方式|当需要同时访问键和值时|
|`keySet()`|只遍历键，效率高|只关心键时|
|`values()`|只遍历值，效率高|只关心值时|
|`forEach()`|简洁优雅，利用 Lambda 表达式|使用 Java 8 或以上版本|
|`Stream API`|灵活强大，可过滤、排序等|需要对数据进行操作或过滤时|
|`Iterator`|遍历时支持安全删除|遍历中需要修改或删除键值对|

根据具体需求选择最适合的遍历方式！



















