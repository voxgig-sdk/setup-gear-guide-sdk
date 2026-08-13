# SetupGearGuide Golang SDK



The Golang SDK for the SetupGearGuide API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.BuildQuote(nil)` — each with the same small set of operations (`Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/setup-gear-guide-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/setup-gear-guide-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/setup-gear-guide-sdk/go=../setup-gear-guide-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/setup-gear-guide-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single buildQuote — the value is the loaded record.
    buildQuote, err := client.BuildQuote(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(buildQuote)

    // Create a buildQuote.
    created, err := client.BuildQuote(nil).Create(map[string]any{"vertical": "example_vertical"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
checkcompatibility, err := client.CheckCompatibility(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = checkcompatibility
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

checkCompatibility, err := client.CheckCompatibility(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(checkCompatibility) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewSetupGearGuideSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewSetupGearGuideSDK

```go
func NewSetupGearGuideSDK(options map[string]any) *SetupGearGuideSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *SetupGearGuideSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### SetupGearGuideSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `BuildQuote` | `(data map[string]any) SetupGearGuideEntity` | Create a BuildQuote entity instance. |
| `CheckCompatibility` | `(data map[string]any) SetupGearGuideEntity` | Create a CheckCompatibility entity instance. |
| `CompareProduct` | `(data map[string]any) SetupGearGuideEntity` | Create a CompareProduct entity instance. |
| `GetAffiliateOffer` | `(data map[string]any) SetupGearGuideEntity` | Create a GetAffiliateOffer entity instance. |
| `GetBuild` | `(data map[string]any) SetupGearGuideEntity` | Create a GetBuild entity instance. |
| `GetProduct` | `(data map[string]any) SetupGearGuideEntity` | Create a GetProduct entity instance. |
| `RecommendProduct` | `(data map[string]any) SetupGearGuideEntity` | Create a RecommendProduct entity instance. |

### Entity interface (SetupGearGuideEntity)

All entities implement the `SetupGearGuideEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    buildQuote, err := client.BuildQuote(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // buildQuote is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### BuildQuote

| Field | Description |
| --- | --- |
| `"budgetCents"` |  |
| `"experienceLevel"` |  |
| `"useCase"` |  |
| `"vertical"` |  |

Operations: Create, Load.

API path: `/api/ai/build-quote`

#### CheckCompatibility

| Field | Description |
| --- | --- |
| `"productIds"` |  |
| `"verdict"` |  |

Operations: Create, Load.

API path: `/api/ai/check-compatibility`

#### CompareProduct

| Field | Description |
| --- | --- |
| `"productIds"` |  |

Operations: Create, Load.

API path: `/api/ai/compare-products`

#### GetAffiliateOffer

| Field | Description |
| --- | --- |
| `"attribution"` |  |
| `"offers"` |  |
| `"productId"` |  |

Operations: Load.

API path: `/api/ai/get-affiliate-offers`

#### GetBuild

| Field | Description |
| --- | --- |
| `"attribution"` |  |
| `"build"` |  |

Operations: Load.

API path: `/api/ai/get-build`

#### GetProduct

| Field | Description |
| --- | --- |
| `"verificationStatus"` |  |

Operations: Load.

API path: `/api/ai/get-product`

#### RecommendProduct

| Field | Description |
| --- | --- |
| `"budgetCents"` |  |
| `"category"` |  |
| `"limit"` |  |
| `"recommendations"` |  |
| `"vertical"` |  |

Operations: Create, Load.

API path: `/api/ai/recommend-products`



## Entities


### BuildQuote

Create an instance: `buildQuote := client.BuildQuote(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budgetCents` | `int` |  |
| `experienceLevel` | `string` |  |
| `useCase` | `string` |  |
| `vertical` | `string` |  |

#### Example: Load

```go
buildQuote, err := client.BuildQuote(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(buildQuote) // the loaded record
```

#### Example: Create

```go
result, err := client.BuildQuote(nil).Create(map[string]any{
    "vertical": "example_vertical",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CheckCompatibility

Create an instance: `checkCompatibility := client.CheckCompatibility(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `[]any` |  |
| `verdict` | `string` |  |

#### Example: Load

```go
checkCompatibility, err := client.CheckCompatibility(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(checkCompatibility) // the loaded record
```

#### Example: Create

```go
result, err := client.CheckCompatibility(nil).Create(map[string]any{
    "productIds": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### CompareProduct

Create an instance: `compareProduct := client.CompareProduct(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `[]any` |  |

#### Example: Load

```go
compareProduct, err := client.CompareProduct(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(compareProduct) // the loaded record
```

#### Example: Create

```go
result, err := client.CompareProduct(nil).Create(map[string]any{
    "productIds": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### GetAffiliateOffer

Create an instance: `getAffiliateOffer := client.GetAffiliateOffer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `map[string]any` |  |
| `offers` | `[]any` |  |
| `productId` | `string` |  |

#### Example: Load

```go
getAffiliateOffer, err := client.GetAffiliateOffer(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(getAffiliateOffer) // the loaded record
```


### GetBuild

Create an instance: `getBuild := client.GetBuild(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `map[string]any` |  |
| `build` | `map[string]any` |  |

#### Example: Load

```go
getBuild, err := client.GetBuild(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(getBuild) // the loaded record
```


### GetProduct

Create an instance: `getProduct := client.GetProduct(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `verificationStatus` | `string` |  |

#### Example: Load

```go
getProduct, err := client.GetProduct(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(getProduct) // the loaded record
```


### RecommendProduct

Create an instance: `recommendProduct := client.RecommendProduct(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budgetCents` | `int` |  |
| `category` | `string` |  |
| `limit` | `int` |  |
| `recommendations` | `[]any` |  |
| `vertical` | `string` |  |

#### Example: Load

```go
recommendProduct, err := client.RecommendProduct(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(recommendProduct) // the loaded record
```

#### Example: Create

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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/setup-gear-guide-sdk/go/
├── setup-gear-guide.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/setup-gear-guide-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
checkcompatibility := client.CheckCompatibility(nil)
checkcompatibility.Load(nil, nil)

// checkcompatibility.Data() now returns the checkcompatibility data from the last load
// checkcompatibility.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
