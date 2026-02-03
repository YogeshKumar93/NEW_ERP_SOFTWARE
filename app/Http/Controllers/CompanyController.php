<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        // $companies = Company::paginate(10);
  $companies = Company::when($request->search, fn($q) => $q
                ->where('company_name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%"))
            ->paginate(5)
            ->withQueryString();
        return Inertia::render('CompanyTest/Index', [
            'rows' => $companies->items(),
            'links' => $companies->links(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|min:3',
            'email' => 'required|email|unique:companies,email',
            'gst' => 'nullable',
        ]);

        Company::create($request->all());

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Company created successfully',
        ]);
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $request->validate([
            'company_name' => 'required|min:3',
            'email' => 'required|email|unique:companies,email,' . $id,
        ]);

        $company->update($request->all());

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Company updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);
        $company->delete();

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Company deleted successfully',
        ]);
    }
}
