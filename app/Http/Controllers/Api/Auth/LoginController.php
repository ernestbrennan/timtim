<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth as R;
use App\Services\AuthService;
use Illuminate\Http\Response;
use Swagger\Annotations as SWG;
use Auth;

class LoginController extends Controller
{
    private $auth_service;

    public function __construct(AuthService $auth_service)
    {
        $this->auth_service = $auth_service;
    }

    /**
     * @SWG\Post(
     *   path="/auth/login",
     *   summary="Login",
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
     *     name="password",
     *     in="query",
     *     description="User password",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="secret")
     *   ),
     * @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function login(R\LoginRequest $request)
    {
        if (!$token = $this->auth_service->checkCredentials($request)) {

            return response()->json([
                'message' => [
                    'password' => ['Wrong password']
                ],
                'status_code' => 422
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        if (!Auth::user()->is_verified) {

            return response()->json([
                'results' => $this->auth_service->resendCode($request),
                'status_code' => 403
            ], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'results' => [
                'token' => $token
            ],
            'message' => trans('auth.on_login_success'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    /**
     * @SWG\Post(
     *   path="/auth/logout",
     *   summary="Logout",
     *   tags={"auth"},
     *   security={
     *      {"auth": {}}
     *   },
     *   @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function logout()
    {
        $this->auth_service->logout();

        return response()->json([
            'message' => trans('auth.on_logout_success'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    /**
     * @SWG\Get(
     *   path="/auth/user",
     *   summary="Get user",
     *   tags={"auth"},
     *   security={
     *      {"auth": {}}
     *   },
     *   @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function user()
    {
        return response()->json([
            'results' => Auth::user()->only('first_name', 'last_name', 'phone'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}
