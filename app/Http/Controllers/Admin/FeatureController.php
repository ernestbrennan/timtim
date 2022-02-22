<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\City;
use App\Models\Feature;
use Illuminate\Http\Response;

class FeatureController extends Controller
{
    public function getList(Request $request)
    {
        return response()->json([
            'results' => Feature::all()->map(function ($item){
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'icon' => $item->icon,
                    'icon_url' => $item->icon,
                    'is_active' => true,
                    'category_name' => $item->category->name,
                    'category_slug' => $item->category->slug,
                ];
            }),
            'status_code' => 200
        ], Response::HTTP_OK);
    }}