<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rules', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('realty_id');
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
        Schema::dropIfExists('rules');
    }
}
