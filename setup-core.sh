#!/bin/bash

# =============================================================================
# Laravel Starter - Core Setup Script
# Architecture multi-apps avec glassmorphism UI
# =============================================================================

set -e

echo "🚀 Configuration du Core Laravel Starter..."

# =============================================================================
# BACKEND - Structure Core Traits
# =============================================================================

echo "📁 Création de la structure backend Core..."

mkdir -p app/Core/Traits/Operations/{Api,Inertia,Hybrid,Common}

# -----------------------------------------------------------------------------
# Common/BaseOperation.php
# -----------------------------------------------------------------------------
cat > app/Core/Traits/Operations/Common/BaseOperation.php << 'EOF'
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
EOF

# -----------------------------------------------------------------------------
# Api Operations
# -----------------------------------------------------------------------------
cat > app/Core/Traits/Operations/Api/BaseApiOperation.php << 'EOF'
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
EOF

cat > app/Core/Traits/Operations/Api/ListReadApiOperation.php << 'EOF'
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
EOF

cat > app/Core/Traits/Operations/Api/SingleReadApiOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait SingleReadApiOperation
{
    use BaseApiOperation;

    protected function executeShow(Model $model, Request $request, array $extra = [])
    {
        $this->loadRelations($model);
        return $this->apiResourceResponse($model, $extra);
    }

    protected function loadRelations(Model $model): void {}
}
EOF

cat > app/Core/Traits/Operations/Api/CreateApiOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait CreateApiOperation
{
    use BaseApiOperation;

    protected function executeStore(Request $request)
    {
        $this->beforeStore($request);
        $model = $this->getModelClass()::create($request->validated());
        $this->afterStore($model, $request);
        return $this->apiResourceResponse($model)->setStatusCode(201);
    }

    protected function beforeStore(Request $request): void {}
    protected function afterStore(Model $model, Request $request): void {}
}
EOF

cat > app/Core/Traits/Operations/Api/UpdateApiOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait UpdateApiOperation
{
    use BaseApiOperation;

    protected function executeUpdate(Model $model, Request $request)
    {
        $this->beforeUpdate($model, $request);
        $model->update($request->validated());
        $this->afterUpdate($model, $request);
        return $this->apiResourceResponse($model->fresh());
    }

    protected function beforeUpdate(Model $model, Request $request): void {}
    protected function afterUpdate(Model $model, Request $request): void {}
}
EOF

cat > app/Core/Traits/Operations/Api/DeleteApiOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait DeleteApiOperation
{
    use BaseApiOperation;

    protected function executeDestroy(Model $model, Request $request)
    {
        $this->beforeDestroy($model, $request);
        $model->delete();
        $this->afterDestroy($model, $request);
        return response()->json(['message' => $this->getTranslatedMessage('deleted')]);
    }

    protected function beforeDestroy(Model $model, Request $request): void {}
    protected function afterDestroy(Model $model, Request $request): void {}
}
EOF

cat > app/Core/Traits/Operations/Api/CrudApiOperations.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Api;

trait CrudApiOperations
{
    use ListReadApiOperation, SingleReadApiOperation, CreateApiOperation, UpdateApiOperation, DeleteApiOperation;
}
EOF

# -----------------------------------------------------------------------------
# Inertia Operations
# -----------------------------------------------------------------------------
cat > app/Core/Traits/Operations/Inertia/BaseInertiaOperation.php << 'EOF'
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
EOF

cat > app/Core/Traits/Operations/Inertia/ListReadInertiaOperation.php << 'EOF'
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
EOF

cat > app/Core/Traits/Operations/Inertia/SingleReadInertiaOperation.php << 'EOF'
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
EOF

cat > app/Core/Traits/Operations/Inertia/CreateInertiaOperation.php << 'EOF'
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
EOF

cat > app/Core/Traits/Operations/Inertia/UpdateInertiaOperation.php << 'EOF'
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
EOF

cat > app/Core/Traits/Operations/Inertia/DeleteInertiaOperation.php << 'EOF'
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
EOF

cat > app/Core/Traits/Operations/Inertia/CrudInertiaOperations.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Inertia;

trait CrudInertiaOperations
{
    use ListReadInertiaOperation, SingleReadInertiaOperation, CreateInertiaOperation, UpdateInertiaOperation, DeleteInertiaOperation;
}
EOF

# -----------------------------------------------------------------------------
# Hybrid Operations
# -----------------------------------------------------------------------------
cat > app/Core/Traits/Operations/Hybrid/ListReadHybridOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\ListReadApiOperation;
use App\Core\Traits\Operations\Inertia\ListReadInertiaOperation;
use Illuminate\Http\Request;

trait ListReadHybridOperation
{
    use ListReadApiOperation, ListReadInertiaOperation {
        ListReadApiOperation::executeIndex as executeApiIndex;
        ListReadInertiaOperation::executeIndex as executeInertiaIndex;
        ListReadApiOperation::applyFilters insteadof ListReadInertiaOperation;
    }

    protected function executeIndex(Request $request, array $extra = [])
    {
        return $this->isApiRequest()
            ? $this->executeApiIndex($request, $extra)
            : $this->executeInertiaIndex($request, $extra);
    }
}
EOF

cat > app/Core/Traits/Operations/Hybrid/SingleReadHybridOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\SingleReadApiOperation;
use App\Core\Traits\Operations\Inertia\SingleReadInertiaOperation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait SingleReadHybridOperation
{
    use SingleReadApiOperation, SingleReadInertiaOperation {
        SingleReadApiOperation::executeShow as executeApiShow;
        SingleReadInertiaOperation::executeShow as executeInertiaShow;
        SingleReadApiOperation::loadRelations insteadof SingleReadInertiaOperation;
    }

    protected function executeShow(Model $model, Request $request, array $extra = [])
    {
        return $this->isApiRequest()
            ? $this->executeApiShow($model, $request, $extra)
            : $this->executeInertiaShow($model, $request, $extra);
    }
}
EOF

cat > app/Core/Traits/Operations/Hybrid/CreateHybridOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\CreateApiOperation;
use App\Core\Traits\Operations\Inertia\CreateInertiaOperation;
use Illuminate\Http\Request;

trait CreateHybridOperation
{
    use CreateApiOperation, CreateInertiaOperation {
        CreateApiOperation::executeStore as executeApiStore;
        CreateInertiaOperation::executeStore as executeInertiaStore;
        CreateApiOperation::beforeStore insteadof CreateInertiaOperation;
        CreateApiOperation::afterStore insteadof CreateInertiaOperation;
    }

    protected function executeStore(Request $request)
    {
        return $this->isApiRequest()
            ? $this->executeApiStore($request)
            : $this->executeInertiaStore($request);
    }
}
EOF

cat > app/Core/Traits/Operations/Hybrid/UpdateHybridOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\UpdateApiOperation;
use App\Core\Traits\Operations\Inertia\UpdateInertiaOperation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait UpdateHybridOperation
{
    use UpdateApiOperation, UpdateInertiaOperation {
        UpdateApiOperation::executeUpdate as executeApiUpdate;
        UpdateInertiaOperation::executeUpdate as executeInertiaUpdate;
        UpdateApiOperation::beforeUpdate insteadof UpdateInertiaOperation;
        UpdateApiOperation::afterUpdate insteadof UpdateInertiaOperation;
    }

    protected function executeUpdate(Model $model, Request $request)
    {
        return $this->isApiRequest()
            ? $this->executeApiUpdate($model, $request)
            : $this->executeInertiaUpdate($model, $request);
    }
}
EOF

cat > app/Core/Traits/Operations/Hybrid/DeleteHybridOperation.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Hybrid;

use App\Core\Traits\Operations\Api\DeleteApiOperation;
use App\Core\Traits\Operations\Inertia\DeleteInertiaOperation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

trait DeleteHybridOperation
{
    use DeleteApiOperation, DeleteInertiaOperation {
        DeleteApiOperation::executeDestroy as executeApiDestroy;
        DeleteInertiaOperation::executeDestroy as executeInertiaDestroy;
        DeleteApiOperation::beforeDestroy insteadof DeleteInertiaOperation;
        DeleteApiOperation::afterDestroy insteadof DeleteInertiaOperation;
    }

    protected function executeDestroy(Model $model, Request $request)
    {
        return $this->isApiRequest()
            ? $this->executeApiDestroy($model, $request)
            : $this->executeInertiaDestroy($model, $request);
    }
}
EOF

cat > app/Core/Traits/Operations/Hybrid/CrudHybridOperations.php << 'EOF'
<?php

namespace App\Core\Traits\Operations\Hybrid;

trait CrudHybridOperations
{
    use ListReadHybridOperation, SingleReadHybridOperation, CreateHybridOperation, UpdateHybridOperation, DeleteHybridOperation;
}
EOF

# -----------------------------------------------------------------------------
# HasSearchScope Trait
# -----------------------------------------------------------------------------
cat > app/Core/Traits/HasSearchScope.php << 'EOF'
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
EOF

# =============================================================================
# BACKEND - Controllers Structure (Admin, Client, Landing)
# =============================================================================

echo "📁 Création de la structure controllers..."

mkdir -p app/Http/Controllers/{Admin,Client,Landing}

cat > app/Http/Controllers/Admin/AdminController.php << 'EOF'
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

abstract class AdminController extends Controller
{
    protected ?string $routePrefix = 'admin';
}
EOF

cat > app/Http/Controllers/Client/ClientController.php << 'EOF'
<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;

abstract class ClientController extends Controller
{
    protected ?string $routePrefix = 'client';
}
EOF

# =============================================================================
# FRONTEND - Structure lib/core
# =============================================================================

echo "📁 Création de la structure frontend lib/core..."

mkdir -p resources/js/lib/core/{ui,utils,hooks,types}

# -----------------------------------------------------------------------------
# Utils
# -----------------------------------------------------------------------------
cat > resources/js/lib/core/utils/cn.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
EOF

cat > resources/js/lib/core/utils/format.ts << 'EOF'
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat('fr-FR', options).format(value);
}

export function formatCurrency(value: number, currency = 'XOF'): string {
    return formatNumber(value, { style: 'currency', currency });
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('fr-FR', options).format(new Date(date));
}

export function formatPhone(phone: string): string {
    return phone.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}
EOF

cat > resources/js/lib/core/utils/index.ts << 'EOF'
export * from './cn';
export * from './format';
EOF

# -----------------------------------------------------------------------------
# Types
# -----------------------------------------------------------------------------
cat > resources/js/lib/core/types/pagination.ts << 'EOF'
export interface Pagination {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_next_page: boolean;
    has_previous_page: boolean;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: Pagination;
    extra?: Record<string, any>;
}
EOF

cat > resources/js/lib/core/types/index.ts << 'EOF'
export * from './pagination';
EOF

# -----------------------------------------------------------------------------
# Hooks
# -----------------------------------------------------------------------------
cat > resources/js/lib/core/hooks/use-fetch.ts << 'EOF'
import { useCallback, useEffect, useState } from 'react';

interface UseFetchOptions {
    skip?: boolean;
}

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useGet<T>(url: string, options: UseFetchOptions = {}): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(!options.skip);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!url || options.skip) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    }, [url, options.skip]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
EOF

cat > resources/js/lib/core/hooks/use-debounce.ts << 'EOF'
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
EOF

cat > resources/js/lib/core/hooks/use-auth.ts << 'EOF'
import { usePage } from '@inertiajs/react';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    permissions?: string[];
}

export function useAuth() {
    const { auth } = usePage().props as { auth: { user: AuthUser } };
    const user = auth?.user;
    const permissions = user?.permissions ?? [];

    const can = (permission: string): boolean => permissions.includes(permission);
    const canAny = (perms: string[]): boolean => perms.some(p => permissions.includes(p));
    const canAll = (perms: string[]): boolean => perms.every(p => permissions.includes(p));

    return { user, can, canAny, canAll, isAuthenticated: !!user };
}
EOF

cat > resources/js/lib/core/hooks/index.ts << 'EOF'
export * from './use-fetch';
export * from './use-debounce';
export * from './use-auth';
EOF

# -----------------------------------------------------------------------------
# UI Components - Fields (Glassmorphism)
# -----------------------------------------------------------------------------
cat > resources/js/lib/core/ui/label.tsx << 'EOF'
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../utils/cn';

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
        {...props}
    />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
EOF

cat > resources/js/lib/core/ui/text-field.tsx << 'EOF'
import * as React from 'react';
import { cn } from '../utils/cn';
import { Label } from './label';
import { AlertCircle } from 'lucide-react';

interface TextFieldProps extends React.ComponentProps<'input'> {
    label?: string;
    error?: string;
    helperText?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    containerClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
    ({ className, label, error, helperText, startIcon, endIcon, required, containerClassName, type = 'text', ...props }, ref) => {
        return (
            <div className={cn('space-y-2', containerClassName)}>
                {label && (
                    <Label className="text-sm font-medium">
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                )}
                <div className="relative">
                    {startIcon && (
                        <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                            {startIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        ref={ref}
                        className={cn(
                            // Base styles
                            'flex h-11 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 outline-none',
                            // Glassmorphism
                            'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl',
                            'border border-white/20 dark:border-gray-700/50',
                            'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
                            // Placeholder
                            'placeholder:text-muted-foreground/60',
                            // Hover
                            'hover:bg-white/80 dark:hover:bg-gray-900/80',
                            'hover:border-white/40 dark:hover:border-gray-600/50',
                            // Focus
                            'focus:bg-white/90 dark:focus:bg-gray-900/90',
                            'focus:border-primary/50 focus:ring-4 focus:ring-primary/10',
                            // Error
                            error && 'border-destructive/50 focus:border-destructive focus:ring-destructive/10',
                            // Icons padding
                            startIcon && 'pl-10',
                            (endIcon || error) && 'pr-10',
                            className
                        )}
                        aria-invalid={!!error}
                        {...props}
                    />
                    {(endIcon || error) && (
                        <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
                            {endIcon}
                            {error && <AlertCircle className="h-4 w-4 text-destructive" />}
                        </div>
                    )}
                </div>
                {(error || helperText) && (
                    <p className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);
TextField.displayName = 'TextField';

export { TextField };
EOF

cat > resources/js/lib/core/ui/password-field.tsx << 'EOF'
import * as React from 'react';
import { cn } from '../utils/cn';
import { Label } from './label';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps extends Omit<React.ComponentProps<'input'>, 'type'> {
    label?: string;
    error?: string;
    helperText?: string;
    containerClassName?: string;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
    ({ className, label, error, helperText, required, containerClassName, ...props }, ref) => {
        const [show, setShow] = React.useState(false);

        return (
            <div className={cn('space-y-2', containerClassName)}>
                {label && (
                    <Label className="text-sm font-medium">
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                )}
                <div className="relative">
                    <input
                        type={show ? 'text' : 'password'}
                        ref={ref}
                        className={cn(
                            'flex h-11 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 outline-none',
                            'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl',
                            'border border-white/20 dark:border-gray-700/50',
                            'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
                            'placeholder:text-muted-foreground/60',
                            'hover:bg-white/80 dark:hover:bg-gray-900/80',
                            'focus:bg-white/90 dark:focus:bg-gray-900/90',
                            'focus:border-primary/50 focus:ring-4 focus:ring-primary/10',
                            error && 'border-destructive/50 focus:border-destructive focus:ring-destructive/10',
                            'pr-20',
                            className
                        )}
                        aria-invalid={!!error}
                        {...props}
                    />
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        {error && <AlertCircle className="h-4 w-4 text-destructive" />}
                    </div>
                </div>
                {(error || helperText) && (
                    <p className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);
PasswordField.displayName = 'PasswordField';

export { PasswordField };
EOF

cat > resources/js/lib/core/ui/number-field.tsx << 'EOF'
import * as React from 'react';
import { TextField } from './text-field';
import { formatNumber } from '../utils/format';

interface NumberFieldProps {
    label?: string;
    value?: number;
    onChange?: (value: number) => void;
    placeholder?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    format?: boolean;
    className?: string;
}

const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(({
    value,
    onChange,
    format = false,
    ...props
}, ref) => {
    const [displayValue, setDisplayValue] = React.useState(value?.toString() ?? '');

    React.useEffect(() => {
        if (format && value !== undefined) {
            setDisplayValue(formatNumber(value));
        } else {
            setDisplayValue(value?.toString() ?? '');
        }
    }, [value, format]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d.-]/g, '');
        setDisplayValue(format ? e.target.value : raw);
        const num = parseFloat(raw);
        if (!isNaN(num)) onChange?.(num);
        else if (raw === '') onChange?.(0);
    };

    return (
        <TextField
            ref={ref}
            type={format ? 'text' : 'number'}
            value={displayValue}
            onChange={handleChange}
            {...props}
        />
    );
});
NumberField.displayName = 'NumberField';

export { NumberField };
EOF

cat > resources/js/lib/core/ui/textarea-field.tsx << 'EOF'
import * as React from 'react';
import { cn } from '../utils/cn';
import { Label } from './label';
import { AlertCircle } from 'lucide-react';

interface TextareaFieldProps extends React.ComponentProps<'textarea'> {
    label?: string;
    error?: string;
    helperText?: string;
    containerClassName?: string;
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    ({ className, label, error, helperText, required, containerClassName, ...props }, ref) => {
        return (
            <div className={cn('space-y-2', containerClassName)}>
                {label && (
                    <Label className="text-sm font-medium">
                        {label}
                        {required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                )}
                <div className="relative">
                    <textarea
                        ref={ref}
                        className={cn(
                            'flex min-h-[120px] w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none resize-none',
                            'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl',
                            'border border-white/20 dark:border-gray-700/50',
                            'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
                            'placeholder:text-muted-foreground/60',
                            'hover:bg-white/80 dark:hover:bg-gray-900/80',
                            'focus:bg-white/90 dark:focus:bg-gray-900/90',
                            'focus:border-primary/50 focus:ring-4 focus:ring-primary/10',
                            error && 'border-destructive/50 focus:border-destructive focus:ring-destructive/10',
                            className
                        )}
                        aria-invalid={!!error}
                        {...props}
                    />
                    {error && (
                        <div className="absolute top-3 right-3">
                            <AlertCircle className="h-4 w-4 text-destructive" />
                        </div>
                    )}
                </div>
                {(error || helperText) && (
                    <p className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);
TextareaField.displayName = 'TextareaField';

export { TextareaField };
EOF

cat > resources/js/lib/core/ui/select-field.tsx << 'EOF'
import * as React from 'react';
import { cn } from '../utils/cn';
import { Label } from './label';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    containerClassName?: string;
}

const SelectField = React.memo(({
    options,
    value,
    onChange,
    placeholder = 'Sélectionner...',
    label,
    error,
    disabled,
    required,
    className,
    containerClassName,
}: SelectFieldProps) => {
    return (
        <div className={cn('space-y-2', containerClassName)}>
            {label && (
                <Label className="text-sm font-medium">
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            )}
            <div className="relative">
                <select
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className={cn(
                        'flex h-11 w-full appearance-none rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 outline-none cursor-pointer',
                        'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl',
                        'border border-white/20 dark:border-gray-700/50',
                        'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
                        'hover:bg-white/80 dark:hover:bg-gray-900/80',
                        'focus:bg-white/90 dark:focus:bg-gray-900/90',
                        'focus:border-primary/50 focus:ring-4 focus:ring-primary/10',
                        error && 'border-destructive/50',
                        disabled && 'opacity-50 cursor-not-allowed',
                        'pr-10',
                        className
                    )}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
});
SelectField.displayName = 'SelectField';

export { SelectField };
EOF

cat > resources/js/lib/core/ui/checkbox-field.tsx << 'EOF'
import * as React from 'react';
import { cn } from '../utils/cn';
import { Check } from 'lucide-react';

interface CheckboxFieldProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    description?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}

const CheckboxField = React.forwardRef<HTMLButtonElement, CheckboxFieldProps>(({
    checked = false,
    onChange,
    label,
    description,
    error,
    disabled,
    className,
}, ref) => {
    return (
        <div className={cn('flex items-start gap-3', className)}>
            <button
                ref={ref}
                type="button"
                role="checkbox"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange?.(!checked)}
                className={cn(
                    'h-5 w-5 shrink-0 rounded-lg transition-all duration-200 flex items-center justify-center',
                    'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl',
                    'border border-white/20 dark:border-gray-700/50',
                    'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
                    'hover:bg-white/80 dark:hover:bg-gray-900/80',
                    'focus:ring-4 focus:ring-primary/10 outline-none',
                    checked && 'bg-primary border-primary text-white',
                    disabled && 'opacity-50 cursor-not-allowed',
                    error && 'border-destructive'
                )}
            >
                {checked && <Check className="h-3 w-3" strokeWidth={3} />}
            </button>
            {(label || description) && (
                <div className="space-y-1">
                    {label && <p className="text-sm font-medium leading-none">{label}</p>}
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                    {error && <p className="text-sm text-destructive">{error}</p>}
                </div>
            )}
        </div>
    );
});
CheckboxField.displayName = 'CheckboxField';

export { CheckboxField };
EOF

cat > resources/js/lib/core/ui/search-select-field.tsx << 'EOF'
import * as React from 'react';
import { cn } from '../utils/cn';
import { Label } from './label';
import { Check, ChevronDown, Loader2, Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/use-debounce';
import { useGet } from '../hooks/use-fetch';

export interface SearchSelectFieldProps<T> {
    data?: T[];
    searchEndpoint?: string;
    label?: string;
    valueKey: keyof T;
    labelKey: keyof T | ((item: T) => string);
    placeholder?: string;
    noResultsLabel?: string;
    multiple?: boolean;
    selected?: T[keyof T] | T[keyof T][] | null;
    onSelectionChange: (selected: T[keyof T] | T[keyof T][] | null) => void;
    error?: string;
    required?: boolean;
    className?: string;
    containerClassName?: string;
}

function SearchSelectField<T>({
    data: initialData,
    searchEndpoint,
    label,
    valueKey,
    labelKey,
    placeholder = 'Sélectionner...',
    noResultsLabel = 'Aucun résultat',
    multiple = false,
    selected,
    onSelectionChange,
    error,
    required,
    className,
    containerClassName,
}: SearchSelectFieldProps<T>) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 300);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const searchUrl = searchEndpoint && debouncedSearch
        ? `${searchEndpoint}?search=${encodeURIComponent(debouncedSearch)}`
        : '';

    const { data: searchResults, loading } = useGet<{ items: T[] }>(searchUrl, { skip: !searchUrl });

    const getLabel = React.useCallback((item: T): string => {
        return typeof labelKey === 'function' ? labelKey(item) : String(item[labelKey] || '');
    }, [labelKey]);

    const displayData = React.useMemo(() => {
        if (searchEndpoint) return searchResults?.items || [];
        if (!initialData) return [];
        if (!search.trim()) return initialData;
        return initialData.filter(item => getLabel(item).toLowerCase().includes(search.toLowerCase()));
    }, [searchEndpoint, searchResults, initialData, search, getLabel]);

    const selectedItems = React.useMemo(() => {
        const dataSource = searchEndpoint ? searchResults?.items : initialData;
        if (!dataSource || !selected) return [];

        if (multiple && Array.isArray(selected)) {
            return dataSource.filter(item => (selected as T[keyof T][]).includes(item[valueKey]));
        }
        const found = dataSource.find(item => item[valueKey] === selected);
        return found ? [found] : [];
    }, [selected, searchResults, initialData, valueKey, multiple, searchEndpoint]);

    const handleSelect = (item: T) => {
        const itemValue = item[valueKey];
        if (multiple) {
            const currentSelected = (Array.isArray(selected) ? selected : []) as T[keyof T][];
            const isSelected = currentSelected.includes(itemValue);
            const newSelected = isSelected
                ? currentSelected.filter(v => v !== itemValue)
                : [...currentSelected, itemValue];
            onSelectionChange(newSelected);
        } else {
            onSelectionChange(itemValue);
            setOpen(false);
            setSearch('');
        }
    };

    const handleRemove = (item: T, e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple) {
            const currentSelected = (Array.isArray(selected) ? selected : []) as T[keyof T][];
            onSelectionChange(currentSelected.filter(v => v !== item[valueKey]));
        } else {
            onSelectionChange(null);
        }
    };

    // Close on outside click
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={cn('space-y-2', containerClassName)} ref={containerRef}>
            {label && (
                <Label className="text-sm font-medium">
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={cn(
                        'flex h-11 w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 outline-none text-left',
                        'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl',
                        'border border-white/20 dark:border-gray-700/50',
                        'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
                        'hover:bg-white/80 dark:hover:bg-gray-900/80',
                        'focus:border-primary/50 focus:ring-4 focus:ring-primary/10',
                        error && 'border-destructive/50',
                        className
                    )}
                >
                    <div className="flex-1 flex flex-wrap items-center gap-1.5 overflow-hidden">
                        {selectedItems.length === 0 ? (
                            <span className="text-muted-foreground">{placeholder}</span>
                        ) : (
                            selectedItems.map(item => (
                                <span
                                    key={String(item[valueKey])}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary"
                                >
                                    {getLabel(item)}
                                    <X
                                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                                        onClick={(e) => handleRemove(item, e)}
                                    />
                                </span>
                            ))
                        )}
                    </div>
                    <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
                </button>

                {open && (
                    <div className={cn(
                        'absolute z-50 mt-2 w-full rounded-xl overflow-hidden',
                        'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl',
                        'border border-white/20 dark:border-gray-700/50',
                        'shadow-[0_16px_64px_rgba(0,0,0,0.15)]'
                    )}>
                        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-200/50 dark:border-gray-700/50">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher..."
                                className="flex-1 bg-transparent outline-none text-sm"
                                autoFocus
                            />
                        </div>
                        <div className="max-h-[240px] overflow-y-auto p-1">
                            {loading ? (
                                <div className="flex items-center justify-center py-6">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            ) : displayData.length === 0 ? (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    {noResultsLabel}
                                </div>
                            ) : (
                                displayData.map(item => {
                                    const isSelected = selectedItems.some(s => s[valueKey] === item[valueKey]);
                                    return (
                                        <button
                                            key={String(item[valueKey])}
                                            type="button"
                                            onClick={() => handleSelect(item)}
                                            className={cn(
                                                'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left',
                                                'hover:bg-gray-100/80 dark:hover:bg-gray-800/80',
                                                isSelected && 'bg-primary/5'
                                            )}
                                        >
                                            <span>{getLabel(item)}</span>
                                            {isSelected && <Check className="h-4 w-4 text-primary" />}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

export { SearchSelectField };
EOF

cat > resources/js/lib/core/ui/index.ts << 'EOF'
export * from './label';
export * from './text-field';
export * from './password-field';
export * from './number-field';
export * from './textarea-field';
export * from './select-field';
export * from './checkbox-field';
export * from './search-select-field';
EOF

cat > resources/js/lib/core/index.ts << 'EOF'
export * from './ui';
export * from './hooks';
export * from './utils';
export * from './types';
EOF

# =============================================================================
# FRONTEND - Core Auth (shared across apps)
# =============================================================================

echo "📁 Création du core/auth..."

mkdir -p resources/js/core/auth/{components,hooks,pages,types}

cat > resources/js/core/auth/types/auth.types.ts << 'EOF'
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar?: string;
    permissions?: string[];
}

export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
EOF

cat > resources/js/core/auth/components/login-form.tsx << 'EOF'
import { useForm } from '@inertiajs/react';
import { TextField, PasswordField, CheckboxField } from '@/lib/core/ui';
import { LoginCredentials } from '../types/auth.types';

interface LoginFormProps {
    onSubmit?: () => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const { data, setData, post, processing, errors } = useForm<LoginCredentials>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', { onSuccess: onSubmit });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
                required
                autoComplete="email"
            />

            <PasswordField
                label="Mot de passe"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
                required
                autoComplete="current-password"
            />

            <CheckboxField
                checked={data.remember}
                onChange={(checked) => setData('remember', checked)}
                label="Se souvenir de moi"
            />

            <button
                type="submit"
                disabled={processing}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50"
            >
                {processing ? 'Connexion...' : 'Se connecter'}
            </button>
        </form>
    );
}
EOF

cat > resources/js/core/auth/components/register-form.tsx << 'EOF'
import { useForm } from '@inertiajs/react';
import { TextField, PasswordField } from '@/lib/core/ui';
import { RegisterData } from '../types/auth.types';

interface RegisterFormProps {
    onSubmit?: () => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
    const { data, setData, post, processing, errors } = useForm<RegisterData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', { onSuccess: onSubmit });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
                label="Nom"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
                required
                autoComplete="name"
            />

            <TextField
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
                required
                autoComplete="email"
            />

            <PasswordField
                label="Mot de passe"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
                required
                autoComplete="new-password"
            />

            <PasswordField
                label="Confirmer le mot de passe"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
                required
                autoComplete="new-password"
            />

            <button
                type="submit"
                disabled={processing}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50"
            >
                {processing ? 'Inscription...' : "S'inscrire"}
            </button>
        </form>
    );
}
EOF

cat > resources/js/core/auth/components/index.ts << 'EOF'
export * from './login-form';
export * from './register-form';
EOF

cat > resources/js/core/auth/index.ts << 'EOF'
export * from './components';
export * from './types/auth.types';
EOF

# =============================================================================
# FRONTEND - Apps Structure (Admin, Client, Landing)
# =============================================================================

echo "📁 Création de la structure apps (admin, client, landing)..."

mkdir -p resources/js/apps/admin/{components,features,layouts,pages}
mkdir -p resources/js/apps/client/{components,features,layouts,pages}
mkdir -p resources/js/apps/landing/{components,sections,pages}

# -----------------------------------------------------------------------------
# Admin App - Layouts
# -----------------------------------------------------------------------------
cat > resources/js/apps/admin/layouts/admin.layout.tsx << 'EOF'
import { PropsWithChildren } from 'react';
import { AdminSidebar } from '../components/admin-sidebar';
import { AdminHeader } from '../components/admin-header';

interface AdminLayoutProps extends PropsWithChildren {
    title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <AdminSidebar />

            <div className="lg:pl-72">
                <AdminHeader title={title} />
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
EOF

cat > resources/js/apps/admin/layouts/dashboard.layout.tsx << 'EOF'
import { PropsWithChildren } from 'react';
import { AdminLayout } from './admin.layout';

interface DashboardLayoutProps extends PropsWithChildren {
    title?: string;
    actions?: React.ReactNode;
}

export function DashboardLayout({ children, title, actions }: DashboardLayoutProps) {
    return (
        <AdminLayout title={title}>
            <div className="space-y-6">
                {(title || actions) && (
                    <div className="flex items-center justify-between">
                        {title && <h1 className="text-2xl font-bold">{title}</h1>}
                        {actions && <div className="flex items-center gap-3">{actions}</div>}
                    </div>
                )}
                {children}
            </div>
        </AdminLayout>
    );
}
EOF

cat > resources/js/apps/admin/layouts/index.ts << 'EOF'
export * from './admin.layout';
export * from './dashboard.layout';
EOF

# -----------------------------------------------------------------------------
# Admin App - Components
# -----------------------------------------------------------------------------
cat > resources/js/apps/admin/components/admin-sidebar.tsx << 'EOF'
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/core/utils';
import {
    Home,
    Users,
    Settings,
    Building2,
    BarChart3,
    Menu,
    X,
    ChevronLeft
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { title: 'Utilisateurs', href: '/admin/users', icon: Users },
    { title: 'Organisations', href: '/admin/organizations', icon: Building2 },
    { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { title: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => url.startsWith(href);

    const NavContent = () => (
        <>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                {!collapsed && (
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <span className="font-semibold text-lg">Admin</span>
                    </Link>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors hidden lg:flex"
                >
                    <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                            isActive(item.href)
                                ? 'bg-white/15 text-white shadow-lg'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                        )}
                    >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                    </Link>
                ))}
            </nav>
        </>
    );

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/80 backdrop-blur-xl shadow-lg"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 bottom-0 z-50 flex flex-col',
                    'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950',
                    'border-r border-white/10',
                    'transition-all duration-300',
                    // Desktop
                    'lg:translate-x-0',
                    collapsed ? 'lg:w-20' : 'lg:w-72',
                    // Mobile
                    mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full'
                )}
            >
                {/* Mobile close */}
                <button
                    onClick={() => setMobileOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10"
                >
                    <X className="h-5 w-5 text-white" />
                </button>

                <NavContent />
            </aside>
        </>
    );
}
EOF

cat > resources/js/apps/admin/components/admin-header.tsx << 'EOF'
import { useAuth } from '@/lib/core/hooks';
import { Link } from '@inertiajs/react';
import { Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/core/utils';

interface AdminHeaderProps {
    title?: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
    const { user } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-8">
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50" />

            <div className="relative flex items-center gap-4">
                {title && <h1 className="text-lg font-semibold hidden sm:block">{title}</h1>}
            </div>

            <div className="relative flex items-center gap-2">
                {/* Search */}
                <button className="p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors">
                    <Search className="h-5 w-5 text-muted-foreground" />
                </button>

                {/* Notifications */}
                <button className="p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* User menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                    </button>

                    {dropdownOpen && (
                        <div className={cn(
                            'absolute right-0 mt-2 w-56 rounded-xl overflow-hidden',
                            'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl',
                            'border border-white/20 dark:border-gray-700/50',
                            'shadow-[0_16px_64px_rgba(0,0,0,0.15)]'
                        )}>
                            <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
                                <p className="font-medium text-sm">{user?.name}</p>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                            <div className="p-1">
                                <Link
                                    href="/admin/settings"
                                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                                >
                                    <Settings className="h-4 w-4" />
                                    Paramètres
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 text-red-600"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Déconnexion
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
EOF

cat > resources/js/apps/admin/components/stats-card.tsx << 'EOF'
import { cn } from '@/lib/core/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    changeLabel?: string;
    icon?: LucideIcon;
    className?: string;
}

export function StatsCard({ title, value, change, changeLabel, icon: Icon, className }: StatsCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <div className={cn(
            'relative p-6 rounded-2xl overflow-hidden',
            'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl',
            'border border-white/20 dark:border-gray-700/50',
            'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
            'hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300',
            className
        )}>
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                    {change !== undefined && (
                        <div className="flex items-center gap-1.5">
                            {isPositive && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
                            <span className={cn(
                                'text-sm font-medium',
                                isPositive && 'text-green-500',
                                isNegative && 'text-red-500'
                            )}>
                                {isPositive && '+'}{change}%
                            </span>
                            {changeLabel && (
                                <span className="text-sm text-muted-foreground">{changeLabel}</span>
                            )}
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className="p-3 rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                )}
            </div>
        </div>
    );
}
EOF

cat > resources/js/apps/admin/components/index.ts << 'EOF'
export * from './admin-sidebar';
export * from './admin-header';
export * from './stats-card';
EOF

# -----------------------------------------------------------------------------
# Landing App - Layout
# -----------------------------------------------------------------------------
cat > resources/js/apps/landing/layouts/landing.layout.tsx << 'EOF'
import { PropsWithChildren } from 'react';
import { LandingHeader } from '../components/landing-header';
import { LandingFooter } from '../components/landing-footer';

export function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <LandingHeader />
            <main>{children}</main>
            <LandingFooter />
        </div>
    );
}
EOF

cat > resources/js/apps/landing/components/landing-header.tsx << 'EOF'
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/core/utils';

const navLinks = [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Tarifs', href: '#pricing' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export function LandingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50">
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50" />

            <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="font-bold text-xl">Starter</span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            Connexion
                        </Link>
                        <Link
                            href="/register"
                            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Commencer
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <Link href="/login" className="py-2 text-sm font-medium text-center">
                                Connexion
                            </Link>
                            <Link
                                href="/register"
                                className="py-2 text-sm font-medium text-center bg-primary text-white rounded-lg"
                            >
                                Commencer
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
EOF

cat > resources/js/apps/landing/components/landing-footer.tsx << 'EOF'
import { Link } from '@inertiajs/react';

export function LandingFooter() {
    return (
        <footer className="border-t border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-xs">S</span>
                        </div>
                        <span className="font-semibold">Starter</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Starter. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}
EOF

cat > resources/js/apps/landing/components/index.ts << 'EOF'
export * from './landing-header';
export * from './landing-footer';
EOF

cat > resources/js/apps/landing/layouts/index.ts << 'EOF'
export * from './landing.layout';
EOF

# =============================================================================
# TRANSLATIONS
# =============================================================================

echo "📁 Création des fichiers de traduction..."

mkdir -p lang/fr lang/en

cat > lang/fr/messages.php << 'EOF'
<?php

return [
    'crud' => [
        'created' => ':resource créé(e) avec succès.',
        'updated' => ':resource mis(e) à jour avec succès.',
        'deleted' => ':resource supprimé(e) avec succès.',
    ],
    'resources' => [
        'user' => 'Utilisateur',
        'organization' => 'Organisation',
    ],
];
EOF

cat > lang/en/messages.php << 'EOF'
<?php

return [
    'crud' => [
        'created' => ':resource created successfully.',
        'updated' => ':resource updated successfully.',
        'deleted' => ':resource deleted successfully.',
    ],
    'resources' => [
        'user' => 'User',
        'organization' => 'Organization',
    ],
];
EOF

# =============================================================================
# Update tsconfig paths
# =============================================================================

echo "📁 Mise à jour des alias TypeScript..."

# Check if tsconfig.json exists and update paths
if [ -f "tsconfig.json" ]; then
    # Create a backup
    cp tsconfig.json tsconfig.json.bak

    # This is a simple sed replacement - may need manual adjustment
    cat > tsconfig.paths.json << 'EOF'
{
    "compilerOptions": {
        "paths": {
            "@/*": ["./resources/js/*"],
            "@/lib/*": ["./resources/js/lib/*"],
            "@/core/*": ["./resources/js/core/*"],
            "@/apps/*": ["./resources/js/apps/*"]
        }
    }
}
EOF
    echo "⚠️  Veuillez fusionner tsconfig.paths.json dans votre tsconfig.json"
fi

# =============================================================================
# ARTISAN COMMAND - Make Feature (updated)
# =============================================================================

echo "📁 Mise à jour de la commande make:feature..."

mkdir -p app/Console/Commands

cat > app/Console/Commands/MakeFeatureCommand.php << 'EOF'
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Filesystem\Filesystem;

class MakeFeatureCommand extends Command
{
    protected $signature = 'make:feature
                            {name : The name of the feature (e.g., Product)}
                            {--app=admin : The app to create the feature in (admin, client)}
                            {--api : Create API-only controllers}
                            {--inertia : Create Inertia-only controllers}
                            {--hybrid : Create Hybrid controllers (default)}';

    protected $description = 'Create a complete feature with Model, Controllers, Requests, Resources, Policy, and Frontend';

    protected Filesystem $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();
        $this->files = $files;
    }

    public function handle()
    {
        $name = $this->argument('name');
        $app = $this->option('app');
        $studlyName = Str::studly($name);
        $kebabName = Str::kebab($name);
        $snakeName = Str::snake($name);
        $pluralSnake = Str::plural($snakeName);

        $operationType = 'Hybrid';
        if ($this->option('api')) $operationType = 'Api';
        elseif ($this->option('inertia')) $operationType = 'Inertia';

        $appPath = ucfirst($app);

        $this->info("Creating feature: {$studlyName} in {$appPath} app");

        // Backend
        $this->createModel($studlyName, $snakeName);
        $this->createMigration($pluralSnake);
        $this->createControllers($studlyName, $operationType, $appPath);
        $this->createRequests($studlyName, $appPath);
        $this->createResource($studlyName);
        $this->createPolicy($studlyName);

        // Frontend
        $this->createFrontendFeature($kebabName, $studlyName, $app);

        $this->info("Feature {$studlyName} created successfully!");
        $this->newLine();
        $this->comment("Next steps:");
        $this->line("  1. Update migration: database/migrations/*_create_{$pluralSnake}_table.php");
        $this->line("  2. Add routes to routes/web.php");
        $this->line("  3. Register policy in AuthServiceProvider");

        return Command::SUCCESS;
    }

    protected function createModel(string $name, string $snakeName): void
    {
        $stub = <<<EOF
<?php

namespace App\Models;

use App\Core\Traits\HasSearchScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class {$name} extends Model
{
    use HasFactory, HasSearchScope;

    protected \$fillable = ['name'];
    protected array \$searchable = ['name'];
}
EOF;
        $this->files->put(app_path("Models/{$name}.php"), $stub);
        $this->info("Created Model: {$name}");
    }

    protected function createMigration(string $table): void
    {
        $timestamp = date('Y_m_d_His');
        $stub = <<<EOF
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('{$table}', function (Blueprint \$table) {
            \$table->id();
            \$table->string('name');
            \$table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('{$table}');
    }
};
EOF;
        $this->files->put(database_path("migrations/{$timestamp}_create_{$table}_table.php"), $stub);
        $this->info("Created Migration: {$table}");
    }

    protected function createControllers(string $name, string $type, string $app): void
    {
        $dir = app_path("Http/Controllers/{$app}/{$name}");
        $this->files->makeDirectory($dir, 0755, true, true);

        $actions = ['List' => 'ListRead', 'Show' => 'SingleRead', 'Create' => 'Create', 'Update' => 'Update', 'Delete' => 'Delete'];

        foreach ($actions as $action => $trait) {
            $controller = "{$action}{$name}Controller";
            $traitFull = "{$trait}{$type}Operation";
            $stub = $this->controllerStub($name, $controller, $traitFull, $action, $type, $app);
            $this->files->put("{$dir}/{$controller}.php", $stub);
        }
        $this->info("Created Controllers in: {$app}/{$name}/");
    }

    protected function controllerStub(string $model, string $controller, string $trait, string $action, string $type, string $app): string
    {
        $kebab = Str::plural(Str::kebab($model));
        $ns = "App\\Http\\Controllers\\{$app}\\{$model}";

        $method = match($action) {
            'List' => "public function __invoke(\\Illuminate\\Http\\Request \$request)\n    {\n        \$this->authorize('viewAny', {$model}::class);\n        return \$this->executeIndex(\$request);\n    }",
            'Show' => "public function __invoke({$model} \$item, \\Illuminate\\Http\\Request \$request)\n    {\n        \$this->authorize('view', \$item);\n        return \$this->executeShow(\$item, \$request);\n    }",
            'Create' => "public function __invoke(\\App\\Http\\Requests\\{$app}\\{$model}\\Store{$model}Request \$request)\n    {\n        \$this->authorize('create', {$model}::class);\n        return \$this->executeStore(\$request);\n    }",
            'Update' => "public function __invoke({$model} \$item, \\App\\Http\\Requests\\{$app}\\{$model}\\Update{$model}Request \$request)\n    {\n        \$this->authorize('update', \$item);\n        return \$this->executeUpdate(\$item, \$request);\n    }",
            'Delete' => "public function __invoke({$model} \$item, \\Illuminate\\Http\\Request \$request)\n    {\n        \$this->authorize('delete', \$item);\n        return \$this->executeDestroy(\$item, \$request);\n    }",
        };

        $extra = '';
        if ($action === 'List' && $type !== 'Api') {
            $extra = "\n\n    protected function getIndexComponent(): string { return '{$app}/{$kebab}/index'; }";
        }
        if ($action === 'Show' && $type !== 'Api') {
            $extra = "\n\n    protected function getShowComponent(): string { return '{$app}/{$kebab}/show'; }";
        }

        return <<<EOF
<?php

namespace {$ns};

use App\Http\Controllers\Controller;
use App\Core\Traits\Operations\\{$type}\\{$trait};
use App\Http\Resources\\{$model}Resource;
use App\Models\\{$model};

class {$controller} extends Controller
{
    use {$trait};

    {$method}

    protected function getModelClass(): string { return {$model}::class; }
    protected function getResourceClass(): ?string { return {$model}Resource::class; }{$extra}
}
EOF;
    }

    protected function createRequests(string $name, string $app): void
    {
        $dir = app_path("Http/Requests/{$app}/{$name}");
        $this->files->makeDirectory($dir, 0755, true, true);

        foreach (['Store', 'Update'] as $type) {
            $stub = <<<EOF
<?php

namespace App\Http\Requests\\{$app}\\{$name};

use Illuminate\Foundation\Http\FormRequest;

class {$type}{$name}Request extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array { return ['name' => ['required', 'string', 'max:255']]; }
}
EOF;
            $this->files->put("{$dir}/{$type}{$name}Request.php", $stub);
        }
        $this->info("Created Requests");
    }

    protected function createResource(string $name): void
    {
        $stub = <<<EOF
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class {$name}Resource extends JsonResource
{
    public function toArray(Request \$request): array
    {
        return [
            'id' => \$this->id,
            'name' => \$this->name,
            'created_at' => \$this->created_at?->toISOString(),
            'updated_at' => \$this->updated_at?->toISOString(),
        ];
    }
}
EOF;
        $this->files->put(app_path("Http/Resources/{$name}Resource.php"), $stub);
        $this->info("Created Resource");
    }

    protected function createPolicy(string $name): void
    {
        $stub = <<<EOF
<?php

namespace App\Policies;

use App\Models\\{$name};
use App\Models\User;

class {$name}Policy
{
    public function viewAny(User \$user): bool { return true; }
    public function view(User \$user, {$name} \$item): bool { return true; }
    public function create(User \$user): bool { return true; }
    public function update(User \$user, {$name} \$item): bool { return true; }
    public function delete(User \$user, {$name} \$item): bool { return true; }
}
EOF;
        $this->files->put(app_path("Policies/{$name}Policy.php"), $stub);
        $this->info("Created Policy");
    }

    protected function createFrontendFeature(string $kebab, string $studly, string $app): void
    {
        $dir = resource_path("js/apps/{$app}/features/{$kebab}");
        $this->files->makeDirectory("{$dir}/components", 0755, true, true);
        $this->files->makeDirectory("{$dir}/hooks", 0755, true, true);
        $this->files->makeDirectory("{$dir}/types", 0755, true, true);

        // Types
        $types = <<<EOF
export interface {$studly} {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface {$studly}FormData {
    name: string;
}
EOF;
        $this->files->put("{$dir}/types/{$kebab}.types.ts", $types);

        // Hook
        $hook = <<<EOF
import { useForm } from '@inertiajs/react';
import { {$studly}FormData } from '../types/{$kebab}.types';

export function use{$studly}Form(initialData?: Partial<{$studly}FormData>) {
    return useForm<{$studly}FormData>({
        name: initialData?.name ?? '',
    });
}
EOF;
        $this->files->put("{$dir}/hooks/use-{$kebab}-form.ts", $hook);

        // Index
        $index = "export * from './types/{$kebab}.types';\nexport * from './hooks/use-{$kebab}-form';";
        $this->files->put("{$dir}/index.ts", $index);

        $this->info("Created Frontend feature: apps/{$app}/features/{$kebab}/");
    }
}
EOF

# =============================================================================
# FINAL
# =============================================================================

echo ""
echo "✅ Core setup complete!"
echo ""
echo "Structure créée:"
echo ""
echo "Backend:"
echo "  📁 app/Core/Traits/Operations/ - CRUD Traits (Api, Inertia, Hybrid)"
echo "  📁 app/Core/Traits/HasSearchScope.php - Search/Filter/Sort"
echo "  📁 app/Http/Controllers/{Admin,Client,Landing}/ - Controllers par app"
echo "  📁 app/Console/Commands/MakeFeatureCommand.php - php artisan make:feature"
echo ""
echo "Frontend:"
echo "  📁 resources/js/lib/core/ui/ - Composants UI (glassmorphism)"
echo "  📁 resources/js/lib/core/hooks/ - Hooks partagés"
echo "  📁 resources/js/lib/core/utils/ - Utilitaires (cn, format)"
echo "  📁 resources/js/core/auth/ - Auth partagé"
echo "  📁 resources/js/apps/admin/ - App Admin (layouts, components)"
echo "  📁 resources/js/apps/client/ - App Client"
echo "  📁 resources/js/apps/landing/ - Landing page"
echo ""
echo "Composants UI disponibles:"
echo "  - TextField, PasswordField, NumberField, TextareaField"
echo "  - SelectField, SearchSelectField, CheckboxField"
echo ""
echo "Usage:"
echo "  php artisan make:feature Product --app=admin"
echo "  php artisan make:feature Order --app=client --api"
echo ""
