<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinalInventoriesTable extends Migration
{
    public function up()
    {
        Schema::create('final_inventories', function (Blueprint $table) {
            $table->id();

            // Foreign keys (linked to existing records)
            $table->unsignedBigInteger('invoice_id');
            $table->unsignedBigInteger('invoice_container_id');
            $table->unsignedBigInteger('invoice_product_id');
            $table->unsignedBigInteger('inventory_id');

            // Optional snapshot fields (in case you want to freeze values at time of finalization)
            $table->integer('total_product')->nullable();
            $table->string('marking')->nullable();

            $table->timestamp('finalized_at')->nullable();

            $table->timestamps();

            // Foreign key constraints (optional but recommended for safety)
            $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
            $table->foreign('invoice_container_id')->references('id')->on('invoice_containers')->onDelete('cascade');
            $table->foreign('invoice_product_id')->references('id')->on('invoice_products')->onDelete('cascade');
            $table->foreign('inventory_id')->references('id')->on('inventories')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('final_inventories');
    }
}
