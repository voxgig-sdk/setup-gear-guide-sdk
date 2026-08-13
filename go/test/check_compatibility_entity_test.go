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

func TestCheckCompatibilityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CheckCompatibility(nil)
		if ent == nil {
			t.Fatal("expected non-nil CheckCompatibilityEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := check_compatibilityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "check_compatibility." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set SETUP_GEAR_GUIDE_TEST_CHECK_COMPATIBILITY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		checkCompatibilityRef01Ent := client.CheckCompatibility(nil)
		checkCompatibilityRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "check_compatibility"}, setup.data), "check_compatibility_ref01"))

		checkCompatibilityRef01DataResult, err := checkCompatibilityRef01Ent.Create(checkCompatibilityRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		checkCompatibilityRef01Data = core.ToMapAny(entityData(checkCompatibilityRef01DataResult))
		if checkCompatibilityRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		checkCompatibilityRef01MatchDt0 := map[string]any{}
		checkCompatibilityRef01DataDt0Loaded, err := checkCompatibilityRef01Ent.Load(checkCompatibilityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if checkCompatibilityRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func check_compatibilityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "check_compatibility", "CheckCompatibilityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read check_compatibility test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse check_compatibility test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"check_compatibility01", "check_compatibility02", "check_compatibility03"},
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
	entidEnvRaw := os.Getenv("SETUP_GEAR_GUIDE_TEST_CHECK_COMPATIBILITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SETUP_GEAR_GUIDE_TEST_CHECK_COMPATIBILITY_ENTID": idmap,
		"SETUP_GEAR_GUIDE_TEST_LIVE":      "FALSE",
		"SETUP_GEAR_GUIDE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SETUP_GEAR_GUIDE_TEST_CHECK_COMPATIBILITY_ENTID"])
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
