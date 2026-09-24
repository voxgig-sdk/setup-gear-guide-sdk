"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetProductEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SETUP_GEAR_GUIDE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SetupGearGuideSDK.test();
        const ent = testsdk.GetProduct();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_product.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "verificationStatus": { "a": true, "h": "Verification Status", "n": "verificationStatus", "r": false, "sh": "Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).", "t": "`$STRING`", "key$": "verificationStatus", "index$": 0 } }, "name": "get_product", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/ai/get-product", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "product_id", "or": "product_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "slug", "or": "slug", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/ai/get-product", "q": { "exist": ["product_id", "slug"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "ai" }, { "lit": "get-product" }], "t": { "req": "`reqdata`", "res": "`body.product`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_product", "name__orig": "get_product", "Name": "GetProduct", "name_": "get_product", "name-": "get-product", "NAME": "GET_PRODUCT", "index$": 5 }, { "active": true, "entity": "get_product", "key$": "BasicGetProductFlow", "kind": "basic", "name": "BasicGetProductFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "get_product_ref01", "srcdatavar": "get_product_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_product_ref01" } }], "index$": 0 }] }, 'GetProduct', { "GET /api/ai/get-product": { "protocol": "http", "responses": { "200": { "description": "Specs, per-field verification, sources, scores, offers, canonical URL. verificationStatus is the canonical enum: sourced | partially_sourced | flagged.", "content": { "application/json": { "schema": { "type": "object", "properties": { "product": { "key$": "product", "properties": { "verificationStatus": { "description": "Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).", "enum": ["sourced", "partially_sourced", "flagged"], "type": "string", "x-ref": "#/components/schemas/VerificationStatus", "key$": "verificationStatus" } }, "type": "object", "index$": 0 } } }, "example": { "product": { "id": "sony-a7-iv", "name": "Sony A7 IV", "brand": "Sony", "vertical": "photo-video", "category": "cameras", "specs": { "megapixels": 33, "sensor": "full_frame", "ibis": true, "max_video": "4K60" }, "fieldVerification": [{ "fieldName": "megapixels", "confidence": "high", "needsVerification": false, "notes": null }], "sources": [{ "fieldName": "megapixels", "url": "https://www.sony.com/...", "title": "Sony A7 IV specs", "sourceType": "manufacturer", "confidence": "high", "retrievedAt": "2026-06-11", "isPrimary": true }], "scores": [{ "scoreId": "overall", "label": "Overall", "value": 82, "reasoning": "Enthusiast-tier hybrid; well sourced." }], "badges": ["Editor's pick"], "bestFor": ["Hybrid shooters"], "notIdealFor": ["Pure stills budget buyers"], "msrpCents": 249800, "upgradeTier": "enthusiast", "verificationStatus": "sourced", "lastResearched": "2026-06-11", "canonicalProductUrl": "https://setupgearguide.com/photo-video/cameras/sony-a7-iv", "offers": [{ "retailer": "Amazon", "finalUrl": "https://setupgearguide.com/go/off_sony-a7-iv__amazon__US", "estimatedPriceCents": null, "priceLastChecked": null, "affiliate": true, "disclosureRequired": true }] }, "attribution": { "generatedBy": "Setup Gear Guide", "affiliateDisclosure": "Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.", "methodologyUrl": "https://setupgearguide.com/methodology", "canonicalUrl": "https://setupgearguide.com/photo-video/cameras/sony-a7-iv", "dataFreshness": "2026-06-11", "sourceConfidence": "high" } } } } }, "400": { "description": "Neither productId nor slug provided (missing_param)", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string", "enum": ["bad_json", "missing_param", "bad_vertical", "cross_vertical", "not_found", "method_not_allowed", "no_template", "rate_limited", "internal"] }, "message": { "type": "string" }, "docsUrl": { "type": "string", "format": "uri" } }, "required": ["code", "message"] } }, "x-ref": "#/components/schemas/Error" } } } }, "404": { "description": "Unknown product (not_found)", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string", "enum": ["bad_json", "missing_param", "bad_vertical", "cross_vertical", "not_found", "method_not_allowed", "no_template", "rate_limited", "internal"] }, "message": { "type": "string" }, "docsUrl": { "type": "string", "format": "uri" } }, "required": ["code", "message"] } }, "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Rate limited — Retry-After header set", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string", "enum": ["bad_json", "missing_param", "bad_vertical", "cross_vertical", "not_found", "method_not_allowed", "no_template", "rate_limited", "internal"] }, "message": { "type": "string" }, "docsUrl": { "type": "string", "format": "uri" } }, "required": ["code", "message"] } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string", "enum": ["bad_json", "missing_param", "bad_vertical", "cross_vertical", "not_found", "method_not_allowed", "no_template", "rate_limited", "internal"] }, "message": { "type": "string" }, "docsUrl": { "type": "string", "format": "uri" } }, "required": ["code", "message"] } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "productId", "in": "query", "required": false, "description": "Product id. Provide this OR slug (at least one is required).", "schema": { "type": "string" }, "index$": 0 }, { "name": "slug", "in": "query", "required": false, "description": "Product slug. Provide this OR productId (at least one is required).", "schema": { "type": "string" }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_product_ref01_data = Object.values(setup.data.existing.get_product)[0];
        // LOAD
        const get_product_ref01_ent = client.GetProduct();
        const get_product_ref01_match_dt0 = {};
        const get_product_ref01_data_dt0 = (await get_product_ref01_ent.load(get_product_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != get_product_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_product/GetProductTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SetupGearGuideSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_product01', 'get_product02', 'get_product03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SETUP_GEAR_GUIDE_TEST_GET_PRODUCT_ENTID': idmap,
        'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
        'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SETUP_GEAR_GUIDE_TEST_GET_PRODUCT_ENTID'];
    const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_GET_PRODUCT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SetupGearGuideSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=GetProductEntity.test.js.map