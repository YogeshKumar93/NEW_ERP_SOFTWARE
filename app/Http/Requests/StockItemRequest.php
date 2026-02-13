<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StockItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                  'name' => 'required|string|max:255',
            'unit_id' => 'required|exists:units,id',
            'hsn_code' => 'nullable|string|max:50',
            'gst_percent' => 'required|numeric|min:0',
            'stock_category_id' => 'nullable|exists:stock_categories,id',
            'opening_stock' => 'required|numeric|min:0',
            'opening_rate' => 'required|numeric|min:0',
        ];
    }
}
