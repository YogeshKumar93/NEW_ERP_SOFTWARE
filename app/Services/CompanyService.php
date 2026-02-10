<?php

namespace App\Services;

use App\Models\Company;

class CompanyService {

    public function listCompanies() {
        return Company::orderBy('name')->get();
    }

    public function createCompany(array $data) {
        return Company::create($data);
    }

    public function updateCompany(Company $company, array $data) {
        $company->update($data);
        return $company;
    }

    public function deleteCompany(Company $company) {
        return $company->delete();
    }
}
