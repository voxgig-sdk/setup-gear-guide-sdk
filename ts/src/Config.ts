
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'SetupGearGuide',
        slug: "setup-gear-guide",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://setupgearguide.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      build_quote: {
      },

      check_compatibility: {
      },

      compare_product: {
      },

      get_affiliate_offer: {
      },

      get_build: {
      },

      get_product: {
      },

      recommend_product: {
      },

    }
  }


  entity = {
    "build_quote": {
      "fields": [
        {
          "name": "budgetCents",
          "type": "`$INTEGER`"
        },
        {
          "name": "experienceLevel",
          "type": "`$STRING`"
        },
        {
          "name": "useCase",
          "type": "`$STRING`"
        },
        {
          "name": "vertical",
          "req": true,
          "type": "`$STRING`"
        }
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
                "build-quote"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                "build-quote"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "check_compatibility": {
      "fields": [
        {
          "name": "productIds",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "verdict",
          "short": "no_applicable_rules means no rule covered this product set (not a green pass).",
          "type": "`$STRING`"
        }
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
                "check-compatibility"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                "check-compatibility"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "compare_product": {
      "fields": [
        {
          "name": "productIds",
          "req": true,
          "type": "`$ARRAY`"
        }
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
                "compare-products"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                "compare-products"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_affiliate_offer": {
      "fields": [
        {
          "name": "attribution",
          "type": "`$OBJECT`"
        },
        {
          "name": "offers",
          "type": "`$ARRAY`"
        },
        {
          "name": "productId",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/ai/get-affiliate-offers",
              "parts": [
                "api",
                "ai",
                "get-affiliate-offers"
              ],
              "select": {
                "exist": [
                  "product_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_build": {
      "fields": [
        {
          "name": "attribution",
          "type": "`$OBJECT`"
        },
        {
          "name": "build",
          "type": "`$OBJECT`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/ai/get-build",
              "parts": [
                "api",
                "ai",
                "get-build"
              ],
              "select": {
                "exist": [
                  "build_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_product": {
      "fields": [
        {
          "name": "verificationStatus",
          "short": "Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).",
          "type": "`$STRING`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "slug",
                    "orig": "slug",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/ai/get-product",
              "parts": [
                "api",
                "ai",
                "get-product"
              ],
              "select": {
                "exist": [
                  "product_id",
                  "slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.product`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "recommend_product": {
      "fields": [
        {
          "name": "budgetCents",
          "type": "`$INTEGER`"
        },
        {
          "name": "category",
          "req": true,
          "short": "category slug, e.g.",
          "type": "`$STRING`"
        },
        {
          "name": "limit",
          "type": "`$INTEGER`"
        },
        {
          "name": "recommendations",
          "type": "`$ARRAY`"
        },
        {
          "name": "vertical",
          "req": true,
          "type": "`$STRING`"
        }
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
                "recommend-products"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                "recommend-products"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

