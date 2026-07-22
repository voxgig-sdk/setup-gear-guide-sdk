-- SetupGearGuide SDK exists test

local sdk = require("setup-gear-guide_sdk")

describe("SetupGearGuideSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
