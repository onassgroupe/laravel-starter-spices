<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\UpdateApiOperation;
use App\Core\Traits\Operations\Inertia\UpdateInertiaOperation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait UpdateHybridOperation
{
    use UpdateApiOperation, UpdateInertiaOperation {
        UpdateApiOperation::executeUpdate as executeApiUpdate;
        UpdateInertiaOperation::executeUpdate as executeInertiaUpdate;
        UpdateApiOperation::beforeUpdate insteadof UpdateInertiaOperation;
        UpdateApiOperation::afterUpdate insteadof UpdateInertiaOperation;
    }

    protected function executeUpdate(Model $model, Request $request)
    {
        return $this->isApiRequest()
            ? $this->executeApiUpdate($model, $request)
            : $this->executeInertiaUpdate($model, $request);
    }
}
