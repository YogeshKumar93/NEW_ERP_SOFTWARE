<?php

namespace App\Helpers;

use Inertia\Inertia;

class ResponseHelper
{
    public static function success($message, $data = [])
    {
        // SPA-friendly Inertia response
        return redirect()->back()->with([
            'toast' => [
                'type' => 'success',
                'message' => $message,
                'data' => $data,
            ],
        ]);
    }

    public static function error($message, $errors = [])
    {
        return redirect()->back()->with([
            'toast' => [
                'type' => 'error',
                'message' => $message,
                'errors' => $errors,
            ],
        ]);
    }
}
