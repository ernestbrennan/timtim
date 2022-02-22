<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Storage;

class ApiController extends Controller
{
    public function cities(Request $request){

        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/cities.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function citiesSubwayLines(Request $request){

        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/cities-subway-lines.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function citiesSubways(Request $request){

        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/cities-subways.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function citiesRegions(Request $request){

        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/cities-regions.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function citiesRegionsCategories(Request $request){

        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/cities-regions-categories.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function search()
    {
        return response()->json([
            'results' => [
                "id"=> "bf8207c8-82e4-4552-b6fd-3d839aaf3c2f",
                "filters"=> [
                    "geoParams"=> [
                        [
                            "filterName"=> "city",
                            "params"=> [
                                "city"=> 5
                            ]
                        ]
                    ],
                    "flatParams"=> [
                        [
                            "filterName"=> "lines_ranges",
                            "params"=> [
                                "year_max"=> 3020,
                                "year_min"=> 2020,
                                "quarter_max"=> 4,
                                "quarter_min"=> 1
                            ]
                        ]
                    ]
                ],
                "count"=> 733,
                "count_to_show"=> 733
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function searchList()
    {
        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/search-list.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function searchComplexes()
    {
        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/complexes.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function seoMetadata()
    {
        return response()->json([
            'detail' => "Не знайдено.",
            'status' => 404
        ], Response::HTTP_OK);
    }
    public function seoGeohash()
    {
        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/search-geohash.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function getJson()
    {
        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/geo-json.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function flat(Request $request)
    {
        return response()->json([
            'results' => [
                collect(json_decode(file_get_contents(storage_path('test-data/flat.json'))))->put('id', $request->get('ids'))
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function flatsViews(Request $request)
    {
        return response()->json([
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function features(Request $request)
    {
        return response()->json([
            'results' => json_decode(file_get_contents(storage_path('test-data/features.json'))),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function favorites(Request $request)
    {
        return response()->json([
            'results' => [],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function favoritesComplexes(Request $request)
    {
        return response()->json([
            'results' => [],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function favoritesLayouts(Request $request)
    {
        return response()->json([
            'results' => [],
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    public function signIn(Request $request)
    {
        return response()->json([
            'results' => [],
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}


