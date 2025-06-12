# @RequiredArgsConstructor(代替@Autowried)
`@RequiredArgsConstructor` 是 Lombok 库中的一个注解，它为类自动生成一个构造器。这个构造器只包括那些被标记为 `final` 的字段，以及那些标有 `@NonNull` 且没有被初始化的字段。这样的构造器通常被用于依赖注入或者确保类的某些属性在使用前已被正确初始化。

### 主要特点和用法

1. **自动生成构造器**：
    
    - `@RequiredArgsConstructor` 自动生成的构造器只包括那些必要的字段（即 `final` 字段和标记为 `@NonNull` 的未初始化字段）。这可以避免手动编写构造器的繁琐，减少代码冗余。
2. **与 `@NonNull` 注解结合使用**：
    
    - 当一个字段被 `@NonNull` 注解修饰时，Lombok 会在生成的构造器中包括这个字段，并在构造器中添加检查该字段是否为 `null` 的语句。如果字段为 `null`，则会抛出 `NullPointerException`。
3. **简化依赖注入**：
    
    - 在使用 Spring 等依赖注入框架时，`@RequiredArgsConstructor` 非常有用，它能自动插入必要的依赖，简化了配置。
### 示例代码
假设有一个简单的服务类，它依赖于其他几个组件。下面是如何使用 `@RequiredArgsConstructor` 来自动创建这个类所需的构造器：
```java
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    @NonNull
    private final Logger logger;  // 这个字段将包含在构造器中，因为它使用了 @NonNull

    // Lombok 会生成下面的构造器
    // public UserService(UserRepository userRepository, EmailService emailService, Logger logger) {
    //     if (logger == null) throw new NullPointerException("logger is marked non-null but is null");
    //     this.userRepository = userRepository;
    //     this.emailService = emailService;
    //     this.logger = logger;
    // }

    // 类的其他方法...
}
```
### 注意事项
- 确保在 IDE 中安装了 Lombok 插件，并在项目构建工具（如 Maven 或 Gradle）中添加了 Lombok 的依赖，以确保 Lombok 注解正常工作。
- 使用 `@RequiredArgsConstructor` 可以大大简化代码，但也要注意，它隐藏了构造器的显式声明，这可能会对阅读代码的清晰性造成一定的影响。

总的来说，`@RequiredArgsConstructor` 是 Lombok 提供的一个强大的工具，能有效减少 Java 类的样板代码，特别是在处理依赖注入和确保字段不为 null 的情况下。
# @AllArgsConstructor

`@AllArgsConstructor` 注解会生成一个包含类中所有字段的构造函数，不论它们是否被初始化或是被 `final` 修饰。这种构造器常用于简单的数据传输对象（DTOs）和实体类。
```java
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private String email;

    // 自动生成的构造函数等价于：
    // public User(Long id, String name, String email) {
    //     this.id = id;
    //     this.name = name;
    //     this.email = email;
    // }
}
```
### 使用场景

- **@RequiredArgsConstructor**: 当你想确保某些关键组件在构造对象时必须提供时使用，如对依赖注入清晰明了的要求。
- **@AllArgsConstructor**: 当你需要一个快速方便地生成包含所有字段的构造方法时使用，常见于简单的模型对象或测试数据。

这两个注解通过减少模板代码，提高了代码的简洁性和可读性，是开发中常用的工具。
# @Slf4j
`@Slf4j` 是Lombok库提供的一个注解，用于在类中自动注入一个名为`log`的SLF4J（Simple Logging Facade for Java，即Java的简单日志门面）Logger对象。这允许你在不进行显式Logger创建的情况下直接使用日志功能。