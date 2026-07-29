'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addAddress } from "@/lib/features/address/addressSlice"

const AddressModal = ({ setShowAddressModal, setSelectedAddress }) => {

    const dispatch = useDispatch()

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch(addAddress(address))
        if (setSelectedAddress) {
            setSelectedAddress(address)
        }
        toast.success('Address added successfully!')
        setShowAddressModal(false)
    }

    return (
        <form onSubmit={handleSubmit} className="fixed inset-0 z-50 bg-black/60 backdrop-blur h-screen flex items-center justify-center">
            <div className="flex flex-col gap-4 text-slate-700 w-full max-w-sm mx-6 bg-white p-6 rounded-2xl shadow-xl relative">
                <h2 className="text-2xl font-semibold text-slate-800">Add New Address</h2>
                <input name="name" onChange={handleAddressChange} value={address.name} className="p-2.5 px-4 outline-none border border-slate-200 focus:border-indigo-500 rounded-xl w-full text-sm" type="text" placeholder="Full Name" required />
                <input name="email" onChange={handleAddressChange} value={address.email} className="p-2.5 px-4 outline-none border border-slate-200 focus:border-indigo-500 rounded-xl w-full text-sm" type="email" placeholder="Email address" required />
                <input name="street" onChange={handleAddressChange} value={address.street} className="p-2.5 px-4 outline-none border border-slate-200 focus:border-indigo-500 rounded-xl w-full text-sm" type="text" placeholder="Street Address" required />
                <div className="flex gap-3">
                    <input name="city" onChange={handleAddressChange} value={address.city} className="p-2.5 px-4 outline-none border border-slate-200 focus:border-indigo-500 rounded-xl w-full text-sm" type="text" placeholder="City" required />
                    <input name="state" onChange={handleAddressChange} value={address.state} className="p-2.5 px-4 outline-none border border-slate-200 focus:border-indigo-500 rounded-xl w-full text-sm" type="text" placeholder="State" required />
                </div>
                <div className="flex gap-3">
                    <input name="zip" onChange={handleAddressChange} value={address.zip} className="p-2.5 px-4 outline-none border border-slate-200 focus:border-indigo-500 rounded-xl w-full text-sm" type="number" placeholder="Zip code" required />
                    <input name="country" onChange={handleAddressChange} value={address.country} className="p-2.5 px-4 outline-none border border-slate-200 focus:border-indigo-500 rounded-xl w-full text-sm" type="text" placeholder="Country" required />
                </div>
                <input name="phone" onChange={handleAddressChange} value={address.phone} className="p-2.5 px-4 outline-none border border-slate-200 focus:border-indigo-500 rounded-xl w-full text-sm" type="text" placeholder="Phone Number" required />
                <button type="submit" className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95">SAVE ADDRESS</button>
                <XIcon size={22} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer" onClick={() => setShowAddressModal(false)} />
            </div>
        </form>
    )
}

export default AddressModal