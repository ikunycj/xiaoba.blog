# [Common Application Properties](https://docs.spring.io/spring-boot/appendix/application-properties/index.html)
# application.yml多文件配置
## 方式一：多个yml文件

####   步骤1：创建多个[配置文件](https://so.csdn.net/so/search?q=%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6&spm=1001.2101.3001.7020)
```yml
application.yml          #主配置文件
application-dev.yml      #开发环境的配置
application-prod.yml     #生产环境的配置
application-test.yml     #测试环境的配置
```

####   步骤2：applicaiton.yml中指定配置
在application.yml中选择需要使用的配置文件（当选择的文件和application.yml文件存在相同的配置时，application.yml中的配置会被覆盖掉）

```yml
spring:
 profiles:
   active: dev #需要使用的配置文件的后缀
```

## 方式二： 单个yml文件

```yml
#激活dev环境配置
spring:
  profiles.active: dev
 
 
# 开发环境配置
spring:
  profiles: dev
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/dev?useUnicode=true&characterEncoding=utf-8&useSSL=true&serverTimezone=UTC
    username: root
    password: 123456
    driver-class-name: com.mysql.jdbc.Driver
server:
  port: 8080
 
 
# 测试环境配置
spring:
  profiles: test
  datasource:
    url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf-8&useSSL=true&serverTimezone=UTC
    username: root
    password: test
    driver-class-name: com.mysql.jdbc.Driver
server:
  port: 88
 
 
 
# 生产环境配置
spring:
  profiles: prod
  datasource:
    url: jdbc:mysql://localhost:3306/prod?useUnicode=true&characterEncoding=utf-8&useSSL=true&serverTimezone=UTC
    username: root
    password: prod
    driver-class-name: com.mysql.jdbc.Driver
 server:
  port: 99
```

  配置默认的profile为dev，其他环境可以通过指定启动参数来使用[不同的](https://so.csdn.net/so/search?q=%E4%B8%8D%E5%90%8C%E7%9A%84&spm=1001.2101.3001.7020)profile，比如：  
 测试环境：java -jar 项目.jar --spring.profiles.active=test  
 生产环境：java -jar 项目.jar --spring.profiles.active=prod

## 方式三：在pom.xml中指定[环境配置](https://so.csdn.net/so/search?q=%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE&spm=1001.2101.3001.7020)

#### 步骤1:创建多个配置文件
```yml
application.yml      #主配置文件
application-dev.yml  #开发环境的配置
application-prod.yml #生产环境的配置
application-test.yml #测试环境的配置
```

#### 步骤2:在application.yml中添加多环境配置属性

```yml
#多环境配置
  profiles:
    active: @profiles.active@
```

#### 步骤3:在pom.xml中指定使用的配置 

```xml
   <profiles>
        <profile>
            <id>dev</id>
            <activation>
                <!--  默认激活-->
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <profiles.active>dev</profiles.active>
            </properties>
        </profile>
 
        <profile>
            <id>prod</id>
            <properties>
                <profiles.active>prod</profiles.active>
            </properties>
        </profile>
 
        <profile>
            <id>test</id>
            <properties>
                <profiles.active>test</profiles.active>
            </properties>
        </profile>
    </profiles>
```

`<activeByDefault>true</activeByDefault>`配置为true则激活对应profile的配置。

或如图所示，在maven->profiles下勾选动态激活需要使用的配置

![](https://i-blog.csdnimg.cn/blog_migrate/206712974c77f7122fca1c9ca310d603.png)

#### 避坑：不能识别符号@

在步骤二中配置的@profiles.active@，启动会报异常，不能识别@符号。解决方法：

在pom.xml中设置filtering为true
```xml
     <build>
         <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering> 
                <includes>
                    <include>**/*.*</include>
                </includes>
            </resource>
        </resources>
  </build>
```

### 总结：
三种方式都可以实现多环境的配置。在application.yml主配置文件中做项目通用的配置，在其他配置文件中做不同环境下的配置，以避免重复配置的情况。