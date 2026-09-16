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
(0, node_test_1.describe)('BuildQuoteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SETUP_GEAR_GUIDE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SetupGearGuideSDK.test();
        const ent = testsdk.BuildQuote();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'build_quote.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "budgetCents", "req": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "experienceLevel", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "useCase", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "vertical", "req": true, "type": "`$STRING`", "index$": 3 }], "name": "build_quote", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/ai/build-quote", "json": "{\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":{\"budgetCents\":150000,\"experienceLevel\":\"intermediate\",\"useCase\":\"gaming\",\"vertical\":\"pc-builds\"},\"schema\":{\"properties\":{\"budgetCents\":{\"minimum\":1,\"type\":\"integer\"},\"experienceLevel\":{\"enum\":[\"beginner\",\"intermediate\",\"advanced\",\"pro\",\"no_compromise\"],\"type\":\"string\"},\"useCase\":{\"type\":\"string\"},\"vertical\":{\"enum\":[\"sim-racing\",\"photo-video\",\"music-production\",\"pc-builds\"],\"type\":\"string\"}},\"required\":[\"vertical\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"alternativeBuilds\":[],\"attribution\":{\"affiliateDisclosure\":\"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.\",\"canonicalUrl\":\"https://setupgearguide.com/build-quotes/qt_3kPq9XmZ2aBc\",\"dataFreshness\":null,\"generatedBy\":\"Setup Gear Guide\",\"methodologyUrl\":\"https://setupgearguide.com/methodology\",\"sourceConfidence\":null},\"cached\":false,\"canonicalBuildUrl\":\"https://setupgearguide.com/build-quotes/qt_3kPq9XmZ2aBc\",\"compatibilityWarnings\":[{\"message\":\"PSU has adequate headroom.\",\"rule\":\"psu-wattage-headroom\",\"severity\":\"info\",\"status\":\"pass\"}],\"confidence\":\"high\",\"estimatedTotalCents\":99800,\"items\":[{\"category\":\"cpus\",\"estimatedPriceCents\":39900,\"name\":\"AMD Ryzen 7 7800X3D\",\"offersUrl\":\"https://setupgearguide.com/api/ai/get-affiliate-offers?productId=amd-ryzen-7-7800x3d\",\"productId\":\"amd-ryzen-7-7800x3d\",\"productUrl\":\"https://setupgearguide.com/pc-builds/cpus/amd-ryzen-7-7800x3d\",\"reasoning\":\"Best gaming CPU at this tier\",\"swappedForBudget\":null},{\"category\":\"gpus\",\"estimatedPriceCents\":59900,\"name\":\"NVIDIA RTX 4070 Super\",\"offersUrl\":\"https://setupgearguide.com/api/ai/get-affiliate-offers?productId=nvidia-rtx-4070-super\",\"productId\":\"nvidia-rtx-4070-super\",\"productUrl\":\"https://setupgearguide.com/pc-builds/gpus/nvidia-rtx-4070-super\",\"reasoning\":\"1440p sweet spot\",\"swappedForBudget\":null}],\"priceAlertUrl\":\"https://setupgearguide.com/build-quotes/qt_3kPq9XmZ2aBc#alerts\",\"quoteId\":\"qt_3kPq9XmZ2aBc\",\"recommendedUpgradeOrder\":[{\"category\":\"gpus\",\"from\":\"nvidia-rtx-4070-super\",\"to\":\"nvidia-rtx-4080-super\"}],\"saveBuildUrl\":\"https://setupgearguide.com/pc-builds/builder?quote=qt_3kPq9XmZ2aBc\",\"unpricedItems\":0}}},\"description\":\"Quote with persisted quoteId; identical normalized requests reuse the cached quote (cached:true, x-cache:hit).\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request (bad_json | bad_vertical)\"},\"405\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Method not allowed — POST only\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limited — Retry-After header set\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal error (no_template when no published template, or internal)\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/ai/build-quote", "segments": [{ "lit": "api" }, { "lit": "ai" }, { "lit": "build-quote" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /api/ai/build-quote", "json": "{\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"405\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Method not allowed — POST only\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/ai/build-quote", "segments": [{ "lit": "api" }, { "lit": "ai" }, { "lit": "build-quote" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "build_quote", "name__orig": "build_quote", "Name": "BuildQuote", "name_": "build_quote", "name-": "build-quote", "NAME": "BUILD_QUOTE", "index$": 0 }, { "active": true, "entity": "build_quote", "key$": "BasicBuildQuoteFlow", "kind": "basic", "name": "BasicBuildQuoteFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "build_quote_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "build_quote_ref01", "srcdatavar": "build_quote_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-build_quote_ref01" } }], "index$": 1 }] }, 'BuildQuote');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const build_quote_ref01_ent = client.BuildQuote();
        let build_quote_ref01_data = setup.data.new.build_quote['build_quote_ref01'];
        build_quote_ref01_data = (await build_quote_ref01_ent.create(build_quote_ref01_data)).data();
        (0, node_assert_1.default)(null != build_quote_ref01_data);
        // LOAD
        const build_quote_ref01_match_dt0 = {};
        const build_quote_ref01_data_dt0 = (await build_quote_ref01_ent.load(build_quote_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != build_quote_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/build_quote/BuildQuoteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SetupGearGuideSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['build_quote01', 'build_quote02', 'build_quote03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID': idmap,
        'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
        'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID'];
    const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID'];
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
//# sourceMappingURL=BuildQuoteEntity.test.js.map