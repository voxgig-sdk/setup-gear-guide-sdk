import { SetupGearGuideEntityBase } from '../SetupGearGuideEntityBase';
import type { SetupGearGuideSDK } from '../SetupGearGuideSDK';
import type { Control } from '../types';
import type { GetAffiliateOffer, GetAffiliateOfferLoadMatch } from '../SetupGearGuideTypes';
declare class GetAffiliateOfferEntity extends SetupGearGuideEntityBase<GetAffiliateOffer> {
    constructor(client: SetupGearGuideSDK, entopts: any);
    make(this: GetAffiliateOfferEntity): GetAffiliateOfferEntity;
    load(this: any, reqmatch?: GetAffiliateOfferLoadMatch, ctrl?: Control): Promise<GetAffiliateOfferEntity>;
}
export { GetAffiliateOfferEntity };
