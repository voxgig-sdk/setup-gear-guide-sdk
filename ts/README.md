# SetupGearGuide TypeScript SDK



The TypeScript SDK for the SetupGearGuide API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.BuildQuote()` — each with a small set of operations (`load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/setup-gear-guide-sdk/releases](https://github.com/voxgig-sdk/setup-gear-guide-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { SetupGearGuideSDK } from '@voxgig-sdk/setup-gear-guide'

const client = new SetupGearGuideSDK()
```

### 3. Load a buildquote

`load()` returns the entity directly and throws on failure:

```ts
try {
  const buildquote = await client.BuildQuote().load()
  console.log(buildquote)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created BuildQuote ENTITY (.data() for the record)
const created = await client.BuildQuote().create({
  vertical: 'example_vertical',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const checkcompatibility = await client.CheckCompatibility().load()
  console.log(checkcompatibility)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = SetupGearGuideSDK.test()

const checkcompatibility = await client.CheckCompatibility().load()
// checkcompatibility is the entity, populated with mock response data
// — call checkcompatibility.data() for the record itself
console.log(checkcompatibility)
```

You can also use the instance method:

```ts
const client = new SetupGearGuideSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.CheckCompatibility()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new SetupGearGuideSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
SETUP_GEAR_GUIDE_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### SetupGearGuideSDK

#### Constructor

```ts
new SetupGearGuideSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `BuildQuote(data?)` | `BuildQuoteEntity` | Create a BuildQuote entity instance. |
| `CheckCompatibility(data?)` | `CheckCompatibilityEntity` | Create a CheckCompatibility entity instance. |
| `CompareProduct(data?)` | `CompareProductEntity` | Create a CompareProduct entity instance. |
| `GetAffiliateOffer(data?)` | `GetAffiliateOfferEntity` | Create a GetAffiliateOffer entity instance. |
| `GetBuild(data?)` | `GetBuildEntity` | Create a GetBuild entity instance. |
| `GetProduct(data?)` | `GetProductEntity` | Create a GetProduct entity instance. |
| `RecommendProduct(data?)` | `RecommendProductEntity` | Create a RecommendProduct entity instance. |
| `tester(testopts?, sdkopts?)` | `SetupGearGuideSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `SetupGearGuideSDK.test(testopts?, sdkopts?)` | `SetupGearGuideSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): SetupGearGuideSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### BuildQuote

| Field | Description |
| --- | --- |
| `budgetCents` |  |
| `experienceLevel` |  |
| `useCase` |  |
| `vertical` |  |

Operations: create, load.

API path: `/api/ai/build-quote`

#### CheckCompatibility

| Field | Description |
| --- | --- |
| `productIds` |  |
| `verdict` |  |

Operations: create, load.

API path: `/api/ai/check-compatibility`

#### CompareProduct

| Field | Description |
| --- | --- |
| `productIds` |  |

Operations: create, load.

API path: `/api/ai/compare-products`

#### GetAffiliateOffer

| Field | Description |
| --- | --- |
| `attribution` |  |
| `offers` |  |
| `productId` |  |

Operations: load.

API path: `/api/ai/get-affiliate-offers`

#### GetBuild

| Field | Description |
| --- | --- |
| `attribution` |  |
| `build` |  |

Operations: load.

API path: `/api/ai/get-build`

#### GetProduct

| Field | Description |
| --- | --- |
| `verificationStatus` |  |

Operations: load.

API path: `/api/ai/get-product`

#### RecommendProduct

| Field | Description |
| --- | --- |
| `budgetCents` |  |
| `category` |  |
| `limit` |  |
| `recommendations` |  |
| `vertical` |  |

Operations: create, load.

API path: `/api/ai/recommend-products`



## Entities


### BuildQuote

Create an instance: `const build_quote = client.BuildQuote()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budgetCents` | `number` |  |
| `experienceLevel` | `string` |  |
| `useCase` | `string` |  |
| `vertical` | `string` |  |

#### Example: Load

```ts
const build_quote = await client.BuildQuote().load()
```

#### Example: Create

```ts
const build_quote = await client.BuildQuote().create({
  vertical: 'example_vertical',
})
```


### CheckCompatibility

Create an instance: `const check_compatibility = client.CheckCompatibility()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `any[]` |  |
| `verdict` | `string` |  |

#### Example: Load

```ts
const check_compatibility = await client.CheckCompatibility().load()
```

#### Example: Create

```ts
const check_compatibility = await client.CheckCompatibility().create({
  productIds: [],
})
```


### CompareProduct

Create an instance: `const compare_product = client.CompareProduct()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `any[]` |  |

#### Example: Load

```ts
const compare_product = await client.CompareProduct().load()
```

#### Example: Create

```ts
const compare_product = await client.CompareProduct().create({
  productIds: [],
})
```


### GetAffiliateOffer

Create an instance: `const get_affiliate_offer = client.GetAffiliateOffer()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `Record<string, any>` |  |
| `offers` | `any[]` |  |
| `productId` | `string` |  |

#### Example: Load

```ts
const get_affiliate_offer = await client.GetAffiliateOffer().load()
```


### GetBuild

Create an instance: `const get_build = client.GetBuild()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attribution` | `Record<string, any>` |  |
| `build` | `Record<string, any>` |  |

#### Example: Load

```ts
const get_build = await client.GetBuild().load()
```


### GetProduct

Create an instance: `const get_product = client.GetProduct()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `verificationStatus` | `string` |  |

#### Example: Load

```ts
const get_product = await client.GetProduct().load()
```


### RecommendProduct

Create an instance: `const recommend_product = client.RecommendProduct()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `budgetCents` | `number` |  |
| `category` | `string` |  |
| `limit` | `number` |  |
| `recommendations` | `any[]` |  |
| `vertical` | `string` |  |

#### Example: Load

```ts
const recommend_product = await client.RecommendProduct().load()
```

#### Example: Create

```ts
const recommend_product = await client.RecommendProduct().create({
  category: 'example_category',
  vertical: 'example_vertical',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
setup-gear-guide/
├── src/
│   ├── SetupGearGuideSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { SetupGearGuideSDK } from '@voxgig-sdk/setup-gear-guide'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const checkcompatibility = client.CheckCompatibility()
await checkcompatibility.load()

// checkcompatibility.data() now returns the checkcompatibility data from the last `load`
// checkcompatibility.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
