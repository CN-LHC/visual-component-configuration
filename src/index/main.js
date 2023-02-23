import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import infiniteScroll from "vue-infinite-scroll"
import element from './element/index'
// import auth from './instruct/auth'

Vue.use(infiniteScroll);
Vue.use(element)
// Vue.use(auth)

Vue.config.productionTip = false;

// 自定义组件注册
Vue.config.ignoredElements = ['g2-chart'];

// moment
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
Vue.prototype.$moment = moment;

//创建全局 event bus
var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus;
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
