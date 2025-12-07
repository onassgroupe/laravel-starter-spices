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
