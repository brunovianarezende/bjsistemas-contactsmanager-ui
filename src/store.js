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
      },
      setContacts (state, payload) {
        state.contacts = payload
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
      },
      searchContacts (context, payload) {
        getApi().searchContacts(payload)
          .then((result) => {
            context.commit('setContacts', result.objects)
          })
      },
      hydrate (context, payload) {
        return context.dispatch('searchContacts', {firstname: '', lastname: ''})
      }
    }
  })
}

export default buildStore([])
