# Nuxt Admin

这个是一个使用Nuxt开发的全栈后台项目

[演示地址](https://nuxt-admin.hellogjs.top/)

测试账号：admin

测试密码：123123

## 思想

致力于提高开发者**开发体验** (DX)，使用简单的配置就可以完成大多数常见业务。

## 模块介绍

### 数据库

#### 介绍

目前可使用的数据库有 `mysql`

数据库配置通过环境变量 `DB_URL`，示例：`mysql://root:123123123@localhost:3306/test`

添加表模型方式：

* 在`server/db`中添加模型，新建文件如`test.ts`，添加Drizzle ORM表模型
  ```ts
  import { date, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

  export const test = mysqlTable('test', {
    id: serial('id').primaryKey(),
    date: date('date'),
    name: varchar('name', { length: 256 }),
    address: varchar('address', { length: 256 }),
  })
  ```

* 在`server/db/index.ts`中导出
  ```ts
  export * from './user'
  ```

#### API

* `useDB`

    使用`const db = await useDB()`获取到数据库，使用方法具体参考Drizzle ORM文档

* `Tables` type

    使用`import type { Tables } from './useQ'`导入，用于获取所有表的名称

#### 实现

数据库使用Drizzle ORM实现，再`useDB`中使用单例模式连接数据库

### 登录和权限

#### 实现

后端：使用`jwt`库和环境变量`NUXT_SECRET`生成Token，在login.post接口中setCookie添加到Cookie中。添加Middleware `1.auth.ts` 验证Token并且将信息附加到`event.context.info`中。

前端：在服务端渲染时，首先会重定向到登录页面判断登录状态，在登录页面通过请求`whoami`接口来验证是否是有效Token。
