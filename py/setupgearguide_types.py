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
    budget_cent: int
    experience_level: str
    use_case: str


class BuildQuoteLoadMatch(TypedDict, total=False):
    budget_cent: int
    experience_level: str
    use_case: str
    vertical: str


class BuildQuoteCreateDataRequired(TypedDict):
    vertical: str


class BuildQuoteCreateData(BuildQuoteCreateDataRequired, total=False):
    budget_cent: int
    experience_level: str
    use_case: str


class CheckCompatibilityRequired(TypedDict):
    product_id: list


class CheckCompatibility(CheckCompatibilityRequired, total=False):
    verdict: str


class CheckCompatibilityLoadMatch(TypedDict, total=False):
    product_id: list
    verdict: str


class CheckCompatibilityCreateDataRequired(TypedDict):
    product_id: list


class CheckCompatibilityCreateData(CheckCompatibilityCreateDataRequired, total=False):
    verdict: str


class CompareProduct(TypedDict):
    product_id: list


class CompareProductLoadMatch(TypedDict, total=False):
    product_id: list


class CompareProductCreateData(TypedDict):
    product_id: list


class GetAffiliateOffer(TypedDict, total=False):
    attribution: dict
    offer: list
    product_id: str


class GetAffiliateOfferLoadMatch(TypedDict, total=False):
    attribution: dict
    offer: list
    product_id: str


class GetBuild(TypedDict, total=False):
    attribution: dict
    build: dict


class GetBuildLoadMatch(TypedDict, total=False):
    attribution: dict
    build: dict


class GetProduct(TypedDict, total=False):
    product: dict


class GetProductLoadMatch(TypedDict, total=False):
    product: dict


class RecommendProductRequired(TypedDict):
    category: str
    vertical: str


class RecommendProduct(RecommendProductRequired, total=False):
    budget_cent: int
    limit: int
    recommendation: list


class RecommendProductLoadMatch(TypedDict, total=False):
    budget_cent: int
    category: str
    limit: int
    recommendation: list
    vertical: str


class RecommendProductCreateDataRequired(TypedDict):
    category: str
    vertical: str


class RecommendProductCreateData(RecommendProductCreateDataRequired, total=False):
    budget_cent: int
    limit: int
    recommendation: list
