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
        Schema::table('companies', function (Blueprint $table) {

            $table->string('address')->nullable()->after('phone');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('pincode')->nullable();

            $table->string('gstin')->nullable();
            $table->string('pan')->nullable();
            $table->string('currency')->default('INR');

            $table->date('financial_year_from')->nullable();
            $table->date('books_beginning_from')->nullable();

            $table->string('gst_registration_type')->nullable();
            $table->string('state_code')->nullable();

            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('created_by')->nullable();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {

            $table->dropColumn([
                'address',
                'city',
                'state',
                'pincode',
                'gstin',
                'pan',
                'currency',
                'financial_year_from',
                'books_beginning_from',
                'gst_registration_type',
                'state_code',
                'is_active',
                'created_by'
            ]);
        });
    }
};
