import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  image: string;
  actualPrice?: number;
  sellingPrice?: number;
  price?: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product?: Product;
  id?: number;
  name?: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  isNew?: boolean;
}

const ProductCard = (props: ProductCardProps) => {
  const product: any = props.product || props;
  const id = product.id!;
  const name = product.name!;
  const image = product.image!;
  const price = product.price || product.sellingPrice || 0;
  const originalPrice = product.originalPrice || product.actualPrice || price;
  const discount =
    product.discount ||
    (originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);
  const rating = product.rating || 0;
  const isNew = product.isNew;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, quantity: 1, image });
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted
        ? `${name} has been removed from your wishlist.`
        : `${name} has been added to your wishlist.`,
    });
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-transparent hover:border-accent/40 animate-fade-in">
      {/* Image Section */}
      <div
        className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/40"
        onClick={() => navigate(`/product/${id}`)}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Badges */}
        {isNew && (
          <Badge className="absolute left-2 top-2 bg-accent text-white shadow-md">
            NEW
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="absolute right-2 top-2 bg-destructive text-white shadow-md">
            -{discount}%
          </Badge>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full hover:scale-110 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleWishlist();
            }}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full hover:scale-110 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${id}`);
            }}
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4">
        <h3
          className="mb-2 font-medium text-sm sm:text-base line-clamp-2"
          title={name}
        >
          {name}
        </h3>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-[13px] sm:text-sm ${
                  i < rating ? "text-yellow-400" : "text-muted-foreground"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({rating})</span>
        </div>

        {/* Price */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {originalPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
