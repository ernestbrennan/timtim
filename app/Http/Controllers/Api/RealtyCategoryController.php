<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\City;
use App\Models\RealtyCategory;
use Illuminate\Http\Response;

class RealtyCategoryController extends Controller
{
    public function getList(Request $request)
    {
        return response()->json([
            'results' => RealtyCategory::all()->map(function ($item){
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'slug' => $item->slug,
                ];
            }),
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}