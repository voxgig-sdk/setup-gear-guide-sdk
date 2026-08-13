# SetupGearGuide SDK configuration

module SetupGearGuideConfig
  def self.make_config
    {
      "main" => {
        "name" => "SetupGearGuide",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "active" => true,
              "name" => "budgetCents",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "experienceLevel",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "useCase",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "vertical",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
          ],
          "name" => "build_quote",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ai/build-quote",
                  "parts" => [
                    "api",
                    "ai",
                    "build-quote",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/build-quote",
                  "parts" => [
                    "api",
                    "ai",
                    "build-quote",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "check_compatibility" => {
          "fields" => [
            {
              "active" => true,
              "name" => "productIds",
              "req" => true,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "verdict",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "check_compatibility",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ai/check-compatibility",
                  "parts" => [
                    "api",
                    "ai",
                    "check-compatibility",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/check-compatibility",
                  "parts" => [
                    "api",
                    "ai",
                    "check-compatibility",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "compare_product" => {
          "fields" => [
            {
              "active" => true,
              "name" => "productIds",
              "req" => true,
              "type" => "`$ARRAY`",
              "index$" => 0,
            },
          ],
          "name" => "compare_product",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ai/compare-products",
                  "parts" => [
                    "api",
                    "ai",
                    "compare-products",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/compare-products",
                  "parts" => [
                    "api",
                    "ai",
                    "compare-products",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_affiliate_offer" => {
          "fields" => [
            {
              "active" => true,
              "name" => "attribution",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "offers",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "productId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
          ],
          "name" => "get_affiliate_offer",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "product_id",
                        "orig" => "product_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/get-affiliate-offers",
                  "parts" => [
                    "api",
                    "ai",
                    "get-affiliate-offers",
                  ],
                  "select" => {
                    "exist" => [
                      "product_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_build" => {
          "fields" => [
            {
              "active" => true,
              "name" => "attribution",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "build",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 1,
            },
          ],
          "name" => "get_build",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "build_id",
                        "orig" => "build_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/get-build",
                  "parts" => [
                    "api",
                    "ai",
                    "get-build",
                  ],
                  "select" => {
                    "exist" => [
                      "build_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_product" => {
          "fields" => [
            {
              "active" => true,
              "name" => "verificationStatus",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
          ],
          "name" => "get_product",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "product_id",
                        "orig" => "product_id",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "slug",
                        "orig" => "slug",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/get-product",
                  "parts" => [
                    "api",
                    "ai",
                    "get-product",
                  ],
                  "select" => {
                    "exist" => [
                      "product_id",
                      "slug",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.product`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "recommend_product" => {
          "fields" => [
            {
              "active" => true,
              "name" => "budgetCents",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "category",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "limit",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "recommendations",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "vertical",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
          ],
          "name" => "recommend_product",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/ai/recommend-products",
                  "parts" => [
                    "api",
                    "ai",
                    "recommend-products",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/ai/recommend-products",
                  "parts" => [
                    "api",
                    "ai",
                    "recommend-products",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
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
