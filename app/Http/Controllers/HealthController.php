<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class HealthController extends Controller
{
    public function index(Request $request): Response
    {
        return response()->json([
            'count_users' => DB::table('users')->count(),
            'user' => $request->user(),
        ]);
    }
}
