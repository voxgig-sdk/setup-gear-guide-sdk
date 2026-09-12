export interface BuildQuote {
    budgetCents?: number;
    experienceLevel?: string;
    useCase?: string;
    vertical: string;
}
export interface BuildQuoteLoadMatch {
    budgetCents?: number;
    experienceLevel?: string;
    useCase?: string;
    vertical?: string;
}
export interface BuildQuoteCreateData {
    budgetCents?: number;
    experienceLevel?: string;
    useCase?: string;
    vertical: string;
}
export interface CheckCompatibility {
    productIds: any[];
    verdict?: string;
}
export interface CheckCompatibilityLoadMatch {
    productIds?: any[];
    verdict?: string;
}
export interface CheckCompatibilityCreateData {
    productIds: any[];
    verdict?: string;
}
export interface CompareProduct {
    productIds: any[];
}
export interface CompareProductLoadMatch {
    productIds?: any[];
}
export interface CompareProductCreateData {
    productIds: any[];
}
export interface GetAffiliateOffer {
    attribution?: Record<string, any>;
    offers?: any[];
    productId?: string;
}
export interface GetAffiliateOfferLoadMatch {
    product_id: string;
}
export interface GetBuild {
    attribution?: Record<string, any>;
    build?: Record<string, any>;
}
export interface GetBuildLoadMatch {
    build_id: string;
}
export interface GetProduct {
    verificationStatus?: string;
}
export interface GetProductLoadMatch {
    product_id?: string;
    slug?: string;
}
export interface RecommendProduct {
    budgetCents?: number;
    category: string;
    limit?: number;
    recommendations?: any[];
    vertical: string;
}
export interface RecommendProductLoadMatch {
    budgetCents?: number;
    category?: string;
    limit?: number;
    recommendations?: any[];
    vertical?: string;
}
export interface RecommendProductCreateData {
    budgetCents?: number;
    category: string;
    limit?: number;
    recommendations?: any[];
    vertical: string;
}
