import { SetupGearGuideEntityBase } from '../SetupGearGuideEntityBase';
import type { SetupGearGuideSDK } from '../SetupGearGuideSDK';
import type { Control } from '../types';
import type { RecommendProduct, RecommendProductLoadMatch, RecommendProductCreateData } from '../SetupGearGuideTypes';
declare class RecommendProductEntity extends SetupGearGuideEntityBase<RecommendProduct> {
    constructor(client: SetupGearGuideSDK, entopts: any);
    make(this: RecommendProductEntity): RecommendProductEntity;
    load(this: any, reqmatch?: RecommendProductLoadMatch, ctrl?: Control): Promise<RecommendProductEntity>;
    create(this: any, reqdata?: RecommendProductCreateData, ctrl?: Control): Promise<RecommendProductEntity>;
}
export { RecommendProductEntity };
