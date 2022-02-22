<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;

class ResetPasswordRequest extends Request
{
    public function rules()
    {
        return [
            'phone' => 'required|exists:users,phone',
        ];
    }
}
