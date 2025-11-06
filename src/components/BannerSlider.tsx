import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";
import banner4 from "@/assets/banner-4.jpg";
import banner5 from "@/assets/banner-5.jpg";

const banners = [
  {
    id: 1,
    image: banner1,
    title: "Summer Sale",
    subtitle: "Up to 50% Off",
    link: "/products?category=Fashion",
  },
  {
    id: 2,
    image: banner2,
    title: "New Arrivals",
    subtitle: "Explore Latest Collection",
    link: "/products",
  },
  {
    id: 3,
    image: banner3,
    title: "Premium Electronics",
    subtitle: "Latest Tech at Best Prices",
    link: "/products?category=Electronics",
  },
  {
    id: 4,
    image: banner4,
    title: "Fashion Sale",
    subtitle: "Exclusive Deals on Fashion",
    link: "/products?category=Fashion",
  },
  {
    id: 5,
    image: banner5,
    title: "Home & Living",
    subtitle: "Transform Your Space",
    link: "/products?category=Home%20%26%20Living",
  },
];

const BannerSlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  return (
    <section className="relative w-full h-[220px] sm:h-[280px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-xl">
      {/* Slider track */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
              draggable="false"
            />
            {/* Overlay + Text */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-lg text-white animate-fade-in">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-sm sm:text-lg mb-4 sm:mb-6 opacity-90 drop-shadow-md">
                    {banner.subtitle}
                  </p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/80 hover:to-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => navigate(banner.link)}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 sm:p-3 shadow-lg transition-transform hover:scale-110"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 sm:p-3 shadow-lg transition-transform hover:scale-110"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "bg-white w-6 sm:w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
