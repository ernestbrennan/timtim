<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\Realty;
use Illuminate\Http\Response;

class RealtyController extends Controller
{
    public function getList()
    {
        return response()->json([
            'results' => Realty::query()->get()->map(function ($item) {
                return [
                    'id' => $item->id
                ];
            }),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function getById(Request $request)
    {
        $realty = Realty::query()->with('features')->find($request->get('id'));

        return response()->json([
            'results' => [
                'id' => $realty->id,
                'city_id' => $realty->city_id,
                'user_id' => 1,
                'type' => $realty->type,
                'adv_type' => $realty->adv_type,
                'price' => $realty->price,
                'currency' => $realty->currency,
                'description' => $realty->description,
                'size_total' => $realty->size_total,
                'size_kitchen' => $realty->size_kitchen,
                'size_living' => $realty->size_living,
                'floor' => $realty->floor,
                'floor_count' => $realty->floor_count,
                'room_count' => $realty->room_count,

                'latitude' => $realty->latitude,
                'longitude' => $realty->longitude,
                'street_type' => $realty->street_type,
                'street_name' => $realty->street_name,
                'house_number' => $realty->house_number,

                'communal_payments_type' => $realty->communal_payments_type,
                'layout_type' => $realty->layout_type,
                'bathroom_type' => $realty->bathroom_type,
                'condition_type' => $realty->condition_type,
                'furniture_type' => $realty->furniture_type,
                'heating_type' => $realty->heating_type,
                'wall_type' => $realty->wall_type,
                'building_type' => $realty->building_type,
                'parking_types' => $realty->parking_types,
                'entrance_types' => $realty->entrance_types,

                'allow_animals' => $realty->allow_animals,
                'allow_kids' => $realty->allow_kids,
                'allow_foreigners' => $realty->allow_foreigners,
                'allow_roommates' => $realty->allow_roommates,
                'allow_smoking' => $realty->allow_smoking,

                'feature_ids' => $realty->features->pluck('id')
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function create(Request $request)
    {
        $realty = Realty::create($request->except('feature_ids'));

        $realty->features()->sync($request->get('feature_ids'));

        return response()->json([
            'results' => $realty,
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function edit(Request $request)
    {
        $realty = Realty::find($request->get('id'));

        $realty->update($request->except('feature_ids'));

        $realty->features()->sync($request->get('feature_ids'));

        return response()->json([
            'results' => $realty,
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}