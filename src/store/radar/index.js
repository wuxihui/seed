export default {
    namespaced: true,
    state: {
        dialogCreateRadar: false
    },
    mutations: {
        SET_DIALOG_CREATE_RADAR(state, payload) {
            state.dialogCreateRadar = payload;
        }
    },
    actions: {

    }
}