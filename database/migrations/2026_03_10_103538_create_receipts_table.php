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
    Schema::create('receipts', function (Blueprint $table) {
        $table->id();
        $table->date('receipt_date');
        $table->foreignId('ledger_id')->constrained()->cascadeOnDelete();
        $table->string('receipt_mode')->default('Cash');
        $table->decimal('amount', 15, 2);
        $table->text('narration')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipts');
    }
};
