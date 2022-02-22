<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Feature extends Model
{
    use HasTranslations;

    protected $fillable = [
        'name', 'feature_category_id', 'icon'
    ];

    public $translatable = ['name'];

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function category()
    {
        return $this->belongsTo(FeatureCategory::class, 'feature_category_id');
    }
}