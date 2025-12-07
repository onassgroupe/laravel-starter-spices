<?php

namespace App\Core\Traits\Operations\Api;

use App\Core\Traits\Operations\Common\BaseOperation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

trait BaseApiOperation
{
    use BaseOperation;

    protected function paginatedApiResponse(LengthAwarePaginator $paginator, array $extra = [])
    {
        return response()->json(array_merge([
            'items' => $this->prepareItems($paginator->items()),
            'pagination' => $this->getPaginationData($paginator),
        ], $extra ? ['extra' => $extra] : []));
    }

    protected function apiResourceResponse(Model $model, array $extra = [])
    {
        $resourceClass = $this->getResourceClass();
        return response()->json(array_merge([
            'item' => $resourceClass ? new $resourceClass($model) : $model
        ], $extra ? ['extra' => $extra] : []));
    }
}
