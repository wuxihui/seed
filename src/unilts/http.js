import axios from 'axios';

let $this = window.vue;
const http = axios.create();
http.defaults.baseURL = process.env.VUE_APP_BASE_URL;

/*http.interceptors.request.use(
	config => {
		if (config.url.startsWith('http:')) {
			// 站点外网的请求
			return config;
		}
		const loginStatus = window.loginStatus;
		//config 为请求的一些配置 例如：请求头 请求时间 Token 等
		config.timeout = 30 * 1000; //请求响应时间
		if (loginStatus.token) {
			config.headers.Authorization = 'Bearer ' + loginStatus.token;
		}
		// console.log('axios. ', config, loginStatus);
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);*/

http.interceptors.response.use(response => {
    let res = response.data;
    if(res.code === 0) {
        return res;
    } else {
        //错误信息
        $this.commonJS.message(res.msg, "error");
        return false;
    }
}, error => {
    //信息提示字段要和后台给的字段一致
    // $this.message(error.msg, "error");
    console.log(error);
    
});

export default http;