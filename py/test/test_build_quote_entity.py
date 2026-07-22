# BuildQuote entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from setupgearguide_sdk import SetupGearGuideSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestBuildQuoteEntity:

    def test_should_create_instance(self):
        testsdk = SetupGearGuideSDK.test(None, None)
        ent = testsdk.BuildQuote(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _build_quote_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "build_quote." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set SETUPGEARGUIDE_TEST_BUILD_QUOTE_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        build_quote_ref01_ent = client.BuildQuote(None)
        build_quote_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.build_quote"), "build_quote_ref01"))

        build_quote_ref01_data = helpers.to_map(build_quote_ref01_ent.create(build_quote_ref01_data, None))
        assert build_quote_ref01_data is not None

        # LOAD
        build_quote_ref01_match_dt0 = {}
        build_quote_ref01_data_dt0_loaded = build_quote_ref01_ent.load(build_quote_ref01_match_dt0, None)
        assert build_quote_ref01_data_dt0_loaded is not None



def _build_quote_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/build_quote/BuildQuoteTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = SetupGearGuideSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["build_quote01", "build_quote02", "build_quote03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "SETUPGEARGUIDE_TEST_BUILD_QUOTE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "SETUPGEARGUIDE_TEST_BUILD_QUOTE_ENTID": idmap,
        "SETUPGEARGUIDE_TEST_LIVE": "FALSE",
        "SETUPGEARGUIDE_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("SETUPGEARGUIDE_TEST_BUILD_QUOTE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("SETUPGEARGUIDE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = SetupGearGuideSDK(helpers.to_map(merged_opts))

    _live = env.get("SETUPGEARGUIDE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("SETUPGEARGUIDE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
