<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PhoneNumber implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return true;
        $util = \libphonenumber\PhoneNumberUtil::getInstance();

        try {
            $number = $util->parse($value);
            dd($number);
        } catch (\libphonenumber\NumberParseException $e) {
            dd($e);
            return false;
        }

        return $util->isValidNumber($number);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Phone numbere invalid';
    }
}
