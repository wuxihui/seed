export default {
    namespaced: true,
    state: {
        dialogCreatePlate: false,
    },
    mutations: {
        SET_DIALOG_CREATE_PLATE(state, payload) {
            state.dialogCreatePlate = payload;
        }
    },
    actions: {

    }
}