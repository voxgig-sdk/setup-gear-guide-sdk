
import { Context } from './Context'


class SetupGearGuideError extends Error {

  isSetupGearGuideError = true

  sdk = 'SetupGearGuide'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  SetupGearGuideError
}

