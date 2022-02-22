<?php

use App\Modules\Contact\ContactType;

return [
  'type' => [
      ContactType::TYPE_PONE_NUMBER => 'Phone number',
      ContactType::TYPE_EMAIL => 'Email',
      ContactType::TYPE_SKYPE => 'Skype',
      ContactType::TYPE_FACEBOOK => 'Facebook',
  ]
];
