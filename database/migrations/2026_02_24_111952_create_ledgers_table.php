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
        Schema::create('ledgers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('company_id')
                  ->constrained()
                  ->onDelete('cascade');

            $table->string('name');
            
            $table->foreignId('group_id')
                  ->constrained('groups')
                  ->onDelete('cascade');

            $table->decimal('opening_balance', 15, 2)->default(0);
            $table->enum('opening_type', ['Dr', 'Cr'])->nullable();
            $table->string('gst_number')->nullable();
            $table->text('address')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ledgers');
    }
};
