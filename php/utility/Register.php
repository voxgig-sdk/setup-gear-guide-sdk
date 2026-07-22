<?php
declare(strict_types=1);

// SetupGearGuide SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

SetupGearGuideUtility::setRegistrar(function (SetupGearGuideUtility $u): void {
    $u->clean = [SetupGearGuideClean::class, 'call'];
    $u->done = [SetupGearGuideDone::class, 'call'];
    $u->make_error = [SetupGearGuideMakeError::class, 'call'];
    $u->feature_add = [SetupGearGuideFeatureAdd::class, 'call'];
    $u->feature_hook = [SetupGearGuideFeatureHook::class, 'call'];
    $u->feature_init = [SetupGearGuideFeatureInit::class, 'call'];
    $u->fetcher = [SetupGearGuideFetcher::class, 'call'];
    $u->make_fetch_def = [SetupGearGuideMakeFetchDef::class, 'call'];
    $u->make_context = [SetupGearGuideMakeContext::class, 'call'];
    $u->make_options = [SetupGearGuideMakeOptions::class, 'call'];
    $u->make_request = [SetupGearGuideMakeRequest::class, 'call'];
    $u->make_response = [SetupGearGuideMakeResponse::class, 'call'];
    $u->make_result = [SetupGearGuideMakeResult::class, 'call'];
    $u->make_point = [SetupGearGuideMakePoint::class, 'call'];
    $u->make_spec = [SetupGearGuideMakeSpec::class, 'call'];
    $u->make_url = [SetupGearGuideMakeUrl::class, 'call'];
    $u->param = [SetupGearGuideParam::class, 'call'];
    $u->prepare_auth = [SetupGearGuidePrepareAuth::class, 'call'];
    $u->prepare_body = [SetupGearGuidePrepareBody::class, 'call'];
    $u->prepare_headers = [SetupGearGuidePrepareHeaders::class, 'call'];
    $u->prepare_method = [SetupGearGuidePrepareMethod::class, 'call'];
    $u->prepare_params = [SetupGearGuidePrepareParams::class, 'call'];
    $u->prepare_path = [SetupGearGuidePreparePath::class, 'call'];
    $u->prepare_query = [SetupGearGuidePrepareQuery::class, 'call'];
    $u->result_basic = [SetupGearGuideResultBasic::class, 'call'];
    $u->result_body = [SetupGearGuideResultBody::class, 'call'];
    $u->result_headers = [SetupGearGuideResultHeaders::class, 'call'];
    $u->transform_request = [SetupGearGuideTransformRequest::class, 'call'];
    $u->transform_response = [SetupGearGuideTransformResponse::class, 'call'];
});
