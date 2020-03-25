
export default {
    namespaced: true,
    state: {
        rdxgStatusToken: {},
    },
    mutations: {
        SET_RDXG_STATUS_TOKEN(state, payload) {
            state.rdxgStatusToken = payload;
        }
    }
}