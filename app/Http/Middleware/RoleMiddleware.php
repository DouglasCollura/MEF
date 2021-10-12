<?php

namespace App\Http\Middleware;

use Closure;

class RoleMiddleware
{

    public function handle($request, Closure $next)
    {
       // return $next($request);
        return redirect('/');
    }
}
 