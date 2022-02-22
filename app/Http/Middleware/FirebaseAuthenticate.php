<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FirebaseAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        dd($request);

        return $next($request);
    }
}
