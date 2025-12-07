<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait SingleReadApiOperation
{
    use BaseApiOperation;

    protected function executeShow(Model $model, Request $request, array $extra = [])
    {
        $this->loadRelations($model);
        return $this->apiResourceResponse($model, $extra);
    }

    protected function loadRelations(Model $model): void {}
}
