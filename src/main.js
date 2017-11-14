import Vue from 'vue'
import router from './router'
import store from './store'
import {registerGlobalComponents} from './utils'

import App from './App'

registerGlobalComponents()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
