<?php

namespace App\Guards;

use App\Models\User;
use Firebase\Auth\Token\Verifier;

class Firebase
{
    protected $verifier;

    public function __construct(Verifier $verifier)
    {
        $this->verifier = $verifier;
    }

    public function user($request)
    {
        $token = $request->header('Authorization', '');

        try {
            $token = $this->verifier->verifyIdToken($token);

            return User::findOrCreate($token->getClaim('sub'), [
                'uid' => $token->getClaim('sub'),
                'name' => $token->hasClaim('name') ? $token->getClaim('name') : '',
                'email' => $token->hasClaim('email') ? $token->getClaim('email') : '',
                'phone_number' => $token->hasClaim('phone_number') ? $token->getClaim('phone_number') : '',
            ]);
        }
        catch (\Exception $e) {
            return;
        }
    }
}