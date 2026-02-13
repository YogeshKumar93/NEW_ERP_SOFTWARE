<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockCategory extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'parent_id',
    ];

    // Parent
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    // Children
    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    // Recursive children (Advanced)
    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }

    // Stock items under category
    public function stockItems()
    {
        return $this->hasMany(StockItem::class);
    }
}

