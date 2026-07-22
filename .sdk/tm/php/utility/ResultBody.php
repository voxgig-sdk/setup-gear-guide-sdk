<?php
declare(strict_types=1);

// SetupGearGuide SDK utility: result_body

class SetupGearGuideResultBody
{
    public static function call(SetupGearGuideContext $ctx): ?SetupGearGuideResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
