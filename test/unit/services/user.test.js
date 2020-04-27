const chai = require('chai')

const { expect } = chai

const userService = require('../../../src/server/services/user')

describe('services/user', () => {
  describe('isValidUsername', () => {
    context('with a valid username', () => {
      [
        'aaa',
        'AAA',
        '123',
        'Aa1'
      ].forEach(username => {
        it(`with '${username}' - should return 'true'`, () => {
          expect(userService.isValidUsername(username))
            .to.equal(true)
        })
      })
    })

    context('with a non valid username', () => {
      [
        '',
        '-',
        '*',
        'Aa1-'
      ].forEach(username => {
        it(`with '${username}' - should return 'false'`, () => {
          expect(userService.isValidUsername(username))
            .to.equal(false)
        })
      })
    })
  })
})
