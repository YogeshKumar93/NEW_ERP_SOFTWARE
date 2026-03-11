<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;

use Inertia\Inertia;

class EmployeeController extends Controller
{

    public function index()
    {
        $employees = Employee::latest()->get();

        return Inertia::render('Employees/Index',[
            'employees'=>$employees
        ]);
    }

    public function create()
    {
        return Inertia::render('Employees/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'nullable',
            'phone'=>'nullable'
        ]);

        Employee::create($request->all());

        return redirect()->route('employees.index');
    }

    public function edit(Employee $employee)
    {
        return Inertia::render('Employees/Edit',[
            'employee'=>$employee
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $employee->update($request->all());

        return redirect()->route('employees.index');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index');
    }
}
