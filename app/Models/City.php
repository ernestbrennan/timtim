<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class City extends Model
{
    use HasTranslations;

    protected $fillable = ['name', 'slug', 'icon', 'is_active', 'bbox'];

    public $translatable = ['name'];
    protected $hidden = ['id', 'uid'];

    protected $casts = ['bbox' => 'json'];


    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}