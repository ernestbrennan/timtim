<?php

use App\Http\Controllers\Admin\OptionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\FeatureController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\RealtyCategoriesController;
use App\Http\Controllers\Admin\RealtyController;
use App\Http\Controllers\Admin\ComplexController;


Route::prefix('api')->group(function () {

    Route::get('options', [OptionController::class, 'options']);
    Route::get('city', [CityController::class, 'getList']);
    Route::get('feature', [FeatureController::class, 'getList']);
    Route::get('realty-categories', [RealtyCategoriesController::class, 'getList']);

    Route::prefix('realty')->group(function () {
        Route::get('/', [RealtyController::class, 'getList']);
        Route::get('by-id', [RealtyController::class, 'getById']);
        Route::post('create', [RealtyController::class, 'create']);
        Route::put('edit', [RealtyController::class, 'edit']);
    });

    Route::prefix('complex')->group(function () {
        Route::get('/', [ComplexController::class, 'getList']);
        Route::get('by-id', [ComplexController::class, 'getById']);
        Route::post('create', [ComplexController::class, 'create']);
        Route::put('edit', [ComplexController::class, 'edit']);
    });
});

Route::view('/{any?}', 'admin')->where('any', '.*');
