import Vue from 'vue'
import ContactEditHack from './ContactEditHack'
import {buildStore} from '@/store'
import {setApi} from '@/api'
import {registerGlobalComponents} from '@/utils'

registerGlobalComponents()

describe('ContactEdit.vue', () => {
  it('should just close the modal if \'cancel\' is clicked', () => {
    // NOTE: I couldn't get the content of the modal in tests, probably because
    // of transitions, so I'll resort to workarounds
    const Constructor = Vue.extend(ContactEditHack)
    const vm = new Constructor().$mount()

    const contact = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}

    return Vue.nextTick()
      .then(() => {
        vm.showModal(contact)
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
  // it('should edit a contact and then close the modal if \'Save\' is clicked', () => {
  //   // NOTE: I couldn't get the content of the modal in tests, probably because
  //   // of transitions, so I'll resort to workarounds
  //   const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
  //   const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
  //   const mockStore = buildStore([obj1, obj2])

  //   const api = new function () {
  //     this.editContact = jest.fn((id) => Promise.resolve(true))
  //   }()
  //   setApi(api)

  //   const Constructor = Vue.extend(ContactEditHack)
  //   const vm = new Constructor({store: mockStore}).$mount()

  //   const contact = {
  //     ...obj1,
  //     firstname: 'New'
  //   }

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
  //       expect(vm.contacts).toEqual([contact, obj2])
  //     })
  // })
})
