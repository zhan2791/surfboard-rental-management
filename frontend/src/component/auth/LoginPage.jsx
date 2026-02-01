import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

    //title
    useEffect(() => {
        document.title = "Login | Surfboard Rental";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        try {
            const response = await ApiService.loginUser({email, password});
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

            {/* Card Container */}
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-10">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-serif font-bold text-slate-800 mb-2">Welcome Back</h2>
                    <p className="text-slate-500 text-sm">Sign in to start your next adventure</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm font-medium rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="name@example.com"
                            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all placeholder:text-slate-400"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Password
                            </label>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all placeholder:text-slate-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-brand hover:bg-teal-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-brand/30 transition-all transform active:scale-[0.98]"
                    >
                        Log In
                    </button>
                </form>

                {/* Footer Link */}
                <p className="mt-8 text-center text-slate-500 text-sm">
                    Don't have an account?{' '}
                    <NavLink to="/register" className="text-brand font-bold hover:underline">
                        Create Account
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;