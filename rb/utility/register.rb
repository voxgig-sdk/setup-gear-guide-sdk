# SetupGearGuide SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

SetupGearGuideUtility.registrar = ->(u) {
  u.clean = SetupGearGuideUtilities::Clean
  u.done = SetupGearGuideUtilities::Done
  u.make_error = SetupGearGuideUtilities::MakeError
  u.feature_add = SetupGearGuideUtilities::FeatureAdd
  u.feature_hook = SetupGearGuideUtilities::FeatureHook
  u.feature_init = SetupGearGuideUtilities::FeatureInit
  u.fetcher = SetupGearGuideUtilities::Fetcher
  u.make_fetch_def = SetupGearGuideUtilities::MakeFetchDef
  u.make_context = SetupGearGuideUtilities::MakeContext
  u.make_options = SetupGearGuideUtilities::MakeOptions
  u.make_request = SetupGearGuideUtilities::MakeRequest
  u.make_response = SetupGearGuideUtilities::MakeResponse
  u.make_result = SetupGearGuideUtilities::MakeResult
  u.make_point = SetupGearGuideUtilities::MakePoint
  u.make_spec = SetupGearGuideUtilities::MakeSpec
  u.make_url = SetupGearGuideUtilities::MakeUrl
  u.param = SetupGearGuideUtilities::Param
  u.prepare_auth = SetupGearGuideUtilities::PrepareAuth
  u.prepare_body = SetupGearGuideUtilities::PrepareBody
  u.prepare_headers = SetupGearGuideUtilities::PrepareHeaders
  u.prepare_method = SetupGearGuideUtilities::PrepareMethod
  u.prepare_params = SetupGearGuideUtilities::PrepareParams
  u.prepare_path = SetupGearGuideUtilities::PreparePath
  u.prepare_query = SetupGearGuideUtilities::PrepareQuery
  u.graphql_body = SetupGearGuideUtilities::GraphqlBody
  u.graphql_errors = SetupGearGuideUtilities::GraphqlErrors
  u.result_basic = SetupGearGuideUtilities::ResultBasic
  u.result_body = SetupGearGuideUtilities::ResultBody
  u.result_headers = SetupGearGuideUtilities::ResultHeaders
  u.transform_request = SetupGearGuideUtilities::TransformRequest
  u.transform_response = SetupGearGuideUtilities::TransformResponse
}
