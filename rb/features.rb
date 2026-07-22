# SetupGearGuide SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module SetupGearGuideFeatures
  def self.make_feature(name)
    case name
    when "base"
      SetupGearGuideBaseFeature.new
    when "test"
      SetupGearGuideTestFeature.new
    else
      SetupGearGuideBaseFeature.new
    end
  end
end
