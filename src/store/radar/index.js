export default {
    namespaced: true,
    state: {
        dialogCreateRadar: false,
        dialogAddComShares: false
    },
    mutations: {
        SET_DIALOG_CREATE_RADAR(state, payload) {
            state.dialogCreateRadar = payload;
        },
        SET_DIALOG_ADD_COM_SHARES(state, payload) {
            state.dialogAddComShares = payload;
        }
    },
    actions: {

    }
}