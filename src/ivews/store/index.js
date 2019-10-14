import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        token:'',
    },
    mutations: {
        setToken(state, token) {
            state.setToken=token
        },
    },
    actions: {},
    getters: {},
    modules:{}
})
export default store