<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'designation',
        'salary',
        'joining_date'
    ];

    public function advances()
{
return $this->hasMany(EmployeeAdvance::class);
}

}


