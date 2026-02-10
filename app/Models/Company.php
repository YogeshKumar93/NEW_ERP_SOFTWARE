<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    // Agar table ka naam default plural "companies" se alag ho
    // protected $table = 'companies';

    // Mass assignable fields
      protected $fillable = ['name', 'email', 'phone', 'address', 'gstin'];

    // Agar tumhe timestamps (created_at, updated_at) chahiye toh ye default true hai
    // protected $timestamps = true;
}
