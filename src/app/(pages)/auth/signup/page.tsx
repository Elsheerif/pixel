'use client';

import React, { useState } from 'react';
import { apiServices } from '@/services/api';
import Link from 'next/link';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = await apiServices.signUp(name, email, password);
        console.log('Signed up:', user);
        window.location.href = '/auth/signin'; // Redirect to sign-in after signup
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-50 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
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
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md 
                                hover:bg-orange-600 focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-orange-500 text-sm"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?{' '}
                    <Link href="/auth/signin" className="text-orange-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}