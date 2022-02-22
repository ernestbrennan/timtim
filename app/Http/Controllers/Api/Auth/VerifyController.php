<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth as R;
use App\Services\AuthService;
use Illuminate\Http\Response;

class VerifyController extends Controller
{
    private $auth_service;

    public function __construct(AuthService $auth_service)
    {
        $this->auth_service = $auth_service;
    }

    /**
     * @SWG\Post(
     *   path="/auth/verify",
     *   summary="Verify phone",
     *   tags={"auth"},
     * @SWG\Parameter(
     *     name="code",
     *     in="query",
     *     description="Code",
     *     required=true,
     *     type="string",
     *     @SWG\Property(property="request", type="json", example="123456")
     *   ),
     * @SWG\Response(response=200, description="successful operation"),
     * )
     */
    public function verify(R\VerifyRequest $request)
    {
        return response()->json([
            'results' => [
                'token' => $this->auth_service->verify($request)
            ],
            'message' => trans('auth.on_login_success'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

    /**
     * @SWG\Post(
     *   path="/auth/verify/resend-code",
     *   summary="Resend Verify Code",
     *   tags={"auth"},
     * @SWG\Parameter(
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
    public function resendCode(R\LoginRequest $request)
    {
        return response()->json([
            'results' => $this->auth_service->resendCode($request),
            'message' => trans('auth.on_login_success'),
            'status_code' => 200
        ], Response::HTTP_OK);
    }

}
