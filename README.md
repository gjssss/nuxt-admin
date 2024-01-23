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

## API

### Server

#### withPagination

函数签名

```ts
function withPagination<T extends MySqlTable<TableConfig>>(table: T, option?: {
    select?: SelectedFields;
    where?: SQL | boolean | string[];
}): Promise<{
    data result[],
    totalCount: number,
    page: number,
    pageSize: number,
  }>
```

相关Drizzle ORM链接

- [select]([Drizzle ORM - Select](https://orm.drizzle.team/docs/select))

- [where]([Drizzle ORM - Select](https://orm.drizzle.team/docs/select#filtering))

当where为**SQL**类型可按照文档中过滤，如获取学生年龄等于18岁的记录。

```ts
await withPagination(student,{
  where: eq(student.age, 18)
})
```

当where为**string[]**时将自动获取URL query来过滤对应列，如访问`/info?page=1&pageSize=10&age=20&sex=男`时，会自动获取年龄为20岁男性的学生记录。

```ts
await withPagination(student, {
  where: ['age', 'sex'],
})
```

当where为**true**时将自动根据URL query来查询所有匹配的列，如访问`/info?page=1&pageSize=10&age=20&foo=bar`时，将查询年龄为20岁的学生记录。

```ts
await withPagination(student, {
  where: true,
})
```

注意后面两个方式只能判断数值相等的情况，并且由于根据URL query来生成，具有一定的安全隐患，如发现问题请提交Issue。
