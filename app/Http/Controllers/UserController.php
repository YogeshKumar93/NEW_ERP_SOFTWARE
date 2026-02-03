<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Helpers\ResponseHelper;

class UserController extends Controller
{
public function index(Request $request)
{
    $users = User::when($request->search, fn($q) => $q
                ->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%"))
            ->paginate(5)
            ->withQueryString();

    return Inertia::render('Users/Index', [
        'rows' => $users->items(),       // table rows
        'links' => $users->linkCollection()->map(fn($link) => [
            'url' => $link['url'] ?? null,
            'label' => $link['label'] ?? '',
            'active' => $link['active'] ?? false,
        ]),
    ]);
}

public function test()
{
    return 'ResponseHelper test OK';
}

 public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'sometimes|min:6',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
    ]);

    return ResponseHelper::success('User created successfully');
}
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($request->only('name','email'));

return ResponseHelper::success('User updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();
return ResponseHelper::success('User deleted successfully');
    }
}
