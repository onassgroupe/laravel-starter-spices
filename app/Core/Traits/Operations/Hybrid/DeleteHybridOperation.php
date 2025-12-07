<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\DeleteApiOperation;
use App\Core\Traits\Operations\Inertia\DeleteInertiaOperation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait DeleteHybridOperation
{
    use DeleteApiOperation, DeleteInertiaOperation {
        DeleteApiOperation::executeDestroy as executeApiDestroy;
        DeleteInertiaOperation::executeDestroy as executeInertiaDestroy;
        DeleteApiOperation::beforeDestroy insteadof DeleteInertiaOperation;
        DeleteApiOperation::afterDestroy insteadof DeleteInertiaOperation;
    }

    protected function executeDestroy(Model $model, Request $request)
    {
        return $this->isApiRequest()
            ? $this->executeApiDestroy($model, $request)
            : $this->executeInertiaDestroy($model, $request);
    }
}
