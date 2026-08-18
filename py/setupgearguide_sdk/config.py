# SetupGearGuide SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$INTEGER`",
          },
          {
            "name": "experienceLevel",
            "type": "`$STRING`",
          },
          {
            "name": "useCase",
            "type": "`$STRING`",
          },
          {
            "name": "vertical",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "build_quote",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/ai/build-quote",
                "parts": [
                  "api",
                  "ai",
                  "build-quote",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/build-quote",
                "parts": [
                  "api",
                  "ai",
                  "build-quote",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "verdict",
            "type": "`$STRING`",
          },
        ],
        "name": "check_compatibility",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/ai/check-compatibility",
                "parts": [
                  "api",
                  "ai",
                  "check-compatibility",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/check-compatibility",
                "parts": [
                  "api",
                  "ai",
                  "check-compatibility",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "req": True,
            "type": "`$ARRAY`",
          },
        ],
        "name": "compare_product",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/ai/compare-products",
                "parts": [
                  "api",
                  "ai",
                  "compare-products",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/compare-products",
                "parts": [
                  "api",
                  "ai",
                  "compare-products",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "type": "`$OBJECT`",
          },
          {
            "name": "offers",
            "type": "`$ARRAY`",
          },
          {
            "name": "productId",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "product_id",
                      "orig": "product_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/get-affiliate-offers",
                "parts": [
                  "api",
                  "ai",
                  "get-affiliate-offers",
                ],
                "select": {
                  "exist": [
                    "product_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$OBJECT`",
          },
          {
            "name": "build",
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
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "build_id",
                      "orig": "build_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/get-build",
                "parts": [
                  "api",
                  "ai",
                  "get-build",
                ],
                "select": {
                  "exist": [
                    "build_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$STRING`",
          },
        ],
        "name": "get_product",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "product_id",
                      "orig": "product_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/get-product",
                "parts": [
                  "api",
                  "ai",
                  "get-product",
                ],
                "select": {
                  "exist": [
                    "product_id",
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.product`",
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
            "type": "`$INTEGER`",
          },
          {
            "name": "category",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "limit",
            "type": "`$INTEGER`",
          },
          {
            "name": "recommendations",
            "type": "`$ARRAY`",
          },
          {
            "name": "vertical",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "recommend_product",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/ai/recommend-products",
                "parts": [
                  "api",
                  "ai",
                  "recommend-products",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/ai/recommend-products",
                "parts": [
                  "api",
                  "ai",
                  "recommend-products",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
