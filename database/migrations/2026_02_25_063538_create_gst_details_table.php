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
        Schema::create('gst_details', function (Blueprint $table) {
            $table->id();

            $table->foreignId('company_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('registration_status')->nullable();
            $table->string('state')->nullable();
            $table->string('registration_type')->nullable();
            $table->string('assessee_other_territory')->nullable();
            $table->string('gstin')->nullable();
            $table->string('periodicity')->nullable();

            $table->boolean('eway_bill_applicable')->default(false);
            $table->date('eway_applicable_from')->nullable();
            $table->boolean('einvoicing_applicable')->default(false);

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gst_details');
    }
};
