'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuthModal, setUser } from '@/lib/features/user/userSlice';
import { X, Mail, Lock, User, Sparkles, Shield, Store } from 'lucide-react';
import toast from 'react-hot-toast';

const AuthModal = () => {
    const dispatch = useDispatch();
    const { isAuthModalOpen } = useSelector((state) => state.user);

    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isAuthModalOpen) return null;

    const handleQuickLogin = (presetUser, roleName) => {
        dispatch(setUser(presetUser));
        toast.success(`Logged in successfully as ${roleName}!`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please enter email and password');
            return;
        }

        const newUser = {
            id: `user_${Date.now()}`,
            name: name || email.split('@')[0],
            email: email,
            role: 'customer',
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };

        dispatch(setUser(newUser));
        toast.success(isSignUp ? 'Account created successfully!' : 'Logged in successfully!');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 p-6 text-white text-center relative">
                    <button
                        onClick={() => dispatch(closeAuthModal())}
                        className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
                    >
                        <X size={18} />
                    </button>
                    <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-white/20 backdrop-blur-md mb-2">
                        <Sparkles size={24} className="text-amber-300" />
                    </div>
                    <h3 className="text-2xl font-bold">Welcome to GoCart</h3>
                    <p className="text-xs text-indigo-100 mt-1">Sign in to manage your orders, store & cart</p>
                </div>

                {/* Quick Demo Login Presets */}
                <div className="p-6 pb-2 bg-slate-50 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Quick Demo Accounts</p>
                    <div className="grid grid-[#111] grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={() => handleQuickLogin({
                                id: 'user_cust_1',
                                name: 'John Customer',
                                email: 'john@example.com',
                                role: 'customer',
                                image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
                            }, 'Customer')}
                            className="flex flex-col items-center p-2 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/70 transition text-slate-700 text-xs font-medium"
                        >
                            <User size={16} className="text-indigo-600 mb-1" />
                            <span>Customer</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickLogin({
                                id: 'user_vend_1',
                                name: 'Alex Vendor',
                                email: 'vendor@gocart.com',
                                role: 'vendor',
                                image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
                            }, 'Vendor')}
                            className="flex flex-col items-center p-2 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/70 transition text-slate-700 text-xs font-medium"
                        >
                            <Store size={16} className="text-emerald-600 mb-1" />
                            <span>Vendor</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickLogin({
                                id: 'user_admin_1',
                                name: 'Platform Admin',
                                email: 'admin@gocart.com',
                                role: 'admin',
                                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
                            }, 'Admin')}
                            className="flex flex-col items-center p-2 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/70 transition text-slate-700 text-xs font-medium"
                        >
                            <Shield size={16} className="text-purple-600 mb-1" />
                            <span>Admin</span>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex border-b border-slate-200 mb-4">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(false)}
                            className={`flex-1 py-2 text-center text-sm font-semibold border-b-2 transition ${!isSignUp ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsSignUp(true)}
                            className={`flex-1 py-2 text-center text-sm font-semibold border-b-2 transition ${isSignUp ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
                        >
                            Create Account
                        </button>
                    </div>

                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-indigo-500 transition">
                                <User size={16} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-transparent outline-none text-sm text-slate-800"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-indigo-500 transition">
                            <Mail size={16} className="text-slate-400" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm text-slate-800"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-indigo-500 transition">
                            <Lock size={16} className="text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none text-sm text-slate-800"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-200 active:scale-[0.99]"
                    >
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
