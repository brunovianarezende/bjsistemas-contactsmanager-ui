let apiSingleton = null

export const setApi = (api) => {
  apiSingleton = api
}

export const getApi = () => {
  return apiSingleton
}

class TempApi {
  constructor () {
    this.contacts = [
      {id: 1, firstname: 'Bruno', lastname: 'Rezende', birthDate: '1980-03-12', addresses: [{street: '1373 George Avenue', city: 'Montgomery', state: 'AL', zipCode: '36693'}], emails: ['brunovianarezende@gmail.com'], 'phoneNumbers': ['55-31-2515-5924', '55-31-99967-7424']},
      {id: 2, firstname: 'Jose', lastname: 'Anything', birthDate: '1975-12-30', addresses: [], emails: ['jose@gmail.com'], 'phoneNumbers': []}
    ]
    this.nextId = 3
  }

  deleteContact (id) {
    this.contacts = this.contacts.filter((i) => i.id !== id)
    return Promise.resolve(true)
  }

  editContact (contact) {
    const index = this.contacts.findIndex((i) => i.id === contact.id)
    if (index !== -1) {
      this.contacts.splice(index, 1, contact)
    }
    return Promise.resolve(true)
  }

  addContact (contact) {
    const id = this.nextId
    this.nextId += 1
    contact.id = id
    this.contacts.push(contact)
    return Promise.resolve(id)
  }

  searchContacts (search) {
    const result = this.contacts.filter((i) => {
      return i.firstname.toLowerCase().startsWith(search.firstname) && i.lastname.toLowerCase().startsWith(search.lastname)
    })
    result.sort((a, b) => {
      if (a.firstname < b.firstname) {
        return -1
      } else if (a.firstname > b.firstname) {
        return 1
      } else {
        if (a.lastname < b.lastname) {
          return -1
        } else if (a.lastname > b.lastname) {
          return 1
        } else {
          return 0
        }
      }
    })
    return Promise.resolve({objects: result})
  }
}

export const buildApi = () => {
  return new TempApi()
}
