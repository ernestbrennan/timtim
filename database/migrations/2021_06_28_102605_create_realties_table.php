<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRealtiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('realties', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->nullable();
            $table->integer('city_id')->nullable();

            $table->float('longitude')->nullable();
            $table->float('latitude')->nullable();
            $table->string('street_name')->nullable();
            $table->string('street_type')->nullable();
            $table->string('house_number')->nullable();

            $table->string('type')->nullable();
            $table->string('adv_type')->nullable();
            $table->text('description')->nullable();
            $table->float('price', 2)->nullable();
            $table->string('currency')->nullable();

            $table->integer('size_total')->nullable();
            $table->integer('size_kitchen')->nullable();
            $table->integer('size_living')->nullable();

            $table->integer('floor')->nullable();
            $table->integer('floor_count')->nullable();

            $table->integer('room_count')->nullable();

            $table->string('layout_type')->nullable();
            $table->string('heating_type')->nullable();
            $table->string('bathroom_type')->nullable();
            $table->string('condition_type')->nullable();
            $table->string('wall_type')->nullable();
            $table->string('building_type')->nullable();
            $table->string('furniture_type')->nullable();
            $table->string('communal_payments_type')->nullable();

            $table->json('parking_types')->nullable();
            $table->json('entrance_types')->nullable();

            $table->boolean('is_owner')->default(true);
            $table->boolean('allow_animals')->default(true);
            $table->boolean('allow_kids')->default(true);
            $table->boolean('allow_foreigners')->default(true);
            $table->boolean('allow_roommates')->default(true);
            $table->boolean('allow_smoking')->default(true);

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
        Schema::dropIfExists('realties');
    }
}
