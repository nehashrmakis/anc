<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->string('size')->nullable();
            $table->string('size_unit')->nullable();
            $table->string('weight')->nullable();
            $table->string('weight_unit')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->dropColumn(['size', 'size_unit', 'weight', 'weight_unit']);
        });
    }
    
};
