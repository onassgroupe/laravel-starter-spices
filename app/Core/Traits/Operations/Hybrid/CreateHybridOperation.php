<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\CreateApiOperation;
use App\Core\Traits\Operations\Inertia\CreateInertiaOperation;
use Illuminate\Http\Request;

trait CreateHybridOperation
{
    use CreateApiOperation, CreateInertiaOperation {
        CreateApiOperation::executeStore as executeApiStore;
        CreateInertiaOperation::executeStore as executeInertiaStore;
        CreateApiOperation::beforeStore insteadof CreateInertiaOperation;
        CreateApiOperation::afterStore insteadof CreateInertiaOperation;
    }

    protected function executeStore(Request $request)
    {
        return $this->isApiRequest()
            ? $this->executeApiStore($request)
            : $this->executeInertiaStore($request);
    }
}
