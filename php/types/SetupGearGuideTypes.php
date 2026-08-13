<?php
declare(strict_types=1);

// Typed models for the SetupGearGuide SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BuildQuote entity data model. */
class BuildQuote
{
    public ?int $budgetCents = null;
    public ?string $experienceLevel = null;
    public ?string $useCase = null;
    public string $vertical;
}

/** Request payload for BuildQuote#load. */
class BuildQuoteLoadMatch
{
    public ?int $budgetCents = null;
    public ?string $experienceLevel = null;
    public ?string $useCase = null;
    public ?string $vertical = null;
}

/** Request payload for BuildQuote#create. */
class BuildQuoteCreateData
{
    public ?int $budgetCents = null;
    public ?string $experienceLevel = null;
    public ?string $useCase = null;
    public string $vertical;
}

/** CheckCompatibility entity data model. */
class CheckCompatibility
{
    public array $productIds;
    public ?string $verdict = null;
}

/** Request payload for CheckCompatibility#load. */
class CheckCompatibilityLoadMatch
{
    public ?array $productIds = null;
    public ?string $verdict = null;
}

/** Request payload for CheckCompatibility#create. */
class CheckCompatibilityCreateData
{
    public array $productIds;
    public ?string $verdict = null;
}

/** CompareProduct entity data model. */
class CompareProduct
{
    public array $productIds;
}

/** Request payload for CompareProduct#load. */
class CompareProductLoadMatch
{
    public ?array $productIds = null;
}

/** Request payload for CompareProduct#create. */
class CompareProductCreateData
{
    public array $productIds;
}

/** GetAffiliateOffer entity data model. */
class GetAffiliateOffer
{
    public ?array $attribution = null;
    public ?array $offers = null;
    public ?string $productId = null;
}

/** Request payload for GetAffiliateOffer#load. */
class GetAffiliateOfferLoadMatch
{
    public ?array $attribution = null;
    public ?array $offers = null;
    public ?string $productId = null;
}

/** GetBuild entity data model. */
class GetBuild
{
    public ?array $attribution = null;
    public ?array $build = null;
}

/** Request payload for GetBuild#load. */
class GetBuildLoadMatch
{
    public ?array $attribution = null;
    public ?array $build = null;
}

/** GetProduct entity data model. */
class GetProduct
{
    public ?string $verificationStatus = null;
}

/** Request payload for GetProduct#load. */
class GetProductLoadMatch
{
    public ?string $verificationStatus = null;
}

/** RecommendProduct entity data model. */
class RecommendProduct
{
    public ?int $budgetCents = null;
    public string $category;
    public ?int $limit = null;
    public ?array $recommendations = null;
    public string $vertical;
}

/** Request payload for RecommendProduct#load. */
class RecommendProductLoadMatch
{
    public ?int $budgetCents = null;
    public ?string $category = null;
    public ?int $limit = null;
    public ?array $recommendations = null;
    public ?string $vertical = null;
}

/** Request payload for RecommendProduct#create. */
class RecommendProductCreateData
{
    public ?int $budgetCents = null;
    public string $category;
    public ?int $limit = null;
    public ?array $recommendations = null;
    public string $vertical;
}

