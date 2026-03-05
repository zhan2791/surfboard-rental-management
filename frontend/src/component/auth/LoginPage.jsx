import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
    //state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [serverStatus, setServerStatus] = useState('warming');
    const [serverMsg, setServerMsg] = useState(
        'Waking up server (Render free tier cold start may take ~30–60s)…'
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    //router
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

    //title
    useEffect(() => {
        document.title = "Login | Surfboard Rental";
        warmUpBackend();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const warmUpBackend = async () => {
        setServerStatus('warming');
        setServerMsg('Waking up server (Render free tier cold start may take ~30–60s)…');

        const delays = [5000, 8000, 12000];

        for (let attempt = 0; attempt < delays.length; attempt++) {
            try {
                await ApiService.getCategories();

                setServerStatus('ready');
                setServerMsg('Server ready');
                return true;
            } catch (e) {
                if (attempt < delays.length - 1) {
                    setServerMsg(`Server starting… retrying (${attempt + 2}/${delays.length})`);
                    await new Promise((r) => setTimeout(r, delays[attempt]));
                    continue;
                }

                setServerStatus('error');
                setServerMsg('Server not reachable yet. Please retry.');
                return false;
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!email || !password) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        //if backend not ready, give a reminder
        if (serverStatus !== 'ready') {
            setError(serverStatus === 'warming'
                ? 'Server is starting up. Please wait a moment and try again.'
                : 'Server not reachable. Click Retry to wake it up, then log in.'
            );
            setTimeout(() => setError(''), 7000);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await ApiService.loginUser({email, password});
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                navigate(from, {replace: true});
            } else {
                setError(response.message || 'Login failed. Please try again.');
                setTimeout(() => setError(''), 5000);
            }
        } catch (error) {
            const msg =
                error?.code === 'ECONNABORTED'
                    ? 'Request timed out (server may be cold-starting). Please retry.'
                    : error?.response?.data?.message || error.message || 'Login failed. Please try again.';

            setError(msg);
            setTimeout(() => setError(''), 7000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

            {/* Card Container */}
            <div
                className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-10">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-serif font-bold text-slate-800 mb-2">Welcome Back</h2>
                    <p className="text-slate-500 text-sm">Sign in to start your next adventure</p>
                    {/* Server Status Banner */}
                    <div
                        className={`mt-4 mb-4 p-3 rounded text-sm flex justify-between items-center
      ${serverStatus === "ready"
                            ? "bg-green-100 text-green-700"
                            : serverStatus === "warming"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        <span>{serverMsg}</span>

                        {serverStatus !== "ready" && (
                            <button
                                type="button"
                                onClick={warmUpBackend}
                                className="font-semibold underline"
                            >
                                Retry
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <div
                        className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm font-medium rounded">
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
                        disabled={serverStatus !== "ready" || isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Log In"}
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
