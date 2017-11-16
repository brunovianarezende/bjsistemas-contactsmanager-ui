import Vue from 'vue'
import ContactDelete from '@/components/ContactDelete'
import ContactDeleteHack from './ContactDeleteHack'
import {buildStore} from '@/store'
import {registerGlobalComponents} from '@/utils'
import {setApi} from '@/api'

registerGlobalComponents()

describe('ContactDelete.vue', () => {
  it('should render one address\' first line correctly', () => {
    const Constructor = Vue.extend(ContactDelete)
    const vm = new Constructor().$mount()
    expect(vm.formatFirstLine({street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'})).toEqual('1373 George Avenue')
    expect(vm.formatFirstLine({street: '1373 George Avenue', city: 'Montgomery', state: 'AL'})).toEqual('1373 George Avenue')
    expect(vm.formatFirstLine({street: '1373 George Avenue'})).toEqual('1373 George Avenue')
    expect(vm.formatFirstLine({city: 'Montgomery', state: 'AL'})).toEqual('')
  })

  it('should render one address\' second line correctly', () => {
    const Constructor = Vue.extend(ContactDelete)
    const vm = new Constructor().$mount()
    expect(vm.formatSecondLine({street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'})).toEqual('Montgomery, AL, 36693')
    expect(vm.formatSecondLine({street: '1373 George Avenue', city: 'Montgomery', state: 'AL'})).toEqual('Montgomery, AL')
    expect(vm.formatSecondLine({street: '1373 George Avenue'})).toEqual('')
    expect(vm.formatSecondLine({zipCode: '36693'})).toEqual('36693')
  })

  it('should render the name correctly', () => {
    const Constructor = Vue.extend(ContactDelete)
    const vm = new Constructor().$mount()
    const name = (a) => {
      const contact = {...a}
      vm.beforeOpen({params: {contact}})
      return vm.name
    }
    expect(name({firstname: 'First', lastname: 'Last'})).toEqual('First Last')
    expect(name({firstname: 'First'})).toEqual('First')
    expect(name({lastname: 'Last'})).toEqual('Last')
    expect(name({})).toEqual('')
  })

  it('should just close the modal if \'no\' is clicked', () => {
    // NOTE: I couldn't get the content of the modal in tests, probably because
    // of transitions, so I'll resort to workarounds
    const Constructor = Vue.extend(ContactDeleteHack)
    const vm = new Constructor().$mount()

    const contact = {firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}

    return Vue.nextTick()
      .then(() => {
        vm.showModal(contact)
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        expect(modalComponent._visible()).toBeTruthy()
        modalComponent.onNoButtonClick()
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        expect(modalComponent._visible()).toBeFalsy()
      })
  })

  it('should delete a contact and then close the modal if \'yes\' is clicked', () => {
    // NOTE: I couldn't get the content of the modal in tests, probably because
    // of transitions, so I'll resort to workarounds
    const obj1 = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}
    const obj2 = {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
    const mockStore = buildStore([obj1, obj2])

    const api = new function () {
      this.deleteContact = jest.fn((id) => Promise.resolve(true))
    }()
    setApi(api)

    const Constructor = Vue.extend(ContactDeleteHack)
    const vm = new Constructor({store: mockStore}).$mount()

    const contact = obj1

    return Vue.nextTick()
      .then(() => {
        vm.showModal(contact)
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        expect(modalComponent._visible()).toBeTruthy()
        modalComponent.onYesButtonClick()
        return Vue.nextTick()
      })
      .then(() => {
        const modalComponent = vm.getModalComponent()
        expect(modalComponent._visible()).toBeFalsy()
        expect(vm.getContacts()).toEqual([obj2])
      })
  })
})
