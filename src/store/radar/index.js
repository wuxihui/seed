
export default {
    namespaced: true,
    state: {
        dialogCreateRadar: false,
        dialogAddComShares: false,
        // radarList: [],
        openRadar: {},
        // editRadar: {}
    },
    mutations: {
        SET_DIALOG_CREATE_RADAR(state, payload) {
            state.dialogCreateRadar = payload;
        },
        SET_DIALOG_ADD_COM_SHARES(state, payload) {
            state.dialogAddComShares = payload;
        },
        // SET_RADAR_LIST(state, payload) {
        //     state.radarList = payload;
        // },
        SET_OPEN_RADAR(state, payload) {
            state.openRadar = payload;
        },
        // SET_EDIT_RADAR(state, payload) {
        //     state.editRadar = payload;
        //     console.log("编辑commit");
        // }
    },
    actions: {
        // setRadarList({ commit }, payload) {
        //     if(payload.length != 0) {
        //         commit("SET_RADAR_LIST", payload);
        //     } else {
        //         Message({
        //             message: "雷达名称不存在",
        //             type: "warning",
        //             offset: window.innerHeight / 2
        //         })
        //     }
        // },
        // setOpenRadar({ commit }, payload) {
        //     commit("SET_OPEN_RADAR", payload);
        // }
    }
}