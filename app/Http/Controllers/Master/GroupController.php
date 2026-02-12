<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function index()
    {
        $companyId = session('selected_company');

        if (!$companyId) {
            return redirect()->route('dashboard');
        }

        $groups = Group::where('company_id', $companyId)
            ->with('parent') // parent relation load karega
            ->get();

        return Inertia::render('Masters/Groups/Index', [
            'groups' => $groups
        ]);
    }

    public function store(Request $request)
    {
        $companyId = session('selected_company');

        $request->validate([
            'name' => 'required|string|max:255',
            'nature' => 'required|in:Assets,Liability,Income,Expense',
            'parent_id' => 'nullable|exists:groups,id'
        ]);

        Group::create([
            'company_id' => $companyId,
            'name' => $request->name,
            'parent_id' => $request->parent_id,
            'nature' => $request->nature,
        ]);

        return redirect()->back()->with('success', 'Group Created Successfully');
    }
}
