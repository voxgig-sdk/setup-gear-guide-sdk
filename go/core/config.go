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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "experienceLevel",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "useCase",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vertical",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "build_quote",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/ai/build-quote",
								"parts": []any{
									"api",
									"ai",
									"build-quote",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/build-quote",
								"parts": []any{
									"api",
									"ai",
									"build-quote",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
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
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "verdict",
						"short": "no_applicable_rules means no rule covered this product set (not a green pass).",
						"type": "`$STRING`",
					},
				},
				"name": "check_compatibility",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/ai/check-compatibility",
								"parts": []any{
									"api",
									"ai",
									"check-compatibility",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/check-compatibility",
								"parts": []any{
									"api",
									"ai",
									"check-compatibility",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
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
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "compare_product",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/ai/compare-products",
								"parts": []any{
									"api",
									"ai",
									"compare-products",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/compare-products",
								"parts": []any{
									"api",
									"ai",
									"compare-products",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "offers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "productId",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/get-affiliate-offers",
								"parts": []any{
									"api",
									"ai",
									"get-affiliate-offers",
								},
								"select": map[string]any{
									"exist": []any{
										"product_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "build",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "build_id",
											"orig": "build_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/get-build",
								"parts": []any{
									"api",
									"ai",
									"get-build",
								},
								"select": map[string]any{
									"exist": []any{
										"build_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"short": "Product-level spec verification: sourced = all key specs tied to a citable source; partially_sourced = some sourced, some flagged unverified; flagged = no key specs sourced yet (unverified or disputed).",
						"type": "`$STRING`",
					},
				},
				"name": "get_product",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/get-product",
								"parts": []any{
									"api",
									"ai",
									"get-product",
								},
								"select": map[string]any{
									"exist": []any{
										"product_id",
										"slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.product`",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "category",
						"req": true,
						"short": "category slug, e.g.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "recommendations",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "vertical",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "recommend_product",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/ai/recommend-products",
								"parts": []any{
									"api",
									"ai",
									"recommend-products",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/ai/recommend-products",
								"parts": []any{
									"api",
									"ai",
									"recommend-products",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
