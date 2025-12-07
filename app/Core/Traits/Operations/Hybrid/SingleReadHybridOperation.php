<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\SingleReadApiOperation;
use App\Core\Traits\Operations\Inertia\SingleReadInertiaOperation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait SingleReadHybridOperation
{
    use SingleReadApiOperation, SingleReadInertiaOperation {
        SingleReadApiOperation::executeShow as executeApiShow;
        SingleReadInertiaOperation::executeShow as executeInertiaShow;
        SingleReadApiOperation::loadRelations insteadof SingleReadInertiaOperation;
    }

    protected function executeShow(Model $model, Request $request, array $extra = [])
    {
        return $this->isApiRequest()
            ? $this->executeApiShow($model, $request, $extra)
            : $this->executeInertiaShow($model, $request, $extra);
    }
}
