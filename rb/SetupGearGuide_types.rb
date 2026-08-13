# frozen_string_literal: true

# Typed models for the SetupGearGuide SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BuildQuote entity data model.
#
# @!attribute [rw] budgetCents
#   @return [Integer, nil]
#
# @!attribute [rw] experienceLevel
#   @return [String, nil]
#
# @!attribute [rw] useCase
#   @return [String, nil]
#
# @!attribute [rw] vertical
#   @return [String]
BuildQuote = Struct.new(
  :budgetCents,
  :experienceLevel,
  :useCase,
  :vertical,
  keyword_init: true
)

# Request payload for BuildQuote#load.
#
# @!attribute [rw] budgetCents
#   @return [Integer, nil]
#
# @!attribute [rw] experienceLevel
#   @return [String, nil]
#
# @!attribute [rw] useCase
#   @return [String, nil]
#
# @!attribute [rw] vertical
#   @return [String, nil]
BuildQuoteLoadMatch = Struct.new(
  :budgetCents,
  :experienceLevel,
  :useCase,
  :vertical,
  keyword_init: true
)

# Request payload for BuildQuote#create.
#
# @!attribute [rw] budgetCents
#   @return [Integer, nil]
#
# @!attribute [rw] experienceLevel
#   @return [String, nil]
#
# @!attribute [rw] useCase
#   @return [String, nil]
#
# @!attribute [rw] vertical
#   @return [String]
BuildQuoteCreateData = Struct.new(
  :budgetCents,
  :experienceLevel,
  :useCase,
  :vertical,
  keyword_init: true
)

# CheckCompatibility entity data model.
#
# @!attribute [rw] productIds
#   @return [Array]
#
# @!attribute [rw] verdict
#   @return [String, nil]
CheckCompatibility = Struct.new(
  :productIds,
  :verdict,
  keyword_init: true
)

# Request payload for CheckCompatibility#load.
#
# @!attribute [rw] productIds
#   @return [Array, nil]
#
# @!attribute [rw] verdict
#   @return [String, nil]
CheckCompatibilityLoadMatch = Struct.new(
  :productIds,
  :verdict,
  keyword_init: true
)

# Request payload for CheckCompatibility#create.
#
# @!attribute [rw] productIds
#   @return [Array]
#
# @!attribute [rw] verdict
#   @return [String, nil]
CheckCompatibilityCreateData = Struct.new(
  :productIds,
  :verdict,
  keyword_init: true
)

# CompareProduct entity data model.
#
# @!attribute [rw] productIds
#   @return [Array]
CompareProduct = Struct.new(
  :productIds,
  keyword_init: true
)

# Request payload for CompareProduct#load.
#
# @!attribute [rw] productIds
#   @return [Array, nil]
CompareProductLoadMatch = Struct.new(
  :productIds,
  keyword_init: true
)

# Request payload for CompareProduct#create.
#
# @!attribute [rw] productIds
#   @return [Array]
CompareProductCreateData = Struct.new(
  :productIds,
  keyword_init: true
)

# GetAffiliateOffer entity data model.
#
# @!attribute [rw] attribution
#   @return [Hash, nil]
#
# @!attribute [rw] offers
#   @return [Array, nil]
#
# @!attribute [rw] productId
#   @return [String, nil]
GetAffiliateOffer = Struct.new(
  :attribution,
  :offers,
  :productId,
  keyword_init: true
)

# Request payload for GetAffiliateOffer#load.
#
# @!attribute [rw] attribution
#   @return [Hash, nil]
#
# @!attribute [rw] offers
#   @return [Array, nil]
#
# @!attribute [rw] productId
#   @return [String, nil]
GetAffiliateOfferLoadMatch = Struct.new(
  :attribution,
  :offers,
  :productId,
  keyword_init: true
)

# GetBuild entity data model.
#
# @!attribute [rw] attribution
#   @return [Hash, nil]
#
# @!attribute [rw] build
#   @return [Hash, nil]
GetBuild = Struct.new(
  :attribution,
  :build,
  keyword_init: true
)

# Request payload for GetBuild#load.
#
# @!attribute [rw] attribution
#   @return [Hash, nil]
#
# @!attribute [rw] build
#   @return [Hash, nil]
GetBuildLoadMatch = Struct.new(
  :attribution,
  :build,
  keyword_init: true
)

# GetProduct entity data model.
#
# @!attribute [rw] verificationStatus
#   @return [String, nil]
GetProduct = Struct.new(
  :verificationStatus,
  keyword_init: true
)

# Request payload for GetProduct#load.
#
# @!attribute [rw] verificationStatus
#   @return [String, nil]
GetProductLoadMatch = Struct.new(
  :verificationStatus,
  keyword_init: true
)

# RecommendProduct entity data model.
#
# @!attribute [rw] budgetCents
#   @return [Integer, nil]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] recommendations
#   @return [Array, nil]
#
# @!attribute [rw] vertical
#   @return [String]
RecommendProduct = Struct.new(
  :budgetCents,
  :category,
  :limit,
  :recommendations,
  :vertical,
  keyword_init: true
)

# Request payload for RecommendProduct#load.
#
# @!attribute [rw] budgetCents
#   @return [Integer, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] recommendations
#   @return [Array, nil]
#
# @!attribute [rw] vertical
#   @return [String, nil]
RecommendProductLoadMatch = Struct.new(
  :budgetCents,
  :category,
  :limit,
  :recommendations,
  :vertical,
  keyword_init: true
)

# Request payload for RecommendProduct#create.
#
# @!attribute [rw] budgetCents
#   @return [Integer, nil]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] recommendations
#   @return [Array, nil]
#
# @!attribute [rw] vertical
#   @return [String]
RecommendProductCreateData = Struct.new(
  :budgetCents,
  :category,
  :limit,
  :recommendations,
  :vertical,
  keyword_init: true
)

