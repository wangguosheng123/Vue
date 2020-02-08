[Ant Design of Vue](http://vue.ant-design.cn/docs/vue/introduce-cn/)

# 1. 安装脚手架工具

### 前提： 安装了 node.js 首先： 全局安装 vue-cli

`npm install -g @vue/cli （-g代表全局安装）`

### 2 创建一个项目

`vue create antd-demo`

###### antd-demo 是项目名称

### 3 进入我们创建的项目

`cd antd-demo`

### 4 执行以下命令可预览刚刚创建的新项目(可以在 package.json 中修改启动命令)

`npm run serve`

#### 至此创建新项目完成

# 这是 Vue-cli2 在本地模拟请求数据（此处并没有完成）

### 第一步：安装插件

`npm install vue-resource --save`

### 第二步：读取本地 json 数据

###### 在 webpack.dev.conf.js 配置

```c
// 读取本地json数据
const express = require("express");
const app = express(); //请求server

var banner = require("../static/mock/banner.json"); // 加载本地数据文件
var rexiao = require("../static/mock/rexiao.json"); //加载本地数据文件
var txu = require("../static/mock/txu.json"); //加载本地数据文件
var liebiao = require("../static/mock/liebiao.json"); //加载本地数据文件
var goods = require("../static/mock/goods.json"); //加载本地数据文件

var apiRoutes = express.Router();
app.use("/api", apiRoutes); //通过路由请求数据
```

### 第三步：进行后台数据模拟

###### 在 devServer 里面添加

```c
  // 进行后台数据模拟
    before(app) {
      app.get("/api/banner", (req, res) => {
        res.json({
          errno: 0,
          data: banner
        });
      }), // 接口返回json数据，上面配置的数据seller就赋值给data请求后调用
        app.get("/api/rexiao", (req, res) => {
          res.json({
            errno: 0,
            data: rexiao
          });
        });

      app.get("/api/txu", (req, res) => {
        res.json({
          errno: 0,
          data: txu
        });
      });

      app.get("/api/liebiao", (req, res) => {
        res.json({
          errno: 0,
          data: liebiao
        });
      });
      app.get("/api/goods", (req, res) => {
        res.json({
          errno: 0,
          data: goods
        });
      });
    }
```

### 第四步：在 vue 文件中使用 axios 请求 json 数据

`nnpm install axios --save // 使用axios发送请求`

### 第五步：main.js 文件中

```c
import axios from 'axios'; // 消息请求
Vue.prototype.$http = axios; // 将axios挂载到Vue实例中的$http 上面
```

### 第六步：vue 文件中请求

```c
 // 这里是加载周期函数，一旦加载我就去请求数据
  mounted() {
    //首页组件加载完毕后开始请求轮播图数据，去请求热门商品列表
    this.$http.get("./api/banner").then(({ data }) => {
      //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
      this.bannerList = data.data.list;
      console.log(data.data.list);
    }),
      this.$http.get("./api/rexiao").then(({ data }) => {
        //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
        this.rexiaoList = data.data.list;
      }),
      this.$http.get("./api/txu").then(({ data }) => {
        //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
        this.txuList = data.data.list;
      }),
  }
```

[各种资料](https://blog.csdn.net/weixin_43453221)

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
```
