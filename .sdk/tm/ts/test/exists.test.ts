
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SetupGearGuideSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SetupGearGuideSDK.test()
    equal(testsdk instanceof SetupGearGuideSDK, true,
      'SetupGearGuideSDK.test() must return a client synchronously')
  })

})
