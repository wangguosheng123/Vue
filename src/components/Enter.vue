<template>
  <div>
    <div class="tuo">
      <dl>
        <dd v-if="token === null"><a href="./#/login">登录</a></dd>
        <dt v-else>{{ token }}<a href="" @click="tuichudenglv">退出登录</a></dt>
        <dd><a href="./#/zhuce">注册</a></dd>
        <dt><a href="./#/shopcar">我的购物车</a></dt>
        <dt><a href="./#/home">你好，欢迎光临凡客诚品</a></dt>
        <!-- <router-link tag="li" v-for="top in tops" :to="{name:top.name}">
                {{top.text}}
            </router-link> -->
      </dl>
    </div>
    <Nav> </Nav>
    <router-view />
    <!-- 这是为导航开辟一个新的空间来放置导航 -->
  </div>

  <!-- 实际上就是先是导航导入到入口文件，入口文件又导入到路由中的重定向中 -->
</template>

<script>
import Nav from './Nav';
export default {
  name: 'Enter',
  // 首页要要用导航组件，就一定要注册导航组件
  components: { Nav },
  data() {
    return {
      token: null
    };
  },
  methods: {
    tuichudenglv() {
      localStorage.removeItem('token'); //删除指定的本地存储值
      alert('退出登录成功，即将回到主页');
    }
  },
  mounted() {
    let token = localStorage.getItem('token');
    this.token = token;
    console.log(this.token);
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tuo {
  overflow: hidden;
  width: 100%;
  background-color: #ddd;
}

dl {
  height: 30px;
  width: 1200px;
  margin: auto;
  line-height: 30px;
  font-size: 12px;
  float: right;
}
dt {
  width: 140px;
  height: 30px;
  float: right;
  text-align: center;
}
dd {
  width: 40px;
  height: 30px;
  float: right;
  text-align: center;
}
</style>
