<template>
  <div class="nav">
    <!-- 这里是导航的组件，这里还有一个清除浮动 ，
        同时含有一个重要的属性activeClass，这是选中的样式填写方式，
    这是根据地质栏来选中导航的-->

    <ul class="nav-list">
      <li><img src="http://i4.vanclimg.com/cms/20160923/logo18546.png" /></li>
      <router-link
        tag="li"
        v-for="nav in navs"
        :to="{ name: nav.name }"
        activeClass="active"
      >
        {{ nav.text }}
      </router-link>
    </ul>
  </div>
  <!-- 这里就是根据本目录下的js中的数据模型来动态生成 -->
</template>

<script>
export default {
  name: "Nav",
  // 这是动态的数据模型，也是要注入到上面引入的html的样式中间去，这故意使用js和模版样式分离，这里最后导入到入口文件Entry中去了
  data() {
    return {
      navs: [
        // {text:"首页",name:"h"},
        // {text:"商品列表",name:"g"},
        // {text:"购物车",name:"sc"}
        { text: "首页", name: "h" },
        { text: "衬衣", name: "g" },
        { text: "卫衣", name: "g" },
        { text: "羽绒服", name: "g" },
        { text: "外套", name: "g" },
        { text: "针织衫", name: "g" },
        { text: "裤装", name: "g" },
        { text: "鞋", name: "g" },
        { text: "家具配饰", name: "g" },
        { text: "内衣袜品", name: "g" }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nav {
  @h: 50px;
  height: @h;
  .nav-list {
    margin: 10px auto;
    li {
      float: left;
      width: 90px;
      height: @h;
      line-height: @h;
      text-align: center;
      color: #000;
      margin: 0px 5px;
      cursor: pointer;
      // 这里的&就是反向的意思，原本应该是另起一行写li:hover{}，这里为了看起来像一个整体，故意这么做的

      img {
        width: 180px;
        height: 40px;
        background: #fff;
      }
      &:nth-child(1) {
        width: 180px;
        height: 40px;
        background: #fff;
      }

      &:hover {
        background: #f04bcc;
      }
    }
  }
}
</style>
