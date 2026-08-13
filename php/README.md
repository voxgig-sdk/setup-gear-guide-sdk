# SetupGearGuide PHP SDK



The PHP SDK for the SetupGearGuide API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->BuildQuote()` — with named operations (`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/setup-gear-guide-sdk/releases](https://github.com/voxgig-sdk/setup-gear-guide-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'setupgearguide_sdk.php';

$client = new SetupGearGuideSDK();
```

### 3. Load a buildquote

```php
try {
    // load() returns the ENTITY — call data_get() for the BuildQuote record (throws on error).
    $buildquote = $client->BuildQuote()->load();
    print_r($buildquote);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created BuildQuote record.
$created = $client->BuildQuote()->create(["vertical" => "example_vertical"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $checkcompatibility = $client->CheckCompatibility()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = SetupGearGuideSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$checkcompatibility = $client->CheckCompatibility()->load();
print_r($checkcompatibility);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new SetupGearGuideSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
SETUP_GEAR_GUIDE_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### SetupGearGuideSDK

```php
require_once 'setupgearguide_sdk.php';
$client = new SetupGearGuideSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = SetupGearGuideSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### SetupGearGuideSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `BuildQuote` | `($data): BuildQuoteEntity` | Create a BuildQuote entity instance. |
| `CheckCompatibility` | `($data): CheckCompatibilityEntity` | Create a CheckCompatibility entity instance. |
| `CompareProduct` | `($data): CompareProductEntity` | Create a CompareProduct entity instance. |
| `GetAffiliateOffer` | `($data): GetAffiliateOfferEntity` | Create a GetAffiliateOffer entity instance. |
| `GetBuild` | `($data): GetBuildEntity` | Create a GetBuild entity instance. |
| `GetProduct` | `($data): GetProductEntity` | Create a GetProduct entity instance. |
| `RecommendProduct` | `($data): RecommendProductEntity` | Create a RecommendProduct entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$build_quote = $client->BuildQuote();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budgetCents` | `int` |  |
| `experienceLevel` | `string` |  |
| `useCase` | `string` |  |
| `vertical` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the BuildQuote record (throws on error).
$build_quote = $client->BuildQuote()->load();
```

#### Example: Create

```php
$build_quote = $client->BuildQuote()->create([
    "vertical" => null, // string
]);
```


### CheckCompatibility

Create an instance: `$check_compatibility = $client->CheckCompatibility();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `array` |  |
| `verdict` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CheckCompatibility record (throws on error).
$check_compatibility = $client->CheckCompatibility()->load();
```

#### Example: Create

```php
$check_compatibility = $client->CheckCompatibility()->create([
    "productIds" => null, // array
]);
```


### CompareProduct

Create an instance: `$compare_product = $client->CompareProduct();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CompareProduct record (throws on error).
$compare_product = $client->CompareProduct()->load();
```

#### Example: Create

```php
$compare_product = $client->CompareProduct()->create([
    "productIds" => null, // array
]);
```


### GetAffiliateOffer

Create an instance: `$get_affiliate_offer = $client->GetAffiliateOffer();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `array` |  |
| `offers` | `array` |  |
| `productId` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GetAffiliateOffer record (throws on error).
$get_affiliate_offer = $client->GetAffiliateOffer()->load();
```


### GetBuild

Create an instance: `$get_build = $client->GetBuild();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `array` |  |
| `build` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GetBuild record (throws on error).
$get_build = $client->GetBuild()->load();
```


### GetProduct

Create an instance: `$get_product = $client->GetProduct();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `verificationStatus` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the GetProduct record (throws on error).
$get_product = $client->GetProduct()->load();
```


### RecommendProduct

Create an instance: `$recommend_product = $client->RecommendProduct();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budgetCents` | `int` |  |
| `category` | `string` |  |
| `limit` | `int` |  |
| `recommendations` | `array` |  |
| `vertical` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RecommendProduct record (throws on error).
$recommend_product = $client->RecommendProduct()->load();
```

#### Example: Create

```php
$recommend_product = $client->RecommendProduct()->create([
    "category" => null, // string
    "vertical" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── setupgearguide_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`setupgearguide_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$checkcompatibility = $client->CheckCompatibility();
$checkcompatibility->load();

// $checkcompatibility->data_get() now returns the checkcompatibility data from the last load
// $checkcompatibility->match_get() returns the last match criteria
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
