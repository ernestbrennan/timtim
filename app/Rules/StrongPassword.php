<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class StrongPassword implements Rule
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
        dd($value);
        $util = \libphonenumber\PhoneNumberUtil::getInstance();

        try {
            $swissNumberProto = $util->parse($swissNumberStr);
            var_dump($swissNumberProto);
        } catch (\libphonenumber\NumberParseException $e) {
            return false;
        }

        return $util->isValidNumber($swissNumberProto);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be 8–15 characters, and include a number, a symbol, a lower and a upper case letter';
    }
}
