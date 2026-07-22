<?php
declare(strict_types=1);

// SetupGearGuide SDK utility: prepare_body

class SetupGearGuidePrepareBody
{
    public static function call(SetupGearGuideContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
