import { Message } from "element-ui";
export default {
    namespaced: true,
    state: {
        dialogCreateRadar: false,
        dialogAddComShares: false,
        radarList: [],
        radarTotal: null
    },
    mutations: {
        SET_DIALOG_CREATE_RADAR(state, payload) {
            state.dialogCreateRadar = payload;
        },
        SET_DIALOG_ADD_COM_SHARES(state, payload) {
            state.dialogAddComShares = payload;
        },
        SET_RADAR_LIST(state, payload) {
            state.radarList = payload;
        },
        SET_RADAR_TOTAL(state, payload) {
            state.radarTotal = payload;
        }
    },
    actions: {
        setRadarList({ commit }, payload) {
            if(payload.length != 0) {
                for(let i=0; i<payload.length; i++) {
                    let itemi = payload[i];
                    let num = "";
                    if(itemi.updateTime) {
                        let time = itemi.updateTime;
                        let d = new Date(time);
                        itemi.updateTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                    }
                    if(itemi.buildTime) {
                        let time = itemi.buildTime;
                        let d = new Date(time);
                        if(d.getMinutes() < 10) {
                            num = "0" + d.getMinutes();
                        } else {
                            num = d.getMinutes();
                        }
                        itemi.buildTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + num + ':' + d.getSeconds();
                    }
                }
                commit("SET_RADAR_LIST", payload);
            } else {
                Message({
                    message: "雷达名称不存在",
                    type: "warning",
                    offset: window.innerHeight / 2
                })
            }
            
        }
    }
}