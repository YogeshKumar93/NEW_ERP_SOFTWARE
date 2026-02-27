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
            ['name' => 'SIKKIM', 'state_code' => '11'],
            ['name' => 'ARUNACHAL PRADESH', 'state_code' => '12'],
            ['name' => 'NAGALAND', 'state_code' => '13'],
            ['name' => 'MANIPUR', 'state_code' => '14'],
            ['name' => 'MIZORAM', 'state_code' => '15'],
            ['name' => 'TRIPURA', 'state_code' => '16'],
            ['name' => 'MEGHALAYA', 'state_code' => '17'],
            ['name' => 'ASSAM', 'state_code' => '18'],
            ['name' => 'WEST BENGAL', 'state_code' => '19'],
            ['name' => 'JHARKHAND', 'state_code' => '20'],
            ['name' => 'ODISHA', 'state_code' => '21'],
            ['name' => 'CHHATTISGARH', 'state_code' => '22'],
            ['name' => 'MADHYA PRADESH', 'state_code' => '23'],
            ['name' => 'GUJARAT', 'state_code' => '24'],
            ['name' => 'DAMAN AND DIU', 'state_code' => '25'],
            ['name' => 'DADRA AND NAGAR HAVELI AND DAMAN AND DIU', 'state_code' => '26'],
            ['name' => 'MAHARASHTRA', 'state_code' => '27'],
            ['name' => 'KARNATAKA', 'state_code' => '29'],
            ['name' => 'GOA', 'state_code' => '30'],
            ['name' => 'LAKSHADWEEP', 'state_code' => '31'],
            ['name' => 'KERALA', 'state_code' => '32'],
            ['name' => 'TAMIL NADU', 'state_code' => '33'],
            ['name' => 'PUDUCHERRY', 'state_code' => '34'],
            ['name' => 'ANDAMAN AND NICOBAR ISLANDS', 'state_code' => '35'],
            ['name' => 'TELANGANA', 'state_code' => '36'],
            ['name' => 'ANDHRA PRADESH', 'state_code' => '37'],
            ['name' => 'LADAKH', 'state_code' => '38'],
            ['name' => 'OTHER TERRITORY', 'state_code' => '97'],
            ['name' => 'CENTRE JURISDICTION', 'state_code' => '99'],
        ];

        DB::table('states')->truncate();
        DB::table('states')->insert($states);
    }
}
