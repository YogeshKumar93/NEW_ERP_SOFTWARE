<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StateSeeder extends Seeder
{
    public function run(): void
    {
        $states = [
            ['name' => 'JAMMU AND KASHMIR', 'state_code' => '01'],
            ['name' => 'HIMACHAL PRADESH', 'state_code' => '02'],
            ['name' => 'PUNJAB', 'state_code' => '03'],
            ['name' => 'CHANDIGARH', 'state_code' => '04'],
            ['name' => 'UTTARAKHAND', 'state_code' => '05'],
            ['name' => 'HARYANA', 'state_code' => '06'],
            ['name' => 'DELHI', 'state_code' => '07'],
            ['name' => 'RAJASTHAN', 'state_code' => '08'],
            ['name' => 'UTTAR PRADESH', 'state_code' => '09'],
            ['name' => 'BIHAR', 'state_code' => '10'],
            ['name' => 'GUJARAT', 'state_code' => '24'],
            ['name' => 'MAHARASHTRA', 'state_code' => '27'],
            ['name' => 'KARNATAKA', 'state_code' => '29'],
            ['name' => 'TAMIL NADU', 'state_code' => '33'],
            ['name' => 'WEST BENGAL', 'state_code' => '19'],
        ];

        DB::table('states')->insert($states);
    }
}
