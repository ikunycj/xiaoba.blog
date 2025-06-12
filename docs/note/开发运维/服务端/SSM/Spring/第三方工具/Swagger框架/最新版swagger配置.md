# Springboot 3整合Knife4j（Swagger3、OpenApi3）

---
# [官网](https://doc.xiaominfo.com/)
## 前言

> springboot 3开始javax包改成了jakarta，而swagger-oas等包中依然使用的是javax，所以报错。另外springfox已经停止更新有段时间了，并且不支持OpenAPI 3标准，升级Springboot 3.0以后会有更多问题暴露出来。而SpringBoot 3只支持OpenAPI 3规范，因此Spring官网推荐了Springdoc

**OpenApi 3的规范，目前针对Java的Spring Boot项目，主要支持的有2个版本：**

- springfox 3.0.0： 同时兼容OpenAPI 2以及OpenAPI 3，但是停更很久了
- springdoc-openapi：兼容OpenAPI 3规范，更新速度频繁
- Knife4j：在只有的OpenAPI 3规范中，底层基础框架选择springdoc-openapi项目，针对Springfox 3.0.0版本会放弃

---

## 一、Spring Boot 3.0整合[Knife4j](https://so.csdn.net/so/search?q=Knife4j&spm=1001.2101.3001.7020)

以下是一些常见的Spring Boot版本及其对应的Knife4j版本兼容推荐：

|Spring Boot版本|Knife4j Swagger 2规范|Knife4j OpenAPI 3规范|
|---|---|---|
|1.5.x ~ 2.0.0|< Knife4j 2.0.0|>= Knife4j 4.0.0|
|2.0 ~ 2.2|Knife4j 2.0.0 ~ 2.0.6|>= Knife4j 4.0.0|
|2.2.x ~ 2.4.0|Knife4j 2.0.6 ~ 2.0.9|>= Knife4j 4.0.0|
|2.4.0 ~ 2.7.x|>= Knife4j 4.0.0|>= Knife4j 4.0.0|
|>= 3.0|>= Knife4j 4.0.0|>= Knife4j 4.0.0|

> **参考文档**：[关于Knife4j适配不同Spring Boot版本的说明文档](https://doc.xiaominfo.com/docs/quick-start/start-knife4j-version)

项目配置：

JDK：22

SpringBoot：3.3.1

Knife4j：4.5.0

**温馨提示：**

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/1fffdf9f030842ffa974c922d6bfa803.png#pic_center)

---

## 二、OpenApi 3注解的使用规范

- Swagger 3(OpenApi 3) 注解与Swagger 2注解的对比

|Swagger 2|OpenAPI 3|注解位置|作用|
|---|---|---|---|
|@Api|**@Tag(name = “接口类名”,description = “接口类描述”)**|Controller类|描述此controller的信息|
|@ApiOperation(value = “接口方法描述”)|**@Operation(summary =“接口方法描述”)**|Api端口方法|描述此Api的信息|
|@ApiImplicitParams|**@Parameters**|Api端口方法|描述参数信息|
|@ApiImplicitParam|**@Parameter(description=“参数描述”)**|Api方法的参数|描述参数信息|
|@ApiParam|**@Parameter(description=“参数描述”)**|Api方法的参数|-|
|@ApiIgnore|**@Parameter(hidden = true) 或 @Operation(hidden = true) 或 @Hidden**|-|用在各种地方，用于隐藏其Api|
|@ApiModel|**@Schema**|DTO类|用于Entity，以及Entity的属性上|
|@ApiModelProperty|**@Schema**|DTO属性|用于Entity，以及Entity的属性上|

参考链接: [从 Springfox Swagger 2 迁移到 Springdoc Open API](https://stackoverflow.com/questions/59291371/migrating-from-springfox-swagger-2-to-springdoc-open-api)

---

## 三、使用步骤

### 1.Spring Boot 3.0中使用knife4j

- 在pom.xml文件中导入knife4j的依赖（本文springboot的版本是3.3.1）

```xml
<!-- Swagger3-knife4j依赖 -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
    <version>4.5.0</version>
</dependency>
```

其实现在就可以使用Knife4j了，暂不做其他配置，启动项目，浏览器输入[http://localhost:8080/doc.html](http://localhost:8080/doc.html)查看接口文档

- 由于我们没有进行任何的属性配置，所以看到的页面是knife4j的初始页面

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/eb704bc7ca06477b98604b99c205bc46.png#pic_center)

### 2.在application.yml中添加knife4j相关配置

```yaml
# springdoc-openapi项目配置
springdoc:
  swagger-ui:
    #自定义swagger前端请求路径,输入http:localhost:8080/swagger-ui.html会自动重定向到swagger页面
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: alpha
  api-docs:
    path: /v3/api-docs    #swagger后端请求地址
    enabled: true   #是否开启文档功能
  group-configs:
    - group: 'default'   #分组名称
      paths-to-match: '/**'   #配置需要匹配的路径,默认为/**
      packages-to-scan: com.blog.patrick    #配置要扫描包的路径,一般配置到启动类所在的包名

# knife4j的增强配置，不需要增强可以不配(建议配置一下)
knife4j:
  enable: true    #开启knife4j,无需添加@EnableKnife4j注解
  setting:
    language: zh_cn   #中文
    swagger-model-name: 实体类列表   #重命名SwaggerModel名称,默认
  #开启Swagger的Basic认证功能,默认是false
  basic:
    enable: true
    # Basic认证用户名
    username: ******
    # Basic认证密码
    password: ******

```

### 3.创建config包，在其中新建一个配置类

- 定义配置类WebMvcConfig，实现静态资源映射，将knife4j相关资源放行，保证生成的接口文档能够正常进行展示

```java
package com.blog.patrick.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * <p>
 * 配置类,注册web层相关组件
 * </p>
 *
 * @author Patrick
 * @since 2024-07-02
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * 设置静态资源映射
     * @param registry 
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 添加静态资源映射规则
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
        //配置 knife4j 的静态资源请求映射地址
        registry.addResourceHandler("/doc.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}

```

### 4.在config包下新建Knife4jConfig.java文件

- 该文件主要进行Knife4j的属性配置，如：作者、版本、接口分组等

```java
package com.blog.patrick.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * <p>
 * Knife4j整合Swagger3 Api接口文档
 * </p>
 *
 * @author Patrick
 * @since 2024-07-02
 */
@Configuration
public class Knife4jConfig {

    @Bean
    public GroupedOpenApi adminApi() { // 创建了一个api接口的分组
        return GroupedOpenApi.builder()
                .group("admin-api") // 分组名称
                .pathsToMatch("/**") // 接口请求路径规则
                .build();
    }

    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
                .info(new Info() // 基本信息配置
                        .title("Knife4j整合Swagger3 Api接口文档") // 标题
                        .description("Knife4j后端接口服务...") // 描述Api接口文档的基本信息
                        .version("v1.0.0") // 版本
                        // 设置OpenAPI文档的联系信息，包括联系人姓名为"patrick"，邮箱为"patrick@gmail.com"。
                        .contact(new Contact().name("patrick").email("patrick@gmail.com"))
                        // 设置OpenAPI文档的许可证信息，包括许可证名称为"Apache 2.0"，许可证URL为"http://springdoc.org"。
                        .license(new License().name("Apache 2.0").url("http://springdoc.org"))
                );
    }
}

```

### 5.entity实体类

**@Schema(description = “ ”)：** 标记实体类属性

```java
@Data
@TableName("t_user")
@Schema(description = "用户实体")
public class User implements Serializable {

    @Schema(description = "用户id")
    private Integer id;
    
    @Schema(description = "用户昵称")
    private String nickname;
    
    @Schema(description = "用户名")
    private String username;

    @Schema(description = "用户密码")
    private String password;

}

```

### 6.controller控制层

**@Tag(name = “ ”)：** 标记接口类别  
**@Operation(summary =“ ”)：** 标记接口操作

- 创建(create) – 使用Post方法;
- 修改(update) – 使用Post方法;
- 删除(delete) – 使用Delete方法;

```java
@RestController
@Tag(name = "用户列表")
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    /**
     * 用户列表
     * @return
     */
    @Operation(summary = "用户列表")
    @GetMapping("/list")
    public JsonResult list() {
        List<User> userList = userService.findAll();
        return JsonResult.success().data("userList", userList);
    }

}

```

---

## 四、重启项目并访问接口文档

- 访问[http://localhost:8080/doc.html](http://localhost:8080/doc.html)，可以看到我们配置的属性已经在页面中显示出来了

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/7af47e88347a46bea2512f859c00ad86.png)

---

## 五、Springboot启动类优化

- 每次都需要打开浏览器输入地址访问，对开发者很不友好，因此采取以下优化

```java
@Slf4j
@SpringBootApplication
public class BlogApplication {

    public static void main(String[] args) {
        ConfigurableEnvironment env = SpringApplication.run(BlogApplication.class, args).getEnvironment();

        log.info("\n----------------------------------------------------------\n\t" +
                        "Application: '{}' is running Success! \n\t" +
                        "Local URL: \thttp://localhost:{}\n\t" +
                        "Document:\thttp://localhost:{}/doc.html\n" +
                        "----------------------------------------------------------",
                env.getProperty("spring.application.name"),
                env.getProperty("server.port"),
                env.getProperty("server.port"));
    }

}

```

- 项目启动，控制台打印日志如下：

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/8233442192e544318a0f5cb13a7751e6.png)