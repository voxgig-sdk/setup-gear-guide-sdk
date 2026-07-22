-- SetupGearGuide SDK error

local SetupGearGuideError = {}
SetupGearGuideError.__index = SetupGearGuideError


function SetupGearGuideError.new(code, msg, ctx)
  local self = setmetatable({}, SetupGearGuideError)
  self.is_sdk_error = true
  self.sdk = "SetupGearGuide"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SetupGearGuideError:error()
  return self.msg
end


function SetupGearGuideError:__tostring()
  return self.msg
end


return SetupGearGuideError
