import Vue from "vue"

Vue.filter("cny",(value,tag="¥",num=2)=>tag+value.toFixed(num))
Vue.filter("op",(value,discount)=>value /discount*10)