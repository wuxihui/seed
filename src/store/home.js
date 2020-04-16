export default {
    namespaced: true,
    state: {
       dropSelectedArr: [],
       params: [],
       resultLeftArr: [],
       resultRightArr: []
    },
    mutations: {
       SET_DROP_SELECTED_ARR(state, payload) {
            state.dropSelectedArr = payload;
       },
       SET_PARAMS(state, payload) {
           state.params = payload
       },
       SET_RESULT_LEFT_ARR(state, payload) {
           state.resultLeftArr = payload;
       },
       SET_RESULT_RIGHT_ARR(state, payload) {
           state.resultRightArr = payload;
       }
    },
    actions: {

    }
}