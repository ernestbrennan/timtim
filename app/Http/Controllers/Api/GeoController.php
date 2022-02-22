<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\City;
use App\Models\Complex;
use App\Models\Realty;
use App\Services\RealtyService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Storage;
use Swagger\Annotations as SWG;

class GeoController extends Controller
{
    private $realty_service;

    public function __construct(RealtyService $realty_service)
    {
        $this->realty_service = $realty_service;
    }

    /**
     * @SWG\Post(
     *   path="/geo/realty",
     *   summary="Get Geo Realty",
     *   tags={"geo"},
     *   @SWG\Parameter(
     *     name="body",
     *     in="body",
     *     description="Realty filters",
     *     required=true,
     *     @SWG\Schema(ref="#/definitions/RealtyFilters"),
     *   ),
     *   @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function getRealty(Request $request)
    {
        $filters = collect($request->all());

        return response()->json([
            'results' => [
                'bbox' => City::find($request->get('city_id'))->bbox,
                'geojson' => [
                    'type' => 'FeatureCollection',
                    'features' => $this->realty_service->getList($filters)
                        ->get()
                        ->map(function ($i) {
                            return [
                                'type' => 'Feature',
                                'geometry' => [
                                    'type' => 'Point',
                                    'coordinates' => [$i->longitude, $i->latitude],
                                ],
                                'properties' => [
                                    'count' => 1,
                                    'id' => $i->id,
                                    'price' => $i->price,
                                    'currency' => $i->currency,
                                ]
                            ];
                        })
                ]
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function getComplex(Request $request)
    {
        $city = City::find($request->get('city_id'));

        return response()->json([
            'results' => [
                'bbox' => $city->bbox,
                'geojson' => [
                    'type' => 'FeatureCollection',
                    'features' => Complex::all()->map(function ($i) {
                        return [
                            'type' => 'Feature',
                            'geometry' => [
                                'type' => 'Point',
                                'coordinates' => [$i->longitude, $i->latitude],
                            ],
                            'properties' => [
                                'count' => 1,
                                'id' => $i->id,
                                'price' => $i->min_full_price,
                                'currency' => $i->currency,
                            ]
                        ];
                    })
                ]
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}