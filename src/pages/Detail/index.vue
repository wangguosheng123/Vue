<template>
  <div class="detail" v-if="goods != null">
    <dl id="fdtou">
      <dt>商品图片详情</dt>
      <dd>商品购买指南</dd>
    </dl>
    <div id="fdsheng">
      <div id="fd">
        <div id="wrap">
          <div id="content">
            <img :src="goods.src" id="smallImg" />
          </div>
          <div id="fdzhinan">
            <ul>
              <li>商品名称：{{ goods.goodsname }}</li>
              <li>原价：{{ goods.price | cny }}</li>
              <li>特惠价:{{ goods.newprice | cny }}</li>
              <li>
                好评：99%
              </li>
              <li>
                数量：
                <select>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                  <option value="">6</option>
                  <option value="">7</option>
                  <option value="">8</option>
                  <option value="">9</option>
                  <option value="">10</option>
                </select>
              </li>
              <li id="chicun">
                尺寸： S<input type="radio" name="rc" /> M<input
                  type="radio"
                  name="rc"
                />
                L<input type="radio" name="rc" /> XL<input
                  type="radio"
                  name="rc"
                />
                XXL<input type="radio" name="rc" />
              </li>
              <li>
                <Button id="mai" @click="lijimai(goods.goodsID)">
                  立即购买
                </Button>
                <Button id="che" @click="jiarucar(goods.goodsID)">
                  加入购物车
                </Button>
              </li>
              <li>
                <p id="wenxing">温馨提示</p>
                全场购物满199元免运费
              </li>
            </ul>
          </div>
        </div>
      </div>
      <foot></foot>
    </div>
  </div>
  <div v-else></div>
</template>

<script>
import Foot from '../../components/Foot';
export default {
  name: 'Detail',
  components: { Foot },
  data() {
    return {
      goods: null
    };
  },

  methods: {
    jiarucar(goodid) {
      this.$http.get('./api/liebiao').then(({ data }) => {
        //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
        let shu = data.data.list;
        //   console.log(shu)
        // 这是从json文件中找当前id的商品
        let flag = true;
        let goods1 = null;
        let list = [];
        let userid = localStorage.getItem('token');
        if (userid != null) {
          let userids = localStorage.getItem(userid);
          userids = JSON.parse(userids);
          for (var i = 0; i < shu.length; i++) {
            let item = shu[i];
            if (item.goodsID == goodid) {
              item.num = 1;
              goods1 = item;
            }
          }
          if (userids == null || userids.length == 0) {
            //如果没有存 则直接添加新值
            // console.log(goods1)
            list.push(goods1);
          } else {
            //如果之前存过值 则将原来的值取出来 转换成数组
            //再加入新的值
            for (var i = 0; i < userids.length; i++) {
              let numitem = userids[i];
              if (numitem.goodsID == goodid) {
                // console.log(numitem.goodsID)
                numitem.num++;
                flag = true;
                break;
              } else {
                flag = false;
              }
            }
            list = userids;
          }
          console.log(list);
          if (!flag && goods1 != null) {
            list.push(goods1);
          }
          localStorage.setItem(userid, JSON.stringify(list));
          if (confirm('加入成功 是否进入购物车结算')) {
            window.location.href = './#/shopCar';
          }
        } else {
          alert('您目前还没有登录，即将前往登录页面');
          window.location.href = './#/login';
        }
      });
    },
    lijimai(goodid) {
      this.$http.get('./api/liebiao').then(({ data }) => {
        //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
        let shu = data.data.list;
        //   console.log(shu)
        // 这是从json文件中找当前id的商品
        let flag = true;
        let goods1 = null;
        let list = [];
        let userid = localStorage.getItem('token');
        if (userid != null) {
          let userids = localStorage.getItem(userid);
          userids = JSON.parse(userids);
          for (var i = 0; i < shu.length; i++) {
            let item = shu[i];
            if (item.goodsID == goodid) {
              item.num = 1;
              goods1 = item;
            }
          }
          if (userids == null || userids.length == 0) {
            //如果没有存 则直接添加新值
            // console.log(goods1)
            list.push(goods1);
          } else {
            //如果之前存过值 则将原来的值取出来 转换成数组
            //再加入新的值
            for (var i = 0; i < userids.length; i++) {
              let numitem = userids[i];
              if (numitem.goodsID == goodid) {
                // console.log(numitem.goodsID)
                numitem.num++;
                flag = true;
                break;
              } else {
                flag = false;
              }
            }
            list = userids;
          }
          console.log(list);
          if (!flag && goods1 != null) {
            list.push(goods1);
          }
          localStorage.setItem(userid, JSON.stringify(list));
          alert('加入成功 即将进入购物车结算页面');
          window.location.href = './#/shopCar';
        } else {
          alert('您目前还没有登录，即将前往登录页面');
          window.location.href = './#/login';
        }
      });
    }
  },
  mounted() {
    this.$http.get('./api/liebiao').then(({ data }) => {
      let goodsdata = data.data.list;
      console.log(goodsdata);
      let { goodsid: goodsID } = this.$route.params;

      for (var i = 0; i < goodsdata.length; i++) {
        let gid = goodsdata[i].goodsID;

        if (gid == goodsID) {
          console.log(goodsdata[i]);

          return (this.goods = goodsdata[i]);
        }
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/* ////////放大镜开始 */
#fdtou {
  height: 50px;
  overflow: hidden;
  border-bottom: 1px solid #eee6ee;
}
#fdtou dt {
  float: left;
  width: 500px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #999;
  font-size: 30px;
}
#fdtou dd {
  float: left;
  width: 600px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #666;
  font-size: 30px;
}

/* //////放大镜正式生成 */
#fd {
  height: 600px;
  position: relative;
  margin-top: 20px;
}

#wrap {
  position: relative;
  height: 600px;
  width: 400px;
  margin-left: 100px;
}

#wrap #bigContent {
  position: absolute;
  height: 400px;
  width: 400px;
  left: 500px;
  top: 0;
  overflow: hidden;
  display: none;
}

#wrap #bigContent img {
  height: 1000px;
  width: 1000px;
  display: block;
  position: absolute;
  left: -400px;
  z-index: 99;
}

#wrap #content {
  position: relative;
  height: 400px;
  width: 400px;
  margin-bottom: 20px;
}

#content #shadow {
  height: 160px;
  width: 160px;
  position: absolute;
  background-color: rgba(66, 166, 166, 0.4);
  left: 0;
  top: 0;
  display: none;
}

#wrap #content img {
  height: 400px;
  width: 400px;
}

#footer {
  height: 100px;
  width: 400px;
  list-style: none;
}

#footer li {
  float: left;
  width: 98px;
  height: 98px;
  border: 1px solid #cdcdcd;
  line-height: 98px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

#footer li img {
  width: 90px;
  height: 90px;
}

#footer li:hover {
  border: 1px solid black;
}

#fdzhinan {
  width: 500px;
  height: 400px;
  position: absolute;
  top: 0;
  left: 600px;
}

#fdzhinan li {
  width: 400px;
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  font-size: 12px;
}

#fdzhinan li:nth-child(2) {
  text-decoration: line-through;
  color: #aaa;
}

#fdzhinan li:nth-child(3) {
  font-size: 24px;
  color: rgb(252, 89, 89);
}
#fdzhinan #chicun {
  overflow: hidden;
}
#fdzhinan li input {
  margin-top: 15px;
  width: 25px;
  height: 10px;
  border: 1px solid #000;
}

#fdzhinan li:nth-child(8) {
  margin-top: 25px;
  width: 400px;
  height: 50px;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
  position: relative;
}
#wenxing {
  position: absolute;
  width: 80px;
  height: 20px;
  top: -20px;
  left: 200px;
  background-color: #fff;
  color: red;
  font-size: 16px;
}
#fdzhinan button {
  width: 150px;
  height: 30px;
  margin-right: 10px;
}
#fdzhinan #mai {
  border: 1px solid red;
  background-color: rgb(230, 163, 163);
  color: red;
}
#fdzhinan #che {
  border: 1px solid red;
  background-color: rgb(165, 5, 5);
  color: rgb(253, 246, 246);
}
/* //////放大镜正式生成结束 */
</style>
