import axios from "axios";
import Vue from "vue";

const instance  = axios.create({
    // http://47.97.219.68/api/
    // http://47.97.219.68:8080/
    // https://easydoc.xyz/mock/AbXkmJdA/api/
    baseURL : "https://www.quyo.fun/party",
    timeout : 5000
});

instance.interceptors.response.use((response) => {
    // console.log(response);
    axios.defaults.withCredentials = true;
    const data = response.data;
    const code = data.code;
    const realData = data.data;
    if (code == 0){
        return realData;
    }
    Vue.prototype.$message.warning(data.msg);
    return Promise.reject(data);
}, (err) => {
    Vue.prototype.$message.error(err.toString());
    return Promise.reject(err)
});
instance.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem("token");
    // config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['Cache-Control']  = 'no-cache';
    if (config.method === "get") {
        return config;
    }
    if (config.data && config.data._useForm) {
        config.data = dataToFormData(config.data);
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

function dataToFormData(data : object) {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, (<any>data)[key]);
    });
    return formData;
}




export default instance;
