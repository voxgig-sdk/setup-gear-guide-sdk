# ProjectName SDK exists test

import pytest
from setupgearguide_sdk import SetupGearGuideSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SetupGearGuideSDK.test(None, None)
        assert testsdk is not None
