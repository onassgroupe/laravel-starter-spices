<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait DeleteApiOperation
{
    use BaseApiOperation;

    protected function executeDestroy(Model $model, Request $request)
    {
        $this->beforeDestroy($model, $request);
        $model->delete();
        $this->afterDestroy($model, $request);
        return response()->json(['message' => $this->getTranslatedMessage('deleted')]);
    }

    protected function beforeDestroy(Model $model, Request $request): void {}
    protected function afterDestroy(Model $model, Request $request): void {}
}
