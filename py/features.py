# SetupGearGuide SDK feature factory

from feature.base_feature import SetupGearGuideBaseFeature
from feature.test_feature import SetupGearGuideTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SetupGearGuideBaseFeature(),
        "test": lambda: SetupGearGuideTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
