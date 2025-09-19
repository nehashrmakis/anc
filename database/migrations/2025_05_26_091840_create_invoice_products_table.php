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
    Schema::create('invoice_products', function (Blueprint $table) {
        $table->id();
        $table->foreignId('invoice_container_id')->constrained()->onDelete('cascade');
        $table->foreignId('inventory_id')->nullable()->constrained()->onDelete('set null');
        $table->string('marking')->nullable();
        $table->float('size')->nullable();
        $table->float('weight')->nullable();
        $table->integer('total_bundles')->nullable();
        $table->integer('quantity_per_bundle')->nullable();
        $table->integer('total_product')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_products');
    }
};
