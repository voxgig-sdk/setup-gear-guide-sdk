# SetupGearGuide TypeScript SDK Reference

Complete API reference for the SetupGearGuide TypeScript SDK.


## SetupGearGuideSDK

### Constructor

```ts
new SetupGearGuideSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SetupGearGuideSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = SetupGearGuideSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `SetupGearGuideSDK` instance in test mode.


### Instance Methods

#### `BuildQuote(data?: object)`

Create a new `BuildQuote` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BuildQuoteEntity` instance.

#### `CheckCompatibility(data?: object)`

Create a new `CheckCompatibility` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CheckCompatibilityEntity` instance.

#### `CompareProduct(data?: object)`

Create a new `CompareProduct` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompareProductEntity` instance.

#### `GetAffiliateOffer(data?: object)`

Create a new `GetAffiliateOffer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetAffiliateOfferEntity` instance.

#### `GetBuild(data?: object)`

Create a new `GetBuild` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetBuildEntity` instance.

#### `GetProduct(data?: object)`

Create a new `GetProduct` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetProductEntity` instance.

#### `RecommendProduct(data?: object)`

Create a new `RecommendProduct` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecommendProductEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `SetupGearGuideSDK.test()`.

**Returns:** `SetupGearGuideSDK` instance in test mode.


---

## BuildQuoteEntity

```ts
const build_quote = client.BuildQuote()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budgetCents` | `number` | No |  |
| `experienceLevel` | `string` | No |  |
| `useCase` | `string` | No |  |
| `vertical` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BuildQuote().create({
  vertical: 'example_vertical',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BuildQuote().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BuildQuoteEntity` instance with the same client and
options.

#### `client()`

Return the parent `SetupGearGuideSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CheckCompatibilityEntity

```ts
const check_compatibility = client.CheckCompatibility()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `productIds` | `any[]` | Yes |  |
| `verdict` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CheckCompatibility().create({
  productIds: [],
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CheckCompatibility().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CheckCompatibilityEntity` instance with the same client and
options.

#### `client()`

Return the parent `SetupGearGuideSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CompareProductEntity

```ts
const compare_product = client.CompareProduct()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `productIds` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CompareProduct().create({
  productIds: [],
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CompareProduct().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompareProductEntity` instance with the same client and
options.

#### `client()`

Return the parent `SetupGearGuideSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetAffiliateOfferEntity

```ts
const get_affiliate_offer = client.GetAffiliateOffer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `Record<string, any>` | No |  |
| `offers` | `any[]` | No |  |
| `productId` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetAffiliateOffer().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetAffiliateOfferEntity` instance with the same client and
options.

#### `client()`

Return the parent `SetupGearGuideSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetBuildEntity

```ts
const get_build = client.GetBuild()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attribution` | `Record<string, any>` | No |  |
| `build` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetBuild().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetBuildEntity` instance with the same client and
options.

#### `client()`

Return the parent `SetupGearGuideSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetProductEntity

```ts
const get_product = client.GetProduct()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `verificationStatus` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetProduct().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetProductEntity` instance with the same client and
options.

#### `client()`

Return the parent `SetupGearGuideSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecommendProductEntity

```ts
const recommend_product = client.RecommendProduct()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `budgetCents` | `number` | No |  |
| `category` | `string` | Yes |  |
| `limit` | `number` | No |  |
| `recommendations` | `any[]` | No |  |
| `vertical` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.RecommendProduct().create({
  category: 'example_category',
  vertical: 'example_vertical',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RecommendProduct().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecommendProductEntity` instance with the same client and
options.

#### `client()`

Return the parent `SetupGearGuideSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new SetupGearGuideSDK({
  feature: {
    test: { active: true },
  }
})
```

