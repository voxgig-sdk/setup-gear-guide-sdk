<?php
declare(strict_types=1);

// SetupGearGuide SDK configuration

class SetupGearGuideConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "SetupGearGuide",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://setupgearguide.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "build_quote" => [],
                    "check_compatibility" => [],
                    "compare_product" => [],
                    "get_affiliate_offer" => [],
                    "get_build" => [],
                    "get_product" => [],
                    "recommend_product" => [],
                ],
            ],
            "entity" => [
        'build_quote' => [
          'fields' => [
            [
              'name' => 'budgetCents',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'experienceLevel',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'useCase',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'vertical',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'build_quote',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/ai/build-quote',
                  'parts' => [
                    'api',
                    'ai',
                    'build-quote',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/ai/build-quote',
                  'parts' => [
                    'api',
                    'ai',
                    'build-quote',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'check_compatibility' => [
          'fields' => [
            [
              'name' => 'productIds',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'verdict',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'check_compatibility',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/ai/check-compatibility',
                  'parts' => [
                    'api',
                    'ai',
                    'check-compatibility',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/ai/check-compatibility',
                  'parts' => [
                    'api',
                    'ai',
                    'check-compatibility',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'compare_product' => [
          'fields' => [
            [
              'name' => 'productIds',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'compare_product',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/ai/compare-products',
                  'parts' => [
                    'api',
                    'ai',
                    'compare-products',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/ai/compare-products',
                  'parts' => [
                    'api',
                    'ai',
                    'compare-products',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_affiliate_offer' => [
          'fields' => [
            [
              'name' => 'attribution',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'offers',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'productId',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_affiliate_offer',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'product_id',
                        'orig' => 'product_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/ai/get-affiliate-offers',
                  'parts' => [
                    'api',
                    'ai',
                    'get-affiliate-offers',
                  ],
                  'select' => [
                    'exist' => [
                      'product_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_build' => [
          'fields' => [
            [
              'name' => 'attribution',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'build',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'get_build',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'build_id',
                        'orig' => 'build_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/ai/get-build',
                  'parts' => [
                    'api',
                    'ai',
                    'get-build',
                  ],
                  'select' => [
                    'exist' => [
                      'build_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_product' => [
          'fields' => [
            [
              'name' => 'verificationStatus',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_product',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'product_id',
                        'orig' => 'product_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'slug',
                        'orig' => 'slug',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/ai/get-product',
                  'parts' => [
                    'api',
                    'ai',
                    'get-product',
                  ],
                  'select' => [
                    'exist' => [
                      'product_id',
                      'slug',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.product`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'recommend_product' => [
          'fields' => [
            [
              'name' => 'budgetCents',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'category',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'limit',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'recommendations',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'vertical',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'recommend_product',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/ai/recommend-products',
                  'parts' => [
                    'api',
                    'ai',
                    'recommend-products',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/ai/recommend-products',
                  'parts' => [
                    'api',
                    'ai',
                    'recommend-products',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return SetupGearGuideFeatures::make_feature($name);
    }
}
