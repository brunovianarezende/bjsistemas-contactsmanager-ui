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
      },
      addContact (state, payload) {
        state.contacts.splice(0, 0, payload)
      },
      editContact (state, payload) {
        const index = state.contacts.findIndex((i) => i.id === payload.id)
        if (index !== -1) {
          state.contacts.splice(index, 1, payload)
        }
      }
    },
    actions: {
      deleteContact (context, payload) {
        getApi().deleteContact(payload)
          .then(() => {
            context.commit('deleteContact', payload)
          })
      },
      editContact (context, payload) {
        getApi().editContact(payload)
          .then(() => {
            context.commit('editContact', payload)
          })
      },
      addContact (context, payload) {
        getApi().addContact(payload)
          .then((id) => {
            const newContact = {...payload, id}
            context.commit('addContact', newContact)
          })
      }
    }
  })
}

export default buildStore([
  {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']},
  {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
])
