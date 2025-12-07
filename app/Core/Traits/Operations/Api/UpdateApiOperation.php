<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait UpdateApiOperation
{
    use BaseApiOperation;

    protected function executeUpdate(Model $model, Request $request)
    {
        $this->beforeUpdate($model, $request);
        $model->update($request->validated());
        $this->afterUpdate($model, $request);
        return $this->apiResourceResponse($model->fresh());
    }

    protected function beforeUpdate(Model $model, Request $request): void {}
    protected function afterUpdate(Model $model, Request $request): void {}
}
