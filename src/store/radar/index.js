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
        time: "",
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
                $this.commonJS.message("傻逼", "success");
            }
        },
        SET_TIME(state, payload) {
            state.time = payload;
        }
    },
    actions: {
        setRadarList({ commit }, payload) {
            let $this = window.vue;
            if(payload.length != 0) {
                commit("SET_RADAR_LIST", payload);
            } else {
               $this.commonJS.message("雷达名称不存在", "warning");
            }
        }
    }
}