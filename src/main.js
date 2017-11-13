import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import App from './App'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
