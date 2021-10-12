<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->string('metodo');
            $table->string('banco');
            $table->string('tipo_pago');
            $table->string('referencia');
            $table->date('fecha');
            $table->string('pago_desde');
            $table->integer('estatus');
            $table->unsignedBigInteger('cat_curso_id');
            $table->unsignedBigInteger('usuario_id');
            $table->foreign('cat_curso_id')->references('id')->on('catalogo__cursos');
            $table->foreign('usuario_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pagos');
    }
}
