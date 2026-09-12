import { SetupGearGuideEntityBase } from '../SetupGearGuideEntityBase';
import type { SetupGearGuideSDK } from '../SetupGearGuideSDK';
import type { Control } from '../types';
import type { CheckCompatibility, CheckCompatibilityLoadMatch, CheckCompatibilityCreateData } from '../SetupGearGuideTypes';
declare class CheckCompatibilityEntity extends SetupGearGuideEntityBase<CheckCompatibility> {
    constructor(client: SetupGearGuideSDK, entopts: any);
    make(this: CheckCompatibilityEntity): CheckCompatibilityEntity;
    load(this: any, reqmatch?: CheckCompatibilityLoadMatch, ctrl?: Control): Promise<CheckCompatibilityEntity>;
    create(this: any, reqdata?: CheckCompatibilityCreateData, ctrl?: Control): Promise<CheckCompatibilityEntity>;
}
export { CheckCompatibilityEntity };
