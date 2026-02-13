<?php

namespace App\Services;

use App\Models\Unit;

class UnitService
{
    public function create(array $data)
    {
        return Unit::create($data);
    }

    public function update(Unit $unit, array $data)
    {
        return $unit->update($data);
    }

    public function delete(Unit $unit)
    {
        return $unit->delete();
    }
}
