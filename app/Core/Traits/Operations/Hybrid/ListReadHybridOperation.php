<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\ListReadApiOperation;
use App\Core\Traits\Operations\Inertia\ListReadInertiaOperation;
use Illuminate\Http\Request;

trait ListReadHybridOperation
{
    use ListReadApiOperation, ListReadInertiaOperation {
        ListReadApiOperation::executeIndex as executeApiIndex;
        ListReadInertiaOperation::executeIndex as executeInertiaIndex;
        ListReadApiOperation::applyFilters insteadof ListReadInertiaOperation;
    }

    protected function executeIndex(Request $request, array $extra = [])
    {
        return $this->isApiRequest()
            ? $this->executeApiIndex($request, $extra)
            : $this->executeInertiaIndex($request, $extra);
    }
}
