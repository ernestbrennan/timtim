<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;


$factory->define(\App\Models\Flat::class, function (Faker $faker) {
    return [
        'email' => $faker->email,
        'password' => 'secret',

        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
    ];
});

