# 1.APO基本概念
AOP（Aspect-Oriented Programming，面向切面编程）是一种编程范式，旨在通过分离跨领域的关注点（concerns）来提高代码的模块化程度。AOP 允许你将那些与业务逻辑无关的代码（如日志记录、性能监控、安全检查等）从业务逻辑中分离出来，从而使代码更易于维护和理解。
### 1.1基本概念

1. **切面（Aspect）**：
    
    - 切面是 AOP 的核心概念，表示一个关注点的模块化。例如，日志切面可以包含与日志记录相关的所有逻辑。
2. **连接点（Join Point）**：
    
    - 连接点是在程序执行过程中能够插入切面的具体位置。通常，连接点可以是方法调用、方法执行、构造函数调用或字段访问等。
3. **通知（Advice）**：
    
    - 通知定义了切面在连接点上的具体行为。通知类型包括前置通知（Before）、后置通知（After）、返回通知（After Returning）、异常通知（After Throwing）和环绕通知（Around）。
4. **切入点（Pointcut）**：
    
    - 切入点用于定义哪些连接点会被切面应用。切入点表达式用来匹配连接点，可以通过类名、方法名、注解等进行匹配。
5. **目标对象（Target Object）**：
    
    - 目标对象是被一个或多个切面增强的对象。它们是面向切面编程中真正的业务逻辑对象。
6. **代理（Proxy）**：
    
    - 代理是指 AOP 框架生成的一个对象，它包装了目标对象，并在适当的时候将通知添加到目标对象的连接点上。代理模式是 AOP 实现的基础。

### 1.2AOP 在 Spring 框架中的使用

Spring 是 Java 中最常用的 AOP 框架之一。以下是一个简单的示例，演示如何在 Spring 中使用 AOP：

#### 1. 定义切面类和通知
```java
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* com.example.service.*.*(..))")
    public void logBeforeMethod() {
        System.out.println("Method execution started");
    }
}
```
在这个示例中：

- `@Aspect` 注解将 `LoggingAspect` 类标识为一个切面。
- `@Before` 注解定义了一个前置通知，表示在匹配的方法执行前执行 `logBeforeMethod` 方法。
- `execution(* com.example.service.*.*(..))` 是一个切入点表达式，表示匹配 `com.example.service` 包下的所有类的所有方法。

#### 2. 配置 Spring

在 Spring 配置文件中启用 AOP 支持
```java
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd">

    <aop:aspectj-autoproxy/>
    
    <!-- 其他 bean 配置 -->

</beans>
```
#### 3. 使用 AOP

当你在 Spring 容器中运行应用程序时，Spring AOP 将自动在符合条件的方法执行前调用 `logBeforeMethod` 方法，实现了日志记录功能。
# 2.AOP基本使用
**实现步骤：**
### 1. 自定义注解 AutoFill（已经被替代不推荐）
首先，我们需要定义一个注解 `AutoFill`，用于标识需要自动填充公共字段的方法。
```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface AutoFill {
}
```
- `@Retention(RetentionPolicy.RUNTIME)`：注解在运行时可用。
- `@Target(ElementType.METHOD)`：注解用于方法上。
### 2. 自定义切面类 AutoFillAspect
接下来，创建一个切面类 `AutoFillAspect`，使用 AOP 拦截加入了 `AutoFill` 注解的方法，并通过反射为公共字段赋值。
```java
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.time.LocalDateTime;

@Aspect
@Component
public class AutoFillAspect {

    @Before("@annotation(AutoFill)")
    public void autoFillFields(JoinPoint joinPoint) throws IllegalAccessException {
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            if (arg != null) {
                Field[] fields = arg.getClass().getDeclaredFields();
                for (Field field : fields) {
                    if (field.getName().equals("createdAt") || field.getName().equals("updatedAt")) {
                        field.setAccessible(true);
                        if (field.getName().equals("createdAt")) {
                            field.set(arg, LocalDateTime.now());
                        } else if (field.getName().equals("updatedAt")) {
                            field.set(arg, LocalDateTime.now());
                        }
                    }
                }
            }
        }
    }
}
```

在这个切面类中：

- `@Aspect` 注解将该类标识为切面类。
- `@Component` 注解将该类作为 Spring 容器的组件。
- `@Before("@annotation(AutoFill)")` 切入点表达式表示在执行带有 `AutoFill` 注解的方法之前，执行 `autoFillFields` 方法。
- `joinPoint.getArgs()` 获取方法的参数，通过反射为参数对象的 `createdAt` 和 `updatedAt` 字段赋值。

### 3. 在 Mapper 的方法上加入 AutoFill 注解

最后，在需要自动填充字段的 Mapper 方法上加入 `AutoFill` 注解。
```java
import org.springframework.stereotype.Repository;

@Repository
public class CategoryMapper {

    @AutoFill
    public void insert(Category category) {
        // 执行插入操作
    }

    @AutoFill
    public void update(Category category) {
        // 执行更新操作
    }
}

```



# 技术点：
### 枚举 (Enum)

**定义**：枚举是一种特殊的数据类型，允许一个变量从一组预定义的常量中取值。枚举类型常用于表示一组相关的常量，例如星期、颜色、状态等。

**特点**：

- 每个枚举类型都是一个类，并且枚举常量是该类的实例。
- 枚举常量是公共的、静态的、最终的（`public static final`）。
- 枚举可以包含构造器、方法和属性。

**示例**：
```java
public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
}

public class EnumExample {
    public static void main(String[] args) {
        Day day = Day.MONDAY;
        switch (day) {
            case MONDAY:
                System.out.println("Today is Monday");
                break;
            // 其他情况...
        }
    }
}
```

### 注解 (Annotation)

**定义**：注解是一种元数据，可以为代码提供补充信息。注解不会直接影响代码的执行，但可以在编译时、类加载时或运行时通过工具或框架来处理这些注解，实现一些功能。

**特点**：

- 注解用于修饰类、方法、变量、参数、包等。
- 注解本身没有直接功能，需要结合反射机制或者框架进行处理。
- 常见的注解有 `@Override`、`@Deprecated`、`@SuppressWarnings` 等。

**示例**：
```java
public class AnnotationExample {
    @Override
    public String toString() {
        return "This is an annotation example";
    }

    @Deprecated
    public void deprecatedMethod() {
        // 这是一个过时的方法
    }
}
```
### AOP (Aspect-Oriented Programming, 面向切面编程)

**定义**：AOP 是一种编程范式，用于将横切关注点（cross-cutting concerns）从业务逻辑中分离出来。这些横切关注点通常包括日志记录、安全性、事务管理等。

**特点**：

- 通过切面（Aspect）将横切关注点封装起来。
- 通过通知（Advice）定义切面在连接点（Join Point）上的具体行为。
- 通过切入点（Pointcut）定义在哪些连接点应用切面。

**示例**：
```java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBeforeMethod(JoinPoint joinPoint) {
        System.out.println("Method execution started: " + joinPoint.getSignature().getName());
    }
}
```
### 反射 (Reflection)

**定义**：反射是一种机制，允许在运行时检查和修改程序的结构和行为。通过反射，可以动态地获取类的信息、调用方法、访问属性等。

**特点**：

- 通过反射可以在运行时操作对象。
- 反射通常用于框架、库、工具中，例如序列化、依赖注入、AOP 等。
- 使用反射时要注意性能开销和安全性问题。

**示例**：
```java
public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("com.example.MyClass");
        Object obj = clazz.newInstance();

        // 访问属性
        Field field = clazz.getDeclaredField("myField");
        field.setAccessible(true);
        field.set(obj, "newValue");

        // 调用方法
        Method method = clazz.getDeclaredMethod("myMethod");
        method.setAccessible(true);
        method.invoke(obj);
    }
}

```