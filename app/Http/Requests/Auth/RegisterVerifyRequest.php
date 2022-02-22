<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;
use App\Rules\PhoneNumber;

class RegisterVerifyRequest extends Request
{
    public function rules()
    {
        return [
            'code' => 'required|min:6|exists:users,verify_code',
        ];
    }

    public function messages()
    {
        return [];
    }
}
