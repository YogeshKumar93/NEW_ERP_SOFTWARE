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
    Schema::create('stock_items', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('company_id');

        $table->unsignedBigInteger('stock_category_id')->nullable();
        $table->unsignedBigInteger('unit_id')->nullable();

        $table->string('name');
        $table->decimal('opening_stock', 15, 2)->default(0);
        $table->decimal('opening_rate', 15, 2)->default(0);

        $table->timestamps();

        // 🔹 Foreign Keys
        $table->foreign('stock_category_id')
              ->references('id')
              ->on('stock_categories')
              ->onDelete('set null');

        $table->foreign('unit_id')
              ->references('id')
              ->on('units')
              ->onDelete('set null');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_items');
    }
};
