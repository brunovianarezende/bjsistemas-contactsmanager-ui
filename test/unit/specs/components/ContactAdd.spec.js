import Vue from 'vue'
import ContactAddHack from './ContactAddHack'
import {registerGlobalComponents} from '@/utils'

registerGlobalComponents()

describe('ContactAdd.vue', () => {
  it('should just close the modal if \'cancel\' is clicked', () => {
    // NOTE: I couldn't get the content of the modal in tests, probably because
    // of transitions, so I'll resort to workarounds
    const Constructor = Vue.extend(ContactAddHack)
    const vm = new Constructor().$mount()

    return Vue.nextTick()
      .then(() => {
        vm.showModal()
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        expect(modalComponent._visible()).toBeTruthy()
        modalComponent.onCancelButtonClick()
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        expect(modalComponent._visible()).toBeFalsy()
      })
  })

  // NOT THE BEST TEST TO DE DONE. I THINK INSTEAD OF RELYING IN WORKAROUNDS
  // I SHOULD DO A REAL AUTOMATIC BROWSER BASED TESTS
  // it('should add a new contact and then close the modal if \'Save\' is clicked', () => {
  //   // NOTE: I couldn't get the content of the modal in tests, probably because
  //   // of transitions, so I'll resort to workarounds
  //   const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
  //   const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
  //   const mockStore = buildStore([obj1, obj2])

  //   const api = new function () {
  //     this.addContact = jest.fn((contact) => Promise.resolve(true))
  //   }()
  //   setApi(api)

  //   const Constructor = Vue.extend(ContactAddHack)
  //   const vm = new Constructor({store: mockStore}).$mount()

  //   const contact = {id: 3, firstname: 'Adair', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}

  //   return Vue.nextTick()
  //     .then(() => {
  //       vm.showModal(contact)
  //       return Vue.nextTick()
  //     })
  //     .then(() => {
  //       const modalComponent = vm.getModalComponent()
  //       expect(modalComponent._visible()).toBeTruthy()
  //       modalComponent.onSaveButtonClick()
  //       return Vue.nextTick()
  //     })
  //     .then(() => {
  //       const modalComponent = vm.getModalComponent()
  //       expect(modalComponent._visible()).toBeFalsy()
  //       expect(vm.getContacts()).toEqual([contact, obj1, obj2])
  //     })
  // })
})
