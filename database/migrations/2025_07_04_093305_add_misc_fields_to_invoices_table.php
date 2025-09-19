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
    Schema::table('invoices', function (Blueprint $table) {
        $table->string('vat_invoice')->nullable();
        $table->date('etd')->nullable();
        $table->json('misc_invoices')->nullable();
        $table->text('remarks')->nullable(); // Make sure this doesn't use ->change()
    });
}

public function down()
{
    Schema::table('invoices', function (Blueprint $table) {
        $table->dropColumn(['vat_invoice', 'etd', 'misc_invoices', 'remarks']);
    });
}


};
