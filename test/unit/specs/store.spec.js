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

    describe('addContact', () => {
      it('should add new contact', () => {
        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        const newObj = {
          ...obj2,
          firstname: 'New name'
        }
        delete newObj.id

        store.commit('addContact', newObj)
        expect(store.state.contacts).toEqual([newObj, obj1, obj2])
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

    describe('setContacts', () => {
      it('should change the list of contacts', () => {
        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const obj3 = {id: 3, firstname: 'Other', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        store.commit('setContacts', [obj3])
        expect(store.state.contacts).toEqual([obj3])
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

    describe('addContact', () => {
      it('should call the API and, if all is ok, add the new contact to the store', () => {
        const api = new function () {
          this.addContact = jest.fn((contact) => Promise.resolve(157))
        }()
        setApi(api)

        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const store = buildStore([
          obj1, obj2
        ])

        const newObj = {...obj1, name: 'New'}
        delete newObj.id

        return store.dispatch('addContact', newObj)
          .then(() => {
            const added = {...newObj, id: 157}
            expect(store.state.contacts).toEqual([added, obj1, obj2])
            expect(api.addContact.mock.calls).toEqual([[newObj]])
          })
      })
    })

    describe('searchContacts', () => {
      it('should call the API and return the contacts for the query', () => {
        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
        const obj3 = {id: 3, firstname: 'Other', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}

        const api = new function () {
          this.searchContacts = jest.fn((search) => Promise.resolve({objects: [obj3]}))
        }()
        setApi(api)

        const store = buildStore([
          obj1, obj2
        ])

        const search = {firstname: 'O', lastname: ''}
        return store.dispatch('searchContacts', search)
          .then(() => {
            expect(store.state.contacts).toEqual([obj3])
            expect(api.searchContacts.mock.calls).toEqual([[search]])
          })
      })
    })

    describe('hydrate', () => {
      it('should call the API and get all contacts from the server', () => {
        const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
        const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}

        const api = new function () {
          this.searchContacts = jest.fn((search) => Promise.resolve({objects: [obj1, obj2]}))
        }()
        setApi(api)

        const store = buildStore([])

        return store.dispatch('hydrate')
        .then(() => {
          expect(store.state.contacts).toEqual([obj1, obj2])
          expect(api.searchContacts.mock.calls).toEqual([[{firstname: '', lastname: ''}]])
        })
      })
    })
  })
})
