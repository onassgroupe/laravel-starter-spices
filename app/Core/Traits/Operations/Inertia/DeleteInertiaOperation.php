<?php

namespace App\Core\Traits\Operations\Inertia;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait DeleteInertiaOperation
{
    use BaseInertiaOperation;

    protected function executeDestroy(Model $model, Request $request)
    {
        $this->beforeDestroy($model, $request);
        $model->delete();
        $this->afterDestroy($model, $request);
        return $this->inertiaRedirectTo(
            route($this->getRedirectRouteName('index')),
            $this->getTranslatedMessage('deleted')
        );
    }

    protected function beforeDestroy(Model $model, Request $request): void {}
    protected function afterDestroy(Model $model, Request $request): void {}
}
