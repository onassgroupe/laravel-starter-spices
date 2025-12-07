<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait CreateApiOperation
{
    use BaseApiOperation;

    protected function executeStore(Request $request)
    {
        $this->beforeStore($request);
        $model = $this->getModelClass()::create($request->validated());
        $this->afterStore($model, $request);
        return $this->apiResourceResponse($model)->setStatusCode(201);
    }

    protected function beforeStore(Request $request): void {}
    protected function afterStore(Model $model, Request $request): void {}
}
