import Vue from 'vue'
import ContactsList from '@/components/ContactsList'
import {buildStore} from '@/store'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

describe('ContactsList.vue', () => {
  it('should render the content correctly - without contacts', () => {
    const mockStore = buildStore([])

    const Constructor = Vue.extend(ContactsList)
    const vm = new Constructor({store: mockStore}).$mount()
    Vue.nextTick().then(() =>
      expect(vm.$el)
        .toMatchSnapshot()
    )
  })

  it('should render the content correctly - with contacts', () => {
    const mockStore = buildStore([
      {firstname: 'Bruno', lastname: 'Rezende', birthDate: '12/03/1980', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']},
      {firstname: 'Jose', lastname: 'Anything', birthDate: '30/12/1975', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
    ])

    const Constructor = Vue.extend(ContactsList)
    const vm = new Constructor({store: mockStore}).$mount()
    Vue.nextTick().then(() =>
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
})
