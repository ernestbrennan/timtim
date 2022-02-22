<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'extension', 'hash_name', 'path', 'size', 'url'
    ];

    public function imageable()
    {
        return $this->morphTo();
    }
}