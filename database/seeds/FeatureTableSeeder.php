<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class FeatureTableSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        collect([
            [
                'name' => 'Бытовая техника',
                'slug' => 'household_appliances',
                'features' => [
                    ['name' => 'Холодильник', 'icon' => '/assets/images/features/refrigerator.svg',],
                    ['name' => 'Микроволновая Печь', 'icon' => '/assets/images/features/microwave-oven.svg',],
                    ['name' => 'Плита', 'icon' => '/assets/images/features/stove.svg',],
                    ['name' => 'Кафеварка', 'icon' => '/assets/images/features/coffee-machine.svg',],
                    ['name' => 'Посудомоечная Машина', 'icon' => '/assets/images/features/dishwasher.svg',],
                    ['name' => 'Телевизор', 'icon' => '/assets/images/features/television.svg',],
                    ['name' => 'Стиральная Машина', 'icon' => '/assets/images/features/washer.svg',],
                    ['name' => 'Сушильная Машина', 'icon' => '/assets/images/features/tumble-dryer.svg',],
                    ['name' => 'Печка', 'icon' => '/assets/images/features/oven.svg',],
                    ['name' => 'Пылесос', 'icon' => '/assets/images/features/vacuum.svg',],
                ]
            ],
            [
                'name' => 'Удобства',
                'slug' => 'facilities',
                'features' => [
                    ['name' => 'Душевая кабина', 'icon' => '/assets/images/features/shower.svg',],
                    ['name' => 'Подогрев воды', 'icon' => '/assets/images/features/reuse-water.svg',],
                    ['name' => 'Кондиционер', 'icon' => '/assets/images/features/air-conditioner.svg',],
                    ['name' => 'Wi-Fi', 'icon' => '/assets/images/features/wifi.svg',],
                    ['name' => 'Скоростной интернет', 'icon' => '/assets/images/features/speed-internet.svg',],
                    ['name' => 'Ванная', 'icon' => '/assets/images/features/bath.svg',],
                    ['name' => 'Балкон', 'icon' => '/assets/images/features/balcony.svg',],
                    ['name' => 'Терраса', 'icon' => '/assets/images/features/terrace.svg',],
                    ['name' => 'Паркинг место', 'icon' => '/assets/images/features/parking.svg',],
                    ['name' => 'Панорманое окно', 'icon' => '/assets/images/features/sunset.svg',],
                    ['name' => 'Сигнализация', 'icon' => '/assets/images/features/siren.svg',],
                    ['name' => 'Гардеробная комната', 'icon' => '/assets/images/features/wardrobe.svg',],
                ]
            ],
            [
                'name' => 'Характеристики ЖК',
                'slug' => 'characteristics',
                'features' => [
                    ['name' => 'Класс', 'icon' => '/assets/images/features/characteristics/class.svg'],
                    ['name' => 'Домов в комплексе', 'icon' => '/assets/images/features/characteristics/houses-count.svg'],
                    ['name' => 'Этажность дома', 'icon' => '/assets/images/features/characteristics/floors-count.svg'],
                    ['name' => 'Технология строительства', 'icon' => '/assets/images/features/characteristics/putty-knife.svg'],
                    ['name' => 'Облицовка фасадов', 'icon' => '/assets/images/features/characteristics/facade-cladding.svg'],
                    ['name' => 'Тип стен', 'icon' => '/assets/images/features/characteristics/wall-type.svg'],
                    ['name' => 'Количество квартир', 'icon' => '/assets/images/features/characteristics/apartments-count.svg'],
                    ['name' => 'Водоснабжение', 'icon' => '/assets/images/features/characteristics/water-tap.svg'],
                    ['name' => 'Отопление', 'icon' => '/assets/images/features/characteristics/radiator.svg'],
                    ['name' => 'Наземный паркинг', 'icon' => '/assets/images/features/characteristics/ground-parking.svg'],
                    ['name' => 'Подземный паркинг', 'icon' => '/assets/images/features/characteristics/underground-parking.svg'],
                    ['name' => 'Утепление стен', 'icon' => '/assets/images/features/characteristics/wall-insulation.svg'],
                    ['name' => 'Высота потолков в квартирах', 'icon' => '/assets/images/features/characteristics/ceiling-heigh.svg'],
                ]
            ],
            [
                'name' => 'Инфаструктура',
                'slug' => 'infrastructure',
                'features' => [
                    ['name' => 'Подземный паркинг', 'icon' => '/assets/images/features/infrastructure/underground-parking.svg'],
                    ['name' => 'Наземный паркинг', 'icon' => '/assets/images/features/infrastructure/ground-parking.svg'],
                    ['name' => 'Спортзал', 'icon' => '/assets/images/features/infrastructure/gym.svg'],
                    ['name' => 'Супермаркет', 'icon' => '/assets/images/features/infrastructure/supermarket.svg'],
                    ['name' => 'Школа', 'icon' => '/assets/images/features/infrastructure/school.svg'],
                    ['name' => 'Ресторан', 'icon' => '/assets/images/features/infrastructure/restaurant.svg'],
                    ['name' => 'Торговый центр', 'icon' => '/assets/images/features/infrastructure/shopping-center.svg'],
                    ['name' => 'Ветинарная больница', 'icon' => '/assets/images/features/infrastructure/veterinary.svg'],
                    ['name' => 'Детский садик', 'icon' => '/assets/images/features/infrastructure/kindergarten.svg'],
                    ['name' => 'Медицинский центр ', 'icon' => '/assets/images/features/infrastructure/hospital.svg'],
                    ['name' => 'Рынок', 'icon' => '/assets/images/features/infrastructure/market.svg'],
                    ['name' => 'Кинотеатр', 'icon' => '/assets/images/features/infrastructure/cinema.svg'],
                    ['name' => 'Аптека', 'icon' => '/assets/images/features/infrastructure/pharmacy.svg'],
                    ['name' => 'Парк', 'icon' => '/assets/images/features/infrastructure/park.svg'],
                    ['name' => 'Транспортная развязка', 'icon' => '/assets/images/features/infrastructure/transport-interchange.svg'],
                    ['name' => 'Салон красоты', 'icon' => '/assets/images/features/infrastructure/salon.svg'],
                ]
            ],
        ])->each(function ($i){

            $category = \App\Models\FeatureCategory::create([
                'name' => $i['name'],
                'slug' => $i['slug']
            ]);

            collect($i['features'])->each(function ($i) use ($category){
               \App\Models\Feature::create([
                   'feature_category_id' => $category->id,
                   'name' => $i['name'],
                   'icon' => $i['icon']
               ]);
            });

        });
    }
}