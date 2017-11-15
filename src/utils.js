import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import VModal from 'vue-js-modal'

export const registerGlobalComponents = () => {
  Vue.use(ElementUI, { locale })
  Vue.use(VModal)
}
