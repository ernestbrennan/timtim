<?php

namespace App\Services;

use App\Http\Requests\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    private $guard;

    public function __construct()
    {
        $this->guard = Auth::guard();
    }

    public function checkCredentials(Request $request)
    {
        return $this->guard->attempt($request->only('phone', 'password'));
    }

    public function getUser()
    {
        return $this->guard->user();
    }

    public function logout(): void
    {
        auth()->logout();
    }

    public function register(Request $request)
    {
        $user = User::updateOrCreate(['phone' => $request->get('phone')], [
            'first_name' => $request->get('first_name'),
            'last_name' => $request->get('last_name'),
            'password' => Hash::make($request->get('password')),
            'verify_code' => rand(100000, 999999),
        ]);

        return $user;
    }

    public function verify(Request $request)
    {
        $user = User::query()->where('verify_code', $request->get('code'))->first();
        $user->update([
            'verify_code' => null,
            'registered_at' => now()
        ]);

        return $this->guard->login($user);
    }

    public function resendCode(Request $request)
    {
        $user = User::query()->where('phone', $request->get('phone'))->first();
        $user->update([
            'verify_code' => rand(100000, 999999)
        ]);

        return $user->verify_code;
    }
}
