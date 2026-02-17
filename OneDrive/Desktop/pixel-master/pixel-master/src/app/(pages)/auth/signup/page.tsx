'use client';

import React, { useState } from 'react';
import { apiServices } from '@/services/api';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        if (!name.trim()) {
            setError('Name is required');
            return false;
        }
        if (!email.trim()) {
            setError('Email is required');
            return false;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return false;
        }
        if (password !== rePassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const user = await apiServices.signUp(name, email, password, rePassword);

            if (user.message === 'fail') {
                setError(user.errors?.msg || 'Signup failed');
                setLoading(false);
                return;
            }

            // Sign up successful, now try auto-login
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                // If sign-in fails, the account might need email verification
                // or there could be another issue. Guide user to sign in manually or check email.
                setSuccessMessage(`Account created successfully! We've sent a verification email to ${email}. Please check your email to verify your account, then sign in.`);
                // Redirect to signin page after a short delay
                setTimeout(() => {
                    window.location.href = '/auth/signin';
                }, 2000);
            } else {
                toast.success('Account created and signed in successfully!');
                window.location.href = '/';
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-50 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
                {successMessage && <p className="text-green-600 mb-4 text-center text-sm">{successMessage}</p>}
                {!successMessage && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                                    focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                                    focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                                    focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="rePassword"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                                    focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md
                                hover:bg-orange-600 focus:outline-none focus:ring-2
                                focus:ring-offset-2 focus:ring-orange-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                )}
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?
                    <Link href="/auth/signin" className="text-orange-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}