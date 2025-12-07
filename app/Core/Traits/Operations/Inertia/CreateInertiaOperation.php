<?php

namespace App\Core\Traits\Operations\Inertia;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait CreateInertiaOperation
{
    use BaseInertiaOperation;

    protected function executeStore(Request $request)
    {
        $this->beforeStore($request);
        $model = $this->getModelClass()::create($request->validated());
        $this->afterStore($model, $request);
        return $this->inertiaRedirectTo(
            route($this->getRedirectRouteName('index', $model)),
            $this->getTranslatedMessage('created')
        );
    }

    protected function beforeStore(Request $request): void {}
    protected function afterStore(Model $model, Request $request): void {}
}
