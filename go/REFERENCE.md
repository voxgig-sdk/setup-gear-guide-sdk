# SetupGearGuide Golang SDK Reference

Complete API reference for the SetupGearGuide Golang SDK.


## SetupGearGuideSDK

### Constructor

```go
func NewSetupGearGuideSDK(options map[string]any) *SetupGearGuideSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *SetupGearGuideSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *SetupGearGuideSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `BuildQuote(data map[string]any) SetupGearGuideEntity`

Create a new `BuildQuote` entity instance. Pass `nil` for no initial data.

#### `CheckCompatibility(data map[string]any) SetupGearGuideEntity`

Create a new `CheckCompatibility` entity instance. Pass `nil` for no initial data.

#### `CompareProduct(data map[string]any) SetupGearGuideEntity`

Create a new `CompareProduct` entity instance. Pass `nil` for no initial data.

#### `GetAffiliateOffer(data map[string]any) SetupGearGuideEntity`

Create a new `GetAffiliateOffer` entity instance. Pass `nil` for no initial data.

#### `GetBuild(data map[string]any) SetupGearGuideEntity`

Create a new `GetBuild` entity instance. Pass `nil` for no initial data.

#### `GetProduct(data map[string]any) SetupGearGuideEntity`

Create a new `GetProduct` entity instance. Pass `nil` for no initial data.

#### `RecommendProduct(data map[string]any) SetupGearGuideEntity`

Create a new `RecommendProduct` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BuildQuoteEntity

```go
buildQuote := client.BuildQuote(nil)
fmt.Println(buildQuote.GetName()) // "build_quote"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budgetCents` | `int` | No |  |
| `experienceLevel` | `string` | No |  |
| `useCase` | `string` | No |  |
| `vertical` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BuildQuote(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.BuildQuote(nil).Create(map[string]any{
    "vertical": "example_vertical",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BuildQuoteEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CheckCompatibilityEntity

```go
checkCompatibility := client.CheckCompatibility(nil)
fmt.Println(checkCompatibility.GetName()) // "check_compatibility"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `productIds` | `[]any` | Yes |  |
| `verdict` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CheckCompatibility(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CheckCompatibility(nil).Create(map[string]any{
    "productIds": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CheckCompatibilityEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CompareProductEntity

```go
compareProduct := client.CompareProduct(nil)
fmt.Println(compareProduct.GetName()) // "compare_product"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `productIds` | `[]any` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CompareProduct(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CompareProduct(nil).Create(map[string]any{
    "productIds": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CompareProductEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetAffiliateOfferEntity

```go
getAffiliateOffer := client.GetAffiliateOffer(nil)
fmt.Println(getAffiliateOffer.GetName()) // "get_affiliate_offer"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `map[string]any` | No |  |
| `offers` | `[]any` | No |  |
| `productId` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetAffiliateOffer(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetAffiliateOfferEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetBuildEntity

```go
getBuild := client.GetBuild(nil)
fmt.Println(getBuild.GetName()) // "get_build"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `map[string]any` | No |  |
| `build` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetBuild(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetBuildEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetProductEntity

```go
getProduct := client.GetProduct(nil)
fmt.Println(getProduct.GetName()) // "get_product"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `verificationStatus` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetProduct(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetProductEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RecommendProductEntity

```go
recommendProduct := client.RecommendProduct(nil)
fmt.Println(recommendProduct.GetName()) // "recommend_product"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budgetCents` | `int` | No |  |
| `category` | `string` | Yes |  |
| `limit` | `int` | No |  |
| `recommendations` | `[]any` | No |  |
| `vertical` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RecommendProduct(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.RecommendProduct(nil).Create(map[string]any{
    "category": "example_category",
    "vertical": "example_vertical",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecommendProductEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewSetupGearGuideSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

