"use client";
import Link from 'next/link';
import Menu from "./Menu";
import { shopMenu } from "@/data/menu";
import Userinfo from "./auth/Userinfo";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);


      if (user.user_type === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, []);
  const { cart, totalItems } = useCart();
  return (
    <header className="bg-black text-white px-5 py-3 shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <h1 className="text-lg font-bold hover:text-sky-400 transition-colors cursor-pointer">
              VNH Shop
            </h1>
          </Link>
          <Menu items={shopMenu} />
        </div>
        <div className="flex items-center gap-3">
          {/* Nút Quản trị hiện ra khi tài khoản là admin */}
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden md:block rounded-md bg-blue-600 px-3 py-1 text-sm font-medium hover:bg-blue-700 transition"
            >
              Quản trị
            </Link>
          )}
          <Link href="/cart">
            <div className="cart-icon rounded-md bg-slate-800 px-3 py-1 text-sm font-medium cursor-pointer hover:bg-slate-700">
              🛒{totalItems}
            </div>
          </Link>
          <Userinfo />
        </div>

      </div>
    </header>
  );
}