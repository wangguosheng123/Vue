<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide
      v-for="(banner, index) in list"
      :key="index"
      class="swiper-container"
    >
      <router-link :to="{ name: 'g', params: { goodsid: banner.goodsID } }">
        <!-- 这就是图片了，也是通过数据库来获取，这是的src就是动态的绑定 -->
        <img :src="banner.banner" />
      </router-link>
    </swiper-slide>

    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: "Banner",
  props: {
    list: {}
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  mounted() {
    setInterval(() => {
      console.log("simulate async data");
      // if (this.swiperSlides.length < 10) {
      //   this.swiperSlides.push(this.swiperSlides.length + 1);
      // }
    }, 3000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.swiper-container {
  width: 1200px;
  margin: 10px auto !important;
  height: 535px;
  overflow-y: hidden;

  .swiper-slide {
    // a标签本来就是inlick-block，但是w3c不让套block,所以要转化
    a {
      display: block;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
}
</style>
