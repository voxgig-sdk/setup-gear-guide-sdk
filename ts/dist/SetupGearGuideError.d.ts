import { Context } from './Context';
declare class SetupGearGuideError extends Error {
    isSetupGearGuideError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { SetupGearGuideError };
