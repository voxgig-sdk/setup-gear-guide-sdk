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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CompareProductEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SETUP_GEAR_GUIDE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SetupGearGuideSDK.test();
        const ent = testsdk.CompareProduct();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'compare_product.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "productIds", "req": true, "type": "`$ARRAY`", "index$": 0 }], "name": "compare_product", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/ai/compare-products", "json": "{\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"productIds\":{\"items\":{\"type\":\"string\"},\"maxItems\":4,\"minItems\":2,\"type\":\"array\"}},\"required\":[\"productIds\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"attribution\":{\"affiliateDisclosure\":\"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.\",\"canonicalUrl\":\"https://setupgearguide.com/photo-video/cameras/sony-a7-iv\",\"dataFreshness\":\"2026-06-11\",\"generatedBy\":\"Setup Gear Guide\",\"methodologyUrl\":\"https://setupgearguide.com/methodology\",\"sourceConfidence\":\"high\"},\"products\":[{\"bestFor\":[\"Hybrid shooters\"],\"brand\":\"Sony\",\"canonicalUrl\":\"https://setupgearguide.com/photo-video/cameras/sony-a7-iv\",\"category\":\"cameras\",\"estimatedPriceCents\":249800,\"id\":\"sony-a7-iv\",\"name\":\"Sony A7 IV\",\"overallScore\":82,\"upgradeTier\":\"enthusiast\"},{\"bestFor\":[\"No-compromise hybrid work\"],\"brand\":\"Sony\",\"canonicalUrl\":\"https://setupgearguide.com/photo-video/cameras/sony-a7-v-ilce-7m5\",\"category\":\"cameras\",\"estimatedPriceCents\":299800,\"id\":\"sony-a7-v-ilce-7m5\",\"name\":\"Sony A7 V\",\"overallScore\":85,\"upgradeTier\":\"pro\"}],\"specDiffs\":[{\"differs\":false,\"spec\":\"megapixels\",\"values\":{\"sony-a7-iv\":33,\"sony-a7-v-ilce-7m5\":33}},{\"differs\":true,\"spec\":\"max_video\",\"values\":{\"sony-a7-iv\":\"4K60\",\"sony-a7-v-ilce-7m5\":\"4K120\"}}],\"staticComparisonUrl\":null}}},\"description\":\"Spec/score diffs + static comparison link (staticComparisonUrl null when none published).\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request (bad_json | missing_param — need 2 to 4 ids)\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unknown product (not_found)\"},\"405\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Method not allowed — POST only\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limited — Retry-After header set\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/ai/compare-products", "segments": [{ "lit": "api" }, { "lit": "ai" }, { "lit": "compare-products" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /api/ai/compare-products", "json": "{\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"405\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Method not allowed — POST only\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/ai/compare-products", "segments": [{ "lit": "api" }, { "lit": "ai" }, { "lit": "compare-products" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "compare_product", "name__orig": "compare_product", "Name": "CompareProduct", "name_": "compare_product", "name-": "compare-product", "NAME": "COMPARE_PRODUCT", "index$": 2 }, { "active": true, "entity": "compare_product", "key$": "BasicCompareProductFlow", "kind": "basic", "name": "BasicCompareProductFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "compare_product_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "compare_product_ref01", "srcdatavar": "compare_product_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-compare_product_ref01" } }], "index$": 1 }] }, 'CompareProduct');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const compare_product_ref01_ent = client.CompareProduct();
        let compare_product_ref01_data = setup.data.new.compare_product['compare_product_ref01'];
        compare_product_ref01_data = (await compare_product_ref01_ent.create(compare_product_ref01_data)).data();
        (0, node_assert_1.default)(null != compare_product_ref01_data);
        // LOAD
        const compare_product_ref01_match_dt0 = {};
        const compare_product_ref01_data_dt0 = (await compare_product_ref01_ent.load(compare_product_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != compare_product_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/compare_product/CompareProductTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SetupGearGuideSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['compare_product01', 'compare_product02', 'compare_product03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SETUP_GEAR_GUIDE_TEST_COMPARE_PRODUCT_ENTID': idmap,
        'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
        'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SETUP_GEAR_GUIDE_TEST_COMPARE_PRODUCT_ENTID'];
    const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_COMPARE_PRODUCT_ENTID'];
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
//# sourceMappingURL=CompareProductEntity.test.js.map