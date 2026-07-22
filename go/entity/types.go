// Typed models for the SetupGearGuide SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// BuildQuote is the typed data model for the build_quote entity.
type BuildQuote struct {
	BudgetCent *int `json:"budget_cent,omitempty"`
	ExperienceLevel *string `json:"experience_level,omitempty"`
	UseCase *string `json:"use_case,omitempty"`
	Vertical string `json:"vertical"`
}

// BuildQuoteLoadMatch is the typed request payload for BuildQuote.LoadTyped.
type BuildQuoteLoadMatch struct {
	BudgetCent *int `json:"budget_cent,omitempty"`
	ExperienceLevel *string `json:"experience_level,omitempty"`
	UseCase *string `json:"use_case,omitempty"`
	Vertical *string `json:"vertical,omitempty"`
}

// BuildQuoteCreateData is the typed request payload for BuildQuote.CreateTyped.
type BuildQuoteCreateData struct {
	BudgetCent *int `json:"budget_cent,omitempty"`
	ExperienceLevel *string `json:"experience_level,omitempty"`
	UseCase *string `json:"use_case,omitempty"`
	Vertical string `json:"vertical"`
}

// CheckCompatibility is the typed data model for the check_compatibility entity.
type CheckCompatibility struct {
	ProductId []any `json:"product_id"`
	Verdict *string `json:"verdict,omitempty"`
}

// CheckCompatibilityLoadMatch is the typed request payload for CheckCompatibility.LoadTyped.
type CheckCompatibilityLoadMatch struct {
	ProductId *[]any `json:"product_id,omitempty"`
	Verdict *string `json:"verdict,omitempty"`
}

// CheckCompatibilityCreateData is the typed request payload for CheckCompatibility.CreateTyped.
type CheckCompatibilityCreateData struct {
	ProductId []any `json:"product_id"`
	Verdict *string `json:"verdict,omitempty"`
}

// CompareProduct is the typed data model for the compare_product entity.
type CompareProduct struct {
	ProductId []any `json:"product_id"`
}

// CompareProductLoadMatch is the typed request payload for CompareProduct.LoadTyped.
type CompareProductLoadMatch struct {
	ProductId *[]any `json:"product_id,omitempty"`
}

// CompareProductCreateData is the typed request payload for CompareProduct.CreateTyped.
type CompareProductCreateData struct {
	ProductId []any `json:"product_id"`
}

// GetAffiliateOffer is the typed data model for the get_affiliate_offer entity.
type GetAffiliateOffer struct {
	Attribution *map[string]any `json:"attribution,omitempty"`
	Offer *[]any `json:"offer,omitempty"`
	ProductId *string `json:"product_id,omitempty"`
}

// GetAffiliateOfferLoadMatch is the typed request payload for GetAffiliateOffer.LoadTyped.
type GetAffiliateOfferLoadMatch struct {
	Attribution *map[string]any `json:"attribution,omitempty"`
	Offer *[]any `json:"offer,omitempty"`
	ProductId *string `json:"product_id,omitempty"`
}

// GetBuild is the typed data model for the get_build entity.
type GetBuild struct {
	Attribution *map[string]any `json:"attribution,omitempty"`
	Build *map[string]any `json:"build,omitempty"`
}

// GetBuildLoadMatch is the typed request payload for GetBuild.LoadTyped.
type GetBuildLoadMatch struct {
	Attribution *map[string]any `json:"attribution,omitempty"`
	Build *map[string]any `json:"build,omitempty"`
}

// GetProduct is the typed data model for the get_product entity.
type GetProduct struct {
	Product *map[string]any `json:"product,omitempty"`
}

// GetProductLoadMatch is the typed request payload for GetProduct.LoadTyped.
type GetProductLoadMatch struct {
	Product *map[string]any `json:"product,omitempty"`
}

// RecommendProduct is the typed data model for the recommend_product entity.
type RecommendProduct struct {
	BudgetCent *int `json:"budget_cent,omitempty"`
	Category string `json:"category"`
	Limit *int `json:"limit,omitempty"`
	Recommendation *[]any `json:"recommendation,omitempty"`
	Vertical string `json:"vertical"`
}

// RecommendProductLoadMatch is the typed request payload for RecommendProduct.LoadTyped.
type RecommendProductLoadMatch struct {
	BudgetCent *int `json:"budget_cent,omitempty"`
	Category *string `json:"category,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Recommendation *[]any `json:"recommendation,omitempty"`
	Vertical *string `json:"vertical,omitempty"`
}

// RecommendProductCreateData is the typed request payload for RecommendProduct.CreateTyped.
type RecommendProductCreateData struct {
	BudgetCent *int `json:"budget_cent,omitempty"`
	Category string `json:"category"`
	Limit *int `json:"limit,omitempty"`
	Recommendation *[]any `json:"recommendation,omitempty"`
	Vertical string `json:"vertical"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
