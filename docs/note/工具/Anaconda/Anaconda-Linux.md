# 环境激活
## **1. 手动激活 Conda 环境（当前会话）**

在当前 WSL 终端会话中，你可以使用以下命令手动激活 **Conda 的 base 环境**：
```
eval "$(/home/ikunycj/anaconda3/bin/conda shell.bash hook)"
```
执行后，终端提示符应该变为类似 `base`：

```
(base) ikunycj@r9000p-ycj:~$
```

---

## **2. 初始化 Conda（自动加载）**

如果你希望每次打开 WSL 终端时自动初始化 Conda，可以运行：
```
conda init
```

然后关闭并重新打开 WSL 终端。现在，每次启动 WSL 终端时，**Conda 的 base 环境**会自动激活。

---

## **3. 可选：避免 Conda base 环境自动激活**

如果你不希望每次启动终端时都自动激活 **base** 环境，可以运行：
```
conda config --set auto_activate_base false
```

之后，打开 WSL 时，Conda 不会默认激活，你可以手动激活任意环境。

---

## **4. 创建和管理 Conda 环境**

1. **创建一个 Python 3.11 环境：**
```
```conda create --name myenv python=3.11
```
    
2. **激活环境：**
```
conda activate myenv
```
3. **安装所需包（如 `numpy`）：**
```
conda install numpy
```
4. **退出环境：**
```
conda deactivate
```
---

## **5. 验证 Conda 安装**

在终端中运行以下命令，确保 Conda 已成功安装：
`conda --version`

你应该看到类似以下输出：
`conda 4.x.x`

---
## **总结**

- **手动激活**：使用 `eval` 命令初始化 Conda。
- **自动初始化**：运行 `conda init`，让 Conda 在每次终端启动时自动加载。
- **管理环境**：使用 `conda create` 和 `conda activate` 创建和切换环境。