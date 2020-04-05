import { Message } from "element-ui";
import moment from 'moment';
//公共方法
const commonJS = {
    message: function(msg, type) {
        //TODO:信息提示
        if(msg && type) {
            return  Message({
                message: msg,
                type: type,
                offset: window.innerHeight / 2,
                duration: 1000
            });
        } else if(!msg && !type) {
            return "";
        }
    },
    formatCreateUpTime: function(time) {
        //TODO:时区修正
        if(time) {
            return moment(time).format("YYYY-MM-DD");
        } else {
            return "";
        }
    },
    formatBuildTime: function(time) {
        //TODO:时区修正
        if(time) {
            return moment(time).format("YYYY-MM-DD HH:mm:ss");
        } else {
            return "";
        }
    } 
};

export default commonJS;