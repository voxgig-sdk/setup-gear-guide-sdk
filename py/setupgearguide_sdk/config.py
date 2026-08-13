# SetupGearGuide SDK configuration


def make_config():
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
            "active": True,
            "name": "budgetCents",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "experienceLevel",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "useCase",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "vertical",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "build_quote",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "check_compatibility": {
        "fields": [
          {
            "active": True,
            "name": "productIds",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "verdict",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "check_compatibility",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "compare_product": {
        "fields": [
          {
            "active": True,
            "name": "productIds",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
        ],
        "name": "compare_product",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_affiliate_offer": {
        "fields": [
          {
            "active": True,
            "name": "attribution",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "offers",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "productId",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "get_affiliate_offer",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_build": {
        "fields": [
          {
            "active": True,
            "name": "attribution",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "build",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
        ],
        "name": "get_build",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_product": {
        "fields": [
          {
            "active": True,
            "name": "verificationStatus",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
        ],
        "name": "get_product",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "product_id",
                      "orig": "product_id",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": False,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "recommend_product": {
        "fields": [
          {
            "active": True,
            "name": "budgetCents",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "category",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "limit",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "recommendations",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "vertical",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
        ],
        "name": "recommend_product",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
