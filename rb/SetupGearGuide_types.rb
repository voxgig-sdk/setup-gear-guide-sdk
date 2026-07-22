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
# @!attribute [rw] budget_cent
#   @return [Integer, nil]
#
# @!attribute [rw] experience_level
#   @return [String, nil]
#
# @!attribute [rw] use_case
#   @return [String, nil]
#
# @!attribute [rw] vertical
#   @return [String]
BuildQuote = Struct.new(
  :budget_cent,
  :experience_level,
  :use_case,
  :vertical,
  keyword_init: true
)

# Request payload for BuildQuote#load.
#
# @!attribute [rw] budget_cent
#   @return [Integer, nil]
#
# @!attribute [rw] experience_level
#   @return [String, nil]
#
# @!attribute [rw] use_case
#   @return [String, nil]
#
# @!attribute [rw] vertical
#   @return [String, nil]
BuildQuoteLoadMatch = Struct.new(
  :budget_cent,
  :experience_level,
  :use_case,
  :vertical,
  keyword_init: true
)

# Request payload for BuildQuote#create.
#
# @!attribute [rw] budget_cent
#   @return [Integer, nil]
#
# @!attribute [rw] experience_level
#   @return [String, nil]
#
# @!attribute [rw] use_case
#   @return [String, nil]
#
# @!attribute [rw] vertical
#   @return [String]
BuildQuoteCreateData = Struct.new(
  :budget_cent,
  :experience_level,
  :use_case,
  :vertical,
  keyword_init: true
)

# CheckCompatibility entity data model.
#
# @!attribute [rw] product_id
#   @return [Array]
#
# @!attribute [rw] verdict
#   @return [String, nil]
CheckCompatibility = Struct.new(
  :product_id,
  :verdict,
  keyword_init: true
)

# Request payload for CheckCompatibility#load.
#
# @!attribute [rw] product_id
#   @return [Array, nil]
#
# @!attribute [rw] verdict
#   @return [String, nil]
CheckCompatibilityLoadMatch = Struct.new(
  :product_id,
  :verdict,
  keyword_init: true
)

# Request payload for CheckCompatibility#create.
#
# @!attribute [rw] product_id
#   @return [Array]
#
# @!attribute [rw] verdict
#   @return [String, nil]
CheckCompatibilityCreateData = Struct.new(
  :product_id,
  :verdict,
  keyword_init: true
)

# CompareProduct entity data model.
#
# @!attribute [rw] product_id
#   @return [Array]
CompareProduct = Struct.new(
  :product_id,
  keyword_init: true
)

# Request payload for CompareProduct#load.
#
# @!attribute [rw] product_id
#   @return [Array, nil]
CompareProductLoadMatch = Struct.new(
  :product_id,
  keyword_init: true
)

# Request payload for CompareProduct#create.
#
# @!attribute [rw] product_id
#   @return [Array]
CompareProductCreateData = Struct.new(
  :product_id,
  keyword_init: true
)

# GetAffiliateOffer entity data model.
#
# @!attribute [rw] attribution
#   @return [Hash, nil]
#
# @!attribute [rw] offer
#   @return [Array, nil]
#
# @!attribute [rw] product_id
#   @return [String, nil]
GetAffiliateOffer = Struct.new(
  :attribution,
  :offer,
  :product_id,
  keyword_init: true
)

# Request payload for GetAffiliateOffer#load.
#
# @!attribute [rw] attribution
#   @return [Hash, nil]
#
# @!attribute [rw] offer
#   @return [Array, nil]
#
# @!attribute [rw] product_id
#   @return [String, nil]
GetAffiliateOfferLoadMatch = Struct.new(
  :attribution,
  :offer,
  :product_id,
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
# @!attribute [rw] product
#   @return [Hash, nil]
GetProduct = Struct.new(
  :product,
  keyword_init: true
)

# Request payload for GetProduct#load.
#
# @!attribute [rw] product
#   @return [Hash, nil]
GetProductLoadMatch = Struct.new(
  :product,
  keyword_init: true
)

# RecommendProduct entity data model.
#
# @!attribute [rw] budget_cent
#   @return [Integer, nil]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] recommendation
#   @return [Array, nil]
#
# @!attribute [rw] vertical
#   @return [String]
RecommendProduct = Struct.new(
  :budget_cent,
  :category,
  :limit,
  :recommendation,
  :vertical,
  keyword_init: true
)

# Request payload for RecommendProduct#load.
#
# @!attribute [rw] budget_cent
#   @return [Integer, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] recommendation
#   @return [Array, nil]
#
# @!attribute [rw] vertical
#   @return [String, nil]
RecommendProductLoadMatch = Struct.new(
  :budget_cent,
  :category,
  :limit,
  :recommendation,
  :vertical,
  keyword_init: true
)

# Request payload for RecommendProduct#create.
#
# @!attribute [rw] budget_cent
#   @return [Integer, nil]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] recommendation
#   @return [Array, nil]
#
# @!attribute [rw] vertical
#   @return [String]
RecommendProductCreateData = Struct.new(
  :budget_cent,
  :category,
  :limit,
  :recommendation,
  :vertical,
  keyword_init: true
)

