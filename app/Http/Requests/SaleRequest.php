<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleRequest extends FormRequest
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
             'date' => 'required|date',
        'customer_id' => 'required|exists:ledgers,id',
        'items' => 'required|array|min:1',
        'items.*.item_id' => 'required|exists:stock_items,id',
        'items.*.qty' => 'required|numeric|min:1',
        'items.*.rate' => 'required|numeric|min:0',
        ];
    }
}
