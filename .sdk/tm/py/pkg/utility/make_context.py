# SetupGearGuide SDK utility: make_context

from projectname_sdk.core.context import SetupGearGuideContext


def make_context_util(ctxmap, basectx):
    return SetupGearGuideContext(ctxmap, basectx)
