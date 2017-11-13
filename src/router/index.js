import Vue from 'vue'
import Router from 'vue-router'
import ContactsList from '@/components/ContactsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ContactsList',
      component: ContactsList
    }
  ]
})
