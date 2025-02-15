[参考](https://github.com/Highflyer/REST-API-Design-Guide)
## 什么是RESTful API ?

[RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) 是目前最流行的 API 设计规范，用于 Web 数据接口的设计。

在 2000 年，[Roy Fielding](https://en.wikipedia.org/wiki/Roy_Fielding) 提议使用表现层状态转换 (英语：Representational State Transfer，缩写：REST) 作为设计 Web 服务的体系性方法。REST 是一种基于超媒体构建分布式系统的架构风格。REST 独立于任何基础协议，并且不一定绑定到 HTTP。但是，最常见的 REST 实现使用 HTTP 作为应用程序协议。

基于 HTTP 的 REST 的主要优势在于它使用开放标准，不会绑定 API 的实现，也不会将客户端应用程序绑定到任何具体实现。例如，可以使用 ASP.NET 或者 Node.js 编写 REST Web 服务，而客户端应用程序能够使用任何语言或工具来发起 HTTP 请求和分析 HTTP 响应。

它的大原则容易把握，但是细节不容易做对。我们必须进行较多的工作来实施 REST API 中的最佳实践。大多数情况下，懒惰或缺乏时间意味着我们不会付出努力，如此为我们的用户留下一个个古怪的、难用的却又脆弱的 API。



![](https://developer.qcloudimg.com/http-save/yehe-admin/c405be51feb49e010abf4daa4b3ace2a.png)

RESTful API 是应用程序接口 (API) 的一种架构风格，它使用 HTTP 请求来访问和使用数据。该数据可用于 GET、PUT、POST 和 DELETE 数据类型，这些数据类型是指有关资源的操作的读取、更新、创建和删除。

注意：**RESTful是一种风格而不是标准**。

### HTTP方法

使用RESTful风格的接口，从接口上可能只能定位其资源，但是无法知晓它具体进行了什么操作，需要具体了解其发生了什么操作动作要从其HTTP请求方法类型上进行判断。具体的HTTP方法和方法含义如下：

- GET（SELECT）： 从[服务器](https://cloud.tencent.com/product/cvm/?from_column=20065&from=20065)取出资源（一项或多项）。
- POST（CREATE）： 在服务器新建一个资源。
- PUT（UPDATE）： 在服务器更新资源（客户端提供完整资源数据）。
- PATCH（UPDATE）： 在服务器更新资源（客户端提供需要修改的资源数据）。
- DELETE（DELETE）： 从服务器删除资源。

当然也有很多在具体使用的时候使用PUT表示更新。从请求的流程来看，RESTful API和传统API大致架构如下：

![](https://developer.qcloudimg.com/http-save/yehe-admin/ee36a246d88347e6c1a1419ec8a2306b.png)

### 传统url接口与RESTful风格接口的区别

在restful风格中，将互联网的资源抽象成资源，将获取资源的方式定义为方法，从此请求再也不止get和post了：
```txt
客户端请求					传统url接口							REST ful风格口

查询所有用户				    /user/findAll						GET /users
查询编号为1的用户		        /user/findById?id=1			GET /user/1         
新增一个用户				    /user/save							POST /user
修改编号为1的用户		        /user/update						PUT /user/1
删除编号为1的用户		        /user/delete?id=1				DELETE /user/1
```

### 安全性和幂等性

在谈及GET、POST、PUT、DELETE的时候，就必须提一下接口的**安全性和幂等性**。上述四个HTTP请求方法的安全性和幂等性如下：

|HTTP Method|资源操作|CRUD操作|安全性|幂等性|解释|
|---|---|---|---|---|---|
|GET|SELECT|SELECT|安全|幂等|读操作安全，查询一次多次结果一致|
|POST|INSERT|CREATE|非安全|非幂等|写操作非安全，每多插入一次都会出现新结果|
|PUT|UPDATE|UPDATE|非安全|幂等|写操作非安全，一次和多次更新结果一致|
|DELETE|DELETE|DELETE|非安全|幂等|写操作非安全，一次和多次删除结果一致|

幂等性： 对同一REST接口的多次访问，得到的资源状态是相同的。

安全性： 对该REST接口访问，不会使服务器端资源的状态发生改变。

## RESTful API设计规范

既然了解了RESTful的一些规则和特性，那么具体该怎么去设计一个RESTful API呢？

### 1、动词 + 宾语

RESTful 的核心思想就是，客户端发出的数据操作指令都是"动词 + 宾语"的结构。比如，`GET /products` 这个命令，`GET` 是动词，`/products` 是宾语。

动词通常就是如下五种 HTTP 方法，对应 CRUD 操作。

- `GET` - 检索位于指定 URI 处的资源的表示形式。响应消息的正文包含所请求资源的详细信息。
- `POST` - 在指定的 URI 处创建新资源。请求消息的正文将提供新资源的详细信息。请注意，POST 还用于触发不实际创建资源的操作，如登录、注销等。
- `PUT` - 在指定的 URI 处创建或替换资源。请求消息的正文指定要创建或更新的资源。
- `PATCH` - 对资源执行部分更新。请求正文包含要应用到资源的一组更改。
- `DELETE` - 删除位于指定 URI 处的资源。

_根据 HTTP 规范，动词一律大写。_

特定请求的影响应取决于资源是集合还是单个项。下表汇总了使用电子商务示例的大多数 RESTful 实现所采用的常见约定。

|资源|POST|GET|PUT|DELETE|
|---|---|---|---|---|
|/products|创建新商品|检索所有商品|批量更新商品|删除所有商品|
|/products/1|N/A|检索商品 1 的详细信息|如果商品 1 存在，则更新其详细信息|删除商品 1|
|/products/1/orders|创建商品 1 的新订单|检索商品 1 的所有订单|批量更新商品 1 的订单|删除商品 1 的所有订单|

### 2、复数名词做资源名称

在URI中使用名词来表示资源，而不是动词，以避免歧义和混淆。对于表示资源集合的URI，通常使用复数形式，以便明确表示这是一个集合而不是单个资源。例如：

```shell
# 推荐
/users						# 用户资源
/orders						# 订单资源

# 避免
/user
/order
```

### 3、使用 URI 来定位资源

RESTful API 应该使用 URI 来定位资源，以确保每个资源都有一个唯一的标识符。URI 应该具有层级结构，以便表示资源之间的关系。例如：
```shell
GET /users/1/orders/1
```

### 4、使用查询参数来过滤和分页

使用查询参数来过滤和分页资源，例如：“**?page=1 & limit=10**”
```txt
获取前10个用户：		GET /users?limit=10
获取第二页的用户：		GET /users?page=2&limit=10
```

### 5、使用 HTTP 状态码来表示请求结果

使用 合适的HTTP 状态码来表示请求结果，以便客户端能够根据状态码进行处理。例如：。状态码主要分为五大类：

```txt
1xx：相关信息
2xx：操作成功
3xx：重定向
4xx：客户端错误
5xx：服务器错误
```

例如：

- 200：请求成功
- 201：资源创建成功
- 400：请求参数错误
- 401：未授权访问
- 403：表示禁止访问资源。
- 404：表示未找到资源。
- 500：表示服务器内部错误。

### 6、使用 JSON 或 XML 来表示数据

API 返回的数据格式，不应该是纯文本，而应该是一个 JSON 对象，因为这样才能返回标准的结构化数据。所以，服务器回应的 HTTP 头的 `Content-Type` 属性要设为 `application/json`。
客户端请求时，也要明确告诉服务器，可以接受 JSON 格式，即请求的 HTTP 头的 `ACCEPT` 属性也要设成 `application/json`。。
```shell
GET /users/1
{
  "id": 1,
  "name": "Tom",
  "age": 25
}
```

### 7、使用版本号来管理 API

RESTful API 应该使用版本号来管理 API 的不同版本，以便支持旧版 API 的兼容性和平稳升级。应该将API的版本号放入URL。 版本号以字符'v'开头，比如：v1、v2

```shell
/v1/users
/v2/users
```
### 8、提供清晰的错误信息：

在响应中包含清晰、详细的错误信息，帮助客户端理解问题的原因和解决方案。

```json
{
  "error": {
    "code": 404,
    "message": "User not found"
  }
}
```

### 9、使用标准的HTTP头部：

使用HTTP头部中的**Accept**和**Content-Type**字段进行内容协商，以确定客户端期望的表示形式和服务器返回的表示形式。

```text
接受JSON格式的响应：Accept: application/json
发送JSON格式的请求体：Content-Type: application/json
```
### 10、搜索、排序、筛选和分页

所有这些操作都只是对一个数据集的查询，我们无须用一系列新的 API 来处理这些操作，只需要使用 GET 方法的 API 附加查询参数。

举例说明：

**搜索**：在搜索商品列表时，API 端点应该是 `GET /products?search=Forrest%20Gump`

**排序**：如果客户想要获取商品的排序列表，端点 `GET /products` 应该在查询中接受排序参数，例如 `GET /products?sort=rank&order=desc` 会按照商品评级降序排列。【**建议**】如非必要，排序操作应该在客户端而不是在服务器端进行，这样可以避免服务器对结果集进行排序产生的额外压力。

**筛选**：若要筛选数据集，我们可以通过查询参数传递各种选项。例如 `GET /products?category=books&discontinued=false` 将过滤指定类别的已上架的商品列表数据。

**分页**：当数据集太大时，我们必须将数据集划分为更小的块，这有助于提高性能并更容易处理响应。例如 `GET /products?page=2&page_size=15`
## URI书写规范

在RESTful API设计中，URI（Uniform Resource Identifier）的书写通常遵循一些规范和最佳实践，以提高可读性、一致性和可维护性。以下是一些关于URI书写的常见规范：

### 使用小写字母：

建议使用小写字母，因为URI是区分大小写的。。
```txt
# 推荐
/users
/articles

# 避免
/Users
/Articles
```

### 使用短划线或下划线分隔单词：

使用短划线（`-`）或下划线（`_`）来分隔单词，而不是使用空格或驼峰命名法。这有助于确保URI的可读性。

```txt
# 推荐
/user-profiles
/article-comments

# 避免
/userProfiles
/articleComments
```

### 避免使用空格和特殊字符：

URI中不应包含空格和特殊字符，可以使用短划线或下划线来替代。

```txt
# 推荐
/user-profiles
/article-comments

# 避免
/user profiles
/article@comments
```

### 避免深层嵌套URL：

常见的情况是，资源需要多级分类，因此很容易写出多级的 URL，比如获取某个客户的某个订单。

`GET /customers/1/orders/2`

这种 URL 不利于扩展，语义也不明确，往往要想一会，才能明白含义。

更好的做法是，除了第一级，其它级别都用查询字符串表达。

`GET /products?category_id=12`

下面是另一个例子，查询已上架的商品。你可能会设计成下面的 URL。

`GET /products/discontinued`

其实使用下面的查询字符串的写法明显更好。

`GET /products?discontinued=false`

```txt
# 推荐
/users/{userId}/orders
/articles/{articleId}/comments

# 避免
/users/{userId}/orders/{orderId}/items
/articles/{articleId}/comments/{commentId}/replies
```

## RESTful API案例

详情请见：[https://restfulapi.cn/](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Frestfulapi.cn%2F&objectId=2360813&objectType=1&isNewArticle=undefined)

![](https://developer.qcloudimg.com/http-save/yehe-admin/70b4f9cea6588143e4750d6c3aa3c22e.png)

## 总结

RESTful风格的API 固然很好很规范，但大多数互联网公司并没有按照或者完全按照其规则来设计，因为REST是一种风格，而不是一种约束或规则，过于理想的RESTful API 会付出太多的成本。