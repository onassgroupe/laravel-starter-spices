<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Http\Request;

trait ListReadApiOperation
{
    use BaseApiOperation;

    protected function executeIndex(Request $request, array $extra = [])
    {
        $query = $this->bootQuery($this->getModelClass());
        $this->applyFilters($query, $request);
        return $this->paginatedApiResponse($query->paginate($request->get('per_page', $this->perPage)), $extra);
    }

    protected function applyFilters($query, Request $request): void {}
}
