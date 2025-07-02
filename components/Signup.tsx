'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Shield, Lock, Mail, ArrowLeft, User, Phone, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signupAction } from '@/lib/actions/auth';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store/useAppStore';

interface SignupFormData {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    county: string;
    password: string;
    confirmPassword: string;
    disclaimer: boolean;
}

const Signup: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();
    const setUser = useAppStore((state) => state.setUser);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>();

    const password = watch('password');

    const onSubmit = async (data: SignupFormData) => {
        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        startTransition(async () => {
            const result = await signupAction(data);
            if (result.success) {
                setUser(result.user);
                toast.success(`Thank you ${data.firstName}! Your Signup was Successful. Please Check your Email to confirm sign up`, {
                    duration: 6000
                });
                router.push('/dashboard/profile');
                setErrorMsg('');
            } else {
                toast.error(result.message);
                setErrorMsg('');
            }
        });
    };

    const handleLoginRedirect = () => {
        router.push('/signin');
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

            <div className="w-full max-w-2xl mx-auto relative z-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center mb-4">
                                <Shield className="w-12 h-12 text-blue-600 mr-2" />
                                <h1 className="text-2xl font-bold text-gray-800">Jasiri</h1>
                            </div>
                            <p className="text-gray-600">Counter-Terrorism Organization</p>
                        </div>

                        {/* Back to Main Site */}
                        <div className="mb-6">
                            <button
                                type="button"
                                onClick={handleBackToSite}
                                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Main Site
                            </button>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Our Mission</h2>
                            <p className="text-gray-600">Create your secure Jasiri account</p>
                        </div>

                        <div className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            id="firstName"
                                            {...register('firstName', { required: 'First name is required' })}
                                            className="w-full pl-10 pr-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Your first name"
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            id="lastName"
                                            {...register('lastName', { required: 'Last name is required' })}
                                            className="w-full pl-10 pr-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Your last name"
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mobile Number *
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="tel"
                                        id="mobile"
                                        {...register('mobile', { required: 'Mobile number is required' })}
                                        className="w-full pl-10 pr-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="+254 700 000 000"
                                    />
                                </div>
                                {errors.mobile && (
                                    <p className="text-xs text-red-600 mt-1">{errors.mobile.message}</p>
                                )}
                            </div>

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
                                        {...register('email', { 
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className="w-full pl-10 pr-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* County Field */}
                            <div>
                                <label htmlFor="county" className="block text-sm font-semibold text-gray-700 mb-2">
                                    County *
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        id="county"
                                        {...register('county', { required: 'County is required' })}
                                        className="w-full pl-10 pr-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Your county"
                                    />
                                </div>
                                {errors.county && (
                                    <p className="text-xs text-red-600 mt-1">{errors.county.message}</p>
                                )}
                            </div>

                            {/* Password Fields */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            {...register('password', { 
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 8,
                                                    message: 'Password must be at least 8 characters'
                                                }
                                            })}
                                            className="w-full pl-10 pr-12 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Create password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password *
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            {...register('confirmPassword', { required: 'Please confirm your password' })}
                                            className="w-full pl-10 pr-12 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Confirm password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Disclaimer Checkbox */}
                            <div>
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        {...register('disclaimer', { required: 'You must agree to provide true information' })}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer mt-1"
                                    />
                                    <span className="ml-3 text-sm text-gray-600">
                                        I hereby confirm that all the information provided is true and accurate to the best of my knowledge. I understand that providing false information may result in the rejection of my application or termination of membership.
                                    </span>
                                </label>
                                {errors.disclaimer && (
                                    <p className="text-xs text-red-600 mt-1">{errors.disclaimer.message}</p>
                                )}
                            </div>

                            {errorMsg && (
                                <p className="text-sm text-red-600 text-center">{errorMsg}</p>
                            )}

                            {/* Signup Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-gradient-to-r cursor-pointer from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                {isPending ? "Creating Account..." : "Create Account"}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-4 text-gray-500 text-sm">Already have an account?</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Login CTA */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleLoginRedirect}
                                className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                Sign In to Your Account
                            </button>
                        </div>

                        {/* Security Notice */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start">
                                <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-blue-800 font-medium">Secure Registration</p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Your information is protected with advanced encryption. Account verification will be sent to your email after registration.
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
    );
};

export default Signup;