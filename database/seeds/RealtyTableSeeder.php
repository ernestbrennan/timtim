<?php

use App\Models\FeatureCategory;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class RealtyTableSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        $options = config('realty.options');
        $feature_ids = \App\Models\Feature::query()->whereHas('category', function ($query) {
            return $query->where('slug', FeatureCategory::SLUG_HOUSEHOLD_APPLIANCES)
                ->orWhere('slug', FeatureCategory::SLUG_FACILITIES);
        })
            ->pluck('id')
            ->toArray();

        \App\Models\City::get()->map(function ($city) use ($faker, $options, $feature_ids) {
            $lat_min = $city->bbox[0];
            $lon_max = $city->bbox[1];
            $lat_max = $city->bbox[2];
            $lon_min = $city->bbox[3];

            for ($i = 0; $i < 1000; $i++) {
                $coordinates = $this->randomNearByCoord(['lat' => ($lat_min + $lat_max) / 2, 'lon' => ($lon_min + $lon_max) / 2], 5, 12);
                $adv_type = $faker->randomElement(['rent', 'sale']);
                $size_total = $faker->numberBetween(100, 300);

                $realty = \App\Models\Realty::create([
                    'city_id' => $city->id,
                    'user_id' => 1,
                    'type' =>  $faker->randomElement($options['types'])['value'],
                    'adv_type' => $adv_type,
                    'price' => $adv_type === 'rent' ? $faker->numberBetween(1000, 100000) : $faker->numberBetween(50000, 1000000),
                    'currency' => $faker->randomElement(['usd', 'sum']),
                    'description' => $faker->text(2000),
                    'size_total' => $size_total,
                    'size_kitchen' => (int)(20 / 100) * $size_total,
                    'size_living' => (int)(80 / 100) * $size_total,
                    'floor' => $faker->numberBetween(1, 10),
                    'floor_count' => $faker->numberBetween(10, 25),
                    'room_count' => $faker->numberBetween(1, 10),
                    'latitude' => $coordinates['lat'],
                    'longitude' => $coordinates['lon'],
                    'street_type' => $faker->randomElement($options['street_types'])['value'],
                    'street_name' => $faker->streetName,
                    'house_number' => $faker->numberBetween(1, 10),

                    'communal_payments_type' => $faker->randomElement($options['communal_payments_types'])['value'],
                    'layout_type' => $faker->randomElement($options['layout_types'])['value'],
                    'bathroom_type' => $faker->randomElement($options['bathroom_types'])['value'],
                    'condition_type' => $faker->randomElement($options['condition_types'])['value'],
                    'furniture_type' => $faker->randomElement($options['furniture_types'])['value'],
                    'heating_type' => $faker->randomElement($options['heating_types'])['value'],
                    'wall_type' => $faker->randomElement($options['wall_types'])['value'],
                    'building_type' => $faker->randomElement($options['building_types'])['value'],
                    'parking_types' => [$faker->randomElement($options['parking_types'])['value']],
                    'entrance_types' => [$faker->randomElement($options['entrance_types'])['value']],

                    'is_owner' => $faker->boolean,
                    'allow_animals' => $faker->boolean,
                    'allow_kids' => $faker->boolean,
                    'allow_foreigners' => $faker->boolean,
                    'allow_roommates' => $faker->boolean,
                    'allow_smoking' => $faker->boolean,
                ]);

                $realty->features()->sync($faker->randomElements($feature_ids, $faker->numberBetween(1, 20)));
            }
        });
    }

    function randomNearByCoord(array $coord, int $radiusKm, int $precision = 4): array
    {
        $radiusRad = $radiusKm / 111.3;
        $y0 = $coord['lat'];
        $x0 = $coord['lon'];
        $u = \lcg_value();
        $v = \lcg_value();
        $w = $radiusRad * \sqrt($u);
        $t = 2 * M_PI * $v;
        $x = $w * \cos($t);
        $y1 = $w * \sin($t);
        $x1 = $x / \cos(\deg2rad($y0));
        $newY = \round($y0 + $y1, $precision);
        $newX = \round($x0 + $x1, $precision);

        return ['lat' => $newY, 'lon' => $newX];
    }
}
