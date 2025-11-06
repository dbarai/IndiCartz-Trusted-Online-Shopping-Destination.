import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { useNavigate } from "react-router-dom";

interface ProductSectionProps {
  title: string;
  products: any[];
  categoryLink?: string;
}

const ProductSection = ({ title, products, categoryLink }: ProductSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-10 sm:py-12 bg-gradient-to-b from-background to-muted/30 animate-fade-in">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3 animate-slide-in-right">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-sm">
            {title}
          </h2>
          <button
            onClick={() =>
              navigate(categoryLink || "/products")
            }
            className="text-sm sm:text-base font-medium text-primary hover:text-accent hover:underline hover:scale-105 transition-all group"
          >
            View All
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-bounce-in"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Empty State (Fallback) */}
        {products.length === 0 && (
          <div className="text-center py-10 text-muted-foreground animate-fade-in">
            <p className="text-sm sm:text-base">
              No products available in this section.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;

/* Featured Products */
export const featuredProducts = products.slice(0, 10).map((p) => ({
  id: p.id,
  name: p.name,
  image: p.image,
  price: p.sellingPrice,
  originalPrice: p.actualPrice,
  rating: p.rating,
  reviews: p.reviews,
  category: p.category,
  isNew: p.id <= 5,
}));

/* New Arrivals */
export const newArrivals = products.slice(10, 20).map((p) => ({
  id: p.id,
  name: p.name,
  image: p.image,
  price: p.sellingPrice,
  originalPrice: p.actualPrice,
  rating: p.rating,
  reviews: p.reviews,
  category: p.category,
  isNew: true,
}));
