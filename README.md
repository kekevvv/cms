# 社团管理系统
**[效果展示](http://note.youdao.com/s/HIdMYdV7)**

## 技术栈
```
Node.js(Express)
Vue.js
Vue CLI3
Element-UI
MongoDB
```
## 前端功能
页面分为前台展示页面跟后台管理页面，系统的角色如下：
- 普通学生/社员：在前台页面查看自己所在的社团，浏览其他信息
- 社长：在后台管理页面实现自己负责的社团的管理
- 社联管理员：在后台管理页面实现社团、公告、用户和论坛管理
### 前台展示页面
- 1.论坛
- [x] 浏览主题
- [x] 回复主题
- [x] 发表主题
- 2.社团
- [x] 申请加入社团
- [x] 查看申请
- [x] 创建社团
- [x] 查看社团列表
- 3.用户
- [x] 查看个人信息
- [x] 更改个人信息
- [x] 修改密码
- [x] 登录
- [x] 注册
- [x] 退出登录
### 后台管理页面
- 1.社团管理
- [x] 查看社团
- [x] 搜索社团
- [x] 删除社团
- 2.公告管理
- [x] 添加公告
- [x] 编辑公告
- [x] 删除社团
- 3.用户管理
- [x] 添加用户
- [x] 搜索用户
- [x] 删除用户
- 4.论坛管理
- [x] 查看主题
- [x] 回复主题
- [x] 删除主题
## 后端功能
- 1.前台展示页面
- [x] 接口 - 获取资源列表
- [x] 接口 - 获取资源详情
- [x] 接口 - 删除资源
- [x] 接口 - 更新资源
- [x] 接口 - 添加资源
- [x] 接口 - 回复主题
- [x] 接口 - 申请加入社团
- [x] 接口 - 查看社团申请
- [x] 接口 - 注册
- [x] 接口 - 修改密码
- [x] 接口 - 登录
- 2.后台管理页面
- [x] 封装 - token 验证中间件
- [x] 接口 - 获取资源列表
- [x] 接口 - 获取资源详情
- [x] 接口 - 删除资源
- [x] 接口 - 更新资源
- [x] 接口 - 添加资源
- [x] 接口 - 创建新的社团
- [x] 接口 - 踢出社团成员
- [x] 接口 - 同意学生加入社团
- [x] 接口 - 回复主题
