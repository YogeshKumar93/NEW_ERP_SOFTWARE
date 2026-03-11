<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Employee;

use Inertia\Inertia;

class AttendanceController extends Controller
{
     public function index()
    {
        $employees = Employee::all();

        return Inertia::render('Employees/Attendance',[
            'employees'=>$employees
        ]);
    }

     public function store(Request $request)
    {

        $request->validate([
            'employee_id'=>'required'
        ]);

        $photoPath = null;

        if($request->photo){

            $image = $request->photo;

            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace(' ', '+', $image);

            $imageName = time().'.png';

            \Storage::disk('public')->put(
                'attendance/'.$imageName,
                base64_decode($image)
            );

            $photoPath = 'attendance/'.$imageName;
        }

        Attendance::create([
            'employee_id'=>$request->employee_id,
            'date'=>date('Y-m-d'),
            'time'=>date('H:i:s'),
            'photo'=>$photoPath
        ]);

        return redirect()->back();
    }

}
