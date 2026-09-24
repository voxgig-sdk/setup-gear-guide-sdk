# SetupGearGuide SDK configuration

module SetupGearGuideConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "SetupGearGuide",
        "slug" => "setup-gear-guide",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://setupgearguide.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "build_quote" => {},
          "check_compatibility" => {},
          "compare_product" => {},
          "get_affiliate_offer" => {},
          "get_build" => {},
          "get_product" => {},
          "recommend_product" => {},
        },
      },
      "entity" => {
        "build_quote" => {
          "fields" => [
            {
              "name" => "budgetCents",
              "title" => "Budget Cents",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "experienceLevel",
              "title" => "Experience Level",
              "type" => "`$STRING`",
            },
            {
              "name" => "useCase",
              "title" => "Use Case",
              "type" => "`$STRING`",
            },
            {
              "name" => "vertical",
              "title" => "Vertical",
              "type" => "`$STRING`",
              "req" => true,
            },
          ],
          "name" => "build_quote",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ai/build-quote",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "build-quote",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "build-quote",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/build-quote",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "build-quote",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "build-quote",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "check_compatibility" => {
          "fields" => [
            {
              "name" => "productIds",
              "title" => "Product Ids",
              "type" => "`$ARRAY`",
              "req" => true,
            },
            {
              "name" => "verdict",
              "title" => "Verdict",
              "type" => "`$STRING`",
              "short" => "no_applicable_rules means no rule covered this product set (not a green pass).",
            },
          ],
          "name" => "check_compatibility",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ai/check-compatibility",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "check-compatibility",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "check-compatibility",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/check-compatibility",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "check-compatibility",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "check-compatibility",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "compare_product" => {
          "fields" => [
            {
              "name" => "productIds",
              "title" => "Product Ids",
              "type" => "`$ARRAY`",
              "req" => true,
            },
          ],
          "name" => "compare_product",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ai/compare-products",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "compare-products",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "compare-products",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/compare-products",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "compare-products",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "compare-products",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_affiliate_offer" => {
          "fields" => [
            {
              "name" => "attribution",
              "title" => "Attribution",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "offers",
              "title" => "Offers",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "productId",
              "title" => "Product Id",
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_affiliate_offer",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/get-affiliate-offers",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "get-affiliate-offers",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "get-affiliate-offers",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "product_id",
                        "orig" => "product_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "product_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_build" => {
          "fields" => [
            {
              "name" => "attribution",
              "title" => "Attribution",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "build",
              "title" => "Build",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "get_build",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/get-build",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "get-build",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "get-build",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "build_id",
                        "orig" => "build_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "build_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_product" => {
          "fields" => [
            {
              "name" => "verificationStatus",
              "title" => "Verification Status",
              "type" => "`$STRING`",
              "short" => "Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).",
            },
          ],
          "name" => "get_product",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/get-product",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "get-product",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "get-product",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.product`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "product_id",
                        "orig" => "product_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "slug",
                        "orig" => "slug",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "product_id",
                      "slug",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "recommend_product" => {
          "fields" => [
            {
              "name" => "budgetCents",
              "title" => "Budget Cents",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "category",
              "title" => "Category",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "category slug, e.g.",
            },
            {
              "name" => "limit",
              "title" => "Limit",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "recommendations",
              "title" => "Recommendations",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "vertical",
              "title" => "Vertical",
              "type" => "`$STRING`",
              "req" => true,
            },
          ],
          "name" => "recommend_product",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ai/recommend-products",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "recommend-products",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "recommend-products",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/recommend-products",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "ai",
                    },
                    {
                      "lit" => "recommend-products",
                    },
                  ],
                  "parts" => [
                    "api",
                    "ai",
                    "recommend-products",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    SetupGearGuideFeatures.make_feature(name)
  end
end
