import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const buildStore = (contacts = []) => {
  return new Vuex.Store({
    state: {
      contacts
    }
  })
}

export default buildStore([
  {firstname: 'Bruno', lastname: 'Rezende', birthDate: '12/03/1980', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']},
  {firstname: 'Jose', lastname: 'Anything', birthDate: '30/12/1975', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
])
