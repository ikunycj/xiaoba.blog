# [`List` 接口详解](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/List.html)

>[!特点]
>1.有序
>2.可重复
>3.有索引(比collection多了很多索引操作方法)

>[!特有(相对于Collection)操作方法]
>add(int index,E element)
>remove(int index)
>set(int index)
>get(int index)

在 Java 中，`List` 是一个接口，定义了集合框架中有序的集合类型，允许存储 **重复元素** 并保证元素的 **插入顺序**。它是 Java 集合框架中的一个核心接口，继承自 `Collection` 接口，作为一个有序集合，`List` 提供了根据索引访问元素的能力。

## 1. **`List` 接口的概述**

`List` 接口在 `java.util` 包中定义，它是 `Collection` 接口的子接口之一。与 `Set` 不同，`List` 允许存储重复元素，并且可以按照元素插入的顺序来访问数据。因此，`List` 是一个非常重要的集合类型，广泛用于各种应用场景。

### `List` 接口的一些主要特性：

- **有序性**：`List` 中的元素是有序的，它们的顺序与它们插入 `List` 时的顺序一致。
- **允许重复元素**：`List` 允许存储重复的元素，这与 `Set` 的唯一性要求不同。
- **按索引访问元素**：`List` 提供基于索引的访问方法，可以通过索引访问元素，而不像 `Set` 只能通过迭代访问。
- **支持位置插入和删除**：`List` 允许在任意位置插入或删除元素，支持插入/删除操作时按照元素顺序移动。

## 2. **`List` 接口中的方法**

`List` 接口继承了 `Collection` 接口的方法，并且扩展了许多与位置相关的方法。以下是 `List` 接口中的主要方法：

### **元素操作方法**

#### `add`
- **`boolean add(E e)`**：将指定的元素添加到 `List` 的末尾。
```java
list.add("apple");  // 添加 "apple" 到列表的末尾
```

- **`void add(int index, E element)`**：将指定的元素插入到列表的指定位置。后面的元素会被移动。
```java
list.add(1, "banana");  // 在索引 1 处插入 "banana"
```

#### `get`
- **`E get(int index)`**：返回指定位置的元素。
```java
String element = list.get(0);  // 获取索引 0 处的元素
```

#### `set`
- **`E set(int index, E element)`**：用指定元素替换列表中指定位置的元素。
```java
String element = list.get(0);  // 获取索引 0 处的元素
```

#### `remove`
- **`E remove(int index)`**：删除指定位置的元素，并==返回被删除的元素==。后面的元素会向前移动。
```java
String removedElement = list.remove(0);  // 删除索引 0 处的元素并返回它
```

- **`boolean remove(Object o)`**：删除列表中的指定元素（如果存在）。如果有多个相同元素，只会删除第一个找到的。
```java
list.remove("banana");  // 删除 "banana"
```

#### `indexOf`
- **`int indexOf(Object o)`**：返回指定元素在列表中首次出现的位置。如果元素不存在，返回 -1。
```java
int index = list.indexOf("apple");  // 获取 "apple" 在列表中的索引
```

- **`int lastIndexOf(Object o)`**：返回指定元素在列表中最后一次出现的位置。如果元素不存在，返回 -1。
```java
int lastIndex = list.lastIndexOf("apple");  // 获取 "apple" 最后一次出现的位置
```

### **查询和修改方法**

- **`boolean contains(Object o)`**：判断列表是否包含指定的元素。
```java
boolean hasApple = list.contains("apple");  // 判断列表是否包含 "apple"
```

- **`boolean isEmpty()`**：检查列表是否为空。
```java
boolean isEmpty = list.isEmpty();  // 判断列表是否为空
```

- **`int size()`**：返回列表中的元素个数。
```java
int size = list.size();  // 获取列表的大小
```
- **`void clear()`**：清空列表中的所有元素。
```java
list.clear();  // 清空列表
```

### **迭代器和遍历**

- **`ListIterator<E> listIterator()`**：返回一个 `ListIterator`，它是一个专门用于 `List` 的迭代器，支持在列表中前后遍历。
```java
ListIterator<String> iterator = list.listIterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

- **`for-each` 遍历**：`List` 支持增强的 `for` 循环遍历。
```java
for (String fruit : list) {
    System.out.println(fruit);
}
```

- **`forEach()`**：`List` 接口继承了 `Iterable` 接口，因此可以使用 `forEach()` 方法进行遍历。
```java
list.forEach(fruit -> System.out.println(fruit));
```

### **排序**
- `void sort(Comparator<? super E> c)` 根据指定的 [`Comparator`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Comparator.html "interface in java.util") 引起的顺序对该列表进行排序。
## 3. **`List` 接口的实现类**

Java 提供了多个实现 `List` 接口的类，这些类根据不同的需求提供了不同的实现方式。常见的 `List` 实现类包括：

### **`ArrayList`**
- **实现方式**：基于动态数组实现。
- **特点**
    - 随机访问效率高，查询时间复杂度为 O(1)。
    - 在末尾添加元素时，插入时间复杂度为 O(1)，但在中间或开头插入/删除元素时，时间复杂度为 O(n)，因为需要移动元素。
    - 如果需要频繁访问元素，`ArrayList` 是首选。


### **`LinkedList`**
- **实现方式**：基于双向链表实现。
- **特点**：
    
    - 在中间或开头插入、删除元素时非常高效，时间复杂度为 O(1)。
    - 由于需要遍历链表，随机访问效率较低，查询时间复杂度为 O(n)。
    - 如果需要频繁插入或删除元素，尤其是在列表中间，`LinkedList` 是更好的选择。


### **`Vector`**
- **实现方式**：基于动态数组实现，类似于 `ArrayList`。
- **特点**：
    - 线程安全，通过同步机制保证==线程安全==，但由于同步机制的开销，==性能较差==，通常==不推荐==使用。
    - 在现代 Java 中，`Vector` 的使用已经被 `ArrayList` 所取代。

#### **`Stack`**
- **实现方式**：继承自 `Vector`，实现栈的行为。
- **特点**：
    - 提供了类似栈的操作，如 `push`、`pop` 和 `peek` 等。
    - 通常建议使用 `Deque` 作为栈的替代品（例如：`ArrayDeque`）。


## 4. **`List` 与其他集合接口的区别**

- **`List` vs `Set`**：
    
    - `List` 允许元素重复，而 `Set` 不允许重复。
    - `List` 保证元素的插入顺序，而 `Set` 不保证顺序（`HashSet` 不保证顺序，`LinkedHashSet` 保证插入顺序，`TreeSet` 会按元素排序）。
    - `List` 支持通过索引来访问元素，而 `Set` 不支持索引访问。
- **`List` vs `Queue`**：
    
    - `Queue` 用于存储元素并按特定顺序处理元素（通常是先进先出）。而 `List` 是一个可以存储元素并按索引访问的有序集合。
    - `Queue` 更强调出队和入队操作，适用于队列的场景，而 `List` 更多用于随机访问和按位置修改元素。
- **`List` vs `Deque`**：
    
    - `Deque` 是一个双端队列，允许从两端添加和删除元素，而 `List` 仅允许从一端添加元素（即尾部）。
    - `Deque` 支持栈和队列两种操作，而 `List` 只适合用来随机访问和按顺序插入删除。

## 5. **总结**

`List` 是 Java 集合框架中非常重要的一个接口，它提供了有序且允许重复元素的集合类型。`List` 的常见实现类包括 `ArrayList` 和 `LinkedList`，它们适用于不同的应用场景。理解 `List` 的使用场景和性能特点有助于在 Java 编程中做出更合适的选择。