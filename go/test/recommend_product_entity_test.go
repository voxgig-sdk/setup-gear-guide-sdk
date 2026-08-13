package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/setup-gear-guide-sdk/go"
	"github.com/voxgig-sdk/setup-gear-guide-sdk/go/core"

	vs "github.com/voxgig-sdk/setup-gear-guide-sdk/go/utility/struct"
)

func TestRecommendProductEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RecommendProduct(nil)
		if ent == nil {
			t.Fatal("expected non-nil RecommendProductEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := recommend_productBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "recommend_product." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set SETUP_GEAR_GUIDE_TEST_RECOMMEND_PRODUCT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		recommendProductRef01Ent := client.RecommendProduct(nil)
		recommendProductRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "recommend_product"}, setup.data), "recommend_product_ref01"))

		recommendProductRef01DataResult, err := recommendProductRef01Ent.Create(recommendProductRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		recommendProductRef01Data = core.ToMapAny(entityData(recommendProductRef01DataResult))
		if recommendProductRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		recommendProductRef01MatchDt0 := map[string]any{}
		recommendProductRef01DataDt0Loaded, err := recommendProductRef01Ent.Load(recommendProductRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if recommendProductRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func recommend_productBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "recommend_product", "RecommendProductTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read recommend_product test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse recommend_product test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"recommend_product01", "recommend_product02", "recommend_product03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("SETUP_GEAR_GUIDE_TEST_RECOMMEND_PRODUCT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SETUP_GEAR_GUIDE_TEST_RECOMMEND_PRODUCT_ENTID": idmap,
		"SETUP_GEAR_GUIDE_TEST_LIVE":      "FALSE",
		"SETUP_GEAR_GUIDE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SETUP_GEAR_GUIDE_TEST_RECOMMEND_PRODUCT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SETUP_GEAR_GUIDE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewSetupGearGuideSDK(core.ToMapAny(mergedOpts))
	}

	live := env["SETUP_GEAR_GUIDE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["SETUP_GEAR_GUIDE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
