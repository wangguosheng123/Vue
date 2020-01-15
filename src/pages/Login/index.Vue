<template>
  <div>
    <ul id="main">
      <li>
        <img
          id="img1"
          src="http://i1.vanclimg.com/cms/20160902/login120412_newlogo.jpg"
          alt=""
        />
      </li>
      <li id="deng">
        <span class="span1">凡客Vancl登录</span>
        <span
          >没有账号，免费<router-link :to="{ name: 'z' }"
            >注册</router-link
          ></span
        >
        <div id="inp">
          <span id="putong">普通登录</span>
          <div id="guding">
            <div id="left">
              <input type="text" placeholder="请输入用户名" id="username" />
              <input type="text" placeholder="请输入密码" id="userpwd" />
            </div>
          </div>
          <button id="btn" @click="denglv">登录</button>
          <div id="hezuo">
            <p>使用合作网站登录</p>
            <ul>
              <li>
                <a href=""><img :src="img2"/></a>
              </li>
              <li>
                <a href=""><img :src="img3"/></a>
              </li>
              <li>
                <a href=""><img :src="img4"/></a>
              </li>
              <li>
                <a href=""><img :src="img5"/></a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <foot></foot>
  </div>
</template>

<script>
import Foot from '../../components/Foot';
export default {
  name: 'Login',
  // 首页要要用轮播组件，就一定要注册轮播组件
  components: { Foot },
  data() {
    return {
      img2: require('../../assets/img/w1.png'),
      img3: require('../../assets/img/w2.png'),
      img4: require('../../assets/img/w3.png'),
      img5: require('../../assets/img/w4.png')
    };
  },
  methods: {
    denglv() {
      let username = document.getElementById('username').value;
      let userpwd = document.getElementById('userpwd').value;

      let users = localStorage.getItem('users');
      users = JSON.parse(users);

      let flag = false;
      for (var i = 0; i < users.length; i++) {
        let item = users[i];
        if (item.name == username) {
          if (item.pwd == userpwd) {
            flag = true;
            alert('登录成功');

            let token = localStorage.setItem('token', username);
            console.log('111');
            window.location.href = './#/home';
            console.log('222');
            location.reload();
            return;
          } else {
            alert('密码输入错误，请重新输入');
            return;
          }
        } else {
          flag = false;
        }
      }

      if (flag == false) {
        alert('您目前还没有注册，即将前往注册');
        window.location.href = './#/zhuce';
      }
    }
  }
};
</script>
<style scoped lang="less">
#main {
  overflow: hidden;
  width: 1200px;
  margin: auto;
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
}

#img1 {
  margin: 100px 100px 0 100px;
  width: 460px;
  height: 350px;
}

#main li {
  float: left;
}

#deng {
  width: 430px;
  height: 500px;
  margin-top: 40px;
}
#deng .span1 {
  font-size: 24px;
  margin-right: 30px;
}
#deng a {
  color: red;
  font-size: 20px;
}
#inp {
  width: 430px;
  height: 430px;
  border: 1px solid #000;
}

#putong {
  display: inline-block;
  width: 210px;
  height: 20px;
  border: 1px solid #000;
  text-align: center;
  line-height: 20px;
}

#putong {
  background-color: red;
}

#guding {
  width: 430px;
  height: 220px;
}

/* /////这是普通登录 */
#left {
  overflow: hidden;
}

#left input {
  margin: 20px;
  width: 380px;
  height: 45px;
}

/* 、、、、、普通登录完成 */

/* ////以下是常规的页面 */
#inp a {
  color: red;
  font-size: 20px;
  float: right;
}

#btn {
  margin: 20px;
  width: 380px;
  height: 45px;
  background-color: red;
  color: #fff;
  text-align: center;
  line-height: 45px;
}

#hezuo {
  overflow: hidden;
  height: 60px;
  width: 430px;
}

#hezuo li {
  margin-top: 10px;
  float: left;
  width: 50px;
  height: 50px;
}

#hezuo li img {
  width: 30px;
  height: 30px;
}
</style>
