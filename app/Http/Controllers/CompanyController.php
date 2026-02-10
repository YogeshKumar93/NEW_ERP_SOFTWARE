<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Requests\CompanyRequest;
use App\Services\CompanyService;
use Inertia\Inertia;

class CompanyController extends Controller
{
    protected $companyService;

    public function __construct(CompanyService $companyService) {
        $this->companyService = $companyService;
    }

    public function index() {
        $companies = $this->companyService->listCompanies();
        return Inertia::render('Companies/Index', [
            'companies' => $companies
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
        return redirect()->route()->with('toast', ['message' => 'Company updated!', 'type' => 'success']);
    }

    public function destroy(Company $company) {
        $this->companyService->deleteCompany($company);
        return redirect()->route()->with('toast', ['message' => 'Company deleted!', 'type' => 'success']);
    }
}
