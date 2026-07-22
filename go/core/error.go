package core

type SetupGearGuideError struct {
	IsSetupGearGuideError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSetupGearGuideError(code string, msg string, ctx *Context) *SetupGearGuideError {
	return &SetupGearGuideError{
		IsSetupGearGuideError: true,
		Sdk:              "SetupGearGuide",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SetupGearGuideError) Error() string {
	return e.Msg
}
