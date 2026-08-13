# SetupGearGuide Python SDK



The Python SDK for the SetupGearGuide API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.BuildQuote()` — each
carrying a small, uniform set of operations (`load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/setup-gear-guide-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from setupgearguide_sdk import SetupGearGuideSDK

client = SetupGearGuideSDK()
```

### 3. Load a buildquote

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    buildquote = client.BuildQuote().load()
    print(buildquote)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.BuildQuote().create({"vertical": "example_vertical"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    checkcompatibility = client.CheckCompatibility().load()
    print(checkcompatibility)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = SetupGearGuideSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
checkcompatibility = client.CheckCompatibility().load()
# checkcompatibility contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = SetupGearGuideSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SETUP_GEAR_GUIDE_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### SetupGearGuideSDK

```python
from setupgearguide_sdk import SetupGearGuideSDK

client = SetupGearGuideSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = SetupGearGuideSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### SetupGearGuideSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `BuildQuote` | `(data) -> BuildQuoteEntity` | Create a BuildQuote entity instance. |
| `CheckCompatibility` | `(data) -> CheckCompatibilityEntity` | Create a CheckCompatibility entity instance. |
| `CompareProduct` | `(data) -> CompareProductEntity` | Create a CompareProduct entity instance. |
| `GetAffiliateOffer` | `(data) -> GetAffiliateOfferEntity` | Create a GetAffiliateOffer entity instance. |
| `GetBuild` | `(data) -> GetBuildEntity` | Create a GetBuild entity instance. |
| `GetProduct` | `(data) -> GetProductEntity` | Create a GetProduct entity instance. |
| `RecommendProduct` | `(data) -> RecommendProductEntity` | Create a RecommendProduct entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### BuildQuote

| Field | Description |
| --- | --- |
| `budgetCents` |  |
| `experienceLevel` |  |
| `useCase` |  |
| `vertical` |  |

Operations: Create, Load.

API path: `/api/ai/build-quote`

#### CheckCompatibility

| Field | Description |
| --- | --- |
| `productIds` |  |
| `verdict` |  |

Operations: Create, Load.

API path: `/api/ai/check-compatibility`

#### CompareProduct

| Field | Description |
| --- | --- |
| `productIds` |  |

Operations: Create, Load.

API path: `/api/ai/compare-products`

#### GetAffiliateOffer

| Field | Description |
| --- | --- |
| `attribution` |  |
| `offers` |  |
| `productId` |  |

Operations: Load.

API path: `/api/ai/get-affiliate-offers`

#### GetBuild

| Field | Description |
| --- | --- |
| `attribution` |  |
| `build` |  |

Operations: Load.

API path: `/api/ai/get-build`

#### GetProduct

| Field | Description |
| --- | --- |
| `verificationStatus` |  |

Operations: Load.

API path: `/api/ai/get-product`

#### RecommendProduct

| Field | Description |
| --- | --- |
| `budgetCents` |  |
| `category` |  |
| `limit` |  |
| `recommendations` |  |
| `vertical` |  |

Operations: Create, Load.

API path: `/api/ai/recommend-products`



## Entities


### BuildQuote

Create an instance: `build_quote = client.BuildQuote()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budgetCents` | `int` |  |
| `experienceLevel` | `str` |  |
| `useCase` | `str` |  |
| `vertical` | `str` |  |

#### Example: Load

```python
build_quote = client.BuildQuote().load()
```

#### Example: Create

```python
build_quote = client.BuildQuote().create({
    "vertical": "example_vertical",  # str
})
```


### CheckCompatibility

Create an instance: `check_compatibility = client.CheckCompatibility()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `list` |  |
| `verdict` | `str` |  |

#### Example: Load

```python
check_compatibility = client.CheckCompatibility().load()
```

#### Example: Create

```python
check_compatibility = client.CheckCompatibility().create({
    "productIds": [],  # list
})
```


### CompareProduct

Create an instance: `compare_product = client.CompareProduct()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `list` |  |

#### Example: Load

```python
compare_product = client.CompareProduct().load()
```

#### Example: Create

```python
compare_product = client.CompareProduct().create({
    "productIds": [],  # list
})
```


### GetAffiliateOffer

Create an instance: `get_affiliate_offer = client.GetAffiliateOffer()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `dict` |  |
| `offers` | `list` |  |
| `productId` | `str` |  |

#### Example: Load

```python
get_affiliate_offer = client.GetAffiliateOffer().load()
```


### GetBuild

Create an instance: `get_build = client.GetBuild()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `dict` |  |
| `build` | `dict` |  |

#### Example: Load

```python
get_build = client.GetBuild().load()
```


### GetProduct

Create an instance: `get_product = client.GetProduct()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `verificationStatus` | `str` |  |

#### Example: Load

```python
get_product = client.GetProduct().load()
```


### RecommendProduct

Create an instance: `recommend_product = client.RecommendProduct()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budgetCents` | `int` |  |
| `category` | `str` |  |
| `limit` | `int` |  |
| `recommendations` | `list` |  |
| `vertical` | `str` |  |

#### Example: Load

```python
recommend_product = client.RecommendProduct().load()
```

#### Example: Create

```python
recommend_product = client.RecommendProduct().create({
    "category": "example_category",  # str
    "vertical": "example_vertical",  # str
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── setupgearguide_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`setupgearguide_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
checkcompatibility = client.CheckCompatibility()
checkcompatibility.load()

# checkcompatibility.data_get() now returns the checkcompatibility data from the last load
# checkcompatibility.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
