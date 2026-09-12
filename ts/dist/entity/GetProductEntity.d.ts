import { SetupGearGuideEntityBase } from '../SetupGearGuideEntityBase';
import type { SetupGearGuideSDK } from '../SetupGearGuideSDK';
import type { Control } from '../types';
import type { GetProduct, GetProductLoadMatch } from '../SetupGearGuideTypes';
declare class GetProductEntity extends SetupGearGuideEntityBase<GetProduct> {
    constructor(client: SetupGearGuideSDK, entopts: any);
    make(this: GetProductEntity): GetProductEntity;
    load(this: any, reqmatch?: GetProductLoadMatch, ctrl?: Control): Promise<GetProductEntity>;
}
export { GetProductEntity };
