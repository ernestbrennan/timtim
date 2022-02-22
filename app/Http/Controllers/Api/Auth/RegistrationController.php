<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth as R;
use App\Services\AuthService;
use Illuminate\Http\Response;
use Auth;

class RegistrationController extends Controller
{
    private $auth_service;

    public function __construct(AuthService $auth_service)
    {
        $this->auth_service = $auth_service;
    }

    /**
     * @SWG\Post(
     *   path="/auth/register",
     *   summary="Register",
     *   tags={"auth"},
     * @SWG\Parameter(
     *     name="phone",
     *     in="query",
     *     description="User phone",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="+380999999999")
     *   ),
     * @SWG\Parameter(
     *     name="first_name",
     *     in="query",
     *     description="User first name",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="John")
     *   ),
     * @SWG\Parameter(
     *     name="last_name",
     *     in="query",
     *     description="User last name",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="Dou")
     *   ),
     * @SWG\Parameter(
     *     name="password",
     *     in="query",
     *     description="User password",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="secret")
     *   ),
     * @SWG\Parameter(
     *     name="password_repeat",
     *     in="query",
     *     description="User password repeat",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="secret")
     *   ),
     * @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function register(R\RegisterRequest $request)
    {
        $user = $this->auth_service->register($request);

        return response()->json([
            'results' => $user->verify_code,
            'message' => trans('auth.on_register_success'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}
