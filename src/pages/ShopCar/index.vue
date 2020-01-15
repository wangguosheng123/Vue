<template>
  <div>
    <h1>我的购物车</h1>
    <ul class="select-all">
      <li><input type="checkbox" @change="isChange" v-model="isAll" />全选</li>
      <li>商品信息</li>
      <li>单价</li>
      <li>数量</li>
      <li>小计</li>
      <li>操作</li>
    </ul>
    <ul class="carmain">
      <li v-for="(car, i) in list" :key="i">
        <div class="left clr">
          <input type="checkbox" v-model="car.active" />
        </div>
        <dl class="right clr">
          <dd>{{ car.goodsname }}</dd>
          <dd><img :src="car.src" /></dd>
          <dd>{{ car.newprice | cny }}</dd>
          <dt class="num">
            <button
              @click="setNum(i, false)"
              :class="{ disabled: car.num <= 1 }"
            >
              -
            </button>
            <input type="text" v-model.number="car.num" />
            <button @click="setNum(i)">+</button>
          </dt>
          <dd>{{ (car.newprice * car.num) | cny }}</dd>
          <dd @click="removed(i)">删除</dd>
        </dl>
      </li>
    </ul>
    <div class="carfoot">
      <span>合计：{{ zongcount | cny }}</span>
      <span>数量总结：{{ count }}件</span>
      <button @click="quliebiao">&lt;&lt;继续购物</button>
    </div>

    <!-- 这是地址的 -->
    <div id="dizhi">
      请输入地址：
      <select id="sheng" @change="shengbian">
        <option
          v-for="s in sheng_list"
          placeholder="请选择省份"
          :value="s.city_id"
          >{{ s.name }}</option
        >
      </select>
      省<select id="shi" @change="shibian">
        <option
          v-for="shi in shiList"
          :value="shi.city_id"
          placeholder="请选择城市"
          >{{ shi.name }}</option
        >
      </select>
      市<select id="qu" :class="{ style: style >= 1 }">
        <option v-for="qu in quList" placeholder="请选择地区">{{
          qu.name
        }}</option
        >区
      </select>
      区<input type="text" placeholder="请填写详细地址" /><span class="jiesuan"
        >&hearts;结算&gt;&gt;</span
      >
    </div>
  </div>
</template>

<script>
import axios from "axios"; // 消息请求
export default {
  name: "ShopCar",
  data() {
    let userid = localStorage.getItem("token");
    let userids = localStorage.getItem(userid);
    let list = JSON.parse(userids);
    list.map(car => {
      car.active = false;
    });
    return {
      isAll: false,
      list,
      sheng_list: [
        {
          city_id: "CH20",
          name: "湖北",
          en: ""
        }
      ],

      shiList: [
        {
          city_id: "CH2001",
          name: "武汉",
          en: ""
        }
      ],
      quList: [
        {
          city_id: "CH200106",
          name: "东西湖",
          en: "dongxihu"
        }
      ],
      newsheng_select_id: null,
      style: 0
    };
  },
  computed: {
    count() {
      let c = 0;
      this.list.map(car => {
        if (car.active) {
          c += car.num;
        }
      });
      return c;
    },
    zongcount() {
      let c = 0;
      this.list.map(car => {
        if (car.active) {
          c += car.num * car.newprice;
        }
      });
      return c;
    }
  },
  watch: {
    list: {
      deep: true,
      handler() {
        // 假设所有的值都是被选中的
        let isAll = true;

        this.list.map((car, i) => {
          if (car.num <= 0) {
            this.list[i].num = 1;
          }
          if (!car.active) {
            // 一旦有一个值是没有被选中的
            isAll = false;
          }
        });
        this.isAll = isAll;
      }
    }
  },
  methods: {
    isChange() {
      this.list.map((car, i) => {
        this.list[i].active = this.isAll;
      });
    },
    setNum(index, isAdd = true) {
      isAdd ? this.list[index].num++ : this.list[index].num--;
    },

    removed(i) {
      console.log(i);
      let userid = localStorage.getItem("token");
      this.list.splice(i, i + 1);
      localStorage.setItem(userid, JSON.stringify(this.list));
    },

    quliebiao() {
      window.location.href = "./#/goods";
    },
    shengbian() {
      console.log(66666);
      var newsheng_select_id = document.getElementById("sheng").value; ////得到现在下拉框里面省份的id,因为id是唯一的
      var sheng_info = this.sheng_list.filter(function(shengfen) {
        ///此处里面的shengfen是从sheng_list取出来的每一省份
        return shengfen.city_id == newsheng_select_id; ///因为shengfen是一个小的对象，所以点出里面的id,
      })[0]; ///因为得到的是一个集合，所以取小标0， 最后就得到了下拉框里省份的小集合
      console.log(sheng_info);
      var shi_list = sheng_info["list"]; ///此处就得到了下拉框里面省份下面城市的集合
      // console.log(shi_list)
      this.shiList = shi_list;
    },
    shibian() {
      var newshi_select_id = document.getElementById("shi").value;
      // console.log(newshi_select_id)
      var newsheng_select_id = document.getElementById("sheng").value; ////得到现在下拉框里面省份的id,因为id是唯一的
      var sheng_info = this.sheng_list.filter(function(shengfen) {
        ///此处里面的shengfen是从sheng_list取出来的每一省份
        return shengfen.city_id == newsheng_select_id; ///因为shengfen是一个小的对象，所以点出里面的id,
      })[0]; ///因为得到的是一个集合，所以取小标0， 最后就得到了下拉框里省份的小集合
      var shi_list = sheng_info["list"]; ///此处就得到了下拉框里面省份下面城市的集合
      // console.log(shi_list)

      var shi_info = shi_list.filter(function(chengshi) {
        return chengshi.city_id == newshi_select_id;
      })[0];
      console.log(66666);

      var qu_list = shi_info["list"];
      if (shi_info["list"]) {
        ////看有没有list，没有就是说明是直辖市
        this.quList = qu_list;
      } else {
        this.style = 1;
      }
    }
  },
  mounted() {
    axios.get("citylist/id/2").then(({ data }) => {
      //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
      // console.log(data.list)
      this.sheng_list = data.list;
    });
  }
};
</script>

<style scoped lang="less">
h1 {
  width: 1200px;
  height: 30px;
  margin: auto;
  text-align: center;
  line-height: 30px;
  margin-bottom: 10px;
  color: rgb(243, 14, 109);
}
.select-all {
  width: 1200px;
  height: 30px;
  margin: auto;
  background: rgb(243, 14, 109);
  li {
    float: left;
    height: 30px;
    line-height: 30px;
    text-align: left;
  }
  li:nth-child(1) {
    width: 100px;
  }

  li:nth-child(2) {
    width: 300px;
    text-align: center;
  }
  li:nth-child(3) {
    width: 150px;
    text-align: center;
  }
  li:nth-child(4) {
    width: 300px;
    text-align: center;
  }
  li:nth-child(5) {
    width: 150px;
    text-align: center;
  }
  li:nth-child(6) {
    width: 150px;
    text-align: center;
  }
}

.carmain {
  width: 1200px;
  margin: auto;

  li {
    width: 1200px;
    height: 50px;
    border-bottom: 1px solid #999;
    line-height: 50px;
    text-align: center;
    font-size: 14px;

    .left {
      float: left;
      width: 100px;
    }
    .right {
      float: left;
      width: 1100px;
      dd {
        float: left;
        width: 150px;
        overflow: hidden;
        img {
          width: 40px;
          height: 40px;
          vertical-align: middle;
        }
      }
      dt {
        float: left;
        width: 300px;
        .disabled {
          color: rgb(235, 227, 227);
        }
        button {
          width: 20px;
          height: 20px;
        }
        input {
          width: 30px;
          height: 20px;
          text-align: center;
          line-height: 20px;
        }
      }
    }
  }
}
.carfoot {
  width: 1200px;
  height: 30px;
  margin: auto;
  line-height: 30px;
  overflow: hidden;
  button {
    margin-top: 5px;
    width: 80px;
    height: 20px;
    float: right;
  }
  button:hover {
    background: rgb(243, 14, 109);
  }
  span {
    display: block;
    float: right;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: red;
  }
}

///////这是地址的
#dizhi {
  width: 1200px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  select {
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  .style {
    color: #fff;
  }

  input {
    width: 200px;
    height: 25px;
  }

  .jiesuan {
    float: right;
    width: 150px;
    height: 50px;
    background-color: rgb(245, 35, 105);
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    border-radius: 5px;
  }
}
</style>
