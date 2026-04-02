## 1.css怎么实现响应式布局
实现响应式布局的常见方法包括使用媒体查询、弹性盒子布局（Flexbox）、网格布局（Grid）以及相对单位（如百分比、`em`、`rem`、`vw`、`vh`等）。以下是几种主要方法的简要说明：

### 1. 媒体查询（Media Queries）
媒体查询是响应式设计的核心工具，允许根据设备的屏幕宽度、高度等特性应用不同的样式。

```css
/* 默认样式 */
.container {
    width: 100%;
    background-color: lightblue;
}

/* 当屏幕宽度小于等于 600px 时应用 */
@media (max-width: 600px) {
    .container {
        background-color: lightcoral;
    }
}

/* 当屏幕宽度大于 600px 且小于等于 900px 时应用 */
@media (min-width: 601px) and (max-width: 900px) {
    .container {
        background-color: lightgreen;
    }
}

/* 当屏幕宽度大于 900px 时应用 */
@media (min-width: 901px) {
    .container {
        background-color: lightyellow;
    }
}
```

### 2. 弹性盒子布局（Flexbox）
Flexbox 是一种一维布局模型，适合创建灵活的响应式布局。
```css
.container {
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
}

.item {
    flex: 1 1 200px; /* 基础宽度 200px，允许伸缩 */
    margin: 10px;
    background-color: lightblue;
}

@media (max-width: 600px) {
    .item {
        flex: 1 1 100%; /* 小屏幕下占满整行 */
    }
}
```

### 3. 网格布局（Grid）
CSS Grid 是一种二维布局系统，适合创建复杂的响应式布局。
```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 自动调整列宽 */
    gap: 10px;
}

.item {
    background-color: lightblue;
    padding: 20px;
}

@media (max-width: 600px) {
    .container {
        grid-template-columns: 1fr; /* 小屏幕下单列布局 */
    }
}
```

### 4. 相对单位
使用相对单位（如百分比、`em`、`rem`、`vw`、`vh`）可以让布局更具弹性。
```css
.container {
    width: 90%; /* 宽度为父元素的 90% */
    max-width: 1200px; /* 最大宽度 */
    margin: 0 auto; /* 居中 */
}

.item {
    width: 100%; /* 宽度为父元素的 100% */
    padding: 2rem; /* 使用 rem 单位 */
    font-size: 1.2em; /* 使用 em 单位 */
}

@media (max-width: 600px) {
    .item {
        font-size: 1em; /* 小屏幕下调整字体大小 */
    }
}
```

### 5. 视口单位（Viewport Units）
视口单位（`vw`、`vh`、`vmin`、`vmax`）可以根据视口大小调整元素尺寸。
```css
.container {
    width: 100vw; /* 宽度为视口宽度的 100% */
    height: 100vh; /* 高度为视口高度的 100% */
}

.item {
    width: 50vw; /* 宽度为视口宽度的 50% */
    height: 50vh; /* 高度为视口高度的 50% */
}
```

### 6. 图片和媒体的响应式处理
使用 `max-width` 和 `height: auto` 确保图片和媒体元素在不同屏幕尺寸下自适应。
```css
img {
    max-width: 100%;
    height: auto;
}

video {
    max-width: 100%;
    height: auto;
}
```

### 7. 响应式字体
使用 `vw` 单位或媒体查询调整字体大小。
```css
h1 {
    font-size: 5vw; /* 字体大小随视口宽度变化 */
}

@media (max-width: 600px) {
    h1 {
        font-size: 24px; /* 小屏幕下固定字体大小 */
    }
}
```

### 总结
响应式布局的核心是根据不同设备的屏幕尺寸调整布局和样式。通过结合媒体查询、Flexbox、Grid、相对单位和视口单位，可以创建灵活且适应性强的响应式设计。

## 2.flex
`flex` 是 CSS `Flexbox`（弹性布局）中的一个属性，主要用于控制**弹性子项（flex items）** 如何在弹性容器（flex container）内分配空间。

### 1. `flex` 属性的作用
- `flex` 用于 **子元素（flex item）** 上，而不是 **父容器（flex container）**。
- 控制**子元素的尺寸、比例和分配方式**，适用于**响应式布局**。
- `flex` 是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的简写。

### 2. `flex` 语法
```css
.flex-item {
  flex: flex-grow flex-shrink flex-basis;
}
```

- `flex-grow`：**增长因子**（默认 `0`，即不放大）。
- `flex-shrink`：**收缩因子**（默认 `1`，即允许收缩）。
- `flex-basis`：**初始尺寸**（默认 `auto`，即取决于 `width` 或 `content`）。


### 3. `flex` 的三个参数详解
#### 3.1 `flex-grow`（放大比例）
**定义**：子元素可以**按比例**占用容器的剩余空间。
 **示例**
```css
.container {
  display: flex;
}
.item-1 {
  flex-grow: 1; /* 占用 1 份 */
}
.item-2 {
  flex-grow: 2; /* 占用 2 份 */
}
.item-3 {
  flex-grow: 3; /* 占用 3 份 */
}
```

🔹 **假设容器宽度为 `600px`，所有 `item` 的宽度计算如下：**

```
总份数 = 1 + 2 + 3 = 6
item-1 = (1/6) * 600 = 100px
item-2 = (2/6) * 600 = 200px
item-3 = (3/6) * 600 = 300px
```

✅ **注意**
- `flex-grow: 0`（默认）：不占用多余空间。
- `flex-grow: 1+`：占用剩余空间，按比例分配。

---

#### 3.2 `flex-shrink`（缩小比例）
**定义**：当**容器空间不足**时，子元素按 `flex-shrink` 的**比例缩小**。

**示例**
```css
.container {
  display: flex;
  width: 300px;
}
.item-1 {
  flex-shrink: 1;
  width: 200px;
}
.item-2 {
  flex-shrink: 2;
  width: 200px;
}
```

🔹 **假设容器只有 `300px`，但子项总宽度是 `400px + 200px = 400px`，则缩小量计算如下：**

```
超出量 = 400 - 300 = 100px
总缩小比例 = 1 + 2 = 3
item-1 = 200 - (1/3 * 100) ≈ 166.67px
item-2 = 200 - (2/3 * 100) ≈ 133.33px
```

✅ **注意**

- `flex-shrink: 0`：不会缩小。
- `flex-shrink: 1+`：允许缩小，按比例分配缩小空间。

---

#### 3.3 `flex-basis`（初始大小）
**定义**：设置**弹性子项的初始宽度或高度**（不考虑 `grow` 和 `shrink`）。
- **默认值 `auto`**（根据 `width` 或 `content` 大小决定）。
- 可以设定固定值（如 `100px`、`50%`）。
- 不能与 `width` 冲突，否则 `flex-basis` 优先。

**示例**
```css
.item {
  flex-basis: 200px; /* 初始宽度 200px */
}
```

✅ **特殊情况**
```css
.item {
  flex-basis: 0;
  flex-grow: 1;
}
```

- `flex-basis: 0` 会忽略内容尺寸，**完全依赖 `flex-grow` 计算大小**。

---

### 4. `flex` 的简写形式
**常见写法**

|**写法**|**等价写法**|**解释**|
|---|---|---|
|`flex: auto`|`flex: 1 1 auto`|可放大、可缩小，宽度取决于内容|
|`flex: none`|`flex: 0 0 auto`|不放大、不缩小，宽度取决于内容|
|`flex: 1`|`flex: 1 1 0`|只依赖 `flex-grow` 放大|
|`flex: 0 1 auto`|`flex-grow: 0; flex-shrink: 1; flex-basis: auto;`|允许缩小，不放大|
|`flex: 2`|`flex: 2 1 0`|以 2:1 放大，默认可缩小|


### 5. `flex` 实战示例

#### 5.1 响应式布局
```css
.container {
  display: flex;
}
.left {
  flex: 1; /* 左侧占 1 份 */
}
.right {
  flex: 3; /* 右侧占 3 份 */
}
```

```html
<div class="container">
  <div class="left">左侧</div>
  <div class="right">右侧</div>
</div>
```

📌 **右侧宽度永远是左侧的 3 倍，适用于自适应布局**。

#### 5.2 固定 + 自适应布局
```css
.container {
  display: flex;
}
.fixed {
  flex: 0 0 100px; /* 固定 100px，不伸缩 */
}
.flexible {
  flex: 1; /* 剩余空间自适应 */
}
```

```html
<div class="container">
  <div class="fixed">固定宽度</div>
  <div class="flexible">自适应</div>
</div>
```

📌 **常见于左侧固定导航栏 + 右侧自适应内容布局**。

---

### 6. `flex` 与 `width` 的关系

- **如果 `flex-basis` 设定了值，则 `width` 无效**。
- **如果 `flex-basis` 是 `auto`，则 `width` 生效**。

示例：
```css
.item {
  flex-basis: auto; /* 取决于 width */
  width: 200px;
}
```

📌 `width` 控制初始大小，弹性规则依然适用。

---

### 7. `flex` 与 `grid` 的对比

|**特性**|**Flexbox**|**Grid**|
|---|---|---|
|**布局方式**|**单轴**（水平或垂直）|**双轴**（行 + 列）|
|**适用场景**|**自适应、弹性分配**|**复杂网格布局**|
|**对齐方式**|`justify-content` / `align-items`|`grid-template-areas`|
|**浏览器支持**|**优秀**|**现代浏览器**|

📌 **Flex 适用于一维布局，Grid 适用于二维布局**。

---

### 8. 总结

✅ **`flex` 属性 = `flex-grow flex-shrink flex-basis`**

|**属性**|**作用**|
|---|---|
|`flex-grow`|放大比例（默认 `0`）|
|`flex-shrink`|缩小比例（默认 `1`）|
|`flex-basis`|初始尺寸（默认 `auto`）|

🔥 **推荐使用 `flex: 1`，实现简单的弹性布局！**

## 3.grid

`CSS Grid` 是一种 **二维布局系统**，可以用于创建**复杂的网格布局**，相比 `Flexbox`（一维布局），`Grid` 更加适用于**多行多列的布局需求**。

### 1. 什么是 Grid？

- `Grid` 允许我们将网页划分成**行（rows）和列（columns）**，并在这些网格（grid cells）中放置元素。
- `display: grid;` 是 `Grid` 布局的核心，它用于创建一个 **网格容器（grid container）**，其子元素称为 **网格项（grid items）**。


### 2. Grid 的基本概念

**网格（Grid）相关术语**

|**术语**|**描述**|
|---|---|
|**Grid Container（网格容器）**|使用 `display: grid;` 的元素|
|**Grid Items（网格项）**|网格容器内的直接子元素|
|**Grid Lines（网格线）**|水平或垂直的分隔线|
|**Grid Cells（网格单元）**|网格线之间的单个单元格|
|**Grid Tracks（网格轨道）**|由网格线包围的行或列|
|**Grid Area（网格区域）**|由多个单元格组成的区域|


### 3. 基本使用
#### 3.1 定义一个 Grid 容器
```css
.container {
  display: grid;
  grid-template-columns: 100px 200px auto;
  grid-template-rows: 50px 100px;
  gap: 10px;
}
```
**解析**
- `display: grid;` → 将 `.container` 变成 **Grid 容器**
- `grid-template-columns: 100px 200px auto;` → **定义列宽**（第一列 `100px`，第二列 `200px`，第三列 `auto`）
- `grid-template-rows: 50px 100px;` → **定义行高**（第一行 `50px`，第二行 `100px`）
- `gap: 10px;` → **网格间距**（行和列之间的间距）

#### 3.2 Grid 子项
```css
.item {
  background-color: lightblue;
  padding: 20px;
  text-align: center;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>
```

📌 **效果**
```
| 1 | 2 | 3 |
| 4 |   |   |
```

---

### 4. Grid 轨道（Tracks）：定义列和行
#### 4.1 `grid-template-columns` & `grid-template-rows`
```css
.container {
  display: grid;
  grid-template-columns: 100px 1fr 2fr; /* 三列：100px, 1fr, 2fr */
  grid-template-rows: 50px auto; /* 两行 */
}
```

🔹 **`fr`（弹性单位）**

- `1fr` 代表**剩余空间的 1 份**，`2fr` 代表**剩余空间的 2 份**。

📌 **示例**
```css
grid-template-columns: repeat(3, 1fr); /* 3 列，每列平分 */
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* 响应式 */
```

---

### 5. Grid 对齐方式
#### 5.1 `justify-items`（水平方向对齐）
```css
.container {
  justify-items: center; /* 左对齐（start），居中（center），右对齐（end） */
}
```

#### 5.2 `align-items`（垂直方向对齐）
```css
.container {
  align-items: center; /* 上对齐（start），居中（center），底部对齐（end） */
}
```

#### 5.3 `justify-content`（整体水平方向对齐）
```css
.container {
  justify-content: space-between;
}
```

#### 5.4 `align-content`（整体垂直方向对齐）
```css
.container {
  align-content: center;
}
```

---

### 6. Grid 子项的控制
#### 6.1 `grid-column` & `grid-row`
```css
.item-1 {
  grid-column: 1 / 3; /* 占据 1 到 3 列 */
  grid-row: 1 / 3; /* 占据 1 到 3 行 */
}
```

📌 **效果**
```
| 1  | 1  | 2 |
| 1  | 1  | 3 |
```

#### 6.2 `grid-area`（指定子项位置）
```css
.item-1 {
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}
```

---

### 7. Grid 经典布局
#### 7.1 圣杯布局
```css
.container {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
}
.header {
  grid-column: 1 / 4;
}
.sidebar {
  grid-column: 1 / 2;
}
.main {
  grid-column: 2 / 3;
}
.right-sidebar {
  grid-column: 3 / 4;
}
.footer {
  grid-column: 1 / 4;
}
```

📌 **布局**
```
+-----------------------+
|        Header         |
+----+------------+----+
| SB |    Main    | RB |
+----+------------+----+
|        Footer         |
+-----------------------+
```

---

### 8. Grid vs Flexbox

|**特性**|**Grid**|**Flexbox**|
|---|---|---|
|**布局类型**|**二维（行+列）**|**一维（行或列）**|
|**适用场景**|**复杂网格**|**导航栏、卡片布局**|
|**对齐方式**|`grid-template-areas`|`justify-content`|

📌 **Grid 适用于页面布局，Flex 适用于局部布局**。


### 9. 总结

✅ **核心属性**

|**属性**|**作用**|
|---|---|
|`display: grid;`|启用 Grid|
|`grid-template-columns`|定义列|
|`grid-template-rows`|定义行|
|`grid-gap`|间距|
|`grid-area`|指定位置|
|`justify-items`|水平对齐|
|`align-items`|垂直对齐|

🔥 **Flexbox 适用于一维布局，Grid 适用于复杂网格布局！**


## 回流和重绘
在前端开发中，**回流（Reflow）**和**重绘（Repaint）**是浏览器渲染引擎性能优化的核心概念。

### 1. 浏览器的渲染流水线

在讨论这两个概念前，先看浏览器把 HTML 变成画面的过程：
1. **解析 HTML** 生成 DOM 树 。
2. **解析 CSS** 生成 CSSOM 树 。
3. **合并**两者生成 **渲染树 (Render Tree)** 。
4. **布局 (Layout/Reflow)**：计算每个节点在屏幕上的确切位置和大小。
5. **绘制 (Painting/Repaint)**：将节点转换为屏幕上的实际像素。

### 2. 回流 (Reflow) —— “牵一发而动全身”

回流是指浏览器为了重新计算文档中元素的位置和几何结构而进行的过程。

- **触发原因**：任何改变元素**几何属性**的操作。
    - 改变窗口大小（Resize） 。
    - 改变字体大小。
    - 增删 DOM 节点 。
    - 修改元素的 `width`、`height`、`margin`、`padding`、`border` 等。
    - 激活伪类（如 `:hover`）。
    - 查询某些属性（如 `offsetTop`、`clientWidth`、`getComputedStyle`），因为浏览器为了给你准确的值，必须立即触发回流。
- **性能消耗**：**非常大**。回流必定会导致重绘，且具有“传递性”，一个元素的改变可能引发其父元素甚至整个页面的重新布局。


### 3. 重绘 (Repaint) —— “只改表象”

重绘是指当元素的样式改变，但不影响它在文档流中的几何位置时，浏览器直接重新绘制该元素。

- **触发原因**：改变元素的**外观属性**。
    - 修改 `color`、`background-color`。
    - 修改 `visibility`（注意：`display: none` 会触发回流，而 `visibility: hidden` 只触发重绘）。
    - 修改 `outline`、`box-shadow`。
- **性能消耗**：**较小**。因为它不需要重新计算布局信息，只需像素级的填充。