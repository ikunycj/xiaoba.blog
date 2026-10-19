# Scaling Law 与推荐系统 Scaling 论文阅读笔记

> 主题：从 LLM Scaling Law 到推荐系统 Scaling  
> 覆盖论文：Kaplan Scaling Law、Chinchilla、DHEN、Hiformer、Wukong、Generative Recommenders / HSTU、RankMixer

---

## 1. 概括归纳 Scaling Law

### 1.1 Scaling Law 是什么？

**Scaling Law，缩放定律**，指的是：

> 当模型参数量、训练数据量、训练计算量不断增加时，模型性能会按照某种相对稳定、可预测的规律提升。

在大语言模型中，Scaling Law 通常描述：

```text
模型参数量 N ↑
训练数据量 D ↑
训练计算量 C ↑
=> 模型 Loss 按幂律下降
=> 模型能力逐步增强
```

典型形式可以写成：

```text
Loss ≈ A · N^(-α)
Loss ≈ B · D^(-β)
Loss ≈ C^(-γ)
```

其中：

| 符号          | 含义                 |
| ----------- | ------------------ |
| `N`         | 模型参数量              |
| `D`         | 训练数据量 / token 数    |
| `C`         | 训练计算量              |
| `Loss`      | 模型损失，越低越好          |
| `α / β / γ` | 缩放指数，表示规模扩大后性能提升速度 |

Kaplan 等人的论文指出，语言模型的 cross-entropy loss 会随着模型大小、数据集大小和训练计算量按 power-law 变化，并且部分趋势跨越了七个数量级以上；论文还认为模型宽度、深度等架构细节在较宽范围内影响较小。([arXiv](https://arxiv.org/abs/2001.08361 "[2001.08361] Scaling Laws for Neural Language Models"))

---

### 1.2 Kaplan Scaling Law 的核心观点

Kaplan 2020 的观点可以概括为：

> 大语言模型性能会随参数量、数据量、计算量稳定提升；在固定算力下，训练更大的模型并提前停止，往往比把小模型训练到完全收敛更划算。

它强调：

```text
更大模型 = 更强 sample efficiency
固定算力下 = 倾向于训练更大的模型
```

但 Kaplan 的局限是：

- 更偏向“扩大模型参数”；
- 对训练 token 数的重要性估计不足；
- 后来被 Chinchilla 部分修正。

---

### 1.3 Chinchilla Scaling Law 的修正

Chinchilla 2022 重新研究固定算力下的最优训练策略，核心结论是：

> 模型参数量和训练 token 数应该大致同比例增长。

Chinchilla 论文训练了 400 多个不同规模模型，发现 compute-optimal training 下，模型大小和训练 token 数应该一起扩展；它还训练了 70B 参数的 Chinchilla，用与 Gopher 相似的训练计算量但更多数据，超过 Gopher、GPT-3、Jurassic-1 和 MT-NLG 等模型。([arXiv](https://arxiv.org/abs/2203.15556 "[2203.15556] Training Compute-Optimal Large Language Models"))

通俗理解：
```text
Kaplan：有更多算力，优先把模型做大
Chinchilla：有更多算力，模型参数和训练 token 都要一起增加
```

一个常见记忆点：
```text
Compute-optimal LLM 训练中，大约每 1 个参数需要 20 个训练 token
```

---

### 1.4 推荐系统中的 Scaling Law

推荐系统也开始借鉴 LLM 的 Scaling 思想，但不能直接照搬。

因为推荐系统有几个特殊点：

|对比点|LLM|推荐系统|
|---|---|---|
|输入数据|文本 token|用户行为、物品、广告、上下文、统计特征|
|token 语义|相对统一|高度异构|
|模型目标|下一个 token 预测|点击、停留、转化、点赞、评论、广告价值|
|核心架构|Transformer|DLRM、FM、Attention、Token Mixing、HSTU|
|主要瓶颈|训练算力、数据质量|线上延迟、高 QPS、特征异构、GPU 利用率|
|能否慢推理|可以接受部分慢推理|通常要求毫秒级服务|
|Scaling 重点|参数、数据、算力匹配|参数、特征交互、MFU、延迟、业务指标共同优化|

所以推荐系统 Scaling 的核心问题不是简单地问：

```text
模型能不能更大？
```

而是问：

```text
模型变大后，能不能真正提升推荐效果？
模型变大后，线上延迟能不能不涨？
模型变大后，GPU 能不能被充分利用？
模型变大后，能不能处理异构特征和动态用户行为？
```

---

## 2. 论文总览

|序号|论文|年份|方向|核心问题|核心方法|主要结论|
|---|---|--:|---|---|---|---|
|1|[Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)|2020|LLM Scaling Law|语言模型参数、数据、算力和 loss 的关系是什么？|大量训练不同规模 Transformer，拟合 power-law|Loss 随参数、数据、计算量按幂律下降|
|2|[Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)|2022|LLM Compute-Optimal Scaling|固定算力下，参数和 token 怎么分配？|训练 400+ 模型，提出 Chinchilla|参数量和训练 token 应大致同比例增长|
|3|[DHEN: A Deep and Hierarchical Ensemble Network for Large-Scale Click-Through Rate Prediction](https://arxiv.org/abs/2203.11014)|2022|CTR / 推荐排序|单一特征交互模块是否足够？|多种 interaction module 层次化 ensemble|异构交互模块互补，CTR 效果提升|
|4|[Hiformer: Heterogeneous Feature Interactions Learning with Transformers for Recommender Systems](https://arxiv.org/abs/2311.05884)|2023|推荐 Transformer|普通 Transformer 能否直接用于推荐特征交互？|Heterogeneous Attention + Composite Projection|推荐特征异构，需要 feature-aware attention|
|5|[Wukong: Towards a Scaling Law for Large-Scale Recommendation](https://arxiv.org/abs/2403.02545)|2024|推荐 Scaling Law|推荐模型能否像 LLM 一样 scale？|Stacked Factorization Machine|推荐 dense interaction 可以出现 scaling trend|
|6|[Actions Speak Louder than Words: Trillion-Parameter Sequential Transducers for Generative Recommendations](https://arxiv.org/abs/2402.17152)|2024|生成式推荐|能否把推荐系统改造成生成式序列建模？|Generative Recommenders + HSTU|用户行为序列可以成为推荐 foundation model 数据|
|7|[RankMixer: Scaling Up Ranking Models in Industrial Recommenders](https://arxiv.org/abs/2507.15551)|2025|工业推荐排序 Scaling|如何把排序模型扩到 1B 且不增加延迟？|Token Mixing + Per-token FFN + Sparse-MoE|推荐排序模型可以高 MFU、低延迟地 scale up|

---

## 3. 按“技术路线”归纳

|技术路线|代表论文|核心思想|解决的问题|局限|
|---|---|---|---|---|
|**LLM 幂律 Scaling**|Kaplan 2020|参数、数据、算力增加，loss 按幂律下降|解释大模型为什么越大越强|更偏语言模型，且早期低估数据量重要性|
|**Compute-Optimal Scaling**|Chinchilla 2022|参数和 token 要匹配|修正“只堆参数”的路线|主要适用于 dense decoder-only LLM|
|**多交互模块集成**|DHEN|不同特征交互模块互补|单一模块难以捕捉所有交互模式|结构复杂，scaling 效率有限|
|**Transformer 推荐改造**|Hiformer|给不同 feature 设计不同 Q/K/V|普通 attention 不懂异构推荐特征|attention 成本仍然较高|
|**FM 堆叠交互**|Wukong|堆叠 FM 捕捉任意阶特征交互|推荐系统 dense interaction 难以 scale|serving 成本仍是挑战|
|**生成式推荐**|HSTU / GR|把用户行为建模为序列 token|统一 retrieval、ranking、行为建模|工程门槛极高|
|**GPU 友好排序 Backbone**|RankMixer|Token Mixing + Per-token FFN|1B 参数排序模型如何低延迟上线|依赖业务 tokenization 和 GPU 工程优化|

---

## 4. 按“Scaling 思想”对比

|论文|Scaling 对象|Scaling 方式|是否强调数据规模|是否强调线上部署|核心判断|
|---|---|---|---|---|---|
|Kaplan|LLM|扩大参数、数据、计算量|是|否|LLM loss 可随规模按幂律下降|
|Chinchilla|LLM|参数和 token 同比例增长|非常强调|否|很多大模型 under-trained|
|DHEN|CTR 模型|堆叠异构交互模块|一般|是|不同交互模块有互补信息|
|Hiformer|推荐排序|改造 attention 参数化|一般|是|推荐特征异构，普通 attention 不够|
|Wukong|推荐交互网络|扩大 dense interaction|是|部分强调|推荐模型也能出现 scaling trend|
|HSTU / GR|推荐系统整体范式|扩大行为序列模型|非常强调|强调|用户行为序列可以支撑推荐 foundation model|
|RankMixer|工业 ranking backbone|扩大高 MFU 排序模型|是|非常强调|推荐 scaling 必须同时控制延迟和成本|

---

## 5. 这些论文之间的演进关系

```text
1. Kaplan 2020
   ↓
证明 LLM 可以通过参数、数据、算力扩大获得稳定提升

2. Chinchilla 2022
   ↓
修正 Kaplan：不能只堆参数，参数量和训练 token 要匹配

3. DHEN 2022 / Hiformer 2023
   ↓
推荐系统开始借鉴深度模型能力，重点解决“特征交互建模”

4. Wukong 2024
   ↓
开始明确讨论推荐系统自己的 scaling law：
推荐模型也可以通过扩大 dense interaction 获得持续收益

5. HSTU / Generative Recommenders 2024
   ↓
从传统推荐排序模型转向“生成式推荐”
把用户行为序列当作推荐系统的新 token 模态

6. RankMixer 2025
   ↓
把推荐 scaling 落到工业线上排序：
1B 参数、低延迟、高 MFU、真实 A/B 收益
```

|阶段|代表论文|思想变化|
|---|---|---|
|第一阶段|Kaplan|大模型能力可以随规模按规律提升|
|第二阶段|Chinchilla|Scaling 不只是堆参数，还要匹配数据|
|第三阶段|DHEN / Hiformer|推荐系统先解决复杂特征交互问题|
|第四阶段|Wukong|推荐系统开始探索自己的 scaling law|
|第五阶段|HSTU / GR|推荐系统从 DLRM 走向生成式行为序列模型|
|第六阶段|RankMixer|推荐 scaling 从论文概念走向工业低延迟上线|

---

# 6. 分篇章简单讲解论文

---

## 6.1 Kaplan 2020：Scaling Laws for Neural Language Models

论文链接：[Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)

### 核心问题

这篇论文想回答：

```text
语言模型变大后，效果到底会如何变化？
参数量、数据量、计算量分别对 loss 有什么影响？
```

### 核心结论

论文发现：

```text
Loss 会随着模型参数量 N、训练数据量 D、训练计算量 C 按幂律下降。
```

也就是说，大模型变强不是完全玄学，而是可以被经验公式预测。

### 重要观点

|观点|解释|
|---|---|
|参数越大，loss 越低|但收益递减，不是线性提升|
|数据越多，loss 越低|数据不足会限制大模型效果|
|算力越多，loss 越低|但计算收益也有边际递减|
|架构细节影响相对较小|在合理范围内，宽度、深度不是第一主导因素|
|大模型更 sample-efficient|大模型达到同样 loss 所需样本更少|

### 局限

Kaplan 更偏向认为新增算力应该主要用于增大模型参数。后来 Chinchilla 发现，这个结论会导致很多模型训练 token 不够。

### 一句话总结

> Kaplan 证明了 LLM 的 loss 会随参数、数据和算力按幂律下降，是大模型 Scaling Law 的经典起点。

---

## 6.2 Chinchilla 2022：Training Compute-Optimal Large Language Models

论文链接：[Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556)

### 核心问题

这篇论文问的是：

```text
如果训练算力固定，到底应该训练多大的模型？
应该用多少 token？
```

### 核心结论

Chinchilla 认为：

```text
模型参数量和训练 token 数应该大致同比例增长。
```

也就是说，不应该只把模型做大，还要给模型足够多的训练数据。

### 和 Kaplan 的区别

|对比|Kaplan|Chinchilla|
|---|---|---|
|扩展重点|更偏向扩大参数|参数和 token 一起扩大|
|对数据的看法|数据重要，但增长速度可以较慢|数据和参数同等重要|
|代表结论|大模型更 sample-efficient|很多大模型 under-trained|
|代表模型|GPT 系列早期 scaling 思想|Chinchilla 70B|

### 重要例子

Chinchilla 只有 70B 参数，比 Gopher 280B 小很多，但使用更多训练 token，并在多个任务上超过 Gopher、GPT-3、Jurassic-1 和 MT-NLG。

### 一句话总结

> Chinchilla 修正了 Kaplan 的“偏堆参数”路线，指出 compute-optimal 训练应该让参数量和 token 数同步增长。

---

## 6.3 DHEN 2022：Deep and Hierarchical Ensemble Network

论文链接：[DHEN: A Deep and Hierarchical Ensemble Network for Large-Scale Click-Through Rate Prediction](https://arxiv.org/abs/2203.11014)

### 核心问题

CTR / 广告推荐模型中，关键是学习特征交互。

论文想解决：

```text
不同特征交互模块各有优势，能不能把它们组合起来？
```

### 核心方法

DHEN 使用：

```text
Deep + Hierarchical + Ensemble
```

也就是：

- 每一层集成多个 interaction module；
    
- 多层堆叠形成层次结构；
    
- 不同模块捕捉不同类型的特征交互。
    

常见模块包括：

|模块|作用|
|---|---|
|AdvancedDLRM|工业推荐 baseline|
|Linear|保留线性信息|
|Self-Attention|建模全局特征关系|
|CNN|捕捉局部组合模式|
|DCN|显式特征交叉|

DHEN 论文指出，不同特征交互设计在不同数据集上表现不同，即使声称捕捉同阶交互，实际获得的信息也可能不重叠，因此提出深层层次化 ensemble；实验中取得了 0.27% Normalized Entropy 改进和 1.2x 训练吞吐提升。([arXiv](https://arxiv.org/abs/2203.11014 "[2203.11014] DHEN: A Deep and Hierarchical Ensemble Network for Large-Scale Click-Through Rate Prediction"))

### 一句话总结

> DHEN 的核心是“不要押注单一特征交互模块，而是把多种模块层次化集成起来”。

---

## 6.4 Hiformer 2023：Heterogeneous Feature Interactions Learning with Transformers

论文链接：[Hiformer: Heterogeneous Feature Interactions Learning with Transformers for Recommender Systems](https://arxiv.org/abs/2311.05884)

### 核心问题

普通 Transformer 能不能直接用于推荐系统？

论文认为：

```text
不能直接照搬。
```

因为推荐系统的 feature 是异构的：

- 用户 ID；
    
- 商品 ID；
    
- App ID；
    
- 时间；
    
- 地理位置；
    
- 稠密统计特征；
    
- 上下文特征。
    

这些 feature 不像 NLP token 那样处在统一语义空间。

### 核心方法

Hiformer 提出：

```text
Heterogeneous Attention
```

普通 Transformer 共享同一套 Q/K/V：

```text
Q = XWq
K = XWk
V = XWv
```

Hiformer 则为不同 feature 设计不同投影：

```text
不同 feature 有自己的 Q/K/V
```

这样模型可以更好地学习：

```text
app_id × hour
app_id × country
user_id × item_id
```

这类异构特征交互。

### 工程优化

Hiformer 还使用：

- low-rank approximation；
    
- model pruning；
    

来降低线上推理延迟。

Hiformer 论文明确指出，vanilla Transformer 用于 Web 规模推荐有两个关键挑战：难以捕捉异构特征交互，以及 serving latency 太高；它提出 heterogeneous self-attention 和 Hiformer，并通过低秩近似和剪枝实现在线部署，在 Google Play App ranking 中 engagement 指标最高提升 +2.66%。([arXiv](https://arxiv.org/abs/2311.05884 "[2311.05884] Hiformer: Heterogeneous Feature Interactions Learning with Transformers for Recommender Systems"))

### 一句话总结

> Hiformer 的核心是“让 Transformer 理解推荐系统中的异构特征”。

---

## 6.5 Wukong 2024：Towards a Scaling Law for Large-Scale Recommendation

论文链接：[Wukong: Towards a Scaling Law for Large-Scale Recommendation](https://arxiv.org/abs/2403.02545)

### 核心问题

推荐系统能不能像 LLM 一样出现 Scaling Law？

论文认为：

```text
可以，但不能只扩大 embedding table。
```

传统推荐系统很多参数在 sparse embedding table 中，但 embedding lookup 本身不增强复杂特征交互能力，也不充分利用现代 GPU 算力。

所以 Wukong 强调：

```text
要扩大 dense interaction component
```

### 核心方法

Wukong 基于：

```text
Stacked Factorization Machine
```

每一层包含：

|模块|作用|
|---|---|
|FMB|Factorization Machine Block，产生高阶特征交互|
|LCB|Linear Compression Block，保留低阶信息|
|Residual|稳定训练|
|LayerNorm|稳定深层网络|

它的核心思路是：

```text
第一层 FM 学二阶交互
第二层在二阶交互基础上继续交互
第三层继续产生更高阶交互
```

因此第 `i` 层可以覆盖到更高阶的特征组合。

Wukong 论文称，推荐模型过去没有像 LLM 一样明显的 scaling law，是因为 upscaling 机制低效；Wukong 基于 stacked factorization machines 和协同扩展策略，在推荐领域建立 scaling law，并在六个公开数据集和内部大规模数据集上验证，模型复杂度跨两个数量级、超过 100 GFLOP/example 仍保持 scaling。([arXiv](https://arxiv.org/abs/2403.02545 "[2403.02545] Wukong: Towards a Scaling Law for Large-Scale Recommendation"))

### 一句话总结

> Wukong 证明了推荐模型也可以通过扩大 dense interaction 获得持续收益，是推荐系统 Scaling Law 的重要探索。

---

## 6.6 Generative Recommenders / HSTU 2024

论文链接：[Actions Speak Louder than Words: Trillion-Parameter Sequential Transducers for Generative Recommendations](https://arxiv.org/abs/2402.17152)

### 核心问题

这篇论文更激进，它问的是：

```text
能不能把推荐系统改造成类似 LLM 的生成式序列建模？
```

传统推荐系统是：

```text
用户特征 + item 特征 + 上下文特征 -> 打分
```

Generative Recommenders 是：

```text
用户行为序列 -> 预测未来行为 / item / action
```

### 核心思想

论文标题叫：

```text
Actions Speak Louder than Words
```

意思是：

> 用户真实行为比文本描述更能表达兴趣。

它把用户行为序列看作推荐系统中的 token：

```text
item1, action1, item2, action2, item3, action3 ...
```

然后像语言模型一样进行生成式训练。

### HSTU

HSTU 全称：

```text
Hierarchical Sequential Transduction Unit
```

它是专门为推荐系统设计的序列建模单元。

它和 Transformer 的区别包括：

| 对比   | Transformer       | HSTU                                    |
| ---- | ----------------- | --------------------------------------- |
| 注意力  | softmax attention | pointwise aggregated attention          |
| 适用数据 | 文本 token          | 高基数、动态、流式用户行为                           |
| 目标   | 语言建模              | retrieval + ranking + action prediction |
| 工程优化 | FlashAttention 等  | Stochastic Length、M-FALCON              |

论文指出，大规模推荐系统依赖高基数、异构特征，并且每天处理数百亿用户行为；它提出 Generative Recommenders 和 HSTU，HSTU 在 8192 长序列上比 FlashAttention2 Transformer 快 5.3x 到 15.2x，1.5T 参数模型在线 A/B 指标提升 12.4%，并且模型质量随训练 compute 呈 power-law scaling。([arXiv](https://arxiv.org/abs/2402.17152 "[2402.17152] Actions Speak Louder than Words: Trillion-Parameter Sequential Transducers for Generative Recommendations"))

### 一句话总结

> HSTU / GR 把推荐系统从“特征工程 + 排序模型”推进到“用户行为序列 + 生成式推荐基础模型”。

---

## 6.7 RankMixer 2025：Scaling Up Ranking Models in Industrial Recommenders

论文链接：[RankMixer: Scaling Up Ranking Models in Industrial Recommenders](https://arxiv.org/abs/2507.15551)

### 核心问题

RankMixer 关注的是非常工业化的问题：

```text
如何把推荐排序模型扩到 1B 参数，同时不增加线上延迟？
```

它认为推荐系统 Scaling 有两个障碍：

|障碍|解释|
|---|---|
|严格线上约束|高 QPS、低延迟、低成本|
|传统模块低 MFU|很多手工特征交叉模块来自 CPU 时代，不适合 GPU|

### 核心方法

RankMixer 使用：

```text
Multi-head Token Mixing + Per-token FFN
```

#### 1. Feature Tokenization

先把几百个推荐特征按业务语义分组，变成若干 feature tokens。

#### 2. Multi-head Token Mixing

不用 self-attention，而是通过 token mixing 让不同 feature token 交换信息。

这样做的原因是：

```text
推荐 feature 是异构的，不一定适合用 QK 内积算 attention similarity。
```

#### 3. Per-token FFN

每个 token 使用自己的 FFN。

原因是：

```text
用户画像、视频内容、行为序列、交互特征属于不同 feature subspace，
不应该全部共享一套 FFN。
```

#### 4. Sparse-MoE

为了继续扩展到更大模型，RankMixer 使用 Sparse-MoE，并设计：

- ReLU Routing；
    
- Dense-training / Sparse-inference。
    

RankMixer 论文指出，工业推荐有严格延迟和高 QPS 约束，传统手工 feature-crossing 模块难以利用现代 GPU，导致低 MFU；RankMixer 用 multi-head token mixing 替代二次 self-attention，用 Per-token FFNs 保留不同 feature subspace 建模，并把 MFU 从 4.5% 提升到 45%，在保持近似相同推理延迟下将 ranking model 参数扩展约 100 倍，1B dense-parameter RankMixer 全流量服务后提升 active days 0.3% 和 app 使用时长 1.08%。([arXiv](https://arxiv.org/abs/2507.15551 "[2507.15551] RankMixer: Scaling Up Ranking Models in Industrial Recommenders"))

### 一句话总结

> RankMixer 的核心是“推荐排序模型可以 scale up，但必须设计 GPU 友好、高 MFU、低延迟的 backbone”。

---

# 7. 几篇推荐系统论文的横向对比

|论文|核心模块|主要解决问题|和其他论文的区别|
|---|---|---|---|
|DHEN|多 interaction module ensemble|单一交互模块不足|多模块组合路线|
|Hiformer|Heterogeneous Attention|Transformer 不适配异构 feature|改造 attention 路线|
|Wukong|Stacked FM|推荐 dense interaction 如何 scale|堆叠 FM 路线|
|HSTU / GR|行为序列生成式建模|推荐系统 foundation model|范式转换路线|
|RankMixer|Token Mixing + Per-token FFN|1B 排序模型如何低延迟上线|工业 GPU 友好路线|

---

# 8. 最核心复习总结

## 8.1 LLM 方向

```text
Kaplan：
LLM loss 随参数、数据、算力按幂律下降。

Chinchilla：
修正 Kaplan，指出固定算力下参数量和训练 token 数要匹配。
```

## 8.2 推荐系统方向

```text
DHEN：
多种特征交互模块有互补性，可以 ensemble。

Hiformer：
推荐特征异构，普通 Transformer 不够，要做 heterogeneous attention。

Wukong：
推荐模型不能只扩大 embedding table，要扩大 dense interaction，并可以观察到 scaling trend。

HSTU / GR：
推荐系统可以从 DLRM 排序模型走向生成式用户行为序列建模。

RankMixer：
推荐排序模型可以扩到 1B，但必须解决 MFU、延迟、QPS 和线上成本问题。
```

---

# 9. 一句话总脉络

> Kaplan 和 Chinchilla 证明并修正了 LLM Scaling Law；DHEN、Hiformer、Wukong、HSTU 和 RankMixer 则是在回答推荐系统如何 Scaling。推荐系统不能简单照搬 LLM，因为推荐数据是异构特征和用户行为，且有极强线上延迟约束。因此不同论文分别从多模块集成、异构 attention、堆叠 FM、生成式行为序列建模、GPU 友好 ranking backbone 等方向，探索推荐系统自己的 Scaling 路线。