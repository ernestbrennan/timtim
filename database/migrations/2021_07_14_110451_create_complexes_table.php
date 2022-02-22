<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComplexesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('complexes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('city_id')->nullable();

            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->float('min_full_price')->nullable();
            $table->float('min_per_square_meter_price')->nullable();
            $table->string('currency')->nullable();
            $table->integer('nearest_release_quarter')->nullable();
            $table->string('nearest_release_year')->nullable();

            $table->float('longitude')->nullable();
            $table->float('latitude')->nullable();
            $table->string('street_name')->nullable();
            $table->string('street_type')->nullable();
            $table->string('house_number')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('complexes');
    }
}
