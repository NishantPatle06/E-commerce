'use client'
import { Search, ShoppingCart, User, LogOut, Package, Store, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openAuthModal, logout } from "@/lib/features/user/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartCount = useSelector((state) => state.cart.total);
    const { user } = useSelector((state) => state.user);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`);
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsMenuOpen(false);
        toast.success("Logged out successfully");
    };

    return (
        <nav className="relative bg-white z-40">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                        <span className="text-green-600">go</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                        <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                            plus
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input className="w-full bg-transparent outline-none placeholder-slate-600" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2.5 p-1.5 pl-3 border border-slate-200 rounded-full hover:shadow-md transition bg-slate-50"
                                >
                                    <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">{user.name}</span>
                                    {user.image ? (
                                        <img src={user.image} alt={user.name} className="size-8 rounded-full object-cover border border-slate-300" />
                                    ) : (
                                        <div className="size-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                                        <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                            <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                            <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                                                {user.role || 'Customer'}
                                            </span>
                                        </div>

                                        <Link
                                            href="/orders"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition"
                                        >
                                            <Package size={16} className="text-slate-500" /> My Orders
                                        </Link>

                                        <Link
                                            href="/store"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition"
                                        >
                                            <Store size={16} className="text-slate-500" /> Vendor Dashboard
                                        </Link>

                                        <Link
                                            href="/admin"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition"
                                        >
                                            <Shield size={16} className="text-slate-500" /> Admin Panel
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition mt-1 border-t border-slate-100"
                                        >
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => dispatch(openAuthModal())}
                                className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full font-medium shadow-sm shadow-indigo-200"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile User Button */}
                    <div className="sm:hidden flex items-center gap-3">
                        {user ? (
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="size-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm"
                            >
                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </button>
                        ) : (
                            <button
                                onClick={() => dispatch(openAuthModal())}
                                className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full font-medium"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    );
};

export default Navbar;