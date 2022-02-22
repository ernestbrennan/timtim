<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NumericArray implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        foreach ($value as $i){
            if (!is_numeric(trim($i))){
                return false;
            }
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return 'Every element in :attribute must be a numeric';
    }
}
