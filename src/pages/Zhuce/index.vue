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
      <li id="zhuce">
        <span class="span1">注册新用户</span>
        <span
          >我已经注册，现在就<router-link :to="{ name: 'l' }"
            >登录</router-link
          ></span
        >
        <div id="inp">
          <Input
            class="zu1"
            type="text"
            name=""
            id="zu1"
            placeholder="请输入验证码"
          /><Button @click="yzmshow" class="zu2" id="zu2">{{ nums }}</Button
          ><br />
          <p id="ms0" v-model="ms0">{{ ms0 }}</p>
          <Input
            class="zu4"
            type="text"
            name=""
            id="username"
            placeholder="请输入由数字字母_$组成长度4到12位不能以数字开头用户名"
          /><br />
          <p id="ms1" v-model="ms1">{{ ms1 }}</p>
          <Input
            class="zu5"
            type="text"
            name=""
            id="zu5"
            placeholder="请设置4-10位含数字，字母的密码"
          /><br />
          <Input
            class="zu6"
            type="text"
            name=""
            id="userpwd"
            placeholder="请再次输入密码"
          /><b />
          <p id="ms2" v-model="ms2">{{ ms2 }}</p>
          <Button type="primary" id="btn" @click="zhuceyz">立即注册</Button>
        </div>
      </li>
    </ul>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '../../components/Foot';
export default {
  name: 'Zhuce',
  components: { Foot },
  data() {
    return {
      nums: null,
      ms0: null,
      ms1: null,
      ms2: null
    };
  },
  methods: {
    // 这是点击验证码切换的方法
    yzmshow() {
      let str = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let that = this;
      shownum();
      function shownum() {
        var num = '';
        for (var i = 0; i < 6; i++) {
          var index = Math.floor(Math.random() * str.length);
          num += str[index];
        }
        return (that.nums = num);
      }
    },

    /////这个提交注册的方法
    zhuceyz() {
      let count_y = 0;
      let count_m = 0;
      let count_name = 0;

      let zu1 = document.getElementById('zu1').value;
      // console.log(zu1)
      let zu2 = document.getElementById('zu2').innerHTML;
      // console.log(zu2)

      if (zu1 == zu2) {
        count_y = 1;
        this.ms0 = '';
      } else {
        count_y = 0;
        this.ms0 = '验证码不正确';
      }
      var username = document.getElementById('username').value;
      var usernamereg = /^[A-Za-z_$][A-Za-z0-9_$]{3,11}$/gi;
      if (usernamereg.test(username)) {
        count_name = 1;
        this.ms1 = '';
      } else {
        this.ms1 = '用户名输入不合法';
        count_name = 0;
      }

      var userpwd = document.getElementById('userpwd').value;
      var userpwdreg = /[0-9A-Za-z]{4,10}$/gi;
      let zu5 = document.getElementById('zu5').value;

      if (zu5 == userpwd) {
        if (userpwdreg.test(userpwd)) {
          count_m = 1;
          this.ms2 = '';
        } else {
          this.ms2 = '密码输入不合法';
          count_m = 0;
        }
      } else {
        this.ms2 = '密码两次不一致';
        count_m = 0;
      }
      // console.log(count_y,)

      if (count_y + count_m + count_name === 3) {
        let user = {
          name: username,
          pwd: userpwd
        };
        let list = [];
        let users = localStorage.getItem('users');
        let flag = false;

        //判断该购物车列表之前有没有存过数据
        if (users == null) {
          //如果没有存 则直接添加新值
          list.push(user);
          localStorage.setItem('users', JSON.stringify(list));
          alert('恭喜您，注册成功');
          window.location.href = './#/login';
        } else {
          //如果之前存过值 则将原来的值取出来 转换成数组
          users = JSON.parse(users);
          //再加入新的值
          for (var i = 0; i < users.length; i++) {
            let name = users[i].name;
            if (name == username) {
              flag = true;
              alert('您已经注册过了，即将前往登录页面');
              window.location.href = './#/login';
            } else {
              flag = false;
            }
          }
          if (flag == false) {
            users.push(user);
            //再把加了新值的数组重新丢回到本地存储内
            list = users;
            localStorage.setItem('users', JSON.stringify(list));
            alert('恭喜您，注册成功');
            window.location.href = './#/login';
          }
        }
      }
    }
  },

  mounted() {
    this.yzmshow();
    // this.zhuceyz();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#main {
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
  overflow: hidden;
  width: 1200px;
  margin: auto;
}

#img1 {
  margin: 100px 100px 0 100px;
  width: 460px;
  height: 350px;
}

#main li {
  float: left;
}
#zhuce {
  width: 430px;
  height: 500px;
  margin-top: 40px;
}

#zhuce .span1 {
  font-size: 24px;
  margin-right: 30px;
}

#zhuce a {
  color: red;
  font-size: 20px;
}

#inp {
  width: 430px;
  height: 450px;
  border: 1px solid #000;
}
#inp .zu1 {
  margin: 10px;
  width: 230px;
  // height: 45px;
}
#inp .zu2,
.zu3 {
  // margin: 10px;
  width: 80px;
  // height: 45px;
}
#inp .zu4,
.zu5,
.zu6 {
  margin: 10px;
  width: 320px;
  height: 45px;
}
#ms0,
#ms1,
#ms2 {
  text-align: center;
  width: 400px;
  height: 15px;
  font-size: 12px;
  line-height: 15px;
}
#btn {
  width: 400px;
  height: 45px;
  margin: 10px;
}
</style>
