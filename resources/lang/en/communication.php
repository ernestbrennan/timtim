<?php
use  \App\Modules\Communication\CommunicationDriver;

return [
    'driver' => [
        CommunicationDriver::DRIVER_SMS => 'SMS',
        CommunicationDriver::DRIVER_CALL => 'Call',
        CommunicationDriver::DRIVER_EMAIL => 'Email',
        CommunicationDriver::DRIVER_PUSH => 'Push notification',

        CommunicationDriver::DRIVER_ORDI_CALL => 'Ordi Call',
        CommunicationDriver::DRIVER_PHONET => 'Phonet',
        CommunicationDriver::DRIVER_SIPRUM => 'Siprum',
        CommunicationDriver::DRIVER_COMM_PEAK => 'Comm Peak',
        CommunicationDriver::DRIVER_GLOBAL_SLIM => 'Global Slim',
        CommunicationDriver::DRIVER_VOICE_SPIN => 'Voice Spin',
        CommunicationDriver::DRIVER_VOISO => 'Voiso',
        CommunicationDriver::DRIVER_BINOTEL => 'Binotel',
    ],
];
