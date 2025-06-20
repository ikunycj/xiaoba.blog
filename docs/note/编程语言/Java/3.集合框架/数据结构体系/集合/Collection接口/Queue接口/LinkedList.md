# LinkedList(完整在List文件夹下)
#### **队列操作（Deque 和 Queue 的方法）**

##### **void addFirst(E e)**
将元素添加到链表的头部。  

##### **void addLast(E e)**
将元素添加到链表的尾部。  


##### **E getFirst()**

获取链表头部的元素（不移除）。若链表为空，则抛出 `NoSuchElementException`。  

##### **E getLast()**
获取链表尾部的元素（不移除）。若链表为空，则抛出 `NoSuchElementException`。  


##### **E removeFirst()**
移除并返回链表头部的元素。若链表为空，则抛出 `NoSuchElementException`。  

##### **E removeLast()**
移除并返回链表尾部的元素。若链表为空，则抛出 `NoSuchElementException`。  

##### **E peek()**
获取链表的头部元素（不移除）。若链表为空，返回 `null`。  

##### **E poll()**
移除并返回链表的头部元素。若链表为空，返回 `null`。  

##### **boolean offer(E e)**
将元素添加到链表尾部，返回 `true` 表示成功。  
