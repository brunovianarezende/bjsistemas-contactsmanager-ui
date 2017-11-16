import Vue from 'vue'
import router from './router'
import store from './store'
import {setApi, buildApi} from './api'
import {registerGlobalComponents} from './utils'

import App from './App'

registerGlobalComponents()

setApi(buildApi())

store.dispatch('hydrate')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
