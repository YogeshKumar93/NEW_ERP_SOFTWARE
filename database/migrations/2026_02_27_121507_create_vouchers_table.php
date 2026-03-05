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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();

            // Foreign Keys
            $table->foreignId('company_id')
                  ->constrained()
                  ->onDelete('cascade');

            $table->foreignId('voucher_type_id')
                  ->constrained()
                  ->onDelete('cascade');

            // Voucher Fields
            $table->string('voucher_no')->unique();
            $table->date('date');
            $table->text('narration')->nullable();
            $table->decimal('total_amount', 15, 2)->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
