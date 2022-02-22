<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Validator as FacadeValidator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class Request extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [];
    }

    public function all($keys = null)
    {
        return array_replace_recursive(
            parent::all(),
            $this->route()->parameters()
        );
    }

    public function validator()
    {
        $v = FacadeValidator::make($this->all(), $this->rules(), $this->messages(), $this->attributes());

        if (!$v->fails() && method_exists($this, 'moreValidation')) {
            $this->moreValidation($v);
        }

        return $v;
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status_code' => 422,
            'message' => $validator->getMessageBag()->toArray()
        ], 422));
    }
}

