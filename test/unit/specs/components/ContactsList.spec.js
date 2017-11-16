import Vue from 'vue'
import ContactsList from '@/components/ContactsList'
import {buildStore} from '@/store'
import {registerGlobalComponents} from '@/utils'
import {simulateClick} from './utils'

registerGlobalComponents()

describe('ContactsList.vue', () => {
  it('should render the content correctly - without contacts', () => {
    const mockStore = buildStore([])

    const Constructor = Vue.extend(ContactsList)
    const vm = new Constructor({store: mockStore}).$mount()
    return Vue.nextTick().then(() =>
      expect(vm.$el)
        .toMatchSnapshot()
    )
  })

  it('should render the content correctly - with contacts', () => {
    const mockStore = buildStore([
      {firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']},
      {firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
    ])

    const Constructor = Vue.extend(ContactsList)
    const vm = new Constructor({store: mockStore}).$mount()
    return Vue.nextTick().then(() =>
      expect(vm.$el)
        .toMatchSnapshot()
    )
  })

  it('should render one address correctly', () => {
    const mockStore = buildStore()

    const Constructor = Vue.extend(ContactsList)
    const vm = new Constructor({store: mockStore}).$mount()
    expect(vm.formatAddress({street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'})).toEqual('1373 George Avenue - Montgomery, AL, 36693')
    expect(vm.formatAddress({street: '1373 George Avenue', city: 'Montgomery', state: 'AL'})).toEqual('1373 George Avenue - Montgomery, AL')
    expect(vm.formatAddress({street: '1373 George Avenue'})).toEqual('1373 George Avenue')
    expect(vm.formatAddress({city: 'Montgomery', state: 'AL'})).toEqual('Montgomery, AL')
  })

  it('should open contact add modal when one clicks on add item', () => {
    const mockStore = buildStore([])

    const Constructor = Vue.extend(ContactsList)
    const vm = new Constructor({store: mockStore}).$mount()
    return Vue.nextTick()
      .then(() => {
        const addContactIcon = vm.$el.querySelector('.add-contact-icon')
        simulateClick(vm, addContactIcon)
        return Vue.nextTick()
      })
      .then(() => {
        // NOTE: this selector won't return the full modal code, probably due to
        // transition issues.
        const selector = 'div[data-modal="contact-add-modal"]'
        const modal = vm.$el.querySelector(selector)
        expect(modal).toEqual(expect.anything())
      })
  })

  it('should open contact edit modal when one clicks on edit item', () => {
    const mockStore = buildStore([
      {firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']},
      {firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
    ])

    const Constructor = Vue.extend(ContactsList)
    const vm = new Constructor({store: mockStore}).$mount()
    return Vue.nextTick()
      .then(() => {
        const firstAddressEditIcon = vm.$el.querySelector('.edit-contact-icon')
        simulateClick(vm, firstAddressEditIcon)
        return Vue.nextTick()
      })
      .then(() => {
        // NOTE: this selector won't return the full modal code, probably due to
        // transition issues.
        const selector = 'div[data-modal="contact-edit-modal"]'
        const modal = vm.$el.querySelector(selector)
        expect(modal).toEqual(expect.anything())
      })
  })

  it('should open contact delete modal when one clicks on delete item', () => {
    const mockStore = buildStore([
      {firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']},
      {firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
    ])

    const Constructor = Vue.extend(ContactsList)
    const vm = new Constructor({store: mockStore}).$mount()
    return Vue.nextTick()
      .then(() => {
        const firstAddressDeleteIcon = vm.$el.querySelector('.delete-contact-icon')
        simulateClick(vm, firstAddressDeleteIcon)
        return Vue.nextTick()
      })
      .then(() => {
        const selector = 'div[data-modal="contact-delete-modal"]'
        const modal = vm.$el.querySelector(selector)
        expect(modal).toEqual(expect.anything())
      })
  })
})
