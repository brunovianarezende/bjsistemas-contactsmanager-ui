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

  it('should edit a contact and then close the modal if \'Save\' is clicked', () => {
    // NOTE: I couldn't get the content of the modal in tests, probably because
    // of transitions, so I'll resort to workarounds
    const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
    const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
    const mockStore = buildStore([obj1, obj2])

    const api = new function () {
      this.editContact = jest.fn((id) => Promise.resolve(true))
    }()
    setApi(api)

    const Constructor = Vue.extend(ContactEditHack)
    const vm = new Constructor({store: mockStore}).$mount()

    const contact = {
      ...obj1,
      firstname: 'New'
    }

    return Vue.nextTick()
      .then(() => {
        vm.showModal(contact)
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        expect(modalComponent._visible()).toBeTruthy()
        modalComponent.onSaveButtonClick()
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        expect(modalComponent._visible()).toBeFalsy()
        expect(vm.getContacts()).toEqual([contact, obj2])
      })
  })

  it('should add an address if \'add address\' is clicked', () => {
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
        modalComponent.onAddAddress()
        expect(modalComponent.contact.addresses).toEqual([
          ...contact.addresses,
          {street: '', city: '', state: '', zipCode: ''}
        ])
      })
  })

  it('should remove an address if \'remove address\' is clicked', () => {
    const Constructor = Vue.extend(ContactEditHack)
    const vm = new Constructor().$mount()

    const a = (prefix) => {
      return {street: `${prefix} - 1373 George Avenue`, city: 'Montgomery', state: 'AL', zipCode: '36693'}
    }

    const contact = {
      id: 1,
      firstname: 'Bruno',
      lastname: 'Rezende',
      birthDate: '1980-03-12',
      addresses: [a(1), a(2), a(3)],
      emails: ['brunovianarezende@gmail.com'],
      phoneNumbers: ['55-31-2515-5924', '55-31-99967-7424']
    }

    return Vue.nextTick()
      .then(() => {
        vm.showModal(contact)
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        modalComponent.onRemoveAddress(1)
        expect(modalComponent.contact.addresses).toEqual([
          a(1), a(3)
        ])
      })
  })

  it('should add an email if \'add email\' is clicked', () => {
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
        modalComponent.onAddEmail()
        expect(modalComponent.contact.emails).toEqual([
          ...contact.emails,
          ''
        ])
      })
  })

  it('should remove an email if \'remove email\' is clicked', () => {
    const Constructor = Vue.extend(ContactEditHack)
    const vm = new Constructor().$mount()

    const e = (prefix) => `${prefix}email@email.com`

    const contact = {
      id: 1,
      firstname: 'Bruno',
      lastname: 'Rezende',
      birthDate: '1980-03-12',
      addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}],
      emails: [e(1), e(2), e(3)],
      phoneNumbers: ['55-31-2515-5924', '55-31-99967-7424']
    }

    return Vue.nextTick()
      .then(() => {
        vm.showModal(contact)
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        modalComponent.onRemoveEmail(1)
        expect(modalComponent.contact.emails).toEqual([
          e(1), e(3)
        ])
      })
  })

  it('should add a phone number if \'add phone number\' is clicked', () => {
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
        modalComponent.onAddPhoneNumber()
        expect(modalComponent.contact.phoneNumbers).toEqual([
          ...contact.phoneNumbers,
          ''
        ])
      })
  })

  it('should remove a phone number if \'remove phone number\' is clicked', () => {
    const Constructor = Vue.extend(ContactEditHack)
    const vm = new Constructor().$mount()

    const p = (prefix) => `${prefix}5-31-1234-5678`

    const contact = {
      id: 1,
      firstname: 'Bruno',
      lastname: 'Rezende',
      birthDate: '1980-03-12',
      addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}],
      emails: [],
      phoneNumbers: [p(1), p(2), p(3)]
    }

    return Vue.nextTick()
      .then(() => {
        vm.showModal(contact)
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        modalComponent.onRemovePhoneNumber(1)
        expect(modalComponent.contact.phoneNumbers).toEqual([
          p(1), p(3)
        ])
      })
  })
})
