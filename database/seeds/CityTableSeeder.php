<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class CityTableSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        collect([
            [
                'name' => 'Ташкент',
                'slug' => 'tashkent',
                'icon' => '/assets/images/cities/tashkent.png',
                'bbox' => [41.225881186502775, 69.43461147982666, 41.341976464762375, 69.12871090609619]
            ],
            [
                'name' => 'Самарканд',
                'slug' => 'samarkand',
                'icon' => '/assets/images/cities/samarkand.png',
                'bbox' => [39.57771922702983, 66.85270525924847, 39.716217291261955, 67.0803501900051]
            ],
            [
                'name' => 'Бухара',
                'slug' => 'bukhara',
                'icon' => '/assets/images/cities/bukhara.png',
                'bbox' => [39.73185279443837, 64.48675078298282, 39.80856763251353, 64.36043161123158]
            ],
            [
                'name' => 'Шахрисабз',
                'slug' => 'shakhrisabz',
                'icon' => '/assets/images/cities/shakhrisabz.png',
                'bbox' => [39.02970915772582, 66.86920547120943, 39.07282534683736, 66.79893835378246]
            ],
            [
                'name' => 'Хива',
                'slug' => 'khiva',
                'icon' => '/assets/images/cities/khiva.png',
                'bbox' => [41.3580234718755, 60.40495867864499, 41.40342527632674, 60.328378183028036]
            ],
            [
                'name' => 'Муйнак',
                'slug' => 'muynak',
                'icon' => '/assets/images/cities/muynak.png',
                'bbox' => [43.74301399929672, 59.06866448427485, 43.788529112675576, 58.98889928889875]
            ],
        ])->each(function ($city) {
            \App\Models\City::create($city);
        });
    }
}
