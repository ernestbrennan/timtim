<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;

class ResetPasswordNewPasswordRequest extends Request
{
    public function rules()
    {
        return [

            'password' => 'required',
            'password_repeat' => 'required|same:password',
            ];
    }
}
