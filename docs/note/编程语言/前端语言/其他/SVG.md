# [SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)（Scalable Vector Graphics）详解

SVG（可缩放矢量图形）是一种基于 **XML** 的矢量图形格式，适用于网页、UI 设计、数据可视化等场景。相比位图（如 PNG、JPG），SVG 具有 **无限缩放、可编辑、可交互、支持动画** 等优势。

---

## 1. SVG 主要特点

1. **矢量格式**：由点、线、曲线等组成，缩放不会失真。
2. **基于 XML**：可用文本编辑器查看和编辑，可与其他 XML 技术结合。
3. **支持 CSS 和 JavaScript**：可像 HTML 一样应用 CSS 样式，并可用 JavaScript 控制交互。
4. **轻量级**：在某些情况下比 PNG、JPG 更小。
5. **支持动画**：可通过 `<animate>` 和 `<animateTransform>` 或 CSS/JavaScript 实现动画效果。
6. **可与 DOM 交互**：SVG 元素可以被 JavaScript 操作，实现动态效果。

---

## 2. SVG 语法

SVG 代码可以直接嵌入 HTML 或存为独立的 `.svg` 文件。

### SVG 结构示例

```xml
<svg 
	width="200" 
	height="200" 
	viewBox="0 0 200 200" 
	xmlns="http://www.w3.org/2000/svg">
    <circle 
	    cx="100" 
	    cy="100" 
	    r="50" 
	    fill="blue" 
	    stroke="black" 
	    stroke-width="3"
	/>
</svg>
```

🔹 **解析：**

- `<svg>`：定义 SVG 容器，`width` 和 `height` 设置尺寸，`viewBox` 设定坐标系。
- `<circle>`：绘制一个圆形，`cx` 和 `cy` 定义圆心，`r` 为半径，`fill` 设定填充颜色，`stroke` 设定边框颜色。

---

## 3. SVG 主要参数

SVG 元素的参数可分为 **全局属性** 和 **各形状特有属性**。

### （1）`<svg>` 根元素参数

| **属性**                               | **作用**                   |
| ------------------------------------ | ------------------------ |
| `width` / `height`                   | 画布宽度、高度                  |
| `viewBox="minX minY width height"`   | 视图框，定义 SVG 内部坐标系         |
| `xmlns="http://www.w3.org/2000/svg"` | XML 命名空间，必须包含            |
| `preserveAspectRatio`                | 定义缩放方式，如 `xMidYMid meet` |
| `fill` / `stroke`                    | 默认填充颜色、边框颜色              |

---

### （2）通用样式属性

适用于所有形状，包括 `<circle>`、`<rect>`、`<path>` 等：

| **属性**             | **作用**                         |
| ------------------ | ------------------------------ |
| `fill`             | 填充颜色（如 `red`、`#ff0000`）        |
| `fill-opacity`     | 填充透明度（0 到 1）                   |
| `stroke`           | 描边颜色                           |
| `stroke-width`     | 描边宽度                           |
| `stroke-opacity`   | 描边透明度                          |
| `stroke-dasharray` | 虚线样式，如 `5,5` 表示 5px 线 + 5px 空隙 |
| `opacity`          | 整体透明度（0 到 1）                   |

---

### （3）SVG 形状参数

#### ① 矩形 `<rect>`
```xml
<rect x="10" y="10" width="100" height="50" fill="green"/>
```

|**属性**|**作用**|
|---|---|
|`x` / `y`|左上角坐标|
|`width` / `height`|宽度、高度|
|`rx` / `ry`|圆角半径（可用于绘制圆角矩形）|

---

#### ② 圆形 `<circle>`

```xml
<circle cx="50" cy="50" r="30" fill="red"/>
```

|**属性**|**作用**|
|---|---|
|`cx` / `cy`|圆心坐标|
|`r`|半径|

---

#### ③ 椭圆 `<ellipse>`

```xml
<ellipse cx="100" cy="50" rx="60" ry="30" fill="green"/>
```

|**属性**|**作用**|
|---|---|
|`cx` / `cy`|椭圆中心坐标|
|`rx` / `ry`|x 轴半径 / y 轴半径|

---

#### ④ 直线 `<line>`

```xml
<line x1="10" y1="10" x2="100" y2="100" stroke="black"/>
```

|**属性**|**作用**|
|---|---|
|`x1` / `y1`|起点坐标|
|`x2` / `y2`|终点坐标|

---

#### ⑤ 多边形 `<polygon>`

```xml
<polygon points="50,10 90,90 10,90" fill="yellow"/>
```

|**属性**|**作用**|
|---|---|
|`points`|多个顶点坐标（x1,y1 x2,y2 ...）|

---

#### ⑥ 路径 `<path>`

```xml
<path d="M10 80 C40 10, 65 10, 95 80 S150 150, 180 80" stroke="black" fill="none"/>
```

|**命令**|**作用**|
|---|---|
|`M x y`|移动画笔|
|`L x y`|画直线|
|`C x1 y1, x2 y2, x y`|三次贝塞尔曲线|
|`Q x1 y1, x y`|二次贝塞尔曲线|
|`Z`|关闭路径|

---

## 4. SVG 交互（CSS & JavaScript）

### （1）CSS 控制 SVG

```css
circle {
    fill: blue;
    transition: fill 0.5s;
}

circle:hover {
    fill: red;
}
```

### （2）JavaScript 操作 SVG

```html
<svg width="200" height="200">
    <circle id="myCircle" cx="100" cy="100" r="50" fill="blue"/>
</svg>

<script>
    document.getElementById("myCircle").addEventListener("click", function() {
        this.setAttribute("fill", "red");
    });
</script>
```

---

## 5. SVG 动画

### （1）使用 `<animate>`

```xml
<circle cx="50" cy="50" r="20" fill="blue">
    <animate attributeName="cx" from="50" to="150" dur="2s" repeatCount="indefinite"/>
</circle>
```

|**属性**|**作用**|
|---|---|
|`attributeName`|变化的属性|
|`from` / `to`|起始和终止值|
|`dur`|持续时间|
|`repeatCount="indefinite"`|无限循环|

---

## 6. SVG 事件

|**事件类型**|**作用**|
|---|---|
|`onclick`|点击事件|
|`onmouseover`|鼠标悬停|
|`onmouseout`|鼠标离开|

示例：

```xml
<circle cx="50" cy="50" r="30" fill="blue" onclick="alert('Clicked!')"/>
```

---

## **总结**

- **SVG 具有无限缩放、可编辑、可交互、支持动画的特点。**
- **基本形状（`<rect>`、`<circle>`、`<path>` 等）各有独特参数。**
- **支持 CSS & JavaScript 交互，可动态控制。**
- **可用于 UI 图标、网页动画、数据可视化等场景。**

