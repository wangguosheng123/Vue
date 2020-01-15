import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home";
import Enter from "@/components/Enter";
import Login from "../pages/Login";
import Zhuce from "../pages/Zhuce";
import Goods from "../pages/Goods";
import Detail from "../pages/Detail";
import ShopCar from "../pages/ShopCar";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "h" },
      component: Enter,
      children: [
        { path: "home", component: Home, name: "h" },
        { path: "login", component: Login, name: "l" },
        { path: "zhuce", component: Zhuce, name: "z" },
        { path: "goods", component: Goods, name: "g" },
        { path: "detail/:goodsid", component: Detail, name: "d" },
        { path: "shopCar", component: ShopCar, name: "sc" }
      ]
    }
  ]
});
