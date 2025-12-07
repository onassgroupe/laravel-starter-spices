<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\BaseApiOperation;
use App\Core\Traits\Operations\Inertia\BaseInertiaOperation;

trait BaseHybridOperation
{
    use BaseApiOperation, BaseInertiaOperation {
        BaseApiOperation::getPaginationData insteadof BaseInertiaOperation;
        BaseApiOperation::prepareItems insteadof BaseInertiaOperation;
        BaseApiOperation::applyRejection insteadof BaseInertiaOperation;
        BaseApiOperation::getRedirectRouteName insteadof BaseInertiaOperation;
        BaseApiOperation::bootQuery insteadof BaseInertiaOperation;
        BaseApiOperation::getDefaultValues insteadof BaseInertiaOperation;
        BaseApiOperation::getResourceName insteadof BaseInertiaOperation;
        BaseApiOperation::getTranslatedMessage insteadof BaseInertiaOperation;
        BaseApiOperation::isApiRequest insteadof BaseInertiaOperation;
        BaseApiOperation::getModelClass insteadof BaseInertiaOperation;
        BaseApiOperation::getResourceClass insteadof BaseInertiaOperation;
        BaseApiOperation::getResourceCollectionClass insteadof BaseInertiaOperation;
    }
}
