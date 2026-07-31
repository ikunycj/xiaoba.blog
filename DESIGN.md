---
name: "小八博客"
description: "小八陪着写代码、记笔记和回看成长的蓝白技术小窝"
colors:
  xiaoba-blue: "#25A8D5"
  xiaoba-blue-deep: "#126B92"
  xiaoba-blue-soft: "#E1F8FF"
  paper: "#FFFFFF"
  page: "#F3FCFF"
  ink: "#153346"
  muted: "#4E6C7A"
  line: "#B9E6F3"
  blush: "#FF9FB7"
  crown-yellow: "#FFD86A"
typography:
  display:
    fontFamily: "Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "normal"
  headline:
    fontFamily: "Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  round: "999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.xiaoba-blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.xiaoba-blue-deep}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.xiaoba-blue-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
    height: "44px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.xiaoba-blue-soft}"
    textColor: "{colors.xiaoba-blue-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.round}"
    padding: "6px 10px"
---

# Design System: 小八博客

## Overview

**Creative North Star: "小八的蓝白工作台"**

这是一个每天写完代码后还愿意打开的个人工作台。白色纸面保证长文与代码的可读性，小八蓝负责导航和行动，腮红粉与皇冠黄只在角色细节和状态反馈中短暂出现。可爱感来自真实的小八素材、黑色线稿和克制的陪伴文案，不来自堆叠装饰。

页面采用清楚的纵向节奏和少量不对称构图。首页先呈现最近写下和最近回看，内容页沿用 VitePress 约 688px 的阅读栏。移动端首屏必须允许滚动并露出下一段内容；所有控件保持至少 44px 的触控高度。

系统明确拒绝与“小八”无关的通用粉色渐变模板、漂浮 emoji、装饰压过内容的卡片堆叠，也拒绝冷冰冰的企业文档后台。

**Key Characteristics:**

- 蓝白纸面、黑色线稿、少量腮红粉与皇冠黄。
- 角色陪伴是连续叙事，技术内容始终是主角。
- 4px/8px 间距基准、8px 最大常规圆角、清楚的焦点状态。
- 动效只用于状态反馈和一次轻微的小八入场，并尊重减少动态效果。

## Colors

小八蓝负责识别与行动，白纸和冷白页面负责阅读，粉黄仅作角色签名；所有正文始终使用深色墨水。

### Primary

- **小八工作蓝**：主按钮、当前导航、正文链接和阅读进度。
- **深海蓝墨**：蓝色表面上的文字、强交互和高对比标题。
- **晴空蓝纸**：标签、选中态和轻量提示背景。

### Secondary

- **腮红粉**：角色脸颊、温柔提示和极少量情绪强调。

### Tertiary

- **皇冠黄**：皇冠、收藏或完成状态，不用于大面积背景。

### Neutral

- **纯白纸面**：文章、列表项和导航表面。
- **冷白页面**：整站底色，提供轻微层次。
- **小八墨色**：标题和正文。
- **说明灰蓝**：日期、摘要和辅助信息，必须保持可读对比。
- **浅蓝边线**：分隔、输入框和容器边界。

**The Blue-White Rule.** 每个页面至少 70% 是白色或冷白色；粉色与黄色合计不得超过可见面积的 8%。

**The No-Gradient Rule.** 禁止装饰渐变、渐变文字和发光色团；层次由实色、边线、间距与内容建立。

## Typography

**Display Font:** Noto Sans SC（回退至 PingFang SC 与系统中文黑体）
**Body Font:** Noto Sans SC（回退至 PingFang SC 与系统中文黑体）
**Label/Mono Font:** 系统等宽字体仅用于代码

**Character:** 单一的人文无衬线让技术内容稳定、亲近。可爱感由小八的形象和文字语气承担，字体本身不卖萌。

### Hierarchy

- **Display**（800，3.5rem，1.08）：只用于首页“小八博客”，移动端固定降为 2.5rem。
- **Headline**（750，2.25rem，1.2）：页面主标题，移动端固定降为 1.75rem。
- **Title**（700，1.25rem，1.4）：文章、项目和分组标题。
- **Body**（400，1rem，1.75）：正文与长摘要，阅读行宽保持 45-75ch。
- **Label**（650，0.875rem，1.4）：日期、标签与控件；任何说明文字不得小于 0.875rem。

**The Quiet Type Rule.** 中文字距永远为 0，禁止负字距、Comic Sans 和随视口连续缩放的字号。

## Elevation

系统以实色纸面和 1px 浅蓝边线建立层次。静止表面保持扁平；只有悬停中的可点击条目和浮动工具按钮出现极轻的环境阴影，文章正文与普通分组不使用阴影。

### Shadow Vocabulary

- **轻提起**（`0 8px 24px rgba(23, 74, 112, 0.10)`）：只用于可点击卡片的悬停状态。
- **浮动工具**（`0 8px 20px rgba(23, 74, 112, 0.16)`）：仅用于返回顶部等脱离文档流的工具。

**The Flat-by-Default Rule.** 静态表面禁止阴影；如果一个页面在不交互时看起来像一叠浮卡，就说明层次过量。

## Components

组件感觉应当安静、触感明确，角色感来自图像与小文案，而不是夸张形状。

### Buttons

- **Shape:** 轻微圆角（8px），高度至少 44px。
- **Primary:** 小八工作蓝底、白字，内边距 12px 18px。
- **Hover / Focus:** 悬停转深海蓝墨；键盘焦点使用 3px 晴空蓝外环。
- **Secondary:** 白底、深蓝字、1px 浅蓝边线；不使用胶囊形。

### Chips

- **Style:** 只用于分类、时间与状态，晴空蓝纸底、深蓝字，6px 10px 内边距。
- **State:** 筛选选中态使用深蓝实线；纯导航行动不得伪装成标签。

### Cards / Containers

- **Corner Style:** 常规容器最多 8px；重复列表项可用 6px。
- **Background:** 纯白纸面置于冷白页面上。
- **Shadow Strategy:** 静态无阴影，可点击项悬停才使用轻提起。
- **Border:** 1px 浅蓝边线。
- **Internal Padding:** 16-24px；页面分组间距 40-64px。

### Inputs / Fields

- **Style:** 白底、1px 浅蓝边线、8px 圆角、高度至少 44px。
- **Focus:** 深蓝边线与 3px 晴空蓝外环。
- **Error / Disabled:** 错误用文字与图标双重表达；禁用态降低对比但仍保持可读。

### Navigation

桌面导航是紧凑白色横栏，当前项以深蓝文字和 2px 底线标记；移动端使用 VitePress 抽屉。导航不使用 emoji，品牌区始终显示小八头像与“小八博客”。

### Xiaoba Companion

首页使用小八写代码的真实素材作为第一视觉信号；内容页只在评论、空状态或分区结尾出现小尺寸状态图。一个视口最多出现一张主角图，避免角色与正文争夺注意力。

## Do's and Don'ts

### Do:

- **Do** 用白色或冷白色承载至少 70% 页面，并用小八工作蓝表达行动。
- **Do** 让首页首屏露出“最近写下”的开头，并在 390px 宽度下保持所有内容可滚动。
- **Do** 保持正文 16px/1.75、说明文字至少 14px，并为键盘交互提供清楚焦点环。
- **Do** 复用真实小八素材，让角色在首页、空状态与评论区形成连续陪伴。

### Don't:

- **Don't** 使用与“小八”无关的通用粉色渐变模板。
- **Don't** 使用漂浮 emoji 装饰、渐变文字、装饰色团或无意义的循环弹跳。
- **Don't** 使用装饰压过内容的卡片堆叠、卡片套卡片或超过 8px 的常规卡片圆角。
- **Don't** 把网站做成冷冰冰的企业文档后台；技术严谨不等于没有角色温度。
- **Don't** 使用 Comic Sans、负字距、低于 14px 的说明文字或随视口连续缩放的字体。
