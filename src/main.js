// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./tool/filter";

import axios from "axios"; // 消息请求
Vue.prototype.$http = axios; // 将axios挂载到Vue实例中的$http 上面

Vue.config.productionTip = false;

import VueAwesomeSwiper from "vue-awesome-swiper";
// require styles
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default global options } */);
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
