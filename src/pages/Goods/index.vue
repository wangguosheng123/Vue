<template>
  <div>
    <div id="lbtou">
      <span>全部商品</span>
    </div>
    <div id="lbxu">
      <input
        type="radio"
        name="paixu"
        value="asc"
        checked
        @click="shengxu"
      />商品价格升序

      <input
        type="radio"
        name="paixu"
        value="desc"
        @click="jiangxu"
      />商品价格降序
      <Input
        v-model="val"
        id="search"
        placeholder="请输入商品"
        clearable
        style="width: 200px"
        size="small"
      />
      <!-- <input type="text" id="search" v-model="val" /> -->
      <Button @click="sosuo(val)" id="btn1">
        搜索
      </Button>
    </div>
    <div id="lbxian"></div>
    <ul id="lbshangping" class="cl">
      <li id="lbdianji" v-for="(goods, index) in goodsList" :key="index">
        <router-link
          tag="img"
          class="lbtu"
          :src="goods.src"
          :to="{ name: 'd', params: { goodsid: goods.goodsID } }"
        ></router-link>
        <p>商品名：{{ goods.goodsname }}</p>
        <p>原价:{{ goods.price | cny }}</p>
        <Button @click="jiaru(goods.goodsID)">加入购物车</Button>
        <div id="lbding">
          <img :src="goods.src" />
          <dl>
            <dd>商品名:{{ goods.goodsname }}</dd>
            <dd>商品编号:{{ goods.goodsID }}</dd>
            <dt>
              <span class="shuo">现售价：{{ goods.newprice | cny }}</span>
            </dt>
          </dl>
        </div>
      </li>
    </ul>

    <div class="pager">
      <div class="btn-list">
        <a
          href="javascript:;"
          v-for="(car, i) in pageList"
          :key="i"
          @click="isPage(i)"
          class="pager-btn"
          >{{ car }}</a
        >
      </div>
    </div>
    <Foot />
  </div>
</template>

<script>
import Foot from '../../components/Foot';
export default {
  name: 'Goods',
  components: { Foot },
  data() {
    return {
      goodsList: [],
      pageList: null,
      index: 0,
      skip: 10,
      val: null
    };
  },
  mounted() {
    //首页组件加载完毕后开始请求轮播图数据，去请求热门商品列表
    this.$http.get('./api/goods').then(({ data }) => {
      //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
      let num = data.data.list.length;
      console.log(num);
      let item = Math.ceil(num / 10);
      let list = [];
      for (var i = 1; i <= item; i++) {
        list.push(i);
      }
      console.log(list);
      this.pageList = list;
      this.goodsList = data.data.list.slice(this.index, this.skip);
    });
  },
  methods: {
    jiaru(goodid) {
      // alert(goodid)
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
            localStorage.setItem(userid, JSON.stringify(list));
            alert('加入购物车成功');
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
          //  console.log(list)
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
    isPage(i) {
      console.log(i);
      this.index = i * 10;
      this.skip = (i + 1) * 10;
      //    console.log(skip)
      this.$http.get('./api/goods').then(({ data }) => {
        //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处

        this.goodsList = data.data.list.slice(this.index, this.skip);
      });
    },
    sosuo(val) {
      console.log(val);
      console.log('空的');
      if (val != '') {
        this.$http.get('./api/goods').then(({ data }) => {
          //拿到数据后将数据赋给当前组件的数据模型 进而传给banner组件，这里的this就是data里面的内容，这就是箭头函数的好处
          //    let solist= data.list.filter(item=>{
          //         return  this.goodsList=item.newprice==val
          //    })
          let solist = data.data.list;
          let newlist = [];
          // console.log(val)
          for (var i = 0; i < solist.length; i++) {
            let item = solist[i];
            let itemname = item.goodsname;
            let itemnewprice = item.newprice + ''; ////一定要记得数字类型没有这个方法
            //   console.log( typeof itemnewprice)
            if (
              itemname.indexOf(val) != -1 ||
              itemnewprice.indexOf(val) != -1
            ) {
              newlist.push(item);
              //    console.log(66666)
            }
          }
          if (newlist.length == 0) {
            alert('小主，抱歉没有找到您要的宝贝,去首页看看');
            window.location.href = './#/home';
          }
          if (newlist.length >= 10) {
            isPage((i = 0));
          }
          this.goodsList = newlist;
        });
      } else {
        location.reload();
      }
    },
    shengxu() {
      this.$http.get('./api/goods').then(({ data }) => {
        let shenglist = data.data.list;

        for (var i = 0; i < shenglist.length; i++) {
          for (var w = 0; w < shenglist.length - i - 1; w++) {
            let shengprice1 = shenglist[w];
            let shengprice2 = shenglist[w + 1];

            if (shengprice1.newprice > shengprice2.newprice) {
              shenglist[w] = shengprice2;
              shenglist[w + 1] = shengprice1;
            }
          }
        }
        console.log(shenglist);

        this.goodsList = shenglist.slice(0, 10);
      });
    },
    jiangxu() {
      this.$http.get('./api/goods').then(({ data }) => {
        let shenglist = data.data.list;

        for (var i = 0; i < shenglist.length; i++) {
          for (var w = 0; w < shenglist.length - i - 1; w++) {
            let shengprice1 = shenglist[w];
            let shengprice2 = shenglist[w + 1];

            if (shengprice1.newprice < shengprice2.newprice) {
              shenglist[w] = shengprice2;
              shenglist[w + 1] = shengprice1;
            }
          }
        }
        console.log(shenglist);
        this.goodsList = shenglist.slice(0, 10);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/* //////列表正式开始 */

#lbtou {
  height: 30px;
  overflow: hidden;
  border-bottom: 1px solid red;
}
#lbtou span {
  display: inline-block;
  height: 30px;
  width: 100px;
  background-color: red;
  color: #fff;
  text-align: center;
  line-height: 30px;
}

#lbxu {
  height: 40px;
  border: 1px solid #eee6ee;
}

#lbxu input {
  margin-top: 10px;
  height: 15px;
  width: 15px;
  margin-left: 30px;
  line-height: 15px;
}
#lbxu #search {
  width: 200px;
  height: 20px;
  margin-bottom: 7px;
}
#btn1 {
  height: 25px;
  width: 80px;
  margin-right: 150px;
  margin-bottom: 4px;
}
#lbxu img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

/* ////////商品类别生成开始 */
/* ////////商品类别生成开始 */
/* ////////商品类别生成开始 */
#lbshangping {
  width: 1200px;
  margin: auto;
  height: 630px;
}
#lbshangping li {
  margin: 5px 10px 5px 20px;
  float: left;
  height: 300px;
  width: 200px;
  position: relative;
}

#lbshangping li .lbtu {
  width: 200px;
  height: 200px;
}

#lbshangping li p {
  width: 200px;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
#lbshangping li p:nth-child(3) {
  text-decoration: line-through;
  color: red;
}
#lbshangping button {
  width: 80px;
  height: 30px;
  // margin-left: 60px;
  background-color: #a98f83;
}
#lbshangping button:hover {
  background-color: rgb(253, 162, 162);
}

#lbdianji:hover #lbding {
  display: block;
}

#lbding {
  position: absolute;
  top: 0;
  left: 210px;
  background-color: rgb(165, 158, 158);
  width: 260px;
  height: 370px;
  z-index: 1;
  display: none;
}

#lbshangping li:nth-child(5n) #lbding {
  top: 0;
  left: -265px;
}
#lbding img {
  width: 260px;
  height: 260px;
}
#lbding dd {
  width: 260px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
#lbding dt {
  width: 260px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 24px;
  color: red;
}

/* ////////商品列表生成完成 */

// 这是分页的样式
@w: 30px;
.pager {
  text-align: center;
  margin: 40px 0;
  font-size: 12px;
  .btn-list,
  .pager-btn {
    display: inline-block;
    margin: 40px 0;
  }

  .pager-btn {
    color: #999;
    font-size: 12px;
    border: 1px solid #ccc;
    height: @w;
    line-height: @w;
    padding: 0 20px;
    margin: 0 6px;
    &.active,
    &:hover {
      background: #2d8cf0;
      color: #fff;
    }
    &:hover {
      opacity: 0.7;
    }
    &.disabled {
      color: #ccc;
      cursor: default;
      background: none;
      border: 1px solid #ccc;
      opacity: 1;
    }
  }

  .btn-list {
    .pager-btn {
      width: @w;
      text-align: center;
      padding: 0;
    }
    .active {
      background: rgb(140, 165, 240);
    }
  }
}
</style>
