import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-black dark:to-gray-800">

                {/* Top Navbar */}
                <header className="flex items-center justify-between px-8 py-5 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-sm">
                    <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        BigBrains ERP
                    </h1>

                    <nav className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href={
                                    auth.user.role_id === 1
                                        ? route('admin.dashboard')
                                        : route('user.dashboard')
                                }
                                className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="flex flex-col items-center justify-center text-center px-6 py-24">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
                        Smart Business Management
                    </h2>

                    <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                        Manage Companies, Accounts, Inventory, Reports and more —
                        all in one powerful ERP platform built with Laravel + React.
                    </p>

                    {!auth.user && (
                        <div className="mt-8 flex gap-4">
                            <Link
                                href={route('register')}
                                className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-lg hover:bg-indigo-700 transition"
                            >
                                Get Started
                            </Link>

                            <Link
                                href={route('login')}
                                className="px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 text-lg hover:bg-indigo-600 hover:text-white transition"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </section>

                {/* Features Section */}
                <section className="px-8 pb-20">
                    <div className="grid gap-8 md:grid-cols-3">

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold text-indigo-600">
                                Company Management
                            </h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Create and manage multiple companies with financial year control.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold text-indigo-600">
                                Role Based Access
                            </h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Secure login system with Admin & User dashboards.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold text-indigo-600">
                                Real-time Reporting
                            </h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Generate business insights instantly with powerful reports.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center py-6 border-t bg-white/70 dark:bg-black/40 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Laravel v{laravelVersion} (PHP v{phpVersion})
                    </p>
                </footer>

            </div>
        </>
    );
}
