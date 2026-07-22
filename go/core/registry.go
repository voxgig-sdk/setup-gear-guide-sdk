package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBuildQuoteEntityFunc func(client *SetupGearGuideSDK, entopts map[string]any) SetupGearGuideEntity

var NewCheckCompatibilityEntityFunc func(client *SetupGearGuideSDK, entopts map[string]any) SetupGearGuideEntity

var NewCompareProductEntityFunc func(client *SetupGearGuideSDK, entopts map[string]any) SetupGearGuideEntity

var NewGetAffiliateOfferEntityFunc func(client *SetupGearGuideSDK, entopts map[string]any) SetupGearGuideEntity

var NewGetBuildEntityFunc func(client *SetupGearGuideSDK, entopts map[string]any) SetupGearGuideEntity

var NewGetProductEntityFunc func(client *SetupGearGuideSDK, entopts map[string]any) SetupGearGuideEntity

var NewRecommendProductEntityFunc func(client *SetupGearGuideSDK, entopts map[string]any) SetupGearGuideEntity

