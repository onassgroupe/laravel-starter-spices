<?php

namespace App\Core\Traits\Operations\Api;

trait CrudApiOperations
{
    use ListReadApiOperation, SingleReadApiOperation, CreateApiOperation, UpdateApiOperation, DeleteApiOperation;
}
