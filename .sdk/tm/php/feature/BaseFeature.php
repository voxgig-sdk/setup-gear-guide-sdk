<?php
declare(strict_types=1);

// SetupGearGuide SDK base feature

class SetupGearGuideBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(SetupGearGuideContext $ctx, array $options): void {}
    public function PostConstruct(SetupGearGuideContext $ctx): void {}
    public function PostConstructEntity(SetupGearGuideContext $ctx): void {}
    public function SetData(SetupGearGuideContext $ctx): void {}
    public function GetData(SetupGearGuideContext $ctx): void {}
    public function GetMatch(SetupGearGuideContext $ctx): void {}
    public function SetMatch(SetupGearGuideContext $ctx): void {}
    public function PrePoint(SetupGearGuideContext $ctx): void {}
    public function PreSpec(SetupGearGuideContext $ctx): void {}
    public function PreRequest(SetupGearGuideContext $ctx): void {}
    public function PreResponse(SetupGearGuideContext $ctx): void {}
    public function PreResult(SetupGearGuideContext $ctx): void {}
    public function PreDone(SetupGearGuideContext $ctx): void {}
    public function PreUnexpected(SetupGearGuideContext $ctx): void {}
}
