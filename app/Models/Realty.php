<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Realty extends Model
{
    use HasTranslations;

    protected $fillable = [
        'user_id',
        'city_id',
        'longitude',
        'latitude',
        'street_type',
        'street_name',
        'house_number',
        'type',
        'adv_type',
        'description',
        'price',
        'currency',
        'size_total',
        'size_kitchen',
        'size_living',
        'floor_count',
        'floor',
        'room_count',
        'layout_type',
        'heating_type',
        'bathroom_type',
        'condition_type',
        'wall_type',
        'building_type',
        'furniture_type',
        'communal_payments_type',
        'parking_types',
        'entrance_types',
        'is_owner',
        'allow_animals',
        'allow_kids',
        'allow_foreigners',
        'allow_roommates',
        'allow_smoking',
    ];

    public $translatable = ['description'];
    protected $casts = [
        'longitude' => 'float',
        'latitude' => 'float',
        'parking_types' => 'json',
        'entrance_types' => 'json',
        'is_owner' => 'boolean',
        'allow_animals' => 'boolean',
        'allow_kids' => 'boolean',
        'allow_foreigners' => 'boolean',
        'allow_roommates' => 'boolean',
        'allow_smoking' => 'boolean',
    ];

    public function advertiser()
    {
        return $this->belongsTo(User::class);
    }

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
        return $this->belongsToMany(Feature::class, 'realty_feature');
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function getEntranceTypesAttribute($value)
    {
        return $value ?? [];
    }

    public function getParkingTypesAttribute($value)
    {
        return $value ?? [];
    }
}