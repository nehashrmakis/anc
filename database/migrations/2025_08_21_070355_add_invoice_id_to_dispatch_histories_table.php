<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('dispatch_history', function (Blueprint $table) {
            if (!Schema::hasColumn('dispatch_history', 'invoice_id')) {
                $table->unsignedBigInteger('invoice_id')->nullable()->after('id');

                // If invoices table exists, add foreign key
                if (Schema::hasTable('invoices')) {
                    $table->foreign('invoice_id')
                          ->references('id')
                          ->on('invoices')
                          ->onDelete('set null');
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dispatch_history', function (Blueprint $table) {
            if (Schema::hasColumn('dispatch_history', 'invoice_id')) {
                $table->dropForeign(['invoice_id']);
                $table->dropColumn('invoice_id');
            }
        });
    }
};
