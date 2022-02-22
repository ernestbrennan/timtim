<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Models\Realty;
use App\Services\RealtyService;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Swagger\Annotations as SWG;

class RealtyController extends Controller
{
    private $service;

    public function __construct(RealtyService $service)
    {
        $this->service = $service;
    }

    /**
     * @SWG\Get(
     *   path="/realty/options",
     *   summary="Get Realty Options",
     *   tags={"realty"},
     *   @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function options()
    {
        return response()->json([
            'results' => config('realty.options'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    /**
     * @SWG\Get(
     *   path="/realty",
     *   summary="Get Realty List",
     *   tags={"realty"},
     *   @SWG\Parameter(
     *     name="body",
     *     in="body",
     *     description="Realty filters",
     *     required=true,
     *     @SWG\Schema(ref="#/definitions/RealtyFilters"),
     *   ),
     *   @SWG\Parameter(
     *     name="page",
     *     in="query",
     *     description="Page",
     *     type="integer",
     *     @SWG\Property(property="request", type="json", example=1)
     *   ),
     *   @SWG\Parameter(
     *     name="order",
     *     in="query",
     *     description="Order (created_at, price_asc, price_desc)",
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="created_at")
     *   ),
     *
     *   @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function getList(Request $request)
    {
        $filters = collect($request->all());

        $realties = $this->service->getList($filters)
            ->when(in_array($request->get('order' ), ['price_asc', 'price_desc']),
                function ($query) use ($request) {
                    return $query->where('currency', $request->get('currency'))
                        ->orderBy('price', $request->get('order') === 'price_asc' ? 'asc' : 'desc');
                },
                function ($query) {
                    return $query->orderBy('created_at');
                }
            )
            ->paginate();

        return response()->json([
            'results' => [
                'data' => $realties->getCollection()->map(function ($realty) {
                    return [
                        'id' => $realty->id,
                        'adv_type' => $realty->adv_type,
                        'latitude' => $realty->latitude,
                        'longitude' => $realty->longitude,
                        'street_type' => $realty->street_type,
                        'street_name' => $realty->street_name,
                        'house_number' => $realty->house_number,
                        'price' => $realty->price,
                        'currency' => $realty->currency,
                        'size_total' => $realty->size_total,
                        'floor' => $realty->floor,
                        'floor_count' => $realty->floor_count,
                        'room_count' => $realty->room_count,
                        'created_at' => $realty->created_at,
                        'advertiser' => [
                            'phone_number' => '0649892141',
                            'first_name' => 'Advertiser',
                            'registered_at' => Carbon::tomorrow()
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
                            'name' => $realty->city->name
                        ]
                    ];
                }),
                'pagination' => [
                    'total' => $realties->total(),
                    'count' => $realties->count(),
                    'page' => $realties->currentPage(),
                    'per_page' => $realties->perPage(),
                    'total_pages' => $realties->lastPage()
                ]
            ]
            ,
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    /**
     * @SWG\Get(
     *   path="/realty/by-id",
     *   summary="Get Realty List",
     *   tags={"realty"},
     *   @SWG\Parameter(
     *     name="id",
     *     in="query",
     *     description="Realty Id",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="1")
     *   ),
     *   @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function getById(Request $request)
    {
        $realty = Realty::query()->with(['city', 'owner'])->find($request->get('id'));

        return response()->json([
            'results' => [
                'id' => $realty->id,
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
                'created_at' => $realty->created_at,
                'feature_ids' => $realty->features->pluck('id'),
                'advertiser' => [
                    'phone_number' => '0649892141',
                    'first_name' => 'Advertiser',
                    'registered_at' => Carbon::tomorrow()
                ],
                'images' => [
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                    '/assets/images/default.png',
                ],
                'city' => [
                    'id' => data_get($realty->city, 'id'),
                    'name' => data_get($realty->city, 'name'),
                ],
                'additional_info' => [
                    'type' => 'Feature',
                    'geometry' => [
                        'type' => 'Point',
                        'coordinates' => [
                            $realty->longitude,
                            $realty->latitude
                        ],
                    ],
                    'properties' => [
                        'count' => 1,
                        'id' => $realty->id,
                        'price' => $realty->price,
                        'currency' => $realty->currency,
                    ]
                ]
            ],
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}