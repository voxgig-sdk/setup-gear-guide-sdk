// Typed models for the SetupGearGuide SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/setup-gear-guide-sdk/go/core"
)

// BuildQuote is the typed data model for the build_quote entity.
type BuildQuote struct {
	BudgetCents *int `json:"budgetCents,omitempty"`
	ExperienceLevel *string `json:"experienceLevel,omitempty"`
	UseCase *string `json:"useCase,omitempty"`
	Vertical string `json:"vertical"`
}

// BuildQuoteLoadMatch is the typed request payload for BuildQuote.LoadTyped.
type BuildQuoteLoadMatch struct {
	BudgetCents *int `json:"budgetCents,omitempty"`
	ExperienceLevel *string `json:"experienceLevel,omitempty"`
	UseCase *string `json:"useCase,omitempty"`
	Vertical *string `json:"vertical,omitempty"`
}

// BuildQuoteCreateData is the typed request payload for BuildQuote.CreateTyped.
type BuildQuoteCreateData struct {
	BudgetCents *int `json:"budgetCents,omitempty"`
	ExperienceLevel *string `json:"experienceLevel,omitempty"`
	UseCase *string `json:"useCase,omitempty"`
	Vertical string `json:"vertical"`
}

// CheckCompatibility is the typed data model for the check_compatibility entity.
type CheckCompatibility struct {
	ProductIds []any `json:"productIds"`
	Verdict *string `json:"verdict,omitempty"`
}

// CheckCompatibilityLoadMatch is the typed request payload for CheckCompatibility.LoadTyped.
type CheckCompatibilityLoadMatch struct {
	ProductIds *[]any `json:"productIds,omitempty"`
	Verdict *string `json:"verdict,omitempty"`
}

// CheckCompatibilityCreateData is the typed request payload for CheckCompatibility.CreateTyped.
type CheckCompatibilityCreateData struct {
	ProductIds []any `json:"productIds"`
	Verdict *string `json:"verdict,omitempty"`
}

// CompareProduct is the typed data model for the compare_product entity.
type CompareProduct struct {
	ProductIds []any `json:"productIds"`
}

// CompareProductLoadMatch is the typed request payload for CompareProduct.LoadTyped.
type CompareProductLoadMatch struct {
	ProductIds *[]any `json:"productIds,omitempty"`
}

// CompareProductCreateData is the typed request payload for CompareProduct.CreateTyped.
type CompareProductCreateData struct {
	ProductIds []any `json:"productIds"`
}

// GetAffiliateOffer is the typed data model for the get_affiliate_offer entity.
type GetAffiliateOffer struct {
	Attribution *map[string]any `json:"attribution,omitempty"`
	Offers *[]any `json:"offers,omitempty"`
	ProductId *string `json:"productId,omitempty"`
}

// GetAffiliateOfferLoadMatch is the typed request payload for GetAffiliateOffer.LoadTyped.
type GetAffiliateOfferLoadMatch struct {
	Attribution *map[string]any `json:"attribution,omitempty"`
	Offers *[]any `json:"offers,omitempty"`
	ProductId *string `json:"productId,omitempty"`
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
	VerificationStatus *string `json:"verificationStatus,omitempty"`
}

// GetProductLoadMatch is the typed request payload for GetProduct.LoadTyped.
type GetProductLoadMatch struct {
	VerificationStatus *string `json:"verificationStatus,omitempty"`
}

// RecommendProduct is the typed data model for the recommend_product entity.
type RecommendProduct struct {
	BudgetCents *int `json:"budgetCents,omitempty"`
	Category string `json:"category"`
	Limit *int `json:"limit,omitempty"`
	Recommendations *[]any `json:"recommendations,omitempty"`
	Vertical string `json:"vertical"`
}

// RecommendProductLoadMatch is the typed request payload for RecommendProduct.LoadTyped.
type RecommendProductLoadMatch struct {
	BudgetCents *int `json:"budgetCents,omitempty"`
	Category *string `json:"category,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Recommendations *[]any `json:"recommendations,omitempty"`
	Vertical *string `json:"vertical,omitempty"`
}

// RecommendProductCreateData is the typed request payload for RecommendProduct.CreateTyped.
type RecommendProductCreateData struct {
	BudgetCents *int `json:"budgetCents,omitempty"`
	Category string `json:"category"`
	Limit *int `json:"limit,omitempty"`
	Recommendations *[]any `json:"recommendations,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
