# SetupGearGuide Ruby SDK Reference

Complete API reference for the SetupGearGuide Ruby SDK.


## SetupGearGuideSDK

### Constructor

```ruby
require_relative 'SetupGearGuide_sdk'

client = SetupGearGuideSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SetupGearGuideSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = SetupGearGuideSDK.test
```


### Instance Methods

#### `BuildQuote(data = nil)`

Create a new `BuildQuote` entity instance. Pass `nil` for no initial data.

#### `CheckCompatibility(data = nil)`

Create a new `CheckCompatibility` entity instance. Pass `nil` for no initial data.

#### `CompareProduct(data = nil)`

Create a new `CompareProduct` entity instance. Pass `nil` for no initial data.

#### `GetAffiliateOffer(data = nil)`

Create a new `GetAffiliateOffer` entity instance. Pass `nil` for no initial data.

#### `GetBuild(data = nil)`

Create a new `GetBuild` entity instance. Pass `nil` for no initial data.

#### `GetProduct(data = nil)`

Create a new `GetProduct` entity instance. Pass `nil` for no initial data.

#### `RecommendProduct(data = nil)`

Create a new `RecommendProduct` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BuildQuoteEntity

```ruby
build_quote = client.BuildQuote
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budgetCents` | `Integer` | No |  |
| `experienceLevel` | `String` | No |  |
| `useCase` | `String` | No |  |
| `vertical` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.BuildQuote.create({
  "vertical" => "example_vertical", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.BuildQuote.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BuildQuoteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CheckCompatibilityEntity

```ruby
check_compatibility = client.CheckCompatibility
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `productIds` | `Array` | Yes |  |
| `verdict` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CheckCompatibility.create({
  "productIds" => [], # Array
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CheckCompatibility.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CheckCompatibilityEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CompareProductEntity

```ruby
compare_product = client.CompareProduct
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `productIds` | `Array` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CompareProduct.create({
  "productIds" => [], # Array
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CompareProduct.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CompareProductEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetAffiliateOfferEntity

```ruby
get_affiliate_offer = client.GetAffiliateOffer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `Hash` | No |  |
| `offers` | `Array` | No |  |
| `productId` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GetAffiliateOffer.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetAffiliateOfferEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetBuildEntity

```ruby
get_build = client.GetBuild
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `Hash` | No |  |
| `build` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GetBuild.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetBuildEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetProductEntity

```ruby
get_product = client.GetProduct
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `verificationStatus` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GetProduct.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetProductEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RecommendProductEntity

```ruby
recommend_product = client.RecommendProduct
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budgetCents` | `Integer` | No |  |
| `category` | `String` | Yes |  |
| `limit` | `Integer` | No |  |
| `recommendations` | `Array` | No |  |
| `vertical` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.RecommendProduct.create({
  "category" => "example_category", # String
  "vertical" => "example_vertical", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.RecommendProduct.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RecommendProductEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = SetupGearGuideSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

