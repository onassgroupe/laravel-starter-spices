<?php

namespace App\Core\Traits\Operations\Common;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

trait BaseOperation
{
    protected int $perPage = 15;
    protected ?string $routePrefix = null;

    abstract protected function getModelClass(): string;

    protected function getResourceClass(): ?string
    {
        return null;
    }

    protected function getResourceName(): string
    {
        return Str::plural(Str::snake(class_basename($this->getModelClass())));
    }

    protected function getTranslatedMessage(string $action): string
    {
        $resourceName = Str::singular($this->getResourceName());
        return __("messages.crud.{$action}", ['resource' => __("messages.resources.{$resourceName}")]);
    }

    protected function isApiRequest(): bool
    {
        return request()->expectsJson();
    }

    protected function getRedirectRouteName(string $action, ?Model $model = null): string
    {
        $resourceName = $this->getResourceName();
        return $this->routePrefix ? "{$this->routePrefix}.{$resourceName}.{$action}" : "{$resourceName}.{$action}";
    }

    protected function bootQuery(string $modelClass)
    {
        return $modelClass::query();
    }

    protected function prepareItems(array $items): array
    {
        $resourceClass = $this->getResourceClass();
        return $resourceClass ? $resourceClass::collection($items)->resolve() : $items;
    }

    protected function getPaginationData(LengthAwarePaginator $paginator): array
    {
        return [
            'current_page' => $paginator->currentPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'last_page' => $paginator->lastPage(),
            'has_next_page' => $paginator->hasMorePages(),
            'has_previous_page' => $paginator->currentPage() > 1,
        ];
    }
}
