import Vue from 'vue'
import ContactInputFields from '@/components/ContactInputFields'
import {registerGlobalComponents} from '@/utils'

registerGlobalComponents()

const deepClone = (o) => {
  return JSON.parse(JSON.stringify(o))
}

describe('ContactInputFields.vue', () => {
  it('should render the content correctly when no contact is given', () => {
    const Constructor = Vue.extend(ContactInputFields)
    const emptyContact = {
      firstname: '',
      lastname: '',
      addresses: [],
      emails: [],
      phoneNumbers: []
    }
    const vm = new Constructor({propsData: {
      contact: emptyContact
    }}).$mount()
    return Vue.nextTick().then(() =>
      expect(vm.$el).toMatchSnapshot()
    )
  })

  it('should render the content correctly when a contact is given', () => {
    const contact = {
      firstname: 'First',
      lastname: 'Last',
      addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}],
      emails: ['email1@email.com', 'email2@email.com'],
      phoneNumbers: ['55-31-99967-0000', '55-31-2515-0000']
    }
    const Constructor = Vue.extend(ContactInputFields)
    const vm = new Constructor({ propsData: {contact} }).$mount()
    return Vue.nextTick().then(() =>
      expect(vm.$el).toMatchSnapshot()
    )
  })

  it('should add an address if \'add address\' is clicked', () => {
    const contact = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}

    const Constructor = Vue.extend(ContactInputFields)
    const vm = new Constructor({propsData: {contact: deepClone(contact)}}).$mount()

    return Vue.nextTick()
      .then(() => {
        vm.onAddAddress()
        expect(vm.contactObj.addresses).toEqual([
          ...contact.addresses,
          {street: '', city: '', state: '', zipCode: ''}
        ])
      })
  })

  it('should remove an address if \'remove address\' is clicked', () => {
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

    const Constructor = Vue.extend(ContactInputFields)
    const vm = new Constructor({propsData: {contact: deepClone(contact)}}).$mount()

    return Vue.nextTick()
      .then(() => {
        vm.onRemoveAddress(1)
        expect(vm.contactObj.addresses).toEqual([
          a(1), a(3)
        ])
      })
  })

  it('should add an email if \'add email\' is clicked', () => {
    const contact = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}

    const Constructor = Vue.extend(ContactInputFields)
    const vm = new Constructor({propsData: {contact: deepClone(contact)}}).$mount()

    return Vue.nextTick()
      .then(() => {
        vm.onAddEmail()
        expect(vm.contactObj.emails).toEqual([
          ...contact.emails,
          ''
        ])
      })
  })

  it('should remove an email if \'remove email\' is clicked', () => {
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

    const Constructor = Vue.extend(ContactInputFields)
    const vm = new Constructor({propsData: {contact: deepClone(contact)}}).$mount()

    return Vue.nextTick()
      .then(() => {
        vm.onRemoveEmail(1)
        expect(vm.contactObj.emails).toEqual([
          e(1), e(3)
        ])
      })
  })

  it('should add a phone number if \'add phone number\' is clicked', () => {
    const contact = {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']}

    const Constructor = Vue.extend(ContactInputFields)
    const vm = new Constructor({propsData: {contact: deepClone(contact)}}).$mount()

    return Vue.nextTick()
      .then(() => {
        vm.onAddPhoneNumber()
        expect(vm.contactObj.phoneNumbers).toEqual([
          ...contact.phoneNumbers,
          ''
        ])
      })
  })

  it('should remove a phone number if \'remove phone number\' is clicked', () => {
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

    const Constructor = Vue.extend(ContactInputFields)
    const vm = new Constructor({propsData: {contact: deepClone(contact)}}).$mount()

    return Vue.nextTick()
      .then(() => {
        vm.onRemovePhoneNumber(1)
        expect(vm.contactObj.phoneNumbers).toEqual([
          p(1), p(3)
        ])
      })
  })
})
