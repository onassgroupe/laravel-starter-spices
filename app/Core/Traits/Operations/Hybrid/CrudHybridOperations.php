<?php

namespace App\Core\Traits\Operations\Hybrid;

trait CrudHybridOperations
{
    use ListReadHybridOperation, SingleReadHybridOperation, CreateHybridOperation, UpdateHybridOperation, DeleteHybridOperation;
}
