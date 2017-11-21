import {_mapApitoContact, _mapContactToApi, _mapToSnakeCase} from '@/api'

describe('api', () => {
  describe('internal functions', () => {
    describe('_mapToSnakeCase', () => {
      it('should map camel case to snake case', () => {
        const obj = {
          camelCase: '1',
          secondCamelCase: '2'
        }
        expect(_mapToSnakeCase(obj)).toEqual({
          camel_case: '1',
          second_camel_case: '2'
        })
      })

      it('should map sub objects too', () => {
        const obj = {
          camelCase: '1',
          secondCamelCase: '2',
          aList: [{firstKey: '3'}, {firstKey: '4'}],
          aListOfStrings: ['abcd', 'efg'],
          anObject: {secondKey: '5', thirdKey: '6'}
        }
        expect(_mapToSnakeCase(obj)).toEqual({
          camel_case: '1',
          second_camel_case: '2',
          a_list: [{first_key: '3'}, {first_key: '4'}],
          a_list_of_strings: ['abcd', 'efg'],
          an_object: {second_key: '5', third_key: '6'}
        })
      })
    })

    describe('_mapContactToApi', () => {
      it('should map camel case to snake case, except for birthDate and zipCode', () => {
        const contact = {
          'firstname': 'first',
          'lastname': 'last',
          'addresses': [
            {
              'street': 'street',
              'city': 'city',
              'state': 'st',
              'zipCode': 'zipcode'
            },
            {
              'street': 'street',
              'city': 'city',
              'state': 'st',
              'zipCode': ''
            }
          ],
          'emails': ['afsd@asdf.com'],
          'phoneNumbers': ['23324'],
          'birthDate': '2017-11-14'
        }

        const expected = {
          'firstname': 'first',
          'lastname': 'last',
          'addresses': [
            {
              'street': 'street',
              'city': 'city',
              'state': 'st',
              'zipcode': 'zipcode'
            },
            {
              'street': 'street',
              'city': 'city',
              'state': 'st',
              'zipcode': ''
            }
          ],
          'emails': ['afsd@asdf.com'],
          'phone_numbers': ['23324'],
          'birthdate': '2017-11-14'
        }

        expect(_mapContactToApi(contact)).toEqual(expected)
      })

      it('should map id to contact_id', () => {
        const contact = {
          'id': '132321321',
          'firstname': 'first',
          'lastname': 'last',
          'addresses': [],
          'emails': ['afsd@asdf.com'],
          'phoneNumbers': ['23324'],
          'birthDate': '2017-11-14'
        }

        const expected = {
          'contact_id': '132321321',
          'firstname': 'first',
          'lastname': 'last',
          'addresses': [],
          'emails': ['afsd@asdf.com'],
          'phone_numbers': ['23324'],
          'birthdate': '2017-11-14'
        }

        expect(_mapContactToApi(contact)).toEqual(expected)
      })
    })

    describe('_mapApitoContact', () => {
      it('should map the api format back to frontend format', () => {
        const contact = {
          'contact_id': 'abcd',
          'firstname': 'first',
          'lastname': 'last',
          'addresses': [
            {
              'street': 'street',
              'city': 'city',
              'state': 'st',
              'zipcode': 'zipcode'
            },
            {
              'street': 'street',
              'city': 'city',
              'state': 'st',
              'zipcode': ''
            }
          ],
          'emails': ['afsd@asdf.com'],
          'phone_numbers': ['23324'],
          'birthdate': '2017-11-14'
        }

        const expected = {
          'id': 'abcd',
          'firstname': 'first',
          'lastname': 'last',
          'addresses': [
            {
              'street': 'street',
              'city': 'city',
              'state': 'st',
              'zipCode': 'zipcode'
            },
            {
              'street': 'street',
              'city': 'city',
              'state': 'st',
              'zipCode': ''
            }
          ],
          'emails': ['afsd@asdf.com'],
          'phoneNumbers': ['23324'],
          'birthDate': '2017-11-14'
        }

        expect(_mapApitoContact(contact)).toEqual(expected)
      })
    })
  })
})
