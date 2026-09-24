

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


describe('RecommendProductEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
  afterEach(liveDelay('SETUP_GEAR_GUIDE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SetupGearGuideSDK.test()
    const ent = testsdk.RecommendProduct()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'recommend_product.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"budgetCents":{"a":true,"h":"Budget Cents","n":"budgetCents","r":false,"t":"`$INTEGER`","key$":"budgetCents","index$":0},"category":{"a":true,"h":"Category","n":"category","r":true,"sh":"category slug, e.g.","t":"`$STRING`","key$":"category","index$":1},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"t":"`$INTEGER`","key$":"limit","index$":2},"recommendations":{"a":true,"h":"Recommendations","n":"recommendations","r":false,"t":"`$ARRAY`","key$":"recommendations","index$":3},"vertical":{"a":true,"h":"Vertical","n":"vertical","r":true,"t":"`$STRING`","key$":"vertical","index$":4}},"name":"recommend_product","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/ai/recommend-products","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/ai/recommend-products","q":{},"r":{},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"recommend-products"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/ai/recommend-products","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/ai/recommend-products","q":{},"r":{},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"recommend-products"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"recommend_product","name__orig":"recommend_product","Name":"RecommendProduct","name_":"recommend_product","name-":"recommend-product","NAME":"RECOMMEND_PRODUCT","index$":6}, {"active":true,"entity":"recommend_product","key$":"BasicRecommendProductFlow","kind":"basic","name":"BasicRecommendProductFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"recommend_product_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"recommend_product_ref01","srcdatavar":"recommend_product_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-recommend_product_ref01"}}],"index$":1}]}, 'RecommendProduct', {"POST /api/ai/recommend-products":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"vertical":{"type":"string","key$":"vertical"},"category":{"type":"string","description":"category slug, e.g. gpus, wheelbases","key$":"category"},"budgetCents":{"type":"integer","key$":"budgetCents"},"limit":{"type":"integer","maximum":20,"key$":"limit"}},"required":["vertical","category"],"index$":1}}}},"responses":{"200":{"description":"Ranked products (recommendations[] with rank, scores, and verificationStatus from the canonical enum sourced | partially_sourced | flagged).","content":{"application/json":{"schema":{"type":"object","properties":{"recommendations":{"type":"array","items":{"type":"object","properties":{"verificationStatus":{"type":"string","enum":["sourced","partially_sourced","flagged"],"description":"Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).","x-ref":"#/components/schemas/VerificationStatus"}}},"key$":"recommendations"}},"index$":0},"example":{"vertical":"pc-builds","category":"gpus","budgetCents":70000,"recommendations":[{"rank":1,"productId":"nvidia-rtx-4070-super","name":"NVIDIA RTX 4070 Super","brand":"NVIDIA","overallScore":84,"estimatedPriceCents":59900,"upgradeTier":"enthusiast","verificationStatus":"sourced","badges":["Editor's pick"],"productUrl":"https://setupgearguide.com/pc-builds/gpus/nvidia-rtx-4070-super"},{"rank":2,"productId":"amd-rx-7800-xt","name":"AMD RX 7800 XT","brand":"AMD","overallScore":80,"estimatedPriceCents":49900,"upgradeTier":"enthusiast","verificationStatus":"partially_sourced","badges":["Value pick"],"productUrl":"https://setupgearguide.com/pc-builds/gpus/amd-rx-7800-xt"}],"note":null,"attribution":{"generatedBy":"Setup Gear Guide","affiliateDisclosure":"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.","methodologyUrl":"https://setupgearguide.com/methodology","canonicalUrl":"https://setupgearguide.com/pc-builds/gpus","dataFreshness":null,"sourceConfidence":null}}}}},"400":{"description":"Bad request (bad_json | bad_vertical | missing_param)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Unknown category (not_found)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"405":{"description":"Method not allowed — POST only","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limited — Retry-After header set","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /api/ai/recommend-products":{"protocol":"http","responses":{"405":{"description":"Method not allowed — POST only","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const recommend_product_ref01_ent = client.RecommendProduct()
    let recommend_product_ref01_data = setup.data.new.recommend_product['recommend_product_ref01']

    recommend_product_ref01_data = (await recommend_product_ref01_ent.create(recommend_product_ref01_data)).data()
    assert(null != recommend_product_ref01_data)


    // LOAD
    const recommend_product_ref01_match_dt0: any = {}
    const recommend_product_ref01_data_dt0 = (await recommend_product_ref01_ent.load(recommend_product_ref01_match_dt0)).data()
    assert(null != recommend_product_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/recommend_product/RecommendProductTestData.json')

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
    ['recommend_product01','recommend_product02','recommend_product03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SETUP_GEAR_GUIDE_TEST_RECOMMEND_PRODUCT_ENTID': idmap,
    'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
    'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SETUP_GEAR_GUIDE_TEST_RECOMMEND_PRODUCT_ENTID']

  const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_RECOMMEND_PRODUCT_ENTID']
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
  
