import {
  User,
  UserRound,
  Footprints,
  Smartphone,
  Home,
  Watch,
  BookOpen,
  Utensils,
  Shirt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const categories = [
  { id: 1, name: "Men", icon: User, color: "from-slate-600 to-slate-800" },
  { id: 2, name: "Women", icon: UserRound, color: "from-rose-400 to-pink-600" },
  { id: 3, name: "Shoes", icon: Footprints, color: "from-amber-600 to-orange-700" },
  { id: 4, name: "Electronics", icon: Smartphone, color: "from-blue-500 to-cyan-500" },
  { id: 5, name: "Fashion", icon: Shirt, color: "from-pink-500 to-rose-500" },
  { id: 6, name: "Home & Living", icon: Home, color: "from-green-500 to-emerald-500" },
  { id: 7, name: "Watches", icon: Watch, color: "from-purple-500 to-violet-500" },
  { id: 8, name: "Books", icon: BookOpen, color: "from-orange-500 to-amber-500" },
  { id: 9, name: "Grocery", icon: Utensils, color: "from-red-500 to-pink-500" },
];

const CategoryScroll = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4 sm:py-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-3 sm:px-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 px-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Shop by Category
        </h2>

        {/* Scroll container */}
        <div
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                onClick={() => navigate(`/products?category=${category.name}`)}
                className="flex-shrink-0 snap-start w-24 sm:w-32 cursor-pointer hover:shadow-xl transition-transform hover:-translate-y-1 hover:scale-105 overflow-hidden group border border-transparent hover:border-accent/30"
              >
                <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 text-center py-3 sm:py-4 relative">
                  {/* Background hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-300" />

                  {/* Icon */}
                  <div
                    className={`bg-gradient-to-br ${category.color} p-2.5 sm:p-4 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg relative z-10`}
                  >
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>

                  {/* Label */}
                  <span className="text-[11px] sm:text-xs font-medium px-1 leading-tight text-foreground/80 group-hover:text-accent transition-colors relative z-10">
                    {category.name}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryScroll;
