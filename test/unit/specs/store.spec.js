import {buildStore} from '@/store'
import {setApi} from '@/api'

describe('store.js', () => {
  describe('mutations', () => {
    describe('deleteContact', () => {
      it('should delete existing contacts', () => {
        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '12/03/1980', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '30/12/1975', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        store.commit('deleteContact', obj1.id)
        expect(store.state.contacts).toEqual([obj2])
      })
    })
  })

  describe('actions', () => {
    describe('deleteContact', () => {
      it('should call the API and, if all is ok, remove the contact from the store', () => {
        const api = new function () {
          this.deleteContact = jest.fn((id) => Promise.resolve(true))
        }()
        setApi(api)

        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '12/03/1980', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '30/12/1975', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        return store.dispatch('deleteContact', obj1.id)
          .then(() => {
            expect(store.state.contacts).toEqual([obj2])
            expect(api.deleteContact.mock.calls).toEqual([[obj1.id]])
          })
      })
    })
  })
})
