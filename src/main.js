import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import Router from 'vue-router';
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.use( Router );
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.min.css"

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


// Optionally install the BootstrapVue icon components plugin

import router from '@/router';


import {store} from '@/stores';




import '@/services/configureAxios';  
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
