# Maven依赖管理项目构建工具

## 目录

## 一、Maven简介

### 1、为什么学习Maven

#### 1.1、Maven是一个依赖管理工具

①jar 包的规模

随着我们使用越来越多的框架，或者框架封装程度越来越高，项目中使用的jar包也越来越多。项目中，一个模块里面用到上百个jar包是非常正常的。

比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：

- Nacos 服务注册发现
- Web 框架环境
- 视图模板技术 Thymeleaf

最终却导入了 106 个 jar 包：

> org.springframework.security:spring-security-rsa:jar:1.0.9.RELEASE:compile
> com.netflix.ribbon: ribbon:jar:2.3.0:compile
> org.springframework.boot:spring-boot-starter-thymeleaf:jar:2.3.6.RELEASE:compile
> commons-configuration:commons-configuration:jar:1.8:compile
> org.apache.logging.log4j:log4j-api:jar:2.13.3:compile
> org.springframework:spring-beans:jar:5.2.11.RELEASE:compile
> org.springframework.cloud:spring-cloud-starter-netflix-ribbon:jar:2.2.6.RELEASE:compile
> org.apache.tomcat.embed:tomcat-embed-websocket:jar:9.0.39:compile
> com.alibaba.cloud:spring-cloud-alibaba-commons:jar:2.2.6.RELEASE:compile
> org.bouncycastle:bcprov-jdk15on:jar:1.64:compile
> org.springframework.security:spring-security-crypto:jar:5.3.5.RELEASE:compile
> org.apache.httpcomponents:httpasyncclient:jar:4.1.4:compile
> com.google.j2objc:j2objc-annotations:jar:1.3:compile
> com.fasterxml.jackson.core:jackson-databind:jar:2.11.3:compile
> io.reactivex:rxjava:jar:1.3.8:compile
> ch.qos.logback:logback-classic:jar:1.2.3:compile
> org.springframework:spring-web:jar:5.2.11.RELEASE:compile
> io.reactivex:rxnetty-servo:jar:0.4.9:runtime
> org.springframework:spring-core:jar:5.2.11.RELEASE:compile
> io.github.openfeign.form:feign-form-spring:jar:3.8.0:compile
> io.github.openfeign.form:feign-form:jar:3.8.0:compile
> com.netflix.ribbon:ribbon-loadbalancer:jar:2.3.0:compile
> org.apache.httpcomponents:httpcore:jar:4.4.13:compile
> org.thymeleaf.extras:thymeleaf-extras-java8time:jar:3.0.4.RELEASE:compile
> org.slf4j:jul-to-slf4j:jar:1.7.30:compile
> com.atguigu.demo:demo09-base-entity:jar:1.0-SNAPSHOT:compile
> org.yaml:snakeyaml:jar:1.26:compile
> org.springframework.boot:spring-boot-starter-logging:jar:2.3.6.RELEASE:compile
> io.reactivex:rxnetty-contexts:jar:0.4.9:runtime
> org.apache.httpcomponents:httpclient:jar:4.5.13:compile
> io.github.openfeign:feign-core:jar:10.10.1:compile
> org.springframework.boot:spring-boot-starter-aop:jar:2.3.6.RELEASE:compile
> org.hdrhistogram:HdrHistogram:jar:2.1.9:compile
> org.springframework:spring-context:jar:5.2.11.RELEASE:compile
> commons-lang:commons-lang:jar:2.6:compile
> io.prometheus:simpleclient:jar:0.5.0:compile
> ch.qos.logback:logback-core:jar:1.2.3:compile
> org.springframework:spring-webmvc:jar:5.2.11.RELEASE:compile
> com.sun.jersey:jersey-core:jar:1.19.1:runtime
> javax.ws.rs:jsr311-api:jar:1.1.1:runtime
> javax.inject:javax.inject:jar:1:runtime
> org.springframework.cloud:spring-cloud-openfeign-core:jar:2.2.6.RELEASE:compile
> com.netflix.ribbon:ribbon-core:jar:2.3.0:compile
> com.netflix.hystrix:hystrix-core:jar:1.5.18:compile
> com.netflix.ribbon:ribbon-transport:jar:2.3.0:runtime
> org.springframework.boot:spring-boot-starter-json:jar:2.3.6.RELEASE:compile
> org.springframework.cloud:spring-cloud-starter-openfeign:jar:2.2.6.RELEASE:compile
> com.fasterxml.jackson.module:jackson-module-parameter-names:jar:2.11.3:compile
> com.sun.jersey.contribs:jersey-apache-client4:jar:1.19.1:runtime
> io.github.openfeign:feign-hystrix:jar:10.10.1:compile
> io.github.openfeign:feign-slf4j:jar:10.10.1:compile
> com.alibaba.nacos:nacos-client:jar:1.4.2:compile
> org.apache.httpcomponents:httpcore-nio:jar:4.4.13:compile
> com.sun.jersey:jersey-client:jar:1.19.1:runtime
> org.springframework.cloud:spring-cloud-context:jar:2.2.6.RELEASE:compile
> org.glassfish:jakarta.el:jar:3.0.3:compile
> org.apache.logging.log4j:log4j-to-slf4j:jar:2.13.3:compile
> com.fasterxml.jackson.datatype:jackson-datatype-jsr310:jar:2.11.3:compile
> org.springframework.cloud:spring-cloud-commons:jar:2.2.6.RELEASE:compile
> org.aspectj:aspectjweaver:jar:1.9.6:compile
> com.alibaba.cloud:spring-cloud-starter-alibaba-nacos-discovery:jar:2.2.6.RELEASE:compile
> com.google.guava:listenablefuture:jar:9999.0-empty-to-avoid-conflict-with-guava:compile
> com.alibaba.spring:spring-context-support:jar:1.0.10:compile
> jakarta.annotation:jakarta.annotation-api:jar:1.3.5:compile
> org.bouncycastle:bcpkix-jdk15on:jar:1.64:compile
> com.netflix.netflix-commons:netflix-commons-util:jar:0.3.0:runtime
> com.fasterxml.jackson.core:jackson-annotations:jar:2.11.3:compile
> com.google.guava:guava:jar:29.0-jre:compile
> com.google.guava:failureaccess:jar:1.0.1:compile
> org.springframework.boot:spring-boot:jar:2.3.6.RELEASE:compile
> com.fasterxml.jackson.datatype:jackson-datatype-jdk8:jar:2.11.3:compile
> com.atguigu.demo:demo08-base-api:jar:1.0-SNAPSHOT:compile
> org.springframework.cloud:spring-cloud-starter-netflix-archaius:jar:2.2.6.RELEASE:compile
> org.springframework.boot:spring-boot-autoconfigure:jar:2.3.6.RELEASE:compile
> org.slf4j:slf4j-api:jar:1.7.30:compile
> commons-io:commons-io:jar:2.7:compile
> org.springframework.cloud:spring-cloud-starter:jar:2.2.6.RELEASE:compile
> org.apache.tomcat.embed:tomcat-embed-core:jar:9.0.39:compile
> io.reactivex:rxnetty:jar:0.4.9:runtime
> com.fasterxml.jackson.core:jackson-core:jar:2.11.3:compile
> com.google.code.findbugs:jsr305:jar:3.0.2:compile
> com.netflix.archaius:archaius-core:jar:0.7.6:compile
> org.springframework.boot:spring-boot-starter-web:jar:2.3.6.RELEASE:compile
> commons-codec:commons-codec:jar:1.14:compile
> com.netflix.servo:servo-core:jar:0.12.21:runtime
> com.google.errorprone:error_prone_annotations:jar:2.3.4:compile
> org.attoparser:attoparser:jar:2.0.5.RELEASE:compile
> com.atguigu.demo:demo10-base-util:jar:1.0-SNAPSHOT:compile
> org.checkerframework:checker-qual:jar:2.11.1:compile
> org.thymeleaf:thymeleaf-spring5:jar:3.0.11.RELEASE:compile
> commons-fileupload:commons-fileupload:jar:1.4:compile
> com.netflix.ribbon:ribbon-httpclient:jar:2.3.0:compile
> com.netflix.netflix-commons:netflix-statistics:jar:0.1.1:runtime
> org.unbescape:unbescape:jar:1.1.6.RELEASE:compile
> org.springframework:spring-jcl:jar:5.2.11.RELEASE:compile
> com.alibaba.nacos:nacos-common:jar:1.4.2:compile
> commons-collections:commons-collections:jar:3.2.2:runtime
> javax.persistence:persistence-api:jar:1.0:compile
> com.alibaba.nacos:nacos-api:jar:1.4.2:compile
> org.thymeleaf:thymeleaf:jar:3.0.11.RELEASE:compile
> org.springframework:spring-aop:jar:5.2.11.RELEASE:compile
> org.springframework.boot:spring-boot-starter:jar:2.3.6.RELEASE:compile
> org.springframework.boot:spring-boot-starter-tomcat:jar:2.3.6.RELEASE:compile
> org.springframework.cloud:spring-cloud-netflix-ribbon:jar:2.2.6.RELEASE:compile
> org.springframework:spring-expression:jar:5.2.11.RELEASE:compile
> org.springframework.cloud:spring-cloud-netflix-archaius:jar:2.2.6.RELEASE:compile

而如果使用 Maven 来引入这些 jar 包只需要配置三个『**依赖**』：

```xml
<!-- Nacos 服务注册发现启动器 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>

<!-- web启动器依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- 视图模板技术 thymeleaf -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

②jar包的来源问题

- 这个jar包所属技术的官网。官网通常是英文界面，网站的结构又不尽相同，甚至找到下载链接还发现需要通过特殊的工具下载。
- 第三方网站提供下载。问题是不规范，在使用过程中会出现各种问题。
  - jar包的名称
  - jar包的版本
  - jar包内的具体细节
- 而使用 Maven 后，依赖对应的 jar 包能够**自动下载**，方便、快捷又规范。

③jar包的导入问题

在web工程中，jar包必须存放在指定位置：

![image-20231021101825708](image-20231021101825708.png)

在使用Maven之后，通过配置依赖(jar包)的坐标，查找本地仓库中相应jar包，若本地仓库没有，则统一从镜像网站或中央仓库中下载：

![image-20231021102831531](image-20231021102831531.png)

④jar包之间的依赖

框架中使用的 jar 包，不仅数量庞大，而且彼此之间存在错综复杂的依赖关系。依赖关系的复杂程度，已经上升到了完全不能靠人力手动解决的程度。另外，jar 包之间有可能产生冲突。进一步增加了我们在 jar 包使用过程中的难度。

下面是前面例子中 jar 包之间的依赖关系：

![images](img006.ab4f2e31.png)

而实际上 jar 包之间的依赖关系是普遍存在的，如果要由程序员手动梳理无疑会增加极高的学习成本，而这些工作又对实现业务功能毫无帮助。

而使用 Maven 则几乎不需要管理这些关系，极个别的地方调整一下即可，极大的减轻了我们的工作量。

#### 1.2、Maven是一个构建工具

①你没有注意过的构建

你可以不使用 Maven，但是构建必须要做。当我们使用 IDEA 进行开发时，构建是 IDEA 替我们做的。

![image-20231021103758624](image-20231021103758624.png)

②脱离 IDE 环境仍需构建

![img](image.png)

#### 1.3、结论

- **管理规模庞大的 jar 包，需要专门工具。**
- **脱离 IDE 环境执行构建操作，需要专门工具。**

### 2. Maven介绍

<https://maven.apache.org/what-is-maven.html>

Maven 是一款为 Java 项目管理构建、依赖管理的工具（软件），使用 Maven 可以自动化构建、测试、打包和发布项目，大大提高了开发效率和质量。

Maven就是一个软件，掌握安装、配置、以及基本功能 **（项目构建、依赖管理）** 的理解和使用即可！

1. **依赖管理：**

   Maven 可以管理项目的依赖，包括自动下载所需依赖库、自动下载依赖需要的依赖并且保证版本没有冲突、依赖版本管理等。通过 Maven，我们可以方便地维护项目所依赖的外部库，避免版本冲突和转换错误等，而我们仅仅需要编写配置即可。

2. **构建管理：**

   项目构建是指将源代码、配置文件、资源文件等转化为能够运行或部署的应用程序或库的过程

   Maven 可以管理项目的编译、测试、打包、部署等构建过程。通过实现标准的构建生命周期，Maven 可以确保每一个构建过程都遵循同样的规则和最佳实践。同时，Maven 的插件机制也使得开发者可以对构建过程进行扩展和定制。主动触发构建，只需要简单的命令操作即可。

   ![](image_OSOE45UACw.png)

**场景1：** 例如我们项目需要第三方依赖如：Druid连接池、MySQL数据库驱动和Jackson JSON等处理。那么我们可以将想要的依赖项的信息编写到Maven工程的配置文件，Maven就会自动下载并复制这些依赖项到项目中，无需自己导入jar包，管理jar!

**场景2：** 项目完成开发，我们想要打成war部署到服务器中，使用maven的构建命令可以快速打包！节省大量时间！

### 3. Maven软件工作原理模型图（了解）

![](image_6AVFQbaXLj.png)

## 二、Maven安装和配置

### 1. Maven安装

<https://maven.apache.org/docs/history.html>

各个工具选用版本：

| 工具  | 版本   |
| ----- | ------ |
| Maven | 3.8.8  |
| JDK   | 17     |
| IDEA  | 2022.2 |

**安装条件：** maven需要本机安装java环境、必需包含`java\_home`环境变量！

**软件安装：** 右键解压即可（绿色免安装）

**软件结构：**

![image-20231021110800113](image-20231021110800113.png)

**bin**：含有Maven的运行脚本

boot：含有plexus-classworlds类加载器框架

**conf**：含有Maven的核心配置文件

lib：含有Maven运行时所需要的Java类库

LICENSE、NOTICE、README.txt：针对Maven版本，第三方软件等简要介绍

### 2. Maven环境配置

1.  配置MAVEN_HOME

    ![image-20231021110938230](image-20231021110938230.png)
2.  配置Path

    ![](image_xNL5Fg_ucf.png)
3.  命令测试（cmd窗口）
    ```bash
    mvn -v 
    # 输出版本信息即可，如果错误，请仔细检查环境变量即可！
    ```

### 3. Maven功能配置

> 我们需要需改**maven/conf/settings.xml**配置文件，来修改maven的一些默认配置。我们主要休要修改的有三个配置：
>
> 1.依赖本地缓存位置（本地仓库位置）
>
> 2.maven下载镜像
>
> 3.maven选用编译项目的jdk版本

1.  配置本地仓库地址
```xml
  <!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
 <!-- conf/settings.xml 55行 -->
 <localRepository>D:\maven-repository</localRepository>
```
2.  配置国内阿里镜像
    ```xml
    <!--在mirrors节点(标签)下添加中央仓库镜像 160行附近-->
    <mirror>
        <id>alimaven</id>
        <name>aliyun maven</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <mirrorOf>central</mirrorOf>
    </mirror>
    ```
    
1.  配置jdk17版本项目构建
    ```xml
    <!--在profiles节点(标签)下添加jdk编译版本 268行附近-->
    <profile>
        <id>jdk-17</id>
        <activation>
          <activeByDefault>true</activeByDefault>
          <jdk>17</jdk>
        </activation>
        <properties>
          <maven.compiler.source>17</maven.compiler.source>
          <maven.compiler.target>17</maven.compiler.target>
          <maven.compiler.compilerVersion>17</maven.compiler.compilerVersion>
        </properties>
    </profile>
    ```

### 4. IDEA配置本地Maven软件

> 我们需要将配置好的maven软件，配置到idea开发工具中即可！ 注意：idea工具默认自带maven配置软件，但是因为没有修改配置，建议替换成本地配置好的maven！

选择本地maven软件

![image-20231021112046512](image-20231021112046512.png)

**注意**：

1、如果本地仓库地址不变化，只有一个原因，就是maven/conf/settings.xml配置文件编写错误！仔细检查即可！

2、一定保证User settings file对应之前修改的settings.xml的路径，若 不一致，选中Override复选框，手动选择配置文件

## 三、基于IDEA创建Maven工程

### 1. 概念梳理Maven工程的GAVP

Maven工程相对之前的项目，多出一组gavp属性，gav需要我们在创建项目的时候指定，p有默认值，我们先行了解下这组属性的含义：

Maven 中的 GAVP 是指 GroupId、ArtifactId、Version、Packaging 等四个属性的缩写，其中前三个是必要的，而 Packaging 属性为可选项。这四个属性主要为每个项目在maven仓库中做一个标识，类似人的姓-名！有了具体标识，方便后期项目之间相互引用依赖等！

GAV遵循一下规则：

​	1） **GroupID 格式**：com.{公司/BU }.业务线.\[子业务线]，最多 4 级。

​		说明：{公司/BU} 例如：alibaba/taobao/tmall/aliexpress 等 BU 一级；子业务线可选。

​		正例：com.taobao.tddl 或 com.alibaba.sourcing.multilang

​	2） **ArtifactID 格式**：产品线名-模块名。语义不重复不遗漏，先到仓库中心去查证一下。

​		正例：tc-client / uic-api / tair-tool / bookstore

​	3） **Version版本号格式推荐**：主版本号.次版本号.修订号

​		1） 主版本号：当做了不兼容的 API 修改，或者增加了能改变产品方向的新功能。

​		2） 次版本号：当做了向下兼容的功能性新增（新增类、接口等）。

​		3） 修订号：修复 bug，没有修改方法签名的功能加强，保持 API 兼容性。

​		例如： 初始→1.0.0  修改bug → 1.0.1  功能调整 → 1.1.1等

**Packaging定义规则：**

​	指示将项目打包为什么类型的文件，idea根据packaging值，识别maven项目类型！

​	packaging 属性为 jar（默认值），代表普通的Java工程，打包以后是.jar结尾的文件。

​	packaging 属性为 war，代表Java的web工程，打包以后.war结尾的文件。

​	packaging 属性为 pom，代表不会打包，用来做继承的父工程。

### 2. Idea构建Maven Java SE工程

注意：此处省略了version，直接给了一个默认值：**1.0-SNAPSHOT**

自己后期可以在项目中随意修改！

![image-20231021143559114](image-20231021143559114.png)

创建工程之后，若第一次使用maven，或者使用的是新的**本地仓库**，idea右下角会出现以下进度条，表示maven正在下载相关插件，等待下载完毕，进度条消失即可

![image-20231021145024505](image-20231021145024505.png)

验证maven工程是否创建成功，当创建完毕maven工程之后，idea中会自动打开Maven视图，如下图：

![image-20231021145713433](image-20231021145713433.png)

### 3. Idea构建Maven Java Web工程

1.  手动创建
    1. 创建一个maven的javase工程
    
       ![image-20231021150134082](image-20231021150134082.png)
    
    2. 修改pom.xml文件打包方式
    
       修改位置：项目下/pom.xml
       ```xml
       <groupId>com.atguigu</groupId>
       <artifactId>maven_web</artifactId>
       <version>1.0-SNAPSHOT</version>
       <!-- 新增一列打包方式packaging -->
       <packaging>war</packaging>
       ```
    
    3. 设置**web资源路径**和**web.xml路径**
    
       点击File-->Project Structure
    
       ![image-20231021151040531](image-20231021151040531.png)
    
       ![image-20231021151627161](image-20231021151627161.png)
    
       ![image-20231021151753318](image-20231021151753318.png)
    
    4. 刷新和校验
    
       ![image-20231021152310802](image-20231021152310802.png)
    
       ![image-20231021151921943](image-20231021151921943.png)
    
2.  插件创建
    1.  安装插件JBLJavaToWeb

        file / settings / plugins / marketplace

        ![](image_cHUU_rABB6.png)
    2.  创建一个javasemaven工程
    3.  右键、使用插件快速补全web项目

        ![](image_ZAPkM7VLgJ.png)

### 4. Maven工程项目结构说明

Maven 是一个强大的构建工具，它提供一种标准化的项目结构，可以帮助开发者更容易地管理项目的依赖、构建、测试和发布等任务。以下是 Maven Web 程序的文件结构及每个文件的作用：

```xml
|-- pom.xml                               # Maven 项目管理文件 
|-- src
    |-- main                              # 项目主要代码
    |   |-- java                          # Java 源代码目录
    |   |   `-- com/example/myapp         # 开发者代码主目录
    |   |       |-- controller            # 存放 Controller 层代码的目录
    |   |       |-- service               # 存放 Service 层代码的目录
    |   |       |-- dao                   # 存放 DAO 层代码的目录
    |   |       `-- model                 # 存放数据模型的目录
    |   |-- resources                     # 资源目录，存放配置文件、静态资源等
    |   |   |-- log4j.properties          # 日志配置文件
    |   |   |-- spring-mybatis.xml        # Spring Mybatis 配置文件
    |   |   `-- static                    # 存放静态资源的目录
    |   |       |-- css                   # 存放 CSS 文件的目录
    |   |       |-- js                    # 存放 JavaScript 文件的目录
    |   |       `-- images                # 存放图片资源的目录
    |   `-- webapp                        # 存放 WEB 相关配置和资源
    |       |-- WEB-INF                   # 存放 WEB 应用配置文件
    |       |   |-- web.xml               # Web 应用的部署描述文件
    |       |   `-- classes               # 存放编译后的 class 文件
    |       `-- index.html                # Web 应用入口页面
    `-- test                              # 项目测试代码
        |-- java                          # 单元测试目录
        `-- resources                     # 测试资源目录
```

-   pom.xml：Maven 项目管理文件，用于描述项目的依赖和构建配置等信息。
-   src/main/java：存放项目的 Java 源代码。
-   src/main/resources：存放项目的资源文件，如配置文件、静态资源等。
-   src/main/webapp/WEB-INF：存放 Web 应用的配置文件。
-   src/main/webapp/index.jsp：Web 应用的入口页面。
-   src/test/java：存放项目的测试代码。
-   src/test/resources：存放测试相关的资源文件，如测试配置文件等。

## 四、基于IDEA进行Maven工程构建

### 1. 构建概念和构建过程

项目构建是指将源代码、依赖库和资源文件等转换成可执行或可部署的应用程序的过程，在这个过程中包括编译源代码、链接依赖库、打包和部署等多个步骤。

项目构建是软件开发过程中至关重要的一部分，它能够大大提高软件开发效率，使得开发人员能够更加专注于应用程序的开发和维护，而不必关心应用程序的构建细节。

同时，项目构建还能够将多个开发人员的代码汇合到一起，并能够自动化项目的构建和部署，大大降低了项目的出错风险和提高开发效率。常见的构建工具包括 Maven、Gradle、Ant 等。

![](image_REm5kk7DnX.png)

### 2. 命令方式项目构建

| 命令          | 描述               |
| ----------- | ---------------- |
| mvn compile | 编译项目，生成target文件  |
| mvn package | 打包项目，生成jar或war文件 |
| mvn clean   | 清理编译或打包后的项目结构    |
| mvn install | 打包后上传到maven本地仓库  |
| mvn deploy  | 只打包，上传到maven私服仓库 |
| mvn site    | 生成站点             |
| mvn test    | 执行测试源码           |

war包打包插件和jdk版本不匹配：pom.xml 添加以下代码即可

```xml
<build>
    <!-- jdk17 和 war包版本插件不匹配 -->
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.2.2</version>
        </plugin>
    </plugins>
</build>
```

命令触发练习：

```bash
mvn 命令 命令

#清理
mvn clean
#清理，并重新打包
mvn clean package
#执行测试代码
mvn test
```

### 3. 可视化方式项目构建

![image-20231021153444864](image-20231021153444864.png)

注意：打包（package）和安装（install）的区别是什么

打包是将工程打成jar或war文件，保存在target目录下

安装是将当前工程所生成的jar或war文件，安装到本地仓库，会按照坐标保存到指定位置

### 4. 构建插件、命令、生命周期命令之间关系

-   **构建生命周期**

    我们发现一个情况！当我们执行package命令也会自动执行compile命令！
```xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ mybatis-base-curd ---
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ mybatis-base-curd ---
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ mybatis-base-curd ---
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ mybatis-base-curd ---
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ mybatis-base-curd ---
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ mybatis-base-curd ---
[INFO] Building jar: D:\javaprojects\backend-engineering\part03-mybatis\mybatis-base-curd\target\mybatis-base-curd-1.0-SNAPSHOT.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  5.013 s
[INFO] Finished at: 2023-06-05T10:03:47+08:00
[INFO] ------------------------------------------------------------------------
```

 这种行为就是因为构建生命周期产生的！构建生命周期可以理解成是一组固定构建命令的有序集合，触发周期后的命令，会自动触发周期前的命令！！！

**构建周期作用：会简化构建过程**
例如：项目打包   mvn clean package即可。&#x20;
主要两个构建生命周期：
-   清理周期：主要是对项目编译生成文件进行清理
    包含命令：clean&#x20;
    
-   默认周期：定义了真正构件时所需要执行的所有步骤，它是生命周期中最核心的部分
    
    包含命令：compile -  test - package - install - deploy

-   **插件、命令、周期三者关系（了解）**

    周期→包含若干命令→包含若干插件

    使用周期命令构建，简化构建过程！

    最终进行构建的是插件！

## 五、基于IDEA 进行Maven依赖管理

### 1. 依赖管理概念

Maven 依赖管理是 Maven 软件中最重要的功能之一。Maven 的依赖管理能够帮助开发人员自动解决软件包依赖问题，使得开发人员能够轻松地将其他开发人员开发的模块或第三方框架集成到自己的应用程序或模块中，避免出现版本冲突和依赖缺失等问题。

我们通过定义 POM 文件，Maven 能够自动解析项目的依赖关系，并通过 Maven **仓库自动**下载和管理依赖，从而避免了手动下载和管理依赖的繁琐工作和可能引发的版本冲突问题。

总之，Maven 的依赖管理是 Maven 软件的一个核心功能之一，使得软件包依赖的管理和使用更加智能和方便，简化了开发过程中的工作，并提高了软件质量和可维护性。

### 2. Maven工程核心信息配置和解读（GAVP）

#### 1.pom.xml文件解读

```xml
<!-- 模型版本 -->
<modelVersion>4.0.0</modelVersion>
<!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成， 如com.companyname.project-group，maven会将该项目打成的jar包放本地路径：/com/companyname/project-group -->
<groupId>com.companyname.project-group</groupId>
<!-- 项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 -->
<artifactId>project</artifactId>
<!-- 版本号 -->
<version>1.0.0</version>

<!--打包方式
    默认：jar
    jar指的是普通的java项目打包方式！ 项目打成jar包！
    war指的是web项目打包方式！项目打成war包！
    pom不会讲项目打包！这个项目作为父工程，被其他工程聚合或者继承！后面会讲解两个概念
-->
<packaging>jar/pom/war</packaging>
```
#### 2.打包方式

##### 1. JAR（Java ARchive）

JAR 文件是一种打包Java类文件、关联的元数据和资源（如文本、图片等）的归档文件格式，它允许Java应用程序以单一请求的资源集合来分发多个Java类和相关资源。

**使用场景**：JAR文件通常用于存储程序库、辅助资源和插件程序，或者作为单独可运行的Java应用程序的分发。如果你的项目是一个库或者简单的应用程序，JAR 是合适的格式。
##### 2. WAR（Web ARchive）

WAR 文件是一种用于分发Java Web应用程序的文件格式，包含了Servlet、JSP、图像、HTML、JavaScript等网站的组件。

**使用场景**：当你的项目是一个需要部署到Servlet容器或者JSP容器的Web应用时，使用WAR格式是理想的选择。WAR包括应用程序所有需要的组件，可以直接部署到Web服务器上。
##### 3. POM（Project Object Model）

POM 本身是一种打包方式，但它并不用于生成任何可执行的代码，而是用作依赖管理和多模块项目管理。

**使用场景**：当你有一个复杂的项目，涉及多个子模块时，你可以创建一个聚合项目，这个项目中不包含具体的代码实现，而是通过其 POM 文件来管理子模块的构建、打包和依赖关系。
##### 4.总结

- **JAR**：适用于库或可执行应用，如springboot项目。
- **WAR**：适用于Web应用程序，直接部署到服务器。
- **POM**：用于项目或依赖管理，并不产生具体的代码输出，常用于父项目中管理子项目。
### 3. Maven工程依赖管理配置

位置：pom.xml

依赖管理和依赖添加
```xml
<!-- 
   通过编写依赖jar包的gav必要属性，引入第三方依赖！
   scope属性是可选的，可以指定依赖生效范围！
   依赖信息查询方式：
      1. maven仓库信息官网 https://mvnrepository.com/
      2. mavensearch插件搜索
 -->
<dependencies>
    <!-- 引入具体的依赖包 -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
        <!-- 依赖范围 -->
        <scope>runtime</scope>
    </dependency>

</dependencies>
```

依赖版本统一提取和维护
```xml
<!--声明版本-->
<properties>
  <!--命名随便,内部制定版本号即可！-->
  <junit.version>4.12</junit.version>
  <!-- 也可以通过 maven规定的固定的key，配置maven的参数！如下配置编码格式！-->
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
</properties>

<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <!--引用properties声明版本 -->
    <version>${junit.version}</version>
  </dependency>
</dependencies>
```

### 4. Maven依赖范围

通过设置坐标的依赖范围(scope)，可以设置 对应jar包的作用范围：==编译环境==、==测试环境==、==运行环境==
```xml
<dependency>  
	<groupId>org.projectlombok</groupId>  
	<artifactId>lombok</artifactId>  
	<version>1.18.24</version>  
	<scope>provided</scope>  
</dependency>
```

`<scope>`标签表示依赖,设置坐标范围，设置jar包作用范围：
编译，测试，运行

| 依赖范围     | 编译  | 测试  | 运行  | 使用场景                        |
| -------- | --- | --- | --- | --------------------------- |
| compile  | 是   | 是   | 是   | 大多数项目依赖，==默认范围==。           |
| provided | 是   | 是   |     | 依赖在运行时由容器提供，例如 Servlet API。 |
| runtime  |     | 是   | 是   | 代码运行时所需的依赖，例如 JDBC 驱动。      |
| test     |     | 是   |     | 仅在测试代码中使用的依赖，例如 JUnit。      |
| system   | 是   | 是   | 是   | 依赖需要显式地在本地系统路径中提供，通常用于特殊情况。 |

| 依赖范围         | 描述                                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **compile**  | 编译依赖范围，scope 元素的缺省值。使用此依赖范围的 Maven 依赖，对于三种 classpath 均有效，即该 Maven 依赖在上述三种 classpath 均会被引入。例如，log4j 在编译、测试、运行过程都是必须的。              |
| **test**     | 测试依赖范围。使用此依赖范围的 Maven 依赖，只对测试 classpath 有效。例如，Junit 依赖只有在测试阶段才需要。                                                                 |
| **provided** | 已提供依赖范围。使用此依赖范围的 Maven 依赖，只对编译 classpath 和测试 classpath 有效。例如，servlet-api 依赖对于编译、测试阶段而言是需要的，但是运行阶段，由于外部容器已经提供，故不需要 Maven 重复引入该依赖。  |
| runtime      | 运行时依赖范围。使用此依赖范围的 Maven 依赖，只对测试 classpath、运行 classpath 有效。例如，JDBC 驱动实现依赖，其在编译时只需 JDK 提供的 JDBC 接口即可，只有测试、运行阶段才需要实现了 JDBC 接口的驱动。     |
| system       | 系统依赖范围，其效果与 provided 的依赖范围一致。其用于添加非 Maven 仓库的本地依赖，通过依赖元素 dependency 中的 systemPath 元素指定本地依赖的路径。鉴于使用其会导致项目的可移植性降低，一般不推荐使用。          |
| import       | 导入依赖范围，该依赖范围只能与 dependencyManagement 元素配合使用，其功能是将目标 pom.xml 文件中 dependencyManagement 的配置导入合并到当前 pom.xml 的 dependencyManagement 中。 |
|              |                                                                                                                                   |

### 5. Maven工程依赖下载失败错误解决（重点）

在使用 Maven 构建项目时，可能会发生依赖项下载错误的情况，主要原因有以下几种：

1.  下载依赖时出现网络故障或仓库服务器宕机等原因，导致无法连接至 Maven 仓库，从而无法下载依赖。
2.  依赖项的版本号或配置文件中的版本号错误，或者依赖项没有正确定义，导致 Maven 下载的依赖项与实际需要的不一致，从而引发错误。
3.  本地 Maven 仓库或缓存被污染或损坏，导致 Maven 无法正确地使用现有的依赖项。

解决方案：

1.  检查网络连接和 Maven 仓库服务器状态。
2.  确保依赖项的版本号与项目对应的版本号匹配，并检查 POM 文件中的依赖项是否正确。
3.  清除本地 Maven 仓库缓存（lastUpdated 文件），因为只要存在lastupdated缓存文件，刷新也不会重新下载。本地仓库中，根据依赖的gav属性依次向下查找文件夹，最终删除内部的文件，刷新重新下载即可！

    例如： pom.xml依赖
    ```xml
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.2.8</version>
    </dependency>
    ```
    文件：

    ![](image_m3iQtBLARz.png)

4. 或者可以将清除**lastUpdated文件**的操作写在一个脚本文件中，手动创建文件"clearLastUpdated.bat"，名字任意，但是后缀必须是bat，将以下内容复制到文件中

   ```bat
   cls 
   @ECHO OFF 
   SET CLEAR_PATH=D: 
   SET CLEAR_DIR=D:\maven-repository(本地仓库路径)
   color 0a 
   TITLE ClearLastUpdated For Windows 
   GOTO MENU 
   :MENU 
   CLS
   ECHO. 
   ECHO. * * * *  ClearLastUpdated For Windows  * * * * 
   ECHO. * * 
   ECHO. * 1 清理*.lastUpdated * 
   ECHO. * * 
   ECHO. * 2 查看*.lastUpdated * 
   ECHO. * * 
   ECHO. * 3 退 出 * 
   ECHO. * * 
   ECHO. * * * * * * * * * * * * * * * * * * * * * * * * 
   ECHO. 
   ECHO.请输入选择项目的序号： 
   set /p ID= 
   IF "%id%"=="1" GOTO cmd1 
   IF "%id%"=="2" GOTO cmd2 
   IF "%id%"=="3" EXIT 
   PAUSE 
   :cmd1 
   ECHO. 开始清理
   %CLEAR_PATH%
   cd %CLEAR_DIR%
   for /r %%i in (*.lastUpdated) do del %%i
   ECHO.OK 
   PAUSE 
   GOTO MENU 
   :cmd2 
   ECHO. 查看*.lastUpdated文件
   %CLEAR_PATH%
   cd %CLEAR_DIR%
   for /r %%i in (*.lastUpdated) do echo %%i
   ECHO.OK 
   PAUSE 
   GOTO MENU 
   ```

   ![image-20231021161615994](image-20231021161615994.png)

### 6. Maven工程Build构建配置

项目构建是指将源代码、依赖库和资源文件等转换成可执行或可部署的应用程序的过程，在这个过程中包括编译源代码、链接依赖库、打包和部署等多个步骤。

默认情况下，构建不需要额外配置，都有对应的缺省配置。当然了，我们也可以在pom.xml定制一些配置，来修改默认构建的行为和产物！

例如：
1.  指定构建打包文件的名称，非默认名称
2.  制定构建打包时，指定包含文件格式和排除文件
3.  打包插件版本过低，配置更高版本插件

构建配置是在pom.xml / build标签中指定！

#### **指定打包命名**

```xml
<!-- 默认的打包名称：artifactid+verson.打包方式 -->
<build>
  <finalName>定义打包名称</finalName>
</build>  
```

#### **指定打包文件**

如果在java文件夹中添加java类，会自动打包编译到classes文件夹下！

==但是在java文件夹中添加xml文件，默认不会被打包！==

默认情况下，按照maven工程结构放置的文件会默认被编译和打包！

除此之外、我们可以使用resources标签，指定要打包资源的文件夹要把哪些静态资源打包到 classes根目录下！

应用场景：mybatis中有时会将用于编写SQL语句的映射文件和mapper接口都写在src/main/java下的某个包中，此时映射文件就不会被打包，如何解决

```xml
<build>
    <!--设置要打包的资源位置-->
    <resources>
        <resource>
            <!--设置资源所在目录-->
            <directory>src/main/java</directory>
            <includes>
                <!--设置包含的资源类型-->
                <include>**/*.xml</include>
            </includes>
        </resource>
    </resources>
</build>
```

#### **配置依赖插件**

dependencies标签下引入开发需要的jar包！我们可以在build/plugins/plugin标签引入插件！

常用的插件：修改jdk版本、tomcat插件、mybatis分页插件、mybatis逆向工程插件等等！

```xml
<build>
  <plugins>
      <!-- java编译插件，配jdk的编译版本 -->
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
          <encoding>UTF-8</encoding>
        </configuration>
      </plugin>
      <!-- tomcat插件 -->
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
         <version>2.2</version>
          <configuration>
          <port>8090</port>
          <path>/</path>
          <uriEncoding>UTF-8</uriEncoding>
          <server>tomcat7</server>
        </configuration>
      </plugin>
    </plugins>
</build>
```

## 六、Maven依赖传递和依赖冲突

### 1. Maven依赖传递特性

**概念**

假如有Maven项目A，项目B依赖A，项目C依赖B。那么我们可以说 C依赖A。也就是说，依赖的关系为：C—>B—>A， 那么我们执行项目C时，会自动把B、A都下载导入到C项目的jar包文件夹中，这就是依赖的传递性。

**作用**

-   简化依赖导入过程
-   确保依赖版本正确

**传递的原则**

在 A 依赖 B，B 依赖 C 的前提下，C 是否能够传递到 A，取决于 B 依赖 C 时使用的依赖范围以及配置

- B 依赖 C 时使用 compile 范围：可以传递

- B 依赖 C 时使用 test 或 provided 范围：不能传递，所以需要这样的 jar 包时，就必须在需要的地方明确配置依赖才可以。

- B 依赖 C 时，若配置了以下标签，则不能传递

  ```xml
  <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.2.15</version>
      <optional>true</optional>
  </dependency>
  ```

**依赖传递终止**

-   非compile范围进行依赖传递
-   使用`<optional>true</optional>`配置终止传递
-   依赖冲突（传递的依赖已经存在）

**案例：导入jackson依赖**

分析：jackson需要三个依赖

![](image_9ViibmeAvU.png)

依赖传递关系：data-bind中，依赖其他两个依赖

![](image_Wl0Lsj_BLk.png)

最佳导入：直接可以导入data-bind，自动依赖传递需要的依赖

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.10.0</version>
</dependency>

```

### 2. Maven依赖冲突特性

当直接引用或者间接引用出现了相同的jar包! 这时呢，一个项目就会出现相同的重复jar包，这就算作冲突！依赖冲突避免出现重复依赖，并且终止依赖传递！

![](image_km7_szBRUw.png)

maven自动解决依赖冲突问题能力，会按照自己的原则，进行重复依赖选择。同时也提供了手动解决的冲突的方式，不过不推荐！

**解决依赖冲突（如何选择重复依赖）方式：**

1.  自动选择原则
    -   ==短路优先原则（第一原则==）

        A—>B—>C—>D—>E—>X(version 0.0.1)

        A—>F—>X(version 0.0.2)

        则A依赖于X(version 0.0.2)。
    -   ==依赖路径长度相同情况下，则“先声明优先”（第二原则）==

        A—>E—>X(version 0.0.1)

        A—>F—>X(version 0.0.2)

        在\<depencies>\</depencies>中，先声明的，路径相同，会优先选择！
2.  手动排除
    ```xml
    <dependency>
      <groupId>com.atguigu.maven</groupId>
      <artifactId>pro01-maven-java</artifactId>
      <version>1.0-SNAPSHOT</version>
      <scope>compile</scope>
      <!-- 使用excludes标签配置依赖的排除  -->
      <exclusions>
        <!-- 在exclude标签中配置一个具体的排除 -->
        <exclusion>
          <!-- 指定要排除的依赖的坐标（不需要写version） -->
          <groupId>commons-logging</groupId>
          <artifactId>commons-logging</artifactId>
        </exclusion>
      </exclusions>
    </dependency>
    ```
3.  小案例

    伪代码如下：
    ```xml
    前提：
       A 1.1 -> B 1.1 -> C 1.1 
       F 2.2 -> B 2.2 
       
    pom声明：
       F 2.2
       A 1.1 
    ```
    请问最终会导入哪些依赖和对应版本？

## 七.Maven分模块开发
### 1.Maven 分模块项目的基本概念
在大型项目中，常常需要将应用程序拆分成多个模块，以便更好地管理和维护。Maven 的分模块开发功能非常适合这种需求。

在 Maven 中，分模块项目通常被组织成一个父项目和多个子模块。父项目包含共享的配置和依赖管理，而各个子模块则具体实现业务功能或提供特定的库。
### 2.继承
<span  style="color: red;font-size: 20;">概念：</span>
在 Maven 中，"继承" 是指项目可以继承另一个项目（称为父项目）的配置。这种机制是 Maven 通过其项目对象模型（POM）实现多模块项目管理和代码重用的关键方式。
<span  style="color: red;font-size: 20;">实现：</span>
parent标签
```
<parent>...</parent>
```
#### 2.1父 POM 和子 POM
在 Maven 项目结构中，父 POM 通常包含一组通用的配置设置，这些设置可以被一个或多个子项目（子 POM）继承。子 POM 会继承父 POM 的配置，如依赖管理、插件配置、属性等，同时还可以覆盖或添加特定于自己的配置。
#### 2.1何配置继承
##### 1.**定义父 POM**：
在父项目的 `pom.xml` 中，你会设置通用的配置，例如项目的依赖、构建配置和插件等。设置打包方式pom(默认jar)
```xml
<?xml version="1.0" encoding="UTF-8"?>

<!-- 父 POM -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!-- 设置打包方式 -->
    <!-- 当前工程作为父工程，它要去管理子工程，所以打包方式必须是 pom -->
    <packaging>pom</packaging>

    <!-- 共用依赖管理 -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>5.2.12.RELEASE</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```

##### 2.**配置子 POM**：
在子项目的 `pom.xml` 中，你需要指定父项目。这通过在子 POM 中添加 `<parent>` 标签来实现。

> [!groupid注释]
> 在 Maven 中，子项目通常需要指定自己的 `groupId`，除非它和父项目的 `groupId` 相同。在父 POM 和子 POM 共享同一个 `groupId` 的情况下，子项目可以继承父项目的 `groupId`，因此可以省略 `groupId` 标签。如果子项目的 `groupId` 不同于父项目，则需要在子 POM 中显式声明 `groupId`。

```xml
<!-- 子 POM -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

	<!-- 添加<parent>标签 -->
    <parent>
        <groupId>com.example</groupId>
        <artifactId>parent-project</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    
    <artifactId>child-project</artifactId>
    
</project>
```
#### 2.1优势与限制
**优势**：
- **代码重用**：避免在每个项目中重复配置。
- **统一管理**：易于管理项目的依赖和插件版本。
**限制**：
- **过度依赖**：如果父项目配置过于复杂，可能会导致子项目难以理解和维护。
- **灵活性降低**：子项目可能因为继承而难以进行个别配置的修改。
#### 2.1版本锁定
在 Maven 项目中，版本锁定是一个重要的实践，尤其是在大型项目或分布式团队开发中。它可以确保项目的一致性和稳定性，避免因依赖更新导致的潜在问题。版本锁定通常涉及到明确指定依赖和插件的具体版本号，而不是使用版本范围或动态版本（如使用 `LATEST` 或 `RELEASE`）。
##### 1.Maven 版本锁定的策略
###### **1.精确指定依赖版本**：
- 在 `pom.xml` 文件中，明确指定每一个依赖和插件的版本号。避免使用如 `1.2.+` 或 `>=1.2` 这样的版本范围定义，这样做可以确保每次构建都使用同一版本的依赖，不受外部更新的影响。
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.9</version>
</dependency>
```
###### **2.使用版本管理插件**：
- 使用 Maven 的 `versions-maven-plugin` 插件可以帮助管理项目中的版本。这个插件提供了多种目标（goals），如 `versions:use-latest-versions` 或 `versions:lock-snapshots`，可以用来更新项目的依赖版本或锁定快照版本。
```bash
mvn versions:use-releases
```
 这个命令会将项目中的所有 SNAPSHOT 版本替换为最新的正式发布版本。
###### 3.继承和依赖管理 ：

在多模块项目中 ***父 pom.xml ***
可以用来集中管理所有子模块的版本号。通过在父项目的 `dependencyManagement` 部分指定依赖版本,指定版本`<version>`,但是不会下载依赖文件

```xml
<!-- 通过在properties自定义标签控制版本 -->
<properties>
	<commons-lang3.verison>3.9</commons-lang3.verison>
</properties>

<!-- 将自定义标签导入dependencyManagement -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
            <version>${commons-lang3.verison}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

- ***子opm.xml***就==不需要指定版本==了，所有子模块都将继承这个设置，并不再需要指定`<version>`，确保整个项目的一致性。
```xml
<dependencies>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
        </dependency>
    </dependencies>
```
##### 2.为什么需要版本锁定？

- **保证可重现性**：确保每个开发者和环境中的构建行为一致。
- **减少意外更新的风险**：避免自动更新到新版本可能引入的不兼容或错误。
- **简化问题跟踪**：当所有开发者使用相同版本的依赖时，排查和定位问题更为简单。

版本锁定是一个推荐的最佳实践，特别是在维护长期项目或在持续集成/持续部署（CI/CD）环境中非常关键。这不仅可以防止因依赖问题导致的构建失败，还可以确保软件的质量和稳定性。在实施版本锁定时，也应定期审查和更新这些依赖，以兼顾安全和新功能的需要。
### 3.聚合
#### 3.1Maven 聚合的基本概念
在 Maven 中，聚合（Aggregation）是指将多个模块项目组合在一起，通过一个单一的入口点来构建这些模块。

这通常是通过在父项目的 POM 文件中定义一个聚合关系来实现的。聚合项目允许你在父项目的级别上执行 Maven 命令，这些命令会递归地应用到所有子模块中，从而实现整个项目的统一构建和管理。
#### 3.2创建(聚合工程/父工程)
##### **1..添加要聚合的子模块**：
- 创建一个基础的 Maven 项目，这个项目通常==没有具体的业务功能代码==，而是作为子模块的容器使

- 在==父项目的 POM 文件==中，使用 `<modules>` 标签列出所有子模块的目录名称。
```xml
<groupId>com.example</groupId>
<artifactId>parent-project</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>pom</packaging>

<modules>
    <module>module-a</module>
    <module>module-b</module>
</modules>
```
 这里，`module-a` 和 `module-b` 是目录名，这些目录应该位于父项目目录下。
##### **2.配置子模块**：
 - 每个子模块都是一个独立的 Maven 项目，它们各自包含自己的 `pom.xml` 文件。
 - 子模块的 `pom.xml` 需要声明它们的父项目。
```xml
<parent>
    <groupId>com.example</groupId>
    <artifactId>parent-project</artifactId>
    <version>1.0-SNAPSHOT</version>
</parent>

<artifactId>module-a</artifactId>
```
#### 3.3聚合的好处
- **一致性管理**：父项目可以定义所有子模块共享的依赖和插件配置，确保项目各部分的一致性。
- **简化构建过程**：通过在父项目级别执行命令，可以一次性构建所有子模块，便于管理和自动化。
- **模块化开发**：支持团队分工和并行开发，每个模块可以由不同的团队独立开发和维护。

## 八、Maven生命周期
Maven的生命周期分为三个独立的生命周期，每个生命周期包含多个阶段：
1. **clean生命周期**：用于清理项目。
2. **default生命周期**：这是主要的构建生命周期，包含从编译、测试到打包的所有阶段。
3. **site生命周期**：用于生成项目站点文档。
### 1.Clean生命周期
1. **pre-clean**：执行一些需要在clean之前完成的工作。
2. ==**clean**==：移除上一次构建生成的所有文件。
3. **post-clean**：执行一些需要在clean之后立刻完成的工作。
### 2.Default生命周期
1. ==**validate**==：验证项目是否正确并且所有必要的信息是否可用。
2. **initialize**：初始化构建状态，比如设置属性。
3. **generate-sources**：生成项目源代码。
4. **process-sources**：处理项目源代码，例如代码生成。
5. **generate-resources**：生成项目资源。
6. **process-resources**：复制并处理资源文件到目标目录，准备打包。
7. ==**compile**==：编译项目的源代码。
8. **process-classes**：处理生成的字节码，比如通过字节码增强或修改。
9. **generate-test-sources**：生成测试源代码。
10. **process-test-sources**：处理测试源代码。
11. **generate-test-resources**：生成测试资源。
12. **process-test-resources**：复制并处理测试资源文件到目标目录。
13. **test-compile**：编译测试源代码。
14. **process-test-classes**：处理生成的测试字节码。
15. ==**test**==：运行测试。（要引入junit的依赖）
16. **prepare-package**：在实际打包之前执行一些必要的操作。
17. ==**package**==：将编译好的代码打包成可发布的格式，比如JAR、WAR文件。
18. **pre-integration-test**：执行一些在集成测试之前需要完成的操作。
19. **integration-test**：将处理好的包部署到一个可以运行集成测试的环境中。
20. **post-integration-test**：执行一些在集成测试之后需要完成的操作。
21. ==**verify**==：运行任何检查以验证包的有效性和质量。
22. ==**install**==：将包安装到本地仓库，以供其他项目使用。
23. ==**deploy**==：将最终的包复制到远程仓库中，以共享给其他开发者和项目。
### 3.Site生命周期
1. **pre-site**：执行在生成站点文档之前的操作。
2. ==**site**==：生成项目站点文档。
3. **post-site**：执行在生成站点文档之后的操作，并为部署做准备。
4. **site-deploy**：将生成的站点文档部署到特定的服务器上。


## 九、Maven私服
### 1.私服安装配置
#### 1. Maven私服简介

①私服简介

Maven 私服是一种特殊的Maven远程仓库，它是架设在局域网内的仓库服务，用来代理位于外部的远程仓库（中央仓库、其他远程公共仓库）。

> 当然也并不是说私服只能建立在局域网，也有很多公司会直接把私服部署到公网，具体还是得看公司业务的性质是否是保密的等等，因为局域网的话只能在公司用，部署到公网的话员工在家里也可以办公使用。

建立了 Maven 私服后，当局域网内的用户需要某个构件时，会按照如下顺序进行请求和下载。

请求本地仓库，若本地仓库不存在所需构件，则跳转到第 2 步；
请求 Maven 私服，将所需构件下载到本地仓库，若私服中不存在所需构件，则跳转到第 3 步。
请求外部的远程仓库，将所需构件下载并缓存到 Maven 私服，若外部远程仓库不存在所需构件，则 Maven 直接报错。

此外，一些无法从外部仓库下载到的构件，也能从本地上传到私服供其他人使用。

![image-20231021164631791](image-20231021164631791.png)

②Maven私服的优势

1. 节省外网带宽
   消除对外部远程仓库的大量重复请求（会消耗很大量的带宽），降低外网带宽压力。

2. 下载速度更快
   Maven私服位于局域网内，从私服下载构建更快更稳定。

3. 便于部署第三方构件
   有些构件无法从任何一个远程仓库中获得（如：公司或组织内部的私有构件、Oracle的JDBC驱动等），建立私服之后，就可以将这些构件部署到私服中，供内部Maven项目使用。

4. 提高项目的稳定性，增强对项目的控制
   如果不建立私服，那么Maven项目的构件就高度依赖外部的远程仓库，若外部网络不稳定，则项目的构建过程也会变得不稳定。建立私服后，即使外部网络状况不佳甚至中断，只要私服中已经缓存了所需的构件，Maven也能够正常运行。私服软件（如：Nexus）提供了很多控制功能（如：权限管理、RELEASE/SNAPSHOT版本控制等），可以对仓库进行一些更加高级的控制。

5. 降低中央仓库得负荷压力
   由于私服会缓存中央仓库得构件，避免了很多对中央仓库的重复下载，降低了中央仓库的负荷。

③常见的Maven私服产品

1. Apache的Archiva
2. JFrog的Artifactory
3. Sonatype的Nexus（[ˈneksəs]）（当前最流行、使用最广泛）

#### 2. Nexus下载安装

下载地址：https://help.sonatype.com/repomanager3/product-information/download

解压，以管理员身份打开CMD，进入bin目录下，执行./nexus /run命令启动

访问 Nexus 首页

首页地址：http://localhost:8081/，8081为默认端口号

![images](img001.612496a3.png)

#### 3. 初始设置

![images](img002.e1ac8197.png)

![image-20231031171116756](image-20231031171116756.png)

这里参考提示：

- 用户名：admin
- 密码：查看 **E:\Server\nexus-3.61.0-02-win64\sonatype-work\nexus3\admin.password** 文件

![image-20231031171242874](image-20231031171242874.png)

继续执行初始化：

![images](img005.4b81e5ab.png)

![images](img006.43ebb0ac.png)

匿名登录，启用还是禁用？由于启用匿名登录后，后续操作比较简单，这里我们演示禁用匿名登录的操作：

![image-20231031171607378](image-20231031171607378.png)

初始化完毕：

![image-20231031171708085](image-20231031171708085.png)

#### 4. Nexus上的各种仓库

![images](img009.7f737ed7.png)

| 仓库类型   | 说明                            |
| ------ | ----------------------------- |
| proxy  | 某个远程仓库的代理                     |
| group  | 存放：通过 Nexus 获取的第三方 jar 包      |
| hosted | 存放：本团队其他开发人员部署到 Nexus 的 jar 包 |

| 仓库名称        | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| maven-central   | Nexus 对 Maven 中央仓库的代理                                |
| maven-public    | Nexus 默认创建，供开发人员下载使用的组仓库                   |
| maven-releases  | Nexus 默认创建，供开发人员部署自己 jar 包的宿主仓库 要求 releases 版本 |
| maven-snapshots | Nexus 默认创建，供开发人员部署自己 jar 包的宿主仓库 要求 snapshots 版本 |

初始状态下，这几个仓库都没有内容：

![images](img010.e3573d0b.png)

#### 5. 通过 Nexus 下载 jar 包

修改本地maven的核心配置文件settings.xml，设置新的本地仓库地址

```xml
<!-- 配置一个新的 Maven 本地仓库 -->
<localRepository>D:/maven-repository-new</localRepository>
```

把我们原来配置阿里云仓库地址的 mirror 标签改成下面这样：

```xml
<mirror>
	<id>nexus-mine</id>
	<mirrorOf>central</mirrorOf>
	<name>Nexus mine</name>
	<url>http://localhost:8081/repository/maven-public/</url>
</mirror>
```

这里的 url 标签是这么来的：

![images](img012.5a3b1f11.png)

![image-20231031172137288](image-20231031172137288.png)

把上图中看到的地址复制出来即可。如果我们在前面允许了匿名访问，到这里就够了。但如果我们禁用了匿名访问，那么接下来我们还要继续配置 settings.xml：

```xml
<server>
  <id>nexus-mine</id>
  <username>admin</username>
  <password>atguigu</password>
</server>
```

这里需要**格外注意**：server 标签内的 id 标签值必须和 mirror 标签中的 id 值一样。

找一个用到框架的 Maven 工程，执行命令：

```sh
mvn clean compile
```

下载过程日志：

> Downloading from nexus-mine: http://localhost:8081/repository/maven-public/com/jayway/jsonpath/json-path/2.4.0/json-path-2.4.0.pom
> Downloaded from nexus-mine: http://localhost:8081/repository/maven-public/com/jayway/jsonpath/json-path/2.4.0/json-path-2.4.0.pom (2.6 kB at 110 kB/s)
> Downloading from nexus-mine: http://localhost:8081/repository/maven-public/net/minidev/json-smart/2.3/json-smart-2.3.pom
> Downloaded from nexus-mine: http://localhost:8081/repository/maven-public/net/minidev/json-smart/2.3/json-smart-2.3.pom (9.0 kB at 376 kB/s)
> Downloading from nexus-mine: http://localhost:8081/repository/maven-public/net/minidev/minidev-parent/2.3/minidev-parent-2.3.pom
> Downloaded from nexus-mine: http://localhost:8081/repository/maven-public/net/minidev/minidev-parent/2.3/minidev-parent-2.3.pom (8.5 kB at 404 kB/s)
> Downloading from nexus-mine: http://localhost:8081/repository/maven-public/net/minidev/accessors-smart/1.2/accessors-smart-1.2.pom
> Downloaded from nexus-mine: http://localhost:8081/repository/maven-public/net/minidev/accessors-smart/1.2/accessors-smart-1.2.pom (12 kB at 463 kB/s)

下载后，Nexus 服务器上就有了 jar 包：

![images](img014.cc0e87c3.png)

若下载速度太慢，可以设置私服中中央仓库的地址为阿里云仓库地址

![image-20231031175035345](image-20231031175035345.png)

修改为：http://maven.aliyun.com/nexus/content/groups/public/

![image-20231031175134745](image-20231031175134745.png)

#### 6. 将 jar 包部署到 Nexus

maven工程中配置：

```xml
<distributionManagement>
    <snapshotRepository>
        <id>nexus-mine</id>
        <name>Nexus Snapshot</name>
        <url>http://localhost:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```

注意：这里 snapshotRepository 的 id 标签必须和 settings.xml 中指定的 mirror 标签的 id 属性一致。

执行部署命令：

```sh
mvn deploy
```

> Uploading to nexus-mine: http://localhost:8081/repository/maven-snapshots/com/atguigu/demo/demo07-redis-data-provider/1.0-SNAPSHOT/maven-metadata.xml
> Uploaded to nexus-mine: http://localhost:8081/repository/maven-snapshots/com/atguigu/demo/demo07-redis-data-provider/1.0-SNAPSHOT/maven-metadata.xml (786 B at 19 kB/s)
> Uploading to nexus-mine: http://localhost:8081/repository/maven-snapshots/com/atguigu/demo/demo07-redis-data-provider/maven-metadata.xml
> Uploaded to nexus-mine: http://localhost:8081/repository/maven-snapshots/com/atguigu/demo/demo07-redis-data-provider/maven-metadata.xml (300 B at 6.5 kB/s)
> [INFO] ------------------------------------------------------------------------
> [INFO] Reactor Summary:
> [INFO]
> [INFO] demo-imperial-court-ms-show 1.0-SNAPSHOT ........... SUCCESS [ 1.875 s]
> [INFO] demo09-base-entity ................................. SUCCESS [ 21.883 s]
> [INFO] demo10-base-util ................................... SUCCESS [ 0.324 s]
> [INFO] demo08-base-api .................................... SUCCESS [ 1.171 s]
> [INFO] demo01-imperial-court-gateway ...................... SUCCESS [ 0.403 s]
> [INFO] demo02-user-auth-center ............................ SUCCESS [ 2.932 s]
> [INFO] demo03-emp-manager-center .......................... SUCCESS [ 0.312 s]
> [INFO] demo04-memorials-manager-center .................... SUCCESS [ 0.362 s]
> [INFO] demo05-working-manager-center ...................... SUCCESS [ 0.371 s]
> [INFO] demo06-mysql-data-provider ......................... SUCCESS [ 6.779 s]
> [INFO] demo07-redis-data-provider 1.0-SNAPSHOT ............ SUCCESS [ 0.273 s]

![images](img015.b413af9d.png)

#### 7. 引用别人部署的 jar 包

maven工程中配置：

```xml
<repositories>
    <repository>
        <id>nexus-mine</id>
        <name>nexus-mine</name>
        <url>http://localhost:8081/repository/maven-snapshots/</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>
```



### 2.私服使用
Maven 私服，通常指的是私有的 Maven 仓库，用于存放项目的依赖（如 JAR 文件）和构建输出。使用 Maven 私服可以帮助团队提升构建效率，确保依赖的可用性，以及加强对构建工件的安全和权限管理。
#### 2.1为什么需要 Maven 私服？
1. **提升构建速度**：私服可以缓存从中央仓库下载的依赖，减少从互联网下载依赖的次数，从而加快本地构建速度。
2. **依赖管理**：确保所有项目使用的依赖都是经过审核和测试的，防止不稳定或不安全的库被引入项目。
3. **内部共享**：方便团队成员之间共享内部开发的库，而无需发布到公共 Maven 仓库。
4. **持续集成**：在持续集成/持续部署（CI/CD）环境中，私服可以作为构建工件的统一存储点。
#### 2.2常用的 Maven 私服解决方案

##### 1Nexus Repository OSS：
- Sonatype Nexus 是一个流行的仓库管理工具，支持 Maven 仓库以及其他类型的仓库（如 npm, NuGet, Docker 等）。
- Nexus 提供了强大的权限管理和仓库组织功能，可以配置多个托管仓库和代理仓库。
##### 2Artifactory：
- JFrog Artifactory 是另一个广泛使用的仓库解决方案，支持 Maven 以及其他多种包管理系统。
- Artifactory 提供高级的企业特性，如高可用性配置和细粒度的访问控制。
##### 3Archiva：
 - Apache Archiva 是一个更轻量级的仓库管理系统，适合小型到中型企业。
 - 它提供基本的仓库管理功能，包括代理远程仓库和托管内部项目构建的输出。
#### 3.3如何设置 Maven 私服

设置一个 Maven 私服通常包括以下步骤：

1. **安装和配置**：
    - 选择一个适合的 Maven 仓库管理软件，并按照提供的文档进行安装和配置。
    - 根据需要设置内部网络和安全策略。
2. **配置 Maven**：
    - 在项目的 `pom.xml` 或 Maven 的全局配置文件 `settings.xml` 中配置仓库地址。
    - 你可以指定私服为依赖的下载源，也可以配置为部署构建产物的目标。
    
```xml
<repositories>
    <repository>
        <id>internal-repo</id>
        <url>http://your-nexus-server/repository/maven-public/</url>
    </repository>
</repositories>

<distributionManagement>
    <repository>
        <id>internal-release-repo</id>
        <url>http://your-nexus-server/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
        <id>internal-snapshot-repo</id>
        <url>http://your-nexus-server/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```
    
3. **部署和使用**：
    - 使用 Maven 命令部署项目产物到私服。
    - 项目组成员可以配置他们的 Maven 客户端，以私服作为主要的依赖源。

通过配置和使用 Maven 私服，开发团队可以在确保依赖管理效率和安全性的同时，加速开发和部署过程。这对于大型团队和需要严格依赖管理的企业环境尤其有益。
#### 3.4访问私服
##### 1. 配置 `settings.xml`
`settings.xml` 文件通常位于你的 Maven 安装目录下的 `conf` 文件夹中，或者在你的用户目录下的 `.m2` 文件夹中。通过配置此文件，可以为所有 Maven 项目设置统一的访问规则。
###### 添加仓库和仓库服务器
在 `settings.xml` 中配置仓库地址和认证信息：

```xml
<settings>

	<!-- 添加服务器认证信息，这里包括认证信息(如用户名和密码) -->
    <servers>
        <server>
            <id>internal-repo</id>
            <username>yourUsername</username>
            <password>yourPassword</password>
        </server>
    </servers>

	<!-- 配置镜像私服地址 -->
	<mirrors>
	    <mirror>
	        <id>internal-repo</id>
	        <mirrorOf>central</mirrorOf>
	        <name>Internal Repository</name>
	        <url>http://your-private-server/repository/maven-central/</url>
	    </mirror>
	 </mirrors>

	<!-- 定义仓库和插件仓库链接 -->
    <profiles>
        <profile>
            <id>internal-repository</id>
            <repositories>
                <repository>
                    <id>internal-repo</id>
                    <url>http://your-nexus-server/repository</url>
                </repository>
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>internal-repo</id>
                    <url>http://your-nexus-server/repository</url>
                </pluginRepository>
            </pluginRepositories>
        </profile>
    </profiles>

	<!-- 激活该配置文件 -->
    <activeProfiles>
        <activeProfile>internal-repository</activeProfile>
    </activeProfiles>
    
</settings>

```

这里的 `<id>` 必须与 `pom.xml` 中引用的仓库 ID 相匹配。

##### 2. 配置项目的 `pom.xml`

你也可以直接在项目的 `pom.xml` 文件中指定仓库，这样只影响当前项目：
```xml
<project>
    <repositories>
        <repository>
            <id>internal-repo</id>
            <url>http://your-nexus-server/repository/maven-public/</url>
        </repository>
    </repositories>

    <distributionManagement>
	    <!-- RELEASE版本 -->
        <repository>
            <id>internal-release-repo</id>
            <url>http://your-nexus-server/repository/maven-releases/</url>
        </repository>

		<!-- SNAPSHOT版本 -->
        <snapshotRepository>
            <id>internal-snapshot-repo</id>
            <url>http://your-nexus-server/repository/maven-snapshots/</url>
        </snapshotRepository>
        
    </distributionManagement>
</project>
```
##### 3. 使用私服
一旦配置完成，你可以通过 Maven 命令来拉取依赖或部署项目。例如，使用以下命令来构建项目，并自动从配置的私服下载依赖
```bash
mvn clean install
```
或者部署构建产物到私服：
```bash
mvn deploy
```
##### 4.注意事项
- **安全配置**：在生产环境中，应该避免在配置文件中明文存储密码。考虑使用加密方式存储敏感信息。
- **网络配置**：确保你的开发环境能够访问到私服所在的网络，可能需要配置VPN或其他网络访问措施。
- **权限管理**：根据实际情况配置适当的权限，确保仓库的安全。

通过以上步骤，你可以有效地配置 Maven 以使用私有仓库，从而提高项目的构建效率和安全性。

### 3.setting.xml私服配置详细
[参考博客](https://www.cnblogs.com/jingmoxukong/p/6050172.html)
#### 3.1settings.xml有什么用？

如果在Eclipse中使用过Maven插件，想必会有这个经验：配置settings.xml文件的路径。  
![Paste_Image.png](https://upload-images.jianshu.io/upload_images/3101171-a9137d52a1eab02d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
**settings.xml文件是干什么的，为什么要配置它呢？**  
从settings.xml的文件名就可以看出，它是用来设置maven参数的配置文件。并且，**settings.xml是maven的全局配置文件**。而pom.xml文件是所在项目的局部配置。  
Settings.xml中包含类似本地仓储位置、修改远程仓储服务器、认证信息等配置。

#### 3.2settings.xml文件位置

settings.xml文件一般存在于两个位置：  
全局配置: ${M2_HOME}/conf/settings.xml  
用户配置: user.home/.m2/settings.xmlnote：用户配置优先于全局配置。𝑢𝑠𝑒𝑟.ℎ𝑜𝑚𝑒/.𝑚2/𝑠𝑒𝑡𝑡𝑖𝑛𝑔𝑠.𝑥𝑚𝑙𝑛𝑜𝑡𝑒：用户配置优先于全局配置。{user.home} 和和所有其他系统属性只能在3.0+版本上使用。请注意windows和Linux使用变量的区别。

##### 配置优先级

需要注意的是：**局部配置优先于全局配置**。  
配置优先级从高到低：pom.xml> user settings > global settings  
如果这些文件同时存在，在应用配置时，会合并它们的内容，如果有重复的配置，优先级高的配置会覆盖优先级低的。

#### 3.3settings.xml元素详解

##### 顶级元素概览

下面列举了`settings.xml`中的顶级元素

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                          https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository/>
  <interactiveMode/>
  <usePluginRegistry/>
  <offline/>
  <pluginGroups/>
  <servers/>
  <mirrors/>
  <proxies/>
  <profiles/>
  <activeProfiles/>
</settings>
```

##### LocalRepository

**作用**：该值表示构建系统本地仓库的路径。  
其默认值：~/.m2/repository。

```xml
<localRepository>${user.home}/.m2/repository</localRepository>
```

##### InteractiveMode

**作用**：表示maven是否需要和用户交互以获得输入。  
如果maven需要和用户交互以获得输入，则设置成true，反之则应为false。默认为true。

```xml
<interactiveMode>true</interactiveMode>
```

##### UsePluginRegistry

**作用**：maven是否需要使用plugin-registry.xml文件来管理插件版本。  
如果需要让maven使用文件~/.m2/plugin-registry.xml来管理插件版本，则设为true。默认为false。

```xml
<usePluginRegistry>false</usePluginRegistry>
```

##### Offline

**作用**：表示maven是否需要在离线模式下运行。  
如果构建系统需要在离线模式下运行，则为true，默认为false。  
当由于网络设置原因或者安全因素，构建服务器不能连接远程仓库的时候，该配置就十分有用。

```xml
<offline>false</offline>
```

##### PluginGroups

**作用**：当插件的组织id（groupId）没有显式提供时，供搜寻插件组织Id（groupId）的列表。  
该元素包含一个pluginGroup元素列表，每个子元素包含了一个组织Id（groupId）。  
当我们使用某个插件，并且没有在命令行为其提供组织Id（groupId）的时候，Maven就会使用该列表。默认情况下该列表包含了`org.apache.maven.plugins`和`org.codehaus.mojo`。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <pluginGroups>
    <!--plugin的组织Id（groupId） -->
    <pluginGroup>org.codehaus.mojo</pluginGroup>
  </pluginGroups>
  ...
</settings>
```

##### Servers

**作用**：一般，仓库的下载和部署是在pom.xml文件中的`repositories`和`distributionManagement`元素中定义的。然而，一般类似用户名、密码（**有些仓库访问是需要安全认证的**）等信息不应该在pom.xml文件中配置，这些信息可以配置在`settings.xml`中。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <!--配置服务端的一些设置。一些设置如安全证书不应该和pom.xml一起分发。这种类型的信息应该存在于构建服务器上的settings.xml文件中。 -->
  <servers>
    <!--服务器元素包含配置服务器时需要的信息 -->
    <server>
      <!--这是server的id（注意不是用户登陆的id），该id与distributionManagement中repository元素的id相匹配。 -->
      <id>server001</id>
      <!--鉴权用户名。鉴权用户名和鉴权密码表示服务器认证所需要的登录名和密码。 -->
      <username>my_login</username>
      <!--鉴权密码 。鉴权用户名和鉴权密码表示服务器认证所需要的登录名和密码。密码加密功能已被添加到2.1.0 +。详情请访问密码加密页面 -->
      <password>my_password</password>
      <!--鉴权时使用的私钥位置。和前两个元素类似，私钥位置和私钥密码指定了一个私钥的路径（默认是${user.home}/.ssh/id_dsa）以及如果需要的话，一个密语。将来passphrase和password元素可能会被提取到外部，但目前它们必须在settings.xml文件以纯文本的形式声明。 -->
      <privateKey>${usr.home}/.ssh/id_dsa</privateKey>
      <!--鉴权时使用的私钥密码。 -->
      <passphrase>some_passphrase</passphrase>
      <!--文件被创建时的权限。如果在部署的时候会创建一个仓库文件或者目录，这时候就可以使用权限（permission）。这两个元素合法的值是一个三位数字，其对应了unix文件系统的权限，如664，或者775。 -->
      <filePermissions>664</filePermissions>
      <!--目录被创建时的权限。 -->
      <directoryPermissions>775</directoryPermissions>
    </server>
  </servers>
  ...
</settings>
```

##### Mirrors

**作用**：为仓库列表配置的下载镜像列表。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <mirrors>
    <!-- 给定仓库的下载镜像。 -->
    <mirror>
      <!-- 该镜像的唯一标识符。id用来区分不同的mirror元素。 -->
      <id>planetmirror.com</id>
      <!-- 镜像名称 -->
      <name>PlanetMirror Australia</name>
      <!-- 该镜像的URL。构建系统会优先考虑使用该URL，而非使用默认的服务器URL。 -->
      <url>http://downloads.planetmirror.com/pub/maven2</url>
      <!-- 被镜像的服务器的id。例如，如果我们要设置了一个Maven中央仓库（http://repo.maven.apache.org/maven2/）的镜像，就需要将该元素设置成central。这必须和中央仓库的id central完全一致。 -->
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  ...
</settings>
```

##### Proxies

**作用**：用来配置不同的代理。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <proxies>
    <!--代理元素包含配置代理时需要的信息 -->
    <proxy>
      <!--代理的唯一定义符，用来区分不同的代理元素。 -->
      <id>myproxy</id>
      <!--该代理是否是激活的那个。true则激活代理。当我们声明了一组代理，而某个时候只需要激活一个代理的时候，该元素就可以派上用处。 -->
      <active>true</active>
      <!--代理的协议。 协议://主机名:端口，分隔成离散的元素以方便配置。 -->
      <protocol>http</protocol>
      <!--代理的主机名。协议://主机名:端口，分隔成离散的元素以方便配置。 -->
      <host>proxy.somewhere.com</host>
      <!--代理的端口。协议://主机名:端口，分隔成离散的元素以方便配置。 -->
      <port>8080</port>
      <!--代理的用户名，用户名和密码表示代理服务器认证的登录名和密码。 -->
      <username>proxyuser</username>
      <!--代理的密码，用户名和密码表示代理服务器认证的登录名和密码。 -->
      <password>somepassword</password>
      <!--不该被代理的主机名列表。该列表的分隔符由代理服务器指定；例子中使用了竖线分隔符，使用逗号分隔也很常见。 -->
      <nonProxyHosts>*.google.com|ibiblio.org</nonProxyHosts>
    </proxy>
  </proxies>
  ...
</settings>
```

##### Profiles

**作用**：根据环境参数来调整构建配置的列表。  
`settings.xml`中的`profile`元素是`pom.xml`中`profile`元素的**裁剪版本**。  
它包含了`id`、`activation`、`repositories`、`pluginRepositories`和 `properties`元素。这里的profile元素只包含这五个子元素是因为这里只关心构建系统这个整体（这正是settings.xml文件的角色定位），而非单独的项目对象模型设置。如果一个`settings.xml`中的`profile`被激活，它的值会覆盖任何其它定义在`pom.xml`中带有相同id的`profile`。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <profiles>
    <profile>
      <!-- profile的唯一标识 -->
      <id>test</id>
      <!-- 自动触发profile的条件逻辑 -->
      <activation />
      <!-- 扩展属性列表 -->
      <properties />
      <!-- 远程仓库列表 -->
      <repositories />
      <!-- 插件仓库列表 -->
      <pluginRepositories />
    </profile>
  </profiles>
  ...
</settings>
```

###### Activation

**作用**：自动触发`profile`的条件逻辑。  
如`pom.xml`中的`profile`一样，`profile`的作用在于它能够在某些特定的环境中自动使用某些特定的值；这些环境通过`activation`元素指定。  
`activation`元素并不是激活`profile`的唯一方式。`settings.xml`文件中的`activeProfile`元素可以包含`profile`的`id`。`profile`也可以通过在命令行，使用-P标记和逗号分隔的列表来显式的激活（如，-P test）。

```xml
<activation>
  <!--profile默认是否激活的标识 -->
  <activeByDefault>false</activeByDefault>
  <!--当匹配的jdk被检测到，profile被激活。例如，1.4激活JDK1.4，1.4.0_2，而!1.4激活所有版本不是以1.4开头的JDK。 -->
  <jdk>1.5</jdk>
  <!--当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性。 -->
  <os>
    <!--激活profile的操作系统的名字 -->
    <name>Windows XP</name>
    <!--激活profile的操作系统所属家族(如 'windows') -->
    <family>Windows</family>
    <!--激活profile的操作系统体系结构 -->
    <arch>x86</arch>
    <!--激活profile的操作系统版本 -->
    <version>5.1.2600</version>
  </os>
  <!--如果Maven检测到某一个属性（其值可以在POM中通过${name}引用），其拥有对应的name = 值，Profile就会被激活。如果值字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段 -->
  <property>
    <!--激活profile的属性的名称 -->
    <name>mavenVersion</name>
    <!--激活profile的属性的值 -->
    <value>2.0.3</value>
  </property>
  <!--提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活profile。另一方面，exists则会检查文件是否存在，如果存在则激活profile。 -->
  <file>
    <!--如果指定的文件存在，则激活profile。 -->
    <exists>${basedir}/file2.properties</exists>
    <!--如果指定的文件不存在，则激活profile。 -->
    <missing>${basedir}/file1.properties</missing>
  </file>
</activation>
```

_**注：在maven工程的pom.xml所在目录下执行`mvn help:active-profiles`命令可以查看中央仓储的profile是否在工程中生效。**_

###### properties

**作用**：对应`profile`的扩展属性列表。  
maven属性和ant中的属性一样，可以用来存放一些值。这些值可以在`pom.xml`中的任何地方使用标记`${X}`来使用，这里X是指属性的名称。属性有五种不同的形式，并且都能在settings.xml文件中访问。

```xml
<!-- 
  1. env.X: 在一个变量前加上"env."的前缀，会返回一个shell环境变量。例如,"env.PATH"指代了$path环境变量（在Windows上是%PATH%）。 
  2. project.x：指代了POM中对应的元素值。例如: <project><version>1.0</version></project>通过${project.version}获得version的值。 
  3. settings.x: 指代了settings.xml中对应元素的值。例如：<settings><offline>false</offline></settings>通过 ${settings.offline}获得offline的值。 
  4. Java System Properties: 所有可通过java.lang.System.getProperties()访问的属性都能在POM中使用该形式访问，例如 ${java.home}。 
  5. x: 在<properties/>元素中，或者外部文件中设置，以${someVar}的形式使用。
 -->
<properties>
  <user.install>${user.home}/our-project</user.install>
</properties>
```

_**注：如果该profile被激活，则可以在`pom.xml`中使用${user.install}。**_

###### Repositories

**作用**：远程仓库列表，它是maven用来填充构建系统本地仓库所使用的一组远程仓库。

```xml
<repositories>
  <!--包含需要连接到远程仓库的信息 -->
  <repository>
    <!--远程仓库唯一标识 -->
    <id>codehausSnapshots</id>
    <!--远程仓库名称 -->
    <name>Codehaus Snapshots</name>
    <!--如何处理远程仓库里发布版本的下载 -->
    <releases>
      <!--true或者false表示该仓库是否为下载某种类型构件（发布版，快照版）开启。 -->
      <enabled>false</enabled>
      <!--该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳。这里的选项是：always（一直），daily（默认，每日），interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。 -->
      <updatePolicy>always</updatePolicy>
      <!--当Maven验证构件校验文件失败时该怎么做-ignore（忽略），fail（失败），或者warn（警告）。 -->
      <checksumPolicy>warn</checksumPolicy>
    </releases>
    <!--如何处理远程仓库里快照版本的下载。有了releases和snapshots这两组配置，POM就可以在每个单独的仓库中，为每种类型的构件采取不同的策略。例如，可能有人会决定只为开发目的开启对快照版本下载的支持。参见repositories/repository/releases元素 -->
    <snapshots>
      <enabled />
      <updatePolicy />
      <checksumPolicy />
    </snapshots>
    <!--远程仓库URL，按protocol://hostname/path形式 -->
    <url>http://snapshots.maven.codehaus.org/maven2</url>
    <!--用于定位和排序构件的仓库布局类型-可以是default（默认）或者legacy（遗留）。Maven 2为其仓库提供了一个默认的布局；然而，Maven 1.x有一种不同的布局。我们可以使用该元素指定布局是default（默认）还是legacy（遗留）。 -->
    <layout>default</layout>
  </repository>
</repositories>
```

###### pluginRepositories

**作用**：发现插件的远程仓库列表。  
和`repository`类似，只是`repository`是管理jar包依赖的仓库，`pluginRepositories`则是管理插件的仓库。  
maven插件是一种特殊类型的构件。由于这个原因，插件仓库独立于其它仓库。`pluginRepositories`元素的结构和`repositories`元素的结构类似。每个`pluginRepository`元素指定一个Maven可以用来寻找新插件的远程地址。

```xml
<pluginRepositories>
  <!-- 包含需要连接到远程插件仓库的信息.参见profiles/profile/repositories/repository元素的说明 -->
  <pluginRepository>
    <releases>
      <enabled />
      <updatePolicy />
      <checksumPolicy />
    </releases>
    <snapshots>
      <enabled />
      <updatePolicy />
      <checksumPolicy />
    </snapshots>
    <id />
    <name />
    <url />
    <layout />
  </pluginRepository>
</pluginRepositories>
```

##### ActiveProfiles

**作用**：手动激活profiles的列表，按照`profile`被应用的顺序定义`activeProfile`。  
该元素包含了一组`activeProfile`元素，每个`activeProfile`都含有一个profile id。任何在`activeProfile`中定义的profile id，不论环境设置如何，其对应的 `profile`都会被激活。如果没有匹配的`profile`，则什么都不会发生。  
例如，env-test是一个activeProfile，则在pom.xml（或者profile.xml）中对应id的profile会被激活。如果运行过程中找不到这样一个profile，Maven则会像往常一样运行。

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <activeProfiles>
    <!-- 要激活的profile id -->
    <activeProfile>env-test</activeProfile>
  </activeProfiles>
  ...
</settings>
```
## 十、Maven综合案例

### 1. 项目需求和结构分析

![img](image123.png)

需求案例：搭建一个电商平台项目，该平台包括用户服务、订单服务、通用工具模块等。

项目架构：

1. 用户服务：负责处理用户相关的逻辑，例如用户信息的管理、用户注册、登录等。
   - spring-context 6.0.6 
   - spring-core 6.0.6
   - spring-beans 6.0.6
   - common-service
2. 订单服务：负责处理订单相关的逻辑，例如订单的创建、订单支付、退货、订单查看等。
   - spring-context 6.0.6 
   - spring-core 6.0.6
   - spring-beans 6.0.6
   - spring-security 6.0.6
   - common-service
3. 通用模块：负责存储其他服务需要通用工具类，其他服务依赖此模块。
   - commons-io 2.11.0
   - junit 5.9.2

### 2. 项目搭建和统一构建

#### ①父模块 (micro-shop)

创建工程：

![image-20231023112630117](image-20231023112630117.png)

pom.xml配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.atguigu</groupId>
    <artifactId>micro-shop</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <!--知识点：父工程的打包方式为pom-->
    <packaging>pom</packaging>

	<!-- 通过在properties自定义标签控制版本 -->
    <properties>
        <spring.version>6.0.6</spring.version>
        <jackson.version>2.15.0</jackson.version>
        <commons.version>2.11.0</commons.version>
        <junit.version>5.9.2</junit.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- 依赖管理 -->
    <dependencyManagement>
        <dependencies>
            <!-- spring-context会依赖传递core/beans -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring.version}</version>
            </dependency>

            <!-- jackson-databind会依赖传递core/annotations -->
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-databind</artifactId>
                <version>${jackson.version}</version>
            </dependency>

            <!-- commons-io -->
            <dependency>
                <groupId>commons-io</groupId>
                <artifactId>commons-io</artifactId>
                <version>${commons.version}</version>
            </dependency>

            <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
            <dependency>
                <groupId>org.junit.jupiter</groupId>
                <artifactId>junit-jupiter-api</artifactId>
                <version>${junit.version}</version>
                <scope>test</scope>
            </dependency>

        </dependencies>
    </dependencyManagement>

    <!-- 统一更新子工程打包插件-->
    <build>
        <!-- jdk17 和 war包版本插件不匹配 -->
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-war-plugin</artifactId>
                <version>3.2.2</version>
            </plugin>
        </plugins>
    </build>

</project>
```
可选操作：删除src目录
#### ②通用模块 (common-service)
创建工程：
![image-20231023114531521](image-20231023114531521.png)

![image-20231023114649705](image-20231023114649705.png)

pom.xml配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>micro-shop</artifactId>
        <groupId>com.atguigu</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>common-service</artifactId>
    <!--知识点：打包方式默认就是jar，因此可以省略-->
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- 配置spring-context，继承父工程版本，自动传递 core / beans -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
        </dependency>
        <!-- 配置jackson-databind，继承父工程版本，自动传递 core / annotations -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <!-- 配置commons-io，继承父工程版本 -->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
        </dependency>
        <!-- 配置junit，继承父工程版本 -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

#### ③用户模块 (user-service)

创建工程：

![image-20231023115404302](image-20231023115404302.png)

![image-20231023115707282](image-20231023115707282.png)

pom.xml配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>micro-shop</artifactId>
        <groupId>com.atguigu</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>user-service</artifactId>
    <!-- web工程打包方式为war -->
    <packaging>war</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- 配置common-service，所需依赖会传递到当前工程（仅限compile范围） -->
        <dependency>
            <groupId>com.atguigu</groupId>
            <artifactId>common-service</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>

</project>
```

依赖传递结果：

![image-20231023120621402](image-20231023120621402.png)

#### ④订单模块 (order-service)

创建工程，并使用插件转为web工程：

![image-20231023120733029](image-20231023120733029.png)

pom.xml配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>micro-shop</artifactId>
        <groupId>com.atguigu</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>order-service</artifactId>
    <!-- web工程打包方式为war -->
    <packaging>war</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- 配置common-service，所需依赖会传递到当前工程（仅限compile范围） -->
        <dependency>
            <groupId>com.atguigu</groupId>
            <artifactId>common-service</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>

</project>
```

此时，查看父工程的pom.xml，会发现其中已经自动聚合了子工程：

```xml
<modules>
    <module>common-service</module>
    <module>user-service</module>
    <module>order-service</module>
</modules>
```


## 十一、构建模块时踩坑
### 1.  spring-framework-bom  vs  spring-boot-starter-parent
在使用Maven构建Java项目时，特别是当涉及到Spring框架或Spring Boot时，你可能会遇到两种常见的项目结构策略：使用`spring-framework-bom`或继承`spring-boot-starter-parent`。这两种方式各有特点和适用场景。

#### 使用 `spring-framework-bom`

1. **定义**：BOM（Bill of Materials）是一个特殊的POM文件，它用于控制Maven项目中的依赖版本，而不实际包含这些依赖。通过在你的项目中引入一个BOM，你可以确保所有引入的依赖都是兼容的版本。
    
2. **使用场景**：当你的项目只想利用Spring Framework的核心功能，而不是整个Spring Boot生态时，使用`spring-framework-bom`是合适的。这种方式允许你精细控制所需的组件，而不会自动配置整个项目。
    
3. **优点**：
    
    - 精确控制依赖项和版本。
    - 避免Spring Boot的自动配置，适用于需要特定定制的项目。
4. **示例**：
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-framework-bom</artifactId>
            <version>5.3.10</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

#### 继承 `spring-boot-starter-parent`

1. **定义**：`spring-boot-starter-parent`是一个特殊的Starter POM，用于Spring Boot应用程序。它提供了便捷的Maven默认配置，并管理了大量常用依赖的版本。
    
2. **使用场景**：当你构建一个Spring Boot应用，想要利用Spring Boot提供的自动配置和整个生态系统时，应该选择继承`spring-boot-starter-parent`。
    
3. **优点**：
    
    - 简化了项目配置，自动管理依赖版本。
    - 提供了一系列预设配置，如资源过滤、插件配置等。
    - 轻松集成Spring Boot的各种起步依赖（starters）。
4. **示例**：
    
```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.3</version>
</parent>
```
    

#### 区别总结

- **依赖管理**：`spring-framework-bom`仅仅提供依赖管理，而不继承任何具体配置；`spring-boot-starter-parent`提供了依赖管理及一系列为Spring Boot优化的Maven默认配置。
- **自动配置**：`spring-boot-starter-parent`利用Spring Boot的自动配置特性，而使用`spring-framework-bom`不会引入任何Spring Boot的自动配置。
- **适用性**：如果你需要全面控制Spring框架组件而不是一个完整的Spring Boot应用，那么使用`spring-framework-bom`更适合；如果你想快速启动并运行一个Spring Boot应用，并利用其生态系统的优势，那么继承`spring-boot-starter-parent`更为合适。

选择哪种方式取决于你的项目需求和你希望获得的灵活性程度。

### spring-boot-starter-parent父项目需要有`<dependencemanegement>`吗
在Maven项目中使用`spring-boot-starter-parent`作为父项目时，通常不需要在你自己的项目中显式添加`<dependencyManagement>`部分来管理依赖。这是因为`spring-boot-starter-parent`已经包含了一个全面的`<dependencyManagement>`部分，它为Spring Boot及其周边的依赖提供了版本管理。

#### 主要理由

1. **版本控制**：`spring-boot-starter-parent`中的`<dependencyManagement>`部分已经定义了所有常用库的兼容版本，确保了Spring Boot应用的依赖之间的兼容性。
    
2. **简化配置**：使用`spring-boot-starter-parent`可以使得项目POM文件更加简洁，因为你不需要再去指定大多数依赖的版本号。你只需添加所需要的起步依赖（starters），它们自带适合的版本。
    

#### 示例

以下是一个简单的Spring Boot项目的POM文件示例，使用`spring-boot-starter-parent`：
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.3</version>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>myproject</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>

```

在这个例子中，`spring-boot-starter-web`依赖自动继承了`spring-boot-starter-parent`中定义的版本，因此不需要在`<dependencyManagement>`中再次指定。

#### 特殊情况

尽管通常不需要在项目中添加自己的`<dependencyManagement>`，但在以下情况下可能需要添加：

- **添加非Spring Boot管理的依赖**：如果需要引入Spring Boot未管理的库，并且想统一管理这些库的版本，可以在项目中添加`<dependencyManagement>`。
- **覆盖Spring Boot的默认版本**：如果需要使用的库版本与`spring-boot-starter-parent`中定义的版本不同，可以通过添加`<dependencyManagement>`来覆盖默认版本。

总的来说，如果你的项目主要依赖于Spring Boot及其管理的库，并且没有特殊的版本控制需求，那么通常不需要在你的项目中添加`<dependencyManagement>`。这样做可以保持POM文件的清洁和管理的简单。