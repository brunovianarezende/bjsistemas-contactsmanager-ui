import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

import App from './App'

Vue.use(Vuex)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
