# 小八博客
## 介绍
[小八博客](https://xioaba.blog)是一个基于vitpress的静态博客系统。轻量化可定制化，适合个人博客、技术博客、文档分享等场景。

## 安装配置
如需拷贝，下载后直接执行以下命令即可成功运行（需要nodejs环境）
```cmd
pnpm install
```

## 文件目录说明
```
xiaoba.my/
├── docs/  
    ├── .vitepress/    项目样式与配置
        ├── assets/        静态资源
        ├── data/          项目数据
        ├── theme/         主题样式
        ├── utils.js       工具函数
        ├── views/         vue组件
        ├── config.js      项目配置
    ├── src/           文章(项目的.md文件)
    │   ├── note/          学习笔记
    │   ├── blog/          博客相关
    │   ├── share/         内容分享
    │   ├── public/        公共静态资源
    │   └── index.md/      首页
```
