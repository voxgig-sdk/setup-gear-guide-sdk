<?php
declare(strict_types=1);

// RecommendProduct entity test

require_once __DIR__ . '/../setupgearguide_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RecommendProductEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SetupGearGuideSDK::test(null, null);
        $ent = $testsdk->RecommendProduct(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = recommend_product_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "recommend_product." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SETUPGEARGUIDE_TEST_RECOMMEND_PRODUCT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $recommend_product_ref01_ent = $client->RecommendProduct(null);
        $recommend_product_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.recommend_product"), "recommend_product_ref01"));

        $recommend_product_ref01_data_result = $recommend_product_ref01_ent->create($recommend_product_ref01_data, null);
        $recommend_product_ref01_data = Helpers::to_map($recommend_product_ref01_data_result);
        $this->assertNotNull($recommend_product_ref01_data);

        // LOAD
        $recommend_product_ref01_match_dt0 = [];
        $recommend_product_ref01_data_dt0_loaded = $recommend_product_ref01_ent->load($recommend_product_ref01_match_dt0, null);
        $this->assertNotNull($recommend_product_ref01_data_dt0_loaded);

    }
}

function recommend_product_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/recommend_product/RecommendProductTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SetupGearGuideSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["recommend_product01", "recommend_product02", "recommend_product03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SETUPGEARGUIDE_TEST_RECOMMEND_PRODUCT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SETUPGEARGUIDE_TEST_RECOMMEND_PRODUCT_ENTID" => $idmap,
        "SETUPGEARGUIDE_TEST_LIVE" => "FALSE",
        "SETUPGEARGUIDE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SETUPGEARGUIDE_TEST_RECOMMEND_PRODUCT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SETUPGEARGUIDE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new SetupGearGuideSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["SETUPGEARGUIDE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SETUPGEARGUIDE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
