# SetupGearGuide PHP SDK Reference

Complete API reference for the SetupGearGuide PHP SDK.


## SetupGearGuideSDK

### Constructor

```php
require_once __DIR__ . '/setupgearguide_sdk.php';

$client = new SetupGearGuideSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SetupGearGuideSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = SetupGearGuideSDK::test();
```


### Instance Methods

#### `BuildQuote($data = null)`

Create a new `BuildQuoteEntity` instance. Pass `null` for no initial data.

#### `CheckCompatibility($data = null)`

Create a new `CheckCompatibilityEntity` instance. Pass `null` for no initial data.

#### `CompareProduct($data = null)`

Create a new `CompareProductEntity` instance. Pass `null` for no initial data.

#### `GetAffiliateOffer($data = null)`

Create a new `GetAffiliateOfferEntity` instance. Pass `null` for no initial data.

#### `GetBuild($data = null)`

Create a new `GetBuildEntity` instance. Pass `null` for no initial data.

#### `GetProduct($data = null)`

Create a new `GetProductEntity` instance. Pass `null` for no initial data.

#### `RecommendProduct($data = null)`

Create a new `RecommendProductEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): SetupGearGuideUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BuildQuoteEntity

```php
$build_quote = $client->BuildQuote();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budgetCents` | `int` | No |  |
| `experienceLevel` | `string` | No |  |
| `useCase` | `string` | No |  |
| `vertical` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->BuildQuote()->create([
  "vertical" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BuildQuote()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BuildQuoteEntity`

Create a new `BuildQuoteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CheckCompatibilityEntity

```php
$check_compatibility = $client->CheckCompatibility();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `productIds` | `array` | Yes |  |
| `verdict` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CheckCompatibility()->create([
  "productIds" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CheckCompatibility()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CheckCompatibilityEntity`

Create a new `CheckCompatibilityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CompareProductEntity

```php
$compare_product = $client->CompareProduct();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `productIds` | `array` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CompareProduct()->create([
  "productIds" => null, // array
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CompareProduct()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CompareProductEntity`

Create a new `CompareProductEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetAffiliateOfferEntity

```php
$get_affiliate_offer = $client->GetAffiliateOffer();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `array` | No |  |
| `offers` | `array` | No |  |
| `productId` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetAffiliateOffer()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetAffiliateOfferEntity`

Create a new `GetAffiliateOfferEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetBuildEntity

```php
$get_build = $client->GetBuild();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `array` | No |  |
| `build` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetBuild()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetBuildEntity`

Create a new `GetBuildEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetProductEntity

```php
$get_product = $client->GetProduct();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `verificationStatus` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetProduct()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetProductEntity`

Create a new `GetProductEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecommendProductEntity

```php
$recommend_product = $client->RecommendProduct();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budgetCents` | `int` | No |  |
| `category` | `string` | Yes |  |
| `limit` | `int` | No |  |
| `recommendations` | `array` | No |  |
| `vertical` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->RecommendProduct()->create([
  "category" => null, // string
  "vertical" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RecommendProduct()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecommendProductEntity`

Create a new `RecommendProductEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new SetupGearGuideSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

