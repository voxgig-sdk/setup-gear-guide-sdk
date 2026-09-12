import { SetupGearGuideEntityBase } from '../SetupGearGuideEntityBase';
import type { SetupGearGuideSDK } from '../SetupGearGuideSDK';
import type { Control } from '../types';
import type { CompareProduct, CompareProductLoadMatch, CompareProductCreateData } from '../SetupGearGuideTypes';
declare class CompareProductEntity extends SetupGearGuideEntityBase<CompareProduct> {
    constructor(client: SetupGearGuideSDK, entopts: any);
    make(this: CompareProductEntity): CompareProductEntity;
    load(this: any, reqmatch?: CompareProductLoadMatch, ctrl?: Control): Promise<CompareProductEntity>;
    create(this: any, reqdata?: CompareProductCreateData, ctrl?: Control): Promise<CompareProductEntity>;
}
export { CompareProductEntity };
