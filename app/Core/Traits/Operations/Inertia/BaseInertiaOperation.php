<?php

namespace App\Core\Traits\Operations\Inertia;

use App\Core\Traits\Operations\Common\BaseOperation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

trait BaseInertiaOperation
{
    use BaseOperation;

    protected function paginatedInertiaResponse(string $component, LengthAwarePaginator $paginator, array $extra = [])
    {
        return Inertia::render($component, array_merge([
            'items' => $this->prepareItems($paginator->items()),
            'pagination' => $this->getPaginationData($paginator),
        ], $extra));
    }

    protected function inertiaResourceResponse(string $component, Model $model, array $extra = [])
    {
        $resourceClass = $this->getResourceClass();
        return Inertia::render($component, array_merge([
            'item' => $resourceClass ? new $resourceClass($model) : $model
        ], $extra));
    }

    protected function inertiaRedirectTo(string $route, string $message = null): Response
    {
        $redirect = redirect()->to($route, 303);
        return $message ? $redirect->with('success', $message) : $redirect;
    }
}
