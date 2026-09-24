# SetupGearGuide SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "SetupGearGuide",
            "slug": "setup-gear-guide",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://setupgearguide.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "build_quote": {},
                "check_compatibility": {},
                "compare_product": {},
                "get_affiliate_offer": {},
                "get_build": {},
                "get_product": {},
                "recommend_product": {},
            },
        },
        "entity": {
      "build_quote": {
        "fields": [
          {
            "name": "budgetCents",
            "title": "Budget Cents",
            "type": "`$INTEGER`",
          },
          {
            "name": "experienceLevel",
            "title": "Experience Level",
            "type": "`$STRING`",
          },
          {
            "name": "useCase",
            "title": "Use Case",
            "type": "`$STRING`",
          },
          {
            "name": "vertical",
            "title": "Vertical",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "build_quote",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/api/ai/build-quote",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "build-quote",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "build-quote",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/build-quote",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "build-quote",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "build-quote",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "check_compatibility": {
        "fields": [
          {
            "name": "productIds",
            "title": "Product Ids",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "verdict",
            "title": "Verdict",
            "type": "`$STRING`",
            "short": "no_applicable_rules means no rule covered this product set (not a green pass).",
          },
        ],
        "name": "check_compatibility",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/api/ai/check-compatibility",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "check-compatibility",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "check-compatibility",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/check-compatibility",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "check-compatibility",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "check-compatibility",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "compare_product": {
        "fields": [
          {
            "name": "productIds",
            "title": "Product Ids",
            "type": "`$ARRAY`",
            "req": True,
          },
        ],
        "name": "compare_product",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/api/ai/compare-products",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "compare-products",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "compare-products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/compare-products",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "compare-products",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "compare-products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_affiliate_offer": {
        "fields": [
          {
            "name": "attribution",
            "title": "Attribution",
            "type": "`$OBJECT`",
          },
          {
            "name": "offers",
            "title": "Offers",
            "type": "`$ARRAY`",
          },
          {
            "name": "productId",
            "title": "Product Id",
            "type": "`$STRING`",
          },
        ],
        "name": "get_affiliate_offer",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/get-affiliate-offers",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "get-affiliate-offers",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "get-affiliate-offers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "product_id",
                      "orig": "product_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "product_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_build": {
        "fields": [
          {
            "name": "attribution",
            "title": "Attribution",
            "type": "`$OBJECT`",
          },
          {
            "name": "build",
            "title": "Build",
            "type": "`$OBJECT`",
          },
        ],
        "name": "get_build",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/get-build",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "get-build",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "get-build",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "build_id",
                      "orig": "build_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "build_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_product": {
        "fields": [
          {
            "name": "verificationStatus",
            "title": "Verification Status",
            "type": "`$STRING`",
            "short": "Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).",
          },
        ],
        "name": "get_product",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/get-product",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "get-product",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "get-product",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.product`",
                },
                "args": {
                  "query": [
                    {
                      "name": "product_id",
                      "orig": "product_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "product_id",
                    "slug",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "recommend_product": {
        "fields": [
          {
            "name": "budgetCents",
            "title": "Budget Cents",
            "type": "`$INTEGER`",
          },
          {
            "name": "category",
            "title": "Category",
            "type": "`$STRING`",
            "req": True,
            "short": "category slug, e.g.",
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "recommendations",
            "title": "Recommendations",
            "type": "`$ARRAY`",
          },
          {
            "name": "vertical",
            "title": "Vertical",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "recommend_product",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/api/ai/recommend-products",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "recommend-products",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "recommend-products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/recommend-products",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "ai",
                  },
                  {
                    "lit": "recommend-products",
                  },
                ],
                "parts": [
                  "api",
                  "ai",
                  "recommend-products",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
