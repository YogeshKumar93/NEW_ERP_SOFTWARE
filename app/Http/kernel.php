protected $routeMiddleware = [
    // ...
    'company.selected' => \App\Http\Middleware\EnsureCompanySelected::class,
];
