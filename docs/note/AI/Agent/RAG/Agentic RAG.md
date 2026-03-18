**Agentic RAG** 可以理解成：

> **“带有自主决策能力的 RAG。”**

普通 RAG 通常是固定流程：  
**用户提问 → 检索文档 → 把文档塞给模型 → 生成答案。**  
而 Agentic RAG 则是在这个流程里加入 **Agent 的判断、规划和工具调用能力**，让系统自己决定：

- 要不要检索
    
- 检索几次
    
- 去哪里检索
    
- 检索结果够不够好
    
- 是否要改写问题后再检索
    
- 是否需要调用别的工具（搜索、数据库、API、计算器等）
    
- 最后再组织答案
    

IBM 将 Agentic RAG 定义为：**使用 AI agents 来促进 RAG**，从而让系统比传统 RAG 更具适应性、更准确，并能从多个来源检索信息、处理更复杂的工作流。LangChain 也把它概括为：**不是先固定检索再回答，而是由 agent 在交互过程中逐步推理，决定何时以及如何检索。** ([IBM](https://www.ibm.com/think/topics/agentic-rag?utm_source=chatgpt.com "What is Agentic RAG? | IBM"))

## 1. 先看普通 RAG

普通 RAG 的典型流程是：

1. 用户提问
    
2. 系统把问题转成检索 query
    
3. 去向量库/知识库召回文档
    
4. 取前 k 段上下文
    
5. LLM 基于这些上下文回答
    

它的优点是：

- 简单
    
- 快
    
- 成本低
    
- 流程稳定
    

但问题是：

- 一次检索没找到就容易答偏
    
- 问题复杂时不够灵活
    
- 不太会自己反思“资料够不够”
    
- 很难跨多个数据源做动态决策
    

RAG 本身的核心，就是把外部数据源接到 LLM 上，让回答更贴近最新、领域化的信息。([IBM](https://www.ibm.com/think/topics/retrieval-augmented-generation?utm_source=chatgpt.com "What is RAG (Retrieval Augmented Generation)?"))

---

## 2. Agentic RAG 和普通 RAG 的本质区别

### 普通 RAG

是**固定工作流**。

像这样：

```text
提问 → 检索一次 → 回答
```

### Agentic RAG

是**动态工作流**。

像这样：

```text
提问
→ agent 判断是否需要检索
→ 选择检索源
→ 检索
→ 评估结果是否足够
→ 不够则改写问题再检索
→ 必要时调用其他工具
→ 汇总并回答
```

LangGraph 的教程里就展示了这类模式，包括：

- 生成检索 query
    
- 评估检索到的文档
    
- 重写问题
    
- 再生成答案
    

这正是 agentic 的特点：**流程不是写死的，而是会根据当前情况调整。** ([LangChain 文档](https://docs.langchain.com/oss/javascript/langgraph/agentic-rag?utm_source=chatgpt.com "Build a custom RAG agent with LangGraph"))

---

## 3. 为什么叫 “agentic”

因为这里的核心不是“检索”本身，而是 **agent 的自主性**。

“Agentic” 这个词强调的是系统具备一定的：

- 目标导向
    
- 条件判断
    
- 多步规划
    
- 工具使用
    
- 自我修正
    

IBM 对 agentic AI 的定义就是：系统可以在有限监督下完成目标，依靠 AI agents 做实时决策和任务执行。([IBM](https://www.ibm.com/think/topics/agentic-ai?utm_source=chatgpt.com "What is Agentic AI?"))

所以 Agentic RAG 不是“更高级的向量检索”，而是：

> **把 RAG 从一个固定流水线，升级成一个会思考怎么检索的系统。**

---

## 4. 一个非常直观的例子

用户问：

> “帮我分析这家公司最近两个季度利润下滑的原因，并给出证据。”

### 普通 RAG 可能会做：

- 去知识库搜“利润下滑 原因”
    
- 拉几段文档
    
- 直接回答
    

### Agentic RAG 可能会做：

- 先判断：这个问题需要最新数据，不应只靠静态知识库
    
- 去财报数据库检索最近两个季度数据
    
- 再去新闻源找管理层解释或外部事件
    
- 判断证据是否足够
    
- 如果不够，再追加检索“成本上升”“市场份额下降”“一次性减值”
    
- 最后把数据证据和文本证据整合回答
    

这就是 Agentic RAG 的价值：  
**它不是只会“拿到什么就答什么”，而是会主动补资料。**

NVIDIA 对 agentic RAG 的描述也强调了这种动态性：agent 识别需要数据、生成查询、通过动态知识检索补充信息，再继续推理。([NVIDIA Developer](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/?utm_source=chatgpt.com "Traditional RAG vs. Agentic RAG—Why AI Agents Need ..."))

---

## 5. Agentic RAG 常见能力

一个典型的 Agentic RAG 系统，常常会有这些能力：

### 5.1 决定要不要检索

有些问题其实不需要外部资料。  
例如“什么是二叉树？”这种基础概念题，直接回答就行。

LangGraph 的检索 agent 教程就明确提到：retrieval agent 的用途之一，是让 LLM 决定是直接回答，还是先去 vectorstore 检索。([LangChain 文档](https://docs.langchain.com/oss/python/langgraph/agentic-rag?utm_source=chatgpt.com "Build a custom RAG agent with LangGraph"))

### 5.2 多轮检索

第一次没找全，就再搜一次。

### 5.3 查询改写

把用户原始问题改写成更适合检索的 query。

### 5.4 结果评估

判断召回的文档是否相关、是否足够回答问题。

### 5.5 多源检索

同时查：

- 向量库
    
- 数据库
    
- Web 搜索
    
- 企业 API
    
- 文件系统
    

### 5.6 工具协同

除了“检索”，还可能调用：

- SQL
    
- 浏览器
    
- 计算器
    
- 代码执行器
    
- 邮件/日历/API
    

---

## 6. 它和普通 Agent 有什么关系

Agentic RAG 不是“另一个完全独立的东西”，而是：

> **Agent + RAG 的结合体。**

它仍然离不开 RAG 的核心——**外部知识检索**。  
但它又借助 Agent 的能力，把检索过程从固定流水线升级为动态决策过程。([IBM](https://www.ibm.com/think/topics/agentic-rag?utm_source=chatgpt.com "What is Agentic RAG? | IBM"))

所以你可以这么记：

- **RAG**：重点在“把外部知识接进来”
    
- **Agent**：重点在“自己决定怎么做”
    
- **Agentic RAG**：重点在“自己决定怎么检索、何时检索、检索后怎么继续做”
    

---

## 7. 它适合什么场景

Agentic RAG 更适合这些任务：

- 问题复杂，不是一轮检索就能解决
    
- 需要跨多个数据源
    
- 需要对检索结果做验证、筛选、比较
    
- 需要边查边规划
    
- 需要结合工具执行
    

例如：

- 企业知识助手
    
- 金融研究助手
    
- 法务/合规助手
    
- 医学资料助手
    
- 代码分析助手
    
- 多文档研究型问答
    

---

## 8. 它的优势

### 更灵活

不会被“一次检索结果”绑死。

### 更适合复杂问题

复杂问题常常需要拆解、补查、重查。

### 更能处理动态知识

尤其适合多数据源、实时数据、外部 API 场景。([NVIDIA Developer](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/?utm_source=chatgpt.com "Traditional RAG vs. Agentic RAG—Why AI Agents Need ..."))

### 更接近“研究助理”而不是“检索模板机”

它会主动找证据，而不是只吃你给它的几段文本。

---

## 9. 它的代价

但它也不是纯升级，没有代价。

### 更慢

因为可能多次检索、多次推理。

### 更贵

多轮 LLM 调用 + 更多工具调用。

### 更难调试

你要排查：

- 为什么检索错了
    
- 为什么 query 改写失败
    
- 为什么 agent 选错工具
    
- 为什么反复循环
    

### 更难保证稳定性

动态流程意味着不如固定流程可控。  
LangGraph 文档也明确区分了：workflow 是预定路径，agent 是动态定义自己的过程和工具使用。([LangChain 文档](https://docs.langchain.com/oss/python/langgraph/workflows-agents?utm_source=chatgpt.com "Workflows and agents - Docs by LangChain"))

---

## 10. 面试里怎么解释最合适

你可以这样说：

> Agentic RAG 就是在传统 RAG 基础上加入 Agent 的决策能力。传统 RAG 通常是固定流程：先检索，再回答；而 Agentic RAG 会让 LLM 像一个智能体一样，动态决定是否检索、去哪里检索、是否需要重写查询、是否继续补充证据，必要时还会调用其他工具。所以它更适合复杂任务和多数据源场景，但代价是链路更复杂、成本更高。([IBM](https://www.ibm.com/think/topics/agentic-rag?utm_source=chatgpt.com "What is Agentic RAG? | IBM"))

---

## 11. 一句话总结

**Agentic RAG = 让 RAG 不再只是“检索后回答”，而是让一个 Agent 在回答过程中自主决定“何时检索、如何检索、是否继续检索，以及如何结合工具和证据完成任务”。** ([IBM](https://www.ibm.com/think/topics/agentic-rag?utm_source=chatgpt.com "What is Agentic RAG? | IBM"))

你要的话，我下一条可以继续给你讲  
**“普通 RAG、Agentic RAG、Deep Research 式研究 Agent 三者的区别图”**。


参考文章：
[Traditional RAG vs. Agentic RAG—Why AI Agents Need Dynamic Knowledge to Get Smarter](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag-why-ai-agents-need-dynamic-knowledge-to-get-smarter/?utm_source=chatgpt.com)
