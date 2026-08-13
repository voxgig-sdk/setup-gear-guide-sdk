-- Typed models for the SetupGearGuide SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BuildQuote
---@field budgetCents? number
---@field experienceLevel? string
---@field useCase? string
---@field vertical string

---@class BuildQuoteLoadMatch
---@field budgetCents? number
---@field experienceLevel? string
---@field useCase? string
---@field vertical? string

---@class BuildQuoteCreateData
---@field budgetCents? number
---@field experienceLevel? string
---@field useCase? string
---@field vertical string

---@class CheckCompatibility
---@field productIds table
---@field verdict? string

---@class CheckCompatibilityLoadMatch
---@field productIds? table
---@field verdict? string

---@class CheckCompatibilityCreateData
---@field productIds table
---@field verdict? string

---@class CompareProduct
---@field productIds table

---@class CompareProductLoadMatch
---@field productIds? table

---@class CompareProductCreateData
---@field productIds table

---@class GetAffiliateOffer
---@field attribution? table
---@field offers? table
---@field productId? string

---@class GetAffiliateOfferLoadMatch
---@field attribution? table
---@field offers? table
---@field productId? string

---@class GetBuild
---@field attribution? table
---@field build? table

---@class GetBuildLoadMatch
---@field attribution? table
---@field build? table

---@class GetProduct
---@field verificationStatus? string

---@class GetProductLoadMatch
---@field verificationStatus? string

---@class RecommendProduct
---@field budgetCents? number
---@field category string
---@field limit? number
---@field recommendations? table
---@field vertical string

---@class RecommendProductLoadMatch
---@field budgetCents? number
---@field category? string
---@field limit? number
---@field recommendations? table
---@field vertical? string

---@class RecommendProductCreateData
---@field budgetCents? number
---@field category string
---@field limit? number
---@field recommendations? table
---@field vertical string

local M = {}

return M
