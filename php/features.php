<?php
declare(strict_types=1);

// SetupGearGuide SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class SetupGearGuideFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new SetupGearGuideBaseFeature();
            case "test":
                return new SetupGearGuideTestFeature();
            default:
                return new SetupGearGuideBaseFeature();
        }
    }
}
