import Vuex from 'vuex';
import auth from './modules/auth';
import Vue from 'vue'

Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        auth: auth
    }
});