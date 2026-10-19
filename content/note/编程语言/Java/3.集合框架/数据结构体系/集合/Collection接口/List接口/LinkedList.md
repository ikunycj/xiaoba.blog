# [LinkedList](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/LinkedList.html)

`LinkedList` 是 Java 中的一个重要类，属于 `java.util` 包，它实现了 **List** 和 **Deque** 接口，支持作为`双向链表`和队列使用。`LinkedList` 通常被用来处理动态插入和删除的情况。

---

## 1. 定义与继承结构

`LinkedList` 的继承结构如下：
```java
java.lang.Object
   ↳ java.util.AbstractCollection<E>
       ↳ java.util.AbstractList<E>
           ↳ java.util.AbstractSequentialList<E>
               ↳ java.util.LinkedList<E>
```

实现的接口：
```java
java.util.List<E>
java.util.Deque<E>
java.util.Queue<E>
java.io.Serializable
java.lang.Cloneable
```

- **List 接口**：支持按索引存取元素。
- **Deque 接口**：支持双端队列功能，可以从两端插入或删除元素。
- **Queue 接口**：支持队列操作。
- **Serializable**：可以被序列化。
- **Cloneable**：可以克隆。

---

## 2. `LinkedList` 的特点

- **底层实现**：双向链表（每个节点都有对前驱节点和后继节点的引用）。
- **动态性**：链表长度可以随插入和删除动态调整，不需要预先分配存储空间。
- **性能**：
    - 插入和删除（特别是在头部或尾部）效率高，时间复杂度为 O(1)。
    - 随机访问效率低，时间复杂度为 O(n。
- **线程不安全**：`LinkedList` 不是线程安全的，若在多线程环境中使用需手动同步。

---

## 3. 核心方法

以下是 `LinkedList` 的核心方法，分为列表操作（List）、队列操作（Queue/Deque）和栈操作（Deque），以统一格式展示。

---

### 列表操作（List 接口的方法）

#### **void add(E e)**
将元素添加到列表的末尾。  
```java
list.add("A");
```

#### **void add(int index, E e)**
在指定索引位置插入元素，后续元素向后移动。  
```java
list.add("A");
```
#### **E get(int index)**
返回指定索引位置的元素。  
```java
String element = list.get(0);
```
### **E remove(int index)**
移除指定索引处的元素，并返回该元素。  
```java
String removed = list.remove(1);
```
#### **int size()**
返回列表中元素的个数。  

#### **boolean contains(Object o)**
判断列表是否包含指定的元素，返回 `true` 或 `false`。  

#### **int indexOf(Object o)**
返回指定元素在列表中首次出现的索引（若不存在则返回 -1）。  


---

### 队列操作（Deque 和 Queue 的方法）

#### **void addFirst(E e)**
将元素添加到链表的头部。  
#### **void addLast(E e)**
将元素添加到链表的尾部。  

#### **E getFirst()**
获取链表头部的元素（不移除）。若链表为空，则抛出 `NoSuchElementException`。  

#### **E getLast()**
获取链表尾部的元素（不移除）。若链表为空，则抛出 `NoSuchElementException`。  

#### **E removeFirst()**
移除并返回链表头部的元素。若链表为空，则抛出 `NoSuchElementException`。  

#### **E removeLast()**
移除并返回链表尾部的元素。若链表为空，则抛出 `NoSuchElementException`。  

#### **E peek()**
获取链表的头部元素（不移除）。若链表为空，返回 `null`。  

#### **E poll()**
==移除==并返回链表的头部元素。若链表为空，返回 `null`。  

#### **boolean offer(E e)**
将元素添加到链表尾部，返回 `true` 表示成功。  

---

### 栈操作（Deque 提供的方法）

#### **void push(E e)**
将元素压入栈顶（链表头部）。  

#### **E pop()**
移除并返回栈顶元素（链表头部元素）。若栈为空，则抛出 `NoSuchElementException`。  

#### **E peek()**
查看栈顶元素（链表头部元素），但不移除。若栈为空，返回 `null`。  

---

### 完整方法分类总结

#### **通用操作**

|方法|描述|
|---|---|
|`boolean isEmpty()`|检查链表是否为空。|
|`int size()`|返回链表中元素的数量。|
|`boolean contains(Object o)`|检查链表是否包含某个元素。|

#### **列表特有操作**

|方法|描述|
|---|---|
|`void add(E e)`|添加元素到链表尾部。|
|`void add(int index, E e)`|在指定索引插入元素。|
|`E get(int index)`|获取指定索引处的元素。|
|`E remove(int index)`|移除指定索引处的元素。|

#### **队列特有操作**

|方法|描述|
|---|---|
|`void addFirst(E e)`|在链表头部添加元素。|
|`void addLast(E e)`|在链表尾部添加元素。|
|`E getFirst()`|获取链表头部的元素（不移除）。|
|`E getLast()`|获取链表尾部的元素（不移除）。|
|`E removeFirst()`|移除并返回链表头部的元素。|
|`E removeLast()`|移除并返回链表尾部的元素。|
|`E peek()`|获取但不移除链表头部元素，若为空返回 `null`。|
|`E poll()`|获取并移除链表头部元素，若为空返回 `null`。|

#### **栈特有操作**

|方法|描述|
|---|---|
|`void push(E e)`|将元素压入栈顶（链表头部）。|
|`E pop()`|移除并返回栈顶元素。|
|`E peek()`|获取栈顶元素但不移除。|

---

## 4. 应用场景

1. **作为列表**：
    - 需要频繁插入或删除操作时，`LinkedList` 比 `ArrayList` 性能更优。
    - 使用 `ArrayList` 比较适合随机访问（时间复杂度 O(1)O(1)O(1)）。
2. **作为队列**：
    
    - 用于实现队列操作，例如任务排队、消息队列等。
3. **作为栈**：
    
    - 可以用 `LinkedList` 模拟栈，使用 `push()` 和 `pop()` 方法。

---
## 5. 注意事项

1. **性能差异**：
    
    - `LinkedList` 的插入、删除操作快，但随机访问效率低。
    - 若只需要快速随机访问，推荐使用 `ArrayList`。
2. **线程安全性**：
    
    - `LinkedList` 是非线程安全的。如果需要在多线程环境中使用，可以使用 `Collections.synchronizedList()` 或其它线程安全的数据结构（如 `CopyOnWriteArrayList`）。

