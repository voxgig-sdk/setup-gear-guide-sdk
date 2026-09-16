-- SetupGearGuide SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "SetupGearGuide",
      slug = "setup-gear-guide",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://setupgearguide.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["build_quote"] = {},
        ["check_compatibility"] = {},
        ["compare_product"] = {},
        ["get_affiliate_offer"] = {},
        ["get_build"] = {},
        ["get_product"] = {},
        ["recommend_product"] = {},
      },
    },
    entity = {
      ["build_quote"] = {
        ["fields"] = {
          {
            ["name"] = "budgetCents",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "experienceLevel",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "useCase",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "vertical",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "build_quote",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/ai/build-quote",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "build-quote",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "build-quote",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/ai/build-quote",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "build-quote",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "build-quote",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["check_compatibility"] = {
        ["fields"] = {
          {
            ["name"] = "productIds",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "verdict",
            ["short"] = "no_applicable_rules means no rule covered this product set (not a green pass).",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "check_compatibility",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/ai/check-compatibility",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "check-compatibility",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "check-compatibility",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/ai/check-compatibility",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "check-compatibility",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "check-compatibility",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["compare_product"] = {
        ["fields"] = {
          {
            ["name"] = "productIds",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "compare_product",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/ai/compare-products",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "compare-products",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "compare-products",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/ai/compare-products",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "compare-products",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "compare-products",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_affiliate_offer"] = {
        ["fields"] = {
          {
            ["name"] = "attribution",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "offers",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "productId",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_affiliate_offer",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "product_id",
                      ["orig"] = "product_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/ai/get-affiliate-offers",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "get-affiliate-offers",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "product_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "get-affiliate-offers",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_build"] = {
        ["fields"] = {
          {
            ["name"] = "attribution",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "build",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "get_build",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "build_id",
                      ["orig"] = "build_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/ai/get-build",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "get-build",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "build_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "get-build",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_product"] = {
        ["fields"] = {
          {
            ["name"] = "verificationStatus",
            ["short"] = "Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_product",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "product_id",
                      ["orig"] = "product_id",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "slug",
                      ["orig"] = "slug",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/ai/get-product",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "get-product",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "product_id",
                    "slug",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.product`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "get-product",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["recommend_product"] = {
        ["fields"] = {
          {
            ["name"] = "budgetCents",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "category",
            ["req"] = true,
            ["short"] = "category slug, e.g.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "limit",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "recommendations",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "vertical",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "recommend_product",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/ai/recommend-products",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "recommend-products",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "recommend-products",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/ai/recommend-products",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "ai",
                  },
                  {
                    ["lit"] = "recommend-products",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "ai",
                  "recommend-products",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
