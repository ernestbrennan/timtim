<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\City;
use App\Models\Feature;
use App\Models\RealtyCategory;
use Illuminate\Http\Response;

class RealtyCategoriesController extends Controller
{
    public function getList(Request $request)
    {
        return response()->json([
            'results' => RealtyCategory::all()->map(function ($item){
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                ];
            }),
            'status_code' => 200
        ], Response::HTTP_OK);
    }}