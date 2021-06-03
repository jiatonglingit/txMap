import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.less";
Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import axios from 'axios'
Vue.prototype.$axios = axios
let isMap = true //true 公网环境 false 内网环境
Vue.prototype.isMap = isMap
import './utils/tooles'
import '../src/utils/dateFormate'
Vue.prototype.$keyBoard = function(vm, methodName, code) {
    document.onkeydown = function() {
        let key = window.event.keyCode;
        if (key == code) {
            vm[methodName](code); // 触发methodName事件
        }
    };
};
import VerifyFunction from "../src/utils/VerifyFunction";
Vue.use(VerifyFunction);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");