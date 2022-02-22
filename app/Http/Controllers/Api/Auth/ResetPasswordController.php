<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth as R;
use App\Services\AuthService;
use Illuminate\Http\Response;
use Swagger\Annotations as SWG;
use Auth, Hash;

class ResetPasswordController extends Controller
{
    private $auth_service;

    public function __construct(AuthService $auth_service)
    {
        $this->auth_service = $auth_service;
    }

    /**
     * @SWG\Post(
     *   path="/auth/reset-password",
     *   summary="Enter Phone Number",
     *   tags={"auth"},
     *   @SWG\Parameter(
     *     name="phone",
     *     in="query",
     *     description="User phone",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="+380999999999")
     *   ),
     * @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function index(R\ResetPasswordRequest $request)
    {
        return response()->json([
            'results' => $this->auth_service->resendCode($request),
            'message' => trans('auth.on_login_success'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    /**
     * @SWG\Post(
     *   path="/auth/reset-password/new-password",
     *   summary="Enter New Password",
     *   tags={"auth"},
     *   @SWG\Parameter(
     *     name="password",
     *     in="query",
     *     description="User password",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="secret")
     *   ),
     *   @SWG\Parameter(
     *     name="password_repeat",
     *     in="query",
     *     description="User password repeat",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="secret")
     *   ),
     *   @SWG\Parameter(
     *     name="token",
     *     in="query",
     *     description="Auth token",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json")
     *   ),
     * @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function newPassword(R\ResetPasswordNewPasswordRequest $request)
    {
        Auth::user()->update([
            'password' => Hash::make($request->get('password'))
        ]);

        return response()->json([
            'message' => trans('auth.on_login_success'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }
}
