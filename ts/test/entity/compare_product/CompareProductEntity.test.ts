

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


describe('CompareProductEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
  afterEach(liveDelay('SETUP_GEAR_GUIDE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SetupGearGuideSDK.test()
    const ent = testsdk.CompareProduct()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'compare_product.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"productIds":{"a":true,"h":"Product Ids","n":"productIds","r":true,"t":"`$ARRAY`","key$":"productIds","index$":0}},"name":"compare_product","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/ai/compare-products","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/ai/compare-products","q":{},"r":{},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"compare-products"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/ai/compare-products","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/ai/compare-products","q":{},"r":{},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"compare-products"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"compare_product","name__orig":"compare_product","Name":"CompareProduct","name_":"compare_product","name-":"compare-product","NAME":"COMPARE_PRODUCT","index$":2}, {"active":true,"entity":"compare_product","key$":"BasicCompareProductFlow","kind":"basic","name":"BasicCompareProductFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"compare_product_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"compare_product_ref01","srcdatavar":"compare_product_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-compare_product_ref01"}}],"index$":1}]}, 'CompareProduct', {"POST /api/ai/compare-products":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"productIds":{"type":"array","items":{"type":"string"},"minItems":2,"maxItems":4,"key$":"productIds"}},"required":["productIds"],"index$":1}}}},"responses":{"200":{"description":"Spec/score diffs + static comparison link (staticComparisonUrl null when none published).","content":{"application/json":{"example":{"products":[{"id":"sony-a7-iv","name":"Sony A7 IV","brand":"Sony","category":"cameras","overallScore":82,"estimatedPriceCents":249800,"upgradeTier":"enthusiast","bestFor":["Hybrid shooters"],"canonicalUrl":"https://setupgearguide.com/photo-video/cameras/sony-a7-iv"},{"id":"sony-a7-v-ilce-7m5","name":"Sony A7 V","brand":"Sony","category":"cameras","overallScore":85,"estimatedPriceCents":299800,"upgradeTier":"pro","bestFor":["No-compromise hybrid work"],"canonicalUrl":"https://setupgearguide.com/photo-video/cameras/sony-a7-v-ilce-7m5"}],"specDiffs":[{"spec":"megapixels","values":{"sony-a7-iv":33,"sony-a7-v-ilce-7m5":33},"differs":false},{"spec":"max_video","values":{"sony-a7-iv":"4K60","sony-a7-v-ilce-7m5":"4K120"},"differs":true}],"staticComparisonUrl":null,"attribution":{"generatedBy":"Setup Gear Guide","affiliateDisclosure":"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.","methodologyUrl":"https://setupgearguide.com/methodology","canonicalUrl":"https://setupgearguide.com/photo-video/cameras/sony-a7-iv","dataFreshness":"2026-06-11","sourceConfidence":"high"}}}}},"400":{"description":"Bad request (bad_json | missing_param — need 2 to 4 ids)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Unknown product (not_found)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"405":{"description":"Method not allowed — POST only","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limited — Retry-After header set","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /api/ai/compare-products":{"protocol":"http","responses":{"405":{"description":"Method not allowed — POST only","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const compare_product_ref01_ent = client.CompareProduct()
    let compare_product_ref01_data = setup.data.new.compare_product['compare_product_ref01']

    compare_product_ref01_data = (await compare_product_ref01_ent.create(compare_product_ref01_data)).data()
    assert(null != compare_product_ref01_data)


    // LOAD
    const compare_product_ref01_match_dt0: any = {}
    const compare_product_ref01_data_dt0 = (await compare_product_ref01_ent.load(compare_product_ref01_match_dt0)).data()
    assert(null != compare_product_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/compare_product/CompareProductTestData.json')

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
    ['compare_product01','compare_product02','compare_product03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SETUP_GEAR_GUIDE_TEST_COMPARE_PRODUCT_ENTID': idmap,
    'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
    'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SETUP_GEAR_GUIDE_TEST_COMPARE_PRODUCT_ENTID']

  const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_COMPARE_PRODUCT_ENTID']
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
  
