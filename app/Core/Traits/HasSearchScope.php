<?php

namespace App\Core\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasSearchScope
{
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (empty($search)) return $query;

        $fields = $this->searchable ?? ['name'];

        return $query->where(function (Builder $q) use ($search, $fields) {
            foreach ($fields as $field) {
                if (str_contains($field, '.')) {
                    [$relation, $column] = explode('.', $field, 2);
                    $q->orWhereHas($relation, fn($sub) => $sub->where($column, 'LIKE', "%{$search}%"));
                } else {
                    $q->orWhere($field, 'LIKE', "%{$search}%");
                }
            }
        });
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        foreach ($filters as $field => $value) {
            if ($value === null || $value === '') continue;
            is_array($value) ? $query->whereIn($field, $value) : $query->where($field, $value);
        }
        return $query;
    }

    public function scopeSort(Builder $query, string $sortBy, string $direction = 'asc'): Builder
    {
        return $query->orderBy($sortBy, strtolower($direction) === 'desc' ? 'desc' : 'asc');
    }
}
