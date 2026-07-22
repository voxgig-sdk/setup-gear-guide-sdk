# SetupGearGuide Python SDK Reference

Complete API reference for the SetupGearGuide Python SDK.


## SetupGearGuideSDK

### Constructor

```python
from setupgearguide_sdk import SetupGearGuideSDK

client = SetupGearGuideSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SetupGearGuideSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = SetupGearGuideSDK.test()
```


### Instance Methods

#### `BuildQuote(data=None)`

Create a new `BuildQuoteEntity` instance. Pass `None` for no initial data.

#### `CheckCompatibility(data=None)`

Create a new `CheckCompatibilityEntity` instance. Pass `None` for no initial data.

#### `CompareProduct(data=None)`

Create a new `CompareProductEntity` instance. Pass `None` for no initial data.

#### `GetAffiliateOffer(data=None)`

Create a new `GetAffiliateOfferEntity` instance. Pass `None` for no initial data.

#### `GetBuild(data=None)`

Create a new `GetBuildEntity` instance. Pass `None` for no initial data.

#### `GetProduct(data=None)`

Create a new `GetProductEntity` instance. Pass `None` for no initial data.

#### `RecommendProduct(data=None)`

Create a new `RecommendProductEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BuildQuoteEntity

```python
build_quote = client.BuildQuote()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budget_cent` | `int` | No |  |
| `experience_level` | `str` | No |  |
| `use_case` | `str` | No |  |
| `vertical` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BuildQuote().create({
    "vertical": "example_vertical",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BuildQuote().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BuildQuoteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CheckCompatibilityEntity

```python
check_compatibility = client.CheckCompatibility()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `product_id` | `list` | Yes |  |
| `verdict` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CheckCompatibility().create({
    "product_id": [],  # list
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CheckCompatibility().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CheckCompatibilityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CompareProductEntity

```python
compare_product = client.CompareProduct()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `product_id` | `list` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CompareProduct().create({
    "product_id": [],  # list
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CompareProduct().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompareProductEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetAffiliateOfferEntity

```python
get_affiliate_offer = client.GetAffiliateOffer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `dict` | No |  |
| `offer` | `list` | No |  |
| `product_id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetAffiliateOffer().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetAffiliateOfferEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetBuildEntity

```python
get_build = client.GetBuild()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `dict` | No |  |
| `build` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetBuild().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetBuildEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetProductEntity

```python
get_product = client.GetProduct()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `product` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetProduct().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetProductEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecommendProductEntity

```python
recommend_product = client.RecommendProduct()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budget_cent` | `int` | No |  |
| `category` | `str` | Yes |  |
| `limit` | `int` | No |  |
| `recommendation` | `list` | No |  |
| `vertical` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.RecommendProduct().create({
    "category": "example_category",  # str
    "vertical": "example_vertical",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RecommendProduct().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecommendProductEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = SetupGearGuideSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

