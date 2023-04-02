<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function index()
    {

        $user = User::all();
        return response()->json(['status' => 'success', 'data' => $user], 200);
    }

    public function register(Request $request)
    {
        $validate = $request->validate([
            'username' => 'required|unique:users|max:40',
            'email' => 'required|email|unique:users',
            'phone' => 'required|unique:users',
            'password' => 'required|max:244',
            'card_no' => 'required'
        ]);

        try {
            $user = User::create(
                [
                    'username' => $validate['username'],
                    'email' => $validate['email'],
                    'phone' => $validate['phone'],
                    'password' => Hash::make($validate['password']),
                    'card_no' => $validate['card_no']
                ]
            );

            if ($user) {
                return response()->json(['status' => 'success', 'data' => $user, 'message' => 'Successfully created!']);
            } else {
                return response()->json(['status' => 'Failed', 'data' => $user, 'message' => 'Failed to create']);
            }
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'data' => [], 'message' => $e]);
        }
    }

    public function login(Request $request)
    {
        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        try {

            $user = User::where('email', $validate['email'])->first();

            if (!$user || !Hash::check($validate['password'], $user->password)) {
                return response()->json(['status' => 'Failed', 'message' => 'Invalid email or password']);
            }

            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json(['status' => 'success', 'data' => $user, 'token' => $token]);
        } catch (Exception $e) {
            return response()->json(['status' => 'Error', 'data' => [], 'message' => $e]);
        }
    }

    public function logout(Request $request)
    {

        // $request->user()->currentAccessToken()->delete();

        $request->user()->tokens()->where('id', $request->user()->currentAccessToken()->id)->delete();

        return response()->json(['status' => 'success', 'message' => 'Logged out successfully']);
    }

}
