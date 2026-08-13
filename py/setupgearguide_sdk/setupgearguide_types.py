# Typed models for the SetupGearGuide SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BuildQuoteRequired(TypedDict):
    vertical: str


class BuildQuote(BuildQuoteRequired, total=False):
    budgetCents: int
    experienceLevel: str
    useCase: str


class BuildQuoteLoadMatch(TypedDict, total=False):
    budgetCents: int
    experienceLevel: str
    useCase: str
    vertical: str


class BuildQuoteCreateDataRequired(TypedDict):
    vertical: str


class BuildQuoteCreateData(BuildQuoteCreateDataRequired, total=False):
    budgetCents: int
    experienceLevel: str
    useCase: str


class CheckCompatibilityRequired(TypedDict):
    productIds: list


class CheckCompatibility(CheckCompatibilityRequired, total=False):
    verdict: str


class CheckCompatibilityLoadMatch(TypedDict, total=False):
    productIds: list
    verdict: str


class CheckCompatibilityCreateDataRequired(TypedDict):
    productIds: list


class CheckCompatibilityCreateData(CheckCompatibilityCreateDataRequired, total=False):
    verdict: str


class CompareProduct(TypedDict):
    productIds: list


class CompareProductLoadMatch(TypedDict, total=False):
    productIds: list


class CompareProductCreateData(TypedDict):
    productIds: list


class GetAffiliateOffer(TypedDict, total=False):
    attribution: dict
    offers: list
    productId: str


class GetAffiliateOfferLoadMatch(TypedDict, total=False):
    attribution: dict
    offers: list
    productId: str


class GetBuild(TypedDict, total=False):
    attribution: dict
    build: dict


class GetBuildLoadMatch(TypedDict, total=False):
    attribution: dict
    build: dict


class GetProduct(TypedDict, total=False):
    verificationStatus: str


class GetProductLoadMatch(TypedDict, total=False):
    verificationStatus: str


class RecommendProductRequired(TypedDict):
    category: str
    vertical: str


class RecommendProduct(RecommendProductRequired, total=False):
    budgetCents: int
    limit: int
    recommendations: list


class RecommendProductLoadMatch(TypedDict, total=False):
    budgetCents: int
    category: str
    limit: int
    recommendations: list
    vertical: str


class RecommendProductCreateDataRequired(TypedDict):
    category: str
    vertical: str


class RecommendProductCreateData(RecommendProductCreateDataRequired, total=False):
    budgetCents: int
    limit: int
    recommendations: list
