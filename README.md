# 快速构建 Vue 项目

### 1 前提： 安装了 node.js 首先： 全局安装 vue-cli

`npm intsall vue-cli -g （-g代表全局安装）`

### 2 使用 Vue 初始化基于 webpack 的新项目

`vue init webpack my-project`

###### my-project 是项目名称

### 3 进入我们创建的项目

`cd my-boject`

### 4，开始安装模块

`cnpm intsall`

### 5,模块安装完成后，执行以下命令可预览刚刚创建的新项目

`npm run dev`

#### 至此 使用 Vue-cli 脚手架创建新项目完成

# 这是 Vue-cli2 在本地模拟请求数据

### 第一步：安装插件

`npm install vue-resource --save`

### 第二步：读取本地 json 数据

###### 在 webpack.dev.conf.js 配置

`const express = require("express"); const app = express(); //请求 server的依赖 var banner = require("../static/mock/banner.json"); // 加载本地数据文件 var rexiao = require("../static/mock/rexiao.json"); //加载本地数据文件 var txu = require("../static/mock/txu.json"); //加载本地数据文件 var liebiao = require("../static/mock/liebiao.json"); //加载本地数据文件 var goods = require("../static/mock/goods.json"); //加载本地数据文件var apiRoutes = express.Router(); app.use("/api", apiRoutes); //通过路由请求数据`

### 第三步：进行后台数据模拟

###### 在 devServer 里面添加

`// 进行后台数据模拟 before(app) {app.get("/api/banner", (req, res) => { res.json({errno: 0,data: banner});}), // 接口返回 json 数据，上面配置的数据 seller 就赋值给 data 请求后调用app.get("/api/rexiao", (req, res) => {res.json({ errno: 0,data: rexiao});});app.get("/api/txu", (req, res) => {res.json({ errno: 0,data: txu});});app.get("/api/liebiao", (req, res) => {res.json({ errno: 0,data: liebiao});});app.get("/api/goods", (req, res) => {res.json({errno: 0,data: goods}); });}`

### 第四步：在 vue 文件中使用 axios 请求 json 数据

`nnpm install axios --save // 使用axios发送请求`

### 第五步：main.js 文件中

`import axios from 'axios'; // 消息请求 Vue.prototype.$http = axios; // 将axios挂载到Vue实例中的$http 上面`

### 第六步：vue 文件中请求

`mounted() { //首页组件加载完毕后开始请求轮播图数据，去请求热门商品列表 this.$http.get("./api/banner").then(({ data }) => { //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处 this.bannerList = data.data.list; console.log(data.data.list); }), this.$http.get("./api/rexiao").then(({ data }) => { //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处 this.rexiaoList = data.data.list; }), this.$http.get("./api/txu").then(({ data }) => { //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处 this.txuList = data.data.list; }), }`

[超链接名](https://www.jianshu.com/p/2cce20ba11c8)

# my_vuepro

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
