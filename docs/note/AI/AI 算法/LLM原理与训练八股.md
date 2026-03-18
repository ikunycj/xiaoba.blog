# LLM 原理与训练八股

> 本文单独整理模型推理、Transformer 核心机制与训练对齐问题，适合作为 Agent 工程之外的“模型原理补课”笔记。
>
> 如果你更关心 Agent 架构、记忆和工程实践，请回到[Agent 架构、记忆与工程八股](AI八股.md))。

## 文档导航

| 模块 | 覆盖内容 | 适合场景 |
| --- | --- | --- |
| **一、推理优化** | Prefix caching、KV cache、Few-shot 注入 | 推理链路、评测体系 |
| **二、Transformer 机制** | Attention、FFN、softmax、mask | 模型原理、面试问答 |
| **三、训练与对齐** | Pretraining、SFT、LoRA、QLoRA、RLHF | 训练流程、微调实践 |

---

## 1. Prefix caching / KV cache 原理

### 为什么缓存的是 K/V？

#### Transformer 推理过程回顾

```
标准 Transformer 解码过程（自回归生成）：

第 1 步: 输入 [A] ──▶ 计算 Q1, K1, V1 ──▶ 输出 B
第 2 步: 输入 [A, B] ──▶ 计算 Q2, K2, V2 ──▶ 输出 C  
第 3 步: 输入 [A, B, C] ──▶ 计算 Q3, K3, V3 ──▶ 输出 D

观察：
- 第 2 步中，K1, V1 在第 1 步已经计算过
- 第 3 步中，K1, V1, K2, V2 都已经计算过
- 每次生成新 token，都需要重新计算之前所有 token 的 K 和 V
```

#### KV Cache 的核心思想

```
启用 KV Cache 后：

第 1 步: 输入 [A] ──▶ 计算 Q1, K1, V1 ──▶ 输出 B
           │
           ▼
        缓存 [K1, V1]

第 2 步: 输入 [B] + 缓存 [K1, V1] ──▶ 计算 Q2, K2, V2 ──▶ 输出 C
           │
           ▼
        缓存 [K1, V1, K2, V2]

第 3 步: 输入 [C] + 缓存 [K1, V1, K2, V2] ──▶ 计算 Q3, K3, V3 ──▶ 输出 D

优化效果：
- 无需重新计算历史 token 的 K/V
- 计算量从 O(n²) 降到 O(n)
- 内存换取速度
```

**缓存 K/V 的原因：**

| 矩阵 | 是否需要缓存 | 原因 |
|------|--------------|------|
| **K (Key)** | ✅ 是 | 用于计算注意力分数，历史 token 的 K 不变 |
| **V (Value)** | ✅ 是 | 用于加权求和，历史 token 的 V 不变 |
| **Q (Query)** | ❌ 否 | 只有当前 token 需要计算 Q |

### 为什么 Q 不缓存？

```
Self-Attention 计算过程：

Attention(Q, K, V) = softmax(Q × K^T / √d) × V

对于第 t 个 token：
- Qt: 只与当前输入 token 相关，每次不同
- K1...Kt-1: 历史 token 的 Key，已缓存
- V1...Vt-1: 历史 token 的 Value，已缓存

Qt 的计算：
Qt = X_t × W_Q

其中 X_t 是当前输入，每次生成都不同
所以 Qt 必须重新计算，无法缓存
```

### 不再算前缀具体指什么？

```
场景：多轮对话，系统提示词很长

传统方式（无 Prefix Caching）：
┌─────────────────────────────────────────────────────────────┐
│ Round 1                                                     │
│ [系统提示词(1000tokens)] + [用户问题] ──▶ 计算全部 K/V ──▶ 回答 │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Round 2                                                     │
│ [系统提示词(1000tokens)] + [历史] + [新问题] ──▶ 重新计算系统提示词的 K/V │
└─────────────────────────────────────────────────────────────┘

Prefix Caching 优化后：
┌─────────────────────────────────────────────────────────────┐
│ 预处理（一次）                                                │
│ [系统提示词(1000tokens)] ──▶ 计算 K/V ──▶ 存入 Prefix Cache    │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Round 1                                                     │
│ [Cache: 系统提示词 K/V] + [用户问题] ──▶ 直接复用 ──▶ 回答      │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Round 2                                                     │
│ [Cache: 系统提示词 K/V] + [历史] + [新问题] ──▶ 直接复用 ──▶ 回答│
└─────────────────────────────────────────────────────────────┘

收益：
- 系统提示词只计算一次
- 多轮对话首 token 延迟大幅降低（TTFT 优化）
```

### Attention 复杂度如何下降？

#### 理论复杂度分析

| 计算阶段 | 无缓存 | 有 KV Cache | 加速比 |
|----------|--------|-------------|--------|
| **计算所有 K, V** | O(n² × d) | O(n × d) | n 倍 |
| **Attention 矩阵** | O(n² × d) | O(n × d) | n 倍 |
| **总复杂度** | O(n² × d) | O(n × d) | n 倍 |

其中：
- n: 序列长度
- d: 模型维度

#### 实际性能对比

```
以 4096 token 序列为例：

无 KV Cache:
- 每步都需要计算 4096 个 token 的 K/V
- 计算量随序列长度平方增长
- 长文本生成极慢

有 KV Cache:
- 每步只需计算 1 个新 token 的 K/V
- 计算量与序列长度线性增长
- 生成速度保持稳定

实测数据（LLaMA-7B）：
- 序列长度 512:  加速 ~2x
- 序列长度 2048: 加速 ~8x  
- 序列长度 8192: 加速 ~32x
```

#### Prefix Caching 额外收益

```
多轮对话场景（系统提示 2000 tokens）：

Round 1:
- 无 Prefix Caching: 需要计算 2000 tokens 的 K/V
- 有 Prefix Caching: 直接复用缓存

Round N:
- 无 Prefix Caching: 每轮都重新计算 2000+ tokens
- 有 Prefix Caching: 始终复用缓存

收益：
- 首 token 延迟（TTFT）降低 50-90%
- 特别适合多轮对话、RAG 等场景
```

---

## 2. Few-shot 在 Agent 评测中的作用

### 是提升能力还是降低方差？

#### 两者的区别

```
┌─────────────────────────────────────────────────────────────────┐
│                    Few-shot 的作用                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   提升能力 (Capability)          降低方差 (Variance)            │
│   ─────────────────────          ─────────────────              │
│                                                                 │
│   • 教授新的任务模式              • 规范输出格式                 │
│   • 提供解决思路                  • 减少随机性                   │
│   • 演示复杂推理步骤              • 稳定输出质量                 │
│                                                                 │
│   例：                            例：                          │
│   展示如何拆解任务                 固定 JSON 输出格式            │
│   演示工具调用方式                 统一错误处理模式              │
│                                                                 │
│   效果：                          效果：                        │
│   能做以前不会的事                 做得更稳定一致                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 实际评测中的观察

| 维度 | 无 Few-shot | 有 Few-shot | 主要作用 |
|------|-------------|-------------|----------|
| **任务完成率** | 45% | 78% | 提升能力 |
| **输出格式一致性** | 60% | 95% | 降低方差 |
| **工具调用正确率** | 50% | 85% | 两者都有 |
| **推理步骤完整性** | 40% | 80% | 提升能力 |

**结论：** Few-shot 在 Agent 评测中**两者兼有**，但侧重点不同：
- **对于复杂任务**：主要是提升能力（教会 Agent 如何做）
- **对于格式要求**：主要是降低方差（规范输出形式）

### 在评测 pipeline 的哪个阶段注入？
```
┌─────────────────────────────────────────────────────────────────┐
│                  Agent 评测 Pipeline                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 测试用例准备                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • 收集/编写测试用例                                       │  │
│  │  • 定义期望输出                                            │  │
│  │  • 准备评测指标                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│  2. Few-shot 构造              │                                  │
│  ┌───────────────────────────▼──────────────────────────────┐  │
│  │  • 选择/编写示例（通常 2-5 个）                           │  │
│  │  • 覆盖不同场景和边界情况                                  │  │
│  │  • 确保示例质量（人工验证）                               │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  3. Prompt 组装              │                                  │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │                                                          │  │
│  │  【系统提示词】                                           │  │
│  │  【Few-shot 示例】 ◄── 在此阶段注入                        │  │
│  │    - Example 1                                           │  │
│  │    - Example 2                                           │  │
│  │    - Example 3                                           │  │
│  │  【待评测任务】                                           │  │
│  │                                                          │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  4. Agent 执行               │                                  │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │  • 调用 Agent API                                          │  │
│  │  • 收集执行过程（工具调用、中间结果）                       │  │
│  │  • 捕获最终输出                                            │  │
│  └─────────────────────────┬────────────────────────────────┘  │
│                            │                                    │
│  5. 结果评估                 │                                  │
│  ┌─────────────────────────▼────────────────────────────────┐  │
│  │  • 对比期望输出 vs 实际输出                                │  │
│  │  • 计算评测指标（准确率、F1 等）                           │  │
│  │  • 分析失败案例                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 注入方式

```typescript
interface FewShotConfig {
  /** 
   * Few-shot 注入位置
   * - "system": 作为系统提示词的一部分
   * - "user": 作为用户消息的一部分
   * - "dynamic": 根据任务动态选择
   */
  injectionPosition: 'system' | 'user' | 'dynamic';
  
  /**
   * 示例选择策略
   * - "fixed": 固定示例（所有任务相同）
   * - "similarity": 基于相似度选择最相关的示例
   * - "diverse": 选择覆盖不同场景的示例
   */
  selectionStrategy: 'fixed' | 'similarity' | 'diverse';
  
  /**
   * 示例数量
   */
  numExamples: number;
}

/**
 * 构造 Few-shot Prompt
 */
function constructFewShotPrompt(
  systemPrompt: string,
  examples: Example[],
  task: Task
): string {
  const parts: string[] = [];
  
  // 系统提示词
  parts.push(systemPrompt);
  parts.push('\n以下是一些示例：\n');
  
  // Few-shot 示例
  for (let i = 0; i < examples.length; i++) {
    parts.push(`\n【示例 ${i + 1}】`);
    parts.push(`输入：${examples[i].input}`);
    parts.push(`输出：${examples[i].output}`);
  }
  
  // 待评测任务
  parts.push(`\n【现在请处理以下任务】`);
  parts.push(`输入：${task.input}`);
  parts.push('输出：');
  
  return parts.join('\n');
}
```

### 如何防止 few-shot 过拟合？

#### 过拟合的表现

```
过拟合信号：

1. 在训练示例上表现很好，但在新任务上表现差
   - 训练集准确率: 95%
   - 测试集准确率: 45%

2. 输出格式机械复制
   - 示例中用了特定格式，Agent 机械套用
   - 即使不适用也强行套用

3. 忽略任务具体要求
   - 过度关注示例模式
   - 忽略当前任务的独特要求
```

#### 防止策略

| 策略 | 说明 | 实施方法 |
|------|------|----------|
| **多样化示例** | 覆盖不同场景和风格 | 选择差异大的示例，避免同质化 |
| **限制示例数量** | 示例不是越多越好 | 通常 2-5 个足够，过多反而干扰 |
| **留出验证集** | 专门用于验证的测试用例 | 确保测试用例不在示例中 |
| **动态示例选择** | 根据任务选择最相关的示例 | 使用 embedding 相似度匹配 |
| **添加干扰示例** | 包含负例或边界情况 | 帮助 Agent 理解边界 |
| **元提示词引导** | 明确提示 Agent 不要机械复制 | "请根据当前任务灵活处理" |

#### 实践建议

```typescript
/**
 * 防止过拟合的 Few-shot 配置
 */
const robustFewShotConfig: FewShotConfig = {
  injectionPosition: 'system',
  selectionStrategy: 'diverse',  // 多样化选择
  numExamples: 3,                // 控制数量
  
  // 额外配置
  diversityThreshold: 0.7,       // 示例间相似度不超过 0.7
  includeNegativeExample: true,  // 包含负例
  addInstruction: '请根据当前任务的具体情况灵活处理，不要机械复制示例中的格式。'
};

/**
 * 验证过拟合的检查方法
 */
function checkOverfitting(
  trainResults: EvaluationResult[],
  testResults: EvaluationResult[]
): OverfittingReport {
  const trainAccuracy = calculateAccuracy(trainResults);
  const testAccuracy = calculateAccuracy(testResults);
  const gap = trainAccuracy - testAccuracy;
  
  return {
    trainAccuracy,
    testAccuracy,
    gap,
    isOverfitting: gap > 0.2,  // 差距超过 20% 认为过拟合
    suggestion: gap > 0.2 
      ? '建议：增加示例多样性，减少示例数量，或使用动态选择策略'
      : '表现良好，无明显过拟合'
  };
}
```

---

## 3. Attention / Self-Attention / FFN 的区别

### Self-attention 做什么？

#### 核心功能

```
Self-Attention 的核心：计算序列中每个位置与其他所有位置的关系权重

输入序列: [我, 喜欢, 深度, 学习]
           ↓
    ┌─────────────────────────────────────┐
    │           Self-Attention            │
    │                                     │
    │   我 ──→ 我(强) 喜欢(中) 深度(弱) 学习(弱)  │
    │   喜欢 ─→ 我(中) 喜欢(强) 深度(中) 学习(中) │
    │   深度 ─→ 我(弱) 喜欢(中) 深度(强) 学习(强) │
    │   学习 ─→ 我(弱) 喜欢(中) 深度(强) 学习(强) │
    │                                     │
    │   "学习" 与 "深度" 关联度最高         │
    └─────────────────────────────────────┘
           ↓
输出: [融合上下文的向量表示]

一句话总结：
Self-Attention 让每个词都能看到其他所有词，并根据相关性加权融合信息
```

#### 计算过程

```
Self-Attention 计算步骤：

1. 线性变换生成 Q, K, V
   X (输入) ──▶ Q = X × W_Q  (Query: 我要查什么)
            ──▶ K = X × W_K  (Key: 我有什么)
            ──▶ V = X × W_V  (Value: 实际内容)

2. 计算注意力分数 (Attention Score)
   Score = Q × K^T / √d
   
   结果是一个 n×n 的矩阵，表示每对位置的相关性

3. Softmax 归一化
   Attention_Weights = Softmax(Score)
   
   每行和为 1，表示权重分布

4. 加权求和
   Output = Attention_Weights × V
   
   根据权重聚合 Value 信息

直观理解：
- Q: "我在找什么信息？"
- K: "我有什么信息可供查询？"
- V: "信息的具体内容是什么？"
```

### 三者对比

```
┌─────────────────────────────────────────────────────────────────┐
│              Attention 机制对比                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Self-Attention              Cross-Attention                   │
│  ─────────────               ─────────────                     │
│                                                                 │
│  Q, K, V 来自同一序列          Q 来自解码器                      │
│  ┌─────────┐                 K, V 来自编码器                     │
│  │ 序列 A  │──────────┐      ┌─────────┐    ┌─────────┐        │
│  └─────────┘          │      │ 序列 A  │    │ 序列 B  │        │
│       ↓               │      │ (编码器) │───▶│ (解码器) │        │
│   Q, K, V             │      └─────────┘    └────┬────┘        │
│       ↓               │            ↓            ↓             │
│   Attention           │           K, V ────────▶ Q             │
│       ↓               │                      Attention          │
│   输出                 │                          ↓             │
│                      │                        输出             │
│  用途：编码器内部理解   │                      用途：Seq2Seq 对齐  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FFN (Feed-Forward Network)                                     │
│  ─────────────────────────                                      │
│                                                                 │
│  输入 ──▶ Linear ──▶ Activation ──▶ Linear ──▶ 输出            │
│            ↑                                    ↑               │
│         升维(4d)                            降维(d)             │
│                                                                 │
│  作用：                                                          │
│  • 对每个位置独立进行非线性变换                                  │
│  • 增加模型表达能力                                              │
│  • 不同位置之间没有交互（与 Attention 互补）                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 详细对比表

| 特性 | Self-Attention | Cross-Attention | FFN |
|------|----------------|-----------------|-----|
| **输入来源** | 单序列 | 双序列（Q来自目标，KV来自源） | 单序列 |
| **位置交互** | 全局交互 | 跨序列对齐 | 无交互（逐位置） |
| **计算复杂度** | O(n²) | O(n×m) | O(n) |
| **主要作用** | 捕获序列内部依赖 | 建立序列间映射 | 非线性特征变换 |
| **在 Transformer 中的位置** | Encoder/Decoder | Decoder（中间层） | 每个子层后 |
| **参数共享** | 同一序列内共享 | 跨序列不共享 | 所有位置共享 |

#### 代码层面的区别
```python
# Self-Attention (自注意力)
def self_attention(x):
    # Q, K, V 都来自同一个输入 x
    Q = linear_q(x)  # [batch, seq_len, dim]
    K = linear_k(x)  # [batch, seq_len, dim]
    V = linear_v(x)  # [batch, seq_len, dim]
    
    scores = Q @ K.transpose(-2, -1) / sqrt(dim)
    attn_weights = softmax(scores, dim=-1)
    output = attn_weights @ V
    return output

# Cross-Attention (交叉注意力)
def cross_attention(x_decoder, x_encoder):
    # Q 来自解码器，K, V 来自编码器
    Q = linear_q(x_decoder)      # [batch, tgt_len, dim]
    K = linear_k(x_encoder)      # [batch, src_len, dim]
    V = linear_v(x_encoder)      # [batch, src_len, dim]
    
    scores = Q @ K.transpose(-2, -1) / sqrt(dim)
    attn_weights = softmax(scores, dim=-1)
    output = attn_weights @ V
    return output

# FFN (前馈网络)
def ffn(x):
    # 对每个位置独立应用
    # x: [batch, seq_len, dim]
    x = linear_up(x)      # [batch, seq_len, 4*dim]
    x = activation(x)     # 非线性变换
    x = linear_down(x)    # [batch, seq_len, dim]
    return x
```

#### 直观理解

| 机制 | 类比 | 作用 |
|------|------|------|
| **Self-Attention** | 会议讨论 | 每个人听取所有人的发言，决定关注谁 |
| **Cross-Attention** | 翻译过程 | 翻译时查看原文，决定翻译哪个词 |
| **FFN** | 个人思考 | 听完讨论后，每个人独立整理思路 |

#### 为什么需要三者配合？
```
Transformer 层的工作流程：

输入 X
  │
  ▼
┌──────────────────┐
│ Self-Attention   │  ← "我先看看上下文，理解整体"（全局交互）
│ （全局交互）      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ FFN              │  ← "我再深入思考一下"（非线性变换）
│ （独立变换）      │
└────────┬─────────┘
         │
         ▼
    输出（增强表示）

在 Decoder 中还有：

Self-Attention Output
         │
         ▼
┌──────────────────┐
│ Cross-Attention  │  ← "我参考一下编码器的信息"（跨序列对齐）
│ （跨序列对齐）    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ FFN              │
└────────┬─────────┘
         │
         ▼
    输出

三者互补：
- Self-Attention: 捕获内部依赖
- Cross-Attention: 建立外部联系
- FFN: 增强表达能力
```

### FFN 做什么？

#### FFN 的核心作用

```
FFN (Feed-Forward Network) 前馈神经网络

结构：Linear → Activation → Linear
      (升维)    (非线性)    (降维)
      
维度变化：[batch, seq_len, d] → [batch, seq_len, 4d] → [batch, seq_len, d]

直观理解：
- 类似于 MLP (多层感知机)
- 对每个位置独立进行变换（位置之间不交互）
- 引入非线性，增强模型表达能力
```

#### 为什么需要 FFN？

```
如果没有 FFN：
┌─────────────────────────────────────────────────────────────┐
│  Self-Attention 只做了线性变换 + 加权平均                    │
│                                                             │
│  Output = Σ(softmax(Q×K^T) × V)                            │
│           ↑                              ↑                 │
│        线性变换                        线性组合              │
│                                                             │
│  问题：                                                      │
│  1. 整体仍然是线性的                                         │
│  2. 缺乏非线性表达能力                                       │
│  3. 无法学习复杂的特征变换                                   │
└─────────────────────────────────────────────────────────────┘

加上 FFN 后：
┌─────────────────────────────────────────────────────────────┐
│  FFN 引入了非线性激活函数（如 GELU、ReLU）                    │
│                                                             │
│  FFN(x) = Linear_down(Activation(Linear_up(x)))            │
│                        ↑                                   │
│                    非线性变换                                │
│                                                             │
│  收益：                                                      │
│  1. 增加非线性表达能力                                       │
│  2. 每个位置可以独立进行复杂的特征变换                        │
│  3. 与 Attention 互补（Attention 做交互，FFN 做变换）         │
└─────────────────────────────────────────────────────────────┘
```

#### FFN 的详细计算

```python
import torch
import torch.nn as nn

class FeedForward(nn.Module):
    def __init__(self, d_model=512, d_ff=2048, dropout=0.1):
        super().__init__()
        # 第一个线性层：升维（通常扩大到 4 倍）
        self.linear1 = nn.Linear(d_model, d_ff)
        
        # 激活函数：引入非线性
        self.activation = nn.GELU()  # 或 ReLU
        
        # Dropout：防止过拟合
        self.dropout = nn.Dropout(dropout)
        
        # 第二个线性层：降维（回到原始维度）
        self.linear2 = nn.Linear(d_ff, d_model)
    
    def forward(self, x):
        # x: [batch_size, seq_len, d_model]
        
        # Step 1: 升维
        x = self.linear1(x)  # [batch, seq_len, d_ff]
        
        # Step 2: 非线性激活
        x = self.activation(x)
        
        # Step 3: Dropout
        x = self.dropout(x)
        
        # Step 4: 降维
        x = self.linear2(x)  # [batch, seq_len, d_model]
        
        return x

# 为什么升维再降维？
# 答：高维空间可以学习更复杂的特征表示
# 类似于 "kernel trick" 的思想
```

#### 为什么中间层要扩大 4 倍？

| 维度比例 | 参数量 | 效果 | 常用程度 |
|----------|--------|------|----------|
| **2x** | 较少 | 表达能力有限 | 少用 |
| **4x** | 适中 | 表达能力好，计算量可控 | ✅ 最常用 |
| **8x** | 较多 | 表达能力更强，但计算量大 | 偶尔用 |

```
经验选择 4x 的原因：

1. 表达能力：4x 提供了足够的隐藏层容量
2. 计算效率：不至于让 FFN 成为瓶颈
3. 内存占用：与 Attention 的计算量平衡
4. 历史沿袭：Transformer 原论文就是这么设计的
```

### 为什么 prefix caching 只优化 attention？

#### 核心原因

```
┌─────────────────────────────────────────────────────────────────┐
│              Prefix Caching 只优化 Attention 的原因              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 计算重复性                                                   │
│  ─────────────                                                   │
│  • Attention 中 K, V 的计算是确定性的                           │
│  • 相同输入 → 相同的 K, V                                       │
│  • FFN 每层输出也确定，但...                                    │
│                                                                 │
│  2. 缓存收益对比                                                 │
│  ─────────────                                                 │
│                                                                 │
│     操作        计算量      缓存收益      是否值得缓存           │
│  ──────────────────────────────────────────────────────         │
│  K, V 计算     O(n×d)      非常高        ✅ 值得                │
│  Q 计算        O(d)        低            ❌ 不值得              │
│  Attention     O(n²)       极高          ✅ 值得                │
│  FFN           O(n×d)      中等          ⚠️ 有限收益            │
│                                                                 │
│  3. 实际架构考虑                                                 │
│  ─────────────                                                 │
│  • FFN 每层输出依赖于该层的输入                                  │
│  • 每层输入不同 → 每层 FFN 输出都不同                            │
│  • 缓存 FFN 中间结果需要存储每层的状态                           │
│  • 内存开销太大，收益有限                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 详细解释

```
Transformer 层的数据流：

输入 X (前缀)
    │
    ├──▶ Layer 1 ──────────────────────┐
    │    • Self-Attention               │
    │      - Q1 = X × W_Q1              │
    │      - K1 = X × W_K1  ◄── 可缓存   │
    │      - V1 = X × W_V1  ◄── 可缓存   │
    │    • FFN                          │
    │      - FFN1(X)                    │
    │    输出：H1                        │
    │                                   │
    ├──▶ Layer 2 ──────────────────────┤
    │    • Self-Attention               │
    │      - Q2 = H1 × W_Q2             │
    │      - K2 = H1 × W_K2  ◄── 不同！ │
    │      - V2 = H1 × W_V2  ◄── 不同！ │
    │    • FFN                          │
    │      - FFN2(H1)                   │
    │    输出：H2                        │
    │                                   │
    └──▶ Layer 3 ...                    │
                                        │
关键观察：                              │
• 每层 K, V 都依赖于该层输入            │
• 层与层之间输入不同 → K, V 不同        │
• 但同一层的 K, V 对于相同输入是固定的  │
                                        │
Prefix Caching 策略：                   │
• 缓存每层的 K, V（针对前缀）           │
• 不缓存 FFN 输出（每层都不同）         │
└───────────────────────────────────────┘
```

#### 总结

| 组件 | 是否缓存 | 原因 |
|------|----------|------|
| **K, V (每层)** | ✅ 是 | 对相同输入可复用，计算量大 |
| **Attention 输出** | ✅ 是 | 避免重复计算注意力矩阵 |
| **FFN 输出** | ❌ 否 | 每层输入不同，缓存收益低 |
| **LayerNorm 参数** | ❌ 否 | 本来就是固定的 |

---

## 4. 为什么加负无穷就会让权重变 0？

### softmax 数学解释

#### softmax 公式回顾

```
              exp(x_i)
softmax(x_i) = ──────────
               Σ exp(x_j)

其中：
• x_i: 第 i 个元素的分数
• exp(x_i): e 的 x_i 次方
• Σ exp(x_j): 所有元素 exp 后的和
```

#### 加负无穷的效果

```
假设有一个分数向量：scores = [2.0, 1.0, 0.5, -inf]

计算 softmax：

Step 1: 计算 exp
  exp(2.0)   = e²   ≈ 7.389
  exp(1.0)   = e¹   ≈ 2.718
  exp(0.5)   = e⁰·⁵ ≈ 1.649
  exp(-inf)  = 0     ← 关键！

Step 2: 计算总和
  sum = 7.389 + 2.718 + 1.649 + 0 = 11.756

Step 3: 计算 softmax
  softmax(2.0)  = 7.389 / 11.756 ≈ 0.628
  softmax(1.0)  = 2.718 / 11.756 ≈ 0.231
  softmax(0.5)  = 1.649 / 11.756 ≈ 0.140
  softmax(-inf) = 0     / 11.756 = 0     ← 权重为 0！

结果：[0.628, 0.231, 0.140, 0.000]

结论：加了 -inf 的位置权重变为 0
```

#### 数学原理

```
为什么 exp(-inf) = 0？

因为：
exp(x) = e^x

e ≈ 2.71828

当 x → -∞ 时：
e^(-∞) = 1 / e^∞ = 1 / ∞ = 0

直观理解：
• e 的负无穷次方 = 1 除以 e 的正无穷次方
• e 的正无穷次方是无穷大
• 1 除以无穷大 = 0
```

#### 在 Attention 中的应用

```
在 Decoder 的自注意力中使用（Causal Mask）：

位置：  1    2    3    4
      ┌────┬────┬────┬────┐
   1  │ ✓  │ ✗  │ ✗  │ ✗  │  位置1只能看到位置1
      ├────┼────┼────┼────┤
   2  │ ✓  │ ✓  │ ✗  │ ✗  │  位置2能看到位置1,2
      ├────┼────┼────┼────┤
   3  │ ✓  │ ✓  │ ✓  │ ✗  │  位置3能看到位置1,2,3
      ├────┼────┼────┼────┤
   4  │ ✓  │ ✓  │ ✓  │ ✓  │  位置4能看到所有位置
      └────┴────┴────┴────┘

实现方式：
scores = Q × K^T

对于位置 2（只能看到位置1,2）：
scores = [s_21, s_22, s_23, s_24]
       = [0.5,  1.2,  0.8,  0.3]

加 mask：
masked_scores = [0.5, 1.2, -inf, -inf]

softmax 后：
weights = [0.33, 0.67, 0, 0]
          ↑     ↑     ↑  ↑
         保留  保留   屏蔽 屏蔽

效果：位置 2 只能关注位置 1 和 2
```

---

## 5. 掩码（mask）是什么？

### 基本概念

```
掩码（Mask）= 一个二进制矩阵，用于控制 "看" 或 "不看"

作用：
• 屏蔽某些位置的信息
• 控制信息流动的范围
• 实现特定的注意力模式

类比：
就像给模型戴上一个"眼罩"，让它只能看到允许看到的内容
```

### Causal Mask（因果掩码）

#### 什么是 Causal Mask？

```
Causal Mask = 因果掩码 = 只让当前位置看到之前的位置

用途：
• 主要用于 Decoder 的自注意力
• 防止模型"偷看"未来的信息
• 保证生成过程的因果性

示例（序列长度 4）：

          位置1  位置2  位置3  位置4
位置1      1      0      0      0    ← 位置1只能看自己
位置2      1      1      0      0    ← 位置2能看1,2
位置3      1      1      1      0    ← 位置3能看1,2,3
位置4      1      1      1      1    ← 位置4能看全部

1 = 可以看到，0 = 不能看到（加 -inf）
```

#### 为什么需要 Causal Mask？

```
语言生成的因果性要求：

生成第 t 个词时，只能基于前 t-1 个词

错误的做法（无 mask）：
生成 "我爱" 时，模型已经知道后面是 "编程"
→ 这不是真正的生成，而是复制

正确的做法（有 causal mask）：
生成 "我爱" 时，模型不知道后面是什么
→ 真正学习 "我爱" 后面应该接什么
```

#### 代码实现
```python
import torch

def create_causal_mask(seq_len):
    """
    创建因果掩码
    
    返回一个上三角矩阵，上三角为 -inf
    """
    # 创建上三角矩阵（不包括对角线）
    mask = torch.triu(
        torch.ones(seq_len, seq_len), 
        diagonal=1  # 从对角线上方开始
    )
    
    # 将 1 转为 -inf，0 转为 0
    mask = mask.masked_fill(mask == 1, float('-inf'))
    mask = mask.masked_fill(mask == 0, 0)
    
    return mask

# 示例
seq_len = 4
causal_mask = create_causal_mask(seq_len)
print(causal_mask)

# 输出：
# tensor([[ 0., -inf, -inf, -inf],
#         [ 0.,  0., -inf, -inf],
#         [ 0.,  0.,  0., -inf],
#         [ 0.,  0.,  0.,  0.]])

# 应用到 attention scores
scores = torch.randn(4, 4)  # 假设的注意力分数
masked_scores = scores + causal_mask
print(masked_scores)
```

### Padding Mask（填充掩码）

#### 什么是 Padding Mask？

```
Padding Mask = 填充掩码 = 屏蔽填充位置

用途：
• 处理变长序列
• 屏蔽填充符（如 <pad>）的影响
• 让所有序列长度一致，便于批量处理

示例：

原始序列：
  "我爱编程" → [我, 爱, 编程, <pad>, <pad>]  (长度5)
  "你好"    → [你, 好, <pad>, <pad>, <pad>]  (长度5)
  
Padding Mask：
  [1, 1, 1, 0, 0]  ← 前3个是真实词，后2个是填充
  [1, 1, 0, 0, 0]  ← 前2个是真实词，后3个是填充

1 = 真实内容，0 = 填充（需要屏蔽）
```

#### 为什么需要 Padding Mask？

```
问题：

如果不屏蔽填充位置：
  "我爱编程<pad><pad>"
    ↓
  <pad> 也会参与 attention 计算
    ↓
  引入噪声，影响结果

正确做法：
  "我爱编程<pad><pad>"
    ↓
  屏蔽 <pad> 位置
    ↓
  只关注真实的 "我爱编程"
```

#### 代码实现

```python
def create_padding_mask(seq, pad_idx=0):
    """
    创建填充掩码
    
    Args:
        seq: 输入序列 [batch_size, seq_len]
        pad_idx: 填充符的索引
    
    Returns:
        mask: [batch_size, seq_len]
    """
    # 等于 pad_idx 的位置为 0，否则为 1
    mask = (seq != pad_idx).float()
    
    return mask

# 示例
seq1 = torch.tensor([1, 2, 3, 0, 0])  # "我爱编程<pad><pad>"
seq2 = torch.tensor([4, 5, 0, 0, 0])  # "你好<pad><pad><pad>"

batch = torch.stack([seq1, seq2])
padding_mask = create_padding_mask(batch)

print(padding_mask)
# tensor([[1., 1., 1., 0., 0.],
#         [1., 1., 0., 0., 0.]])
```

### 在 Transformer 中的作用

```
┌─────────────────────────────────────────────────────────────────┐
│              Mask 在 Transformer 中的应用                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Encoder                                                      │
│  ───────                                                      │
│  • Self-Attention: Padding Mask                               │
│    屏蔽填充位置，只关注真实内容                                  │
│                                                                 │
│  Decoder                                                      │
│  ───────                                                      │
│  • Masked Self-Attention: Causal Mask + Padding Mask          │
│    - Causal: 防止看到未来信息                                   │
│    - Padding: 屏蔽填充位置                                      │
│                                                                 │
│  • Cross-Attention: Padding Mask (Encoder output)             │
│    屏蔽编码器输出的填充位置                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 完整的 Mask 使用流程

```python
import torch
import torch.nn as nn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        # ... 初始化参数
    
    def forward(self, Q, K, V, mask=None):
        """
        Args:
            Q, K, V: [batch, seq_len, d_model]
            mask: [batch, seq_len, seq_len] 或 [batch, 1, seq_len]
        """
        # 1. 线性变换
        Q = self.W_q(Q)
        K = self.W_k(K)
        V = self.W_v(V)
        
        # 2. 计算注意力分数
        scores = torch.matmul(Q, K.transpose(-2, -1)) / sqrt(self.d_model)
        
        # 3. 应用 mask（关键！）
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
            # 或：scores = scores + mask（如果 mask 中是 -inf）
        
        # 4. softmax
        attn_weights = torch.softmax(scores, dim=-1)
        
        # 5. 加权求和
        output = torch.matmul(attn_weights, V)
        
        return output

# 使用示例
d_model = 512
num_heads = 8
mha = MultiHeadAttention(d_model, num_heads)

# 输入
batch_size = 2
seq_len = 10
x = torch.randn(batch_size, seq_len, d_model)

# 创建 masks
causal_mask = create_causal_mask(seq_len)  # [seq_len, seq_len]
padding_mask = create_padding_mask(...)     # [batch, seq_len]

# 组合 mask（在 self-attention 中）
combined_mask = causal_mask.unsqueeze(0) & padding_mask.unsqueeze(1)

# 前向传播
output = mha(x, x, x, mask=combined_mask)
```

---

## 6. 是否做过 LLM 训练？

> **Code-Miner 视角**：项目主要关注推理阶段的优化和工程实践，而非模型训练。

### 是否做过 pretraining？

#### Pretraining 简介

```
Pretraining（预训练）= 在大规模语料上学习通用语言表示

目标：让模型学会语言的基本规律
• 词汇和语法
• 语义和上下文
• 世界知识和常识

常见任务：
• 语言建模（预测下一个词）
• Masked Language Modeling（如 BERT）
• 去噪自编码
```

#### 如果做过，可能的经历

```
┌─────────────────────────────────────────────────────────────────┐
│                     Pretraining 经历                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  数据准备                                                       │
│  ───────                                                       │
│  • 收集语料（网页、书籍、论文等）                                │
│  • 数据清洗（去重、去噪、过滤低质量内容）                         │
│  • 数据预处理（分词、格式化）                                    │
│  • 构建训练数据集（通常 TB 级别）                                │
│                                                                 │
│  模型训练                                                       │
│  ───────                                                       │
│  • 选择模型架构（Transformer、MoE 等）                           │
│  • 设置超参数（学习率、batch size、优化器）                       │
│  • 分布式训练（多机多卡）                                        │
│  • 训练过程监控（loss、grad norm、learning rate）                │
│  • 断点续训和容错处理                                            │
│                                                                 │
│  评估与迭代                                                     │
│  ───────────                                                   │
│  • 下游任务评估（perplexity、下游任务 fine-tune）                │
│  • 模型 checkpoint 管理                                          │
│  • 迭代优化数据配比和训练策略                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 如果没有做过

```
如果没有直接参与 pretraining，可以：

1. 了解基本原理
   • 阅读 GPT、LLaMA 等论文
   • 理解数据流和训练流程
   • 熟悉分布式训练框架（Megatron-LM、DeepSpeed）

2. 小规模实验
   • 使用 TinyStories 等小数据集
   • 训练一个小模型（如 10M 参数）
   • 理解训练动态

3. 关注工程实践
   • 数据 pipeline 设计
   • 训练稳定性保障
   • 成本优化策略
```

### 是否做过 SFT？

#### SFT 简介

```
SFT（Supervised Fine-Tuning）= 有监督微调

在预训练模型基础上，使用标注数据进行监督学习

目的：
• 让模型学会遵循指令
• 让模型学会特定格式
• 对齐人类偏好

数据形式：
[
  {
    "instruction": "请总结一下这篇文章",
    "input": "文章正文...",
    "output": "总结内容..."
  },
  ...
]
```

#### 如果做过，可能的经历

```
┌─────────────────────────────────────────────────────────────────┐
│                      SFT 经历                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  数据工程                                                       │
│  ───────                                                       │
│  • 收集指令数据（人工标注、模型生成、开源数据集）                 │
│  • 数据质量筛选（去重、过滤低质量样本）                          │
│  • 数据格式统一（ChatML、ShareGPT 等格式）                       │
│  • 数据配比（不同任务类型的比例）                                │
│                                                                 │
│  训练过程                                                       │
│  ───────                                                       │
│  • 加载预训练模型（基座模型）                                    │
│  • 配置训练参数（学习率通常较小，如 1e-5 ~ 2e-5）                 │
│  • 只计算 output 部分的 loss（不计算 input 部分）                │
│  • 使用 LoRA/QLoRA 等高效微调方法（可选）                        │
│  • 验证集监控，防止过拟合                                        │
│                                                                 │
│  评估与迭代                                                     │
│  ───────────                                                   │
│  • 自动评估（BLEU、ROUGE、perplexity）                           │
│  • 人工评估（打分、对比）                                        │
│  • 构造测试集，覆盖不同场景                                      │
│  • 迭代优化数据和训练策略                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### SFT 代码示例

```python
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer
)
from datasets import load_dataset
import torch

# 1. 加载模型和 tokenizer
model_name = "meta-llama/Llama-2-7b-hf"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.bfloat16,
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# 2. 准备数据
def format_prompt(example):
    """格式化指令数据"""
    if example['input']:
        prompt = f"### Instruction:\n{example['instruction']}\n\n### Input:\n{example['input']}\n\n### Response:\n"
    else:
        prompt = f"### Instruction:\n{example['instruction']}\n\n### Response:\n"
    
    full_text = prompt + example['output']
    return {'text': full_text, 'prompt_length': len(tokenizer(prompt)['input_ids'])}

dataset = load_dataset('json', data_files='sft_data.jsonl')
dataset = dataset.map(format_prompt)

# 3. 只计算 response 部分的 loss
def data_collator(features):
    """自定义 collator，对 prompt 部分设置 label=-100"""
    batch = tokenizer(
        [f['text'] for f in features],
        padding=True,
        truncation=True,
        max_length=2048,
        return_tensors='pt'
    )
    
    labels = batch['input_ids'].clone()
    
    # 将 prompt 部分的 label 设为 -100（不计算 loss）
    for i, f in enumerate(features):
        prompt_len = f['prompt_length']
        labels[i, :prompt_len] = -100
    
    batch['labels'] = labels
    return batch

# 4. 配置训练参数
training_args = TrainingArguments(
    output_dir='./sft_output',
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-5,
    warmup_ratio=0.03,
    logging_steps=10,
    save_steps=500,
    bf16=True,
    optim='adamw_torch',
)

# 5. 训练
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset['train'],
    data_collator=data_collator,
)

trainer.train()
```

### 完整 LLM 训练流程

```
┌─────────────────────────────────────────────────────────────────┐
│                 LLM 完整训练流程                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Phase 1: Pretraining                                          │
│  ───────────────────                                           │
│  数据：TB 级无标注文本                                            │
│  目标：学习语言通用表示                                           │
│  算力：成千上万 GPU，训练数月                                      │
│  产出：Base Model（基座模型）                                    │
│       ↓                                                         │
│  Phase 2: SFT (Supervised Fine-Tuning)                         │
│  ───────────────────────────────────                           │
│  数据：十万到百万级指令数据                                        │
│  目标：学会遵循指令、对话能力                                      │
│  算力：几十到几百 GPU，训练数天                                    │
│  产出：SFT Model（指令模型）                                      │
│       ↓                                                         │
│  Phase 3: RLHF (可选)                                           │
│  ────────────────────                                           │
│  数据：人类偏好标注数据                                           │
│  目标：对齐人类价值观和偏好                                       │
│  方法：PPO、DPO、RLAIF 等                                         │
│  产出：Aligned Model（对齐模型）                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 面试回答建议

```
如果被问到 "是否做过 LLM 训练"，可以这样回答：

情况 1：有实际经验
"我在 XX 项目中有过 LLM 训练经验，主要负责：
• pretraining 阶段的数据清洗和训练监控
• 使用 Megatron-LM 进行分布式训练
• SFT 阶段的数据构建和指令微调
• 遇到过 XX 问题，通过 XX 方法解决"

情况 2：没有实际经验，但了解原理
"虽然我没有直接参与过大模型的训练，但我：
• 深入理解了 pretraining 和 SFT 的原理
• 在 XX 数据集上做过小规模的实验
• 熟悉 transformers、DeepSpeed 等框架
• 阅读过 LLaMA、GPT-3 等论文，理解训练细节"

情况 3：没有经验，但有相关技能
"我目前没有直接的 LLM 训练经验，但我：
• 有深度学习训练经验（CV/NLP 其他任务）
• 熟悉 PyTorch 和分布式训练
• 对 Transformer 架构和训练流程有深入理解
• 正在学习相关技术，有强烈的学习意愿"
```

### 是否做过 LoRA / QLoRA？

#### LoRA / QLoRA 简介

```
LoRA (Low-Rank Adaptation) = 低秩适应
• 冻结预训练模型的大部分参数
• 只训练少量的低秩矩阵
• 大幅减少训练参数量和显存占用

QLoRA (Quantized LoRA) = 量化 + LoRA
• 在 LoRA 基础上，将基座模型量化为 4-bit
• 进一步降低显存需求
• 可以在消费级显卡上微调大模型
```

#### LoRA 原理

```
┌─────────────────────────────────────────────────────────────────┐
│                      LoRA 原理                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  原始微调（Full Fine-tune）：                                     │
│  ┌─────────┐                                                    │
│  │ 预训练权重 W │  ◄── 全部更新（参数多，显存大）                  │
│  └─────────┘                                                    │
│                                                                 │
│  LoRA 微调：                                                     │
│  ┌─────────┐      ┌─────┐                                       │
│  │ 冻结的 W  │  +  │ A×B │  ◄── 只更新 A 和 B（参数少）            │
│  └─────────┘      └─────┘                                       │
│                    ↑                                            │
│                 低秩矩阵                                         │
│                 A: d×r, B: r×d (r << d)                         │
│                                                                 │
│  前向传播：h = Wx + (BA)x                                       │
│                                                                 │
│  优势：                                                          │
│  • 训练参数减少为原来的 1%~10%                                   │
│  • 显存占用大幅降低                                              │
│  • 可以训练更大的模型                                            │
│  • 多任务切换只需切换 LoRA 权重                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### QLoRA 原理

```
┌─────────────────────────────────────────────────────────────────┐
│                     QLoRA 原理                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  4-bit 量化基座模型：                                             │
│  ┌─────────────────────────────────────────┐                    │
│  │  原始 FP16 权重: 16 bits × N            │                    │
│  │      ↓ 量化                              │                    │
│  │  NF4 权重: 4 bits × N                   │                    │
│  │      ↓ 分页优化                          │                    │
│  │  分页到 CPU 内存（需要时加载）            │                    │
│  └─────────────────────────────────────────┘                    │
│                                                                 │
│  双量化技术：                                                    │
│  • 权重量化：FP16 → NF4 (4-bit Normal Float)                    │
│  • 量化常数量化：进一步压缩量化参数                               │
│                                                                 │
│  显存对比（以 7B 模型为例）：                                      │
│  ┌──────────────────┬─────────────┬─────────────┐               │
│  │ 方法             │ 显存占用     │ 可微调大小   │               │
│  ├──────────────────┼─────────────┼─────────────┤               │
│  │ Full Fine-tune   │ ~120GB      │ 7B          │               │
│  │ LoRA             │ ~30GB       │ 7B          │               │
│  │ QLoRA            │ ~6GB        │ 70B         │               │
│  └──────────────────┴─────────────┴─────────────┘               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 实践示例

```python
# LoRA 配置示例 (使用 PEFT 库)
from peft import LoraConfig, get_peft_model, TaskType

lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                    # LoRA 秩
    lora_alpha=32,           # 缩放参数
    lora_dropout=0.05,       # Dropout
    target_modules=[         # 应用 LoRA 的模块
        "q_proj",
        "k_proj", 
        "v_proj",
        "o_proj"
    ]
)

# 应用 LoRA 到模型
model = get_peft_model(base_model, lora_config)
model.print_trainable_parameters()
# 输出: trainable params: 33M || all params: 7B || trainable%: 0.47
```

```python
# QLoRA 配置示例
from transformers import BitsAndBytesConfig
from peft import LoraConfig

# 4-bit 量化配置
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True  # 嵌套量化
)

# 加载量化模型
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto"
)

# 应用 LoRA
model = get_peft_model(model, lora_config)
```

### 是否参与 RLHF / 对齐？

#### RLHF 简介

```
RLHF (Reinforcement Learning from Human Feedback)
= 基于人类反馈的强化学习

三个阶段：
1. SFT: 监督微调（教会模型基本能力）
2. RM:  训练奖励模型（学习人类偏好）
3. RL:  强化学习优化（使用 PPO 等算法）
```

#### RLHF 流程详解

```
┌─────────────────────────────────────────────────────────────────┐
│                    RLHF 三阶段流程                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Stage 1: SFT (已完成)                                          │
│  ─────────────────────                                          │
│  输入：指令-回复数据对                                           │
│  训练：监督学习                                                  │
│  产出：SFT 模型                                                  │
│       │                                                         │
│       ▼                                                         │
│  Stage 2: 奖励模型训练                                           │
│  ─────────────────────                                           │
│  数据：同一问题的多个回复，人工排序                               │
│       Prompt → [回复 A, 回复 B, 回复 C] → 排序: B > A > C        │
│       │                                                         │
│       ▼                                                         │
│  训练：学习预测人类偏好                                          │
│       Loss = -log σ(r_θ(x, y_w) - r_θ(x, y_l))                  │
│       (最大化好回复的分数，最小化差回复的分数)                     │
│       │                                                         │
│       ▼                                                         │
│  产出：奖励模型 (Reward Model)                                   │
│                                                                 │
│  Stage 3: 强化学习优化                                           │
│  ─────────────────────                                           │
│  策略：SFT 模型（生成回复）                                       │
│  奖励：RM 打分 + KL 惩罚                                          │
│  目标：maximize E[r_θ(x,y)] - β KL(π_θ || π_ref)                │
│       │                                                         │
│       ▼                                                         │
│  算法：PPO (Proximal Policy Optimization)                       │
│  产出：RL 优化后的模型                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### DPO：RLHF 的替代方案

```
DPO (Direct Preference Optimization) = 直接偏好优化

优势：
• 不需要训练单独的奖励模型
• 不需要强化学习（PPO）
• 训练更稳定、更简单

原理：
直接将偏好数据用于微调，通过损失函数体现偏好

Loss = -log σ(β log(π_θ(y_w|x) / π_ref(y_w|x)) - 
              β log(π_θ(y_l|x) / π_ref(y_l|x)))

其中：
• y_w: 偏好的回复
• y_l: 不被偏好的回复
• π_θ: 当前策略模型
• π_ref: 参考模型（通常是 SFT 模型）
```

#### 面试回答建议

```
如果有 RLHF 经验：
"我参与过 RLHF 项目，主要负责：
• 收集和整理人类偏好数据
• 训练奖励模型（基于 Bradley-Terry 模型）
• 使用 PPO 算法进行强化学习优化
• 调优 KL 散度系数和 reward scaling
• 遇到过 reward hacking 问题，通过加入 diversity penalty 解决"

如果没有 RLHF 经验：
"我没有直接的 RLHF 经验，但我深入理解其原理：
• 理解 SFT → RM → RL 三阶段流程
• 熟悉 PPO 算法和 DPO 替代方案
• 了解 RLHF 的挑战（reward hacking、mode collapse）
• 关注过 InstructGPT、ChatGPT 的 RLHF 实践
• 有强化学习基础，理解 policy gradient、value function"
```

---

