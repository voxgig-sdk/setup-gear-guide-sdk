package voxgigsetupgearguidesdk

import (
	"github.com/voxgig-sdk/setup-gear-guide-sdk/go/core"
	"github.com/voxgig-sdk/setup-gear-guide-sdk/go/entity"
	"github.com/voxgig-sdk/setup-gear-guide-sdk/go/feature"
	_ "github.com/voxgig-sdk/setup-gear-guide-sdk/go/utility"
)

// Type aliases preserve external API.
type SetupGearGuideSDK = core.SetupGearGuideSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type SetupGearGuideEntity = core.SetupGearGuideEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type SetupGearGuideError = core.SetupGearGuideError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBuildQuoteEntityFunc = func(client *core.SetupGearGuideSDK, entopts map[string]any) core.SetupGearGuideEntity {
		return entity.NewBuildQuoteEntity(client, entopts)
	}
	core.NewCheckCompatibilityEntityFunc = func(client *core.SetupGearGuideSDK, entopts map[string]any) core.SetupGearGuideEntity {
		return entity.NewCheckCompatibilityEntity(client, entopts)
	}
	core.NewCompareProductEntityFunc = func(client *core.SetupGearGuideSDK, entopts map[string]any) core.SetupGearGuideEntity {
		return entity.NewCompareProductEntity(client, entopts)
	}
	core.NewGetAffiliateOfferEntityFunc = func(client *core.SetupGearGuideSDK, entopts map[string]any) core.SetupGearGuideEntity {
		return entity.NewGetAffiliateOfferEntity(client, entopts)
	}
	core.NewGetBuildEntityFunc = func(client *core.SetupGearGuideSDK, entopts map[string]any) core.SetupGearGuideEntity {
		return entity.NewGetBuildEntity(client, entopts)
	}
	core.NewGetProductEntityFunc = func(client *core.SetupGearGuideSDK, entopts map[string]any) core.SetupGearGuideEntity {
		return entity.NewGetProductEntity(client, entopts)
	}
	core.NewRecommendProductEntityFunc = func(client *core.SetupGearGuideSDK, entopts map[string]any) core.SetupGearGuideEntity {
		return entity.NewRecommendProductEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewSetupGearGuideSDK = core.NewSetupGearGuideSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewSetupGearGuideSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *SetupGearGuideSDK  { return NewSetupGearGuideSDK(nil) }
func Test() *SetupGearGuideSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
