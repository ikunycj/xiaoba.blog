# Maven POM

POM(project object model) 代表工程对象模型。它是使用 Maven 工作时的基本组建，是一个 xml 文件。它被放在工程根目录下，文件命名为 pom.xml。

POM 包含了关于工程和各种配置细节的信息，Maven 使用这些信息构建工程。

POM 也包含了目标和插件。当执行一个任务或者目标时，Maven 会查找当前目录下的 POM，从其中读取所需要的配置信息，然后执行目标。能够在 POM 中设置的一些

**配置如下：**  
（1）项目依赖项（project dependencies）  
（2）插件（plugins）  
（3）目标（goals）  
（4）构建配置文件（build profiles）  
（4）项目版本（project version）  
（5）开发人员（developers）  
（6）邮件列表（mailing list）

在创建 POM 之前，我们首先确定`工程组（groupId）`，及其`名称（artifactId）`和版本，在仓库中这些属性是工程的唯一标识

**POM**
```xml
<project …………>
   <modelVersion>4.0.0</modelVersion>

   <groupId>com.companyname.project-group</groupId>
   <artifactId>project</artifactId>
   <version>1.0</version>
</project>
```

  

**需要说明的是每个工程应该只有一个 POM 文件**  
（1）所有的 POM 文件需要 project 元素和三个必须的字段：groupId, artifactId,version。  
（2）在仓库中的工程标识为 groupId:artifactId:version  
（3）POM.xml 的根元素是 project，它有三个主要的子节点

|节点|描述|
|---|---|
|groupId|**工程组的标识**。它在一个组织或者项目中通常是唯一的。例如，一个银行组织 com.company.bank 拥有所有的和银行相关的项目|
|artifactId|**工程的标识**。它通常是工程的名称。例如，消费者银行。groupId 和 artifactId 一起定义了 artifact 在仓库中的位置|
|version|**工程的版本号**。在 artifact 的仓库中，它用来区分不同的版本。例如： com.company.bank:consumer-banking:1.0、com.company.bank:consumer-banking:1.1|

  

# Super POM（父类）

所有的 POM 都继承自一个父 POM（无论是否显式定义了这个父 POM）。父 POM 也被称作 Super POM，它包含了一些可以被继承的默认设置

Maven 使用 effective pom（Super pom 加上工程自己的配置）来执行相关的目标，它帮助开发者在 pom.xml 中做尽可能少的配置，这些配置可以被方便的重写  
查看 Super POM 默认配置的一个简单方法是执行以下命令：mvn help:effective-pom  
在你的电脑上的任意目录下创建一个 pom.xml 文件，使用上面提到的示例 pom 中的内容。

在下面的例子中，我们在` C:\MVN\project` 目录中创建了一个 pom.xml 文件。

打开命令控制台，到 pom.xml 所在的目录下执行以下 mvn 命令
```shell
C:\pom.xml所在的目录>mvn help:effective-pom
```

可以看到 Maven 在执行目标时需要用到的默认工程源码目录结构、输出目录、需要的插件、仓库和报表目录。

Maven 的 pom.xml 文件也不需要手工编写  
Maven 提供了大量的原型插件来创建工程，包括工程结构和 pom.xml

**注意**：==maven项目在打成jar包时，默认不会把第三方jar打包，如果想同时打包第三方jar文件，需要添加如下：==

```xml
<plugin>  
    <artifactId>maven-assembly-plugin</artifactId>  
        <configuration>  
            <!--这部分可有可无,加上的话则直接生成可运行jar包-->  
            <!--<archive>-->  
                <!--<manifest>-->  
                    <!--<mainClass>${exec.mainClass}</mainClass>-->  
                <!--</manifest>-->  
            <!--</archive>-->  
            <descriptorRefs>  
                <descriptorRef>jar-with-dependencies</descriptorRef>  
                </descriptorRefs>  
        </configuration>  
</plugin>
```

  

# Parent（父项目坐标）
```xml
<parent>
	<artifactId />
	<groupId />
	<version />
	<relativePath />
</parent>
```

**parent：父项目的坐标**  
如果项目中没有规定某个元素的值，那么父项目中的对应值即为项目的默认值。 坐标包括group ID，artifact ID和 version。

| 子坐标          | 描述                                                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| artifactId   | 被继承的父项目的构件标识符                                                                                                                                       |
| groupId      | 被继承的父项目的全球唯一标识符                                                                                                                                     |
| version      | 被继承的父项目的版本                                                                                                                                          |
| relativePath | 父项目的pom.xml文件的相对路径。相对路径允许你选择一个不同的路径。默认值是…/pom.xml。Maven首先在构建当==前项目的地方==寻找父项 目的pom，其次在==文件系统的这个位置（relativePath位置）==，然后在==本地仓库==，最后在==远程仓库==寻找父项目的pom |
|              |                                                                                                                                                     |

  

# 一级坐标简略
```xml
<modelVersion>4.0.0</modelVersion>
<groupId>com.my.maven.ssh</groupId>
<artifactId>web_ssh</artifactId>
<version>0.0.1-SNAPSHOT</version>
<packaging>war</packaging>
<name>demo-maven</name>
<url>http://www.baidu.com</url>
<description>A maven project to study maven.</description>  
```

|一级坐标|描述|
|---|---|
|modelVersion|声明项目描述符遵循哪一个POM模型版本。模型本身的版本很少改变，虽然如此，但它仍然是必不可少的，这是为了当Maven引入了新的特性或者其他模型变更的时候，确保稳定性|
|groupId|项目的全球唯一标识符，通常使用全限定的包名区分该项目和其他项目。并且构建时生成的路径也是由此生成， 如com.mycompany.app生成的相对路径为：/com/mycompany/app|
|artifactId|构件的标识符，它和group ID一起唯一标识一个构件。换句话说，你不能有两个不同的项目拥有同样的artifact ID和groupID；在某个 特定的group ID下，artifact ID也必须是唯一的。构件是项目产生的或使用的一个东西，Maven为项目产生的构件包括：JARs，源 码，二进制发布和WARs等|
|version|项目当前版本，格式为:主版本.次版本.增量版本-限定版本号|
|packaging|项目产生的构件类型，例如jar、war、ear、pom。插件可以创建他们自己的构件类型，所以前面列的不是全部构件类型|
|name|项目的名称, Maven产生的文档用|
|url|项目主页的URL, Maven产生的文档用|
|description|项目的详细描述, Maven 产生的文档用。 当这个元素能够用HTML格式描述时（例如，CDATA中的文本会被解析器忽略，就可以包含HTML标 签）， 不鼓励使用纯文本描述。如果你需要修改产生的web站点的索引页面，你应该修改你自己的索引页文件，而不是调整这里的文档|

  

### prerequisites

```xml
<prerequisites>
	<maven>2.0</maven>
</prerequisites>
```

```
|- prerequisites：描述了这个项目构建环境中的前提条件
	|- maven：构建该项目或使用该插件所需要的Maven的最低版本
```

### issueManagement

```xml
<issueManagement>
	<system>jira</system>
	<url>http://jira.baidu.com/banseon</url>
</issueManagement>
```

```
|- issueManagement：项目的问题管理系统(Bugzilla, Jira, Scarab,或任何你喜欢的问题管理系统)的名称和URL，本例为 jira  
	|- system：问题管理系统（例如jira）的名字
	|- url：该项目使用的问题管理系统的URL
```

### ciManagement

```xml
<ciManagement>
	<system></system>
	<url></url>
	<notifiers>
		<notifier>
			<address></address>
			<configuration></configuration>
			<sendOnError></sendOnError>
			<sendOnFailure></sendOnFailure>
			<sendOnSuccess></sendOnSuccess>
			<sendOnWarning></sendOnWarning>
			<type></type>
		</notifier>
	</notifiers>
</ciManagement>
```

```
|- ciManagement：项目持续集成信息 
	|- system：持续集成系统的名字，例如continuum 
	|- url：该项目使用的持续集成系统的URL（如果持续集成系统有web接口的话）
	|- notifiers：构建完成时，需要通知的开发者/用户的配置项。包括被通知者信息和通知条件（错误，失败，成功，警告）
		|- notifier：配置一种方式，当构建中断时，以该方式通知用户/开发者  
			|- type：传送通知的途径 
			|- sendOnError：发生错误时是否通知
			|- sendOnFailure：构建失败时是否通知
			|- sendOnSuccess：构建成功时是否通知 
			|- sendOnWarning：发生警告时是否通知 
 			|- address：不赞成使用。通知发送到哪里
			|- configuration：扩展配置项 
```

### inceptionYear

```xml
<inceptionYear></inceptionYear>
```

```
|- inceptionYear：项目创建年份，4位数字。当产生版权信息时需要使用这个值
```

### mailingLists

```xml
<mailingLists>
	<mailingList>
		<name>名字</name>
		<post>banseon@126.com</post>
		<subscribe>banseon@126.com</subscribe>
		<unsubscribe>banseon@126.com</unsubscribe>
		<archive>http:/hi.baidu.com/banseon/demo/dev/</archive>
		<otherArchives></otherArchives>
	</mailingList>
</mailingLists>
```

```
|- mailingLists：项目相关邮件列表信息 
	|- mailingList：该元素描述了项目相关的所有邮件列表。自动产生的网站引用这些信息
		|- name：邮件的名称
		|- post：发送邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建   
		|- subscribe：订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建
		|- unsubscribe：取消订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建-->    
		|- archive：可以浏览邮件信息的URL
		|- otherArchives：另外的archive
```

### developers

```xml
<developers>
	<developer>
		<id>HELLO WORLD</id>
		<name>banseon</name>
		<email>banseon@126.com</email>
		<url />
		<roles>
			<role>Project Manager</role>
			<role>Architect</role>
		</roles>
		<organization>demo</organization>
		<organizationUrl>http://hi.baidu.com/banseon</organizationUrl>
		<properties>
			<dept>No</dept>
		</properties>
		<timezone>-5</timezone>
	</developer>
</developers>
```

```
|- developers：项目开发者列表
	|- developer：某个项目开发者的信息
		|- id：SCM里项目开发者的唯一标识符
		|- name：项目开发者的全名 
		|- email：项目开发者的email
		|- url：项目开发者的主页的URL
		|- roles：项目开发者在项目中扮演的角色，角色元素描述了各种角色
			|- role：具体角色
		|- organization：项目开发者所属组织
		|- organizationUrl：项目开发者所属组织的URL
		|- properties：项目开发者属性，如即时消息如何处理等
			|- dept：具体开发者
		|- timezone：项目开发者所在时区， -11到12范围内的整数
```

### contributors

```xml
<contributors>
	<contributor>
		<name></name>
		<email></email>
		<url></url>
		<organization></organization>
		<organizationUrl></organizationUrl>
		<roles></roles>
		<timezone></timezone>
		<properties></properties>
	</contributor>
</contributors>
```

contributors：项目的其他贡献者列表  
contributor：项目的其他贡献者

**此元素属性与developers/developer元素属性一致（上方）**

### licenses

```xml
<licenses>
	<license>
		<name>Apache 2</name>
		<url>http://www.baidu.com/banseon/LICENSE-2.0.txt</url>
		<distribution>repo</distribution>
		<comments>A business-friendly OSS license</comments>
	</license>
</licenses>
```

```
|- licenses：该元素描述了项目所有License列表。 应该只列出该项目的license列表，不要列出依赖项目的 license列表。如果列出多个license，用户可以选择它们中的一个而不是接受所有license
	|- license：描述了项目的license，用于生成项目的web站点的license页面，其他一些报表和validation也会用到该元素
		|- name：license用于法律上的名称 
		|- url：官方的license正文页面的URL  
		|- distribution：项目分发的主要方式：  
			|- repo：可以从Maven库下载  
			|- manual：用户必须手动下载和安装依赖
		|- comments：关于license的补充信息
```

### scm

```xml
<scm>
	<connection>
		scm:svn:http://svn.baidu.com/banseon/maven/banseon/banseon-maven2-trunk(dao-trunk)    
    </connection>
	<developerConnection>   
         scm:svn:http://svn.baidu.com/banseon/maven/banseon/dao-trunk    
    </developerConnection>
	<tag />
	<url>http://svn.baidu.com/banseon</url>
</scm>
```

```
|- scm：SCM(Source Control Management)标签允许你配置你的代码库，供Maven web站点和其它插件使用
	|- connection：SCM的URL,该URL描述了版本库和如何连接到版本库。欲知详情，请看SCMs提供的URL格式和列表。该连接只读   
	|- developerConnection：给开发者使用的，类似connection元素。即该连接不仅仅只读
	|- tag：当前代码的标签，在开发阶段默认为HEAD       
	|- url：指向项目的可浏览SCM库（例如ViewVC或者Fisheye）的URL
```

### organization

```xml
<organization>
	<name>demo</name>
	<url>http://www.baidu.com/banseon</url>
</organization>
```

```
|- organization：描述项目所属组织的各种属性。Maven产生的文档用
	|- name：组织的全名
	|- url：组织主页的URL
```

  

# 一级坐标详细

## build（构建项目需要的信息）

```xml
<build>
	<sourceDirectory/>  
	<scriptSourceDirectory/>  
	<testSourceDirectory/>  
	<outputDirectory/>  
	<testOutputDirectory/>  
	<defaultGoal/>
	<directory/>
	<finalName/>
	<filters/> 

	<extensions>  
		<extension>  
			<groupId/>  
			<artifactId/>  
			<version/>  
		</extension>  
	</extensions>  

	<resources>  
		<resource>  
			<targetPath/>  
			<filtering/>  
			<directory/>  
			<includes/>  
			<excludes/>  
		</resource>  
	</resources>  

	<testResources>  
		<testResource>
			<targetPath/>
			<filtering/>
			<directory/>
			<includes/>
			<excludes/>  
		</testResource>  
	</testResources>

	<pluginManagement>  
		<plugins>  
			<plugin>  
				<groupId/>
				<artifactId/>
				<version/>
				<inherited/>  
				<configuration/>  
				<extensions/>
					<execution>
						<id/
						<phase/>
						<goals/>
						<inherited/>
						<configuration/>  
					<execution/>
				<executions>
				<dependencies>
				<dependency>
				</dependency>  
				</dependencies>       
			</plugin>
		</plugins>
	</pluginManagement>

	<plugins>
		<plugin>
		<groupId/>
		<artifactId/>
		<version/>
		<goals/>
		<inherited/>
		<configuration/>
		<executions>
			<execution>
				<id/>
				<phase/>
				<goals/>
				<inherited/>
				<configuration/>
			</execution>
		</executions>
		<dependencies>
			<dependency></dependency>
		</dependencies>
		</plugin>
	</plugins>
</build>
```

  

#### build下的一级元素

```xml
<sourceDirectory/>  
<scriptSourceDirectory/>  
<testSourceDirectory/>  
<outputDirectory/>  
<testOutputDirectory/>  
<defaultGoal/>
<directory/>
<finalName/>
<filters/>
```

| 元素                    | 描述                                                                     |
| --------------------- | ---------------------------------------------------------------------- |
| sourceDirectory       | 该元素设置了项目源码目录，当构建项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径                |
| scriptSourceDirectory | 该元素设置了项目脚本源码目录，该目录和源码目录不同：绝大多数情况下，该目录下的内容 会被拷贝到输出目录(因为脚本是被解释的，而不是被编译的) |
| testSourceDirectory   | 该元素设置了项目单元测试使用的源码目录，当测试项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径         |
| outputDirectory       | 被编译过的应用程序class文件存放的目录                                                  |
| testOutputDirectory   | 被编译过的测试class文件存放的目录                                                    |
| defaultGoal           | 当项目没有规定目标（Maven2 叫做阶段）时的默认值                                            |
| directory             | 构建产生的所有文件存放的目录                                                         |
| finalName             | 产生的构件的文件名，默认值是${artifactId}-${version}                                 |
| filters               | 当filtering开关打开时，使用到的过滤器属性文件列表                                          |

  

#### extensions

```xml
<extensions>
	<extension>
		<groupId />
		<artifactId />
		<version />
	</extension>
</extensions>
```

```
|- extensions：使用来自该项目的一系列构建扩展
	|- extension：描述使用到的构建扩展
		|- groupId：构建扩展的groupId
		|- artifactId：构建扩展的artifactId
		|- version：构建扩展的版本
```

#### resources

```xml
<resources>  
	<resource>  
		<targetPath/>  
		<filtering/>  
		<directory/>  
		<includes/>  
		<excludes/>  
	</resource>  
</resources>  
```

```
|- resources：这个元素描述了项目相关的所有资源路径列表，例如和项目相关的属性文件，这些资源被包含在最终的打包文件里
	|- resource：这个元素描述了项目相关或测试相关的所有资源路径
		|- targetPath：描述了资源的目标路径。该路径相对target/classes目录（例如${project.build.outputDirectory}）。举个例子，如果你想资源在特定的包里(org.apache.maven.messages)，你就必须该元素设置为org/apache/maven /messages。然而，如果你只是想把资源放到源码目录结构里，就不需要该配置
		|- filtering：是否使用参数值代替参数名。参数值取自properties元素或者文件里配置的属性，文件在filters元素里列出
		|- directory：描述存放资源的目录，该路径相对POM路径
		|- includes：包含的模式列表，例如**/*.xml
		|- excludes：排除的模式列表，例如**/*.xml
```

#### testResources

```xml
<testResources>  
	<testResource>  
		<targetPath/>
		<filtering/>
		<directory/>
		<includes/>
		<excludes/>  
	</testResource>  
</testResources>
```

```
|- testResources：这个元素描述了单元测试相关的所有资源路径，例如和单元测试相关的属性文件  
	|- testResource：这个元素描述了测试相关的所有资源路径
```

**testResource属性与build下resources下resource元素的属性一致**

#### pluginManagement

```xml
<pluginManagement>  
	<plugins>  
		<plugin>
			<groupId/>
			<artifactId/>
			<version/>
			<inherited/>
			<configuration/>
			<extensions>
				<execution>
					<id/>
					<phase/>
					<goals/>
					<inherited/>
					<configuration/>
				<execution/>
			<executions>
			<dependencies>
				<dependency>
				</dependency>
			</dependencies>
		</plugin>
	</plugins>
</pluginManagement>
```

```
|- pluginManagement：子项目可以引用的默认插件信息。该插件配置项直到被引用时才会被解析或绑定到生命周期。给定插件的任何本地配置都会覆盖这里的配置
	|- plugins：使用的插件列表
		|- plugin：plugin元素包含描述插件所需要的信息
		|- groupId：插件在仓库里的group ID
		|- artifactId：插件在仓库里的artifact ID
		|- version：被使用的插件的版本（或版本范围）
		|- inherited：任何配置是否被传播到子项目
		|- configuration：作为DOM对象的配置
		|- extensions：是否从该插件下载Maven扩展（例如打包和类型处理器），由于性能原因，只有在真需要下载时，该元素才被设置成enabled。在构建生命周期中执行一组目标的配置。每个目标可能有不同的配置
			|- execution：元素包含了插件执行需要的信息
				|- id：执行目标的标识符，用于标识构建过程中的目标，或者匹配继承过程中需要合并的执行目标
				|- phase：绑定了目标的构建生命周期阶段，如果省略，目标会被绑定到源数据里配置的默认阶段
				|- goals：配置的执行目标
				|- inherited：配置是否被传播到子POM
				|- configuration：作为DOM对象的配置
		|- dependencies：项目引入插件所需要的额外依赖
			|- dependency：依赖
```

#### plugins

```xml
<plugins>
	<plugin>
		<groupId/>
		<artifactId/>
		<version/>
		<goals/>
		<inherited/>
		<configuration/>
		<extensions/>
		<executions>
			<execution>
				<id/>
				<phase/>
				<goals/>
				<inherited/>
				<configuration/>
			</execution>
		</executions>
		<dependencies>
			<dependency></dependency>
		</dependencies>
	</plugin>
</plugins>
```

```
|- plugins：使用的插件列表
	|- plugin元素
```

**plugin元素的属性与build/pluginManagement/plugins/plugin元素一致**

  

## profiles（项目构建）

profiles：在列的项目构建profile，如果被激活，会修改构建处理

#### profile

```xml
<profiles>
	<profile>
	</profile>
</profiles>
```

profile：根据环境参数或命令行参数激活某个构建处理。

##### id

```xml
<profile>
	<id></id>
</profile>
```

id：构建配置的唯一标识符 . 即用于命令行激活 , 也用于在继承时合并具有相同标识符的profile。

##### activation

```xml
<profile>
	<activation>
		<activeByDefault></activeByDefault>
		<jdk></jdk>		
		<os>
			<name></name>
			<family></family>
			<arch></arch>
			<version></version>
		</os>
		<property>
			<name></name>
			<value></value>
		</property>
		<file>
			<exists></exists>
			<missing></missing>
		</file>
	</activation>
</profile>
```

```
|- activation：自动触发profile的条件逻辑。Activation是profile的开启钥匙。profile的力量来自于它能够在某些特定的环境中自动使用某些特定的值；这些环境通过activation元素指定。activation元素并不是激活profile的唯一方式
	|- activeByDefault：profile默认是否激活的标志
	|- jdk：当匹配的jdk被检测到，profile被激活。例如，1.4激活JDK1.4，1.4.0_2，而!1.4激活所有版本不是以1.4开头的JDK
	|- os：（activation下），当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性
		|- name：激活profile的操作系统的名字
		|- family：激活profile的操作系统所属家族(如 'windows')
		|- arch：激活profile的操作系统体系结构
		|- version：激活profile的操作系统版本
	|- property：如果Maven检测到某一个属性（其值可以在POM中通过${名称}引用），其拥有对应的名称和值，Profile就会被激活。如果值字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段
		|- name：激活profile的属性的名称
		|- value：激活profile的属性的值
	|- file：提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活profile。另一方面，exists则会检查文件是否存在，如果存在则激活profile
		|- exists：如果指定的文件存在，则激活profile
		|- missing：如果指定的文件不存在，则激活profile
```

  

### modules

```xml
<modules>
	<module>
	</module>
</modules>
```

**modules**：模块（有时称作子项目） 被构建成项目的一部分。列出的每个模块元素是指向该模块的目录的相对路径。

  

### repositories

```xml
<repositories>
	<repository>
		<releases>
			<enabled></enabled>
			<updatePolicy></updatePolicy>
			<checksumPolicy></checksumPolicy>
		</releases>
		<snapshots>
			<enabled></enabled>
			<updatePolicy></updatePolicy>
			<checksumPolicy></checksumPolicy>
		</snapshots>
		<id>banseon-repository-proxy</id>
		<name>banseon-repository-proxy</name>
		<url>http://127.0.0.1:8888/repository/</url>
		<layout>default</layout>
	</repository>
</repositories>
```

```
|- repositories：发现依赖和扩展的远程仓库列表
	|- repository	：包含需要连接到远程仓库的信息
		|- id：远程仓库唯一标识符 . 可以用来匹配在settings.xml文件里配置的远程仓库
		|- name：远程仓库名称
		|- url：远程仓库URL , 按protocol://hostname/path形式
		|- layout：用于定位和排序构件的仓库布局类型-可以是default（默认）或者legacy（遗留）. Maven 2为其仓库提供了一个默认的布局；然 而 , Maven 1.x有一种不同的布局 . 我们可以使用该元素指定布局是default（默认）还是legacy（遗留）
		|- releases：如何处理远程仓库里发布版本的下载
			|- enabled： true或者false表示该仓库是否为下载某种类型构件（发布版 , 快照版）开启
			|- updatePolicy：该元素指定更新发生的频率 . Maven会比较本地POM和远程POM的时间戳。这里的选项是：always（一直） , daily（默认 , 每日） , interval：X（这里X是以分钟为单位的时间间隔） , 或者never（从不）				|- |- |- checksumPolicy：当Maven验证构件校验文件失败时该怎么做：ignore（忽略） , fail（失败） , 或者warn（警告）
		|- snapshots：如何处理远程仓库里快照版本的下载 . 有了releases和snapshots这两组配置 , POM就可以在每个单独的仓库中，为每种类型的构件采取不同的 策略 . 例如 , 可能有人会决定只为开发目的开启对快照版本下载的支持.参见repositories/repository/releases元素
			|- enabled：
			|- updatePolicy：
			|- checksumPolicy：
```

  

### pluginRepositories

```xml
<pluginRepositories>
	<pluginRepository>
		<releases>
			<enabled />
			<updatePolicy />
			<checksumPolicy />
		</releases>
		<snapshots>
			<enabled />
			<updatePolicy />
			<checksumPolicy />
		</snapshots>
		<id />
		<name />
		<url />
		<layout />
	</pluginRepository>
</pluginRepositories>
```

**pluginRepositories**：发现插件的远程仓库列表，这些插件用于构建和报表（参见repositories/repository）

  

### dependencies

```xml
<dependencies>
	<dependency>
		<groupId>org.apache.maven</groupId>
		<artifactId>maven-artifact</artifactId>
		<version>3.8.1</version>
		<type>jar</type>
		<classifier></classifier>
		<scope>test</scope>
		<systemPath></systemPath>
		<exclusions>
			<exclusion>
				<artifactId>spring-core</artifactId>
				<groupId>org.springframework</groupId>
			</exclusion>
		</exclusions>
		<optional>true</optional>
	</dependency>
</dependencies>
```

```
|- dependencies：该元素描述了项目相关的所有依赖 . 这些依赖组成了项目构建过程中的一个个环节 . 它们自动从项目定义的仓库中下载 . 要获取更多信息, 可看项目依赖机制
	|- dependency：
		|- groupId：依赖的group ID
		|- artifactId：依赖的artifact ID
		|- version：	依赖的版本号 . 在Maven 2里, 也可以配置成版本号的范围
		|- type：依赖类型 , 默认类型是jar . 它通常表示依赖的文件的扩展名,但也有例外.一个类型可以被映射成另外一个扩展名或分类器. 类型经常和使用的打包方式对应 , 尽管这也有例外.一些类型的例子：jar , war , ejb-client和test-jar . 如果设置extensions为true , 就可以在 plugin里定义新的类型.所以前面的类型的例子不完整
		|- classifier：依赖的分类器 . 分类器可以区分属于同一个POM , 但不同构建方式的构件.分类器名被附加到文件名的版本号后面.例如,如果你想要构建两个单独的构件成 JAR , 一个使用Java 1.4编译器 , 另一个使用Java 6编译器 , 你就可以使用分类器来生成两个单独的JAR构件	
		|- scope：依赖范围 . 在项目发布过程中 , 帮助决定哪些构件被包括进来 . 欲知详情请参考依赖机制 . - compile ：默认范围 , 用于编译 - provided：类似于编译 , 但支持你期待jdk或者容器提供 , 类似于classpath- runtime: 在执行时需要使用 - test: 用于test任务时使用 - system: 需要外在提供相应的元素 . 通过systemPath来取得 - systemPath: 仅用于范围为system . 提供相应的路径 - optional: 当项目自身被依赖时 , 标注依赖是否传递 . 用于连续依赖时使用
		|- systemPath：仅供system范围使用 . 注意 , 不鼓励使用这个元素 , 并且在新的版本中该元素可能被覆盖掉 . 该元素为依赖规定了文件系统上的路径 . 需要绝对路径而不是相对路径 . 推荐使用属性匹配绝对路径 , 例如${java.home}
		exclusions：当计算传递依赖时 , 从依赖构件列表里 , 列出被排除的依赖构件集 . 即告诉maven你只依赖指定的项目 , 不依赖项目的依赖 . 此元素主要用于解决版本冲突问题
			|- exclusion：
				|- artifactId：
				|- groupId：
		|- optional：可选依赖 , 如果你在项目B中把C依赖声明为可选 , 你就需要在依赖于B的项目（例如项目A）中显式的引用对C的依赖.可选依赖阻断依赖的传递性		
```

  

### reports

```xml
<reports></reports>
```

reports：不赞成使用. 现在Maven忽略该元素

  

### reporting

```xml
<reporting>
	<excludeDefaults></excludeDefaults>
	<outputDirectory></outputDirectory>
	<plugins>
		<plugin>
			<groupId></groupId>
			<artifactId></artifactId>
			<version></version>
			<inherited></inherited>
			<configuration></configuration>
			<reportSets>
				<reportSet>
					<id></id>
					<configuration></configuration>
					<inherited></inherited>
					<reports></reports>
				</reportSet>
			</reportSets>
		</plugin>
	</plugins>
</reporting>
```

```
|- reporting：该元素描述使用报表插件产生报表的规范 . 当用户执行“mvn site” , 这些报表就会运行 . 在页面导航栏能看到所有报表的链接
	|- excludeDefaults：true , 则 , 网站不包括默认的报表 . 这包括“项目信息”菜单中的报表
	|- outputDirectory：所有产生的报表存放到哪里 . 默认值是${project.build.directory}/site
	|- plugins：使用的报表插件和他们的配置
		|- plugin：	plugin元素包含描述报表插件需要的信息	
			|- groupId：报表插件在仓库里的group ID
			|- artifactId：报表插件在仓库里的artifact ID
			|- version：被使用的报表插件的版本（或版本范围）
			|- inherited：任何配置是否被传播到子项目
			|- configuration：报表插件的配置
			|- reportSets： 一组报表的多重规范 , 每个规范可能有不同的配置 . 一个规范（报表集）对应一个执行目标 . 例如 , 有1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9个报表 . 1 , 2 , 5构成A报表集 , 对应一个执行目标 . 2 , 5 , 8构成B报表集 ,对应另一个执行目标
				|- reportSet：	表示报表的一个集合 , 以及产生该集合的配置
					|- id：报表集合的唯一标识符 , POM继承时用到
					|- configuration：产生报表集合时 , 被使用的报表的配置
					|- inherited：配置是否被继承到子POMs
					|- reports：这个集合里使用到哪些报表
```

  

### dependencyManagement

```xml
<dependencyManagement>
	<dependencies>
		<dependency>
		</dependency>
	</dependencies>
</dependencyManagement>
```

```
|- dependencyManagement：参见dependencyManagement元素
	|- dependencies：
		|- dependency：参见dependencies/dependency元素
```

  

### distributionManagement

```xml
<distributionManagement>
	<repository>
		<uniqueVersion></uniqueVersion>
		<id>banseon-maven2</id>
		<name>banseon maven2</name>
		<url>file://${basedir}/target/deploy</url>
		<layout></layout>
	</repository>
	<snapshotRepository>
		<uniqueVersion></uniqueVersion>
		<id>banseon-maven2</id>
		<name>Banseon-maven2 Snapshot Repository</name>
		<url>scp://svn.baidu.com/banseon:/usr/local/maven-snapshot</url>
		<layout></layout>
	</snapshotRepository>
	<site>
		<id>banseon-site</id>
		<name>business api website</name>
		<url>scp://svn.baidu.com/banseon:/var/www/localhost/banseon-web</url>
	</site>
	<downloadUrl></downloadUrl>
	<relocation>
		<groupId></groupId>
		<artifactId></artifactId>
		<version></version>
		<message></message>
	</relocation>
	<status></status>
</distributionManagement>
```

```
|- distributionManagement：项目分发信息 , 在执行mvn deploy后表示要发布的位置 . 有了这些信息就可以把网站部署到远程服务器或者把构件部署到远程仓库 
	|- repository：部署项目产生的构件到远程仓库需要的信息
		|- uniqueVersion：是分配给快照一个唯一的版本号（由时间戳和构建流水号）？还是每次都使用相同的版本号？参见：epositories/repository元素
		|- id：
		|- name：
		|- url：
		|- layout：
	|- snapshotRepository：构件的快照部署到哪里？如果没有配置该元素 , 默认部署到repository元素配置的仓库 , 参见：distributionManagement/repository元素
		|- uniqueVersion：
		|- id：
		|- name：
		|- url：
		|- layout：
	|- site：部署项目的网站需要的信息
		|- id：部署位置的唯一标识符 , 用来匹配站点和settings.xml文件里的配置
		|- name：部署位置的名称
		|- url：部署位置的URL , 按protocol://hostname/path形式
	|- downloadUrl：项目下载页面的URL . 如果没有该元素 , 用户应该参考主页 . 使用该元素的原因是：帮助定位那些不在仓库里的构件（由于license限制）
	|- relocation：如果构件有了新的group ID和artifact ID（构件移到了新的位置） , 这里列出构件的重定位信息
		|- groupId：构件新的group ID
		|- artifactId：构件新的artifact ID
		|- version：构件新的版本号
		|- message：显示给用户的 , 关于移动的额外信息 , 例如原因
	|- status：给出该构件在远程仓库的状态 . 不得在本地项目中设置该元素 , 因为这是工具自动更新的 . 有效的值有：none（默认）, converted（仓库管理员从 Maven 1 POM转换过来） , partner（直接从伙伴Maven 2仓库同步过来）, 	deployed（从Maven 2实例部 署）, verified（被核实时正确的和最终的）
```

  

### properties

```xml
<properties>
	<version1>1.0</version1>
	<version2>2.0</version2>
</properties>
```

```
|- properties：以值替代名称 , Properties可以在整个POM中使用 , 也可以作为触发条件（见settings.xml配置文件里activation元素的说明）. 格式是<name>value</name> 
	|- version1：版本号
```