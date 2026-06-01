<?php

declare(strict_types=1);

use App\Http\Controllers\HealthController;
use App\Http\Controllers\SecurityController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    // health
    Route::get('/health', [HealthController::class, 'index'])->name('health');

    // security
    Route::post('/login', [SecurityController::class, 'login'])->name('login');
    Route::post('/logout', [SecurityController::class, 'logout'])->name('logout');
})->name('api.');

Route::get('{any}', fn () => view('app'))->where('any', '.*')->name('app');
