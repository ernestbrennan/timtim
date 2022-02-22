<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\City;
use Illuminate\Http\Response;

class OptionController extends Controller
{

    public function options(Request $request)
    {
        return response()->json([
            'results' => [
                'realty' => config('realty.options')
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }}