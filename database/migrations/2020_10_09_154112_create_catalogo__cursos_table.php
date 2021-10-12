<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCatalogoCursosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('catalogo__cursos', function (Blueprint $table) {
            $table->id();
            $table->integer('precio');
            $table->integer('limite');
            $table->date('fecha_i');
            $table->date('fecha_f');
            $table->integer('estatus');
            $table->integer('participantes');
            $table->unsignedBigInteger('curso_id');
            $table->foreign('curso_id')->references('id')->on('cursos');
        });
    }

    public function down()
    {
        Schema::dropIfExists('catalogo__cursos');
    }
}
