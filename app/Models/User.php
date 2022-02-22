<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $username = 'phone';

    protected $fillable = ['first_name', 'last_name', 'phone', 'password', 'verify_code', 'registered_at'];

    protected $hidden = ['id'];
    protected $casts = [
        'registered_at' => 'datetime',
    ];

    public static function findOrCreate($uid, $data)
    {
        if ($user = self::where('uid', $uid)->first()) {
            return $user;
        }

        return User::query()->create($data);
    }

    public function getIsVerifiedAttribute()
    {
        return !is_null($this->registered_at);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}