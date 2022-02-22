<?php
return [

    'drivers' => [

        'interkassa' => [
            'setting' => [
                'url' => 'https://sci.interkassa.com',
            ],
            'default' => [
                'name' => 'Interkassa',
                'is_active' => true
            ],
            'config' => [
                'id' => '',
                'key' => ''
            ]
        ],
        'upay' => [
            'setting' => [
                'mode' => 'sandbox',
                'url_sandbox' => 'https://sandboxapi.upaycard.com/api/merchant',
                'url_live' => 'https://api.upaycard.com/api/merchant',
                'url_redirect' => '',
            ],
            'default' => [
                'name' => 'UPay',
                'is_active' => true
            ],
            'config' => [
                'id' => '',
                'key' => '',
                'receiver' => ''
            ]
        ],
        'black42pay' => [
            'setting' => [
                'url' => 'https://wallet.black42pay.com/process_card5644.htm',
            ],
            'default' => [
                'name' => 'Black 42 Pay',
                'is_active' => true
            ],
            'config' => [
                'member' => '',
                'key' => ''
            ]
        ]
    ],

    'map' => [
        'interkassa' => App\Payment\Drivers\Interkassa\Interkassa::class,
        'upay' => App\Payment\Drivers\Upay\Upay::class,
        'black42pay' => App\Payment\Drivers\Black42Pay\Black42Pay::class,
    ]
];
