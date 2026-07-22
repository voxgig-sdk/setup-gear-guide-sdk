<?php
declare(strict_types=1);

// SetupGearGuide SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SetupGearGuideMakeContext
{
    public static function call(array $ctxmap, ?SetupGearGuideContext $basectx): SetupGearGuideContext
    {
        return new SetupGearGuideContext($ctxmap, $basectx);
    }
}
