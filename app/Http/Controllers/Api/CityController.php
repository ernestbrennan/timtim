<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\City;
use Illuminate\Http\Response;

class CityController extends Controller
{
    /**
     * @SWG\Get(
     *   path="/city",
     *   summary="Get Cities",
     *   tags={"city"},
     *   @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function getList(Request $request)
    {
        return response()->json([
            'results' => City::all()->map(function ($item){
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'slug' => $item->slug,
                    'icon' => $item->icon,
                ];
            }),
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}