<template>
  <div>
    <Banner :list="bannerList" />
    <dl id="miaosha">
      <dt><img :src="img" alt="" />每日秒杀</dt>
      <dd>羽绒服每个id限购一件</dd>
      <dd>
        秒杀即将开始，距离开始还有
        <span id="showtime">{{ day }}天{{ hr }}小时{{ min }}分{{ sec }}秒</span>
      </dd>
    </dl>
    <ul class="rexiao-list">
      <router-link
        v-for="(list, index) in rexiaoList"
        tag="li"
        :key="index"
        :to="{ name: 'd', params: { goodsid: list.goodsID } }"
      >
        <div class="img-box">
          <img :src="list.src" />
        </div>
        <div class=" content">
          <p class="p1">{{ list.goodsname }}</p>
          <p class="p2">{{ list.price | cny }}</p>
          <p class="p3">{{ list.newprice | cny }}</p>
        </div>
      </router-link>
    </ul>
    <div class="txu">T恤上新</div>

    <ul class="txu-list clr">
      <router-link
        v-for="(list, index) in txuList"
        tag="li"
        :key="index"
        :to="{ name: 'd', params: { goodsid: list.goodsID } }"
      >
        <div class="img-box">
          <img :src="list.src" />
        </div>
      </router-link>
    </ul>
    <Foot />
  </div>
</template>

<script>
// 这里是引入ajax的第三方模块，这个更简单一些
// import axios from "axios";
//这里是引用Banner的组件，也就是轮播的的组件 ，这里采用的默认的导入方式

import Banner from '../../components/Banner';
import Foot from '../../components/Foot';

import imgurl from '../../assets/img/1.png';

import banner from '../../assets/img/banner.jpg';
// 这里还是默认的导出方式
export default {
  name: 'Home',
  // 首页要要用轮播组件，就一定要注册轮播组件
  components: { Banner, Foot },
  // 这里的数据模型就是一个空的，等着ajax请求返回来的数据来填充数据模型，这里有两个数据模型，一个是轮播图的，一个是商品列表的
  data() {
    return {
      bannerList: [
        {
          goodsID: '00001',
          banner: banner
        }
      ],
      rexiaoList: [],
      txuList: [],
      day: 0,
      hr: 0,
      min: 0,
      sec: 0,
      img: imgurl
    };
  },

  methods: {
    countdown: function() {
      let end = Date.parse(new Date('2020-01-24'));
      let now = Date.parse(new Date());
      let msec = end - now;
      let day = parseInt(msec / 1000 / 60 / 60 / 24);
      let hr = parseInt((msec / 1000 / 60 / 60) % 24);
      let min = parseInt((msec / 1000 / 60) % 60);
      let sec = parseInt((msec / 1000) % 60);
      this.day = day;
      this.hr = hr > 9 ? hr : '0' + hr;
      this.min = min > 9 ? min : '0' + min;
      this.sec = sec > 9 ? sec : '0' + sec;
      let that = this;
      setTimeout(function() {
        that.countdown();
      }, 1000);
    }
  },

  // 这里是加载周期函数，一旦加载我就去请求数据
  mounted() {
    //首页组件加载完毕后开始请求轮播图数据，去请求热门商品列表
    this.$http.get('./api/banner').then(({ data }) => {
      //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
      this.bannerList = data.data.list;
      console.log(data.data.list);
    }),
      this.$http.get('./api/rexiao').then(({ data }) => {
        //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
        this.rexiaoList = data.data.list;
      }),
      this.$http.get('./api/txu').then(({ data }) => {
        //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
        this.txuList = data.data.list;
      }),
      this.countdown();
  }
};
</script>
<style scoped lang="less">
#miaosha {
  // width: 1200px;
  margin: auto;
  background-color: red;
  border: 3px solid #fff;
  overflow: hidden;
}
#miaosha dt {
  width: 200px;
  height: 80px;
  font-size: 24px;
  line-height: 80px;
  text-align: center;
  color: #fff;
  float: left;
}
#miaosha img {
  width: 60px;
  height: 60px;
}
#miaosha dd {
  width: 500px;
  height: 40px;
  margin-top: 20px;
  padding-left: 5px;
  float: left;
  line-height: 40px;
  text-align: left;
  color: #fff;
  border-left: 1px solid #fff;
}
#miaosha #showtime {
  font-size: 24px;
}

.rexiao-list {
  width: 1200px;
  height: 310px;
  margin: auto !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 232px;
    height: 300px;

    img {
      width: 232px;
      height: 232px;
    }
    p {
      text-align: center;
    }
    .p1 {
      font-size: 20px;
    }
    .p2 {
      text-decoration: line-through;
      color: #666;
      font-size: 12px;
    }
    .p3 {
      color: rgba(87, 4, 4, 0.836);
      font-size: 20px;
    }
  }
}
.txu {
  width: 1200px;
  height: 50px;
  background-color: rgba(247, 8, 8, 0.897);
  margin: auto !important;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  color: #fff;
}
.txu-list {
  margin: auto !important;
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 267px;
    height: 425px;
  }
}
</style>
