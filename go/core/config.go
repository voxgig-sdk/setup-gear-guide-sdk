package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "SetupGearGuide",
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
						"active": true,
						"name": "budgetCents",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "experienceLevel",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "useCase",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "vertical",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "build_quote",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "productIds",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "verdict",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "check_compatibility",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "productIds",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
				},
				"name": "compare_product",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "attribution",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "offers",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "productId",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "get_affiliate_offer",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "attribution",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "build",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
				},
				"name": "get_build",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
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
								"index$": 0,
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
						"active": true,
						"name": "verificationStatus",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
				},
				"name": "get_product",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "product_id",
											"orig": "product_id",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "slug",
											"orig": "slug",
											"reqd": false,
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
								"index$": 0,
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
						"active": true,
						"name": "budgetCents",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "category",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "limit",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "recommendations",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "vertical",
						"req": true,
						"type": "`$STRING`",
						"index$": 4,
					},
				},
				"name": "recommend_product",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
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
								"index$": 0,
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
