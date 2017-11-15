import {buildStore} from '@/store'
import {setApi} from '@/api'

describe('store.js', () => {
  describe('mutations', () => {
    describe('deleteContact', () => {
      it('should delete existing contacts', () => {
        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        store.commit('deleteContact', obj1.id)
        expect(store.state.contacts).toEqual([obj2])
      })
    })

    describe('editContact', () => {
      it('should edit existing contact', () => {
        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        const newObj2 = {
          ...obj2,
          firstname: 'New name'
        }

        store.commit('editContact', newObj2)
        expect(store.state.contacts).toEqual([obj1, newObj2])
      })

      it('should ignore non-existing contact', () => {
        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        const newObj2 = {
          ...obj2,
          id: 3
        }

        store.commit('editContact', newObj2)
        expect(store.state.contacts).toEqual([obj1, obj2])
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

        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
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

    describe('editContact', () => {
      it('should call the API and, if all is ok, change the contact in the store', () => {
        const api = new function () {
          this.editContact = jest.fn((contact) => Promise.resolve(true))
        }()
        setApi(api)

        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        const newObj = {...obj1, name: 'New'}

        return store.dispatch('editContact', newObj)
          .then(() => {
            expect(store.state.contacts).toEqual([newObj, obj2])
            expect(api.editContact.mock.calls).toEqual([[newObj]])
          })
      })
    })
  })
})
