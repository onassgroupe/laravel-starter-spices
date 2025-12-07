<?php

namespace App\Core\Traits\Operations\Inertia;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait SingleReadInertiaOperation
{
    use BaseInertiaOperation;

    abstract protected function getShowComponent(): string;

    protected function executeShow(Model $model, Request $request, array $extra = [])
    {
        $this->loadRelations($model);
        return $this->inertiaResourceResponse($this->getShowComponent(), $model, $extra);
    }

    protected function loadRelations(Model $model): void {}
}
