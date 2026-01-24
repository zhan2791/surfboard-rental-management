import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4 flex justify-center items-start">

            {/* Main Card */}
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden border border-slate-100">

                {/* Header: Dark background for contrast */}
                <div className="bg-slate-900 p-8 text-center">
                    <h2 className="text-2xl font-bold text-white">Manage Account</h2>
                    <p className="text-slate-400 text-sm mt-1">View details or delete your account</p>
                </div>

                <div className="p-8">
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}

                    {user && (
                        <div className="space-y-6">
                            {/* Read-only Information */}
                            <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Name</label>
                                    <p className="font-bold text-slate-800 text-lg">{user.name}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Email</label>
                                    <p className="font-bold text-slate-800 text-lg">{user.email}</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Phone</label>
                                    <p className="font-bold text-slate-800 text-lg">{user.phoneNumber}</p>
                                </div>
                            </div>

                            {/* Danger Zone: Visual separation for delete action */}
                            <div className="pt-6 border-t border-slate-100">
                                <h4 className="text-red-600 font-bold text-xs uppercase tracking-wider mb-3">Danger Zone</h4>
                                <p className="text-slate-400 text-xs mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button
                                    className="w-full py-4 rounded-xl bg-red-50 text-red-600 font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                    onClick={handleDeleteProfile}
                                >
                                    Delete My Account
                                </button>
                            </div>

                            {/* Back Button */}
                            <button
                                className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm"
                                onClick={() => navigate('/profile')}
                            >
                                Cancel & Go Back
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;