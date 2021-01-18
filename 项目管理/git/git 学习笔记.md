# git 学习笔记

## 相关信息

> 文档：https://www.runoob.com/git/git-install-setup.html
>
> github: https://github.com/haveadate
>
> 码云：https://gitee.com/haveadate
>
> email：haveadate@qq.com

## 说明

> 值得注意的是，某些名字叙述不太准确，可能会影响理解，在此进行总结说明：
>
> - fileName：文件名（包含后缀）；

## 基本操作

### 基本概念

<img src="https://www.runoob.com/wp-content/uploads/2015/02/1352126739_7909.jpg" alt="img" style="zoom:80%;" />

<img src="https://www.runoob.com/wp-content/uploads/2015/02/git-command.jpg" alt="img"  />

> **说明：**
>
> - workspace：工作区，也就是本地仓库根目录下除了 .git 目录以外的所有文件/目录；
> - staging area：暂存区/缓存区，英文叫 stage 或 index；一般存放在 **.git** 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）；
> - 版本库：工作区有一个隐藏目录 **.git**，这个不算工作区，而是 Git 的版本库；
> - local repository：本地仓库，存储于版本库也就是 .git 目录中，只不过存储形式不同于以往，例如编码方式变成了 ANSI（即扩展的 ASCII 编码）；
> - remote repository：远程仓库，例如 github、gitee，也可以自行搭建远程 git 服务器；

### 最常用

```shell
# 初始化本地仓库【这个一般在远程直接创建再 git clone 即可，不用自己创建】
$ git init

# 将当前目录下所有文件/目录添加到缓存区，也可以通过 git add fileName 添加指定文件 √
$ git add .

# 将暂存区内容添加到本地仓库中
$ git commit -m 'commit message write here'

# 将本地仓库内容更新到远程仓库，最常用的是 github、gitee，也可以自己搭建
$ git push
```

### 创建仓库

#### git init

```shell
# 以当前目录为根目录创建本地仓库
$ git init
# 以当前目录下某一子目录为根目录创建本地仓库，若没有该目录，则会自动创建
$ git init subDirName
```

#### git clone

```shell
# 将远程仓库复制到当前目录下，注意当前目录 不是 仓库的根目录，子目录才是
$ git clone remoteRepUrl
# 将远程仓库复制到当前目录下并修改仓库名称，子目录为根目录
$ git clone remoteRepUrl updatedRepName
```

**注意**：git clone 时，可以所用不同的协议，包括 ssh, git, https 等，其中最常用的是 ssh，因为速度较快，还可以配置公钥免输入密码。各种写法如下：

```shell
$ git clone git@github.com:fsliurujie/test.git         --SSH协议
$ git clone git://github.com/fsliurujie/test.git       --GIT协议
$ git clone https://github.com/fsliurujie/test.git     --HTTPS协议
```

### 提交与修改

```shell
# 将文件添加至缓存区
$ git add fileName
# 将当前目录下所有文件&目录提交至缓存区
$ git add .

# 查看仓库当前的状态，显示有变更的文件
$ git status

# 比较文件的不同，即缓存区和工作区的差异[当缓存区有文件 A，而工作区删除了文件 A 时，才会有所体现]
$ git diff
```

`git diff` 实例：缓存区存在 demo.txt，工作区将其删除：

```shell
D:\Programming\git\demo>git diff
diff --git a/demo.txt b/demo.txt
deleted file mode 100644
index d800886..0000000
--- a/demo.txt
+++ /dev/null
@@ -1 +0,0 @@
-123
\ No newline at end of file
```

```shell
# 将缓存区中的文件提交至本地仓库
$ git commit -m 'commit message'

# 删除工作区、缓存区指定文件，本地仓库不变
$ git rm fileName
# 删除缓存区指定文件，工作区不变
$ git rm --cached fileName

# 暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响
$ git reset HEAD fileName

# 将暂存区指定文件/全部文件替换工作区的文件，这个操作需要谨慎，因为会直接清除工作区中未添加到缓存区的改动
$ git checkout fileName/.
# 将 HEAD 指向的 master 分支(本地仓库)中的指定文件/全部文件替换缓存区、工作区中的文件，这个操作需要谨慎，因为不但会清除工作区中未提交的改动，也会清除缓存区中未提交的改动
$ git checkout HEAD fileName/.

# git mv 命令用于移动或重命名一个文件、目录或软连接 [被修改的文件/目录必须事前提交]
# 重命名文件/目录
$ git mv fileName/dirName newFileName/newDirName
# 移动文件/目录
$ git mv fileName/dirName newPath
```

> **注意：**
>
> - 在 git 中，很多地方，例如提交文件， 可以指定某一文件(包含后缀名)，也可以使用 `.` 指代当前目录所有文件和目录；
> - HEAD：指向本地仓库 master  分支；

### 分支管理

```shell
# 创建分支: 分支内容和创建时主分支内容保持一致
$ git branch branchName
# 将添加本地分支至远程(上传本地新创建的分支)
$ git push --set-upstream origin branchName

# 切换分支
$ git checkout branchName

# 列出本地仓库中所有分支
$ git branch

# 快速创建分支并切换到该分支下
$ git checkout -b branchName

# 删除分支
$ git branch -d branchName
# 删除远程分支
$ git push origin --delete branchName
```

> ```shell
> # 这句应该可要可不要
> $ git status -s
> # 使用 git add fileName 告诉 git，文件冲突已解决
> $ git add fileName
> $ git status -s
> $ git commit
> ```
>
> **分支合并详解：**
>
> ​		在合并分支时，不仅仅是 `git merge branchName` 这么简单，比较复杂的是解决分支冲突（**注意**：合并分支以后，被合并的子分支仍然存在）：
>
> ​		首先，从创建分支角度来说，子分支的内容（**工作区、缓存区、本地仓库**）默认和子分支时主分支内容**完全相同**，所以在创建子分支时，主分支的若没有提交内容，子分支同样也没有提交；当子分支内容发生改变，主分支在创建子分支以后又修改了内容，合并分支时会出现冲突。默认地，git 自动将冲突内容进行了特殊的标注，解决冲突的方式是直接修改标注后的内容，然后用命令行告诉 git 已解决冲突即可，详细过程如下【主分支初始化 temp 文件并赋初始值 123，提交至本地仓库 -> 创建子分支，修改 temp 文件内容为 456，并提交至本地仓库 -> 主分支再修改 temp 内容为 789，并提交至本地仓库 -> 将子分支合并到主分支 -> 解决合并冲突】：

![分支合并](https://img2020.cnblogs.com/blog/1622292/202101/1622292-20210112113811929-292862141.png)

### 查看提交历史

```shell
# 查看历史提交记录
$ git log
# 使用 --oneline 选项查看历史记录的简洁版本
$ git log --oneline
# 使用 --graph 选项，查看历史中什么时候出现分支、合并，以拓扑图的方式展示
$ git log --graph
# 使用 --reverse 选项，逆向显示所有日志
$ git log --reverse


# 以列表形式查看指定文件的修改记录
$ git blame fileName
```

> **注意：**
>
> - 对于使用 `git log` 查看历史记录时，直接按 `Q` 键退出；
> - **git log** 各选项可以一起使用，以**空格**分隔；
> - 对于 `git log` 选项远不止上述陈列情况，具体的，参照：http://git-scm.com/docs/git-log；

### 标签（版本号）

#### 本地操作

```shell
# 创建一个带注解的标签，与不使用 -a 选项相比，使用之后记录信息更加详细，推荐使用
# 执行命令后，会打开编辑器，说明此注解，就像编辑文件一样操作
$ git tag -a v1.0
# 创建一个标签，不进入编辑页面，直接设置注解
$ git tag -a v1.0 -m "版本注解信息"


# --decorate 选项：查看历史记录的同时，附带标签
$ git log --decorate

# 若忘记添加标签，可以补加
$ git tag -a v1.0 hashVal(eg:e061b13)

# 查看添加的所有标签
$ git tag
# 删除标签
$ git tag -d v1.0

# 查看标签信息
$ git show v1.0
```

> **注意：**
>
> - hashVal 来自 `git log` 产生历史记录中；
> - `v1.0` 只是一个示例，运用时需要根据具体情况；

#### 远程操作

​		通过实践发现：尽管本地已经创建标签(tag)，但是直接提交本地仓库文件至远程，并不会直接将标签信息同步到远程，需要单独用命令操作

```shell
# 推送指定本地 tag 到远程仓库
$ git push origin tagVersion
# 推送所有本地 tag 到远程仓库
$ git push origin --tags
```

> 更多 tag 操作参考博客：https://blog.csdn.net/wei371522/article/details/83186077

### 命令行操作文件

```shell
# windows 查看当前目录下所有文件 
$ dir
# linux 查看当前目录下所有文件 
$ ls
# linux 创建文件
$ touch fileName
# linux 修改文件
$ vim fileName
# linux 查看文件内容
$ cat fileName
# linux 查看文件前 n 行内容
$ head -n fileName
```

> **修改文件简单介绍：**
>
> 1. 通过 `vim fileName` 进入编辑界面；
> 2. 按下键盘 `I` 键，进入编辑模式；
> 3. 编辑完成后，先按 `ESC` 键，再连续按压 `Z` 键两下(**大写状态**)，退出并保存文件；

###  远程仓库

> **具体的请查看菜鸟教程，此处不再赘述：**
>
> - **github：**https://www.runoob.com/git/git-remote-repo.html
> - **gitee：**https://www.runoob.com/git/git-gitee.html

### 忽略特定文件/文件夹(.gitignore)

> 在提交文件至远程仓库时，有些文件我们并不希望提交，例如 Node  中的 `node_modules` 文件夹，不仅十分耗时，而且没有必要，所以需要配置 `.gitignore` 文件。正如名称所言，git 能忽略指定的文件夹、文件。

```shell
# 排除所有的 . 开头的隐藏文件
.*

# 排除所有的 .class 文件
*.class

# 不排除 .gitignore 和 App.class
!.gitignore
!.App.class

# 排除 node_modules 目录
node_modules
```

> **注意：**以上内容就是 `.gitignore` 文件的内容。