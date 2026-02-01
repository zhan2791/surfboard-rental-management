import React, { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate, NavLink } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    //title
    useEffect(() => {
        document.title = "Create Account | Surfboard Rental";
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        if (!name || !email || !password || !phoneNumber) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Please fill all the fields.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }
        try {
            const response = await ApiService.registerUser(formData);

            if (response.statusCode === 200) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: ''
                });
                setSuccessMessage('Account created successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/login');
                }, 2000);
            }
        }
        catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

            {/* Card Container (Wider than login to accommodate more fields) */}
            <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-10">

                <div className="text-center mb-10">
                    <h2 className="text-4xl font-serif font-bold text-slate-800 mb-2">Join the Club</h2>
                    <p className="text-slate-500 text-sm">Create your account to start renting</p>
                </div>

                {errorMessage && (
                    <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm font-medium rounded">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="mb-6 p-3 bg-green-50 border-l-4 border-green-500 text-green-600 text-sm font-medium rounded">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                               className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                               placeholder="John Doe"
                        />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                                   className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                                   placeholder="name@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Phone</label>
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required
                                   className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                                   placeholder="0400 123 456"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required
                               className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all"
                               placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full mt-4 bg-brand hover:bg-teal-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-brand/30 transition-all transform active:scale-[0.98]">
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 text-sm">
                    Already a member?{' '}
                    <NavLink to="/login" className="text-brand font-bold hover:underline">
                        Log In
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;