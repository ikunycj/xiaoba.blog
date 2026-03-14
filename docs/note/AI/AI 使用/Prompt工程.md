# 一、Prompt Engineering 的本质

很多人误以为 Prompt 是：

> “写一句让 AI 更聪明的话”

其实不是。Prompt 的本质是：

**控制 LLM 的推理空间和输出结构**

因为 LLM 的行为只由：
```
输入上下文 → 预测下一个 token
```
决定。

所以 Prompt 的作用是：
```
限制模型思考范围
+ 
提供上下文
+
规定输出结构
```
本质上是：

**控制模型的概率分布。**

---

# 二、Prompt 的基本组成

最稳定的结构：

```
Role # 角色

Context # 背景

Task # 任务

Output # 输出格式

Constraints # 约束
```

简称：**R-C-T-O-C**

示例：
```
Role:
你是一个资深 Go 后端架构师

Context:
我正在设计一个 AI Agent 调度系统

Task:
设计任务调度架构

Output:
用 Markdown 输出
包括：
1 架构图
2 模块说明
3 技术选型

Constraints:
- 支持10万并发
- Kubernetes部署
```

作用：

|模块|作用|
|---|---|
|Role|控制模型身份|
|Context|提供背景|
|Task|明确任务|
|Output|限制输出|
|Constraints|防止胡编|

这是 **所有 Prompt 的基础模板**。

---

# 三、Prompt 的六大核心技术

## 1 Zero-shot Prompt
最简单方式：
```
总结以下文章
```

优点：
- 快
- 简单

缺点：
- 不稳定

适合：
- 简单任务
- 创意生成

---

## 2 Few-shot Prompt
提供示例。

例子：
```
输入: hello
输出: greeting

输入: thanks
输出: gratitude

输入: sorry
输出:
```

优点：
- 提升稳定性
- 提升格式正确率

适合：
- 分类
- 数据提取
- JSON生成

---

## 3 Chain-of-Thought (CoT)
让模型 **逐步思考**。

例子：
```
请一步一步解释你的推理过程
```

适合：
- 数学
- 推理
- coding

作用：
**显著提升复杂任务准确率。**

---

## 4 Self-consistency
生成多个答案 → 投票。

流程：
```
1 生成5个推理过程
2 选择最一致答案
```

适合：
- 逻辑推理
- 复杂决策

---

## 5 ReAct Prompt
Agent 最重要技术。

格式：
```
Thought: 思考
Action: 行动
Observation: 观察
```

例子：
```
Thought: 需要查询天气
Action: 调用天气API
Observation: 温度20℃
Answer: 今天适合出门
```

适合：
- Agent
- 工具调用

---

## 6 Tree-of-Thought
探索多个思路。
```
方案A
方案B
方案C
```

然后选择最优。

适合：
- 规划
- 架构设计

---

# 四、Prompt 的五大设计原则

## 1 清晰性
坏 prompt：
```
写一个系统
```

好 prompt：
```
设计一个 Go 微服务架构
支持10万QPS
```

---

## 2 上下文充分
模型没有记忆。

必须提供：
```
业务背景
技术背景
数据
```

---

## 3 输出结构化
例如：
```
输出 JSON
```

```
{
 title:
 summary:
 tags:
}
```

---

## 4 任务拆解
不要：
```
写一个完整系统
```

而是：
```
1 设计架构
2 定义模块
3 写代码
```

---

## 5 防止幻觉
例如：
```
如果你不确定
请回答不知道
不要编造
```

---

# 五、Prompt 的五种高级模式

## 模式1：Ask-first Prompt
让 AI 先问问题。
```
在回答之前
请先提出10个需要澄清的问题
```

作用：
- 收集需求
- 防止误解

---

## 模式2：Checklist Prompt
让模型自检。
```
输出之前检查：

1 变量命名
2 错误处理
3 并发安全
```

---

## 模式3：Step Prompt

拆步骤。
```
步骤1 分析问题
步骤2 设计方案
步骤3 写代码
```

---

## 模式4：Critic Prompt

先生成 → 再评审。
```
步骤1 生成方案
步骤2 评估优缺点
步骤3 优化方案
```

---

## 模式5：Debate Prompt

两个角色辩论。
```
角色A 支持
角色B 反对
```

适合：
- 方案评估
- 架构决策

---

# 六、Prompt 工程化

真正的 AI 系统结构：
```
用户问题
↓
Prompt Template
↓
RAG 检索
↓
Tools 调用
↓
LLM
↓
Structured Output
↓
Evaluation
```

Prompt 只是其中一部分。

现在叫：**Context Engineering**

---

# 七、Prompt 模板
```
# Role
你是一个专家

# Context
背景

# Task
任务

# Constraints
约束

# Output
输出格式
```
