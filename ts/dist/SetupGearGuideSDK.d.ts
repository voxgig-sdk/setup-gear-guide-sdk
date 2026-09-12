import { BuildQuoteEntity } from './entity/BuildQuoteEntity';
import { CheckCompatibilityEntity } from './entity/CheckCompatibilityEntity';
import { CompareProductEntity } from './entity/CompareProductEntity';
import { GetAffiliateOfferEntity } from './entity/GetAffiliateOfferEntity';
import { GetBuildEntity } from './entity/GetBuildEntity';
import { GetProductEntity } from './entity/GetProductEntity';
import { RecommendProductEntity } from './entity/RecommendProductEntity';
export type * from './SetupGearGuideTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { SetupGearGuideEntityBase } from './SetupGearGuideEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class SetupGearGuideSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BuildQuote(entopts?: Record<string, any>): BuildQuoteEntity;
    CheckCompatibility(entopts?: Record<string, any>): CheckCompatibilityEntity;
    CompareProduct(entopts?: Record<string, any>): CompareProductEntity;
    GetAffiliateOffer(entopts?: Record<string, any>): GetAffiliateOfferEntity;
    GetBuild(entopts?: Record<string, any>): GetBuildEntity;
    GetProduct(entopts?: Record<string, any>): GetProductEntity;
    RecommendProduct(entopts?: Record<string, any>): RecommendProductEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): SetupGearGuideSDK;
    tester(testopts?: any, sdkopts?: any): SetupGearGuideSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof SetupGearGuideSDK;
export { stdutil, config, BaseFeature, SetupGearGuideEntityBase, SetupGearGuideSDK, SDK, };
