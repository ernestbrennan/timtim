<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Rule extends Model
{
    use HasTranslations;

    protected $fillable = [
        'realty_id',
        'allow_animals',
        'allow_kids',
        'allow_foreigners',
        'allow_roommates',
        'allow_smoking',
    ];

    public function realty()
    {
        return $this->belongsTo(Realty::class);
    }
}