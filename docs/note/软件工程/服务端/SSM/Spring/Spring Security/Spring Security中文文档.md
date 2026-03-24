# [Spring Security中文文档(点击进入官网)](https://www.springcloud.cc/spring-security.html)

本文档的副本可供您自己使用并分发给他人，前提是您不对此类副本收取任何费用，并且每份副本均包含本版权声明，无论是以印刷版还是电子版分发。

---

Spring Security是一个框架，提供针对常见攻击的身份验证，授权和保护。通过对命令式和反应式应用程序的一流支持，它是保护基于Spring的应用程序的事实标准。

# [](https://www.springcloud.cc/spring-security.html#preface)第一部分前言

本节讨论Spring Security的后勤问题。

## [](https://www.springcloud.cc/spring-security.html#community)1. Spring Security社区

欢迎来到Spring Security社区！本节讨论如何充分利用我们庞大的社区。

### [](https://www.springcloud.cc/spring-security.html#community-help)1.1获得帮助

如果您需要Spring Security的帮助，我们随时为您提供帮助。以下是获得帮助的一些最佳步骤：

- 阅读我们的参考文档
- 尝试我们的许多示例应用程序之一
- 使用标签`spring-security` 在[https://stackoverflow.com](https://stackoverflow.com/)上 提问
- 通过[https://github.com/spring-projects/spring-security/issues](https://github.com/spring-projects/spring-security/issues)报告错误和增强请求[](https://github.com/spring-projects/spring-security/issues)

### [](https://www.springcloud.cc/spring-security.html#community-becoming-involved)1.2成为参与者

我们欢迎您参与Spring Security项目。有很多贡献方式，包括回答StackOverflow上的问题，编写新代码，改进现有代码，协助编写文档，开发示例或教程，报告错误或简单地提出建议。

### [](https://www.springcloud.cc/spring-security.html#community-source)1.3源代码

Spring Security的源代码可以在GitHub上找到[https://github.com/spring-projects/spring-security/](https://github.com/spring-projects/spring-security/)

### [](https://www.springcloud.cc/spring-security.html#community-license)1.4 Apache 2许可证

Spring Security是在[Apache 2.0许可](https://www.apache.org/licenses/LICENSE-2.0.html)下发布的开源软件。

### [](https://www.springcloud.cc/spring-security.html#social-media)1.5社交媒体

您可以在Twitter上关注[@SpringSecurity](https://twitter.com/SpringSecurity)和[Spring Security团队](https://twitter.com/SpringSecurity/lists/team)以及时了解最新消息。您还可以关注[@SpringCentral](https://twitter.com/SpringCentral)以了解整个Spring投资组合的最新信息。

## [](https://www.springcloud.cc/spring-security.html#new)2. Spring Security 5.1中的新内容

Spring Security 5.1提供了许多新功能。以下是该版本的亮点。

### [](https://www.springcloud.cc/spring-security.html#servlet)2.1 Servlet

- 通过[UserDetailsPasswordService](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/userdetails/UserDetailsPasswordService.html)自动升级密码存储[](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/userdetails/UserDetailsPasswordService.html)
- [OAuth 2.0客户端](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2webclient)
    
    - 可自定义的授权和令牌请求
    - `authorization_code`给予支持
    - `client_credentials`给予支持
    
- OAuth 2.0资源服务器 - 支持[JWT编码的承载令牌](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2resourceserver)
- 添加了OAuth2 [WebClient](https://www.springcloud.cc/spring-security.html#servlet-webclient "13.用于Servlet环境的WebClient")集成
- [HTTP防火墙](https://www.springcloud.cc/spring-security.html#request-matching "10.1.4请求匹配和HttpFirewall")可防止HTTP动词篡改和跨站点跟踪
- [ExceptionTranslationFilter](https://www.springcloud.cc/spring-security.html#exception-translation-filter "10.2.2 ExceptionTranslationFilter")支持通过`RequestMatcher`选择`AccessDeniedHandler`
- [CSRF](https://www.springcloud.cc/spring-security.html#csrf "10.6跨站请求伪造（CSRF）")支持排除某些请求
- 添加了对[功能策略的](https://www.springcloud.cc/spring-security.html#headers-feature "Feature Policy")支持[](https://www.springcloud.cc/spring-security.html#headers-feature "功能政策")
- 添加了[@Transient](https://docs.spring.io/spring-security/site/docs/current/api/core/src/main/java/org/springframework/security/core/Transient.java)身份验证令牌
- 默认登录页面的现代外观

### [](https://www.springcloud.cc/spring-security.html#webflux)2.2 WebFlux

- 通过[ReactiveUserDetailsPasswordService](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/userdetails/ReactiveUserDetailsPasswordService.html)自动升级密码存储[](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/userdetails/ReactiveUserDetailsPasswordService.html)
- 添加了[OAuth2](https://www.springcloud.cc/spring-security.html#webflux-oauth2 "19. OAuth2 WebFlux")支持
    
    - 添加了[OAuth2客户端](https://www.springcloud.cc/spring-security.html#webflux-oauth2-client "19.2 OAuth2客户端")支持
    - 添加了[OAuth2资源服务器](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server "19.3 OAuth2资源服务器")支持
    - 添加了OAuth2 [WebClient](https://www.springcloud.cc/spring-security.html#webclient "21. WebClient")集成
    
- `@WithUserDetails` [现在适用](https://www.springcloud.cc/spring-security.html#test-method-withuserdetails "9.1.4 @WithUserDetails")于`ReactiveUserDetailsService`
- 添加了[CORS](https://www.springcloud.cc/spring-security.html#)支持
- 添加了对以下[HTTP标头的](https://www.springcloud.cc/spring-security.html#webflux-headers)支持[](https://www.springcloud.cc/spring-security.html#webflux-headers)
    
    - [内容安全政策](https://www.springcloud.cc/spring-security.html#webflux-headers-csp "17.6内容安全策略（CSP）")
    - [功能政策](https://www.springcloud.cc/spring-security.html#webflux-headers-feature "17.8功能政策")
    - [推荐人政策](https://www.springcloud.cc/spring-security.html#webflux-headers-referrer "17.7推荐人政策")
    
- [重定向到HTTPS](https://www.springcloud.cc/spring-security.html#webflux-redirect-https "18.重定向到HTTPS")
- [@AuthenticationPrincipal的](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/annotation/AuthenticationPrincipal.html)改进[](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/annotation/AuthenticationPrincipal.html)
    
    - 支持解析bean
    - 支持解决`errorOnInvalidType`
    

### [](https://www.springcloud.cc/spring-security.html#integrations)2.3整合

- [Jackson支持](https://www.springcloud.cc/spring-security.html#jackson "8.2.4杰克逊支持")适用于`BadCredentialsException`
- `@WithMockUser` [支持](https://www.springcloud.cc/spring-security.html#test-method-withmockuser "9.1.2 @WithMockUser")在测试中设置`SecurityContext`时进行自定义。例如，`@WithMockUser(setupBefore = TestExecutionEvent.TEST_EXECUTION)`将在JUnit的`@Before`之后和测试执行之前设置用户。
- [](https://www.springcloud.cc/spring-security.html#ldap "12.3 LDAP认证")可以使用自定义环境变量配置 [LDAP身份验证](https://www.springcloud.cc/spring-security.html#ldap "12.3 LDAP Authentication")
- [X.509身份验证](https://www.springcloud.cc/spring-security.html#x509 "13.8 X.509认证")支持将主体派生为策略

## [](https://www.springcloud.cc/spring-security.html#get-spring-security)3.获得Spring Security

本节讨论了获取Spring Security二进制文件时需要了解的所有信息。有关如何获取源代码[，](https://www.springcloud.cc/spring-security.html#community-source "1.3源代码")请参见[第1.3节“源代码”](https://www.springcloud.cc/spring-security.html#community-source "1.3 Source Code")。

### [](https://www.springcloud.cc/spring-security.html#release-numbering)3.1发布编号

Spring Security版本的格式为MAJOR.MINOR.PATCH

- 主要版本可能包含重大更改。通常这些是为了提供改进的安全性以匹配现代安全实践。
- MINOR版本包含增强功能，但被视为被动更新
- PATCH级别应该完全兼容，前向和后向，可能的例外是修复错误

### [](https://www.springcloud.cc/spring-security.html#maven)3.2使用Maven

像大多数开源项目一样，Spring Security将其依赖项部署为Maven工件。以下部分提供了有关如何在使用Maven时使用Spring Security的详细信息。

#### [](https://www.springcloud.cc/spring-security.html#spring-boot-with-maven)3.2.1 Spring Boot与Maven

Spring Boot提供了一个spring-boot-starter-security启动程序，它将Spring Security相关的依赖项聚合在一起。利用启动器的最简单和首选方法是使用IDE集成（[Eclipse](http://joshlong.com/jl/blogPost/tech_tip_geting_started_with_spring_boot.html)，[IntelliJ](https://www.jetbrains.com/help/idea/spring-boot.html#d1489567e2)，[NetBeans](https://github.com/AlexFalappa/nb-springboot/wiki/Quick-Tour)）或通过[https://start.spring.io](https://start.spring.io/)使用[Spring Initializr](https://docs.spring.io/initializr/docs/current/reference/htmlsingle/)。[](http://joshlong.com/jl/blogPost/tech_tip_geting_started_with_spring_boot.html)[](https://www.jetbrains.com/help/idea/spring-boot.html#d1489567e2)[](https://github.com/AlexFalappa/nb-springboot/wiki/Quick-Tour)[](https://start.spring.io/)

或者，可以手动添加启动器：

**pom.xml中。** 

<dependencies>
    <!-- ... other dependency elements ... -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>

由于Spring Boot提供Maven BOM来管理依赖版本，因此无需指定版本。如果您希望覆盖Spring Security版本，可以通过提供Maven属性来实现：

**pom.xml中。** 

<properties>
    <!-- ... -->
    <spring-security.version>5.1.2.RELEASE</spring-security.version>
</dependencies>

由于Spring Security仅在主要版本中进行重大更改，因此使用Spring Security和Spring Boot的较新版本是安全的。但是，有时可能还需要更新Spring Framework的版本。这可以通过添加Maven属性轻松完成：

**pom.xml中。** 

<properties>
    <!-- ... -->
    <spring.version>5.1.3.RELEASE</spring.version>
</dependencies>

如果您正在使用LDAP，OpenID等其他功能，则还需要包含相应的[第4章“ _项目模块”_](https://www.springcloud.cc/spring-security.html#modules "4.项目模块")。

#### [](https://www.springcloud.cc/spring-security.html#maven-without-spring-boot)3.2.2没有Spring Boot的Maven

使用不带Spring Boot的Spring Security时，首选方法是利用Spring Security的BOM来确保在整个项目中使用Spring Security的一致版本。

**pom.xml中。** 

<dependencyManagement>
    <dependencies>
        <!-- ... other dependency elements ... -->
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-bom</artifactId>
            <version>5.1.2.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

最小Spring Security Maven依赖项集通常如下所示：

**pom.xml中。** 

<dependencies>
    <!-- ... other dependency elements ... -->
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-config</artifactId>
    </dependency>
</dependencies>

如果您正在使用LDAP，OpenID等其他功能，则还需要包含相应的[第4章“ _项目模块”_](https://www.springcloud.cc/spring-security.html#modules "4.项目模块")。

Spring Security建立在Spring Framework 5.1.3.RELEASE之上，但通常应该适用于任何较新版本的Spring Framework 5.x许多用户将遇到的问题是Spring Security的传递依赖性解决了Spring Framework 5.1.3.RELEASE可能导致奇怪的类路径问题。解决此问题的最简单方法是使用`pom.xml`的`<dependencyManagement>`部分中的`spring-framework-bom`，如下所示：

**pom.xml中。** 

<dependencyManagement>
    <dependencies>
        <!-- ... other dependency elements ... -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-framework-bom</artifactId>
            <version>5.1.3.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

这将确保Spring Security的所有传递依赖性使用Spring 5.1.3.RELEASE模块。

|                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![[注意]](https://www.springcloud.cc/images/note.png)                                                                                                                         |
| 这种方法使用Maven的“物料清单”（BOM）概念，仅适用于Maven 2.0.9+。有关如何解析依赖关系的其他详细信息，请参阅[Maven的依赖关系机制简介文档](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)。 |

### [](https://www.springcloud.cc/spring-security.html#maven-repositories)3.2.3 Maven Repositories

所有GA版本（即以.RELEASE结尾的版本）都部署到Maven Central，因此不需要在您的pom中声明其他Maven存储库。

如果您使用的是SNAPSHOT版本，则需要确保定义了Spring快照存储库，如下所示：

**pom.xml中。** 

<repositories>
    <!-- ... possibly other repository elements ... -->
    <repository>
        <id>spring-snapshot</id>
        <name>Spring Snapshot Repository</name>
        <url>https://repo.spring.io/snapshot</url>
    </repository>
</repositories>

如果您使用里程碑或候选发布版本，则需要确保定义了Spring Milestone存储库，如下所示：

**pom.xml中。** 

<repositories>
    <!-- ... possibly other repository elements ... -->
    <repository>
        <id>spring-milestone</id>
        <name>Spring Milestone Repository</name>
        <url>https://repo.spring.io/milestone</url>
    </repository>
</repositories>

## [](https://www.springcloud.cc/spring-security.html#gradle)3.3 Gradle

像大多数开源项目一样，Spring Security将其依赖关系部署为Maven工件，允许获得一流的Gradle支持。以下部分提供有关如何在使用Gradle时使用Spring Security的详细信息。

### [](https://www.springcloud.cc/spring-security.html#spring-boot-with-gradle)3.3.1 Spring Boot与Gradle

Spring Boot提供了一个spring-boot-starter-security启动程序，它将Spring Security相关的依赖项聚合在一起。利用启动器的最简单和首选方法是使用IDE集成（[Eclipse](http://joshlong.com/jl/blogPost/tech_tip_geting_started_with_spring_boot.html)，[IntelliJ](https://www.jetbrains.com/help/idea/spring-boot.html#d1489567e2)，[NetBeans](https://github.com/AlexFalappa/nb-springboot/wiki/Quick-Tour)）或通过[https://start.spring.io](https://start.spring.io/)使用[Spring Initializr](https://docs.spring.io/initializr/docs/current/reference/htmlsingle/)。[](http://joshlong.com/jl/blogPost/tech_tip_geting_started_with_spring_boot.html)[](https://www.jetbrains.com/help/idea/spring-boot.html#d1489567e2)[](https://github.com/AlexFalappa/nb-springboot/wiki/Quick-Tour)[](https://start.spring.io/)

或者，可以手动添加启动器：

**的build.gradle。** 

dependencies {
    compile "org.springframework.boot:spring-boot-starter-security"
}

由于Spring Boot提供Maven BOM来管理依赖版本，因此无需指定版本。如果您希望覆盖Spring Security版本，可以通过提供Gradle属性来执行此操作：

**的build.gradle。** 

ext['spring-security.version']='5.1.2.RELEASE'

由于Spring Security仅在主要版本中进行重大更改，因此使用Spring Security和Spring Boot的较新版本是安全的。但是，有时可能还需要更新Spring Framework的版本。这也可以通过添加Gradle属性轻松完成：

**的build.gradle。** 

ext['spring.version']='5.1.3.RELEASE'

如果您正在使用LDAP，OpenID等其他功能，则还需要包含相应的[第4章“ _项目模块”_](https://www.springcloud.cc/spring-security.html#modules "4.项目模块")。

### [](https://www.springcloud.cc/spring-security.html#gradle-without-spring-boot)3.3.2没有Spring Boot的Gradle

使用不带Spring Boot的Spring Security时，首选方法是利用Spring Security的BOM来确保在整个项目中使用Spring Security的一致版本。这可以通过使用[Dependency Management Plugin](https://github.com/spring-gradle-plugins/dependency-management-plugin)来完成。

**的build.gradle。** 

plugins {
    id "io.spring.dependency-management" version "1.0.6.RELEASE"
}

dependencyManagement {
    imports {
        mavenBom 'org.springframework.security:spring-security-bom:5.1.2.RELEASE'
    }
}

最小Spring Security Maven依赖项集通常如下所示：

**的build.gradle。** 

dependencies {
    compile "org.springframework.security:spring-security-web"
    compile "org.springframework.security:spring-security-config"
}

如果您正在使用LDAP，OpenID等其他功能，则还需要包含相应的[第4章“ _项目模块”_](https://www.springcloud.cc/spring-security.html#modules "4.项目模块")。

Spring Security建立在Spring Framework 5.1.3.RELEASE之上，但通常应该适用于任何较新版本的Spring Framework 5.x许多用户将遇到的问题是Spring Security的传递依赖性解决了Spring Framework 5.1.3.RELEASE可能导致奇怪的类路径问题。解决此问题的最简单方法是在`pom.xml`的`<dependencyManagement>`部分中使用`spring-framework-bom`，如下所示：这可以通过使用[依赖关系管理插件](https://github.com/spring-gradle-plugins/dependency-management-plugin)来完成。

**的build.gradle。** 

plugins {
    id "io.spring.dependency-management" version "1.0.6.RELEASE"
}

dependencyManagement {
    imports {
        mavenBom 'org.springframework:spring-framework-bom:5.1.3.RELEASE'
    }
}

这将确保Spring Security的所有传递依赖性使用Spring 5.1.3.RELEASE模块。

### [](https://www.springcloud.cc/spring-security.html#gradle-repositories)3.3.3 Gradle Repositories

所有GA版本（即以.RELEASE结尾的版本）都部署到Maven Central，因此使用mavenCentral（）存储库足以支持GA版本。

**的build.gradle。** 

repositories {
    mavenCentral()
}

如果您使用的是SNAPSHOT版本，则需要确保定义了Spring快照存储库，如下所示：

**的build.gradle。** 

repositories {
    maven { url 'https://repo.spring.io/snapshot' }
}

如果您使用里程碑或候选发布版本，则需要确保定义了Spring Milestone存储库，如下所示：

**的build.gradle。** 

repositories {
    maven { url 'https://repo.spring.io/milestone' }
}

## [](https://www.springcloud.cc/spring-security.html#modules)4.项目模块

在Spring Security 3.0中，代码库被细分为单独的jar，它们更清楚地区分不同的功能区域和第三方依赖项。如果您使用Maven构建项目，那么这些是您将添加到`pom.xml`的模块。即使您没有使用Maven，我们也建议您查阅`pom.xml`文件以了解第三方依赖项和版本。或者，一个好主意是检查示例应用程序中包含的库。

### [](https://www.springcloud.cc/spring-security.html#spring-security-core)4.1核心 - spring-security-core .jar

包含核心身份验证和access-contol类和接口，远程支持和基本配置API。任何使用Spring Security的应用程序都需要。支持独立应用程序，远程客户端，方法（服务层）安全性和JDBC用户配置。包含顶级包：

- `org.springframework.security.core`
- `org.springframework.security.access`
- `org.springframework.security.authentication`
- `org.springframework.security.provisioning`

### [](https://www.springcloud.cc/spring-security.html#spring-security-remoting)4.2 Remoting - spring-security-remoting。jar

提供与Spring Remoting的整合。除非您正在编写使用Spring远程处理的远程客户端，否则您不需要此操作。主要包是`org.springframework.security.remoting`。

### [](https://www.springcloud.cc/spring-security.html#spring-security-web)4.3 Web - spring-security-web。jar

包含过滤器和相关的web - 安全基础结构代码。任何具有servlet API依赖性的东西。如果您需要Spring Security web身份验证服务和基于URL的访问控制，则需要它。主要包是`org.springframework.security.web`。

### [](https://www.springcloud.cc/spring-security.html#spring-security-config)4.4配置 - spring-security-config .jar

包含安全名称空间解析代码和Java配置代码。如果您使用Spring Security XML命名空间进行配置或Spring Security的Java配置支持，则需要它。主要包是`org.springframework.security.config`。这些类都不打算直接用于应用程序。

### [](https://www.springcloud.cc/spring-security.html#spring-security-ldap)4.5 LDAP - spring-security-ldap。jar

LDAP身份验证和配置代码。如果需要使用LDAP身份验证或管理LDAP用户条目，则为必需。顶级包是`org.springframework.security.ldap`。

### [](https://www.springcloud.cc/spring-security.html#spring-security-oauth2-core)4.6 OAuth 2.0核心 - spring-security-oauth2-core.jar

`spring-security-oauth2-core.jar`包含为 _OAuth 2.0授权框架_ 和 _OpenID Connect Core 1.0_  提供支持的核心类和接口。使用 _OAuth 2.0_ 或 _OpenID Connect Core 1.0_ 的应用程序（例如客户端，资源服务器和授权服务器）需要它。顶级包是`org.springframework.security.oauth2.core`。

### [](https://www.springcloud.cc/spring-security.html#spring-security-oauth2-client)4.7 OAuth 2.0客户端 - spring-security-oauth2-client.jar

`spring-security-oauth2-client.jar`是Spring Security对_OAuth 2.0授权框架_和_OpenID Connect Core 1.0_的客户端支持。应用程序需要利用**OAuth 2.0登录**和/或OAuth客户端支持。顶级包是`org.springframework.security.oauth2.client`。

### [](https://www.springcloud.cc/spring-security.html#spring-security-oauth2-jose)4.8 OAuth 2.0 JOSE - spring-security-oauth2-jose.jar

`spring-security-oauth2-jose.jar`包含Spring Security对_JOSE_（Javascript对象签名和加密）框架的支持。的_圣何塞_框架旨在提供安全地传输双方之间的权利要求的方法。它由一系列规范构建：

- JSON Web令牌（JWT）
- JSON Web签名（JWS）
- JSON Web加密（JWE）
- JSON Web密钥（JWK）

它包含顶级包：

- `org.springframework.security.oauth2.jwt`
- `org.springframework.security.oauth2.jose`

### [](https://www.springcloud.cc/spring-security.html#spring-security-acl)4.9 ACL - spring-security-acl。jar

专门的域对象ACL实现。用于将安全性应用于应用程序中的特定域对象实例。顶级包是`org.springframework.security.acls`。

### [](https://www.springcloud.cc/spring-security.html#spring-security-cas)4.10 CAS - spring-security-cas .jar

Spring Security CAS客户端集成。如果要对CAS单点登录服务器使用Spring Security web身份验证。顶级包是`org.springframework.security.cas`。

### [](https://www.springcloud.cc/spring-security.html#spring-security-openid)4.11 OpenID - spring-security-openid .jar

OpenID web身份验证支持。用于针对外部OpenID服务器对用户进行身份验证。`org.springframework.security.openid`.需要OpenID4Java。

### [](https://www.springcloud.cc/spring-security.html#spring-security-test)4.12测试 - spring-security-test.jar

支持使用Spring Security进行测试。

## [](https://www.springcloud.cc/spring-security.html#sample-apps)5.样本申请

项目中有几个示例web应用程序。为避免过大的下载，分发zip文件中仅包含“教程”和“联系人”示例。其他可以直接从您可以获得的源构建，如介绍中[所述](https://www.springcloud.cc/spring-security.html#)。自己构建项目很容易，有关项目web站点[http://spring.io/spring-security/](https://spring.io/spring-security/)的更多信息。本章中提到的所有路径都与项目源目录相关。

### [](https://www.springcloud.cc/spring-security.html#tutorial-sample)5.1教程样本

教程示例是一个很好的基本示例，可帮助您入门。它始终使用简单的命名空间配置 已编译的应用程序包含在分发zip文件中，可以部署到web容器（`spring-security-samples-tutorial-3.1.x.war`）中。基于[表单的](https://www.springcloud.cc/spring-security.html#ns-form-and-basic "7.2.3表单和基本登录选项")身份验证机制与常用的[记住我](https://www.springcloud.cc/spring-security.html#remember-me "10.5记住我的身份验证")身份验证提供程序结合使用，以使用cookie自动记住登录。

我们建议您从教程示例开始，因为XML很小且易于遵循。最重要的是，您可以轻松地将这一个XML文件（及其相应的`web.xml`条目）添加到现有应用程序中。只有在实现此基本集成时，我们才建议您尝试添加方法授权或域对象安全性。

### [](https://www.springcloud.cc/spring-security.html#contacts-sample)5.2联系人

Contacts Sample是一个高级示例，它说明了除基本应用程序安全性之外的域对象访问控制列表（ACL）的更强大功能。该应用程序提供了一个界面，用户可以使用该界面管理简单的联系人数据库（域对象）。

要进行部署，只需将WAR文件从Spring Security发行版复制到容器的`webapps`目录中。战争应该被称为`spring-security-samples-contacts-3.1.x.war`（附加的版本号将根据您使用的版本而有所不同）。

启动容器后，检查应用程序是否可以加载。访问[http：// localhost：8080 / contacts](http://localhost:8080/contacts)（或适用于您的web容器和您部署的WAR的URL）。

接下来，单击“调试”。系统将提示您进行身份验证，并在该页面上建议一系列用户名和密码。只需使用其中任何一个进行身份验证即可查看生成的页面。它应包含类似于以下内容的成功消息：

Security Debug Information

Authentication object is of type:
org.springframework.security.authentication.UsernamePasswordAuthenticationToken

Authentication object as a String:

org.springframework.security.authentication.UsernamePasswordAuthenticationToken@1f127853:
Principal: org.springframework.security.core.userdetails.User@b07ed00: Username: rod; \
Password: [PROTECTED]; Enabled: true; AccountNonExpired: true;
credentialsNonExpired: true; AccountNonLocked: true; \
Granted Authorities: ROLE_SUPERVISOR, ROLE_USER; \
Password: [PROTECTED]; Authenticated: true; \
Details: org.springframework.security.web.authentication.WebAuthenticationDetails@0: \
RemoteIpAddress: 127.0.0.1; SessionId: 8fkp8t83ohar; \
Granted Authorities: ROLE_SUPERVISOR, ROLE_USER

Authentication object holds the following granted authorities:

ROLE_SUPERVISOR (getAuthority(): ROLE_SUPERVISOR)
ROLE_USER (getAuthority(): ROLE_USER)

Success! Your web filters appear to be properly configured!

成功收到上述消息后，返回示例应用程序的主页并单击“管理”。然后，您可以试用该应用程序。请注意，仅显示当前登录用户可用的联系人，并且只有`ROLE_SUPERVISOR`的用户才有权删除其联系人。在幕后，`MethodSecurityInterceptor`正在保护业务对象。

该应用程序允许您修改与不同联系人关联的访问控制列表。请务必通过查看应用程序上下文XML文件来尝试并了解其工作原理。

### [](https://www.springcloud.cc/spring-security.html#ldap-sample)5.3 LDAP示例

LDAP示例应用程序提供基本配置，并使用传统bean在同一应用程序上下文文件中设置命名空间配置和等效配置。这意味着在此应用程序中实际配置了两个相同的身份验证提供程

### [](https://www.springcloud.cc/spring-security.html#openid-sample)5.4 OpenID示例

OpenID示例演示了如何使用命名空间配置OpenID以及如何为Google，Yahoo和MyOpenID身份提供程序设置[属性交换](https://openid.net/specs/openid-attribute-exchange-1_0.html)配置（如果愿意，可以尝试添加其他配置）。它使用基于JQuery的[openid-selector](https://code.google.com/p/openid-selector/)项目来提供用户友好的登录页面，允许用户轻松选择提供者，而不是键入完整的OpenID标识符。

该应用程序与普通身份验证方案的不同之处在于，它允许任何用户访问该站点（前提是他们的OpenID身份验证成功）。第一次登录时，您将收到“欢迎[您的姓名]”消息。如果您注销并重新登录（具有相同的OpenID身份），则应更改为“欢迎回来”。这是通过使用custom `UserDetailsService`，它为任何用户分配一个标准角色，并在内部将身份存储在一个地图中。显然，真正的应用程序会使用数据库。请查看源表单的更多信息。这个类还考虑了这个事实可以从不同的提供程序返回不同的属性，并构建用于相应地向用户发出的名称。

### [](https://www.springcloud.cc/spring-security.html#cas-sample)5.5 CAS样品

CAS示例要求您同时运行CAS服务器和CAS客户端。它不包含在发布包里，你的描述应该检查项目代码[的介绍](https://www.springcloud.cc/spring-security.html#)。您将在`sample/cas`目录下找到相关文件。还有一个`Readme.txt`文件，解释了如何直接从源代码树运行服务器和客户端，完成SSL支持。

### [](https://www.springcloud.cc/spring-security.html#jaas-sample)5.6 JAAS样本

JAAS示例是如何将JAAS LoginModule与Spring Security一起使用的非常简单的示例。如果用户名等于密码，则提供的LoginModule将成功验证用户，否则抛出LoginException。本示例中使用的AuthorityGranter始终授予角色ROLE_USER。示例应用程序还演示了如何通过将[jaas-api-provision](https://www.springcloud.cc/spring-security.html#nsa-http-jaas-api-provision)设置为“true” 来作为LoginModule返回的JAAS主题运行。

### [](https://www.springcloud.cc/spring-security.html#preauth-sample)5.7预认证样本

此示例应用程序演示了如何从[预身份验证](https://www.springcloud.cc/spring-security.html#preauth "12.2预认证方案")框架中连接Bean 以使用来自Java EE容器的登录信息。用户名和角色是容器设置的用户名和角色。

代码在`samples/preauth`。

# [](https://www.springcloud.cc/spring-security.html#servlet-applications)第二部分。Servlet应用程序

## [](https://www.springcloud.cc/spring-security.html#jc)6. Java配置

在Spring 3.1中，Spring Framework添加了对[Java配置的](https://docs.spring.io/spring/docs/3.1.x/spring-framework-reference/html/beans.html#beans-java)一般支持。自Spring Security 3.2以来，Spring Security Java配置支持使用户无需使用任何XML即可轻松配置Spring Security。

如果您熟悉[第7章_安全命名空间配置，_](https://www.springcloud.cc/spring-security.html#ns-config "7.安全命名空间配置")那么您应该发现它与安全Java配置支持之间有很多相似之处。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|Spring Security提供了[许多](https://github.com/spring-projects/spring-security/tree/master/samples/javaconfig)演示使用Spring Security Java配置[的示例应用程序](https://github.com/spring-projects/spring-security/tree/master/samples/javaconfig)。|

### [](https://www.springcloud.cc/spring-security.html#hello-web-security-java-configuration)6.1 Hello Web安全Java配置

第一步是创建我们的Spring Security Java配置。该配置创建一个称为`springSecurityFilterChain`的Servlet过滤器，它负责应用程序中的所有安全性（保护应用程序URL，验证提交的用户名和密码，重定向到登录表单等）。您可以在下面找到Spring Security Java配置的最基本示例：
```java
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;

_@EnableWebSecurity_
public class WebSecurityConfig implements WebMvcConfigurer {

    _@Bean_
    public UserDetailsService userDetailsService() throws Exception {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(User.withDefaultPasswordEncoder().username("user").password("password").roles("USER").build());
        return manager;
    }
}
```

这种配置确实没什么用，但它做了很多。您可以在下面找到以下功能的摘要：

- 要求对应用程序中的每个URL进行身份验证
- 为您生成登录表单
- 允许具有**Username** _用户_和**密码** _密码_的用户使用基于表单的身份验证进行身份验证
- 允许用户注销
- [CSRF攻击](https://en.wikipedia.org/wiki/Cross-site_request_forgery)预防
- [会话固定](https://en.wikipedia.org/wiki/Session_fixation)保护
- 安全标头集成
    
    - [](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)用于安全请求的 [HTTP严格传输安全性](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
    - [X-Content-Type-Options](https://msdn.microsoft.com/en-us/library/ie/gg622941(v=vs.85).aspx)集成
    - 缓存控制（稍后可由应用程序覆盖以允许缓存静态资源）
    - [X-XSS-Protection](https://msdn.microsoft.com/en-us/library/dd565647(v=vs.85).aspx)集成
    - X-Frame-Options集成有助于防止[Clickjacking](https://en.wikipedia.org/wiki/Clickjacking)
    
- 与以下Servlet API方法集成
    
    - [HttpServletRequest的＃getRemoteUser（）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#getRemoteUser())
    - [HttpServletRequest.html＃getUserPrincipal（）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#getUserPrincipal())
    - [HttpServletRequest.html＃的isUserInRole（java.lang.String中）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#isUserInRole(java.lang.String))
    - [HttpServletRequest.html＃login（java.lang.String，java.lang.String）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#login(java.lang.String,%20java.lang.String))
    - [HttpServletRequest.html＃注销（）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#logout())
    

#### [](https://www.springcloud.cc/spring-security.html#abstractsecuritywebapplicationinitializer)6.1.1 AbstractSecurityWebApplicationInitializer

下一步是在战争中注册`springSecurityFilterChain`。这可以在Java配置中使用[Spring](https://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-container-config)在Servlet 3.0+环境中[的WebApplicationInitializer支持](https://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-container-config)来完成。毫不奇怪，Spring Security提供了一个基类`AbstractSecurityWebApplicationInitializer`，可确保`springSecurityFilterChain`为您注册。我们使用`AbstractSecurityWebApplicationInitializer`的方式取决于我们是否已经使用Spring或者Spring Security是我们应用程序中唯一的Spring组件。

- [第6.1.2节“没有现有的AbstractSecurityWebApplicationInitializer Spring”](https://www.springcloud.cc/spring-security.html#abstractsecuritywebapplicationinitializer-without-existing-spring "6.1.2没有现有Spring的AbstractSecurityWebApplicationInitializer") - 如果您还没有使用Spring，请使用这些说明
- [第6.1.3节“使用Spring MVC的AbstractSecurityWebApplicationInitializer”](https://www.springcloud.cc/spring-security.html#abstractsecuritywebapplicationinitializer-with-spring-mvc "6.1.3使用Spring MVC的AbstractSecurityWebApplicationInitializer") - 如果您已经在使用Spring，请使用这些说明

#### [](https://www.springcloud.cc/spring-security.html#abstractsecuritywebapplicationinitializer-without-existing-spring)6.1.2没有现有Spring的AbstractSecurityWebApplicationInitializer

如果您不使用Spring或Spring MVC，则需要将`WebSecurityConfig`传入超类以确保获取配置。你可以在下面找到一个例子：

import org.springframework.security.web.context.*;

public class SecurityWebApplicationInitializer
    extends AbstractSecurityWebApplicationInitializer {

    public SecurityWebApplicationInitializer() {
        super(WebSecurityConfig.class);
    }
}

`SecurityWebApplicationInitializer`将执行以下操作：

- 自动为应用程序中的每个URL注册springSecurityFilterChain过滤器
- 添加一个加载[WebSecurityConfig](https://www.springcloud.cc/spring-security.html#jc-hello-wsca)的ContextLoaderListener 。

#### [](https://www.springcloud.cc/spring-security.html#abstractsecuritywebapplicationinitializer-with-spring-mvc)6.1.3使用Spring MVC的AbstractSecurityWebApplicationInitializer

如果我们在我们的应用程序的其他地方使用Spring，我们可能已经有`WebApplicationInitializer`正在加载我们的Spring配置。如果我们使用以前的配置，我们会收到错误。相反，我们应该使用现有的`ApplicationContext`注册Spring Security。例如，如果我们使用Spring MVC，我们的`SecurityWebApplicationInitializer`将如下所示：

```java
import org.springframework.security.web.context.*;

public class SecurityWebApplicationInitializer
    extends AbstractSecurityWebApplicationInitializer {

}
```

这只会为应用程序中的每个URL注册springSecurityFilterChain过滤器。之后，我们将确保在我们现有的ApplicationInitializer中加载`WebSecurityConfig`。例如，如果我们使用Spring MVC，它将被添加到`getRootConfigClasses()`中

[](https://www.springcloud.cc/spring-security.html#message-web-application-inititializer-java)
```java
public class MvcWebApplicationInitializer extends
        AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[] { WebSecurityConfig.class };
    }

    // ... other overrides ...
}
```

#@# [](https://www.springcloud.cc/spring-security.html#jc-httpsecurity)6.2 HttpSecurity

到目前为止，我们的[WebSecurityConfig](https://www.springcloud.cc/spring-security.html#jc-hello-wsca)仅包含有关如何验证用户身份的信息。Spring Security如何知道我们要求所有用户都经过身份验证？Spring Security如何知道我们想要支持基于表单的身份验证？原因是`WebSecurityConfigurerAdapter`在`configure(HttpSecurity http)`方法中提供了一个默认配置，如下所示：

```java
protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .anyRequest().authenticated()
            .and()
        .formLogin()
            .and()
        .httpBasic();
}
```

上面的默认配置：

- 确保对我们的应用程序的任何请求都要求用户进行身份验证
- 允许用户使用基于表单的登录进行身份验证
- 允许用户使用HTTP基本身份验证进行身份验证

您会注意到此配置与XML命名空间配置非常相似：

<http>
    <intercept-url pattern="/**" access="authenticated"/>
    <form-login />
    <http-basic />
</http>

使用`and()`方法表示关闭XML标记的Java配置，它允许我们继续配置父标记。如果您阅读代码，它也是有道理的。我想配置授权请求_并_配置表单登录_并_配置HTTP基本身份验证。

### [](https://www.springcloud.cc/spring-security.html#jc-form)6.3 Java配置和表单登录

当您被提示登录时，您可能想知道登录表单的来源，因为我们没有提及任何HTML文件或JSP。由于Spring Security的默认配置未明确设置登录页面的URL，因此Spring Security会根据启用的功能自动生成一个URL，并使用处理提交的登录的URL的标准值，默认值登录后用户将被发送到的目标URL，依此类推。

虽然自动生成的登录页面便于快速启动和运行，但大多数应用程序都希望提供自己的登录页面。为此，我们可以更新我们的配置，如下所示：

protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .anyRequest().authenticated()
            .and()
        .formLogin()
            .loginPage("/login") [](https://www.springcloud.cc/spring-security.html#CO1-1)![1](https://www.springcloud.cc/images/1.png)
            .permitAll();        [](https://www.springcloud.cc/spring-security.html#CO1-2)![2](https://www.springcloud.cc/images/2.png)
}

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO1-1)|更新的配置指定登录页面的位置。|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO1-2)|我们必须授予所有用户（即未经身份验证的用户）访问我们的登录页面的权限。`formLogin().permitAll()`方法允许为与基于表单的登录相关联的所有URL授予对所有用户的访问权限。|

使用JSP为我们当前配置实现的示例登录页面如下所示：

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|下面的登录页面代表我们当前的配置。如果某些默认设置不符合我们的需求，我们可以轻松更新配置。|

<c:url value="/login" var="loginUrl"/>
<form action="${loginUrl}" method="post">       [](https://www.springcloud.cc/spring-security.html#CO2-1)![1](https://www.springcloud.cc/images/1.png)
    <c:if test="${param.error != null}">        [](https://www.springcloud.cc/spring-security.html#CO2-2)![2](https://www.springcloud.cc/images/2.png)
        <p>
            Invalid username and password.
        </p>
    </c:if>
    <c:if test="${param.logout != null}">       [](https://www.springcloud.cc/spring-security.html#CO2-3)![3](https://www.springcloud.cc/images/3.png)
        <p>
            You have been logged out.
        </p>
    </c:if>
    <p>
        <label for="username">Username</label>
        <input type="text" id="username" name="username"/>  [](https://www.springcloud.cc/spring-security.html#CO2-4)![4](https://www.springcloud.cc/images/4.png)
    </p>
    <p>
        <label for="password">Password</label>
        <input type="password" id="password" name="password"/>  [](https://www.springcloud.cc/spring-security.html#CO2-5)![5](https://www.springcloud.cc/images/5.png)
    </p>
    <input type="hidden"                        [](https://www.springcloud.cc/spring-security.html#CO2-6)![6](https://www.springcloud.cc/images/6.png)
        name="${_csrf.parameterName}"
        value="${_csrf.token}"/>
    <button type="submit" class="btn">Log in</button>
</form>

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO2-1)|对`/login` URL的POST将尝试对用户进行身份验证|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO2-2)|如果查询参数`error`存在，则尝试进行身份验证并失败|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO2-3)|如果查询参数`logout`存在，则用户已成功注销|
|[![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO2-4)|用户名必须作为名为_username_的HTTP参数出现|
|[![五](https://www.springcloud.cc/images/5.png)](https://www.springcloud.cc/spring-security.html#CO2-5)|密码必须作为名为_password_的HTTP参数出现|
|[![6](https://www.springcloud.cc/images/6.png)](https://www.springcloud.cc/spring-security.html#CO2-6)|我们必须[在“包含CSRF令牌”](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token "包括CSRF令牌")一[节中](https://www.springcloud.cc/spring-security.html#csrf "10.6跨站请求伪造（CSRF）")了解更多信息，请参阅[第10.6节“跨站点请求伪造（CSRF）”](https://www.springcloud.cc/spring-security.html#csrf "10.6 Cross Site Request Forgery (CSRF)")部分的参考|

## [](https://www.springcloud.cc/spring-security.html#jc-authorize-requests)6.4授权请求

我们的示例仅要求用户进行身份验证，并且已针对应用程序中的每个URL进行了身份验证。我们可以通过向`http.authorizeRequests()`方法添加多个子项来指定网址的自定义要求。例如：

protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()                                                                [](https://www.springcloud.cc/spring-security.html#CO3-1)![1](https://www.springcloud.cc/images/1.png)
            .antMatchers("/resources/**", "/signup", "/about").permitAll()                  [](https://www.springcloud.cc/spring-security.html#CO3-2)![2](https://www.springcloud.cc/images/2.png)
            .antMatchers("/admin/**").hasRole("ADMIN")                                      [](https://www.springcloud.cc/spring-security.html#CO3-3)![3](https://www.springcloud.cc/images/3.png)
            .antMatchers("/db/**").access("hasRole('ADMIN') and hasRole('DBA')")            [](https://www.springcloud.cc/spring-security.html#CO3-4)![4](https://www.springcloud.cc/images/4.png)
            .anyRequest().authenticated()                                                   [](https://www.springcloud.cc/spring-security.html#CO3-5)![5](https://www.springcloud.cc/images/5.png)
            .and()
        // ...
        .formLogin();
}

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO3-1)|`http.authorizeRequests()`方法有多个子项，每个匹配器按其声明的顺序进行考虑。|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO3-2)|我们指定了任何用户都可以访问的多种URL模式。具体来说，如果URL以“/ resources /”开头，等于“/ signup”或等于“/ about”，则任何用户都可以访问请求。|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO3-3)|任何以“/ admin /”开头的URL都将仅限于具有“ROLE_ADMIN”角色的用户。您会注意到，由于我们正在调用`hasRole`方法，因此我们不需要指定“ROLE_”前缀。|
|[![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO3-4)|任何以“/ db /”开头的URL都要求用户同时拥有“ROLE_ADMIN”和“ROLE_DBA”。您会注意到，由于我们使用的是`hasRole`表达式，因此我们不需要指定“ROLE_”前缀。|
|[![五](https://www.springcloud.cc/images/5.png)](https://www.springcloud.cc/spring-security.html#CO3-5)|任何尚未匹配的URL只需要对用户进行身份验证|

## [](https://www.springcloud.cc/spring-security.html#jc-logout)6.5处理注销

使用`[WebSecurityConfigurerAdapter](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/configuration/WebSecurityConfigurerAdapter.html)`时，会自动应用注销功能。默认情况下，访问URL `/logout`将通过以下方式记录用户：

- 使HTTP会话无效
- 清理已配置的任何RememberMe身份验证
- 清除`SecurityContextHolder`
- 重定向到`/login?logout`

但是，与配置登录功能类似，您还可以使用各种选项来进一步自定义注销要求：

protected void configure(HttpSecurity http) throws Exception {
    http
        .logout()                                                                [](https://www.springcloud.cc/spring-security.html#CO4-1)![1](https://www.springcloud.cc/images/1.png)
            .logoutUrl("/my/logout")                                                 [](https://www.springcloud.cc/spring-security.html#CO4-2)![2](https://www.springcloud.cc/images/2.png)
            .logoutSuccessUrl("/my/index")                                           [](https://www.springcloud.cc/spring-security.html#CO4-3)![3](https://www.springcloud.cc/images/3.png)
            .logoutSuccessHandler(logoutSuccessHandler)                              [](https://www.springcloud.cc/spring-security.html#CO4-4)![4](https://www.springcloud.cc/images/4.png)
            .invalidateHttpSession(true)                                             [](https://www.springcloud.cc/spring-security.html#CO4-5)![5](https://www.springcloud.cc/images/5.png)
            .addLogoutHandler(logoutHandler)                                         [](https://www.springcloud.cc/spring-security.html#CO4-6)![6](https://www.springcloud.cc/images/6.png)
            .deleteCookies(cookieNamesToClear)                                       [](https://www.springcloud.cc/spring-security.html#CO4-7)![7](https://www.springcloud.cc/images/7.png)
            .and()
        ...
}

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO4-1)|提供注销支持。使用`WebSecurityConfigurerAdapter`时会自动应用此选项。|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO4-2)|触发注销的URL（默认为`/logout`）。如果启用了CSRF保护（默认），则该请求也必须是POST。有关更多信息，请参阅[JavaDoc](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/configurers/LogoutConfigurer.html#logoutUrl-java.lang.String-)。|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO4-3)|注销后重定向到的URL。默认值为`/login?logout`。有关更多信息，请参阅[JavaDoc](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/configurers/LogoutConfigurer.html#logoutSuccessUrl-java.lang.String-)。|
|[![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO4-4)|我们指定一个自定义`LogoutSuccessHandler`。如果指定了此项，则忽略`logoutSuccessUrl()`。有关更多信息，请参阅[JavaDoc](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/configurers/LogoutConfigurer.html#logoutSuccessHandler-org.springframework.security.web.authentication.logout.LogoutSuccessHandler-)。|
|[![五](https://www.springcloud.cc/images/5.png)](https://www.springcloud.cc/spring-security.html#CO4-5)|指定在注销时是否使`HttpSession`无效。默认情况下这是**真的**。配置`SecurityContextLogoutHandler`封面。有关更多信息，请参阅[JavaDoc](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/config/annotation/web/configurers/LogoutConfigurer.html#invalidateHttpSession-boolean-)。|
|[![6](https://www.springcloud.cc/images/6.png)](https://www.springcloud.cc/spring-security.html#CO4-6)|添加`LogoutHandler`。默认情况下，`SecurityContextLogoutHandler`被添加为最后一个`LogoutHandler`。|
|[![7](https://www.springcloud.cc/images/7.png)](https://www.springcloud.cc/spring-security.html#CO4-7)|允许指定在注销成功时删除的cookie的名称。这是显式添加`CookieClearingLogoutHandler`的快捷方式。|

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|===当然也可以使用XML Namespace表示法配置注销。有关更多详细信息，请参阅Spring Security XML命名空间部分中的[logout元素](https://www.springcloud.cc/spring-security.html#nsa-logout "<注销>")的文档。===|

通常，为了自定义注销功能，您可以添加`[LogoutHandler](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/logout/LogoutHandler.html)`和/或`[LogoutSuccessHandler](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/logout/LogoutSuccessHandler.html)`实现。对于许多常见场景，这些处理程序在使用流畅的API时应用于幕后。

### [](https://www.springcloud.cc/spring-security.html#jc-logout-handler)6.5.1 LogoutHandler

通常，`[LogoutHandler](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/logout/LogoutHandler.html)`实现表示能够参与注销处理的类。预计将调用它们以进行必要的清理。因此，他们不应该抛出异常。提供了各种实现：

- [对PersistentTokenBasedRememberMeServices](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/rememberme/PersistentTokenBasedRememberMeServices.html)
- [TokenBasedRememberMeServices](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/rememberme/TokenBasedRememberMeServices.html)
- [CookieClearingLogoutHandler](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/logout/CookieClearingLogoutHandler.html)
- [CsrfLogoutHandler](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/csrf/CsrfLogoutHandler.html)
- [SecurityContextLogoutHandler](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/logout/SecurityContextLogoutHandler.html)

有关详细信息[，](https://www.springcloud.cc/spring-security.html#remember-me-impls "10.5.4记住我的接口和实现")请参见[第10.5.4节“记住我的接口和实现”](https://www.springcloud.cc/spring-security.html#remember-me-impls "10.5.4 Remember-Me Interfaces and Implementations")。

而不是直接提供`LogoutHandler`实现，流畅的API还提供了快捷方式，提供了各自的`LogoutHandler`实现。例如，`deleteCookies()`允许指定在注销成功时删除的一个或多个cookie的名称。与添加`CookieClearingLogoutHandler`相比，这是一种捷径。

### [](https://www.springcloud.cc/spring-security.html#jc-logout-success-handler)6.5.2 LogoutSuccessHandler

在`LogoutFilter`成功注销后调用`LogoutSuccessHandler`，以处理例如重定向或转发到适当的目的地。请注意，该接口几乎与`LogoutHandler`相同，但可能引发异常。

提供以下实现：

- [SimpleUrlLogoutSuccessHandler](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/authentication/logout/SimpleUrlLogoutSuccessHandler.html)
- HttpStatusReturningLogoutSuccessHandler

如上所述，您无需直接指定`SimpleUrlLogoutSuccessHandler`。相反，fluent API通过设置`logoutSuccessUrl()`来提供快捷方式。这将设置`SimpleUrlLogoutSuccessHandler`。发生注销后，提供的URL将重定向到。默认值为`/login?logout`。

在REST API类型场景中，`HttpStatusReturningLogoutSuccessHandler`可能很有趣。成功注销后，`LogoutSuccessHandler`允许您提供要返回的纯HTTP状态代码，而不是在成功注销时重定向到URL。如果未配置，则默认返回状态代码200。

### [](https://www.springcloud.cc/spring-security.html#jc-logout-references)6.5.3进一步注销相关参考

- [注销处理](https://www.springcloud.cc/spring-security.html#ns-logout "7.2.4注销处理")
- [测试注销](https://www.springcloud.cc/spring-security.html#test-logout "测试注销")
- [HttpServletRequest.logout（）](https://www.springcloud.cc/spring-security.html#servletapi-logout "HttpServletRequest.logout（）")
- [第10.5.4节“记住我的接口和实现”](https://www.springcloud.cc/spring-security.html#remember-me-impls "10.5.4记住我的接口和实现")
- [登录](https://www.springcloud.cc/spring-security.html#csrf-logout "注销") CSRF警告部分
- 部分[单点注销](https://www.springcloud.cc/spring-security.html#cas-singlelogout "单点注销")（CAS协议）
- Spring Security XML命名空间部分中 的[logout元素的](https://www.springcloud.cc/spring-security.html#nsa-logout "<注销>")文档

## [](https://www.springcloud.cc/spring-security.html#oauth2client)6.6 OAuth 2.0客户端

OAuth 2.0客户端功能为[OAuth 2.0授权框架中](https://tools.ietf.org/html/rfc6749#section-1.1)定义的客户端角色提供支持。

可以使用以下主要功能：

- [授权代码授予](https://tools.ietf.org/html/rfc6749#section-1.3.1)
- [客户凭证授权](https://tools.ietf.org/html/rfc6749#section-1.3.4)
- [Servlet环境的`WebClient`扩展](https://www.springcloud.cc/spring-security.html#servlet-webclient "13.用于Servlet环境的WebClient")（用于发出受保护的资源请求）

`HttpSecurity.oauth2Client()`提供了许多用于自定义OAuth 2.0 Client的配置选项。以下代码显示了`oauth2Client()` DSL可用的完整配置选项：

_@EnableWebSecurity_
public class OAuth2ClientSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Client()
                .clientRegistrationRepository(this.clientRegistrationRepository())
                .authorizedClientRepository(this.authorizedClientRepository())
                .authorizedClientService(this.authorizedClientService())
                .authorizationCodeGrant()
                    .authorizationRequestRepository(this.authorizationRequestRepository())
                    .authorizationRequestResolver(this.authorizationRequestResolver())
                    .accessTokenResponseClient(this.accessTokenResponseClient());
    }
}

以下部分详细介绍了每种可用的配置选项：

- [第6.6.1节“ClientRegistration”](https://www.springcloud.cc/spring-security.html#oauth2Client-client-registration "6.6.1 ClientRegistration")
- [第6.6.2节“ClientRegistrationRepository”](https://www.springcloud.cc/spring-security.html#oauth2Client-client-registration-repo "6.6.2 ClientRegistrationRepository")
- [第6.6.3节“OAuth2AuthorizedClient”](https://www.springcloud.cc/spring-security.html#oauth2Client-authorized-client "6.6.3 OAuth2AuthorizedClient")
- [第6.6.4节“OAuth2AuthorizedClientRepository / OAuth2AuthorizedClientService”](https://www.springcloud.cc/spring-security.html#oauth2Client-authorized-repo-service "6.6.4 OAuth2AuthorizedClientRepository / OAuth2AuthorizedClientService")
- [第6.6.5节“RegisteredOAuth2AuthorizedClient”](https://www.springcloud.cc/spring-security.html#oauth2Client-registered-authorized-client "6.6.5 RegisteredOAuth2AuthorizedClient")
- [第6.6.6节“AuthorizationRequestRepository”](https://www.springcloud.cc/spring-security.html#oauth2Client-authorization-request-repository "6.6.6 AuthorizationRequestRepository")
- [第6.6.7节“OAuth2AuthorizationRequestResolver”](https://www.springcloud.cc/spring-security.html#oauth2Client-authorization-request-resolver "6.6.7 OAuth2AuthorizationRequestResolver")
- [第6.6.8节“OAuth2AccessTokenResponseClient”](https://www.springcloud.cc/spring-security.html#oauth2Client-access-token-client "6.6.8 OAuth2AccessTokenResponseClient")

### [](https://www.springcloud.cc/spring-security.html#oauth2Client-client-registration)6.6.1 ClientRegistration

`ClientRegistration`表示在OAuth 2.0或OpenID Connect 1.0提供程序中注册的客户端。

客户端注册保存信息，例如客户端ID，客户端密钥，授权授权类型，重定向URI，范围，授权URI，令牌URI和其他详细信息。

`ClientRegistration`及其属性定义如下：

public final class ClientRegistration {
    private String registrationId;  [](https://www.springcloud.cc/spring-security.html#CO5-1)![1](https://www.springcloud.cc/images/1.png)
    private String clientId;    [](https://www.springcloud.cc/spring-security.html#CO5-2)![2](https://www.springcloud.cc/images/2.png)
    private String clientSecret;    [](https://www.springcloud.cc/spring-security.html#CO5-3)![3](https://www.springcloud.cc/images/3.png)
    private ClientAuthenticationMethod clientAuthenticationMethod;  [](https://www.springcloud.cc/spring-security.html#CO5-4)![4](https://www.springcloud.cc/images/4.png)
    private AuthorizationGrantType authorizationGrantType;  [](https://www.springcloud.cc/spring-security.html#CO5-5)![5](https://www.springcloud.cc/images/5.png)
    private String redirectUriTemplate; [](https://www.springcloud.cc/spring-security.html#CO5-6)![6](https://www.springcloud.cc/images/6.png)
    private Set<String> scopes; [](https://www.springcloud.cc/spring-security.html#CO5-7)![7](https://www.springcloud.cc/images/7.png)
    private ProviderDetails providerDetails;
    private String clientName;  [](https://www.springcloud.cc/spring-security.html#CO5-8)![8](https://www.springcloud.cc/images/8.png)

    public class ProviderDetails {
        private String authorizationUri;    [](https://www.springcloud.cc/spring-security.html#CO5-9)![9](https://www.springcloud.cc/images/9.png)
        private String tokenUri;    [](https://www.springcloud.cc/spring-security.html#CO5-10)![10](https://www.springcloud.cc/images/10.png)
        private UserInfoEndpoint userInfoEndpoint;
        private String jwkSetUri;   [](https://www.springcloud.cc/spring-security.html#CO5-11)![11](https://www.springcloud.cc/images/11.png)
        private Map<String, Object> configurationMetadata;  [](https://www.springcloud.cc/spring-security.html#CO5-12)![12](https://www.springcloud.cc/images/12.png)

        public class UserInfoEndpoint {
            private String uri; [](https://www.springcloud.cc/spring-security.html#CO5-13)![13](https://www.springcloud.cc/images/13.png)
            private AuthenticationMethod authenticationMethod;  [](https://www.springcloud.cc/spring-security.html#CO5-14)![14](https://www.springcloud.cc/images/14.png)
            private String userNameAttributeName;   [](https://www.springcloud.cc/spring-security.html#CO5-15)![15](https://www.springcloud.cc/images/15.png)

        }
    }
}

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO5-1)|`registrationId`：唯一标识`ClientRegistration`的ID。|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO5-2)|`clientId`：客户端标识符。|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO5-3)|`clientSecret`：客户机密。|
|[![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO5-4)|`clientAuthenticationMethod`：用于使用Provider对客户端进行身份验证的方法。支持的值是**基本**和**后期**。|
|[![五](https://www.springcloud.cc/images/5.png)](https://www.springcloud.cc/spring-security.html#CO5-5)|`authorizationGrantType`：OAuth 2.0授权框架定义了四种[授权授权](https://tools.ietf.org/html/rfc6749#section-1.3)类型。支持的值是authorization_code，implicit和client_credentials。|
|[![6](https://www.springcloud.cc/images/6.png)](https://www.springcloud.cc/spring-security.html#CO5-6)|`redirectUriTemplate`：客户端注册的重定向URI，_授权服务器_将最终用户的用户代理重定向到最终用户对客户端进行身份验证和授权访问之后。|
|[![7](https://www.springcloud.cc/images/7.png)](https://www.springcloud.cc/spring-security.html#CO5-7)|`scopes`：客户在授权请求流程中请求的范围，例如openid，电子邮件或配置文件。|
|[![8](https://www.springcloud.cc/images/8.png)](https://www.springcloud.cc/spring-security.html#CO5-8)|`clientName`：用于客户端的描述性名称。该名称可能在某些情况下使用，例如在自动生成的登录页面中显示客户端的名称时。|
|[![9](https://www.springcloud.cc/images/9.png)](https://www.springcloud.cc/spring-security.html#CO5-9)|`authorizationUri`：授权服务器的授权端点URI。|
|[![10](https://www.springcloud.cc/images/10.png)](https://www.springcloud.cc/spring-security.html#CO5-10)|`tokenUri`：授权服务器的令牌端点URI。|
|[![11](https://www.springcloud.cc/images/11.png)](https://www.springcloud.cc/spring-security.html#CO5-11)|`jwkSetUri`：用于从授权服务器检索[JSON Web密钥（JWK）](https://tools.ietf.org/html/rfc7517)集的URI ，其中包含用于验证ID 的[JSON Web签名（JWS）](https://tools.ietf.org/html/rfc7515)的加密密钥令牌和可选的UserInfo响应。|
|[![12](https://www.springcloud.cc/images/12.png)](https://www.springcloud.cc/spring-security.html#CO5-12)|`configurationMetadata`：[OpenID提供程序配置信息](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig)。仅当配置了Spring Boot 2.x属性`spring.security.oauth2.client.provider.[providerId].issuerUri`时，才能使用此信息。|
|[![13](https://www.springcloud.cc/images/13.png)](https://www.springcloud.cc/spring-security.html#CO5-13)|`(userInfoEndpoint)uri`：UserInfo端点URI，用于访问经过身份验证的最终用户的声明/属性。|
|[![14](https://www.springcloud.cc/images/14.png)](https://www.springcloud.cc/spring-security.html#CO5-14)|`(userInfoEndpoint)authenticationMethod`：将访问令牌发送到UserInfo端点时使用的身份验证方法。支持的值是**标题**，**表单**和**查询**。|
|[![15](https://www.springcloud.cc/images/15.png)](https://www.springcloud.cc/spring-security.html#CO5-15)|`userNameAttributeName`：UserInfo响应中返回的属性的名称，该属性引用最终用户的名称或标识符。|

### [](https://www.springcloud.cc/spring-security.html#oauth2Client-client-registration-repo)6.6.2 ClientRegistrationRepository

`ClientRegistrationRepository`充当OAuth 2.0 / OpenID Connect 1.0 `ClientRegistration`的存储库。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|客户端注册信息最终由关联的授权服务器存储和拥有。此存储库提供检索主客户端注册信息的子集的功能，该子集与授权服务器一起存储。|

Spring Boot 2.x auto-configuration将`spring.security.oauth2.client.registration._[registrationId]_`下的每个属性绑定到`ClientRegistration`的实例，然后在`ClientRegistrationRepository`内组成每个`ClientRegistration`个实例。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|`ClientRegistrationRepository`的默认实现是`InMemoryClientRegistrationRepository`。|

自动配置还在`ApplicationContext`中将`ClientRegistrationRepository`注册为`@Bean`，以便在应用程序需要时可用于依赖注入。

以下清单显示了一个示例：

_@Controller_
public class OAuth2ClientController {

    _@Autowired_
    private ClientRegistrationRepository clientRegistrationRepository;

    _@RequestMapping("/")_
    public String index() {
        ClientRegistration googleRegistration =
            this.clientRegistrationRepository.findByRegistrationId("google");

        ...

        return "index";
    }
}

### [](https://www.springcloud.cc/spring-security.html#oauth2Client-authorized-client)6.6.3 OAuth2AuthorizedClient

`OAuth2AuthorizedClient`是授权客户的代表。当最终用户（资源所有者）已授权客户端访问其受保护资源时，将认为客户端已获得授权。

`OAuth2AuthorizedClient`用于将`OAuth2AccessToken`（和可选的`OAuth2RefreshToken`）与`ClientRegistration`（客户端）和资源所有者相关联，后者是授予授权的`Principal`最终用户。

### [](https://www.springcloud.cc/spring-security.html#oauth2Client-authorized-repo-service)6.6.4 OAuth2AuthorizedClientRepository / OAuth2AuthorizedClientService

`OAuth2AuthorizedClientRepository`负责在web个请求之间保持`OAuth2AuthorizedClient`个。鉴于`OAuth2AuthorizedClientService`的主要作用是在应用程序级别管理`OAuth2AuthorizedClient`（s）。

从开发人员的角度来看，`OAuth2AuthorizedClientRepository`或`OAuth2AuthorizedClientService`提供了查找与客户端关联的`OAuth2AccessToken`的功能，以便可以使用它来启动受保护的资源请求。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|Spring Boot 2.x自动配置在`ApplicationContext`中注册`OAuth2AuthorizedClientRepository`和/或`OAuth2AuthorizedClientService` `@Bean`。|

开发人员还可以在`ApplicationContext`中注册`OAuth2AuthorizedClientRepository`或`OAuth2AuthorizedClientService` `@Bean`（覆盖Spring Boot 2.x自动配置），以便能够查找`OAuth2AccessToken`与特定的`ClientRegistration`（客户端）相关联。

以下清单显示了一个示例：

_@Controller_
public class OAuth2LoginController {

    _@Autowired_
    private OAuth2AuthorizedClientService authorizedClientService;

    _@RequestMapping("/userinfo")_
    public String userinfo(OAuth2AuthenticationToken authentication) {
        // authentication.getAuthorizedClientRegistrationId() returns the
        // registrationId of the Client that was authorized during the oauth2Login() flow
        OAuth2AuthorizedClient authorizedClient =
            this.authorizedClientService.loadAuthorizedClient(
                authentication.getAuthorizedClientRegistrationId(),
                authentication.getName());

        OAuth2AccessToken accessToken = authorizedClient.getAccessToken();

        ...

        return "userinfo";
    }
}

### [](https://www.springcloud.cc/spring-security.html#oauth2Client-registered-authorized-client)6.6.5 RegisteredOAuth2AuthorizedClient

`@RegisteredOAuth2AuthorizedClient`注释提供了将方法参数解析为类型`OAuth2AuthorizedClient`的参数值的功能。与通过`OAuth2AuthorizedClientService`查找`OAuth2AuthorizedClient`相比，这是一个方便的选择。

_@Controller_
public class OAuth2LoginController {

    _@RequestMapping("/userinfo")_
    public String userinfo(_@RegisteredOAuth2AuthorizedClient("google")_ OAuth2AuthorizedClient authorizedClient) {
        OAuth2AccessToken accessToken = authorizedClient.getAccessToken();

        ...

        return "userinfo";
    }
}

`@RegisteredOAuth2AuthorizedClient`注释由`OAuth2AuthorizedClientArgumentResolver`处理，并提供以下功能：

- 如果客户端尚未获得授权，将自动请求`OAuth2AccessToken`。
    
    - 对于`authorization_code`，这涉及触发授权请求重定向以启动流
    - 对于`client_credentials`，使用`DefaultClientCredentialsTokenResponseClient`直接从令牌端点获取访问令牌
    

### [](https://www.springcloud.cc/spring-security.html#oauth2Client-authorization-request-repository)6.6.6 AuthorizationRequestRepository

从授权请求启动到收到授权响应时（回调），`AuthorizationRequestRepository`负责`OAuth2AuthorizationRequest`的持久性。

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|`OAuth2AuthorizationRequest`用于关联和验证授权响应。|

`AuthorizationRequestRepository`的默认实现是`HttpSessionOAuth2AuthorizationRequestRepository`，它将`OAuth2AuthorizationRequest`存储在`HttpSession`中。

如果您想提供`AuthorizationRequestRepository`的自定义实现，将`OAuth2AuthorizationRequest`的属性存储在`Cookie`中，您可以按以下示例所示进行配置：

_@EnableWebSecurity_
public class OAuth2ClientSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Client()
                .authorizationCodeGrant()
                    .authorizationRequestRepository(this.cookieAuthorizationRequestRepository())
                    ...
    }

    private AuthorizationRequestRepository<OAuth2AuthorizationRequest> cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }
}

### [](https://www.springcloud.cc/spring-security.html#oauth2Client-authorization-request-resolver)6.6.7 OAuth2AuthorizationRequestResolver

`OAuth2AuthorizationRequestResolver`的主要作用是从提供的web请求中解析`OAuth2AuthorizationRequest`。默认实现`DefaultOAuth2AuthorizationRequestResolver`匹配（默认）路径`/oauth2/authorization/{registrationId}`，提取`registrationId`并使用它来为关联的`ClientRegistration`构建`OAuth2AuthorizationRequest`。

`OAuth2AuthorizationRequestResolver`可以实现的主要用例之一是能够使用超出OAuth 2.0授权框架中定义的标准参数的附加参数来定制授权请求。

例如，OpenID Connect为[授权代码流](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)定义了额外的OAuth 2.0请求参数，这些参数扩展自[OAuth 2.0授权框架中](https://tools.ietf.org/html/rfc6749#section-4.1.1)定义的标准参数。其中一个扩展参数是`prompt`参数。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|可选的。空格分隔，区分大小写的ASCII字符串值列表，指定授权服务器是否提示最终用户进行重新认证和同意。定义的值为：none，login，consent，select_account|

以下示例显示如何通过包含请求参数`prompt=consent`来实现`OAuth2AuthorizationRequestResolver`来自定义`oauth2Login()`的授权请求。

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Autowired_
    private ClientRegistrationRepository clientRegistrationRepository;

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2Login()
                .authorizationEndpoint()
                    .authorizationRequestResolver(
                            new CustomAuthorizationRequestResolver(
                                    this.clientRegistrationRepository));    [](https://www.springcloud.cc/spring-security.html#CO6-1)![1](https://www.springcloud.cc/images/1.png)
    }
}

public class CustomAuthorizationRequestResolver implements OAuth2AuthorizationRequestResolver {
    private final OAuth2AuthorizationRequestResolver defaultAuthorizationRequestResolver;

    public CustomAuthorizationRequestResolver(
            ClientRegistrationRepository clientRegistrationRepository) {

        this.defaultAuthorizationRequestResolver =
                new DefaultOAuth2AuthorizationRequestResolver(
                        clientRegistrationRepository, "/oauth2/authorization");
    }

    _@Override_
    public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
        OAuth2AuthorizationRequest authorizationRequest =
                this.defaultAuthorizationRequestResolver.resolve(request);  [](https://www.springcloud.cc/spring-security.html#CO6-2)![2](https://www.springcloud.cc/images/2.png)

        return authorizationRequest != null ?   [](https://www.springcloud.cc/spring-security.html#CO6-3)![3](https://www.springcloud.cc/images/3.png)
                customAuthorizationRequest(authorizationRequest) :
                null;
    }

    _@Override_
    public OAuth2AuthorizationRequest resolve(
            HttpServletRequest request, String clientRegistrationId) {

        OAuth2AuthorizationRequest authorizationRequest =
                this.defaultAuthorizationRequestResolver.resolve(
                    request, clientRegistrationId);    [](https://www.springcloud.cc/spring-security.html#CO6-4)![4](https://www.springcloud.cc/images/4.png)

        return authorizationRequest != null ?   [](https://www.springcloud.cc/spring-security.html#CO6-5)![5](https://www.springcloud.cc/images/5.png)
                customAuthorizationRequest(authorizationRequest) :
                null;
    }

    private OAuth2AuthorizationRequest customAuthorizationRequest(
            OAuth2AuthorizationRequest authorizationRequest) {

        Map<String, Object> additionalParameters =
                new LinkedHashMap<>(authorizationRequest.getAdditionalParameters());
        additionalParameters.put("prompt", "consent");  [](https://www.springcloud.cc/spring-security.html#CO6-6)![6](https://www.springcloud.cc/images/6.png)

        return OAuth2AuthorizationRequest.from(authorizationRequest)    [](https://www.springcloud.cc/spring-security.html#CO6-7)![7](https://www.springcloud.cc/images/7.png)
                .additionalParameters(additionalParameters) [](https://www.springcloud.cc/spring-security.html#CO6-8)![8](https://www.springcloud.cc/images/8.png)
                .build();
    }
}

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO6-1)|配置自定义`OAuth2AuthorizationRequestResolver`|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO6-2) [![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO6-4)|尝试使用`DefaultOAuth2AuthorizationRequestResolver`解决`OAuth2AuthorizationRequest`|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO6-3) [![五](https://www.springcloud.cc/images/5.png)](https://www.springcloud.cc/spring-security.html#CO6-5)|如果解决了`OAuth2AuthorizationRequest`而不是返回自定义版本，则返回`null`|
|[![6](https://www.springcloud.cc/images/6.png)](https://www.springcloud.cc/spring-security.html#CO6-6)|将自定义参数添加到现有`OAuth2AuthorizationRequest.additionalParameters`|
|[![7](https://www.springcloud.cc/images/7.png)](https://www.springcloud.cc/spring-security.html#CO6-7)|创建默认`OAuth2AuthorizationRequest`的副本，返回`OAuth2AuthorizationRequest.Builder`以进行进一步修改|
|[![8](https://www.springcloud.cc/images/8.png)](https://www.springcloud.cc/spring-security.html#CO6-8)|覆盖默认`additionalParameters`|

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|`OAuth2AuthorizationRequest.Builder.build()`构造`OAuth2AuthorizationRequest.authorizationRequestUri`，它代表完整的授权请求URI，包括使用`application/x-www-form-urlencoded`格式的所有查询参数。|

上面的示例显示了在标准参数之上添加自定义参数的常见用例。但是，如果您需要删除或更改标准参数或者您的要求更高级，则可以通过简单地覆盖`OAuth2AuthorizationRequest.authorizationRequestUri`属性来完全控制构建授权请求URI。

以下示例显示了前一个示例中`customAuthorizationRequest()`方法的变体，而是覆盖了`OAuth2AuthorizationRequest.authorizationRequestUri`属性。

private OAuth2AuthorizationRequest customAuthorizationRequest(
        OAuth2AuthorizationRequest authorizationRequest) {

    String customAuthorizationRequestUri = UriComponentsBuilder
            .fromUriString(authorizationRequest.getAuthorizationRequestUri())
            .queryParam("prompt", "consent")
            .build(true)
            .toUriString();

    return OAuth2AuthorizationRequest.from(authorizationRequest)
            .authorizationRequestUri(customAuthorizationRequestUri)
            .build();
}

### [](https://www.springcloud.cc/spring-security.html#oauth2Client-access-token-client)6.6.8 OAuth2AccessTokenResponseClient

`OAuth2AccessTokenResponseClient`的主要作用是在授权服务器的令牌端点处为访问令牌凭证交换授权授予凭证。

`authorization_code`授权的`OAuth2AccessTokenResponseClient`的默认实现是`DefaultAuthorizationCodeTokenResponseClient`，它使用`RestOperations`在令牌端点交换访问令牌的授权码。

`DefaultAuthorizationCodeTokenResponseClient`非常灵活，因为它允许您自定义令牌请求的预处理和/或令牌响应的后处理。

如果您需要自定义令牌请求的预处理，则可以为`DefaultAuthorizationCodeTokenResponseClient.setRequestEntityConverter()`提供自定义`Converter<OAuth2AuthorizationCodeGrantRequest, RequestEntity<?>>`。默认实现`OAuth2AuthorizationCodeGrantRequestEntityConverter`构建标准[OAuth 2.0访问令牌请求](https://tools.ietf.org/html/rfc6749#section-4.1.3)的`RequestEntity`表示。但是，提供自定义`Converter`将允许您扩展标准令牌请求并添加自定义参数。

|   |   |
|---|---|
|![[重要]](https://www.springcloud.cc/images/important.png)|重要|
|自定义`Converter`必须返回OAuth 2.0访问令牌请求的有效`RequestEntity`表示，该表示由预期的OAuth 2.0提供程序理解。|

另一方面，如果您需要自定义令牌响应的后处理，则需要为`DefaultAuthorizationCodeTokenResponseClient.setRestOperations()`提供自定义配置的`RestOperations`。默认`RestOperations`配置如下：

RestTemplate restTemplate = new RestTemplate(Arrays.asList(
        new FormHttpMessageConverter(),
        new OAuth2AccessTokenResponseHttpMessageConverter()));

restTemplate.setErrorHandler(new OAuth2ErrorResponseErrorHandler());

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|发送OAuth 2.0访问令牌请求时使用Spring MVC `FormHttpMessageConverter`是必需的。|

对于OAuth 2.0访问令牌响应，`OAuth2AccessTokenResponseHttpMessageConverter`是`HttpMessageConverter`。您可以为`OAuth2AccessTokenResponseHttpMessageConverter.setTokenResponseConverter()`提供自定义`Converter<Map<String, String>, OAuth2AccessTokenResponse>`，用于将OAuth 2.0访问令牌响应参数转换为`OAuth2AccessTokenResponse`。

`OAuth2ErrorResponseErrorHandler`是`ResponseErrorHandler`，可以处理OAuth 2.0错误（400错误请求）。它使用`OAuth2ErrorHttpMessageConverter`将OAuth 2.0 Error参数转换为`OAuth2Error`。

无论您是自定义`DefaultAuthorizationCodeTokenResponseClient`还是提供自己的`OAuth2AccessTokenResponseClient`实现，都需要对其进行配置，如以下示例所示：

_@EnableWebSecurity_
public class OAuth2ClientSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Client()
                .authorizationCodeGrant()
                    .accessTokenResponseClient(this.customAccessTokenResponseClient())
                    ...
    }

    private OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> customAccessTokenResponseClient() {
        ...
    }
}

## [](https://www.springcloud.cc/spring-security.html#oauth2login)6.7 OAuth 2.0登录

OAuth 2.0登录功能为应用程序提供了使用OAuth 2.0提供程序（例如GitHub）或OpenID Connect 1.0提供程序（例如Google）上的现有帐户登录应用程序的功能。OAuth 2.0 Login实现了用例：“使用Google登录”或“使用GitHub登录”。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|OAuth 2.0登录是使用**授权代码授予实现的**，如[OAuth 2.0授权框架](https://tools.ietf.org/html/rfc6749#section-4.1)和[OpenID Connect Core 1.0中所指定](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)。|

### [](https://www.springcloud.cc/spring-security.html#oauth2login-sample-boot)6.7.1 Spring Boot 2.x样本

Spring Boot 2.x为OAuth 2.0登录带来了完整的自动配置功能。

本节介绍如何使用_Google_作为_身份验证提供程序_配置[**OAuth 2.0登录示例，**](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2login)并介绍以下主题：

- [初始设置](https://www.springcloud.cc/spring-security.html#oauth2login-sample-initial-setup "初始设置")
- [设置重定向URI](https://www.springcloud.cc/spring-security.html#oauth2login-sample-redirect-uri "设置重定向URI")
- [配置application.yml](https://www.springcloud.cc/spring-security.html#oauth2login-sample-application-config "配置application.yml")
- [启动应用程序](https://www.springcloud.cc/spring-security.html#oauth2login-sample-boot-application "启动应用程序")

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-sample-initial-setup)初始设置

要使用Google的OAuth 2.0身份验证系统进行登录，您必须在Google API控制台中设置项目以获取OAuth 2.0凭据。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|[Google的OAuth 2.0](https://developers.google.com/identity/protocols/OpenIDConnect)身份验证[实施](https://developers.google.com/identity/protocols/OpenIDConnect)符合[OpenID Connect 1.0](https://openid.net/connect/)规范，并通过[OpenID认证](https://openid.net/certification/)。|

按照[OpenID Connect](https://developers.google.com/identity/protocols/OpenIDConnect)页面上的说明操作，从“设置OAuth 2.0”部分开始。

完成“获取OAuth 2.0凭据”说明后，您应该拥有一个新的OAuth客户端，其中包含客户端ID和客户端密钥的凭据。

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-sample-redirect-uri)设置重定向URI

重定向URI是应用程序中的路径，最终用户的用户代理在使用Google进行身份验证并在“同意”页面上授予了对OAuth客户端_（[在上一步中创建](https://www.springcloud.cc/spring-security.html#oauth2login-sample-initial-setup "初始设置")）的_访问权限后重定向回的路径。

在“设置重定向URI”子部分中，确保将“ **授权重定向URI”**字段设置为`[http://localhost:8080/login/oauth2/code/google](http://localhost:8080/login/oauth2/code/google)`。

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|默认重定向URI模板为`{baseUrl}/login/oauth2/code/{registrationId}`。该**_registrationId_**是用于唯一标识符[ClientRegistration](https://www.springcloud.cc/spring-security.html#oauth2Client-client-registration "6.6.1 ClientRegistration")。|

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-sample-application-config)配置application.yml

现在您已经有了一个新的OAuth客户端与Google，您需要配置应用程序以使用OAuth客户端进行_身份验证流程_。为此：

1. 转到`application.yml`并设置以下配置：
    
    spring:
      security:
        oauth2:
          client:
            registration:   [](https://www.springcloud.cc/spring-security.html#CO7-1)![1](https://www.springcloud.cc/images/1.png)
              google:   [](https://www.springcloud.cc/spring-security.html#CO7-2)![2](https://www.springcloud.cc/images/2.png)
                client-id: google-client-id
                client-secret: google-client-secret
    
    [](https://www.springcloud.cc/spring-security.html#d5e1230)
    
    **例6.1。OAuth客户端属性**
    
    |   |   |
    |---|---|
    |[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO7-1)|`spring.security.oauth2.client.registration`是OAuth客户端属性的基本属性前缀。|
    |[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO7-2)|基本属性前缀后面是[ClientRegistration](https://www.springcloud.cc/spring-security.html#oauth2Client-client-registration "6.6.1 ClientRegistration")的ID ，例如google。|
    
      
    
2. 使用您之前创建的OAuth 2.0凭据替换`client-id`和`client-secret`属性中的值。

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-sample-boot-application)启动应用程序

启动Spring Boot 2.x示例并转到`[http://localhost:8080](http://localhost:8080/)`。然后，您将被重定向到默认的_自动生成的_登录页面，该页面显示Google的链接。

点击Google链接，然后您将重定向到Google进行身份验证。

使用您的Google帐户凭据进行身份验证后，显示给您的下一页是“同意”屏幕。“同意”屏幕会要求您允许或拒绝访问您之前创建的OAuth客户端。单击“ **允许”**以授权OAuth客户端访问您的电子邮件地址和基本配置文件信息。

此时，OAuth客户端从[UserInfo端点](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)检索您的电子邮件地址和基本配置文件信息，并建立经过身份验证的会话。

### [](https://www.springcloud.cc/spring-security.html#oauth2login-boot-property-mappings)6.7.2 Spring Boot 2.x属性映射

下表概述了Spring Boot 2.x OAuth客户端属性到[ClientRegistration](https://www.springcloud.cc/spring-security.html#oauth2Client-client-registration "6.6.1 ClientRegistration")属性的映射。

|Spring Boot 2.x|ClientRegistration|
|:--|:--|
|`spring.security.oauth2.client.registration._[registrationId]_`|`registrationId`|
|`spring.security.oauth2.client.registration._[registrationId]_.client-id`|`clientId`|
|`spring.security.oauth2.client.registration._[registrationId]_.client-secret`|`clientSecret`|
|`spring.security.oauth2.client.registration._[registrationId]_.client-authentication-method`|`clientAuthenticationMethod`|
|`spring.security.oauth2.client.registration._[registrationId]_.authorization-grant-type`|`authorizationGrantType`|
|`spring.security.oauth2.client.registration._[registrationId]_.redirect-uri`|`redirectUriTemplate`|
|`spring.security.oauth2.client.registration._[registrationId]_.scope`|`scopes`|
|`spring.security.oauth2.client.registration._[registrationId]_.client-name`|`clientName`|
|`spring.security.oauth2.client.provider._[providerId]_.authorization-uri`|`providerDetails.authorizationUri`|
|`spring.security.oauth2.client.provider._[providerId]_.token-uri`|`providerDetails.tokenUri`|
|`spring.security.oauth2.client.provider._[providerId]_.jwk-set-uri`|`providerDetails.jwkSetUri`|
|`spring.security.oauth2.client.provider._[providerId]_.user-info-uri`|`providerDetails.userInfoEndpoint.uri`|
|`spring.security.oauth2.client.provider._[providerId]_.user-info-authentication-method`|`providerDetails.userInfoEndpoint.authenticationMethod`|
|`spring.security.oauth2.client.provider._[providerId]_.userNameAttribute`|`providerDetails.userInfoEndpoint.userNameAttributeName`|

### [](https://www.springcloud.cc/spring-security.html#oauth2login-common-oauth2-provider)6.7.3 CommonOAuth2Provider

`CommonOAuth2Provider`为众多知名提供商预定义了一组默认客户端属性：Google，GitHub，Facebook和Okta。

例如，`authorization-uri`，`token-uri`和`user-info-uri`对于提供商而言不会经常更改。因此，提供默认值以减少所需的配置是有意义的。

如前所述，当我们[配置Google客户端时](https://www.springcloud.cc/spring-security.html#oauth2login-sample-application-config "配置application.yml")，只需要`client-id`和`client-secret`属性。

以下清单显示了一个示例：

spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: google-client-id
            client-secret: google-client-secret

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|客户端属性的自动默认无缝地在这里工作，因为`registrationId`（`google`）匹配`CommonOAuth2Provider`中的`GOOGLE` `enum`（不区分大小写）。|

对于您可能希望指定其他`registrationId`的情况，例如`google-login`，您仍然可以通过配置`provider`属性来利用客户端属性的自动默认。

以下清单显示了一个示例：

spring:
  security:
    oauth2:
      client:
        registration:
          google-login: [](https://www.springcloud.cc/spring-security.html#CO8-1)![1](https://www.springcloud.cc/images/1.png)
            provider: google    [](https://www.springcloud.cc/spring-security.html#CO8-2)![2](https://www.springcloud.cc/images/2.png)
            client-id: google-client-id
            client-secret: google-client-secret

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO8-1)|`registrationId`设置为`google-login`。|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO8-2)|`provider`属性设置为`google`，它将利用`CommonOAuth2Provider.GOOGLE.getBuilder()`中设置的客户端属性的自动默认值。|

### [](https://www.springcloud.cc/spring-security.html#oauth2login-custom-provider-properties)6.7.4配置自定义提供程序Properties

有些OAuth 2.0提供程序支持多租户，这会为每个租户（或子域）产生不同的协议端点。

例如，向Okta注册的OAuth客户端被分配给特定的子域并拥有自己的协议端点。

对于这些情况，Spring Boot 2.x提供了以下用于配置自定义提供程序属性的基本属性：`spring.security.oauth2.client.provider._[providerId]_`。

以下清单显示了一个示例：

spring:
  security:
    oauth2:
      client:
        registration:
          okta:
            client-id: okta-client-id
            client-secret: okta-client-secret
        provider:
          okta: [](https://www.springcloud.cc/spring-security.html#CO9-1)![1](https://www.springcloud.cc/images/1.png)
            authorization-uri: https://your-subdomain.oktapreview.com/oauth2/v1/authorize
            token-uri: https://your-subdomain.oktapreview.com/oauth2/v1/token
            user-info-uri: https://your-subdomain.oktapreview.com/oauth2/v1/userinfo
            user-name-attribute: sub
            jwk-set-uri: https://your-subdomain.oktapreview.com/oauth2/v1/keys

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO9-1)|基本属性（`spring.security.oauth2.client.provider.okta`）允许自定义配置协议端点位置。|

### [](https://www.springcloud.cc/spring-security.html#oauth2login-override-boot-autoconfig)6.7.5覆盖Spring Boot 2.x自动配置

OAuth客户端支持的Spring Boot 2.x自动配置类为`OAuth2ClientAutoConfiguration`。

它执行以下任务：

- 从配置的OAuth客户端属性中注册由`ClientRegistration`组成的`ClientRegistrationRepository` `@Bean`。
- 提供`WebSecurityConfigurerAdapter` `@Configuration`并通过`httpSecurity.oauth2Login()`启用OAuth 2.0登录。

如果您需要根据具体要求覆盖自动配置，可以通过以下方式执行此操作：

- [注册ClientRegistrationRepository @Bean](https://www.springcloud.cc/spring-security.html#oauth2login-register-clientregistrationrepository-bean "注册ClientRegistrationRepository @Bean")
- [提供WebSecurityConfigurerAdapter](https://www.springcloud.cc/spring-security.html#oauth2login-provide-websecurityconfigureradapter "提供WebSecurityConfigurerAdapter")
- [完全覆盖自动配置](https://www.springcloud.cc/spring-security.html#oauth2login-completely-override-autoconfiguration "完全覆盖自动配置")

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-register-clientregistrationrepository-bean)注册ClientRegistrationRepository @Bean

以下示例显示如何注册`ClientRegistrationRepository` `@Bean`：

_@Configuration_
public class OAuth2LoginConfig {

    _@Bean_
    public ClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(this.googleClientRegistration());
    }

    private ClientRegistration googleClientRegistration() {
        return ClientRegistration.withRegistrationId("google")
            .clientId("google-client-id")
            .clientSecret("google-client-secret")
            .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
            .redirectUriTemplate("{baseUrl}/login/oauth2/code/{registrationId}")
            .scope("openid", "profile", "email", "address", "phone")
            .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
            .tokenUri("https://www.googleapis.com/oauth2/v4/token")
            .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
            .userNameAttributeName(IdTokenClaimNames.SUB)
            .jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
            .clientName("Google")
            .build();
    }
}

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-provide-websecurityconfigureradapter)提供WebSecurityConfigurerAdapter

以下示例说明如何使用`@EnableWebSecurity`提供`WebSecurityConfigurerAdapter`并通过`httpSecurity.oauth2Login()`启用OAuth 2.0登录：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2Login();
    }
}

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-completely-override-autoconfiguration)完全覆盖自动配置

以下示例显示如何通过注册`ClientRegistrationRepository` `@Bean`并提供`WebSecurityConfigurerAdapter`来完全覆盖自动配置。

_@Configuration_
public class OAuth2LoginConfig {

    _@EnableWebSecurity_
    public static class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

        _@Override_
        protected void configure(HttpSecurity http) throws Exception {
            http
                .authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
                .oauth2Login();
        }
    }

    _@Bean_
    public ClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(this.googleClientRegistration());
    }

    private ClientRegistration googleClientRegistration() {
        return ClientRegistration.withRegistrationId("google")
            .clientId("google-client-id")
            .clientSecret("google-client-secret")
            .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
            .redirectUriTemplate("{baseUrl}/login/oauth2/code/{registrationId}")
            .scope("openid", "profile", "email", "address", "phone")
            .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
            .tokenUri("https://www.googleapis.com/oauth2/v4/token")
            .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
            .userNameAttributeName(IdTokenClaimNames.SUB)
            .jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
            .clientName("Google")
            .build();
    }
}

### [](https://www.springcloud.cc/spring-security.html#oauth2login-javaconfig-wo-boot)6.7.6没有Spring Boot 2.x的Java配置

如果您无法使用Spring Boot 2.x并希望在`CommonOAuth2Provider`（例如Google）中配置其中一个预定义的提供商，请应用以下配置：

_@Configuration_
public class OAuth2LoginConfig {

    _@EnableWebSecurity_
    public static class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

        _@Override_
        protected void configure(HttpSecurity http) throws Exception {
            http
                .authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
                .oauth2Login();
        }
    }

    _@Bean_
    public ClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(this.googleClientRegistration());
    }

    _@Bean_
    public OAuth2AuthorizedClientService authorizedClientService(
            ClientRegistrationRepository clientRegistrationRepository) {
        return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
    }

    _@Bean_
    public OAuth2AuthorizedClientRepository authorizedClientRepository(
            OAuth2AuthorizedClientService authorizedClientService) {
        return new AuthenticatedPrincipalOAuth2AuthorizedClientRepository(authorizedClientService);
    }

    private ClientRegistration googleClientRegistration() {
        return CommonOAuth2Provider.GOOGLE.getBuilder("google")
            .clientId("google-client-id")
            .clientSecret("google-client-secret")
            .build();
    }
}

### [](https://www.springcloud.cc/spring-security.html#oauth2login-resources)6.7.7其他资源

以下附加资源描述了高级配置选项：

- [OAuth 2.0登录页面](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-login-page "12.4.1 OAuth 2.0登录页面")
- [重定向端点](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-redirection-endpoint "12.4.2重定向端点")
- [UserInfo端点：](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-userinfo-endpoint "12.4.3 UserInfo端点")
    
    - [映射用户权限](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-map-authorities "映射用户权限")
    - [配置自定义OAuth2User](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-custom-user "配置自定义OAuth2User")
    - [OAuth 2.0 UserService](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-oauth2-user-service "OAuth 2.0 UserService")
    - [OpenID Connect 1.0 UserService](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-oidc-user-service "OpenID Connect 1.0 UserService")
    

## [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver)6.8 OAuth 2.0资源服务器

Spring Security支持使用[JWT](https://tools.ietf.org/html/rfc7519)编码的OAuth 2.0 [承载令牌](https://tools.ietf.org/html/rfc6750.html)保护端点。

在应用程序将其权限管理联合到[授权服务器](https://tools.ietf.org/html/rfc6749)（例如，Okta或Ping Identity）的情况下，这很方便。资源服务器可以查询此授权服务器，以在提供请求时验证权限。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|可以在[**OAuth 2.0 Resource Server Servlet示例中**](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2resourceserver)找到完整的工作[**示例**](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2resourceserver)。|

### [](https://www.springcloud.cc/spring-security.html#dependencies)6.8.1依赖性

大多数资源服务器支持都收集到`spring-security-oauth2-resource-server`。但是，对解码和验证JWT的支持是`spring-security-oauth2-jose`，这意味着两者都是必要的，以便拥有一个支持JWT编码的承载令牌的工作资源服务器。

### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-minimalconfiguration)6.8.2最小配置

使用[Spring Boot时](https://spring.io/projects/spring-boot)，将应用程序配置为资源服务器包含两个基本步骤。首先，包括所需的依赖项，然后指出授权服务器的位置。

#### [](https://www.springcloud.cc/spring-security.html#specifying-the-authorization-server)指定授权服务器

要指定要使用的授权服务器，只需执行以下操作：

security:
  oauth2:
    resourceserver:
      jwt:
        issuer-uri: https://idp.example.com

其中`[https://idp.example.com](https://idp.example.com/)`是授权服务器将发出的`iss` JWT令牌声明中包含的值。资源服务器将使用此属性进一步自我配置，发现授权服务器的公钥，并随后验证传入的JWT。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|要使用`issuer-uri`属性，`[https://idp.example.com/.well-known/openid-configuration](https://idp.example.com/.well-known/openid-configuration)`是授权服务器支持的端点也必须如此。此端点称为[提供者配置](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig)端点。|

就是这样！

#### [](https://www.springcloud.cc/spring-security.html#startup-expectations)启动期望

使用此属性和这些依赖项时，Resource Server将自动配置自身以验证JWT编码的承载令牌。

它通过确定性的启动过程实现了这一点：

1. 点击Provider Configuration端点`[https://idp.example.com/.well-known/openid-configuration](https://idp.example.com/.well-known/openid-configuration)`，处理`jwks_url`属性的响应
2. 配置验证策略以查询`jwks_url`以获取有效的公钥
3. 配置验证策略以针对`[https://idp.example.com](https://idp.example.com/)`验证每个JWT `iss`声明。

此过程的结果是授权服务器必须启动并接收请求才能使Resource Server成功启动。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|如果授权服务器在资源服务器查询时关闭（给定适当的超时），则启动将失败。|

#### [](https://www.springcloud.cc/spring-security.html#runtime-expectations)运行期望

启动应用程序后，Resource Server将尝试处理包含`Authorization: Bearer`标头的任何请求：

GET / HTTP/1.1
Authorization: Bearer some-token-value # Resource Server will process this

只要指示此方案，资源服务器将尝试根据承载令牌规范处理请求。

给定格式良好的JWT令牌，资源服务器将

1. 根据在启动期间从`jwks_url`端点获取的公钥验证其签名，并与JWTs头匹配
2. 验证JWT `exp`和`nbf`时间戳以及JWT `iss`声明，以及
3. 将每个范围映射到前缀为`SCOPE_`的权限。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|当授权服务器提供新密钥时，Spring Security将自动旋转用于验证JWT令牌的密钥。|

结果`Authentication#getPrincipal`默认为Spring Security `Jwt`对象，`Authentication#getName`映射到JWT的`sub`属性（如果存在）。

从这里开始，考虑跳转到：

[如何配置而不将Resource Server启动与授权服务器的可用性绑定](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-jwkseturi "6.8.3指定授权服务器JWK直接设置Uri")

[如何配置Spring Boot](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-sansboot "6.8.4覆盖或替换引导自动配置")

### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-jwkseturi)6.8.3指定授权服务器JWK直接设置Uri

如果授权服务器不支持Provider Configuration端点，或者Resource Server必须能够独立于授权服务器启动，则可以将`issuer-uri`交换为`jwk-set-uri`：

security:
  oauth2:
    resourceserver:
      jwt:
        jwk-set-uri: https://idp.example.com/.well-known/jwks.json

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|JWK Set uri不是标准化的，但通常可以在授权服务器的文档中找到|

因此，资源服务器不会在启动时ping授权服务器。但是，它也将不再验证JWT中的`iss`声明（因为资源服务器不再知道发行者值应该是什么）。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|此属性也可以直接在[DSL](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-jwkseturi-dsl "使用jwkSetUri（）")上提供。|

### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-sansboot)6.8.4覆盖或替换引导自动配置

Spring Boot代表资源服务器生成了`@Bean`个`@Bean`。

第一个是`WebSecurityConfigurerAdapter`，它将应用程序配置为资源服务器：

protected void configure(HttpSecurity http) {
    http
        .authorizeRequests()
            .anyRequest().authenticated()
            .and()
        .oauth2ResourceServer()
            .jwt();
}

如果应用程序没有公开`WebSecurityConfigurerAdapter` bean，那么Spring Boot将公开上面的默认值。

替换它就像在应用程序中公开bean一样简单：

_@EnableWebSecurity_
public class MyCustomSecurityConfiguration extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .mvcMatchers("/messages/**").hasAuthority("SCOPE_message:read")
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt()
                    .jwtAuthenticationConverter(myConverter());
    }
}

对于以`/messages/`开头的任何网址，上述内容要求`message:read`的范围。

`oauth2ResourceServer` DSL上的方法也将覆盖或替换自动配置。

例如，第二个`@Bean` Spring Boot创建的是`JwtDecoder`，它将`String`令牌解码为经过验证的`Jwt`实例：

_@Bean_
public JwtDecoder jwtDecoder() {
    return JwtDecoders.fromOidcIssuerLocation(issuerUri);
}

如果应用程序没有公开`JwtDecoder` bean，那么Spring Boot将公开上面的默认值。

并且可以使用`jwkSetUri()`覆盖其配置或使用`decoder()`替换它的配置。

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-jwkseturi-dsl)使用`jwkSetUri()`

授权服务器的JWK Set Uri可以配置[为配置属性](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-jwkseturi "6.8.3指定授权服务器JWK直接设置Uri")，也可以在DSL中提供：

_@EnableWebSecurity_
public class DirectlyConfiguredJwkSetUri extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt()
                    .jwkSetUri("https://idp.example.com/.well-known/jwks.json");
    }
}

使用`jwkSetUri()`优先于任何配置属性。

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-decoder-dsl)使用`decoder()`

比`jwkSetUri()`更强大的是`decoder()`，它将完全取代`JwtDecoder`的任何Boot自动配置：

_@EnableWebSecurity_
public class DirectlyConfiguredJwkSetUri extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt()
                    .decoder(myCustomDecoder());
    }
}

当需要更深层次的配置（如[验证](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-validation "6.8.6配置验证")，[映射](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-claimsetmapping "6.8.7配置声明集映射")或[请求超时）时](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-timeouts "6.8.8配置超时")，这很方便。

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-decoder-bean)公开`JwtDecoder` `@Bean`

或者，暴露`JwtDecoder` `@Bean`与`decoder()`具有相同的效果：

_@Bean_
public JwtDecoder jwtDecoder() {
    return new NimbusJwtDecoderJwkSupport(jwkSetUri);
}

### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-authorization)6.8.5配置授权

从OAuth 2.0授权服务器发出的JWT通常具有`scope`或`scp`属性，表示已授予其范围（或权限），例如：

`{ …​, "scope" : "messages contacts"}`

在这种情况下，资源服务器将尝试将这些范围强制转换为已授权的权限列表，并在每个范围前添加字符串“SCOPE_”。

这意味着要使用从JWT派生的作用域保护端点或方法，相应的表达式应包含此前缀：

_@EnableWebSecurity_
public class DirectlyConfiguredJwkSetUri extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .mvcMatchers("/contacts/**").hasAuthority("SCOPE_contacts")
                .mvcMatchers("/messages/**").hasAuthority("SCOPE_messages")
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt();
    }
}

或者类似于方法安全性：

_@PreAuthorize("hasAuthority('SCOPE_messages')")_
public List<Message> getMessages(...) {}

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-authorization-extraction)手动提取权限

但是，在许多情况下，此默认值不足。例如，某些授权服务器不使用`scope`属性，而是拥有自己的自定义属性。或者，在其他时候，资源服务器可能需要使属性或属性的组合适应内部化的权限。

为此，DSL公开了`jwtAuthenticationConverter()`：

_@EnableWebSecurity_
public class DirectlyConfiguredJwkSetUri extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) {
        http
            .authorizeRequests()
                .anyRequest().authenticated()
                .and()
            .oauth2ResourceServer()
                .jwt()
                    .jwtAuthenticationConverter(grantedAuthoritiesExtractor());
    }
}

Converter<Jwt, AbstractAuthenticationToken> grantedAuthoritiesExtractor() {
    return new GrantedAuthoritiesExtractor();
}

负责将`Jwt`转换为`Authentication`。

我们可以简单地重写这一点，以改变授予权限的方式：

static class GrantedAuthoritiesExtractor extends JwtAuthenticationConverter {
    protected Collection<GrantedAuthorities> extractAuthorities(Jwt jwt) {
        Collection<String> authorities = (Collection<String>)
                jwt.getClaims().get("mycustomclaim");

        return authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}

为了获得更大的灵活性，DSL支持完全用任何实现`Converter<Jwt, AbstractAuthenticationToken>`的类替换转换器：

static class CustomAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    public AbstractAuthenticationToken convert(Jwt jwt) {
        return new CustomAuthenticationToken(jwt);
    }
}

### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-validation)6.8.6配置验证

使用[最小Spring Boot配置](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-minimalconfiguration "6.8.2最小配置")，指示授权服务器的颁发者uri，资源服务器将默认验证`iss`声明以及`exp`和`nbf`时间戳声明。

在需要自定义验证的情况下，Resource Server附带两个标准验证器，并且还接受自定义`OAuth2TokenValidator`实例。

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-validation-clockskew)自定义时间戳验证

JWT通常有一个有效窗口，`nbf`声明中指示的窗口的开头和`exp`声明中指出的结尾。

但是，每个服务器都可能遇到时钟漂移，这可能导致令牌过期到一个服务器，但不会到另一个服务器。随着协作服务器数量在分布式系统中的增加，这可能会导致一些实施灼伤。

资源服务器使用`JwtTimestampValidator`验证令牌的有效性窗口，并且可以使用`clockSkew`配置它以缓解上述问题：

_@Bean_
JwtDecoder jwtDecoder() {
     NimbusJwtDecoderJwkSupport jwtDecoder = (NimbusJwtDecoderJwkSupport)
             JwtDecoders.withOidcIssuerLocation(issuerUri);

     OAuth2TokenValidator<Jwt> withClockSkew = new DelegatingOAuth2TokenValidator<>(
            new JwtTimestampValidator(Duration.ofSeconds(60)),
            new IssuerValidator(issuerUri));

     jwtDecoder.setJwtValidator(withClockSkew);

     return jwtDecoder;
}

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|默认情况下，资源服务器配置30秒的时钟偏差。|

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-validation-custom)配置自定义验证程序

使用`OAuth2TokenValidator` API添加对`aud`声明的检查很简单：

public class AudienceValidator implements OAuth2TokenValidator<Jwt> {
    OAuth2Error error = new OAuth2Error("invalid_token", "The required audience is missing", null);

    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        if (jwt.getAudience().contains("messaging")) {
            return OAuth2TokenValidatorResult.success();
        } else {
            return OAuth2TokenValidatorResult.failure(error);
        }
    }
}

然后，要添加到资源服务器，需要指定`JwtDecoder`实例：

_@Bean_
JwtDecoder jwtDecoder() {
    NimbusJwtDecoderJwkSupport jwtDecoder = (NimbusJwtDecoderJwkSupport)
        JwtDecoders.withOidcIssuerLocation(issuerUri);

    OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator();
    OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
    OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

    jwtDecoder.setJwtValidator(withAudience);

    return jwtDecoder;
}

### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-claimsetmapping)6.8.7配置声明集映射

Spring Security使用[Nimbus](https://bitbucket.org/connect2id/nimbus-jose-jwt/wiki/Home)库解析JWT并验证其签名。因此，Spring Security受Nimbus对每个字段值的解释以及如何将每个字段强制转换为Java类型。

例如，因为Nimbus与Java 7兼容，所以它不使用`Instant`来表示时间戳字段。

并且完全可以使用不同的库或JWT处理，这可能会使自己的强制决策需要调整。

或者，很简单，资源服务器可能希望根据特定域的原因添加或删除JWT中的声明。

出于这些目的，Resource Server支持使用`MappedJwtClaimSetConverter`映射JWT声明集。

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-claimsetmapping-singleclaim)自定义单个声明的转换

默认情况下，`MappedJwtClaimSetConverter`会尝试将声明强制转换为以下类型：

|   |   |
|---|---|
|Claim|Java Type|
|`aud`|`Collection<String>`|
|`exp`|`Instant`|
|`iat`|`Instant`|
|`iss`|`String`|
|`jti`|`String`|
|`nbf`|`Instant`|
|`sub`|`String`|

可以使用`MappedJwtClaimSetConverter.withDefaults`配置个人声明的转化策略：

_@Bean_
JwtDecoder jwtDecoder() {
    NimbusJwtDecoderJwkSupport jwtDecoder = new NimbusJwtDecoderJwkSupport(jwkSetUri);

    MappedJwtClaimSetConverter converter = MappedJwtClaimSetConverter
            .withDefaults(Collections.singletonMap("sub", this::lookupUserIdBySub));
    jwtDecoder.setJwtClaimSetConverter(converter);

    return jwtDecoder;
}

这将保留所有默认值，但它将覆盖`sub`的默认声明转换器。

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-claimsetmapping-add)添加声明

`MappedJwtClaimSetConverter`也可用于添加自定义声明，例如，以适应现有系统：

MappedJwtClaimSetConverter.withDefaults(Collections.singletonMap("custom", custom -> "value"));

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-claimsetmapping-remove)删除索赔

使用相同的API删除声明也很简单：

MappedJwtClaimSetConverter.withDefaults(Collections.singletonMap("legacyclaim", legacy -> null));

#### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-claimsetmapping-rename)重命名声明

在更复杂的场景中，例如一次咨询多个声明或重命名声明，Resource Server接受任何实现`Converter<Map<String, Object>, Map<String,Object>>`的类：

public class UsernameSubClaimAdapter implements Converter<Map<String, Object>, Map<String, Object>> {
    private final MappedJwtClaimSetConverter delegate =
            MappedJwtClaimSetConverter.withDefaults(Collections.emptyMap());

    public Map<String, Object> convert(Map<String, Object> claims) {
        Map<String, Object> convertedClaims = this.delegate.convert(claims);

        String username = (String) convertedClaims.get("user_name");
        convertedClaims.put("sub", username);

        return convertedClaims;
    }
}

然后，可以像平常一样提供实例：

_@Bean_
JwtDecoder jwtDecoder() {
    NimbusJwtDecoderJwkSupport jwtDecoder = new NimbusJwtDecoderJwkSupport(jwkSetUri);
    jwtDecoder.setJwtClaimSetConverter(new UsernameSubClaimAdapter());
    return jwtDecoder;
}

### [](https://www.springcloud.cc/spring-security.html#oauth2resourceserver-timeouts)6.8.8配置超时

默认情况下，Resource Server使用每个30秒的连接和套接字超时来协调授权服务器。

在某些情况下，这可能太短。此外，它没有考虑更复杂的模式，如退避和发现。

要调整Resource Server连接到授权服务器的方式，`NimbusJwtDecoderJwkSupport`接受`RestOperations`的实例：

_@Bean_
public JwtDecoder jwtDecoder(RestTemplateBuilder builder) {
    RestOperations rest = builder
            .setConnectionTimeout(60000)
            .setReadTimeout(60000)
            .build();

    NimbusJwtDecoderJwkSupport jwtDecoder = new NimbusJwtDecoderJwkSupport(jwkSetUri);
    jwtDecoder.setRestOperations(rest);
    return jwtDecoder;
}

## [](https://www.springcloud.cc/spring-security.html#jc-authentication)6.9认证

到目前为止，我们只看了最基本的身份验证配置。我们来看一些稍微更高级的配置身份验证选项。

### [](https://www.springcloud.cc/spring-security.html#jc-authentication-inmemory)6.9.1内存中认证

我们已经看到了为单个用户配置内存中身份验证的示例。以下是配置多个用户的示例：

_@Bean_
public UserDetailsService userDetailsService() throws Exception {
    // ensure the passwords are encoded properly
    UserBuilder users = User.withDefaultPasswordEncoder();
    InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
    manager.createUser(users.username("user").password("password").roles("USER").build());
    manager.createUser(users.username("admin").password("password").roles("USER","ADMIN").build());
    return manager;
}

### [](https://www.springcloud.cc/spring-security.html#jc-authentication-jdbc)6.9.2 JDBC身份验证

您可以找到支持基于JDBC的身份验证的更新。以下示例假定您已在应用程序中定义了`DataSource`。该[JDBC-javaconfig](https://github.com/spring-projects/spring-security/tree/master/samples/javaconfig/jdbc)样品提供了使用基于JDBC认证的一个完整的示例。

_@Autowired_
private DataSource dataSource;

_@Autowired_
public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    // ensure the passwords are encoded properly
    UserBuilder users = User.withDefaultPasswordEncoder();
    auth
        .jdbcAuthentication()
            .dataSource(dataSource)
            .withDefaultSchema()
            .withUser(users.username("user").password("password").roles("USER"))
            .withUser(users.username("admin").password("password").roles("USER","ADMIN"));
}

### [](https://www.springcloud.cc/spring-security.html#ldap-authentication)6.9.3 LDAP认证

您可以找到支持基于LDAP的身份验证的更新。的[LDAP的javaconfig](https://github.com/spring-projects/spring-security/tree/master/samples/javaconfig/ldap)样品提供了使用基于LDAP的认证的完整的例子。

_@Autowired_
private DataSource dataSource;

_@Autowired_
public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth
        .ldapAuthentication()
            .userDnPatterns("uid={0},ou=people")
            .groupSearchBase("ou=groups");
}

上面的示例使用以下LDIF和嵌入式Apache DS LDAP实例。

**users.ldif。** 

dn: ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: groups

dn: ou=people,dc=springframework,dc=org
objectclass: top
objectclass: organizationalUnit
ou: people

dn: uid=admin,ou=people,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: Rod Johnson
sn: Johnson
uid: admin
userPassword: password

dn: uid=user,ou=people,dc=springframework,dc=org
objectclass: top
objectclass: person
objectclass: organizationalPerson
objectclass: inetOrgPerson
cn: Dianne Emu
sn: Emu
uid: user
userPassword: password

dn: cn=user,ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: groupOfNames
cn: user
uniqueMember: uid=admin,ou=people,dc=springframework,dc=org
uniqueMember: uid=user,ou=people,dc=springframework,dc=org

dn: cn=admin,ou=groups,dc=springframework,dc=org
objectclass: top
objectclass: groupOfNames
cn: admin
uniqueMember: uid=admin,ou=people,dc=springframework,dc=org

### [](https://www.springcloud.cc/spring-security.html#jc-authentication-authenticationprovider)6.9.4 AuthenticationProvider

您可以通过将自定义`AuthenticationProvider`公开为bean来定义自定义身份验证。例如，假设`SpringAuthenticationProvider`实现`AuthenticationProvider`，以下将自定义身份验证：

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|仅在未填充`AuthenticationManagerBuilder`时使用此选项|

_@Bean_
public SpringAuthenticationProvider springAuthenticationProvider() {
    return new SpringAuthenticationProvider();
}

### [](https://www.springcloud.cc/spring-security.html#jc-authentication-userdetailsservice)6.9.5 UserDetailsS​​ervice

您可以通过将自定义`UserDetailsService`公开为bean来定义自定义身份验证。例如，假设`SpringDataUserDetailsService`实现`UserDetailsService`，以下将自定义身份验证：

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|仅在未填充`AuthenticationManagerBuilder`并且未定义`AuthenticationProviderBean`时使用此选项。|

_@Bean_
public SpringDataUserDetailsService springDataUserDetailsService() {
    return new SpringDataUserDetailsService();
}

您还可以通过将`PasswordEncoder`暴露为bean来自定义密码的编码方式。例如，如果使用bcrypt，则可以添加bean定义，如下所示：

_@Bean_
public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

## [](https://www.springcloud.cc/spring-security.html#multiple-httpsecurity)6.10多个HttpSecurity

我们可以配置多个HttpSecurity实例，就像我们可以有多个`<http>`块一样。关键是多次延长`WebSecurityConfigurationAdapter`。例如，以下是具有以`/api/`开头的URL的不同配置的示例。

_@EnableWebSecurity_
public class MultiHttpSecurityConfig {
    _@Bean_                                                             [](https://www.springcloud.cc/spring-security.html#CO10-1)![1](https://www.springcloud.cc/images/1.png)
    public UserDetailsService userDetailsService() throws Exception {
        // ensure the passwords are encoded properly
        UserBuilder users = User.withDefaultPasswordEncoder();
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(users.username("user").password("password").roles("USER").build());
        manager.createUser(users.username("admin").password("password").roles("USER","ADMIN").build());
        return manager;
    }

    _@Configuration_
    _@Order(1)_                                                        [](https://www.springcloud.cc/spring-security.html#CO10-2)![2](https://www.springcloud.cc/images/2.png)
    public static class ApiWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
        protected void configure(HttpSecurity http) throws Exception {
            http
                .antMatcher("/api/**")                               [](https://www.springcloud.cc/spring-security.html#CO10-3)![3](https://www.springcloud.cc/images/3.png)
                .authorizeRequests()
                    .anyRequest().hasRole("ADMIN")
                    .and()
                .httpBasic();
        }
    }

    _@Configuration_                                                   [](https://www.springcloud.cc/spring-security.html#CO10-4)![4](https://www.springcloud.cc/images/4.png)
    public static class FormLoginWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {

        _@Override_
        protected void configure(HttpSecurity http) throws Exception {
            http
                .authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
                .formLogin();
        }
    }
}

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO10-1)|正常配置身份验证|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO10-2)|创建包含`@Order`的`WebSecurityConfigurerAdapter`实例，以指定应首先考虑哪个`WebSecurityConfigurerAdapter`。|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO10-3)|`http.antMatcher`表示此`HttpSecurity`仅适用于以`/api/`开头的网址|
|[![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO10-4)|创建`WebSecurityConfigurerAdapter`的另一个实例。如果URL不以`/api/`开头，则将使用此配置。此配置在`ApiWebSecurityConfigurationAdapter`之后考虑，因为它在`1`之后具有`@Order`值（没有`@Order`默认为持续）。|

## [](https://www.springcloud.cc/spring-security.html#jc-method)6.11方法安全

从版本2.0开始，Spring Security大大提高了对服务层方法的安全性的支持。它支持JSR-250注释安全性以及框架的原始`@Secured`注释。从3.0开始，您还可以使用[基于表达式](https://www.springcloud.cc/spring-security.html#el-access "11.3基于表达式的访问控制")的新[注释](https://www.springcloud.cc/spring-security.html#el-access "11.3 Expression-Based Access Control")。您可以将安全性应用于单个bean，使用`intercept-methods`元素来装饰bean声明，或者可以使用AspectJ样式切入点在整个服务层中保护多个bean。

### [](https://www.springcloud.cc/spring-security.html#enableglobalmethodsecurity)6.11.1 EnableGlobalMethodSecurity

我们可以在任何`@Configuration`实例上使用`@EnableGlobalMethodSecurity`注释启用基于注释的安全性。例如，以下内容将启用Spring Security的`@Secured`注释。

_@EnableGlobalMethodSecurity(securedEnabled = true)_
public class MethodSecurityConfig {
// ...
}

然后，在方法（类或接口）上添加注释会相应地限制对该方法的访问。Spring Security的本机注释支持为该方法定义了一组属性。这些将传递给AccessDecisionManager，以便做出实际决定：

public interface BankService {

_@Secured("IS_AUTHENTICATED_ANONYMOUSLY")_
public Account readAccount(Long id);

_@Secured("IS_AUTHENTICATED_ANONYMOUSLY")_
public Account[] findAccounts();

_@Secured("ROLE_TELLER")_
public Account post(Account account, double amount);
}

可以使用支持JSR-250注释

_@EnableGlobalMethodSecurity(jsr250Enabled = true)_
public class MethodSecurityConfig {
// ...
}

这些是基于标准的，允许应用简单的基于角色的约束，但没有强大的Spring Security本机注释。要使用新的基于表达式的语法，您可以使用

_@EnableGlobalMethodSecurity(prePostEnabled = true)_
public class MethodSecurityConfig {
// ...
}

和等效的Java代码

public interface BankService {

_@PreAuthorize("isAnonymous()")_
public Account readAccount(Long id);

_@PreAuthorize("isAnonymous()")_
public Account[] findAccounts();

_@PreAuthorize("hasAuthority('ROLE_TELLER')")_
public Account post(Account account, double amount);
}

### [](https://www.springcloud.cc/spring-security.html#globalmethodsecurityconfiguration)6.11.2 GlobalMethodSecurityConfiguration

有时您可能需要执行比`@EnableGlobalMethodSecurity`注释允许更复杂的操作。对于这些实例，您可以扩展`GlobalMethodSecurityConfiguration`，确保子类上存在`@EnableGlobalMethodSecurity`注释。例如，如果要提供自定义`MethodSecurityExpressionHandler`，可以使用以下配置：

_@EnableGlobalMethodSecurity(prePostEnabled = true)_
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {
    _@Override_
    protected MethodSecurityExpressionHandler createExpressionHandler() {
        // ... create and return custom MethodSecurityExpressionHandler ...
        return expressionHandler;
    }
}

有关可以覆盖的方法的其他信息，请参阅`GlobalMethodSecurityConfiguration` Javadoc。

## [](https://www.springcloud.cc/spring-security.html#post-processing-configured-objects)6.12后处理配置对象

Spring Security的Java配置不会公开它配置的每个对象的每个属性。这简化了大多数用户的配置。毕竟，如果每个属性都被暴露，用户可以使用标准bean配置。

虽然有充分的理由不直接公开每个属性，但用户可能仍需要更高级的配置选项。为了解决这个问题，Spring Security引入了`ObjectPostProcessor`的概念，可以用来修改或替换Java配置创建的许多Object实例。例如，如果要在`FilterSecurityInterceptor`上配置`filterSecurityPublishAuthorizationSuccess`属性，可以使用以下命令：

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .anyRequest().authenticated()
            .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                public <O extends FilterSecurityInterceptor> O postProcess(
                        O fsi) {
                    fsi.setPublishAuthorizationSuccess(true);
                    return fsi;
                }
            });
}

## [](https://www.springcloud.cc/spring-security.html#jc-custom-dsls)6.13自定义DSL

您可以在Spring Security中提供自己的自定义DSL。例如，您可能看起来像这样：

public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
    private boolean flag;

    _@Override_
    public void init(H http) throws Exception {
        // any method that adds another configurer
        // must be done in the init method
        http.csrf().disable();
    }

    _@Override_
    public void configure(H http) throws Exception {
        ApplicationContext context = http.getSharedObject(ApplicationContext.class);

        // here we lookup from the ApplicationContext. You can also just create a new instance.
        MyFilter myFilter = context.getBean(MyFilter.class);
        myFilter.setFlag(flag);
        http.addFilterBefore(myFilter, UsernamePasswordAuthenticationFilter.class);
    }

    public MyCustomDsl flag(boolean value) {
        this.flag = value;
        return this;
    }

    public static MyCustomDsl customDsl() {
        return new MyCustomDsl();
    }
}

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|这实际上是如何实现像`HttpSecurity.authorizeRequests()`这样的方法。|

然后可以像这样使用自定义DSL：

_@EnableWebSecurity_
public class Config extends WebSecurityConfigurerAdapter {
    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .apply(customDsl())
                .flag(true)
                .and()
            ...;
    }
}

代码按以下顺序调用：

- 调用`Config`s configure方法中的代码
- 调用`MyCustomDsl的init方法中的代码
- 调用`MyCustomDsl的configure方法中的代码

如果需要，您可以`WebSecurityConfiguerAdapter`默认使用`SpringFactories`添加`MyCustomDsl`。例如，您将在名为`META-INF/spring.factories`的类路径上创建一个资源，其中包含以下内容：

**META-INF / spring.factories。** 

org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer = sample.MyCustomDsl

希望禁用默认值的用户可以明确地这样做。

_@EnableWebSecurity_
public class Config extends WebSecurityConfigurerAdapter {
    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .apply(customDsl()).disable()
            ...;
    }
}

## [](https://www.springcloud.cc/spring-security.html#ns-config)7.安全命名空间配置

## [](https://www.springcloud.cc/spring-security.html#introduction)7.1简介

自Spring Framework版本2.0起，命名空间配置已可用。它允许您使用其他XML模式中的元素来补充传统的Spring bean应用程序上下文语法。您可以在Spring [参考文档中](https://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/)找到更多信息。命名空间元素可以简单地用于允许更简洁的方式来配置单个bean，或者更有力地用于定义替代配置语法，该语法更紧密地匹配问题域并且隐藏用户的底层复杂性。一个简单的元素可能会隐藏多个bean和处理步骤被添加到应用程序上下文的事实。例如，将以下元素从安全名称空间添加到应用程序上下文将启动嵌入式LDAP服务器，以便在应用程序中测试使用：

<security:ldap-server />

这比连接等效的Apache Directory Server bean简单得多。`ldap-server`元素上的属性支持最常见的替代配置要求，并且用户不必担心他们需要创建哪些bean以及bean属性名称是什么。 [[1]](https://www.springcloud.cc/spring-security.html#ftn.d5e1980)。在编辑应用程序上下文文件时使用良好的XML编辑器应该提供有关可用属性和元素的信息。我们建议您试用[Spring工具套件，](https://spring.io/tools/sts)因为它具有处理标准Spring命名空间的特殊功能。

要在应用程序上下文中开始使用安全命名空间，您需要在类路径上使用`spring-security-config` jar。然后，您需要做的就是将架构声明添加到应用程序上下文文件中：

<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:security="http://www.springframework.org/schema/security"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/security
        http://www.springframework.org/schema/security/spring-security.xsd">
    ...
</beans>

在您将看到的许多示例中（以及示例应用程序中），我们经常使用“security”作为默认命名空间而不是“beans”，这意味着我们可以在所有安全命名空间元素上省略前缀，从而制作内容更容易阅读。如果您将应用程序上下文划分为单独的文件并在其中一个文件中包含大部分安全配置，则可能还需要执行此操作。然后，您的安全应用程序上下文文件将如下所示

<beans:beans xmlns="http://www.springframework.org/schema/security"
xmlns:beans="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/security
        http://www.springframework.org/schema/security/spring-security.xsd">
    ...
</beans:beans>

我们假设从现在开始在本章中使用了这种语法。

### [](https://www.springcloud.cc/spring-security.html#design-of-the-namespace)7.1.1命名空间的设计

命名空间旨在捕获框架的最常见用法，并提供简化和简洁的语法，以便在应用程序中启用它们。该设计基于框架内的大规模依赖性，可分为以下几个方面：

- _Web / HTTP安全_ - 最复杂的部分。设置用于应用框架身份验证机制的过滤器和相关服务bean，保护URL，呈现登录和错误页面等等。
- _业务对象（方法）安全性_ - 保护服务层的选项。
- _AuthenticationManager_ - 处理来自框架其他部分的身份验证请求。
- _AccessDecisionManager_ - 为web和方法安全性提供访问决策。将注册一个默认值，但您也可以选择使用使用普通Spring bean语法声明的自定义一个。
- _AuthenticationProvider_ s - 身份验证管理器对用户进行_身份验证_的机制。命名空间提供了对多个标准选项的支持，也提供了添加使用传统语法声明的自定义bean的方法。
- _UserDetailsS​​ervice_ - 与身份验证提供程序密切相关，但通常也需要其他bean。

我们将在以下部分中看到如何配置它们。

## [](https://www.springcloud.cc/spring-security.html#ns-getting-started)7.2安全命名空间配置入门

在本节中，我们将介绍如何构建命名空间配置以使用框架的一些主要功能。假设您最初希望尽快启动并运行，并将认证支持和访问控制添加到现有的web应用程序，并进行一些测试登录。然后，我们将了解如何更改以对数据库或其他安全存储库进行身份验证。在后面的部分中，我们将介绍更高级的命名空间配置选项。

### [](https://www.springcloud.cc/spring-security.html#ns-web-xml)7.2.1 web。xml配置

您需要做的第一件事是将以下过滤器声明添加到您的`web.xml`文件中：

<filter>
<filter-name>springSecurityFilterChain</filter-name>
<filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>

<filter-mapping>
<filter-name>springSecurityFilterChain</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>

这为Spring Security web基础设施提供了一个钩子。`DelegatingFilterProxy`是一个Spring Framework类，它委托给一个过滤器实现，在你的应用程序上下文中定义为一个Spring bean。在这种情况下，bean被命名为“springSecurityFilterChain”，它是由命名空间创建的内部基础结构bean，用于处理web安全性。请注意，您不应自己使用此bean名称。将此添加到`web.xml`后，您就可以开始编辑应用程序上下文文件了。使用`<http>`元素配置Web安全服务。

### [](https://www.springcloud.cc/spring-security.html#ns-minimal)7.2.2最小<http>配置

启用web安全性所需的全部内容是

<http>
<intercept-url pattern="/**" access="hasRole('USER')" />
<form-login />
<logout />
</http>

这表示我们希望应用程序中的所有URL都是安全的，需要角色`ROLE_USER`来访问它们，我们希望使用带有用户名和密码的表单登录到应用程序，并且我们希望注册的注销URL将允许我们退出应用程序。`<http>`元素是所有与web相关的命名空间功能的父元素。`<intercept-url>`元素定义了`pattern`，它使用ant路径样式语法[[2]](https://www.springcloud.cc/spring-security.html#ftn.d5e2035)与传入请求的URL进行匹配。您还可以使用正则表达式匹配作为替代方法（有关详细信息，请参阅命名空间附录）。`access`属性定义与给定模式匹配的请求的访问要求。使用默认配置时，这通常是以逗号分隔的角色列表，其中一个角色必须允许用户发出请求。前缀“ROLE_”是一个标记，表示应该与用户的权限进行简单比较。换句话说，应该使用正常的基于角色的检查。Spring Security中的访问控制不仅限于使用简单角色（因此使用前缀来区分不同类型的安全属性）。稍后我们将看到解释如何变化脚注：[`access`属性中逗号分隔值的解释取决于所使用的-1-的实现。在Spring Security 3.0中，该属性也可以用-2-填充。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|===|

您可以使用多个`<intercept-url>`元素为不同的URL集定义不同的访问要求，但它们将按列出的顺序进行评估，并将使用第一个匹配项。所以你必须把最具体的比赛放在最上面。您还可以添加`method`属性以限制与特定HTTP方法（`GET`，`POST`，`PUT`等）的匹配。

===

要添加一些用户，您可以直接在命名空间中定义一组测试数据：

<authentication-manager>
<authentication-provider>
    <user-service>
    <!-- Password is prefixed with {noop} to indicate to DelegatingPasswordEncoder that
    NoOpPasswordEncoder should be used. This is not safe for production, but makes reading
    in samples easier. Normally passwords should be hashed using BCrypt -->
    <user name="jimi" password="{noop}jimispassword" authorities="ROLE_USER, ROLE_ADMIN" />
    <user name="bob" password="{noop}bobspassword" authorities="ROLE_USER" />
    </user-service>
</authentication-provider>
</authentication-manager>

这是存储相同密码的安全方式的示例。密码以`{bcrypt}`为前缀，指示`DelegatingPasswordEncoder`，它支持任何配置的`PasswordEncoder`匹配，密码使用BCrypt进行哈希处理：

<authentication-manager>
<authentication-provider>
    <user-service>
    <user name="jimi" password="{bcrypt}$2a$10$ddEWZUl8aU0GdZPPpy7wbu82dvEw/pBpbRvDQRqA41y6mK1CoH00m"
            authorities="ROLE_USER, ROLE_ADMIN" />
    <user name="bob" password="{bcrypt}$2a$10$/elFpMBnAYYig6KRR5bvOOYeZr1ie1hSogJryg9qDlhza4oCw1Qka"
            authorities="ROLE_USER" />
    <user name="jimi" password="{noop}jimispassword" authorities="ROLE_USER, ROLE_ADMIN" />
    <user name="bob" password="{noop}bobspassword" authorities="ROLE_USER" />
    </user-service>
</authentication-provider>
</authentication-manager>

如果您熟悉框架的命名空间前版本，那么您可能已经大致猜测了这里发生了什么。`<http>`元素负责创建`FilterChainProxy`及其使用的过滤器bean。由于过滤器位置是预定义的，因此不正确的过滤器排序等常见问题不再是问题。

`<authentication-provider>`元素创建一个`DaoAuthenticationProvider` bean，`<user-service>`元素创建一个`InMemoryDaoImpl`。所有`authentication-provider`元素必须是`<authentication-manager>`元素的子元素，这将创建`ProviderManager`并向其注册身份验证提供程序。您可以在[命名空间附录中](https://www.springcloud.cc/spring-security.html#appendix-namespace "15.2安全命名空间")找到有关bean创建的更多详细信息。如果您想要开始了解框架中的重要类以及它们的使用方式，特别是如果您想稍后自定义内容，则值得交叉检查。

上面的配置定义了两个用户，他们的密码和他们在应用程序中的角色（将用于访问控制）。也可以使用`user-service`上的`properties`属性从标准属性文件加载用户信息。有关文件格式的更多详细信息，请参阅[内存中身份验证](https://www.springcloud.cc/spring-security.html#core-services-in-memory-service "内存中身份验证")部分。使用`<authentication-provider>`元素意味着身份验证管理器将使用用户信息来处理身份验证请求。您可以使用多个`<authentication-provider>`元素来定义不同的身份验证源，并依次查阅每个身份验证源。

此时，您应该可以启动应用程序，并且您将需要登录才能继续。尝试一下，或尝试尝试项目附带的“教程”示例应用程序。

### [](https://www.springcloud.cc/spring-security.html#ns-form-and-basic)7.2.3表单和基本登录选项

当您被提示登录时，您可能想知道登录表单的来源，因为我们没有提及任何HTML文件或JSP。事实上，由于我们没有明确设置登录页面的URL，Spring Security会根据启用的功能自动生成一个URL，并使用处理提交的登录的URL的标准值，默认目标URL用户将在登录后发送，等等。但是，命名空间提供了大量支持，允许您自定义这些选项。例如，如果要提供自己的登录页面，可以使用：

<http>
<intercept-url pattern="/login.jsp*" access="IS_AUTHENTICATED_ANONYMOUSLY"/>
<intercept-url pattern="/**" access="ROLE_USER" />
<form-login login-page='/login.jsp'/>
</http>

另请注意，我们添加了一个额外的`intercept-url`元素，表示任何对登录页面的请求都应该可供匿名用户[[3]](https://www.springcloud.cc/spring-security.html#ftn.d5e2082)以及[AuthenticatedVoter](https://www.springcloud.cc/spring-security.html#authz-authenticated-voter "AuthenticatedVoter使用")类使用，以获取有关如何处理值`IS_AUTHENTICATED_ANONYMOUSLY`的更多详细信息]。否则，请求将与模式/ **匹配，并且无法访问登录页面本身！这是一个常见的配置错误，将导致应用程序中出现无限循环。如果您的登录页面看起来是安全的，Spring Security将在日志中发出警告。通过为模式定义单独的`http`元素，也可以使所有与特定模式匹配的请求完全绕过安全过滤器链：

<http pattern="/css/**" security="none"/>
<http pattern="/login.jsp*" security="none"/>

<http use-expressions="false">
<intercept-url pattern="/**" access="ROLE_USER" />
<form-login login-page='/login.jsp'/>
</http>

从Spring Security 3.1开始，现在可以使用多个`http`元素为不同的请求模式定义单独的安全过滤器链配置。如果`http`元素中省略了`pattern`属性，则它匹配所有请求。创建不安全模式是此语法的一个简单示例，其中模式映射到空过滤器链[[4]](https://www.springcloud.cc/spring-security.html#ftn.d5e2093)。我们将在有关[安全过滤器链](https://www.springcloud.cc/spring-security.html#filter-chains-with-ns "10.1.6高级命名空间配置")的章节中更详细地介绍这种新语法。

重要的是要意识到这些不安全的请求将完全忽略任何Spring Security web相关配置或`requires-channel`等附加属性，因此您将无法访问有关当前用户或呼叫的信息请求期间的安全方法。如果您仍希望应用安全过滤器链，请使用`access='IS_AUTHENTICATED_ANONYMOUSLY'`作为替代。

如果要使用基本身份验证而不是表单登录，请将配置更改为

<http use-expressions="false">
<intercept-url pattern="/**" access="ROLE_USER" />
<http-basic />
</http>

然后，基本身份验证将优先，并将用于在用户尝试访问受保护资源时提示登录。如果您希望使用表单登录，则仍可在此配置中使用表单登录，例如通过嵌入在另一个web页面中的登录表单。

#### [](https://www.springcloud.cc/spring-security.html#ns-form-target)设置默认的登录后目的地

如果尝试访问受保护资源时未提示表单登录，则`default-target-url`选项将起作用。这是用户成功登录后将使用的URL，默认为“/”。您还可以通过将`always-use-default-target`属性设置为“true”来配置事物，以便用户_始终_在此页面结束（无论登录是“按需”还是明确选择登录）。如果您的应用程序始终要求用户在“主页”页面启动，则此选项非常有用，例如：

<http pattern="/login.htm*" security="none"/>
<http use-expressions="false">
<intercept-url pattern='/**' access='ROLE_USER' />
<form-login login-page='/login.htm' default-target-url='/home.htm'
        always-use-default-target='true' />
</http>

要进一步控制目标，可以使用`authentication-success-handler-ref`属性作为`default-target-url`的替代。引用的bean应该是`AuthenticationSuccessHandler`的实例。您可以在[Core Filters](https://www.springcloud.cc/spring-security.html#form-login-flow-handling "认证成功与失败的应用流程")一章以及命名空间附录中找到更多相关信息，以及有关如何在身份验证失败时自定义流的信息。

### [](https://www.springcloud.cc/spring-security.html#ns-logout)7.2.4注销处理

`logout`元素通过导航到特定URL添加了对注销的支持。默认的注销URL为`/logout`，但您可以使用`logout-url`属性将其设置为其他内容。有关其他可用属性的更多信息，请参见命名空间附录。

### [](https://www.springcloud.cc/spring-security.html#ns-auth-providers)7.2.5使用其他身份验证提供程序

实际上，除了添加到应用程序上下文文件中的一些名称之外，您还需要一个更具伸缩性的用户信息源。您很可能希望将用户信息存储在数据库或LDAP服务器中。LDAP命名空间配置在[LDAP章节中处理](https://www.springcloud.cc/spring-security.html#ldap "12.3 LDAP认证")，因此我们不在此处介绍它。如果您的应用程序上下文中有Spring Security的`UserDetailsService`自定义实现，名为“myUserDetailsS​​ervice”，那么您可以使用以下方法对此进行身份验证

<authentication-manager>
    <authentication-provider user-service-ref='myUserDetailsService'/>
</authentication-manager>

如果要使用数据库，则可以使用

<authentication-manager>
<authentication-provider>
    <jdbc-user-service data-source-ref="securityDataSource"/>
</authentication-provider>
</authentication-manager>

其中“securityDataSource”是应用程序上下文中`DataSource` bean的名称，指向包含标准Spring Security [用户数据表的数据库](https://www.springcloud.cc/spring-security.html#user-schema "15.1.1用户架构")。或者，您可以使用`user-service-ref`属性配置Spring Security `JdbcDaoImpl` bean并指向该bean：

<authentication-manager>
<authentication-provider user-service-ref='myUserDetailsService'/>
</authentication-manager>

<beans:bean id="myUserDetailsService"
    class="org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl">
<beans:property name="dataSource" ref="dataSource"/>
</beans:bean>

您还可以使用标准`AuthenticationProvider` bean，如下所示

<authentication-manager>
    <authentication-provider ref='myAuthenticationProvider'/>
</authentication-manager>

其中`myAuthenticationProvider`是应用程序上下文中实现`AuthenticationProvider`的bean的名称。您可以使用多个`authentication-provider`元素，在这种情况下，将按照声明的顺序查询提供程序。有关如何使用命名空间配置Spring Security `AuthenticationManager`的更多信息，请参见[第7.6节“身份验证管理器和命名空间”](https://www.springcloud.cc/spring-security.html#ns-auth-manager "7.6验证管理器和命名空间")。

#### [](https://www.springcloud.cc/spring-security.html#ns-password-encoder)添加密码编码器

应始终使用为此目的设计的安全散列算法对密码进行编码（不是像SHA或MD5这样的标准算法）。这是`<password-encoder>`元素支持的。使用bcrypt编码的密码，原始身份验证提供程序配置如下所示：

<beans:bean name="bcryptEncoder"
    class="org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder"/>

<authentication-manager>
<authentication-provider>
    <password-encoder ref="bcryptEncoder"/>
    <user-service>
    <user name="jimi" password="$2a$10$ddEWZUl8aU0GdZPPpy7wbu82dvEw/pBpbRvDQRqA41y6mK1CoH00m"
            authorities="ROLE_USER, ROLE_ADMIN" />
    <user name="bob" password="$2a$10$/elFpMBnAYYig6KRR5bvOOYeZr1ie1hSogJryg9qDlhza4oCw1Qka"
            authorities="ROLE_USER" />
    </user-service>
</authentication-provider>
</authentication-manager>

对于大多数情况，bcrypt是一个不错的选择，除非你有一个强制你使用不同算法的遗留系统。如果您使用简单的散列算法，或者更糟糕的是，存储纯文本密码，那么您应该考虑迁移到更安全的选项，如bcrypt。

## [](https://www.springcloud.cc/spring-security.html#ns-web-advanced)7.3高级Web功能

### [](https://www.springcloud.cc/spring-security.html#ns-remember-me)7.3.1记住我的身份验证

有关remember-me命名空间配置的信息，请参阅单独的[Remember-Me章节](https://www.springcloud.cc/spring-security.html#remember-me "10.5记住我的身份验证")。

### [](https://www.springcloud.cc/spring-security.html#ns-requires-channel)7.3.2添加HTTP / HTTPS通道安全性

如果您的应用程序同时支持HTTP和HTTPS，并且您要求只能通过HTTPS访问特定URL，则使用`<intercept-url>`上的`requires-channel`属性直接支持此功能：

<http>
<intercept-url pattern="/secure/**" access="ROLE_USER" requires-channel="https"/>
<intercept-url pattern="/**" access="ROLE_USER" requires-channel="any"/>
...
</http>

有了这种配置，如果用户尝试使用HTTP访问与“/ secure / **”模式匹配的任何内容，它们将首先被重定向到HTTPS URL [[5]](https://www.springcloud.cc/spring-security.html#ftn.d5e2165)。可用选项为“http”，“https”或“any”。使用值“any”表示可以使用HTTP或HTTPS。

如果您的应用程序使用HTTP和/或HTTPS的非标准端口，则可以指定端口映射列表，如下所示：

<http>
...
<port-mappings>
    <port-mapping http="9080" https="9443"/>
</port-mappings>
</http>

请注意，为了确保安全，应用程序根本不应使用HTTP或在HTTP和HTTPS之间切换。它应该以HTTPS（用户输入HTTPS URL）开始，并始终使用安全连接，以避免任何中间人攻击的可能性。

### [](https://www.springcloud.cc/spring-security.html#ns-session-mgmt)7.3.3会话管理

#### [](https://www.springcloud.cc/spring-security.html#detecting-timeouts)检测超时

您可以配置Spring Security以检测无效会话ID的提交，并将用户重定向到适当的URL。这是通过`session-management`元素实现的：

<http>
...
<session-management invalid-session-url="/invalidSession.htm" />
</http>

请注意，如果您使用此机制来检测会话超时，则可能会错误地报告错误，如果用户注销，然后在不关闭浏览器的情况下重新登录。这是因为当您使会话无效时，会话cookie不会被清除，即使用户已注销，也会重新提交。您可以在注销时显式删除JSESSIONID cookie，例如在注销处理程序中使用以下语法：

<http>
<logout delete-cookies="JSESSIONID" />
</http>

不幸的是，这不能保证与每个servlet容器一起使用，因此您需要在您的环境中对其进行测试

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|===如果您在代理后面运行应用程序，您也可以通过配置代理服务器来删除会话cookie。例如，使用Apache HTTPD的mod_headers，以下指令将通过在对注销请求的响应中使其失效来删除`JSESSIONID` cookie（假设应用程序部署在路径`/tutorial`下）：|

<LocationMatch "/tutorial/logout">
Header always set Set-Cookie "JSESSIONID=;Path=/tutorial;Expires=Thu, 01 Jan 1970 00:00:00 GMT"
</LocationMatch>

===

#### [](https://www.springcloud.cc/spring-security.html#ns-concurrent-sessions)并发会话控制

如果您希望对单个用户登录应用程序的能力施加约束，Spring Security通过以下简单添加支持此开箱即用。首先，您需要将以下侦听器添加到`web.xml`文件中，以使Spring Security更新有关会话生命周期事件的信息：

<listener>
<listener-class>
    org.springframework.security.web.session.HttpSessionEventPublisher
</listener-class>
</listener>

然后将以下行添加到应用程序上下文中：

<http>
...
<session-management>
    <concurrency-control max-sessions="1" />
</session-management>
</http>

这将阻止用户多次登录 - 第二次登录将导致第一次失效。通常您更愿意阻止第二次登录，在这种情况下您可以使用

<http>
...
<session-management>
    <concurrency-control max-sessions="1" error-if-maximum-exceeded="true" />
</session-management>
</http>

然后将拒绝第二次登录。“被拒绝”是指如果使用基于表单的登录，用户将被发送到`authentication-failure-url`。如果第二次认证是通过另一种非交互机制发生的，例如“记住我”，则会向客户端发送“未授权”（401）错误。如果您想要使用错误页面，则可以将属性`session-authentication-error-url`添加到`session-management`元素。

如果您使用自定义身份验证筛选器进行基于表单的登录，则必须明确配置并发会话控制支持。更多详细信息可在“ [会话管理”一章中找到](https://www.springcloud.cc/spring-security.html#session-mgmt "10.9会话管理")。

#### [](https://www.springcloud.cc/spring-security.html#ns-session-fixation)会话固定攻击保护

[会话固定](https://en.wikipedia.org/wiki/Session_fixation)攻击是潜在的风险，恶意攻击者可能通过访问站点来创建会话，然后说服其他用户使用相同的会话登录（通过向他们发送包含会话标识符作为参数的链接，例）。Spring Security通过在用户登录时创建新会话或以其他方式更改会话ID来自动防止这种情况。如果您不需要此保护，或者它与某些其他要求冲突，您可以使用{来控制行为`<session-management>`上的2 /}属性，有四个选项

- `none` - 不要做任何事。原始会话将保留。
- `newSession` - 创建一个新的“干净”会话，而不复制现有会话数据（Spring Security - 相关属性仍将被复制）。
- `migrateSession` - 创建新会话并将所有现有会话属性复制到新会话。这是Servlet 3.0或旧容器中的默认设置。
- `changeSessionId` - 不要创建新会话。而是使用Servlet容器（`HttpServletRequest#changeSessionId()`）提供的会话固定保护。此选项仅适用于Servlet 3.1（Java EE 7）和更新的容器。在旧容器中指定它将导致异常。这是Servlet 3.1和更新容器中的默认设置。

发生会话固定保护时，会导致在应用程序上下文中发布`SessionFixationProtectionEvent`。如果您使用`changeSessionId`，这种保护会_也_导致任何`javax.servlet.http.HttpSessionIdListener` S是通知，所以如果你的代码侦听这两个事件谨慎使用。有关其他信息，请参阅[会话管理](https://www.springcloud.cc/spring-security.html#session-mgmt "10.9会话管理")章节。

### [](https://www.springcloud.cc/spring-security.html#ns-openid)7.3.4 OpenID支持

除了普通的基于表单的登录之外，命名空间支持[OpenID](https://openid.net/)登录，只需进行简单的更改：

<http>
<intercept-url pattern="/**" access="ROLE_USER" />
<openid-login />
</http>

然后，您应该使用OpenID提供程序（例如myopenid.com）注册自己，并将用户信息添加到内存中`<user-service>`：

<user name="http://jimi.hendrix.myopenid.com/" authorities="ROLE_USER" />

您应该能够使用`myopenid.com`站点进行身份验证登录。通过在`openid-login`元素上设置`user-service-ref`属性，也可以选择特定的`UserDetailsService` bean来使用OpenID。有关更多信息，请参阅上一节有关[身份验证提供程](https://www.springcloud.cc/spring-security.html#ns-auth-providers "7.2.5使用其他身份验证提供程序") 请注意，我们已从上述用户配置中省略了password属性，因为此组用户数据仅用于加载用户的权限。将在内部生成随机密码，以防止您意外地将此用户数据用作配置中其他位置的身份验证源。

#### [](https://www.springcloud.cc/spring-security.html#attribute-exchange)属性交换

支持OpenID [属性交换](https://openid.net/specs/openid-attribute-exchange-1_0.html)。例如，以下配置将尝试从OpenID提供程序检索电子邮件和全名，以供应用程序使用：

<openid-login>
<attribute-exchange>
    <openid-attribute name="email" type="http://axschema.org/contact/email" required="true"/>
    <openid-attribute name="name" type="http://axschema.org/namePerson"/>
</attribute-exchange>
</openid-login>

每个OpenID属性的“类型”是由特定模式确定的URI，在本例中为[http://axschema.org/](http://axschema.org/)。如果必须检索属性以进行成功验证，则可以设置`required`属性。支持的确切架构和属性取决于您的OpenID提供程序。属性值作为身份验证过程的一部分返回，之后可以使用以下代码进行访问：

OpenIDAuthenticationToken token =
    (OpenIDAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
List<OpenIDAttribute> attributes = token.getAttributes();

`OpenIDAttribute`包含属性类型和检索到的值（或多值属性的值）。在我们查看[技术概述](https://www.springcloud.cc/spring-security.html#core-components "8.1.2核心组件")章节中的核心Spring Security组件时，我们将看到更多关于如何使用`SecurityContextHolder`类的信息。如果您希望使用多个身份提供程序，也支持多个属性交换配置。您可以提供多个`attribute-exchange`元素，每个元素使用`identifier-matcher`属性。它包含一个正则表达式，该表达式将与用户提供的OpenID标识符进行匹配。请参阅代码库中的OpenID示例应用程序以获取示例配置，为Google，Yahoo和MyOpenID提供程序提供不同的属性列表。

### [](https://www.springcloud.cc/spring-security.html#ns-headers)7.3.5响应标头

有关如何自定义headers元素的其他信息，请参阅参考的[第10.8节“安全HTTP响应标头”](https://www.springcloud.cc/spring-security.html#headers "10.8安全HTTP响应标头")部分。

### [](https://www.springcloud.cc/spring-security.html#ns-custom-filters)7.3.6添加自己的过滤器

如果您以前使用过Spring Security，那么您将知道该框架维护了一系列过滤器以便应用其服务。您可能希望将自己的过滤器添加到特定位置的堆栈，或者使用当前没有命名空间配置选项的Spring Security过滤器（例如，CAS）。或者您可能希望使用标准命名空间过滤器的自定义版本，例如由`<form-login>`元素创建的`UsernamePasswordAuthenticationFilter`，利用明确使用bean可用的一些额外配置选项。如何通过名称空间配置来完成此操作，因为过滤器链未直接公开？

使用命名空间时，始终严格执行过滤器的顺序。在创建应用程序上下文时，过滤器bean按名称空间处理代码进行排序，标准Spring Security过滤器在名称空间中都有一个别名和一个众所周知的位置。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|===在以前的版本中，排序发生在创建过滤器实例之后，在应用程序上下文的后处理期间。在版本3.0+中，现在在实例化类之前，在bean元数据级别完成排序。这对于如何将自己的过滤器添加到堆栈有影响，因为在解析`<http>`元素期间必须知道整个过滤器列表，因此语法在3.0中略有改变。===|

[表7.1“标准过滤器别名和排序”](https://www.springcloud.cc/spring-security.html#filter-stack "表7.1。 标准过滤器别名和订购")中显示了创建过滤器的过滤器，别名和名称空间元素/属性。过滤器按它们在过滤器链中出现的顺序列出。

[](https://www.springcloud.cc/spring-security.html#filter-stack)

**表7.1。标准过滤器别名和订购**

|别号|过滤类|命名空间元素或属性|
|:--|:--|:--|
|CHANNEL_FILTER|`ChannelProcessingFilter`|`http/intercept-url@requires-channel`|
|SECURITY_CONTEXT_FILTER|`SecurityContextPersistenceFilter`|`http`|
|CONCURRENT_SESSION_FILTER|`ConcurrentSessionFilter`|`session-management/concurrency-control`|
|HEADERS_FILTER|`HeaderWriterFilter`|`http/headers`|
|CSRF_FILTER|`CsrfFilter`|`http/csrf`|
|LOGOUT_FILTER|`LogoutFilter`|`http/logout`|
|X509_FILTER|`X509AuthenticationFilter`|`http/x509`|
|PRE_AUTH_FILTER|`AbstractPreAuthenticatedProcessingFilter` Subclasses|N/A|
|CAS_FILTER|`CasAuthenticationFilter`|N/A|
|FORM_LOGIN_FILTER|`UsernamePasswordAuthenticationFilter`|`http/form-login`|
|BASIC_AUTH_FILTER|`BasicAuthenticationFilter`|`http/http-basic`|
|SERVLET_API_SUPPORT_FILTER|`SecurityContextHolderAwareRequestFilter`|`http/@servlet-api-provision`|
|JAAS_API_SUPPORT_FILTER|`JaasApiIntegrationFilter`|`http/@jaas-api-provision`|
|REMEMBER_ME_FILTER|`RememberMeAuthenticationFilter`|`http/remember-me`|
|ANONYMOUS_FILTER|`AnonymousAuthenticationFilter`|`http/anonymous`|
|SESSION_MANAGEMENT_FILTER|`SessionManagementFilter`|`session-management`|
|EXCEPTION_TRANSLATION_FILTER|`ExceptionTranslationFilter`|`http`|
|FILTER_SECURITY_INTERCEPTOR|`FilterSecurityInterceptor`|`http`|
|SWITCH_USER_FILTER|`SwitchUserFilter`|N/A|

  

您可以使用`custom-filter`元素和其中一个名称将自己的过滤器添加到堆栈，以指定过滤器应显示的位置：

<http>
<custom-filter position="FORM_LOGIN_FILTER" ref="myFilter" />
</http>

<beans:bean id="myFilter" class="com.mycompany.MySpecialAuthenticationFilter"/>

如果希望在堆栈中的另一个过滤器之前或之后插入过滤器，也可以使用`after`或`before`属性。名称“FIRST”和“LAST”可与`position`属性一起使用，以指示您希望过滤器分别出现在整个堆栈之前或之后。

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|===|

如果要插入的自定义过滤器可能与命名空间创建的标准过滤器之一占据相同的位置，则重要的是不要错误地包含命名空间版本。删除任何创建要替换其功能的过滤器的元素。

请注意，您无法替换使用`<http>`元素本身创建的过滤器 - `SecurityContextPersistenceFilter`，`ExceptionTranslationFilter`或`FilterSecurityInterceptor`。默认情况下会添加其他一些过滤器，但您可以禁用它们。默认情况下会添加`AnonymousAuthenticationFilter`，除非您禁用[会话固定保护](https://www.springcloud.cc/spring-security.html#ns-session-fixation "会话固定攻击保护")，否则还会在过滤器链中添加`SessionManagementFilter`。

===

如果要替换需要身份验证入口点的命名空间过滤器（即，未经身份验证的用户尝试访问安全资源而触发身份验证过程），则还需要添加自定义入口点bean。

#### [](https://www.springcloud.cc/spring-security.html#ns-entry-point-ref)设置自定义AuthenticationEntryPoint

如果您没有使用表单登录，OpenID或通过命名空间进行基本身份验证，您可能需要使用传统的bean语法定义身份验证过滤器和入口点，并将它们链接到命名空间，如我们刚才所见。可以使用`<http>`元素上的`entry-point-ref`属性设置相应的`AuthenticationEntryPoint`。

CAS示例应用程序是使用带有命名空间的自定义bean的一个很好的示例，包括此语法。如果您不熟悉身份验证入口点，则会在[技术概述](https://www.springcloud.cc/spring-security.html#tech-intro-auth-entry-point "的AuthenticationEntryPoint")一章中讨论它们。

## [](https://www.springcloud.cc/spring-security.html#ns-method-security)7.4方法安全性

从版本2.0开始，Spring Security大大提高了对服务层方法的安全性的支持。它为JSR-250注释安全性以及框架的原始`@Secured`注释提供支持。从3.0开始，您还可以使用[基于表达式](https://www.springcloud.cc/spring-security.html#el-access "11.3基于表达式的访问控制")的新[注释](https://www.springcloud.cc/spring-security.html#el-access "11.3 Expression-Based Access Control")。您可以将安全性应用于单个bean，使用`intercept-methods`元素来装饰bean声明，或者可以使用AspectJ样式切入点在整个服务层中保护多个bean。

### [](https://www.springcloud.cc/spring-security.html#ns-global-method)7.4.1 <global-method-security>元素

此元素用于在应用程序中启用基于注释的安全性（通过在元素上设置适当的属性），还可以将安全性切入点声明组合在一起，这些声明将应用于整个应用程序上下文。您应该只声​​明一个`<global-method-security>`元素。以下声明将支持Spring Security的`@Secured`：

<global-method-security secured-annotations="enabled" />

然后，在方法（类或接口）上添加注释会相应地限制对该方法的访问。Spring Security的本机注释支持为该方法定义了一组属性。这些将传递给`AccessDecisionManager`，以便做出实际决定：

public interface BankService {

_@Secured("IS_AUTHENTICATED_ANONYMOUSLY")_
public Account readAccount(Long id);

_@Secured("IS_AUTHENTICATED_ANONYMOUSLY")_
public Account[] findAccounts();

_@Secured("ROLE_TELLER")_
public Account post(Account account, double amount);
}

可以使用支持JSR-250注释

<global-method-security jsr250-annotations="enabled" />

这些是基于标准的，允许应用简单的基于角色的约束，但没有强大的Spring Security本机注释。要使用新的基于表达式的语法，您可以使用

<global-method-security pre-post-annotations="enabled" />

和等效的Java代码

public interface BankService {

_@PreAuthorize("isAnonymous()")_
public Account readAccount(Long id);

_@PreAuthorize("isAnonymous()")_
public Account[] findAccounts();

_@PreAuthorize("hasAuthority('ROLE_TELLER')")_
public Account post(Account account, double amount);
}

如果您需要定义简单的规则，而不是根据用户的权限列表检查角色名称，那么基于表达式的注释是一个不错的选择。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|===仅对定义为Spring bean的实例（在启用了method-security的同一应用程序上下文中）保护带注释的方法。如果要保护不是由Spring创建的实例（例如，使用`new`运算符），则需要使用AspectJ。===|

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|===您可以在同一个应用程序中启用多种类型的注释，但是任何接口或类只应使用一种类型，否则行为将无法明确定义。如果找到适用于特定方法的两个注释，则只应用其中一个注释。===|

#### [](https://www.springcloud.cc/spring-security.html#ns-protect-pointcut)使用protect-pointcut添加安全性切入点

`protect-pointcut`的使用特别强大，因为它允许您只使用简单的声明将安全性应用于许多bean。请考虑以下示例：

<global-method-security>
<protect-pointcut expression="execution(* com.mycompany.*Service.*(..))"
    access="ROLE_USER"/>
</global-method-security>

这将保护在应用程序上下文中声明的bean上的所有方法，这些bean的类在`com.mycompany`包中，其类名以“Service”结尾。只有具有`ROLE_USER`角色的用户才能调用这些方法。与URL匹配一样，最具体的匹配必须首先出现在切入点列表中，因为将使用第一个匹配表达式。安全注释优先于切入点。

## [](https://www.springcloud.cc/spring-security.html#ns-access-manager)7.5默认AccessDecisionManager

本节假设您已了解Spring Security内访问控制的基础架构。如果不这样做，您可以跳过它并稍后再回过头来看，因为本节仅对需要进行一些自定义以便使用简单基于角色的安全性的人员非常重要。

当您使用命名空间配置时，将自动为您注册`AccessDecisionManager`的默认实例，并将根据您在{3中指定的访问属性，用于为方法调用和web URL访问做出访问决策。 /}和`protect-pointcut`声明（如果使用注释安全方法，则在注释中）。

默认策略是使用带有`RoleVoter`和`AuthenticatedVoter`的`AffirmativeBased` `AccessDecisionManager`。您可以在[授权](https://www.springcloud.cc/spring-security.html#authz-arch "11.1授权体系结构")章节中找到有关这些内容的更多信息。

### [](https://www.springcloud.cc/spring-security.html#ns-custom-access-mgr)7.5.1自定义AccessDecisionManager

如果您需要使用更复杂的访问控制策略，那么很容易为方法和web安全性设置替代方案。

对于方法安全性，可以通过将`global-method-security`上的`access-decision-manager-ref`属性设置为应用程序上下文中相应`AccessDecisionManager` bean的`id`来执行此操作：

<global-method-security access-decision-manager-ref="myAccessDecisionManagerBean">
...
</global-method-security>

web安全性的语法是相同的，但在`http`元素上：

<http access-decision-manager-ref="myAccessDecisionManagerBean">
...
</http>

## [](https://www.springcloud.cc/spring-security.html#ns-auth-manager)7.6验证管理器和命名空间

在Spring Security中提供身份验证服务的主要接口是`AuthenticationManager`。这通常是Spring Security的`ProviderManager`类的一个实例，如果您之前使用过该框架，那么您可能已经熟悉了它。如果没有，稍后将在[技术概述章节中介绍](https://www.springcloud.cc/spring-security.html#tech-intro-authentication "8.1.3认证")。使用`authentication-manager`命名空间元素注册bean实例。如果您通过命名空间使用HTTP或方法安全性，则不能使用自定义`AuthenticationManager`，但这不应该是一个问题，因为您可以完全控制所使用的`AuthenticationProvider`。

您可能希望使用`ProviderManager`注册其他`AuthenticationProvider` bean，并且可以使用带有`ref`属性的`<authentication-provider>`元素来执行此操作，其中属性的值是提供者bean的名称你想要添加。例如：

<authentication-manager>
<authentication-provider ref="casAuthenticationProvider"/>
</authentication-manager>

<bean id="casAuthenticationProvider"
    class="org.springframework.security.cas.authentication.CasAuthenticationProvider">
...
</bean>

另一个常见的要求是上下文中的另一个bean可能需要引用`AuthenticationManager`。您可以轻松注册`AuthenticationManager`的别名，并在应用程序上下文的其他位置使用此名称。

<security:authentication-manager alias="authenticationManager">
...
</security:authentication-manager>

<bean id="customizedFormLoginFilter"
    class="com.somecompany.security.web.CustomFormLoginFilter">
<property name="authenticationManager" ref="authenticationManager"/>
...
</bean>

  

---

[[1]](https://www.springcloud.cc/spring-security.html#d5e1980)您可以在[第12.3节“LDAP身份验证”](https://www.springcloud.cc/spring-security.html#ldap "12.3 LDAP认证")一章中找到有关使用`ldap-server`元素的更多信息。

[[2]](https://www.springcloud.cc/spring-security.html#d5e2035)有关如何实际执行匹配的更多详细信息，请参阅Web应用程序基础结构一章中[第10.1.4节“请求匹配和HttpFirewall”](https://www.springcloud.cc/spring-security.html#request-matching "10.1.4请求匹配和HttpFirewall")一节。

[[3]](https://www.springcloud.cc/spring-security.html#d5e2082)参见[第10.10节“匿名认证”一章](https://www.springcloud.cc/spring-security.html#anonymous "10.10匿名身份验证")

[[4]](https://www.springcloud.cc/spring-security.html#d5e2093)使用多个`<http>`元素是一个重要特性，例如，允许命名空间同时支持同一应用程序中的有状态和无状态路径。在`intercept-url`元素上使用属性`filters="none"`的先前语法与此更改不兼容，并且在3.1中不再受支持。

[[5]](https://www.springcloud.cc/spring-security.html#d5e2165)有关如何实现通道处理的更多详细信息，请参阅`ChannelProcessingFilter`的Javadoc和相关类。

## [](https://www.springcloud.cc/spring-security.html#overall-architecture)8.架构和实施

熟悉设置和运行某些基于命名空间配置的应用程序之后，您可能希望更多地了解框架在命名空间外观背后的实际工作方式。与大多数软件一样，Spring Security具有某些中心接口，类和概念抽象，这些都是整个框架中常用的。在参考指南的这一部分中，我们将查看其中的一些内容，并了解它们如何协同工作以支持Spring Security内的身份验证和访问控制。

## [](https://www.springcloud.cc/spring-security.html#technical-overview)8.1技术概述

### [](https://www.springcloud.cc/spring-security.html#runtime-environment)8.1.1运行时环境

Spring Security 3.0需要Java 5.0 Runtime Environment或更高版本。由于Spring Security旨在以自包含方式运行，因此无需将任何特殊配置文件放入Java运行时环境中。特别是，无需配置特殊的Java身份验证和授权服务（JAAS）策略文件，也不需要将Spring Security放入常见的类路径位置。

同样，如果您使用的是EJB容器或Servlet容器，则无需在任何地方放置任何特殊配置文件，也不需要在服务器类加载器中包含Spring Security。所有必需的文件都将包含在您的应用程序中。

这种设计提供了最大的部署时间灵活性，因为您可以简单地将目标工件（无论是JAR，WAR还是EAR）从一个系统复制到另一个系统，它将立即起作用。

### [](https://www.springcloud.cc/spring-security.html#core-components)8.1.2核心组件

在Spring Security 3.0中，`spring-security-core` jar的内容被剥离到最低限度。它不再包含与web相关的任何代码 - 应用程序安全性，LDAP或命名空间配置。我们将在这里看一下您在核心模块中可以找到的一些Java类型。它们代表了框架的构建块，因此如果您需要超越简单的命名空间配置，那么即使您实际上不需要直接与它们进行交互，您也必须了解它们是什么。

#### [](https://www.springcloud.cc/spring-security.html#securitycontextholder-securitycontext-and-authentication-objects)SecurityContextHolder，SecurityContext和Authentication Objects

最基本的对象是`SecurityContextHolder`。这是我们存储应用程序当前安全上下文的详细信息的地方，其中包括当前使用该应用程序的主体的详细信息。默认情况下，`SecurityContextHolder`使用`ThreadLocal`来存储这些详细信息，这意味着安全上下文始终可用于同一执行线程中的方法，即使安全上下文未作为参数显式传递那些方法。如果在处理当前委托人的请求之后小心地清除线程，以这种方式使用`ThreadLocal`是非常安全的。当然，Spring Security会自动为您解决这个问题，因此无需担心。

某些应用程序并不完全适合使用`ThreadLocal`，因为它们使用线程的特定方式。例如，Swing客户端可能希望Java虚拟机中的所有线程都使用相同的安全上下文。`SecurityContextHolder`可以在启动时配置策略，以指定您希望如何存储上下文。对于独立应用程序，您将使用`SecurityContextHolder.MODE_GLOBAL`策略。其他应用程序可能希望安全线程生成的线程也采用相同的安全标识。这是通过使用`SecurityContextHolder.MODE_INHERITABLETHREADLOCAL`来实现的。您可以通过两种方式从默认`SecurityContextHolder.MODE_THREADLOCAL`更改模式。第一个是设置系统属性，第二个是在`SecurityContextHolder`上调用静态方法。大多数应用程序不需要更改默认值，但如果这样做，请查看JavaDoc for `SecurityContextHolder`以了解更多信息。

##### [](https://www.springcloud.cc/spring-security.html#obtaining-information-about-the-current-user)获取有关当前用户的信息

在`SecurityContextHolder`内，我们存储了当前与应用程序交互的主体的详细信息。Spring Security使用`Authentication`对象来表示此信息。您通常不需要自己创建`Authentication`对象，但用户查询`Authentication`对象是相当常见的。您可以使用以下代码块（从应用程序的任何位置）获取当前经过身份验证的用户的名称，例如：

Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

if (principal instanceof UserDetails) {
String username = ((UserDetails)principal).getUsername();
} else {
String username = principal.toString();
}

调用`getContext()`返回的对象是`SecurityContext`接口的实例。这是保存在线程本地存储中的对象。正如我们将在下面看到的，Spring Security中的大多数认证机制都返回`UserDetails`的实例作为主体。

#### [](https://www.springcloud.cc/spring-security.html#tech-userdetailsservice)UserDetailsS​​ervice

上面代码片段中需要注意的另一个问题是，您可以从`Authentication`对象获取主体。校长只是`Object`。大多数情况下，这可以转换为`UserDetails`对象。`UserDetails`是Spring Security中的核心界面。它代表一个主体，但是以可扩展和特定于应用程序的方式。可以将`UserDetails`视为您自己的用户数据库与`SecurityContextHolder`内Spring Security所需的适配器之间的适配器。作为来自您自己的用户数据库的东西的表示，您经常会将`UserDetails`转换为您的应用程序提供的原始对象，因此您可以调用特定于业务的方法（如`getEmail()`，`getEmployeeNumber()`和等等）。

到现在为止你可能想知道，所以我什么时候提供`UserDetails`对象？我怎么做？我以为你说这个东西是声明性的，我不需要编写任何Java代码 - 是什么给出的？简短的回答是有一个名为`UserDetailsService`的特殊界面。此接口上唯一的方法接受基于`String`的用户名参数并返回`UserDetails`：

UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

这是在Spring Security内为用户加载信息的最常用方法，只要需要有关用户的信息，您就会看到它在整个框架中使用。

上成功的认证，`UserDetails`被用来建立存储在`SecurityContextHolder`（关于这一点的`Authentication`对象[下面](https://www.springcloud.cc/spring-security.html#tech-intro-authentication "8.1.3认证")）。好消息是我们提供了许多`UserDetailsService`实现，包括一个使用内存映射（`InMemoryDaoImpl`）和另一个使用JDBC（`JdbcDaoImpl`）的实现。但是，大多数用户倾向于自己编写，他们的实现通常只是位于代表其员工，客户或应用程序其他用户的现有数据访问对象（DAO）之上。记住使用上面的代码片段始终可以从`SecurityContextHolder`获得`UserDetailsService`返回的优点。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|`UserDetailsService`经常有些混乱。它纯粹是用户数据的DAO，除了将数据提供给框架内的其他组件之外，不执行任何其他功能。特别是，它_不会_对用户进行身份验证，这是由`AuthenticationManager`完成的。在许多情况下，如果您需要自定义身份验证过程，直接[实现`AuthenticationProvider`](https://www.springcloud.cc/spring-security.html#core-services-authentication-manager "8.2.1 AuthenticationManager，ProviderManager和AuthenticationProvider")会更有意义。|

#### [](https://www.springcloud.cc/spring-security.html#tech-granted-authority)一个GrantedAuthority

除了校长之外，`Authentication`提供的另一个重要方法是`getAuthorities()`。此方法提供`GrantedAuthority`个对象的数组。毫不奇怪，`GrantedAuthority`是授予校长的权力。这些权力通常是“角色”，例如`ROLE_ADMINISTRATOR`或`ROLE_HR_SUPERVISOR`。稍后将为web授权，方法授权和域对象授权配置这些角色。Spring Security的其他部分能够解释这些权威，并期望它们存在。`GrantedAuthority`对象通常由`UserDetailsService`加载。

通常`GrantedAuthority`对象是应用程序范围的权限。它们不是特定于给定的域对象。因此，你不可能有一个`GrantedAuthority`代表`Employee`对象编号54的权限，因为如果有数千个这样的权限，你很快就会耗尽内存（或者，至少，因为应用程序需要很长时间来验证用户身份）。当然，Spring Security专门用于处理这个常见要求，但您可以使用项目的域对象安全功能来实现此目的。

#### [](https://www.springcloud.cc/spring-security.html#summary)摘要

回顾一下，到目前为止我们看到的Spring Security的主要构建块是：

- `SecurityContextHolder`，提供`SecurityContext`的访问权限。
- `SecurityContext`，保存`Authentication`和可能的特定于请求的安全信息。
- `Authentication`，以特定于Spring Security的方式代表校长。
- `GrantedAuthority`，以反映授予主体的应用程序范围的权限。
- `UserDetails`，提供从应用程序的DAO或其他安全数据源构建Authentication对象所需的信息。
- `UserDetailsService`，在基于`String`的用户名（或证书ID等）中传递时创建`UserDetails`。

既然您已经了解了这些重复使用的组件，那么让我们仔细看看身份验证过程。

### [](https://www.springcloud.cc/spring-security.html#tech-intro-authentication)8.1.3认证

Spring Security可以参与许多不同的身份验证环境。虽然我们建议人们使用Spring Security进行身份验证，而不是与现有的容器管理身份验证集成，但它仍然受到支持 - 与您自己的专有身份验证系统集成。

#### [](https://www.springcloud.cc/spring-security.html#what-is-authentication-in-spring-security)什么是Spring Security中的身份验证？

让我们考虑一个每个人都熟悉的标准身份验证方案。

1. 提示用户使用用户名和密码登录。
2. 系统（成功）验证用户名的密码是否正确。
3. 获取该用户的上下文信息（他们的角色列表等）。
4. 为用户建立安全上下文
5. 用户继续进行，可能执行一些可能受访问控制机制保护的操作，该访问控制机制针对当前安全上下文信息检查操作所需的许可。

前三项构成了身份验证过程，因此我们将在Spring Security内查看这些过程是如何发生的。

1. 获取用户名和密码并将其合并到`UsernamePasswordAuthenticationToken`的实例中（我们之前看到的`Authentication`接口的实例）。
2. 令牌被传递给`AuthenticationManager`的实例以进行验证。
3. `AuthenticationManager`在成功验证后返回完全填充的`Authentication`实例。
4. 通过调用`SecurityContextHolder.getContext().setAuthentication(…​)`建立安全上下文，传入返回的身份验证对象。

从那时起，用户被认为是经过身份验证的。我们来看一些代码作为例子。

import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthenticationExample {
private static AuthenticationManager am = new SampleAuthenticationManager();

public static void main(String[] args) throws Exception {
    BufferedReader in = new BufferedReader(new InputStreamReader(System.in));

    while(true) {
    System.out.println("Please enter your username:");
    String name = in.readLine();
    System.out.println("Please enter your password:");
    String password = in.readLine();
    try {
        Authentication request = new UsernamePasswordAuthenticationToken(name, password);
        Authentication result = am.authenticate(request);
        SecurityContextHolder.getContext().setAuthentication(result);
        break;
    } catch(AuthenticationException e) {
        System.out.println("Authentication failed: " + e.getMessage());
    }
    }
    System.out.println("Successfully authenticated. Security context contains: " +
            SecurityContextHolder.getContext().getAuthentication());
}
}

class SampleAuthenticationManager implements AuthenticationManager {
static final List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();

static {
    AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_USER"));
}

public Authentication authenticate(Authentication auth) throws AuthenticationException {
    if (auth.getName().equals(auth.getCredentials())) {
    return new UsernamePasswordAuthenticationToken(auth.getName(),
        auth.getCredentials(), AUTHORITIES);
    }
    throw new BadCredentialsException("Bad Credentials");
}
}

在这里，我们编写了一个小程序，要求用户输入用户名和密码并执行上述顺序。我们在这里实现的`AuthenticationManager`将验证用户名和密码相同的任何用户。它为每个用户分配一个角色。上面的输出将是这样的：

Please enter your username:
bob
Please enter your password:
password
Authentication failed: Bad Credentials
Please enter your username:
bob
Please enter your password:
bob
Successfully authenticated. Security context contains: \
org.springframework.security.authentication.UsernamePasswordAuthenticationToken@441d0230: \
Principal: bob; Password: [PROTECTED]; \
Authenticated: true; Details: null; \
Granted Authorities: ROLE_USER

请注意，您通常不需要编写任何类似的代码。该过程通常在内部进行，例如在web认证过滤器中。我们刚刚在这里包含了代码，以表明在Spring Security中实际构成身份验证的问题有一个非常简单的答案。当`SecurityContextHolder`包含完全填充的`Authentication`对象时，将对用户进行身份验证。

#### [](https://www.springcloud.cc/spring-security.html#setting-the-securitycontextholder-contents-directly)直接设置SecurityContextHolder内容

实际上，Spring Security并不介意如何将`Authentication`对象放在`SecurityContextHolder`中。唯一的关键要求是`SecurityContextHolder`包含`Authentication`，它代表`AbstractSecurityInterceptor`之前的主体（我们将在后面看到更多）需要授权用户操作。

您可以（以及许多用户）编写自己的过滤器或MVC控制器，以提供与不基于Spring Security的身份验证系统的互操作性。例如，您可能正在使用容器管理的身份验证，这使得当前用户可以从ThreadLocal或JNDI位置使用。或者，您可能会为拥有传统专有身份验证系统的公司工作，这是一个您无法控制的企业“标准”。在这种情况下，让Spring Security工作很容易，并且仍然提供授权功能。您需要做的就是编写一个过滤器（或等效的），从一个位置读取第三方用户信息，构建一个特定于Spring Security的`Authentication`对象，并将其放入`SecurityContextHolder`。在这种情况下，您还需要考虑内置身份验证基础结构通常会自动处理的事情。例如，在将响应写入客户端脚注之前，您可能需要先强制创建一个HTTP会话来[缓存请求之间的上下文](https://www.springcloud.cc/spring-security.html#tech-intro-sec-context-persistence "在请求之间存储SecurityContext")：[一旦提交响应，就无法创建会话。

如果您想知道如何在现实世界的例子中实现`AuthenticationManager`，我们将在[核心服务章节](https://www.springcloud.cc/spring-security.html#core-services-authentication-manager "8.2.1 AuthenticationManager，ProviderManager和AuthenticationProvider")中看一下。

### [](https://www.springcloud.cc/spring-security.html#tech-intro-web-authentication)8.1.4 Web应用程序中的身份验证

现在让我们来探讨在web应用程序中使用Spring Security的情况（未启用`web.xml`安全性）。如何对用户进行身份验证并建立安全上下文？

考虑典型的web应用程序的身份验证过程：

1. 您访问主页，然后单击链接。
2. 请求转到服务器，服务器确定您已请求受保护的资源。
3. 由于您目前尚未通过身份验证，因此服务器会发回一个响应，指示您必须进行身份验证。响应将是HTTP响应代码，或重定向到特定的web页面。
4. 根据身份验证机制，您的浏览器将重定向到特定的web页面，以便您可以填写表单，或者浏览器将以某种方式检索您的身份（通过BASIC身份验证对话框，cookie，X. 509证书等）。
5. 浏览器将向服务器发回响应。这将是包含您填写的表单内容的HTTP POST，或者包含您的身份验证详细信息的HTTP标头。
6. 接下来，服务器将决定所呈现的凭证是否有效。如果它们有效，则下一步将会发生。如果它们无效，通常会要求您的浏览器再次尝试（因此您将返回上面的第二步）。
7. 将重试您进行身份验证过程的原始请求。希望您已通过足够授权的权限进行身份验证以访问受保护资源。如果您有足够的访问权限，请求将成功。否则，您将收到HTTP错误代码403，这意味着“禁止”。

Spring Security有不同的类负责上述大多数步骤。主要参与者（按照他们使用的顺序）是`ExceptionTranslationFilter`，`AuthenticationEntryPoint`和“认证机制”，它负责调用我们在上一节中看到的`AuthenticationManager`。

#### [](https://www.springcloud.cc/spring-security.html#exceptiontranslationfilter)的ExceptionTranslationFilter

`ExceptionTranslationFilter`是一个Spring Security过滤器，负责检测抛出的任何Spring Security异常。`AbstractSecurityInterceptor`通常会抛出此类异常，这是授权服务的主要提供者。我们将在下一节讨论`AbstractSecurityInterceptor`，但是现在我们只需要知道它产生Java异常并且对HTTP一无所知或者如何对主体进行身份验证。相反，`ExceptionTranslationFilter`提供此服务，特别负责返回错误代码403（如果主体已经过身份验证，因此根本没有足够的访问权限 - 按照上面的步骤7），或者启动`AuthenticationEntryPoint`（如果校长尚未通过认证，因此我们需要开始第三步）。

#### [](https://www.springcloud.cc/spring-security.html#tech-intro-auth-entry-point)的AuthenticationEntryPoint

`AuthenticationEntryPoint`负责上面列表中的第三步。可以想象，每个web应用程序都有一个默认的身份验证策略（好吧，这可以像Spring Security中的几乎所有其他配置一样配置，但现在让我们保持简单）。每个主要身份验证系统都有自己的`AuthenticationEntryPoint`实现，通常执行步骤3中描述的操作之一。

#### [](https://www.springcloud.cc/spring-security.html#authentication-mechanism)认证机制

一旦您的浏览器提交您的身份验证凭据（作为HTTP表单帖子或HTTP标头），服务器上就需要“收集”这些身份验证详细信息。到目前为止，我们已经在上面的列表中的第六步了。在Spring Security中，我们有一个特殊的名称，用于从用户代理（通常是web浏览器）收集身份验证详细信息，并将其称为“身份验证机制”。例如基于表单的登录和基本身份验证。一旦从用户代理收集了身份验证详细信息，就会构建一个`Authentication`“请求”对象，然后将其呈现给`AuthenticationManager`。

在认证机制收到完全填充的`Authentication`对象后，它将认为请求有效，将`Authentication`放入`SecurityContextHolder`，并使原始请求重试（上面的步骤7）。另一方面，如果`AuthenticationManager`拒绝了请求，则认证机制将要求用户代理重试（上面的步骤2）。

#### [](https://www.springcloud.cc/spring-security.html#tech-intro-sec-context-persistence)在请求之间存储SecurityContext

根据应用程序的类型，可能需要采用策略来在用户操作之间存储安全上下文。在典型的web应用程序中，用户登录一次，然后由其会话ID标识。服务器缓存持续时间会话的主体信息。在Spring Security中，在请求之间存储`SecurityContext`的责任落在`SecurityContextPersistenceFilter`上，默认情况下，该上下文将上下文存储为HTTP请求之间的`HttpSession`属性。它会为每个请求恢复上下文`SecurityContextHolder`，并且最重要的是，在请求完成时清除`SecurityContextHolder`。出于安全考虑，您不应直接与`HttpSession`进行交互。没有理由这样做 - 总是使用`SecurityContextHolder`。

许多其他类型的应用程序（例如，无状态RESTful web服务）不使用HTTP会话，并将在每个请求上重新进行身份验证。但是，链中包含`SecurityContextPersistenceFilter`以确保在每次请求后清除`SecurityContextHolder`仍然很重要。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|在一个会话中接收并发请求的应用程序中，将在线程之间共享相同的`SecurityContext`实例。即使使用`ThreadLocal`，它也是从每个线程的`HttpSession`检索的相同实例。如果您希望临时更改运行线程的上下文，则会产生影响。如果您只使用`SecurityContextHolder.getContext()`，并在返回的上下文对象上调用`setAuthentication(anAuthentication)`，则`Authentication`对象将在共享相同`SecurityContext`实例的_所有_并发线程中更改。您可以自定义`SecurityContextPersistenceFilter`的行为，为每个请求创建一个全新的`SecurityContext`，防止一个线程中的更改影响另一个请求。或者，您可以在临时更改上下文的位置创建新实例。方法`SecurityContextHolder.createEmptyContext()`总是返回一个新的上下文实例。|

### [](https://www.springcloud.cc/spring-security.html#tech-intro-access-control)8.1.5 Spring Security中的访问控制（授权）

负责在Spring Security中做出访问控制决策的主界面是`AccessDecisionManager`。它有一个`decide`方法，它接受一个代表请求访问的主体的`Authentication`对象，一个“安全对象”（见下文）和一个适用于该对象的安全元数据属性列表（例如角色列表）这是获得访问所必需的。

#### [](https://www.springcloud.cc/spring-security.html#security-and-aop-advice)安全和AOP建议

如果您熟悉AOP，您会发现有不同类型的建议可用：之前，之后，投掷和周围。around建议非常有用，因为顾问可以选择是否继续进行方法调用，是否修改响应，以及是否抛出异常。Spring Security提供了方法调用和web请求的周围建议。我们使用Spring的标准AOP支持为方法调用提供了一个周围的建议，我们使用标准过滤器为web请求提供了建议。

对于那些不熟悉AOP的人来说，理解的关键点是Spring Security可以帮助您保护方法调用以及web请求。大多数人都对在服务层上保护方法调用感兴趣。这是因为服务层是大多数业务逻辑驻留在当前一代Java EE应用程序中的地方。如果您只需要在服务层中保护方法调用，那么Spring的标准AOP就足够了。如果您需要直接保护域对象，您可能会发现AspectJ值得考虑。

您可以选择使用AspectJ或Spring AOP执行方法授权，也可以选择使用过滤器执行web请求授权。您可以将这些方法中的零个，一个，两个或三个一起使用。主流使用模式是执行一些web请求授权，以及服务层上的一些Spring AOP方法调用授权。

#### [](https://www.springcloud.cc/spring-security.html#secure-objects)安全对象和AbstractSecurityInterceptor

那么什么_是_ “安全对象”呢？Spring Security使用该术语来指代可以对其应用安全性（例如授权决策）的任何对象。最常见的示例是方法调用和web请求。

每个受支持的安全对象类型都有自己的拦截器类，它是`AbstractSecurityInterceptor`的子类。重要的是，在调用`AbstractSecurityInterceptor`时，如果主体已经过身份验证，则`SecurityContextHolder`将包含有效的`Authentication`。

`AbstractSecurityInterceptor`为处理安全对象请求提供了一致的工作流程，通常：

1. 查找与当前请求关联的“配置属性”
2. 将安全对象，当前`Authentication`和配置属性提交到`AccessDecisionManager`以进行授权决策
3. （可选）更改发生调用的`Authentication`
4. 允许安全对象调用继续（假设已授予访问权限）
5. 调用返回后，调用`AfterInvocationManager`（如果已配置）。如果调用引发异常，则不会调用`AfterInvocationManager`。

##### [](https://www.springcloud.cc/spring-security.html#tech-intro-config-attributes)什么是配置属性？

“配置属性”可以被认为是对`AbstractSecurityInterceptor`使用的类具有特殊含义的String。它们由框架内的接口`ConfigAttribute`表示。它们可能是简单的角色名称或具有更复杂的含义，具体取决于`AccessDecisionManager`实现的复杂程度。`AbstractSecurityInterceptor`配置了`SecurityMetadataSource`，用于查找安全对象的属性。通常，此配置将对用户隐藏。配置属性将作为安全方法的注释输入，或作为安全URL的访问属性输入。例如，当我们在命名空间简介中看到类似`<intercept-url pattern='/secure/**' access='ROLE_A,ROLE_B'/>`的内容时，这就是说配置属性`ROLE_A`和`ROLE_B`适用于匹配给定模式的web请求。实际上，使用默认的`AccessDecisionManager`配置，这意味着任何具有`GrantedAuthority`匹配这两个属性之一的人都将被允许访问。严格地说，它们只是属性，解释依赖于`AccessDecisionManager`实现。前缀`ROLE_`的使用是一个标记，表示这些属性是角色，应由Spring Security的`RoleVoter`使用。这仅在使用基于选民的`AccessDecisionManager`时才有意义。我们将在[授权章节中](https://www.springcloud.cc/spring-security.html#authz-arch "11.1授权体系结构")看到`AccessDecisionManager`的实现方式。

##### [](https://www.springcloud.cc/spring-security.html#runasmanager)RunAsManager

假设`AccessDecisionManager`决定允许请求，`AbstractSecurityInterceptor`通常只会继续请求。话虽如此，在极少数情况下，用户可能希望将`SecurityContext`内的`Authentication`替换为`Authentication`，这由`AccessDecisionManager`调用`RunAsManager`处理。这在合理的异常情况下可能很有用，例如服务层方法需要调用远程系统并呈现不同的身份。因为Spring Security会自动将安全身份从一个服务器传播到另一个服务器（假设您正在使用正确配置的RMI或HttpInvoker远程协议客户端），这可能很有用。

##### [](https://www.springcloud.cc/spring-security.html#afterinvocationmanager)AfterInvocationManager

在安全对象调用继续进行然后返回 - 这可能意味着方法调用完成或过滤器链继续进行 - `AbstractSecurityInterceptor`获得最后一次机会来处理调用。在这个阶段，`AbstractSecurityInterceptor`对可能修改返回对象感兴趣。我们可能希望这种情况发生，因为无法在安全对象调用的“途中”进行授权决策。作为高度可插拔的，`AbstractSecurityInterceptor`会将控制传递给`AfterInvocationManager`以在需要时实际修改对象。这个类甚至可以完全替换对象，或抛出异常，或者不以任何方式更改它。只有在调用成功时才会执行调用后检查。如果发生异常，将跳过其他检查。

`AbstractSecurityInterceptor`及其相关对象[如图8.1](https://www.springcloud.cc/spring-security.html#abstract-security-interceptor "Figure 8.1. Security interceptors and the "secure object" model")所示[，“安全拦截器和”安全对象“模型”](https://www.springcloud.cc/spring-security.html#abstract-security-interceptor "图8.1。 安全拦截器和“安全对象”模型")

[](https://www.springcloud.cc/spring-security.html#abstract-security-interceptor)

**图8.1。安全拦截器和“安全对象”模型**

![摘要安全拦截器](https://www.springcloud.cc/images/security-interception.png)

  

##### [](https://www.springcloud.cc/spring-security.html#extending-the-secure-object-model)扩展安全对象模型

只有开发人员考虑采用全新的拦截和授权请求方式才需要直接使用安全对象。例如，可以构建新的安全对象以保护对消息传递系统的调用。任何需要安全性并且还提供拦截调用的方法（如围绕建议语义的AOP）都能够成为安全对象。话虽如此，大多数Spring应用程序将完全透明地使用当前支持的三种安全对象类型（AOP Alliance `MethodInvocation`，AspectJ `JoinPoint`和web请求`FilterInvocation`）。

### [](https://www.springcloud.cc/spring-security.html#localization)8.1.6本地化

Spring Security支持最终用户可能会看到的异常消息的本地化。如果您的应用程序是为讲英语的用户设计的，则无需执行任何操作，因为默认情况下所有安全消息均为英语。如果您需要支持其他语言环境，则需要了解的所有内容都包含在本节中。

可以对所有异常消息进行本地化，包括与身份验证失败和访问被拒绝相关的消息（授权失败）。专注于开发人员或系统部署人员的异常和日志消息（包括错误的属性，接口合同违规，使用错误的构造函数，启动时间验证，调试级别日志记录）不是本地化的，而是在Spring Security内用英语进行硬编码的代码。

在`spring-security-core-xx.jar`中运送你会发现一个`org.springframework.security`包，其中包含一个`messages.properties`文件，以及一些常用语言的本地化版本。这应该由您的`ApplicationContext`引用，因为Spring Security类实现Spring的`MessageSourceAware`接口，并期望消息解析器在应用程序上下文启动时被依赖注入。通常，您需要做的就是在应用程序上下文中注册bean以引用消息。一个例子如下所示：

<bean id="messageSource"
    class="org.springframework.context.support.ReloadableResourceBundleMessageSource">
<property name="basename" value="classpath:org/springframework/security/messages"/>
</bean>

`messages.properties`根据标准资源包命名，表示Spring Security消息支持的默认语言。此默认文件为英文。

如果您希望自定义`messages.properties`文件或支持其他语言，您应该复制该文件，相应地重命名，并在上面的bean定义中注册它。此文件中没有大量的消息密钥，因此本地化不应被视为主要的主动。如果您确实执行了此文件的本地化，请考虑通过记录JIRA任务并附加适当命名的本地化版本`messages.properties`来与社区共享您的工作。

Spring Security依赖于Spring的本地化支持，以便实际查找相应的消息。为了使其工作，您必须确保传入请求中的区域设置存储在Spring的`org.springframework.context.i18n.LocaleContextHolder`中。Spring MVC的`DispatcherServlet`会自动为您的应用程序执行此操作，但由于在此之前调用了Spring Security的过滤器，因此需要将`LocaleContextHolder`设置为包含正确的`Locale`过滤器被调用。您可以自己在过滤器中执行此操作（必须在`web.xml`中的Spring Security过滤器之前），或者您可以使用Spring的`RequestContextFilter`。有关使用Spring本地化的更多详细信息，请参阅Spring Framework文档。

“contacts”示例应用程序设置为使用本地化消息。

## [](https://www.springcloud.cc/spring-security.html#core-services)8.2核心服务

现在我们对Spring Security架构及其核心类进行了高级概述，让我们仔细研究一个或两个核心接口及其实现，特别是`AuthenticationManager`，`UserDetailsService`和`AccessDecisionManager`。这些文件会在本文档的其余部分定期出现，因此了解它们的配置方式以及它们的运行方式非常重要。

### [](https://www.springcloud.cc/spring-security.html#core-services-authentication-manager)8.2.1 AuthenticationManager，ProviderManager和AuthenticationProvider

`AuthenticationManager`只是一个界面，所以实现可以是我们选择的任何东西，但它在实践中如何运作？如果我们需要检查多个身份验证数据库或不同身份验证服务（如数据库和LDAP服务器）的组合，该怎么办？

Spring Security中的默认实现称为`ProviderManager`，而不是处理身份验证请求本身，它会委托给已配置的`AuthenticationProvider`列表，每个列表都会被查询以查看它是否可以执行认证。每个提供程序将抛出异​​常或返回完全填充的`Authentication`对象。还记得我们的好朋友`UserDetails`和`UserDetailsService`吗？如果没有，请回到上一章并刷新记忆。验证身份验证请求的最常用方法是加载相应的`UserDetails`并检查加载的密码与用户输入的密码。这是`DaoAuthenticationProvider`使用的方法（见下文）。加载的`UserDetails`对象 - 特别是它包含的`GrantedAuthority` - 将在构建完全填充的`Authentication`对象时使用，该对象从成功的身份验证返回并存储在`SecurityContext`中。

如果您正在使用命名空间，则会在内部创建和维护`ProviderManager`的实例，并使用命名空间身份验证提供程序元素向其添加提供程序（请参阅[命名空间章节](https://www.springcloud.cc/spring-security.html#ns-auth-manager "7.6验证管理器和命名空间")）。在这种情况下，您不应在应用程序上下文中声明`ProviderManager` bean。但是，如果您没有使用命名空间，那么您将声明它如下：

<bean id="authenticationManager"
        class="org.springframework.security.authentication.ProviderManager">
    <constructor-arg>
        <list>
            <ref local="daoAuthenticationProvider"/>
            <ref local="anonymousAuthenticationProvider"/>
            <ref local="ldapAuthenticationProvider"/>
        </list>
    </constructor-arg>
</bean>

在上面的例子中，我们有三个提供者。它们按照显示的顺序进行尝试（使用`List`表示），每个提供程序都可以尝试进行身份验证，或者只需返回`null`即可跳过身份验证。如果所有实现都返回null，则`ProviderManager`将抛出`ProviderNotFoundException`。如果您有兴趣了解有关链接提供程序的更多信息，请参阅`ProviderManager` Javadoc。

身份验证机制（例如web表单登录处理过滤器）将注入`ProviderManager`的引用，并将调用它来处理其身份验证请求。您需要的提供程序有时可以与身份验证机制互换，而在其他时候，它们将依赖于特定的身份验证机制。例如，`DaoAuthenticationProvider`和`LdapAuthenticationProvider`与提交简单用户名/密码身份验证请求的任何机制兼容，因此可以使用基于表单的登录或HTTP基本身份验证。另一方面，一些认证机制创建一个认证请求对象，该对象只能由单一类型的`AuthenticationProvider`解释。一个例子是JA-SIG CAS，它使用服务票据的概念，因此只能通过`CasAuthenticationProvider`进行身份验证。您不必过于担心这一点，因为如果您忘记注册合适的提供商，那么在尝试进行身份验证时，您只需收到`ProviderNotFoundException`。

#### [](https://www.springcloud.cc/spring-security.html#core-services-erasing-credentials)成功验证时擦除凭据

默认情况下（从Spring Security 3.1开始）`ProviderManager`将尝试清除成功身份验证请求返回的`Authentication`对象中的任何敏感凭据信息。这可以防止密码保留的时间超过必要的时间。

当您使用用户对象的缓存时，这可能会导致问题，例如，提高无状态应用程序的性能。如果`Authentication`包含对缓存中对象的引用（例如`UserDetails`实例）并且其凭据已删除，则将无法再对缓存的值进行身份验证。如果使用缓存，则需要考虑这一点。一个显而易见的解决方案是首先在缓存实现中或在创建返回的`Authentication`对象的`AuthenticationProvider`中创建对象的副本。或者，您可以在`ProviderManager`上禁用`eraseCredentialsAfterAuthentication`属性。有关更多信息，请参阅Javadoc。

#### [](https://www.springcloud.cc/spring-security.html#core-services-dao-provider)比如DaoAuthenticationProvider

Spring Security实现的最简单的`AuthenticationProvider`是`DaoAuthenticationProvider`，这也是该框架最早支持的之一。它利用`UserDetailsService`（作为DAO）来查找用户名，密码和`GrantedAuthority`。它只需将`UsernamePasswordAuthenticationToken`中提交的密码与`UserDetailsService`加载的密码进行比较，即可对用户进行身份验证。配置提供程序非常简单：

<bean id="daoAuthenticationProvider"
    class="org.springframework.security.authentication.dao.DaoAuthenticationProvider">
<property name="userDetailsService" ref="inMemoryDaoImpl"/>
<property name="passwordEncoder" ref="passwordEncoder"/>
</bean>

`PasswordEncoder`是可选的。`PasswordEncoder`提供从配置的`UserDetailsService`返回的`UserDetails`对象中显示的密码的编码和解码。这将在[下面](https://www.springcloud.cc/spring-security.html#core-services-password-encoding "8.2.3密码编码")更详细地讨论。

### [](https://www.springcloud.cc/spring-security.html#userdetailsservice-implementations)8.2.2 UserDetailsS​​ervice实现

如本参考指南前面所述，大多数身份验证提供程序都利用`UserDetails`和`UserDetailsService`接口。回想一下`UserDetailsService`的合同是一种单一的方法：

UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

返回的`UserDetails`是一个接口，提供保证非空提供身份验证信息的getter，例如用户名，密码，授予的权限以及用户帐户是启用还是禁用。大多数身份验证提供程序将使用`UserDetailsService`，即使用户名和密码实际上未用作身份验证决策的一部分。他们可能只使用返回的`UserDetails`对象来获取其`GrantedAuthority`信息，因为其他一些系统（如LDAP或X.509或CAS等）承担了实际验证凭据的责任。

鉴于`UserDetailsService`实现起来非常简单，用户应该很容易使用自己选择的持久性策略检索身份验证信息。话虽如此，Spring Security确实包含了一些有用的基础实现，我们将在下面介绍。

#### [](https://www.springcloud.cc/spring-security.html#core-services-in-memory-service)内存中身份验证

易于使用创建一个自定义`UserDetailsService`实现，从所选的持久性引擎中提取信息，但许多应用程序不需要这样的复杂性。如果您正在构建原型应用程序或刚刚开始集成Spring Security，而您真的不想花时间配置数据库或编写`UserDetailsService`实现，则尤其如此。对于这种情况，一个简单的选择是使用安全[命名空间中](https://www.springcloud.cc/spring-security.html#ns-minimal "7.2.2最小<http>配置")的`user-service`元素：

<user-service id="userDetailsService">
<!-- Password is prefixed with {noop} to indicate to DelegatingPasswordEncoder that
NoOpPasswordEncoder should be used. This is not safe for production, but makes reading
in samples easier. Normally passwords should be hashed using BCrypt -->
<user name="jimi" password="{noop}jimispassword" authorities="ROLE_USER, ROLE_ADMIN" />
<user name="bob" password="{noop}bobspassword" authorities="ROLE_USER" />
</user-service>

这也支持使用外部属性文件：

<user-service id="userDetailsService" properties="users.properties"/>

属性文件应包含表单中的条目

username=password,grantedAuthority[,grantedAuthority][,enabled|disabled]

例如

jimi=jimispassword,ROLE_USER,ROLE_ADMIN,enabled
bob=bobspassword,ROLE_USER,enabled

#### [](https://www.springcloud.cc/spring-security.html#core-services-jdbc-user-service)JdbcDaoImpl

Spring Security还包括可以从JDBC数据源获取身份验证信息的`UserDetailsService`。使用内部Spring JDBC，因此它避免了仅用于存储用户详细信息的全功能对象关系映射器（ORM）的复杂性。如果您的应用程序确实使用了ORM工具，您可能更愿意编写自定义`UserDetailsService`来重用您可能已经创建的映射文件。返回`JdbcDaoImpl`，示例配置如下所示：

<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
<property name="driverClassName" value="org.hsqldb.jdbcDriver"/>
<property name="url" value="jdbc:hsqldb:hsql://localhost:9001"/>
<property name="username" value="sa"/>
<property name="password" value=""/>
</bean>

<bean id="userDetailsService"
    class="org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl">
<property name="dataSource" ref="dataSource"/>
</bean>

您可以通过修改上面显示的`DriverManagerDataSource`来使用不同的关系数据库管理系统。您还可以使用从JNDI获取的全局数据源，与任何其他Spring配置一样。

##### [](https://www.springcloud.cc/spring-security.html#authority-groups)权威组织

默认情况下，`JdbcDaoImpl`会为单个用户加载权限，并假设权限直接映射到用户（请参阅[数据库架构附录](https://www.springcloud.cc/spring-security.html#appendix-schema "15.1安全数据库架构")）。另一种方法是将权限划分为组并将组分配给用户。有些人更喜欢这种方法来管理用户权利。有关如何启用组权限的更多信息，请参阅`JdbcDaoImpl` Javadoc。组架构也包含在附录中。

### [](https://www.springcloud.cc/spring-security.html#core-services-password-encoding)8.2.3密码编码

Spring Security的`PasswordEncoder`界面用于执行密码的单向转换，以允许密码安全存储。鉴于`PasswordEncoder`是单向转换，当密码转换需要双向（即存储用于向数据库进行身份验证的凭证）时，并不打算这样做。通常，`PasswordEncoder`用于存储在验证时需要与用户提供的密码进行比较的密码。

#### [](https://www.springcloud.cc/spring-security.html#pe-history)密码历史

多年来，存储密码的标准机制已经发展。在开始时，密码以纯文本格式存储。假设密码是安全的，因为数据存储密码保存在所需的凭据中以访问它。但是，恶意用户能够找到使用SQL注入等攻击获取用户名和密码的大量“数据转储”的方法。随着越来越多的用户凭证成为公共安全专家意识到我们需要做更多的工作来保护用户密码。

然后鼓励开发人员在通过单向散列（如SHA-256）运行密码后存储密码。当用户尝试进行身份验证时，散列密码将与他们键入的密码的哈希值进行比较。这意味着系统只需要存储密码的单向散列。如果发生了破坏，则只暴露密码的单向哈希。由于哈希是一种方式，并且在计算上难以猜测给定哈希的密码，因此在系统中找出每个密码是不值得的。为了打败这个新系统，恶意用户决定创建名为[Rainbow Tables的](https://en.wikipedia.org/wiki/Rainbow_table)查找[表](https://en.wikipedia.org/wiki/Rainbow_table)。他们不是每次都在猜测每个密码，而是计算密码一次并将其存储在查找表中。

为了降低Rainbow Tables的有效性，鼓励开发人员使用salted密码。不是仅使用密码作为哈希函数的输入，而是为每个用户的密码生成随机字节（称为盐）。salt和用户的密码将通过哈希函数运行，该哈希函数产生唯一的哈希值。盐将以明文形式存储在用户密码旁边。然后，当用户尝试进行身份验证时，散列密码将与存储的salt的哈希值和他们键入的密码进行比较。独特的盐意味着Rainbow Tables不再有效，因为每个盐和密码组合的哈希值都不同。

在现代，我们意识到加密哈希（如SHA-256）不再安全。原因是，使用现代硬件，我们可以每秒执行数十亿次哈希计算。这意味着我们可以轻松地单独破解每个密码。

现在鼓励开发人员利用自适应单向函数来存储密码。使用自适应单向函数验证密码是故意的资源（即CPU，内存等）密集型。自适应单向函数允许配置“工作因子”，随着硬件变得越来越好。建议将“工作因素”调整为大约1秒钟以验证系统上的密码。这种折衷是为了让攻击者难以破解密码，但不是那么昂贵，这给你自己的系统带来了过重的负担。Spring Security试图为“工作因素”提供一个良好的起点，但鼓励用户为自己的系统定制“工作因素”，因为不同系统的性能会有很大差异。应该使用的自适应单向函数的示例包括 [bcrypt](https://en.wikipedia.org/wiki/Bcrypt)， [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2)， [scrypt](https://en.wikipedia.org/wiki/Scrypt)和[Argon2](https://en.wikipedia.org/wiki/Argon2)。

由于自适应单向函数是有意为资源密集型的，因此为每个请求验证用户名和密码会显着降低应用程序的性能。没有任何Spring Security（或任何其他库）可以加快密码验证，因为通过使验证资源密集来获得安全性。鼓励用户交换短期凭证（即会话，OAuth令牌等）的长期凭证（即用户名和密码）。短期凭证可以快速验证，而不会有任何安全损失。

#### [](https://www.springcloud.cc/spring-security.html#pe-dpe)DelegatingPasswordEncoder

在Spring Security 5.0之前，默认`PasswordEncoder`为`NoOpPasswordEncoder`，需要纯文本密码。根据[密码历史记录](https://www.springcloud.cc/spring-security.html#)部分，您可能希望默认`PasswordEncoder`现在类似于`BCryptPasswordEncoder`。但是，这忽略了三个现实世界的问题：

- 有许多使用旧密码编码的应用程序无法轻松迁移
- 密码存储的最佳实践将再次发生变化。
- 由于框架Spring Security不能经常进行重大更改

而Spring Security引入了`DelegatingPasswordEncoder`，通过以下方式解决了所有问题：

- 确保使用当前密码存储建议对密码进行编码
- 允许验证现代和传统格式的密码
- 允许将来升级编码

您可以使用`PasswordEncoderFactories`轻松构造`DelegatingPasswordEncoder`的实例。

PasswordEncoder passwordEncoder =
    PasswordEncoderFactories.createDelegatingPasswordEncoder();

或者，您可以创建自己的自定义实例。例如：

String idForEncode = "bcrypt";
Map encoders = new HashMap<>();
encoders.put(idForEncode, new BCryptPasswordEncoder());
encoders.put("noop", NoOpPasswordEncoder.getInstance());
encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());
encoders.put("scrypt", new SCryptPasswordEncoder());
encoders.put("sha256", new StandardPasswordEncoder());

PasswordEncoder passwordEncoder =
    new DelegatingPasswordEncoder(idForEncode, encoders);

##### [](https://www.springcloud.cc/spring-security.html#pe-dpe-format)密码存储格式

密码的一般格式是：

{id}encodedPassword

这样`id`是用于查找应该使用`PasswordEncoder`的标识符，`encodedPassword`是所选`PasswordEncoder`的原始编码密码。`id`必须位于密码的开头，以`{`开头，以`}`结尾。如果找不到`id`，则`id`将为空。例如，以下可能是使用不同`id`编码的密码列表。所有原始密码都是“密码”。

{bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG [](https://www.springcloud.cc/spring-security.html#CO11-1)![1](https://www.springcloud.cc/images/1.png)
{noop}password [](https://www.springcloud.cc/spring-security.html#CO11-2)![2](https://www.springcloud.cc/images/2.png)
{pbkdf2}5d923b44a6d129f3ddf3e3c8d29412723dcbde72445e8ef6bf3b508fbf17fa4ed4d6b99ca763d8dc [](https://www.springcloud.cc/spring-security.html#CO11-3)![3](https://www.springcloud.cc/images/3.png)
{scrypt}$e0801$8bWJaSu2IKSn9Z9kM+TPXfOc/9bdYSrN1oD9qfVThWEwdRTnO7re7Ei+fUZRJ68k9lTyuTeUp4of4g24hHnazw==$OAOec05+bXxvuu/1qZ6NUR+xQYvYv7BeL1QxwRpY5Pc=  [](https://www.springcloud.cc/spring-security.html#CO11-4)![4](https://www.springcloud.cc/images/4.png)
{sha256}97cde38028ad898ebc02e690819fa220e88c62e0699403e94fff291cfffaf8410849f27605abcbc0 [](https://www.springcloud.cc/spring-security.html#CO11-5)![5](https://www.springcloud.cc/images/5.png)

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO11-1)|第一个密码的`PasswordEncoder` id为`bcrypt`，encodedPassword为`$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG`。匹配时会委托给`BCryptPasswordEncoder`|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO11-2)|第二个密码的`noop` id为`noop`，encodedPassword为`password`。匹配时会委托给`NoOpPasswordEncoder`|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO11-3)|第三个密码的`PasswordEncoder` id为`pbkdf2`，encodedPassword为`5d923b44a6d129f3ddf3e3c8d29412723dcbde72445e8ef6bf3b508fbf17fa4ed4d6b99ca763d8dc`。匹配时会委托给`Pbkdf2PasswordEncoder`|
|[![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO11-4)|第四个密码的`PasswordEncoder` id为`scrypt`，encodedPassword为`$e0801$8bWJaSu2IKSn9Z9kM+TPXfOc/9bdYSrN1oD9qfVThWEwdRTnO7re7Ei+fUZRJ68k9lTyuTeUp4of4g24hHnazw==$OAOec05+bXxvuu/1qZ6NUR+xQYvYv7BeL1QxwRpY5Pc=`匹配时，会委托给`SCryptPasswordEncoder`|
|[![五](https://www.springcloud.cc/images/5.png)](https://www.springcloud.cc/spring-security.html#CO11-5)|最终密码的`PasswordEncoder` id为`sha256`，encodedPassword为`97cde38028ad898ebc02e690819fa220e88c62e0699403e94fff291cfffaf8410849f27605abcbc0`。匹配时会委托给`StandardPasswordEncoder`|

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|一些用户可能担心为潜在的黑客提供存储格式。这不是问题，因为密码的存储不依赖于算法是秘密的。此外，大多数格式很容易让攻击者在没有前缀的情况下弄清楚。例如，BCrypt密码通常以`$2a$`开头。|

##### [](https://www.springcloud.cc/spring-security.html#password-encoding)密码编码

传递给构造函数的`idForEncode`确定将使用哪个`PasswordEncoder`来编码密码。在我们上面构造的`DelegatingPasswordEncoder`中，这意味着编码`password`的结果将被委托给`BCryptPasswordEncoder`并以`{bcrypt}`作为前缀。最终结果如下：

{bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG

##### [](https://www.springcloud.cc/spring-security.html#password-matching)密码匹配

匹配是基于`{id}`以及构造函数中提供的`id`到`PasswordEncoder`的映射完成的。我们在[“密码存储格式”](https://www.springcloud.cc/spring-security.html#pe-dpe-format "密码存储格式")一节中的示例提供了如何完成此操作的工作示例。默认情况下，使用密码调用`matches(CharSequence, String)`和未映射的`id`（包括空id）的结果将导致`IllegalArgumentException`。可以使用`DelegatingPasswordEncoder.setDefaultPasswordEncoderForMatches(PasswordEncoder)`自定义此行为。

通过使用`id`，我们可以匹配任何密码编码，但使用最现代的密码编码对密码进行编码。这很重要，因为与加密不同，密码哈希的设计使得没有简单的方法来恢复明文。由于无法恢复明文，因此难以迁移密码。虽然用户很容易迁移`NoOpPasswordEncoder`，但我们默认选择将其包含在内，以便简化入门体验。

##### [](https://www.springcloud.cc/spring-security.html#getting-started-experience)入门体验

如果您正在整理演示或示例，那么花些时间来散列用户密码有点麻烦。有一些便利机制可以使这更容易，但这仍然不适合生产。

User user = User.withDefaultPasswordEncoder()
  .username("user")
  .password("password")
  .roles("user")
  .build();
System.out.println(user.getPassword());
// {bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG

如果要创建多个用户，还可以重用该构建器。

UserBuilder users = User.withDefaultPasswordEncoder();
User user = users
  .username("user")
  .password("password")
  .roles("USER")
  .build();
User admin = users
  .username("admin")
  .password("password")
  .roles("USER","ADMIN")
  .build();

这会对存储的密码进行哈希处理，但密码仍会在内存和已编译的源代码中公开。因此，对于生产环境而言仍然不被认为是安全的。对于生产，您应该在外部散列密码。

##### [](https://www.springcloud.cc/spring-security.html#troubleshooting)故障排除

如其中一个密码没有id，如[“密码存储格式”一节中](https://www.springcloud.cc/spring-security.html#pe-dpe-format "密码存储格式")所述，会发生以下错误。

java.lang.IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"
    at org.springframework.security.crypto.password.DelegatingPasswordEncoder$UnmappedIdPasswordEncoder.matches(DelegatingPasswordEncoder.java:233)
    at org.springframework.security.crypto.password.DelegatingPasswordEncoder.matches(DelegatingPasswordEncoder.java:196)

解决错误的最简单方法是切换到显式提供密码编码的`PasswordEncoder`。解决问题的最简单方法是弄清楚当前如何存储密码并明确提供正确的`PasswordEncoder`。如果从Spring Security 4.2.x迁移，则可以通过公开`NoOpPasswordEncoder` bean恢复到先前的行为。例如，如果您使用的是Java配置，则可以创建如下配置：

|   |
|---|
|![[警告]](https://www.springcloud.cc/images/warning.png)|
|恢复到`NoOpPasswordEncoder`不被认为是安全的。您应该转而使用`DelegatingPasswordEncoder`来支持安全密码编码。|

_@Bean_
public static NoOpPasswordEncoder passwordEncoder() {
    return NoOpPasswordEncoder.getInstance();
}

如果您使用的是XML配置，则可以使用id `passwordEncoder`公开`PasswordEncoder`：

<b:bean id="passwordEncoder"
        class="org.springframework.security.crypto.password.NoOpPasswordEncoder" factory-method="getInstance"/>

或者，您可以使用正确的ID为所有密码添加前缀，并继续使用`DelegatingPasswordEncoder`。例如，如果您使用的是BCrypt，则可以从以下内容中迁移密码：

$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG

至

{bcrypt}$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG

有关映射的完整列表，请参阅[PasswordEncoderFactories](https://docs.spring.io/spring-security/site/docs/5.0.x/api/org/springframework/security/crypto/factory/PasswordEncoderFactories.html)上的Javadoc 。

#### [](https://www.springcloud.cc/spring-security.html#pe-bcpe)BCryptPasswordEncoder

`BCryptPasswordEncoder`实现使用广泛支持的[bcrypt](https://en.wikipedia.org/wiki/Bcrypt)算法来散列密码。为了使它更能抵抗密码破解，bcrypt故意慢。与其他自适应单向函数一样，应调整大约需要1秒钟来验证系统上的密码。

// Create an encoder with strength 16
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));

#### [](https://www.springcloud.cc/spring-security.html#pe-pbkdf2pe)Pbkdf2PasswordEncoder

`Pbkdf2PasswordEncoder`实现使用[PBKDF2](https://en.wikipedia.org/wiki/PBKDF2)算法来散列密码。为了打败密码破解，PBKDF2是一种故意慢的算法。与其他自适应单向函数一样，应调整大约需要1秒钟来验证系统上的密码。当需要FIPS认证时，该算法是一个不错的选择。

// Create an encoder with all the defaults
Pbkdf2PasswordEncoder encoder = new Pbkdf2PasswordEncoder();
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));

#### [](https://www.springcloud.cc/spring-security.html#pe-scpe)SCryptPasswordEncoder

`SCryptPasswordEncoder`实现使用[scrypt](https://en.wikipedia.org/wiki/Scrypt)算法来散列密码。为了在自定义硬件上破解密码破解scrypt是一种故意慢的算法，需要大量内存。与其他自适应单向函数一样，应调整大约需要1秒钟来验证系统上的密码。

// Create an encoder with all the defaults
SCryptPasswordEncoder encoder = new SCryptPasswordEncoder();
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));

#### [](https://www.springcloud.cc/spring-security.html#other-passwordencoders)其他PasswordEncoders

存在大量其他`PasswordEncoder`实现，完全用于向后兼容。它们都被弃用，表明它们不再被认为是安全的。但是，由于很难迁移现有的遗留系统，因此没有计划删除它们。

### [](https://www.springcloud.cc/spring-security.html#jackson)8.2.4 Jackson支持

Spring Security增加了Jackson对持续Spring Security相关课程的支持。在使用分布式会话（即会话复制，Spring Session等）时，这可以提高序列化Spring Security相关类的性能。

要使用它，请将`SecurityJackson2Modules.getModules(ClassLoader)`注册为[Jackson模块](http://wiki.fasterxml.com/JacksonFeatureModules)。

ObjectMapper mapper = new ObjectMapper();
ClassLoader loader = getClass().getClassLoader();
List<Module> modules = SecurityJackson2Modules.getModules(loader);
mapper.registerModules(modules);

// ... use ObjectMapper as normally ...
SecurityContext context = new SecurityContextImpl();
// ...
String json = mapper.writeValueAsString(context);

## [](https://www.springcloud.cc/spring-security.html#test)9.测试

本节介绍Spring Security提供的测试支持。

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|要使用Spring Security测试支持，必须包含`spring-security-test-5.1.2.RELEASE.jar`作为项目的依赖项。|

## [](https://www.springcloud.cc/spring-security.html#test-method)9.1测试方法安全性

本节演示如何使用Spring Security的测试支持来测试基于安全性的方法。我们首先介绍一个`MessageService`，要求用户进行身份验证才能访问它。

public class HelloMessageService implements MessageService {

    _@PreAuthorize("authenticated")_
    public String getMessage() {
        Authentication authentication = SecurityContextHolder.getContext()
            .getAuthentication();
        return "Hello " + authentication;
    }
}

`getMessage`的结果是对当前Spring Security `Authentication`说“Hello”的字符串。输出的示例如下所示。

Hello org.springframework.security.authentication.UsernamePasswordAuthenticationToken@ca25360: Principal: org.springframework.security.core.userdetails.User@36ebcb: Username: user; Password: [PROTECTED]; Enabled: true; AccountNonExpired: true; credentialsNonExpired: true; AccountNonLocked: true; Granted Authorities: ROLE_USER; Credentials: [PROTECTED]; Authenticated: true; Details: null; Granted Authorities: ROLE_USER

### [](https://www.springcloud.cc/spring-security.html#test-method-setup)9.1.1安全测试设置

在我们使用Spring Security测试支持之前，我们必须执行一些设置。下面是一个例子：

_@RunWith(SpringJUnit4ClassRunner.class)_ [](https://www.springcloud.cc/spring-security.html#CO12-1)![1](https://www.springcloud.cc/images/1.png)
_@ContextConfiguration_ [](https://www.springcloud.cc/spring-security.html#CO12-2)![2](https://www.springcloud.cc/images/2.png)
public class WithMockUserTests {

这是如何设置Spring Security测试的基本示例。亮点是：

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO12-1)|`@RunWith`指示弹簧测试模块应该创建`ApplicationContext`。这与使用现有的Spring测试支持没有什么不同。有关其他信息，请参阅[Spring参考](https://docs.spring.io/spring-framework/docs/4.0.x/spring-framework-reference/htmlsingle/#integration-testing-annotations-standard)|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO12-2)|`@ContextConfiguration`指示spring-test用于创建`ApplicationContext`的配置。由于未指定任何配置，因此将尝试使用默认配置位置。这与使用现有的Spring测试支持没有什么不同。有关其他信息，请参阅[Spring参考](https://docs.spring.io/spring-framework/docs/4.0.x/spring-framework-reference/htmlsingle/#testcontext-ctx-management)|

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|Spring Security使用`WithSecurityContextTestExecutionListener`挂钩Spring测试支持，这将确保我们的测试是使用正确的用户运行的。它通过在运行测试之前填充`SecurityContextHolder`来实现。如果您使用的是反应式方法安全性，则还需要`ReactorContextTestExecutionListener`填充`ReactiveSecurityContextHolder`。测试完成后，它将清除`SecurityContextHolder`。如果您只需要Spring Security相关支持，则可以将`@ContextConfiguration`替换为`@SecurityTestExecutionListeners`。|

请记住，我们在`HelloMessageService`中添加了`@PreAuthorize`注释，因此需要经过身份验证的用户才能调用它。如果我们运行以下测试，我们希望以下测试通过：

_@Test(expected = AuthenticationCredentialsNotFoundException.class)_
public void getMessageUnauthenticated() {
    messageService.getMessage();
}

### [](https://www.springcloud.cc/spring-security.html#test-method-withmockuser)9.1.2 @WithMockUser

问题是“作为特定用户，我们怎样才能最轻松地运行测试？” 答案是使用`@WithMockUser`。以下测试将以用户名“user”，密码“password”和角色“ROLE_USER”的用户身份运行。

_@Test_
_@WithMockUser_
public void getMessageWithMockUser() {
String message = messageService.getMessage();
...
}

具体如下：

- 具有用户名“user”的用户不必存在，因为我们正在模拟用户
- `SecurityContext`中填充的`Authentication`类型为`UsernamePasswordAuthenticationToken`
- `Authentication`上的校长是Spring Security的`User`对象
- `User`将具有“user”的用户名，密码“password”，并且使用名为“ROLE_USER”的单个`GrantedAuthority`。

我们的例子很好，因为我们能够利用很多默认值。如果我们想用不同的用户名运行测试怎么办？以下测试将使用用户名“customUser”运行。同样，用户不需要实际存在。

_@Test_
_@WithMockUser("customUsername")_
public void getMessageWithMockUserCustomUsername() {
    String message = messageService.getMessage();
...
}

我们还可以轻松自定义角色。例如，将使用用户名“admin”和角色“ROLE_USER”和“ROLE_ADMIN”调用此测试。

_@Test_
_@WithMockUser(username="admin",roles={"USER","ADMIN"})_
public void getMessageWithMockUserCustomUser() {
    String message = messageService.getMessage();
    ...
}

如果我们不希望值自动以ROLE_为前缀，我们可以利用authority属性。例如，将使用用户名“admin”和权限“USER”和“ADMIN”调用此测试。

_@Test_
_@WithMockUser(username = "admin", authorities = { "ADMIN", "USER" })_
public void getMessageWithMockUserCustomAuthorities() {
    String message = messageService.getMessage();
    ...
}

当然，在每个测试方法上放置注释可能有点单调乏味。相反，我们可以将注释放在类级别，每个测试都将使用指定的用户。例如，以下内容将使用用户名为“admin”，密码为“password”以及角色“ROLE_USER”和“ROLE_ADMIN”的用户运行每个测试。

_@RunWith(SpringJUnit4ClassRunner.class)_
_@ContextConfiguration_
_@WithMockUser(username="admin",roles={"USER","ADMIN"})_
public class WithMockUserTests {

默认情况下，`SecurityContext`在`TestExecutionListener.beforeTestMethod`事件期间设置。这相当于在JUnit的`@Before`之前发生的事情。您可以将此更改发生在JUnit的`@Before`之后但在调用测试方法之前的`TestExecutionListener.beforeTestExecution`事件期间。

@WithMockUser(setupBefore = TestExecutionEvent.TEST_EXECUTION)

### [](https://www.springcloud.cc/spring-security.html#test-method-withanonymoususer)9.1.3 @WithAnonymousUser

使用`@WithAnonymousUser`允许以匿名用户身份运行。当您希望与特定用户运行大多数测试但希望以匿名用户身份运行一些测试时，这尤其方便。例如，以下将使用[@WithMockUser](https://www.springcloud.cc/spring-security.html#test-method-withmockuser "9.1.2 @WithMockUser")和匿名用户匿名用户运行withMockUser1和withMockUser2 。

_@RunWith(SpringJUnit4ClassRunner.class)_
_@WithMockUser_
public class WithUserClassLevelAuthenticationTests {

    _@Test_
    public void withMockUser1() {
    }

    _@Test_
    public void withMockUser2() {
    }

    _@Test_
    _@WithAnonymousUser_
    public void anonymous() throws Exception {
        // override default to run as anonymous user
    }
}

默认情况下，`SecurityContext`在`TestExecutionListener.beforeTestMethod`事件期间设置。这相当于在JUnit的`@Before`之前发生的事情。您可以将此更改发生在JUnit的`@Before`之后但在调用测试方法之前的`TestExecutionListener.beforeTestExecution`事件期间。

@WithAnonymousUser(setupBefore = TestExecutionEvent.TEST_EXECUTION)

### [](https://www.springcloud.cc/spring-security.html#test-method-withuserdetails)9.1.4 @WithUserDetails

虽然`@WithMockUser`是一种非常方便的入门方式，但它可能并不适用于所有情况。例如，应用程序通常期望`Authentication`主体属于特定类型。这样做是为了使应用程序可以将主体引用为自定义类型并减少Spring Security上的耦合。

自定义主体通常由自定义`UserDetailsService`返回，返回实现`UserDetails`和自定义类型的对象。对于这种情况，使用自定义`UserDetailsService`创建测试用户很有用。这正是`@WithUserDetails`所做的。

假设我们将一个`UserDetailsService`暴露为bean，将使用类型为`UsernamePasswordAuthenticationToken`的`Authentication`调用以及使用用户名“user”从`UserDetailsService`返回的主体调用以下测试。

_@Test_
_@WithUserDetails_
public void getMessageWithUserDetails() {
    String message = messageService.getMessage();
    ...
}

我们还可以自定义用于从`UserDetailsService`查找用户的用户名。例如，此测试将使用从`UserDetailsService`以“customUsername”用户名返回的主体执行。

_@Test_
_@WithUserDetails("customUsername")_
public void getMessageWithUserDetailsCustomUsername() {
    String message = messageService.getMessage();
    ...
}

我们还可以提供一个显式的bean名称来查找`UserDetailsService`。例如，此测试将使用带有bean名称“myUserDetailsS​​ervice”的`UserDetailsService`查找“customUsername”的用户名。

_@Test_
_@WithUserDetails(value="customUsername", userDetailsServiceBeanName="myUserDetailsService")_
public void getMessageWithUserDetailsServiceBeanName() {
    String message = messageService.getMessage();
    ...
}

与`@WithMockUser`一样，我们也可以将我们的注释放在类级别，以便每个测试都使用相同的用户。但是，与`@WithMockUser`不同，`@WithUserDetails`要求用户存在。

默认情况下，`SecurityContext`在`TestExecutionListener.beforeTestMethod`事件期间设置。这相当于在JUnit的`@Before`之前发生的事情。您可以将此更改发生在JUnit的`@Before`之后但在调用测试方法之前的`TestExecutionListener.beforeTestExecution`事件期间。

@WithUserDetails(setupBefore = TestExecutionEvent.TEST_EXECUTION)

### [](https://www.springcloud.cc/spring-security.html#test-method-withsecuritycontext)9.1.5 @WithSecurityContext

我们已经看到`@WithMockUser`是一个很好的选择，如果我们不使用自定义`Authentication`校长。接下来我们发现`@WithUserDetails`允许我们使用自定义`UserDetailsService`创建我们的`Authentication`主体，但要求用户存在。我们现在将看到一个允许最大灵活性的选项。

我们可以创建自己的注释，使用`@WithSecurityContext`创建我们想要的任何`SecurityContext`。例如，我们可能会创建一个名为`@WithMockCustomUser`的注释，如下所示：

_@Retention(RetentionPolicy.RUNTIME)_
_@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)_
public _@interface_ WithMockCustomUser {

    String username() default "rob";

    String name() default "Rob Winch";
}

您可以看到`@WithMockCustomUser`使用`@WithSecurityContext`注释进行注释。这是Spring Security测试支持的信号，我们打算为测试创建一个`SecurityContext`。`@WithSecurityContext`注释要求我们指定一个`SecurityContextFactory`，它将根据我们的`@WithMockCustomUser`注释创建一个新的`SecurityContext`。您可以在下面找到我们的`WithMockCustomUserSecurityContextFactory`实施：

public class WithMockCustomUserSecurityContextFactory
    implements WithSecurityContextFactory<WithMockCustomUser> {
    _@Override_
    public SecurityContext createSecurityContext(WithMockCustomUser customUser) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        CustomUserDetails principal =
            new CustomUserDetails(customUser.name(), customUser.username());
        Authentication auth =
            new UsernamePasswordAuthenticationToken(principal, "password", principal.getAuthorities());
        context.setAuthentication(auth);
        return context;
    }
}

我们现在可以使用我们的新注释来注释测试类或测试方法，Spring Security的`WithSecurityContextTestExecutionListener`将确保我们的`SecurityContext`被适当填充。

在创建自己的`WithSecurityContextFactory`实现时，很高兴知道它们可以使用标准Spring注释进行注释。例如，`WithUserDetailsSecurityContextFactory`使用`@Autowired`注释来获取`UserDetailsService`：

final class WithUserDetailsSecurityContextFactory
    implements WithSecurityContextFactory<WithUserDetails> {

    private UserDetailsService userDetailsService;

    _@Autowired_
    public WithUserDetailsSecurityContextFactory(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public SecurityContext createSecurityContext(WithUserDetails withUser) {
        String username = withUser.value();
        Assert.hasLength(username, "value() must be non-empty String");
        UserDetails principal = userDetailsService.loadUserByUsername(username);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, principal.getPassword(), principal.getAuthorities());
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        return context;
    }
}

默认情况下，`SecurityContext`在`TestExecutionListener.beforeTestMethod`事件期间设置。这相当于在JUnit的`@Before`之前发生的事情。您可以将此更改发生在JUnit的`@Before`之后但在调用测试方法之前的`TestExecutionListener.beforeTestExecution`事件期间。

@WithSecurityContext(setupBefore = TestExecutionEvent.TEST_EXECUTION)

### [](https://www.springcloud.cc/spring-security.html#test-method-meta-annotations)9.1.6测试元注释

如果经常在测试中重复使用同一个用户，则不必重复指定属性。例如，如果有许多与管理用户相关的测试，用户名为“admin”，角色为`ROLE_USER`和`ROLE_ADMIN`，则必须编写：

@WithMockUser(username="admin",roles={"USER","ADMIN"})

我们可以使用元注释，而不是在任何地方重复这一点。例如，我们可以创建一个名为`WithMockAdmin`的元注释：

_@Retention(RetentionPolicy.RUNTIME)_
_@WithMockUser(value="rob",roles="ADMIN")_
public _@interface_ WithMockAdmin { }

现在我们可以使用`@WithMockAdmin`与更详细`@WithMockUser`相同的方式。

元注释适用于上述任何测试注释。例如，这意味着我们也可以为`@WithUserDetails("admin")`创建元注释。

## [](https://www.springcloud.cc/spring-security.html#test-mockmvc)9.2 Spring MVC测试集成

Spring Security提供与[Spring MVC测试的](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/testing.html#spring-mvc-test-framework)全面整合[](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/testing.html#spring-mvc-test-framework)

### [](https://www.springcloud.cc/spring-security.html#test-mockmvc-setup)9.2.1设置MockMvc和Spring Security

要将Spring Security与Spring MVC测试一起使用，必须将Spring Security `FilterChainProxy`添加为`Filter`。还需要添加Spring Security的`TestSecurityContextHolderPostProcessor`以支持[在带有注释的Spring MVC测试中以用户身份运行](https://www.springcloud.cc/spring-security.html#running-as-a-user-in-spring-mvc-test-with-annotations "在带有注释的Spring MVC测试中作为用户运行")。这可以使用Spring Security的`SecurityMockMvcConfigurers.springSecurity()`来完成。例如：

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|Spring Security的测试支持需要spring-test-4.1.3.RELEASE或更高版本。|

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;

_@RunWith(SpringJUnit4ClassRunner.class)_
_@ContextConfiguration_
_@WebAppConfiguration_
public class CsrfShowcaseTests {

    _@Autowired_
    private WebApplicationContext context;

    private MockMvc mvc;

    _@Before_
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity()) [](https://www.springcloud.cc/spring-security.html#CO13-1)![1](https://www.springcloud.cc/images/1.png)
                .build();
    }

...

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO13-1)|`SecurityMockMvcConfigurers.springSecurity()`将执行我们将Spring Security与Spring MVC测试集成所需的所有初始设置|

### [](https://www.springcloud.cc/spring-security.html#test-mockmvc-smmrpp)9.2.2 SecurityMockMvcRequestPostProcessors

Spring MVC Test提供了一个名为`RequestPostProcessor`的便捷界面，可用于修改请求。Spring Security提供了许多`RequestPostProcessor`实现，使测试更容易。为了使用Spring Security的`RequestPostProcessor`实现，请确保使用以下静态导入：

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

#### [](https://www.springcloud.cc/spring-security.html#test-mockmvc-csrf)使用CSRF保护进行测试

在测试任何非安全HTTP方法并使用Spring Security的CSRF保护时，您必须确保在请求中包含有效的CSRF令牌。要使用以下命令将有效的CSRF令牌指定为请求参数：

mvc
    .perform(post("/").with(csrf()))

如果您愿意，可以在标题中包含CSRF令牌：

mvc
    .perform(post("/").with(csrf().asHeader()))

您还可以使用以下方法测试提供无效的CSRF令牌：

mvc
    .perform(post("/").with(csrf().useInvalidToken()))

#### [](https://www.springcloud.cc/spring-security.html#test-mockmvc-securitycontextholder)在Spring MVC测试中以用户身份运行测试

通常希望将测试作为特定用户运行。填充用户有两种简单的方法：

- [在Spring MVC使用RequestPostProcessor进行测试时以用户身份运行](https://www.springcloud.cc/spring-security.html#test-mockmvc-securitycontextholder-rpp "使用RequestPostProcessor在Spring MVC Test中作为用户运行")
- [在Spring MVC使用注释进行测试时以用户身份运行](https://www.springcloud.cc/spring-security.html#running-as-a-user-in-spring-mvc-test-with-annotations "在带有注释的Spring MVC测试中作为用户运行")

#### [](https://www.springcloud.cc/spring-security.html#test-mockmvc-securitycontextholder-rpp)在Spring MVC使用RequestPostProcessor进行测试时以用户身份运行

有许多选项可用于将用户与当前`HttpServletRequest`相关联。例如，以下将以用户（不需要存在）的形式运行，用户名为“user”，密码为“password”，角色为“ROLE_USER”：

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|支持通过将用户与`HttpServletRequest`相关联来工作。要将请求关联到`SecurityContextHolder`，您需要确保`SecurityContextPersistenceFilter`与`MockMvc`实例相关联。一些方法是：<br><br>- 调用[apply（springSecurity（））](https://www.springcloud.cc/spring-security.html#test-mockmvc-setup "9.2.1设置MockMvc和Spring安全性")<br>- 将Spring Security的`FilterChainProxy`添加到`MockMvc`<br>- 使用`MockMvcBuilders.standaloneSetup`时，将`SecurityContextPersistenceFilter`手动添加到`MockMvc`实例可能有意义|

mvc
    .perform(get("/").with(user("user")))

您可以轻松进行自定义。例如，以下将以用户名（admin，不需要存在）运行，用户名为“admin”，密码为“pass”，角色为“ROLE_USER”和“ROLE_ADMIN”。

mvc
    .perform(get("/admin").with(user("admin").password("pass").roles("USER","ADMIN")))

如果您有自己想要使用的自定义`UserDetails`，也可以轻松指定。例如，以下将使用指定的`UserDetails`（不需要存在）与具有指定`UserDetails`的主体的`UsernamePasswordAuthenticationToken`一起运行：

mvc
    .perform(get("/").with(user(userDetails)))

您可以使用以下方式以匿名用户身份运行：

mvc
    .perform(get("/").with(anonymous()))

如果您使用默认用户运行并希望以匿名用户身份执行一些请求，则此功能尤其有用。

如果您需要自定义`Authentication`（不需要存在），可以使用以下命令执行此操作：

mvc
    .perform(get("/").with(authentication(authentication)))

您甚至可以使用以下内容自定义`SecurityContext`：

mvc
    .perform(get("/").with(securityContext(securityContext)))

我们还可以使用`MockMvcBuilders`的默认请求确保以每个请求的特定用户身份运行。例如，以下将以用户名（admin，不需要存在）运行，用户名为“admin”，密码为“password”，角色为“ROLE_ADMIN”：

mvc = MockMvcBuilders
        .webAppContextSetup(context)
        .defaultRequest(get("/").with(user("user").roles("ADMIN")))
        .apply(springSecurity())
        .build();

如果您发现在许多测试中使用的是同一个用户，建议将用户移动到某个方法。例如，您可以在自己的名为`CustomSecurityMockMvcRequestPostProcessors`的类中指定以下内容：

public static RequestPostProcessor rob() {
    return user("rob").roles("ADMIN");
}

现在，您可以在`SecurityMockMvcRequestPostProcessors`上执行静态导入，并在测试中使用它：

import static sample.CustomSecurityMockMvcRequestPostProcessors.*;

...

mvc
    .perform(get("/").with(rob()))

##### [](https://www.springcloud.cc/spring-security.html#running-as-a-user-in-spring-mvc-test-with-annotations)在Spring MVC使用注释进行测试时以用户身份运行

作为使用`RequestPostProcessor`创建用户的替代方法，您可以使用[第9.1节“测试方法安全性”中](https://www.springcloud.cc/spring-security.html#test-method "9.1测试方法安全性")所述的注释。例如，以下将使用用户名“user”，密码“password”和角色“ROLE_USER”运行测试：

_@Test_
_@WithMockUser_
public void requestProtectedUrlWithUser() throws Exception {
mvc
        .perform(get("/"))
        ...
}

或者，以下将使用用户名“user”，密码“password”和角色“ROLE_ADMIN”运行测试：

_@Test_
_@WithMockUser(roles="ADMIN")_
public void requestProtectedUrlWithUser() throws Exception {
mvc
        .perform(get("/"))
        ...
}

#### [](https://www.springcloud.cc/spring-security.html#testing-http-basic-authentication)测试HTTP基本身份验证

虽然始终可以使用HTTP Basic进行身份验证，但记住标题名称，格式和编码值有点乏味。现在可以使用Spring Security的`httpBasic` `RequestPostProcessor`完成此操作。例如，下面的代码段：

mvc
    .perform(get("/").with(httpBasic("user","password")))

将通过确保在HTTP请求上填充以下标头，尝试使用HTTP Basic使用用户名“user”和密码“password”对用户进行身份验证：

Authorization: Basic dXNlcjpwYXNzd29yZA==

### [](https://www.springcloud.cc/spring-security.html#securitymockmvcrequestbuilders)9.2.3 SecurityMockMvcRequestBuilders

Spring MVC测试还提供了一个`RequestBuilder`接口，可用于创建测试中使用的`MockHttpServletRequest`。Spring Security提供了一些`RequestBuilder`实现，可用于简化测试。为了使用Spring Security的`RequestBuilder`实现，请确保使用以下静态导入：

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.*;

#### [](https://www.springcloud.cc/spring-security.html#testing-form-based-authentication)测试基于表单的认证

您可以使用Spring Security的测试支持轻松创建测试基于表单的身份验证的请求。例如，以下内容将使用用户名“user”，密码“password”和有效的CSRF令牌向“/ login”提交POST：

mvc
    .perform(formLogin())

可以轻松自定义请求。例如，以下内容将使用用户名“admin”，密码“pass”和有效的CSRF令牌向“/ auth”提交POST：

mvc
    .perform(formLogin("/auth").user("admin").password("pass"))

我们还可以自定义包含用户名和密码的参数名称。例如，这是上面的请求被修改为包括HTTP参数“u”上的用户名和HTTP参数“p”上的密码。

mvc
    .perform(formLogin("/auth").user("u","admin").password("p","pass"))

#### [](https://www.springcloud.cc/spring-security.html#test-logout)测试注销

虽然使用标准Spring MVC测试相当简单，但您可以使用Spring Security的测试支持来简化测试注销。例如，以下内容将使用有效的CSRF令牌向“/ logout”提交POST：

mvc
    .perform(logout())

您还可以自定义要发布到的URL。例如，下面的代码段将使用有效的CSRF令牌向“/ signout”提交POST：

mvc
    .perform(logout("/signout"))

### [](https://www.springcloud.cc/spring-security.html#securitymockmvcresultmatchers)9.2.4 SecurityMockMvcResultMatchers

有时希望对请求做出各种与安全相关的断言。为了满足这种需求，Spring Security测试支持实现了Spring MVC Test的`ResultMatcher`接口。为了使用Spring Security的`ResultMatcher`实现，请确保使用以下静态导入：

import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.*;

#### [](https://www.springcloud.cc/spring-security.html#unauthenticated-assertion)未经认证的断言

有时，断言没有与`MockMvc`调用的结果相关联的经过身份验证的用户可能很有价值。例如，您可能希望测试提交无效的用户名和密码，并验证没有用户通过身份验证。使用Spring Security的测试支持可以使用以下内容轻松完成此操作：

mvc
    .perform(formLogin().password("invalid"))
    .andExpect(unauthenticated());

#### [](https://www.springcloud.cc/spring-security.html#authenticated-assertion)认证断言

通常我们必须断言经过身份验证的用户存在。例如，我们可能想验证我们是否已成功验证。我们可以使用以下代码片段验证基于表单的登录是否成功：

mvc
    .perform(formLogin())
    .andExpect(authenticated());

如果我们想要断言用户的角色，我们可以优化我们之前的代码，如下所示：

mvc
    .perform(formLogin().user("admin"))
    .andExpect(authenticated().withRoles("USER","ADMIN"));

或者，我们可以验证用户名：

mvc
    .perform(formLogin().user("admin"))
    .andExpect(authenticated().withUsername("admin"));

我们也可以结合断言：

mvc
    .perform(formLogin().user("admin").roles("USER","ADMIN"))
    .andExpect(authenticated().withUsername("admin"));

我们还可以对身份验证进行任意断言

mvc
    .perform(formLogin())
    .andExpect(authenticated().withAuthentication(auth ->
        assertThat(auth).isInstanceOf(UsernamePasswordAuthenticationToken.class)));

## [](https://www.springcloud.cc/spring-security.html#web-app-security)10. Web应用程序安全性

大多数Spring Security用户将在使用HTTP和Servlet API的应用程序中使用该框架。在本部分中，我们将了解Spring Security如何为应用程序的web层提供身份验证和访问控制功能。我们将查看命名空间的外观，并查看实际组装的类和接口，以提供web - 层安全性。在某些情况下，有必要使用传统的bean配置来提供对配置的完全控制，因此我们还将看到如何在没有命名空间的情况下直接配置这些类。

## [](https://www.springcloud.cc/spring-security.html#security-filter-chain)10.1安全过滤器链

Spring Security的web基础结构完全基于标准的servlet过滤器。它不在内部使用servlet或任何其他基于servlet的框架（例如Spring MVC），因此它与任何特定的web技术没有强大的链接。它处理`HttpServletRequest`和`HttpServletResponse` s并不关心请求是来自浏览器，web服务客户端，`HttpInvoker`还是AJAX应用程序。

Spring Security在内部维护一个过滤器链，其中每个过滤器都有特定的责任，并根据所需的服务在配置中添加或删除过滤器。过滤器的顺序很重要，因为它们之间存在依赖关系。如果您一直在使用[命名空间配置](https://www.springcloud.cc/spring-security.html#ns-config "7.安全命名空间配置")，那么将自动为您配置过滤器，您不必明确定义任何Spring bean，但这可能是您希望完全控制安全过滤器链的时候，因为您正在使用命名空间中不支持的功能，或者您正在使用自己的自定义版本的类。

### [](https://www.springcloud.cc/spring-security.html#delegating-filter-proxy)10.1.1 DelegatingFilterProxy

使用servlet过滤器时，显然需要在`web.xml`中声明它们，否则servlet容器将忽略它们。在Spring Security中，过滤器类也是在应用程序上下文中定义的Spring bean，因此能够利用Spring丰富的依赖注入工具和生命周期接口。Spring的`DelegatingFilterProxy`提供了`web.xml`与应用程序上下文之间的链接。

使用`DelegatingFilterProxy`时，您会在`web.xml`文件中看到类似的内容：

<filter>
<filter-name>myFilter</filter-name>
<filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>

<filter-mapping>
<filter-name>myFilter</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>

请注意，过滤器实际上是`DelegatingFilterProxy`，而不是实际实现过滤器逻辑的类。`DelegatingFilterProxy`的作用是将`Filter`的方法委托给从Spring应用程序上下文中获取的bean。这使bean能够受益于Spring web应用程序上下文生命周期支持和配置灵活性。bean必须实现`javax.servlet.Filter`，并且它必须与`filter-name`元素中的名称相同。有关更多信息，请阅读`DelegatingFilterProxy`的Javadoc

### [](https://www.springcloud.cc/spring-security.html#filter-chain-proxy)10.1.2 FilterChainProxy

Spring Security的web基础设施只能通过委托给`FilterChainProxy`的实例来使用。安全过滤器本身不应使用。从理论上讲，您可以在应用程序上下文文件中声明所需的每个Spring Security过滤器bean，并为每个过滤器添加相应的`DelegatingFilterProxy`条目到`web.xml`，确保它们的排序正确，但这将是如果你有很多过滤器，那么很麻烦并且会很快弄乱`web.xml`文件。`FilterChainProxy`允许我们向`web.xml`添加一个条目，并完全处理应用程序上下文文件以管理我们的web安全bean。它使用`DelegatingFilterProxy`进行连线，就像上面的示例一样，但是将`filter-name`设置为bean名称“filterChainProxy”。然后，在应用程序上下文中使用相同的bean名称声明过滤器链。这是一个例子：

<bean id="filterChainProxy" class="org.springframework.security.web.FilterChainProxy">
<constructor-arg>
    <list>
    <sec:filter-chain pattern="/restful/**" filters="
        securityContextPersistenceFilterWithASCFalse,
        basicAuthenticationFilter,
        exceptionTranslationFilter,
        filterSecurityInterceptor" />
    <sec:filter-chain pattern="/**" filters="
        securityContextPersistenceFilterWithASCTrue,
        formLoginFilter,
        exceptionTranslationFilter,
        filterSecurityInterceptor" />
    </list>
</constructor-arg>
</bean>

命名空间元素`filter-chain`用于方便地设置应用程序中所需的安全过滤器链。 [[6]](https://www.springcloud.cc/spring-security.html#ftn.d5e3604)。它将特定的URL模式映射到根据`filters`元素中指定的bean名称构建的过滤器列表，并将它们组合在`SecurityFilterChain`类型的bean中。`pattern`属性采用Ant路径，最具体的URI应首先出现[[7]](https://www.springcloud.cc/spring-security.html#ftn.d5e3610)。在运行时，`FilterChainProxy`将找到与当前web请求匹配的第一个URI模式，并且`filters`属性指定的过滤器bean列表将应用于该请求。过滤器将按照定义的顺序调用，因此您可以完全控制应用于特定URL的过滤器链。

您可能已经注意到我们在过滤器链中声明了两个`SecurityContextPersistenceFilter` s（`ASC`是`allowSessionCreation`的缩写，属性为`SecurityContextPersistenceFilter`）。由于web服务永远不会在未来的请求中出现`jsessionid`，因此为这样的用户代理创建`HttpSession`将是浪费的。如果您的大批量应用程序需要最大的可扩展性，我们建议您使用上面显示的方法。对于较小的应用程序，使用单个`SecurityContextPersistenceFilter`（默认`allowSessionCreation`为`true`）可能就足够了。

请注意，`FilterChainProxy`不会在配置的过滤器上调用标准过滤器生命周期方法。我们建议您使用Spring的应用程序上下文生命周期接口作为替代，就像使用任何其他Spring bean一样。

当我们查看如何使用[命名空间配置](https://www.springcloud.cc/spring-security.html#ns-web-xml "7.2.1 web.xml配置")设置web安全性时，我们使用名为“springSecurityFilterChain”的`DelegatingFilterProxy`。您现在应该能够看到这是由命名空间创建的`FilterChainProxy`的名称。

#### [](https://www.springcloud.cc/spring-security.html#bypassing-the-filter-chain)绕过过滤链

您可以使用属性`filters = "none"`作为提供过滤器bean列表的替代方法。这将完全省略安全过滤器链中的请求模式。请注意，与此路径匹配的任何内容都将不会应用任何身份验证或授权服务，并且可以自由访问。如果要在请求期间使用`SecurityContext`内容的内容，则它必须已通过安全筛选器链。否则，将不会填充`SecurityContextHolder`并且内容将为null。

### [](https://www.springcloud.cc/spring-security.html#filter-ordering)10.1.3过滤器排序

过滤器在链中定义的顺序非常重要。无论您实际使用哪种过滤器，订单应如下：

- `ChannelProcessingFilter`，因为它可能需要重定向到不同的协议
- `SecurityContextPersistenceFilter`，因此可以在web请求开头的`SecurityContextHolder`中设置`SecurityContext`，并且`SecurityContext`的任何更改都可以复制到`HttpSession`当web请求结束时（准备好与下一个web请求一起使用）
- `ConcurrentSessionFilter`，因为它使用`SecurityContextHolder`功能并需要更新`SessionRegistry`以反映来自校长的持续请求
- 身份验证处理机制 - `UsernamePasswordAuthenticationFilter`，`CasAuthenticationFilter`，`BasicAuthenticationFilter`等 - 以便`SecurityContextHolder`可以修改为包含有效的`Authentication`请求令牌
- `SecurityContextHolderAwareRequestFilter`，如果您使用它将Spring Security识别`HttpServletRequestWrapper`安装到您的servlet容器中
- `JaasApiIntegrationFilter`，如果`SecurityContextHolder`位于`SecurityContextHolder`，则会将`FilterChain`视为`JaasAuthenticationToken`中的`Subject`
- `RememberMeAuthenticationFilter`，如果没有早期的身份验证处理机制更新`SecurityContextHolder`，并且请求提供了一个启用记住我服务的cookie，则会在那里放置一个合适的记忆`Authentication`对象
- `AnonymousAuthenticationFilter`，如果没有早期的身份验证处理机制更新`SecurityContextHolder`，那么匿名`Authentication`对象将被放置在那里
- `ExceptionTranslationFilter`，捕获任何Spring Security异常，以便可以返回HTTP错误响应或启动适当的`AuthenticationEntryPoint`
- `FilterSecurityInterceptor`，用于保护web URI并在访问被拒绝时引发异常

### [](https://www.springcloud.cc/spring-security.html#request-matching)10.1.4请求匹配和HttpFirewall

Spring Security有几个区域，您定义的模式将针对传入请求进行测试，以决定如何处理请求。当`FilterChainProxy`决定应该通过哪个过滤器链以及`FilterSecurityInterceptor`决定哪个安全约束适用于请求时，会发生这种情况。在针对您定义的模式进行测试时，了解机制是什么以及使用什么URL值非常重要。

Servlet规范定义了`HttpServletRequest`的几个属性，这些属性可以通过getter方法访问，我们可能希望与之匹配。这些是`contextPath`，`servletPath`，`pathInfo`和`queryString`。Spring Security仅对保护应用程序中的路径感兴趣，因此忽略`contextPath`。不幸的是，servlet规范没有准确定义`servletPath`和`pathInfo`的值将包含特定请求URI的内容。例如，URL的每个路径段可以包含参数，如[RFC 2396](https://www.ietf.org/rfc/rfc2396.txt) [[8]中](https://www.springcloud.cc/spring-security.html#ftn.d5e3708)所定义。规范没有明确说明这些是否应该包含在`servletPath`和`pathInfo`值中，并且不同servlet容器之间的行为也不同。存在这样的危险：当应用程序部署在不从这些值中删除路径参数的容器中时，攻击者可以将它们添加到请求的URL中，以使模式匹配成功或意外失败。 [[9]](https://www.springcloud.cc/spring-security.html#ftn.d5e3713)。传入URL的其他变体也是可能的。例如，它可能包含路径遍历序列（如`/../`）或多个正斜杠（`//`），这也可能导致模式匹配失败。一些容器在执行servlet映射之前将这些规范化，但其他容器则没有。为了防止出现这些问题，`FilterChainProxy`使用`HttpFirewall`策略检查并包装请求。默认情况下会自动拒绝未规范化的请求，并且会删除路径参数和重复斜杠以进行匹配。 [[10]](https://www.springcloud.cc/spring-security.html#ftn.d5e3720)。因此，必须使用`FilterChainProxy`来管理安全过滤器链。请注意，`servletPath`和`pathInfo`值由容器解码，因此您的应用程序不应包含任何包含分号的有效路径，因为这些部分将被删除以用于匹配目的。

如上所述，默认策略是使用Ant样式路径进行匹配，这可能是大多数用户的最佳选择。该策略在类`AntPathRequestMatcher`中实现，该类使用Spring的`AntPathMatcher`来执行模式与连接的`servletPath`和`pathInfo`的不区分大小写的匹配，忽略`queryString`。

如果由于某种原因，您需要更强大的匹配策略，则可以使用正则表达式。战略实施是`RegexRequestMatcher`。有关更多信息，请参阅此类的Javadoc。

实际上，我们建议您在服务层使用方法安全性，以控制对应用程序的访问，而不是完全依赖于web - 应用程序级别定义的安全性约束。URL发生变化，很难考虑应用程序可能支持的所有可能的URL以及如何操作请求。您应该尝试限制自己使用一些简单易懂的简单蚂蚁路径。始终尝试使用“默认拒绝”方法，其中您最后定义了一个全能通配符（/ **或**）并拒绝访问。

在服务层定义的安全性更强大，更难以绕过，因此您应该始终利用Spring Security的方法安全选项。

`HttpFirewall`还通过拒绝HTTP响应标头中的新行字符来阻止[HTTP响应拆分](https://www.owasp.org/index.php/HTTP_Response_Splitting)。

默认情况下，使用`StrictHttpFirewall`。此实现拒绝看似恶意的请求。如果它对您的需求过于严格，那么您可以自定义拒绝的请求类型。但是，重要的是要知道这可以打开您的应用程序直至攻击。例如，如果您希望利用Spring MVC的矩阵变量，可以在XML中使用以下配置：

<b:bean id="httpFirewall"
      class="org.springframework.security.web.firewall.StrictHttpFirewall"
      p:allowSemicolon="true"/>

<http-firewall ref="httpFirewall"/>

通过公开`StrictHttpFirewall` bean，Java Configuration可以实现同样的目的。

_@Bean_
public StrictHttpFirewall httpFirewall() {
    StrictHttpFirewall firewall = new StrictHttpFirewall();
    firewall.setAllowSemicolon(true);
    return firewall;
}

`StrictHttpFirewall`提供了有效HTTP方法的白名单，可以防止[跨站点跟踪（XST）](https://www.owasp.org/index.php/Cross_Site_Tracing)和[HTTP动词篡改](https://www.owasp.org/index.php/Test_HTTP_Methods_(OTG-CONFIG-006))。默认的有效方法是“DELETE”，“GET”，“HEAD”，“OPTIONS”，“PATCH”，“POST”和“PUT”。如果您的应用程序需要修改有效方法，则可以配置自定义`StrictHttpFirewall` bean。例如，以下内容仅允许HTTP“GET”和“POST”方法：

<b:bean id="httpFirewall"
      class="org.springframework.security.web.firewall.StrictHttpFirewall"
      p:allowedHttpMethods="GET,HEAD"/>

<http-firewall ref="httpFirewall"/>

通过公开`StrictHttpFirewall` bean，Java Configuration可以实现同样的目的。

_@Bean_
public StrictHttpFirewall httpFirewall() {
    StrictHttpFirewall firewall = new StrictHttpFirewall();
    firewall.setAllowedHttpMethods(Arrays.asList("GET", "POST"));
    return firewall;
}

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|如果您使用的是`new MockHttpServletRequest()`，它当前会将HTTP方法创建为空字符串“”。这是一种无效的HTTP方法，将被Spring Security拒绝。您可以通过将其替换为`new MockHttpServletRequest("GET", "")`来解决此问题。有关要求改进此问题的问题，请参阅[SPR_16851](https://jira.spring.io/browse/SPR-16851)。|

如果必须允许任何HTTP方法（不推荐），则可以使用`StrictHttpFirewall.setUnsafeAllowAnyHttpMethod(true)`。这将完全禁用HTTP方法的验证。

### [](https://www.springcloud.cc/spring-security.html#use-with-other-filter-based-frameworks)10.1.5与其他基于过滤器的框架一起使用

如果您正在使用其他基于过滤器的框架，那么您需要确保首先使用Spring Security过滤器。这样可以及时填充`SecurityContextHolder`以供其他过滤器使用。示例是使用SiteMesh来装饰您的web页面或像Wicket这样的web框架，它使用过滤器来处理其请求。

### [](https://www.springcloud.cc/spring-security.html#filter-chains-with-ns)10.1.6高级命名空间配置

正如我们之前在命名空间章节中看到的那样，可以使用多个`http`元素为不同的URL模式定义不同的安全配置。每个元素在内部`FilterChainProxy`内创建一个过滤器链，并在应该映射到它的URL模式中创建。元素将按声明的顺序添加，因此必须首先声明最具体的模式。这是另一个例子，对于与上面类似的情况，应用程序同时支持无状态RESTful API以及用户使用表单登录的普通web应用程序。

<!-- Stateless RESTful service using Basic authentication -->
<http pattern="/restful/**" create-session="stateless">
<intercept-url pattern='/**' access="hasRole('REMOTE')" />
<http-basic />
</http>

<!-- Empty filter chain for the login page -->
<http pattern="/login.htm*" security="none"/>

<!-- Additional filter chain for normal users, matching all other requests -->
<http>
<intercept-url pattern='/**' access="hasRole('USER')" />
<form-login login-page='/login.htm' default-target-url="/home.htm"/>
<logout />
</http>

## [](https://www.springcloud.cc/spring-security.html#core-web-filters)10.2核心安全过滤器

有一些关键过滤器将始终用于使用Spring Security的web应用程序，因此我们将首先查看这些及其支持类和接口。我们不会涵盖所有功能，因此如果您想获得完整的图片，请务必查看Javadoc。

### [](https://www.springcloud.cc/spring-security.html#filter-security-interceptor)10.2.1 FilterSecurityInterceptor

在讨论[访问控制时](https://www.springcloud.cc/spring-security.html#tech-intro-access-control "8.1.5 Spring Security中的访问控制（授权）")，我们已经简要地看过`FilterSecurityInterceptor` ，我们已经将它与命名空间一起使用，其中`<intercept-url>`元素被组合在内部进行配置。现在我们将看到如何显式配置它以使用`FilterChainProxy`及其伴随过滤器`ExceptionTranslationFilter`。典型配置示例如下所示：

<bean id="filterSecurityInterceptor"
    class="org.springframework.security.web.access.intercept.FilterSecurityInterceptor">
<property name="authenticationManager" ref="authenticationManager"/>
<property name="accessDecisionManager" ref="accessDecisionManager"/>
<property name="securityMetadataSource">
    <security:filter-security-metadata-source>
    <security:intercept-url pattern="/secure/super/**" access="ROLE_WE_DONT_HAVE"/>
    <security:intercept-url pattern="/secure/**" access="ROLE_SUPERVISOR,ROLE_TELLER"/>
    </security:filter-security-metadata-source>
</property>
</bean>

`FilterSecurityInterceptor`负责处理HTTP资源的安全性。它需要引用`AuthenticationManager`和`AccessDecisionManager`。它还提供了适用于不同HTTP URL请求的配置属性。请参阅技术介绍中[有关这些内容的原始讨论](https://www.springcloud.cc/spring-security.html#tech-intro-config-attributes "什么是配置属性？")。

`FilterSecurityInterceptor`可以通过两种方式配置配置属性。第一个，如上所示，使用`<filter-security-metadata-source>`命名空间元素。这类似于命名空间章节中的`<http>`元素，但`<intercept-url>`子元素仅使用`pattern`和`access`属性。逗号用于分隔适用于每个HTTP URL的不同配置属性。第二个选项是编写自己的`SecurityMetadataSource`，但这超出了本文档的范围。无论使用何种方法，`SecurityMetadataSource`都负责返回包含与单个安全HTTP URL关联的所有配置属性的`List<ConfigAttribute>`。

应该注意的是，`FilterSecurityInterceptor.setSecurityMetadataSource()`方法实际上需要一个`FilterInvocationSecurityMetadataSource`的实例。这是一个子类`SecurityMetadataSource`的标记接口。它只是表示`SecurityMetadataSource`理解`FilterInvocation` s。为了简单起见，我们将继续将`FilterInvocationSecurityMetadataSource`称为`SecurityMetadataSource`，因为区别与大多数用户无关。

命名空间语法创建的`SecurityMetadataSource`通过将请求URL与配置的`pattern`属性相匹配来获取特定`FilterInvocation`的配置属性。这与命名空间配置的行为方式相同。缺省情况是将所有表达式视为Apache Ant路径，并且对于更复杂的情况也支持正则表达式。`request-matcher`属性用于指定正在使用的模式类型。无法在同一定义中混合表达式语法。例如，使用正则表达式而不是Ant路径的先前配置将编写如下：

<bean id="filterInvocationInterceptor"
    class="org.springframework.security.web.access.intercept.FilterSecurityInterceptor">
<property name="authenticationManager" ref="authenticationManager"/>
<property name="accessDecisionManager" ref="accessDecisionManager"/>
<property name="runAsManager" ref="runAsManager"/>
<property name="securityMetadataSource">
    <security:filter-security-metadata-source request-matcher="regex">
    <security:intercept-url pattern="\A/secure/super/.*\Z" access="ROLE_WE_DONT_HAVE"/>
    <security:intercept-url pattern="\A/secure/.*\" access="ROLE_SUPERVISOR,ROLE_TELLER"/>
    </security:filter-security-metadata-source>
</property>
</bean>

始终按照定义的顺序评估模式。因此，重要的是在列表中定义的更具体的模式比不太具体的模式更高。这反映在上面的示例中，其中更具体的`/secure/super/`模式看起来高于不太具体的`/secure/`模式。如果它们被反转，则`/secure/`模式将始终匹配，并且永远不会评估`/secure/super/`模式。

### [](https://www.springcloud.cc/spring-security.html#exception-translation-filter)10.2.2 ExceptionTranslationFilter

`ExceptionTranslationFilter`位于安全过滤器堆栈中的`FilterSecurityInterceptor`之上。它不执行任何实际的安全实施，但处理安全拦截器抛出的异常并提供合适的HTTP响应。

<bean id="exceptionTranslationFilter"
class="org.springframework.security.web.access.ExceptionTranslationFilter">
<property name="authenticationEntryPoint" ref="authenticationEntryPoint"/>
<property name="accessDeniedHandler" ref="accessDeniedHandler"/>
</bean>

<bean id="authenticationEntryPoint"
class="org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint">
<property name="loginFormUrl" value="/login.jsp"/>
</bean>

<bean id="accessDeniedHandler"
    class="org.springframework.security.web.access.AccessDeniedHandlerImpl">
<property name="errorPage" value="/accessDenied.htm"/>
</bean>

#### [](https://www.springcloud.cc/spring-security.html#auth-entry-point)的AuthenticationEntryPoint

如果用户请求安全的HTTP资源但未对其进行身份验证，则将调用`AuthenticationEntryPoint`。安全拦截器将在调用堆栈的下方抛出适当的`AuthenticationException`或`AccessDeniedException`，在入口点触发`commence`方法。这样做的目的是向用户提供适当的响应，以便开始身份验证。我们在这里使用的是`LoginUrlAuthenticationEntryPoint`，它将请求重定向到不同的URL（通常是登录页面）。使用的实际实现将取决于您希望在应用程序中使用的身份验证机制。

#### [](https://www.springcloud.cc/spring-security.html#access-denied-handler)AccessDeniedHandler

如果用户已经过身份验证并且他们尝试访问受保护资源，会发生什么？在正常使用中，这不应该发生，因为应用程序工作流应限制为用户有权访问的操作。例如，可能会向没有管理员角色的用户隐藏指向管理页面的HTML链接。但是，您不能依赖隐藏链接来保证安全性，因为用户总是有可能直接输入URL以试图绕过限制。或者他们可能会修改RESTful URL以更改某些参数值。您的应用程序必须受到这些情况的保护，否则肯定是不安全的。您通常会使用简单的web层安全性将约束应用于基本URL，并在服务层接口上使用更具体的基于方法的安全性来真正确定允许的内容。

如果抛出`AccessDeniedException`并且用户已经过身份验证，那么这意味着已尝试对其没有足够权限的操作。在这种情况下，`ExceptionTranslationFilter`将调用第二个策略`AccessDeniedHandler`。默认情况下，使用`AccessDeniedHandlerImpl`，它只向客户端发送403（禁止）响应。或者，您可以显式配置实例（如上例所示）并设置错误页面URL，它将请求转发到[[11]](https://www.springcloud.cc/spring-security.html#ftn.d5e3841)。这可以是简单的“访问被拒绝”页面，例如JSP，或者它可以是更复杂的处理程序，例如MVC控制器。当然，您可以自己实现界面并使用自己的实现。

当您使用命名空间配置应用程序时，也可以提供自定义`AccessDeniedHandler`。有关详细信息，请参阅[命名空间附录](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler "<禁止访问的处理程序>")。

#### [](https://www.springcloud.cc/spring-security.html#request-caching)SavedRequest和RequestCache接口

`ExceptionTranslationFilter`职责的另一个责任是在调用`AuthenticationEntryPoint`之前保存当前请求。这允许在用户进行身份验证后恢复请求（请参阅先前的[web身份验证](https://www.springcloud.cc/spring-security.html#tech-intro-web-authentication "8.1.4 Web应用程序中的身份验证")概述）。一个典型的例子是用户使用表单登录，然后通过默认值`SavedRequestAwareAuthenticationSuccessHandler`重定向到原始URL（见[下文](https://www.springcloud.cc/spring-security.html#form-login-flow-handling "认证成功与失败的应用流程")）。

`RequestCache`封装了存储和检索`HttpServletRequest`实例所需的功能。默认情况下，使用`HttpSessionRequestCache`，它将请求存储在`HttpSession`中。当用户被重定向到原始URL时，`RequestCacheFilter`的作用是实际从缓存中恢复已保存的请求。

在正常情况下，您不需要修改任何此功能，但保存请求处理是“尽力而为”的方法，并且可能存在默认配置无法处理的情况。使用这些接口使其从Spring Security 3.0开始完全可插拔。

### [](https://www.springcloud.cc/spring-security.html#security-context-persistence-filter)10.2.3 SecurityContextPersistenceFilter

我们在“ [技术概述”](https://www.springcloud.cc/spring-security.html#tech-intro-sec-context-persistence "在请求之间存储SecurityContext")一章中介绍了这个非常重要的过滤器的用途，因此您可能希望在此时重新阅读该部分。我们先来看看如何配置它以便与`FilterChainProxy`一起使用。基本配置只需要bean本身

<bean id="securityContextPersistenceFilter"
class="org.springframework.security.web.context.SecurityContextPersistenceFilter"/>

如前所述，此过滤器有两个主要任务。它负责在HTTP请求之间存储`SecurityContext`内容，并在请求完成时清除`SecurityContextHolder`。清除存储上下文的`ThreadLocal`是必不可少的，因为否则可能将线程替换到servlet容器的线程池中，同时仍附加特定用户的安全上下文。然后可以在稍后阶段使用该线程，使用错误的凭证执行操作。

#### [](https://www.springcloud.cc/spring-security.html#security-context-repository)SecurityContextRepository

从Spring Security 3.0开始，加载和存储安全上下文的工作现在被委托给一个单独的策略接口：

public interface SecurityContextRepository {

SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder);

void saveContext(SecurityContext context, HttpServletRequest request,
        HttpServletResponse response);
}

`HttpRequestResponseHolder`只是传入请求和响应对象的容器，允许实现用包装类替换它们。返回的内容将传递给过滤器链。

默认实现是`HttpSessionSecurityContextRepository`，它将安全上下文存储为`HttpSession`属性[[12]](https://www.springcloud.cc/spring-security.html#ftn.d5e3880)。此实现最重要的配置参数是`allowSessionCreation`属性，默认为`true`，因此如果需要一个会话来为经过身份验证的用户存储安全上下文，则允许该类创建会话（它不会创建一个，除非进行了身份验证并且安全上下文的内容已更改）。如果您不想创建会话，则可以将此属性设置为`false`：

<bean id="securityContextPersistenceFilter"
    class="org.springframework.security.web.context.SecurityContextPersistenceFilter">
<property name='securityContextRepository'>
    <bean class='org.springframework.security.web.context.HttpSessionSecurityContextRepository'>
    <property name='allowSessionCreation' value='false' />
    </bean>
</property>
</bean>

或者，您可以提供`NullSecurityContextRepository`的实例，即[空对象](https://en.wikipedia.org/wiki/Null_Object_pattern)实现，即使在请求期间已创建会话，也会阻止安全上下文的存储。

### [](https://www.springcloud.cc/spring-security.html#form-login-filter)10.2.4 UsernamePasswordAuthenticationFilter

我们现在已经看到了三个主要的过滤器，这些过滤器始终存在于Spring Security web配置中。这些也是由命名空间`<http>`元素自动创建的三个，不能用替代品替换。现在唯一缺少的是实际的身份验证机制，允许用户进行身份验证。此过滤器是最常用的身份验证过滤器，也是最常定制的过滤器[[13]](https://www.springcloud.cc/spring-security.html#ftn.d5e3895)。它还提供了命名空间中`<form-login>`元素使用的实现。配置它需要三个阶段。

- 使用登录页面的URL配置`LoginUrlAuthenticationEntryPoint`，就像我们上面所做的那样，并将其设置在`ExceptionTranslationFilter`上。
- 实现登录页面（使用JSP或MVC控制器）。
- 在应用程序上下文中配置`UsernamePasswordAuthenticationFilter`的实例
- 将过滤器bean添加到过滤器链代理（确保您注意顺序）。

登录表单只包含`username`和`password`输入字段，并发布到过滤器监控的URL（默认情况下为`/login`）。基本过滤器配置如下所示：

<bean id="authenticationFilter" class=
"org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter">
<property name="authenticationManager" ref="authenticationManager"/>
</bean>

#### [](https://www.springcloud.cc/spring-security.html#form-login-flow-handling)认证成功与失败的应用流程

筛选器调用已配置的`AuthenticationManager`来处理每个身份验证请求。身份验证成功或身份验证失败后的目标分别由`AuthenticationSuccessHandler`和`AuthenticationFailureHandler`策略接口控制。过滤器具有允许您设置这些属性的属性，因此您可以完全自定义行为[[14]](https://www.springcloud.cc/spring-security.html#ftn.d5e3923)。提供了一些标准实现，例如`SimpleUrlAuthenticationSuccessHandler`，`SavedRequestAwareAuthenticationSuccessHandler`，`SimpleUrlAuthenticationFailureHandler`，`ExceptionMappingAuthenticationFailureHandler`和`DelegatingAuthenticationFailureHandler`。查看这些类的Javadoc以及`AbstractAuthenticationProcessingFilter`以了解它们的工作原理和支持的功能。

如果身份验证成功，生成的`Authentication`对象将被放入`SecurityContextHolder`。然后将调用配置的`AuthenticationSuccessHandler`以将用户重定向或转发到适当的目标。默认情况下，使用`SavedRequestAwareAuthenticationSuccessHandler`，这意味着在要求用户登录之前，用户将被重定向到他们请求的原始目的地。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|`ExceptionTranslationFilter`缓存用户的原始请求。当用户进行身份验证时，请求处理程序会使用此缓存的请求来获取原始URL并重定向到该URL。然后重建原始请求并将其用作替代方案。|

如果身份验证失败，将调用配置的`AuthenticationFailureHandler`。

## [](https://www.springcloud.cc/spring-security.html#servletapi)10.3 Servlet API集成

本节介绍如何将Spring Security与Servlet API集成。所述[servletapi-XML](https://github.com/spring-projects/spring-security/tree/master/samples/xml/servletapi)示例应用程序演示每一种方法的使用。

### [](https://www.springcloud.cc/spring-security.html#servletapi-25)10.3.1 Servlet 2.5+集成

#### [](https://www.springcloud.cc/spring-security.html#servletapi-remote-user)HttpServletRequest.getRemoteUser（）

所述[HttpServletRequest.getRemoteUser（）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#getRemoteUser())将返回的`SecurityContextHolder.getContext().getAuthentication().getName()`的结果通常是当前用户名。如果要在应用程序中显示当前用户名，这可能很有用。此外，检查this是否为null可用于指示用户是否已经过身份验证或是匿名的。知道用户是否被认证可以用于确定是否应该显示某些UI元素（即，仅当用户被认证时才应该显示注销链接）。

#### [](https://www.springcloud.cc/spring-security.html#servletapi-user-principal)HttpServletRequest.getUserPrincipal（）

所述[HttpServletRequest.getUserPrincipal（）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#getUserPrincipal())将返回的`SecurityContextHolder.getContext().getAuthentication()`的结果。这意味着它是`Authentication`，当使用基于用户名和密码的身份验证时，它通常是`UsernamePasswordAuthenticationToken`的实例。如果您需要有关用户的其他信息，这可能很有用。例如，您可能创建了一个自定义`UserDetailsService`，它返回一个自定义`UserDetails`，其中包含您的用户的名字和姓氏。您可以通过以下方式获取此信息：

Authentication auth = httpServletRequest.getUserPrincipal();
// assume integrated custom UserDetails called MyCustomUserDetails
// by default, typically instance of UserDetails
MyCustomUserDetails userDetails = (MyCustomUserDetails) auth.getPrincipal();
String firstName = userDetails.getFirstName();
String lastName = userDetails.getLastName();

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|应该注意的是，在整个应用程序中执行如此多的逻辑通常是不好的做法。相反，应该集中它以减少Spring Security和Servlet API的任何耦合。|

#### [](https://www.springcloud.cc/spring-security.html#servletapi-user-in-role)HttpServletRequest.isUserInRole（字符串）

所述[HttpServletRequest.isUserInRole（字符串）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#isUserInRole(java.lang.String))将确定是否`SecurityContextHolder.getContext().getAuthentication().getAuthorities()`包含`GrantedAuthority`与通入`isUserInRole(String)`的作用。通常，用户不应将“ROLE_”前缀传递给此方法，因为它会自动添加。例如，如果要确定当前用户是否具有“ROLE_ADMIN”权限，则可以使用以下命令：

boolean isAdmin = httpServletRequest.isUserInRole("ADMIN");

这可能有助于确定是否应显示某些UI组件。例如，仅当当前用户是管理员时，才可以显示管理员链接。

### [](https://www.springcloud.cc/spring-security.html#servletapi-3)10.3.2 Servlet 3+集成

以下部分描述了Spring Security与之集成的Servlet 3方法。

#### [](https://www.springcloud.cc/spring-security.html#servletapi-authenticate)HttpServletRequest.authenticate（HttpServletRequest的，HttpServletResponse的）

所述[HttpServletRequest.authenticate（HttpServletRequest的，HttpServletResponse的）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#authenticate%28javax.servlet.http.HttpServletResponse%29)方法可用于确保用户被认证。如果未经过身份验证，配置的AuthenticationEntryPoint将用于请求用户进行身份验证（即重定向到登录页面）。

#### [](https://www.springcloud.cc/spring-security.html#servletapi-login)HttpServletRequest.login（字符串，字符串）

所述[HttpServletRequest.login（字符串，字符串）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#login%28java.lang.String,%20java.lang.String%29)方法可用于与当前`AuthenticationManager`对用户进行认证。例如，以下内容将尝试使用用户名“user”和密码“password”进行身份验证：

try {
httpServletRequest.login("user","password");
} catch(ServletException e) {
// fail to authenticate
}

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|如果您希望Spring Security处理失败的身份验证尝试，则无需捕获ServletException。|

#### [](https://www.springcloud.cc/spring-security.html#servletapi-logout)HttpServletRequest.logout（）

所述[HttpServletRequest.logout（）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html#logout%28%29)方法可用于出登录当前用户。

通常这意味着SecurityContextHolder将被清除，HttpSession将被无效，任何“记住我”身份验证将被清除，等等。但是，配置的LogoutHandler实现将根据您的Spring Security配置而有所不同。重要的是要注意，在调用HttpServletRequest.logout（）之后，您仍然负责编写响应。通常，这将涉及重定向到欢迎页面。

#### [](https://www.springcloud.cc/spring-security.html#servletapi-start-runnable)AsyncContext.start（可运行）

该[AsynchContext.start（Runnable接口）](https://docs.oracle.com/javaee/6/api/javax/servlet/AsyncContext.html#start%28java.lang.Runnable%29)，以确保您的凭据方法将传播到新的线程。使用Spring Security的并发支持，Spring Security会覆盖AsyncContext.start（Runnable）以确保在处理Runnable时使用当前的SecurityContext。例如，以下内容将输出当前用户的身份验证：

final AsyncContext async = httpServletRequest.startAsync();
async.start(new Runnable() {
    public void run() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            final HttpServletResponse asyncResponse = (HttpServletResponse) async.getResponse();
            asyncResponse.setStatus(HttpServletResponse.SC_OK);
            asyncResponse.getWriter().write(String.valueOf(authentication));
            async.complete();
        } catch(Exception e) {
            throw new RuntimeException(e);
        }
    }
});

#### [](https://www.springcloud.cc/spring-security.html#servletapi-async)异步Servlet支持

如果您使用的是基于Java的配置，那么您就可以开始使用了。如果您使用的是XML配置，则需要进行一些更新。第一步是确保您已更新web。xml以至少使用3.0架构，如下所示：

<web-app xmlns="http://java.sun.com/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
version="3.0">

</web-app>

接下来，您需要确保设置springSecurityFilterChain以处理异步请求。

<filter>
<filter-name>springSecurityFilterChain</filter-name>
<filter-class>
    org.springframework.web.filter.DelegatingFilterProxy
</filter-class>
<async-supported>true</async-supported>
</filter>
<filter-mapping>
<filter-name>springSecurityFilterChain</filter-name>
<url-pattern>/*</url-pattern>
<dispatcher>REQUEST</dispatcher>
<dispatcher>ASYNC</dispatcher>
</filter-mapping>

而已！现在Spring Security将确保您的SecurityContext也在异步请求上传播。

那么它是怎样工作的？如果您对此不感兴趣，请随意跳过本节的其余部分，否则请继续阅读。其中大部分内容都包含在Servlet规范中，但有一些调整Spring Security可以确保正确处理异步请求。在Spring Security 3.2之前，一旦HttpServletResponse被提交，SecurityContextHolder中的SecurityContext就会自动保存。这可能会导致Async环境中出现问题。例如，请考虑以下事项：

httpServletRequest.startAsync();
new Thread("AsyncThread") {
    _@Override_
    public void run() {
        try {
            // Do work
            TimeUnit.SECONDS.sleep(1);

            // Write to and commit the httpServletResponse
            httpServletResponse.getOutputStream().flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}.start();

问题是Spring Security不知道此线程，因此SecurityContext不会传播给它。这意味着当我们提交HttpServletResponse时，没有SecuriytContext。当Spring Security在提交HttpServletResponse时自动保存SecurityContext时，它将丢失我们的登录用户。

从版本3.2开始，Spring Security非常智能，一旦HttpServletRequest.startAsync（）被调用，就不再自动保存SecurityContext以提交HttpServletResponse。

### [](https://www.springcloud.cc/spring-security.html#servletapi-31)10.3.3 Servlet 3.1+集成

以下部分描述了Spring Security与之集成的Servlet 3.1方法。

#### [](https://www.springcloud.cc/spring-security.html#servletapi-change-session-id)HttpServletRequest的＃changeSessionId（）

所述[HttpServletRequest.changeSessionId（）](https://docs.oracle.com/javaee/7/api/javax/servlet/http/HttpServletRequest.html#changeSessionId())是用于防止的默认方法[会话固定](https://www.springcloud.cc/spring-security.html#ns-session-fixation "会话固定攻击保护")在Servlet的3.1和更高的攻击。

## [](https://www.springcloud.cc/spring-security.html#basic)10.4基本和摘要式身份验证

基本身份验证和摘要身份验证是web应用程序中常用的备用身份验证机制。基本身份验证通常与无状态客户端一起使用，后者在每个请求上传递其凭据。将它与基于表单的身份验证结合使用是很常见的，其中应用程序通过基于浏览器的用户界面和web - 服务来使用。但是，基本身份验证将密码作为纯文本传输，因此只能在加密传输层（如HTTPS）上使用。

### [](https://www.springcloud.cc/spring-security.html#basic-processing-filter)10.4.1 BasicAuthenticationFilter

`BasicAuthenticationFilter`负责处理HTTP标头中显示的基本身份验证凭据。这可以用于验证Spring远程协议（例如Hessian和Burlap）以及普通浏览器用户代理（例如Firefox和Internet Explorer）所做的调用。管理HTTP基本身份验证的标准由RFC 1945第11节定义，`BasicAuthenticationFilter`符合此RFC。基本身份验证是一种极具吸引力的身份验证方法，因为它在用户代理中得到了广泛的部署，并且实现非常简单（它只是用户名的Base64编码：密码，在HTTP标头中指定）。

#### [](https://www.springcloud.cc/spring-security.html#basic-config)组态

要实现HTTP基本身份验证，您需要向过滤器链添加`BasicAuthenticationFilter`。应用程序上下文应包含`BasicAuthenticationFilter`及其所需的协作者：

<bean id="basicAuthenticationFilter"
class="org.springframework.security.web.authentication.www.BasicAuthenticationFilter">
<property name="authenticationManager" ref="authenticationManager"/>
<property name="authenticationEntryPoint" ref="authenticationEntryPoint"/>
</bean>

<bean id="authenticationEntryPoint"
class="org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint">
<property name="realmName" value="Name Of Your Realm"/>
</bean>

配置的`AuthenticationManager`处理每个身份验证请求。如果身份验证失败，配置的`AuthenticationEntryPoint`将用于重试身份验证过程。通常，您将结合使用过滤器`BasicAuthenticationEntryPoint`，它返回带有合适标头的401响应，以重试HTTP基本身份验证。如果身份验证成功，生成的`Authentication`对象将照常放入`SecurityContextHolder`。

如果身份验证事件成功，或者未尝试进行身份验证，因为HTTP标头不包含受支持的身份验证请求，则过滤器链将正常继续。过滤器链中断的唯一时间是验证失败并调用`AuthenticationEntryPoint`。

### [](https://www.springcloud.cc/spring-security.html#digest-processing-filter)10.4.2 DigestAuthenticationFilter

`DigestAuthenticationFilter`能够处理HTTP标头中显示的摘要式身份验证凭据。摘要式身份验证尝试解决基本身份验证的许多弱点，特别是通过确保永远不会通过网络以明文形式发送凭据。许多用户代理支持摘要式身份验证，包括Mozilla Firefox和Internet Explorer。管理HTTP摘要式身份验证的标准由RFC 2617定义，它更新RFC 2069规定的摘要式身份验证标准的早期版本。大多数用户代理实现RFC 2617. Spring Security的`DigestAuthenticationFilter`与“身份验证”兼容“RFC 2617规定的保护质量（`qop`），它还提供与RFC 2069的向后兼容性。如果您需要使用未加密的HTTP（即没有TLS / HTTPS）并希望最大化安全性，摘要式身份验证是一个更具吸引力的选项验证过程。事实上，摘要式身份验证是WebDAV协议的强制性要求，如RFC 2518第17.1节所述。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|您不应该在现代应用程序中使用Digest，因为它不被认为是安全的。最明显的问题是您必须以明文，加密或MD5格式存储密码。所有这些存储格式都被认为是不安全的。相反，您应该使用单向自适应密码哈希（即bCrypt，PBKDF2，SCrypt等）。|

摘要式身份验证的核心是“随机数”。这是服务器生成的值。Spring Security的现时采用以下格式：

base64(expirationTime + ":" + md5Hex(expirationTime + ":" + key))
expirationTime:   The date and time when the nonce expires, expressed in milliseconds
key:              A private key to prevent modification of the nonce token

`DigestAuthenticatonEntryPoint`具有指定用于生成随机数令牌的`key`的属性，以及用于确定到期时间的`nonceValiditySeconds`属性（默认值300，等于五分钟）。Whist永远是nonce有效，摘要是通过连接各种字符串计算的，包括用户名，密码，nonce，请求的URI，客户端生成的nonce（只是用户代理生成每个请求的随机值），领域名称等，然后执行MD5哈希。服务器和用户代理都执行此摘要计算，如果它们在包含的值（例如密码）上不一致，则会产生不同的哈希码。在Spring Security实现中，如果服务器生成的nonce仅过期（但摘要在其他方面有效），`DigestAuthenticationEntryPoint`将发送`"stale=true"`标头。这告诉用户代理不需要打扰用户（因为密码和用户名等是正确的），而只是使用新的nonce重试。

`DigestAuthenticationEntryPoint` `nonceValiditySeconds`参数的适当值取决于您的应用程序。极其安全的应用程序应注意，截获的身份验证标头可用于模拟主体，直到达到nonce中包含的`expirationTime`为止。这是选择适当设置时的关键原则，但对于极其安全的应用程序而言，在第一个实例中不能通过TLS / HTTPS运行是不常见的。

由于摘要式身份验证的实现更复杂，因此通常会出现用户代理问题。例如，Internet Explorer无法在同一会话中的后续请求中显示“不透明”标记。因此，Spring Security过滤器将所有状态信息封装到“随机数”令牌中。在我们的测试中，Spring Security的实现与Mozilla Firefox和Internet Explorer可靠地工作，正确处理nonce超时等。

#### [](https://www.springcloud.cc/spring-security.html#digest-config)组态

现在我们已经回顾了这个理论，让我们看看如何使用它。要实现HTTP摘要式身份验证，必须在过滤器链中定义`DigestAuthenticationFilter`。应用程序上下文需要定义`DigestAuthenticationFilter`及其所需的协作者：

<bean id="digestFilter" class=
    "org.springframework.security.web.authentication.www.DigestAuthenticationFilter">
<property name="userDetailsService" ref="jdbcDaoImpl"/>
<property name="authenticationEntryPoint" ref="digestEntryPoint"/>
<property name="userCache" ref="userCache"/>
</bean>

<bean id="digestEntryPoint" class=
    "org.springframework.security.web.authentication.www.DigestAuthenticationEntryPoint">
<property name="realmName" value="Contacts Realm via Digest Authentication"/>
<property name="key" value="acegi"/>
<property name="nonceValiditySeconds" value="10"/>
</bean>

配置的`UserDetailsService`是必需的，因为`DigestAuthenticationFilter`必须能够直接访问用户的明文密码。如果您在DAO [[15]](https://www.springcloud.cc/spring-security.html#ftn.d5e4069)中使用编码密码，则摘要式身份验证将不起作用。DAO协作者以及`UserCache`通常直接与`DaoAuthenticationProvider`共享。`authenticationEntryPoint`属性必须为`DigestAuthenticationEntryPoint`，以便`DigestAuthenticationFilter`可以获得正确的`realmName`和`key`进行摘要计算。

与`BasicAuthenticationFilter`一样，如果身份验证成功，`Authentication`请求令牌将被放入`SecurityContextHolder`。如果身份验证事件成功，或者由于HTTP标头未包含摘要式身份验证请求而未尝试身份验证，则过滤器链将正常继续。过滤器链中断的唯一时间是验证失败并调用`AuthenticationEntryPoint`，如前一段所述。

摘要式身份验证的RFC提供了一系列附加功能，可进一步提高安全性。例如，可以在每个请求上更改随机数。尽管如此，Spring Security实现的目的是最大限度地降低实现的复杂性（以及无疑会出现的用户代理不兼容性），并避免需要存储服务器端状态。如果您希望更详细地探索这些功能，请邀请您查看RFC 2617。据我们所知，Spring Security的实现确实符合本RFC的最低标准。

## [](https://www.springcloud.cc/spring-security.html#remember-me)10.5记住我的身份验证

### [](https://www.springcloud.cc/spring-security.html#remember-me-overview)10.5.1概述

记住我或持久登录认证是指web站点能够记住会话之间的主体身份。这通常通过向浏览器发送cookie来实现，在将来的会话期间检测到cookie并导致自动登录。Spring Security为这些操作提供了必要的钩子，并且有两个具体的记住我实现。一个使用散列来保护基于cookie的令牌的安全性，另一个使用数据库或其他持久存储机制来存储生成的令牌。

请注意，这两种实现都需要`UserDetailsService`。如果您使用的身份验证提供程序不使用`UserDetailsService`（例如，LDAP提供程序），那么除非您的应用程序上下文中还有一个`UserDetailsService` bean，否则它将无法运行。

### [](https://www.springcloud.cc/spring-security.html#remember-me-hash-token)10.5.2简单的基于哈希的令牌方法

这种方法使用散列来实现有用的记住策略。本质上，在成功进行交互式身份验证后，cookie将被发送到浏览器，其中cookie的组成如下：

base64(username + ":" + expirationTime + ":" +
md5Hex(username + ":" + expirationTime + ":" password + ":" + key))

username:          As identifiable to the UserDetailsService
password:          That matches the one in the retrieved UserDetails
expirationTime:    The date and time when the remember-me token expires, expressed in milliseconds
key:               A private key to prevent modification of the remember-me token

因此，remember-me令牌仅在指定的时间段内有效，并且前提是用户名，密码和密钥不会更改。值得注意的是，这具有潜在的安全性问题，因为捕获的记住我令牌将可以从任何用户代理使用，直到令牌到期为止。这与摘要式身份验证的问题相同。如果委托人知道已经捕获了令牌，他们可以轻松更改其密码并立即使所有记住我的令牌无效。如果需要更重要的安全性，则应使用下一节中描述的方法。或者，记住我的服务根本就不应该被使用。

如果您熟悉[命名空间配置](https://www.springcloud.cc/spring-security.html#ns-config "7.安全命名空间配置")一章中讨论的主题，则只需添加`<remember-me>`元素即可启用remember-me身份验证：

<http>
...
<remember-me key="myAppKey"/>
</http>

通常会自动选择`UserDetailsService`。如果您的应用程序上下文中有多个，则需要指定哪个应该与`user-service-ref`属性一起使用，其中值是`UserDetailsService` bean的名称。

### [](https://www.springcloud.cc/spring-security.html#remember-me-persistent-token)10.5.3持久令牌方法

这种方法基于文章[http://jaspan.com/improved_persistent_login_cookie_best_practice](http://jaspan.com/improved_persistent_login_cookie_best_practice)并进行了一些小的修改[[16Rewrite]](https://www.springcloud.cc/spring-security.html#ftn.d5e4112)。要在命名空间配置中使用此方法，您将提供数据源引用：

<http>
...
<remember-me data-source-ref="someDataSource"/>
</http>

数据库应包含使用以下SQL（或等效的）创建的`persistent_logins`表：

create table persistent_logins (username varchar(64) not null,
                                series varchar(64) primary key,
                                token varchar(64) not null,
                                last_used timestamp not null)

### [](https://www.springcloud.cc/spring-security.html#remember-me-impls)10.5.4记住我的接口和实现

记住我与`UsernamePasswordAuthenticationFilter`一起使用，并通过`AbstractAuthenticationProcessingFilter`超类中的钩子实现。它也在`BasicAuthenticationFilter`内使用。钩子将在适当的时间调用具体的`RememberMeServices`。界面如下所示：

Authentication autoLogin(HttpServletRequest request, HttpServletResponse response);

void loginFail(HttpServletRequest request, HttpServletResponse response);

void loginSuccess(HttpServletRequest request, HttpServletResponse response,
    Authentication successfulAuthentication);

请参考Javadoc以更全面地讨论这些方法的作用，尽管在此阶段注意`AbstractAuthenticationProcessingFilter`仅调用`loginFail()`和`loginSuccess()`方法。只要`SecurityContextHolder`不包含`Authentication`，`autoLogin()`就会调用`autoLogin()`方法。因此，该接口为基础记忆实现提供了与认证相关的事件的充分通知，并且只要候选web请求可能包含cookie并希望被记住，就委托给实现。这种设计允许任何数量的记住我实施策略。我们在上面已经看到Spring Security提供了两种实现。我们依次看看这些。

#### [](https://www.springcloud.cc/spring-security.html#tokenbasedremembermeservices)TokenBasedRememberMeServices

此实现支持[第10.5.2节“基于简单哈希的令牌方法”中](https://www.springcloud.cc/spring-security.html#remember-me-hash-token "10.5.2简单的基于哈希的令牌方法")描述的更简单的方法。`TokenBasedRememberMeServices`生成`RememberMeAuthenticationToken`，由`RememberMeAuthenticationProvider`处理。此身份验证提供程序与`TokenBasedRememberMeServices`之间共享`key`。此外，`TokenBasedRememberMeServices`需要一个UserDetailsS​​ervice，它可以从中检索用户名和密码以进行签名比较，并生成`RememberMeAuthenticationToken`以包含正确的`GrantedAuthority`。应用程序应提供某种logout命令，如果用户请求，则会使cookie无效。`TokenBasedRememberMeServices`还实现了Spring Security的`LogoutHandler`接口，因此可以与`LogoutFilter`一起使用以自动清除cookie。

应用程序上下文中启用remember-me服务所需的bean如下所示：

<bean id="rememberMeFilter" class=
"org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter">
<property name="rememberMeServices" ref="rememberMeServices"/>
<property name="authenticationManager" ref="theAuthenticationManager" />
</bean>

<bean id="rememberMeServices" class=
"org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices">
<property name="userDetailsService" ref="myUserDetailsService"/>
<property name="key" value="springRocks"/>
</bean>

<bean id="rememberMeAuthenticationProvider" class=
"org.springframework.security.authentication.RememberMeAuthenticationProvider">
<property name="key" value="springRocks"/>
</bean>

不要忘记将`RememberMeServices`实施添加到您的`UsernamePasswordAuthenticationFilter.setRememberMeServices()`媒体资源中，在`AuthenticationManager.setProviders()`列表中添加`RememberMeAuthenticationProvider`，并将`RememberMeAuthenticationFilter`添加到您的`FilterChainProxy`中（通常会在你的`UsernamePasswordAuthenticationFilter`）。

#### [](https://www.springcloud.cc/spring-security.html#persistenttokenbasedremembermeservices)对PersistentTokenBasedRememberMeServices

此类可以与`TokenBasedRememberMeServices`相同的方式使用，但它还需要配置`PersistentTokenRepository`来存储令牌。有两种标准实现。

- `InMemoryTokenRepositoryImpl`仅用于测试。
- `JdbcTokenRepositoryImpl`将令牌存储在数据库中。

上面的[第10.5.3节“持久令牌方法”中](https://www.springcloud.cc/spring-security.html#remember-me-persistent-token "10.5.3持久令牌方法")描述了数据库模式。

## [](https://www.springcloud.cc/spring-security.html#csrf)10.6跨站请求伪造（CSRF）

本节讨论Spring Security的[跨站请求伪造（CSRF）](https://en.wikipedia.org/wiki/Cross-site_request_forgery)支持。

### [](https://www.springcloud.cc/spring-security.html#csrf-attacks)10.6.1 CSRF攻击

在我们讨论Spring Security如何保护应用程序免受CSRF攻击之前，我们将解释CSRF攻击是什么。让我们看一个具体的例子来更好地理解。

假设您的银行网站提供的表单允许将当前登录用户的资金转移到另一个银行帐户。例如，HTTP请求可能如下所示：

POST /transfer HTTP/1.1
Host: bank.example.com
Cookie: JSESSIONID=randomid; Domain=bank.example.com; Secure; HttpOnly
Content-Type: application/x-www-form-urlencoded

amount=100.00&routingNumber=1234&account=9876

现在假装你在银行的网站上进行身份验证，然后在没有退出的情况下访问一个邪恶的网站。邪恶的网站包含一个HTML页面，其格式如下：

<form action="https://bank.example.com/transfer" method="post">
<input type="hidden"
    name="amount"
    value="100.00"/>
<input type="hidden"
    name="routingNumber"
    value="evilsRoutingNumber"/>
<input type="hidden"
    name="account"
    value="evilsAccountNumber"/>
<input type="submit"
    value="Win Money!"/>
</form>

你想赢钱，所以你点击提交按钮。在此过程中，您无意中将100美元转移给了恶意用户。发生这种情况是因为，虽然恶意网站无法看到您的Cookie，但与您的银行相关联的Cookie仍会随请求一起发送。

最糟糕的是，整个过程可以使用JavaScript自动完成。这意味着您甚至不需要单击按钮。那么我们如何保护自己免受此类攻击呢？

### [](https://www.springcloud.cc/spring-security.html#synchronizer-token-pattern)10.6.2同步器令牌模式

问题是来自银行网站的HTTP请求和来自邪恶网站的请求完全相同。这意味着无法拒绝来自恶意网站的请求并允许来自银行网站的请求。为了防止CSRF攻击，我们需要确保请求中存在恶意网站无法提供的内容。

一种解决方案是使用[同步器令牌模式](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#General_Recommendation:_Synchronizer_Token_Pattern)。此解决方案是为了确保每个请求除了我们的会话cookie之外还需要随机生成的令牌作为HTTP参数。提交请求时，服务器必须查找参数的预期值，并将其与请求中的实际值进行比较。如果值不匹配，请求将失败。

我们可以放松期望，只需要为每个更新状态的HTTP请求提供令牌。这可以安全地完成，因为相同的原始策略确保邪恶站点无法读取响应。此外，我们不希望在HTTP GET中包含随机令牌，因为这可能导致令牌泄露。

让我们来看看我们的例子将如何改变。假设随机生成的令牌存在于名为_csrf的HTTP参数中。例如，转账的请求如下：

POST /transfer HTTP/1.1
Host: bank.example.com
Cookie: JSESSIONID=randomid; Domain=bank.example.com; Secure; HttpOnly
Content-Type: application/x-www-form-urlencoded

amount=100.00&routingNumber=1234&account=9876&_csrf=<secure-random>

您会注意到我们添加了带有随机值的_csrf参数。现在邪恶的网站将无法猜测_csrf参数的正确值（必须在恶意网站上明确提供），并且当服务器将实际令牌与预期令牌进行比较时，传输将失败。

### [](https://www.springcloud.cc/spring-security.html#when-to-use-csrf-protection)10.6.3何时使用CSRF保护

什么时候应该使用CSRF保护？我们的建议是对普通用户可以由浏览器处理的任何请求使用CSRF保护。如果您只创建非浏览器客户端使用的服务，则可能需要禁用CSRF保护。

#### [](https://www.springcloud.cc/spring-security.html#csrf-protection-and-json)CSRF保护和JSON

一个常见的问题是“我是否需要保护javascript发出的JSON请求？” 简而言之，这取决于。但是，您必须非常小心，因为存在可能影响JSON请求的CSRF漏洞。例如，恶意用户可以[使用以下格式使用JSON](http://blog.opensecurityresearch.com/2012/02/json-csrf-with-parameter-padding.html)创建[CSRF](http://blog.opensecurityresearch.com/2012/02/json-csrf-with-parameter-padding.html)：

<form action="https://bank.example.com/transfer" method="post" enctype="text/plain">
<input name='{"amount":100,"routingNumber":"evilsRoutingNumber","account":"evilsAccountNumber", "ignore_me":"' value='test"}' type='hidden'>
<input type="submit"
    value="Win Money!"/>
</form>

这将产生以下JSON结构

{ "amount": 100,
"routingNumber": "evilsRoutingNumber",
"account": "evilsAccountNumber",
"ignore_me": "=test"
}

如果应用程序未验证Content-Type，那么它将暴露给此漏洞。根据设置，通过更新URL后缀以“.json”结尾，仍然可以利用验证Content-Type的Spring MVC应用程序，如下所示：

<form action="https://bank.example.com/transfer.json" method="post" enctype="text/plain">
<input name='{"amount":100,"routingNumber":"evilsRoutingNumber","account":"evilsAccountNumber", "ignore_me":"' value='test"}' type='hidden'>
<input type="submit"
    value="Win Money!"/>
</form>

#### [](https://www.springcloud.cc/spring-security.html#csrf-and-stateless-browser-applications)CSRF和无状态浏览器应用程序

如果我的申请是无国籍的怎么办？这并不一定意味着你受到保护。实际上，如果用户不需要在web浏览器中针对给定请求执行任何操作，则他们可能仍然容易受到CSRF攻击。

例如，假设应用程序使用包含其中所有状态的自定义cookie进行身份验证而不是JSESSIONID。当进行CSRF攻击时，自定义cookie将与请求一起发送，其方式与我们上一个示例中发送的JSESSIONID cookie相同。

使用基本身份验证的用户也容易受到CSRF攻击，因为浏览器会自动在任何请求中包含用户名密码，其方式与我们上一个示例中发送的JSESSIONID cookie相同。

### [](https://www.springcloud.cc/spring-security.html#csrf-using)10.6.4使用Spring Security CSRF保护

那么使用Spring Security保护我们网站免受CSRF攻击的必要步骤是什么？使用Spring Security CSRF保护的步骤概述如下：

- [使用正确的HTTP谓词](https://www.springcloud.cc/spring-security.html#csrf-use-proper-verbs "使用正确的HTTP谓词")
- [配置CSRF保护](https://www.springcloud.cc/spring-security.html#csrf-configure "配置CSRF保护")
- [包括CSRF令牌](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token "包括CSRF令牌")

#### [](https://www.springcloud.cc/spring-security.html#csrf-use-proper-verbs)使用正确的HTTP谓词

防止CSRF攻击的第一步是确保您的网站使用正确的HTTP谓词。具体来说，在Spring Security的CSRF支持可以使用之前，您需要确定您的应用程序正在使用PATCH，POST，PUT和/或DELETE来修改状态。

这不是Spring Security支持的限制，而是对正确的CSRF预防的一般要求。原因是在HTTP GET中包含私人信息会导致信息泄露。有关使用POST而不是GET获取敏感信息的一般指导，请参阅[RFC 2616第15.1.3节“在URI中编码](https://www.w3.org/Protocols/rfc2616/rfc2616-sec15.html#sec15.1.3)敏感信息”。

#### [](https://www.springcloud.cc/spring-security.html#csrf-configure)配置CSRF保护

下一步是在您的应用程序中包含Spring Security的CSRF保护。一些框架通过使用户的会话无效来处理无效的CSRF令牌，但这会导致[其自身的问题](https://www.springcloud.cc/spring-security.html#csrf-logout "注销")。相反，默认情况下Spring Security的CSRF保护将产生HTTP 403访问被拒绝。这可以通过配置[AccessDeniedHandler](https://www.springcloud.cc/spring-security.html#access-denied-handler "AccessDeniedHandler")以不同方式处理`InvalidCsrfTokenException`来自定义。

从Spring Security 4.0开始，默认情况下使用XML配置启用CSRF保护。如果要禁用CSRF保护，可以在下面看到相应的XML配置。

<http>
    <!-- ... -->
    <csrf disabled="true"/>
</http>

默认情况下，Java Configuration会启用CSRF保护。如果要禁用CSRF，可以在下面看到相应的Java配置。有关如何配置CSRF保护的其他自定义，请参阅csrf（）的Javadoc。

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable();
    }
}

#### [](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token)包括CSRF令牌

##### [](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token-form)表格提交

最后一步是确保在所有PATCH，POST，PUT和DELETE方法中包含CSRF令牌。解决此问题的一种方法是使用`_csrf`请求属性来获取当前`CsrfToken`。使用JSP执行此操作的示例如下所示：

<c:url var="logoutUrl" value="/logout"/>
<form action="${logoutUrl}"
    method="post">
<input type="submit"
    value="Log out" />
<input type="hidden"
    name="${_csrf.parameterName}"
    value="${_csrf.token}"/>
</form>

更简单的方法是使用Spring Security JSP标记库中[的csrfInput标记](https://www.springcloud.cc/spring-security.html#the-csrfinput-tag "13.5.5 csrfInput标记")。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|如果您使用Spring MVC `<form:form>`标签或[Thymeleaf 2.1+](http://www.thymeleaf.org/whatsnew21.html#reqdata)并使用`@EnableWebSecurity`，则会自动为您添加`CsrfToken`（使用`CsrfRequestDataValueProcessor`）。|

##### [](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token-ajax)Ajax和JSON请求

如果您使用的是JSON，则无法在HTTP参数中提交CSRF令牌。相反，您可以在HTTP标头中提交令牌。典型的模式是在元标记中包含CSRF标记。JSP的示例如下所示：

<html>
<head>
    <meta name="_csrf" content="${_csrf.token}"/>
    <!-- default header name is X-CSRF-TOKEN -->
    <meta name="_csrf_header" content="${_csrf.headerName}"/>
    <!-- ... -->
</head>
<!-- ... -->

您可以使用Spring Security JSP标记库中更简单的[csrfMetaTags标记](https://www.springcloud.cc/spring-security.html#the-csrfmetatags-tag "13.5.6 csrfMetaTags标记")，而不是手动创建元标记。

然后，您可以在所有Ajax请求中包含令牌。如果您使用的是jQuery，可以使用以下命令完成：

$(function () {
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader(header, token);
});
});

作为jQuery的替代方案，我们建议使用[cujoJS的](http://cujojs.com/) rest.js. 该[rest.js](https://github.com/cujojs/rest)模块提供了在REST风格方式的HTTP请求和响应工作先进支持。核心功能是通过将拦截器链接到客户端来根据需要对HTTP客户端添加行为进行上下文化的能力。

var client = rest.chain(csrf, {
token: $("meta[name='_csrf']").attr("content"),
name: $("meta[name='_csrf_header']").attr("content")
});

配置的客户端可以与需要向CSRF保护资源发出请求的应用程序的任何组件共享。rest.js和jQuery之间的一个显着区别是，只有使用配置的客户端发出的请求才会包含CSRF令牌，而jQuery中的_所有_请求都将包含令牌。对接收令牌的请求进行范围调整的能力有助于防止CSRF令牌泄露给第三方。有关[rest.js](https://github.com/cujojs/rest/tree/master/docs)的更多信息，请参阅[rest.js参考文档](https://github.com/cujojs/rest/tree/master/docs)。

##### [](https://www.springcloud.cc/spring-security.html#csrf-cookie)CookieCsrfTokenRepository

可能存在用户希望将`CsrfToken`保留在cookie中的情况。默认情况下，`CookieCsrfTokenRepository`将写入名为`XSRF-TOKEN`的cookie，并从名为`X-XSRF-TOKEN`的标头或HTTP参数`_csrf`中读取它。这些默认值来自[AngularJS](https://docs.angularjs.org/api/ng/service/$http#cross-site-request-forgery-xsrf-protection)

您可以使用以下命令在XML中配置`CookieCsrfTokenRepository`：

<http>
    <!-- ... -->
    <csrf token-repository-ref="tokenRepository"/>
</http>
<b:bean id="tokenRepository"
    class="org.springframework.security.web.csrf.CookieCsrfTokenRepository"
    p:cookieHttpOnly="false"/>

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|该示例明确设置`cookieHttpOnly=false`。这是允许JavaScript（即AngularJS）读取它所必需的。如果您不需要直接使用JavaScript读取cookie，建议省略`cookieHttpOnly=false`以提高安全性。|

您可以使用以下命令在Java配置中配置`CookieCsrfTokenRepository`：

_@EnableWebSecurity_
public class WebSecurityConfig extends
        WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }
}

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|该示例明确设置`cookieHttpOnly=false`。这是允许JavaScript（即AngularJS）读取它所必需的。如果您不需要直接使用JavaScript读取cookie，建议省略`cookieHttpOnly=false`（使用`new CookieCsrfTokenRepository()`代替）以提高安全性。|

### [](https://www.springcloud.cc/spring-security.html#csrf-caveats)10.6.5 CSRF警告

实施CSRF时有一些注意事项。

#### [](https://www.springcloud.cc/spring-security.html#csrf-timeouts)超时

一个问题是预期的CSRF令牌存储在HttpSession中，因此只要HttpSession到期，您配置的`AccessDeniedHandler`就会收到InvalidCsrfTokenException。如果您使用默认的`AccessDeniedHandler`，浏览器将获得HTTP 403并显示错误的错误消息。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|有人可能会问为什么预期的`CsrfToken`默认情况下不存储在cookie中。这是因为已知的漏洞可以由另一个域设置标头（即指定cookie）。这就是[当存在标题X-Requested-With时，](http://weblog.rubyonrails.org/2011/2/8/csrf-protection-bypass-in-ruby-on-rails/) Ruby on Rails [不再跳过CSRF检查的](http://weblog.rubyonrails.org/2011/2/8/csrf-protection-bypass-in-ruby-on-rails/)原因。有关如何执行漏洞利用的详细信息，请参阅[此webappsec.org线程](http://lists.webappsec.org/pipermail/websecurity_lists.webappsec.org/2011-February/007533.html)。另一个缺点是，通过删除状态（即超时），如果令牌被破坏，您将失去强制终止令牌的能力。|

缓解活动用户遇到超时的一种简单方法是使用一些JavaScript让用户知道他们的会话即将过期。用户可以单击按钮继续并刷新会话。

或者，指定自定义`AccessDeniedHandler`可让您以任何方式处理`InvalidCsrfTokenException`。有关如何自定义`AccessDeniedHandler`的示例，请参阅[xml](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler "<禁止访问的处理程序>")和[Java配置](https://github.com/spring-projects/spring-security/blob/3.2.0.RC1/config/src/test/groovy/org/springframework/security/config/annotation/web/configurers/NamespaceHttpAccessDeniedHandlerTests.groovy#L64)的提供链接。

最后，可以将应用程序配置为使用不会过期的[CookieCsrfTokenRepository](https://www.springcloud.cc/spring-security.html#csrf-cookie "CookieCsrfTokenRepository")。如前所述，这不如使用会话安全，但在许多情况下可以足够好。

#### [](https://www.springcloud.cc/spring-security.html#csrf-login)在登录

为了防止[伪造登录请求](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Forging_login_requests)，还应该保护登录表单免受CSRF攻击。由于`CsrfToken`存储在HttpSession中，这意味着只要访问`CsrfToken`令牌属性就会创建HttpSession。虽然这在RESTful /无状态架构中听起来很糟糕但实际情况是状态是实现实际安全性所必需的。没有状态，如果令牌被泄露，我们无能为力。实际上，CSRF令牌的规模非常小，对我们的架构的影响可以忽略不计。

保护登录表单的常用技术是使用JavaScript函数在表单提交之前获取有效的CSRF令牌。通过执行此操作，无需考虑会话超时（在上一节中讨论），因为会话是在表单提交之前创建的（假设未配置[CookieCsrfTokenRepository](https://www.springcloud.cc/spring-security.html#csrf-cookie "CookieCsrfTokenRepository")），因此用户可以保留在登录页面上并在需要时提交用户名/密码。为了实现这一点，您可以利用Spring Security提供的`CsrfTokenArgumentResolver`并公开[此处](https://www.springcloud.cc/spring-security.html#mvc-csrf-resolver "解决CsrfToken")描述的端点。

#### [](https://www.springcloud.cc/spring-security.html#csrf-logout)注销

添加CSRF会将LogoutFilter更新为仅使用HTTP POST。这可确保注销需要CSRF令牌，并且恶意用户无法强制注销您的用户。

一种方法是使用表单进行注销。如果您真的想要一个链接，您可以使用JavaScript让链接执行POST（即可能在隐藏的表单上）。对于禁用了JavaScript的浏览器，您可以选择让链接将用户带到将执行POST的注销确认页面。

如果你真的想在退出时使用HTTP GET，你可以这样做，但是请记住这通常不推荐。例如，以下Java配置将执行注销，并使用任何HTTP方法请求URL / logout：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
    }
}

#### [](https://www.springcloud.cc/spring-security.html#csrf-multipart)Multipart（文件上传）

将CSRF保护与multipart / form-data一起使用有两种选择。每个选项都有其权衡。

- [在Spring Security之前放置MultipartFilter](https://www.springcloud.cc/spring-security.html#csrf-multipartfilter "在Spring Security之前放置MultipartFilter")
- [包含CSRF令牌](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token-in-action "包含CSRF令牌")

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|在将Spring Security的CSRF保护与多部分文件上载集成之前，请确保您可以在没有CSRF保护的情况下进行上载。有关使用Spring的多部分表单的更多信息可以在Spring引用和[MultipartFilter javadoc](https://docs.spring.io/spring/docs/3.2.x/javadoc-api/org/springframework/web/multipart/support/MultipartFilter.html)的[17.10 Spring的多部分（文件上载）支持](https://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-multipart)部分中找到。[](https://docs.spring.io/spring/docs/3.2.x/javadoc-api/org/springframework/web/multipart/support/MultipartFilter.html)|

##### [](https://www.springcloud.cc/spring-security.html#csrf-multipartfilter)在Spring Security之前放置MultipartFilter

第一个选项是确保在Spring Security过滤器之前指定`MultipartFilter`。在Spring Security过滤器之前指定`MultipartFilter`意味着没有授权调用`MultipartFilter`，这意味着任何人都可以在您的服务器上放置临时文件。但是，只有授权用户才能提交由您的应用程序处理的文件。通常，这是推荐的方法，因为临时文件上载应该对大多数服务器产生可忽略的影响。

为了确保在使用java配置的Spring Security过滤器之前指定`MultipartFilter`，用户可以覆盖beforeSpringSecurityFilterChain，如下所示：

public class SecurityApplicationInitializer extends AbstractSecurityWebApplicationInitializer {

    _@Override_
    protected void beforeSpringSecurityFilterChain(ServletContext servletContext) {
        insertFilters(servletContext, new MultipartFilter());
    }
}

为确保在使用XML配置的Spring Security过滤器之前指定`MultipartFilter`，用户可以确保`MultipartFilter`的<filter-mapping>元素放在web。xml中的springSecurityFilterChain之前，如图所示下面：

<filter>
    <filter-name>MultipartFilter</filter-name>
    <filter-class>org.springframework.web.multipart.support.MultipartFilter</filter-class>
</filter>
<filter>
    <filter-name>springSecurityFilterChain</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>
<filter-mapping>
    <filter-name>MultipartFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>springSecurityFilterChain</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

##### [](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token-in-action)包含CSRF令牌

如果允许未经授权的用户上传临时文件是不可接受的，另一种方法是在Spring Security过滤器之后放置`MultipartFilter`并将CSRF作为查询参数包含在表单的action属性中。jsp的示例如下所示

<form action="./upload?${_csrf.parameterName}=${_csrf.token}" method="post" enctype="multipart/form-data">

这种方法的缺点是可能泄漏查询参数。更常见的是，将敏感数据放入正文或标题中以确保其不会泄露被认为是最佳做法。其他信息可以在[RFC 2616第15.1.3节“在URI中编码敏感信息”中找到](https://www.w3.org/Protocols/rfc2616/rfc2616-sec15.html#sec15.1.3)。

#### [](https://www.springcloud.cc/spring-security.html#hiddenhttpmethodfilter)HiddenHttpMethodFilter

HiddenHttpMethodFilter应放在Spring Security过滤器之前。一般来说，这是事实，但在防范CSRF攻击时可能会产生额外的影响。

请注意，HiddenHttpMethodFilter仅覆盖POST上的HTTP方法，因此实际上不太可能导致任何实际问题。但是，最佳做法仍然是确保它放在Spring Security过滤器之前。

### [](https://www.springcloud.cc/spring-security.html#overriding-defaults)10.6.6覆盖默认值

Spring Security的目标是提供保护用户免受攻击的默认设置。这并不意味着您被迫接受所有默认值。

例如，您可以提供自定义CsrfTokenRepository来覆盖`CsrfToken`的存储方式。

您还可以指定自定义RequestMatcher来确定哪些请求受CSRF保护（即，您可能不关心是否利用了注销）。简而言之，如果Spring Security的CSRF保护行为不完全符合您的要求，您就可以自定义行为。参考[the section called “<csrf>”](https://www.springcloud.cc/spring-security.html#nsa-csrf "<csrf>") 有关如何使用XML进行这些自定义的详细信息的文档，以及有关如何在使用Java配置时进行这些自定义的详细信息的`CsrfConfigurer` javadoc。

## [](https://www.springcloud.cc/spring-security.html#cors)10.7 CORS

Spring Framework [为CORS](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-cors)提供[一流的支持](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-cors)。CORS必须在Spring Security之前处理，因为飞行前请求不包含任何cookie（即`JSESSIONID`）。如果请求不包含任何cookie并且Spring Security是第一个，则该请求将确定用户未经过身份验证（因为请求中没有cookie）并拒绝它。

确保首先处理CORS的最简单方法是使用`CorsFilter`。用户可以使用以下内容提供`CorsConfigurationSource`，将`CorsFilter`与Spring Security集成：

_@EnableWebSecurity_
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            // by default uses a Bean by the name of corsConfigurationSource
            .cors().and()
            ...
    }

    _@Bean_
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://example.com"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

或者用XML

<http>
    <cors configuration-source-ref="corsSource"/>
    ...
</http>
<b:bean id="corsSource" class="org.springframework.web.cors.UrlBasedCorsConfigurationSource">
    ...
</b:bean>

如果您使用Spring MVC的CORS支持，则可以省略指定`CorsConfigurationSource`和Spring Security将利用提供给Spring MVC的CORS配置。

_@EnableWebSecurity_
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            // if Spring MVC is on classpath and no CorsConfigurationSource is provided,
            // Spring Security will use CORS configuration provided to Spring MVC
            .cors().and()
            ...
    }
}

或者用XML

<http>
    <!-- Default to Spring MVC's CORS configuration -->
    <cors />
    ...
</http>

## [](https://www.springcloud.cc/spring-security.html#headers)10.8安全HTTP响应标头

本节讨论Spring Security对向响应添加各种安全标头的支持。

### [](https://www.springcloud.cc/spring-security.html#default-security-headers)10.8.1默认安全标头

Spring Security允许用户轻松注入默认安全标头以帮助保护其应用程序。Spring Security的默认值包括以下标头：

Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000 ; includeSubDomains
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|仅在HTTPS请求中添加严格传输安全性|

有关每个标头的其他详细信息，请参阅相应的部分：

- [缓存控制](https://www.springcloud.cc/spring-security.html#headers-cache-control "缓存控制")
- [内容类型选项](https://www.springcloud.cc/spring-security.html#headers-content-type-options "内容类型选项")
- [HTTP严格传输安全性](https://www.springcloud.cc/spring-security.html#headers-hsts "HTTP严格传输安全（HSTS）")
- [X-框架，选项](https://www.springcloud.cc/spring-security.html#headers-frame-options "X-框架，选项")
- [X-XSS-保护](https://www.springcloud.cc/spring-security.html#headers-xss-protection "X-XSS-保护")

虽然这些标头中的每一个都被认为是最佳实践，但应注意并非所有客户端都使用标头，因此鼓励进行额外的测试。

您可以自定义特定标头。例如，假设您希望HTTP响应标头如下所示：

Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block

具体来说，您希望所有默认标头都具有以下自定义项：

- [X-Frame-Options](https://www.springcloud.cc/spring-security.html#headers-frame-options "X-框架，选项")允许来自同一域的任何请求
- [HTTP严格传输安全性（HSTS）](https://www.springcloud.cc/spring-security.html#headers-hsts "HTTP严格传输安全（HSTS）")不会添加到响应中

您可以使用以下Java配置轻松完成此操作：

_@EnableWebSecurity_
public class WebSecurityConfig extends
        WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            // ...
            .headers()
                .frameOptions().sameOrigin()
                .httpStrictTransportSecurity().disable();
    }
}

或者，如果您使用的是Spring Security XML配置，则可以使用以下命令：

<http>
    <!-- ... -->

    <headers>
        <frame-options policy="SAMEORIGIN" />
        <hsts disable="true"/>
    </headers>
</http>

如果您不希望添加默认值并希望明确控制应使用的内容，则可以禁用默认值。下面提供了基于Java和XML的配置的示例：

如果您使用的是Spring Security的Java配置，则以下内容仅添加[缓存控制](https://www.springcloud.cc/spring-security.html#headers-cache-control "缓存控制")。

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        // do not use any default headers unless explicitly listed
        .defaultsDisabled()
        .cacheControl();
}
}

以下XML仅添加[缓存控制](https://www.springcloud.cc/spring-security.html#headers-cache-control "缓存控制")。

<http>
    <!-- ... -->

    <headers defaults-disabled="true">
        <cache-control/>
    </headers>
</http>

如有必要，您可以使用以下Java配置禁用所有HTTP安全响应标头：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers().disable();
}
}

如有必要，您可以使用以下XML配置禁用所有HTTP安全响应标头：

<http>
    <!-- ... -->

    <headers disabled="true" />
</http>

#### [](https://www.springcloud.cc/spring-security.html#headers-cache-control)缓存控制

过去Spring Security要求您为web应用程序提供自己的缓存控制。这在当时似乎是合理的，但浏览器缓存已经发展为包括用于安全连接的缓存。这意味着用户可以查看经过身份验证的页面，注销，然后恶意用户可以使用浏览器历史记录来查看缓存页面。为了帮助缓解这种情况，Spring Security添加了缓存控制支持，它将在您的响应中插入以下标头。

Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0

简单地添加没有子元素的[<headers](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>") >元素将自动添加Cache Control和其他一些保护。但是，如果您只想要缓存控制，则可以使用Spring Security的XML命名空间和[<cache-control](https://www.springcloud.cc/spring-security.html#nsa-cache-control "<缓存控制>") >元素以及[headers @ defaults-disabled](https://www.springcloud.cc/spring-security.html#nsa-headers-defaults-disabled)属性启用此功能。

<http>
    <!-- ... -->

    <headers defaults-disable="true">
        <cache-control />
    </headers>
</http>

同样，您可以使用以下命令在Java配置中仅启用缓存控制：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .defaultsDisabled()
        .cacheControl();
}
}

如果您确实想要缓存特定响应，那么您的应用程序可以有选择地调用[HttpServletResponse.setHeader（String，String）](https://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletResponse.html#setHeader(java.lang.String,java.lang.String))来覆盖由Spring Security设置的标头。这有助于确保正确缓存CSS，JavaScript和图像等内容。

使用Spring Web MVC时，通常在您的配置中完成。例如，以下配置将确保为所有资源设置缓存标头：

_@EnableWebMvc_
public class WebMvcConfiguration implements WebMvcConfigurer {

    _@Override_
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/resources/**")
            .addResourceLocations("/resources/")
            .setCachePeriod(31556926);
    }

    // ...
}

#### [](https://www.springcloud.cc/spring-security.html#headers-content-type-options)内容类型选项

历史上，浏览器（包括Internet Explorer）会尝试使用[内容嗅探](https://en.wikipedia.org/wiki/Content_sniffing)来猜测请求的内容类型。这允许浏览器通过猜测未指定内容类型的资源上的内容类型来改善用户体验。例如，如果浏览器遇到未指定内容类型的JavaScript文件，则可以猜测内容类型然后执行它。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|在允许上传内容时，还应该做许多其他事情（即仅在不同的域中显示文档，确保设置Content-Type标题，清理文档等）。但是，这些措施超出了Spring Security提供的范围。指出禁用内容嗅探时，必须指定内容类型以使事情正常工作，这一点也很重要。|

内容嗅探的问题在于，这允许恶意用户使用多字符（即，作为多种内容类型有效的文件）来执行XSS攻击。例如，某些站点可能允许用户向网站提交有效的postscript文档并进行查看。恶意用户可能会创建一个[postscript文档，该文档也是一个有效的JavaScript文件，](http://webblaze.cs.berkeley.edu/papers/barth-caballero-song.pdf)并使用它执行XSS攻击。

可以通过在响应中添加以下标头来禁用内容嗅探：

X-Content-Type-Options: nosniff

与缓存控制元素一样，在使用没有子元素的<headers>元素时，默认情况下会添加nosniff指令。但是，如果您想要更多地控制添加哪些标头，可以使用[<content-type-options](https://www.springcloud.cc/spring-security.html#nsa-content-type-options "<内容类型选项>") >元素和[headers @ defaults-disabled](https://www.springcloud.cc/spring-security.html#nsa-headers-defaults-disabled)属性，如下所示：

<http>
    <!-- ... -->

    <headers defaults-disabled="true">
        <content-type-options />
    </headers>
</http>

默认情况下，使用Spring Security Java配置添加X-Content-Type-Options标头。如果您想要更多地控制标题，可以使用以下内容显式指定内容类型选项：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .defaultsDisabled()
        .contentTypeOptions();
}
}

#### [](https://www.springcloud.cc/spring-security.html#headers-hsts)HTTP严格传输安全（HSTS）

当您在银行的网站上输入内容时，是否输入mybank.example.com或输入[https://mybank.example.com](https://mybank.example.com/)？如果省略https协议，则可能容易受到[中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)。即使网站执行重定向到[https://mybank.example.com](https://mybank.example.com/)，恶意用户也可以拦截初始HTTP请求并操纵响应（即重定向到[https://mibank.example.com](https://mibank.example.com/)并窃取其凭据）。

许多用户省略了https协议，这就是创建[HTTP严格传输安全（HSTS）的](https://tools.ietf.org/html/rfc6797)原因。将mybank.example.com添加为[HSTS主机后](https://tools.ietf.org/html/rfc6797#section-5.1)，浏览器可以提前知道对mybank.example.com的任何请求都应解释为[https://mybank.example.com](https://mybank.example.com/)。这大大降低了中间人攻击发生的可能性。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|根据[RFC6797](https://tools.ietf.org/html/rfc6797#section-7.2)，HSTS标头仅注入HTTPS响应。为了使浏览器确认标头，浏览器必须首先信任签署用于建立连接的SSL证书的CA（而不仅仅是SSL证书）。|

将站点标记为HSTS主机的一种方法是将主机预加载到浏览器中。另一种方法是在响应中添加“Strict-Transport-Security”标头。例如，以下内容将指示浏览器将域视为一年的HSTS主机（一年中大约有31536000秒）：

Strict-Transport-Security: max-age=31536000 ; includeSubDomains

可选的includeSubDomains指令指示Spring Security子域（即secure.mybank.example.com）也应被视为HSTS域。

与其他标头一样，Spring Security默认添加HSTS。您可以使用[<hsts](https://www.springcloud.cc/spring-security.html#nsa-hsts "<HSTS>") >元素自定义HSTS标头，如下所示：

<http>
    <!-- ... -->

    <headers>
        <hsts
            include-subdomains="true"
            max-age-seconds="31536000" />
    </headers>
</http>

同样，您只能通过Java配置启用HSTS标头：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .httpStrictTransportSecurity()
            .includeSubdomains(true)
            .maxAgeSeconds(31536000);
}
}

#### [](https://www.springcloud.cc/spring-security.html#headers-hpkp)HTTP公钥固定（HPKP）

HTTP公钥锁定（HPKP）是一种安全功能，它告诉web客户端将特定加密公钥与某个web服务器相关联，以防止伪造证书的中间人（MITM）攻击。

为了确保TLS会话中使用的服务器公钥的真实性，此公钥将包装到X.509证书中，该证书通常由证书颁发机构（CA）签名。诸如浏览器之类的Web客户端信任许多这些CA，它们都可以为任意域名创建证书。如果攻击者能够破坏单个CA，则他们可以对各种TLS连接执行MITM攻击。HPKP可以通过告诉客户端哪个公钥属于某个web服务器来规避HTTPS协议的这种威胁。HPKP是首次使用信任（TOFU）技术。web服务器第一次通过特殊的HTTP头告诉客户端哪些公钥属于它，客户端会在给定的时间段内存储此信息。当客户端再次访问服务器时，它需要一个包含公钥的证书，该公钥的指纹已通过HPKP获知。如果服务器提供未知的公钥，则客户端应向用户发出警告。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|由于用户代理需要针对SSL证书链验证引脚，因此HPKP标头仅注入HTTPS响应。|

为您的站点启用此功能非常简单，只需在通过HTTPS访问站点时返回Public-Key-Pins HTTP标头即可。例如，以下内容将指示用户代理仅针对2个引脚向给定URI（通过[**_report-uri_**](https://tools.ietf.org/html/rfc7469#section-2.1.4)指令）报告引脚验证失败：

Public-Key-Pins-Report-Only: max-age=5184000 ; pin-sha256="d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM=" ; pin-sha256="E9CZ9INDbd+2eRQozYqqbQ2yXLVKB9+xcprMF+44U1g=" ; report-uri="http://example.net/pkp-report" ; includeSubDomains

甲[**_销验证失败报告_**](https://tools.ietf.org/html/rfc7469#section-3)是一个标准的JSON结构可被捕获或者由web应用程序自己的API或通过公托管HPKP报告服务，诸如，[**_REPORT-URI_**](https://report-uri.io/)。

可选的includeSubDomains指令指示浏览器还使用给定的引脚验证子域。

与其他标题相反，Spring Security默认情况下不添加HPKP。您可以使用[<hpkp](https://www.springcloud.cc/spring-security.html#nsa-hpkp "<hpkp>") >元素自定义HPKP标头，如下所示：

<http>
    <!-- ... -->

    <headers>
        <hpkp
            include-subdomains="true"
            report-uri="http://example.net/pkp-report">
            <pins>
                    <pin algorithm="sha256">d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM=</pin>
                    <pin algorithm="sha256">E9CZ9INDbd+2eRQozYqqbQ2yXLVKB9+xcprMF+44U1g=</pin>
            </pins>
        </hpkp>
    </headers>
</http>

同样，您可以使用Java配置启用HPKP标头：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

        _@Override_
        protected void configure(HttpSecurity http) throws Exception {
                http
                // ...
                .headers()
                        .httpPublicKeyPinning()
                                .includeSubdomains(true)
                                .reportUri("http://example.net/pkp-report")
                                .addSha256Pins("d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM=", "E9CZ9INDbd+2eRQozYqqbQ2yXLVKB9+xcprMF+44U1g=";
        }
}

#### [](https://www.springcloud.cc/spring-security.html#headers-frame-options)X-框架，选项

允许将您的网站添加到框架可能是一个安全问题。例如，使用聪明的CSS样式用户可能会被欺骗点击他们不想要的东西（[视频演示](https://www.youtube.com/watch?v=3mk0RySeNsU)）。例如，登录到其银行的用户可能会单击授予其他用户访问权限的按钮。这种攻击称为[Clickjacking](https://en.wikipedia.org/wiki/Clickjacking)。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|另一种处理点击劫持的现代方法是使用[“内容安全策略（CSP）”一节](https://www.springcloud.cc/spring-security.html#headers-csp "内容安全政策（CSP）")。|

有许多方法可以缓解点击劫持攻击。例如，为了保护旧版浏览器免受点击劫持攻击，您可以使用[破帧代码](https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Best-for-now_Legacy_Browser_Frame_Breaking_Script)。虽然不完美，但破帧代码是您可以为旧版浏览器做的最好的代码。

解决点击劫持的更现代的方法是使用[X-Frame-Options](https://developer.mozilla.org/en-US/docs/HTTP/X-Frame-Options)标头：

X-Frame-Options: DENY

X-Frame-Options响应头指示浏览器阻止响应中具有此标头的任何站点在帧内呈现。默认情况下，Spring Security禁用iframe中的呈现。

您可以使用[frame-options](https://www.springcloud.cc/spring-security.html#nsa-frame-options "<帧选项>")元素自定义X-Frame-Options 。例如，以下内容将指示Spring Security使用“X-Frame-Options：SAMEORIGIN”，它允许同一域内的iframe：

<http>
    <!-- ... -->

    <headers>
        <frame-options
        policy="SAMEORIGIN" />
    </headers>
</http>

同样，您可以使用以下内容自定义框架选项以在Java配置中使用相同的源：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .frameOptions()
            .sameOrigin();
}
}

#### [](https://www.springcloud.cc/spring-security.html#headers-xss-protection)X-XSS-保护

一些浏览器内置支持过滤掉[反射的XSS攻击](https://www.owasp.org/index.php/Testing_for_Reflected_Cross_site_scripting_(OWASP-DV-001))。这绝不是万无一失的，但确实有助于XSS保护。

默认情况下，通常会启用过滤，因此添加标头通常只会确保它已启用，并指示浏览器在检测到XSS攻击时要执行的操作。例如，过滤器可能会尝试以最少侵入性的方式更改内容以仍然呈现所有内容。有时，这种类型的替换[本身](https://hackademix.net/2009/11/21/ies-xss-filter-creates-xss-vulnerabilities/)可能成为[XSS漏洞](https://hackademix.net/2009/11/21/ies-xss-filter-creates-xss-vulnerabilities/)。相反，最好阻止内容而不是尝试修复它。为此，我们可以添加以下标头：

X-XSS-Protection: 1; mode=block

默认情况下包含此标头。但是，如果需要，我们可以自定义它。例如：

<http>
    <!-- ... -->

    <headers>
        <xss-protection block="false"/>
    </headers>
</http>

同样，您可以使用以下命令在Java Configuration中自定义XSS保护：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .xssProtection()
            .block(false);
}
}

#### [](https://www.springcloud.cc/spring-security.html#headers-csp)内容安全政策（CSP）

[内容安全策略（CSP）](https://www.w3.org/TR/CSP2/)是web应用程序可以利用的机制，用于缓解内容注入漏洞，例如跨站点脚本（XSS）。CSP是一种声明性策略，为web应用程序作者提供了一种工具，用于声明并最终通知客户端（用户代理）有关web应用程序期望加载资源的源。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|内容安全策略不是为了解决所有内容注入漏洞。相反，可以利用CSP来帮助减少内容注入攻击造成的伤害。作为第一道防线，web应用程序作者应验证其输入并对其输出进行编码。|

web应用程序可以通过在响应中包含以下HTTP标头之一来使用CSP：

- **_内容安全，策略_**
- **_内容安全，策略报告，只有_**

这些标头中的每一个都用作向客户端提供**_安全策略_**的机制。安全策略包含一组**_安全策略指令_**（例如，_script-src_和_object-src_），每个**_指令_**负责声明对特定资源表示的限制。

例如，web应用程序可以声明它希望通过在响应中包含以下标头来加载来自特定可信源的脚本：

Content-Security-Policy: script-src https://trustedscripts.example.com

尝试从除_script-src_指令中声明的内容之外的其他源加载脚本将被用户代理阻止。此外，如果在安全策略中声明了[**_report-uri_**](https://www.w3.org/TR/CSP2/#directive-report-uri)指令，则用户代理会将违规报告给声明的URL。

例如，如果web应用程序违反了声明的安全策略，则以下响应标头将指示用户代理将违规报告发送到策略的_report-uri_指令中指定的URL 。

Content-Security-Policy: script-src https://trustedscripts.example.com; report-uri /csp-report-endpoint/

[**_违规报告_**](https://www.w3.org/TR/CSP2/#violation-reports)是标准的JSON结构，可以由web应用程序自己的API或公共托管的CSP违规报告服务（如 [**_REPORT-URI）_**](https://report-uri.io/)捕获。

在**_内容安全，策略报告，仅_**头部为web应用程序的作者和管理员监控安全策略，而不是强制他们的能力。此标头通常在试验和/或开发站点的安全策略时使用。当策略被认为有效时，可以通过使用_Content-Security-Policy_头字段来强制执行该_策略_。

给定以下响应头，策略声明可以从两个可能的源之一加载脚本。

Content-Security-Policy-Report-Only: script-src 'self' https://trustedscripts.example.com; report-uri /csp-report-endpoint/

如果站点违反此策略，则尝试从_evil.com_加载脚本时，用户代理将向_report-uri_指令指定的声明URL发送违规报告，但仍然允许加载违规资源。

##### [](https://www.springcloud.cc/spring-security.html#headers-csp-configure)配置内容安全策略

请注意，Spring Security 默认情况下**_不会添加_**内容安全策略。web应用程序作者必须声明安全策略以强制和/或监视受保护资源。

例如，给定以下安全策略：

script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/

您可以使用带有[<content-security-policy](https://www.springcloud.cc/spring-security.html#nsa-content-security-policy "<内容的安全性的策略>") >元素的XML配置启用CSP标头，如下所示：

<http>
    <!-- ... -->

    <headers>
        <content-security-policy
            policy-directives="script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/" />
    </headers>
</http>

要启用CSP _“仅报告”_标头，请按如下方式配置元素：

<http>
    <!-- ... -->

    <headers>
        <content-security-policy
            policy-directives="script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/"
            report-only="true" />
    </headers>
</http>

同样，您可以使用Java配置启用CSP标头，如下所示：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .contentSecurityPolicy("script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/");
}
}

要启用CSP的_“仅报告”_标头，请提供以下Java配置：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .contentSecurityPolicy("script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/")
        .reportOnly();
}
}

##### [](https://www.springcloud.cc/spring-security.html#headers-csp-links)其他资源

将内容安全策略应用于web应用程序通常是一件非常重要的事情。以下资源可为您的站点制定有效的安全策略提供进一步的帮助。

[内容安全策略简介](https://www.html5rocks.com/en/tutorials/security/content-security-policy/)

[CSP指南 - Mozilla开发人员网络](https://developer.mozilla.org/en-US/docs/Web/Security/CSP)

[W3C候选人推荐](https://www.w3.org/TR/CSP2/)

#### [](https://www.springcloud.cc/spring-security.html#headers-referrer)推荐人政策

[引用者策略](https://www.w3.org/TR/referrer-policy)是web应用程序可以利用来管理引用者字段的机制，该字段包含用户所在的最后一页。

Spring Security的方法是使用[Referrer Policy](https://www.w3.org/TR/referrer-policy/)标头，它提供不同的[策略](https://www.w3.org/TR/referrer-policy/#referrer-policies)：

Referrer-Policy: same-origin

Referrer-Policy响应标头指示浏览器让目标知道用户之前的源。

##### [](https://www.springcloud.cc/spring-security.html#headers-referrer-configure)配置推荐人策略

Spring Security 默认情况下**_不会添加_** Referrer Policy标头。

您可以使用带有[<referrer-policy](https://www.springcloud.cc/spring-security.html#nsa-referrer-policy "<引荐政策>") >元素的XML配置启用Referrer-Policy标头，如下所示：

<http>
    <!-- ... -->

    <headers>
        <referrer-policy policy="same-origin" />
    </headers>
</http>

同样，您可以使用Java配置启用Referrer Policy标头，如下所示：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .referrerPolicy(ReferrerPolicy.SAME_ORIGIN);
}
}

#### [](https://www.springcloud.cc/spring-security.html#headers-feature)功能政策

[功能策略](https://wicg.github.io/feature-policy/)是一种允许web开发人员有选择地启用，禁用和修改浏览器中某些API和web功能的行为的机制。

Feature-Policy: geolocation 'self'

借助功能策略，开发人员可以选择加入一组“策略”，以便浏览器强制执行您网站中使用的特定功能。这些策略限制站点可以访问的API或修改浏览器对某些功能的默认行为。

##### [](https://www.springcloud.cc/spring-security.html#headers-feature-configure)配置功能策略

Spring Security 默认情况下**_不添加_**功能策略标头。

您可以使用带有[<feature-policy](https://www.springcloud.cc/spring-security.html#nsa-feature-policy "<功能政策>") >元素的XML配置启用Feature-Policy标头，如下所示：

<http>
    <!-- ... -->

    <headers>
        <feature-policy policy-directives="geolocation 'self'" />
    </headers>
</http>

同样，您可以使用Java配置启用功能策略标头，如下所示：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .featurePolicy("geolocation 'self'");
}
}

### [](https://www.springcloud.cc/spring-security.html#headers-custom)10.8.2自定义标题

Spring Security具有一些机制，可以方便地将更常见的安全标头添加到您的应用程序中。但是，它还提供了挂钩以启用添加自定义标头。

#### [](https://www.springcloud.cc/spring-security.html#headers-static)静态标题

有时您可能希望将自定义安全标头注入到您的应用程序中，并且不支持开箱即用。例如，给定以下自定义安全标头：

X-Custom-Security-Header: header-value

使用XML命名空间时，可以使用[<header](https://www.springcloud.cc/spring-security.html#nsa-header "<头>") >元素将这些标头添加到响应中，如下所示：

<http>
    <!-- ... -->

    <headers>
        <header name="X-Custom-Security-Header" value="header-value"/>
    </headers>
</http>

同样，可以使用Java Configuration将标头添加到响应中，如下所示：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .addHeaderWriter(new StaticHeadersWriter("X-Custom-Security-Header","header-value"));
}
}

#### [](https://www.springcloud.cc/spring-security.html#headers-writer)标题作家

当命名空间或Java配置不支持所需的标头时，您可以创建自定义`HeadersWriter`实例，甚至可以提供`HeadersWriter`的自定义实现。

让我们看一下使用`XFrameOptionsHeaderWriter`的自定义实例的示例。也许您希望允许为同一来源构建内容。通过将[policy](https://www.springcloud.cc/spring-security.html#nsa-frame-options-policy)属性设置为“SAMEORIGIN” 可以轻松支持这一点，但让我们看一下使用[ref](https://www.springcloud.cc/spring-security.html#nsa-header-ref)属性的更明确的示例。

<http>
    <!-- ... -->

    <headers>
        <header ref="frameOptionsWriter"/>
    </headers>
</http>
<!-- Requires the c-namespace.
See http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#beans-c-namespace
-->
<beans:bean id="frameOptionsWriter"
    class="org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter"
    c:frameOptionsMode="SAMEORIGIN"/>

我们还可以使用Java配置将内容框架限制为相同的来源：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    http
    // ...
    .headers()
        .addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsMode.SAMEORIGIN));
}
}

#### [](https://www.springcloud.cc/spring-security.html#headers-delegatingrequestmatcherheaderwriter)DelegatingRequestMatcherHeaderWriter

有时您可能只想为某些请求编写标头。例如，您可能只希望保护您的登录页面不受框架限制。您可以使用`DelegatingRequestMatcherHeaderWriter`来执行此操作。使用XML命名空间配置时，可以使用以下命令完成此操作：

<http>
    <!-- ... -->

    <headers>
        <frame-options disabled="true"/>
        <header ref="headerWriter"/>
    </headers>
</http>

<beans:bean id="headerWriter"
    class="org.springframework.security.web.header.writers.DelegatingRequestMatcherHeaderWriter">
    <beans:constructor-arg>
        <bean class="org.springframework.security.web.util.matcher.AntPathRequestMatcher"
            c:pattern="/login"/>
    </beans:constructor-arg>
    <beans:constructor-arg>
        <beans:bean
            class="org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter"/>
    </beans:constructor-arg>
</beans:bean>

我们还可以使用java配置阻止将内容框架到登录页面：

_@EnableWebSecurity_
public class WebSecurityConfig extends
WebSecurityConfigurerAdapter {

_@Override_
protected void configure(HttpSecurity http) throws Exception {
    RequestMatcher matcher = new AntPathRequestMatcher("/login");
    DelegatingRequestMatcherHeaderWriter headerWriter =
        new DelegatingRequestMatcherHeaderWriter(matcher,new XFrameOptionsHeaderWriter());
    http
    // ...
    .headers()
        .frameOptions().disabled()
        .addHeaderWriter(headerWriter);
}
}

## [](https://www.springcloud.cc/spring-security.html#session-mgmt)10.9会话管理

与HTTP会话相关的功能由过滤器委托的`SessionManagementFilter`和`SessionAuthenticationStrategy`接口的组合处理。典型用法包括会话固定保护攻击防范，会话超时检测以及经过身份验证的用户可能同时打开的会话数限制。

### [](https://www.springcloud.cc/spring-security.html#sessionmanagementfilter)10.9.1 SessionManagementFilter

`SessionManagementFilter`检查`SecurityContextRepository`的内容与`SecurityContextHolder`的当前内容，以确定用户是否在当前请求期间已经过身份验证，通常是通过非交互式身份验证机制，例如认证或记住我[[17]](https://www.springcloud.cc/spring-security.html#ftn.d5e4709)。如果存储库包含安全上下文，则过滤器不执行任何操作。如果没有，并且线程局部`SecurityContext`包含（非匿名）`Authentication`对象，则过滤器假定它们已由堆栈中的先前过滤器进行了身份验证。然后它将调用配置的`SessionAuthenticationStrategy`。

如果用户当前未经过身份验证，则过滤器将检查是否已请求无效会话ID（例如，由于超时），并将调用已配置的`InvalidSessionStrategy`（如果已设置）。最常见的行为是重定向到固定的URL，这封装在标准实现`SimpleRedirectInvalidSessionStrategy`中。[如前所述](https://www.springcloud.cc/spring-security.html#ns-session-mgmt "7.3.3会话管理")，[在](https://www.springcloud.cc/spring-security.html#ns-session-mgmt "7.3.3 Session Management")通过命名空间配置无效会话URL时也会使用后者。

### [](https://www.springcloud.cc/spring-security.html#sessionauthenticationstrategy)10.9.2 SessionAuthenticationStrategy

`SessionManagementFilter`和`AbstractAuthenticationProcessingFilter`都使用`SessionAuthenticationStrategy`，因此，如果您使用自定义的表单登录类，则需要将其注入这两个类。在这种情况下，组合命名空间和自定义bean的典型配置可能如下所示：

<http>
<custom-filter position="FORM_LOGIN_FILTER" ref="myAuthFilter" />
<session-management session-authentication-strategy-ref="sas"/>
</http>

<beans:bean id="myAuthFilter" class=
"org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter">
    <beans:property name="sessionAuthenticationStrategy" ref="sas" />
    ...
</beans:bean>

<beans:bean id="sas" class=
"org.springframework.security.web.authentication.session.SessionFixationProtectionStrategy" />

请注意，如果您在实现`HttpSessionBindingListener`的会话中存储bean（包括Spring会话范围的bean），则使用默认值`SessionFixationProtectionStrategy`可能会导致问题。有关更多信息，请参阅此类的Javadoc。

### [](https://www.springcloud.cc/spring-security.html#concurrent-sessions)10.9.3并发控制

Spring Security能够防止主体同时对同一个应用程序进行超过指定次数的身份验证。许多ISV利用此功能来强制执行许可，而网络管理员喜欢此功能，因为它有助于防止人们共享登录名。例如，您可以阻止用户“Batman”从两个不同的会话登录web应用程序。您可以使之前的登录过期，也可以在尝试再次登录时报告错误，从而阻止第二次登录。请注意，如果您使用的是第二种方法，那么未明确注销的用户（例如，刚刚关闭浏览器的用户）将无法再次登录，直到原始会话到期为止。

命名空间支持并发控制，因此请查看较早的命名空间章节以获取最简单的配置。有时你需要自定义东西。

该实现使用`SessionAuthenticationStrategy`的专用版本，称为`ConcurrentSessionControlAuthenticationStrategy`。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|以前，`ProviderManager`进行并发身份验证检查，可以注入`ConcurrentSessionController`。后者将检查用户是否试图超过允许的会话数。但是，这种方法需要提前创建HTTP会话，这是不希望的。在Spring Security 3中，用户首先由`AuthenticationManager`进行身份验证，一旦成功通过身份验证，就会创建会话并检查是否允许他们打开另一个会话。|

要使用并发会话支持，您需要将以下内容添加到`web.xml`：

<listener>
    <listener-class>
    org.springframework.security.web.session.HttpSessionEventPublisher
    </listener-class>
</listener>

此外，您需要将`ConcurrentSessionFilter`添加到`FilterChainProxy`。`ConcurrentSessionFilter`需要两个构造函数参数`sessionRegistry`，它们通常指向`SessionRegistryImpl`和`sessionInformationExpiredStrategy`的实例，它定义了会话到期时应用的策略。使用命名空间创建`FilterChainProxy`和其他默认bean的配置可能如下所示：

<http>
<custom-filter position="CONCURRENT_SESSION_FILTER" ref="concurrencyFilter" />
<custom-filter position="FORM_LOGIN_FILTER" ref="myAuthFilter" />

<session-management session-authentication-strategy-ref="sas"/>
</http>

<beans:bean id="redirectSessionInformationExpiredStrategy"
class="org.springframework.security.web.session.SimpleRedirectSessionInformationExpiredStrategy">
<beans:constructor-arg name="invalidSessionUrl" value="/session-expired.htm" />
</beans:bean>

<beans:bean id="concurrencyFilter"
class="org.springframework.security.web.session.ConcurrentSessionFilter">
<beans:constructor-arg name="sessionRegistry" ref="sessionRegistry" />
<beans:constructor-arg name="sessionInformationExpiredStrategy" ref="redirectSessionInformationExpiredStrategy" />
</beans:bean>

<beans:bean id="myAuthFilter" class=
"org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter">
<beans:property name="sessionAuthenticationStrategy" ref="sas" />
<beans:property name="authenticationManager" ref="authenticationManager" />
</beans:bean>

<beans:bean id="sas" class="org.springframework.security.web.authentication.session.CompositeSessionAuthenticationStrategy">
<beans:constructor-arg>
    <beans:list>
    <beans:bean class="org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy">
        <beans:constructor-arg ref="sessionRegistry"/>
        <beans:property name="maximumSessions" value="1" />
        <beans:property name="exceptionIfMaximumExceeded" value="true" />
    </beans:bean>
    <beans:bean class="org.springframework.security.web.authentication.session.SessionFixationProtectionStrategy">
    </beans:bean>
    <beans:bean class="org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy">
        <beans:constructor-arg ref="sessionRegistry"/>
    </beans:bean>
    </beans:list>
</beans:constructor-arg>
</beans:bean>

<beans:bean id="sessionRegistry"
    class="org.springframework.security.core.session.SessionRegistryImpl" />

每次`HttpSession`开始或终止时，将侦听器添加到`web.xml`会导致`ApplicationEvent`发布到Spring `ApplicationContext`。这很关键，因为它允许在会话结束时通知`SessionRegistryImpl`。没有它，一旦用户超过他们的会话津贴，即使他们退出另一个会话或超时，用户也永远无法再次登录。

#### [](https://www.springcloud.cc/spring-security.html#list-authenticated-principals)查询当前经过身份验证的用户及其会话的SessionRegistry

通过命名空间或使用普通bean设置并发控制有一个有用的副作用，即为您提供可在应用程序中直接使用的`SessionRegistry`的引用，因此即使您不想限制用户可能拥有的会话数量，无论如何都可能值得设置基础架构。您可以将`maximumSession`属性设置为-1以允许无限制的会话。如果您正在使用命名空间，则可以使用`session-registry-alias`属性为内部创建的`SessionRegistry`设置别名，从而提供可以注入您自己的bean的引用。

`getAllPrincipals()`方法为您提供当前已验证用户的列表。您可以通过调用`getAllSessions(Object principal, boolean includeExpiredSessions)`方法列出用户的会话，该方法返回`SessionInformation`对象的列表。您还可以通过在`SessionInformation`实例上调用`expireNow()`来使用户的会话到期。当用户返回应用程序时，将阻止他们继续进行。例如，您可能会发现这些方法在管理应用程序中很有用。有关更多信息，请查看Javadoc。

## [](https://www.springcloud.cc/spring-security.html#anonymous)10.10匿名身份验证

### [](https://www.springcloud.cc/spring-security.html#anonymous-overview)10.10.1概述

通常认为采用“默认拒绝”是一种良好的安全措施，您可以明确指定允许的内容并禁止其他所有内容。定义未经身份验证的用户可以访问的内容也是类似的情况，特别是对于web应用程序。许多站点要求必须对用户进行身份验证，除了几个URL（例如主页和登录页面）。在这种情况下，最简单的方法是为这些特定URL定义访问配置属性，而不是为每个安全资源定义。换句话说，有时很高兴默认情况下需要`ROLE_SOMETHING`，并且只允许此规则的某些例外，例如应用程序的登录，注销和主页。您也可以完全从过滤器链中省略这些页面，从而绕过访问控制检查，但由于其他原因，这可能是不合需要的，特别是如果页面对经过身份验证的用户的行为不同。

这就是匿名身份验证的含义。请注意，“匿名身份验证”的用户与未经身份验证的用户之间没有真正的概念差异。Spring Security的匿名身份验证只是为您提供了一种更方便的方法来配置访问控制属性。例如，调用servlet API调用（例如`getCallerPrincipal`）仍将返回null，即使`SecurityContextHolder`中实际存在匿名身份验证对象。

在其他情况下，匿名身份验证很有用，例如审计拦截器查询`SecurityContextHolder`以确定哪个主体负责给定操作。如果类知道`SecurityContextHolder`总是包含`Authentication`对象，而且从不`null`，则可以更健壮地创建类。

### [](https://www.springcloud.cc/spring-security.html#anonymous-config)10.10.2配置

使用HTTP配置Spring Security 3.0时会自动提供匿名身份验证支持，并且可以使用`<anonymous>`元素自定义（或禁用）。除非使用传统的bean配置，否则不需要配置此处描述的bean。

三个类一起提供匿名身份验证功能。`AnonymousAuthenticationToken`是`Authentication`的实现，并存储适用于匿名主体的`GrantedAuthority`。有一个相应的`AnonymousAuthenticationProvider`，它被链接到`ProviderManager`，以便接受`AnonymousAuthenticationToken`。最后，有一个`AnonymousAuthenticationFilter`，它在正常的身份验证机制之后被链接，如果那里没有`Authentication`，则自动将`AnonymousAuthenticationToken`添加到`SecurityContextHolder`。过滤器和身份验证提供程序的定义如下所示：

<bean id="anonymousAuthFilter"
    class="org.springframework.security.web.authentication.AnonymousAuthenticationFilter">
<property name="key" value="foobar"/>
<property name="userAttribute" value="anonymousUser,ROLE_ANONYMOUS"/>
</bean>

<bean id="anonymousAuthenticationProvider"
    class="org.springframework.security.authentication.AnonymousAuthenticationProvider">
<property name="key" value="foobar"/>
</bean>

`key`在过滤器和身份验证提供程序之间共享，因此前者创建的令牌被后者接受[[18]](https://www.springcloud.cc/spring-security.html#ftn.d5e4804)。`userAttribute`以`usernameInTheAuthenticationToken,grantedAuthority[,grantedAuthority]`的形式表示。这与`InMemoryDaoImpl`的`userMap`属性的等号后使用的语法相同。

如前所述，匿名身份验证的好处是所有URI模式都可以应用安全性。例如：

<bean id="filterSecurityInterceptor"
    class="org.springframework.security.web.access.intercept.FilterSecurityInterceptor">
<property name="authenticationManager" ref="authenticationManager"/>
<property name="accessDecisionManager" ref="httpRequestAccessDecisionManager"/>
<property name="securityMetadata">
    <security:filter-security-metadata-source>
    <security:intercept-url pattern='/index.jsp' access='ROLE_ANONYMOUS,ROLE_USER'/>
    <security:intercept-url pattern='/hello.htm' access='ROLE_ANONYMOUS,ROLE_USER'/>
    <security:intercept-url pattern='/logoff.jsp' access='ROLE_ANONYMOUS,ROLE_USER'/>
    <security:intercept-url pattern='/login.jsp' access='ROLE_ANONYMOUS,ROLE_USER'/>
    <security:intercept-url pattern='/**' access='ROLE_USER'/>
    </security:filter-security-metadata-source>" +
</property>
</bean>

### [](https://www.springcloud.cc/spring-security.html#anonymous-auth-trust-resolver)10.10.3 AuthenticationTrustResolver

完整的匿名身份验证讨论是`AuthenticationTrustResolver`接口，其对应的`AuthenticationTrustResolverImpl`实现。此接口提供`isAnonymous(Authentication)`方法，允许感兴趣的类考虑这种特殊类型的身份验证状态。`ExceptionTranslationFilter`在处理`AccessDeniedException`时使用此接口。如果抛出`AccessDeniedException`，并且身份验证是匿名类型，而不是抛出403（禁止）响应，则过滤器将启动`AuthenticationEntryPoint`，以便主体可以正确进行身份验证。这是必要的区别，否则主体将始终被视为“经过身份验证”，并且永远不会有机会通过表单，基本，摘要或其他一些正常的身份验证机制进行登录。

您经常会看到上面的拦截器配置中的`ROLE_ANONYMOUS`属性被`IS_AUTHENTICATED_ANONYMOUSLY`替换，这在定义访问控制时实际上是相同的。这是使用`AuthenticatedVoter`的一个例子，我们将在[授权章节中](https://www.springcloud.cc/spring-security.html#authz-authenticated-voter "AuthenticatedVoter使用")看到。它使用`AuthenticationTrustResolver`来处理此特定配置属性并授予匿名用户访问权限。`AuthenticatedVoter`方法更强大，因为它允许您区分匿名，记住我和完全认证的用户。如果您不需要此功能，那么您可以使用`ROLE_ANONYMOUS`，这将由Spring Security的标准`RoleVoter`处理。

## [](https://www.springcloud.cc/spring-security.html#websocket)10.11 WebSocket安全性

Spring Security 4增加了对保护[Spring的WebSocket支持的支持](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html)。本节介绍如何使用Spring Security的WebSocket支持。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|您可以在[https://github.com/spring-projects/spring-session/tree/master/samples/boot/websocket上](https://github.com/spring-projects/spring-session/tree/master/samples/boot/websocket)找到WebSocket安全性的完整工作示例。|

**直接JSR-356支持**

Spring Security不提供直接的JSR-356支持，因为这样做几乎没有价值。这是因为格式未知，因此[很少有Spring可以保护未知格式](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html#websocket-intro-sub-protocol)。此外，JSR-356没有提供拦截消息的方法，因此安全性会相当具有侵略性。

### [](https://www.springcloud.cc/spring-security.html#websocket-configuration)10.11.1 WebSocket配置

Spring Security 4.0通过Spring消息传递抽象引入了对WebSockets的授权支持。要使用Java Configuration配置授权，只需扩展`AbstractSecurityWebSocketMessageBrokerConfigurer`并配置`MessageSecurityMetadataSourceRegistry`即可。例如：

_@Configuration_
public class WebSocketSecurityConfig
      extends AbstractSecurityWebSocketMessageBrokerConfigurer { [](https://www.springcloud.cc/spring-security.html#CO14-1)![1](https://www.springcloud.cc/images/1.png) [](https://www.springcloud.cc/spring-security.html#CO14-2)![2](https://www.springcloud.cc/images/2.png)

    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
        messages
                .simpDestMatchers("/user/*").authenticated() [](https://www.springcloud.cc/spring-security.html#CO14-3)![3](https://www.springcloud.cc/images/3.png)
    }
}

这将确保：

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO14-1)|任何入站CONNECT消息都需要有效的CSRF令牌来强制实施[同源策略](https://www.springcloud.cc/spring-security.html#websocket-sameorigin "10.11.4实施同源策略")|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO14-2)|对于任何入站请求，SecurityContextHolder将在simpUser头属性中填充用户。|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO14-3)|我们的消息需要适当的授权。具体来说，任何以“/ user /”开头的入站邮件都需要ROLE_USER。有关授权的更多详细信息，请参见[第10.11.3节“WebSocket授权”](https://www.springcloud.cc/spring-security.html#websocket-authorization "10.11.3 WebSocket授权")|

Spring Security还提供[XML Namespace](https://www.springcloud.cc/spring-security.html#nsa-websocket-security "15.2.2 WebSocket安全性")支持以保护WebSockets。基于XML的可比配置如下所示：

<websocket-message-broker> [](https://www.springcloud.cc/spring-security.html#CO15-1)![1](https://www.springcloud.cc/images/1.png) [](https://www.springcloud.cc/spring-security.html#CO15-2)![2](https://www.springcloud.cc/images/2.png)
    [](https://www.springcloud.cc/spring-security.html#CO15-3)![3](https://www.springcloud.cc/images/3.png)
    <intercept-message pattern="/user/**" access="hasRole('USER')" />
</websocket-message-broker>

这将确保：

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO15-1)|任何入站CONNECT消息都需要有效的CSRF令牌来强制实施[同源策略](https://www.springcloud.cc/spring-security.html#websocket-sameorigin "10.11.4实施同源策略")|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO15-2)|对于任何入站请求，SecurityContextHolder将在simpUser头属性中填充用户。|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO15-3)|我们的消息需要适当的授权。具体来说，任何以“/ user /”开头的入站邮件都需要ROLE_USER。有关授权的更多详细信息，请参见[第10.11.3节“WebSocket授权”](https://www.springcloud.cc/spring-security.html#websocket-authorization "10.11.3 WebSocket授权")|

### [](https://www.springcloud.cc/spring-security.html#websocket-authentication)10.11.2 WebSocket认证

WebSockets重用与WebSocket连接时在HTTP请求中找到的相同身份验证信息。这意味着`HttpServletRequest`上的`Principal`将被移交给WebSockets。如果您使用Spring Security，则会自动覆盖`HttpServletRequest`上的`Principal`。

更具体地说，为了确保用户已经对您的WebSocket应用程序进行了身份验证，所有必要的是确保您设置Spring Security来验证基于HTTP的web应用程序。

### [](https://www.springcloud.cc/spring-security.html#websocket-authorization)10.11.3 WebSocket授权

Spring Security 4.0通过Spring消息传递抽象引入了对WebSockets的授权支持。要使用Java Configuration配置授权，只需扩展`AbstractSecurityWebSocketMessageBrokerConfigurer`并配置`MessageSecurityMetadataSourceRegistry`即可。例如：

_@Configuration_
public class WebSocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {

    _@Override_
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
        messages
                .nullDestMatcher().authenticated() [](https://www.springcloud.cc/spring-security.html#CO16-1)![1](https://www.springcloud.cc/images/1.png)
                .simpSubscribeDestMatchers("/user/queue/errors").permitAll() [](https://www.springcloud.cc/spring-security.html#CO16-2)![2](https://www.springcloud.cc/images/2.png)
                .simpDestMatchers("/app/**").hasRole("USER") [](https://www.springcloud.cc/spring-security.html#CO16-3)![3](https://www.springcloud.cc/images/3.png)
                .simpSubscribeDestMatchers("/user/**", "/topic/friends/*").hasRole("USER") [](https://www.springcloud.cc/spring-security.html#CO16-4)![4](https://www.springcloud.cc/images/4.png)
                .simpTypeMatchers(MESSAGE, SUBSCRIBE).denyAll() [](https://www.springcloud.cc/spring-security.html#CO16-5)![5](https://www.springcloud.cc/images/5.png)
                .anyMessage().denyAll(); [](https://www.springcloud.cc/spring-security.html#CO16-6)![6](https://www.springcloud.cc/images/6.png)

    }
}

这将确保：

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO16-1)|任何没有目的地的消息（即消息类型为MESSAGE或SUBSCRIBE以外的任何消息）都需要用户进行身份验证|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO16-2)|任何人都可以订阅/ user / queue / errors|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO16-3)|任何目标以“/ app /”开头的消息都要求用户具有角色ROLE_USER|
|[![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO16-4)|任何以SUBSCRIBE类型的“/ user /”或“/ topic / friends /”开头的消息都需要ROLE_USER|
|[![五](https://www.springcloud.cc/images/5.png)](https://www.springcloud.cc/spring-security.html#CO16-5)|MESSAGE或SUBSCRIBE类型的任何其他消息都将被拒绝。由于6我们不需要这一步，但它说明了如何匹配特定的消息类型。|
|[![6](https://www.springcloud.cc/images/6.png)](https://www.springcloud.cc/spring-security.html#CO16-6)|任何其他消息都被拒绝。这是一个好主意，以确保您不会错过任何消息。|

Spring Security还提供[XML Namespace](https://www.springcloud.cc/spring-security.html#nsa-websocket-security "15.2.2 WebSocket安全性")支持以保护WebSockets。基于XML的可比配置如下所示：

<websocket-message-broker>
    [](https://www.springcloud.cc/spring-security.html#CO17-1)![1](https://www.springcloud.cc/images/1.png)
    <intercept-message type="CONNECT" access="permitAll" />
    <intercept-message type="UNSUBSCRIBE" access="permitAll" />
    <intercept-message type="DISCONNECT" access="permitAll" />

    <intercept-message pattern="/user/queue/errors" type="SUBSCRIBE" access="permitAll" /> [](https://www.springcloud.cc/spring-security.html#CO17-2)![2](https://www.springcloud.cc/images/2.png)
    <intercept-message pattern="/app/**" access="hasRole('USER')" />      [](https://www.springcloud.cc/spring-security.html#CO17-3)![3](https://www.springcloud.cc/images/3.png)

    [](https://www.springcloud.cc/spring-security.html#CO17-4)![4](https://www.springcloud.cc/images/4.png)
    <intercept-message pattern="/user/**" access="hasRole('USER')" />
    <intercept-message pattern="/topic/friends/*" access="hasRole('USER')" />

    [](https://www.springcloud.cc/spring-security.html#CO17-5)![5](https://www.springcloud.cc/images/5.png)
    <intercept-message type="MESSAGE" access="denyAll" />
    <intercept-message type="SUBSCRIBE" access="denyAll" />

    <intercept-message pattern="/**" access="denyAll" /> [](https://www.springcloud.cc/spring-security.html#CO17-6)![6](https://www.springcloud.cc/images/6.png)
</websocket-message-broker>

这将确保：

|   |   |
|---|---|
|[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO17-1)|任何类型为CONNECT，UNSUBSCRIBE或DISCONNECT的消息都需要对用户进行身份验证|
|[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO17-2)|任何人都可以订阅/ user / queue / errors|
|[![3](https://www.springcloud.cc/images/3.png)](https://www.springcloud.cc/spring-security.html#CO17-3)|任何目标以“/ app /”开头的消息都要求用户具有角色ROLE_USER|
|[![4](https://www.springcloud.cc/images/4.png)](https://www.springcloud.cc/spring-security.html#CO17-4)|任何以SUBSCRIBE类型的“/ user /”或“/ topic / friends /”开头的消息都需要ROLE_USER|
|[![五](https://www.springcloud.cc/images/5.png)](https://www.springcloud.cc/spring-security.html#CO17-5)|MESSAGE或SUBSCRIBE类型的任何其他消息都将被拒绝。由于6我们不需要这一步，但它说明了如何匹配特定的消息类型。|
|[![6](https://www.springcloud.cc/images/6.png)](https://www.springcloud.cc/spring-security.html#CO17-6)|具有目的地的任何其他消息都被拒绝。这是一个好主意，以确保您不会错过任何消息。|

#### [](https://www.springcloud.cc/spring-security.html#websocket-authorization-notes)WebSocket授权说明

为了正确保护您的应用程序，了解Spring的WebSocket支持非常重要。

##### [](https://www.springcloud.cc/spring-security.html#websocket-authorization-notes-messagetypes)消息类型的WebSocket授权

重要的是要理解SUBSCRIBE和MESSAGE类型的消息之间的区别以及它在Spring中的工作方式。

考虑聊天应用程序。

- 系统可以通过“/ topic / system / notifications”目的地向所有用户发送通知MESSAGE
- 客户端可以通过SUBSCRIBE接收“/ topic / system / notifications”的通知。

虽然我们希望客户端能够SUBSCRIBE到“/ topic / system / notifications”，但我们不希望它们能够将MESSAGE发送到该目的地。如果我们允许向“/ topic / system / notifications”发送MESSAGE，则客户端可以直接向该端点发送消息并模拟系统。

通常，应用程序通常拒绝发送到以[代理前缀](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html#websocket-stomp)开头的消息（即“/ topic /”或“/ queue /”）的任何MESSAGE 。

##### [](https://www.springcloud.cc/spring-security.html#websocket-authorization-notes-destinations)目的地的WebSocket授权

了解目的地如何转变也很重要。

考虑聊天应用程序。

- 用户可以通过向目的地“/ app / chat”发送消息来向特定用户发送消息。
- 应用程序看到消息，确保将“from”属性指定为当前用户（我们不能信任客户端）。
- 然后，应用程序使用`SimpMessageSendingOperations.convertAndSendToUser("toUser", "/queue/messages", message)`将消息发送给收件人。
- 消息将变为“/ queue / user / messages- <sessionid>”的目标

通过上面的应用程序，我们希望允许我们的客户端监听转换为“/ queue / user / messages- <sessionid>”的“/ user / queue”。但是，我们不希望客户端能够侦听“/ queue / *”，因为这样可以让客户端看到每个用户的消息。

通常，应用程序通常拒绝发送到以[代理前缀](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html#websocket-stomp)开头的消息（即“/ topic /”或“/ queue /”）的任何SUBSCRIBE 。当然，我们可能会提供例外来解释类似的事情

#### [](https://www.springcloud.cc/spring-security.html#websocket-authorization-notes-outbound)出站邮件

Spring包含一个标题[为消息流的](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html#websocket-stomp-message-flow)部分，描述消息如何流经系统。值得注意的是，Spring Security只能保证`clientInboundChannel`。Spring Security并未试图获得`clientOutboundChannel`。

最重要的原因是性能。对于每一条消息，通常会有更多消息传出去。我们鼓励保护订阅端点，而不是保护出站邮件。

### [](https://www.springcloud.cc/spring-security.html#websocket-sameorigin)10.11.4实施同源策略

重要的是要强调浏览器不会为WebSocket连接强制实施[同源策略](https://en.wikipedia.org/wiki/Same-origin_policy)。这是一个非常重要的考虑因素。

#### [](https://www.springcloud.cc/spring-security.html#websocket-sameorigin-why)为什么同源？

请考虑以下情形。用户访问bank.com并对其帐户进行身份验证。同一个用户在浏览器中打开另一个选项卡并访问evil.com。同源策略确保evil.com无法读取或写入bank.com的数据。

使用WebSockets时，同源策略不适用。事实上，除非bank.com明确禁止，否则evil.com可以代表用户读写数据。这意味着用户可以通过webSocket执行任何操作（即转账），evil.com可以代表该用户进行操作。

由于SockJS试图模拟WebSockets，它也绕过了同源策略。这意味着开发人员在使用SockJS时需要明确保护其应用程序免受外部域的影响。

#### [](https://www.springcloud.cc/spring-security.html#websocket-sameorigin-spring)Spring WebSocket允许来源

幸运的是，由于Spring 4.1.5 Spring的WebSocket和SockJS支持限制了对[当前域的](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html#websocket-server-allowed-origins)访问。Spring Security增加了额外的保护层，以提供[深度防御](https://en.wikipedia.org/wiki/Defense_in_depth_%28computing%29)。

#### [](https://www.springcloud.cc/spring-security.html#websocket-sameorigin-csrf)将CSRF添加到Stomp Headers

默认情况下，Spring Security需要任何CONNECT消息类型中的[CSRF令牌](https://www.springcloud.cc/spring-security.html#csrf "10.6跨站请求伪造（CSRF）")。这可确保只有可以访问CSRF令牌的站点才能连接。由于只有**Same Origin**可以访问CSRF令牌，因此不允许外部域建立连接。

通常，我们需要在HTTP标头或HTTP参数中包含CSRF令牌。但是，SockJS不允许这些选项。相反，我们必须在Stomp标头中包含令牌

应用程序可以通过访问名为_csrf的请求属性来[获取CSRF令牌](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token "包括CSRF令牌")。例如，以下内容将允许访问JSP中的`CsrfToken`：

var headerName = "${_csrf.headerName}";
var token = "${_csrf.token}";

如果您使用的是静态HTML，则可以在REST端点上公开`CsrfToken`。例如，以下内容将公开URL / csrf上的`CsrfToken`

_@RestController_
public class CsrfController {

    _@RequestMapping("/csrf")_
    public CsrfToken csrf(CsrfToken token) {
        return token;
    }
}

JavaScript可以对端点进行REST调用，并使用响应来填充headerName和令牌。

我们现在可以在Stomp客户端中包含令牌。例如：

...
var headers = {};
headers[headerName] = token;
stompClient.connect(headers, function(frame) {
  ...

}

#### [](https://www.springcloud.cc/spring-security.html#websocket-sameorigin-disable)在WebSockets中禁用CSRF

如果您想允许其他域访问您的网站，您可以禁用Spring Security的保护。例如，在Java Configuration中，您可以使用以下命令：

_@Configuration_
public class WebSocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {

    ...

    _@Override_
    protected boolean sameOriginDisabled() {
        return true;
    }
}

### [](https://www.springcloud.cc/spring-security.html#websocket-sockjs)10.11.5使用SockJS

[SockJS](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html#websocket-fallback)提供后备传输以支持旧版浏览器。使用后备选项时，我们需要放宽一些安全约束，以允许SockJS与Spring Security一起使用。

#### [](https://www.springcloud.cc/spring-security.html#websocket-sockjs-sameorigin)SockJS和框架选项

SockJS可以使用[利用iframe](https://github.com/sockjs/sockjs-client/tree/v0.3.4)的[传输](https://github.com/sockjs/sockjs-client/tree/v0.3.4)。默认情况下，Spring Security将[拒绝](https://www.springcloud.cc/spring-security.html#headers-frame-options "X-框架，选项")该站点被阻止以防止Clickjacking攻击。为了允许基于SockJS帧的传输工作，我们需要配置Spring Security以允许相同的源来构建内容。

您可以使用[frame-options](https://www.springcloud.cc/spring-security.html#nsa-frame-options "<帧选项>")元素自定义X-Frame-Options 。例如，以下内容将指示Spring Security使用“X-Frame-Options：SAMEORIGIN”，它允许同一域内的iframe：

<http>
    <!-- ... -->

    <headers>
        <frame-options
          policy="SAMEORIGIN" />
    </headers>
</http>

同样，您可以使用以下内容自定义框架选项以在Java配置中使用相同的源：

_@EnableWebSecurity_
public class WebSecurityConfig extends
   WebSecurityConfigurerAdapter {

  _@Override_
  protected void configure(HttpSecurity http) throws Exception {
    http
      // ...
      .headers()
        .frameOptions()
            .sameOrigin();
  }
}

#### [](https://www.springcloud.cc/spring-security.html#websocket-sockjs-csrf)SockJS和放松CSRF

对于任何基于HTTP的传输，SockJS在CONNECT消息上使用POST。通常，我们需要在HTTP标头或HTTP参数中包含CSRF令牌。但是，SockJS不允许这些选项。相反，我们必须在Stomp标头中包含令牌，如[“将CSRF添加到Stomp Headers”一节中所述](https://www.springcloud.cc/spring-security.html#websocket-sameorigin-csrf "将CSRF添加到Stomp Headers")。

这也意味着我们需要使用web层来放松我们的CSRF保护。具体来说，我们要为连接URL禁用CSRF保护。我们不想为每个URL禁用CSRF保护。否则我们的网站将容易受到CSRF攻击。

我们可以通过提供CSRF RequestMatcher轻松实现这一目标。我们的Java配置使这非常简单。例如，如果我们的stomp端点是“/ chat”，我们可以使用以下配置仅对以“/ chat /”开头的URL禁用CSRF保护：

_@Configuration_
_@EnableWebSecurity_
public class WebSecurityConfig
    extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {

        http
            .csrf()
                // ignore our stomp endpoints since they are protected using Stomp headers
                .ignoringAntMatchers("/chat/**")
                .and()
            .headers()
                // allow same origin to frame our site to support iframe SockJS
                .frameOptions().sameOrigin()
                .and()
            .authorizeRequests()

            ...

如果我们使用基于XML的配置，我们可以使用[csrf @ request-matcher-ref](https://www.springcloud.cc/spring-security.html#nsa-csrf-request-matcher-ref)。例如：

<http ...>
    <csrf request-matcher-ref="csrfMatcher"/>

    <headers>
        <frame-options policy="SAMEORIGIN"/>
    </headers>

    ...
</http>

<b:bean id="csrfMatcher"
    class="AndRequestMatcher">
    <b:constructor-arg value="#{T(org.springframework.security.web.csrf.CsrfFilter).DEFAULT_CSRF_MATCHER}"/>
    <b:constructor-arg>
        <b:bean class="org.springframework.security.web.util.matcher.NegatedRequestMatcher">
          <b:bean class="org.springframework.security.web.util.matcher.AntPathRequestMatcher">
            <b:constructor-arg value="/chat/**"/>
          </b:bean>
        </b:bean>
    </b:constructor-arg>
</b:bean>

  

---

[[6]](https://www.springcloud.cc/spring-security.html#d5e3604)请注意，您需要在应用程序上下文XML文件中包含安全命名空间才能使用此语法。仍然支持使用`filter-chain-map`的旧语法，但不赞成使用构造函数参数注入。

[[7]](https://www.springcloud.cc/spring-security.html#d5e3610) `request-matcher-ref`属性可用于指定`RequestMatcher`实例以实现更强大的匹配，而不是路径模式

[[8]](https://www.springcloud.cc/spring-security.html#d5e3708)当浏览器不支持cookie并且在分号后将`jsessionid`参数附加到URL时，您可能已经看到了这一点。但是，RFC允许在URL的任何路径段中存在这些参数

[[9]](https://www.springcloud.cc/spring-security.html#d5e3713)一旦请求离开`FilterChainProxy`，将返回原始值，因此仍可供应用程序使用。

[[10]](https://www.springcloud.cc/spring-security.html#d5e3720)因此，例如，原始请求路径`/secure;hack=1/somefile.html;hack=2`将作为`/secure/somefile.html`返回。

[[11]](https://www.springcloud.cc/spring-security.html#d5e3841)我们使用forward，因此SecurityContextHolder仍然包含主体的详细信息，这可能对显示给用户很有用。在Spring Security的旧版本中，我们依靠servlet容器来处理403错误消息，该消息缺少这种有用的上下文信息。

[[12]](https://www.springcloud.cc/spring-security.html#d5e3880)在Spring Security 2.0及更早版本中，此过滤器被称为`HttpSessionContextIntegrationFilter`并且执行了存储上下文的所有工作都是由过滤器本身执行的。如果您熟悉此类，那么现在可以在`HttpSessionSecurityContextRepository`上找到大多数可用的配置选项。

[[13]](https://www.springcloud.cc/spring-security.html#d5e3895)由于历史原因，在Spring Security 3.0之前，此过滤器被称为`AuthenticationProcessingFilter`，入口点被称为`AuthenticationProcessingFilterEntryPoint`。由于框架现在支持许多不同形式的身份验证，因此它们在3.0中都被赋予了更具体的名称。

[[14]](https://www.springcloud.cc/spring-security.html#d5e3923)在3.0之前的版本中，此时的应用程序流程已演变为一个阶段，由此类和策略插件的混合属性控制。决定3.0重构代码以使这两个策略完全负责。

[[15]](https://www.springcloud.cc/spring-security.html#d5e4069)如果`DigestAuthenticationFilter.passwordAlreadyEncoded`设置为`true`，则可以以HEX（MD5（用户名：领域：密码））格式对密码进行编码。但是，其他密码编码不适用于摘要式身份验证。

[[16Rewrite]](https://www.springcloud.cc/spring-security.html#d5e4112)基本上，用户名不包含在cookie中，以防止不必要地暴露有效的登录名。在本文的评论部分对此进行了讨论。

[[17]](https://www.springcloud.cc/spring-security.html#d5e4709) `SessionManagementFilter`将不会检测通过身份验证后执行重定向的机制（例如表单登录）进行身份验证，因为在身份验证请求期间不会调用过滤器。在这些情况下，必须单独处理会话管理功能。

[[18]](https://www.springcloud.cc/spring-security.html#d5e4804) `key`财产的使用不应被视为在此提供任何真正的安全。这只是一本簿记练习。如果您在身份验证客户端可以构造`Authentication`对象（例如使用RMI调用）的情况下共享`ProviderManager`，其中包含`AnonymousAuthenticationProvider`，则恶意客户端可以提交它创建的`AnonymousAuthenticationToken`（选择了用户名和权限列表）。如果`key`是可猜测的或可以找到，那么匿名提供者将接受该令牌。这不是正常使用的问题，但如果您使用的是RMI，最好使用自定义的`ProviderManager`，它会省略匿名提供程序，而不是共享您用于HTTP身份验证机制的提供程序。

## [](https://www.springcloud.cc/spring-security.html#authorization)11.授权

Spring Security内的高级授权功能是其受欢迎程度最引人注目的原因之一。无论您选择如何进行身份验证 - 无论是使用Spring Security - 提供的机制和提供程序，还是与容器或其他非Spring Security身份验证机构集成 - 您都会发现授权服务可以在您的应用程序中使用一致而简单的方式。

在这一部分中，我们将探讨第一部分中介绍的不同`AbstractSecurityInterceptor`实现。然后我们继续探讨如何通过使用域访问控制列表来微调授权。

## [](https://www.springcloud.cc/spring-security.html#authz-arch)11.1授权体系结构

### [](https://www.springcloud.cc/spring-security.html#authz-authorities)11.1.1当局

正如我们在[技术概述中](https://www.springcloud.cc/spring-security.html#tech-granted-authority "一个GrantedAuthority")看到的，所有`Authentication`实现都存储了`GrantedAuthority`对象的列表。这些代表已授予委托人的当局。`GrantedAuthority`对象由`AuthenticationManager`插入`Authentication`对象，稍后由`AccessDecisionManager`在做出授权决定时读取。

`GrantedAuthority`是一个只有一个方法的接口：

String getAuthority();

此方法允许`AccessDecisionManager` s获得`GrantedAuthority`的精确`String`表示。通过将表示作为`String`返回，`GrantedAuthority`可以很容易地“读取”`GrantedAuthority`。如果`GrantedAuthority`不能精确地表示为`String`，则`GrantedAuthority`被视为“复杂”，`getAuthority()`必须返回`null`。

“复杂”`GrantedAuthority`的一个示例是存储适用于不同客户帐号的操作和权限阈值列表的实现。将此复合体`GrantedAuthority`表示为`String`将非常困难，因此`getAuthority()`方法应返回`null`。这将向任何`AccessDecisionManager`表明它需要专门支持`GrantedAuthority`实施以了解其内容。

Spring Security包括一个具体的`GrantedAuthority`实施，`SimpleGrantedAuthority`。这允许任何用户指定的`String`转换为`GrantedAuthority`。安全体系结构中包含的所有`AuthenticationProvider`都使用`SimpleGrantedAuthority`填充`Authentication`对象。

### [](https://www.springcloud.cc/spring-security.html#authz-pre-invocation)11.1.2预调用处理

正如我们在[技术概述](https://www.springcloud.cc/spring-security.html#secure-objects "安全对象和AbstractSecurityInterceptor")章节中看到的那样，Spring Security提供了拦截器来控制对安全对象的访问，例如方法调用或web请求。`AccessDecisionManager`是否允许调用是否允许进行调用。

#### [](https://www.springcloud.cc/spring-security.html#authz-access-decision-manager)AccessDecisionManager

`AccessDecisionManager`由`AbstractSecurityInterceptor`调用，负责做出最终的访问控制决策。`AccessDecisionManager`接口包含三种方法：

void decide(Authentication authentication, Object secureObject,
    Collection<ConfigAttribute> attrs) throws AccessDeniedException;

boolean supports(ConfigAttribute attribute);

boolean supports(Class clazz);

`AccessDecisionManager`的`decide`方法传递了它所需的所有相关信息，以便做出授权决定。特别是，传递secure `Object`可以检查实际安全对象调用中包含的那些参数。例如，假设安全对象是`MethodInvocation`。查询`MethodInvocation`任何`Customer`参数很容易，然后在`AccessDecisionManager`中实现某种安全逻辑，以确保允许委托人对该客户进行操作。如果访问被拒绝，预计实现将抛出`AccessDeniedException`。

`AbstractSecurityInterceptor`在启动时调用`supports(ConfigAttribute)`方法来确定`AccessDecisionManager`是否可以处理传递的`ConfigAttribute`。安全拦截器实现调用`supports(Class)`方法以确保配置的`AccessDecisionManager`支持安全拦截器将呈现的安全对象的类型。

#### [](https://www.springcloud.cc/spring-security.html#authz-voting-based)基于投票的AccessDecisionManager实现

虽然用户可以实现自己的`AccessDecisionManager`来控制授权的所有方面，但Spring Security包括几个基于投票的`AccessDecisionManager`实现。 [图11.1“投票决策管理器”](https://www.springcloud.cc/spring-security.html#authz-access-voting "图11.1。 投票决策经理")说明了相关的类。

[](https://www.springcloud.cc/spring-security.html#authz-access-voting)

**图11.1。投票决策经理**

![进入决策投票](https://www.springcloud.cc/images/access-decision-voting.png)

  

使用此方法，将对授权决策轮询一系列`AccessDecisionVoter`实现。然后`AccessDecisionManager`根据对选票的评估决定是否投出`AccessDeniedException`。

`AccessDecisionVoter`接口有三种方法：

int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attrs);

boolean supports(ConfigAttribute attribute);

boolean supports(Class clazz);

具体实现返回`int`，可能的值反映在`AccessDecisionVoter`静态字段`ACCESS_ABSTAIN`，`ACCESS_DENIED`和`ACCESS_GRANTED`中。如果投票实施对授权决定没有意见，则返回`ACCESS_ABSTAIN`。如果确实有意见，则必须返回`ACCESS_DENIED`或`ACCESS_GRANTED`。

提供Spring Security的三个具体`AccessDecisionManager`与计票结果相符。`ConsensusBased`实施将基于非弃权投票的共识授予或拒绝访问。提供Properties来控制投票相等或所有投票弃权的行为。如果收到一个或多个`ACCESS_GRANTED`票，则`AffirmativeBased`实施将授予访问权（即如果至少有一个授权投票，则拒绝投票将被忽略）。与`ConsensusBased`实施一样，如果所有选民弃权，都有一个控制行为的参数。`UnanimousBased`提供者期望获得一致`ACCESS_GRANTED`票，以便授予访问权限，而忽略弃权。如果有任何`ACCESS_DENIED`投票，它将拒绝访问。与其他实现一样，如果所有选民弃权，则有一个参数可以控制行为。

可以实现以不同方式计算选票的自定义`AccessDecisionManager`。例如，来自特定`AccessDecisionVoter`的投票可能会获得额外的权重，而来自特定选民的拒绝投票则可能具有否决权。

##### [](https://www.springcloud.cc/spring-security.html#authz-role-voter)的RoleVoter

Spring Security提供的最常用的`AccessDecisionVoter`是简单的`RoleVoter`，它将配置属性视为简单的角色名称，并在用户被分配了该角色时授予访问权限。

如果任何`ConfigAttribute`以前缀`ROLE_`开头，它将投票。如果有`GrantedAuthority`返回`String`表示（通过`getAuthority()`方法）完全等于从前缀`ROLE_`开始的一个或多个`ConfigAttributes`，它将投票授予访问权限。如果与`ROLE_`开头的任何`ConfigAttribute`没有完全匹配，则`RoleVoter`将投票拒绝访问。如果没有`ConfigAttribute`以`ROLE_`开头，选民将弃权。

##### [](https://www.springcloud.cc/spring-security.html#authz-authenticated-voter)AuthenticatedVoter使用

我们隐含看到的另一个选民是`AuthenticatedVoter`，它可用于区分匿名，完全身份验证和记住身份验证的用户。许多站点允许在remember-me身份验证下进行某些有限访问，但需要用户通过登录进行完全访问来确认其身份。

当我们使用属性`IS_AUTHENTICATED_ANONYMOUSLY`授予匿名访问权限时，`AuthenticatedVoter`正在处理此属性。有关更多信息，请参阅此类的Javadoc。

##### [](https://www.springcloud.cc/spring-security.html#authz-custom-voter)自定义选民

显然，您还可以实现自定义`AccessDecisionVoter`，并且您可以将所需的任何访问控制逻辑放在其中。它可能特定于您的应用程序（与业务逻辑相关），也可能实现某些安全管理逻辑。例如，您可以在Spring web网站上找到一篇[博客文章](https://spring.io/blog/2009/01/03/spring-security-customization-part-2-adjusting-secured-session-in-real-time)，其中介绍了如何使用投票人实时拒绝帐户被暂停的用户访问。

### [](https://www.springcloud.cc/spring-security.html#authz-after-invocation-handling)11.1.3调用处理后

虽然在继续安全对象调用之前`AbstractSecurityInterceptor`调用`AccessDecisionManager`，但某些应用程序需要一种修改安全对象调用实际返回的对象的方法。虽然您可以轻松实现自己的AOP关注来实现这一点，但Spring Security提供了一个方便的钩子，它具有几个与其ACL功能集成的具体实现。

[图11.2“调用实现后”](https://www.springcloud.cc/spring-security.html#authz-after-invocation "图11.2。 在调用实现之后")说明了Spring Security的`AfterInvocationManager`及其具体实现。

[](https://www.springcloud.cc/spring-security.html#authz-after-invocation)

**图11.2。在调用实现之后**

![在调用之后](https://www.springcloud.cc/images/after-invocation.png)

  

与Spring Security的许多其他部分一样，`AfterInvocationManager`具有单个具体实现`AfterInvocationProviderManager`，其轮询`AfterInvocationProvider`的列表。允许每个`AfterInvocationProvider`修改返回对象或抛出`AccessDeniedException`。实际上，多个提供者可以修改对象，因为先前提供者的结果被传递到列表中的下一个提供者。

请注意，如果您使用的是`AfterInvocationManager`，则仍需要允许`MethodSecurityInterceptor`的`AccessDecisionManager`允许操作的配置属性。如果您使用典型的Spring Security包含的`AccessDecisionManager`实现，则没有为特定安全方法调用定义配置属性将导致每个`AccessDecisionVoter`放弃投票。反过来，如果`AccessDecisionManager`属性“allowIfAllAbstainDecisions”为`false`，则会抛出`AccessDeniedException`。您可以通过（i）将“allowIfAllAbstainDecisions”设置为`true`（尽管通常不建议这样做）或（ii）确保至少有一个`AccessDecisionVoter`投票的配置属性来避免此潜在问题授予访问权限。后一种（推荐）方法通常通过`ROLE_USER`或`ROLE_AUTHENTICATED`配置属性来实现。

### [](https://www.springcloud.cc/spring-security.html#authz-hierarchical-roles)11.1.4分层角色

通常要求应用程序中的特定角色应自动“包含”其他角色。例如，在具有“admin”和“user”角色概念的应用程序中，您可能希望管理员能够执行普通用户可以执行的所有操作。为此，您可以确保为所有管理员用户分配“用户”角色。或者，您可以修改每个需要“用户”角色的访问约束，以包含“admin”角色。如果您的应用程序中有许多不同的角色，这可能会变得非常复杂。

通过使用角色层次结构，您可以配置哪些角色（或权限）应包含其他角色。Spring Security的[RoleVoter](https://www.springcloud.cc/spring-security.html#authz-role-voter "的RoleVoter") `RoleHierarchyVoter` 的扩展版本配置了`RoleHierarchy`，从中获取用户所分配的所有“可达权限”。典型配置可能如下所示：

<bean id="roleVoter" class="org.springframework.security.access.vote.RoleHierarchyVoter">
    <constructor-arg ref="roleHierarchy" />
</bean>
<bean id="roleHierarchy"
        class="org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl">
    <property name="hierarchy">
        <value>
            ROLE_ADMIN > ROLE_STAFF
            ROLE_STAFF > ROLE_USER
            ROLE_USER > ROLE_GUEST
        </value>
    </property>
</bean>

在这里，我们在层次结构`ROLE_ADMIN ⇒ ROLE_STAFF ⇒ ROLE_USER ⇒ ROLE_GUEST`中有四个角色。使用`ROLE_ADMIN`进行身份验证的用户，在使用上述`RoleHierarchyVoter`配置的`AccessDecisionManager`评估安全性约束时，其行为就像拥有所有四个角色一样。`>`符号可以被认为是“包含”。

角色层次结构提供了一种简便的方法，可以简化应用程序的访问控制配置数据和/或减少需要分配给用户的权限数量。对于更复杂的要求，您可能希望在应用程序所需的特定访问权限和分配给用户的角色之间定义逻辑映射，在加载用户信息时在两者之间进行转换。

## [](https://www.springcloud.cc/spring-security.html#secure-object-impls)11.2安全对象实现

### [](https://www.springcloud.cc/spring-security.html#aop-alliance)11.2.1 AOP联盟（MethodInvocation）安全拦截器

在Spring Security 2.0之前，保护`MethodInvocation`需要相当多的锅炉板配置。现在推荐的方法安全性方法是使用[命名空间配置](https://www.springcloud.cc/spring-security.html#ns-method-security "7.4方法安全性")。这样，方法安全基础结构bean就会自动为您配置，因此您实际上不需要了解实现类。我们将简要介绍这里涉及的类。

使用`MethodSecurityInterceptor`强制执行方法安全性，这可以保护`MethodInvocation` s。根据配置方法，拦截器可能特定于单个bean或在多个bean之间共享。拦截器使用`MethodSecurityMetadataSource`实例来获取适用于特定方法调用的配置属性。`MapBasedMethodSecurityMetadataSource`用于存储由方法名称（可以是通配符）键控的配置属性，并且在使用`<intercept-methods>`或`<protect-point>`元素在应用程序上下文中定义属性时将在内部使用。其他实现将用于处理基于注释的配置。

#### [](https://www.springcloud.cc/spring-security.html#explicit-methodsecurityinterceptor-configuration)显式MethodSecurityInterceptor配置

您当然可以在应用程序上下文中直接配置`MethodSecurityIterceptor`，以便与Spring AOP的代理机制之一一起使用：

<bean id="bankManagerSecurity" class=
    "org.springframework.security.access.intercept.aopalliance.MethodSecurityInterceptor">
<property name="authenticationManager" ref="authenticationManager"/>
<property name="accessDecisionManager" ref="accessDecisionManager"/>
<property name="afterInvocationManager" ref="afterInvocationManager"/>
<property name="securityMetadataSource">
    <sec:method-security-metadata-source>
    <sec:protect method="com.mycompany.BankManager.delete*" access="ROLE_SUPERVISOR"/>
    <sec:protect method="com.mycompany.BankManager.getBalance" access="ROLE_TELLER,ROLE_SUPERVISOR"/>
    </sec:method-security-metadata-source>
</property>
</bean>

### [](https://www.springcloud.cc/spring-security.html#aspectj)11.2.2 AspectJ（JoinPoint）安全拦截器

AspectJ安全拦截器与上一节中讨论的AOP Alliance安全拦截器非常相似。实际上，我们只讨论本节的不同之处。

AspectJ拦截器名为`AspectJSecurityInterceptor`。与AOP Alliance安全拦截器不同，后者依赖Spring应用程序上下文通过代理编织安全拦截器，`AspectJSecurityInterceptor`通过AspectJ编译器编译。在同一应用程序中使用两种类型的安全拦截器并不罕见，`AspectJSecurityInterceptor`用于域对象实例安全性，AOP Alliance `MethodSecurityInterceptor`用于服务层安全性。

我们首先考虑如何在Spring应用程序上下文中配置`AspectJSecurityInterceptor`：

<bean id="bankManagerSecurity" class=
    "org.springframework.security.access.intercept.aspectj.AspectJMethodSecurityInterceptor">
<property name="authenticationManager" ref="authenticationManager"/>
<property name="accessDecisionManager" ref="accessDecisionManager"/>
<property name="afterInvocationManager" ref="afterInvocationManager"/>
<property name="securityMetadataSource">
    <sec:method-security-metadata-source>
    <sec:protect method="com.mycompany.BankManager.delete*" access="ROLE_SUPERVISOR"/>
    <sec:protect method="com.mycompany.BankManager.getBalance" access="ROLE_TELLER,ROLE_SUPERVISOR"/>
    </sec:method-security-metadata-source>
</property>
</bean>

如您所见，除了类名，`AspectJSecurityInterceptor`与AOP Alliance安全拦截器完全相同。实际上，两个拦截器可以共享相同的`securityMetadataSource`，因为`SecurityMetadataSource`与`java.lang.reflect.Method`一起使用而不是AOP库特定的类。当然，您的访问决策可以访问相关的AOP库特定的调用（即`MethodInvocation`或`JoinPoint`），因此在进行访问决策时可以考虑一系列添加标准（例如方法参数）。

接下来，您需要定义AspectJ `aspect`。例如：

package org.springframework.security.samples.aspectj;

import org.springframework.security.access.intercept.aspectj.AspectJSecurityInterceptor;
import org.springframework.security.access.intercept.aspectj.AspectJCallback;
import org.springframework.beans.factory.InitializingBean;

public aspect DomainObjectInstanceSecurityAspect implements InitializingBean {

    private AspectJSecurityInterceptor securityInterceptor;

    pointcut domainObjectInstanceExecution(): target(PersistableEntity)
        && execution(public * *(..)) && !within(DomainObjectInstanceSecurityAspect);

    Object around(): domainObjectInstanceExecution() {
        if (this.securityInterceptor == null) {
            return proceed();
        }

        AspectJCallback callback = new AspectJCallback() {
            public Object proceedWithObject() {
                return proceed();
            }
        };

        return this.securityInterceptor.invoke(thisJoinPoint, callback);
    }

    public AspectJSecurityInterceptor getSecurityInterceptor() {
        return securityInterceptor;
    }

    public void setSecurityInterceptor(AspectJSecurityInterceptor securityInterceptor) {
        this.securityInterceptor = securityInterceptor;
    }

    public void afterPropertiesSet() throws Exception {
        if (this.securityInterceptor == null)
            throw new IllegalArgumentException("securityInterceptor required");
        }
    }
}

在上面的示例中，安全拦截器将应用于`PersistableEntity`的每个实例，这是一个未显示的抽象类（您可以使用您喜欢的任何其他类或`pointcut`表达式）。对于那些好奇的人，需要`AspectJCallback`，因为`proceed();`声明仅在`around()`体内有特殊意义。`AspectJSecurityInterceptor`在希望目标对象继续时调用此匿名`AspectJCallback`类。

您需要配置Spring以加载方面并使用`AspectJSecurityInterceptor`连接它。实现此目的的bean声明如下所示：

<bean id="domainObjectInstanceSecurityAspect"
    class="security.samples.aspectj.DomainObjectInstanceSecurityAspect"
    factory-method="aspectOf">
<property name="securityInterceptor" ref="bankManagerSecurity"/>
</bean>

而已！现在，您可以使用您认为合适的任何方式（例如`new Person();`）从应用程序中的任何位置创建bean，并且它们将应用安全拦截器。

## [](https://www.springcloud.cc/spring-security.html#el-access)11.3基于表达式的访问控制

Spring Security 3.0引入了使用Spring EL表达式作为授权机制的能力，以及之前见过的配置属性和访问决策选民的简单使用。基于表达式的访问控制建立在相同的体系结构上，但允许将复杂的布尔逻辑封装在单个表达式中。

### [](https://www.springcloud.cc/spring-security.html#overview)11.3.1概述

Spring Security使用Spring EL表达支持，如果您有兴趣更深入地理解该主题，您应该看看它是如何工作的。表达式使用“根对象”作为评估上下文的一部分进行评估。Spring Security使用web的特定类和方法安全性作为根对象，以便提供内置表达式和对诸如当前主体之类的值的访问。

#### [](https://www.springcloud.cc/spring-security.html#el-common-built-in)常见的内置表达式

表达式根对象的基类是`SecurityExpressionRoot`。这提供了web和方法安全性中可用的一些常用表达式。

[](https://www.springcloud.cc/spring-security.html#common-expressions)

**表11.1。常见的内置表达式**

|表达|描述|
|:--|:--|
|`hasRole([role])`|如果当前主体具有指定角色，则返回`true`。默认情况下，如果提供的角色不以“ROLE_”开头，则会添加该角色。这可以通过修改`DefaultWebSecurityExpressionHandler`上的`defaultRolePrefix`来自定义。|
|`hasAnyRole([role1,role2])`|如果当前主体具有任何提供的角色（以逗号分隔的字符串列表给出），则返回`true`。默认情况下，如果提供的角色不以“ROLE_”开头，则会添加该角色。这可以通过修改`DefaultWebSecurityExpressionHandler`上的`defaultRolePrefix`来自定义。|
|`hasAuthority([authority])`|如果当前主体具有指定的权限，则返回`true`。|
|`hasAnyAuthority([authority1,authority2])`|如果当前主体具有任何提供的权限（以逗号分隔的字符串列表给出），则返回`true`|
|`principal`|允许直接访问代表当前用户的主体对象|
|`authentication`|允许直接访问从`SecurityContext`获取的当前`Authentication`对象|
|`permitAll`|始终评估为`true`|
|`denyAll`|始终评估为`false`|
|`isAnonymous()`|如果当前主体是匿名用户，则返回`true`|
|`isRememberMe()`|如果当前主体是remember-me用户，则返回`true`|
|`isAuthenticated()`|如果用户不是匿名用户，则返回`true`|
|`isFullyAuthenticated()`|如果用户不是匿名用户或记住我用户，则返回`true`|
|`hasPermission(Object target, Object permission)`|如果用户有权访问给定权限的提供目标，则返回`true`。例如，`hasPermission(domainObject, 'read')`|
|`hasPermission(Object targetId, String targetType, Object permission)`|如果用户有权访问给定权限的提供目标，则返回`true`。例如，`hasPermission(1, 'com.example.domain.Message', 'read')`|

  

### [](https://www.springcloud.cc/spring-security.html#el-access-web)11.3.2 Web安全表达式

要使用表达式来保护单个URL，首先需要将`<http>`元素中的`use-expressions`属性设置为`true`。然后Spring Security将期望`<intercept-url>`元素的`access`属性包含Spring EL表达式。表达式应该计算为布尔值，定义是否允许访问。例如：

<http>
    <intercept-url pattern="/admin*"
        access="hasRole('admin') and hasIpAddress('192.168.1.0/24')"/>
    ...
</http>

在这里，我们定义了应用程序的“admin”区域（由URL模式定义）仅对具有授权权限“admin”且其IP地址与本地子网匹配的用户可用。我们已经在上一节中看到了内置的`hasRole`表达式。表达式`hasIpAddress`是一个额外的内置表达式，特定于web安全性。它由`WebSecurityExpressionRoot`类定义，其实例在评估web - 访问表达式时用作表达式根对象。此对象还直接在名称`request`下公开`HttpServletRequest`对象，因此您可以直接在表达式中调用请求。如果正在使用表达式，则`WebExpressionVoter`将添加到命名空间使用的`AccessDecisionManager`。因此，如果您不使用命名空间并且想要使用表达式，则必须在配置中添加其中一个。

#### [](https://www.springcloud.cc/spring-security.html#el-access-web-beans)参考Web安全表达式中的Bean

如果您希望扩展可用的表达式，可以轻松引用您公开的任何Spring Bean。例如，假设您有一个名为`webSecurity`的Bean，其中包含以下方法签名：

public class WebSecurity {
        public boolean check(Authentication authentication, HttpServletRequest request) {
                ...
        }
}

您可以使用以下方法引用该方法：

<http>
    <intercept-url pattern="/user/**"
        access="@webSecurity.check(authentication,request)"/>
    ...
</http>

或者在Java配置中

http
        .authorizeRequests()
                .antMatchers("/user/**").access("@webSecurity.check(authentication,request)")
                ...

#### [](https://www.springcloud.cc/spring-security.html#el-access-web-path-variables)Web安全表达式中的路径变量

有时能够引用URL中的路径变量很好。例如，考虑一个RESTful应用程序，它以`/user/{userId}`格式从URL路径中按ID查找用户。

您可以通过将路径变量放在模式中来轻松引用它。例如，如果您的Bean名称为`webSecurity`，则包含以下方法签名：

public class WebSecurity {
        public boolean checkUserId(Authentication authentication, int id) {
                ...
        }
}

您可以使用以下方法引用该方法：

<http>
    <intercept-url pattern="/user/{userId}/**"
        access="@webSecurity.checkUserId(authentication,#userId)"/>
    ...
</http>

或者在Java配置中

http
        .authorizeRequests()
                .antMatchers("/user/{userId}/**").access("@webSecurity.checkUserId(authentication,#userId)")
                ...

在两种配置中，匹配的URL都会将路径变量（并将其转换为）传递给checkUserId方法。例如，如果网址为`/user/123/resource`，则传入的ID为`123`。

### [](https://www.springcloud.cc/spring-security.html#method-security-expressions)11.3.3方法安全表达式

方法安全性比简单的允许或拒绝规则稍微复杂一些。Spring Security 3.0引入了一些新的注释，以便全面支持表达式的使用。

#### [](https://www.springcloud.cc/spring-security.html#el-pre-post-annotations)@Pre和@Post Annotations

有四个注释支持表达式属性，以允许调用前和调用后授权检查，还支持过滤提交的集合参数或返回值。它们是`@PreAuthorize`，`@PreFilter`，`@PostAuthorize`和`@PostFilter`。它们的使用是通过`global-method-security`命名空间元素启用的：

<global-method-security pre-post-annotations="enabled"/>

##### [](https://www.springcloud.cc/spring-security.html#access-control-using-preauthorize-and-postauthorize)使用@PreAuthorize和@PostAuthorize进行访问控制

最明显有用的注释是`@PreAuthorize`，它决定了是否可以实际调用方法。例如（来自“Contacts”示例应用程序）

_@PreAuthorize("hasRole('USER')")_
public void create(Contact contact);

这意味着只有角色为“ROLE_USER”的用户才能访问。显然，使用传统配置和所需角色的简单配置属性可以轻松实现相同的目标。但是关于：

_@PreAuthorize("hasPermission(#contact, 'admin')")_
public void deletePermission(Contact contact, Sid recipient, Permission permission);

这里我们实际上使用方法参数作为表达式的一部分来决定当前用户是否具有给定联系人的“admin”权限。内置的`hasPermission()`表达式通过应用程序上下文链接到Spring Security ACL模块，我们将[在下面看到](https://www.springcloud.cc/spring-security.html#el-permission-evaluator "PermissionEvaluator接口")。您可以按名称访问任何方法参数作为表达式变量。

Spring Security可以通过多种方式解析方法参数。Spring Security使用`DefaultSecurityParameterNameDiscoverer`来发现参数名称。默认情况下，对整个方法尝试以下选项。

- 如果Spring Security的`@P`注释出现在方法的单个参数上，则将使用该值。这对于使用JDK 8之前的JDK编译的接口非常有用，它不包含有关参数名称的任何信息。例如：
    
    import org.springframework.security.access.method.P;
    
    ...
    
    _@PreAuthorize("#c.name == authentication.name")_
    public void doSomething(_@P("c")_ Contact contact);
    
    在幕后使用`AnnotationParameterNameDiscoverer`实现了这种用法，可以对其进行自定义以支持任何指定注释的value属性。
    
- 如果Spring Data的`@Param`注释出现在方法的至少一个参数上，则将使用该值。这对于使用JDK 8之前的JDK编译的接口非常有用，它不包含有关参数名称的任何信息。例如：
    
    import org.springframework.data.repository.query.Param;
    
    ...
    
    _@PreAuthorize("#n == authentication.name")_
    Contact findContactByName(_@Param("n")_ String name);
    
    在幕后使用`AnnotationParameterNameDiscoverer`实现了这种用法，可以对其进行自定义以支持任何指定注释的value属性。
    
- 如果使用JDK 8来编译带有-parameters参数的源并且正在使用Spring 4+，则使用标准JDK反射API来发现参数名称。这适用于类和接口。
- 最后，如果使用调试符号编译代码，则将使用调试符号发现参数名称。这对接口不起作用，因为它们没有关于参数名称的调试信息。对于接口，必须使用注释或JDK 8方法。

表达式中提供了任何Spring - EL功能，因此您还可以访问参数的属性。例如，如果您希望某个特定方法仅允许访问其用户名与联系人的用户名匹配的用户，则可以编写

_@PreAuthorize("#contact.name == authentication.name")_
public void doSomething(Contact contact);

这里我们访问另一个内置表达式`authentication`，它是存储在安全上下文中的`Authentication`。您还可以使用表达式`principal`直接访问其“principal”属性。该值通常为`UserDetails`实例，因此您可以使用`principal.username`或`principal.enabled`之类的表达式。

不太常见的是，您可能希望在调用方法后执行访问控制检查。这可以使用`@PostAuthorize`注释来实现。要从方法访问返回值，请在表达式中使用内置名称`returnObject`。

##### [](https://www.springcloud.cc/spring-security.html#filtering-using-prefilter-and-postfilter)使用@PreFilter和@PostFilter进行过滤

您可能已经意识到，Spring Security支持对集合和数组进行过滤，现在可以使用表达式实现。这通常是在方法的返回值上执行的。例如：

_@PreAuthorize("hasRole('USER')")_
_@PostFilter("hasPermission(filterObject, 'read') or hasPermission(filterObject, 'admin')")_
public List<Contact> getAll();

使用`@PostFilter`注释时，Spring Security遍历返回的集合并删除所提供的表达式为false的所有元素。名称`filterObject`指的是集合中的当前对象。您也可以在方法调用之前使用`@PreFilter`进行过滤，尽管这是一个不太常见的要求。语法是一样的，但是如果有多个参数是集合类型，那么您必须使用此批注的`filterTarget`属性按名称选择一个。

请注意，过滤显然不能替代调整数据检索查询。如果您要过滤大型集合并删除许多条目，那么这可能效率低下。

#### [](https://www.springcloud.cc/spring-security.html#el-method-built-in)内置表达式

有一些特定于方法安全性的内置表达式，我们已经在上面使用过了。`filterTarget`和`returnValue`值很简单，但使用`hasPermission()`表达式需要仔细研究。

##### [](https://www.springcloud.cc/spring-security.html#el-permission-evaluator)PermissionEvaluator接口

`hasPermission()`表达式被委托给`PermissionEvaluator`的实例。它旨在桥接表达式系统和Spring Security的ACL系统，允许您根据抽象权限指定域对象的授权约束。它没有对ACL模块的明确依赖性，因此如果需要，您可以将其交换为替代实现。界面有两种方法：

boolean hasPermission(Authentication authentication, Object targetDomainObject,
                            Object permission);

boolean hasPermission(Authentication authentication, Serializable targetId,
                            String targetType, Object permission);

它直接映射到表达式的可用版本，但不提供第一个参数（`Authentication`对象）。第一种用于已经加载了对其进行访问的域对象的情况。然后，如果当前用户具有该对象的给定权限，则表达式将返回true。第二个版本用于未加载对象但其标识符已知的情况。还需要域对象的抽象“类型”说明符，允许加载正确的ACL权限。传统上这是对象的Java类，但不一定只要与权限的加载方式一致。

要使用`hasPermission()`表达式，您必须在应用程序上下文中显式配置`PermissionEvaluator`。这看起来像这样：

<security:global-method-security pre-post-annotations="enabled">
<security:expression-handler ref="expressionHandler"/>
</security:global-method-security>

<bean id="expressionHandler" class=
"org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler">
    <property name="permissionEvaluator" ref="myPermissionEvaluator"/>
</bean>

其中`myPermissionEvaluator`是实现`PermissionEvaluator`的bean。通常这将是ACL模块的实现，称为`AclPermissionEvaluator`。有关详细信息，请参阅“联系人”示例应用程序配置。

##### [](https://www.springcloud.cc/spring-security.html#method-security-meta-annotations)方法安全元注释

您可以将元注释用于方法安全性，以使您的代码更具可读性。如果您发现在整个代码库中重复使用相同的复杂表达式，这将非常方便。例如，请考虑以下事项：

@PreAuthorize("#contact.name == authentication.name")

我们可以创建一个可以替代使用的元注释，而不是在任何地方重复这一点。

_@Retention(RetentionPolicy.RUNTIME)_
_@PreAuthorize("#contact.name == authentication.name")_
public _@interface_ ContactPermission {}

元注释可用于任何Spring Security方法安全注释。为了保持符合规范，JSR-250注释不支持元注释。

## [](https://www.springcloud.cc/spring-security.html#advanced-topics)12.其他主题

在本部分中，我们将介绍需要了解前面章节的功能以及框架中一些更高级和不太常用的功能。

## [](https://www.springcloud.cc/spring-security.html#domain-acls)12.1域对象安全性（ACL）

### [](https://www.springcloud.cc/spring-security.html#domain-acls-overview)12.1.1概述

复杂的应用程序通常会发现需要定义访问权限，而不仅仅是在web请求或方法调用级别。相反，安全决策需要包括谁（`Authentication`），哪里（`MethodInvocation`）和什么（`SomeDomainObject`）。换句话说，授权决策还需要考虑方法调用的实际域对象实例主题。

想象一下，您正在为宠物诊所设计应用程序。基于Spring的应用程序将有两个主要用户组：宠物诊所的工作人员以及宠物诊所的客户。员工可以访问所有数据，而您的客户只能看到自己的客户记录。为了使它更有趣，您的客户可以允许其他用户查看他们的客户记录，例如他们的“幼儿学前”导师或他们当地的“小马俱乐部”的总裁。使用Spring Security作为基础，您可以使用以下几种方法：

- 编写业务方法以强制执行安全性。您可以查询`Customer`域对象实例中的集合，以确定哪些用户可以访问。通过使用`SecurityContextHolder.getContext().getAuthentication()`，您将能够访问`Authentication`对象。
- 编写`AccessDecisionVoter`以强制执行`Authentication`对象中存储的`GrantedAuthority[]`安全性。这意味着您的`AuthenticationManager`需要填充`Authentication`，其中自定义`GrantedAuthority[]`代表委托人可以访问的每个`Customer`域对象实例。
- 编写`AccessDecisionVoter`以强制执行安全性并直接打开目标`Customer`域对象。这意味着您的选民需要访问允许其检索`Customer`对象的DAO。然后，它将访问`Customer`对象的已批准用户集合并做出适当的决定。

这些方法中的每一种都是完全合法的。但是，第一个将您的授权检查与您的业务代码相结合。这方面的主要问题包括增加了单元测试的难度，以及在其他地方重用`Customer`授权逻辑会更加困难。从`Authentication`对象获取`GrantedAuthority[]` s也没问题，但不会扩展到大量的`Customer` s。如果一个用户可能能够访问5,000 `Customer` s（在这种情况下不太可能，但想象一下它是一个大型小马俱乐部的流行兽医！）消耗的内存量和构建`Authentication`所需的时间对象是不受欢迎的。直接从外部代码打开`Customer`的最终方法可能是三者中最好的。它实现了关注点的分离，并且不会滥用内存或CPU周期，但它仍然是低效的，因为`AccessDecisionVoter`和最终的业务方法本身都会执行对负责检索`Customer`的DAO的调用宾语。每个方法调用两次访问显然是不可取的。此外，列出的每种方法都需要从头开始编写自己的访问控制列表（ACL）持久性和业务逻辑。

幸运的是，还有另一种选择，我们将在下面讨论。

### [](https://www.springcloud.cc/spring-security.html#domain-acls-key-concepts)12.1.2关键概念

Spring Security的ACL服务在`spring-security-acl-xxx.jar`中发布。您需要将此JAR添加到类路径中以使用Spring Security的域对象实例安全功能。

Spring Security的域对象实例安全功能以访问控制列表（ACL）的概念为中心。系统中的每个域对象实例都有自己的ACL，ACL会记录谁可以和不能使用该域对象的详细信息。考虑到这一点，Spring Security为您的应用程序提供了三个与ACL相关的主要功能：

- 一种有效检索所有域对象的ACL条目（以及修改这些ACL）的方法
- 在调用方法之前，允许确保给定主体使用对象的方法
- 在调用方法之后，允许确保给定主体的方法与您的对象（或它们返回的东西）一起工作

如第一个要点所示，Spring Security ACL模块的主要功能之一是提供检索ACL的高性能方法。此ACL存储库功能非常重要，因为系统中的每个域对象实例可能具有多个访问控制条目，并且每个ACL可能从树状结构中的其他ACL继承（这通过{支持开箱即用） 1 /}，并且非常常用）。Spring Security的ACL功能经过精心设计，可提供ACL的高性能检索，以及可插拔缓存，最小化数据库更新死锁，独立于ORM框架（我们直接使用JDBC），正确封装和透明数据库更新。

鉴于数据库是ACL模块操作的核心，让我们探讨在实现中默认使用的四个主表。下表按典型Spring Security ACL部署中的大小顺序列出，最后列出的行数最多：

- ACL_SID允许我们唯一地标识系统中的任何主体或权限（“SID”代表“安全身份”）。唯一的列是ID，SID的文本表示，以及指示文本表示是指主体名称还是`GrantedAuthority`的标志。因此，每个唯一主体或`GrantedAuthority`都有一行。当在接收许可的上下文中使用时，SID通常被称为“接收者”。
- ACL_CLASS允许我们唯一地标识系统中的任何域对象类。唯一的列是ID和Java类名。因此，对于我们希望存储ACL权限的每个唯一类，只有一行。
- ACL_OBJECT_IDENTITY存储系统中每个唯一域对象实例的信息。列包括ID，ACL_CLASS表的外键，唯一标识符，因此我们知道我们为哪个ACL_CLASS实例提供信息，父，ACL_SID表的外键表示域对象实例的所有者，以及是否允许ACL条目从任何父ACL继承。对于我们存储ACL权限的每个域对象实例，我们只有一行。
- 最后，ACL_ENTRY存储分配给每个收件人的各个权限。列包括ACL_OBJECT_IDENTITY的外键，收件人（即ACL_SID的外键），是否要审核，以及表示授予或拒绝实际权限的整数位掩码。对于每个收到使用域对象的权限的收件人，我们都有一行。

如上一段所述，ACL系统使用整数位屏蔽。不用担心，你不需要知道使用ACL系统的位移的更好点，但足以说我们有32位可以打开或关闭。这些位中的每一个都代表一个权限，默认情况下，读取权限（位0），写入（位1），创建（位2），删除（位3）和管理（位4）。如果您希望使用其他权限，则很容易实现您自己的`Permission`实例，并且ACL框架的其余部分将在不知道您的扩展的情况下运行。

重要的是要理解系统中域对象的数量与我们选择使用整数位屏蔽的事实完全没有关系。虽然您有32位可用于权限，但您可能拥有数十亿个域对象实例（这意味着ACL_OBJECT_IDENTITY中的数十亿行，很可能是ACL_ENTRY）。我们提出这一点是因为我们发现有时人们错误地认为他们需要为每个潜在的域对象提供一点点，但事实并非如此。

现在我们已经提供了ACL系统的基本概述，以及它在表结构中的样子，让我们来探索关键接口。关键接口是：

- `Acl`：每个域对象都有一个且只有一个`Acl`对象，它在内部保存`AccessControlEntry`并且知道`Acl`的所有者。Acl不直接引用域对象，而是引用`ObjectIdentity`。`Acl`存储在ACL_OBJECT_IDENTITY表中。
- `AccessControlEntry`：`Acl`拥有多个`AccessControlEntry`，在框架中通常缩写为ACE。每个ACE指的是`Permission`，`Sid`和`Acl`的特定元组。ACE还可以授予或不授予并包含审核设置。ACE存储在ACL_ENTRY表中。
- `Permission`：权限表示特定的不可变位掩码，并为位屏蔽和输出信息提供便利功能。上面给出的基本权限（位0到4）包含在`BasePermission`类中。
- `Sid`：ACL模块需要引用主体和`GrantedAuthority[]`。`Sid`接口提供了间接级别，它是“安全标识”的缩写。常用类包括`PrincipalSid`（代表`Authentication`对象内的主体）和`GrantedAuthoritySid`。安全标识信息存储在ACL_SID表中​​。
- `ObjectIdentity`：每个域对象在ACL模块内部由`ObjectIdentity`表示。默认实现称为`ObjectIdentityImpl`。
- `AclService`：检索适用于给定`ObjectIdentity`的`Acl`。在包含的实现（`JdbcAclService`）中，检索操作被委托给`LookupStrategy`。`LookupStrategy`提供了一种高度优化的策略，用于检索ACL信息，使用批量检索`(BasicLookupStrategy`）并支持利用物化视图，分层查询和类似的以性能为中心的非ANSI SQL功能的自定义实现。
- `MutableAclService`：允许修改后的`Acl`表示持久性。如果您不希望，则不必使用此界面。

请注意，我们开箱即用的AclService和相关数据库类都使用ANSI SQL。因此，这应该适用于所有主要数据库。在撰写本文时，系统已使用Hypersonic SQL，PostgreSQL，Microsoft SQL Server和Oracle成功进行了测试。

两个样本附带Spring Security，用于演示ACL模块。第一个是Contacts Sample，另一个是Document Management System（DMS）Sample。我们建议您查看这些示例。

### [](https://www.springcloud.cc/spring-security.html#domain-acls-getting-started)12.1.3入门

要开始使用Spring Security的ACL功能，您需要将ACL信息存储在某处。这需要使用Spring实例化`DataSource`。然后将`DataSource`注入`JdbcMutableAclService`和`BasicLookupStrategy`实例。后者提供高性能的ACL检索功能，前者提供了mutator功能。有关示例配置，请参阅Spring Security附带的其中一个示例。您还需要使用上一节中列出的四个特定于ACL的表填充数据库（请参阅相应SQL语句的ACL示例）。

一旦您创建了所需的模式并实例化`JdbcMutableAclService`，您接下来需要确保您的域模型支持与Spring Security ACL包的互操作性。希望`ObjectIdentityImpl`证明是足够的，因为它提供了许多可以使用它的方法。大多数人都会拥有包含`public Serializable getId()`方法的域对象。如果返回类型很长或与long兼容（例如int），您将发现无需进一步考虑`ObjectIdentity`问题。ACL模块的许多部分都依赖于长标识符。如果你没有使用long（或int，byte等），你很有可能需要重新实现一些类。我们不打算在Spring Security的ACL模块中支持非长标识符，因为long已经与所有数据库序列（最常见的标识符数据类型）兼容，并且足够长以适应所有常见的使用场景。

以下代码片段显示了如何创建`Acl`或修改现有的`Acl`：

// Prepare the information we'd like in our access control entry (ACE)
ObjectIdentity oi = new ObjectIdentityImpl(Foo.class, new Long(44));
Sid sid = new PrincipalSid("Samantha");
Permission p = BasePermission.ADMINISTRATION;

// Create or update the relevant ACL
MutableAcl acl = null;
try {
acl = (MutableAcl) aclService.readAclById(oi);
} catch (NotFoundException nfe) {
acl = aclService.createAcl(oi);
}

// Now grant some permissions via an access control entry (ACE)
acl.insertAce(acl.getEntries().length, p, sid, true);
aclService.updateAcl(acl);

在上面的示例中，我们检索与标识号为44的“Foo”域对象关联的ACL。然后我们添加一个ACE，以便名为“Samantha”的主体可以“管理”该对象。除了insertAce方法之外，代码片段相对不言自明。insertAce方法的第一个参数是确定将在Acl中的哪个位置插入新条目。在上面的示例中，我们只是将新ACE放在现有ACE的末尾。最后一个参数是一个布尔值，表示ACE是授予还是拒绝。大部分时间它将授予（true），但如果它拒绝（false），则权限被有效阻止。

Spring Security没有提供任何特殊集成来自动创建，更新或删除ACL作为DAO或存储库操作的一部分。相反，您需要为您的各个域对象编写如上所示的代码。值得考虑在服务层使用AOP来自动将ACL信息与服务层操作集成。我们在过去发现了这种非常有效的方法。

一旦您使用上述技术在数据库中存储一些ACL信息，下一步就是实际使用ACL信息作为授权决策逻辑的一部分。你在这里有很多选择。您可以编写自己的`AccessDecisionVoter`或`AfterInvocationProvider`，分别在方法调用之前或之后触发。这些类将使用`AclService`来检索相关的ACL，然后调用`Acl.isGranted(Permission[] permission, Sid[] sids, boolean administrativeMode)`来决定是授予还是拒绝许可。或者，您可以使用我们的`AclEntryVoter`，`AclEntryAfterInvocationProvider`或`AclEntryAfterInvocationCollectionFilteringProvider`类。所有这些类都提供了一种基于声明的方法，用于在运行时评估ACL信息，从而使您无需编写任何代码。请参阅示例应用程序以了解如何使用这些类。

## [](https://www.springcloud.cc/spring-security.html#preauth)12.2预认证方案

在某些情况下，您希望使用Spring Security进行授权，但在访问应用程序之前，某些外部系统已经对用户进行了可靠的身份验证。我们将这些情况称为“预先验证”的情景。示例包括X.509，Siteminder以及运行应用程序的Java EE容器的身份验证。使用预身份验证时，Spring Security必须使用

- 确定发出请求的用户。
- 获取用户的权限。

细节将取决于外部认证机制。在X.509的情况下，可以通过其证书信息来标识用户，或者在Siteminder的情况下通过HTTP请求标头来标识用户。如果依赖于容器身份验证，则将通过在传入HTTP请求上调用`getUserPrincipal()`方法来标识用户。在某些情况下，外部机制可以为用户提供角色/权限信息，但在其他情况下，必须从单独的源（例如`UserDetailsService`）获取权限。

### [](https://www.springcloud.cc/spring-security.html#pre-authentication-framework-classes)12.2.1预认证框架类

由于大多数预身份验证机制遵循相同的模式，Spring Security具有一组类，这些类为实现预先验证的身份验证提供程序提供了内部框架。这消除了重复，并允许以结构化方式添加新实现，而无需从头开始编写所有内容。如果您想使用[X.509身份验证之](https://www.springcloud.cc/spring-security.html#x509 "13.8 X.509认证")类的东西，则无需了解这些类，因为它已经具有更易于使用和开始使用的命名空间配置选项。如果您需要使用显式bean配置或计划编写自己的实现，那么了解所提供的实现如何工作将是有用的。您将在`org.springframework.security.web.authentication.preauth`下找到课程。我们只是在这里提供一个大纲，所以你应该在适当的时候咨询Javadoc和来源。

#### [](https://www.springcloud.cc/spring-security.html#abstractpreauthenticatedprocessingfilter)AbstractPreAuthenticatedProcessingFilter

此类将检查安全上下文的当前内容，如果为空，它将尝试从HTTP请求中提取用户信息并将其提交到`AuthenticationManager`。子类重写以下方法以获取此信息：

protected abstract Object getPreAuthenticatedPrincipal(HttpServletRequest request);

protected abstract Object getPreAuthenticatedCredentials(HttpServletRequest request);

调用这些后，过滤器将创建一个包含返回数据的`PreAuthenticatedAuthenticationToken`并提交以进行身份​​验证。通过这里的“身份验证”，我们实际上只是意味着可能会加载用户权限的进一步处理，但遵循标准的Spring Security身份验证体系结构。

与其他Spring Security身份验证过滤器一样，预身份验证过滤器具有`authenticationDetailsSource`属性，默认情况下会创建一个`WebAuthenticationDetails`对象来存储其他信息，例如{4中的会话标识符和原始IP地址/ `Authentication`对象的属性。在可以从预认证机制获得用户角色信息的情况下，数据也存储在该属性中，其中详细信息实现了`GrantedAuthoritiesContainer`接口。这使身份验证提供程序能够读取外部分配给用户的权限。接下来我们将看一个具体的例子。

##### [](https://www.springcloud.cc/spring-security.html#j2ee-preauth-details)J2eeBasedPreAuthenticatedWebAuthenticationDetailsS​​ource

如果过滤器配置了`authenticationDetailsSource`（此类的实例），则通过为每个预定义的“可映射角色”调用`isUserInRole(String role)`方法来获取权限信息。该类从配置的`MappableAttributesRetriever`中获取这些内容。可能的实现包括在应用程序上下文中对列表进行硬编码，以及从`web.xml`文件中的`<security-role>`信息中读取角色信息。预认证示例应用程序使用后一种方法。

还有一个额外阶段，使用配置的`Attributes2GrantedAuthoritiesMapper`将角色（或属性）映射到Spring Security `GrantedAuthority`对象。默认情况下，只会在名称中添加通常的`ROLE_`前缀，但它可以让您完全控制行为。

#### [](https://www.springcloud.cc/spring-security.html#preauthenticatedauthenticationprovider)PreAuthenticatedAuthenticationProvider

预先认证的提供程序除了为用户加载`UserDetails`对象之外，还有更多工作要做。它通过委托给`AuthenticationUserDetailsService`来做到这一点。后者类似于标准`UserDetailsService`，但是采用`Authentication`对象而不仅仅是用户名：

public interface AuthenticationUserDetailsService {
    UserDetails loadUserDetails(Authentication token) throws UsernameNotFoundException;
}

此接口可能还有其他用途，但通过预身份验证，它允许访问打包在`Authentication`对象中的权限，正如我们在上一节中看到的那样。`PreAuthenticatedGrantedAuthoritiesUserDetailsService`类就是这样做的。或者，它可以通过`UserDetailsByNameServiceWrapper`实施委托给标准`UserDetailsService`。

#### [](https://www.springcloud.cc/spring-security.html#http403forbiddenentrypoint)Http403ForbiddenEntryPoint

`AuthenticationEntryPoint`在[技术概述](https://www.springcloud.cc/spring-security.html#tech-intro-auth-entry-point "的AuthenticationEntryPoint")章节中进行了讨论。通常，它负责启动未经身份验证的用户的身份验证过程（当他们尝试访问受保护的资源时），但在预先验证的情况下，这不适用。如果您没有将预身份验证与其他身份验证机制结合使用，则只能使用此类的实例配置`ExceptionTranslationFilter`。如果用户被`AbstractPreAuthenticatedProcessingFilter`拒绝，则会调用它，从而导致空认证。如果被调用，它总是返回`403` - 禁止的响应代码。

### [](https://www.springcloud.cc/spring-security.html#concrete-implementations)12.2.2具体实施

X.509身份验证在其[自己的章节中介绍](https://www.springcloud.cc/spring-security.html#x509 "13.8 X.509认证")。在这里，我们将介绍一些为其他预先验证的方案提供支持的类。

#### [](https://www.springcloud.cc/spring-security.html#request-header-authentication-siteminder)请求标头身份验证（Siteminder）

外部认证系统可以通过在HTTP请求上设置特定报头来向应用程序提供信息。一个众所周知的例子是Siteminder，它在名为`SM_USER`的标题中传递用户名。类`RequestHeaderAuthenticationFilter`支持此机制，它只是从标头中提取用户名。它默认使用名称`SM_USER`作为标题名称。有关更多详细信息，请参阅Javadoc。

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|请注意，在使用这样的系统时，框架根本不执行任何身份验证检查，外部系统配置正确并保护对应用程序的所有访问权限_非常_重要。如果攻击者能够在未检测到原始请求的情况下伪造标头，那么他们可能会选择他们希望的任何用户名。|

##### [](https://www.springcloud.cc/spring-security.html#siteminder-example-configuration)Siteminder示例配置

使用此过滤器的典型配置如下所示：

<security:http>
<!-- Additional http configuration omitted -->
<security:custom-filter position="PRE_AUTH_FILTER" ref="siteminderFilter" />
</security:http>

<bean id="siteminderFilter" class="org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter">
<property name="principalRequestHeader" value="SM_USER"/>
<property name="authenticationManager" ref="authenticationManager" />
</bean>

<bean id="preauthAuthProvider" class="org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider">
<property name="preAuthenticatedUserDetailsService">
    <bean id="userDetailsServiceWrapper"
        class="org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper">
    <property name="userDetailsService" ref="userDetailsService"/>
    </bean>
</property>
</bean>

<security:authentication-manager alias="authenticationManager">
<security:authentication-provider ref="preauthAuthProvider" />
</security:authentication-manager>

我们假设[安全命名空间](https://www.springcloud.cc/spring-security.html#ns-config "7.安全命名空间配置")用于配置。还假设您已在配置中添加了`UserDetailsService`（称为“userDetailsS​​ervice”）以加载用户的角色。

#### [](https://www.springcloud.cc/spring-security.html#java-ee-container-authentication)Java EE容器身份验证

类`J2eePreAuthenticatedProcessingFilter`将从`HttpServletRequest`的`userPrincipal`属性中提取用户名。使用此过滤器通常与Java EE角色的使用相结合，如上文[“J2eeBasedPreAuthenticatedWebAuthenticationDetailsS​​ource”一节](https://www.springcloud.cc/spring-security.html#j2ee-preauth-details "J2eeBasedPreAuthenticatedWebAuthenticationDetailsS​​ource")中[所述](https://www.springcloud.cc/spring-security.html#j2ee-preauth-details "J2eeBasedPreAuthenticatedWebAuthenticationDetailsSource")。

代码库中有一个使用这种方法的示例应用程序，因此如果您感兴趣，请从github获取代码并查看应用程序上下文文件。代码位于`samples/xml/preauth`目录中。

## [](https://www.springcloud.cc/spring-security.html#ldap)12.3 LDAP认证

### [](https://www.springcloud.cc/spring-security.html#ldap-overview)12.3.1概述

组织经常将LDAP用作用户信息和身份验证服务的中央存储库。它还可用于存储应用程序用户的角色信息。

关于如何配置LDAP服务器有许多不同的方案，因此Spring Security的LDAP提供程序是完全可配置的。它使用单独的策略接口进行身份验证和角色检索，并提供可配置为处理各种情况的默认实现。

在尝试将其与Spring Security一起使用之前，您应该熟悉LDAP。以下链接提供了对所涉及概念的良好介绍，以及使用免费LDAP服务器OpenLDAP设置目录的指南：[http](http://www.zytrax.com/books/ldap/)：[//www.zytrax.com/books/ldap/](http://www.zytrax.com/books/ldap/)。熟悉用于从Java访问LDAP的JNDI API也可能很有用。我们不在LDAP提供程序中使用任何第三方LDAP库（Mozilla，JLDAP等），但是大量使用Spring LDAP，因此如果您计划添加您的项目，那么熟悉该项目可能会很有用自己的自定义。

使用LDAP身份验证时，务必确保正确配置LDAP连接池。如果您不熟悉如何执行此操作，可以参考[Java LDAP文档](https://docs.oracle.com/javase/jndi/tutorial/ldap/connect/config.html)。

### [](https://www.springcloud.cc/spring-security.html#using-ldap-with-spring-security)12.3.2使用LDAP和Spring Security

Spring Security中的LDAP身份验证大致可分为以下几个阶段。

- 从登录名中获取唯一的LDAP“专有名称”或DN。这通常意味着在目录中执行搜索，除非事先知道用户名到DN的确切映射。因此，用户在登录时可能会输入名称“joe”，但用于向LDAP进行身份验证的实际名称将是完整的DN，例如`uid=joe,ou=users,dc=spring,dc=io`。
- 通过“绑定”该用户或通过对DN的目录条目中的密码属性执行用户密码的远程“比较”操作来验证用户。
- 加载用户的权限列表。

例外情况是，LDAP目录仅用于检索用户信息并在本地对其进行身份验证。这可能是不可能的，因为目录通常设置为对用户密码等属性的读访问权限有限。

我们将在下面介绍一些配置方案。有关可用配置选项的完整信息，请参阅安全命名空间架构（XML编辑器中应提供的信息）。

### [](https://www.springcloud.cc/spring-security.html#ldap-server)12.3.3配置LDAP服务器

您需要做的第一件事是配置应该进行身份验证的服务器。这是使用安全命名空间中的`<ldap-server>`元素完成的。可以使用`url`属性将其配置为指向外部LDAP服务器：

<ldap-server url="ldap://springframework.org:389/dc=springframework,dc=org" />

#### [](https://www.springcloud.cc/spring-security.html#using-an-embedded-test-server)使用嵌入式测试服务器

`<ldap-server>`元素也可用于创建嵌入式服务器，这对测试和演示非常有用。在这种情况下，您使用它而不使用`url`属性：

<ldap-server root="dc=springframework,dc=org"/>

这里我们已经指定目录的根DIT应该是“dc = springframework，dc = org”，这是默认值。使用这种方式，命名空间解析器将创建一个嵌入式Apache Directory服务器，并扫描类路径中的任何LDIF文件，它将尝试加载到服务器中。您可以使用`ldif`属性自定义此行为，该属性定义要加载的LDIF资源：

<ldap-server ldif="classpath:users.ldif" />

这使得启动和运行LDAP变得更加容易，因为使用外部服务器一直工作会很不方便。它还使用户免受连接Apache Directory服务器所需的复杂bean配置的影响。使用普通Spring Bean，配置会更加混乱。您必须具有可供应用程序使用的必需Apache Directory依赖项jar。这些可以从LDAP示例应用程序获得。

#### [](https://www.springcloud.cc/spring-security.html#using-bind-authentication)使用绑定身份验证

这是最常见的LDAP身份验证方案。

<ldap-authentication-provider user-dn-pattern="uid={0},ou=people"/>

这个简单的示例将通过替换提供的模式中的用户登录名并尝试使用登录密码绑定该用户来获取用户的DN。如果所有用户都存储在目录中的单个节点下，则可以。如果您希望配置LDAP搜索过滤器以找到用户，则可以使用以下内容：

<ldap-authentication-provider user-search-filter="(uid={0})"
    user-search-base="ou=people"/>

如果与上面的服务器定义一起使用，这将使用`user-search-filter`属性的值作为过滤器在DN `ou=people,dc=springframework,dc=org`下执行搜索。同样，用户登录名将替换过滤器名称中的参数，因此它将搜索`uid`属性等于用户名的条目。如果未提供`user-search-base`，则将从根执行搜索。

#### [](https://www.springcloud.cc/spring-security.html#loading-authorities)加载机构

如何从LDAP目录中的组加载权限由以下属性控制。

- `group-search-base`.定义应在其下执行组搜索的目录树的一部分。
- `group-role-attribute`.包含组条目定义的权限名称的属性。默认为`cn`
- `group-search-filter`.用于搜索组成员身份的过滤器。默认值为`uniqueMember={0}`，对应于`groupOfUniqueNames` LDAP类[[19]](https://www.springcloud.cc/spring-security.html#ftn.d5e5849)。在这种情况下，替换参数是用户的完整可分辨名称。如果要筛选登录名，可以使用参数`{1}`。

所以如果我们使用以下配置

<ldap-authentication-provider user-dn-pattern="uid={0},ou=people"
        group-search-base="ou=groups" />

并且成功验证为用户“ben”，随后的权限加载将在目录条目`ou=groups,dc=springframework,dc=org`下执行搜索，查找包含值为`uid=ben,ou=people,dc=springframework,dc=org`的属性`uniqueMember`的条目。默认情况下，权限名称前缀为`ROLE_`。您可以使用`role-prefix`属性更改此设置。如果您不想要任何前缀，请使用`role-prefix="none"`。有关加载权限的更多信息，请参阅`DefaultLdapAuthoritiesPopulator`类的Javadoc。

### [](https://www.springcloud.cc/spring-security.html#implementation-classes)12.3.4实现类

我们上面使用的命名空间配置选项易于使用，并且比明确使用Spring bean更简洁。在某些情况下，您可能需要知道如何在应用程序上下文中直接配置Spring Security LDAP。例如，您可能希望自定义某些类的行为。如果您对使用命名空间配置感到满意，那么您可以跳过本节和下一节。

主要的LDAP提供程序类`LdapAuthenticationProvider`实际上并没有做太多的事情，而是将工作委托给另外两个bean，`LdapAuthenticator`和`LdapAuthoritiesPopulator`，它们负责验证用户身份并检索用户的集合分别为`GrantedAuthority` s。

#### [](https://www.springcloud.cc/spring-security.html#ldap-ldap-authenticators)LdapAuthenticator实现

验证者还负责检索任何所需的用户属性。这是因为属性的权限可能取决于所使用的身份验证的类型。例如，如果以用户身份进行绑定，则可能需要使用用户自己的权限来读取它们。

目前有Spring Security提供的两种身份验证策略：

- 直接向LDAP服务器进行身份验证（“绑定”身份验证）。
- 密码比较，其中将用户提供的密码与存储库中存储的密码进行比较。这可以通过检索密码属性的值并在本地检查它或通过执行LDAP“比较”操作来完成，其中提供的密码被传递到服务器以进行比较，并且永远不会检索真实密码值。

##### [](https://www.springcloud.cc/spring-security.html#ldap-ldap-authenticators-common)共同功能

在可以对用户进行身份验证之前（通过任一策略），必须从提供给应用程序的登录名获取可分辨名称（DN）。这可以通过简单的模式匹配（通过设置`setUserDnPatterns`数组属性）或通过设置`userSearch`属性来完成。对于DN模式匹配方法，使用标准Java模式格式，并且登录名将替换参数`{0}`。该模式应该相对于配置的`SpringSecurityContextSource`将绑定到的DN（有关此信息的更多信息，请参阅有关[连接到LDAP服务器](https://www.springcloud.cc/spring-security.html#ldap-context-source "连接到LDAP服务器")的部分）。例如，如果您使用的URL服务器的URL为`ldap://monkeymachine.co.uk/dc=springframework,dc=org`，模式为`uid={0},ou=greatapes`，那么登录名“gorilla”将映射到DN `uid=gorilla,ou=greatapes,dc=springframework,dc=org`。将依次尝试每个配置的DN模式，直到找到匹配项。有关使用搜索的信息，请参阅下面的[搜索对象](https://www.springcloud.cc/spring-security.html#ldap-searchobjects "LDAP搜索对象")部分。也可以使用这两种方法的组合 - 首先检查模式，如果没有找到匹配的DN，将使用搜索。

##### [](https://www.springcloud.cc/spring-security.html#ldap-ldap-authenticators-bind)认证者

包`org.springframework.security.ldap.authentication`中的类`BindAuthenticator`实现了绑定认证策略。它只是尝试以用户身份绑定。

##### [](https://www.springcloud.cc/spring-security.html#ldap-ldap-authenticators-password)PasswordComparisonAuthenticator

类`PasswordComparisonAuthenticator`实现密码比较身份验证策略。

#### [](https://www.springcloud.cc/spring-security.html#ldap-context-source)连接到LDAP服务器

上面讨论的bean必须能够连接到服务器。它们都必须提供`SpringSecurityContextSource`，这是Spring LDAP的`ContextSource`的扩展。除非您有特殊要求，否则通常会配置一个`DefaultSpringSecurityContextSource` bean，可以使用LDAP服务器的URL配置，也可以配置“manager”用户的用户名和密码，默认情况下绑定到服务器（而不是匿名绑定）。有关更多信息，请阅读此类的Javadoc和Spring LDAP的`AbstractContextSource`。

#### [](https://www.springcloud.cc/spring-security.html#ldap-searchobjects)LDAP搜索对象

通常需要比简单DN匹配更复杂的策略来在目录中定位用户条目。这可以封装在`LdapUserSearch`实例中，该实例可以提供给验证器实现，例如，允许它们定位用户。提供的实现是`FilterBasedLdapUserSearch`。

##### [](https://www.springcloud.cc/spring-security.html#ldap-searchobjects-filter)FilterBasedLdapUserSearch中

此bean使用LDAP过滤器来匹配目录中的用户对象。在Javadoc中解释了[JDK DirContext类](http://java.sun.com/j2se/1.4.2/docs/api/javax/naming/directory/DirContext.html#search(javax.naming.Name%2C%2520java.lang.String%2C%2520java.lang.Object%5B%5D%2C%2520javax.naming.directory.SearchControls))上相应搜索方法的过程。如那里所解释的，可以向搜索过滤器提供参数。对于这个类，唯一有效的参数是`{0}`，它将被用户的登录名替换。

#### [](https://www.springcloud.cc/spring-security.html#ldap-authorities)LdapAuthoritiesPopulator在

在成功验证用户之后，`LdapAuthenticationProvider`将尝试通过调用配置的`LdapAuthoritiesPopulator` bean为用户加载一组权限。`DefaultLdapAuthoritiesPopulator`是一个实现，它将通过在目录中搜索用户所属的组来加载权限（通常这些将是目录中的`groupOfNames`或`groupOfUniqueNames`条目）。有关其工作原理的更多详细信息，请参阅此类的Javadoc。

如果您只想使用LDAP进行身份验证，但是从差异源（例如数据库）加载权限，那么您可以提供自己的此接口实现并注入该接口。

#### [](https://www.springcloud.cc/spring-security.html#ldap-bean-config)Spring Bean配置

使用我们在这里讨论的一些bean的典型配置可能如下所示：

<bean id="contextSource"
        class="org.springframework.security.ldap.DefaultSpringSecurityContextSource">
<constructor-arg value="ldap://monkeymachine:389/dc=springframework,dc=org"/>
<property name="userDn" value="cn=manager,dc=springframework,dc=org"/>
<property name="password" value="password"/>
</bean>

<bean id="ldapAuthProvider"
    class="org.springframework.security.ldap.authentication.LdapAuthenticationProvider">
<constructor-arg>
<bean class="org.springframework.security.ldap.authentication.BindAuthenticator">
    <constructor-arg ref="contextSource"/>
    <property name="userDnPatterns">
    <list><value>uid={0},ou=people</value></list>
    </property>
</bean>
</constructor-arg>
<constructor-arg>
<bean
    class="org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator">
    <constructor-arg ref="contextSource"/>
    <constructor-arg value="ou=groups"/>
    <property name="groupRoleAttribute" value="ou"/>
</bean>
</constructor-arg>
</bean>

这将设置提供程序以访问URL为`ldap://monkeymachine:389/dc=springframework,dc=org`的LDAP服务器。将通过尝试绑定DN `uid=<user-login-name>,ou=people,dc=springframework,dc=org`来执行身份验证。身份验证成功后，将通过使用默认过滤器`(member=<user’s-DN>)`在DN `ou=groups,dc=springframework,dc=org`下搜索，将角色分配给用户。角色名称将取自每场比赛的“ou”属性。

要配置用户搜索对象，使用过滤器`(uid=<user-login-name>)`代替DN模式（或除此之外），您将配置以下bean

<bean id="userSearch"
    class="org.springframework.security.ldap.search.FilterBasedLdapUserSearch">
<constructor-arg index="0" value=""/>
<constructor-arg index="1" value="(uid={0})"/>
<constructor-arg index="2" ref="contextSource" />
</bean>

并通过设置`BindAuthenticator` bean的`userSearch`属性来使用它。然后，在尝试以此用户身份绑定之前，身份验证者将调用搜索对象以获取正确的用户DN。

#### [](https://www.springcloud.cc/spring-security.html#ldap-custom-user-details)LDAP属性和自定义用户详细信息

使用`LdapAuthenticationProvider`进行身份验证的最终结果与使用标准`UserDetailsService`接口的正常Spring Security身份验证相同。创建`UserDetails`对象并将其存储在返回的`Authentication`对象中。与使用`UserDetailsService`一样，常见的要求是能够自定义此实现并添加额外的属性。使用LDAP时，这些通常是来自用户条目的属性。`UserDetails`对象的创建由提供者的`UserDetailsContextMapper`策略控制，该策略负责将用户对象映射到LDAP上下文数据和从LDAP上下文数据映射：

public interface UserDetailsContextMapper {

UserDetails mapUserFromContext(DirContextOperations ctx, String username,
        Collection<GrantedAuthority> authorities);

void mapUserToContext(UserDetails user, DirContextAdapter ctx);
}

只有第一种方法与身份验证相关。如果您提供此接口的实现并将其注入`LdapAuthenticationProvider`，则可以精确控制UserDetails对象的创建方式。第一个参数是Spring LDAP的`DirContextOperations`实例，它允许您访问在身份验证期间加载的LDAP属性。`username`参数是用于进行身份验证的名称，最后一个参数是由配置的`LdapAuthoritiesPopulator`为用户加载的权限集合。

加载上下文数据的方式略有不同，具体取决于您使用的身份验证类型。使用`BindAuthenticator`，绑定操作返回的上下文将用于读取属性，否则将使用从配置的`ContextSource`获取的标准上下文读取数据（当搜索配置为定位用户时） ，这将是搜索对象返回的数据）。

### [](https://www.springcloud.cc/spring-security.html#ldap-active-directory)12.3.5 Active Directory身份验证

Active Directory支持自己的非标准身份验证选项，并且正常使用模式与标准`LdapAuthenticationProvider`不太合适。通常，使用域用户名（格式为`user@domain`）执行身份验证，而不是使用LDAP专有名称。为了简化这一过程，Spring Security 3.1有一个身份验证提供程序，可以为典型的Active Directory设置进行自定义。

#### [](https://www.springcloud.cc/spring-security.html#activedirectoryldapauthenticationprovider)ActiveDirectoryLdapAuthenticationProvider

配置`ActiveDirectoryLdapAuthenticationProvider`非常简单。您只需提供域名和提供服务器地址的LDAP URL [[20]](https://www.springcloud.cc/spring-security.html#ftn.d5e5971)。然后，示例配置如下所示：

<bean id="adAuthenticationProvider"
class="org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider">
    <constructor-arg value="mydomain.com" />
    <constructor-arg value="ldap://adserver.mydomain.com/" />
</bean>
}

请注意，为了定义服务器位置，不需要指定单独的`ContextSource` - bean完全是自包含的。例如，名为“Sharon”的用户可以通过输入用户名`sharon`或完整的Active Directory `userPrincipalName`（即`sharon@mydomain.com`）进行身份验证。然后将定位用户的目录条目，并返回属性以用于自定义创建的`UserDetails`对象（可以为此目的注入`UserDetailsContextMapper`，如上所述）。与目录的所有交互都以用户自己的身份进行。没有“经理”用户的概念。

默认情况下，用户权限是从用户条目的`memberOf`属性值获取的。分配给用户的权限可以再次使用`UserDetailsContextMapper`进行自定义。您还可以将`GrantedAuthoritiesMapper`注入提供程序实例以控制最终位于`Authentication`对象中的权限。

##### [](https://www.springcloud.cc/spring-security.html#active-directory-error-codes)Active Directory错误代码

默认情况下，失败的结果将导致标准Spring Security `BadCredentialsException`。如果将属性`convertSubErrorCodesToExceptions`设置为`true`，则将解析异常消息以尝试提取特定于Active Directory的错误代码并引发更具体的异常。检查类Javadoc以获取更多信息。

## [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced)12.4 OAuth 2.0登录 - 高级配置

`HttpSecurity.oauth2Login()`提供了许多用于自定义OAuth 2.0登录的配置选项。主要配置选项分组到其协议端点对应项中。

例如，`oauth2Login().authorizationEndpoint()`允许配置_授权端点_，而`oauth2Login().tokenEndpoint()`允许配置_令牌端点_。

以下代码显示了一个示例：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .authorizationEndpoint()
                    ...
                .redirectionEndpoint()
                    ...
                .tokenEndpoint()
                    ...
                .userInfoEndpoint()
                    ...
    }
}

`oauth2Login()` DSL的主要目标是与规范中定义的命名密切配合。

OAuth 2.0授权框架定义[协议端点](https://tools.ietf.org/html/rfc6749#section-3)，如下所示：

授权过程使用两个授权服务器端点（HTTP资源）：

- 授权端点：客户端用于通过用户代理重定向从资源所有者获取授权。
- 令牌端点：客户端用于交换访问令牌的授权授权，通常使用客户端身份验证。

以及一个客户端端点：

- 重定向端点：由授权服务器用于通过资源所有者用户代理将包含授权凭据的响应返回给客户端。

OpenID Connect Core 1.0规范定义了[UserInfo端点](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)，如下所示：

UserInfo端点是OAuth 2.0受保护资源，它返回有关经过身份验证的最终用户的声明。为了获得有关最终用户的请求声明，客户端使用通过OpenID Connect身份验证获得的访问令牌向UserInfo端点发出请求。这些声明通常由JSON对象表示，该对象包含声明的名称 - 值对的集合。

以下代码显示了`oauth2Login()` DSL可用的完整配置选项：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .clientRegistrationRepository(this.clientRegistrationRepository())
                .authorizedClientRepository(this.authorizedClientRepository())
                .authorizedClientService(this.authorizedClientService())
                .loginPage("/login")
                .authorizationEndpoint()
                    .baseUri(this.authorizationRequestBaseUri())
                    .authorizationRequestRepository(this.authorizationRequestRepository())
                    .authorizationRequestResolver(this.authorizationRequestResolver())
                    .and()
                .redirectionEndpoint()
                    .baseUri(this.authorizationResponseBaseUri())
                    .and()
                .tokenEndpoint()
                    .accessTokenResponseClient(this.accessTokenResponseClient())
                    .and()
                .userInfoEndpoint()
                    .userAuthoritiesMapper(this.userAuthoritiesMapper())
                    .userService(this.oauth2UserService())
                    .oidcUserService(this.oidcUserService())
                    .customUserType(GitHubOAuth2User.class, "github");
    }
}

以下部分详细介绍了每种可用的配置选项：

- [第12.4.1节“OAuth 2.0登录页面”](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-login-page "12.4.1 OAuth 2.0登录页面")
- [第12.4.2节“重定向端点”](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-redirection-endpoint "12.4.2重定向端点")
- [第12.4.3节“UserInfo端点”](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-userinfo-endpoint "12.4.3 UserInfo端点")

### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-login-page)12.4.1 OAuth 2.0登录页面

默认情况下，OAuth 2.0登录页面由`DefaultLoginPageGeneratingFilter`自动生成。默认登录页面显示每个已配置的OAuth客户端及其`ClientRegistration.clientName`作为链接，该链接能够启动授权请求（或OAuth 2.0登录）。

每个OAuth客户端的链接目标默认为以下内容：

`OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI` +“/ {registrationId}”

以下行显示了一个示例：

<a href="/oauth2/authorization/google">Google</a>

要覆盖默认登录页面，请配置`oauth2Login().loginPage()`和（可选）`oauth2Login().authorizationEndpoint().baseUri()`。

以下清单显示了一个示例：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .loginPage("/login/oauth2")
                ...
                .authorizationEndpoint()
                    .baseUri("/login/oauth2/authorization")
                    ....
    }
}

|   |   |
|---|---|
|![[重要]](https://www.springcloud.cc/images/important.png)|重要|
|您需要提供一个`@Controller`，其`@RequestMapping("/login/oauth2")`能够呈现自定义登录页面。|

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|如前所述，配置`oauth2Login().authorizationEndpoint().baseUri()`是可选的。但是，如果您选择自定义它，请确保指向每个OAuth客户端的链接与`authorizationEndpoint().baseUri()`匹配。<br><br>以下行显示了一个示例：<br><br><a href="/login/oauth2/authorization/google">Google</a>|

### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-redirection-endpoint)12.4.2重定向端点

授权服务器使用重定向端点通过资源所有者用户代理将授权响应（包含授权凭据）返回给客户端。

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|OAuth 2.0 Login利用授权代码授权。因此，授权凭证是授权代码。|

默认授权响应`baseUri`（重定向端点）为`**/login/oauth2/code/***`，在`OAuth2LoginAuthenticationFilter.DEFAULT_FILTER_PROCESSES_URI`中定义。

如果要自定义授权响应`baseUri`，请按以下示例所示进行配置：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .redirectionEndpoint()
                    .baseUri("/login/oauth2/callback/*")
                    ....
    }
}

|   |   |
|---|---|
|![[重要]](https://www.springcloud.cc/images/important.png)|重要|
|您还需要确保`ClientRegistration.redirectUriTemplate`与自定义授权响应`baseUri`匹配。<br><br>以下清单显示了一个示例：<br><br>return CommonOAuth2Provider.GOOGLE.getBuilder("google")<br>    .clientId("google-client-id")<br>    .clientSecret("google-client-secret")<br>    .redirectUriTemplate("{baseUrl}/login/oauth2/callback/{registrationId}")<br>    .build();|

### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-userinfo-endpoint)12.4.3 UserInfo端点

UserInfo端点包括许多配置选项，如以下子部分所述：

- [映射用户权限](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-map-authorities "映射用户权限")
- [配置自定义OAuth2User](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-custom-user "配置自定义OAuth2User")
- [OAuth 2.0 UserService](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-oauth2-user-service "OAuth 2.0 UserService")
- [OpenID Connect 1.0 UserService](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-oidc-user-service "OpenID Connect 1.0 UserService")

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-map-authorities)映射用户权限

用户成功通过OAuth 2.0提供程序进行身份验证后，`OAuth2User.getAuthorities()`（或`OidcUser.getAuthorities()`）可能会映射到一组新的`GrantedAuthority`实例，这些实例将在完成身份验证时提供给`OAuth2AuthenticationToken` 。

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|`OAuth2AuthenticationToken.getAuthorities()`用于授权请求，例如`hasRole('USER')`或`hasRole('ADMIN')`。|

映射用户权限时，有几个选项可供选择：

- [使用GrantedAuthoritiesMapper](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-map-authorities-grantedauthoritiesmapper "使用GrantedAuthoritiesMapper")
- [使用OAuth2UserService的基于委派的策略](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-map-authorities-oauth2userservice "使用OAuth2UserService的基于委派的策略")

##### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-map-authorities-grantedauthoritiesmapper)使用GrantedAuthoritiesMapper

提供`GrantedAuthoritiesMapper`的实现并对其进行配置，如以下示例所示：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .userInfoEndpoint()
                    .userAuthoritiesMapper(this.userAuthoritiesMapper())
                    ...
    }

    private GrantedAuthoritiesMapper userAuthoritiesMapper() {
        return (authorities) -> {
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

            authorities.forEach(authority -> {
                if (OidcUserAuthority.class.isInstance(authority)) {
                    OidcUserAuthority oidcUserAuthority = (OidcUserAuthority)authority;

                    OidcIdToken idToken = oidcUserAuthority.getIdToken();
                    OidcUserInfo userInfo = oidcUserAuthority.getUserInfo();

                    // Map the claims found in idToken and/or userInfo
                    // to one or more GrantedAuthority's and add it to mappedAuthorities

                } else if (OAuth2UserAuthority.class.isInstance(authority)) {
                    OAuth2UserAuthority oauth2UserAuthority = (OAuth2UserAuthority)authority;

                    Map<String, Object> userAttributes = oauth2UserAuthority.getAttributes();

                    // Map the attributes found in userAttributes
                    // to one or more GrantedAuthority's and add it to mappedAuthorities

                }
            });

            return mappedAuthorities;
        };
    }
}

或者，您可以注册`GrantedAuthoritiesMapper` `@Bean`以使其自动应用于配置，如以下示例所示：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http.oauth2Login();
    }

    _@Bean_
    public GrantedAuthoritiesMapper userAuthoritiesMapper() {
        ...
    }
}

##### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-map-authorities-oauth2userservice)使用OAuth2UserService的基于委派的策略

与使用`GrantedAuthoritiesMapper`相比，此策略更先进，但它也更灵活，因为它可让您访问`OAuth2UserRequest`和`OAuth2User`（使用OAuth 2.0 UserService时）或`OidcUserRequest`和`OidcUser`（使用OpenID Connect 1.0 UserService时）。

`OAuth2UserRequest`（和`OidcUserRequest`）为您提供对相关`OAuth2AccessToken`的访问权限，这在_委托人_需要从受保护资源获取权限信息才能映射自定义权限的情况下非常有用。用户。

以下示例显示如何使用OpenID Connect 1.0 UserService实现和配置基于委派的策略：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .userInfoEndpoint()
                    .oidcUserService(this.oidcUserService())
                    ...
    }

    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        final OidcUserService delegate = new OidcUserService();

        return (userRequest) -> {
            // Delegate to the default implementation for loading a user
            OidcUser oidcUser = delegate.loadUser(userRequest);

            OAuth2AccessToken accessToken = userRequest.getAccessToken();
            Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

            // TODO
            // 1) Fetch the authority information from the protected resource using accessToken
            // 2) Map the authority information to one or more GrantedAuthority's and add it to mappedAuthorities

            // 3) Create a copy of oidcUser but use the mappedAuthorities instead
            oidcUser = new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(), oidcUser.getUserInfo());

            return oidcUser;
        };
    }
}

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-custom-user)配置自定义OAuth2User

`CustomUserTypesOAuth2UserService`是`OAuth2UserService`的实现，为自定义`OAuth2User`类型提供支持。

如果默认实现（`DefaultOAuth2User`）不符合您的需求，您可以定义自己的`OAuth2User`实现。

以下代码演示了如何为GitHub注册自定义`OAuth2User`类型：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .userInfoEndpoint()
                    .customUserType(GitHubOAuth2User.class, "github")
                    ...
    }
}

以下代码显示了GitHub的自定义`OAuth2User`类型的示例：

public class GitHubOAuth2User implements OAuth2User {
    private List<GrantedAuthority> authorities =
        AuthorityUtils.createAuthorityList("ROLE_USER");
    private Map<String, Object> attributes;
    private String id;
    private String name;
    private String login;
    private String email;

    _@Override_
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    _@Override_
    public Map<String, Object> getAttributes() {
        if (this.attributes == null) {
            this.attributes = new HashMap<>();
            this.attributes.put("id", this.getId());
            this.attributes.put("name", this.getName());
            this.attributes.put("login", this.getLogin());
            this.attributes.put("email", this.getEmail());
        }
        return attributes;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    _@Override_
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogin() {
        return this.login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|`id`，`name`，`login`和`email`是GitHub的UserInfo响应中返回的属性。有关从UserInfo端点返回的详细信息，请参阅[“获取经过身份验证的用户”](https://developer.github.com/v3/users/#get-the-authenticated-user)的API文档。|

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-oauth2-user-service)OAuth 2.0 UserService

`DefaultOAuth2UserService`是支持标准OAuth 2.0提供程序的`OAuth2UserService`的实现。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|`OAuth2UserService`从UserInfo端点获取最终用户（资源所有者）的用户属性（通过使用在授权流程中授予客户端的访问令牌）并以{的形式返回`AuthenticatedPrincipal` 3 /}。|

在UserInfo端点请求用户属性时，`DefaultOAuth2UserService`使用`RestOperations`。

如果您需要自定义UserInfo请求的预处理，则可以为`DefaultOAuth2UserService.setRequestEntityConverter()`提供自定义`Converter<OAuth2UserRequest, RequestEntity<?>>`。默认实现`OAuth2UserRequestEntityConverter`构建UserInfo请求的`RequestEntity`表示，默认情况下在`Authorization`标头中设置`OAuth2AccessToken`。

另一方面，如果您需要自定义UserInfo响应的后处理，则需要为`DefaultOAuth2UserService.setRestOperations()`提供自定义配置的`RestOperations`。默认`RestOperations`配置如下：

RestTemplate restTemplate = new RestTemplate();
restTemplate.setErrorHandler(new OAuth2ErrorResponseErrorHandler());

`OAuth2ErrorResponseErrorHandler`是`ResponseErrorHandler`，可以处理OAuth 2.0错误（400错误请求）。它使用`OAuth2ErrorHttpMessageConverter`将OAuth 2.0 Error参数转换为`OAuth2Error`。

无论您是自定义`DefaultOAuth2UserService`还是提供自己的`OAuth2UserService`实现，都需要对其进行配置，如以下示例所示：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .userInfoEndpoint()
                    .userService(this.oauth2UserService())
                    ...
    }

    private OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        ...
    }
}

#### [](https://www.springcloud.cc/spring-security.html#oauth2login-advanced-oidc-user-service)OpenID Connect 1.0 UserService

`OidcUserService`是支持OpenID Connect 1.0 Provider的`OAuth2UserService`的实现。

在UserInfo端点请求用户属性时，`OidcUserService`利用`DefaultOAuth2UserService`。

如果您需要自定义UserInfo请求的预处理和/或UserInfo响应的后处理，则需要为`OidcUserService.setOauth2UserService()`提供自定义配置的`DefaultOAuth2UserService`。

无论您是自定义`OidcUserService`还是为OpenID Connect 1.0 Provider提供自己的`OAuth2UserService`实现，您都需要对其进行配置，如以下示例所示：

_@EnableWebSecurity_
public class OAuth2LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    _@Override_
    protected void configure(HttpSecurity http) throws Exception {
        http
            .oauth2Login()
                .userInfoEndpoint()
                    .oidcUserService(this.oidcUserService())
                    ...
    }

    private OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        ...
    }
}

  

---

[[19]](https://www.springcloud.cc/spring-security.html#d5e5849)请注意，这与使用`member={0}`的基础`DefaultLdapAuthoritiesPopulator`的默认配置不同。

[[20]](https://www.springcloud.cc/spring-security.html#d5e5971)也可以使用DNS查找获取服务器的IP地址。目前不支持此功能，但希望将来会在未来版本中使用。

## [](https://www.springcloud.cc/spring-security.html#servlet-webclient)13.用于Servlet环境的WebClient

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|以下文档适用于Servlet环境。对于所有其他环境，请参阅[WebClient for Reactive](https://www.springcloud.cc/spring-security.html#webclient "21. WebClient")环境。|

Spring Framework已经内置支持设置Bearer令牌。

webClient.get()
    .headers(h -> h.setBearerAuth(token))
    ...

Spring Security建立在这种支持的基础上，以提供额外的好处：

- Spring Security将自动刷新过期的令牌（如果存在刷新令牌）
- 如果请求访问令牌但不存在，Spring Security将自动请求访问令牌。
    
    - 对于authorization_code，这涉及执行重定向，然后重放原始请求
    - 对于client_credentials，只需请求并保存令牌
    
- 支持透明地包含当前OAuth令牌或明确选择应使用哪个令牌的能力。

## [](https://www.springcloud.cc/spring-security.html#servlet-webclient-setup)13.1 WebClient OAuth2设置

第一步是确保正确设置`WebClient`。可以在下面找到在servlet环境中设置`WebClient`的示例：

_@Bean_
WebClient webClient(ClientRegistrationRepository clientRegistrations,
        OAuth2AuthorizedClientRepository authorizedClients) {
    ServletOAuth2AuthorizedClientExchangeFilterFunction oauth =
            new ServletOAuth2AuthorizedClientExchangeFilterFunction(clientRegistrations, authorizedClients);
    // (optional) explicitly opt into using the oauth2Login to provide an access token implicitly
    // oauth.setDefaultOAuth2AuthorizedClient(true);
    // (optional) set a default ClientRegistration.registrationId
    // oauth.setDefaultClientRegistrationId("client-registration-id");
    return WebClient.builder()
            .apply(oauth2.oauth2Configuration())
            .build();
}

## [](https://www.springcloud.cc/spring-security.html#servlet-webclient-implicit)13.2隐式OAuth2AuthorizedClient

如果我们在设置中将`defaultOAuth2AuthorizedClient`设置为`true`并且使用oauth2Login（即OIDC）对用户进行身份验证，则使用当前身份验证自动提供访问令牌。或者，如果我们将`defaultClientRegistrationId`设置为有效的`ClientRegistration` id，则该注册用于提供访问令牌。这很方便，但在并非所有端点都应获取访问令牌的环境中，这很危险（您可能会向端点提供错误的访问令牌）。

Mono<String> body = this.webClient
        .get()
        .uri(this.uri)
        .retrieve()
        .bodyToMono(String.class);

## [](https://www.springcloud.cc/spring-security.html#servlet-webclient-explicit)13.3显式OAuth2AuthorizedClient

可以通过在请求属性上设置`OAuth2AuthorizedClient`来明确提供。在下面的示例中，我们使用Spring WebFlux或Spring MVC参数解析器支持来解析`OAuth2AuthorizedClient`。但是，`OAuth2AuthorizedClient`如何解决并不重要。

_@GetMapping("/explicit")_
Mono<String> explicit(_@RegisteredOAuth2AuthorizedClient("client-id")_ OAuth2AuthorizedClient authorizedClient) {
    return this.webClient
            .get()
            .uri(this.uri)
            .attributes(oauth2AuthorizedClient(authorizedClient))
            .retrieve()
            .bodyToMono(String.class);
}

## [](https://www.springcloud.cc/spring-security.html#servlet-webclient-clientregistrationid)13.4 clientRegistrationId

或者，可以在请求属性上指定`clientRegistrationId`，`WebClient`将尝试查找`OAuth2AuthorizedClient`。如果未找到，将自动获取一个。

Mono<String> body = this.webClient
        .get()
        .uri(this.uri)
        .attributes(clientRegistrationId("client-id"))
        .retrieve()
        .bodyToMono(String.class);

## [](https://www.springcloud.cc/spring-security.html#taglibs)13.5 JSP标记库

Spring Security有自己的taglib，它为访问安全信息和在JSP中应用安全约束提供基本支持。

### [](https://www.springcloud.cc/spring-security.html#declaring-the-taglib)13.5.1声明Taglib

要使用任何标记，必须在JSP中声明安全性标记库：

<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

### [](https://www.springcloud.cc/spring-security.html#taglibs-authorize)13.5.2授权标签

此标记用于确定是否应评估其内容。在Spring Security 3.0中，它可以以两种方式使用[[21]](https://www.springcloud.cc/spring-security.html#ftn.d5e6267)。第一种方法使用[web - 安全表达式](https://www.springcloud.cc/spring-security.html#el-access-web "11.3.2 Web安全表达式")，在标记的`access`属性中指定。表达式评估将委托给应用程序上下文中定义的`SecurityExpressionHandler<FilterInvocation>`（您应该在`<http>`命名空间配置中启用web表达式以确保此服务可用）。所以，例如，你可能有

<sec:authorize access="hasRole('supervisor')">

This content will only be visible to users who have the "supervisor" authority in their list of <tt>GrantedAuthority</tt>s.

</sec:authorize>

与Spring Security的PermissionEvaluator结合使用时，该标记也可用于检查权限。例如：

<sec:authorize access="hasPermission(#domain,'read') or hasPermission(#domain,'write')">

This content will only be visible to users who have read or write permission to the Object found as a request attribute named "domain".

</sec:authorize>

如果实际允许用户单击该链接，则通常的要求是仅显示特定链接。我们如何提前确定是否允许某些事情？此标记还可以在备用模式下运行，该模式允许您将特定URL定义为属性。如果允许用户调用该URL，则将评估标记正文，否则将跳过该标记正文。所以你可能有类似的东西

<sec:authorize url="/admin">

This content will only be visible to users who are authorized to send requests to the "/admin" URL.

</sec:authorize>

要使用此标记，您的应用程序上下文中还必须有一个`WebInvocationPrivilegeEvaluator`的实例。如果您使用命名空间，将自动注册。这是`DefaultWebInvocationPrivilegeEvaluator`的一个实例，它为提供的URL创建一个虚拟web请求，并调用安全拦截器以查看请求是成功还是失败。这允许您委托使用`<http>`命名空间配置中的`intercept-url`声明定义的访问控制设置，并节省必须复制JSP中的信息（例如所需角色）。此方法还可以与`method`属性结合使用，提供HTTP方法，以实现更具体的匹配。

通过将`var`属性设置为变量名称，可以将评估标记的布尔结果（无论是授予还是拒绝访问）存储在页面上下文范围变量中，从而无需复制和重新评估其他条件。页面中的点。

#### [](https://www.springcloud.cc/spring-security.html#disabling-tag-authorization-for-testing)禁用用于测试的标记授权

在未经授权的用户的页面中隐藏链接并不会阻止他们访问该URL。例如，他们可以直接在浏览器中输入它。作为测试过程的一部分，您可能希望揭示隐藏区域，以便检查链接是否真的在后端得到保护。如果将系统属性`spring.security.disableUISecurity`设置为`true`，则`authorize`标记仍将运行，但不会隐藏其内容。默认情况下，它还会使用`<span class="securityHiddenUI">…​</span>`标记包围内容。这允许您显示具有特定CSS样式的“隐藏”内容，例如不同的背景颜色。例如，尝试在启用此属性的情况下运行“tutorial”示例应用程序。

您还可以设置属性`spring.security.securedUIPrefix`和`spring.security.securedUISuffix`如果要更改默认`span`标签周围文本（或使用空字符串来彻底删除）。

### [](https://www.springcloud.cc/spring-security.html#the-authentication-tag)13.5.3认证标签

此标记允许访问存储在安全上下文中的当前`Authentication`对象。它直接在JSP中呈现对象的属性。因此，例如，如果`Authentication`的`principal`属性是Spring Security的`UserDetails`对象的实例，则使用`<sec:authentication property="principal.username" />`将呈现当前用户的名称。

当然，没有必要为这种事情使用JSP标记，有些人更喜欢在视图中保持尽可能少的逻辑。您可以访问MVC控制器中的`Authentication`对象（通过调用`SecurityContextHolder.getContext().getAuthentication()`）并将数据直接添加到模型中以供视图呈现。

### [](https://www.springcloud.cc/spring-security.html#the-accesscontrollist-tag)13.5.4 accesscontrollist标签

此标记仅在与Spring Security的ACL模块一起使用时有效。它检查指定域对象的逗号分隔的所需权限列表。如果当前用户具有所有这些权限，则将评估标记正文。如果他们不这样做，它将被跳过。一个例子可能是

|   |   |
|---|---|
|![[警告]](https://www.springcloud.cc/images/caution.png)|警告|
|通常，此标记应被视为已弃用。而是使用[第13.5.2节“授权标签”](https://www.springcloud.cc/spring-security.html#taglibs-authorize "13.5.2授权标签")。|

<sec:accesscontrollist hasPermission="1,2" domainObject="${someObject}">

This will be shown if the user has all of the permissions represented by the values "1" or "2" on the given object.

</sec:accesscontrollist>

权限被传递给应用程序上下文中定义的`PermissionFactory`，将它们转换为ACL `Permission`实例，因此它们可以是工厂支持的任何格式 - 它们不必是整数，它们可以是`READ`或`WRITE`之类的字符串。如果未找到`PermissionFactory`，将使用`DefaultPermissionFactory`的实例。应用程序上下文中的`AclService`将用于加载所提供对象的`Acl`实例。将使用所需权限调用`Acl`以检查是否已授予所有权限。

此标记还支持`var`属性，与`authorize`标记的方式相同。

### [](https://www.springcloud.cc/spring-security.html#the-csrfinput-tag)13.5.5 csrfInput标记

如果启用了CSRF保护，则此标记将插入一个隐藏的表单字段，其中包含CSRF保护令牌的正确名称和值。如果未启用CSRF保护，则此标记不会输出任何内容。

通常Spring Security会自动为您使用的任何`<form:form>`标签插入CSRF表单字段，但如果由于某种原因您无法使用`<form:form>`，则`csrfInput`是一个方便的替代品。

您应该将此标记放在HTML `<form></form>`块中，您通常会在其中放置其他输入字段。请勿将此标记放在Spring `<form:form></form:form>`块中。Spring Security自动处理Spring表格。

<form method="post" action="/do/something">
    <sec:csrfInput />
    Name:<br />
    <input type="text" name="name" />
    ...
</form>

### [](https://www.springcloud.cc/spring-security.html#the-csrfmetatags-tag)13.5.6 csrfMetaTags标记

如果启用了CSRF保护，则此标记将插入包含CSRF保护令牌表单字段和标头名称以及CSRF保护令牌值的元标记。这些元标记对于在应用程序中的JavaScript中使用CSRF保护非常有用。

您应该将`csrfMetaTags`放在HTML `<head></head>`块中，您通常会放置其他元标记。使用此标记后，您可以使用JavaScript轻松访问表单字段名称，标题名称和标记值。在此示例中使用JQuery来简化任务。

**<!DOCTYPE html>**
<html>
    <head>
        <title>CSRF Protected JavaScript Page</title>
        <meta name="description" content="This is the description for this page" />
        <sec:csrfMetaTags />
        <script type="text/javascript" language="javascript">

            var csrfParameter = $("meta[name='_csrf_parameter']").attr("content");
            var csrfHeader = $("meta[name='_csrf_header']").attr("content");
            var csrfToken = $("meta[name='_csrf']").attr("content");

            // using XMLHttpRequest directly to send an x-www-form-urlencoded request
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "http://www.example.org/do/something", true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded data");
            ajax.send(csrfParameter + "=" + csrfToken + "&name=John&...");

            // using XMLHttpRequest directly to send a non-x-www-form-urlencoded request
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "http://www.example.org/do/something", true);
            ajax.setRequestHeader(csrfHeader, csrfToken);
            ajax.send("...");

            // using JQuery to send an x-www-form-urlencoded request
            var data = {};
            data[csrfParameter] = csrfToken;
            data["name"] = "John";
            ...
            $.ajax({
                url: "http://www.example.org/do/something",
                type: "POST",
                data: data,
                ...
            });

            // using JQuery to send a non-x-www-form-urlencoded request
            var headers = {};
            headers[csrfHeader] = csrfToken;
            $.ajax({
                url: "http://www.example.org/do/something",
                type: "POST",
                headers: headers,
                ...
            });

        <script>
    </head>
    <body>
        ...
    </body>
</html>

如果未启用CSRF保护，则`csrfMetaTags`不输出任何内容。

## [](https://www.springcloud.cc/spring-security.html#jaas)13.6 Java身份验证和授权服务（JAAS）提供程序

### [](https://www.springcloud.cc/spring-security.html#overview-2)13.6.1概述

Spring Security提供了一个能够将身份验证请求委派给Java身份验证和授权服务（JAAS）的程序包。该包将在下面详细讨论。

### [](https://www.springcloud.cc/spring-security.html#jaas-abstractjaasauthenticationprovider)13.6.2 AbstractJaasAuthenticationProvider

`AbstractJaasAuthenticationProvider`是所提供的JAAS `AuthenticationProvider`实现的基础。子类必须实现一个创建`LoginContext`的方法。`AbstractJaasAuthenticationProvider`有许多可以注入其中的依赖项，将在下面讨论。

#### [](https://www.springcloud.cc/spring-security.html#jaas-callbackhandler)JAAS CallbackHandler

大多数JAAS `LoginModule`需要某种回调。这些回调通常用于从用户获取用户名和密码。

在Spring Security部署中，Spring Security负责此用户交互（通过身份验证机制）。因此，在将身份验证请求委托给JAAS时，Spring Security的身份验证机制已经完全填充了一个`Authentication`对象，其中包含JAAS `LoginModule`所需的所有信息。

因此，Spring Security的JAAS包提供了两个默认的回调处理程序`JaasNameCallbackHandler`和`JaasPasswordCallbackHandler`。这些回调处理程序中的每一个都实现`JaasAuthenticationCallbackHandler`。在大多数情况下，这些回调处理程序可以在不了解内部机制的情况下使用。

对于那些需要完全控制回调行为的人，内部`AbstractJaasAuthenticationProvider`用`InternalCallbackHandler`包裹这些`JaasAuthenticationCallbackHandler`。`InternalCallbackHandler`是实际实现JAAS normal `CallbackHandler`接口的类。每次使用JAAS `LoginModule`时，都会传递一个配置为`InternalCallbackHandler`的应用程序上下文列表。如果`LoginModule`请求对`InternalCallbackHandler`进行回调，则回调将被传递给被包装的`JaasAuthenticationCallbackHandler`。

#### [](https://www.springcloud.cc/spring-security.html#jaas-authoritygranter)JAAS AuthorityGranter

JAAS与校长合作。甚至“角色”也表示为JAAS中的主体。另一方面，Spring Security与`Authentication`对象一起使用。每个`Authentication`对象包含一个主体和多个`GrantedAuthority`。为了便于在这些不同概念之间进行映射，Spring Security的JAAS包包含一个`AuthorityGranter`接口。

`AuthorityGranter`负责检查JAAS校长并返回一组`String`，代表分配给校长的当局。对于每个返回的权限字符串，`AbstractJaasAuthenticationProvider`创建一个`JaasGrantedAuthority`（实现Spring Security的`GrantedAuthority`接口），其中包含权限字符串和传递`AuthorityGranter`的JAAS主体。通过首先成功地验证使用JAAS用户的凭证的`AbstractJaasAuthenticationProvider`获得JAAS主体`LoginModule`，然后访问`LoginContext`它返回。调用`LoginContext.getSubject().getPrincipals()`，每个结果主体传递给`AbstractJaasAuthenticationProvider.setAuthorityGranters(List)`属性定义的每个`AuthorityGranter`。

鉴于每个JAAS主体都具有特定于实现的含义，Spring Security不包括任何生产`AuthorityGranter`。但是，单元测试中有`TestAuthorityGranter`表示简单的`AuthorityGranter`实现。

### [](https://www.springcloud.cc/spring-security.html#jaas-defaultjaasauthenticationprovider)13.6.3 DefaultJaasAuthenticationProvider

`DefaultJaasAuthenticationProvider`允许将JAAS `Configuration`对象作为依赖项注入其中。然后使用注入的JAAS `Configuration`创建`LoginContext`。这意味着`DefaultJaasAuthenticationProvider`不受`Configuration` `Configuration`的任何特定实现的约束。

#### [](https://www.springcloud.cc/spring-security.html#jaas-inmemoryconfiguration)InMemoryConfiguration

为了便于将`Configuration`注入`DefaultJaasAuthenticationProvider`，提供了名为`InMemoryConfiguration`的默认内存实现。实现构造函数接受`Map`，其中每个键表示登录配置名称，值表示`AppConfigurationEntry`的`Array`。`InMemoryConfiguration`还支持默认`Array`个`AppConfigurationEntry`对象，如果在提供的`Map`中没有找到映射，将使用这些对象。有关详细信息，请参阅`InMemoryConfiguration`的类级别javadoc。

#### [](https://www.springcloud.cc/spring-security.html#jaas-djap-config)DefaultJaasAuthenticationProvider示例配置

虽然`InMemoryConfiguration`的Spring配置可能比标准JAAS配置文件更详细，但与`DefaultJaasAuthenticationProvider`结合使用它比`JaasAuthenticationProvider`更灵活，因为它不依赖于默认值`Configuration`实施。

下面提供使用`InMemoryConfiguration`的`DefaultJaasAuthenticationProvider`的示例配置。请注意，`Configuration`的自定义实现也可以轻松地注入`DefaultJaasAuthenticationProvider`。

<bean id="jaasAuthProvider"
class="org.springframework.security.authentication.jaas.DefaultJaasAuthenticationProvider">
<property name="configuration">
<bean class="org.springframework.security.authentication.jaas.memory.InMemoryConfiguration">
<constructor-arg>
    <map>
    <!--
    SPRINGSECURITY is the default loginContextName
    for AbstractJaasAuthenticationProvider
    -->
    <entry key="SPRINGSECURITY">
    <array>
    <bean class="javax.security.auth.login.AppConfigurationEntry">
        <constructor-arg value="sample.SampleLoginModule" />
        <constructor-arg>
        <util:constant static-field=
            "javax.security.auth.login.AppConfigurationEntry$LoginModuleControlFlag.REQUIRED"/>
        </constructor-arg>
        <constructor-arg>
        <map></map>
        </constructor-arg>
        </bean>
    </array>
    </entry>
    </map>
    </constructor-arg>
</bean>
</property>
<property name="authorityGranters">
<list>
    <!-- You will need to write your own implementation of AuthorityGranter -->
    <bean class="org.springframework.security.authentication.jaas.TestAuthorityGranter"/>
</list>
</property>
</bean>

### [](https://www.springcloud.cc/spring-security.html#jaas-jaasauthenticationprovider)13.6.4 JaasAuthenticationProvider

`JaasAuthenticationProvider`假设默认`Configuration`是[ConfigFile](https://download.oracle.com/javase/1.4.2/docs/guide/security/jaas/spec/com/sun/security/auth/login/ConfigFile.html)的实例。这个假设是为了尝试更新`Configuration`。`JaasAuthenticationProvider`然后使用默认的`Configuration`来创建`LoginContext`。

假设我们有一个JAAS登录配置文件`/WEB-INF/login.conf`，其中包含以下内容：

JAASTest {
    sample.SampleLoginModule required;
};

与所有Spring Security bean一样，`JaasAuthenticationProvider`通过应用程序上下文配置。以下定义将对应于上述JAAS登录配置文件：

<bean id="jaasAuthenticationProvider"
class="org.springframework.security.authentication.jaas.JaasAuthenticationProvider">
<property name="loginConfig" value="/WEB-INF/login.conf"/>
<property name="loginContextName" value="JAASTest"/>
<property name="callbackHandlers">
<list>
<bean
    class="org.springframework.security.authentication.jaas.JaasNameCallbackHandler"/>
<bean
    class="org.springframework.security.authentication.jaas.JaasPasswordCallbackHandler"/>
</list>
</property>
<property name="authorityGranters">
    <list>
    <bean class="org.springframework.security.authentication.jaas.TestAuthorityGranter"/>
    </list>
</property>
</bean>

### [](https://www.springcloud.cc/spring-security.html#jaas-apiprovision)13.6.5作为主体跑

如果已配置，`JaasApiIntegrationFilter`将尝试在`JaasAuthenticationToken`上以`Subject`运行。这意味着可以使用以下方法访问`Subject`：

Subject subject = Subject.getSubject(AccessController.getContext());

可以使用[jaas-api-provision](https://www.springcloud.cc/spring-security.html#nsa-http-jaas-api-provision)属性轻松配置此集成。当与依赖于正在填充的JAAS主题的旧版或外部API集成时，此功能非常有用。

## [](https://www.springcloud.cc/spring-security.html#cas)13.7 CAS认证

### [](https://www.springcloud.cc/spring-security.html#cas-overview)13.7.1概述

JA-SIG生产一种称为CAS的企业级单点登录系统。与其他计划不同，JA-SIG的中央身份验证服务是开源的，广泛使用的，易于理解，独立于平台，并支持代理功能。Spring Security完全支持CAS，并提供从Spring Security的单应用程序部署到由企业级CAS服务器保护的多应用程序部署的简单迁移路径。

您可以在[http://www.ja-sig.org/cas上](https://www.apereo.org/)了解有关CAS的更多信息。您还需要访问此站点以下载CAS Server文件。

### [](https://www.springcloud.cc/spring-security.html#cas-how-it-works)13.7.2 CAS如何工作

虽然CAS web站点包含详细说明CAS体系结构的文档，但我们在Spring Security的上下文中再次提供了概述。Spring Security 3.x支持CAS 3.在编写本文时，CAS服务器的版本为3.4。

在企业的某个地方，您需要设置CAS服务器。CAS服务器只是一个标准的WAR文件，因此设置服务器没有任何困难。在WAR文件中，您将自定义向用户显示的登录页面和其他单点登录页面。

部署CAS 3.4服务器时，还需要在CAS附带的`deployerConfigContext.xml`中指定`AuthenticationHandler`。`AuthenticationHandler`有一个简单的方法，它返回一个布尔值，询问给定的凭证集是否有效。您的`AuthenticationHandler`实现需要链接到某种类型的后端身份验证存储库，例如LDAP服务器或数据库。CAS本身包括许多开箱即用的`AuthenticationHandler`以帮助解决这个问题。下载并部署服务器war文件时，它设置为成功验证输入与其用户名匹配的密码的用户，这对测试很有用。

除CAS服务器本身外，其他主要参与者当然是整个企业中部署的安全web应用程序。这些web应用程序称为“服务”。有三种类型的服务。那些验证服务票证的，可以获得代理票证的那些，以及验证代理票证的那些。验证代理票证的方式不同，因为必须验证代理列表，并且通常可以重复使用代理票证。

#### [](https://www.springcloud.cc/spring-security.html#cas-sequence)Spring Security和CAS交互序列

web浏览器，CAS服务器和Spring Security安全服务之间的基本交互如下：

- web用户正在浏览服务的公共页面。CAS或Spring Security不参与。
- 用户最终请求一个安全的页面或它使用的bean之一是安全的。Spring Security `ExceptionTranslationFilter`将检测到`AccessDeniedException`或`AuthenticationException`。
- 因为用户的`Authentication`对象（或缺少对象）导致`AuthenticationException`，`ExceptionTranslationFilter`将调用配置的`AuthenticationEntryPoint`。如果使用CAS，这将是`CasAuthenticationEntryPoint`类。
- `CasAuthenticationEntryPoint`会将用户的浏览器重定向到CAS服务器。它还将指示`service`参数，该参数是Spring Security服务（您的应用程序）的回调URL。例如，浏览器重定向到的URL可能是[https://my.company.com/cas/login?service=https%3A%2F%2Fserver3.company.com%2Fwebapp%2Flogin/cas](https://my.company.com/cas/login?service=https%3A%2F%2Fserver3.company.com%2Fwebapp%2Flogin/cas)。
- 用户的浏览器重定向到CAS后，系统会提示他们输入用户名和密码。如果用户提供了一个表明他们之前已登录的会话cookie，则不会再提示他们再次登录（此过程有一个例外，我们将在后面介绍）。CAS将使用上面讨论的`PasswordHandler`（或`AuthenticationHandler`，如果使用CAS 3.0）来确定用户名和密码是否有效。
- 成功登录后，CAS会将用户的浏览器重定向回原始服务。它还将包含一个`ticket`参数，它是一个表示“服务票证”的不透明字符串。继续我们之前的示例，浏览器重定向到的URL可能是[https://server3.company.com/webapp/login/cas?ticket=ST-0-ER94xMJmn6pha35CQRoZ](https://server3.company.com/webapp/login/cas?ticket=ST-0-ER94xMJmn6pha35CQRoZ)。
- 早在服务web应用中，`CasAuthenticationFilter`始终监听请求`/login/cas`（这是可配置的，但我们会在此介绍使用默认值）。处理过滤器将构造表示服务票证的`UsernamePasswordAuthenticationToken`。主体将等于`CasAuthenticationFilter.CAS_STATEFUL_IDENTIFIER`，而凭证将是服务票不透明值。然后，此身份验证请求将被传递给配置的`AuthenticationManager`。
- `AuthenticationManager`实现将是`ProviderManager`，然后使用`CasAuthenticationProvider`进行配置。`CasAuthenticationProvider`仅响应包含CAS特定主体（例如`CasAuthenticationFilter.CAS_STATEFUL_IDENTIFIER`）和`CasAuthenticationToken` s（稍后讨论）的`UsernamePasswordAuthenticationToken`。
- `CasAuthenticationProvider`将使用`TicketValidator`实现验证服务票证。这通常是`Cas20ServiceTicketValidator`，它是CAS客户端库中包含的类之一。如果应用程序需要验证代理票证，则使用`Cas20ProxyTicketValidator`。`TicketValidator`向CAS服务器发出HTTPS请求以验证服务票证。它还可能包含代理回调URL，该URL包含在此示例中：[https](https://my.company.com/cas/proxyValidate?service=https%3A%2F%2Fserver3.company.com%2Fwebapp%2Flogin/cas&ticket=ST-0-ER94xMJmn6pha35CQRoZ&pgtUrl=https://server3.company.com/webapp/login/cas/proxyreceptor)：[//my.company.com/cas/proxyValidate？service = https％3A％2F％2Fserver3.company.com％2Fwebapp%2Flogin/cas&ticket= ST-0-ER94xMJmn6pha35CQRoZ＆pgtUrl = https://server3.company.com/webapp/login/cas/proxyreceptor](https://my.company.com/cas/proxyValidate?service=https%3A%2F%2Fserver3.company.com%2Fwebapp%2Flogin/cas&ticket=ST-0-ER94xMJmn6pha35CQRoZ&pgtUrl=https://server3.company.com/webapp/login/cas/proxyreceptor)。
- 返回CAS服务器，将收到验证请求。如果提供的服务票证与发出票证的服务URL相匹配，CAS将以XML格式提供肯定响应，指示用户名。如果身份验证中涉及任何代理（如下所述），则代理列表也包含在XML响应中。
- [可选]如果请求到CAS验证服务包括在代理回调URL（在`pgtUrl`参数），CAS将包括在XML响应一个`pgtIou`字符串。这个`pgtIou`代表代理授予票IOU。然后CAS服务器将创建自己的HTTPS连接回`pgtUrl`。这是为了相互验证CAS服务器和声明的服务URL。HTTPS连接将用于将代理授予票证发送到原始web应用程序。例如，[https：//server3.company.com/webapp/login/cas/proxyreceptor?pgtIou=PGTIOU-0-R0zlgrl4pdAQwBvJWO3vnNpevwqStbSGcq3vKB2SqSFFRnjPHt&pgtId=PGT-1-si9YkkHLrtACBo64rmsi3v2nf7cpCResXg5MpESZFArbaZiOKH](https://server3.company.com/webapp/login/cas/proxyreceptor?pgtIou=PGTIOU-0-R0zlgrl4pdAQwBvJWO3vnNpevwqStbSGcq3vKB2SqSFFRnjPHt&pgtId=PGT-1-si9YkkHLrtACBo64rmsi3v2nf7cpCResXg5MpESZFArbaZiOKH)。
- `Cas20TicketValidator`将解析从CAS服务器收到的XML。它将返回`CasAuthenticationProvider` a `TicketResponse`，其中包括用户名（必填），代理列表（如果涉及）和代理授予票证IOU（如果请求代理回调）。
- 下一个`CasAuthenticationProvider`将调用已配置的`CasProxyDecider`。`CasProxyDecider`表示`TicketResponse`中的代理列表是否为服务所接受。Spring Security：`RejectProxyTickets`，`AcceptAnyCasProxy`和`NamedCasProxyDecider`提供了几种实现方式。这些名称在很大程度上是不言自明的，除了`NamedCasProxyDecider`允许提供`List`个可信代理。
- `CasAuthenticationProvider`接下来将请求`AuthenticationUserDetailsService`加载适用于`Assertion`中包含的用户的`GrantedAuthority`对象。
- 如果没有问题，`CasAuthenticationProvider`构建`CasAuthenticationToken`，包括`TicketResponse`和`GrantedAuthority`中包含的详细信息。
- 然后，Control返回`CasAuthenticationFilter`，将创建的`CasAuthenticationToken`置于安全上下文中。
- 用户的浏览器被重定向到原始页面，导致`AuthenticationException`（或[自定义目标，](https://www.springcloud.cc/spring-security.html#form-login-flow-handling "认证成功与失败的应用流程")具体取决于配置）。

你还在这里真好！我们现在来看看它是如何配置的

### [](https://www.springcloud.cc/spring-security.html#cas-client)13.7.3 CAS客户端的配置

由于Spring Security，CAS的web应用程序端变得简单。假设您已经知道使用Spring Security的基础知识，因此下面不再介绍这些内容。我们假设正在使用基于命名空间的配置，并根据需要添加CAS bean。每个部分都基于上一节。可以在Spring Security样本中找到完整的[CAS样本应用程序](https://www.springcloud.cc/spring-security.html#cas-sample "5.5 CAS样品")。

#### [](https://www.springcloud.cc/spring-security.html#cas-st)服务票证认证

本节介绍如何设置Spring Security以验证服务票证。通常，这是web应用程序所需的全部内容。您需要在应用程序上下文中添加一个`ServiceProperties` bean。这代表您的CAS服务：

<bean id="serviceProperties"
    class="org.springframework.security.cas.ServiceProperties">
<property name="service"
    value="https://localhost:8443/cas-sample/login/cas"/>
<property name="sendRenew" value="false"/>
</bean>

`service`必须等于`CasAuthenticationFilter`监控的URL。`sendRenew`默认为false，但如果您的应用程序特别敏感，则应设置为true。此参数的作用是告诉CAS登录服务单点登录是不可接受的。相反，用户需要重新输入用户名和密码才能访问该服务。

应配置以下bean以启动CAS身份验证过程（假设您正在使用命名空间配置）：

<security:http entry-point-ref="casEntryPoint">
...
<security:custom-filter position="CAS_FILTER" ref="casFilter" />
</security:http>

<bean id="casFilter"
    class="org.springframework.security.cas.web.CasAuthenticationFilter">
<property name="authenticationManager" ref="authenticationManager"/>
</bean>

<bean id="casEntryPoint"
    class="org.springframework.security.cas.web.CasAuthenticationEntryPoint">
<property name="loginUrl" value="https://localhost:9443/cas/login"/>
<property name="serviceProperties" ref="serviceProperties"/>
</bean>

要使CAS运行，`ExceptionTranslationFilter`必须将其`authenticationEntryPoint`属性设置为`CasAuthenticationEntryPoint` bean。这可以使用[入口点ref](https://www.springcloud.cc/spring-security.html#ns-entry-point-ref "设置自定义AuthenticationEntryPoint")轻松完成，如上例所示。`CasAuthenticationEntryPoint`必须引用`ServiceProperties` bean（如上所述），它提供企业CAS登录服务器的URL。这是用户浏览器重定向的位置。

`CasAuthenticationFilter`具有与`UsernamePasswordAuthenticationFilter`非常相似的属性（用于基于表单的登录）。您可以使用这些属性来自定义诸如身份验证成功和失败的行为。

接下来，您需要添加`CasAuthenticationProvider`及其协作者：

<security:authentication-manager alias="authenticationManager">
<security:authentication-provider ref="casAuthenticationProvider" />
</security:authentication-manager>

<bean id="casAuthenticationProvider"
    class="org.springframework.security.cas.authentication.CasAuthenticationProvider">
<property name="authenticationUserDetailsService">
    <bean class="org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper">
    <constructor-arg ref="userService" />
    </bean>
</property>
<property name="serviceProperties" ref="serviceProperties" />
<property name="ticketValidator">
    <bean class="org.jasig.cas.client.validation.Cas20ServiceTicketValidator">
    <constructor-arg index="0" value="https://localhost:9443/cas" />
    </bean>
</property>
<property name="key" value="an_id_for_this_auth_provider_only"/>
</bean>

<security:user-service id="userService">
<!-- Password is prefixed with {noop} to indicate to DelegatingPasswordEncoder that
NoOpPasswordEncoder should be used.
This is not safe for production, but makes reading
in samples easier.
Normally passwords should be hashed using BCrypt -->
<security:user name="joe" password="{noop}joe" authorities="ROLE_USER" />
...
</security:user-service>

一旦用户通过CAS验证，`CasAuthenticationProvider`就会使用`UserDetailsService`实例加载用户的权限。我们在这里展示了一个简单的内存设置。请注意，`CasAuthenticationProvider`实际上并不使用密码进行身份验证，但它确实使用了权限。

如果您再参考[CAS工作原理](https://www.springcloud.cc/spring-security.html#cas-how-it-works "13.7.2 CAS如何工作")部分，那么这些bean都是相当不言自明的。

这样就完成了CAS的最基本配置。如果您没有犯任何错误，您的web应用程序应该很乐意在CAS单点登录的框架内工作。Spring Security的其他部分不需要担心CAS处理身份验证的事实。在以下部分中，我们将讨论一些（可选的）更高级的配置。

#### [](https://www.springcloud.cc/spring-security.html#cas-singlelogout)单点注销

CAS协议支持单点注销，可以轻松添加到Spring Security配置中。以下是处理Single Logout的Spring Security配置的更新

<security:http entry-point-ref="casEntryPoint">
...
<security:logout logout-success-url="/cas-logout.jsp"/>
<security:custom-filter ref="requestSingleLogoutFilter" before="LOGOUT_FILTER"/>
<security:custom-filter ref="singleLogoutFilter" before="CAS_FILTER"/>
</security:http>

<!-- This filter handles a Single Logout Request from the CAS Server -->
<bean id="singleLogoutFilter" class="org.jasig.cas.client.session.SingleSignOutFilter"/>

<!-- This filter redirects to the CAS Server to signal Single Logout should be performed -->
<bean id="requestSingleLogoutFilter"
    class="org.springframework.security.web.authentication.logout.LogoutFilter">
<constructor-arg value="https://localhost:9443/cas/logout"/>
<constructor-arg>
    <bean class=
        "org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler"/>
</constructor-arg>
<property name="filterProcessesUrl" value="/logout/cas"/>
</bean>

`logout`元素将用户从本地应用程序中注销，但不会终止与CAS服务器或已登录的任何其他应用程序的会话。`requestSingleLogoutFilter`过滤器将允许请求`/spring_security_cas_logout`的URL将应用程序重定向到配置的CAS服务器注销URL。然后CAS服务器将向登录的所有服务发送Single Logout请求。`singleLogoutFilter`通过在静态`Map`中查找`HttpSession`然后使其无效来处理Single Logout请求。

为什么需要`logout`元素和`singleLogoutFilter`可能会让人感到困惑。它被认为是最好的做法是先在本地注销，因为`SingleSignOutFilter`只是存储`HttpSession`在静态`Map`为了调用无效就可以了。通过上面的配置，注销流程将是：

- 用户请求`/logout`将用户登出本地应用程序并将用户发送到注销成功页面。
- 注销成功页面`/cas-logout.jsp`应指示用户单击指向`/logout/cas`的链接以退出所有应用程序。
- 当用户单击该链接时，该用户将被重定向到CAS单一注销URL（[https：// localhost：9443 / cas / logout](https://localhost:9443/cas/logout)）。
- 在CAS服务器端，CAS单一注销URL然后向所有CAS服务提交单个注销请求。在CAS服务方面，JASIG的`SingleSignOutFilter`通过使原始会话无效来处理注销请求。

下一步是将以下内容添加到web。xml中

<filter>
<filter-name>characterEncodingFilter</filter-name>
<filter-class>
    org.springframework.web.filter.CharacterEncodingFilter
</filter-class>
<init-param>
    <param-name>encoding</param-name>
    <param-value>UTF-8</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>characterEncodingFilter</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>
<listener>
<listener-class>
    org.jasig.cas.client.session.SingleSignOutHttpSessionListener
</listener-class>
</listener>

使用SingleSignOutFilter时，您可能会遇到一些编码问题。因此，建议添加`CharacterEncodingFilter`以确保在使用`SingleSignOutFilter`时字符编码正确。再次，请参阅JASIG的文档以获取详细信息。`SingleSignOutHttpSessionListener`确保当`HttpSession`到期时，将删除用于单次注销的映射。

#### [](https://www.springcloud.cc/spring-security.html#cas-pt-client)使用CAS对无状态服务进行身份验证

本节介绍如何使用CAS对服务进行身份验证。换句话说，本节讨论如何设置使用通过CAS进行身份验证的服务的客户端。下一节将介绍如何使用CAS设置无状态服务以进行身份​​验证。

##### [](https://www.springcloud.cc/spring-security.html#cas-pt-client-config)配置CAS以获取代理授予票证

为了对无状态服务进行身份验证，应用程序需要获取代理授予票证（PGT）。本节介绍如何配置Spring Security以获取基于thencas-st [Service Ticket Authentication]配置的PGT构建。

第一步是在Spring Security配置中包含`ProxyGrantingTicketStorage`。这用于存储由`CasAuthenticationFilter`获得的PGT，以便它们可用于获取代理票据。示例配置如下所示

<!--
NOTE: In a real application you should not use an in memory implementation.
You will also want to ensure to clean up expired tickets by calling
ProxyGrantingTicketStorage.cleanup()
-->
<bean id="pgtStorage" class="org.jasig.cas.client.proxy.ProxyGrantingTicketStorageImpl"/>

下一步是更新`CasAuthenticationProvider`以获取代理票证。要执行此操作，请将`Cas20ServiceTicketValidator`替换为`Cas20ProxyTicketValidator`。`proxyCallbackUrl`应设置为应用程序将接收PGT的URL。最后，配置还应该引用`ProxyGrantingTicketStorage`，以便它可以使用PGT获取代理票证。您可以在下面找到应该进行的配置更改的示例。

<bean id="casAuthenticationProvider"
    class="org.springframework.security.cas.authentication.CasAuthenticationProvider">
...
<property name="ticketValidator">
    <bean class="org.jasig.cas.client.validation.Cas20ProxyTicketValidator">
    <constructor-arg value="https://localhost:9443/cas"/>
        <property name="proxyCallbackUrl"
        value="https://localhost:8443/cas-sample/login/cas/proxyreceptor"/>
    <property name="proxyGrantingTicketStorage" ref="pgtStorage"/>
    </bean>
</property>
</bean>

最后一步是更新`CasAuthenticationFilter`以接受PGT并将其存储在`ProxyGrantingTicketStorage`中。`proxyReceptorUrl`与`Cas20ProxyTicketValidator`的`proxyCallbackUrl`匹配很重要。示例配置如下所示。

<bean id="casFilter"
        class="org.springframework.security.cas.web.CasAuthenticationFilter">
    ...
    <property name="proxyGrantingTicketStorage" ref="pgtStorage"/>
    <property name="proxyReceptorUrl" value="/login/cas/proxyreceptor"/>
</bean>

##### [](https://www.springcloud.cc/spring-security.html#cas-pt-client-sample)使用代理票证调用无状态服务

既然Spring Security获得了PGT，您可以使用它们来创建可用于对无状态服务进行身份验证的代理票据。的[CAS示例应用程序](https://www.springcloud.cc/spring-security.html#cas-sample "5.5 CAS样品")包含在`ProxyTicketSampleServlet`的工作示例。示例代码可以在下面找到：

protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
// NOTE: The CasAuthenticationToken can also be obtained using
// SecurityContextHolder.getContext().getAuthentication()
final CasAuthenticationToken token = (CasAuthenticationToken) request.getUserPrincipal();
// proxyTicket could be reused to make calls to the CAS service even if the
// target url differs
final String proxyTicket = token.getAssertion().getPrincipal().getProxyTicketFor(targetUrl);

// Make a remote call using the proxy ticket
final String serviceUrl = targetUrl+"?ticket="+URLEncoder.encode(proxyTicket, "UTF-8");
String proxyResponse = CommonUtils.getResponseFromServer(serviceUrl, "UTF-8");
...
}

#### [](https://www.springcloud.cc/spring-security.html#cas-pt)代理票证认证

`CasAuthenticationProvider`区分有状态客户和无状态客户。有状态客户被视为提交`CasAuthenticationFilter` `filterProcessUrl`的任何客户。无状态客户端是在`filterProcessUrl`以外的URL上向`CasAuthenticationFilter`提交身份验证请求的任何客户端。

由于远程协议无法在`HttpSession`的上下文中呈现自身，因此不可能依赖于在请求之间的会话中存储安全上下文的默认实践。此外，由于CAS服务器在`TicketValidator`验证之后使票证无效，因此在后续请求中显示相同的代理票证将不起作用。

一个显而易见的选择是根本不使用CAS来远程协议客户端。但是，这将消除CAS的许多理想特征。作为中间地带，`CasAuthenticationProvider`使用`StatelessTicketCache`。这仅用于使用等于`CasAuthenticationFilter.CAS_STATELESS_IDENTIFIER`的主体的无状态客户端。会发生什么情况`CasAuthenticationProvider`会将生成的`CasAuthenticationToken`存储在`StatelessTicketCache`中，并锁定代理票证。因此，远程协议客户端可以呈现相同的代理票证，`CasAuthenticationProvider`将不需要联系CAS服务器进行验证（除了第一个请求）。经过身份验证后，代理服务单可用于原始目标服务以外的URL。

本节以前面的部分为基础，以适应代理票证身份验证。第一步是指定验证所有工件，如下所示。

<bean id="serviceProperties"
    class="org.springframework.security.cas.ServiceProperties">
...
<property name="authenticateAllArtifacts" value="true"/>
</bean>

下一步是为`CasAuthenticationFilter`指定`serviceProperties`和`authenticationDetailsSource`。`serviceProperties`属性指示`CasAuthenticationFilter`尝试验证所有工件，而不仅仅验证`filterProcessUrl`上存在的工件。`ServiceAuthenticationDetailsSource`创建一个`ServiceAuthenticationDetails`，确保在验证故障单时，基于`HttpServletRequest`的当前URL用作服务URL。可以通过注入返回自定义`ServiceAuthenticationDetails`的自定义`AuthenticationDetailsSource`来自定义生成服务URL的方法。

<bean id="casFilter"
    class="org.springframework.security.cas.web.CasAuthenticationFilter">
...
<property name="serviceProperties" ref="serviceProperties"/>
<property name="authenticationDetailsSource">
    <bean class=
    "org.springframework.security.cas.web.authentication.ServiceAuthenticationDetailsSource">
    <constructor-arg ref="serviceProperties"/>
    </bean>
</property>
</bean>

您还需要更新`CasAuthenticationProvider`以处理代理票证。要执行此操作，请将`Cas20ServiceTicketValidator`替换为`Cas20ProxyTicketValidator`。您需要配置`statelessTicketCache`以及要接受的代理。您可以找到接受以下所有代理所需的更新示例。

<bean id="casAuthenticationProvider"
    class="org.springframework.security.cas.authentication.CasAuthenticationProvider">
...
<property name="ticketValidator">
    <bean class="org.jasig.cas.client.validation.Cas20ProxyTicketValidator">
    <constructor-arg value="https://localhost:9443/cas"/>
    <property name="acceptAnyProxy" value="true"/>
    </bean>
</property>
<property name="statelessTicketCache">
    <bean class="org.springframework.security.cas.authentication.EhCacheBasedTicketCache">
    <property name="cache">
        <bean class="net.sf.ehcache.Cache"
            init-method="initialise" destroy-method="dispose">
        <constructor-arg value="casTickets"/>
        <constructor-arg value="50"/>
        <constructor-arg value="true"/>
        <constructor-arg value="false"/>
        <constructor-arg value="3600"/>
        <constructor-arg value="900"/>
        </bean>
    </property>
    </bean>
</property>
</bean>

## [](https://www.springcloud.cc/spring-security.html#x509)13.8 X.509认证

### [](https://www.springcloud.cc/spring-security.html#x509-overview)13.8.1概述

X.509证书身份验证的最常见用途是在使用SSL时验证服务器的身份，最常见的是在从浏览器使用HTTPS时。浏览器将自动检查服务器提供的证书是否已由其维护的可信证书颁发机构列表之一发出（即数字签名）。

您还可以使用SSL与“相互身份验证”; 然后，服务器将从客户端请求有效证书，作为SSL握手的一部分。服务器将通过检查其证书是否由可接受的权限签名来验证客户端。如果提供了有效证书，则可以通过应用程序中的servlet API获取该证书。Spring Security X.509模块使用过滤器提取证书。它将证书映射到应用程序用户，并加载该用户的授权权限集，以便与标准Spring Security基础结构一起使用。

在尝试将其与Spring Security一起使用之前，您应该熟悉使用证书并为servlet容器设置客户端身份验证。大部分工作是创建和安装合适的证书和密钥。例如，如果您正在使用Tomcat，请阅读[http://tomcat.apache.org/tomcat-6.0-doc/ssl-howto.html中](https://tomcat.apache.org/tomcat-6.0-doc/ssl-howto.html)的说明。在使用Spring Security进行尝试之前，让这个工作变得很重要很重要

### [](https://www.springcloud.cc/spring-security.html#adding-x-509-authentication-to-your-web-application)13.8.2在Web应用程序中添加X.509身份验证

启用X.509客户端身份验证非常简单。只需将`<x509/>`元素添加到http安全命名空间配置即可。

<http>
...
    <x509 subject-principal-regex="CN=(.*?)," user-service-ref="userService"/>;
</http>

该元素有两个可选属性：

- `subject-principal-regex`.用于从证书的主题名称中提取用户名的正则表达式。默认值如上所示。这是将传递给`UserDetailsService`以加载用户权限的用户名。
- `user-service-ref`.这是与X.509一起使用的`UserDetailsService`的bean Id。如果您的应用程序上下文中只定义了一个，则不需要它。

`subject-principal-regex`应包含一个组。例如，默认表达式“CN =（。*？），”与公共名称字段匹配。因此，如果证书中的主题名称是“CN = Jimi Hendrix，OU = ...”，则会给出用户名“Jimi Hendrix”。匹配不区分大小写。因此，“emailAddress =（。？），”将匹配“EMAILADDRESS = [jimi@hendrix.org](mailto:jimi@hendrix.org)，CN = ...”，并给出用户名“ [jimi@hendrix.org](mailto:jimi@hendrix.org) ”。如果客户端提供证书并且成功提取了有效的用户名，则安全上下文中应该有一个有效的`Authentication`对象。如果未找到证书，或者找不到相应的用户，则安全上下文将保持为空。这意味着您可以轻松地将X.509身份验证与其他选项（如基于表单的登录）一起使用。

### [](https://www.springcloud.cc/spring-security.html#x509-ssl-config)13.8.3在Tomcat中设置SSL

Spring Security项目的`samples/certificate`目录中有一些预生成的证书。如果您不想生成自己的SSL，可以使用这些来启用SSL进行测试。文件`server.jks`包含服务器证书，私钥和颁发证书颁发机构证书。还有一些来自示例应用程序的用户的客户端证书文件。您可以在浏览器中安装这些以启用SSL客户端身份验证。

要使用SSL支持运行tomcat，请将`server.jks`文件放入tomcat `conf`目录并将以下连接器添加到`server.xml`文件

<Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true" scheme="https" secure="true"
            clientAuth="true" sslProtocol="TLS"
            keystoreFile="${catalina.home}/conf/server.jks"
            keystoreType="JKS" keystorePass="password"
            truststoreFile="${catalina.home}/conf/server.jks"
            truststoreType="JKS" truststorePass="password"
/>

如果您仍希望SSL连接成功，即使客户端未提供证书，也可以将`clientAuth`设置为`want`。除非您使用非X.509身份验证机制（如表单身份验证），否则不提供证书的客户端将无法访问Spring Security保护的任何对象。

## [](https://www.springcloud.cc/spring-security.html#runas)13.9运行身份验证替换

### [](https://www.springcloud.cc/spring-security.html#runas-overview)13.9.1概述

在安全对象回调阶段，`AbstractSecurityInterceptor`能够临时替换`SecurityContext`和`SecurityContextHolder`中的`Authentication`对象。仅当`AuthenticationManager`和`AccessDecisionManager`成功处理原始`Authentication`对象时，才会出现这种情况。`RunAsManager`将指示`SecurityInterceptorCallback`期间应使用的替换`Authentication`对象（如果有）。

通过在安全对象回调阶段临时替换`Authentication`对象，安全调用将能够调用需要不同身份验证和授权凭据的其他对象。它还可以对特定的`GrantedAuthority`对象执行任何内部安全检查。因为Spring Security提供了许多辅助类，它们根据`SecurityContextHolder`的内容自动配置远程协议，所以这些run-as替换在调用远程web服务时特别有用

### [](https://www.springcloud.cc/spring-security.html#runas-config)13.9.2配置

Spring Security提供`RunAsManager`接口：

Authentication buildRunAs(Authentication authentication, Object object,
    List<ConfigAttribute> config);

boolean supports(ConfigAttribute attribute);

boolean supports(Class clazz);

第一个方法返回`Authentication`对象，该对象应在方法调用期间替换现有的`Authentication`对象。如果方法返回`null`，则表示不应进行替换。第二种方法由`AbstractSecurityInterceptor`用作配置属性的启动验证的一部分。`supports(Class)`方法由安全拦截器实现调用，以确保配置的`RunAsManager`支持安全拦截器将呈现的安全对象的类型。

Spring Security提供了`RunAsManager`的一个具体实施。如果任何`ConfigAttribute`以`RUN_AS_`开头，`RunAsManagerImpl`类将返回替换`RunAsUserToken`。如果找到任何此类`ConfigAttribute`，则替换`RunAsUserToken`将包含与原始`Authentication`对象相同的主体，凭据和授予的权限，以及每个`RUN_AS_`的新`SimpleGrantedAuthority` `ConfigAttribute`。每个新的`SimpleGrantedAuthority`都会以`ROLE_`为前缀，然后是`RUN_AS` `ConfigAttribute`。例如，`RUN_AS_SERVER`将导致替换`RunAsUserToken`包含`ROLE_RUN_AS_SERVER`授予的权限。

替换`RunAsUserToken`就像任何其他`Authentication`对象一样。它需要通过`AuthenticationManager`进行身份验证，可能需要通过委派给合适的`AuthenticationProvider`。`RunAsImplAuthenticationProvider`执行此类身份验证。它只是接受任何`RunAsUserToken`提出的有效。

为了确保恶意代码不会创建`RunAsUserToken`并将其呈现为`RunAsImplAuthenticationProvider`保证接受，密钥的哈希值将存储在所有生成的令牌中。undefined和`RunAsImplAuthenticationProvider`在bean上下文中使用相同的键创建：

<bean id="runAsManager"
    class="org.springframework.security.access.intercept.RunAsManagerImpl">
<property name="key" value="my_run_as_password"/>
</bean>

<bean id="runAsAuthenticationProvider"
    class="org.springframework.security.access.intercept.RunAsImplAuthenticationProvider">
<property name="key" value="my_run_as_password"/>
</bean>

通过使用相同的密钥，每个`RunAsUserToken`都可以通过已批准的`RunAsManagerImpl`创建。出于安全原因，`RunAsUserToken`在创建后是不可变的

## [](https://www.springcloud.cc/spring-security.html#crypto)13.10 Spring Security加密模块

### [](https://www.springcloud.cc/spring-security.html#spring-security-crypto-introduction)13.10.1简介

Spring Security加密模块支持对称加密，密钥生成和密码编码。代码作为核心模块的一部分分发，但不依赖于任何其他Spring Security（或Spring）代码。

### [](https://www.springcloud.cc/spring-security.html#spring-security-crypto-encryption)13.10.2加密器

Encryptors类提供用于构造对称加密器的工厂方法。使用此类，您可以创建ByteEncryptors以加密原始byte []形式的数据。您还可以构造TextEncryptors来加密文本字符串。加密器是线程安全的。

#### [](https://www.springcloud.cc/spring-security.html#spring-security-crypto-encryption-bytes)BytesEncryptor

使用Encryptors.standard工厂方法构造“标准”BytesEncryptor：

Encryptors.standard("password", "salt");

“标准”加密方法是使用PKCS＃5的PBKDF2（基于密码的密钥导出功能＃2）的256位AES。此方法需要Java 6.用于生成SecretKey的密码应保存在安全的位置而不能共享。在加密数据受到威胁的情况下，salt用于防止对密钥的字典攻击。还应用了16字节的随机初始化向量，因此每个加密消息都是唯一的。

提供的salt应该是十六进制编码的String形式，是随机的，并且长度至少为8个字节。可以使用KeyGenerator生成这样的salt：

String salt = KeyGenerators.string().generateKey(); // generates a random 8-byte salt that is then hex-encoded

#### [](https://www.springcloud.cc/spring-security.html#spring-security-crypto-encryption-text)TextEncryptor

使用Encryptors.text工厂方法构造标准TextEncryptor：

Encryptors.text("password", "salt");

TextEncryptor使用标准的BytesEncryptor来加密文本数据。加密结果以十六进制编码的字符串形式返回，以便在文件系统或数据库中存储。

使用Encryptors.queryableText工厂方法构造“可查询”的TextEncryptor：

Encryptors.queryableText("password", "salt");

可查询TextEncryptor与标准TextEncryptor之间的区别与初始化向量（iv）处理有关。在可查询的TextEncryptor＃encrypt操作中使用的iv是共享的，或者是常量的，并且不是随机生成的。这意味着多次加密的相同文本将始终产生相同的加密结果。这不太安全，但对于需要查询的加密数据是必需的。可查询加密文本的示例是OAuth apiKey。

### [](https://www.springcloud.cc/spring-security.html#spring-security-crypto-keygenerators)13.10.3密钥生成器

KeyGenerators类提供了许多便利工厂方法，用于构造不同类型的密钥生成器。使用此类，您可以创建BytesKeyGenerator来生成byte []键。您还可以构造StringKeyGenerator来生成字符串键。KeyGenerators是线程安全的。

#### [](https://www.springcloud.cc/spring-security.html#byteskeygenerator)BytesKeyGenerator

使用KeyGenerators.secureRandom工厂方法生成由SecureRandom实例支持的BytesKeyGenerator：

BytesKeyGenerator generator = KeyGenerators.secureRandom();
byte[] key = generator.generateKey();

默认密钥长度为8个字节。还有一个KeyGenerators.secureRandom变体，可以控制密钥长度：

KeyGenerators.secureRandom(16);

使用KeyGenerators.shared工厂方法构造一个BytesKeyGenerator，它始终在每次调用时返回相同的键：

KeyGenerators.shared(16);

#### [](https://www.springcloud.cc/spring-security.html#stringkeygenerator)StringKeyGenerator

使用KeyGenerators.string工厂方法构造一个8字节的SecureRandom KeyGenerator，它将每个键的十六进制编码为String：

KeyGenerators.string();

### [](https://www.springcloud.cc/spring-security.html#spring-security-crypto-passwordencoders)13.10.4密码编码

spring-security-crypto模块的密码包提供对密码编码的支持。`PasswordEncoder`是中央服务接口，具有以下签名：

public interface PasswordEncoder {

String encode(String rawPassword);

boolean matches(String rawPassword, String encodedPassword);
}

如果rawPassword在编码后等于encodedPassword，则matches方法返回true。此方法旨在支持基于密码的身份验证方案。

`BCryptPasswordEncoder`实现使用广泛支持的“bcrypt”算法来对密码进行哈希处理。Bcrypt使用随机的16字节盐值，是一种故意慢的算法，以阻止密码破解程序。可以使用“strength”参数调整它所做的工作量，该参数取值为4到31.值越高，计算散列的工作就越多。默认值为10.您可以在已部署的系统中更改此值，而不会影响现有密码，因为该值也存储在编码哈希中。

// Create an encoder with strength 16
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));

`Pbkdf2PasswordEncoder`实现使用PBKDF2算法来散列密码。为了防止密码破解，PBKDF2是一种故意慢的算法，应该调整大约需要0.5秒来验证系统上的密码。

// Create an encoder with all the defaults
Pbkdf2PasswordEncoder encoder = new Pbkdf2PasswordEncoder();
String result = encoder.encode("myPassword");
assertTrue(encoder.matches("myPassword", result));

## [](https://www.springcloud.cc/spring-security.html#concurrency)13.11并发支持

在大多数环境中，安全性基于`Thread`存储。这意味着当在新的`Thread`上完成工作时，`SecurityContext`将丢失。Spring Security提供了一些基础设施，以帮助用户更轻松地完成这项工作。Spring Security提供了在多线程环境中使用Spring Security的低级抽象。事实上，这是Spring Security与[“AsyncContext.start（Runnable）”](https://www.springcloud.cc/spring-security.html#servletapi-start-runnable "AsyncContext.start（可运行）")和[第13.12.4节“Spring MVC异步集成”一节的集成](https://www.springcloud.cc/spring-security.html#mvc-async "13.12.4 Spring MVC异步集成")。

### [](https://www.springcloud.cc/spring-security.html#delegatingsecuritycontextrunnable)13.11.1 DelegatingSecurityContextRunnable

Spring Security并发支持中最基本的构建块之一是`DelegatingSecurityContextRunnable`。它包装一个委托`Runnable`，以便为委托初始化`SecurityContextHolder`指定的`SecurityContext`。然后它调用委托Runnable，确保之后清除`SecurityContextHolder`。`DelegatingSecurityContextRunnable`看起来像这样：

public void run() {
try {
    SecurityContextHolder.setContext(securityContext);
    delegate.run();
} finally {
    SecurityContextHolder.clearContext();
}
}

虽然非常简单，但它可以将SecurityContext从一个Thread转移到另一个Thread。这很重要，因为在大多数情况下，SecurityContextHolder基于每个线程进行操作。例如，您可能使用过Spring Security[the section called “<global-method-security>”](https://www.springcloud.cc/spring-security.html#nsa-global-method-security "<global-method-security>")支持保护您的某项服务。您现在可以轻松地将当前`Thread`的`SecurityContext`传输到调用安全服务的`Thread`。您可以在下面找到如何执行此操作的示例：

Runnable originalRunnable = new Runnable() {
public void run() {
    // invoke secured service
}
};

SecurityContext context = SecurityContextHolder.getContext();
DelegatingSecurityContextRunnable wrappedRunnable =
    new DelegatingSecurityContextRunnable(originalRunnable, context);

new Thread(wrappedRunnable).start();

上面的代码执行以下步骤：

- 创建一个将调用我们的安全服务的`Runnable`。请注意，它不知道Spring Security
- 从`SecurityContextHolder`获得我们希望使用的`SecurityContext`并初始化`DelegatingSecurityContextRunnable`
- 使用`DelegatingSecurityContextRunnable`创建一个Thread
- 启动我们创建的线程

由于在`SecurityContextHolder`中使用`SecurityContext`创建`DelegatingSecurityContextRunnable`是很常见的，因此有一个快捷方式构造函数。以下代码与上面的代码相同：

Runnable originalRunnable = new Runnable() {
public void run() {
    // invoke secured service
}
};

DelegatingSecurityContextRunnable wrappedRunnable =
    new DelegatingSecurityContextRunnable(originalRunnable);

new Thread(wrappedRunnable).start();

我们的代码很简单，但它仍然需要我们使用Spring Security的知识。在下一节中，我们将了解如何利用`DelegatingSecurityContextExecutor`隐藏我们使用Spring Security的事实。

### [](https://www.springcloud.cc/spring-security.html#delegatingsecuritycontextexecutor)13.11.2 DelegatingSecurityContextExecutor

在上一节中，我们发现很容易使用`DelegatingSecurityContextRunnable`，但它并不理想，因为我们必须知道Spring Security才能使用它。让我们来看看`DelegatingSecurityContextExecutor`如何保护我们的代码免受我们使用的任何知识Spring Security。

`DelegatingSecurityContextExecutor`的设计与`DelegatingSecurityContextRunnable`的设计非常相似，除了它接受代表`Executor`而不是代表`Runnable`。您可以在下面看到如何使用它的示例：

SecurityContext context = SecurityContextHolder.createEmptyContext();
Authentication authentication =
    new UsernamePasswordAuthenticationToken("user","doesnotmatter", AuthorityUtils.createAuthorityList("ROLE_USER"));
context.setAuthentication(authentication);

SimpleAsyncTaskExecutor delegateExecutor =
    new SimpleAsyncTaskExecutor();
DelegatingSecurityContextExecutor executor =
    new DelegatingSecurityContextExecutor(delegateExecutor, context);

Runnable originalRunnable = new Runnable() {
public void run() {
    // invoke secured service
}
};

executor.execute(originalRunnable);

该代码执行以下步骤：

- 创建`SecurityContext`以用于我们的`DelegatingSecurityContextExecutor`。请注意，在此示例中，我们只需手动创建`SecurityContext`。但是，我们在何处或如何获得`SecurityContext`并不重要（即如果我们想要的话，我们可以从`SecurityContextHolder`获得它）。
- 创建一个负责执行提交的`Runnable`的delegateExecutor
- 最后，我们创建一个`DelegatingSecurityContextExecutor`，它负责包装传递给执行方法的任何Runnable，其值为`DelegatingSecurityContextRunnable`。然后它将包装好的Runnable传递给delegateExecutor。在这种情况下，提交给`DelegatingSecurityContextExecutor`的每个Runnable都将使用相同的`SecurityContext`。如果我们正在运行需要由具有提升权限的用户运行的后台任务，那么这很好。
- 在这一点上，你可能会问自己“这如何保护我的代码Spring Security的任何知识？” 我们可以注入已经初始化的`DelegatingSecurityContextExecutor`实例，而不是在我们自己的代码中创建`SecurityContext`和`DelegatingSecurityContextExecutor`。

_@Autowired_
private Executor executor; // becomes an instance of our DelegatingSecurityContextExecutor

public void submitRunnable() {
Runnable originalRunnable = new Runnable() {
    public void run() {
    // invoke secured service
    }
};
executor.execute(originalRunnable);
}

现在我们的代码不知道`SecurityContext`正在传播到`Thread`，然后`originalRunnable`被执行，然后`SecurityContextHolder`被清除。在此示例中，正在使用相同的用户来执行每个线程。如果我们在调用`executor.execute(Runnable)`（即当前登录的用户）时使用来自`SecurityContextHolder`的用户来处理`originalRunnable`该怎么办？这可以通过从`DelegatingSecurityContextExecutor`构造函数中删除`SecurityContext`参数来完成。例如：

SimpleAsyncTaskExecutor delegateExecutor = new SimpleAsyncTaskExecutor();
DelegatingSecurityContextExecutor executor =
    new DelegatingSecurityContextExecutor(delegateExecutor);

现在任何时候`executor.execute(Runnable)`被执行`SecurityContext`首先由`SecurityContextHolder`获得，然后`SecurityContext`用于创建我们的`DelegatingSecurityContextRunnable`。这意味着我们正在使用用于调用`executor.execute(Runnable)`代码的相同用户执行`Runnable`。

### [](https://www.springcloud.cc/spring-security.html#spring-security-concurrency-classes)13.11.3 Spring Security并发类

有关Java并发API和Spring任务抽象的其他集成，请参阅Javadoc。一旦理解了以前的代码，它们就会变得不言自明。

- DelegatingSecurityContextCallable
- DelegatingSecurityContextExecutor
- DelegatingSecurityContextExecutorService
- DelegatingSecurityContextRunnable
- DelegatingSecurityContextScheduledExecutorService
- DelegatingSecurityContextSchedulingTaskExecutor
- DelegatingSecurityContextAsyncTaskExecutor
- DelegatingSecurityContextTaskExecutor

## [](https://www.springcloud.cc/spring-security.html#mvc)13.12 Spring MVC整合

Spring Security提供了许多与Spring MVC的可选集成。本节将更详细地介绍集成。

### [](https://www.springcloud.cc/spring-security.html#mvc-enablewebmvcsecurity)13.12.1 @EnableWebMvcSecurity

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|截至Spring Security 4.0，不推荐使用`@EnableWebMvcSecurity`。替换为`@EnableWebSecurity`，将确定根据类路径添加Spring MVC功能。|

要启用Spring Security与Spring MVC的集成，请在配置中添加`@EnableWebSecurity`注释。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|Spring Security使用Spring MVC的[WebMvcConfigurer](https://docs.spring.io/spring/docs/5.0.0.RELEASE/spring-framework-reference/web.html#mvc-config-customize)提供配置。这意味着如果您使用更高级的选项，例如直接与`WebMvcConfigurationSupport`集成，则需要手动提供Spring Security配置。|

### [](https://www.springcloud.cc/spring-security.html#mvc-requestmatcher)13.12.2 MvcRequestMatcher

Spring Security提供了与Spring MVC匹配`MvcRequestMatcher`的网址的深度集成。这有助于确保您的安全规则与用于处理请求的逻辑相匹配。

要使用`MvcRequestMatcher`，您必须将Spring Security配置放在与`DispatcherServlet`相同的`ApplicationContext`中。这是必要的，因为Spring Security的`MvcRequestMatcher`期望用于执行匹配的Spring MVC配置注册名称为`mvcHandlerMappingIntrospector`的`HandlerMappingIntrospector` bean。

对于`web.xml`，这意味着您应该将配置放在`DispatcherServlet.xml`中。

<listener>
  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>

<!-- All Spring Configuration (both MVC and Security) are in /WEB-INF/spring/ -->
<context-param>
  <param-name>contextConfigLocation</param-name>
  <param-value>/WEB-INF/spring/*.xml</param-value>
</context-param>

<servlet>
  <servlet-name>spring</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  <!-- Load from the ContextLoaderListener -->
  <init-param>
    <param-name>contextConfigLocation</param-name>
    <param-value></param-value>
  </init-param>
</servlet>

<servlet-mapping>
  <servlet-name>spring</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>

`DispatcherServlet` `ApplicationContext` `WebSecurityConfiguration`以下`WebSecurityConfiguration`。

public class SecurityInitializer extends
    AbstractAnnotationConfigDispatcherServletInitializer {

  _@Override_
  protected Class<?>[] getRootConfigClasses() {
    return null;
  }

  _@Override_
  protected Class<?>[] getServletConfigClasses() {
    return new Class[] { RootConfiguration.class,
        WebMvcConfiguration.class };
  }

  _@Override_
  protected String[] getServletMappings() {
    return new String[] { "/" };
  }
}

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|始终建议通过匹配`HttpServletRequest`和方法安全性来提供授权规则。<br><br>通过在`HttpServletRequest`上匹配来提供授权规则是很好的，因为它在代码路径中很早就发生并且有助于减少[攻击面](https://en.wikipedia.org/wiki/Attack_surface)。方法安全性确保如果有人绕过web授权规则，您的应用程序仍然是安全的。这就是所谓的[深度防御](https://en.wikipedia.org/wiki/Defense_in_depth_(computing))|

考虑一个映射如下的控制器：

_@RequestMapping("/admin")_
public String admin() {

如果我们想限制对管理员用户使用此控制器方法，开发人员可以通过在`HttpServletRequest`上匹配以下内容来提供授权规则：

protected configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .antMatchers("/admin").hasRole("ADMIN");
}

或者用XML

<http>
    <intercept-url pattern="/admin" access="hasRole('ADMIN')"/>
</http>

使用任一配置，URL `/admin`都将要求经过身份验证的用户成为管理员用户。但是，根据我们的Spring MVC配置，网址`/admin.html`也会映射到我们的`admin()`方法。此外，根据我们的Spring MVC配置，网址`/admin/`也会映射到我们的`admin()`方法。

问题是我们的安全规则只保护`/admin`。我们可以为Spring MVC的所有排列添加额外的规则，但这将是非常冗长和乏味的。

相反，我们可以利用Spring Security的`MvcRequestMatcher`。以下配置将使用Spring MVC匹配URL来保护Spring MVC匹配的相同URL。

protected configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .mvcMatchers("/admin").hasRole("ADMIN");
}

或者用XML

<http request-matcher="mvc">
    <intercept-url pattern="/admin" access="hasRole('ADMIN')"/>
</http>

### [](https://www.springcloud.cc/spring-security.html#mvc-authentication-principal)13.12.3 @AuthenticationPrincipal

Spring Security提供`AuthenticationPrincipalArgumentResolver`，它可以自动解析Spring MVC个参数的当前`Authentication.getPrincipal()`。使用`@EnableWebSecurity`，您将自动将其添加到Spring MVC配置中。如果使用基于XML的配置，则必须自己添加。例如：

<mvc:annotation-driven>
        <mvc:argument-resolvers>
                <bean class="org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver" />
        </mvc:argument-resolvers>
</mvc:annotation-driven>

正确配置`AuthenticationPrincipalArgumentResolver`后，您可以完全与Spring MVC图层中的Spring Security分离。

考虑一种情况，其中自定义`UserDetailsService`返回`Object`，实现`UserDetails`和您自己的`CustomUser` `Object`。可以使用以下代码访问当前已验证用户的`CustomUser`：

_@RequestMapping("/messages/inbox")_
public ModelAndView findMessagesForUser() {
    Authentication authentication =
    SecurityContextHolder.getContext().getAuthentication();
    CustomUser custom = (CustomUser) authentication == null ? null : authentication.getPrincipal();

    // .. find messages for this user and return them ...
}

从Spring Security 3.2开始，我们可以通过添加注释更直接地解决参数。例如：

import org.springframework.security.core.annotation.AuthenticationPrincipal;

// ...

_@RequestMapping("/messages/inbox")_
public ModelAndView findMessagesForUser(_@AuthenticationPrincipal_ CustomUser customUser) {

    // .. find messages for this user and return them ...
}

有时可能需要以某种方式改变委托人。例如，如果`CustomUser`需要最终，则无法延长。在这种情况下，`UserDetailsService`可能会返回`Object`，它实现`UserDetails`并提供一个名为`getCustomUser`的方法来访问`CustomUser`。例如，它可能看起来像：

public class CustomUserUserDetails extends User {
        // ...
        public CustomUser getCustomUser() {
                return customUser;
        }
}

然后我们可以使用[SpEL表达式](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html)访问`CustomUser`，该[表达式](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/expressions.html)使用`Authentication.getPrincipal()`作为根对象：

import org.springframework.security.core.annotation.AuthenticationPrincipal;

// ...

_@RequestMapping("/messages/inbox")_
public ModelAndView findMessagesForUser(_@AuthenticationPrincipal(expression = "customUser")_ CustomUser customUser) {

    // .. find messags for this user and return them ...
}

我们也可以在SpEL表达式中引用Beans。例如，如果我们使用JPA来管理我们的用户并且我们想要修改并保存当前用户的属性，则可以使用以下内容。

import org.springframework.security.core.annotation.AuthenticationPrincipal;

// ...

_@PutMapping("/users/self")_
public ModelAndView updateName(_@AuthenticationPrincipal(expression = "@jpaEntityManager.merge(#this)")_ CustomUser attachedCustomUser,
        _@RequestParam_ String firstName) {

    // change the firstName on an attached instance which will be persisted to the database
    attachedCustomUser.setFirstName(firstName);

    // ...
}

我们可以通过在我们自己的注释上使用`@AuthenticationPrincipal`元注释来进一步消除对Spring Security的依赖。下面我们将演示如何在名为`@CurrentUser`的注释上执行此操作。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|重要的是要意识到，为了消除对Spring Security的依赖，消费应用程序将创建`@CurrentUser`。此步骤并非严格要求，但有助于将您的依赖关系隔离到Spring Security到更中心的位置。|

_@Target({ElementType.PARAMETER, ElementType.TYPE})_
_@Retention(RetentionPolicy.RUNTIME)_
_@Documented_
_@AuthenticationPrincipal_
public _@interface_ CurrentUser {}

现在已经指定`@CurrentUser`，我们可以使用它来发信号以解析当前已验证用户的`CustomUser`。我们还将对Spring Security的依赖性与单个文件隔离开来。

_@RequestMapping("/messages/inbox")_
public ModelAndView findMessagesForUser(_@CurrentUser_ CustomUser customUser) {

    // .. find messages for this user and return them ...
}

### [](https://www.springcloud.cc/spring-security.html#mvc-async)13.12.4 Spring MVC异步集成

Spring Web MVC 3.2+非常支持[异步请求处理](https://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/mvc.html#mvc-ann-async)。如果没有其他配置，Spring Security会自动将`SecurityContext`设置为执行控制器返回的`Callable`的`Thread`。例如，以下方法将自动使用创建`Callable`时可用的`SecurityContext`执行`Callable`：

_@RequestMapping(method=RequestMethod.POST)_
public Callable<String> processUpload(final MultipartFile file) {

return new Callable<String>() {
    public Object call() throws Exception {
    // ...
    return "someView";
    }
};
}

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|从技术上讲，Spring Security与`WebAsyncManager`相结合。用于处理`Callable`的`SecurityContext`是在调用`startCallableProcessing`时`SecurityContextHolder`上存在的`SecurityContext`。|

没有与控制器返回的`DeferredResult`自动集成。这是因为`DeferredResult`由用户处理，因此无法自动与其集成。但是，您仍然可以使用[并发支持](https://www.springcloud.cc/spring-security.html#concurrency "13.11并发支持")来提供与Spring Security的透明集成。

### [](https://www.springcloud.cc/spring-security.html#mvc-csrf)13.12.5 Spring MVC和CSRF集成

#### [](https://www.springcloud.cc/spring-security.html#automatic-token-inclusion)自动令牌包含

Spring Security将自动在使用[Spring MVC表单标记的](https://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/view.html#view-jsp-formtaglib-formtag)表单中[包含CSRF令牌](https://www.springcloud.cc/spring-security.html#csrf-include-csrf-token "包括CSRF令牌")。例如，以下JSP：[](https://docs.spring.io/spring/docs/3.2.x/spring-framework-reference/html/view.html#view-jsp-formtaglib-formtag)

<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page"
    xmlns:c="http://java.sun.com/jsp/jstl/core"
    xmlns:form="http://www.springframework.org/tags/form" version="2.0">
    <jsp:directive.page language="java" contentType="text/html" />
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
    <!-- ... -->

    <c:url var="logoutUrl" value="/logout"/>
    <form:form action="${logoutUrl}"
        method="post">
    <input type="submit"
        value="Log out" />
    <input type="hidden"
        name="${_csrf.parameterName}"
        value="${_csrf.token}"/>
    </form:form>

    <!-- ... -->
</html>
</jsp:root>

将输出类似于以下内容的HTML：

<!-- ... -->

<form action="/context/logout" method="post">
<input type="submit" value="Log out"/>
<input type="hidden" name="_csrf" value="f81d4fae-7dec-11d0-a765-00a0c91e6bf6"/>
</form>

<!-- ... -->

#### [](https://www.springcloud.cc/spring-security.html#mvc-csrf-resolver)解决CsrfToken

Spring Security提供`CsrfTokenArgumentResolver`，它可以自动解析Spring MVC个参数的当前`CsrfToken`。通过使用[@EnableWebSecurity，](https://www.springcloud.cc/spring-security.html#jc-hello-wsca)您将自动将其添加到Spring MVC配置中。如果您使用基于XML的配置，则必须自己添加。

正确配置`CsrfTokenArgumentResolver`后，您可以将`CsrfToken`公开给基于静态HTML的应用程序。

_@RestController_
public class CsrfController {

    _@RequestMapping("/csrf")_
    public CsrfToken csrf(CsrfToken token) {
        return token;
    }
}

保持`CsrfToken`对其他域的秘密非常重要。这意味着如果您使用的是[跨域共享（CORS）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)，**则不**应将`CsrfToken`公开给任何外部域。

  

---

[[21]](https://www.springcloud.cc/spring-security.html#d5e6267)也支持Spring Security 2.0的遗留选项，但不鼓励。

## [](https://www.springcloud.cc/spring-security.html#data)14. Spring Data整合

Spring Security提供Spring Data集成，允许引用查询中的当前用户。将用户包括在查询中以支持分页结果不仅有用而且必要，因为之后过滤结果将无法扩展。

## [](https://www.springcloud.cc/spring-security.html#data-configuration)14.1 Spring Data和Spring Security配置

要使用此支持，请添加`org.springframework.security:spring-security-data`依赖项并提供类型为`SecurityEvaluationContextExtension`的bean。在Java配置中，这看起来像：

_@Bean_
public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
    return new SecurityEvaluationContextExtension();
}

在XML配置中，这看起来像：

<bean class="org.springframework.security.data.repository.query.SecurityEvaluationContextExtension"/>

## [](https://www.springcloud.cc/spring-security.html#data-query)14.2 @Query中的安全表达式

现在Spring Security可以在您的查询中使用。例如：

_@Repository_
public interface MessageRepository extends PagingAndSortingRepository<Message,Long> {
    _@Query("select m from Message m where m.to.id = ?#{ principal?.id }")_
    Page<Message> findInbox(Pageable pageable);
}

这将检查`Authentication.getPrincipal().getId()`是否等于`Message`的接收者。请注意，此示例假定您已将主体自定义为具有id属性的Object。通过公开`SecurityEvaluationContextExtension` bean，查询中可以使用所有[公共安全表达式](https://www.springcloud.cc/spring-security.html#common-expressions "表11.1。 常见的内置表达式")。

## [](https://www.springcloud.cc/spring-security.html#appendix)15.附录

## [](https://www.springcloud.cc/spring-security.html#appendix-schema)15.1安全数据库Schema

框架使用了各种数据库模式，本附录为它们提供了单个参考点。您只需提供所需功能区域的表格。

为HSQLDB数据库提供了DDL语句。您可以使用这些作为指导来定义您正在使用的数据库的模式。

### [](https://www.springcloud.cc/spring-security.html#user-schema)15.1.1用户Schema

`UserDetailsService`（`JdbcDaoImpl`）的标准JDBC实现要求表加载用户的密码，帐户状态（启用或禁用）和权限列表（角色）。您需要调整此架构以匹配您正在使用的数据库方言。

create table users(
    username varchar_ignorecase(50) not null primary key,
    password varchar_ignorecase(50) not null,
    enabled boolean not null
);

create table authorities (
    username varchar_ignorecase(50) not null,
    authority varchar_ignorecase(50) not null,
    constraint fk_authorities_users foreign key(username) references users(username)
);
create unique index ix_auth_username on authorities (username,authority);

#### [](https://www.springcloud.cc/spring-security.html#for-oracle-database)对于Oracle数据库

CREATE TABLE USERS (
    USERNAME NVARCHAR2(128) PRIMARY KEY,
    PASSWORD NVARCHAR2(128) NOT NULL,
    ENABLED CHAR(1) CHECK (ENABLED IN ('Y','N') ) NOT NULL
);


CREATE TABLE AUTHORITIES (
    USERNAME NVARCHAR2(128) NOT NULL,
    AUTHORITY NVARCHAR2(128) NOT NULL
);
ALTER TABLE AUTHORITIES ADD CONSTRAINT AUTHORITIES_UNIQUE UNIQUE (USERNAME, AUTHORITY);
ALTER TABLE AUTHORITIES ADD CONSTRAINT AUTHORITIES_FK1 FOREIGN KEY (USERNAME) REFERENCES USERS (USERNAME) ENABLE;

#### [](https://www.springcloud.cc/spring-security.html#group-authorities)集团当局

Spring Security 2.0在`JdbcDaoImpl`中引入了对小组当局的支持。如果启用了组，则表结构如下所示。您需要调整此架构以匹配您正在使用的数据库方言。

create table groups (
    id bigint generated by default as identity(start with 0) primary key,
    group_name varchar_ignorecase(50) not null
);

create table group_authorities (
    group_id bigint not null,
    authority varchar(50) not null,
    constraint fk_group_authorities_group foreign key(group_id) references groups(id)
);

create table group_members (
    id bigint generated by default as identity(start with 0) primary key,
    username varchar(50) not null,
    group_id bigint not null,
    constraint fk_group_members_group foreign key(group_id) references groups(id)
);

请记住，只有在使用提供的JDBC `UserDetailsService`实现时才需要这些表。如果您自己编写或选择在没有`UserDetailsService`的情况下实施`AuthenticationProvider`，那么只要满足接口合同，您就可以完全自由地存储数据。

### [](https://www.springcloud.cc/spring-security.html#persistent-login-remember-me-schema)15.1.2持久登录（记住我）Schema

此表用于存储更安全的[持久性令牌](https://www.springcloud.cc/spring-security.html#remember-me-persistent-token "10.5.3持久令牌方法")记住我实现所使用的数据。如果直接或通过命名空间使用`JdbcTokenRepositoryImpl`，则需要此表。请记住调整此架构以匹配您正在使用的数据库方言。

create table persistent_logins (
    username varchar(64) not null,
    series varchar(64) primary key,
    token varchar(64) not null,
    last_used timestamp not null
);

### [](https://www.springcloud.cc/spring-security.html#dbschema-acl)15.1.3 ACL Schema

Spring Security [ACL](https://www.springcloud.cc/spring-security.html#domain-acls "12.1域对象安全性（ACL）")实现使用了四个表。

1. `acl_sid`存储ACL系统识别的安全标识。这些可以是可以应用于多个主体的唯一主体或权限。
2. `acl_class`定义ACL应用的域对象类型。`class`列存储对象的Java类名。
3. `acl_object_identity`存储特定域对象的对象标识定义。
4. `acl_entry`存储适用于特定对象标识和安全标识的ACL权限。

假设数据库将自动生成每个身份的主键。`JdbcMutableAclService`必须能够在`acl_sid`或`acl_class`表中创建新行时检索这些内容。它有两个属性，用于定义检索这些值`classIdentityQuery`和`sidIdentityQuery`所需的SQL。这两个都默认为`call identity()`

ACL工件JAR包含用于在HyperSQL（HSQLDB），PostgreSQL，MySQL / MariaDB，Microsoft SQL Server和Oracle数据库中创建ACL模式的文件。以下各节还演示了这些模式。

#### [](https://www.springcloud.cc/spring-security.html#hypersql)的HyperSQL

默认架构适用于框架内单元测试中使用的嵌入式HSQLDB数据库。

create table acl_sid(
    id bigint generated by default as identity(start with 100) not null primary key,
    principal boolean not null,
    sid varchar_ignorecase(100) not null,
    constraint unique_uk_1 unique(sid,principal)
);

create table acl_class(
    id bigint generated by default as identity(start with 100) not null primary key,
    class varchar_ignorecase(100) not null,
    constraint unique_uk_2 unique(class)
);

create table acl_object_identity(
    id bigint generated by default as identity(start with 100) not null primary key,
    object_id_class bigint not null,
    object_id_identity varchar_ignorecase(36) not null,
    parent_object bigint,
    owner_sid bigint,
    entries_inheriting boolean not null,
    constraint unique_uk_3 unique(object_id_class,object_id_identity),
    constraint foreign_fk_1 foreign key(parent_object)references acl_object_identity(id),
    constraint foreign_fk_2 foreign key(object_id_class)references acl_class(id),
    constraint foreign_fk_3 foreign key(owner_sid)references acl_sid(id)
);

create table acl_entry(
    id bigint generated by default as identity(start with 100) not null primary key,
    acl_object_identity bigint not null,
    ace_order int not null,
    sid bigint not null,
    mask integer not null,
    granting boolean not null,
    audit_success boolean not null,
    audit_failure boolean not null,
    constraint unique_uk_4 unique(acl_object_identity,ace_order),
    constraint foreign_fk_4 foreign key(acl_object_identity) references acl_object_identity(id),
    constraint foreign_fk_5 foreign key(sid) references acl_sid(id)
);

#### [](https://www.springcloud.cc/spring-security.html#postgresql)PostgreSQL的

create table acl_sid(
    id bigserial not null primary key,
    principal boolean not null,
    sid varchar(100) not null,
    constraint unique_uk_1 unique(sid,principal)
);

create table acl_class(
    id bigserial not null primary key,
    class varchar(100) not null,
    constraint unique_uk_2 unique(class)
);

create table acl_object_identity(
    id bigserial primary key,
    object_id_class bigint not null,
    object_id_identity varchar(36) not null,
    parent_object bigint,
    owner_sid bigint,
    entries_inheriting boolean not null,
    constraint unique_uk_3 unique(object_id_class,object_id_identity),
    constraint foreign_fk_1 foreign key(parent_object)references acl_object_identity(id),
    constraint foreign_fk_2 foreign key(object_id_class)references acl_class(id),
    constraint foreign_fk_3 foreign key(owner_sid)references acl_sid(id)
);

create table acl_entry(
    id bigserial primary key,
    acl_object_identity bigint not null,
    ace_order int not null,
    sid bigint not null,
    mask integer not null,
    granting boolean not null,
    audit_success boolean not null,
    audit_failure boolean not null,
    constraint unique_uk_4 unique(acl_object_identity,ace_order),
    constraint foreign_fk_4 foreign key(acl_object_identity) references acl_object_identity(id),
    constraint foreign_fk_5 foreign key(sid) references acl_sid(id)
);

您必须将`JdbcMutableAclService`的`classIdentityQuery`和`sidIdentityQuery`属性分别设置为以下值：

- `select currval(pg_get_serial_sequence('acl_class', 'id'))`
- `select currval(pg_get_serial_sequence('acl_sid', 'id'))`

#### [](https://www.springcloud.cc/spring-security.html#mysql-and-mariadb)MySQL和MariaDB

CREATE TABLE acl_sid (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    principal BOOLEAN NOT NULL,
    sid VARCHAR(100) NOT NULL,
    UNIQUE KEY unique_acl_sid (sid, principal)
) ENGINE=InnoDB;

CREATE TABLE acl_class (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    class VARCHAR(100) NOT NULL,
    UNIQUE KEY uk_acl_class (class)
) ENGINE=InnoDB;

CREATE TABLE acl_object_identity (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    object_id_class BIGINT UNSIGNED NOT NULL,
    object_id_identity VARCHAR(36) NOT NULL,
    parent_object BIGINT UNSIGNED,
    owner_sid BIGINT UNSIGNED,
    entries_inheriting BOOLEAN NOT NULL,
    UNIQUE KEY uk_acl_object_identity (object_id_class, object_id_identity),
    CONSTRAINT fk_acl_object_identity_parent FOREIGN KEY (parent_object) REFERENCES acl_object_identity (id),
    CONSTRAINT fk_acl_object_identity_class FOREIGN KEY (object_id_class) REFERENCES acl_class (id),
    CONSTRAINT fk_acl_object_identity_owner FOREIGN KEY (owner_sid) REFERENCES acl_sid (id)
) ENGINE=InnoDB;

CREATE TABLE acl_entry (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    acl_object_identity BIGINT UNSIGNED NOT NULL,
    ace_order INTEGER NOT NULL,
    sid BIGINT UNSIGNED NOT NULL,
    mask INTEGER UNSIGNED NOT NULL,
    granting BOOLEAN NOT NULL,
    audit_success BOOLEAN NOT NULL,
    audit_failure BOOLEAN NOT NULL,
    UNIQUE KEY unique_acl_entry (acl_object_identity, ace_order),
    CONSTRAINT fk_acl_entry_object FOREIGN KEY (acl_object_identity) REFERENCES acl_object_identity (id),
    CONSTRAINT fk_acl_entry_acl FOREIGN KEY (sid) REFERENCES acl_sid (id)
) ENGINE=InnoDB;

#### [](https://www.springcloud.cc/spring-security.html#microsoft-sql-server)Microsoft SQL Server

CREATE TABLE acl_sid (
    id BIGINT NOT NULL IDENTITY PRIMARY KEY,
    principal BIT NOT NULL,
    sid VARCHAR(100) NOT NULL,
    CONSTRAINT unique_acl_sid UNIQUE (sid, principal)
);

CREATE TABLE acl_class (
    id BIGINT NOT NULL IDENTITY PRIMARY KEY,
    class VARCHAR(100) NOT NULL,
    CONSTRAINT uk_acl_class UNIQUE (class)
);

CREATE TABLE acl_object_identity (
    id BIGINT NOT NULL IDENTITY PRIMARY KEY,
    object_id_class BIGINT NOT NULL,
    object_id_identity VARCHAR(36) NOT NULL,
    parent_object BIGINT,
    owner_sid BIGINT,
    entries_inheriting BIT NOT NULL,
    CONSTRAINT uk_acl_object_identity UNIQUE (object_id_class, object_id_identity),
    CONSTRAINT fk_acl_object_identity_parent FOREIGN KEY (parent_object) REFERENCES acl_object_identity (id),
    CONSTRAINT fk_acl_object_identity_class FOREIGN KEY (object_id_class) REFERENCES acl_class (id),
    CONSTRAINT fk_acl_object_identity_owner FOREIGN KEY (owner_sid) REFERENCES acl_sid (id)
);

CREATE TABLE acl_entry (
    id BIGINT NOT NULL IDENTITY PRIMARY KEY,
    acl_object_identity BIGINT NOT NULL,
    ace_order INTEGER NOT NULL,
    sid BIGINT NOT NULL,
    mask INTEGER NOT NULL,
    granting BIT NOT NULL,
    audit_success BIT NOT NULL,
    audit_failure BIT NOT NULL,
    CONSTRAINT unique_acl_entry UNIQUE (acl_object_identity, ace_order),
    CONSTRAINT fk_acl_entry_object FOREIGN KEY (acl_object_identity) REFERENCES acl_object_identity (id),
    CONSTRAINT fk_acl_entry_acl FOREIGN KEY (sid) REFERENCES acl_sid (id)
);

#### [](https://www.springcloud.cc/spring-security.html#oracle-database)Oracle数据库

CREATE TABLE ACL_SID (
    ID NUMBER(18) PRIMARY KEY,
    PRINCIPAL NUMBER(1) NOT NULL CHECK (PRINCIPAL IN (0, 1 )),
    SID NVARCHAR2(128) NOT NULL,
    CONSTRAINT ACL_SID_UNIQUE UNIQUE (SID, PRINCIPAL)
);
CREATE SEQUENCE ACL_SID_SQ START WITH 1 INCREMENT BY 1 NOMAXVALUE;
CREATE OR REPLACE TRIGGER ACL_SID_SQ_TR BEFORE INSERT ON ACL_SID FOR EACH ROW
BEGIN
    SELECT ACL_SID_SQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;


CREATE TABLE ACL_CLASS (
    ID NUMBER(18) PRIMARY KEY,
    CLASS NVARCHAR2(128) NOT NULL,
    CONSTRAINT ACL_CLASS_UNIQUE UNIQUE (CLASS)
);
CREATE SEQUENCE ACL_CLASS_SQ START WITH 1 INCREMENT BY 1 NOMAXVALUE;
CREATE OR REPLACE TRIGGER ACL_CLASS_ID_TR BEFORE INSERT ON ACL_CLASS FOR EACH ROW
BEGIN
    SELECT ACL_CLASS_SQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;


CREATE TABLE ACL_OBJECT_IDENTITY(
    ID NUMBER(18) PRIMARY KEY,
    OBJECT_ID_CLASS NUMBER(18) NOT NULL,
    OBJECT_ID_IDENTITY NVARCHAR2(64) NOT NULL,
    PARENT_OBJECT NUMBER(18),
    OWNER_SID NUMBER(18),
    ENTRIES_INHERITING NUMBER(1) NOT NULL CHECK (ENTRIES_INHERITING IN (0, 1)),
    CONSTRAINT ACL_OBJECT_IDENTITY_UNIQUE UNIQUE (OBJECT_ID_CLASS, OBJECT_ID_IDENTITY),
    CONSTRAINT ACL_OBJECT_IDENTITY_PARENT_FK FOREIGN KEY (PARENT_OBJECT) REFERENCES ACL_OBJECT_IDENTITY(ID),
    CONSTRAINT ACL_OBJECT_IDENTITY_CLASS_FK FOREIGN KEY (OBJECT_ID_CLASS) REFERENCES ACL_CLASS(ID),
    CONSTRAINT ACL_OBJECT_IDENTITY_OWNER_FK FOREIGN KEY (OWNER_SID) REFERENCES ACL_SID(ID)
);
CREATE SEQUENCE ACL_OBJECT_IDENTITY_SQ START WITH 1 INCREMENT BY 1 NOMAXVALUE;
CREATE OR REPLACE TRIGGER ACL_OBJECT_IDENTITY_ID_TR BEFORE INSERT ON ACL_OBJECT_IDENTITY FOR EACH ROW
BEGIN
    SELECT ACL_OBJECT_IDENTITY_SQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;


CREATE TABLE ACL_ENTRY (
    ID NUMBER(18) NOT NULL PRIMARY KEY,
    ACL_OBJECT_IDENTITY NUMBER(18) NOT NULL,
    ACE_ORDER INTEGER NOT NULL,
    SID NUMBER(18) NOT NULL,
    MASK INTEGER NOT NULL,
    GRANTING NUMBER(1) NOT NULL CHECK (GRANTING IN (0, 1)),
    AUDIT_SUCCESS NUMBER(1) NOT NULL CHECK (AUDIT_SUCCESS IN (0, 1)),
    AUDIT_FAILURE NUMBER(1) NOT NULL CHECK (AUDIT_FAILURE IN (0, 1)),
    CONSTRAINT ACL_ENTRY_UNIQUE UNIQUE (ACL_OBJECT_IDENTITY, ACE_ORDER),
    CONSTRAINT ACL_ENTRY_OBJECT_FK FOREIGN KEY (ACL_OBJECT_IDENTITY) REFERENCES ACL_OBJECT_IDENTITY (ID),
    CONSTRAINT ACL_ENTRY_ACL_FK FOREIGN KEY (SID) REFERENCES ACL_SID(ID)
);
CREATE SEQUENCE ACL_ENTRY_SQ START WITH 1 INCREMENT BY 1 NOMAXVALUE;
CREATE OR REPLACE TRIGGER ACL_ENTRY_ID_TRIGGER BEFORE INSERT ON ACL_ENTRY FOR EACH ROW
BEGIN
    SELECT ACL_ENTRY_SQ.NEXTVAL INTO :NEW.ID FROM DUAL;
END;

## [](https://www.springcloud.cc/spring-security.html#appendix-namespace)15.2安全命名空间

本附录提供了对安全命名空间中可用元素的参考以及它们创建的基础bean的信息（假设各个类以及它们如何一起工作 - 您可以在项目Javadoc和本文档的其他地方找到更多信息）。如果您之前没有使用过命名空间，请阅读命名空间配置的[介绍性章节](https://www.springcloud.cc/spring-security.html#ns-config "7.安全命名空间配置")，因为这是对那里信息的补充。建议在编辑基于模式的配置时使用高质量的XML编辑器，因为这将提供有关哪些元素和属性可用的上下文信息以及解释其用途的注释。命名空间以[RELAX NG](http://www.relaxng.org/) Compact格式编写，稍后转换为XSD架构。如果您熟悉此格式，则可能希望直接检查[模式文件](https://raw.githubusercontent.com/spring-projects/spring-security/master/config/src/main/resources/org/springframework/security/config/spring-security-4.1.rnc)。

### [](https://www.springcloud.cc/spring-security.html#nsa-web)15.2.1 Web应用程序安全性

#### [](https://www.springcloud.cc/spring-security.html#nsa-debug)<调试>

启用Spring Security调试基础架构。这将提供人类可读（多行）调试信息，以监控进入安全过滤器的请求。这可能包括敏感信息，例如请求参数或标头，并且只应在开发环境中使用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-http)<HTTP>

如果在应用程序中使用`<http>`元素，则会创建名为“springSecurityFilterChain”的`FilterChainProxy` bean，并且元素内的配置用于在`FilterChainProxy`内构建过滤器链。从Spring Security 3.1开始，可以使用额外的`http`元素来添加额外的滤波器链[[22]](https://www.springcloud.cc/spring-security.html#ftn.d5e7286)。一些核心过滤器总是在过滤器链中创建，而其他核心过滤器将根据存在的属性和子元素添加到堆栈中。标准过滤器的位置是固定的（请参阅 命名空间简介中[的过滤器顺序表](https://www.springcloud.cc/spring-security.html#filter-stack "表7.1。 标准过滤器别名和订购")），当用户必须在`FilterChainProxy` bean中明确配置过滤器链时，使用以前版本的框架删除常见的错误源。当然，如果您需要完全控制配置，您仍然可以这样做。

所有需要引用`AuthenticationManager`的过滤器都将自动注入命名空间配置创建的内部实例（有关`AuthenticationManager`的更多信息，请参阅[介绍性章节](https://www.springcloud.cc/spring-security.html#ns-auth-manager "7.6验证管理器和命名空间")）。

每个`<http>`命名空间块始终创建`SecurityContextPersistenceFilter`，`ExceptionTranslationFilter`和`FilterSecurityInterceptor`。这些是固定的，不能替代替代品。

##### [](https://www.springcloud.cc/spring-security.html#nsa-http-attributes)<http>属性

`<http>`元素上的属性控制核心过滤器上的一些属性。

[](https://www.springcloud.cc/spring-security.html#nsa-http-access-decision-manager-ref)

- **access-decision-manager-ref** 可选属性，指定应该用于授权HTTP请求的`AccessDecisionManager`实现的ID。默认情况下，`AffirmativeBased`实现用于`RoleVoter`和`AuthenticatedVoter`。

[](https://www.springcloud.cc/spring-security.html#nsa-http-authentication-manager-ref)

- **authentication-manager-ref** 对此http元素创建的`FilterChain`使用的`AuthenticationManager`的引用。

[](https://www.springcloud.cc/spring-security.html#nsa-http-auto-config)

- **auto-config** 自动注册登录表单，BASIC身份验证，注销服务。如果设置为“true”，则添加所有这些功能（尽管您仍然可以通过提供相应的元素来自定义每个功能的配置）。如果未指定，则默认为“false”。建议不要使用此属性。请改用显式配置元素以避免混淆。

[](https://www.springcloud.cc/spring-security.html#nsa-http-create-session)

- **create-session** 控制Spring Security类创建HTTP会话的急切性。选项包括：
    
    - `always` - Spring Security如果不存在，将主动创建会话。
    - `ifRequired` - Spring Security仅在需要时才会创建会话（默认值）。
    - `never` - Spring Security将永远不会创建会话，但如果应用程序执行会话将使用一个会话。
    - `stateless` - Spring Security不会创建会话而忽略获得Spring `Authentication`的会话。
    

[](https://www.springcloud.cc/spring-security.html#nsa-http-disable-url-rewriting)

- **disable-url-rewriting** 防止将会话ID附加到应用程序中的URL。如果此属性设置为`true`，则客户端必须使用cookie。默认值为`true`。

[](https://www.springcloud.cc/spring-security.html#nsa-http-entry-point-ref)

- **entry-point-ref** 通常，将根据已配置的身份验证机制设置使用的`AuthenticationEntryPoint`。此属性允许通过定义将启动身份验证过程的自定义`AuthenticationEntryPoint` bean来覆盖此行为。

[](https://www.springcloud.cc/spring-security.html#nsa-http-jaas-api-provision)

- **jaas-api-provision** 如果可用，则以`JaasAuthenticationToken`从`JaasAuthenticationToken`获取的请求运行请求，该请求是通过向堆栈添加`JaasApiIntegrationFilter` bean来实现的。默认为`false`。

[](https://www.springcloud.cc/spring-security.html#nsa-http-name)

- **name** bean标识符，用于在上下文中的其他位置引用bean。

[](https://www.springcloud.cc/spring-security.html#nsa-http-once-per-request)

- **每次请求一次** 对应`FilterSecurityInterceptor`的`observeOncePerRequest`属性。默认为`true`。

[](https://www.springcloud.cc/spring-security.html#nsa-http-pattern)

- **pattern** 为 [http](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")元素定义模式控制将通过它定义的过滤器列表过滤的请求。解释取决于配置的[请求匹配器](https://www.springcloud.cc/spring-security.html#nsa-http-request-matcher)。如果未定义模式，则将匹配所有请求，因此应首先声明最具体的模式。

[](https://www.springcloud.cc/spring-security.html#nsa-http-realm)

- **realm** 设置用于基本身份验证的域名（如果已启用）。对应于`BasicAuthenticationEntryPoint`上的`realmName`属性。

[](https://www.springcloud.cc/spring-security.html#nsa-http-request-matcher)

- **request-matcher** 定义`FilterChainProxy`中使用的`RequestMatcher`策略和`intercept-url`创建的bean以匹配传入的请求。对于Spring MVC，ant，正则表达式和不区分大小写的正则表达式，选项目前分别为`mvc`，`ant`，`regex`和`ciRegex`。使用其 [pattern](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-pattern)， [method](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-method)和 [servlet-path](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-servlet-path)属性为每个 [intercept-url](https://www.springcloud.cc/spring-security.html#nsa-intercept-url "<截距-URL>")元素创建一个单独的实例。使用`AntPathRequestMatcher`匹配Ant路径，使用`RegexRequestMatcher`匹配正则表达式，使用`MvcRequestMatcher`匹配Spring MVC路径匹配。有关如何执行匹配的更多详细信息，请参阅这些类的Javadoc。Ant路径是默认策略。[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-pattern)[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-method)[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-servlet-path)

[](https://www.springcloud.cc/spring-security.html#nsa-http-request-matcher-ref)

- **request-matcher-ref** 对实现`RequestMatcher`的bean的引用，该bean将确定是否应该使用`FilterChain`。这是一个更强大的替代[模式](https://www.springcloud.cc/spring-security.html#nsa-http-pattern)。

[](https://www.springcloud.cc/spring-security.html#nsa-http-security)

- **security** 通过将此属性设置为`none`，可以将请求模式映射到空过滤器链。不会应用任何安全措施，并且Spring Security的任何功能都不可用。

[](https://www.springcloud.cc/spring-security.html#nsa-http-security-context-repository-ref)

- **security-context-repository-ref** 允许将自定义`SecurityContextRepository`注入`SecurityContextPersistenceFilter`。

[](https://www.springcloud.cc/spring-security.html#nsa-http-servlet-api-provision)

- **servlet-api-provision** 提供`HttpServletRequest`安全方法的版本，例如`isUserInRole()`和`getPrincipal()`，它们通过向堆栈添加`SecurityContextHolderAwareRequestFilter` bean来实现。默认为`true`。

[](https://www.springcloud.cc/spring-security.html#nsa-http-use-expressions)

- **use-expressions** 在`access`属性中启用EL表达式，如[基于表达式的访问控制](https://www.springcloud.cc/spring-security.html#el-access-web "11.3.2 Web安全表达式")一章中所述。默认值是true。

##### [](https://www.springcloud.cc/spring-security.html#nsa-http-children)<http>的子元素

- [拒绝访问处理程序](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler "<禁止访问的处理程序>")
- [匿名](https://www.springcloud.cc/spring-security.html#nsa-anonymous "<匿名>")
- [CORS](https://www.springcloud.cc/spring-security.html#nsa-cors "<CORS>")
- [CSRF](https://www.springcloud.cc/spring-security.html#nsa-csrf "<CSRF>")
- [定制过滤器](https://www.springcloud.cc/spring-security.html#nsa-custom-filter "<定制滤波器>")
- [表达处理程序](https://www.springcloud.cc/spring-security.html#nsa-expression-handler "<表达式处理程序>")
- [表单登录](https://www.springcloud.cc/spring-security.html#nsa-form-login "<表单登录>")
- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")
- [HTTP的基本](https://www.springcloud.cc/spring-security.html#nsa-http-basic "<HTTP的基本>")
- [拦截的URL](https://www.springcloud.cc/spring-security.html#nsa-intercept-url "<截距-URL>")
- [JEE](https://www.springcloud.cc/spring-security.html#nsa-jee "<JEE>")
- [登出](https://www.springcloud.cc/spring-security.html#nsa-logout "<注销>")
- [OpenID的登录](https://www.springcloud.cc/spring-security.html#nsa-openid-login "<OpenID的登录>")
- [端口映射](https://www.springcloud.cc/spring-security.html#nsa-port-mappings "<端口映射>")
- [记住账号](https://www.springcloud.cc/spring-security.html#nsa-remember-me "<记得，我>")
- [请求缓存](https://www.springcloud.cc/spring-security.html#nsa-request-cache "<request-cache>元素")
- [会话管理](https://www.springcloud.cc/spring-security.html#nsa-session-management "<会话管理>")
- [X509](https://www.springcloud.cc/spring-security.html#nsa-x509 "<X509>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler)<禁止访问的处理程序>

此元素允许您使用[error-page](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler-error-page)属性为`ExceptionTranslationFilter`设置的默认`AccessDeniedHandler`设置`errorPage` 属性，或使用[ref](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler-ref)属性提供您自己的实现。这在[ExceptionTranslationFilter](https://www.springcloud.cc/spring-security.html#access-denied-handler "AccessDeniedHandler")一节中有更详细的讨论。

##### [](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler-parents)<access-denied-handler>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler-attributes)<access-denied-handler>属性

[](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler-error-page)

- **error-page** 访问被拒绝页面，如果经过身份验证的用户请求他们无权访问的页面，则该页面将被重定向到该页面。

[](https://www.springcloud.cc/spring-security.html#nsa-access-denied-handler-ref)

- **ref** 定义对`AccessDeniedHandler`类型的Spring bean的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-cors)<CORS>

此元素允许配置`CorsFilter`。如果未指定`CorsFilter`或`CorsConfigurationSource`且Spring MVC位于类路径上，则`HandlerMappingIntrospector`将用作`CorsConfigurationSource`。

##### [](https://www.springcloud.cc/spring-security.html#nsa-cors-attributes)<cors>属性

`<cors>`元素上的属性控制headers元素。

[](https://www.springcloud.cc/spring-security.html#nsa-cors-ref)

- **ref** 可选属性，指定`CorsFilter`的bean名称。

[](https://www.springcloud.cc/spring-security.html#nsa-cors-configuration-source-ref)

- **cors-configuration-source-ref** 可选属性，指定要注入由XML命名空间创建的`CorsFilter`的`CorsConfigurationSource`的bean名称。

##### [](https://www.springcloud.cc/spring-security.html#nsa-cors-parents)<cors>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-headers)<头>

此元素允许配置与响应一起发送的其他（安全）标头。它可以轻松配置多个标头，还允许通过[标头](https://www.springcloud.cc/spring-security.html#nsa-header "<头>")元素设置自定义标[头](https://www.springcloud.cc/spring-security.html#nsa-header "<header>")。有关其他信息，请参阅参考资料的“ [安全标题”](https://www.springcloud.cc/spring-security.html#headers "10.8安全HTTP响应标头")部分。

- `Cache-Control`，`Pragma`和`Expires` - 可以使用[cache-control](https://www.springcloud.cc/spring-security.html#nsa-cache-control "<缓存控制>")元素设置。这可确保浏览器不会缓存您的受保护页面。
- `Strict-Transport-Security` - 可以使用[hsts](https://www.springcloud.cc/spring-security.html#nsa-hsts "<HSTS>")元素进行设置。这可确保浏览器自动为将来的请求请求HTTPS。
- `X-Frame-Options` - 可以使用[frame-options](https://www.springcloud.cc/spring-security.html#nsa-frame-options "<帧选项>")元素设置。在[X帧-选项](https://en.wikipedia.org/wiki/Clickjacking#X-Frame-Options)报头可以被用于防止点击劫持攻击。
- `X-XSS-Protection` - 可以使用[xss-protection](https://www.springcloud.cc/spring-security.html#nsa-xss-protection "<XSS-保护>")元素设置。在[X-XSS-保护](https://en.wikipedia.org/wiki/Cross-site_scripting)头部可以通过浏览器可以用来做基本控制。
- `X-Content-Type-Options` - 可以使用[content-type-options](https://www.springcloud.cc/spring-security.html#nsa-content-type-options "<内容类型选项>")元素进行设置。的[X-的Content-Type-选项](https://blogs.msdn.com/b/ie/archive/2008/09/02/ie8-security-part-vi-beta-2-update.aspx)报头可防止Internet Explorer MIME嗅探一个响应从所述声明的内容类型的路程。这也适用于Google Chrome，下载扩展程序时。
- `Public-Key-Pinning`或`Public-Key-Pinning-Report-Only` - 可以使用[hpkp](https://www.springcloud.cc/spring-security.html#nsa-hpkp "<hpkp>")元素设置。这允许HTTPS网站抵制使用错误颁发或其他欺诈性证书的攻击者冒充。
- `Content-Security-Policy`或`Content-Security-Policy-Report-Only` - 可以使用[content-security-policy](https://www.springcloud.cc/spring-security.html#nsa-content-security-policy "<内容的安全性的策略>")元素进行设置。 [内容安全策略（CSP）](https://www.w3.org/TR/CSP2/)是web应用程序可以利用的机制，用于缓解内容注入漏洞，例如跨站点脚本（XSS）。
- `Referrer-Policy` - 可以使用[referrer-policy](https://www.springcloud.cc/spring-security.html#nsa-referrer-policy "<引荐政策>")元素设置，[Referrer-Policy](https://www.w3.org/TR/referrer-policy/)是一种web应用程序可以用来管理referrer字段的机制，该字段包含用户所在的最后一页。
- `Feature-Policy` - 可以使用[feature-policy](https://www.springcloud.cc/spring-security.html#nsa-feature-policy "<功能政策>")元素设置，[Feature-Policy](https://wicg.github.io/feature-policy/)是一种机制，允许web开发人员有选择地启用，禁用和修改浏览器中某些API和web功能的行为。

##### [](https://www.springcloud.cc/spring-security.html#nsa-headers-attributes)<headers>属性

`<headers>`元素上的属性控制headers元素。

[](https://www.springcloud.cc/spring-security.html#nsa-headers-defaults-disabled)

- **defaults-disabled** 可选属性，指定禁用默认的Spring Security HTTP响应头。默认值为false（包括默认标头）。

[](https://www.springcloud.cc/spring-security.html#nsa-headers-disabled)

- **disabled** 可选属性，指定禁用Spring Security的HTTP响应标头。默认值为false（标题已启用）。

##### [](https://www.springcloud.cc/spring-security.html#nsa-headers-parents)<headers>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-headers-children)<headers>的子元素

- [高速缓存控制](https://www.springcloud.cc/spring-security.html#nsa-cache-control "<缓存控制>")
- [内容安全策略](https://www.springcloud.cc/spring-security.html#nsa-content-security-policy "<内容的安全性的策略>")
- [内容类型选项](https://www.springcloud.cc/spring-security.html#nsa-content-type-options "<内容类型选项>")
- [功能政策](https://www.springcloud.cc/spring-security.html#nsa-feature-policy "<功能政策>")
- [帧的选项](https://www.springcloud.cc/spring-security.html#nsa-frame-options "<帧选项>")
- [头](https://www.springcloud.cc/spring-security.html#nsa-header "<头>")
- [hpkp](https://www.springcloud.cc/spring-security.html#nsa-hpkp "<hpkp>")
- [HSTS](https://www.springcloud.cc/spring-security.html#nsa-hsts "<HSTS>")
- [引荐政策](https://www.springcloud.cc/spring-security.html#nsa-referrer-policy "<引荐政策>")
- [XSS保护](https://www.springcloud.cc/spring-security.html#nsa-xss-protection "<XSS-保护>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-cache-control)<缓存控制>

添加`Cache-Control`，`Pragma`和`Expires`标头以确保浏览器不会缓存您的受保护网页。

##### [](https://www.springcloud.cc/spring-security.html#nsa-cache-control-attributes)<cache-control>属性

[](https://www.springcloud.cc/spring-security.html#nsa-cache-control-disabled)

- **disabled** 指定是否应禁用高速缓存控制。默认为false。

##### [](https://www.springcloud.cc/spring-security.html#nsa-cache-control-parents)<cache-control>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-hsts)<HSTS>

启用时，将[Strict-Transport-Security](https://tools.ietf.org/html/rfc6797)标头添加到任何安全请求的响应中。这允许服务器指示浏览器自动使用HTTPS以用于将来的请求。

##### [](https://www.springcloud.cc/spring-security.html#nsa-hsts-attributes)<hsts>属性

[](https://www.springcloud.cc/spring-security.html#nsa-hsts-disabled)

- **disabled** 指定是否应禁用Strict-Transport-Security。默认为false。

[](https://www.springcloud.cc/spring-security.html#nsa-hsts-include-subdomains)

- **include-sub-domains** 指定是否应包含子域。默认为true。

[](https://www.springcloud.cc/spring-security.html#nsa-hsts-max-age-seconds)

- **max-age-seconds** 指定主机应被视为已知HSTS主机的最长时间。默认一年。

[](https://www.springcloud.cc/spring-security.html#nsa-hsts-request-matcher-ref)

- **request-matcher-ref** RequestMatcher实例，用于确定是否应设置标头。默认值是HttpServletRequest.isSecure（）是否为true。

##### [](https://www.springcloud.cc/spring-security.html#nsa-hsts-parents)<hsts>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-hpkp)<hpkp>

启用时，将[HTTP](https://tools.ietf.org/html/rfc7469)标头的[公钥固定扩展](https://tools.ietf.org/html/rfc7469)添加到任何安全请求的响应中。这允许HTTPS网站抵制使用错误颁发或其他欺诈性证书的攻击者冒充。

##### [](https://www.springcloud.cc/spring-security.html#nsa-hpkp-attributes)<hpkp>属性

[](https://www.springcloud.cc/spring-security.html#nsa-hpkp-disabled)

- **disabled** 指定是否应禁用HTTP公钥锁定（HPKP）。默认为true。

[](https://www.springcloud.cc/spring-security.html#nsa-hpkp-include-subdomains)

- **include-sub-domains** 指定是否应包含子域。默认为false。

[](https://www.springcloud.cc/spring-security.html#nsa-hpkp-max-age-seconds)

- **max-age-seconds** 设置Public-Key-Pins标头的max-age指令的值。默认60天。

[](https://www.springcloud.cc/spring-security.html#nsa-hpkp-report-only)

- **仅报告** 指定浏览器是否应仅报告引脚验证失败。默认为true。

[](https://www.springcloud.cc/spring-security.html#nsa-hpkp-report-uri)

- **report-uri** 指定浏览器应报告引脚验证失败的URI。

##### [](https://www.springcloud.cc/spring-security.html#nsa-hpkp-parents)<hpkp>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-pins)<销>

引脚列表

##### [](https://www.springcloud.cc/spring-security.html#nsa-pins-children)<pins>的子元素

- [销](https://www.springcloud.cc/spring-security.html#nsa-pin "<销>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-pin)<销>

使用base64编码的SPKI指纹作为值并将加密散列算法指定为属性来指定引脚

##### [](https://www.springcloud.cc/spring-security.html#nsa-pin-attributes)<pin>属性

[](https://www.springcloud.cc/spring-security.html#nsa-pin-algorithm)

- **algorithm** 加密哈希算法。默认值为SHA256。

##### [](https://www.springcloud.cc/spring-security.html#nsa-pin-parents)<pin>的父元素

- [销](https://www.springcloud.cc/spring-security.html#nsa-pins "<销>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-content-security-policy)<内容的安全性的策略>

启用时，会将[内容安全策略（CSP）](https://www.w3.org/TR/CSP2/)标头添加到响应中。CSP是web应用程序可以利用的机制，可以缓解内容注入漏洞，例如跨站点脚本（XSS）。

##### [](https://www.springcloud.cc/spring-security.html#nsa-content-security-policy-attributes)<content-security-policy>属性

[](https://www.springcloud.cc/spring-security.html#nsa-content-security-policy-policy-directives)

- **policy-directives** Content-Security-Policy标头的安全策略指令或仅report-only设置为true，然后使用Content-Security-Policy-Report-Only标头。

[](https://www.springcloud.cc/spring-security.html#nsa-content-security-policy-report-only)

- **仅报告** 设置为true，以**仅**启用Content-Security-Policy-Report-Only标头以报告策略违规。默认为false。

##### [](https://www.springcloud.cc/spring-security.html#nsa-content-security-policy-parents)<content-security-policy>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-referrer-policy)<引荐政策>

启用时，将[Referrer Policy](https://www.w3.org/TR/referrer-policy/)标头添加到响应中。

##### [](https://www.springcloud.cc/spring-security.html#nsa-referrer-policy-attributes)<referrer-policy>属性

[](https://www.springcloud.cc/spring-security.html#nsa-referrer-policy-policy)

- **policy** Referrer-Policy标头的策略。默认“no-referrer”。

##### [](https://www.springcloud.cc/spring-security.html#nsa-referrer-policy-parents)<referrer-policy>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-feature-policy)<功能政策>

启用后，将[功能策略](https://wicg.github.io/feature-policy/)标头添加到响应中。

##### [](https://www.springcloud.cc/spring-security.html#nsa-feature-policy-attributes)<feature-policy>属性

[](https://www.springcloud.cc/spring-security.html#nsa-feature-policy-policy-directives)

- **policy-directives** Feature-Policy标头的安全策略指令。

##### [](https://www.springcloud.cc/spring-security.html#nsa-feature-policy-parents)<feature-policy>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-frame-options)<帧选项>

启用后，将[X-Frame-Options标头添加](https://tools.ietf.org/html/draft-ietf-websec-x-frame-options)到响应中，这允许较新的浏览器进行一些安全检查并防止[点击劫持](https://en.wikipedia.org/wiki/Clickjacking)攻击。

##### [](https://www.springcloud.cc/spring-security.html#nsa-frame-options-attributes)<frame-options>属性

[](https://www.springcloud.cc/spring-security.html#nsa-frame-options-disabled)

- **禁用** 如果禁用，则不包括X-Frame-Options标头。默认为false。

[](https://www.springcloud.cc/spring-security.html#nsa-frame-options-policy)

- **政策**
    
    - `DENY`页面无法在框架中显示，无论网站是否尝试这样做。这是指定frame-options-policy时的默认值。
    - `SAMEORIGIN`页面只能显示在与页面本身相同的原点的框架中
    - `ALLOW-FROM origin`页面只能显示在指定原点的框架中。
    
    换句话说，如果指定DENY，从其他站点加载时，不仅尝试加载页面中的页面失败，从同一站点加载时尝试这样做也会失败。另一方面，如果指定SAMEORIGIN，您仍然可以在框架中使用该页面，只要该框架在框架中包含它与提供页面的网站相同即可。
    

[](https://www.springcloud.cc/spring-security.html#nsa-frame-options-strategy)

- **策略** 选择使用ALLOW-FROM策略时要使用的`AllowFromStrategy`。
    
    - `static`使用单个静态ALLOW-FROM值。可以通过[value](https://www.springcloud.cc/spring-security.html#nsa-frame-options-value)属性设置该[值](https://www.springcloud.cc/spring-security.html#nsa-frame-options-value)。
    - `regexp`使用regelur表达式来验证传入的请求以及是否允许它们。可以通过[value](https://www.springcloud.cc/spring-security.html#nsa-frame-options-value)属性设置正则表达式。可以使用from-参数指定用于检索要验证的值的请求[参数](https://www.springcloud.cc/spring-security.html#nsa-frame-options-from-parameter)。
    - `whitelist`包含允许域的逗号分隔列表。可以通过[value](https://www.springcloud.cc/spring-security.html#nsa-frame-options-value)属性设置逗号分隔列表。可以使用from-参数指定用于检索要验证的值的请求[参数](https://www.springcloud.cc/spring-security.html#nsa-frame-options-from-parameter)。
    

[](https://www.springcloud.cc/spring-security.html#nsa-frame-options-ref)

- **ref** 除了使用其中一个预定义策略，还可以使用自定义`AllowFromStrategy`。可以通过此ref属性指定对此bean的引用。

[](https://www.springcloud.cc/spring-security.html#nsa-frame-options-value)

- **value** ALLOW-FROM用作[策略](https://www.springcloud.cc/spring-security.html#nsa-frame-options-strategy)时要使用的值。

[](https://www.springcloud.cc/spring-security.html#nsa-frame-options-from-parameter)

- **from-parameter** 指定在使用regexp或白名单进行ALLOW-FROM策略时要使用的请求参数的名称。

##### [](https://www.springcloud.cc/spring-security.html#nsa-frame-options-parents)<frame-options>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-xss-protection)<XSS-保护>

将[X-XSS-Protection标头添加](https://blogs.msdn.com/b/ie/archive/2008/07/02/ie8-security-part-iv-the-xss-filter.aspx)到响应中，以帮助防止[反射/ Type-1跨站点脚本（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting#Non-Persistent)攻击。这绝不是对XSS攻击的全面保护！

##### [](https://www.springcloud.cc/spring-security.html#nsa-xss-protection-attributes)<xss-protection>属性

[](https://www.springcloud.cc/spring-security.html#nsa-xss-protection-disabled)

- **xss-protection-disabled** 不包括[反射/ Type-1跨站点脚本（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting#Non-Persistent)保护的标头。

[](https://www.springcloud.cc/spring-security.html#nsa-xss-protection-enabled)

- **xss-protection-enabled** 显式启用或禁用[反射/类型1跨站点脚本（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting#Non-Persistent)保护。

[](https://www.springcloud.cc/spring-security.html#nsa-xss-protection-block)

- **xss-protection-block** 如果为true且xss-protection-enabled为true，则将mode = block添加到标头。这向浏览器指示不应该加载页面。如果false且xss-protection-enabled为true，则在检测到反射攻击时仍会呈现该页面，但会修改响应以防止攻击。请注意，有时会绕过此模式，这通常会使页面阻塞更为理想。

##### [](https://www.springcloud.cc/spring-security.html#nsa-xss-protection-parents)<xss-protection>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-content-type-options)<内容类型选项>

将值为nosniff的X-Content-Type-Options标头添加到响应中。这[会禁用](https://blogs.msdn.com/b/ie/archive/2008/09/02/ie8-security-part-vi-beta-2-update.aspx) IE8 +和Chrome扩展程序的[MIME嗅探](https://blogs.msdn.com/b/ie/archive/2008/09/02/ie8-security-part-vi-beta-2-update.aspx)。

##### [](https://www.springcloud.cc/spring-security.html#nsa-content-type-options-attributes)<content-type-options>属性

[](https://www.springcloud.cc/spring-security.html#nsa-content-type-options-disabled)

- **disabled** 指定是否应禁用“内容类型选项”。默认为false。

##### [](https://www.springcloud.cc/spring-security.html#nsa-content-type-options-parents)<content-type-options>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-header)<头>

向响应添加其他标头，需要指定名称和值。

##### [](https://www.springcloud.cc/spring-security.html#nsa-header-attributes)<header-attributes>属性

[](https://www.springcloud.cc/spring-security.html#nsa-header-name)

- **header-name标题** 的`name`。

[](https://www.springcloud.cc/spring-security.html#nsa-header-value)

- **value** 要添加的标头的`value`。

[](https://www.springcloud.cc/spring-security.html#nsa-header-ref)

- **ref** 引用`HeaderWriter`接口的自定义实现。

##### [](https://www.springcloud.cc/spring-security.html#nsa-header-parents)<header>的父元素

- [头](https://www.springcloud.cc/spring-security.html#nsa-headers "<头>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-anonymous)<匿名>

向堆栈添加`AnonymousAuthenticationFilter`和`AnonymousAuthenticationProvider`。如果您使用`IS_AUTHENTICATED_ANONYMOUSLY`属性，则必需。

##### [](https://www.springcloud.cc/spring-security.html#nsa-anonymous-parents)<anonymous>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-anonymous-attributes)<anonymous>属性

[](https://www.springcloud.cc/spring-security.html#nsa-anonymous-enabled)

- **enabled** 使用默认命名空间设置，将自动启用匿名“身份验证”功能。您可以使用此属性禁用它。

[](https://www.springcloud.cc/spring-security.html#nsa-anonymous-granted-authority)

- **授予权限** 应授予匿名请求的授予权限。通常，这用于为匿名请求分配特定角色，随后可以在授权决策中使用。如果未设置，则默认为`ROLE_ANONYMOUS`。

[](https://www.springcloud.cc/spring-security.html#nsa-anonymous-key)

- **key** 提供者和过滤器之间共享的密钥。这通常不需要设置。如果未设置，则默认为安全随机生成的值。这意味着在使用匿名功能时设置此值可以缩短启动时间，因为安全随机值可能需要一段时间才能生成。

[](https://www.springcloud.cc/spring-security.html#nsa-anonymous-username)

- **username** 应分配给匿名请求的用户名。这允许识别主体，这对于记录和审核可能是重要的。如果未设置，则默认为`anonymousUser`。

#### [](https://www.springcloud.cc/spring-security.html#nsa-csrf)<CSRF>

此元素将为应用程序添加[跨站点请求转发器（CSRF）](https://en.wikipedia.org/wiki/Cross-site_request_forgery)保护。它还会将默认的RequestCache更新为仅在成功验证后重放“GET”请求。其他信息可以在参考文献的[跨站请求伪造（CSRF）](https://www.springcloud.cc/spring-security.html#csrf "10.6跨站请求伪造（CSRF）")部分找到。

##### [](https://www.springcloud.cc/spring-security.html#nsa-csrf-parents)<csrf>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-csrf-attributes)<csrf>属性

[](https://www.springcloud.cc/spring-security.html#nsa-csrf-disabled)

- **disabled** 可选属性，指定禁用Spring Security的CSRF保护。默认值为false（启用CSRF保护）。强烈建议启用CSRF保护。

[](https://www.springcloud.cc/spring-security.html#nsa-csrf-token-repository-ref)

- **token-repository-ref** 要使用的CsrfTokenRepository。默认值为`HttpSessionCsrfTokenRepository`。

[](https://www.springcloud.cc/spring-security.html#nsa-csrf-request-matcher-ref)

- **request-matcher-ref** RequestMatcher实例，用于确定是否应该应用CSRF。默认值是除“GET”，“TRACE”，“HEAD”，“OPTIONS”之外的任何HTTP方法。

#### [](https://www.springcloud.cc/spring-security.html#nsa-custom-filter)<定制滤波器>

此元素用于向筛选器链添加筛选器。它不会创建任何其他bean，但用​​于选择已在应用程序上下文中定义的`javax.servlet.Filter`类型的bean，并将其添加到由Spring Security维护的过滤器链中的特定位置。完整的详细信息可以在[命名空间章节中](https://www.springcloud.cc/spring-security.html#ns-custom-filters "7.3.6添加自己的过滤器")找到。

##### [](https://www.springcloud.cc/spring-security.html#nsa-custom-filter-parents)<custom-filter>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-custom-filter-attributes)<custom-filter>属性

[](https://www.springcloud.cc/spring-security.html#nsa-custom-filter-after)

- **之后** 过滤器应立即将自定义过滤器放置在链中。只有希望将自己的过滤器混合到安全过滤器链中且对标准Spring Security过滤器有一定了解的高级用户才需要此功能。过滤器名称映射到特定的Spring Security实现过滤器。

[](https://www.springcloud.cc/spring-security.html#nsa-custom-filter-before)

- **在** 过滤器**之前**的过滤器之前，应将自定义过滤器放置在链中

[](https://www.springcloud.cc/spring-security.html#nsa-custom-filter-position)

- **position** 自定义过滤器应放置在链中的显式位置。如果要更换标准过滤器，请使用。

[](https://www.springcloud.cc/spring-security.html#nsa-custom-filter-ref)

- **ref** 定义对实现`Filter`的Spring bean的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-expression-handler)<表达式处理程序>

定义在启用基于表达式的访问控制时将使用的`SecurityExpressionHandler`实例。如果未提供，将使用默认实现（不支持ACL）。

##### [](https://www.springcloud.cc/spring-security.html#nsa-expression-handler-parents)<expression-handler>的父元素

- [全球方法的安全性](https://www.springcloud.cc/spring-security.html#nsa-global-method-security "<全局方法的安全性>")
- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")
- [网页套接字-消​​息代理](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker "<WebSocket的消息经纪人>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-expression-handler-attributes)<expression-handler>属性

[](https://www.springcloud.cc/spring-security.html#nsa-expression-handler-ref)

- **ref** 定义对实现`SecurityExpressionHandler`的Spring bean的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-form-login)<表单登录>

用于向过滤器堆栈添加`UsernamePasswordAuthenticationFilter`，向应用程序上下文添加`LoginUrlAuthenticationEntryPoint`以按需提供身份验证。这将始终优先于其他命名空间创建的入口点。如果没有提供属性，将在URL“/ login”自动生成登录页面[[23]](https://www.springcloud.cc/spring-security.html#ftn.d5e8055)。可以使用[`<form-login>` Attributes](https://www.springcloud.cc/spring-security.html#nsa-form-login-attributes "<form-login> Attributes").

##### [](https://www.springcloud.cc/spring-security.html#nsa-form-login-parents)<form-login>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-form-login-attributes)<form-login>属性

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-always-use-default-target)

- **always-use-default-target** 如果设置为`true`，则用户将始终以 [default-target-url](https://www.springcloud.cc/spring-security.html#nsa-form-login-default-target-url)给定的值开始，无论他们如何到达登录页面。映射到`UsernamePasswordAuthenticationFilter`的`alwaysUseDefaultTargetUrl`属性。默认值为`false`。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-authentication-details-source-ref)

- **authentication-details-source-ref** 对身份验证过滤器将使用的`AuthenticationDetailsSource`的引用

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-authentication-failure-handler-ref)

- **authentication-failure-handler-ref** 可用作 [authentication-failure-url](https://www.springcloud.cc/spring-security.html#nsa-form-login-authentication-failure-url)的替代方法，使您可以在身份验证失败后完全控制导航流。该值应该是应用程序上下文中`AuthenticationFailureHandler` bean的名称。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-authentication-failure-url)

- **authentication-failure-url** 映射到`UsernamePasswordAuthenticationFilter`的`authenticationFailureUrl`属性。定义浏览器在登录失败时重定向到的URL。默认为`/login?error`，它将由自动登录页面生成器自动处理，重新呈现登录页面并显示错误消息。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-authentication-success-handler-ref)

- **authentication-success-handler-ref** 这可以用作 [default-target-url](https://www.springcloud.cc/spring-security.html#nsa-form-login-default-target-url)和 [always-use-default-target](https://www.springcloud.cc/spring-security.html#nsa-form-login-always-use-default-target)的替代方法，使您可以在成功进行身份验证后完全控制导航流。该值应该是应用程序上下文中`AuthenticationSuccessHandler` bean的名称。默认情况下，使用`SavedRequestAwareAuthenticationSuccessHandler`的实现并使用 [default-target-url](https://www.springcloud.cc/spring-security.html#nsa-form-login-default-target-url)注入。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-default-target-url)

- **default-target-url** 映射到`UsernamePasswordAuthenticationFilter`的`defaultTargetUrl`属性。如果未设置，则默认值为“/”（应用程序根目录）。登录后，用户将被带到此URL，前提是他们在尝试访问安全资源时未被要求登录，而这些用户将被带到最初请求的URL。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-login-page)

- **login-page** 应该用于呈现登录页面的URL。映射到`LoginUrlAuthenticationEntryPoint`的`loginFormUrl`属性。默认为“/ login”。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-login-processing-url)

- **login-processing-url** 映射到`UsernamePasswordAuthenticationFilter`的`filterProcessesUrl`属性。默认值为“/ login”。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-password-parameter)

- **password-parameter** 包含密码的请求**参数**的名称。默认为“密码”。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-username-parameter)

- **username-parameter** 包含用户名的请求参数的名称。默认为“用户名”。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-authentication-success-forward-url)

- **authentication-success-forward-url** 将`ForwardAuthenticationSuccessHandler`映射到`UsernamePasswordAuthenticationFilter`的`authenticationSuccessHandler`属性。

[](https://www.springcloud.cc/spring-security.html#nsa-form-login-authentication-failure-forward-url)

- **authentication-failure-forward-url** 将`ForwardAuthenticationFailureHandler`映射到`UsernamePasswordAuthenticationFilter`的`authenticationFailureHandler`属性。

#### [](https://www.springcloud.cc/spring-security.html#nsa-http-basic)<HTTP的基本>

在配置中添加`BasicAuthenticationFilter`和`BasicAuthenticationEntryPoint`。如果未启用基于表单的登录，后者将仅用作配置入口点。

##### [](https://www.springcloud.cc/spring-security.html#nsa-http-basic-parents)<http-basic>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-http-basic-attributes)<http-basic>属性

[](https://www.springcloud.cc/spring-security.html#nsa-http-basic-authentication-details-source-ref)

- **authentication-details-source-ref** 对`AuthenticationDetailsSource`的引用，将由身份验证过滤器使用

[](https://www.springcloud.cc/spring-security.html#nsa-http-basic-entry-point-ref)

- **entry-point-ref** 设置`BasicAuthenticationFilter`使用的`AuthenticationEntryPoint`。

#### [](https://www.springcloud.cc/spring-security.html#nsa-http-firewall)<http-firewall>元素

这是一个顶级元素，可用于将`HttpFirewall`的自定义实现注入到命名空间创建的`FilterChainProxy`中。默认实现应该适合大多数应用程序。

##### [](https://www.springcloud.cc/spring-security.html#nsa-http-firewall-attributes)<http-firewall>属性

[](https://www.springcloud.cc/spring-security.html#nsa-http-firewall-ref)

- **ref** 定义对实现`HttpFirewall`的Spring bean的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-url)<截距-URL>

此元素用于定义应用程序感兴趣的URL模式集，并配置应如何处理它们。它用于构造`FilterSecurityInterceptor`使用的`FilterInvocationSecurityMetadataSource`。如果需要通过HTTPS访问特定URL，它还负责配置`ChannelProcessingFilter`。将指定的模式与传入请求进行匹配时，匹配将按声明元素的顺序完成。因此，最具体的模式应该是第一位的，最普遍的应该是最后的。

##### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-parents)<intercept-url>的父元素

- [过滤器的安全性的元数据源](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source "<滤波器安全元数据源>")
- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-attributes)<intercept-url>属性

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-access)

- **access列出将存储在`FilterInvocationSecurityMetadataSource`中的已定义URL模式/方法组合的访问属性。** 列出将存储在{274​​2 /}中的已定义URL模式/方法组合的访问属性。这应该是以逗号分隔的安全配置属性列表（例如角色名称）。

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-filters)

- **过滤器** 只能取值“none”。这将导致任何匹配请求完全绕过Spring Security过滤器链。`<http>`配置的其余部分都不会对请求产生任何影响，并且在其持续时间内不会有可用的安全上下文。在请求期间访问受保护的方法将失败。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|此属性对[filter-security-metadata-source](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source "<filter-security-metadata-source>")无效[](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source "<滤波器安全元数据源>")|

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-method)

- **方法** HTTP方法将与模式和servlet路径（可选）结合使用以匹配传入请求。如果省略，任何方法都将匹配。如果使用和不使用方法指定相同的模式，则特定于方法的匹配将优先。

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-pattern)

- **pattern** 定义URL路径的模式。内容将取决于包含http元素的`request-matcher`属性，因此默认为ant路径语法。

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-request-matcher-ref)

- **request-matcher-ref** 对`RequestMatcher`的引用，用于确定是否使用了`<intercept-url>`。

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-requires-channel)

- **requires-channel** 可以是“http”或“https”，具体取决于是否应分别通过HTTP或HTTPS访问特定的URL模式。或者，当没有偏好时，可以使用值“any”。如果任何`<intercept-url>`元素上存在此属性，则会将`ChannelProcessingFilter`添加到筛选器堆栈，并将其附加依赖项添加到应用程序上下文中。

如果添加了`<port-mappings>`配置，`SecureChannelProcessor`和`InsecureChannelProcessor` bean将使用此配置来确定用于重定向到HTTP / HTTPS的端口。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|此属性对[filter-security-metadata-source](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source "<filter-security-metadata-source>")无效[](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source "<滤波器安全元数据源>")|

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-url-servlet-path)

- **servlet-path** 将与模式和HTTP方法结合使用以匹配传入请求的servlet路径。此属性仅在[请求匹配器](https://www.springcloud.cc/spring-security.html#nsa-http-request-matcher)为“mvc”时适用。此外，该值仅在以下2个用例中需要：1）`ServletContext`中有2个或更多`HttpServlet`注册的映射具有以`'/'`开头且不同的映射; 2）模式以注册的`HttpServlet`路径的相同值开始，不包括默认（根）`HttpServlet` `'/'`。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|此属性对[filter-security-metadata-source](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source "<filter-security-metadata-source>")无效[](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source "<滤波器安全元数据源>")|

#### [](https://www.springcloud.cc/spring-security.html#nsa-jee)<JEE>

将J2eePreAuthenticatedProcessingFilter添加到筛选器链以提供与容器身份验证的集成。

##### [](https://www.springcloud.cc/spring-security.html#nsa-jee-parents)<jee>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-jee-attributes)<jee>属性

[](https://www.springcloud.cc/spring-security.html#nsa-jee-mappable-roles)

- **mappable-roles** 要在传入的HttpServletRequest中查找的逗号分隔的角色列表。

[](https://www.springcloud.cc/spring-security.html#nsa-jee-user-service-ref)

- **user-service-ref** 对用户服务（或UserDetailsS​​ervice bean）Id的引用

#### [](https://www.springcloud.cc/spring-security.html#nsa-logout)<注销>

向过滤器堆栈添加`LogoutFilter`。这是使用`SecurityContextLogoutHandler`配置的。

##### [](https://www.springcloud.cc/spring-security.html#nsa-logout-parents)<logout>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-logout-attributes)<logout>属性

[](https://www.springcloud.cc/spring-security.html#nsa-logout-delete-cookies)

- **delete-cookies** 用户注销时应删除的cookie名称的逗号分隔列表。

[](https://www.springcloud.cc/spring-security.html#nsa-logout-invalidate-session)

- **invalidate-session** 映射到`SecurityContextLogoutHandler`的`invalidateHttpSession`。默认为“true”，因此会话将在注销时失效。

[](https://www.springcloud.cc/spring-security.html#nsa-logout-logout-success-url)

- **logout-success-url注销** 后用户将被带到的目标URL。默认为<form-login-login-page> /？logout（即/ login？logout）
    
    设置此属性将为`SessionManagementFilter`注入一个配置了属性值的`SimpleRedirectInvalidSessionStrategy`。提交无效会话ID时，将调用策略，重定向到配置的URL。
    

[](https://www.springcloud.cc/spring-security.html#nsa-logout-logout-url)

- **logout-url** 将导致注销的URL（即将由过滤器处理的URL）。默认为“/ logout”。

[](https://www.springcloud.cc/spring-security.html#nsa-logout-success-handler-ref)

- **success-handler-ref** 可用于提供`LogoutSuccessHandler`的实例，该实例将在注销后调用以控制导航。

#### [](https://www.springcloud.cc/spring-security.html#nsa-openid-login)<OpenID的登录>

与`<form-login>`类似，具有相同的属性。`login-processing-url`的默认值为“/ login / openid”。`OpenIDAuthenticationFilter`和`OpenIDAuthenticationProvider`将被注册。后者需要参考`UserDetailsService`。同样，这可以由`id`使用`user-service-ref`属性指定，或者将自动定位在应用程序上下文中。

##### [](https://www.springcloud.cc/spring-security.html#nsa-openid-login-parents)<openid-login>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-openid-login-attributes)<openid-login>属性

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-always-use-default-target)

- **always-use-default-target** 登录后是否应始终将用户重定向到default-target-url。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-authentication-details-source-ref)

- **authentication-details-source-ref** 对身份验证过滤器将使用的AuthenticationDetailsS​​ource的引用

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-authentication-failure-handler-ref)

- **authentication-failure-handler-ref** 对AuthenticationFailureHandler bean的引用，该bean应该用于处理失败的身份验证请求。不应与authentication-failure-url结合使用，因为实现应始终处理导航到后续目标

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-authentication-failure-url)

- **authentication-failure-url** 登录失败页面的URL。如果未指定登录失败URL，Spring Security将自动在/ login？login_error创建失败登录URL，并在请求时自动创建登录失败URL。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-authentication-success-forward-url)

- **authentication-success-forward-url** 将`ForwardAuthenticationSuccessHandler`映射到`UsernamePasswordAuthenticationFilter`的`authenticationSuccessHandler`属性。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-authentication-failure-forward-url)

- **authentication-failure-forward-url** 将`ForwardAuthenticationFailureHandler`映射到`UsernamePasswordAuthenticationFilter`的`authenticationFailureHandler`属性。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-authentication-success-handler-ref)

- **authentication-success-handler-ref** 对AuthenticationSuccessHandler bean的引用，该bean应该用于处理成功的身份验证请求。不应与 [default-target-url](https://www.springcloud.cc/spring-security.html#nsa-openid-login-default-target-url)（或 [always-use-default-target](https://www.springcloud.cc/spring-security.html#nsa-openid-login-always-use-default-target)）结合使用，因为实现应始终处理导航到后续目标

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-default-target-url)

- **default-target-url** 如果无法恢复用户之前的操作，则在成功进行身份验证后将重定向到的URL。如果用户在没有首先请求触发认证的安全操作的情况下访问登录页面，则通常会发生这种情况。如果未指定，则默认为应用程序的根目录。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-login-page)

- **login-page登录页面** 的URL。如果未指定登录URL，Spring Security将自动在/ login创建登录URL，并在请求时自动创建该登录URL。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-login-processing-url)

- **login-processing-url** 登录表单的URL。如果未指定，则默认为/ login。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-password-parameter)

- **password-parameter** 包含密码的请求**参数**的名称。默认为“密码”。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-user-service-ref)

- **user-service-ref** 对用户服务（或UserDetailsS​​ervice bean）Id的引用

[](https://www.springcloud.cc/spring-security.html#nsa-openid-login-username-parameter)

- **username-parameter** 包含用户名的请求参数的名称。默认为“用户名”。

##### [](https://www.springcloud.cc/spring-security.html#nsa-openid-login-children)<openid-login>的子元素

- [属性交换](https://www.springcloud.cc/spring-security.html#nsa-attribute-exchange "<属性交换>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-attribute-exchange)<属性交换>

`attribute-exchange`元素定义应从身份提供者请求的属性列表。可以在命名空间配置章节的[OpenID支持](https://www.springcloud.cc/spring-security.html#ns-openid "7.3.4 OpenID支持")部分找到一个示例。可以使用多个，在这种情况下，每个都必须具有`identifier-match`属性，其中包含与提供的OpenID标识符匹配的正则表达式。这允许从不同的提供者（谷歌，雅虎等）获取不同的属性列表。

##### [](https://www.springcloud.cc/spring-security.html#nsa-attribute-exchange-parents)<attribute-exchange>的父元素

- [OpenID的登录](https://www.springcloud.cc/spring-security.html#nsa-openid-login "<OpenID的登录>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-attribute-exchange-attributes)<attribute-exchange>属性

[](https://www.springcloud.cc/spring-security.html#nsa-attribute-exchange-identifier-match)

- **identifier-match** 在确定在身份验证期间使用哪个属性交换配置时，将与声明的标识进行比较的正则表达式。

##### [](https://www.springcloud.cc/spring-security.html#nsa-attribute-exchange-children)<attribute-exchange>的子元素

- [OpenID的属性](https://www.springcloud.cc/spring-security.html#nsa-openid-attribute "<OpenID的属性>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-openid-attribute)<OpenID的属性>

制作OpenID AX [获取请求](https://openid.net/specs/openid-attribute-exchange-1_0.html#fetch_request)时使用的属性[](https://openid.net/specs/openid-attribute-exchange-1_0.html#fetch_request)

##### [](https://www.springcloud.cc/spring-security.html#nsa-openid-attribute-parents)<openid-attribute>的父元素

- [属性交换](https://www.springcloud.cc/spring-security.html#nsa-attribute-exchange "<属性交换>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-openid-attribute-attributes)<openid-attribute>属性

[](https://www.springcloud.cc/spring-security.html#nsa-openid-attribute-count)

- **count** 指定要返回的属性数。例如，返回3封电子邮件。默认值为1。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-attribute-name)

- **name** 指定要返回的属性的名称。例如，电子邮件。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-attribute-required)

- **required** 指定OP是否需要此属性，但如果OP未返回该属性，则不会出错。默认值为false。

[](https://www.springcloud.cc/spring-security.html#nsa-openid-attribute-type)

- **type** 指定属性类型。例如， [http：//axschema.org/contact/email](http://axschema.org/contact/email)。有关有效的属性类型，请参阅OP的文档。

#### [](https://www.springcloud.cc/spring-security.html#nsa-port-mappings)<端口映射>

默认情况下，`PortMapperImpl`的实例将添加到配置中，以用于重定向到安全和不安全的URL。此元素可以选择用于覆盖该类定义的默认映射。每个子`<port-mapping>`元素定义一对HTTP：HTTPS端口。默认映射为80：443和8080：8443。可以在[命名空间简介中](https://www.springcloud.cc/spring-security.html#ns-requires-channel "7.3.2添加HTTP / HTTPS通道安全性")找到覆盖这些的示例。

##### [](https://www.springcloud.cc/spring-security.html#nsa-port-mappings-parents)<port-mappings>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-port-mappings-children)<port-mappings>的子元素

- [端口映射](https://www.springcloud.cc/spring-security.html#nsa-port-mapping "<端口映射>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-port-mapping)<端口映射>

提供在强制重定向时将http端口映射到https端口的方法。

##### [](https://www.springcloud.cc/spring-security.html#nsa-port-mapping-parents)<port-mapping>的父元素

- [端口映射](https://www.springcloud.cc/spring-security.html#nsa-port-mappings "<端口映射>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-port-mapping-attributes)<port-mapping>属性

[](https://www.springcloud.cc/spring-security.html#nsa-port-mapping-http)

- **http** 要使用的http端口。

[](https://www.springcloud.cc/spring-security.html#nsa-port-mapping-https)

- **https** 要使用的https端口。

#### [](https://www.springcloud.cc/spring-security.html#nsa-remember-me)<记得，我>

将`RememberMeAuthenticationFilter`添加到堆栈。这反过来将配置`TokenBasedRememberMeServices`，`PersistentTokenBasedRememberMeServices`或用户指定的bean实现`RememberMeServices`，具体取决于属性设置。

##### [](https://www.springcloud.cc/spring-security.html#nsa-remember-me-parents)<remember-me>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-remember-me-attributes)<remember-me>属性

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-authentication-success-handler-ref)

- **authentication-success-handler-ref** 如果需要自定义导航，则设置`RememberMeAuthenticationFilter`上的`authenticationSuccessHandler`属性。该值应该是应用程序上下文中`AuthenticationSuccessHandler` bean的名称。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-data-source-ref)

- **data-source-ref** 对`DataSource` bean的引用。如果设置了此项，将使用`PersistentTokenBasedRememberMeServices`并使用`JdbcTokenRepositoryImpl`实例进行配置。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-remember-me-parameter)

- **remember-me-parameter** 请求**参数**的名称，用于切换remember-me身份验证。默认为“记住我”。映射到`AbstractRememberMeServices`的“参数”属性。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-remember-me-cookie)

- **remember-me-cookie** 存储用于记住我身份验证的令牌**的cookie**的名称。默认为“记住我”。映射到`AbstractRememberMeServices`的“cookieName”属性。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-key)

- **key** 映射到`AbstractRememberMeServices`的“key”属性。应设置为唯一值，以确保记住我的cookie仅在一个应用程序中有效 [[24]](https://www.springcloud.cc/spring-security.html#ftn.d5e8528)。如果未设置，则将生成安全随机值。由于生成安全随机值可能需要一段时间，因此在使用remember-me功能时，明确设置此值有助于缩短启动时间。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-services-alias)

- **services-alias** 将内部定义的`RememberMeServices`导出为bean别名，允许其由应用程序上下文中的其他bean使用。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-services-ref)

- **services-ref** 允许完全控制过滤器将使用的`RememberMeServices`实现。该值应该是实现此接口的应用程序上下文中bean的`id`。如果正在使用注销过滤器，还应实现`LogoutHandler`。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-token-repository-ref)

- **token-repository-ref** 配置`PersistentTokenBasedRememberMeServices`但允许使用自定义的`PersistentTokenRepository` bean。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-token-validity-seconds)

- **token-validity-seconds** 映射到`AbstractRememberMeServices`的`tokenValiditySeconds`属性。指定remember-me cookie应有效的时间段（以秒为单位）。默认情况下，它有效期为14天。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-use-secure-cookie)

- **use-secure-cookie** 建议记住我的cookie仅通过HTTPS提交，因此应标记为“安全”。默认情况下，如果建立登录请求的连接是安全的（应该是），则将使用安全cookie。如果将此属性设置为`false`，则不会使用安全cookie。将其设置为`true`将始终在cookie上设置安全标志。此属性映射到`AbstractRememberMeServices`的`useSecureCookie`属性。

[](https://www.springcloud.cc/spring-security.html#nsa-remember-me-user-service-ref)

- **user-service-ref** remember-me服务实现需要访问`UserDetailsService`，因此必须在应用程序上下文中定义一个。如果只有一个，则命名空间配置将自动选择和使用它。如果有多个实例，则可以使用此属性明确指定bean `id`。

#### [](https://www.springcloud.cc/spring-security.html#nsa-request-cache)<request-cache>元素

设置`RequestCache`实例，`ExceptionTranslationFilter`将在调用`AuthenticationEntryPoint`之前存储请求信息。

##### [](https://www.springcloud.cc/spring-security.html#nsa-request-cache-parents)<request-cache>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-request-cache-attributes)<request-cache>属性

[](https://www.springcloud.cc/spring-security.html#nsa-request-cache-ref)

- **ref** 定义对Spring bean的引用，该引用是`RequestCache`。

#### [](https://www.springcloud.cc/spring-security.html#nsa-session-management)<会话管理>

通过向过滤器堆栈添加`SessionManagementFilter`来实现与会话管理相关的功能。

##### [](https://www.springcloud.cc/spring-security.html#nsa-session-management-parents)<session-management>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-session-management-attributes)<session-management>属性

[](https://www.springcloud.cc/spring-security.html#nsa-session-management-invalid-session-url)

- **invalid-session-url** 设置此属性将使用配置了属性值的`SimpleRedirectInvalidSessionStrategy`注入`SessionManagementFilter`。提交无效会话ID时，将调用策略，重定向到配置的URL。

[](https://www.springcloud.cc/spring-security.html#nsa-session-management-invalid-session-strategy-ref)

- **invalid-session-url** 允许注入SessionManagementFilter使用的InvalidSessionStrategy实例。使用this或`invalid-session-url`属性，但不能同时使用两者。

[](https://www.springcloud.cc/spring-security.html#nsa-session-management-session-authentication-error-url)

- **session-authentication-error-url** 定义SessionAuthenticationStrategy引发异常时应显示的错误页面的URL。如果未设置，将向客户端返回未经授权的（401）错误代码。请注意，如果在基于表单的登录期间发生错误，则此属性不适用，其中认证失败的URL优先。

[](https://www.springcloud.cc/spring-security.html#nsa-session-management-session-authentication-strategy-ref)

- **session-authentication-strategy-ref** 允许注入SessionManagementFilter使用的SessionAuthenticationStrategy实例

[](https://www.springcloud.cc/spring-security.html#nsa-session-management-session-fixation-protection)

- **session-fixation-protection** 指示在用户进行身份验证时如何应用会话固定保护。如果设置为“none”，则不会应用任何保护。“newSession”将创建一个新的空会话，只迁移了与Spring Security相关的属性。“migrateSession”将创建一个新会话并将所有会话属性复制到新会话。在Servlet 3.1（Java EE 7）和更新的容器中，指定“changeSessionId”将保留现有会话并使用容器提供的会话固定保护（HttpServletRequest＃changeSessionId（））。在Servlet 3.1和更新的容器中默认为“changeSessionId”，在旧容器中默认为“migrateSession”。如果在旧容器中使用“changeSessionId”，则会引发异常。
    
    如果启用了会话固定保护，则会使用适当配置的`DefaultSessionAuthenticationStrategy`注入`SessionManagementFilter`。有关更多详细信息，请参阅此类的Javadoc。
    

##### [](https://www.springcloud.cc/spring-security.html#nsa-session-management-children)<session-management>的子元素

- [并发控制](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control "<并发控制>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control)<并发控制>

添加对并发会话控制的支持，允许限制用户可以拥有的活动会话数。将创建`ConcurrentSessionFilter`，`SessionManagementFilter`将使用`ConcurrentSessionControlAuthenticationStrategy`。如果声明了`form-login`元素，则策略对象也将注入到创建的身份验证过滤器中。将创建`SessionRegistry`实例（除非用户希望使用自定义bean，否则为`SessionRegistryImpl`实例）以供策略使用。

##### [](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control-parents)<concurrency-control>的父元素

- [会话管理](https://www.springcloud.cc/spring-security.html#nsa-session-management "<会话管理>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control-attributes)<concurrency-control>属性

[](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control-error-if-maximum-exceeded)

- **error-if-maximum-exceeded** 如果设置为“true”，当用户尝试超过允许的最大会话数时，将引发`SessionAuthenticationException`。默认行为是使原始会话到期。

[](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control-expired-url)

- **expired-url** 如果用户尝试使用并发会话控制器已“过期”的会话，则用户将被重定向到的URL，因为用户已超过允许的会话数并已在其他位置再次登录。除非设置`exception-if-maximum-exceeded`，否则应设置。如果没有提供任何值，则只会将到期消息直接写回响应。

[](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control-expired-session-strategy-ref)

- **expired-url** 允许注入ConcurrentSessionFilter使用的ExpiredSessionStrategy实例

[](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control-max-sessions)

- **max-sessions** 映射到`ConcurrentSessionControlAuthenticationStrategy`的`maximumSessions`属性。指定`-1`作为支持无限会话的值。

[](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control-session-registry-alias)

- **session-registry-alias** 对内部会话注册表的引用在您自己的bean或管理界面中使用也很有用。您可以使用`session-registry-alias`属性公开内部bean，为其指定一个名称，您可以在配置中的其他位置使用该名称。

[](https://www.springcloud.cc/spring-security.html#nsa-concurrency-control-session-registry-ref)

- **session-registry-ref** 用户可以使用`session-registry-ref`属性提供自己的`SessionRegistry`实现。其他并发会话控制bean将被连接起来使用它。

#### [](https://www.springcloud.cc/spring-security.html#nsa-x509)<X509>

添加对X.509身份验证的支持。`X509AuthenticationFilter`将添加到堆栈中，并将创建一个`Http403ForbiddenEntryPoint` bean。只有在没有使用其他身份验证机制时才会使用后者（它的唯一功能是返回HTTP 403错误代码）。还将创建`PreAuthenticatedAuthenticationProvider`，将用户权限的加载委派给`UserDetailsService`。

##### [](https://www.springcloud.cc/spring-security.html#nsa-x509-parents)<x509>的父元素

- [HTTP](https://www.springcloud.cc/spring-security.html#nsa-http "<HTTP>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-x509-attributes)<x509>属性

[](https://www.springcloud.cc/spring-security.html#nsa-x509-authentication-details-source-ref)

- **authentication-details-source-ref** 对`AuthenticationDetailsSource`的引用

[](https://www.springcloud.cc/spring-security.html#nsa-x509-subject-principal-regex)

- **subject-principal-regex** 定义一个正则表达式，用于从证书中提取用户名（用于`UserDetailsService`）。

[](https://www.springcloud.cc/spring-security.html#nsa-x509-user-service-ref)

- **user-service-ref** 允许在配置多个实例的情况下将特定的`UserDetailsService`与X.509一起使用。如果未设置，将尝试自动定位合适的实例并使用它。

#### [](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-map)<滤波器链地图>

用于使用FilterChainMap显式配置FilterChainProxy实例

##### [](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-map-attributes)<filter-chain-map>属性

[](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-map-request-matcher)

- **request-matcher** 定义用于匹配传入请求的策略。目前，选项是'ant'（用于ant路径模式），'regex'用于正则表达式，'ciRegex'用于不区分大小写的正则表达式。

##### [](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-map-children)<filter-chain-map>的子元素

- [过滤器链](https://www.springcloud.cc/spring-security.html#nsa-filter-chain "<滤波器链>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-filter-chain)<滤波器链>

用于定义特定的URL模式以及适用于与该模式匹配的URL的过滤器列表。当在列表中组装多个过滤器链元素以配置FilterChainProxy时，最具体的模式必须放在列表的顶部，最常见的模式位于底部。

##### [](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-parents)<filter-chain>的父元素

- [过滤器链地图](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-map "<滤波器链地图>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-attributes)<filter-chain>属性

[](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-filters)

- **filters** 以逗号分隔的Spring bean引用列表，它们实现`Filter`。值“none”表示`FilterChain`不应使用`Filter`。

[](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-pattern)

- **pattern** 与[请求匹配器](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-map-request-matcher)一起创建RequestMatcher的模式[](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-map-request-matcher)

[](https://www.springcloud.cc/spring-security.html#nsa-filter-chain-request-matcher-ref)

- **request-matcher-ref** 对`RequestMatcher`的引用，用于确定是否应调用`filters`属性中的任何`Filter`。

#### [](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source)<滤波器安全元数据源>

用于显式配置FilterSecurityMetadataSource bean以与FilterSecurityInterceptor一起使用。通常只有在显式配置FilterChainProxy时才需要，而不是使用<http>元素。使用的intercept-url元素应该只包含模式，方法和访问属性。任何其他将导致配置错误。

##### [](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source-attributes)<filter-security-metadata-source>属性

[](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source-id)

- **id** 一个bean标识符，用于在上下文中的其他位置引用bean。

[](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source-request-matcher)

- **request-matcher** 定义用于匹配传入请求的策略用法。目前，选项是'ant'（用于ant路径模式），'regex'用于正则表达式，'ciRegex'用于不区分大小写的正则表达式。

[](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source-use-expressions)

- **use-expressions** 允许在<intercept-url>元素的“access”属性中使用表达式，而不是传统的配置属性列表。默认为'true'。如果启用，则每个属性应包含一个布尔表达式。如果表达式的计算结果为“true”，则将授予访问权限。

##### [](https://www.springcloud.cc/spring-security.html#nsa-filter-security-metadata-source-children)<filter-security-metadata-source>的子元素

- [拦截的URL](https://www.springcloud.cc/spring-security.html#nsa-intercept-url "<截距-URL>")

### [](https://www.springcloud.cc/spring-security.html#nsa-websocket-security)15.2.2 WebSocket安全性

Spring Security 4.0+为授权邮件提供支持。这有用的一个具体示例是在基于WebSocket的应用程序中提供授权。

#### [](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker)<WebSocket的消息经纪人>

websocket-message-broker元素有两种不同的模式。如果未指定[websocket-message-broker @ id](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker-id)，则它将执行以下操作：

- 确保任何SimpAnnotationMethodMessageHandler都将AuthenticationPrincipalArgumentResolver注册为自定义参数解析程序。这允许使用`@AuthenticationPrincipal`来解析当前的主体`Authentication`
- 确保为clientInboundChannel自动注册SecurityContextChannelInterceptor。这将使用在Message中找到的用户填充SecurityContextHolder
- 确保向clientInboundChannel注册ChannelSecurityInterceptor。这允许为消息指定授权规则。
- 确保向clientInboundChannel注册了CsrfChannelInterceptor。这可确保仅启用来自原始域的请求。
- 确保向WebSocketHttpRequestHandler，TransportHandlingSockJsService或DefaultSockJsService注册了CsrfTokenHandshakeInterceptor。这可确保将来自HttpServletRequest的预期CsrfToken复制到WebSocket Session属性中。

如果需要额外的控制，可以指定id，并将ChannelSecurityInterceptor分配给指定的id。然后可以手动完成所有与Spring的消息传递基础结构的连线。这更麻烦，但可以更好地控制配置。

##### [](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker-attributes)<websocket-message-broker>属性

[](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker-id)

- **id** bean标识符，用于在上下文中的其他位置引用ChannelSecurityInterceptor bean。如果指定，Spring Security需要在Spring Messaging中进行显式配置。如果未指定，Spring Security将自动与消息传递基础结构集成，如中所述[the section called “<websocket-message-broker>”](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker "<websocket-message-broker>")

[](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker-same-origin-disabled)

- **same-origin-disabled**禁用在Stomp标头中出现CSRF令牌的要求（默认为false）。如果必须允许其他来源进行SockJS连接，则更改默认值很有用。

##### [](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker-children)<websocket-message-broker>的子元素

- [表达处理程序](https://www.springcloud.cc/spring-security.html#nsa-expression-handler "<表达式处理程序>")
- [截距的消息](https://www.springcloud.cc/spring-security.html#nsa-intercept-message "<截距消息>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-message)<截距消息>

定义消息的授权规则。

##### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-message-parents)<intercept-message>的父元素

- [网页套接字-消​​息代理](https://www.springcloud.cc/spring-security.html#nsa-websocket-message-broker "<WebSocket的消息经纪人>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-message-attributes)<intercept-message>属性

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-message-pattern)

- **pattern**在Message目标上匹配的基于ant的模式。例如，“/ **”匹配任何具有目的地的消息; “/ admin /** ”匹配任何目标以“/ admin / **”开头的消息。

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-message-type)

- **type**要匹配的消息类型。有效值在SimpMessageType中定义（即CONNECT，CONNECT_ACK，HEARTBEAT，MESSAGE，SUBSCRIBE，UNSUBSCRIBE，DISCONNECT，DISCONNECT_ACK，OTHER）。

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-message-access)

- **access**用于保护Message的表达式。例如，“denyAll”将拒绝访问所有匹配的消息; “permitAll”将授予对所有匹配消息的访问权限; “hasRole（'ADMIN'）要求当前用户为匹配的消息设置角色'ROLE_ADMIN'。

### [](https://www.springcloud.cc/spring-security.html#nsa-authentication)15.2.3认证服务

在Spring Security 3.0之前，`AuthenticationManager`在内部自动注册。现在，您必须使用`<authentication-manager>`元素显式注册一个。这将创建Spring Security的`ProviderManager`类的实例，该实例需要配置一个或多个`AuthenticationProvider`实例的列表。这些可以使用命名空间提供的语法元素创建，也可以是标准bean定义，使用`authentication-provider`元素标记为添加到列表中。

#### [](https://www.springcloud.cc/spring-security.html#nsa-authentication-manager)<认证管理器>

每个使用命名空间的Spring Security应用程序都必须在某处包含此元素。它负责注册为应用程序提供身份验证服务的`AuthenticationManager`。创建`AuthenticationProvider`实例的所有元素都应该是此元素的子元素。

##### [](https://www.springcloud.cc/spring-security.html#nsa-authentication-manager-attributes)<authentication-manager>属性

[](https://www.springcloud.cc/spring-security.html#nsa-authentication-manager-alias)

- **别名** 此属性允许您为内部实例定义别名，以便在您自己的配置中使用。它的用法在[名称空间介绍中](https://www.springcloud.cc/spring-security.html#ns-auth-manager "7.6验证管理器和命名空间")描述。

[](https://www.springcloud.cc/spring-security.html#nsa-authentication-manager-erase-credentials)

- **erase-credentials** 如果设置为true，则在用户通过身份验证后，AuthenticationManager将尝试清除返回的Authentication对象中的任何凭据数据。从字面上看，它映射到`ProviderManager`的`eraseCredentialsAfterAuthentication`属性。这在[核心服务](https://www.springcloud.cc/spring-security.html#core-services-erasing-credentials "成功验证时擦除凭据")章节中讨论。

[](https://www.springcloud.cc/spring-security.html#nsa-authentication-manager-id)

- **id** 此属性允许您定义内部实例的ID，以便在您自己的配置中使用。它与alias元素相同，但为使用id属性的元素提供了更一致的体验。

##### [](https://www.springcloud.cc/spring-security.html#nsa-authentication-manager-children)<authentication-manager>的子元素

- [认证供应商](https://www.springcloud.cc/spring-security.html#nsa-authentication-provider "<认证提供商>")
- [LDAP身份验证提供者](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider "<LDAP的认证提供商>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-authentication-provider)<认证提供商>

除非与`ref`属性一起使用，否则此元素是配置[DaoAuthenticationProvider的](https://www.springcloud.cc/spring-security.html#core-services-dao-provider "比如DaoAuthenticationProvider")简写。`DaoAuthenticationProvider`从`UserDetailsService`加载用户信息，并将用户名/密码组合与登录时提供的值进行比较。可以通过使用可用的命名空间元素（`jdbc-user-service`或使用`user-service-ref`属性指向应用程序上下文中其他位置定义的bean）来定义`UserDetailsService`实例。您可以在[命名空间简介中](https://www.springcloud.cc/spring-security.html#ns-auth-providers "7.2.5使用其他身份验证提供程序")找到这些变体的示例。

##### [](https://www.springcloud.cc/spring-security.html#nsa-authentication-provider-parents)<authentication-provider>的父元素

- [认证管理](https://www.springcloud.cc/spring-security.html#nsa-authentication-manager "<认证管理器>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-authentication-provider-attributes)<authentication-provider>属性

[](https://www.springcloud.cc/spring-security.html#nsa-authentication-provider-ref)

- **ref** 定义对实现`AuthenticationProvider`的Spring bean的引用。

如果您已经编写了自己的`AuthenticationProvider`实现（或者由于某种原因想要将Spring Security自己的实现之一配置为传统bean，那么您可以使用以下语法将其添加到{的内部列表中3 /}：

<security:authentication-manager>
<security:authentication-provider ref="myAuthenticationProvider" />
</security:authentication-manager>
<bean id="myAuthenticationProvider" class="com.something.MyAuthenticationProvider"/>

[](https://www.springcloud.cc/spring-security.html#nsa-authentication-provider-user-service-ref)

- **user-service-ref** 对实现可以使用标准bean元素或自定义用户服务元素创建的UserDetailsS​​ervice的bean的引用。

##### [](https://www.springcloud.cc/spring-security.html#nsa-authentication-provider-children)<authentication-provider>的子元素

- [JDBC用户服务](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service "<JDBC用户服务>")
- [LDAP用户服务](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service "<LDAP的用户服务>")
- [密码编码器](https://www.springcloud.cc/spring-security.html#nsa-password-encoder "<密码编码器>")
- [用户服务](https://www.springcloud.cc/spring-security.html#nsa-user-service "<用户服务>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service)<JDBC用户服务>

导致创建基于JDBC的UserDetailsS​​ervice。

##### [](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service-attributes)<jdbc-user-service>属性

[](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service-authorities-by-username-query)

- **authorities-by-username-query** 一个SQL语句，用于在给定用户名的情况下查询用户授予的权限。

默认是

select username, authority from authorities where username = ?

[](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service-cache-ref)

- **cache-ref** 定义对缓存的引用以与UserDetailsS​​ervice一起使用。

[](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service-data-source-ref)

- **data-source-ref** 提供所需表的DataSource的bean ID。

[](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service-group-authorities-by-username-query)

- **group-authorities-by-username-query** 一个SQL语句，用于在给定用户名的情况下查询用户的组权限。默认是
    
    select
    g.id, g.group_name, ga.authority
    from
    groups g, group_members gm, group_authorities ga
    where
    gm.username = ? and g.id = ga.group_id and g.id = gm.group_id
    

[](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service-id)

- **id** 一个bean标识符，用于在上下文中的其他位置引用bean。

[](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service-role-prefix)

- **role-prefix** 一个非空字符串前缀，将添加到从持久存储加载的角色字符串中（默认为“ROLE_”）。如果默认值为非空，则使用值“none”表示无前缀。

[](https://www.springcloud.cc/spring-security.html#nsa-jdbc-user-service-users-by-username-query)

- **users-by-username-query** 一个SQL语句，用于在给定用户名的情况下查询用户名，密码和启用状态。默认是
    
    select username, password, enabled from users where username = ?
    

#### [](https://www.springcloud.cc/spring-security.html#nsa-password-encoder)<密码编码器>

可以选择将身份验证提供程序配置为使用[命名空间简介中](https://www.springcloud.cc/spring-security.html#ns-password-encoder "添加密码编码器")所述的密码编码器。这将导致bean被注入适当的`PasswordEncoder`实例。

##### [](https://www.springcloud.cc/spring-security.html#nsa-password-encoder-parents)<password-encoder>的父元素

- [认证供应商](https://www.springcloud.cc/spring-security.html#nsa-authentication-provider "<认证提供商>")
- [密码比较](https://www.springcloud.cc/spring-security.html#nsa-password-compare "<密码比较>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-password-encoder-attributes)<password-encoder>属性

[](https://www.springcloud.cc/spring-security.html#nsa-password-encoder-hash)

- **hash** 定义用户密码上使用的散列算法。我们强烈反对使用MD4，因为它是一种非常弱的散列算法。

[](https://www.springcloud.cc/spring-security.html#nsa-password-encoder-ref)

- **ref** 定义对实现`PasswordEncoder`的Spring bean的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-user-service)<用户服务>

从属性文件或“user”子元素列表创建内存中的UserDetailsS​​ervice。用户名在内部转换为小写，以允许不区分大小写的查找，因此如果需要区分大小写，则不应使用此名称。

##### [](https://www.springcloud.cc/spring-security.html#nsa-user-service-attributes)<user-service>属性

[](https://www.springcloud.cc/spring-security.html#nsa-user-service-id)

- **id** 一个bean标识符，用于在上下文中的其他位置引用bean。

[](https://www.springcloud.cc/spring-security.html#nsa-user-service-properties)

- **properties** Properties文件的位置，每行的格式为
    
    username=password,grantedAuthority[,grantedAuthority][,enabled|disabled]
    

##### [](https://www.springcloud.cc/spring-security.html#nsa-user-service-children)<user-service>的子元素

- [用户](https://www.springcloud.cc/spring-security.html#nsa-user "<用户>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-user)<用户>

表示应用程序中的用户。

##### [](https://www.springcloud.cc/spring-security.html#nsa-user-parents)<user>的父元素

- [用户服务](https://www.springcloud.cc/spring-security.html#nsa-user-service "<用户服务>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-user-attributes)<user>属性

[](https://www.springcloud.cc/spring-security.html#nsa-user-authorities)

- **权限** 授予用户的**权限**之一。用逗号分隔权限（但没有空格）。例如，“ROLE_USER，ROLE_ADMINISTRATOR”

[](https://www.springcloud.cc/spring-security.html#nsa-user-disabled)

- **disabled** 可以设置为“true”以将帐户标记为已禁用且不可用。

[](https://www.springcloud.cc/spring-security.html#nsa-user-locked)

- **已锁定** 可以设置为“true”以将帐户标记为已锁定且无法使用。

[](https://www.springcloud.cc/spring-security.html#nsa-user-name)

- **name** 分配给用户的用户名。

[](https://www.springcloud.cc/spring-security.html#nsa-user-password)

- **password** 分配给用户的密码。如果相应的身份验证提供程序支持散列（请记住设置“user-service”元素的“hash”属性），则可以对此进行散列。在不将数据用于身份验证但仅用于访问权限的情况下，将省略此属性。如果省略，命名空间将生成一个随机值，防止其意外使用进行身份验证。不能为空。

### [](https://www.springcloud.cc/spring-security.html#nsa-method-security)15.2.4方法安全

#### [](https://www.springcloud.cc/spring-security.html#nsa-global-method-security)<全局方法的安全性>

此元素是添加对Spring Security bean上的方法保护的支持的主要方法。通过使用注释（在接口或类级别定义）或使用AspectJ语法将一组切入点定义为子元素，可以保护方法。

##### [](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-attributes)<global-method-security>属性

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-access-decision-manager-ref)

- **access-decision-manager-ref** 方法安全性使用与web安全性相同的`AccessDecisionManager`配置，但可以使用此属性覆盖此属性。默认情况下，AffirmativeBased实现用于RoleVoter和AuthenticatedVoter。

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-authentication-manager-ref)

- **authentication-manager-ref** 对应该用于方法安全性的`AuthenticationManager`的引用。

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-jsr250-annotations)

- **jsr250-annotations** 指定是否使用JSR-250样式属性（例如“RolesAllowed”）。这将需要类路径上的javax.annotation.security类。将此设置为true也会向`AccessDecisionManager`添加`Jsr250Voter`，因此如果您使用自定义实现并希望使用这些注释，则需要确保执行此操作。

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-metadata-source-ref)

- **metadata-source-ref** 可以提供外部`MethodSecurityMetadataSource`实例，该实例将优先于其他源（例如默认注释）。

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-mode)

- **mode** 此属性可以设置为“aspectj”，以指定应使用AspectJ而不是默认的Spring AOP。安全方法必须与`spring-security-aspects`模块中的`AnnotationSecurityAspect`编织在一起。

值得注意的是，AspectJ遵循Java的规则，即接口上的注释不会被继承。这意味着在接口上定义安全注释的方法将不受保护。相反，您必须在使用AspectJ时将Security注释放在类上。

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-order)

- **order** 允许为方法安全拦截器设置建议“order”。

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-pre-post-annotations)

- **pre-post-annotations** 指定是否应为此应用程序上下文启用Spring Security的前后调用注释（@PreFilter，@ PreAuthorize，@ PostFilter，@ PostAuthorize）。默认为“已禁用”。

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-proxy-target-class)

- **proxy-target-class** 如果为true，将使用基于类的代理而不是基于接口的代理。

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-run-as-manager-ref)

- **run-as-manager-ref** 对可配置的`RunAsManager`实现的引用，将由配置的`MethodSecurityInterceptor`使用

[](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-secured-annotations)

- **secured-annotations** 指定是否应为此应用程序上下文启用Spring Security的@Secured注释。默认为“已禁用”。

##### [](https://www.springcloud.cc/spring-security.html#nsa-global-method-security-children)<global-method-security>的子元素

- [-调用提供商后](https://www.springcloud.cc/spring-security.html#nsa-after-invocation-provider "<后调用提供商>")
- [表达处理程序](https://www.springcloud.cc/spring-security.html#nsa-expression-handler "<表达式处理程序>")
- [前置后注解处理](https://www.springcloud.cc/spring-security.html#nsa-pre-post-annotation-handling "<预后注释的处理>")
- [保护-切入点](https://www.springcloud.cc/spring-security.html#nsa-protect-pointcut "使用安全方法")

#### [](https://www.springcloud.cc/spring-security.html#nsa-after-invocation-provider)<后调用提供商>

此元素可用于装饰`AfterInvocationProvider`以供`<global-method-security>`命名空间维护的安全拦截器使用。您可以在`global-method-security`元素中定义零个或多个，每个元素都有一个`ref`属性，指向应用程序上下文中的`AfterInvocationProvider` bean实例。

##### [](https://www.springcloud.cc/spring-security.html#nsa-after-invocation-provider-parents)<after-invocation-provider>的父元素

- [全球方法的安全性](https://www.springcloud.cc/spring-security.html#nsa-global-method-security "<全局方法的安全性>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-after-invocation-provider-attributes)<after-invocation-provider>属性

[](https://www.springcloud.cc/spring-security.html#nsa-after-invocation-provider-ref)

- **ref** 定义对实现`AfterInvocationProvider`的Spring bean的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-pre-post-annotation-handling)<预后注释的处理>

允许基于表达式的默认机制来处理Spring Security的调用前后注释（@PreFilter，@ PreAuthorize，@ PostFilter，@ PostAuthorize）。仅在启用这些注释时适用。

##### [](https://www.springcloud.cc/spring-security.html#nsa-pre-post-annotation-handling-parents)<pre-post-annotation-handling>的父元素

- [全球方法的安全性](https://www.springcloud.cc/spring-security.html#nsa-global-method-security "<全局方法的安全性>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-pre-post-annotation-handling-children)<注释前处理>的子元素

- [调用属性工厂](https://www.springcloud.cc/spring-security.html#nsa-invocation-attribute-factory "<调用属性工厂>")
- [-调用后建议](https://www.springcloud.cc/spring-security.html#nsa-post-invocation-advice "<后调用-建议>")
- [预调用，建议](https://www.springcloud.cc/spring-security.html#nsa-pre-invocation-advice "<预调用-建议>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-invocation-attribute-factory)<调用属性工厂>

定义PrePostInvocationAttributeFactory实例，该实例用于从带注释的方法生成前后调用元数据。

##### [](https://www.springcloud.cc/spring-security.html#nsa-invocation-attribute-factory-parents)<invocation-attribute-factory>的父元素

- [前置后注解处理](https://www.springcloud.cc/spring-security.html#nsa-pre-post-annotation-handling "<预后注释的处理>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-invocation-attribute-factory-attributes)<invocation-attribute-factory>属性

[](https://www.springcloud.cc/spring-security.html#nsa-invocation-attribute-factory-ref)

- **ref** 定义对Spring bean Id的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-post-invocation-advice)<后调用-建议>

使用ref自定义`PostInvocationAdviceProvider`作为<pre-post-annotation-handling>元素的`PostInvocationAuthorizationAdvice`。

##### [](https://www.springcloud.cc/spring-security.html#nsa-post-invocation-advice-parents)<post-invocation-advice>的父元素

- [前置后注解处理](https://www.springcloud.cc/spring-security.html#nsa-pre-post-annotation-handling "<预后注释的处理>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-post-invocation-advice-attributes)<post-invocation-advice>属性

[](https://www.springcloud.cc/spring-security.html#nsa-post-invocation-advice-ref)

- **ref** 定义对Spring bean Id的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-pre-invocation-advice)<预调用-建议>

使用ref自定义`PreInvocationAuthorizationAdviceVoter`作为<pre-post-annotation-handling>元素的`PreInvocationAuthorizationAdviceVoter`。

##### [](https://www.springcloud.cc/spring-security.html#nsa-pre-invocation-advice-parents)<pre-invocation-advice>的父元素

- [前置后注解处理](https://www.springcloud.cc/spring-security.html#nsa-pre-post-annotation-handling "<预后注释的处理>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-pre-invocation-advice-attributes)<pre-invocation-advice>属性

[](https://www.springcloud.cc/spring-security.html#nsa-pre-invocation-advice-ref)

- **ref** 定义对Spring bean Id的引用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-protect-pointcut)使用安全方法

`<protect-pointcut>`使用`@Secured`注释，您可以使用`@Secured`注释在单个方法或类基础上定义安全属性，而不是使用`<protect-pointcut>`元素在服务层中的整个方法和接口集定义跨域安全约束。 。您可以在[命名空间简介中](https://www.springcloud.cc/spring-security.html#ns-protect-pointcut "使用protect-pointcut添加安全性切入点")找到一个示例。

##### [](https://www.springcloud.cc/spring-security.html#nsa-protect-pointcut-parents)<protect-pointcut>的父元素

- [全球方法的安全性](https://www.springcloud.cc/spring-security.html#nsa-global-method-security "<全局方法的安全性>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-protect-pointcut-attributes)<protect-pointcut>属性

[](https://www.springcloud.cc/spring-security.html#nsa-protect-pointcut-access)

- **access** 访问配置属性列表，适用于与切入点匹配的所有方法，例如“ROLE_A，ROLE_B”

[](https://www.springcloud.cc/spring-security.html#nsa-protect-pointcut-expression)

- **表达式** AspectJ表达式，包括'execution'关键字。例如，'execution（int com.foo.TargetObject.countLength（String））'（不带引号）。

#### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-methods)<截距的方法>

可以在bean定义中使用，以向bean添加安全拦截器，并为bean的方法设置访问配置属性

##### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-methods-attributes)<intercept-methods>属性

[](https://www.springcloud.cc/spring-security.html#nsa-intercept-methods-access-decision-manager-ref)

- **access-decision-manager-ref** 可选的AccessDecisionManager bean ID，由创建的方法安全拦截器使用。

##### [](https://www.springcloud.cc/spring-security.html#nsa-intercept-methods-children)<intercept-methods>的子元素

- [保护](https://www.springcloud.cc/spring-security.html#nsa-protect "<保护>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-method-security-metadata-source)<方法的安全性的元数据源>

创建MethodSecurityMetadataSource实例

##### [](https://www.springcloud.cc/spring-security.html#nsa-method-security-metadata-source-attributes)<method-security-metadata-source>属性

[](https://www.springcloud.cc/spring-security.html#nsa-method-security-metadata-source-id)

- **id** 一个bean标识符，用于在上下文中的其他位置引用bean。

[](https://www.springcloud.cc/spring-security.html#nsa-method-security-metadata-source-use-expressions)

- **use-expressions** 允许在<intercept-url>元素的“access”属性中使用表达式，而不是传统的配置属性列表。默认为'false'。如果启用，则每个属性应包含一个布尔表达式。如果表达式的计算结果为“true”，则将授予访问权限。

##### [](https://www.springcloud.cc/spring-security.html#nsa-method-security-metadata-source-children)<method-security-metadata-source>的子元素

- [保护](https://www.springcloud.cc/spring-security.html#nsa-protect "<保护>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-protect)<保护>

定义受保护的方法以及适用于它的访问控制配置属性。我们强烈建议您不要将“保护”声明与“global-method-security”提供的任何服务混合使用。

##### [](https://www.springcloud.cc/spring-security.html#nsa-protect-parents)<protect>的父元素

- [截距的方法](https://www.springcloud.cc/spring-security.html#nsa-intercept-methods "<截距的方法>")
- [法的安全性的元数据源](https://www.springcloud.cc/spring-security.html#nsa-method-security-metadata-source "<方法的安全性的元数据源>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-protect-attributes)<protect>属性

[](https://www.springcloud.cc/spring-security.html#nsa-protect-access)

- **access** 访问适用于该方法的配置属性列表，例如“ROLE_A，ROLE_B”。

[](https://www.springcloud.cc/spring-security.html#nsa-protect-method)

- **方法** 方法名称

### [](https://www.springcloud.cc/spring-security.html#nsa-ldap)15.2.5 LDAP命名空间选项

LDAP在[其自己的章节](https://www.springcloud.cc/spring-security.html#ldap "12.3 LDAP认证")中有一些细节。我们将在此处进行扩展，并解释命名空间选项如何映射到Spring bean。LDAP实现广泛使用Spring LDAP，因此熟悉该项目的API可能很有用。

#### [](https://www.springcloud.cc/spring-security.html#nsa-ldap-server)使用。定义LDAP服务器

`<ldap-server>`元素此元素设置Spring LDAP `ContextSource`供其他LDAP bean使用，定义LDAP服务器的位置和其他信息（如用户名和密码，如果不是允许匿名访问）以连接它。它还可用于创建用于测试的嵌入式服务器。[LDAP章节介绍](https://www.springcloud.cc/spring-security.html#ldap-server "12.3.3配置LDAP服务器")了这两个选项的语法详细信息。实际的`ContextSource`实现是`DefaultSpringSecurityContextSource`，扩展了Spring LDAP的`LdapContextSource`类。`manager-dn`和`manager-password`属性分别映射到后者的`userDn`和`password`属性。

如果在应用程序上下文中只定义了一个服务器，则其他LDAP命名空间定义的bean将自动使用它。否则，您可以为元素提供“id”属性，并使用`server-ref`属性从其他命名空间bean中引用它。这实际上是`ContextSource`实例的bean `id`，如果你想在其他传统的Spring bean中使用它。

##### [](https://www.springcloud.cc/spring-security.html#nsa-ldap-server-attributes)<ldap-server>属性

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-server-id)

- **id** 一个bean标识符，用于在上下文中的其他位置引用bean。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-server-ldif)

- **ldif** 显式指定要加载到嵌入式LDAP服务器的ldif文件资源。ldiff应该是Spring资源模式（即classpath：init.ldiff）。默认值为classpath *：*。ldiff

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-server-manager-dn)

- **manager-dn** “管理器”用户标识的用户名（DN），用于向（非嵌入式）LDAP服务器进行身份验证。如果省略，将使用匿名访问。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-server-manager-password)

- **manager-password** 管理员DN的密码。如果指定了manager-dn，则需要这样做。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-server-port)

- **port** 指定IP端口号。例如，用于配置嵌入式LDAP服务器。默认值为33389。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-server-root)

- **root** 可选的嵌入式LDAP服务器的根后缀。默认为“dc = springframework，dc = org”

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-server-url)

- **url** 指定不使用嵌入式LDAP服务器时的ldap服务器URL。

#### [](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider)<LDAP的认证提供商>

此元素是创建`LdapAuthenticationProvider`实例的简写。默认情况下，这将配置`BindAuthenticator`实例和`DefaultAuthoritiesPopulator`。与所有命名空间身份验证提供程序一样，它必须作为`authentication-provider`元素的子项包含在内。

##### [](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-parents)<ldap-authentication-provider>的父元素

- [认证管理](https://www.springcloud.cc/spring-security.html#nsa-authentication-manager "<认证管理器>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-attributes)<ldap-authentication-provider>属性

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-group-role-attribute)

- **group-role-attribute** LDAP属性名称，包含将在Spring Security中使用的角色名称。映射到`DefaultLdapAuthoritiesPopulator`的`groupRoleAttribute`属性。默认为“cn”。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-group-search-base)

- **group-search-base** 组成员资格搜索的搜索库。映射到`DefaultLdapAuthoritiesPopulator`的`groupSearchBase`构造函数参数。默认为“”（从根目录搜索）。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-group-search-filter)

- **group-search-filter** 组搜索过滤器。映射到`DefaultLdapAuthoritiesPopulator`的`groupSearchFilter`属性。默认为（uniqueMember = {0}）。替换参数是用户的DN。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-role-prefix)

- **role-prefix** 一个非空字符串前缀，将添加到从persistent加载的角色字符串中。映射到`DefaultLdapAuthoritiesPopulator`的`rolePrefix`属性。默认为“ROLE_”。如果默认值为非空，则使用值“none”表示无前缀。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-server-ref)

- **server-ref** 要使用的可选服务器。如果省略，并且注册了默认LDAP服务器（使用<ldap-server>且没有Id），将使用该服务器。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-user-context-mapper-ref)

- **user-context-mapper-ref** 允许通过指定UserDetailsContextMapper bean显式自定义加载的用户对象，该bean将使用用户目录条目中的上下文信息调用

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-user-details-class)

- **user-details-class** 允许指定用户条目的objectClass。如果设置，框架将尝试将已定义类的标准属性加载到返回的UserDetails对象中

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-user-dn-pattern)

- **user-dn-pattern** 如果您的用户位于目录中的固定位置（即您可以直接从用户名编制DN而不进行目录搜索），则可以使用此属性直接映射到DN。它直接映射到`AbstractLdapAuthenticator`的`userDnPatterns`属性。该值是用于构建用户DN的特定模式，例如“uid = {0}，ou = people”。密钥“{0}”必须存在，并将替换为用户名。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-user-search-base)

- **user-search-base** 用户搜索的搜索库。默认为“”。仅用于'用户搜索过滤器'。
    
    如果需要执行搜索以在目录中找到用户，则可以设置这些属性以控制搜索。`BindAuthenticator`将配置为`FilterBasedLdapUserSearch`，属性值直接映射到该bean的构造函数的前两个参数。如果未设置这些属性且未提供`user-dn-pattern`，则将使用`user-search-filter="(uid={0})"`和`user-search-base=""`的默认搜索值。
    

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-user-search-filter)

- **user-search-filter** 用于搜索用户的LDAP过滤器（可选）。例如“（uid = {0}）”。替换参数是用户的登录名。
    
    如果需要执行搜索以在目录中找到用户，则可以设置这些属性以控制搜索。`BindAuthenticator`将配置为`FilterBasedLdapUserSearch`，属性值直接映射到该bean的构造函数的前两个参数。如果未设置这些属性且未提供`user-dn-pattern`，则将使用`user-search-filter="(uid={0})"`和`user-search-base=""`的默认搜索值。
    

##### [](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider-children)<ldap-authentication-provider>的子元素

- [密码比较](https://www.springcloud.cc/spring-security.html#nsa-password-compare "<密码比较>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-password-compare)<密码比较>

这用作`<ldap-provider>`的子元素，并将身份验证策略从`BindAuthenticator`切换到`PasswordComparisonAuthenticator`。

##### [](https://www.springcloud.cc/spring-security.html#nsa-password-compare-parents)<password-compare>的父元素

- [LDAP身份验证提供者](https://www.springcloud.cc/spring-security.html#nsa-ldap-authentication-provider "<LDAP的认证提供商>")

##### [](https://www.springcloud.cc/spring-security.html#nsa-password-compare-attributes)<password-compare>属性

[](https://www.springcloud.cc/spring-security.html#nsa-password-compare-hash)

- **hash** 定义用户密码上使用的散列算法。我们强烈反对使用MD4，因为它是一种非常弱的散列算法。

[](https://www.springcloud.cc/spring-security.html#nsa-password-compare-password-attribute)

- **password-attribute** 目录中包含用户密码的属性。默认为“userPassword”。

##### [](https://www.springcloud.cc/spring-security.html#nsa-password-compare-children)<password-compare>的子元素

- [密码编码器](https://www.springcloud.cc/spring-security.html#nsa-password-encoder "<密码编码器>")

#### [](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service)<LDAP的用户服务>

此元素配置LDAP `UserDetailsService`。使用的类是`LdapUserDetailsService`，它是`FilterBasedLdapUserSearch`和`DefaultLdapAuthoritiesPopulator`的组合。它支持的属性与`<ldap-provider>`中的用法相同。

##### [](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-attributes)<ldap-user-service>属性

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-cache-ref)

- **cache-ref** 定义对缓存的引用以与UserDetailsS​​ervice一起使用。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-group-role-attribute)

- **group-role-attribute** LDAP属性名称，包含将在Spring Security中使用的角色名称。默认为“cn”。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-group-search-base)

- **group-search-base** 组成员资格搜索的搜索库。默认为“”（从根目录搜索）。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-group-search-filter)

- **group-search-filter** 组搜索过滤器。默认为（uniqueMember = {0}）。替换参数是用户的DN。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-id)

- **id** 一个bean标识符，用于在上下文中的其他位置引用bean。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-role-prefix)

- **role-prefix** 一个非空字符串前缀，将添加到从持久存储加载的角色字符串中（例如“ROLE_”）。如果默认值为非空，则使用值“none”表示无前缀。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-server-ref)

- **server-ref** 要使用的可选服务器。如果省略，并且注册了默认LDAP服务器（使用<ldap-server>且没有Id），将使用该服务器。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-user-context-mapper-ref)

- **user-context-mapper-ref** 允许通过指定UserDetailsContextMapper bean显式自定义加载的用户对象，该bean将使用用户目录条目中的上下文信息调用

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-user-details-class)

- **user-details-class** 允许指定用户条目的objectClass。如果设置，框架将尝试将已定义类的标准属性加载到返回的UserDetails对象中

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-user-search-base)

- **user-search-base** 用户搜索的搜索库。默认为“”。仅用于'用户搜索过滤器'。

[](https://www.springcloud.cc/spring-security.html#nsa-ldap-user-service-user-search-filter)

- **user-search-filter** 用于搜索用户的LDAP过滤器（可选）。例如“（uid = {0}）”。替换参数是用户的登录名。

## [](https://www.springcloud.cc/spring-security.html#appendix-dependencies)15.3 Spring Security依赖性

本附录提供了Spring Security中模块的参考以及它们在正在运行的应用程序中运行所需的其他依赖项。我们不包含仅在构建或测试Spring Security时使用的依赖项。我们也不包括外部依赖所需的传递依赖。

所需的Spring版本列在项目网站上，因此下面的Spring依赖项省略了特定版本。请注意，Spring应用程序中的其他非安全功能可能仍然需要下面列为“可选”的某些依赖项。如果项目的Maven POM文件在大多数应用程序中使用，那么列为“可选”的依赖项实际上也不会被标记为“可选”。除非您使用指定的功能，否则它们只是在您不需要它们的意义上是“可选的”。

在模块依赖于另一个Spring Security模块的情况下，它所依赖的模块的非可选依赖性也被认为是必需的，并且不单独列出。

### [](https://www.springcloud.cc/spring-security.html#spring-security-core-2)15.3.1 spring-security-core

核心模块必须包含在使用Spring Security的任何项目中。

[](https://www.springcloud.cc/spring-security.html#d5e9510)

**表15.1。核心依赖关系**

|依赖|版|描述|
|:--|:--|:--|
|ehcache|1.6.2|如果使用基于Ehcache的用户缓存实现，则为必需（可选）。|
|spring-aop||方法安全性基于Spring AOP|
|spring-beans||Spring配置需要|
|spring-expression||基于表达式的方法安全性所必需的（可选）|
|spring-jdbc||如果使用数据库存储用户数据，则为必需（可选）。|
|spring-tx||如果使用数据库存储用户数据，则为必需（可选）。|
|aspectjrt|1.6.10|如果使用AspectJ支持，则必需（可选）。|
|jsr250-api|1.0|如果您使用JSR-250方法安全注释（可选），则是必需的。|

  

### [](https://www.springcloud.cc/spring-security.html#spring-security-remoting-2)15.3.2 spring-security-remoting

在使用Servlet API的web应用程序中通常需要此模块。

[](https://www.springcloud.cc/spring-security.html#d5e9576)

**表15.2。远程依赖**

|依赖|版|描述|
|:--|:--|:--|
|spring-security-core|||
|spring-web||对于使用HTTP远程支持的客户端是必需的。|

  

### [](https://www.springcloud.cc/spring-security.html#spring-security-web-2)15.3.3 spring-security-web

在使用Servlet API的web应用程序中通常需要此模块。

[](https://www.springcloud.cc/spring-security.html#d5e9602)

**表15.3。Web依赖关系**

|依赖|版|描述|
|:--|:--|:--|
|spring-security-core|||
|spring-web||Spring web支持类被广泛使用。|
|spring-jdbc||基于JDBC的持久记住我的令牌存储库（可选）是必需的。|
|spring-tx||记住我的持久性令牌库实现（可选）所必需的。|

  

### [](https://www.springcloud.cc/spring-security.html#spring-security-ldap-2)15.3.4 spring-security-ldap

只有在使用LDAP身份验证时才需要此模块。

[](https://www.springcloud.cc/spring-security.html#d5e9640)

**表15.4。LDAP依赖项**

|依赖|版|描述|
|:--|:--|:--|
|spring-security-core|||
|spring-ldap-core|1.3.0|LDAP支持基于Spring LDAP。|
|spring-tx||数据异常类是必需的。|
|apache-ds [[1]](https://www.springcloud.cc/spring-security.html#ftn.d5e9673)|1.5.5|如果使用嵌入式LDAP服务器，则必需（可选）。|
|shared-ldap|0.9.15|如果使用嵌入式LDAP服务器，则必需（可选）。|
|ldapsdk|4.1|Mozilla LdapSDK。例如，如果您使用OpenLDAP的密码策略功能，则用于解码LDAP密码策略控制。|
|[[1]](https://www.springcloud.cc/spring-security.html#d5e9673)模块`apacheds-core`，`apacheds-core-entry`，`apacheds-protocol-shared`，`apacheds-protocol-ldap`和`apacheds-server-jndi`是必需的。|   |   |

  

### [](https://www.springcloud.cc/spring-security.html#spring-security-config-2)15.3.5 spring-security-config

如果使用Spring Security命名空间配置，则需要此模块。

[](https://www.springcloud.cc/spring-security.html#d5e9701)

**表15.5。配置依赖项**

|依赖|版|描述|
|:--|:--|:--|
|spring-security-core|||
|spring-security-web||如果您使用任何与web相关的命名空间配置（可选），则为必需。|
|spring-security-ldap||如果使用LDAP命名空间选项，则必需（可选）。|
|spring-security-openid||如果使用OpenID身份验证，则必需（可选）。|
|aspectjweaver|1.6.10|如果使用protect-pointcut命名空间语法（可选），则为必需。|

  

### [](https://www.springcloud.cc/spring-security.html#spring-security-acl-2)15.3.6 spring-security-acl

ACL模块。

[](https://www.springcloud.cc/spring-security.html#d5e9746)

**表15.6。ACL依赖关系**

|依赖|版|描述|
|:--|:--|:--|
|spring-security-core|||
|ehcache|1.6.2|如果使用基于Ehcache的ACL缓存实现，则为必需（如果您使用自己的实现，则为可选）。|
|spring-jdbc||如果您使用默认的基于JDBC的AclService，则是必需的（如果您实现自己的，则是可选的）。|
|spring-tx||如果您使用默认的基于JDBC的AclService，则是必需的（如果您实现自己的，则是可选的）。|

  

### [](https://www.springcloud.cc/spring-security.html#spring-security-cas-2)15.3.7 spring-security-cas

CAS模块提供与JA-SIG CAS的集成。

[](https://www.springcloud.cc/spring-security.html#d5e9785)

**表15.7。CAS依赖关系**

|依赖|版|描述|
|:--|:--|:--|
|spring-security-core|||
|spring-security-web|||
|cas-client-core|3.1.12|JA-SIG CAS客户端。这是Spring Security整合的基础。|
|ehcache|1.6.2|如果您使用基于Ehcache的票证缓存（可选），则为必需。|

  

### [](https://www.springcloud.cc/spring-security.html#spring-security-openid-2)15.3.8 spring-security-openid

OpenID模块。

[](https://www.springcloud.cc/spring-security.html#d5e9824)

**表15.8。OpenID依赖项**

|依赖|版|描述|
|:--|:--|:--|
|spring-security-core|||
|spring-security-web|||
|openid4java-nodeps|0.9.6|Spring Security的OpenID集成使用OpenID4Java。|
|httpclient|4.1.1|openid4java-nodeps依赖于HttpClient 4。|
|guice|2.0|openid4java-nodeps依赖于Guice 2。|

  

### [](https://www.springcloud.cc/spring-security.html#spring-security-taglibs)15.3.9 spring-security-taglibs

提供Spring Security的JSP标记实现。

[](https://www.springcloud.cc/spring-security.html#d5e9870)

**表15.9。Taglib依赖关系**

|依赖|版|描述|
|:--|:--|:--|
|spring-security-core|||
|spring-security-web|||
|spring-security-acl||如果您使用带有ACL的`accesscontrollist`标记或`hasPermission()`表达式（可选），则为必需。|
|spring-expression||如果在标记访问约束中使用SPEL表达式，则必需。|

  

## [](https://www.springcloud.cc/spring-security.html#appendix-proxy-server)15.4代理服务器配置

使用代理服务器时，务必确保已正确配置应用程序。例如，许多应用程序将有一个负载均衡器，通过将请求转发到应用程序服务器[http：//192.168.1：8080](http://192.168.0.1:8080/)来响应对[https://example.com/](https://example.com/)的请求。 如果没有正确配置，应用程序服务器将不会知道负载均衡器存在并将请求视为客户端请求[http：//192.168.1：8080](http://192.168.0.1:8080/)。[](http://192.168.0.1:8080/)[](http://192.168.0.1:8080/)

要解决此问题，您可以使用[RFC 7239](https://tools.ietf.org/html/rfc7239)指定正在使用负载均衡器。要使应用程序意识到这一点，您需要配置应用程序服务器以识别X-Forwarded标头。例如，Tomcat使用[RemoteIpValve](https://tomcat.apache.org/tomcat-8.0-doc/api/org/apache/catalina/valves/RemoteIpValve.html)，Jetty使用[ForwardedRequestCustomizer](http://download.eclipse.org/jetty/stable-9/apidocs/org/eclipse/jetty/server/ForwardedRequestCustomizer.html)。或者，Spring 4.3+用户可以利用[ForwardedHeaderFilter](https://github.com/spring-projects/spring-framework/blob/v4.3.3.RELEASE/spring-web/src/main/java/org/springframework/web/filter/ForwardedHeaderFilter.java)。

## [](https://www.springcloud.cc/spring-security.html#appendix-faq)15.5 Spring Security常见问题

- [第15.5.1节“一般问题”](https://www.springcloud.cc/spring-security.html#appendix-faq-general-questions "15.5.1一般问题")
- [第15.5.2节“常见问题”](https://www.springcloud.cc/spring-security.html#appendix-faq-common-problems "15.5.2常见问题")
- [第15.5.3节，“Spring Security架构问题”](https://www.springcloud.cc/spring-security.html#appendix-faq-architecture "15.5.3 Spring安全体系结构问题")
- [第15.5.4节“共同”如何“请求”](https://www.springcloud.cc/spring-security.html#appendix-faq-howto "15.5.4常见的“Howto”请求")

### [](https://www.springcloud.cc/spring-security.html#appendix-faq-general-questions)15.5.1一般问题

1. [名为“Will Spring Security的部分会处理我的所有应用安全要求吗？”](https://www.springcloud.cc/spring-security.html#appendix-faq-other-concerns "Spring Security是否会处理我的所有应用程序安全性要求？")
2. [“为什么不使用web。xml security？”一节](https://www.springcloud.cc/spring-security.html#appendix-faq-web-xml "为什么不直接使用web.xml安全性？")
3. [名为“需要什么Java和Spring Framework版本？”的部分](https://www.springcloud.cc/spring-security.html#appendix-faq-requirements "需要什么Java和Spring Framework版本？")
4. [我称之为“我是Spring Security的新手，我需要构建一个支持通过HTTPS进行CAS单点登录的应用程序，同时允许在本地对某些URL进行基本身份验证，对多个后端用户信息源进行身份验证（LDAP和JDBC）。我复制了一些我找到的配置文件，但它不起作用。“](https://www.springcloud.cc/spring-security.html#appendix-faq-start-simple "我是Spring Security的新手，我需要构建一个支持通过HTTPS进行CAS单点登录的应用程序，同时允许在本地对某些URL进行基本身份验证，对多个后端用户信息源（LDAP和JDBC）进行身份验证。 我复制了一些我找到的配置文件，但它不起作用。")

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-other-concerns)Spring Security会照顾我的所有应用安全要求吗？

Spring Security为您的身份验证和授权要求提供了一个非常灵活的框架，但是构建超出其范围的安全应用程序还有许多其他注意事项。Web应用程序容易受到您应该熟悉的各种攻击，最好是在开始开发之前，这样您就可以从头开始设计和编写它们。查看http://www.owasp.org/ [OWASP web网站]，了解web应用程序开发人员面临的主要问题以及可以对其使用的对策的信息。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-web-xml)为什么不使用web。xml安全性？

假设您正在开发基于Spring的企业应用程序。您通常需要解决四个安全问题：身份验证，web请求安全性，服务层安全性（即实现业务逻辑的方法）和域对象实例安全性（即不同的域对象具有不同的权限）。考虑到这些典型要求：

1. _身份验证_：servlet规范提供了一种身份验证方法。但是，您需要配置容器以执行身份验证，这通常需要编辑特定于容器的“领域”设置。这使得非可移植配置，如果您需要编写实际的Java类来实现容器的身份验证接口，它将变得更加不可移植。使用Spring Security，您可以实现完全的可移植性 - 直到WAR级别。此外，Spring Security提供了经过生产验证的身份验证提供程序和机制，这意味着您可以在部署时切换身份验证方法。这对于编写需要在未知目标环境中工作的产品的软件供应商特别有用。
2. _Web请求安全性：_ servlet规范提供了一种保护请求URI的方法。但是，这些URI只能用servlet规范自己有限的URI路径格式表示。Spring Security提供了一种更为全面的方法。例如，您可以使用Ant路径或正则表达式，您可以考虑URI的部分而不仅仅是请求的页面（例如，您可以考虑HTTP GET参数），并且您可以实现自己的配置数据的运行时源。这意味着您的web请求安全性可以在实际执行Web应用程序期间动态更改。
3. _服务层和域对象安全性：_服务层安全性或域对象实例安全性的servlet规范中缺少支持代表了多层应用程序的严重限制。通常，开发人员要么忽略这些要求，要么在其MVC控制器代码中实现安全逻辑（或者更糟糕的是，在视图内部）。这种方法存在严重的缺点：
    
    1. _关注点分离：_授权是一个跨领域的问题，应该如此实施。实现授权代码的MVC控制器或视图使得测试控制器和授权逻辑变得更加困难，更难以调试，并且经常导致代码重复。
    2. _支持富客户端和web服务：_如果最终必须支持其他客户端类型，则web层中嵌入的任何授权代码都是不可重用的。应该考虑Spring远程导出器只导出服务层bean（不是MVC控制器）。因此，需要在服务层中定位授权逻辑以支持多种客户端类型。
    3. _分层问题：_ MVC控制器或视图只是用于实现有关服务层方法或域对象实例的授权决策的错误架构层。虽然可以将Principal传递给服务层以使其能够做出授权决策，但这样做会在每个服务层方法上引入额外的参数。更优雅的方法是使用ThreadLocal来保存Principal，尽管这可能会将开发时间增加到仅仅使用专用安全框架变得更经济（在成本效益基础上）的程度。
    4. _授权代码质量：_ web框架经常说它们“使得更容易做正确的事情，更难做错事”。安全框架是相同的，因为它们是以抽象的方式设计的，用于广泛的目的。从头开始编写自己的授权代码并不能提供框架提供的“设计检查”，内部授权代码通常缺乏广泛部署，同行评审和新版本所带来的改进。
    

对于简单的应用程序，servlet规范安全性可能就足够了。虽然在web容器可移植性，配置要求，有限的web请求安全灵活性以及不存在的服务层和域对象实例安全性的上下文中考虑时，很明显为什么开发人员经常寻找替代解决方案。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-requirements)需要什么Java和Spring Framework版本？

Spring Security 3.0和3.1至少需要JDK 1.5，并且至少需要Spring 3.0.3。理想情况下，您应该使用最新版本以避免出现问题。

Spring Security 2.0.x要求最低JDK版本为1.4，并且是针对Spring 2.0.x构建的。它还应与使用Spring 2.5.x的应用程序兼容。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-start-simple)我是Spring Security的新手，我需要构建一个支持通过HTTPS进行CAS单点登录的应用程序，同时允许在本地对某些URL进行基本身份验证，对多个后端用户信息源（LDAP和JDBC）进行身份验证。我复制了一些我找到的配置文件，但它不起作用。

可能有什么不对？

或者替代另一种复杂的情景......

实际上，在使用它们成功构建应用程序之前，您需要了解您打算使用的技术。安全性很复杂。使用登录表单和使用Spring Security命名空间的一些硬编码用户设置简单配置是相当简单的。转向使用支持的JDBC数据库也很容易。但是，如果您尝试直接跳转到这样复杂的部署方案，您几乎肯定会感到沮丧。设置CAS系统，配置LDAP服务器和正确安装SSL证书所需的学习曲线大幅增加。所以你需要一步一步地做事。

从Spring Security的角度来看，您应该首先遵循web网站上的“入门”指南。这将引导您完成一系列步骤以启动和运行，并了解框架的运行方式。如果您正在使用其他您不熟悉的技术，那么您应该进行一些研究并尝试确保在将它们组合到复杂系统中之前可以单独使用它们。

### [](https://www.springcloud.cc/spring-security.html#appendix-faq-common-problems)15.5.2常见问题

1. 认证
    
    1. [名为“当我尝试登录时，我收到一条错误消息，上面写着”Bad Credentials“。怎么了？”](https://www.springcloud.cc/spring-security.html#appendix-faq-bad-credentials "当我尝试登录时，收到一条错误消息“Bad Credentials”。 怎么了？")
    2. [当我尝试登录时，“我的应用程序进入无限循环”一节，发生了什么？](https://www.springcloud.cc/spring-security.html#appendix-faq-login-loop "当我尝试登录时，我的应用程序进入“无限循环”，发生了什么？")
    3. [“我收到一条带有消息的异常”一节“访问被拒绝（用户是匿名的）;”。怎么了？”](https://www.springcloud.cc/spring-security.html#appendix-faq-anon-access-denied "我收到一条例外消息“访问被拒绝（用户是匿名的）;”。 怎么了？")
    4. [这个部分名为“为什么即使在我退出我的应用程序后，我仍然可以看到安全的页面？”](https://www.springcloud.cc/spring-security.html#appendix-faq-cached-secure-page "为什么即使在我退出应用程序后仍能看到安全页面？")
    5. [名为“我收到消息的异常”一节“在SecurityContext中找不到Authentication对象”。怎么了？”](https://www.springcloud.cc/spring-security.html#auth-exception-credentials-not-found "我收到一条消息“在SecurityContext中找不到身份验证对象”的异常。 怎么了？")
    6. [“我无法使LDAP身份验证工作”一节。](https://www.springcloud.cc/spring-security.html#appendix-faq-ldap-authentication "我无法使用LDAP身份验证。")
    
2. 会话管理
    
    1. [“我正在使用Spring Security的并发会话控制来防止用户一次登录多次。”](https://www.springcloud.cc/spring-security.html#appendix-faq-concurrent-session-same-browser "我正在使用Spring Security的并发会话控制来阻止用户一次登录多次。")
    2. [“我通过Spring Security进行身份验证时，为什么会话ID会发生变化？”](https://www.springcloud.cc/spring-security.html#appendix-faq-new-session-on-authentication "当我通过Spring Security进行身份验证时，为什么会话ID会发生变化？")
    3. [“我正在使用Tomcat（或其他一些servlet容器），并为我的登录页面启用HTTPS，然后切换回HTTP。”](https://www.springcloud.cc/spring-security.html#appendix-faq-tomcat-https-session "我正在使用Tomcat（或其他一些servlet容器）并为我的登录页面启用了HTTPS，之后又切换回HTTP。")
    4. [称为“我正在尝试使用并发会话控制支持，但它不会让我重新登录，即使我确定我已经注销并且没有超过允许的会话。”](https://www.springcloud.cc/spring-security.html#appendix-faq-session-listener-missing "我正在尝试使用并发会话控制支持，但它不会让我重新登录，即使我确定我已经注销并且没有超过允许的会话。")
    5. [名为“Spring Security的部分正在某处创建会话，即使我已将其配置为不通过将create-session属性设置为never。”](https://www.springcloud.cc/spring-security.html#appendix-faq-unwanted-session-creation "Spring Security通过将create-session属性设置为never，即使我已将其配置为某个地方，也会在某处创建会话。")
    
3. 杂
    
    1. [“执行POST时我得到403禁止”的部分](https://www.springcloud.cc/spring-security.html#appendix-faq-forbidden-csrf "执行POST时我得到403 Forbidden")
    2. [“我正在使用RequestDispatcher将请求转发到另一个URL，但我的安全约束未被应用”。](https://www.springcloud.cc/spring-security.html#appendix-faq-no-security-on-forward "我正在使用RequestDispatcher将请求转发到另一个URL，但我的安全约束没有被应用。")
    3. [the section called “I have added Spring Security’s <global-method-security> element to my application context but if I add security annotations to my Spring MVC controller beans (Struts actions etc.) then they don’t seem to have an effect.”](https://www.springcloud.cc/spring-security.html#appendix-faq-method-security-in-web-context "I have added Spring Security’s <global-method-security> element to my application context but if I add security annotations to my Spring MVC controller beans (Struts actions etc.) then they don’t seem to have an effect.")
    4. [“我有一个肯定已经过身份验证的用户，但在我尝试在某些请求期间访问SecurityContextHolder时，身份验证为空”一节。](https://www.springcloud.cc/spring-security.html#appendix-faq-no-filters-no-context "我有一个肯定已经过身份验证的用户，但是当我尝试在某些请求期间访问SecurityContextHolder时，身份验证为空。")
    5. [“使用URL属性时，授权JSP标记不尊重我的方法安全注释”一节。](https://www.springcloud.cc/spring-security.html#appendix-faq-method-security-with-taglib "使用URL属性时，授权JSP标记不遵守我的方法安全注释。")
    

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-bad-credentials)当我尝试登录时，收到一条错误消息“Bad Credentials”。怎么了？

这意味着身份验证失败。它没有说明原因，因为最好避免提供可能有助于攻击者猜测帐户名称或密码的详细信息。

这也意味着如果您在论坛中提出此问题，除非您提供其他信息，否则您将无法得到答案。与任何问题一样，您应该检查调试日志的输出，记下任何异常堆栈跟踪和相关消息。逐步调试调试器中的代码，以查看身份验证失败的原因以及原因。编写一个测试用例，在应用程序之外运行您的身份验证配置。通常，失败是由于存储在数据库中的密码数据与用户输入的密码数据不同。如果使用散列密码，请确保存储在数据库中的值与应用程序中配置的`PasswordEncoder`生成的值_完全相同_。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-login-loop)当我尝试登录时，我的应用程序进入“无限循环”，发生了什么？

无限循环和重定向到登录页面的常见用户问题是由于意外地将登录页面配置为“安全”资源而引起的。确保您的配置允许匿名访问登录页面，方法是将其从安全筛选器链中排除或将其标记为需要ROLE_ANONYMOUS。

如果AccessDecisionManager包含AuthenticatedVoter，则可以使用属性“IS_AUTHENTICATED_ANONYMOUSLY”。如果您使用标准命名空间配置设置，则会自动使用此选项。

从Spring Security 2.0.1开始，当您使用基于命名空间的配置时，将在加载应用程序上下文时进行检查，并在您的登录页面看起来受到保护时记录警告消息。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-anon-access-denied)我收到一条例外消息“访问被拒绝（用户是匿名的）;”。怎么了？

这是一个调试级别消息，在匿名用户第一次尝试访问受保护资源时发生。

DEBUG [ExceptionTranslationFilter] - Access is denied (user is anonymous); redirecting to authentication entry point
org.springframework.security.AccessDeniedException: Access is denied
at org.springframework.security.vote.AffirmativeBased.decide(AffirmativeBased.java:68)
at org.springframework.security.intercept.AbstractSecurityInterceptor.beforeInvocation(AbstractSecurityInterceptor.java:262)

这是正常的，不应该担心任何事情。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-cached-secure-page)为什么即使在我退出应用程序后仍能看到安全页面？

最常见的原因是您的浏览器已缓存页面，并且您正在查看从浏览器缓存中检索的副本。通过检查浏览器是否实际发送请求来验证这一点（检查服务器访问日志，调试日志或使用适当的浏览器调试插件，如Firefox的“篡改数据”）。这与Spring Security无关，您应该配置应用程序或服务器以设置相应的`Cache-Control`响应标头。请注意，SSL请求永远不会被缓存。

#### [](https://www.springcloud.cc/spring-security.html#auth-exception-credentials-not-found)我收到一条消息“在SecurityContext中找不到身份验证对象”的异常。怎么了？

这是另一个调试级别消息，它发生在匿名用户第一次尝试访问受保护资源时，但是当您的过滤器链配置中没有`AnonymousAuthenticationFilter`时。

DEBUG [ExceptionTranslationFilter] - Authentication exception occurred; redirecting to authentication entry point
org.springframework.security.AuthenticationCredentialsNotFoundException:
                            An Authentication object was not found in the SecurityContext
at org.springframework.security.intercept.AbstractSecurityInterceptor.credentialsNotFound(AbstractSecurityInterceptor.java:342)
at org.springframework.security.intercept.AbstractSecurityInterceptor.beforeInvocation(AbstractSecurityInterceptor.java:254)

这是正常的，不应该担心任何事情。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-ldap-authentication)我无法使用LDAP身份验证。

我的配置有什么问题？

请注意，LDAP目录的权限通常不允许您读取用户的密码。因此，通常不可能使用[名为“什么是UserDetailsS​​ervice并且我需要一个吗？”的部分](https://www.springcloud.cc/spring-security.html#appendix-faq-what-is-userdetailservice "什么是UserDetailsS​​ervice，我需要一个吗？")，其中Spring Security将存储的密码与用户提交的密码进行比较。最常见的方法是使用LDAP“bind”，这是[LDAP协议](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol)支持的操作之一。使用此方法，Spring Security通过尝试以用户身份验证目录来验证密码。

LDAP身份验证最常见的问题是缺乏对目录服务器树结构和配置的了解。这在不同的公司会有所不同，所以你必须自己找到它。在将Spring Security LDAP配置添加到应用程序之前，最好使用标准Java LDAP代码编写一个简单的测试（不涉及Spring Security），并确保您可以首先使用它。例如，要对用户进行身份验证，可以使用以下代码：

_@Test_
public void ldapAuthenticationIsSuccessful() throws Exception {
        Hashtable<String,String> env = new Hashtable<String,String>();
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        env.put(Context.SECURITY_PRINCIPAL, "cn=joe,ou=users,dc=mycompany,dc=com");
        env.put(Context.PROVIDER_URL, "ldap://mycompany.com:389/dc=mycompany,dc=com");
        env.put(Context.SECURITY_CREDENTIALS, "joespassword");
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");

        InitialLdapContext ctx = new InitialLdapContext(env, null);

}

#### [](https://www.springcloud.cc/spring-security.html#session-management)会话管理

会话管理问题是论坛问题的常见来源。如果您正在开发Java web应用程序，您应该了解如何在servlet容器和用户的浏览器之间维护会话。您还应该了解安全和非安全cookie之间的区别以及使用HTTP / HTTPS和在两者之间切换的含义。Spring Security与维护会话或提供会话标识符无关。这完全由servlet容器处理。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-concurrent-session-same-browser)我正在使用Spring Security的并发会话控制来阻止用户一次登录多次。

当我在登录后打开另一个浏览器窗口时，它不会阻止我再次登录。为什么我可以多次登录？

浏览器通常为每个浏览器实例维护一个会话。您不能同时拥有两个单独的会话。因此，如果您再次在另一个窗口或选项卡中登录，则只需在同一会话中重新进行身份验证。服务器对选项卡，窗口或浏览器实例一无所知。它看到的只是HTTP请求，它根据它们包含的JSESSIONID cookie的值将它们与特定会话联系起来。当用户在会话期间进行身份验证时，Spring Security的并发会话控制会检查他们拥有的_其他经过身份验证的会话_的数量。如果它们已使用相同的会话进行身份验证，则重新进行身份验证将不起作用。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-new-session-on-authentication)当我通过Spring Security进行身份验证时，为什么会话ID会发生变化？

使用默认配置时，Spring Security会在用户进行身份验证时更改会话ID。如果您使用的是Servlet 3.1或更新的容器，则只需更改会话ID。如果您使用的是旧容器，Spring Security会使现有会话无效，创建新会话，并将会话数据传输到新会话。以这种方式更改会话标识符可防止“会话固定”攻击。您可以在线和参考手册中找到更多相关信息。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-tomcat-https-session)我正在使用Tomcat（或其他一些servlet容器）并为我的登录页面启用了HTTPS，之后又切换回HTTP。

它不起作用 - 我在验证后最终返回登录页面。

发生这种情况是因为在HTTPS下创建的会话，会话cookie被标记为“安全”，后来无法在HTTP下使用。浏览器不会将cookie发送回服务器，任何会话状态都将丢失（包括安全上下文信息）。首先在HTTP中启动会话应该起作用，因为会话cookie不会被标记为安全。但是，Spring Security的[会话固定保护](http://static.springsource.org/spring-security/site/docs/3.1.x/reference/springsecurity-single.html#ns-session-fixation)会干扰这一点，因为它会导致新的会话ID cookie被发送回用户的浏览器，通常带有安全标志。要解决此问题，您可以禁用会话固定保护，但在较新的Servlet容器中，您还可以配置会话cookie以永远不使用安全标志。请注意，在HTTP和HTTPS之间切换通常不是一个好主意，因为任何使用HTTP的应用程序都容易受到中间人攻击。为了确保安全，用户应该开始使用HTTPS访问您的网站并继续使用它，直到他们退出为止。即使从通过HTTP访问的页面单击HTTPS链接也存在潜在风险。如果您需要更有说服力，请查看像[sslstrip](http://www.thoughtcrime.org/software/sslstrip/)这样的工具。

#### [](https://www.springcloud.cc/spring-security.html#i-m-not-switching-between-http-and-https-but-my-session-is-still-getting-lost)我不是在HTTP和HTTPS之间切换，但我的会话仍然迷失

通过交换会话cookie或向URL添加`jsessionid`参数来维护会话（如果您使用JSTL输出URL，或者如果您在URL上调用`HttpServletResponse.encodeUrl`（例如在重定向之前），这会自动发生如果客户端已禁用cookie，并且您没有重写URL以包含`jsessionid`，则会话将丢失。请注意，出于安全原因，首选使用cookie，因为它不会公开会话信息。 URL。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-session-listener-missing)我正在尝试使用并发会话控制支持，但它不会让我重新登录，即使我确定我已经注销并且没有超过允许的会话。

确保已将侦听器添加到web。xml文件中。确保在销毁会话时通知Spring Security会话注册表是至关重要的。没有它，会话信息将不会从注册表中删除。

<listener>
        <listener-class>org.springframework.security.web.session.HttpSessionEventPublisher</listener-class>
</listener>

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-unwanted-session-creation)Spring Security正在创建一个会话，即使我已将其配置为不通过将create-session属性设置为never。

这通常意味着用户的应用程序正在某处创建会话，但他们并不知道它。最常见的罪魁祸首是JSP。很多人都不知道JSP默认创建会话。要阻止JSP创建会话，请将指令`<%@ page session="false" %>`添加到页面顶部。

如果您在创建会话的位置时遇到问题，可以添加一些调试代码来跟踪位置。一种方法是在您的应用程序中添加`javax.servlet.http.HttpSessionListener`，在`sessionCreated`方法中调用`Thread.dumpStack()`。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-forbidden-csrf)执行POST时我得到403 Forbidden

如果HTTP POST返回HTTP 403 Forbidden，但适用于HTTP GET，那么问题很可能与[CSRF](https://docs.spring.io/spring-security/site/docs/3.2.x/reference/htmlsingle/#csrf)有关。提供CSRF令牌或禁用CSRF保护（不推荐）。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-no-security-on-forward)我正在使用RequestDispatcher将请求转发到另一个URL，但我的安全约束没有被应用。

默认情况下，过滤器不会应用于转发或包含。如果您确实希望将安全过滤器应用于转发和/或包含，则必须使用<dispatcher>元素（<filter-mapping>的子元素）在web。xml中显式配置这些过滤器。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-method-security-in-web-context)我已将Spring Security的<global-method-security>元素添加到我的应用程序上下文中，但如果我向我的Spring MVC控制器bean（Struts操作等）添加安全注释，那么它们似乎没有影响。

在Spring web应用程序中，保存调度程序servlet的Spring MVC bean的应用程序上下文通常与主应用程序上下文分开。它通常在名为`myapp-servlet.xml`的文件中定义，其中“myapp”是分配给`web.xml`中Spring `DispatcherServlet`的名称。一个应用程序可以有多个`DispatcherServlet`，每个都有自己独立的应用程序上下文。这些“子”上下文中的bean对于应用程序的其余部分是不可见的。“父”应用程序上下文由您在`web.xml`中定义的`ContextLoaderListener`加载，并且对所有子上下文都可见。此父上下文通常是您定义安全配置的位置，包括`<global-method-security>`元素。因此，不会强制执行应用于这些web bean中的方法的任何安全约束，因为无法从`DispatcherServlet`上下文中看到bean。您需要将`<global-method-security>`声明移动到web上下文，或者将要保护的bean移动到主应用程序上下文中。

通常，我们建议在服务层而不是单个web控制器上应用方法安全性。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-no-filters-no-context)我有一个肯定已经过身份验证的用户，但是当我尝试在某些请求期间访问SecurityContextHolder时，身份验证为空。

为什么我看不到用户信息？

如果您使用`<intercept-url>`元素中与URL模式匹配的属性`filters='none'`从安全过滤器链中排除了请求，则不会为该请求填充`SecurityContextHolder`。检查调试日志以查看请求是否通过过滤器链。（您正在阅读调试日志，对吧？）。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-method-security-with-taglib)使用URL属性时，授权JSP标记不遵守我的方法安全注释。

在`<sec:authorize>`中使用`url`属性时，方法安全性不会隐藏链接，因为我们无法轻易地对哪些URL映射到哪个控制器端点进行反向工程，因为控制器可以依赖于头，当前用户等来确定要调用的方法。

### [](https://www.springcloud.cc/spring-security.html#appendix-faq-architecture)15.5.3 Spring Security架构问题

1. [“我怎么知道哪个包类X在哪里？”一节](https://www.springcloud.cc/spring-security.html#appendix-faq-where-is-class-x "我如何知道X包中的哪个包？")
2. [名为“命名空间元素如何映射到传统bean配置？”的部分。](https://www.springcloud.cc/spring-security.html#appendix-faq-namespace-to-bean-mapping "命名空间元素如何映射到传统的bean配置？")
3. [“ROLE_”的意思是什么？“我的角色名称为什么需要它？”](https://www.springcloud.cc/spring-security.html#appendix-faq-role-prefix "“ROLE_”是什么意思，为什么我需要在我的角色名称上使用它？")
4. [“我如何知道要添加到我的应用程序中的哪些依赖项与Spring Security一起使用？”一节](https://www.springcloud.cc/spring-security.html#appendix-faq-what-dependencies "我如何知道要添加到我的应用程序以使用Spring Security的依赖项？")
5. [“运行嵌入式ApacheDS LDAP服务器需要哪些依赖项？”一节](https://www.springcloud.cc/spring-security.html#appendix-faq-apacheds-deps "运行嵌入式ApacheDS LDAP服务器需要哪些依赖项？")
6. [名为“什么是UserDetailsS​​ervice，我需要一个吗？”的部分。](https://www.springcloud.cc/spring-security.html#appendix-faq-what-is-userdetailservice "什么是UserDetailsS​​ervice，我需要一个吗？")

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-where-is-class-x)我如何知道X包中的哪个包？

查找类的最佳方法是在IDE中安装Spring Security源代码。该分发包括项目划分为的每个模块的源jar。将它们添加到项目源路径中，您可以直接导航到Spring Security类（Eclipse中的`Ctrl-Shift-T`）。这也使调试更容易，并允许您通过直接查看出现的代码来查看异常，以查看异常情况。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-namespace-to-bean-mapping)命名空间元素如何映射到传统的bean配置？

概述了参考指南的命名空间附录中命名空间创建的bean。在[blog.springsource.com](http://blog.springsource.com/2010/03/06/behind-the-spring-security-namespace/)上[还有](http://blog.springsource.com/2010/03/06/behind-the-spring-security-namespace/)一篇名为“Behind the Spring Security Namespace”的博客文章。如果想要了解完整的详细信息，那么代码位于Spring Security 3.0发行版中的`spring-security-config`模块中。您可能应该首先阅读标准Spring Framework参考文档中有关名称空间解析的章节。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-role-prefix)“ROLE_”是什么意思，为什么我需要在我的角色名称上使用它？

Spring Security具有基于选民的架构，这意味着一系列`AccessDecisionVoter`的访问决策。选民根据为安全资源（例如方法调用）指定的“配置属性”进行操作。使用这种方法，并非所有属性都可能与所有选民相关，并且选民需要知道何时应忽略属性（弃权）以及何时应根据属性值投票授予或拒绝访问。最常见的选民是`RoleVoter`，默认情况下，只要找到具有“ROLE_”前缀的属性，就会投票。它将属性（例如“ROLE_USER”）与当前用户已分配的权限的名称进行简单比较。如果它找到匹配（它们具有称为“ROLE_USER”的权限），则它投票授予访问权限，否则它投票拒绝访问。

可以通过设置`RoleVoter`的`rolePrefix`属性来更改前缀。如果您只需要在应用程序中使用角色而不需要其他自定义选民，则可以将前缀设置为空字符串，在这种情况下，`RoleVoter`会将所有属性视为角色。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-what-dependencies)如何知道要添加到我的应用程序中的哪些依赖项与Spring Security一起使用？

这取决于您使用的功能以及您正在开发的应用程序类型。使用Spring Security 3.0，项目罐分为明显不同的功能区域，因此可以直接从您的应用程序要求中找出所需的Spring Security罐。所有应用程序都需要`spring-security-core` jar。如果您正在开发web应用程序，则需要`spring-security-web` jar。如果您正在使用安全命名空间配置，则需要`spring-security-config` jar，对于LDAP支持，您需要`spring-security-ldap` jar等等。

对于第三方罐子，情况并不总是那么明显。一个很好的起点是从一个预构建的示例应用程序WEB-INF / lib目录中复制它们。对于基本应用程序，您可以从教程示例开始。如果要使用LDAP和嵌入式测试服务器，请使用LDAP示例作为起点。参考手册还包括：http：//static.springsource.org/spring-security/site/docs/3.1.x/reference/springsecurity-single.html#appendix-dependencies [附录]，其中列出了每个{的第一级依赖项1 /}模块，提供有关它们是否是可选的以及它们所需的信息。

如果使用maven构建项目，则将相应的Spring Security模块作为依赖项添加到pom.xml将自动引入框架所需的核心jar。如果您需要，在Spring Security POM文件中标记为“可选”的任何文件都必须添加到您自己的pom.xml文件中。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-apacheds-deps)运行嵌入式ApacheDS LDAP服务器需要哪些依赖项？

如果您使用的是Maven，则需要将以下内容添加到pom依赖项中：

<dependency>
        <groupId>org.apache.directory.server</groupId>
        <artifactId>apacheds-core</artifactId>
        <version>1.5.5</version>
        <scope>runtime</scope>
</dependency>
<dependency>
        <groupId>org.apache.directory.server</groupId>
        <artifactId>apacheds-server-jndi</artifactId>
        <version>1.5.5</version>
        <scope>runtime</scope>
</dependency>

其他所需的罐子应该过渡。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-what-is-userdetailservice)什么是UserDetailsS​​ervice，我需要一个吗？

`UserDetailsService`是用于加载特定于用户帐户的数据的DAO接口。除了加载数据以供框架内的其他组件使用外，它没有其他功能。它不负责验证用户。使用用户名/密码组合对用户进行身份验证通常由`DaoAuthenticationProvider`执行，`DaoAuthenticationProvider`注入`UserDetailsService`以允许其为用户加载密码（和其他数据）以便与用户进行比较提交的值。请注意，如果您使用的是LDAP，则[此方法可能无效](https://www.springcloud.cc/spring-security.html#appendix-faq-ldap-authentication "我无法使用LDAP身份验证。")。

如果要自定义身份验证过程，则应自行实现`AuthenticationProvider`。有关将Spring Security身份验证与Google App Engine集成的示例，请参阅此[博客文章](http://blog.springsource.com/2010/08/02/spring-security-in-google-app-engine/)。

### [](https://www.springcloud.cc/spring-security.html#appendix-faq-howto)15.5.4常见的“Howto”请求

1. [“我需要使用比用户名更多的信息登录”一节。](https://www.springcloud.cc/spring-security.html#appendix-faq-extra-login-fields "我需要登录的信息不仅仅是用户名。")
2. [“我如何应用不同的拦截 - 网址约束”，其中只有请求的网址的片段值不同（例如/ foo #bar和/ foo＃blah？“](https://www.springcloud.cc/spring-security.html#appendix-faq-matching-url-fragments "如何应用不同的拦截 - 网址约束，只有请求的网址的片段值不同（例如/ foo #bar和/ foo＃blah？")
3. [“我如何在UserDetailsS​​ervice中访问用户的IP地址（或其他web - 请求数据）”一节？“](https://www.springcloud.cc/spring-security.html#appendix-faq-request-details-in-user-service "如何在UserDetailsS​​ervice中访问用户的IP地址（或其他Web请求数据）？")
4. [“我如何从UserDetailsS​​ervice访问HttpSession？”一节](https://www.springcloud.cc/spring-security.html#appendix-faq-access-session-from-user-service "如何从UserDetailsS​​ervice访问HttpSession？")
5. [“我如何在UserDetailsS​​ervice中访问用户密码？”一节](https://www.springcloud.cc/spring-security.html#appendix-faq-password-in-user-service "如何在UserDetailsS​​ervice中访问用户的密码？")
6. [“我如何动态定义应用程序中的安全URL？”一节](https://www.springcloud.cc/spring-security.html#appendix-faq-dynamic-url-metadata "如何动态定义应用程序中的安全URL？")
7. [“我如何针对LDAP进行身份验证但是从数据库加载用户角色？”一节](https://www.springcloud.cc/spring-security.html#appendix-faq-ldap-authorities "如何对LDAP进行身份验证，但是从数据库加载用户角色？")
8. [“我想修改由命名空间创建的bean的属性，但是模式中没有任何内容可以支持它。”](https://www.springcloud.cc/spring-security.html#appendix-faq-namespace-post-processor "我想修改由命名空间创建的bean的属性，但架构中没有任何内容可以支持它。")

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-extra-login-fields)我需要登录的信息不仅仅是用户名。

如何添加对额外登录字段（例如公司名称）的支持？

这个问题在Spring Security论坛中反复出现，因此您可以通过搜索档案（或通过谷歌）找到更多信息。

提交的登录信息由`UsernamePasswordAuthenticationFilter`的实例处理。您需要自定义此类以处理额外的数据字段。一种选择是使用您自己的自定义身份验证令牌类（而不是标准`UsernamePasswordAuthenticationToken`），另一种选择只是将额外字段与用户名连接（例如，使用“：”作为分隔符）并将其传递给用户名属性`UsernamePasswordAuthenticationToken`。

您还需要自定义实际的身份验证过程。例如，如果您使用自定义身份验证令牌类，则必须编写`AuthenticationProvider`来处理它（或扩展标准`DaoAuthenticationProvider`）。如果您已连接这些字段，则可以实现自己的`UserDetailsService`，将它们拆分并加载适当的用户数据以进行身份​​验证。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-matching-url-fragments)如何应用不同的拦截 - 网址约束，只有请求的网址的片段值不同（例如/ foo #bar和/ foo＃blah？

您无法执行此操作，因为片段不会从浏览器传输到服务器。从服务器的角度来看，上面的URL是相同的。这是GWT用户常见的问题。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-request-details-in-user-service)如何在UserDetailsS​​ervice中访问用户的IP地址（或其他web - 请求数据）？

显然你不能（不使用线程局部变量之类的东西），因为提供给接口的唯一信息是用户名。您应该直接实现`AuthenticationProvider`并从提供的`Authentication`令牌中提取信息，而不是实现`UserDetailsService`。

在标准web设置中，`Authentication`对象上的`getDetails()`方法将返回`WebAuthenticationDetails`的实例。如果您需要其他信息，可以将自定义`AuthenticationDetailsSource`注入正在使用的身份验证过滤器中。如果您正在使用命名空间，例如使用`<form-login>`元素，则应删除此元素并将其替换为指向显式配置的`UsernamePasswordAuthenticationFilter`的`<custom-filter>`声明。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-access-session-from-user-service)如何从UserDetailsS​​ervice访问HttpSession？

你不能，因为`UserDetailsService`没有意识到servlet API。如果要存储自定义用户数据，则应自定义返回的`UserDetails`对象。然后可以通过线程本地`SecurityContextHolder`随时访问它。对`SecurityContextHolder.getContext().getAuthentication().getPrincipal()`的调用将返回此自定义对象。

如果您确实需要访问会话，则必须通过自定义web层来完成。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-password-in-user-service)如何在UserDetailsS​​ervice中访问用户的密码？

你不能（也不应该）。你可能误解了它的目的。请参阅上面的“ [什么是UserDetailsS​​ervice？](https://www.springcloud.cc/spring-security.html#appendix-faq-what-is-userdetailservice "什么是UserDetailsS​​ervice，我需要一个吗？") ”。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-dynamic-url-metadata)如何动态定义应用程序中的安全URL？

人们经常询问如何在数据库中而不是在应用程序上下文中存储安全URL和安全元数据属性之间的映射。

你应该问自己的第一件事是你是否真的需要这样做。如果应用程序需要保护，则还要求根据定义的策略彻底测试安全性。在推广到生产环境之前，可能需要进行审核和验收测试。有安全意识的组织应该意识到，通过在配置数据库中更改一行或两行来允许在运行时修改安全设置，可以立即消除其勤奋测试过程的好处。如果您已考虑到这一点（可能在您的应用程序中使用多层安全性），则Spring Security允许您完全自定义安全元数据的来源。如果您愿意，可以使其完全动态。

方法和web安全性都受`AbstractSecurityInterceptor`的子类保护，该子类使用`SecurityMetadataSource`配置，从中获取特定方法或过滤器调用的元数据。对于web安全性，拦截器类是`FilterSecurityInterceptor`并且它使用标记接口`FilterInvocationSecurityMetadataSource`。它操作的“安全对象”类型是`FilterInvocation`。使用的默认实现（在命名空间`<http>`中和显式配置拦截器时）将URL模式列表及其相应的“配置属性”列表（`ConfigAttribute`的实例）存储在内存中地图。

要从备用源加载数据，您必须使用显式声明的安全筛选器链（通常是Spring Security的`FilterChainProxy`）才能自定义`FilterSecurityInterceptor` bean。您无法使用命名空间。然后，您可以实现`FilterInvocationSecurityMetadataSource`为特定的`FilterInvocation` [[25]](https://www.springcloud.cc/spring-security.html#ftn.d5e10296)加载数据。一个非常基本的大纲看起来像这样：

public class MyFilterSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

    public List<ConfigAttribute> getAttributes(Object object) {
        FilterInvocation fi = (FilterInvocation) object;
            String url = fi.getRequestUrl();
            String httpMethod = fi.getRequest().getMethod();
            List<ConfigAttribute> attributes = new ArrayList<ConfigAttribute>();

            // Lookup your database (or other source) using this information and populate the
            // list of attributes

            return attributes;
    }

    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    public boolean supports(Class<?> clazz) {
        return FilterInvocation.class.isAssignableFrom(clazz);
    }
}

有关更多信息，请查看`DefaultFilterInvocationSecurityMetadataSource`的代码。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-ldap-authorities)如何对LDAP进行身份验证，但是从数据库加载用户角色？

`LdapAuthenticationProvider` bean（在Spring Security中处理正常的LDAP身份验证）配置了两个独立的策略接口，一个用于执行身份验证，另一个用于加载用户权限，分别称为`LdapAuthenticator`和`LdapAuthoritiesPopulator` 。`DefaultLdapAuthoritiesPopulator`从LDAP目录加载用户权限，并具有各种配置参数，以允许您指定应如何检索这些权限。

要使用JDBC，您可以使用适合您的模式的任何SQL来自己实现接口：

public class MyAuthoritiesPopulator implements LdapAuthoritiesPopulator {
    _@Autowired_
    JdbcTemplate template;

    List<GrantedAuthority> getGrantedAuthorities(DirContextOperations userData, String username) {
        List<GrantedAuthority> = template.query("select role from roles where username = ?",
                                                                                                new String[] {username},
                                                                                                new RowMapper<GrantedAuthority>() {
            **/**
             *  We're assuming here that you're using the standard convention of using the role
             *  prefix "ROLE_" to mark attributes which are supported by Spring Security's RoleVoter.
             */**
            public GrantedAuthority mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new SimpleGrantedAuthority("ROLE_" + rs.getString(1);
            }
        }
    }
}

然后，您可以将这种类型的bean添加到应用程序上下文中，并将其注入`LdapAuthenticationProvider`。有关在参考手册的LDAP章节中使用显式Spring bean配置LDAP的部分对此进行了介绍。请注意，在这种情况下，您无法使用命名空间进行配置。您还应该查阅Javadoc以获取相关的类和接口。

#### [](https://www.springcloud.cc/spring-security.html#appendix-faq-namespace-post-processor)我想修改由命名空间创建的bean的属性，但架构中没有任何内容可以支持它。

除了放弃命名空间使用，我还能做些什么？

命名空间功能是有意限制的，因此它不包括使用普通bean可以执行的所有操作。如果您想要做一些简单的事情，比如修改bean或注入不同的依赖项，可以通过在配置中添加`BeanPostProcessor`来实现。更多信息可在[Spring参考手册中找到](http://static.springsource.org/spring/docs/3.0.x/spring-framework-reference/htmlsingle/spring-framework-reference.html#beans-factory-extension-bpp)。为了做到这一点，你需要了解一下创建了哪些bean，所以你还应该阅读上面关于[命名空间如何映射到Spring bean](https://www.springcloud.cc/spring-security.html#appendix-faq-namespace-to-bean-mapping "命名空间元素如何映射到传统的bean配置？")的博客文章。

通常，您需要将`postProcessBeforeInitialization`方法`postProcessBeforeInitialization`添加到所需的功能中。假设您要自定义`UsernamePasswordAuthenticationFilter`使用的`AuthenticationDetailsSource`（由`form-login`元素创建）。您希望从请求中提取名为`CUSTOM_HEADER`的特定标头，并在对用户进行身份验证时使用它。处理器类看起来像这样：

public class BeanPostProcessor implements BeanPostProcessor {

        public Object postProcessAfterInitialization(Object bean, String name) {
                if (bean instanceof UsernamePasswordAuthenticationFilter) {
                        System.out.println("********* Post-processing " + name);
                        ((UsernamePasswordAuthenticationFilter)bean).setAuthenticationDetailsSource(
                                        new AuthenticationDetailsSource() {
                                                public Object buildDetails(Object context) {
                                                        return ((HttpServletRequest)context).getHeader("CUSTOM_HEADER");
                                                }
                                        });
                }
                return bean;
        }

        public Object postProcessBeforeInitialization(Object bean, String name) {
                return bean;
        }
}

然后，您将在应用程序上下文中注册此bean。Spring将自动在应用程序上下文中定义的bean上调用它。

  

---

[[22]](https://www.springcloud.cc/spring-security.html#d5e7286)请参阅[介绍性章节](https://www.springcloud.cc/spring-security.html#ns-web-xml "7.2.1 web.xml配置")，了解如何从`web.xml`设置映射

[[23]](https://www.springcloud.cc/spring-security.html#d5e8055)此功能实际上只是为了方便而提供，不适用于生产（选择视图技术并可用于呈现自定义登录页面）。类`DefaultLoginPageGeneratingFilter`负责呈现登录页面，并且如果需要，将提供普通表单登录和/或OpenID的登录表单。

[[24]](https://www.springcloud.cc/spring-security.html#d5e8528)这不会影响`PersistentTokenBasedRememberMeServices`的使用，其中令牌存储在服务器端。

[[25]](https://www.springcloud.cc/spring-security.html#d5e10296) `FilterInvocation`对象包含`HttpServletRequest`，因此您可以获取URL或任何其他相关信息，以决定返回属性列表的内容。

# [](https://www.springcloud.cc/spring-security.html#reactive-applications)第三部分。反应性应用

## [](https://www.springcloud.cc/spring-security.html#jc-webflux)16. WebFlux安全

Spring Security的WebFlux支持依赖于`WebFilter`，对于Spring WebFlux和Spring WebFlux.Fn也是如此。您可以找到一些演示以下代码的示例应用程序：

- 您好WebFlux [hellowebflux](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/javaconfig/hellowebflux)
- 您好WebFlux.Fn [hellowebfluxfn](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/javaconfig/hellowebfluxfn)
- 您好WebFlux方法[hellowebflux方法](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/javaconfig/hellowebflux-method)

## [](https://www.springcloud.cc/spring-security.html#minimal-webflux-security-configuration)16.1最小的WebFlux安全配置

您可以在下面找到最小的WebFlux安全配置：

_@EnableWebFluxSecurity_
public class HelloWebfluxSecurityConfig {

    _@Bean_
    public MapReactiveUserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("user")
            .roles("USER")
            .build();
        return new MapReactiveUserDetailsService(user);
    }
}

此配置提供表单和http基本身份验证，设置授权以要求经过身份验证的用户访问任何页面，设置默认登录页面和默认注销页面，设置与安全性相关的HTTP标头，CSRF保护等。

## [](https://www.springcloud.cc/spring-security.html#explicit-webflux-security-configuration)16.2显式WebFlux安全配置

您可以在下面找到最小的WebFlux安全配置的显式版本：

_@EnableWebFluxSecurity_
public class HelloWebfluxSecurityConfig {

    _@Bean_
    public MapReactiveUserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("user")
            .roles("USER")
            .build();
        return new MapReactiveUserDetailsService(user);
    }

    _@Bean_
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .authorizeExchange()
                .anyExchange().authenticated()
                .and()
            .httpBasic().and()
            .formLogin();
        return http.build();
    }
}

此配置显式设置与我们的最小配置相同的所有内容。从这里，您可以轻松地对默认值进行更改。

 Security HTTP Response Headers
This section discusses Spring Security's support for adding various security headers to the response of WebFlux.

## [](https://www.springcloud.cc/spring-security.html#default-security-headers-2)17.默认安全标头

Spring Security允许用户轻松注入默认安全标头以帮助保护其应用程序。Spring Security的默认值包括以下标头：

Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000 ; includeSubDomains
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|仅在HTTPS请求中添加严格传输安全性|

有关每个标头的其他详细信息，请参阅相应的部分：

- [缓存控制](https://www.springcloud.cc/spring-security.html#webflux-headers-cache-control "17.1缓存控制")
- [内容类型选项](https://www.springcloud.cc/spring-security.html#webflux-headers-content-type-options "17.2内容类型选项")
- [HTTP严格传输安全性](https://www.springcloud.cc/spring-security.html#webflux-headers-hsts "17.3 HTTP严格传输安全（HSTS）")
- [X-框架，选项](https://www.springcloud.cc/spring-security.html#webflux-headers-frame-options "17.4 X-Frame选项")
- [X-XSS-保护](https://www.springcloud.cc/spring-security.html#webflux-headers-xss-protection "17.5 X-XSS保护")

虽然这些标头中的每一个都被认为是最佳实践，但应注意并非所有客户端都使用标头，因此鼓励进行额外的测试。

您可以自定义特定标头。例如，假设您希望HTTP响应标头如下所示：

Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block

具体来说，您希望所有默认标头都具有以下自定义项：

- [X-Frame-Options](https://www.springcloud.cc/spring-security.html#webflux-headers-frame-options "17.4 X-Frame选项")允许来自同一域的任何请求
- [HTTP严格传输安全性（HSTS）](https://www.springcloud.cc/spring-security.html#webflux-headers-hsts "17.3 HTTP严格传输安全（HSTS）")不会添加到响应中

您可以使用以下Java配置轻松完成此操作：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .hsts().disable()
            .frameOptions().mode(Mode.SAMEORIGIN);
    return http.build();
}

如果您不希望添加默认值并希望明确控制应使用的内容，则可以禁用默认值。下面提供了基于Java和XML的配置的示例：

如有必要，您可以使用以下Java配置禁用所有HTTP安全响应标头：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .disable();
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-headers-cache-control)17.1缓存控制

过去Spring Security要求您为web应用程序提供自己的缓存控制。这在当时似乎是合理的，但浏览器缓存已经发展为包括用于安全连接的缓存。这意味着用户可以查看经过身份验证的页面，注销，然后恶意用户可以使用浏览器历史记录来查看缓存页面。为了帮助缓解这种情况，Spring Security添加了缓存控制支持，默认情况下会将以下标头插入您的响应中。

Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Pragma: no-cache
Expires: 0

如果您确实要缓存特定响应，则应用程序可以选择性地设置缓存控制标头以覆盖Spring Security设置的标头。这有助于确保正确缓存CSS，JavaScript和图像等内容。

您还可以使用以下Java配置禁用缓存控制：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .cache().disable();
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-headers-content-type-options)17.2内容类型选项

历史上，浏览器（包括Internet Explorer）会尝试使用[内容嗅探](https://en.wikipedia.org/wiki/Content_sniffing)来猜测请求的内容类型。这允许浏览器通过猜测未指定内容类型的资源上的内容类型来改善用户体验。例如，如果浏览器遇到未指定内容类型的JavaScript文件，则可以猜测内容类型然后执行它。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|==在允许上传内容时，还应该做许多其他事情（即仅在不同的域中显示文档，确保设置Content-Type标题，清理文档等）。但是，这些措施超出了Spring Security提供的范围。指出禁用内容嗅探时，必须指定内容类型以使事情正常工作，这一点也很重要。==|

内容嗅探的问题在于，这允许恶意用户使用多字符（即，作为多种内容类型有效的文件）来执行XSS攻击。例如，某些站点可能允许用户向网站提交有效的postscript文档并进行查看。恶意用户可能会创建一个[postscript文档，该文档也是一个有效的JavaScript文件，](http://webblaze.cs.berkeley.edu/papers/barth-caballero-song.pdf)并使用它执行XSS攻击。

可以通过在响应中添加以下标头来禁用内容嗅探：

X-Content-Type-Options: nosniff

与缓存控制元素一样，默认情况下会添加nosniff指令。但是，如果需要禁用标头，可以使用以下内容：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .contentTypeOptions().disable();
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-headers-hsts)17.3 HTTP严格传输安全（HSTS）

当您在银行的网站上输入内容时，是否输入mybank.example.com或输入[https://mybank.example.com](https://mybank.example.com/)？如果省略https协议，则可能容易受到[中间人攻击](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)。即使网站执行重定向到[https://mybank.example.com](https://mybank.example.com/)，恶意用户也可以拦截初始HTTP请求并操纵响应（即重定向到[https://mibank.example.com](https://mibank.example.com/)并窃取其凭据）。

许多用户省略了https协议，这就是创建[HTTP严格传输安全（HSTS）的](https://tools.ietf.org/html/rfc6797)原因。将mybank.example.com添加为[HSTS主机后](https://tools.ietf.org/html/rfc6797#section-5.1)，浏览器可以提前知道对mybank.example.com的任何请求都应解释为[https://mybank.example.com](https://mybank.example.com/)。这大大降低了中间人攻击发生的可能性。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|==根据[RFC6797](https://tools.ietf.org/html/rfc6797#section-7.2)，HSTS标头仅注入HTTPS响应。为了使浏览器确认标头，浏览器必须首先信任签署用于建立连接的SSL证书的CA（而不仅仅是SSL证书）。==|

将站点标记为HSTS主机的一种方法是将主机预加载到浏览器中。另一种方法是在响应中添加“Strict-Transport-Security”标头。例如，以下内容将指示浏览器将域视为一年的HSTS主机（一年中大约有31536000秒）：

Strict-Transport-Security: max-age=31536000 ; includeSubDomains

可选的includeSubDomains指令指示Spring Security子域（即secure.mybank.example.com）也应被视为HSTS域。

与其他标头一样，Spring Security默认添加HSTS。您可以使用Java配置自定义HSTS标头：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .hsts()
                .includeSubdomains(true)
                .maxAge(Duration.ofDays(365));
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-headers-frame-options)17.4 X-Frame选项

允许将您的网站添加到框架可能是一个安全问题。例如，使用聪明的CSS样式用户可能会被欺骗点击他们不想要的东西（[视频演示](https://www.youtube.com/watch?v=3mk0RySeNsU)）。例如，登录到其银行的用户可能会单击授予其他用户访问权限的按钮。这种攻击称为[Clickjacking](https://en.wikipedia.org/wiki/Clickjacking)。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|==处理点击劫持的另一种现代方法是使用[第17.6节“内容安全策略（CSP）”](https://www.springcloud.cc/spring-security.html#webflux-headers-csp "17.6内容安全策略（CSP）")。==|

有许多方法可以缓解点击劫持攻击。例如，为了保护旧版浏览器免受点击劫持攻击，您可以使用[破帧代码](https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet#Best-for-now_Legacy_Browser_Frame_Breaking_Script)。虽然不完美，但破帧代码是您可以为旧版浏览器做的最好的代码。

解决点击劫持的更现代的方法是使用[X-Frame-Options](https://developer.mozilla.org/en-US/docs/HTTP/X-Frame-Options)标头：

X-Frame-Options: DENY

X-Frame-Options响应头指示浏览器阻止响应中具有此标头的任何站点在帧内呈现。默认情况下，Spring Security禁用iframe中的呈现。

您可以使用以下命令使用Java配置自定义X-Frame-Options：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .frameOptions()
                .mode(SAMEORIGIN);
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-headers-xss-protection)17.5 X-XSS保护

一些浏览器内置支持过滤掉[反射的XSS攻击](https://www.owasp.org/index.php/Testing_for_Reflected_Cross_site_scripting_(OWASP-DV-001))。这绝不是万无一失的，但确实有助于XSS保护。

默认情况下，通常会启用过滤，因此添加标头通常只会确保它已启用，并指示浏览器在检测到XSS攻击时要执行的操作。例如，过滤器可能会尝试以最少侵入性的方式更改内容以仍然呈现所有内容。有时，这种类型的替换[本身](https://hackademix.net/2009/11/21/ies-xss-filter-creates-xss-vulnerabilities/)可能成为[XSS漏洞](https://hackademix.net/2009/11/21/ies-xss-filter-creates-xss-vulnerabilities/)。相反，最好阻止内容而不是尝试修复它。为此，我们可以添加以下标头：

X-XSS-Protection: 1; mode=block

默认情况下包含此标头。但是，我们可以使用以下Java配置进行自定义：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .xssProtection()
                .disable();
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-headers-csp)17.6内容安全策略（CSP）

[内容安全策略（CSP）](https://www.w3.org/TR/CSP2/)是web应用程序可以利用的机制，用于缓解内容注入漏洞，例如跨站点脚本（XSS）。CSP是一种声明性策略，为web应用程序作者提供了一种工具，用于声明并最终通知客户端（用户代理）有关web应用程序期望加载资源的源。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|==内容安全策略并非旨在解决所有内容注入漏洞。相反，可以利用CSP来帮助减少内容注入攻击造成的伤害。作为第一道防线，web应用程序作者应验证其输入并对其输出进行编码。==|

web应用程序可以通过在响应中包含以下HTTP标头之一来使用CSP：

- **_内容安全，策略_**
- **_内容安全，策略报告，只有_**

这些标头中的每一个都用作向客户端提供**_安全策略_**的机制。安全策略包含一组**_安全策略指令_**（例如，_script-src_和_object-src_），每个**_指令_**负责声明对特定资源表示的限制。

例如，web应用程序可以声明它希望通过在响应中包含以下标头来加载来自特定可信源的脚本：

Content-Security-Policy: script-src https://trustedscripts.example.com

尝试从除_script-src_指令中声明的内容之外的其他源加载脚本将被用户代理阻止。此外，如果在安全策略中声明了[**_report-uri_**](https://www.w3.org/TR/CSP2/#directive-report-uri)指令，则用户代理会将违规报告给声明的URL。

例如，如果web应用程序违反了声明的安全策略，则以下响应标头将指示用户代理将违规报告发送到策略的_report-uri_指令中指定的URL 。

Content-Security-Policy: script-src https://trustedscripts.example.com; report-uri /csp-report-endpoint/

[**_违规报告_**](https://www.w3.org/TR/CSP2/#violation-reports)是标准的JSON结构，可以由web应用程序自己的API或公共托管的CSP违规报告服务（如 [**_REPORT-URI）_**](https://report-uri.io/)捕获。

在**_内容安全，策略报告，仅_**头部为web应用程序的作者和管理员监控安全策略，而不是强制他们的能力。此标头通常在试验和/或开发站点的安全策略时使用。当策略被认为有效时，可以通过使用_Content-Security-Policy_头字段来强制执行该_策略_。

给定以下响应头，策略声明可以从两个可能的源之一加载脚本。

Content-Security-Policy-Report-Only: script-src 'self' https://trustedscripts.example.com; report-uri /csp-report-endpoint/

如果站点违反此策略，则尝试从_evil.com_加载脚本时，用户代理将向_report-uri_指令指定的声明URL发送违规报告，但仍然允许加载违规资源。

### [](https://www.springcloud.cc/spring-security.html#webflux-headers-csp-configure)17.6.1配置内容安全策略

请注意，Spring Security 默认情况下**_不会添加_**内容安全策略。web应用程序作者必须声明安全策略以强制和/或监视受保护资源。

例如，给定以下安全策略：

script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/

您可以使用Java配置启用CSP标头，如下所示：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .contentSecurityPolicy("script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/");
    return http.build();
}

要启用CSP的_“仅报告”_标头，请提供以下Java配置：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .contentSecurityPolicy("script-src 'self' https://trustedscripts.example.com; object-src https://trustedplugins.example.com; report-uri /csp-report-endpoint/")
            .reportOnly();
    return http.build();
}

### [](https://www.springcloud.cc/spring-security.html#webflux-headers-csp-links)17.6.2其他资源

将内容安全策略应用于web应用程序通常是一件非常重要的事情。以下资源可为您的站点制定有效的安全策略提供进一步的帮助。

[内容安全策略简介](https://www.html5rocks.com/en/tutorials/security/content-security-policy/)

[CSP指南 - Mozilla开发人员网络](https://developer.mozilla.org/en-US/docs/Web/Security/CSP)

[W3C候选人推荐](https://www.w3.org/TR/CSP2/)

## [](https://www.springcloud.cc/spring-security.html#webflux-headers-referrer)17.7推荐人政策

[引用者策略](https://www.w3.org/TR/referrer-policy)是web应用程序可以利用来管理引用者字段的机制，该字段包含用户所在的最后一页。

Spring Security的方法是使用[Referrer Policy](https://www.w3.org/TR/referrer-policy/)标头，它提供不同的[策略](https://www.w3.org/TR/referrer-policy/#referrer-policies)：

Referrer-Policy: same-origin

Referrer-Policy响应标头指示浏览器让目标知道用户之前的源。

### [](https://www.springcloud.cc/spring-security.html#webflux-headers-referrer-configure)17.7.1配置引用者策略

Spring Security 默认情况下**_不会添加_** Referrer Policy标头。

您可以使用Java配置启用Referrer-Policy标头，如下所示：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .referrerPolicy(ReferrerPolicy.SAME_ORIGIN);
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-headers-feature)17.8功能政策

[功能策略](https://wicg.github.io/feature-policy/)是一种允许web开发人员有选择地启用，禁用和修改浏览器中某些API和web功能的行为的机制。

Feature-Policy: geolocation 'self'

借助功能策略，开发人员可以选择加入一组“策略”，以便浏览器强制执行您网站中使用的特定功能。这些策略限制站点可以访问的API或修改浏览器对某些功能的默认行为。

### [](https://www.springcloud.cc/spring-security.html#webflux-headers-feature-configure)17.8.1配置功能策略

Spring Security 默认情况下**_不添加_**功能策略标头。

您可以使用Java配置启用Feature-Policy标头，如下所示：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .headers()
            .featurePolicy("geolocation 'self'");
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-redirect-https)18.重定向到HTTPS

需要HTTPS才能提供安全的应用程序。Spring Security可以配置为使用以下Java配置执行重定向到https：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .redirectToHttps();
    return http.build();
}

配置可以很容易地包含在if语句中，只能在生产中打开。或者，可以通过查找仅在生产中发生的请求的属性来启用它。例如，如果生产环境添加名为`X-Forwarded-Proto`的标头，则可以使用以下Java配置：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .redirectToHttps()
            .httpsRedirectWhen(e -> e.getRequest().getHeaders().containsKey("X-Forwarded-Proto"));
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-oauth2)19. OAuth2 WebFlux

Spring Security为响应式应用程序提供OAuth2和WebFlux集成。

## [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login)19.1 OAuth 2.0登录

OAuth 2.0登录功能为应用程序提供了使用OAuth 2.0提供程序（例如GitHub）或OpenID Connect 1.0提供程序（例如Google）上的现有帐户登录应用程序的功能。OAuth 2.0 Login实现了用例：“使用Google登录”或“使用GitHub登录”。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|OAuth 2.0登录是使用**授权代码授予实现的**，如[OAuth 2.0授权框架](https://tools.ietf.org/html/rfc6749#section-4.1)和[OpenID Connect Core 1.0中所指定](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth)。|

### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample)19.1.1 Spring Boot 2.0样本

Spring Boot 2.0为OAuth 2.0登录带来了完整的自动配置功能。

本节介绍如何使用_Google_作为_身份验证提供程序_配置[**OAuth 2.0 Login WebFlux示例，**](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2login-webflux)并介绍以下主题：

- [初始设置](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-setup "初始设置")
- [设置重定向URI](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-redirect "设置重定向URI")
- [配置`application.yml`](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-config "配置application.yml")
- [启动应用程序](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-start "启动应用程序")

#### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-setup)初始设置

要使用Google的OAuth 2.0身份验证系统进行登录，您必须在Google API控制台中设置项目以获取OAuth 2.0凭据。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|[Google的OAuth 2.0](https://developers.google.com/identity/protocols/OpenIDConnect)身份验证[实施](https://developers.google.com/identity/protocols/OpenIDConnect)符合[OpenID Connect 1.0](https://openid.net/connect/)规范，并通过[OpenID认证](https://openid.net/certification/)。|

按照[OpenID Connect](https://developers.google.com/identity/protocols/OpenIDConnect)页面上的说明操作，从“设置OAuth 2.0”部分开始。

完成“获取OAuth 2.0凭据”说明后，您应该拥有一个新的OAuth客户端，其中包含客户端ID和客户端密钥的凭据。

#### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-redirect)设置重定向URI

重定向URI是应用程序中的路径，最终用户的用户代理在使用Google进行身份验证并在“同意”页面上授予了对OAuth客户端_（[在上一步中创建](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-setup "初始设置")）的_访问权限后重定向回的路径。

在“设置重定向URI”子部分中，确保将“ **授权重定向URI”**字段设置为`[http://localhost:8080/login/oauth2/code/google](http://localhost:8080/login/oauth2/code/google)`。

|   |
|---|
|![[小费]](https://www.springcloud.cc/images/tip.png)|
|默认重定向URI模板为`{baseUrl}/login/oauth2/code/{registrationId}`。该**_registrationId_**是用于唯一标识符[ClientRegistration](https://www.springcloud.cc/spring-security.html#)。对于我们的示例，`registrationId`是`google`。|

#### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-config)配置`application.yml`

现在您已经有了一个新的OAuth客户端与Google，您需要配置应用程序以使用OAuth客户端进行_身份验证流程_。为此：

1. 转到`application.yml`并设置以下配置：
    
    spring:
      security:
        oauth2:
          client:
            registration:   [](https://www.springcloud.cc/spring-security.html#CO18-1)![1](https://www.springcloud.cc/images/1.png)
              google:   [](https://www.springcloud.cc/spring-security.html#CO18-2)![2](https://www.springcloud.cc/images/2.png)
                client-id: google-client-id
                client-secret: google-client-secret
    
    [](https://www.springcloud.cc/spring-security.html#d5e10638)
    
    **例19.1。OAuth客户端属性**
    
    |   |   |
    |---|---|
    |[![1](https://www.springcloud.cc/images/1.png)](https://www.springcloud.cc/spring-security.html#CO18-1)|`spring.security.oauth2.client.registration`是OAuth客户端属性的基本属性前缀。|
    |[![2](https://www.springcloud.cc/images/2.png)](https://www.springcloud.cc/spring-security.html#CO18-2)|基本属性前缀后面是[ClientRegistration](https://www.springcloud.cc/spring-security.html#)的ID ，例如google。|
    
      
    
2. 使用您之前创建的OAuth 2.0凭据替换`client-id`和`client-secret`属性中的值。

#### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-sample-start)启动应用程序

启动Spring Boot 2.0示例并转到`[http://localhost:8080](http://localhost:8080/)`。然后，您将被重定向到默认的_自动生成的_登录页面，该页面显示Google的链接。

点击Google链接，然后您将重定向到Google进行身份验证。

使用您的Google帐户凭据进行身份验证后，显示给您的下一页是“同意”屏幕。“同意”屏幕会要求您允许或拒绝访问您之前创建的OAuth客户端。单击“ **允许”**以授权OAuth客户端访问您的电子邮件地址和基本配置文件信息。

此时，OAuth客户端从[UserInfo端点](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)检索您的电子邮件地址和基本配置文件信息，并建立经过身份验证的会话。

### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-openid-provider-configuration)19.1.2使用OpenID Provider配置

对于众所周知的提供商，Spring Security为OAuth授权提供商的配置提供了必要的默认值。如果您正在使用支持[OpenID提供程序配置的](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig)自己的授权提供[程序](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig)，则可以使用[OpenID提供程序配置响应](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationResponse)，issuer-uri可用于配置应用程序。

spring:
  security:
    oauth2:
      client:
        provider:
          keycloak:
            issuer-uri: https://idp.example.com/auth/realms/demo
        registration:
          keycloak:
            client-id: spring-security
            client-secret: 6cea952f-10d0-4d00-ac79-cc865820dc2c

`issuer-uri`指示Spring Security利用`[https://idp.example.com/auth/realms/demo/.well-known/openid-configuration](https://idp.example.com/auth/realms/demo/.well-known/openid-configuration)`处的端点来发现配置。`client-id`和`client-secret`链接到提供者，因为`keycloak`用于提供者和注册。

### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login-explicit)19.1.3显式OAuth2登录配置

最小的OAuth2登录配置如下所示：

_@Bean_
ReactiveClientRegistrationRepository clientRegistrations() {
    ClientRegistration clientRegistration = ClientRegistrations
            .fromOidcIssuerLocation("https://idp.example.com/auth/realms/demo")
            .clientId("spring-security")
            .clientSecret("6cea952f-10d0-4d00-ac79-cc865820dc2c")
            .build();
    return new InMemoryReactiveClientRegistrationRepository(clientRegistration);
}

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .oauth2Login();
    return http.build();
}

其他配置选项如下所示：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        // ...
        .oauth2Login()
            .authenticationConverter(converter)
            .authenticationManager(manager)
            .authorizedClientRepository(authorizedClients)
            .clientRegistrationRepository(clientRegistrations);
    return http.build();
}

## [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-client)19.2 OAuth2客户端

Spring Security的OAuth支持允许在不进行身份验证的情况下获取访问令牌。Spring Boot的基本配置如下：

spring:
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: replace-with-client-id
            client-secret: replace-with-client-secret
            scopes: read:user,public_repo

您需要将`client-id`和`client-secret`替换为使用GitHub注册的值。

下一步是指示Spring Security您希望充当OAuth2客户端，以便您可以获取访问令牌。

_@Bean_
SecurityWebFilterChain configure(ServerHttpSecurity http) throws Exception {
    http
        // ...
        .oauth2Client();
    return http.build();
}

您现在可以利用Spring Security的[第21章，_WebClient_](https://www.springcloud.cc/spring-security.html#webclient "21. WebClient")或[@ RegisteredOAuth2AuthorizedClient](https://www.springcloud.cc/spring-security.html#webflux-roac "20. @ RegisteredOAuth2AuthorizedClient")支持来获取和使用访问令牌。

## [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server)19.3 OAuth2资源服务器

Spring Security支持使用[JWT](https://tools.ietf.org/html/rfc7519)编码的OAuth 2.0 [承载令牌](https://tools.ietf.org/html/rfc6750.html)保护端点。

在应用程序将其权限管理联合到[授权服务器](https://tools.ietf.org/html/rfc6749)（例如，Okta或Ping Identity）的情况下，这很方便。资源服务器可以查询此授权服务器，以在提供请求时验证权限。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|可以在[**OAuth 2.0 Resource Server WebFlux示例中**](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2resourceserver-webflux)找到完整的工作[**示例**](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2resourceserver-webflux)。|

### [](https://www.springcloud.cc/spring-security.html#dependencies-2)19.3.1依赖性

大多数资源服务器支持都收集到`spring-security-oauth2-resource-server`。但是，对解码和验证JWT的支持是`spring-security-oauth2-jose`，这意味着为了拥有支持JWT编码的承载令牌的工作资源服务器，两者都是必需的。

### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-minimal-configuration)19.3.2最小配置

使用[Spring Boot时](https://spring.io/projects/spring-boot)，将应用程序配置为资源服务器包含两个基本步骤。首先，包括所需的依赖项，然后指出授权服务器的位置。

#### [](https://www.springcloud.cc/spring-security.html#specify-the-authorization-server)指定授权服务器

在Spring Boot应用程序中，要指定要使用的授权服务器，只需执行以下操作：

spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://idp.example.com

其中`[https://idp.example.com](https://idp.example.com/)`是授权服务器将发出的`iss` JWT令牌声明中包含的值。资源服务器将使用此属性进一步自我配置，发现授权服务器的公钥，并随后验证传入的JWT。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|要使用`issuer-uri`属性，`[https://idp.example.com/.well-known/openid-configuration](https://idp.example.com/.well-known/openid-configuration)`必须是授权服务器支持的端点。此端点称为[提供者配置](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig)端点。|

就是这样！

#### [](https://www.springcloud.cc/spring-security.html#startup-expectations-2)启动期望

使用此属性和这些依赖项时，Resource Server将自动配置自身以验证JWT编码的承载令牌。

它通过确定性的启动过程实现了这一点：

1. 点击Provider Configuration端点`[https://the.issuer.location/.well-known/openid-configuration](https://the.issuer.location/.well-known/openid-configuration)`，处理`jwks_url`属性的响应
2. 配置验证策略以查询`jwks_url`以获取有效的公钥
3. 配置验证策略以针对`[https://idp.example.com](https://idp.example.com/)`验证每个JWT `iss`声明。

此过程的结果是授权服务器必须启动并接收请求才能使Resource Server成功启动。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|如果授权服务器在资源服务器查询时关闭（给定适当的超时），则启动将失败。|

#### [](https://www.springcloud.cc/spring-security.html#runtime-expectations-2)运行期望

启动应用程序后，Resource Server将尝试处理包含`Authorization: Bearer`标头的任何请求：

GET / HTTP/1.1
Authorization: Bearer some-token-value # Resource Server will process this

只要指示此方案，资源服务器将尝试根据承载令牌规范处理请求。

给定格式良好的JWT令牌，资源服务器将：

1. 根据在启动期间从`jwks_url`端点获取的公钥验证其签名，并与JWTs头匹配
2. 验证JWT `exp`和`nbf`时间戳以及JWT `iss`声明，以及
3. 将每个范围映射到前缀为`SCOPE_`的权限。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|当授权服务器提供新密钥时，Spring Security将自动旋转用于验证JWT令牌的密钥。|

默认情况下，生成的`Authentication#getPrincipal`是Spring Security `Jwt`对象，`Authentication#getName`映射到JWT的`sub`属性（如果存在）。

[如何配置而不将Resource Server启动与授权服务器的可用性绑定](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-jwkseturi "指定授权服务器JWK直接设置Uri")

[如何配置Spring Boot](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-sans-boot "覆盖或替换引导自动配置")

#### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-jwkseturi)指定授权服务器JWK直接设置Uri

如果授权服务器不支持提供程序配置端点，或者资源服务器必须能够独立于授权服务器启动，则可以将`issuer-uri`交换为`jwk-set-uri`：

security:
  oauth2:
    resourceserver:
      jwt:
        jwk-set-uri: https://idp.example.com/.well-known/jwks.json

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|JWK Set uri不是标准化的，但通常可以在授权服务器的文档中找到|

因此，资源服务器不会在启动时ping授权服务器。但是，它也将不再验证JWT中的`iss`声明（因为资源服务器不再知道发行者值应该是什么）。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|此属性也可以直接在[DSL](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-jwkseturi-dsl "使用jwkSetUri（）")上提供。|

#### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-sans-boot)覆盖或替换引导自动配置

Spring Boot代表资源服务器生成两个`@Bean`。

第一个是`SecurityWebFilterChain`，它将应用程序配置为资源服务器：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        .authorizeExchange()
            .anyExchange().authenticated()
            .and()
        .oauth2ResourceServer()
            .jwt();
    return http.build();
}

如果应用程序没有公开`SecurityWebFilterChain` bean，那么Spring Boot将公开上面的默认值。

替换它就像在应用程序中公开bean一样简单：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        .authorizeExchange()
            .pathMatchers("/message/**").hasAuthority("SCOPE_message:read")
            .anyExchange().authenticated()
            .and()
        .oauth2ResourceServer()
            .jwt();
    return http.build();
}

对于以`/messages/`开头的任何网址，上述内容要求`message:read`的范围。

`oauth2ResourceServer` DSL上的方法也将覆盖或替换自动配置。

例如，第二个`@Bean` Spring Boot创建的是`ReactiveJwtDecoder`，它将`String`令牌解码为`Jwt`的经过验证的实例：

_@Bean_
public ReactiveJwtDecoder jwtDecoder() {
    return ReactiveJwtDecoders.fromOidcIssuerLocation(issuerUri);
}

如果应用程序没有公开`ReactiveJwtDecoder` bean，那么Spring Boot将公开上面的默认值。

并且可以使用`jwkSetUri()`覆盖其配置或使用`decoder()`替换。

##### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-jwkseturi-dsl)使用`jwkSetUri()`

授权服务器的JWK Set Uri可以配置[为配置属性](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-jwkseturi "指定授权服务器JWK直接设置Uri")，也可以在DSL中提供：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        .authorizeExchange()
            .anyExchange().authenticated()
            .and()
        .oauth2ResourceServer()
            .jwt()
                .jwkSetUri("https://idp.example.com/.well-known/jwks.json");
    return http.build();
}

使用`jwkSetUri()`优先于任何配置属性。

##### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-decoder-dsl)使用`decoder()`

比`jwkSetUri()`更强大的是`decoder()`，这将完全取代`JwtDecoder`的任何Boot自动配置：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        .authorizeExchange()
            .anyExchange().authenticated()
            .and()
        .oauth2ResourceServer()
            .jwt()
                .decoder(myCustomDecoder());
    return http.build();
}

当需要进行更深层次的配置（如[验证）时](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-validation "配置验证")，这很方便。

##### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-decoder-bean)公开`ReactiveJwtDecoder` `@Bean`

或者，暴露`ReactiveJwtDecoder` `@Bean`与`decoder()`具有相同的效果：

_@Bean_
public JwtDecoder jwtDecoder() {
    return new NimbusReactiveJwtDecoder(jwkSetUri);
}

#### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-authorization)配置授权

从OAuth 2.0授权服务器发出的JWT通常具有`scope`或`scp`属性，表示已授予其范围（或权限），例如：

`{ …​, "scope" : "messages contacts"}`

在这种情况下，资源服务器将尝试将这些范围强制转换为已授权的权限列表，并在每个范围前添加字符串“SCOPE_”。

这意味着要使用从JWT派生的作用域保护端点或方法，相应的表达式应包含此前缀：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        .authorizeExchange()
            .mvcMatchers("/contacts/**").hasAuthority("SCOPE_contacts")
            .mvcMatchers("/messages/**").hasAuthority("SCOPE_messages")
            .anyExchange().authenticated()
            .and()
        .oauth2ResourceServer()
            .jwt();
    return http.build();
}

或者类似于方法安全性：

_@PreAuthorize("hasAuthority('SCOPE_messages')")_
public List<Message> getMessages(...) {}

##### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-authorization-extraction)手动提取权限

但是，在许多情况下，此默认值不足。例如，某些授权服务器不使用`scope`属性，而是拥有自己的自定义属性。或者，在其他时候，资源服务器可能需要使属性或属性的组合适应内部化的权限。

为此，DSL暴露`jwtAuthenticationConverter()`：

_@Bean_
SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
        .authorizeExchange()
            .anyExchange().authenticated()
            .and()
        .oauth2ResourceServer()
            .jwt()
                .jwtAuthenticationConverter(grantedAuthoritiesExtractor());
    return http.build();
}

Converter<Jwt, Mono<AbstractAuthenticationToken>> grantedAuthoritiesExtractor() {
    GrantedAuthoritiesExtractor extractor = new GrantedAuthoritiesExtractor();
    return new ReactiveJwtAuthenticationConverterAdapter(extractor);
}

它负责将`Jwt`转换为`Authentication`。

我们可以简单地重写这一点，以改变授予权限的方式：

static class GrantedAuthoritiesExtractor extends JwtAuthenticationConverter {
    protected Collection<GrantedAuthorities> extractAuthorities(Jwt jwt) {
        Collection<String> authorities = (Collection<String>)
                jwt.getClaims().get("mycustomclaim");

        return authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}

为了获得更大的灵活性，DSL支持完全用任何实现`Converter<Jwt, Mono<AbstractAuthenticationToken>>`的类替换转换器：

static class CustomAuthenticationConverter implements Converter<Jwt, Mono<AbstractAuthenticationToken>> {
    public AbstractAuthenticationToken convert(Jwt jwt) {
        return Mono.just(jwt).map(this::doConversion);
    }
}

#### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-validation)配置验证

使用最小Spring Boot配置，指示授权服务器的颁发者uri，资源服务器将默认验证`iss`声明以及`exp`和`nbf`时间戳声明。[最小Spring Boot配置](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-minimal-configuration "19.3.2最小配置")，指示授权服务器的颁发者uri，资源服务器将默认验证`iss`声明以及{3​​104 /}和`nbf`时间戳声明。

在需要自定义验证的情况下，Resource Server附带两个标准验证器，并且还接受自定义`OAuth2TokenValidator`实例。

##### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-validation-clockskew)自定义时间戳验证

JWT通常有一个有效窗口，`nbf`声明中指示的窗口的开头和`exp`声明中指示的结尾。

但是，每个服务器都可能遇到时钟漂移，这可能导致令牌过期到一个服务器，但不会到另一个服务器。随着协作服务器数量在分布式系统中的增加，这可能会导致一些实施灼伤。

资源服务器使用`JwtTimestampValidator`验证令牌的有效性窗口，并且可以使用`clockSkew`配置它以缓解上述问题：

_@Bean_
ReactiveJwtDecoder jwtDecoder() {
     NimbusReactiveJwtDecoder jwtDecoder = (NimbusReactiveJwtDecoder)
             ReactiveJwtDecoders.withOidcIssuerLocation(issuerUri);

     OAuth2TokenValidator<Jwt> withClockSkew = new DelegatingOAuth2TokenValidator<>(
            new JwtTimestampValidator(Duration.ofSeconds(60)),
            new IssuerValidator(issuerUri));

     jwtDecoder.setJwtValidator(withClockSkew);

     return jwtDecoder;
}

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|默认情况下，资源服务器配置30秒的时钟偏差。|

##### [](https://www.springcloud.cc/spring-security.html#webflux-oauth2-resource-server-validation-custom)配置自定义验证程序

使用`OAuth2TokenValidator` API添加对`aud`声明的检查很简单：

public class AudienceValidator implements OAuth2TokenValidator<Jwt> {
    OAuth2Error error = new OAuth2Error("invalid_token", "The required audience is missing", null);

    public OAuth2TokenValidatorResult validate(Jwt jwt) {
        if (jwt.getAudience().contains("messaging")) {
            return OAuth2TokenValidatorResult.success();
        } else {
            return OAuth2TokenValidatorResult.failure(error);
        }
    }
}

然后，要添加到资源服务器，需要指定`ReactiveJwtDecoder`实例：

_@Bean_
ReactiveJwtDecoder jwtDecoder() {
    NimbusReactiveJwtDecoder jwtDecoder = (NimbusReactiveJwtDecoder)
            ReactiveJwtDecoders.withOidcIssuerLocation(issuerUri);

    OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator();
    OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuerUri);
    OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

    jwtDecoder.setJwtValidator(withAudience);

    return jwtDecoder;
}

## [](https://www.springcloud.cc/spring-security.html#webflux-roac)20. @ RegisteredOAuth2AuthorizedClient

Spring Security允许使用`@RegisteredOAuth2AuthorizedClient`解析访问令牌。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|可以在[**OAuth 2.0 WebClient WebFlux示例中**](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2webclient-webflux)找到一个工作[**示例**](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/boot/oauth2webclient-webflux)。|

为[OAuth2登录](https://www.springcloud.cc/spring-security.html#webflux-oauth2-login "19.1 OAuth 2.0登录")配置Spring Security 或作为[OAuth2客户端后](https://www.springcloud.cc/spring-security.html#webflux-oauth2-client "19.2 OAuth2客户端")，可以使用以下方法解析`OAuth2AuthorizedClient`：

_@GetMapping("/explicit")_
Mono<String> explicit(_@RegisteredOAuth2AuthorizedClient("client-id")_ OAuth2AuthorizedClient authorizedClient) {
    // ...
}

这集成到Spring Security以提供以下功能：

- Spring Security将自动刷新过期的令牌（如果存在刷新令牌）
- 如果请求访问令牌但不存在，Spring Security将自动请求访问令牌。
    
    - 对于`authorization_code`，这涉及执行重定向，然后重播原始请求
    - 对于`client_credentials`，只需请求并保存令牌
    

如果用户使用`oauth2Login()`进行身份验证，则`client-id`是可选的。例如，以下方法可行：

_@GetMapping("/implicit")_
Mono<String> implicit(_@RegisteredOAuth2AuthorizedClient_ OAuth2AuthorizedClient authorizedClient) {
    // ...
}

如果用户始终使用OAuth2登录进行身份验证并且需要来自同一授权服务器的访问令牌，这将非常方便。

## [](https://www.springcloud.cc/spring-security.html#webclient)21. WebClient

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|以下文档适用于Reactive环境。对于Servlet环境，请参阅[WebClient for Servlet](https://www.springcloud.cc/spring-security.html#servlet-webclient "13.用于Servlet环境的WebClient")环境。|

Spring Framework已经内置支持设置Bearer令牌。

webClient.get()
    .headers(h -> h.setBearerAuth(token))
    ...

Spring Security建立在这种支持的基础上，以提供额外的好处：

- Spring Security将自动刷新过期的令牌（如果存在刷新令牌）
- 如果请求访问令牌但不存在，Spring Security将自动请求访问令牌。
    
    - 对于authorization_code，这涉及执行重定向，然后重放原始请求
    - 对于client_credentials，只需请求并保存令牌
    
- 支持透明地包含当前OAuth令牌或明确选择应使用哪个令牌的能力。

## [](https://www.springcloud.cc/spring-security.html#webclient-setup)21.1 WebClient OAuth2设置

第一步是确保正确设置`WebClient`。在完全反应环境中设置`WebClient`的示例如下：

_@Bean_
WebClient webClient(ReactiveClientRegistrationRepository clientRegistrations,
        ServerOAuth2AuthorizedClientRepository authorizedClients) {
    ServerOAuth2AuthorizedClientExchangeFilterFunction oauth =
            new ServerOAuth2AuthorizedClientExchangeFilterFunction(clientRegistrations, authorizedClients);
    // (optional) explicitly opt into using the oauth2Login to provide an access token implicitly
    // oauth.setDefaultOAuth2AuthorizedClient(true);
    // (optional) set a default ClientRegistration.registrationId
    // oauth.setDefaultClientRegistrationId("client-registration-id");
    return WebClient.builder()
            .filter(oauth)
            .build();
}

## [](https://www.springcloud.cc/spring-security.html#webclient-implicit)21.2隐式OAuth2AuthorizedClient

如果我们在设置中将`defaultOAuth2AuthorizedClient`设置为`true`并且使用oauth2Login（即OIDC）对用户进行身份验证，则使用当前身份验证自动提供访问令牌。或者，如果我们将`defaultClientRegistrationId设置为有效的`ClientRegistration` id，则该注册用于提供访问令牌。这很方便，但在并非所有端点都应获取访问令牌的环境中，这很危险（您可能会向端点提供错误的访问令牌）。

Mono<String> body = this.webClient
        .get()
        .uri(this.uri)
        .retrieve()
        .bodyToMono(String.class);

## [](https://www.springcloud.cc/spring-security.html#webclient-explicit)21.3显式OAuth2AuthorizedClient

可以通过在请求属性上设置`OAuth2AuthorizedClient`来明确提供。在下面的示例中，我们使用Spring WebFlux或Spring MVC参数解析器支持来解析`OAuth2AuthorizedClient`。但是，如何解决`OAuth2AuthorizedClient`并不重要。

_@GetMapping("/explicit")_
Mono<String> explicit(_@RegisteredOAuth2AuthorizedClient("client-id")_ OAuth2AuthorizedClient authorizedClient) {
    return this.webClient
            .get()
            .uri(this.uri)
            .attributes(oauth2AuthorizedClient(authorizedClient))
            .retrieve()
            .bodyToMono(String.class);
}

## [](https://www.springcloud.cc/spring-security.html#webclient-clientregistrationid)21.4 clientRegistrationId

或者，可以在请求属性上指定`clientRegistrationId`，`WebClient`将尝试查找`OAuth2AuthorizedClient`。如果未找到，将自动获取一个。

Mono<String> body = this.webClient
        .get()
        .uri(this.uri)
        .attributes(clientRegistrationId("client-id"))
        .retrieve()
        .bodyToMono(String.class);

## [](https://www.springcloud.cc/spring-security.html#jc-erms)22. EnableReactiveMethodSecurity

Spring Security使用[Reactor](https://projectreactor.io/docs/core/release/reference/#context)使用`ReactiveSecurityContextHolder`设置[的Context](https://projectreactor.io/docs/core/release/reference/#context)支持方法安全性。例如，这演示了如何检索当前登录用户的消息。

|   |
|---|
|![[注意]](https://www.springcloud.cc/images/note.png)|
|为此，方法的返回类型必须是`org.reactivestreams.Publisher`（即`Mono` / `Flux`）。这是与Reactor `Context`整合的必要条件。|

Authentication authentication = new TestingAuthenticationToken("user", "password", "ROLE_USER");

Mono<String> messageByUsername = ReactiveSecurityContextHolder.getContext()
    .map(SecurityContext::getAuthentication)
    .map(Authentication::getName)
    .flatMap(this::findMessageByUsername)
    // In a WebFlux application the `subscriberContext` is automatically setup using `ReactorContextWebFilter`
    .subscriberContext(ReactiveSecurityContextHolder.withAuthentication(authentication));

StepVerifier.create(messageByUsername)
    .expectNext("Hi user")
    .verifyComplete();

`this::findMessageByUsername`定义为：

Mono<String> findMessageByUsername(String username) {
    return Mono.just("Hi " + username);
}

以下是在响应式应用程序中使用方法安全性时的最小方法安全配置。

_@EnableReactiveMethodSecurity_
public class SecurityConfig {
    _@Bean_
    public MapReactiveUserDetailsService userDetailsService() {
        User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();
        UserDetails rob = userBuilder.username("rob")
            .password("rob")
            .roles("USER")
            .build();
        UserDetails admin = userBuilder.username("admin")
            .password("admin")
            .roles("USER","ADMIN")
            .build();
        return new MapReactiveUserDetailsService(rob, admin);
    }
}

考虑以下课程：

_@Component_
public class HelloWorldMessageService {
    _@PreAuthorize("hasRole('ADMIN')")_
    public Mono<String> findMessage() {
        return Mono.just("Hello World!");
    }
}

结合上面的配置，`@PreAuthorize("hasRole('ADMIN')")`将确保`findByMessage`仅由角色为`ADMIN`的用户调用。值得注意的是，标准方法安全性中的任何表达式都适用于`@EnableReactiveMethodSecurity`。但是，此时我们只支持表达式的`Boolean`或`boolean`的返回类型。这意味着表达式不得阻止。

当与[第16章_WebFlux安全性_](https://www.springcloud.cc/spring-security.html#jc-webflux "16. WebFlux安全")集成时，Reactor上下文由Spring Security根据经过身份验证的用户自动建立。

_@EnableWebFluxSecurity_
_@EnableReactiveMethodSecurity_
public class SecurityConfig {

    _@Bean_
    SecurityWebFilterChain springWebFilterChain(ServerHttpSecurity http) throws Exception {
        return http
            // Demonstrate that method security works
            // Best practice to use both for defense in depth
            .authorizeExchange()
                .anyExchange().permitAll()
                .and()
            .httpBasic().and()
            .build();
    }

    _@Bean_
    MapReactiveUserDetailsService userDetailsService() {
        User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();
        UserDetails rob = userBuilder.username("rob")
            .password("rob")
            .roles("USER")
            .build();
        UserDetails admin = userBuilder.username("admin")
            .password("admin")
            .roles("USER","ADMIN")
            .build();
        return new MapReactiveUserDetailsService(rob, admin);
    }
}

您可以在[hellowebflux方法中](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/javaconfig/hellowebflux-method)找到完整的示例[](https://github.com/spring-projects/spring-security/tree/5.1.2.RELEASE/samples/javaconfig/hellowebflux-method)

## [](https://www.springcloud.cc/spring-security.html#test-webflux)23.反应性测试支持

## [](https://www.springcloud.cc/spring-security.html#test-erms)23.1测试反应方法安全性

例如，我们可以使用我们在[第9.1节“测试方法安全性”中](https://www.springcloud.cc/spring-security.html#test-method "9.1 Testing Method Security")所做的相同设置和注释来测试[第22章_EnableReactiveMethodSecurity_](https://www.springcloud.cc/spring-security.html#jc-erms "22. EnableReactiveMethodSecurity")中的示例。以下是我们可以做的最小样本：[](https://www.springcloud.cc/spring-security.html#test-method "9.1测试方法安全性")

_@RunWith(SpringRunner.class)_
_@ContextConfiguration(classes = HelloWebfluxMethodApplication.class)_
public class HelloWorldMessageServiceTests {
    _@Autowired_
    HelloWorldMessageService messages;

    _@Test_
    public void messagesWhenNotAuthenticatedThenDenied() {
        StepVerifier.create(this.messages.findMessage())
            .expectError(AccessDeniedException.class)
            .verify();
    }

    _@Test_
    _@WithMockUser_
    public void messagesWhenUserThenDenied() {
        StepVerifier.create(this.messages.findMessage())
            .expectError(AccessDeniedException.class)
            .verify();
    }

    _@Test_
    _@WithMockUser(roles = "ADMIN")_
    public void messagesWhenAdminThenOk() {
        StepVerifier.create(this.messages.findMessage())
            .expectNext("Hello World!")
            .verifyComplete();
    }
}

## [](https://www.springcloud.cc/spring-security.html#test-webtestclient)23.2 WebTestClientSupport

Spring Security提供与`WebTestClient`的整合。基本设置如下所示：

_@RunWith(SpringRunner.class)_
_@ContextConfiguration(classes = HelloWebfluxMethodApplication.class)_
public class HelloWebfluxMethodApplicationTests {
    _@Autowired_
    ApplicationContext context;

    WebTestClient rest;

    _@Before_
    public void setup() {
        this.rest = WebTestClient
            .bindToApplicationContext(this.context)
            // add Spring Security test Support
            .apply(springSecurity())
            .configureClient()
            .filter(basicAuthentication())
            .build();
    }
    // ...
}

### [](https://www.springcloud.cc/spring-security.html#authentication)23.2.1认证

将Spring Security支持应用于`WebTestClient`后，我们可以使用注释或`mutateWith`支持。例如：

_@Test_
public void messageWhenNotAuthenticated() throws Exception {
    this.rest
        .get()
        .uri("/message")
        .exchange()
        .expectStatus().isUnauthorized();
}

// --- WithMockUser ---

_@Test_
_@WithMockUser_
public void messageWhenWithMockUserThenForbidden() throws Exception {
    this.rest
        .get()
        .uri("/message")
        .exchange()
        .expectStatus().isEqualTo(HttpStatus.FORBIDDEN);
}

_@Test_
_@WithMockUser(roles = "ADMIN")_
public void messageWhenWithMockAdminThenOk() throws Exception {
    this.rest
        .get()
        .uri("/message")
        .exchange()
        .expectStatus().isOk()
        .expectBody(String.class).isEqualTo("Hello World!");
}

// --- mutateWith mockUser ---

_@Test_
public void messageWhenMutateWithMockUserThenForbidden() throws Exception {
    this.rest
        .mutateWith(mockUser())
        .get()
        .uri("/message")
        .exchange()
        .expectStatus().isEqualTo(HttpStatus.FORBIDDEN);
}

_@Test_
public void messageWhenMutateWithMockAdminThenOk() throws Exception {
    this.rest
        .mutateWith(mockUser().roles("ADMIN"))
        .get()
        .uri("/message")
        .exchange()
        .expectStatus().isOk()
        .expectBody(String.class).isEqualTo("Hello World!");
}

### [](https://www.springcloud.cc/spring-security.html#csrf-support)23.2.2 CSRF支持

Spring Security还通过`WebTestClient`为CSRF测试提供支持。例如：

this.rest
    // provide a valid CSRF token
    .mutateWith(csrf())
    .post()
    .uri("/login")
    ...