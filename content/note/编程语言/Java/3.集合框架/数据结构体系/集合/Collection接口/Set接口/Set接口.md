# [Set接口](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Set.html)

在 Java 中，`Set` 接口表示一个**不包含重复元素**的集合。它继承自 `Collection` 接口，主要用于存储不重复的对象。`Set` 接口的实现类包括 `HashSet`、`LinkedHashSet`、`TreeSet` 等，它们各自具有不同的特性和应用场景。

## `Set` 接口的主要特点

- **不重复**：`Set` 集合中的每个元素都是唯一的，不能包含重复的元素。
- **无序**：`Set` 不保证元素的存储顺序，具体顺序取决于其实现类。例如，`HashSet` 不保证顺序，`LinkedHashSet` 按照插入顺序保存，`TreeSet` 按照自然顺序或指定的比较器排序。
- **无索引**：与 `List` 不同，`Set` 没有索引，不能通过索引来获取元素。
## 常见实现类

- **HashSet**  无序，不重复，无索引
- **LinkedHashSet**  ==有序==，不重复，无索引
- **TreeSet**  ==可排序==，不重复，无索引

## Set 的常用方法(继承自Collecton)

### **`int size()`**
返回集合中的元素个数。

### **`boolean add(E e)`**
向集合中添加元素，若元素已存在，返回 `false`。

### **`boolean addAll(Collection<? extends E> c)`**
将指定集合中的所有元素添加到当前集合中。

### **`boolean remove(Object o)`**
从集合中移除指定的元素。

### **`boolean contains(Object o)`**
检查集合中是否包含指定的元素。

### **`boolean isEmpty()`**
检查集合是否为空。

### **`void clear()`**
清空集合中的所有元素。

### **`Iterator<E> iterator()`**
返回集合的迭代器，用于遍历集合中的元素。

