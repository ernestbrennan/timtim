<?php

use App\Http\Controllers\SpaController;
use Illuminate\Support\Facades\Route;

//Route::get('/', [SpaController::class, 'spa'])->where('any', '.*');


Route::view('/{any}', 'app')->where('any', '.*');
//Route::view('/{all?}', 'app')->where('all','^(?!api|admin).*$');
