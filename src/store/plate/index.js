export default {
    namespaced: true,
    state: {
        dialogPlateInfor: false,
        dialogCreatePlate: false,
    },
    mutations: {
        SET_DIALOG_PLATE_INFOR(state, payload) {
            state.dialogPlateInfor = payload;
        },
        SET_DIALOG_CREATE_PLATE(state, payload) {
            state.dialogCreatePlate = payload;
        }
    },
    actions: {
        
    }
}