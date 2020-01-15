<template>
  <div>
    <div id="guanyu">
      <ul id="kefu">
        <li>
          <a href=""><img id="kefu1" :src="img1"/></a>
          <a href="">
            <p id="p1">7*9小时在线客服</p>
          </a>
        </li>
        <li>
          <a href=""><img id="kefu2" :src="img2"/></a>
          <a href="">
            <p>7天内退货</p>
          </a>
          <a href="">
            <p>购物满199元免运费</p>
          </a>
        </li>
        <li>
          <a href=""><img id="kefu3" :src="img3"/></a>
          <a href="">
            <p>下载凡客客户端</p>
          </a>
        </li>
      </ul>
      <ul id="guanYuFanKe">
        <li><a href="">关于凡客</a></li>
        <li><a href="">新手指南</a></li>
        <li><a href="">配送范围及时间</a></li>
        <li><a href="">支付方式</a></li>
        <li><a href="">售后服务</a></li>
        <li><a href="">帮助中心</a></li>
      </ul>
    </div>
    <!-- 、、、、关于公司和服务的结束 -->

    <!-- 首页的的底部开始 -->
    <div id="bottom">
      <p>
        Copyright 2007 - 2018 vancl.com All Rights Reserved 京ICP证100557号
        京公网安备11011502002400号 出版物经营许可证新出发京批字第直110138号
        凡客诚品（北京）科技有限公司
      </p>
      <ul id="chengxing">
        <li>
          <a href=""><img :src="img4"/></a>
        </li>
        <li>
          <a href=""><img :src="img5"/></a>
        </li>
        <li>
          <a href=""><img :src="img6"/></a>
        </li>
        <li>
          <a href=""><img :src="img7"/></a>
        </li>
        <li>
          <a href=""><img :src="img8"/></a>
        </li>
      </ul>
    </div>
    <!-- /////底部结束 -->

    <!-- 、、、、固定定位 -->
    <ul id="ding">
      <li>
        <a href=""><img :src="img9"/></a>
        <P>下载APP</P>
      </li>
      <li>
        <a href=""><img :src="img10"/></a>
        <P>在线客服</P>
      </li>
      <li>
        <a href=""><img :src="img11"/></a>
        <P>回顶部</P>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Foot",
  // 这是动态的数据模型，也是要注入到上面引入的html的样式中间去，这故意使用js和模版样式分离，这里最后导入到入口文件Entry中去了
  data() {
    return {
      img1: require("../assets/img/kefu1.png"),
      img2: require("../assets/img/kefu2.png"),
      img3: require("../assets/img/APP.png"),
      img4: require("../assets/img/1.png"),
      img5: require("../assets/img/2.jpg"),
      img6: require("../assets/img/3.png"),
      img7: require("../assets/img/4.jpg"),
      img8: require("../assets/img/5.jpg"),
      img9: require("../assets/img/app1.png"),
      img10: require("../assets/img/app2.png"),
      img11: require("../assets/img/app3.png")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#guanyu {
  border: 1px solid #eee6ee;
  overflow: hidden;
  width: 1210px;
  margin: 5px auto;
}
#kefu {
  overflow: hidden;
}

#kefu li {
  width: 400px;
  height: 200px;
  float: left;
  border-right: 1px solid #eee6ee;
}
#kefu li:nth-child(3) {
  border-right: 0px solid #fff;
}
#kefu p {
  width: 150px;
  height: 20px;
  margin: auto;
  text-align: center;
  line-height: 20px;
  color: #000;
}
#kefu1 {
  margin: 50px 180px;
  width: 42px;
  height: 42px;
}
#p1 {
  width: 200px;
  height: 40px;
  margin: auto;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  color: #fff;
}
#kefu2 {
  margin: 50px 180px;
  width: 42px;
  height: 42px;
}

#kefu3 {
  margin: 30px 140px;
  width: 100px;
  height: 100px;
}
#guanYuFanKe {
  width: 1200px;
  margin: auto;
  height: 60px;
  background-color: rgb(124, 116, 116);
  overflow: hidden;
}
#guanYuFanKe li {
  float: left;
  width: 190px;
  height: 20px;
  margin: 20px 0;
  border-right: 1px solid #000;
  text-align: center;
  line-height: 20px;
}
#guanYuFanKe li a {
  color: #fff;
}
#guanYuFanKe li:nth-child(6) {
  border-right: 0px solid #fff;
}
/* 、、、、、关于公司和服务结束 */

/* /////底部开始 */
#bottom {
  height: 170px;
  width: 1200px;
  margin: auto;
  border: 1px solid #000;
  overflow: hidden;
}
#bottom p {
  height: 20px;
  width: 900px;
  margin: 10px auto;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
}
#chengxing {
  width: 700px;
  height: 50px;
  margin: auto;
}
#bottom li {
  height: 50px;
  margin-top: 50px;
  margin-left: 20px;
  width: 100px;
  float: left;
}
/* 、、、、底部结束 */

/* 、、、、固定定位 */
#ding {
  width: 70px;
  height: 210px;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
#ding li {
  width: 70px;
  height: 70px;
  text-align: center;
  border: 1px solid red;
  p {
    font-size: 12px;
  }
}
#ding li img {
  width: 50px;
  height: 50px;
}
#ding li:nth-child(3) {
  background-color: red;
  color: #fff;
}
/* /////固定定位完成 */
</style>
