# [芋道 Spring Boot API 接口文档 Swagger 入门](https://www.iocoder.cn/Spring-Boot/Swagger/ "芋道 Spring Boot API 接口文档 Swagger 入门")

 总阅读量:37976次

|   |   |
|---|---|
|[⭐⭐⭐ Spring Boot 项目实战](https://gitee.com/zhijiantianya/ruoyi-vue-pro)|[⭐⭐⭐ Spring Cloud 项目实战](https://gitee.com/zhijiantianya/yudao-cloud)|
|[《Dubbo 实现原理与源码解析 —— 精品合集》](https://www.iocoder.cn/Dubbo/good-collection/?title)|[《Netty 实现原理与源码解析 —— 精品合集》](https://www.iocoder.cn/Netty/Netty-collection/?title)|
|[《Spring 实现原理与源码解析 —— 精品合集》](https://www.iocoder.cn/Spring/good-collection/?title)|[《MyBatis 实现原理与源码解析 —— 精品合集》](https://www.iocoder.cn/MyBatis/good-collection/?title)|
|[《Spring MVC 实现原理与源码解析 —— 精品合集》](https://www.iocoder.cn/Spring-MVC/good-collection/?title)|[《数据库实体设计合集》](https://www.iocoder.cn/Entity/good-collection/?title)|
|[《Spring Boot 实现原理与源码解析 —— 精品合集》](https://www.iocoder.cn/Spring-Boot/good-collection/?title)|[《Java 面试题 + Java 学习指南》](https://www.iocoder.cn/Interview/good-collection/?title)|

摘要: 原创出处 http://www.iocoder.cn/Spring-Boot/Swagger/ 「芋道源码」欢迎转载，保留摘要，谢谢！

- [1. 概述](http://www.iocoder.cn/Spring-Boot/Swagger/)
- [2. 快速入门 Swagger](http://www.iocoder.cn/Spring-Boot/Swagger/)
- [3. 更好看的 Swagger UI 界面](http://www.iocoder.cn/Spring-Boot/Swagger/)
- [4. 更强大的 YApi](http://www.iocoder.cn/Spring-Boot/Swagger/)
- [666. 彩蛋](http://www.iocoder.cn/Spring-Boot/Swagger/)

---

---

> 本文在提供完整代码示例，可见 [https://github.com/YunaiV/SpringBoot-Labs](https://github.com/YunaiV/SpringBoot-Labs) 的 [lab-24](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-24) 目录。
> 
> 原创不易，给点个 [Star](https://github.com/YunaiV/SpringBoot-Labs/stargazers) 嘿，一起冲鸭！

# 1. 概述

目前，大多数系统都采用前后端分离。在享受前后端分离的[好处](https://www.zhihu.com/question/28207685)的同时，接口联调往往成为团队效率的瓶颈，甚至产生前后端的矛盾。简单归结来说，有几方面的原因：

- 问题一，**接口设计滞后。** 后端团队往往不喜欢 API 接口设计先行，提前和前端沟通好接口。而在开发阶段的中后期，在后端提供 API 接口后，而这些接口和前端的预期有一些偏差，很容易就产生抱怨，特别是项目周期比较紧张的情况下。
- 问题二，**接口不规范。** 当团队里没有同意明确的接口规范时，又或者代码 Review 做的不是很好的情况下，千奇百怪、各式各样的 API 接口可能就产生了。前端在对接这样的 API 接口，苦不堪言，在一口 mmp 一嘴 fuck xxx 之中，调完接口。
- 问题三，**接口文档更新不及时，或者遗忘更新。** 因为后端 API 代码和 API 接口在两个地方，我们无法保证提交 API 代码的同时，及时更新文档。有的时候，我们甚至会遗忘更新 API 接口。随着时间的流逝，API 文档和 API 接口不一致的地方越来越多，前端会对 API 接口的信任度越来越低，然后不知道不觉之中，回到原始时代，直接问后端开发 API 是什么样的。

对于**问题一**和**问题二**，更多是开发流程上的问题，所以不在本文的范围内。当然话痨的艿艿，还是要给点粗浅的建议，完全拦不住我啊。

- **接口设计先行**。设计完成后，后端和前端进行简单沟通，看看是否能够满足诉求。
- **统一的接口规范**。一定要制定统一的接口规范文档，即使比较简陋，也能保证团队的 API 接口相对统一一致。😈 即使错，咱也错的一模一样，而不是千奇百怪。当然，接口规范是无法覆盖到所有的场景的，借助于“接口设计先行”，我们可以提前去 Review 每个接口的设计。

对于**问题三**，就进入了本文的**主角 Swagger** 。通过在 API 接口上，添加相应的 Swagger 提供的注解，自动生成 API 文档。酱紫，API 接口和文档就在一起了，从此过上了幸福快乐的生活。

> FROM [《RESTful 风格的 Web 服务框架 Swagger》](https://www.oschina.net/p/swagger)
> 
> Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。
> 
> 总体目标是使客户端和文件系统作为服务器以同样的速度来更新。文件的方法、参数和模型紧密集成到服务器端的代码，允许 API 来始终保持同步。Swagger 让部署管理和使用功能强大的 API 从未如此简单。
> 
> ![预览图](https://static.iocoder.cn/4d30a3fd905a7b842115ecc087e50174.jpg)

# 2. 快速入门 Swagger

> 示例代码对应仓库：[lab-24-apidoc-swagger](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-24/lab-24-apidoc-swagger) 。

在本小节，我们来快速入门 Swagger ，可以更加直观的感受到其提供的便利性。

## 2.1 引入依赖

在 [`pom.xml`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-24/lab-24-apidoc-swagger/pom.xml) 文件中，引入相关依赖。

|   |
|---|
|<?xml version="1.0" encoding="UTF-8"?>  <br><project xmlns="http://maven.apache.org/POM/4.0.0"  <br>         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  <br>         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  <br>    <parent>  <br>        <groupId>org.springframework.boot</groupId>  <br>        <artifactId>spring-boot-starter-parent</artifactId>  <br>        <version>2.1.3.RELEASE</version>  <br>        <relativePath/> <!-- lookup parent from repository -->  <br>    </parent>  <br>    <modelVersion>4.0.0</modelVersion>  <br>  <br>    <artifactId>lab-24-apidoc-swagger</artifactId>  <br>  <br>    <dependencies>  <br>        <!-- 实现对 Spring MVC 的自动化配置 -->  <br>        <dependency>  <br>            <groupId>org.springframework.boot</groupId>  <br>            <artifactId>spring-boot-starter-web</artifactId>  <br>        </dependency>  <br>  <br>        <!-- 引入 Swagger 依赖 -->  <br>        <dependency>  <br>            <groupId>io.springfox</groupId>  <br>            <artifactId>springfox-swagger2</artifactId>  <br>            <version>2.9.2</version>  <br>        </dependency>  <br>  <br>        <!-- 引入 Swagger UI 依赖，以实现 API 接口的 UI 界面 -->  <br>        <dependency>  <br>            <groupId>io.springfox</groupId>  <br>            <artifactId>springfox-swagger-ui</artifactId>  <br>            <version>2.9.2</version>  <br>        </dependency>  <br>  <br>    </dependencies>  <br>  <br></project>|

具体每个依赖的作用，胖友自己认真看下艿艿添加的所有注释噢。

## 2.2 SwaggerConfiguration

因为 Spring Boot 暂未提供 Swagger 内置的支持，所以我们需要自己定义配置类。

在 [`cn.iocoder.springboot.lab24.apidoc.config`](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-24/lab-24-apidoc-swagger/src/main/java/cn/iocoder/springboot/lab24/apidoc/config) 包路径下，创建 SwaggerConfiguration 配置类，用于配置 Swagger 。代码如下：

|   |
|---|
|// SwaggerConfiguration.java  <br>  <br>@Configuration  <br>@EnableSwagger2 // 标记项目启用 Swagger API 接口文档  <br>public class SwaggerConfiguration {  <br>  <br>    @Bean  <br>    public Docket createRestApi() {  <br>        // 创建 Docket 对象  <br>        return new Docket(DocumentationType.SWAGGER_2) // 文档类型，使用 Swagger2  <br>                .apiInfo(this.apiInfo()) // 设置 API 信息  <br>                // 扫描 Controller 包路径，获得 API 接口  <br>                .select()  <br>                .apis(RequestHandlerSelectors.basePackage("cn.iocoder.springboot.lab24.apidoc.controller"))  <br>                .paths(PathSelectors.any())  <br>                // 构建出 Docket 对象  <br>                .build();  <br>    }  <br>  <br>    /**  <br>     * 创建 API 信息  <br>     */  <br>    private ApiInfo apiInfo() {  <br>        return new ApiInfoBuilder()  <br>                .title("测试接口文档示例")  <br>                .description("我是一段描述")  <br>                .version("1.0.0") // 版本号  <br>                .contact(new Contact("芋艿", "http://www.iocoder.cn", "zhijiantianya@gmail.com")) // 联系人  <br>                .build();  <br>    }  <br>  <br>}|

- 在类上，添加 [`@EnableSwagger2`](http://springfox.github.io/springfox/javadoc/2.5.0/index.html?springfox/documentation/swagger2/annotations/EnableSwagger2.html) 注解， 标记项目启用 Swagger API 接口文档。
- 通过 `#createRestApi()` 方法，创建 Swagger [Docket](https://github.com/springfox/springfox/blob/master/springfox-spring-web/src/main/java/springfox/documentation/spring/web/plugins/Docket.java) Bean 。每个属性的作用，胖友看看艿艿的注释。大多数情况下，胖友使用这些属性是足够的。不过如果想看看其它配置，胖友可以自己去如下两个类翻翻：
    - [Docket.java](https://github.com/springfox/springfox/blob/master/springfox-spring-web/src/main/java/springfox/documentation/spring/web/plugins/Docket.java)
    - [ApiInfo.java](https://github.com/springfox/springfox/blob/master/springfox-core/src/main/java/springfox/documentation/service/ApiInfo.java)

## 2.3 Application

创建 [`Application.java`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-24/lab-24-apidoc-swagger/src/main/java/cn/iocoder/springboot/lab24/apidoc/Application.java) 类，配置 `@SpringBootApplication` 注解即可。代码如下：

|   |
|---|
|// Application.java  <br>  <br>@SpringBootApplication  <br>public class Application {  <br>  <br>    public static void main(String[] args) {  <br>        SpringApplication.run(Application.class, args);  <br>    }  <br>  <br>}|

先暂时不启动项目。等我们添加好 Controller 。

## 2.4 UserController

在 [`cn.iocoder.springboot.lab24.apidoc.controller`](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-24/lab-24-apidoc-swagger/src/main/java/cn/iocoder/springboot/lab24/apidoc/controller) 包路径下，创建 [UserController](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-24/lab-24-apidoc-swagger/src/main/java/cn/iocoder/springboot/lab24/apidoc/controller/TestController.java) 类，提供用户 API 接口。代码如下：

|   |
|---|
|// UserController.java  <br>  <br>@RestController  <br>@RequestMapping("/users")  <br>@Api(tags = "用户 API 接口")  <br>public class UserController {  <br>  <br>    @GetMapping("/list")  <br>    @ApiOperation(value = "查询用户列表", notes = "目前仅仅是作为测试，所以返回用户全列表")  <br>    public List<UserVO> list() {  <br>        // 查询列表  <br>        List<UserVO> result = new ArrayList<>();  <br>        result.add(new UserVO().setId(1).setUsername("yudaoyuanma"));  <br>        result.add(new UserVO().setId(2).setUsername("woshiyutou"));  <br>        result.add(new UserVO().setId(3).setUsername("chifanshuijiao"));  <br>        // 返回列表  <br>        return result;  <br>    }  <br>  <br>    @GetMapping("/get")  <br>    @ApiOperation("获得指定用户编号的用户")  <br>    @ApiImplicitParam(name = "id", value = "用户编号", paramType = "query", dataTypeClass = Integer.class, required = true, example = "1024")  <br>    public UserVO get(@RequestParam("id") Integer id) {  <br>        // 查询并返回用户  <br>        return new UserVO().setId(id).setUsername(UUID.randomUUID().toString());  <br>    }  <br>  <br>    @PostMapping("add")  <br>    @ApiOperation("添加用户")  <br>    public Integer add(UserAddDTO addDTO) {  <br>        // 插入用户记录，返回编号  <br>        Integer returnId = UUID.randomUUID().hashCode();  <br>        // 返回用户编号  <br>        return returnId;  <br>    }  <br>  <br>    @PostMapping("/update")  <br>    @ApiOperation("更新指定用户编号的用户")  <br>    public Boolean update(UserUpdateDTO updateDTO) {  <br>        // 更新用户记录  <br>        Boolean success = true;  <br>        // 返回更新是否成功  <br>        return success;  <br>    }  <br>  <br>    @PostMapping("/delete")  <br>    @ApiOperation(value = "删除指定用户编号的用户")  <br>    @ApiImplicitParam(name = "id", value = "用户编号", paramType = "query", dataTypeClass = Integer.class, required = true, example = "1024")  <br>    public Boolean delete(@RequestParam("id") Integer id) {  <br>        // 删除用户记录  <br>        Boolean success = false;  <br>        // 返回是否更新成功  <br>        return success;  <br>    }  <br>  <br>}|

- 相比我们之前使用 SpringMVC 来说，我们在类和接口上，额外增加了 Swagger 提供的注解。
- 从使用习惯上，我比较喜欢先添加 SpringMVC 的注解，再添加 Swagger 的注解。
- 因为已经使用了 Swagger 的注解，所以类和方法上的注释，一般可以删除了，除非有特殊诉求。
- 其中涉及到的 POJO 类，有 [UserAddDTO](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-24/lab-24-apidoc-swagger/src/main/java/cn/iocoder/springboot/lab24/apidoc/dto/UserAddDTO.java)、[UserUpdateDTO](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-24/lab-24-apidoc-swagger/src/main/java/cn/iocoder/springboot/lab24/apidoc/dto/UserUpdateDTO.java)、[UserVO](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-24/lab-24-apidoc-swagger/src/main/java/cn/iocoder/springboot/lab24/apidoc/vo/UserVO.java) 。

执行 Application 启动项目。然后浏览器访问 `http://127.0.0.1:8080/swagger-ui.html` 地址，就可以看到 Swagger 生成的 API 接口文档。如下图所示：![Swagger-UI 示例](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/01.png)

至此，我们已经完成了 Swagger 的快速入门。不过考虑到胖友能够更好的使用，我们来一个一个注解了解。

## 2.5 注解

在 [`swagger-annotations`](https://mvnrepository.com/artifact/io.swagger/swagger-annotations) 库中，在 [`io.swagger.annotations`](https://github.com/swagger-api/swagger-core/tree/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations) 包路径下，提供了我们会使用到的所有 Swagger 注解。Swagger 提供的注解还是比较多的，大多数场景下，只需要使用到我们在 [「2.4 UserController」](https://www.iocoder.cn/Spring-Boot/Swagger/?yudao#) 中用到的注解。

### 2.5.1 @Api

[`@Api`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/Api.java) 注解，添加在 Controller 类上，标记它作为 Swagger 文档资源。

示例如下：

|   |
|---|
|// UserController.java  <br>  <br>@RestController  <br>@RequestMapping("/users")  <br>@Api(tags = "用户 API 接口")  <br>public class UserController {  <br>  <br>    // ... 省略  <br>}|

效果如下：![@API 示例](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/02.png)

`@Api` 注解的**常用属性**，如下：

- `tags` 属性：用于控制 API 所属的标签列表。`[]` 数组，可以填写多个。
    - 可以在**一个** Controller 上的 `@Api` 的 `tags` 属性，设置**多个**标签，那么这个 Controller 下的 API 接口，就会出现在这**两个**标签中。
    - 如果在**多个** Controller 上的 `@Api` 的 `tags` 属性，设置**一个**标签，那么这些 Controller 下的 API 接口，仅会出现在这**一个**标签中。
    - 本质上，`tags` 就是为了分组 API 接口，和 Controller 本质上是一个目的。所以绝大数场景下，我们只会给一个 Controller 一个**唯一**的标签。例如说，UserController 的 `tags` 设置为 `"用户 API 接口"` 。

`@Api` 注解的**不常用属性**，如下：

- `produces` 属性：请求请求头的**可接受类型**( [Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept) )。如果有多个，使用 `,` 分隔。
- `consumes` 属性：请求请求头的**提交内容类型**( [Content-Type](https://juejin.im/post/5cb34fc06fb9a068a75d3555) )。如果有多个，使用 `,` 分隔。
- `protocols` 属性：协议，可选值为 `"http"`、`"https"`、`"ws"`、`"wss"` 。如果有多个，使用 `,` 分隔。
- `authorizations` 属性：授权相关的配置，`[]` 数组，使用 [`@Authorization`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/Authorization.java) 注解。
- `hidden` 属性：是否隐藏，不再 API 接口文档中显示。

`@Api` 注解的**废弃属性**，不建议使用，有 `value`、`description`、`basePath`、`position` 。

### 2.5.2 @ApiOperation

[`@ApiOperation`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/ApiOperation.java) 注解，添加在 Controller 方法上，标记它是一个 API 操作。

示例如下：

|   |
|---|
|// UserController.java  <br>  <br>@GetMapping("/list")  <br>@ApiOperation(value = "查询用户列表", notes = "目前仅仅是作为测试，所以返回用户全列表")  <br>public List<UserVO> list() {  <br>    // 查询列表  <br>    List<UserVO> result = new ArrayList<>();  <br>    result.add(new UserVO().setId(1).setUsername("yudaoyuanma"));  <br>    result.add(new UserVO().setId(2).setUsername("woshiyutou"));  <br>    result.add(new UserVO().setId(3).setUsername("chifanshuijiao"));  <br>    // 返回列表  <br>    return result;  <br>}|

效果如下：![@ApiOperation 示例](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/03.png)

`@ApiOperation` 注解的**常用属性**，如下：

- `value` 属性：API 操作名。
- `notes` 属性：API 操作的描述。

`@ApiOperation` 注解的**不常用属性**，如下：

- `tags` 属性：和 `@API` 注解的 `tags` 属性一致。
- `nickname` 属性：API 操作接口的唯一标识，主要用于和第三方工具做对接。
- `httpMethod` 属性：请求方法，可选值为 `GET`、`HEAD`、`POST`、`PUT`、`DELETE`、`OPTIONS`、`PATCH` 。因为 Swagger 会解析 SpringMVC 的注解，所以一般无需填写。
- `produces` 属性：和 `@API` 注解的 `produces` 属性一致。
- `consumes` 属性：和 `@API` 注解的 `consumes` 属性一致。
- `protocols` 属性：和 `@API` 注解的 `protocols` 属性一致。
- `authorizations` 属性：和 `@API` 注解的 `authorizations` 属性一致。
- `hidden` 属性：和 `@API` 注解的 `hidden` 属性一致。
- `response` 属性：响应结果类型。因为 Swagger 会解析方法的返回类型，所以一般无需填写。
- `responseContainer` 属性：响应结果的容器，可选值为 `List`、`Set`、`Map` 。
- `responseReference` 属性：指定对响应类型的引用。这个引用可以是本地，也可以是远程。并且，当设置了它时，会覆盖 `response` 属性。说人话，就是可以忽略这个属性，哈哈哈。
- `responseHeaders` 属性：响应头，`[]` 数组，使用 [`@ResponseHeader`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/ResponseHeader.java) 注解。
- `code` 属性：响应状态码，默认为 200 。
- `extensions` 属性：拓展属性，`[]` 属性，使用 [`@Extension`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/Extension.java) 注解。
- `ignoreJsonView` 属性：在解析操作和类型，忽略 JsonView 注释。主要是为了向后兼容。

`@ApiOperation` 注解的**废弃属性**，不建议使用，有 `position` 。

### 2.5.3 @ApiImplicitParam

[`@ApiImplicitParam`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/ApiImplicitParam.java) 注解，添加在 Controller 方法上，声明每个请求参数的信息。

示例如下：

|   |
|---|
|// UserController.java  <br>  <br>@PostMapping("/delete")  <br>@ApiOperation(value = "删除指定用户编号的用户")  <br>@ApiImplicitParam(name = "id", value = "用户编号", paramType = "query", dataTypeClass = Integer.class, required = true, example = "1024")  <br>public Boolean delete(@RequestParam("id") Integer id) {  <br>    // 删除用户记录  <br>    Boolean success = false;  <br>    // 返回是否更新成功  <br>    return success;  <br>}|

效果如下：![@ApiImplicitParam 示例](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/04.png)

`@ApiImplicitParam` 注解的**常用属性**，如下：

- `name` 属性：参数名。
- `value` 属性：参数的简要说明。
- `required` 属性：是否为必传参数。默认为 `false` 。
- `dataType` 属性：数据类型，通过字符串 String 定义。
- `dataTypeClass` 属性：数据类型，通过 `dataTypeClass` 定义。在设置了 `dataTypeClass` 属性的情况下，会覆盖 `dataType` 属性。**推荐采用这个方式**。
- `paramType` 属性：参数所在位置的类型。有如下 5 种方式：
    - `"path"` 值：对应 SpringMVC 的 `@PathVariable` 注解。
    - 【_默认值_】`"query"` 值：对应 SpringMVC 的 `@PathVariable` 注解。
    - `"body"` 值：对应 SpringMVC 的 `@RequestBody` 注解。
    - `"header"` 值：对应 SpringMVC 的 `@RequestHeader` 注解。
    - `"form"` 值：Form 表单提交，对应 SpringMVC 的 `@PathVariable` 注解。
    - 😈 **绝大多数情况下，使用 `"query"` 值这个类型即可。**
- `example` 属性：参数值的简单示例。
- `examples` 属性：参数值的复杂示例，使用 [`@Example`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/Example.java) 注解。

`@ApiImplicitParam` 注解的**不常用属性**，如下：

- `defaultValue` 属性：默认值。
- `allowableValues` 属性：允许的值。如果要设置多个值，有两种方式：
    - 数组方式，即 `{value1, value2, value3}` 。例如说，`{1, 2, 3}` 。
    - 范围方式，即 `[value1, value2]` 或 `[value1, value2)` 。例如说 `[1, 5]` 表示 1 到 5 的所有数字。如果有无穷的，可以使用 `(-infinity, value2]` 或 `[value1, infinity)` 。
- `allowEmptyValue` 属性：是否允许空值。
- `allowMultiple` 属性：是否允许通过多次传递该参数来接受多个值。默认为 `false` 。
- `type` 属性：搞不懂具体用途，对应英文注释为 `Adds the ability to override the detected type` 。
- `readOnly` 属性：是否只读。
- `format` 属性：自定义的格式化。
- `collectionFormat` 属性：针对 Collection 集合的，自定义的格式化。

当我们需要添加在方法上添加多个 `@ApiImplicitParam` 注解时，可以使用 [@ApiImplicitParams](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/ApiImplicitParams.java) 注解中添加多个。示例如下：

|   |
|---|
|@ApiImplicitParams({ // 参数数组  <br>        @ApiImplicitParam(name = "id", value = "用户编号", paramType = "query", dataTypeClass = Integer.class, required = true, example = "1024"), // 参数一  <br>        @ApiImplicitParam(name = "name", value = "昵称", paramType = "query", dataTypeClass = String.class, required = true, example = "芋道"), // 参数二  <br>})|

### 2.5.4 @ApiModel

[`@ApiModel`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/ApiModel.java) 注解，添加在 POJO 类，声明 POJO 类的信息。而在 Swagger 中，把这种 POJO 类称为 **Model** 类。所以，我们下文就统一这么称呼。

示例如下：

|   |
|---|
|// UserVO.java  <br>  <br>@ApiModel("用户 VO")  <br>public class UserVO {  <br>  <br>    // ... 省略  <br>  <br>}|

效果如下：![@ApiModel 示例](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/05.png)

`@ApiModel` 注解的**常用属性**，如下：

- `value` 属性：Model 名字。
- `description` 属性：Model 描述。

`@ApiModel` 注解的**不常用属性**，如下：

- `parent` 属性：指定该 Model 的父 Class 类，用于继承父 Class 的 Swagger 信息。
- `subTypes` 属性：定义该 Model 类的子类 Class 们。
- `discriminator` 属性：搞不懂具体用途，对应英文注释为 `Supports model inheritance and polymorphism.`
- `reference` 属性：搞不懂具体用途，对应英文注释为 `Specifies a reference to the corresponding type definition, overrides any other metadata specified`

### 2.5.5 @ApiModelProperty

[`@ApiModelProperty`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/ApiModelProperty.java) 注解，添加在 Model 类的成员变量上，声明每个成员变量的信息。

示例如下：

|   |
|---|
|// UserVO.java  <br>  <br>@ApiModel("用户 VO")  <br>public class UserVO {  <br>  <br>    @ApiModelProperty(value = "用户编号", required = true, example = "1024")  <br>    private Integer id;  <br>    @ApiModelProperty(value = "账号", required = true, example = "yudaoyuanma")  <br>    private String username;  <br>  <br>    // ... 省略 set/get 方法  <br>}|

效果如下：![@ApiModelProperty 示例](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/06.png)

`@ApiModelProperty` 注解的**常用属性**，如下：

- `value` 属性：属性的描述。
- `dataType` 属性：和 `@ApiImplicitParam` 注解的 `dataType` 属性一致。不过因为 `@ApiModelProperty` 是添加在成员变量上，可以自动获得成员变量的类型。
- `required` 属性：和 `@ApiImplicitParam` 注解的 `required` 属性一致。
- `example` 属性：`@ApiImplicitParam` 注解的 `example` 属性一致。

`@ApiModelProperty` 注解的**不常用属性**，如下：

- `name` 属性：覆盖成员变量的名字，使用该属性进行自定义。
- `allowableValues` 属性：和 `@ApiImplicitParam` 注解的 `allowableValues` 属性一致。
- `position` 属性：成员变量排序位置，默认为 0 。
- `hidden` 属性：`@ApiImplicitParam` 注解的 `hidden` 属性一致。
- `accessMode` 属性：访问模式，有 `AccessMode.AUTO`、`AccessMode.READ_ONLY`、`AccessMode.READ_WRITE` 三种，默认为 `AccessMode.AUTO` 。
- `reference` 属性：和 `@ApiModel` 注解的 `reference` 属性一致。
- `allowEmptyValue` 属性：和 `@ApiImplicitParam` 注解的 `allowEmptyValue` 属性一致。
- `extensions` 属性：和 `@ApiImplicitParam` 注解的 `extensions` 属性一致。

`@ApiModelProperty` 注解的**废弃属性**，不建议使用，有 `readOnly` 。

### 2.5.6 @ApiResponse

在大多数情况下，我们并不需要使用 `@ApiResponse` 注解，因为我们会类似 `UserController#get(id)` 方法这个接口，返回一个 Model 即可。所以 `@ApiResponse` 注解，艿艿就简单讲解，嘿嘿。

[`@ApiResponse`](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/ApiResponse.java) 注解，添加在 Controller 类的方法上，声明每个响应参数的信息。

`@ApiResponse` 注解的属性，基本已经被 `@ApiOperation` 注解所覆盖，如下：

- `message` 属性：响应的提示内容。
- `code` 属性：和 `@ApiOperation` 注解的 `code` 属性一致。
- `response` 属性：和 `@ApiOperation` 注解的 `response` 属性一致。
- `reference` 属性：和 `@ApiOperation` 注解的 `responseReference` 属性一致。
- `responseHeaders` 属性：和 `@ApiOperation` 注解的 `responseHeaders` 属性一致。
- `responseContainer` 属性：和 `@ApiOperation` 注解的 `responseContainer` 属性一致。
- `examples` 属性：和 `@ApiOperation` 注解的 `examples` 属性一致。

当我们需要添加在方法上添加多个 `@ApiResponse` 注解时，可以使用 [@ApiResponses](https://github.com/swagger-api/swagger-core/blob/1.5/modules/swagger-annotations/src/main/java/io/swagger/annotations/ApiResponse.java) 注解中添加多个。

至此，我们已经了解完 Swagger 项目中提供的主要注解。如果想要看到更多的 Swagger 的使用示例，可以看看艿艿开源的 [onemall](https://github.com/YunaiV/onemall) 项目。

咳咳咳，整理 Swagger 注解的每个属性，真的是花费时间。如果有哪个解释不到位，请一定给艿艿留言，我去优化和调整下，嘻嘻。

## 2.6 测试接口

在 Swagger 的 UI 界面上，提供了简单的测试接口的工具。我们仅仅需要点开某个接口，点击「Try it out」按钮。如下图：![「Try it out」](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/07.png)

然后，点击「Execute」按钮，即可执行一次 API 接口的调用。如下图：![「Execute」](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/08.png)

在三个红圈中，我们可以看到 Swagger 给我们提供了：

- 提供了 [curl](https://curl.haxx.se/) 命令，让我们可以直接在命令行执行。
- 提供了 Request URL 地址，方便我们在浏览器中访问。
- 提供了执行结果，我们可以人肉看看，是否符合我们希望的结果。

😈 当然，实际项目开发中，艿艿还是喜欢 [Postman](https://www.iocoder.cn/Spring-Boot/Swagger/getpostman.com) 来测试接口，嘿嘿。

# 3. 更好看的 Swagger UI 界面

> 示例代码对应仓库：[lab-24-apidoc-swagger-knife4j](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-24/lab-24-apidoc-swagger-knife4j) 。

`springfox-swagger-ui` 提供的 UI 界面，基本能够满足我们的日常使用，但是距离好用，还是有一段距离。幸福的是，社区有人开源了 [`swagger-bootstrap-ui`](https://doc.xiaominfo.com/) 项目，提供更好看且好用的 UI 界面。

具体的演示示例，可以访问：[http://swagger-bootstrap-ui.xiaominfo.com/doc.html](http://swagger-bootstrap-ui.xiaominfo.com/doc.html) 查看。

在 [「2. 快速入门 Swagger」](https://www.iocoder.cn/Spring-Boot/Swagger/?yudao#) 的 `lab-24-apidoc-swagger` 示例的基础上，我们复制出 `lab-24-apidoc-swagger-knife4j` 项目，进行改造。

## 3.1 修改依赖

在 [`pom.xml`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-24/lab-24-apidoc-swagger-knife4j/pom.xml) 文件中，修改相关依赖。

|   |
|---|
|<?xml version="1.0" encoding="UTF-8"?>  <br><project xmlns="http://maven.apache.org/POM/4.0.0"  <br>         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  <br>         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  <br>    <parent>  <br>        <groupId>org.springframework.boot</groupId>  <br>        <artifactId>spring-boot-starter-parent</artifactId>  <br>        <version>2.1.3.RELEASE</version>  <br>        <relativePath/> <!-- lookup parent from repository -->  <br>    </parent>  <br>    <modelVersion>4.0.0</modelVersion>  <br>  <br>    <artifactId>lab-24-apidoc-swagger-knife4j</artifactId>  <br>  <br>    <dependencies>  <br>        <!-- 实现对 Spring MVC 的自动化配置 -->  <br>        <dependency>  <br>            <groupId>org.springframework.boot</groupId>  <br>            <artifactId>spring-boot-starter-web</artifactId>  <br>        </dependency>  <br>  <br>        <!-- 1. swagger-bootstrap-ui 目前改名为 knife4j -->  <br>        <!-- 2. 实现 swagger-bootstrap-ui 的自动化配置  -->  <br>        <!-- 3. 因为 knife4j-spring 已经引入 Swagger 依赖，所以无需重复引入 -->  <br>        <dependency>  <br>            <groupId>com.github.xiaoymin</groupId>  <br>            <artifactId>knife4j-spring</artifactId>  <br>            <version>1.9.6</version>  <br>        </dependency>  <br>        <dependency>  <br>            <groupId>com.github.xiaoymin</groupId>  <br>            <artifactId>knife4j-spring-ui</artifactId>  <br>            <version>1.9.6</version>  <br>        </dependency>  <br>  <br>    </dependencies>  <br>  <br></project>|

具体每个依赖的作用，胖友自己认真看下艿艿添加的所有注释噢。

## 3.2 界面一览

直接使用 Application 启动项目，无需做其它任何的变更，方便的说。

浏览器访问 `http://localhost:8080/doc.html` 地址，就可以看到 **新**的 Swagger 生成的 API 接口文档。![swagger-bootstrap-ui 示例](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/09.png)

😈 注意下，界面上艿艿添加的红圈和红字噢。更多功能，胖友自己看 [官方文档](https://doc.xiaominfo.com/guide/) 哟。非常推荐生产中，使用它，嘿嘿。

# 4. 更强大的 YApi

虽然说 Swagger 已经挺强大了，可以很好的完成提供后端 API 接口文档的功能，但是实际场景下，我们还是会碰到很多问题：

- Swagger 没有内置 Mock 功能。在实际的开发中，在后端定义好 API 接口之后，前端会根据 API 接口，进行接口的 Mock ，从而实现前后端的并行开发。
- 多个项目的 API 接口文档的整合。随着微服务的流行，一个产品实际是拆分成多个微服务项目，提供 API 接口。那么，一个微服务项目，一个接口文档，肯定会气死前端。气死一个前端小哥哥没事，如果是小姐姐那多可惜啊。

所以，我们需要更加强大的 API 接口管理平台。目前艿艿团队采用的解决方案是：

- 后端开发，还是使用 Swagger 注解，生成 API 接口文档。
- 使用 [YApi](https://github.com/YMFE/yapi) 可视化接口管理平台，自动调用 Swagger 提供的 `v2/api-docs` 接口，采集 Swagger 注解生成的 API 接口信息，从而录入到 YApi 中。

这样，我们既可以享受到 Swagger 带给我们编写 API 接口文档的便利性与及时性，又能享受到 YApi 的强大功能。

> FROM [https://github.com/YMFE/yapi](https://github.com/YMFE/yapi)
> 
> YApi 是**高效**、**易用**、**功能强大**的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务。可以帮助开发者轻松创建、发布、维护 API，YApi 还为用户提供了优秀的交互体验，开发人员只需利用平台提供的接口数据写入工具以及简单的点击操作就可以实现接口的管理。
> 
> - 基于 Json5 和 Mockjs 定义接口返回数据的结构和文档，效率提升多倍
> - 扁平化权限设计，即保证了大型企业级项目的管理，又保证了易用性
> - 类似 postman 的接口调试
> - 自动化测试, 支持对 Response 断言
> - MockServer 除支持普通的随机 mock 外，还增加了 Mock 期望功能，根据设置的请求过滤规则，返回期望数据
> - 支持 postman, har, swagger 数据导入
> - 免费开源，内网部署，信息再也不怕泄露了

胖友可以访问 [http://yapi.demo.qunar.com/](http://yapi.demo.qunar.com/) 地址，快速体验下 Yapi 的功能。

下面，我们就一起来搭建一个 YApi 平台，美滋滋。因为 YApi 基于 NodeJS 语言开发，使用 MongoDB 作为数据库存储接口信息，所以我们需要先安装 NodeJS 和 MongoDB 。

> 艿艿：目前手头上只有 MacOS 和 CentOS 环境，所以如下的步骤，暂支也只保证这两个环境，抱歉~
> 
> 如果使用 Windows 或者 Ubuntu 的同学，请辛苦自行解决下。

## 4.1 安装 MongoDB

参考 [《芋道 MongoDB 极简入门》](http://www.iocoder.cn/MongoDB/install/?self) 文章，先进行下安装 MongoDB 数据库。

安装完成，记得参考文章，创建一个 **yapi** 数据库，后续我们会使用到。

## 4.2 安装 NodeJS

如果胖友是 CentOS 环境，使用 `yum install nodejs` 命令，进行安装。

如果胖友是 MacOS 环境，使用 `brew install node` 命令，进行安装。如果没有 [brew](https://brew.sh/) 的胖友，这么 666 的神器，不赶紧安装下嘛？！

## 4.3 安装 yapi-cli

> 使用我们提供的 yapi-cli 工具，部署 YApi 平台是非常容易的。执行 yapi server 启动可视化部署程序，输入相应的配置和点击开始部署，就能完成整个网站的部署。部署完成之后，可按照提示信息，执行 node/{网站路径/server/app.js} 启动服务器。在浏览器打开指定 url, 点击登录输入您刚才设置的管理员邮箱，默认密码为 ymfe.org 登录系统（默认密码可在个人中心修改）。

|   |
|---|
|# 安装 yapi-cli 工具  <br>$ npm install -g yapi-cli --registry https://registry.npm.taobao.org  <br>  <br># 启动 YApi 平台部署工具  <br>$ yapi server  <br>在浏览器打开 http://0.0.0.0:9090 访问。非本地服务器，请将 0.0.0.0 替换成指定的域名或ip|

## 4.4 YApi 平台部署

在浏览器打开 `http://127.0.0.1:9090` 地址，设置 YApi 平台部署的信息。如下图：![YApi 平台部署](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/10.png)

点击「开始部署」按钮，会弹出“部署日志”窗口。如下图：![部署日志](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/11.png)

耐心等待，直到出现日志如下：

|   |
|---|
|初始化管理员账号成功,账号名："zhijiantianya@gmail.com"，密码："ymfe.org"  <br>部署成功，请切换到部署目录，输入： "node vendors/server/app.js" 指令启动服务器, 然后在浏览器打开 http://127.0.0.1:3000 访问|

此时，我们可以在命令行执行 ctrl-c 操作，关闭YApi 平台部署工具。

## 4.5 YApi 平台启动

在命令行中，执行如下命令，启动 YApi 平台。

|   |
|---|
|# 进入 yapi 部署路径  <br>$ cd /Users/yunai/my-yapi/  <br>  <br># 启动 yapi 平台  <br>$ node vendors/server/app.js  <br>log: -------------------------------------swaggerSyncUtils constructor-----------------------------------------------  <br>log: 服务已启动，请打开下面链接访问:  <br>http://127.0.0.1:3000/  <br>log: mongodb load success...|

项目启动完成。如果真正开始使用时，建议使用 pm2 方便服务管理维护。命令如下：

|   |
|---|
|npm install pm2 -g  // 安装pm2  <br>cd  {项目目录}  <br>pm2 start "vendors/server/app.js" --name yapi // pm2管理yapi服务  <br>pm2 info yapi // 查看服务信息  <br>pm2 stop yapi // 停止服务  <br>pm2 restart yapi // 重启服务|

这里，我们可以先略过这个操作，继续往下看。毕竟，咱现在的重心是先入门。

## 4.5 创建项目

浏览器打开 `http://127.0.0.1:3000/` 地址，输入账号密码登录。

- 登录账号，就是管理员邮箱。例如说，艿艿这里使用的是 zhijiantianya@gmail.com
- 登录密码，默认使用 ymfe.org 。

登录成功后，自动跳转到主界面，点击右边的「添加项目」按钮，进入「新建项目」的界面(`http://127.0.0.1:3000/add-project`) 。如下图：![新建项目](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/12.png)

点击下方的「创建项目」按钮，完成项目的创建。创建成功后，我们会自动动跳转到刚才创建的项目下。如下图：![项目界面](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/13.png)

## 4.6 设置 Swagger 自动同步

点击「设置」栏目，然后选择「Swagger自动同步」栏目，设置 Swagger 自动同步信息。如下图：![设置 Swagger 自动同步](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/14.png)

> 友情提示：Swagger 默认会自动暴露 `项目地址/v2/api-docs` 接口，提供 Swagger 根据注解自动生成的 API 接口信息。胖友可以手动请求下该接口，感受下。
> 
> 实际上，无论是 Swagger UI 也是基于该接口，获得 API 接口信息。

点击「保存」按钮。成功后，点击「接口」栏目，就可以看到自动同步到的接口信息。如下图：![接口](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/14.png)

至此，我们已经完成搭建 YApi 平台，并自动采集 Swagger 提供的 API 接口信息。YApi 的功能非常强大，一定要翻一翻 [官方文档](https://hellosean1025.github.io/yapi/documents/index.html) 哟。例如说，数据 Mock、高级 Mock 、自动化测试等等功能，都是非常值得在项目中实践使用。

# 666. 彩蛋

那么，在有了 API 接口文档之后，如何和前端更好的沟通呢？

一般来说，每一个版本的需求，产品都会提供 [Axure](https://www.axure.com/) 文档。后端开发在设计完接口之后，可以考虑在每个界面上，标记上使用到的**接口的文档地址**。注意，是接口的文档地址啊！！！例如说，登录界面需要使用到登录接口，那么我们可以把登录接口对应的文档地址 [http://127.0.0.1:3000/project/14/interface/api/11](http://127.0.0.1:3000/project/14/interface/api/11) 标记到这个界面的原型上。

当然，做标记的原则是，需要跟产品协商好可以用来标记的区域，不能影响到他们的工作。例如说：![原型标记示例](https://static.iocoder.cn/images/Spring-Boot/2019-11-22/15.png)

> 友情提示：Axure 也是支持 [团队协作](https://www.axure.com.cn/4918/) 的噢。如果胖友家的产品还没使用，批评（怒喷）一下他们。

这样，在原型上标记好接口之后，我们就可以找前端妹子，对着原型，顺着接口走一遍流程。如果走的很顺畅，说明咱的接口棒棒的。嘿嘿~

一定要记住，工具仅仅是工具，一定要尽早达成前后端的一致。