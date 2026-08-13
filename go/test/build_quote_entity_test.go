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

func TestBuildQuoteEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BuildQuote(nil)
		if ent == nil {
			t.Fatal("expected non-nil BuildQuoteEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := build_quoteBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "build_quote." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		buildQuoteRef01Ent := client.BuildQuote(nil)
		buildQuoteRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "build_quote"}, setup.data), "build_quote_ref01"))

		buildQuoteRef01DataResult, err := buildQuoteRef01Ent.Create(buildQuoteRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		buildQuoteRef01Data = core.ToMapAny(entityData(buildQuoteRef01DataResult))
		if buildQuoteRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		buildQuoteRef01MatchDt0 := map[string]any{}
		buildQuoteRef01DataDt0Loaded, err := buildQuoteRef01Ent.Load(buildQuoteRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if buildQuoteRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func build_quoteBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "build_quote", "BuildQuoteTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read build_quote test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse build_quote test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"build_quote01", "build_quote02", "build_quote03"},
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
	entidEnvRaw := os.Getenv("SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID": idmap,
		"SETUP_GEAR_GUIDE_TEST_LIVE":      "FALSE",
		"SETUP_GEAR_GUIDE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID"])
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
