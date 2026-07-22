
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SetupGearGuideSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await SetupGearGuideSDK.test()
    equal(null !== testsdk, true)
  })

})
