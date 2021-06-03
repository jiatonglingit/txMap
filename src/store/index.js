import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        indexViews: 1,
        styleId: 1,
        spaceCode: 0
    },
    mutations: {
        SET_views(state, index) {
            // console.log(index);
            state.indexViews = index
        },
        SET_styleId(state, index) {
            state.styleId = index
        },
        SET_spaceCode(state, index) {
            state.spaceCode = index
        }
    },
    actions: {
        set_Muttion(content, payload) {
            // console.log(payl,oad);
            content.commit('SET_views', payload)
        },
        set_MuttionId(content, payload) {
            content.commit('SET_styleId', payload)
        },
        set_spaceCode(content, payload) {
            content.commit('SET_spaceCode', payload)
        }
    },
    modules: {},
    getters: {

    }
})