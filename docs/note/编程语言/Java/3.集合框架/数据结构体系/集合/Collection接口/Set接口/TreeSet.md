# [TreeSet](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/TreeSet.html)

`TreeSet` 是 Java 集合框架中的一个实现了 `NavigableSet` 接口的类，==基于红黑树==（自平衡二叉搜索树）实现，用于存储有序且不重复的元素。

### 主要特点

- **有序性**：`TreeSet` 中的元素按照其自然顺序（需实现 `Comparable` 接口）或通过提供的 `Comparator` 进行排序。
- **唯一性**：不允许存储重复的元素。
- **非线程安全**：在多线程环境下，需手动同步以确保线程安全。
- **不允许 `null` 元素**：由于需要进行排序，`TreeSet` 不支持存储 `null` 值，否则会抛出 `NullPointerException`。

## 常用方法
### **`int size()`**
返回此集合中的元素数。

### **`boolean add(E e)`**
将指定的元素添加到集合中（如果尚未存在）。

### **`boolean addAll(Collection<? extends E> c)`**
将指定集合中的所有元素添加到此集合中。

### **`E ceiling(E e)`**
返回此集合中大于等于给定元素的最小元素；如果不存在这样的元素，则返回 `null`。

### **`void clear()`**
移除此集合中的所有元素。

### **`Object clone()`**
返回此 `TreeSet` 实例的浅表副本。

### **`Comparator<? super E> comparator()`**
返回对此集合中的元素进行排序的比较器；

如果此集合使用其元素的自然顺序，  `null`。

### **`boolean contains(Object o)`**
如果此集合包含指定的元素，则返回 `true`。

### **`Iterator<E> descendingIterator()`**
返回在此集合元素的降序视图上进行迭代的迭代器。

### **`NavigableSet<E> descendingSet()`**
返回此集合中元素的逆序视图。

### **`E first()`**
返回此集合中的第一个（最低）元素。

### **`E floor(E e)`**
返回此集合中小于等于给定元素的最大元素；如果不存在这样的元素，则返回 `null`。

### **`SortedSet<E> headSet(E toElement)`**
返回此集合的部分视图，其元素严格小于 `toElement`。

### **`NavigableSet<E> headSet(E toElement, boolean inclusive)`**
返回此集合的部分视图，其元素小于（或等于，如果 `inclusive` 为 `true`）`toElement`。

### **`E higher(E e)`**
返回此集合中严格大于给定元素的最小元素；如果不存在这样的元素，则返回 `null`。

### **`boolean isEmpty()`**
如果此集合不包含元素，则返回 `true`。

### **`Iterator<E> iterator()`**
返回在此集合中的元素上按升序进行迭代的迭代器。

### **`E last()`**
返回此集合中的最后一个（最高）元素。

### **`E lower(E e)`**
返回此集合中严格小于给定元素的最大元素；如果不存在这样的元素，则返回 `null`。

### **`E pollFirst()`**
检索并移除此集合的第一个（最低）元素；如果此集合为空，则返回 `null`。

### **`E pollLast()`**
检索并移除此集合的最后一个（最高）元素；如果此集合为空，则返回 `null`。

### **`boolean remove(Object o)`**
从此集合中移除指定的元素（如果存在）。

### **`NavigableSet<E> subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive)`**
返回此集合的部分视图，其元素范围从 `fromElement`（包括或不包括，取决于 `fromInclusive`）到 `toElement`（包括或不包括，取决于 `toInclusive`）。

### **`SortedSet<E> subSet(E fromElement, E toElement)`**
返回此集合的部分视图，其元素范围从 `fromElement`（包括）到 `toElement`（不包括）。

### **`SortedSet<E> tailSet(E fromElement)`**
返回此集合的部分视图，其元素大于等于 `fromElement`。

### **`NavigableSet<E> tailSet(E fromElement, boolean inclusive)`**
返回此集合的部分视图，其元素大于（或等于，如果 `inclusive` 为 `true`）`fromElement`。

## TreeSet比较
1. 默认排序/自然排序：javabean类实现Comparable接口指定排序规则
2. 比较器排序：创建TreeSet对象的时候，传递比较器Comparator指定规则

- 默认使用第一种方式，如果第一种无法满足，使用第二种 