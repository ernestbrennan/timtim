<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class ComplexFeature extends Model
{
    use HasTranslations;

    protected $fillable = ['complex_id', 'feature_id', 'value'];

    public function complex()
    {
        return $this->belongsTo(Complex::class);
    }
    public function feature()
    {
        return $this->belongsTo(Feature::class);
    }
}