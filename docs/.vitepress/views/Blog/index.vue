<template>
    <div class="px-6 pb-24 mt-2 md:pb-32 md:px-12 lg:px-16">
      <div class="flex flex-col items-center justify-center max-w-8xl mx-auto">
        <!-- 头像与徽章 -->
        <div class="relative w-full mx-auto">
          <!-- 头像 -->
          <div class="relative py-2 h-52">
            <div
              class="absolute w-48 h-48 mx-auto rounded-full shadow-[0px_0px_3px#147eae] dark:shadow-[0px_0px_3px#9ba0a9] top-1/2 avatar-ping left-1/2">
            </div>
            <img class="block w-48 h-48 mx-auto rounded-full" src="/xiaoba-logo.png" alt="avatar" />
          </div>
          <!-- Right-tags -->
          <p style="top: 32%"
            class="tag-bounce hidden sm:block sm:left-[69%] md:left-[66%] lg:left-[63%] xl:left-[60%] absolute px-3 py-0.5 text-sm font-bold rounded-full shadow-[0px_0px_1px_1px#eee]">
            🎵 QQ音乐 小八
          </p>
          <p style="top: 50%"
            class="tag-bounce hidden sm:block sm:left-[69%] md:left-[66%] lg:left-[63%] xl:left-[60%] absolute px-3 py-0.5 text-sm font-bold rounded-full shadow-[0px_0px_1px_1px#eee]">
            🌙 Bilibili 小八
          </p>
          <!-- Left-tags -->
          <p style="top: 32%"
            class="tag-bounce hidden sm:block sm:left-[8%] md:left-[13%] lg:left-[21%] xl:left-[27%] absolute px-3 py-0.5 text-sm font-bold rounded-full shadow-[0px_0px_1px_1px#eee]">
            🌟 小八
          </p>
          <p style="top: 50%"
            class="tag-bounce hidden sm:block sm:left-[8%] md:left-[13%] lg:left-[21%] xl:left-[27%] absolute px-3 py-0.5 text-sm font-bold rounded-full shadow-[0px_0px_1px_1px#eee]">
            ✨IKUN(小黑子)
          </p>
        </div>

         <!-- 滚动横幅 -->
        <div class="w-full md:w-[72%] dark:border-slate-900 border dark:bg-slate-800 bg-slate-50 p-4 rounded-xl">
            <p class="text-[12px]">推荐阅读</p>
            <div class="mt-2 overflow-hidden">
              <!-- TODO:封装ICON组件,抽离背景颜色与svg地址 -->
              <div class="flex gap-4 w-fit icon-scroll">
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-emerald-200">
                  <img src="/xiaoba-logo.png" alt="vue.js" />
                </div>
                <div class="flex-shrink-0 w-20 h-20 p-4 bg-red-200 rounded-lg">
                  <img src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-sky-200">
                  <img src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
                  <img src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center w-20 h-20 p-4 flex-shrink-0 rounded-lg bg-[#f7cb4f]">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-red-400 rounded-lg">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-rose-200">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-indigo-200 rounded-lg">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-emerald-200">
                  <img src="/xiaoba-logo.png" alt="vue.js" />
                </div>
                <div class="flex-shrink-0 w-20 h-20 p-4 bg-red-200 rounded-lg">
                  <img src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-sky-200">
                  <img src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
                  <img src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center w-20 h-20 p-4 flex-shrink-0 rounded-lg bg-[#f7cb4f]">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-red-400 rounded-lg">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-slate-200">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 rounded-lg bg-rose-200">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
                <div class="flex justify-center flex-shrink-0 w-20 h-20 p-4 bg-indigo-200 rounded-lg">
                  <img class="rounded-lg" src="/xiaoba-logo.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        <!-- 博客文件栏 -->
        <div class="flex flex-col w-full mt-4">
          <div class="flex flex-col justify-center gap-5 md:gap-0 md:flex-row">
            <!-- 概述 -->
            <div
              class="dark:from-sky-700 dark:to-teal-600 dark:border-slate-900 w-full flex flex-col justify-center rounded-xl border py-4 px-8 text-white md:w-[59%] bg-gradient-to-r from-sky-400 to-teal-400">
              <p class="text-lg text-slate-50">
                你好，我是小八，很高兴认识你 👋
              </p>
              <h1 class="text-xl font-bold xl:text-3xl lg:break-normal lg:break-words">
                🌟 Dream to be a full-stack developer.
              </h1>
              <p class="text-slate-100">全栈开发 / 产品设计 / 爬虫工程师 / IKUN / 抽象玩家</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>
  
  <script setup lang="ts"></script>
  
  <style scoped>
  .honer-bg {
    background-image: url("/xiaoba-logo.png");
  }
  
  .music-bg {
    background-image: url("/xiaoba-logo.png");
    filter: brightness(0.6);
  }
  
  .kawaii-bg {
    background-image: url("/xiaoba-logo.png");
  }
  
  .avatar-ping {
    animation: avatarPing 2s ease-in infinite;
  }
  
  @keyframes avatarPing {
  
    0%,
    100% {
      transform: translateX(-50%) translateY(-50%) scale(1.05);
    }
  
    50% {
      transform: translateX(-50%) translateY(-50%) scale(1.1);
    }
  }
  
  .tag-bounce {
    animation: tagBounce 1.5s ease-in infinite;
  }
  
  @keyframes tagBounce {
  
    0%,
    100% {
      transform: translateY(0);
    }
  
    50% {
      transform: translateY(-10%);
    }
  }
  
  .icon-scroll {
    animation: iconScroll 20s linear infinite;
  }
  
  @keyframes iconScroll {
    0% {
      transform: translateX(0);
    }
  
    100% {
      transform: translateX(-50%);
    }
  }
  </style>
  