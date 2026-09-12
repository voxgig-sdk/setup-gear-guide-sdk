import { SetupGearGuideEntityBase } from '../SetupGearGuideEntityBase';
import type { SetupGearGuideSDK } from '../SetupGearGuideSDK';
import type { Control } from '../types';
import type { BuildQuote, BuildQuoteLoadMatch, BuildQuoteCreateData } from '../SetupGearGuideTypes';
declare class BuildQuoteEntity extends SetupGearGuideEntityBase<BuildQuote> {
    constructor(client: SetupGearGuideSDK, entopts: any);
    make(this: BuildQuoteEntity): BuildQuoteEntity;
    load(this: any, reqmatch?: BuildQuoteLoadMatch, ctrl?: Control): Promise<BuildQuoteEntity>;
    create(this: any, reqdata?: BuildQuoteCreateData, ctrl?: Control): Promise<BuildQuoteEntity>;
}
export { BuildQuoteEntity };
