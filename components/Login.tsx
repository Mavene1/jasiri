
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Shield, Users, Lock, Mail, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useAppStore } from '@/lib/store/useAppStore';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/lib/actions/auth';

interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

const Login: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [errorMsg, setErrorMsg] = useState('');
    const setUser = useAppStore((state) => state.setUser);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormData>();

    console.log(errors, watch())

    const onSubmit = async (data: LoginFormData) => {
        startTransition(async () => {
            const result = await loginAction(data);
            if (result.success) {
                setUser(result.user);
                router.push('/dashboard');
            } else {
                setErrorMsg(result.message);
            }
        });
        console.log('Login attempt:', data);
    };

    const handleRegisterRedirect = () => {
        window.open('https://secure-portal.jasiri.org/register', '_blank');
    };

    const handleBackToSite = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-12">
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-green-600 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-800 rounded-full"></div>
                <div className="absolute bottom-40 right-10 w-24 h-24 bg-green-500 rounded-full"></div>
            </div>

            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10 p-0 bg-transparent rounded-none shadow-none border-none lg:bg-white lg:rounded-2xl lg:shadow-2xl lg:p-8 lg:border lg:border-gray-100">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex flex-col items-center justify-center p-8">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-6">
                            <Shield className="w-16 h-16 text-blue-600 mr-3" />
                            <h1 className="text-4xl font-bold text-gray-800">Jasiri</h1>
                        </div>
                        <p className="text-xl text-gray-600 mb-8">Counter-Terrorism Social Organization</p>
                    </div>

                    <div className="relative">
                        <Image
                            src="/images/1.png"
                            alt="Jasiri Community"
                            className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-white"
                            width={320}
                            height={320}
                        />
                        <div className="absolute -top-4 -right-4 bg-green-500 p-3 rounded-full shadow-lg">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            &quot;Building Safer Communities Together&quot;
                        </h2>
                        <p className="text-gray-600 max-w-md">
                            Join our mission to combat terrorism through community engagement,
                            education, and collaborative action for a peaceful society.
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full max-w-md mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="bg-white rounded-2xl lg:shadow-none shadow-2xl p-8 border border-gray-200">
                            {/* Mobile Header */}
                            <div className="lg:hidden text-center mb-6">
                                <div className="flex items-center justify-center mb-4">
                                    <Shield className="w-12 h-12 text-blue-600 mr-2" />
                                    <h1 className="text-2xl font-bold text-gray-800">Jasiri</h1>
                                </div>
                                <p className="text-gray-600">Counter-Terrorism Organization</p>
                            </div>

                            {/* Back to Main Site */}
                            <div className="mb-6">
                                <button
                                    onClick={handleBackToSite}
                                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Main Site
                                </button>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                                <p className="text-gray-600">Access your secure Jasiri portal</p>
                            </div>

                            <div className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="email"
                                            id="email"
                                            {...register('email', { required: true })}
                                            className="w-full pl-10 pr-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="your.email@organization.org"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            {...register('password', { required: true })}
                                            className="w-full pl-10 pr-12 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Enter your secure password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            {...register('rememberMe')}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Keep me signed in</span>
                                    </label>
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                        Forgot Password?
                                    </a>
                                </div>

                                {errorMsg && (
                                    <p className="text-sm text-red-600 text-center -mt-4">{errorMsg}</p>
                                )}

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                >
                                    {isPending ? "Logging in..." : "Secure Login"}
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="my-8 flex items-center">
                                <div className="flex-1 border-t border-gray-300"></div>
                                <span className="px-4 text-gray-500 text-sm">New to Jasiri?</span>
                                <div className="flex-1 border-t border-gray-300"></div>
                            </div>

                            {/* Registration CTA */}
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Join our mission to build safer communities
                                </p>
                                <button
                                    onClick={handleRegisterRedirect}
                                    className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                >
                                    Apply for Membership
                                </button>
                                <p className="text-xs text-gray-500 mt-3">
                                    Registration requires verification through our secure partner platform
                                </p>
                            </div>

                            {/* Security Notice */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-start">
                                    <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-blue-800 font-medium">Secure Portal</p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            This portal uses advanced encryption to protect sensitive information and ensure secure access to Jasiri resources.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="text-center mt-6 text-sm text-gray-500">
                            <p>© {currentYear} Jasiri Organization | Securing Communities Through Unity</p>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Login;