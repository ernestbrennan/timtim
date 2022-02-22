<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\City;
use Illuminate\Http\Response;

class CityController extends Controller
{
    public function getList(Request $request)
    {
        return response()->json([
            'results' => City::all()->map(function ($item){
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'slug' => $item->slug,
                    'slug_seo' => $item->slug,
                    'slug_geo' => $item->slug,
                    'icon' => $item->icon,
                    'icon_url' => $item->icon,
                    'is_active' => true,
                    'bbox' => $item->bbox,
                ];
            }),
            'status_code' => 200
        ], Response::HTTP_OK);
    }}