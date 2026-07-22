-- Typed models for the SetupGearGuide SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BuildQuote
---@field budget_cent? number
---@field experience_level? string
---@field use_case? string
---@field vertical string

---@class BuildQuoteLoadMatch
---@field budget_cent? number
---@field experience_level? string
---@field use_case? string
---@field vertical? string

---@class BuildQuoteCreateData
---@field budget_cent? number
---@field experience_level? string
---@field use_case? string
---@field vertical string

---@class CheckCompatibility
---@field product_id table
---@field verdict? string

---@class CheckCompatibilityLoadMatch
---@field product_id? table
---@field verdict? string

---@class CheckCompatibilityCreateData
---@field product_id table
---@field verdict? string

---@class CompareProduct
---@field product_id table

---@class CompareProductLoadMatch
---@field product_id? table

---@class CompareProductCreateData
---@field product_id table

---@class GetAffiliateOffer
---@field attribution? table
---@field offer? table
---@field product_id? string

---@class GetAffiliateOfferLoadMatch
---@field attribution? table
---@field offer? table
---@field product_id? string

---@class GetBuild
---@field attribution? table
---@field build? table

---@class GetBuildLoadMatch
---@field attribution? table
---@field build? table

---@class GetProduct
---@field product? table

---@class GetProductLoadMatch
---@field product? table

---@class RecommendProduct
---@field budget_cent? number
---@field category string
---@field limit? number
---@field recommendation? table
---@field vertical string

---@class RecommendProductLoadMatch
---@field budget_cent? number
---@field category? string
---@field limit? number
---@field recommendation? table
---@field vertical? string

---@class RecommendProductCreateData
---@field budget_cent? number
---@field category string
---@field limit? number
---@field recommendation? table
---@field vertical string

local M = {}

return M
