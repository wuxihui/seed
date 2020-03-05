import axios from 'axios';
import { Loaing, Message } from "element-ui";
// import { stringify } from "querystring";

const http = axios.create();
let loading = null;

http.defaults.baseUrl = process.env.NODE_ENV === 'production' ? "线上" : "测试";
http.defaults.timeout = 10000;

//处理接口的公共参数
http.interceptors.request.use(function(config) {
    //加载动画显示
    loading = Loaing.service({
        lock: true,
        text: "Loading",
    });
    //公共参数
    // let params = {}
    // 当url已经有参数时： url + & + api检验参数
    //config.url = ((config.url.indexOf('=') == -1) ? config.url : config.url + '&') + stringify(params);
    return config;
}, function(error) {
    //加载动画隐藏
    loading && loading.close();

    // Do something with request error
    return Promise.reject(error);
});

http.interceptors.response.use(response => {
    //加载动画隐藏
    loading && loading.close();

    let res = response.data;
    if(res.status === 200) {
        return res;
    } else {
        //错误信息
        Message({
            type: "error",
            //信息提示字段要和后台给的字段一致
            message: res.Msg
        });
        return false;
    }
}, error => {
    //加载动画隐藏
    loading && loading.close();
    Message({
        type: "error",
        //信息提示字段要和后台给的字段一致
        message: error.Msg
    })
});

export default http;