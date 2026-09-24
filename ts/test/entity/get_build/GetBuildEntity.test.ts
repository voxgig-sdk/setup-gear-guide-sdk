

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SetupGearGuideSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


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
      if (!live && maybeSkipControl(t, 'entityOp', 'get_build.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attribution":{"a":true,"h":"Attribution","n":"attribution","r":false,"t":"`$OBJECT`","key$":"attribution","index$":0},"build":{"a":true,"h":"Build","n":"build","r":false,"t":"`$OBJECT`","key$":"build","index$":1}},"name":"get_build","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/ai/get-build","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"build_id","or":"build_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/ai/get-build","q":{"exist":["build_id"]},"r":{},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"get-build"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_build","name__orig":"get_build","Name":"GetBuild","name_":"get_build","name-":"get-build","NAME":"GET_BUILD","index$":4}, {"active":true,"entity":"get_build","key$":"BasicGetBuildFlow","kind":"basic","name":"BasicGetBuildFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_build_ref01","srcdatavar":"get_build_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_build_ref01"}}],"index$":0}]}, 'GetBuild', {"GET /api/ai/get-build":{"protocol":"http","responses":{"200":{"description":"Build items, totals, canonical URL.","content":{"application/json":{"example":{"build":{"id":"bd_7Hj3Kp9Qa2Wz","vertical":"pc-builds","name":"1440p gaming build","createdAt":"2026-06-11T14:22:08.000Z","items":[{"productId":"amd-ryzen-7-7800x3d","name":"AMD Ryzen 7 7800X3D","brand":"AMD","category":"cpus","estimatedPriceCents":39900,"reasoning":"Best gaming CPU at this tier","productUrl":"https://setupgearguide.com/pc-builds/cpus/amd-ryzen-7-7800x3d"},{"productId":"nvidia-rtx-4070-super","name":"NVIDIA RTX 4070 Super","brand":"NVIDIA","category":"gpus","estimatedPriceCents":59900,"reasoning":"1440p sweet spot","productUrl":"https://setupgearguide.com/pc-builds/gpus/nvidia-rtx-4070-super"}],"estimatedTotalCents":99800,"unpricedItems":0},"attribution":{"generatedBy":"Setup Gear Guide","affiliateDisclosure":"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.","methodologyUrl":"https://setupgearguide.com/methodology","canonicalUrl":"https://setupgearguide.com/builds/bd_7Hj3Kp9Qa2Wz","dataFreshness":null,"sourceConfidence":null}}}}},"400":{"description":"Missing buildId (missing_param)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Unknown build (not_found)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limited — Retry-After header set","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"buildId","in":"query","required":true,"description":"Token-shaped, non-enumerable build id.","schema":{"type":"string","pattern":"^bd_[0-9A-Za-z]{12}$"},"index$":0}],"securitySource":"unspecified"}})
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

  const env = envOverride({
    'SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID': idmap,
    'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
    'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID']

  const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SetupGearGuideSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    transport,
    now: Date.now(),
  }

  return setup
}
  
