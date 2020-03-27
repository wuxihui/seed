import {  Message } from "element-ui";
import Radar from '../../api/radar';
export default {
    namespaced: true,
    state: {
        dialogCreateRadar: false,
        dialogAddComShares: false,
        radarList: [],
        radarNameList: [],
        radarBlocksList: [],
        radarSenList: [],
        openRadar: {},
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
        SET_RADAR_NAME_LIST(state, payload) {
            state.radarNameList = payload;
        },
        SET_RADAR_BLOACKS_LIST(state, payload) {
            state.radarBlocksList = payload;
        },
        SET_RADAR_SEN_LIST(state, payload) {
            state.radarSenList = payload;
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
        },
        setBuildRadar({ commit }, payload) {
            console.log('setBuildRadar', payload, commit != null);
            Radar.buildRadar(payload);
        }
    }
}