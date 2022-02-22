<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;
use App\Rules\PhoneNumber;
use Illuminate\Validation\Rule;

class RegisterRequest extends Request
{
    public function rules()
    {
        return [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'password' => 'required',
            'password_repeat' => 'required|same:password',
            'phone' => [
                'required',
                Rule::unique('users', 'phone')->where(function ($query) {
                    return $query->where('registered_at', '!=', null);
                }),
                new PhoneNumber()
            ],
        ];
    }

    public function messages()
    {
        return [];
    }
}
