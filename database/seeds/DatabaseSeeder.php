<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//        Model::unguard();

        $this->call([
            CityTableSeeder::class,
            FeatureTableSeeder::class,
            RealtyTableSeeder::class,
            ComplexTableSeeder::class,
        ]);

        \App\Models\User::create([
            'first_name' => 'Test',
            'last_name' => 'Test',
            'phone' => '+9980000000',
            'password' => \Hash::make('secret'),
            'registered_at' => now()

        ]);

//        Model::reguard();

    }
}
