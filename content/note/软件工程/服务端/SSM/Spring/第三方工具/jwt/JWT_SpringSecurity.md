## JWT_SpringSecurity

SpringBoot3.0 + SpringSecurity6.0+JWT

**Spring Security** 是 Spring 家族中的一个安全管理框架。

一般Web应用的需要进行**认证**和**授权**。

- **认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户**
    
- **授权：经过认证后判断当前用户是否有权限进行某个操作**
    

## 1、快速入门

### 1.1、准备工作

搭建一个SpringBoot工程

① 设置父工程 添加依赖

```xml
<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.3</version>
        <relativePath/> <!-- lookup parent from repository -->
</parent>


<dependencies>
        <!--   DB相关     -->
        <!--   JDBC操作数据库     -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <!--    MySQL依赖    -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!--    mp依赖,简化crud    -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.2</version>
        </dependency>
        <!--    SpringSecurity依赖    -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <!--   SpringWeb依赖     -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--    热部署依赖    -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <!--   懒人神器lombok     -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <!--    API文档 - swagger   -->
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
            <version>4.0.0</version>
        </dependency>
    </dependencies>
```

配置文件application.yml

```yml
# 端口号
server:
  port: 48080

--- #################### 数据库相关配置 ####################

spring:
  # 数据源配置项
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/auth-system?useSSL=false&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true # MySQL Connector/J 8.X 连接的示例
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root # 数据库账号
    password: 123123123 # 数据库密码
    # HikariCP 自定义配置，对应 HikariConfig 配置属性类
    hikari:
      minimum-idle: 10 # 池中维护的最小空闲连接数，默认为 10 个。
      maximum-pool-size: 10 # 池中最大连接数，包括闲置和使用中的连接，默认为 10 个。

# springdoc-openapi项目配置
springdoc:
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: alpha
  api-docs:
    path: /v3/api-docs
  group-configs:
    - group: 'default'
      paths-to-match: '/**'
      packages-to-scan: org.pp.boot3
# knife4j的增强配置，不需要增强可以不配
knife4j:
  enable: true
  setting:
    language: zh_cn
```

② 创建启动类

```java
/**
 * @author ss_419
 */
@SpringBootApplication
public class SpringSecurity6JwtBoot3Application {

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurity6JwtBoot3Application.class, args);
    }

}
```

③ 创建Controller

```java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO 测试接口
 *
 * @author ss_419
 * @version 1.0
 * @date 2023/3/2 20:27
 */
@RestController
@RequestMapping("/api/v1/")
@Tag(name = "测试接口")
public class GreetingController {

    @GetMapping(value = "/hello")
    @Operation(summary = "hello")
    public ResponseEntity<String> sayHello() {
        String message = "Hello World!";
        return ResponseEntity.ok(message);
    }
}
```

启动项目，查看[接口文档](https://so.csdn.net/so/search?q=%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3&spm=1001.2101.3001.7020)地址：http://localhost:48080/doc.html#/home

Knife4j的文档地址：`http://ip:port/doc.html`即可查看文档

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f9e4ed17567680b7f302cb74b26ffa08.png)

出现测试接口，表示项目启动成功

### 1.2引入[SpringSecurity](https://so.csdn.net/so/search?q=SpringSecurity&spm=1001.2101.3001.7020)

在SpringBoot项目中使用SpringSecurity我们只需要引入依赖即可实现入门案例。

注意⚠️：1.1创建项目时已经引入过依赖

```xml
        <!--    SpringSecurity依赖    -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
```

引入依赖后我们在尝试去访问之前的接口就会自动跳转到一个SpringSecurity的默认登陆页面，默认用户名是user,密码会输出在控制台。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5baec63bb9033f4287796604a7a45f63.png)

须登陆之后才能对接口进行访问

## 2、认证

### 2.1、原理初探

用户认证流程：
SpringSecurity的原理是一个过滤器链，内部包含了提供各种功能的过滤器。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/245b42bf78d34815488551f3d92ef34f.png)

- **UsernamePasswordAuthenticationFilter**:负责处理我们在登陆页面填写了用户名密码后的登陆请求。入门案例的认证工作主要有它负责。
    
- **ExceptionTranslationFilter**： 处理过滤器链中抛出的任何AccessDeniedException和AuthenticationException 。
    
- **FilterSecurityInterceptor**： 负责权限校验的过滤器。
    
- **Authentication接口**: 它的实现类，表示当前访问系统的用户，封装了用户相关信息。
    
- **AuthenticationManager接口**：定义了认证Authentication的方法
    
- **UserDetailsService接口**：加载用户特定数据的核心接口。里面定义了一个根据用户名查询用户信息的方法
    
- **UserDetails接口**：提供核心用户信息。通过UserDetailsService根据用户名获取处理的用户信息要封装成
    
- **UserDetails对象返回**。然后将这些信息封装到Authentication对象中。
    

### 2.2、用户认证核心组件

Authentication`**，它存储了认证信息，代表当前登录用户。

我们在程序中如何获取并使用它呢？我们需要通过 **`SecurityContext`** 来获取`Authentication`，`SecurityContext`就是我们的上下文对象！这个上下文对象则是交由 **`SecurityContextHolder`** 进行管理，你可以在程序**任何地方**使用它：

```java
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
```

`SecurityContextHolder`原理非常简单，就是使用`ThreadLocal`来保证一个线程中传递同一个对象！

**现在我们已经知道了Spring Security中三个核心组件：**

​ 1、`Authentication`：存储了认证信息，代表当前登录用户

​ 2、`SeucirtyContext`：上下文对象，用来获取`Authentication`

​ 3、`SecurityContextHolder`：上下文管理对象，用来在程序任何地方获取`SecurityContext`

**`Authentication`中是什么信息呢：**

​ 1、`Principal`：用户信息，没有认证时一般是用户名，认证后一般是用户对象

​ 2、`Credentials`：用户凭证，一般是密码

​ 3、`Authorities`：用户权限

**用户认证：**  
Spring Security是怎么进行用户认证的呢？

**`AuthenticationManager`** 就是Spring Security用于执行身份验证的组件，只需要调用它的`authenticate`方法即可完成认证。Spring Security默认的认证方式就是在`UsernamePasswordAuthenticationFilter`这个过滤器中进行认证的，该过滤器负责认证逻辑。

Spring Security用户认证关键代码如下：

```java
// 生成一个包含账号密码的认证信息
Authentication authenticationToken = new UsernamePasswordAuthenticationToken(username, passwrod);
// AuthenticationManager校验这个认证信息，返回一个已认证的Authentication
Authentication authentication = authenticationManager.authenticate(authenticationToken);
// 将返回的Authentication存到上下文中
SecurityContextHolder.getContext().setAuthentication(authentication);
```

接下来我们分析一下一个请求发送到服务器都经历了什么：  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4ef18ca6a4a7348654ffbf886e2a72a9.png)  
上图中当有请求发送给服务器都要经过**Check JWT Token**机制，需要每次收到请求的时候，过滤器都处于活动状态。因此每次用户发送请求时希望过滤器被触发并完成要做的所有工作。

- 如果我们有我们的用户电子邮箱并且用户未通过身份验证，我们会从数据库中获取用户详细信息（loadUserByUsername --> UserDetails）
- 然后我们需要做的是检查用户是否有效，如果用户和令牌有效，我们创建一个UsernamePasswordAuthenticationToken对象，传递UserDetails & 凭证 & 权限信息
- 扩展上面生成的authToken，包含我们请求的详细信息，然后更新安全上下文中的身份验证令牌
- 最后一步执行过滤器chain，别忘记放行，将请求通过DispatchServlet分发响应给客户端

#### 登录认证流程

登录  
①自定义登录接口

调用ProviderManager的方法进行认证 如果认证通过生成jwt 把用户信息存入redis中

②自定义UserDetailsService

在这个实现类中去查询数据库

校验：  
①定义Jwt认证过滤器

获取token

解析token获取其中的userid

从redis中获取用户信息

存入SecurityContextHolder

## 3、JWT_Security整合流程

### 3.1、什么是JWT

JWT 主要用于用户登录鉴权，所以我们从最传统的 session 认证开始说起。

**Session认证：**

众所周知，==http== 协议本身是==无状态==的协议，那就意味着当有用户向系统使用账户名称和密码进行用户认证之后，下一次请求还要再一次用户认证才行。因为我们不能通过 http 协议知道是哪个用户发出的请求，所以如果要知道是哪个用户发出的请求，那就需要在服务器保存一份用户信息(保存至 session )，然后在认证成功后返回 cookie [值传递](https://so.csdn.net/so/search?q=%E5%80%BC%E4%BC%A0%E9%80%92&spm=1001.2101.3001.7020)给浏览器，那么用户在下一次请求时就可以带上 cookie 值，服务器就可以识别是哪个用户发送的请求，是否已认证，是否登录过期等等。这就是传统的 session 认证方式。

session 认证的缺点其实很明显，由于 session 是保存在服务器里，所以如果分布式部署应用的话，会出现session不能共享的问题，很难扩展。于是乎为了解决 session 共享的问题，又引入了 redis，接着往下看。

Session认证还会引发==CSRF（跨站请求伪造攻击）==，因为是基于cookie来进行用户识别的, cookie如果被截获，用户就会很容易受到跨站请求伪造的攻击。

**Token认证：**

这种方式跟Session的方式流程差不多，不同的地方在于保存的是一个token值，token一般是一串随机的字符(比如UUID)，value 一般是用户ID，并且设置一个过期时间。

==每次请求==服务的时候带上 token 在请求头，后端接收到token 则根据 token 查一下 redis 是否存在，如果存在则表示用户已认证，如果 token 不存在则跳到登录界面让用户重新登录，登录成功后返回一个 token 值给客户端。

**JWT认证：**

JWT（全称==Json Web Token==），是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准.该token被设计为紧凑且安全的，特别适用于分布式站点的单点登录（SSO）场景。JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。

#### **3.1.1、JWT的数据结构：**

JWT 一般是这样一个字符串，分为三个部分，以 “.” 隔开：

```text
xxxxx.yyyyy.zzzzz
```

JWT官网：https://jwt.io/

进入官网我们可以看到首页有这样一个页面：![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6c2658fcbf46034f82a78b9ac91d1786.png)

其中左侧是生成的jwt编码，我们可以看到它生成的格式就如上述所描述那样，分成了三段

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.

eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.

SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

右侧是对jwt字符串进行解码

**HEADER**

jwt的头部承载两部分信息：

声明类型，这里是jwt  
声明加密的算法 通常直接使用 HMAC SHA256  
完整的头部就像下面这样的JSON：  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/133e1ad9afe8ba149aaec2cd39bbe8cf.png)  
然后将头部进行base64加密（该加密是可以对称解密的),构成了第一部分：  
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

**PLAYLOAD：**  
载荷就是存放有效信息的地方。这个名字像是特指飞机上承载的货品，这些有效信息包含三个部分

标准中注册的声明  
公共的声明  
私有的声明

标准中注册的声明 (建议但不强制使用) ：  
iss: jwt签发者  
sub: jwt所面向的用户  
aud: 接收jwt的一方  
exp: jwt的过期时间，这个过期时间必须要大于签发时间  
nbf: 定义在什么时间之前，该jwt都是不可用的.  
iat: jwt的签发时间  
jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。

公共的声明 ： 公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密.

私有的声明 ： 私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息。  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/261ad4370e2b4d686206c60d160d1187.png)  
然后将其进行base64加密，得到JWT的第二部分：  
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ

**VERIFY SIGNATURE：**  
JWT的第三部分是一个签证信息，这个签证信息由三部分组成：

header (base64后的)  
payload (base64后的)

secret  
这个部分需要base64加密后的header和base64加密后的payload使用.连接组成的字符串，然后通过header中声明的加密方式进行加盐secret组合加密，然后就构成了jwt的第三部分：

SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

**注意**：secret是保存在服务器端的，jwt的签发生成也是在服务器端的，secret就是用来进行jwt的签发和jwt的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个secret, 那就意味着客户端是可以自我签发jwt了。

如何应用：

一般是在请求头里加入Authorization，并加上Bearer标注：

```bash
 'Authorization': 'Bearer ' + token
```

#### **3.1.2、签名密钥**

在Json网络令牌的安全上下文中，签名密钥是用于对JWT进行数字签名的加密信息，签名密钥用于创建JWT的签名部分，用于验证JWT的发送者是否是已经经过确认的用户，并确保消息在整个过程中没有被更改（保证一致性），因此我们要确保发送此JWT密钥的用户是同一个人。

签名密钥通常与JWT标头中指定的登录算法结合使用，以创建签名具体的登录算法，密钥大小将取决于应用程序的安全要求和信任级别（签名方）

可以在[**allkeysgenertor**](https://allkeysgenerator.com/)中生成任意大小的签名密钥  
注意⚠️：在JWT中最低安全级别是256bit，因此在本教程中，我们将采用256bit的签名密钥，如下所示：  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/bb23a0f86472dbb298eeac328b560396.png)

### 3.2、准备工作

①添加依赖

```xml
        <!-- JWT 相关 -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
        </dependency>
        <!--redis依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!--fastjson依赖-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.33</version>
        </dependency>
```

② 添加Redis相关配置

```java
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;
import com.alibaba.fastjson.parser.ParserConfig;
import org.springframework.util.Assert;
import java.nio.charset.Charset;

/**
 * Redis使用FastJson序列化
 * @author ss_419
 */
public class FastJsonRedisSerializer<T> implements RedisSerializer<T>
{

    public static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");

    private Class<T> clazz;

    static
    {
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
    }

    public FastJsonRedisSerializer(Class<T> clazz)
    {
        super();
        this.clazz = clazz;
    }

    @Override
    public byte[] serialize(T t) throws SerializationException
    {
        if (t == null)
        {
            return new byte[0];
        }
        return JSON.toJSONString(t, SerializerFeature.WriteClassName).getBytes(DEFAULT_CHARSET);
    }

    @Override
    public T deserialize(byte[] bytes) throws SerializationException
    {
        if (bytes == null || bytes.length <= 0)
        {
            return null;
        }
        String str = new String(bytes, DEFAULT_CHARSET);

        return JSON.parseObject(str, clazz);
    }


    protected JavaType getJavaType(Class<?> clazz)
    {
        return TypeFactory.defaultInstance().constructType(clazz);
    }
}
```

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * TODO Redis配置
 *
 * @author ss_419
 * @version 1.0
 * @date 2023/3/3 10:24
 */
@Configuration
public class RedisConfig {
    /**
     * Redis配置
     */
    @Bean
    @SuppressWarnings(value = {"unchecked", "rawtypes"})
    public RedisTemplate<Object,Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<Object,Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        FastJsonRedisSerializer<Object> serializer = new FastJsonRedisSerializer<>(Object.class);
        
        // 使用StringRedisSerializer来序列化和反序列化redis的key值
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);

        // Hash的key也采用StringRedisSerializer的序列化方式
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);

        template.afterPropertiesSet();

        return template;
    }
}
```

```java
package org.pp.boot3.config.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * @author ss_419
 */
@SuppressWarnings(value = {"unchecked", "rawtypes"})
@Component
@RequiredArgsConstructor
public class RedisCache {
    
    private final RedisTemplate redisTemplate;

    /**
     * 缓存基本的对象，Integer、String、实体类等
     *
     * @param key   缓存的键值
     * @param value 缓存的值
     */
    public <T> void setCacheObject(final String key, final T value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 缓存基本的对象，Integer、String、实体类等
     *
     * @param key      缓存的键值
     * @param value    缓存的值
     * @param timeout  时间
     * @param timeUnit 时间颗粒度
     */
    public <T> void setCacheObject(final String key, final T value, final Integer timeout, final TimeUnit timeUnit) {
        redisTemplate.opsForValue().set(key, value, timeout, timeUnit);
    }

    /**
     * 设置有效时间
     *
     * @param key     Redis键
     * @param timeout 超时时间
     * @return true=设置成功；false=设置失败
     */
    public boolean expire(final String key, final long timeout) {
        return expire(key, timeout, TimeUnit.SECONDS);
    }

    /**
     * 设置有效时间
     *
     * @param key     Redis键
     * @param timeout 超时时间
     * @param unit    时间单位
     * @return true=设置成功；false=设置失败
     */
    public boolean expire(final String key, final long timeout, final TimeUnit unit) {
        return redisTemplate.expire(key, timeout, unit);
    }

    /**
     * 获得缓存的基本对象。
     *
     * @param key 缓存键值
     * @return 缓存键值对应的数据
     */
    public <T> T getCacheObject(final String key) {
        ValueOperations<String, T> operation = redisTemplate.opsForValue();
        return operation.get(key);
    }

    /**
     * 删除单个对象
     *
     * @param key
     */
    public boolean deleteObject(final String key) {
        return redisTemplate.delete(key);
    }

    /**
     * 删除集合对象
     *
     * @param collection 多个对象
     * @return
     */
    public long deleteObject(final Collection collection) {
        return redisTemplate.delete(collection);
    }

    /**
     * 缓存List数据
     *
     * @param key      缓存的键值
     * @param dataList 待缓存的List数据
     * @return 缓存的对象
     */
    public <T> long setCacheList(final String key, final List<T> dataList) {
        Long count = redisTemplate.opsForList().rightPushAll(key, dataList);
        return count == null ? 0 : count;
    }

    /**
     * 获得缓存的list对象
     *
     * @param key 缓存的键值
     * @return 缓存键值对应的数据
     */
    public <T> List<T> getCacheList(final String key) {
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    /**
     * 缓存Set
     *
     * @param key     缓存键值
     * @param dataSet 缓存的数据
     * @return 缓存数据的对象
     */
    public <T> BoundSetOperations<String, T> setCacheSet(final String key, final Set<T> dataSet) {
        BoundSetOperations<String, T> setOperation = redisTemplate.boundSetOps(key);
        Iterator<T> it = dataSet.iterator();
        while (it.hasNext()) {
            setOperation.add(it.next());
        }
        return setOperation;
    }

    /**
     * 获得缓存的set
     *
     * @param key
     * @return
     */
    public <T> Set<T> getCacheSet(final String key) {
        return redisTemplate.opsForSet().members(key);
    }

    /**
     * 缓存Map
     *
     * @param key
     * @param dataMap
     */
    public <T> void setCacheMap(final String key, final Map<String, T> dataMap) {
        if (dataMap != null) {
            redisTemplate.opsForHash().putAll(key, dataMap);
        }
    }

    /**
     * 获得缓存的Map
     *
     * @param key
     * @return
     */
    public <T> Map<String, T> getCacheMap(final String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * 往Hash中存入数据
     *
     * @param key   Redis键
     * @param hKey  Hash键
     * @param value 值
     */
    public <T> void setCacheMapValue(final String key, final String hKey, final T value) {
        redisTemplate.opsForHash().put(key, hKey, value);
    }

    /**
     * 获取Hash中的数据
     *
     * @param key  Redis键
     * @param hKey Hash键
     * @return Hash中的对象
     */
    public <T> T getCacheMapValue(final String key, final String hKey) {
        HashOperations<String, String, T> opsForHash = redisTemplate.opsForHash();
        return opsForHash.get(key, hKey);
    }

    /**
     * 删除Hash中的数据
     *
     * @param key
     * @param hkey
     */
    public void delCacheMapValue(final String key, final String hkey) {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.delete(key, hkey);
    }

    /**
     * 获取多个Hash中的数据
     *
     * @param key   Redis键
     * @param hKeys Hash键集合
     * @return Hash对象集合
     */
    public <T> List<T> getMultiCacheMapValue(final String key, final Collection<Object> hKeys) {
        return redisTemplate.opsForHash().multiGet(key, hKeys);
    }

    /**
     * 获得缓存的基本对象列表
     *
     * @param pattern 字符串前缀
     * @return 对象列表
     */
    public Collection<String> keys(final String pattern) {
        return redisTemplate.keys(pattern);
    }
}
```

③ 响应类&工具类

```java
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * 统一响应类
 * @author ss_419
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseResult<T> {
    /**
     * 状态码
     */
    private Integer code;
    /**
     * 提示信息，如果有错误时，前端可以获取该字段进行提示
     */
    private String msg;
    /**
     * 查询到的结果数据，
     */
    private T data;

    public ResponseResult(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public ResponseResult(Integer code, T data) {
        this.code = code;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public ResponseResult(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
```

```java
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * TODO Web工具
 *
 * @author ss_419
 * @version 1.0
 * @date 2023/3/3 10:39
 */
public class WebUtil {
    /**
     * 将字符串渲染到客户端
     *
     * @param response 渲染对象
     * @param string 待渲染的字符串
     * @return null
     */
    public static String renderString(HttpServletResponse response, String string) {
        try
        {
            response.setStatus(200);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(string);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return null;
    }
}
```

用户实体类SysUser

```java
/**
 * 用户表
 * @author ss_419
 * @TableName sys_user
 */
@TableName(value ="sys_user")
@Data
public class SysUser implements Serializable {

    /**
     * 会员id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 姓名
     */
    private String name;

    /**
     * 手机
     */
    private String phone;

    /**
     * 头像地址
     */
    private String headUrl;

    /**
     * 部门id
     */
    private Long deptId;

    /**
     * 岗位id
     */
    private Long postId;

    /**
     * 描述
     */
    private String description;

    /**
     * 状态（1：正常 0：停用）
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 删除标记（0:可用 1:已删除）
     */
    private Integer isDeleted;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        SysUser other = (SysUser) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getUsername() == null ? other.getUsername() == null : this.getUsername().equals(other.getUsername()))
            && (this.getPassword() == null ? other.getPassword() == null : this.getPassword().equals(other.getPassword()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getPhone() == null ? other.getPhone() == null : this.getPhone().equals(other.getPhone()))
            && (this.getHeadUrl() == null ? other.getHeadUrl() == null : this.getHeadUrl().equals(other.getHeadUrl()))
            && (this.getDeptId() == null ? other.getDeptId() == null : this.getDeptId().equals(other.getDeptId()))
            && (this.getPostId() == null ? other.getPostId() == null : this.getPostId().equals(other.getPostId()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getIsDeleted() == null ? other.getIsDeleted() == null : this.getIsDeleted().equals(other.getIsDeleted()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getUsername() == null) ? 0 : getUsername().hashCode());
        result = prime * result + ((getPassword() == null) ? 0 : getPassword().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getPhone() == null) ? 0 : getPhone().hashCode());
        result = prime * result + ((getHeadUrl() == null) ? 0 : getHeadUrl().hashCode());
        result = prime * result + ((getDeptId() == null) ? 0 : getDeptId().hashCode());
        result = prime * result + ((getPostId() == null) ? 0 : getPostId().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getIsDeleted() == null) ? 0 : getIsDeleted().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", username=").append(username);
        sb.append(", password=").append(password);
        sb.append(", name=").append(name);
        sb.append(", phone=").append(phone);
        sb.append(", headUrl=").append(headUrl);
        sb.append(", deptId=").append(deptId);
        sb.append(", postId=").append(postId);
        sb.append(", description=").append(description);
        sb.append(", status=").append(status);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append(", isDeleted=").append(isDeleted);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}
```

用户表Mapper：

```java
/**
* @author ss_419
* @description 针对表【sys_user(用户表)】的数据库操作Mapper
* @createDate 2023-03-03 10:41:42
* @Entity org.pp.boot3.domain.SysUser
*/
public interface SysUserMapper extends BaseMapper<SysUser> {

}
```

用户Service：

```java
/**
* @author ss_419
* @description 针对表【sys_user(用户表)】的数据库操作Service
* @createDate 2023-03-03 10:41:42
*/
public interface SysUserService extends IService<SysUser> {

}
```

用户ServiceImpl：

```java
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser>
    implements SysUserService{

}
```

在启动类上配置mapper扫描：

```java
/**
 * @author ss_419
 */
@SpringBootApplication
@ComponentScan("org.pp.boot3.mapper")
public class SpringSecurity6JwtBoot3Application {
    public static void main(String[] args) {
        SpringApplication.run(SpringSecurity6JwtBoot3Application.class, args);
    }
}
```

创建一个用户表，sql如下：

```sql
CREATE TABLE `sys_user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` VARCHAR(64) NOT NULL DEFAULT 'NULL' COMMENT '用户名',
  `nick_name` VARCHAR(64) NOT NULL DEFAULT 'NULL' COMMENT '昵称',
  `password` VARCHAR(64) NOT NULL DEFAULT 'NULL' COMMENT '密码',
  `status` CHAR(1) DEFAULT '0' COMMENT '账号状态（0正常 1停用）',
  `email` VARCHAR(64) DEFAULT NULL COMMENT '邮箱',
  `phonenumber` VARCHAR(32) DEFAULT NULL COMMENT '手机号',
  `sex` CHAR(1) DEFAULT NULL COMMENT '用户性别（0男，1女，2未知）',
  `avatar` VARCHAR(128) DEFAULT NULL COMMENT '头像',
  `user_type` CHAR(1) NOT NULL DEFAULT '1' COMMENT '用户类型（0管理员，1普通用户）',
  `create_by` BIGINT(20) DEFAULT NULL COMMENT '创建人的用户id',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_by` BIGINT(20) DEFAULT NULL COMMENT '更新人',
  `update_time` DATETIME DEFAULT NULL COMMENT '更新时间',
  `del_flag` INT(11) DEFAULT '0' COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户表'
```

### 3.3、核心代码实现部分

1.创建ApplicationConfig提供全局的Bean对象，以供使用

```java

/**
 * TODO 全局的Bean对象提供者
 * @author ss_419
 *
 * @RequiredArgsConstructor --> 代替原本的@Autowired
 */
@Configuration

@RequiredArgsConstructor
public class ApplicationConfig {
   // 注入数据库操作DAO
   private final SysUserMapper repository;

  /**
   *
   * @return 用户详细信息  -> jwt身份验证过滤器
   */
  @Bean
  public UserDetailsService userDetailsService() {
    return username -> repository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }

  /**
   * TODO 四 4.2
   * @return 身份校验机制、身份验证提供程序
   */
  @Bean
  public AuthenticationProvider authenticationProvider() {
    // 创建一个用户认证提供者
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    // 设置用户相信信息，可以从数据库中读取、或者缓存、或者配置文件
    authProvider.setUserDetailsService(userDetailsService());
    // 设置加密机制，若想要尝试对用户进行身份验证，我们需要知道使用的是什么编码
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  /**
   * TODO 四 4.4 基于用户名和密码或使用用户名和密码进行身份验证
   * @param config
   * @return
   * @throws Exception
   */
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }

  /**
   * TODO 四 4.3提供编码机制
   * @return
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
```

2.创建JWT工具类（Service）

```java
package org.pp.boot3.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

/**
 * TODO 完成JWT的验证服务
 * JWT工具类
 *
 * @author ss_419
 * @version 1.0
 * @date 2023/3/3 11:16
 */
@Service
public class JwtService {

    /**
     * 创建一个最终字符串，这个字符串称为密钥
     * https://allkeysgenerator.com/
     *
     * JWT最低要求的安全级别是256bit
     */
    private static final String SECRET_KEY = "3F4428472B4B6250655368566D5971337336763979244226452948404D635166";



    /**
     * 1、解析token字符串中的加密信息【加密算法&加密密钥】, 提取所有声明的方法
     * @param token
     * @return
     */
    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                // 获取alg开头的信息
                .setSigningKey(getSignInKey())
                .build()
                // 解析token字符串
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 2、获取签名密钥的方法
     * @return 基于指定的密钥字节数组创建用于HMAC-SHA算法的新SecretKey实例
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * 3、解析token字符串中的权限信息
     * @param token
     * @return
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * 4、从token中解析出username
     * @param token
     * @return
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * 5、判断token是否过期
     * @param
     * @return
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        // 从token中获取用户名
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) &&!isTokenExpired(token);
    }

    /**
     * 6、验证token是否过期
     * @param token
     * @return
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    /**
     * 6.1、从授权信息中获取token过期时间
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
```

3.完成JwtAuthenticationFilter身份验证过滤器

```java
/**
 * TODO 一、JWT身份验证过滤器
 *
 * @author ss_419
 * @version 1.0
 * @date 2023/3/3 10:56
 */
@Component
// 使用final，将服务注入class
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    /**
     * 需要每次收到请求的时候，过滤器都处于活动状态
     * 因此每次用户发送请求时希望过滤器被触发并完成要做的所有工作
     */
    private final JwtService jwtService;
    /**
     * 加载用户特定数据的核心接口。
     * 它作为用户DAO在整个框架中使用，并且是DaoAuthenticationProvider使用的策略
     */
    private final UserDetailsService userDetailsService;// 从ApplicationConfig中创建的Bean对象获取

    /**
     * 总体流程：
     * 如果我们有我们的用户电子邮箱并且用户未通过身份验证，我们会从数据库中获取用户详细信息（loadUserByUsername --> UserDetails）
     * 然后我们需要做的是检查用户是否有效，如果用户和令牌有效，我们创建一个UsernamePasswordAuthenticationToken对象，传递UserDetails & 凭证 & 权限信息
     * 扩展上面生成的authToken，包含我们请求的详细信息，然后更新安全上下文中的身份验证令牌
     * 最后一步执行过滤器chain，别忘记放行
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        // 从请求头中获取认证信息
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        // 从token中解析出username
        username = jwtService.extractUsername(jwt);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            // 根据jwt解析出来的username，获取数据库中的用户信息，封装UserDetails对象
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            // TODO 此处token有效性可以从redis｜数据库中获取
            Boolean isTokenValid = true;
            if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
                // TODO 如果令牌有效，封装一个UsernamePasswordAuthenticationToken对象
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        // 用户凭证
                        null,
                        userDetails.getAuthorities());
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                // 更新安全上下文的持有用户
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        }
    }
}
```

4.改造自动生成的SysUser

```java
package org.pp.boot3.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.github.xiaoymin.knife4j.annotations.Ignore;
import lombok.Data;
import org.pp.boot3.domain.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 用户表
 * @author ss_419
 * @TableName sys_user
 */
@TableName(value ="sys_user")
@Data
public class SysUser implements UserDetails {

    /**
     * 会员id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 姓名
     */
    private String name;

    /**
     * 手机
     */
    private String phone;

    /**
     * 头像地址
     */
    private String headUrl;

    /**
     * 部门id
     */
    private Long deptId;

    /**
     * 岗位id
     */
    private Long postId;

    /**
     * 描述
     */
    private String description;

    /**
     * 状态（1：正常 0：停用）
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 删除标记（0:可用 1:已删除）
     */
    private Integer isDeleted;

    /**
     * 角色集合
     */

    private Role role;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        SysUser other = (SysUser) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getUsername() == null ? other.getUsername() == null : this.getUsername().equals(other.getUsername()))
            && (this.getPassword() == null ? other.getPassword() == null : this.getPassword().equals(other.getPassword()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getPhone() == null ? other.getPhone() == null : this.getPhone().equals(other.getPhone()))
            && (this.getHeadUrl() == null ? other.getHeadUrl() == null : this.getHeadUrl().equals(other.getHeadUrl()))
            && (this.getDeptId() == null ? other.getDeptId() == null : this.getDeptId().equals(other.getDeptId()))
            && (this.getPostId() == null ? other.getPostId() == null : this.getPostId().equals(other.getPostId()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()))
            && (this.getIsDeleted() == null ? other.getIsDeleted() == null : this.getIsDeleted().equals(other.getIsDeleted()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getUsername() == null) ? 0 : getUsername().hashCode());
        result = prime * result + ((getPassword() == null) ? 0 : getPassword().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getPhone() == null) ? 0 : getPhone().hashCode());
        result = prime * result + ((getHeadUrl() == null) ? 0 : getHeadUrl().hashCode());
        result = prime * result + ((getDeptId() == null) ? 0 : getDeptId().hashCode());
        result = prime * result + ((getPostId() == null) ? 0 : getPostId().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        result = prime * result + ((getIsDeleted() == null) ? 0 : getIsDeleted().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", username=").append(username);
        sb.append(", password=").append(password);
        sb.append(", name=").append(name);
        sb.append(", phone=").append(phone);
        sb.append(", headUrl=").append(headUrl);
        sb.append(", deptId=").append(deptId);
        sb.append(", postId=").append(postId);
        sb.append(", description=").append(description);
        sb.append(", status=").append(status);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append(", isDeleted=").append(isDeleted);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * 用户没有过期
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public String getUsername(){
        return username;
    }
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * 用户没有锁定
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 用户凭证没有过期
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 用户是否启用
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
```

创建角色枚举：

```java
package org.pp.boot3.domain.enums;

/**
 * 用户角色信息枚举
 * @author ss_419
 */

public enum Role {

  USER,
  ADMIN
}
```

5.配置Security以启用上面配置的JwtAuthenticationFilter

```java
package org.pp.boot3.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

/**
 * TODO 安全配置
 *
 * @author ss_419
 * @version 1.0
 * @date 2023/3/3 14:04
 */
@Configuration
@EnableWebSecurity// 开启网络安全注解
@RequiredArgsConstructor
public class SecurityConfiguration {
    // 将自定义JwtAuthenticationFilter注入
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // 在ApplicationConfig中提供Bean
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            //禁用csrf(防止跨站请求伪造攻击)
                .csrf()
                .disable()
                // 设置白名单
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/auth/**")
                .permitAll()
                // 对于其他任何请求，都保护起来
                .anyRequest()
                .authenticated()
                .and()
                // 禁用缓存
                .sessionManagement()
                // 使用无状态session，即不使用session缓存数据
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // 添加身份验证
                .and()
                // TODO 添加身份验证1
                .authenticationProvider(authenticationProvider)
                // 添加JWT过滤器
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                // 登出操作
                .logout()
                .logoutUrl("/api/v1/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        ;


        return http.build();
    }
}
```

定义请求响应实体

```java
/**
 * 验证请求实体
 * @author ss_419
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

  private String username;
  String password;
}
```

```java
/**
 * 请求响应实体
 * @author ss_419
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

  private String token;
}
```

```java
/**
 * 注册请求实体
 * @author ss_419
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstname;
  private String lastname;
  private String username;
  private String password;
}
```

定义注册认证服务

```java
import org.pp.boot3.domain.AuthenticationRequest;
import org.pp.boot3.domain.AuthenticationResponse;
import org.pp.boot3.domain.RegisterRequest;
import org.pp.boot3.domain.SysUser;

/**
 * 授权测试服务
 * @author ss_419
 */
public interface AuthenticationService {
    /**
     * 注册
     * @param request
     * @return
     */
   public AuthenticationResponse register(RegisterRequest request);

    /**
     * 登录｜认证
     * @param request
     * @return
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request);

    /**
     * 保存用户token信息
     * @param user
     * @param jwtToken
     */
//    void saveUserToken(SysUser user, String jwtToken);
    /**
     * 删除用户token信息
     * @param user
     */
//    void revokeAllUserTokens(SysUser user);
}
```

```java
/**
 * TODO
 *
 * @author ss_419
 * @version 1.0
 * @date 2023/3/3 14:27
 */
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final SysUserMapper repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RedisCache redisCache;
    private final AuthenticationManager authenticationManager;
    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        SysUser user = SysUser.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.insert(user);
        String jwtToken = jwtService.generateToken(user);
        // 将token存储
        redisCache.setCacheObject("token:" ,jwtToken);
        // 将token返回响应
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        SysUser user = repository.findByUsername(request.getUsername());
        var jwtToken = jwtService.generateToken(user);
        // 将token存储
        redisCache.setCacheObject("token:" ,jwtToken);
        // 将token返回响应
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    private void saveUserToken(SysUser user, String jwtToken) {

    }


    private void revokeAllUserTokens(SysUser user) {

    }
}
```