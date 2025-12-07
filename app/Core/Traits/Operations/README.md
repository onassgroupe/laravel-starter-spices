# Core Operations Traits

Ce dossier contient les traits pour simplifier les opérations CRUD dans les contrôleurs.

## Types d'opérations

### Api Operations
Pour les API REST pures qui retournent du JSON.

```php
use App\Core\Traits\Operations\Api\CrudApiOperations;

class ProductController extends Controller
{
    use CrudApiOperations;

    protected function getModelClass(): string
    {
        return Product::class;
    }
}
```

### Inertia Operations
Pour les applications Inertia qui retournent des pages.

```php
use App\Core\Traits\Operations\Inertia\CrudInertiaOperations;

class ProductController extends Controller
{
    use CrudInertiaOperations;

    protected function getModelClass(): string
    {
        return Product::class;
    }

    protected function getIndexComponent(): string
    {
        return 'products/index';
    }
}
```

### Hybrid Operations
Pour les contrôleurs qui supportent API ET Inertia (détection automatique).

```php
use App\Core\Traits\Operations\Hybrid\CrudHybridOperations;

class ProductController extends Controller
{
    use CrudHybridOperations;

    protected function getModelClass(): string
    {
        return Product::class;
    }

    protected function getIndexComponent(): string
    {
        return 'products/index';
    }
}
```

## Hooks disponibles

- `beforeStore(Request $request)` - Avant création
- `afterStore(Model $model, Request $request)` - Après création
- `beforeUpdate(Model $model, Request $request)` - Avant mise à jour
- `afterUpdate(Model $model, Request $request)` - Après mise à jour
- `beforeDestroy(Model $model, Request $request)` - Avant suppression
- `afterDestroy(Model $model, Request $request)` - Après suppression
- `applyFilters($query, Request $request)` - Filtres personnalisés
- `loadRelations(Model $model)` - Charger relations pour show
