# Java开发中PO、VO、DAO、BO、DTO、POJO 含义
## PO(persistant object) 持久对象

可以看成是与[数据库](https://cloud.tencent.com/solution/database?from_column=20065&from=20065)中的表相映射的java对象。使用 Mybatis 来生成 PO 是不错的选择。

## VO(value object) 值对象

通常用于业务层之间的数据传递，和 PO 一样也是仅仅包含数据而已。但应是抽象出的业务对象，可以和表对应，也可以不，这根据业务的需要。

PO只能用在数据层，VO用在商业逻辑层和表示层。各层操作属于该层自己的数据对象，这样就可以降低各层之间的耦合，便于以后系统的维护和扩展。

## DAO(Data Access Objects) 数据访问对象接口

DAO是Data Access Object数据访问接口，数据访问：顾名思义就是与数据库打交道。夹在业务逻辑与数据库资源中间。

J2EE开发人员使用数据访问对象（DAO）设计模式把底层的数据访问逻辑和高层的商务逻辑分开。实现DAO模式能够更加专注于编写数据访问代码。

DAO模式是标准的J2EE设计模式之一。开发人员使用这个模式把底层的数据访问操作和上层的商务逻辑分开。一个典型的DAO实现有下列几个组件：

1. 一个DAO工厂类；
2. 一个DAO接口；
3. 一个实现DAO接口的具体类；
4. 数据传递对象（有些时候叫做值对象）。

具体的DAO类包含了从特定的数据源访问数据的逻辑。

## BO(Business Object)—业务对象层

表示应用程序领域内“事物”的所有实体类。这些实体类驻留在[服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065&from=20065)上，并利用服务类来协助完成它们的职责。

## DTO(Data Transfer Object) 数据传输对象

主要用于远程调用等需要大量传输对象的地方。比如一张表有100个字段，那么对应的PO就有100个属性。但是界面上只要显示10个字段，客户端用WEB service来获取数据，没有必要把整个PO对象传递到客户端，这时就可以用只有这10个属性的DTO来传递结果到客户端，这样也不会暴露服务端表结构。到达客户端以后，如果用这个对象来对应界面显示，那此时它的身份就转为VO。

## POJO(Plain Old Java Objects) 简单的Java对象

实际就是普通JavaBeans，使用POJO名称是为了避免和EJB混淆起来，而且简称比较直接。其中有一些属性及其getter、setter方法的类，有时可以作为value object或dto(Data Transform Object)来使用。当然,如果有一个简单的运算属性也是可以的，但不允许有业务方法，也不能携带有connection之类的方法。

## 真的有必要定义 VO，BO，PO，DO，DTO 吗

在讲具体的概念之前，先简单的讲一讲MVC开发模式。 **MVC的简单定义：**

- M层负责与数据库打交道；
- C层负责业务逻辑的编写；
- V层负责给用户展示（针对于前后端不分离的项目，不分离项目那种编写模版的方式，理解V的概念更直观）。

?> 而VO，BO，PO，DO，DTO呢，就是穿梭在这M、V、C层之间的实体传输对象。

实体传输对象示意图：

![2022-07-21-08-25-59.258439200](https://developer.qcloudimg.com/http-save/yehe-7271764/c45efe022daedaef1cd1f341d61d23cc.png)

2022-07-21-08-25-59.258439200

- VO（View Object）：**视图对象**，用于展示层，它的作用是把某个指定页面（或组件）的所有数据封装起来。
- DTO（Data Transfer Object）：**数据传输对象**，这个概念来源于J2EE的设计模式，原来的目的是为了EJB的分布式应用提供粗粒度的数据实体，以减少分布式调用的次数，从而提高分布式调用的性能和降低网络负载，但在这里，更符合泛指用于展示层与服务层之间的数据传输对象。
- BO（Business Object）：**业务对象**，把业务逻辑封装为一个对象，这个对象可以包括一个或多个其它的对象。
- PO（Persistent Object）：**持久化对象**，它跟持久层（通常是[关系型数据库](https://cloud.tencent.com/product/cdb-overview?from_column=20065&from=20065)）的数据结构形成一一对应的映射关系，如果持久层是关系型数据库，那么，数据表中的每个字段（或若干个）就对应PO的一个（或若干个）属性。
- DO（Domain Object）：**领域对象**，就是从现实世界中抽象出来的有形或无形的业务实体。

**有必要用吗？** 项目中真的有必要定义VO，BO，PO，DO，DTO吗？

还是要理性看待这个问题，要看项目“目的地”是什么。

如果项目比较小，是一个简单的MVC项目，又是单兵作战，不建议使用VO，BO，PO，DO，DTO，直接用POJO负责各个层来传输就好，因为这种项目的“目的地”是快速完成。 而更多的时候，是持续迭代的团队协作项目，这个时候就建议用VO，BO，PO，DO，DTO，而且团队内要达成共识，形成一个标准规范。

1. 业务复杂，人员协同性要求高的场景下，这些规范性的东西不按着来虽然不会出错，程序照样跑，但是遵守规范会让程序更具扩展性和可读性；
2. 让类语义更明确，很容易知道类的含义；

其实就是提升项目的可扩展性、可维护性与可阅读性。 提升这些性能的尽头是经济效益。

### **总结**

这篇文章很短，最后稍微总结一下，不管用哪种方式，只要团队内定义好一种适应的协同规范就行。 没有一个绝对好与绝对坏的方式方法。 团队规范的尽头能提升项目的可扩展性、可维护性与可阅读性，从而降低bug率。 另附这些概念命名规范：

- 数据对象：xxxPO，xxx即为数据表名。(也可DO)
- 数据传输对象：xxxDTO，xxx为业务领域相关的名称。
- 展示对象：xxxVO，xxx一般为网页名称。
- 业务对象：xxxBO，xxx是业务名称。

## POJO、Java Bean 是如何定义的

在日常开发中还有一些类经常被人叫做**POJO**，还有的人叫它们**Java Bean**。这些概念都是在特定场景下引入，用来表明它们的特性的。那这些称呼都是啥意思，有啥标准和特征呢？今天就来分享一下这些没用的知识。

### POJO

**POJO**是 **Plain Old Java Object** 的简写，大概意思就是“淳朴的Java对象”。这个词是国外一家外包公司的员工创造的。哪些类是**POJO**类还是有说法的，需要同时满足以下几个条件：

1. **不实现任何接口的类。**
2. **不继承任何其它类的类。**
3. **不使用任何外部注解的类。**

这种类其实就是切断了和外界联系的Java类，下面这个类肯定不是：

代码语言：javascript

复制

```javascript
@Data
public class Dog {
	private String name;
	private Integer age;
}
```

这个才是**POJO**：

代码语言：javascript

复制

```javascript
public class Dog {
	private String name;
	private Integer age;
}
```

### Java Bean

**Java Bean**也经常出现在各种技术文献中，也不是随便什么类都能叫做**Java Bean**的，它需要有以下定义：

- **有无参数构造。**
- 所有的属性必须是私有属性（`private`）。
- 所有的属性必须有公共的（`public`）的 `Getter` 和 `Setter`。
- **它必须是可以被序列化的，也就是实现** `java.io.Serializable` 接口。

按照这个定义，**POJO**类如果想成为**Java Bean**，需要改造成下面的形式:

代码语言：javascript

复制

```javascript
import java.io.Serializable;

public class Dog implements Serializable {
    private static final long serialVersionUID = 6723564465081191620L;
    private String name;
    private Integer age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

### Spring Bean

既然说到这里了，不妨再说下**Spring Bean**。**Spring Bean**的要求就低多了，只要这个类（接口）被注入了**Spring IoC**，那么这个类（接口）都可以被称作一个**Spring Bean**。至于一个类如何注入**Spring IoC**，这里就不说了，大家天天都在做。

### 最后

最后，可以得出结论，一个**POJO**总是孤孤单单的，它不可能成为一个**Java Bean**或者**Spring Bean**；但是**Java Bean**可以同时是一个**Spring Bean**；**Spring Bean**也可以是一个**Java Bean**。