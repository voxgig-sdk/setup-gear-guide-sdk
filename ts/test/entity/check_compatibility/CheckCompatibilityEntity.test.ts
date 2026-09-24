

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


describe('CheckCompatibilityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
  afterEach(liveDelay('SETUP_GEAR_GUIDE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SetupGearGuideSDK.test()
    const ent = testsdk.CheckCompatibility()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'check_compatibility.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"productIds":{"a":true,"h":"Product Ids","n":"productIds","r":true,"t":"`$ARRAY`","key$":"productIds","index$":0},"verdict":{"a":true,"h":"Verdict","n":"verdict","r":false,"sh":"no_applicable_rules means no rule covered this product set (not a green pass).","t":"`$STRING`","key$":"verdict","index$":1}},"name":"check_compatibility","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/ai/check-compatibility","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/ai/check-compatibility","q":{},"r":{},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"check-compatibility"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/ai/check-compatibility","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/ai/check-compatibility","q":{},"r":{},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"check-compatibility"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"check_compatibility","name__orig":"check_compatibility","Name":"CheckCompatibility","name_":"check_compatibility","name-":"check-compatibility","NAME":"CHECK_COMPATIBILITY","index$":1}, {"active":true,"entity":"check_compatibility","key$":"BasicCheckCompatibilityFlow","kind":"basic","name":"BasicCheckCompatibilityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"check_compatibility_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"check_compatibility_ref01","srcdatavar":"check_compatibility_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-check_compatibility_ref01"}}],"index$":1}]}, 'CheckCompatibility', {"POST /api/ai/check-compatibility":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"productIds":{"type":"array","items":{"type":"string"},"minItems":2,"key$":"productIds"}},"required":["productIds"],"index$":1}}}},"responses":{"200":{"description":"verdict: pass | pass_with_unknowns | warn | fail | no_applicable_rules, with per-rule checks.","content":{"application/json":{"schema":{"type":"object","properties":{"verdict":{"type":"string","enum":["pass","pass_with_unknowns","warn","fail","no_applicable_rules"],"description":"no_applicable_rules means no rule covered this product set (not a green pass).","x-ref":"#/components/schemas/CompatibilityVerdict","key$":"verdict"}},"index$":0},"example":{"verdict":"pass_with_unknowns","checks":[{"rule":"lens-mount-match","status":"pass","severity":"info","message":"Both use Sony E-mount.","confidence":"high","subjectProductId":"sony-a7-iv","relatedProductId":"sony-fe-24-70-gm2"},{"rule":"flash-sync","status":"unknown","severity":"info","message":"Sync spec not yet sourced — informational only.","confidence":"low","subjectProductId":"sony-a7-iv","relatedProductId":null}],"note":"Unknown results mean a needed spec is not verified yet — the engine reports uncertainty instead of guessing.","attribution":{"generatedBy":"Setup Gear Guide","affiliateDisclosure":"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.","methodologyUrl":"https://setupgearguide.com/methodology","canonicalUrl":"https://setupgearguide.com/photo-video/cameras/sony-a7-iv","dataFreshness":"2026-06-11","sourceConfidence":"high"}}}}},"400":{"description":"Bad request (bad_json | missing_param | cross_vertical)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Unknown product (not_found)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"405":{"description":"Method not allowed — POST only","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limited — Retry-After header set","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /api/ai/check-compatibility":{"protocol":"http","responses":{"405":{"description":"Method not allowed — POST only","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const check_compatibility_ref01_ent = client.CheckCompatibility()
    let check_compatibility_ref01_data = setup.data.new.check_compatibility['check_compatibility_ref01']

    check_compatibility_ref01_data = (await check_compatibility_ref01_ent.create(check_compatibility_ref01_data)).data()
    assert(null != check_compatibility_ref01_data)


    // LOAD
    const check_compatibility_ref01_match_dt0: any = {}
    const check_compatibility_ref01_data_dt0 = (await check_compatibility_ref01_ent.load(check_compatibility_ref01_match_dt0)).data()
    assert(null != check_compatibility_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/check_compatibility/CheckCompatibilityTestData.json')

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
    ['check_compatibility01','check_compatibility02','check_compatibility03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SETUP_GEAR_GUIDE_TEST_CHECK_COMPATIBILITY_ENTID': idmap,
    'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
    'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SETUP_GEAR_GUIDE_TEST_CHECK_COMPATIBILITY_ENTID']

  const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_CHECK_COMPATIBILITY_ENTID']
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
  
