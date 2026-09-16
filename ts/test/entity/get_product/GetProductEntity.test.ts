

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetProductEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
  afterEach(liveDelay('SETUP_GEAR_GUIDE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SetupGearGuideSDK.test()
    const ent = testsdk.GetProduct()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_product.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"verificationStatus","req":false,"short":"Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).","type":"`$STRING`","index$":0}],"name":"get_product","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"product_id","orig":"product_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"slug","orig":"slug","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/ai/get-product","json":"{\"parameters\":[{\"description\":\"Product id. Provide this OR slug (at least one is required).\",\"in\":\"query\",\"name\":\"productId\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Product slug. Provide this OR productId (at least one is required).\",\"in\":\"query\",\"name\":\"slug\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"attribution\":{\"affiliateDisclosure\":\"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.\",\"canonicalUrl\":\"https://setupgearguide.com/photo-video/cameras/sony-a7-iv\",\"dataFreshness\":\"2026-06-11\",\"generatedBy\":\"Setup Gear Guide\",\"methodologyUrl\":\"https://setupgearguide.com/methodology\",\"sourceConfidence\":\"high\"},\"product\":{\"badges\":[\"Editor's pick\"],\"bestFor\":[\"Hybrid shooters\"],\"brand\":\"Sony\",\"canonicalProductUrl\":\"https://setupgearguide.com/photo-video/cameras/sony-a7-iv\",\"category\":\"cameras\",\"fieldVerification\":[{\"confidence\":\"high\",\"fieldName\":\"megapixels\",\"needsVerification\":false,\"notes\":null}],\"id\":\"sony-a7-iv\",\"lastResearched\":\"2026-06-11\",\"msrpCents\":249800,\"name\":\"Sony A7 IV\",\"notIdealFor\":[\"Pure stills budget buyers\"],\"offers\":[{\"affiliate\":true,\"disclosureRequired\":true,\"estimatedPriceCents\":null,\"finalUrl\":\"https://setupgearguide.com/go/off_sony-a7-iv__amazon__US\",\"priceLastChecked\":null,\"retailer\":\"Amazon\"}],\"scores\":[{\"label\":\"Overall\",\"reasoning\":\"Enthusiast-tier hybrid; well sourced.\",\"scoreId\":\"overall\",\"value\":82}],\"sources\":[{\"confidence\":\"high\",\"fieldName\":\"megapixels\",\"isPrimary\":true,\"retrievedAt\":\"2026-06-11\",\"sourceType\":\"manufacturer\",\"title\":\"Sony A7 IV specs\",\"url\":\"https://www.sony.com/...\"}],\"specs\":{\"ibis\":true,\"max_video\":\"4K60\",\"megapixels\":33,\"sensor\":\"full_frame\"},\"upgradeTier\":\"enthusiast\",\"verificationStatus\":\"sourced\",\"vertical\":\"photo-video\"}},\"schema\":{\"properties\":{\"product\":{\"properties\":{\"verificationStatus\":{\"description\":\"Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).\",\"enum\":[\"sourced\",\"partially_sourced\",\"flagged\"],\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Specs, per-field verification, sources, scores, offers, canonical URL. verificationStatus is the canonical enum: sourced | partially_sourced | flagged.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Neither productId nor slug provided (missing_param)\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unknown product (not_found)\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limited — Retry-After header set\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/ai/get-product","segments":[{"lit":"api"},{"lit":"ai"},{"lit":"get-product"}],"select":{"exist":["product_id","slug"]},"transform":{"req":"`reqdata`","res":"`body.product`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_product","name__orig":"get_product","Name":"GetProduct","name_":"get_product","name-":"get-product","NAME":"GET_PRODUCT","index$":5}, {"active":true,"entity":"get_product","key$":"BasicGetProductFlow","kind":"basic","name":"BasicGetProductFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_product_ref01","srcdatavar":"get_product_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_product_ref01"}}],"index$":0}]}, 'GetProduct')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_product_ref01_data = Object.values(setup.data.existing.get_product)[0] as any

    // LOAD
    const get_product_ref01_ent = client.GetProduct()
    const get_product_ref01_match_dt0: any = {}
    const get_product_ref01_data_dt0 = (await get_product_ref01_ent.load(get_product_ref01_match_dt0)).data()
    assert(null != get_product_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_product/GetProductTestData.json')

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
    ['get_product01','get_product02','get_product03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SETUP_GEAR_GUIDE_TEST_GET_PRODUCT_ENTID': idmap,
    'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
    'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SETUP_GEAR_GUIDE_TEST_GET_PRODUCT_ENTID']

  const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_GET_PRODUCT_ENTID']
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
  
