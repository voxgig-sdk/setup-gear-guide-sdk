# BuildQuote entity test

require "minitest/autorun"
require "json"
require_relative "../SetupGearGuide_sdk"
require_relative "runner"

class BuildQuoteEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SetupGearGuideSDK.test(nil, nil)
    ent = testsdk.BuildQuote(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = build_quote_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "build_quote." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SETUPGEARGUIDE_TEST_BUILD_QUOTE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    build_quote_ref01_ent = client.BuildQuote(nil)
    build_quote_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.build_quote"), "build_quote_ref01"))

    build_quote_ref01_data_result = build_quote_ref01_ent.create(build_quote_ref01_data, nil)
    build_quote_ref01_data = Helpers.to_map(build_quote_ref01_data_result)
    assert !build_quote_ref01_data.nil?

    # LOAD
    build_quote_ref01_match_dt0 = {}
    build_quote_ref01_data_dt0_loaded = build_quote_ref01_ent.load(build_quote_ref01_match_dt0, nil)
    assert !build_quote_ref01_data_dt0_loaded.nil?

  end
end

def build_quote_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "build_quote", "BuildQuoteTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SetupGearGuideSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["build_quote01", "build_quote02", "build_quote03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["SETUPGEARGUIDE_TEST_BUILD_QUOTE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SETUPGEARGUIDE_TEST_BUILD_QUOTE_ENTID" => idmap,
    "SETUPGEARGUIDE_TEST_LIVE" => "FALSE",
    "SETUPGEARGUIDE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["SETUPGEARGUIDE_TEST_BUILD_QUOTE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["SETUPGEARGUIDE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = SetupGearGuideSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["SETUPGEARGUIDE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["SETUPGEARGUIDE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
