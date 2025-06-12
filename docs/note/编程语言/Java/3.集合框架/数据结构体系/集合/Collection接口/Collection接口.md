# [Collection](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Collection.html)
## **Java 中的 `Collection` 接口**

`Collection` 是 Java 集合框架中的一个顶级接口，表示一组对象的集合。它是 **集合框架的根接口**，几乎所有的集合类（如 `List`、`Set` 和 `Queue`）都直接或间接继承自这个接口。

---

### **1. `Collection` 接口的基本特性**
1. **类型安全：**
    - 从 Java 5 开始，`Collection` 使用 **泛型** 来确保类型安全。
    - 例如：`Collection<String>` 表示一个字符串集合。
2. **抽象化：**
    - `Collection` 是一个接口，不能直接实例化。
    - 通常使用它的子接口（如 `List` 或 `Set`）的实现类（如 `ArrayList` 或 `HashSet`）。
3. **子接口：**
    - 主要的子接口有：
        - **`List`：** 有序集合，允许重复元素。
        - **`Set`：** 无序集合，不允许重复元素。
        - **`Queue`：** 队列，按特定规则（如 FIFO）处理元素。
4. **核心方法：**
    - `Collection` 提供了操作集合的通用方法，例如添加、删除、清空、判断是否为空等。

---

### **2. `Collection` 接口的常用方法**
### **boolean add(E e)**
向集合中添加元素。如果集合因添加此元素发生变化，返回 `true`。

### **boolean addAll(Collection`<? extends E>` c)**
将另一个集合的所有元素添加到当前集合中，集合发生变化时返回 `true`。

### **void clear()**
清空集合中的所有元素。

### **boolean contains(Object o)**
判断集合中是否包含某个元素。
>[!注意]
>contans方法底层通过Objects.equals方法判断是否一致的，如果是自定义`对象`，需要重写contans方法
### **boolean containsAll(Collection`<?>` c)**
判断集合是否包含另一个集合的所有元素。

### **boolean isEmpty()**
判断集合是否为空。

### **Iterator`<E>` iterator()**
返回一个用于遍历集合的 **迭代器** 对象。

### **boolean remove(Object o)**
从集合中移除某个元素（如果存在）。

### **boolean removeAll(Collection`<?>` c)**
从集合中移除另一个集合中所有的元素。

### **boolean retainAll(Collection`<?>` c)**
保留集合中与另一个集合共有的元素，删除不在另一个集合中的元素。

### **int size()**
返回集合中的元素个数。

### **Object`[]` toArray()**
将集合转换为一个数组（`Object` 类型）。

### **`<T>` T[] toArray(T[] a)**
将集合转换为一个指定类型的数组。

## 遍历方式
在 Java 中，`Collection` 接口为各种集合（如 `List`、`Set` 等）提供了通用的操作方式。遍历 `Collection` 的通用方式主要有以下几种：

---

### **1. 使用 `Iterator` 迭代器**
- **描述：** `Iterator` 是 Java 提供的通用迭代器，适用于所有实现了 `Collection` 接口的集合类。
    
- **代码示例：**
```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class IteratorExample {
    public static void main(String[] args) {
        Collection<String> collection = new ArrayList<>();
        collection.add("Apple");
        collection.add("Banana");
        collection.add("Cherry");
		
		// 获取迭代器对象
        Iterator<String> iterator = collection.iterator(); 

        while (iterator.hasNext()) { // 判断是否还有元素
            String element = iterator.next(); // 获取下一个元素
            System.out.println(element);
        }
    }
}
```
- **输出：**
```
Apple
Banana
Cherry
```
- **优点：**
    
    - 通用性强，可以用于任何实现了 `Collection` 接口的类。
    - 在迭代过程中，可以安全地`删除`集合中的元素：
```java
iterator.remove();
```
- **注意：**
    - 使用 `iterator.remove()` 是安全的，但直接使用 `collection.remove()` 会导致 `ConcurrentModificationException`。

---

### **2. 使用增强型 `for` 循环**
- **描述：** Java 的增强型 `for` 循环（也叫 "for-each" 循环）是遍历集合的简洁方式，推荐在`只读遍历`的场景中使用。
- **底层**：`Iterator`
- **IDEA快捷生成**：`集合名.for`
- **代码示例：**
```java
import java.util.ArrayList;
import java.util.Collection;

public class ForEachExample {
    public static void main(String[] args) {
        Collection<String> collection = new ArrayList<>();
        collection.add("Apple");
        collection.add("Banana");
        collection.add("Cherry");

        for (String element : collection) {
            System.out.println(element);
        }
    }
}
```
- **输出：**
```
Apple
Banana
Cherry
```
- **优点：**
    - 简洁易用，代码更加清晰。
    - 不需要显式调用 `iterator()`。
- **注意：**
    - 增强型 `for` 循环不支持在迭代过程中修改集合（如删除元素），否则会抛出 `ConcurrentModificationException`。
    - 修改`element`(第三方变量)，不会修改集合中原本的数据

---

### **3. 使用 Stream API**

- **描述：** Java 8 引入的 `Stream API` 提供了强大的集合操作能力，可以在流式处理中完成遍历。
    
- **代码示例：**
```java
import java.util.ArrayList;
import java.util.Collection;

public class StreamExample {
    public static void main(String[] args) {
        Collection<String> collection = new ArrayList<>();
        collection.add("Apple");
        collection.add("Banana");
        collection.add("Cherry");

        // 使用 Stream 遍历
        collection.stream().forEach(System.out::println);
    }
}
```
- **输出：**
```
Apple
Banana
Cherry
```
- **优点：**
    - 可以结合 `filter`、`map` 等操作完成复杂处理。
    - 支持并行流（`parallelStream()`），适合处理大数据集合。
- **注意：**
    - `Stream` 只能处理集合中的数据，无法直接修改集合本身。

---

### **4. 使用传统 `for` 循环（仅适用于 `List` 类型）**

- **描述：** 如果集合是 `List`，可以通过索引访问元素，因此可以使用传统的 `for` 循环。
    
- **代码示例：**
```java
import java.util.ArrayList;
import java.util.List;

public class TraditionalForExample {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i)); // 使用索引访问
        }
    }
}
```
- **输出：**
```
Apple
Banana
Cherry
```
- **优点：**
    
    - 可以通过索引灵活访问和操作元素。
    - 适合需要同时访问元素索引的场景。
- **注意：**
    
    - 不适用于 `Set` 等无序集合。
    - 如果频繁使用 `get(i)`，`LinkedList` 的性能可能较低。

---

### **5. 使用 `ListIterator`（仅适用于 `List` 类型）**

- **描述：** `ListIterator` 是 `Iterator` 的子接口，专门用于遍历 `List`，支持双向遍历。
- **代码示例：**
```java
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class ListIteratorExample {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        // 使用 ListIterator 进行正向遍历
        ListIterator<String> iterator = list.listIterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }

        // 使用 ListIterator 进行反向遍历
        while (iterator.hasPrevious()) {
            System.out.println(iterator.previous());
        }
    }
}
```
- **输出：**
```
Apple
Banana
Cherry
Cherry
Banana
Apple
```
- **优点：**
    - 支持双向遍历。
    - 可以在遍历过程中动态`添加`或`删除`元素。
- **注意：**
    - 仅适用于 `List` 类型集合。

---

### **6. 使用 `Enumeration`（老式方法，适用于 `Vector` 等类）**

- **描述：** `Enumeration` 是 Java 1.0 中引入的老式方法，适用于早期的集合类（如 `Vector`、`Hashtable`）。现代集合更推荐使用 `Iterator`。
    
- **代码示例：**
```java
import java.util.Vector;
import java.util.Enumeration;

public class EnumerationExample {
    public static void main(String[] args) {
        Vector<String> vector = new Vector<>();
        vector.add("Apple");
        vector.add("Banana");
        vector.add("Cherry");

        Enumeration<String> enumeration = vector.elements();
        while (enumeration.hasMoreElements()) {
            System.out.println(enumeration.nextElement());
        }
    }
}
```
- **输出：**
```
Apple
Banana
Cherry
```
- **优点：**
    - 与早期的 Java 类兼容。
    - API 简单。
- **注意：**
    
    - `Enumeration` 功能有限，现代集合类更推荐使用 `Iterator`。

---

### **总结：通用遍历方式的对比**

| **方式**         | **适用范围**          | **优点**                     | **缺点**           |
| -------------- | ----------------- | -------------------------- | ---------------- |
| `Iterator`     | 所有集合              | 通用性强，支持安全`删除`              | 代码稍显冗长           |
| 增强型 `for` 循环   | 所有集合              | 简洁易用，代码清晰，仅遍历              | 不支持在遍历过程中修改集合    |
| `Stream` API   | 所有集合              | 功能强大，支持流式操作和并行处理           | 不适合修改集合          |
| 传统 `for` 循环    | `List` 类型         | 支持按`索引`访问和操作               | 不适用于无序集合，如 `Set` |
| `ListIterator` | `List` 类型         | 支持双向遍历，支持动态修改集合，`删除`或者`添加` | 仅适用于 `List` 类型   |
| `Enumeration`  | 早期集合类（如 `Vector`） | 与早期 Java 类兼容               | 功能有限，不推荐在现代代码中使用 |

#### **推荐使用：**

- **现代集合：**
    - 优先使用增强型 `for` 循环或 `Iterator`。
    - 对于复杂操作（如过滤、映射等），建议使用 `Stream` API。
- **旧集合类（如 `Vector`）：**
    - 使用 `Enumeration`。