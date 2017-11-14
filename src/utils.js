import Vue from 'vue'
import ElementUI from 'element-ui'
import VModal from 'vue-js-modal'

export const registerGlobalComponents = () => {
  Vue.use(ElementUI)
  Vue.use(VModal)
}
