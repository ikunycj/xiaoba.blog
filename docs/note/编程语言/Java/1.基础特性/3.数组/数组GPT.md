# 1.声明和初始化数组：
数组是一种在 Java 中用于存储相同类型元素的数据结构。数组可以存储基本数据类型（如整数、字符、布尔值等）或对象引用。以下是有关数组的基本信息和示例：

1. **声明数组变量：**
```java
// 声明一个整数数组
int[] numbers;

// 声明一个字符串数组
String[] names;
```

2. **初始化数组：**
- 使用 `new` 关键字分配内存并初始化数组。
- 组的大小在初始化时需要指定，一旦确定大小，通常不可更改。
```java
// 初始化整数数组，包含5个元素
numbers = new int[5];

// 初始化字符串数组，包含3个元素
names = new String[3];
```

3. **初始化数组并赋值：**
- 可以在声明时直接初始化数组并赋值
```java
// 初始化整数数组并赋值
int[] scores = {90, 85, 88, 92, 78};

// 初始化字符串数组并赋值
String[] fruits = {"Apple", "Banana", "Orange"};
```
# 2.数组元素处理：
### 访问数组元素：
```java
// 访问整数数组元素
int firstNumber = numbers[0];

// 访问字符串数组元素
String fruit = fruits[1];
```

### 获取数组的长度：
```java
int length = scores.length; // 获取整数数组的长度
int size = fruits.length;  // 获取字符串数组的长度
```

### 遍历数组：
```java
// 遍历整数数组
for (int i = 0; i < scores.length; i++) {
    int score = scores[i];
    // 处理元素
}

// 使用增强 for 循环遍历字符串数组
for (String fruit : fruits) {
    // 处理元素
}
```
# 3.二维数组
二维数组是一个数组的数组，通常用于表示表格或矩阵。在 Java 中，二维数组可以声明、初始化和访问元素。以下是关于二维数组的基本操作和示例：

### 声明和初始化二维数组：
```java
// 声明一个二维整数数组（3行2列）
int[][] matrix = new int[3][2];//静态初始化

// 初始化一个二维字符数组（动态初始化）
char[][] board = {
    {'X', 'O', 'X'},
    {'O', 'X', 'O'},
    {'X', 'O', 'X'}
};

// 也可以声明并初始化不规则的二维数组
int[][] irregularArray = {
    {1, 2, 3},
    {4, 5},
    {6, 7, 8, 9}
};
```

### 访问二维数组元素：
```java'
// 访问二维数组的元素
int element = matrix[0][1];

// 遍历二维数组
for (int i = 0; i < board.length; i++) {
    for (int j = 0; j < board[i].length; j++) {
        char cell = board[i][j];
        System.out.print(cell + " ");
    }
    System.out.println();
}
```

### 获取二维数组的行数和列数：
```java
int numRows = matrix.length; // 获取行数
int numCols = matrix[0].length; // 获取列数
```

### 使用嵌套循环遍历二维数组：
```java
for (int i = 0; i < numRows; i++) {
    for (int j = 0; j < numCols; j++) {
        int element = matrix[i][j];
        // 处理元素
    }
}
```

### 不规则二维数组的遍历：
```java
for (int i = 0; i < irregularArray.length; i++) {
    for (int j = 0; j < irregularArray[i].length; j++) {
        int element = irregularArray[i][j];
        // 处理元素
    }
}
```