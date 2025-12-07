<?php

namespace App\Core\Traits\Operations\Inertia;

use Illuminate\Http\Request;

trait ListReadInertiaOperation
{
    use BaseInertiaOperation;

    abstract protected function getIndexComponent(): string;

    protected function executeIndex(Request $request, array $extra = [])
    {
        $query = $this->bootQuery($this->getModelClass());
        $this->applyFilters($query, $request);
        return $this->paginatedInertiaResponse(
            $this->getIndexComponent(),
            $query->paginate($request->get('per_page', $this->perPage)),
            $extra
        );
    }

    protected function applyFilters($query, Request $request): void {}
}
