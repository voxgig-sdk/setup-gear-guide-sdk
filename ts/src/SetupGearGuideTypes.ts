// Typed models for the SetupGearGuide SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BuildQuote {
  budget_cent?: number
  experience_level?: string
  use_case?: string
  vertical: string
}

export interface BuildQuoteLoadMatch {
  budget_cent?: number
  experience_level?: string
  use_case?: string
  vertical?: string
}

export interface BuildQuoteCreateData {
  budget_cent?: number
  experience_level?: string
  use_case?: string
  vertical: string
}

export interface CheckCompatibility {
  product_id: any[]
  verdict?: string
}

export interface CheckCompatibilityLoadMatch {
  product_id?: any[]
  verdict?: string
}

export interface CheckCompatibilityCreateData {
  product_id: any[]
  verdict?: string
}

export interface CompareProduct {
  product_id: any[]
}

export interface CompareProductLoadMatch {
  product_id?: any[]
}

export interface CompareProductCreateData {
  product_id: any[]
}

export interface GetAffiliateOffer {
  attribution?: Record<string, any>
  offer?: any[]
  product_id?: string
}

export interface GetAffiliateOfferLoadMatch {
  attribution?: Record<string, any>
  offer?: any[]
  product_id?: string
}

export interface GetBuild {
  attribution?: Record<string, any>
  build?: Record<string, any>
}

export interface GetBuildLoadMatch {
  attribution?: Record<string, any>
  build?: Record<string, any>
}

export interface GetProduct {
  product?: Record<string, any>
}

export interface GetProductLoadMatch {
  product?: Record<string, any>
}

export interface RecommendProduct {
  budget_cent?: number
  category: string
  limit?: number
  recommendation?: any[]
  vertical: string
}

export interface RecommendProductLoadMatch {
  budget_cent?: number
  category?: string
  limit?: number
  recommendation?: any[]
  vertical?: string
}

export interface RecommendProductCreateData {
  budget_cent?: number
  category: string
  limit?: number
  recommendation?: any[]
  vertical: string
}

