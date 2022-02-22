<?php

namespace App\Http\Controllers;

class SpaController extends Controller
{
    public function spa(){
        return view('spa');
    }

    public function __invoke()
    {
        return $this->spa();
    }
}
