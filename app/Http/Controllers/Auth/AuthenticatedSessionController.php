<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        // validate input
        $credentials = $request->validate([
            'email'    => ['required','email'],
            'password' => ['required'],
        ]);

        // attempt login
        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            // failure: back with error on email field
            return back()->withErrors([
                'email' => 'Incorrect Email Address or Password.',
            ])->onlyInput('email');
        }

        // success: regenerate session & redirect
        $request->session()->regenerate();
        return redirect()->intended(route('dashboard'));
    }

    /*public function store(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user) {
        throw ValidationException::withMessages([
            'email' => __('The email address do not match our records.'),
        ]);
    }

    if (! Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
        throw ValidationException::withMessages([
            'password' => __('The provided password is incorrect.'),
        ]);
    }

    $request->session()->regenerate();

    return redirect()->intended(route('dashboard', absolute: false));
}*/

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
}
