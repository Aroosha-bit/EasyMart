"use client";
import React, { useState } from "react";
import {
  User,
  ShoppingBag,
  ShoppingCart,
  MapPin,
  CreditCard,
  Bell,
  Gift,
  Tag,
  BookOpen,
  Settings,
  HelpCircle,
  LogOut,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { Header } from "../components/Header";
import { useAuth } from "../lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { icon: User, label: "Account Details", href: "#" },
  { icon: ShoppingBag, label: "My Orders", href: "#" },
  { icon: ShoppingCart, label: "My Cart", href: "#" },
  { icon: MapPin, label: "My Addresses", href: "#", active: true },
  { icon: CreditCard, label: "My Payments", href: "#" },
  { icon: Bell, label: "Notification Setting", href: "#" },
  { icon: Gift, label: "Refer Friends", href: "#" },
  { icon: Tag, label: "Coupons", href: "#" },
  { icon: BookOpen, label: "My Recipes", href: "#" },
  { icon: Settings, label: "Account Settings", href: "#" },
  { icon: HelpCircle, label: "Help Center", href: "#" },
];

const initialAddresses = [
  {
    id: 1,
    label: "Home",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    selected: true,
  },
  {
    id: 2,
    label: "My Grandparent's House",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    selected: false,
  },
  {
    id: 3,
    label: "Office",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    selected: false,
  },
];

export default function ProfilePage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showModal, setShowModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const [editingAddress, setEditingAddress] = useState<
    null | (typeof initialAddresses)[0]
  >(null);
  const [formData, setFormData] = useState({ label: "", address: "" });
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/logIn");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const selectAddress = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, selected: a.id === id })));
  };

  const openEdit = (addr: (typeof initialAddresses)[0]) => {
    setEditingAddress(addr);
    setFormData({ label: addr.label, address: addr.address });
    setShowModal(true);
  };

  const openAdd = () => {
    setEditingAddress(null);
    setFormData({ label: "", address: "" });
    setShowModal(true);
  };

  const saveAddress = () => {
    if (!formData.label || !formData.address) return;
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id ? { ...a, ...formData } : a,
        ),
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        {
          id: Date.now(),
          label: formData.label,
          address: formData.address,
          selected: false,
        },
      ]);
    }
    setShowModal(false);
  };

  const NavContent = ({ onClose }: { onClose?: () => void }) => (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B6349A] to-[#e07bcf] flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0">
          <p>{user?.displayName?.charAt(0) || "U"}</p>
        </div>
        <div className="min-w-0">
          <span className="font-semibold text-gray-800 text-sm block truncate">
            {user?.displayName || "User"}
          </span>
          <span className="text-xs text-gray-400 truncate block">
            {user?.email || ""}
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <a
            key={label}
            href="#"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              active
                ? "text-[#B6349A] font-semibold bg-[#f9f0f8]"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <Icon
              size={17}
              className={active ? "text-[#B6349A]" : "text-gray-400"}
            />
            {label}
          </a>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center cursor-pointer gap-3 px-3 py-2.5 mt-4 text-sm text-gray-500 hover:text-red-800 hover:bg-gray-50 rounded-xl transition-colors w-full"
      >
        <LogOut size={17} />
        Logout
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <div className="lg:hidden flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open profile menu"
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B6349A] to-[#e07bcf] flex items-center justify-center text-white font-bold text-base flex-shrink-0 active:opacity-80 transition-opacity"
        >
          {user?.displayName?.charAt(0) || "U"}
        </button>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {user?.displayName || "User"}
          </p>
          <p className="text-xs text-gray-400">{user?.email || ""}</p>
        </div>
      </div>

      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl flex flex-col p-5 transition-transform duration-300 ease-in-out overflow-y-auto
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <NavContent onClose={() => setDrawerOpen(false)} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8 flex gap-6">
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-full sticky top-6">
            <NavContent />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
            My Addresses
          </h1>

          <div className="flex flex-col gap-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => selectAddress(addr.id)}
                className={`bg-white rounded-2xl border px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between cursor-pointer transition-all ${
                  addr.selected
                    ? "border-[#B6349A] shadow-sm shadow-[#f2e7f1]"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      addr.selected ? "border-[#B6349A]" : "border-gray-300"
                    }`}
                  >
                    {addr.selected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#B6349A]" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-gray-900 font-semibold text-sm truncate">
                      {addr.label}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-0.5 line-clamp-2">
                      {addr.address}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(addr);
                  }}
                  className="flex items-center gap-1.5 text-[#B6349A] text-sm font-medium hover:opacity-75 transition-opacity flex-shrink-0 ml-3"
                >
                  <Pencil size={15} />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              </div>
            ))}

            <button
              onClick={openAdd}
              className="flex items-center gap-2 text-[#B6349A] font-semibold text-sm mt-2 hover:opacity-75 transition-opacity w-fit"
            >
              <Plus size={16} />
              Add address
            </button>
          </div>
        </main>
      </div>

   
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl p-6 sm:p-8 w-full sm:max-w-md mx-0 sm:mx-4">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                  Label
                </label>
                <input
                  value={formData.label}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, label: e.target.value }))
                  }
                  placeholder="e.g. Home, Office"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B6349A] transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">
                  Full Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="Street, City, State, ZIP"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B6349A] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveAddress}
                className="flex-1 bg-[#B6349A] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#9a2c84] transition-colors"
              >
                {editingAddress ? "Save Changes" : "Add Address"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
