import Vue from 'vue'
import Vuex from 'vuex'
import {getApi} from './api'

Vue.use(Vuex)

export const buildStore = (contacts = []) => {
  return new Vuex.Store({
    state: {
      contacts
    },
    mutations: {
      deleteContact (state, payload) {
        state.contacts = state.contacts.filter((i) => i.id !== payload)
      }
    },
    actions: {
      deleteContact (context, payload) {
        getApi().deleteContact(payload)
          .then(() => {
            context.commit('deleteContact', payload)
          })
      }
    }
  })
}

export default buildStore([
  {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '12/03/1980', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']},
  {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '30/12/1975', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
])
