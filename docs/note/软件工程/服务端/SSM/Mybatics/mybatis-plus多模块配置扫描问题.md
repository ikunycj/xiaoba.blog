# @MapperScan后面填写的文件目录是以什么为起点？如果是多模块呢？

`@MapperScan` 注解后面填写的包路径是基于项目的根包结构的。在多模块项目中，你需要确保 `@MapperScan` 注解能够正确指向包含 Mapper 接口的包路径。

### 单模块项目
在一个单模块项目中，包路径是基于项目的根包。例如，如果你的项目结构如下：
```
src
└── main
    └── java
        └── com
            └── example
                ├── mapper
                │   └── UserMapper.java
                ├── service
                │   └── UserService.java
                └── Application.java
```

在这种情况下，`@MapperScan` 应该配置为 `com.example.mapper`。

### 多模块项目

在一个多模块项目中，各个模块可能有各自的包结构。例如，假设你的多模块项目结构如下：
```
root
├── module-a
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── modulea
│                           └── mapper
│                               └── ModuleAMapper.java
├── module-b
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── moduleb
│                           └── mapper
│                               └── ModuleBMapper.java
└── application
    └── src
        └── main
            └── java
                └── com
                    └── example
                        └── Application.java
```

在这种情况下，你需要在主应用模块（例如 `application` 模块）中配置 `@MapperScan`，并指定各个模块中 Mapper 接口的包路径。

#### 主应用模块配置

在 `application` 模块的主类中，使用 `@MapperScan` 注解扫描所有模块的 Mapper 接口包路径：
```
package com.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan({"com.example.modulea.mapper", "com.example.moduleb.mapper"})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 注意事项

1. **相对路径 vs. 绝对路径**：`@MapperScan` 中的路径是相对于 `src/main/java` 目录的，即包路径。例如，如果 `Mapper` 接口在 `com.example.modulea.mapper` 包中，那么 `@MapperScan` 应该是 `com.example.modulea.mapper`。
    
2. **多个模块**：可以在 `@MapperScan` 中使用逗号分隔的字符串数组来扫描多个包。
    
3. **模块依赖**：确保你的主应用模块（`application` 模块）已经添加了其他模块的依赖。在 `pom.xml` 中添加依赖项。例如，对于 `module-a` 和 `module-b`：
```xml
<dependencies>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>module-a</artifactId>
        <version>1.0.0</version>
    </dependency>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>module-b</artifactId>
        <version>1.0.0</version>
    </dependency>
</dependencies>
```
    

这样，Spring Boot 应用在启动时会扫描并注册 `module-a` 和 `module-b` 模块中的所有 Mapper 接口。通过这种配置，你可以确保多模块项目中的所有 Mapper 接口都能被 MyBatis 正确加载和使用。

# 如果我多模块，并且module-a 和 module-b被添加为application 模块的依赖，那么具体应该怎么做

在多模块项目中，如果 `module-a` 和 `module-b` 被添加为 `application` 模块的依赖，你需要在 `application` 模块中进行适当的配置，以便扫描并注册这些模块中的 Mapper 接口。以下是详细的步骤：

### 1. 项目结构

假设你的项目结构如下：
```
root
├── module-a
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── modulea
│                           └── mapper
│                               └── ModuleAMapper.java
├── module-b
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── example
│                       └── moduleb
│                           └── mapper
│                               └── ModuleBMapper.java
└── application
    └── src
        └── main
            └── java
                └── com
                    └── example
                        └── Application.java
```

### 2. `module-a` 和 `module-b` 配置

确保 `module-a` 和 `module-b` 中的 Mapper 接口位于各自的包中，例如 `com.example.modulea.mapper` 和 `com.example.moduleb.mapper`。

#### `ModuleAMapper.java`
```java
package com.example.modulea.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.modulea.entity.ModuleAEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ModuleAMapper extends BaseMapper<ModuleAEntity> {
    // 自定义的方法
}
```
#### `ModuleBMapper.java`
```java
package com.example.moduleb.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.moduleb.entity.ModuleBEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ModuleBMapper extends BaseMapper<ModuleBEntity> {
    // 自定义的方法
}
```

### 3. 在 `application` 模块中配置 `@MapperScan`

在 `application` 模块的主类中，使用 `@MapperScan` 注解并指定 `module-a` 和 `module-b` 中的 Mapper 包路径。
```java
package com.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan({"com.example.modulea.mapper", "com.example.moduleb.mapper"})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 4. 配置 MyBatis-Plus 分页插件

在 `application` 模块中创建一个配置类来配置 MyBatis-Plus 的分页插件。

#### `MyBatisPlusConfig.java`
```
package com.example.config;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyBatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        return interceptor;
    }
}
```

### 5. 添加模块依赖

在 `application` 模块的 `pom.xml` 文件中，添加对 `module-a` 和 `module-b` 的依赖。

#### `application/pom.xml`
```xml
<dependencies>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>module-a</artifactId>
        <version>1.0.0</version>
    </dependency>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>module-b</artifactId>
        <version>1.0.0</version>
    </dependency>
    <!-- 其他依赖 -->
</dependencies>
```

### 总结

通过上述配置，你的 `application` 模块将会扫描并注册 `module-a` 和 `module-b` 模块中的所有 Mapper 接口，同时配置好 MyBatis-Plus 的分页插件。这样，当你运行 `application` 模块时，所有的 Mapper 接口都会被正确加载和使用。

这种方式可以有效地管理和扩展多模块项目中的 Mapper 接口，使得各个模块之间的依赖和配置更加清晰和易于维护。

# @MapperScan({"com.example.modulea.mapper", "com.example.moduleb.mapper"}) 如果我不在主模块写这个，是不是就扫描不到子模块的mapper
如果你在主模块（例如 `application` 模块）中不使用 `@MapperScan` 注解来指定子模块（例如 `module-a` 和 `module-b`）中的 Mapper 包路径，那么 Spring Boot 将不会自动扫描并注册这些 Mapper 接口。这意味着 MyBatis 无法找到这些 Mapper 接口，它们将不会被正确加载和使用。

### 确保子模块的 Mapper 被扫描和注册的方式：

#### 1. 在主模块中使用 `@MapperScan`

这是最常见和推荐的方式，因为它将所有的 Mapper 扫描配置集中在一个地方，便于管理和维护。
```java
package com.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan({"com.example.modulea.mapper", "com.example.moduleb.mapper"})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

#### 2. 在每个子模块中单独配置 `@MapperScan`

如果你不想在主模块中配置 `@MapperScan`，你可以在每个子模块中单独配置。这样需要在每个子模块中创建一个配置类，并在配置类中使用 `@MapperScan` 注解。

##### 在 `module-a` 中：
```java
package com.example.modulea.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.example.modulea.mapper")
public class ModuleAConfig {
}
```
##### 在 `module-b` 中：
```java
package com.example.moduleb.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.example.moduleb.mapper")
public class ModuleBConfig {
}
```
### 3. 使用 `@ComponentScan` 配置

你还可以通过在主模块中使用 `@ComponentScan` 注解来扫描子模块中的配置类，从而间接地扫描子模块中的 Mapper。
```java
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.modulea", "com.example.moduleb"})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 4. 自动扫描默认包结构

如果你的主模块和子模块都在同一个包结构下（例如 `com.example`），并且子模块中的 Mapper 接口在主模块的子包中，Spring Boot 默认会扫描主模块所在包及其子包中的所有组件。在这种情况下，你可以不需要显式地配置 `@MapperScan`，但这在大型项目中并不推荐，因为它可能导致意外的包扫描和组件注册。

### 总结

为了确保 Spring Boot 能够正确扫描并注册所有子模块中的 Mapper 接口，最推荐的方法是在主模块中使用 `@MapperScan` 注解指定所有需要扫描的包路径。如果你不在主模块中配置 `@MapperScan` 注解，那么需要在每个子模块中分别配置，或者通过 `@ComponentScan` 间接实现包扫描。

这种配置方式能确保 MyBatis 可以找到并正确注册所有的 Mapper 接口，使得各个模块间的依赖关系和配置更加清晰和易于维护。