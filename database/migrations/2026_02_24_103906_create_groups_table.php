<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupsTable extends Migration
{
    public function up(): void
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();

            $table->foreignId('company_id')
                  ->constrained()
                  ->onDelete('cascade');

            $table->string('name');

            $table->foreignId('parent_id')
                  ->nullable()
                  ->constrained('groups')
                  ->onDelete('cascade');

            $table->string('nature');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
}