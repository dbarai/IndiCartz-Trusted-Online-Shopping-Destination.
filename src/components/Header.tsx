import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/indicartz-logo.png";
import DeliveryLocation from "@/components/DeliveryLocation";

const Header = () => {
  const { cartCount } = useCart();
  const [wishlistCount] = useState(3);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Footwear",
    "Books",
    "Watches",
    "Grocery",
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-orange-800 via-orange-700 to-orange-800 shadow-lg border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-4">
        {/* Top Row */}
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img
              src={logo}
              alt="IndiCartz Logo"
              className="h-10 sm:h-12 w-auto drop-shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                IndiCartz
              </h1>
              <p className="text-xs text-white/80 tracking-wide">
                Your Trusted Shopping Destination
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className="text-white hover:text-yellow-100 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-yellow-100 transition-colors"
            >
              About
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-yellow-100 transition-colors">
                Products <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => navigate(`/products?category=${category}`)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => navigate("/products")}>
                  View All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/blog"
              className="text-white hover:text-yellow-100 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/top-deals"
              className="text-white hover:text-yellow-100 transition-colors"
            >
              Top Deals
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Wishlist"
              className="relative hidden md:flex hover:bg-white/10"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="h-5 w-5 text-white" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-1 -top-1 bg-yellow-300 text-orange-800 rounded-full text-xs h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account"
              className="hover:bg-white/10"
              onClick={() => navigate("/account")}
            >
              <User className="h-5 w-5 text-white" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative hover:bg-white/10"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5 text-white" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 bg-yellow-300 text-orange-800 rounded-full text-xs h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              className="lg:hidden hover:bg-white/10"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Search & Delivery */}
        <div className="flex flex-col sm:flex-row items-center gap-2 py-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search for products, brands..."
              className="pl-10 h-10 bg-white/95 rounded-md border border-white/30"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Search className="h-4 w-4 text-orange-700" />
            </Button>
          </div>
          <DeliveryLocation className="flex-1" />
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden bg-orange-900/95 rounded-md shadow-md border-t border-white/10 p-3 mt-2 animate-fade-in">
            <Link
              to="/"
              onClick={() => setShowMobileMenu(false)}
              className="block py-2 text-white hover:text-yellow-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setShowMobileMenu(false)}
              className="block py-2 text-white hover:text-yellow-200"
            >
              About
            </Link>

            <Accordion type="single" collapsible>
              <AccordionItem value="products">
                <AccordionTrigger className="py-2 text-white">
                  Products
                </AccordionTrigger>
                <AccordionContent>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        navigate(`/products?category=${category}`);
                        setShowMobileMenu(false);
                      }}
                      className="block w-full text-left py-1 text-white/90 hover:text-yellow-200 text-sm"
                    >
                      {category}
                    </button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              to="/blog"
              onClick={() => setShowMobileMenu(false)}
              className="block py-2 text-white hover:text-yellow-200"
            >
              Blog
            </Link>
            <Link
              to="/top-deals"
              onClick={() => setShowMobileMenu(false)}
              className="block py-2 text-white hover:text-yellow-200"
            >
              Top Deals
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
