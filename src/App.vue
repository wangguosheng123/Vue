<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  * {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }

  .clr:after {
    content: "";
    display: block;
    clear: both;
  }
  a {
    text-decoration: none;
  }
}
</style>
