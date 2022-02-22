<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\City;
use App\Models\Complex;
use App\Models\ComplexFeature;
use App\Models\Feature;
use App\Models\Realty;
use App\Models\RealtyCategory;
use Carbon\Carbon;
use Illuminate\Http\Response;

class ComplexController extends Controller
{
    public function getList(Request $request)
    {
        $complexes = Complex::query()->with(['city'])->paginate();

        return response()->json([
            'results' => [
                'data' => $complexes->getCollection()->map(function ($complex) {
                    return [
                        'id' => $complex->id,
                        'name' => $complex->name,
                        'latitude' => $complex->latitude,
                        'longitude' => $complex->longitude,
                        'street_type' => $complex->street_type,
                        'street_name' => $complex->street_name,
                        'house_number' => $complex->house_number,
                        'min_full_price' => $complex->min_full_price,
                        'min_per_square_meter_price' => $complex->min_per_square_meter_price,
                        'currency' => $complex->currency,
                        'nearest_release_quarter' => $complex->nearest_release_quarter,
                        'nearest_release_year' => $complex->nearest_release_year,
                        'developer' => [
                            'name' => '0649892141',
                            'logo' => 'https://static.dimdim.wrenchtech.io/complexes/developers/a972286d-f9ce-4e5e-857f-281bc33e2d34'
                        ],
                        'images' => [
                            '/assets/images/default.png',
                            '/assets/images/default.png',
                            '/assets/images/default.png',
                        ],
                        'city' => [
                            'name' => $complex->city->name
                        ]
                    ];
                }),
                'pagination' => [
                    'total' => $complexes->total(),
                    'count' => $complexes->count(),
                    'page' => $complexes->currentPage(),
                    'per_page' => $complexes->perPage(),
                    'total_pages' => $complexes->lastPage()
                ]
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function getById(Request $request)
    {
        $complex = Complex::query()->find($request->get('id'));

        return response()->json([
            'results' => [
                'url' => 'https://synergia.city/',

                'id' => $complex->id,
                'name' => $complex->name,
                'description' => $complex->description,
                'latitude' => $complex->latitude,
                'longitude' => $complex->longitude,
                'street_type' => $complex->street_type,
                'street_name' => $complex->street_name,
                'house_number' => $complex->house_number,
                'min_full_price' => $complex->min_full_price,
                'min_per_square_meter_price' => $complex->min_per_square_meter_price,
                'currency' => $complex->currency,
                'nearest_release_quarter' => $complex->nearest_release_quarter,
                'nearest_release_year' => $complex->nearest_release_year,
                'developer' => [
                    'name' => 'Developer',
                    'phone' => '0649892141',
                    'logo' => 'https://static.dimdim.wrenchtech.io/complexes/developers/a972286d-f9ce-4e5e-857f-281bc33e2d34'
                ],
                'images' => [
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                ],
                'city' => [
                    'name' => $complex->city->name
                ],
                'characteristics' => $complex->features()->whereHas('feature.category', function ($query) {
                    return $query->where('slug', 'characteristics');
                })
                    ->orderBy('feature_id')
                    ->get()
                    ->map(function ($i) {
                        return [
                            'id' => $i->id,
                            'value' => $i->value,
                            'feature' => $i->feature->only('id', 'name', 'icon'),
                        ];
                    }),
                'infrastructure' => $complex->features()->whereHas('feature.category', function ($query) {
                    return $query->where('slug', 'infrastructure');
                })
                    ->orderBy('feature_id')
                    ->get()
                    ->map(function ($i) {
                        return [
                            'id' => $i->id,
                            'value' => $i->value,
                            'feature' => $i->feature->only('id', 'name', 'icon'),
                        ];
                    }),

                'additional_info' => [
                    'type' => 'Feature',
                    'geometry' => [
                        'type' => 'Point',
                        'coordinates' => [
                            $complex->longitude,
                            $complex->latitude
                        ],
                    ],
                    'properties' => [
                        'count' => 1,
                        'id' => $complex->id,
                        'price' => $complex->min_full_price,
                        'currency' => $complex->currency,
                    ]
                ]
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function getTest(Request $request)
    {
        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/complex.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}