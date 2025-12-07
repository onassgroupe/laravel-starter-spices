<?php

namespace App\Core\Traits\Operations\Inertia;

trait CrudInertiaOperations
{
    use ListReadInertiaOperation, SingleReadInertiaOperation, CreateInertiaOperation, UpdateInertiaOperation, DeleteInertiaOperation;
}
