export default {
    namespaced: true,
    state: {
        dialogPlateInfor: false,
        isCreate: false,
    },
    mutations: {
        SET_DIALOG_PLATE_INFOR(state, payload) {
            state.dialogPlateInfor = payload
        },
        SET_IS_CREATE(state, payload) {
            state.isCreate = payload;
        }
    },
    actions: {
        
    }
}