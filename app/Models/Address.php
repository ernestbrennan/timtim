<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Address extends Model
{
    protected $fillable = ['name', 'longitude', 'latitude'];

    protected $hidden = ['id'];

}