# [Queue](https://doc.qzxdp.cn/jdk/17/zh/api/java.base/java/util/Queue.html) 

`Queue` 是 Java 集合框架中的一个重要接口，位于 `java.util` 包中。它表示一个 **先进先出（FIFO，First In First Out）** 的数据结构，即最先插入的元素会最先被移除。`Queue` 接口是 `Collection` 接口的一个子接口，专门用于表示队列。

在 Java 中，`Queue` 接口用于表示队列数据结构，它定义了在队列中常见的操作。常见的队列实现类包括 `LinkedList`、`PriorityQueue`、`ArrayDeque` 等。

### 1. `Queue` 接口的定义

`Queue` 接口继承自 `Collection` 接口，定义了队列相关的方法。以下是 `Queue` 接口的一些常用方法：
```java
public interface Queue<E> extends Collection<E> {
    // 队列中添加元素
    boolean add(E e);   // 如果队列已满，抛出 IllegalStateException

    boolean offer(E e); // 如果队列已满，返回 false，而不是抛出异常

    // 从队列中移除元素
    E remove();         // 移除并返回队列头部元素，如果队列为空，抛出 NoSuchElementException

    E poll();           // 移除并返回队列头部元素，如果队列为空，返回 null

    // 查看队列头部元素
    E element();        // 返回队列头部元素，但不移除它，如果队列为空，抛出 NoSuchElementException

    E peek();           // 返回队列头部元素，但不移除它，如果队列为空，返回 null
}
```
  
队列方法总结

| 功能  | 抛出异常                                                                                       | 返回特殊值                                                                                    |
| --- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| 插入  | [`add(e)`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Queue.html#add(E))       | [`offer(e)`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Queue.html#offer(E)) |
| 消除  | [`remove()`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Queue.html#remove())   | [`poll()`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Queue.html#poll())     |
| 检查  | [`element()`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Queue.html#element()) | [`peek()`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/util/Queue.html#peek())     |
### 2. `Queue` 的核心操作

#### 1) `add(E e)` 与 `offer(E e)`:
- **`add(E e)`**：将元素 `e` 添加到队列中。如果队列已满，抛出 `IllegalStateException`。该方法通常用于大小有限制的队列。

- **`offer(E e)`**：将元素 `e` 添加到队列中。如果队列已满，它会返回 `false`，而不会抛出异常。它通常用于支持无界队列（如 `LinkedList`）和有界队列（如 `ArrayBlockingQueue`）。

#### 2) `remove()` 与 `poll(E e)`:

- **`remove()`**：移除并返回队列头部的元素。如果队列为空，抛出 `NoSuchElementException`。

- **`poll()`**：移除并返回队列头部的元素。如果队列为空，返回 `null`。与 `remove()` 方法不同的是，`poll()` 不会抛出异常。


#### 3) `element()` 与 `peek()`:

- **`element()`**：返回队列头部的元素，但不会移除它。如果队列为空，抛出 `NoSuchElementException`

- **`peek()`**：返回队列头部的元素，但不会移除它。如果队列为空，返回 `null`。`peek()` 比 `element()` 更加安全，不会抛出异常。

### 3. 队列的实现类

Java 提供了几种常见的队列实现类，它们通过不同的方式实现了 `Queue` 接口。

#### 1) **`LinkedList`**

`LinkedList` 实现了 `Queue` 接口，并且是一个双向链表。它不仅可以用作队列，还可以用作栈和列表。常用的队列操作方法（如 `offer()`、`poll()`、`peek()`）都有实现。
```java
Queue<Integer> queue = new LinkedList<>();
queue.offer(1);
queue.offer(2);
queue.offer(3);
System.out.println(queue.poll()); // 输出: 1
System.out.println(queue.peek()); // 输出: 2
```

- **优点**：`LinkedList` 是基于链表实现的，插入和删除操作的时间复杂度是 O(1)，适合频繁插入和删除的场景。

#### 2) **`PriorityQueue`**

`PriorityQueue` 是基于堆（通常是最小堆）实现的队列，它会根据元素的优先级顺序来决定元素的排列。默认情况下，它按照元素的自然顺序排序，也可以通过构造器传入一个自定义的比较器来指定排序规则。
```java
Queue<Integer> pq = new PriorityQueue<>();
pq.offer(5);
pq.offer(1);
pq.offer(3);
System.out.println(pq.poll()); // 输出: 1，最小的元素
```
- **优点**：适用于优先级队列场景，能够按优先级进行排序（如任务调度、Dijkstra 算法等）。

#### 3) **`ArrayDeque`**

`ArrayDeque` 是一个基于数组实现的双端队列，它支持高效的队列操作。它的插入和删除操作比 `LinkedList` 更加高效，因为 `ArrayDeque` 采用的是动态数组，而不是链表。
```java
Queue<Integer> deque = new ArrayDeque<>();
deque.offer(1);
deque.offer(2);
deque.offer(3);
System.out.println(deque.poll()); // 输出: 1
```
- **优点**：`ArrayDeque` 比 `LinkedList` 更加高效，特别是在需要大量的插入和删除操作时（避免了链表中的指针操作）。不过，它的缺点是它的容量是固定的，当元素数量超过容量时需要扩展。

#### 4) **`BlockingQueue`（阻塞队列）**

`BlockingQueue` 是 `Queue` 接口的一个子接口，它在多线程编程中用于提供线程安全的队列实现。它主要有两类阻塞操作：

- **阻塞添加**：如果队列已满，线程会被阻塞，直到队列有空闲位置。
- **阻塞移除**：如果队列为空，线程会被阻塞，直到队列有新元素。

常见的实现类包括：

- **`ArrayBlockingQueue`**：基于数组的有界阻塞队列。
- **`LinkedBlockingQueue`**：基于链表的有界阻塞队列。
- **`PriorityBlockingQueue`**：具有优先级的阻塞队列。
```java
BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(10);
queue.put(1); // 阻塞式插入
int val = queue.take(); // 阻塞式移除
```

- **优点**：阻塞队列在多线程环境下非常有用，能够帮助实现生产者-消费者模式。

### 4. 队列的应用场景

- **任务调度**：队列经常用于任务调度场景，其中任务按照先进先出的顺序被处理。
- **生产者-消费者问题**：使用阻塞队列可以轻松实现生产者-消费者模式，确保线程间的同步。
- **广度优先搜索（BFS）**：队列是实现广度优先搜索（BFS）算法的重要数据结构。
- **优先级队列**：`PriorityQueue` 用于根据优先级排序的任务队列，广泛应用于任务调度、图算法等领域。

### 5. 总结

- `Queue` 接口是 Java 集合框架中的一个重要接口，表示先进先出的数据结构。
- 常见的实现类包括 `LinkedList`（适合一般队列操作）、`PriorityQueue`（适合需要优先级排序的队列）、`ArrayDeque`（高效的双端队列）以及 `BlockingQueue`（用于多线程场景下的阻塞队列）。
- 队列常用于任务调度、广度优先搜索、生产者-消费者模式等场景。