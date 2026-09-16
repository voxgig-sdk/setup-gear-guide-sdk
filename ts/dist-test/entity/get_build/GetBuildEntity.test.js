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
(0, node_test_1.describe)('GetBuildEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SETUP_GEAR_GUIDE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SETUP_GEAR_GUIDE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SetupGearGuideSDK.test();
        const ent = testsdk.GetBuild();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SETUP_GEAR_GUIDE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_build.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "attribution", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "build", "req": false, "type": "`$OBJECT`", "index$": 1 }], "name": "get_build", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "build_id", "orig": "build_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/ai/get-build", "json": "{\"parameters\":[{\"description\":\"Token-shaped, non-enumerable build id.\",\"in\":\"query\",\"name\":\"buildId\",\"required\":true,\"schema\":{\"pattern\":\"^bd_[0-9A-Za-z]{12}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"attribution\":{\"affiliateDisclosure\":\"Some links may be affiliate links. Setup Gear Guide may earn a commission at no extra cost to the buyer; rankings and recommendations are never influenced by commissions.\",\"canonicalUrl\":\"https://setupgearguide.com/builds/bd_7Hj3Kp9Qa2Wz\",\"dataFreshness\":null,\"generatedBy\":\"Setup Gear Guide\",\"methodologyUrl\":\"https://setupgearguide.com/methodology\",\"sourceConfidence\":null},\"build\":{\"createdAt\":\"2026-06-11T14:22:08.000Z\",\"estimatedTotalCents\":99800,\"id\":\"bd_7Hj3Kp9Qa2Wz\",\"items\":[{\"brand\":\"AMD\",\"category\":\"cpus\",\"estimatedPriceCents\":39900,\"name\":\"AMD Ryzen 7 7800X3D\",\"productId\":\"amd-ryzen-7-7800x3d\",\"productUrl\":\"https://setupgearguide.com/pc-builds/cpus/amd-ryzen-7-7800x3d\",\"reasoning\":\"Best gaming CPU at this tier\"},{\"brand\":\"NVIDIA\",\"category\":\"gpus\",\"estimatedPriceCents\":59900,\"name\":\"NVIDIA RTX 4070 Super\",\"productId\":\"nvidia-rtx-4070-super\",\"productUrl\":\"https://setupgearguide.com/pc-builds/gpus/nvidia-rtx-4070-super\",\"reasoning\":\"1440p sweet spot\"}],\"name\":\"1440p gaming build\",\"unpricedItems\":0,\"vertical\":\"pc-builds\"}}}},\"description\":\"Build items, totals, canonical URL.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Missing buildId (missing_param)\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unknown build (not_found)\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limited — Retry-After header set\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"enum\":[\"bad_json\",\"missing_param\",\"bad_vertical\",\"cross_vertical\",\"not_found\",\"method_not_allowed\",\"no_template\",\"rate_limited\",\"internal\"],\"type\":\"string\"},\"docsUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"required\":[\"code\",\"message\"],\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/ai/get-build", "segments": [{ "lit": "api" }, { "lit": "ai" }, { "lit": "get-build" }], "select": { "exist": ["build_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_build", "name__orig": "get_build", "Name": "GetBuild", "name_": "get_build", "name-": "get-build", "NAME": "GET_BUILD", "index$": 4 }, { "active": true, "entity": "get_build", "key$": "BasicGetBuildFlow", "kind": "basic", "name": "BasicGetBuildFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "get_build_ref01", "srcdatavar": "get_build_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_build_ref01" } }], "index$": 0 }] }, 'GetBuild');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_build_ref01_data = Object.values(setup.data.existing.get_build)[0];
        // LOAD
        const get_build_ref01_ent = client.GetBuild();
        const get_build_ref01_match_dt0 = {};
        const get_build_ref01_data_dt0 = (await get_build_ref01_ent.load(get_build_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != get_build_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_build/GetBuildTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SetupGearGuideSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_build01', 'get_build02', 'get_build03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID': idmap,
        'SETUP_GEAR_GUIDE_TEST_LIVE': 'FALSE',
        'SETUP_GEAR_GUIDE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID'];
    const live = 'TRUE' === env.SETUP_GEAR_GUIDE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SETUP_GEAR_GUIDE_TEST_GET_BUILD_ENTID'];
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
//# sourceMappingURL=GetBuildEntity.test.js.map