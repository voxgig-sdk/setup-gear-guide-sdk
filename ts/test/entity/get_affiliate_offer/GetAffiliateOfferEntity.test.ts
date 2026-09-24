

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


describe('GetAffiliateOfferEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
  afterEach(liveDelay('SETUP_GEAR_GUIDE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SetupGearGuideSDK.test()
    const ent = testsdk.GetAffiliateOffer()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_affiliate_offer.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attribution":{"a":true,"h":"Attribution","n":"attribution","r":false,"t":"`$OBJECT`","key$":"attribution","index$":0},"offers":{"a":true,"h":"Offers","n":"offers","r":false,"t":"`$ARRAY`","key$":"offers","index$":1},"productId":{"a":true,"h":"Product Id","n":"productId","r":false,"t":"`$STRING`","key$":"productId","index$":2}},"name":"get_affiliate_offer","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/ai/get-affiliate-offers","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"product_id","or":"product_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/ai/get-affiliate-offers","q":{"exist":["product_id"]},"r":{},"s":[{"lit":"api"},{"lit":"ai"},{"lit":"get-affiliate-offers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_affiliate_offer","name__orig":"get_affiliate_offer","Name":"GetAffiliateOffer","name_":"get_affiliate_offer","name-":"get-affiliate-offer","NAME":"GET_AFFILIATE_OFFER","index$":3}, {"active":true,"entity":"get_affiliate_offer","key$":"BasicGetAffiliateOfferFlow","kind":"basic","name":"BasicGetAffiliateOfferFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_affiliate_offer_ref01","srcdatavar":"get_affiliate_offer_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_affiliate_offer_ref01"}}],"index$":0}]}, 'GetAffiliateOffer', {"GET /api/ai/get-affiliate-offers":{"protocol":"http","responses":{"200":{"description":"Offers with affiliate flags, disclosureRequired, price freshness. estimatedPriceCents may be null when retailer policy hides price.","content":{"application/json":{"example":{"productId":"sony-a7-iv","offers":[{"retailer":"Amazon","normalUrl":"https://www.amazon.com/dp/B09JZTCWNB","affiliateUrl":"https://www.amazon.com/dp/B09JZTCWNB?tag=setupgearguide-20","finalUrl":"https://setupgearguide.com/go/off_sony-a7-iv__amazon__US","affiliate":true,"estimatedPriceCents":null,"availability":"in_stock","priceLastChecked":"2026-06-11","priceConfidence":"high","disclosureRequired":true},{"retailer":"B&H Photo","normalUrl":"https://www.bhphotovideo.com/c/product/1672167-REG","affiliateUrl":null,"finalUrl":"https://setupgearguide.com/go/off_sony-a7-iv__bhphoto__US","affiliate":false,"estimatedPriceCents":249800,"availability":"in_stock","priceLastChecked":"2026-06-11","priceConfidence":"medium","disclosureRequired":true}],"attribution":{"generatedBy":"Setup Gear Guide","affiliateDisclosure":"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.","methodologyUrl":"https://setupgearguide.com/methodology","canonicalUrl":"https://setupgearguide.com/photo-video/cameras/sony-a7-iv","dataFreshness":null,"sourceConfidence":null}}}}},"400":{"description":"Missing productId (missing_param)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"404":{"description":"Unknown product (not_found)","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"429":{"description":"Rate limited — Retry-After header set","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string","enum":["bad_json","missing_param","bad_vertical","cross_vertical","not_found","method_not_allowed","no_template","rate_limited","internal"]},"message":{"type":"string"},"docsUrl":{"type":"string","format":"uri"}},"required":["code","message"]}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"productId","in":"query","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_affiliate_offer_ref01_data = Object.values(setup.data.existing.get_affiliate_offer)[0] as any

    // LOAD
    const get_affiliate_offer_ref01_ent = client.GetAffiliateOffer()
    const get_affiliate_offer_ref01_match_dt0: any = {}
    const get_affiliate_offer_ref01_data_dt0 = (await get_affiliate_offer_ref01_ent.load(get_affiliate_offer_ref01_match_dt0)).data()
    assert(null != get_affiliate_offer_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_affiliate_offer/GetAffiliateOfferTestData.json')

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
    ['get_affiliate_offer01','get_affiliate_offer02','get_affiliate_offer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SETUP_GEAR_GUIDE_TEST_GET_AFFILIATE_OFFER_ENTID': idmap,
    'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
    'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SETUP_GEAR_GUIDE_TEST_GET_AFFILIATE_OFFER_ENTID']

  const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_GET_AFFILIATE_OFFER_ENTID']
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
  
