<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyTestController extends Controller
{
    private function companies()
{
    return collect(session('companies', []));
}


    public function index(Request $request)
    {
        $page = (int) ($request->page ?? 1);
        $perPage = (int) ($request->per_page ?? 10);
        $search = $request->search;

        $data = $this->companies();

        if ($search) {
            $data = $data->filter(fn ($row) =>
                str_contains(strtolower($row['company_name']), strtolower($search))
            );
        }

        $total = $data->count();
        $rows = $data->slice(($page - 1) * $perPage, $perPage)->values();

        $links = collect(range(1, ceil($total / $perPage)))->map(fn ($i) => [
            'url' => url("/companies-test?page=$i&per_page=$perPage&search=$search"),
            'label' => (string) $i,
            'active' => $i === $page,
        ]);

        return Inertia::render('CompanyTest/Index', [
            'rows' => $rows,
            'links' => $links,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|min:3',
            'email' => 'required|email',
            // intentionally hidden field
            'gst' => 'required',
        ]);

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Company created successfully',
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'company_name' => 'required|min:3',
            'email' => 'required|email',
        ]);

        return back()->with('toast', [
            'type' => 'success',
            'message' => "Company #$id updated successfully",
        ]);
    }

    public function destroy($id)
    {
        if ($id == 7) {
            abort(403, 'This company is locked');
        }

        return back()->with('toast', [
            'type' => 'success',
            'message' => "Company deleted successfully",
        ]);
    }
}
