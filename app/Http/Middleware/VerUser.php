<?php

namespace App\Http\Middleware;

use Closure;

class VerUser
{

    public function handle($request, Closure $next)
    {
    	$user=Auth::user();

	if (!$user->VerUser()) {
		return redirect ('/');
	}else{
		return "aestudiante";
	}
        return $next($request);
    }
}
