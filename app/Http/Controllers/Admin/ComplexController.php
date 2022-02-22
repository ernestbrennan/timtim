<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\Address;
use App\Models\City;
use App\Models\Complex;
use App\Models\Feature;
use App\Models\Realty;
use App\Models\RealtyCategory;
use Illuminate\Http\Response;

class ComplexController extends Controller
{
    public function getList()
    {
        return response()->json([
            'results' => Complex::query()->get()->map(function ($item) {
                return [
                    'id' => $item->id
                ];
            }),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function getById(Request $request)
    {
        $complex = Complex::query()->find($request->get('id'));

        return response()->json([
            'results' => [
                'id' => $complex->id,
                'city_id' => $complex->city_id,
                'name' => $complex->name,
                'description' => $complex->description,
                'min_full_price' => $complex->min_full_price,
                'min_per_square_meter_price' => $complex->min_per_square_meter_price,
                'currency' => $complex->currency,
                'latitude' => $complex->latitude,
                'longitude' => $complex->longitude,
                'street_type' => $complex->street_type,
                'street_name' => $complex->street_name,
                'house_number' => $complex->house_number,
                'nearest_release_quarter' => $complex->nearest_release_quarter,
                'nearest_release_year' => $complex->nearest_release_year,
                'characteristics' => $complex->features()
                    ->whereHas('feature.category', function ($query) {
                        return $query->where('slug', 'characteristics');
                    })
                    ->get(),
                'infrastructure' => $complex->features()
                    ->whereHas('feature.category', function ($query) {
                        return $query->where('slug', 'infrastructure');
                    })
                    ->get(),
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function create(Request $request)
    {
        $complex = Complex::create($request->except('characteristics', 'infrastructures'));

        $complex->features()->delete();
        $complex->features()->createMany(array_merge($request->get('characteristics', []), $request->get('infrastructure', [])));

        return response()->json([
            'results' => $complex,
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function edit(Request $request)
    {
        $complex = Complex::find($request->get('id'));

        $complex->update($request->except('characteristics', 'infrastructure'));

        $complex->features()->delete();
        $complex->features()->createMany(array_merge($request->get('characteristics', []), $request->get('infrastructure', [])));

        return response()->json([
            'results' => $complex,
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}