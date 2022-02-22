<?php

use App\Http\Controllers\Api\RealtyCategoryController;
use App\Http\Controllers\Api\RealtyController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\GeoController;
use App\Http\Controllers\Api\FeatureController;
use App\Http\Controllers\Api\ComplexController;
use App\Http\Controllers\Api\Auth\RegistrationController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\VerifyController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;

Route::prefix('auth')->group(function () {
    Route::post('login', [LoginController::class, 'login']);
    Route::post('register', [RegistrationController::class, 'register']);
    Route::post('verify', [VerifyController::class, 'verify']);
    Route::post('verify/resend-code', [VerifyController::class, 'resendCode']);
    Route::post('reset-password', [ResetPasswordController::class, 'index']);

    Route::group(['middleware' => ['auth:api']], function (){
        Route::get('user', [LoginController::class, 'user']);
        Route::post('logout', [LoginController::class, 'logout']);
        Route::post('reset-password/new-password', [ResetPasswordController::class, 'newPassword']);
    });
});

Route::get('city', [CityController::class, 'getList']);
Route::get('realty-categories', [RealtyCategoryController::class, 'getList']);
Route::get('features', [FeatureController::class, 'getList']);

Route::prefix('geo')->group(function () {
    Route::post('realty', [GeoController::class, 'getRealty']);
    Route::post('complex', [GeoController::class, 'getComplex']);
});
Route::prefix('realty')->group(function () {
    Route::post('/', [RealtyController::class, 'getList']);
    Route::get('by-id', [RealtyController::class, 'getById']);
    Route::get('category', [RealtyController::class, 'getCategoryList']);
    Route::get('options', [RealtyController::class, 'options']);
});
Route::prefix('complex')->group(function () {
    Route::post('/', [ComplexController::class, 'getList']);
    Route::get('/test', [ComplexController::class, 'getTest']);
    Route::get('/by-id', [ComplexController::class, 'getById']);
});

Route::get('cities/{id}/subway_lines', [ApiController::class, 'citiesSubwayLines']);
Route::get('cities/{id}/subways', [ApiController::class, 'citiesSubways']);
Route::get('cities/{id}/regions', [ApiController::class, 'citiesRegions']);
Route::get('cities/{id}/regions/categories', [ApiController::class, 'citiesRegionsCategories']);
Route::any('search/{id?}', [ApiController::class, 'search']);
Route::get('search/{id}/list', [ApiController::class, 'searchList']);
Route::get('search/{id}/geohash/{hash}', [ApiController::class, 'seoGeohash']);
Route::get('search/{id}/geojson_v2', [ApiController::class, 'getJson']);
Route::get('search/complexes/{id}/list', [ApiController::class, 'searchComplexes']);
Route::get('complexes', [ApiController::class, 'complex']);

Route::get('search/complexes/{id}/list', [ApiController::class, 'searchComplexes']);
Route::get('seo/metadata', [ApiController::class, 'seoMetadata']);

Route::get('flats', [ApiController::class, 'flat']);
Route::get('flats/info/update/{id}/views', [ApiController::class, 'flatsViews']);

//Route::get('features', [ApiController::class, 'features']);

Route::group(['middleware' => ['auth:api']], function () {
//        $api->any('search/{id?}', [ApiController::class, 'search']);
    Route::post('favorites', [ApiController::class, 'favorites']);
    Route::get('favorites', [ApiController::class, 'favorites']);
    Route::get('favorites/complexes', [ApiController::class, 'favoritesComplexes']);
    Route::post('favorites/complexes', [ApiController::class, 'favoritesComplexes']);
    Route::get('favorites/layouts', [ApiController::class, 'favoritesLayouts']);
    Route::post('favorites/layouts', [ApiController::class, 'favoritesLayouts']);

    Route::get('profiles/signin', [ApiController::class, 'signIn']);
});
