<?php

namespace App\Core\Traits\Operations\Inertia;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait UpdateInertiaOperation
{
    use BaseInertiaOperation;

    protected function executeUpdate(Model $model, Request $request)
    {
        $this->beforeUpdate($model, $request);
        $model->update($request->validated());
        $this->afterUpdate($model, $request);
        return $this->inertiaRedirectTo(
            route($this->getRedirectRouteName('index', $model)),
            $this->getTranslatedMessage('updated')
        );
    }

    protected function beforeUpdate(Model $model, Request $request): void {}
    protected function afterUpdate(Model $model, Request $request): void {}
}
