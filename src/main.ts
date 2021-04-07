import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// @ts-ignore
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "@/web/axios.ts";
import {formRequest, request, jsonRequest} from "@/web/api";
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$request = request;
Vue.prototype.$bus = new Vue();
Vue.prototype.$formRequest = formRequest;
Vue.prototype.$jsonRequest = jsonRequest;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
