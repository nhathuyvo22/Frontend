import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { CartProvider } from "@/context/CartContext";

export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      <Header />
      <main className="min-h-[calc(100vh-6rem)] bg-white text-slate-800">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
