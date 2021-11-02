import Vuex from 'vuex';
import auth from './modules/auth';
import userPreferance from './modules/userPreferance'
import Vue from 'vue'

Vue.use(Vuex)
export const store = new Vuex.Store({
    modules: {
        auth: auth,
        userPreferance:userPreferance
    }
});