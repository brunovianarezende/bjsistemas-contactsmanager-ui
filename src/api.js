import axios from 'axios'
import snake from 'to-snake-case'
import toCamelCase from 'to-camel-case'

let apiSingleton = null

export const setApi = (api) => {
  apiSingleton = api
}

export const getApi = () => {
  return apiSingleton
}

/* eslint-disable no-unused-vars */
class TempApi {
/* eslint-disable no-unused-vars */
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
    const n = (w) => w.toLowerCase()
    const result = this.contacts.filter((i) => {
      return n(i.firstname).startsWith(n(search.firstname)) &&
        n(i.lastname).startsWith(n(search.lastname))
    })
    result.sort((a, b) => {
      const firstnameA = n(a.firstname)
      const firstnameB = n(b.firstname)
      if (firstnameA < firstnameB) {
        return -1
      } else if (firstnameA > firstnameB) {
        return 1
      } else {
        const lastnameA = n(a.lastname)
        const lastnameB = n(b.lastname)
        if (lastnameA < lastnameB) {
          return -1
        } else if (lastnameA > lastnameB) {
          return 1
        } else {
          return 0
        }
      }
    })
    return Promise.resolve({objects: result})
  }
}

const _mapCase = (obj, func) => {
  const result = {}
  Object.keys(obj).forEach((key) => {
    const newKey = func(key)
    result[newKey] = _mapValue(obj[key], func)
  })
  return result
}

const _mapValue = (value, func) => {
  if (Array.isArray(value)) {
    return value.map((i) => _mapValue(i, func))
  } else if ((typeof value) === 'object') {
    return _mapCase(value, func)
  } else {
    return value
  }
}

export const _mapToSnakeCase = (obj) => {
  return _mapCase(obj, snake)
}

const _mapToCamelCase = (obj) => {
  return _mapCase(obj, toCamelCase)
}

const _pop = (obj, key) => {
  const result = obj[key]
  delete obj[key]
  return result
}

export const _mapContactToApi = (contact) => {
  const result = _mapToSnakeCase(contact)
  result.birthdate = _pop(result, 'birth_date')
  if (result.id) {
    result.contact_id = _pop(result, 'id')
  }
  if (result.addresses) {
    result.addresses = result.addresses.map((address) => {
      if (address.zip_code !== undefined) {
        address.zipcode = _pop(address, 'zip_code')
      }
      return address
    })
  }
  return result
}

export const _mapApitoContact = (apiContact) => {
  const result = _mapToCamelCase(apiContact)
  result.id = _pop(result, 'contactId')
  result.birthDate = _pop(result, 'birthdate')
  if (result.addresses) {
    result.addresses = result.addresses.map((address) => {
      if (address.zipcode !== undefined) {
        address.zipCode = _pop(address, 'zipcode')
      }
      return address
    })
  }
  return result
}

class RealApi {
  constructor (axiosInstance) {
    this.axiosInstance = axiosInstance
  }

  deleteContact (id) {
    return this.axiosInstance
      .delete(`/contacts/${id}/`)
      .then(() => {
        return true
      })
  }

  editContact (contact) {
    return this.axiosInstance
      .put(`/contacts/${contact.id}/`, _mapContactToApi(contact))
      .then(() => {
        return true
      })
  }

  addContact (contact) {
    return this.axiosInstance
      .post('/contacts/', _mapContactToApi(contact))
      .then((result) => {
        return result.data
      })
  }

  searchContacts (search) {
    return this.axiosInstance
      .get('/search/contacts/', {params: search})
      .then((result) => {
        return {objects: result.data.map(_mapApitoContact)}
      })
  }
}

export const buildApi = () => {
  const instance = axios.create({
    baseURL: '/api'
  })
  return new RealApi(instance)
}
