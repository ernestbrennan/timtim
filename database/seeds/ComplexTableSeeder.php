<?php

use App\Models\FeatureCategory;
use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class ComplexTableSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        $options = config('complex.options');

        $characteristics_ids = \App\Models\Feature::query()->whereHas('category', function ($query) {
            return $query->where('slug', FeatureCategory::SLUG_CHARACTERISTICS);
        })
            ->pluck('id');

        $infrastructure_ids = \App\Models\Feature::query()->whereHas('category', function ($query) {
            return $query->where('slug', FeatureCategory::SLUG_INFRASTRUCTURE);
        })
            ->pluck('id');

        \App\Models\City::get()->map(function ($city) use ($faker, $options, $infrastructure_ids, $characteristics_ids) {
            $lat_min = $city->bbox[0];
            $lon_max = $city->bbox[1];
            $lat_max = $city->bbox[2];
            $lon_min = $city->bbox[3];
            
            for ($i = 0; $i < 1000; $i++) {
                $coordinates = $this->randomNearByCoord(['lat' => ($lat_min + $lat_max) / 2, 'lon' => ($lon_min + $lon_max) / 2], 5, 12);

                $complex = \App\Models\Complex::create([
                    'city_id' => $city->id,
                    'name' => $faker->name,
                    'description' => $faker->text(2000),
                    'min_per_square_meter_price' => $faker->numberBetween(10000, 30000),
                    'min_full_price' => $faker->numberBetween(500000, 10000000),
                    'currency' => $faker->randomElement(['usd', 'sum']),
                    'latitude' => $coordinates['lat'],
                    'longitude' => $coordinates['lon'],
                    'street_type' => $faker->randomElement($options['street_types'])['value'],
                    'street_name' => $faker->streetName,
                    'house_number' => $faker->numberBetween(1, 10),

                    'nearest_release_quarter' => $faker->numberBetween(1, 4),
                    'nearest_release_year' => $faker->numberBetween(2020, 2030)
                ]);

                $characteristics = $characteristics_ids->map(function ($i) use ($faker){
                    return ['feature_id' => $i, 'value' => $faker->name];
                });
                $infrastructure = $infrastructure_ids->map(function ($i) use ($faker){
                    return ['feature_id' => $i, 'value' => $faker->numberBetween(1, 15) . ' шагов'];
                });

                $complex->features()->createMany(array_merge($infrastructure->toArray(), $characteristics->toArray()));
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
