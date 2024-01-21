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
        Schema::create('db_order', function (Blueprint $table) {
            $table->id(); //id
            $table->unsignedInteger('user_id')->default(1);
            $table->string('name',1000);
            $table->string('phone',15);
            $table->string('email',1000);
            $table->string('address');
            $table->string('note');
            $table->timestamps(); //created_at, updated_at
            $table->unsignedInteger('updated_by')->nullable();
            $table->unsignedTinyInteger('status')->default(2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('db_order');
    }
};
