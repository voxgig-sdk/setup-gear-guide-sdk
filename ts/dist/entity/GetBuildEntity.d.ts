import { SetupGearGuideEntityBase } from '../SetupGearGuideEntityBase';
import type { SetupGearGuideSDK } from '../SetupGearGuideSDK';
import type { Control } from '../types';
import type { GetBuild, GetBuildLoadMatch } from '../SetupGearGuideTypes';
declare class GetBuildEntity extends SetupGearGuideEntityBase<GetBuild> {
    constructor(client: SetupGearGuideSDK, entopts: any);
    make(this: GetBuildEntity): GetBuildEntity;
    load(this: any, reqmatch?: GetBuildLoadMatch, ctrl?: Control): Promise<GetBuildEntity>;
}
export { GetBuildEntity };
