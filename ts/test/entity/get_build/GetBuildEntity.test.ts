
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { SetupGearGuideSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('GetBuildEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
  afterEach(liveDelay('SETUP_GEAR_GUIDE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SetupGearGuideSDK.test()
    const ent = testsdk.GetBuild()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'get_build.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_build_ref01_data = Object.values(setup.data.existing.get_build)[0] as any

    // LOAD
    const get_build_ref01_ent = client.GetBuild()
    const get_build_ref01_match_dt0: any = {}
    const get_build_ref01_data_dt0 = (await get_build_ref01_ent.load(get_build_ref01_match_dt0)).data()
    assert(null != get_build_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_build/GetBuildTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SetupGearGuideSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_build01','get_build02','get_build03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID': idmap,
    'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
    'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID']

  const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE

  if (live) {
    client = new SetupGearGuideSDK(merge([
      {
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
