import { Home, Heart, Tag, Truck, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "wishlist", label: "Wishlist", icon: Heart, path: "/wishlist" },
  { id: "offers", label: "Offers", icon: Tag, path: "/offers" },
  { id: "track", label: "Track", icon: Truck, path: "/track-order" },
  { id: "orders", label: "Orders", icon: Package, path: "/my-orders" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/20 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 backdrop-blur-md shadow-2xl md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={clsx(
                "flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 relative group",
                isActive
                  ? "text-white scale-110 bg-white/15 shadow-lg"
                  : "text-white/70 hover:text-white hover:scale-105 hover:bg-white/10"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Active indicator glow */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white rounded-full animate-pulse" />
              )}

              {/* Icon */}
              <Icon
                className={clsx(
                  "h-5 w-5 transition-all duration-300",
                  isActive && "animate-float"
                )}
              />

              {/* Label */}
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
