package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "SetupGearGuide",
			"slug": "setup-gear-guide",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://setupgearguide.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"build_quote": map[string]any{},
				"check_compatibility": map[string]any{},
				"compare_product": map[string]any{},
				"get_affiliate_offer": map[string]any{},
				"get_build": map[string]any{},
				"get_product": map[string]any{},
				"recommend_product": map[string]any{},
			},
		},
		"entity": map[string]any{
			"build_quote": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "budgetCents",
						"title": "Budget Cents",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "experienceLevel",
						"title": "Experience Level",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "useCase",
						"title": "Use Case",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vertical",
						"title": "Vertical",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "build_quote",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/ai/build-quote",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "build-quote",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"build-quote",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/build-quote",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "build-quote",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"build-quote",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"check_compatibility": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "productIds",
						"title": "Product Ids",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "verdict",
						"title": "Verdict",
						"type": "`$STRING`",
						"short": "no_applicable_rules means no rule covered this product set (not a green pass).",
					},
				},
				"name": "check_compatibility",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/ai/check-compatibility",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "check-compatibility",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"check-compatibility",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/check-compatibility",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "check-compatibility",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"check-compatibility",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"compare_product": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "productIds",
						"title": "Product Ids",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "compare_product",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/ai/compare-products",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "compare-products",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"compare-products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/compare-products",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "compare-products",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"compare-products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_affiliate_offer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "offers",
						"title": "Offers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "productId",
						"title": "Product Id",
						"type": "`$STRING`",
					},
				},
				"name": "get_affiliate_offer",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/get-affiliate-offers",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "get-affiliate-offers",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"get-affiliate-offers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "product_id",
											"orig": "product_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"product_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_build": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attribution",
						"title": "Attribution",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "build",
						"title": "Build",
						"type": "`$OBJECT`",
					},
				},
				"name": "get_build",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/get-build",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "get-build",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"get-build",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "build_id",
											"orig": "build_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"build_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_product": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "verificationStatus",
						"title": "Verification Status",
						"type": "`$STRING`",
						"short": "Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).",
					},
				},
				"name": "get_product",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/get-product",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "get-product",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"get-product",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.product`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "product_id",
											"orig": "product_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"product_id",
										"slug",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"recommend_product": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "budgetCents",
						"title": "Budget Cents",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
						"req": true,
						"short": "category slug, e.g.",
					},
					map[string]any{
						"name": "limit",
						"title": "Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "recommendations",
						"title": "Recommendations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "vertical",
						"title": "Vertical",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "recommend_product",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/ai/recommend-products",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "recommend-products",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"recommend-products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/recommend-products",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "ai",
									},
									map[string]any{
										"lit": "recommend-products",
									},
								},
								"parts": []any{
									"api",
									"ai",
									"recommend-products",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
