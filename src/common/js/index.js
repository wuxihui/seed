import { Message } from "element-ui";
//公共方法
const commonJS = {
    message: function(msg, type) {
        //TODO:信息提示
        if(msg && type) {
            return Message({
                message: msg,
                type: type,
                offset: window.innerHeight / 2,
                duration: 1000
            });
        } else if(!msg && !type) {
            return "";
        }
    }
};

export default commonJS;