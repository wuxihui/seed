import { Message } from 'element-ui';

const commonenca = {
    message: function(msg, type) {
        return Message({
            message: msg,
            type: type,
            offset: window.innerHeight / 2,
            duration: 1000
        })
    }
};

export default commonenca;