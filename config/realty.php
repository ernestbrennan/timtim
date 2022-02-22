<?php

return [
    'options' => [
        'adv_types' => [
            ['value' => 'rent', 'label' => 'Аренда'],
            ['value' => 'sale', 'label' => 'Продажа'],
        ],
        'types' => [
            ['value' => 'private_house', 'label' => 'Частный дом', 'icon' => '/assets/images/realty-options/type-private-house.svg'],
            ['value' => 'flat', 'label' => 'Квартира', 'icon' => '/assets/images/realty-options/type-flat.svg'],
            ['value' => 'office', 'label' => 'Офис', 'icon' => '/assets/images/realty-options/type-office.svg'],
            ['value' => 'country_house', 'label' => 'Дача', 'icon' => '/assets/images/realty-options/type-country-house.svg'],
        ],
        'street_types' => [
            ['value' => 'st', 'label' => 'Улица'],
            ['value' => 'lane', 'label' => 'Переулок'],
            ['value' => 'ave', 'label' => 'Проспект'],
            ['value' => 'ally', 'label' => 'Аллея'],
            ['value' => 'bvd', 'label' => 'Бульвар'],
            ['value' => 'sq', 'label' => 'Площадь'],
        ],
        'room_counts' => [
            ['value' => 1, 'icon' => '/assets/images/realty-options/rooms-one.svg', 'label' => 'Одна комната', 'short_label' => '1'],
            ['value' => 2, 'icon' => '/assets/images/realty-options/rooms-two.svg', 'label' => 'Две комнаты', 'short_label' => '2'],
            ['value' => 3, 'icon' => '/assets/images/realty-options/rooms-three.svg', 'label' => 'Три комнаты', 'short_label' => '3'],
            ['value' => 4, 'icon' => '/assets/images/realty-options/rooms-four.svg', 'label' => 'Четыре комнаты', 'short_label' => '4']
        ],
        'layout_types' => [
            ['value' => 'adjacent', 'label' => 'Примыкающий', 'icon' => '/assets/images/realty-options/layout-adjacent.svg'],
            ['value' => 'multilevel', 'label' => 'Многоуровневый', 'icon' => '/assets/images/realty-options/layout-multi-level.svg'],
            ['value' => 'separated', 'label' => 'Раздельный', 'icon' => '/assets/images/realty-options/layout-separate.svg'],
            ['value' => 'studio', 'label' => 'Студия', 'icon' => '/assets/images/realty-options/layout-studio.svg'],
            ['value' => 'other', 'label' => 'Другое', 'icon' => '/assets/images/realty-options/layout-other.svg'],
        ],
        'bathroom_types' => [
            ['value' => 'combined', 'label' => 'Комбинированный', 'icon' => '/assets/images/realty-options/bathroom-combined.svg'],
            ['value' => 'adjacent', 'label' => 'Примыкающий', 'icon' => '/assets/images/realty-options/bathroom-adjacent.svg'],
            ['value' => 'multi', 'label' => 'Два или больше', 'icon' => '/assets/images/realty-options/bathroom-multi.svg'],
        ],
        'condition_types' => [
            ['value' => 'designer', 'label' => 'Дизайнерский ремонт'],
            ['value' => 'recent', 'label' => 'Свежий ремонт'],
            ['value' => 'requires', 'label' => 'Нуждается в ремонт'],
            ['value' => 'grandma', 'label' => 'Бабушкин ремонт'],
            ['value' => 'cosmetic', 'label' => 'Косметический ремонт'],
        ],
        'furniture_types' => [
            ['value' => 'old', 'label' => 'Старая мебель'],
            ['value' => 'new', 'label' => 'Новая мебель'],
            ['value' => 'without', 'label' => 'Без мебели'],
        ],
        'heating_types' => [
            ['value' => 'centralized', 'label' => 'Центральное'],
            ['value' => 'individual', 'label' => 'Индивидуальное'],
        ],
        'entrance_types' => [
            ['value' => 'intercom', 'label' => 'Внутренний'],
            ['value' => 'concierge', 'label' => 'Консьерж'],
            ['value' => 'code', 'label' => 'Код'],
            ['value' => 'key', 'label' => 'Ключ'],
            ['value' => 'opened', 'label' => 'Открытый'],
        ],
        'wall_types' => [
            ['value' => 'brick', 'label' => 'Кирпич'],
            ['value' => 'panel', 'label' => 'Панель'],
            ['value' => 'monolithic', 'label' => 'Монолитный'],
            ['value' => 'cinder', 'label' => 'Шлакоблок'],
            ['value' => 'other', 'label' => 'Другое'],
        ],
        'building_types' => [
            ['value' => 'carskij', 'label' => 'Царский Дом'],
            ['value' => 'stalinka', 'label' => 'Сталинка'],
            ['value' => 'hrushhevka', 'label' => 'Хрущёвка'],
            ['value' => 'gostinka', 'label' => 'Общежитие'],
            ['value' => 'cheshka', 'label' => 'Чешский'],
            ['value' => '80s', 'label' => 'Строительство 80-90-х'],
            ['value' => '90s', 'label' => 'Строительство 91-200х'],
            ['value' => '00s', 'label' => 'Строительство 2001-2010х'],
            ['value' => '10s', 'label' => 'Постройки с 2011'],
        ],
        'parking_types' => [
            ['value' => 'underground', 'label' => 'Подземный паркинг'],
            ['value' => 'secure', 'label' => 'Охраняемая парковка'],
            ['value' => 'own', 'label' => 'Собственное парковочное место'],
            ['value' => 'public', 'label' => 'Общая парковка'],
            ['value' => 'noparking', 'label' => 'Нет парковки'],
        ],
        'communal_payments_types' => [
            ['value' => 'by_meters', 'label' => 'По счетчикам'],
            ['value' => 'included', 'label' => 'Включены'],
        ],
    ]
];