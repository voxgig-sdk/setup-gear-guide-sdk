<?php
declare(strict_types=1);

// BuildQuote entity test

require_once __DIR__ . '/../setupgearguide_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BuildQuoteEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SetupGearGuideSDK::test(null, null);
        $ent = $testsdk->BuildQuote(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = build_quote_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "build_quote." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $build_quote_ref01_ent = $client->BuildQuote(null);
        $build_quote_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.build_quote"), "build_quote_ref01"));

        $build_quote_ref01_data_result = $build_quote_ref01_ent->create($build_quote_ref01_data, null);
        $build_quote_ref01_data = Helpers::to_map(is_object($build_quote_ref01_data_result) && method_exists($build_quote_ref01_data_result, 'data_get') ? $build_quote_ref01_data_result->data_get() : $build_quote_ref01_data_result);
        $this->assertNotNull($build_quote_ref01_data);

        // LOAD
        $build_quote_ref01_match_dt0 = [];
        $build_quote_ref01_data_dt0_loaded = $build_quote_ref01_ent->load($build_quote_ref01_match_dt0, null);
        $this->assertNotNull($build_quote_ref01_data_dt0_loaded);

    }
}

function build_quote_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/build_quote/BuildQuoteTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SetupGearGuideSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["build_quote01", "build_quote02", "build_quote03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID" => $idmap,
        "SETUP_GEAR_GUIDE_TEST_LIVE" => "FALSE",
        "SETUP_GEAR_GUIDE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SETUP_GEAR_GUIDE_TEST_BUILD_QUOTE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SETUP_GEAR_GUIDE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new SetupGearGuideSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["SETUP_GEAR_GUIDE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SETUP_GEAR_GUIDE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
