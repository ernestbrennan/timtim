<?php

namespace App\Providers;

use Firebase\Auth\Token\Verifier;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
    }

    public function register()
    {
        $this->app->singleton(Verifier::class, function ($app) {
            return new Verifier(env('FIREBASE_PROJECT_ID'));
        });
    }
}
