import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        token:'',
    },
    mutations: {
        setToken(state, token) {
            console.log(token)
            state.setToken=token
        },
    },
    actions: {},
    getters: {
        getToken: (state) => {
            return state.token
        }
    },
    modules:{}
})
export default store