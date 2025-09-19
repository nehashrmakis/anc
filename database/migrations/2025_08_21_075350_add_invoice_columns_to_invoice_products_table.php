<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoice_products', function (Blueprint $table) {
            if (!Schema::hasColumn('invoice_products', 'invoice_id')) {
                $table->unsignedBigInteger('invoice_id')->nullable()->after('total_product');
            }
            if (!Schema::hasColumn('invoice_products', 'invoice_container_id')) {
                $table->unsignedBigInteger('invoice_container_id')->nullable()->after('invoice_id');
            }

            // If you want foreign keys (optional, only if `invoices` & `invoice_containers` tables exist):
            // $table->foreign('invoice_id')->references('id')->on('invoices')->onDelete('cascade');
            // $table->foreign('invoice_container_id')->references('id')->on('invoice_containers')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('invoice_products', function (Blueprint $table) {
            if (Schema::hasColumn('invoice_products', 'invoice_id')) {
                $table->dropColumn('invoice_id');
            }
            if (Schema::hasColumn('invoice_products', 'invoice_container_id')) {
                $table->dropColumn('invoice_container_id');
            }
        });
    }
};
