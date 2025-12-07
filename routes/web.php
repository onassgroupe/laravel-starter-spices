<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Landing page
Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

// Legacy welcome page (optional)
Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('welcome');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Default dashboard redirect
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('dashboard');
    });
});

require __DIR__.'/settings.php';
