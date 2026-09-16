# SetupGearGuide SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module SetupGearGuideFeatures
  def self.make_feature(name)
    case name
    when "base"
      SetupGearGuideBaseFeature.new
    when "ratelimit"
      SetupGearGuideRatelimitFeature.new
    when "retry"
      SetupGearGuideRetryFeature.new
    when "test"
      SetupGearGuideTestFeature.new
    when "timeout"
      SetupGearGuideTimeoutFeature.new
    else
      SetupGearGuideBaseFeature.new
    end
  end
end
