<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;

abstract class ClientController extends Controller
{
    protected ?string $routePrefix = 'client';
}
