import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onSuccess: () => window.location.href = route('companies.select.index'),
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        /* Note: Agar GuestLayout me pehle se hi centering ya card classes hain, 
           toh aap is content ko uske bahar bhi rakh sakte hain ya GuestLayout ko modify kar sakte hain.
        */
        <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white overflow-hidden">
            <Head title="Register" />

            {/* Left Side - Image Section (Fixed 40% on Desktop) */}
            <div className="relative hidden lg:flex lg:w-[40%] bg-indigo-900 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80" 
                    alt="Team collaboration" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-transparent"></div>
                
                <div className="relative z-10 w-full p-12 flex flex-col justify-end text-white">
                    <h1 className="text-4xl font-extrabold leading-tight mb-4">
                        Join our <br />Global Community
                    </h1>
                    <p className="text-lg text-indigo-100 opacity-90 max-w-sm">
                        Start your journey with us and experience the most powerful company management tools.
                    </p>
                    <div className="mt-8 flex items-center space-x-3 text-sm font-medium">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                            ✓ 100% Secure
                        </span>
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                            ✓ Free Support
                        </span>
                    </div>
                </div>
            </div>

            {/* Right Side - Form Section (Flexible 60% on Desktop) */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 bg-white">
                <div className="w-full max-w-[450px]"> {/* Strict max-width for the form content */}
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Create Account
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Join us today! Please enter your details below.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <InputLabel htmlFor="name" value="Full Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email Address" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    placeholder="name@company.com"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <InputError message={errors.password} />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <PrimaryButton 
                                className="w-full h-12 flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg shadow-indigo-100" 
                                disabled={processing}
                            >
                                {processing ? 'Setting up account...' : 'Create Account'}
                            </PrimaryButton>
                        </div>

                        <div className="text-center mt-8">
                            <span className="text-gray-500 text-sm">Already have an account?</span>{' '}
                            <Link
                                href={route('login')}
                                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}