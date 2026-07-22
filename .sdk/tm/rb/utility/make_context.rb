# SetupGearGuide SDK utility: make_context
require_relative '../core/context'
module SetupGearGuideUtilities
  MakeContext = ->(ctxmap, basectx) {
    SetupGearGuideContext.new(ctxmap, basectx)
  }
end
