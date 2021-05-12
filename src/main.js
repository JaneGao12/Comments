import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/scss/_base.scss';
import './assets/scss/_style.scss';
import $ from 'jquery';
// import '../static/bootstrap.js'
import canvas from 'jquery-tagcanvas'
import echarts from "echarts";
import echartWordcloud from 'vue-echart-wordcloud'
import axios from "axios"
import qs from "qs"


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$ = $;
Vue.use(echartWordcloud)
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

// router.beforeEach((to, from, next) => {
//     if (store.state.isLogin) {
//         next();
//     } else {
//         // if (to.path == '/') {
//         //     next()
//         // } else {
//         Vue.prototype.$message({
//             message: '请先登录！',
//             type: 'warning'
//         });
//         //     next('/')
//         // }
//     }
// });