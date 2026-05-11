import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(p => (
                <ProductCard key={p.product_id} product={p} />
            ))}
        </div>
    );
}