<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:companies,name,' . $this->company?->id,
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string',
            'gstin' => 'nullable|string|max:15',
              'pan' => 'nullable|string|size:10',
               'currency' => 'required|string|in:INR,USD,EUR',
        'financial_year_from' => 'required|date',
        'books_beginning_from' => 'required|date',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Company name is required',
            'name.unique' => 'Company name already exists',
            'email.email' => 'Invalid email format',
        ];
    }
}
