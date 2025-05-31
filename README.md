# 小八博客
## 介绍
[小八博客](https://xioaba.blog)是一个基于vitpress的静态博客系统。轻量化可定制化，适合个人博客、技术博客、文档分享等场景。

## 安装配置
如需拷贝，下载后直接执行以下命令即可成功运行（需要nodejs环境）
```cmd
npm install
```

## [文件目录说明](https://vitepress.dev/zh/guide/routing#root-and-source-directory)

```
xiaoba.my/
    ├── docs/            项目根目录，也算本地markdown笔记工具的根目录，你可以在非blogs目录下存放其他md文件or
    文件夹而不用担心被被渲染为博客
        ├── .obsidian/    obsidian样式与配置
        ├── .vitepress/    项目样式与配置
            ├── assets/        (页面)静态资源
            ├── data/          项目数据
            ├── theme/         主题样式
            ├── utils.js       工具函数
            ├── views/         vue组件
            ├── config.js      项目配置
        ├── blogs/             文章(项目的.md文件)，此文件夹下的md文件会展示为博客文章
        │   ├── note/          学习笔记
        │   ├── blog/          博客相关
        │   ├── share/         内容分享
        │   ├── public/        (文档)静态资源
        │   └── index.md/      首页
        ├── self/              私有的md文章，不会展示为博客文章（如果不想上传github建议在.gitignore里面配置忽略）
        ├── local/             此处为仅本地md文章，不会上传到GitHub仓库

```
