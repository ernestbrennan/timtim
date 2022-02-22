<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;

class VerifyRequest extends Request
{
    public function rules()
    {
        return [
            'code' =>  'required|exists:users,verify_code',
        ];
    }

}
