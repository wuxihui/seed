import {  Message } from "element-ui";
export default {
    namespaced: true,
    state: {
        dialogCreateRadar: false,
        dialogAddComShares: false,
        radarList: [],
        openRadar: {},
        currentPage: 1,
        pageSize: 10,
        commoninfo: "",
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
        SET_OPEN_RADAR(state, payload) {
            state.openRadar = payload;
        },
        SET_COMMON_INFO(state, payload) {
            let $this = window.vue;
            if(payload) {
                state.commoninfo = payload;
            } else {
                $this.commonenca("傻逼", "success");
            }
        }
    },
    actions: {
        setRadarList({ commit }, payload) {
            if(payload.length != 0) {
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