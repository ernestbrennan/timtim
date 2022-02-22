<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Complex extends Model
{
    use HasTranslations;

    protected $fillable = [
        'city_id',
        'name',
        'description',
        'longitude',
        'latitude',
        'street_type',
        'street_name',
        'house_number',
        'description',
        'min_per_square_meter_price',
        'min_full_price',
        'currency',
        'nearest_release_quarter',
        'nearest_release_year',
    ];

    public $translatable = ['description'];

    protected $casts = [
        'longitude' => 'float',
        'latitude' => 'float',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function features()
    {
        return $this->hasMany(ComplexFeature::class);
    }
}