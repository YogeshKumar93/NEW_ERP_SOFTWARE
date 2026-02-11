<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\State;
use App\Http\Requests\CompanyRequest;
use App\Services\CompanyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    protected $companyService;

    public function __construct(CompanyService $companyService) {
        $this->companyService = $companyService;
    }

    // ---------------------------
    // Existing CRUD methods
    // ---------------------------

    public function index() {
        $companies = $this->companyService->listCompanies();

        return Inertia::render('Companies/Index', [
            'companies' => $companies,
            'states' => State::all()
        ]);
    }

    public function store(CompanyRequest $request)
    {
        $company = $this->companyService->createCompany($request->validated());

        return redirect()
            ->route('companies.index')
            ->with([
                'toast' => ['message' => 'Company created!', 'type' => 'success'],
                'newCompany' => $company,
            ]);
    }

    public function update(CompanyRequest $request, Company $company) {
        $this->companyService->updateCompany($company, $request->validated());
        return redirect()
            ->route('companies.index')
            ->with('toast', ['message' => 'Company updated!', 'type' => 'success']);
    }

    public function destroy(Company $company) {
        $this->companyService->deleteCompany($company);
        return redirect()
            ->route('companies.index')
            ->with('toast', ['message' => 'Company deleted!', 'type' => 'success']);
    }

    // ---------------------------
    // New company selection flow
    // ---------------------------

    // Show company selection page after login
    public function selectIndex()
    {
        $companies = $this->companyService->listCompanies();
        return Inertia::render('Companies/SelectCompany', [
            'companies' => $companies
        ]);
    }

    // Handle POST when user selects a company
    public function select(Request $request)
    {
        $request->validate([
            'company_id' => 'required|exists:companies,id'
        ]);

        // Store selected company in session
        session(['selected_company' => $request->company_id]);

        return redirect()->route('dashboard');
    }
}
