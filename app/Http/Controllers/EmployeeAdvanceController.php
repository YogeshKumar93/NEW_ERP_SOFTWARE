<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Employee;
use App\Models\EmployeeAdvance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeAdvanceController extends Controller
{
    public function index()
{

$employees = Employee::select('id','name','basic_salary')->get();

$advances = EmployeeAdvance::with('employee')->latest()->get();

return Inertia::render('Employees/Advance',[
'employees'=>$employees,
'advances'=>$advances
]);

}

public function store(Request $request)
{

$request->validate([
'employee_id'=>'required',
'amount'=>'required'
]);

EmployeeAdvance::create([
'employee_id'=>$request->employee_id,
'amount'=>$request->amount,
'advance_date'=>now()
]);

return redirect()->back();

}

public function salary($id)
{

$employee = Employee::findOrFail($id);

$totalAdvance = EmployeeAdvance::where('employee_id',$id)->sum('amount');

$remainingSalary = $employee->basic_salary - $totalAdvance;

return response()->json([
'basic_salary'=>$employee->basic_salary,
'total_advance'=>$totalAdvance,
'remaining_salary'=>$remainingSalary
]);

}

}
