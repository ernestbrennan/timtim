<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class FeatureCategory extends Model
{
    use HasTranslations;

    const SLUG_HOUSEHOLD_APPLIANCES = 'household_appliances';
    const SLUG_FACILITIES = 'facilities';
    const SLUG_CHARACTERISTICS = 'characteristics';
    const SLUG_INFRASTRUCTURE = 'infrastructure';

    protected $fillable = [
        'name', 'slug'
    ];

    public $translatable = ['name'];

}