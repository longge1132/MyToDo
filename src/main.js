import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //绑定全局事件总线， vm上的任意组件都可以互相利用$bus来通信
    Vue.prototype.$bus = this
  },
}).$mount('#app')
