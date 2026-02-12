<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'parent_id',
        'nature'
    ];

    // 👇 ADD THIS
    public function parent()
    {
        return $this->belongsTo(Group::class, 'parent_id');
    }

    // 👇 Optional but recommended
    public function children()
    {
        return $this->hasMany(Group::class, 'parent_id');
    }
}
