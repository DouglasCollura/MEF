<?php

use Illuminate\Support\Facades\Route;

Route::view('/','chartDos');
Route::view('/a','chartUno');
Route::view('/PresupuestoPublico','PresupuestoPublico');


// ########## DIFICIL ###################

Route::get('/GetAnios','DificilController@GetAnios');

Route::post('/CargarSector','DificilController@CargarSector');
Route::post('/CargarPliego','DificilController@CargarPliego');
Route::post('/CargarEjecutora','DificilController@CargarEjecutora');

Route::post('/CargarDepartamento','DificilController@CargarDepartamento');
Route::post('/CargarProvincia','DificilController@CargarProvincia');
Route::post('/CargarMunicipalidad','DificilController@CargarMunicipalidad');

Route::post('/CargarDepartamentoEjecutora','DificilController@CargarDepartamentoEjecutora');


Route::post('/CargarBarraGastos','DificilController@CargarBarraGastos');

Route::post('/CargarEstadisticas','DificilController@CargarEstadisticas');

Route::post('/CargarBarra','DificilController@CargarBarra');

Route::post('/CargarBarraAcumulado','DificilController@CargarBarraAcumulado');


Route::get('/GetPresupuesto','DificilController@GetPresupuesto');

Auth::routes();


