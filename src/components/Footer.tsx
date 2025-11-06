import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Please enter your email.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);
      if (error) throw error;
      toast({ title: "Subscribed!", description: "Thanks for joining our community 💌" });
      setEmail("");
    } catch {
      toast({ title: "Error", description: "Failed to subscribe. Try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white border-t border-white/10 mt-24 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05),_transparent_60%)] animate-pulse" />

      <div className="relative container mx-auto px-6 py-16 space-y-12">
        {/* Top CTA */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
          <div>
            <h2 className="text-2xl font-bold tracking-wide text-white mb-1">Join IndiCartz Community 💫</h2>
            <p className="text-white/70 text-sm">Subscribe for exclusive deals, offers & new launches.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-primary font-semibold hover:bg-white/90 transition-all"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
              IndiCartz
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-5">
              Your one-stop destination for style, tech & essentials — made in India, for India 🇮🇳
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook />, href: "https://facebook.com/indicartz" },
                { icon: <Instagram />, href: "https://instagram.com/indicartz" },
                { icon: <Linkedin />, href: "https://linkedin.com/company/indicartz" },
                { icon: <Youtube />, href: "https://youtube.com/@indicartz" },
                { icon: <MessageCircle />, href: "https://wa.me/919088248081" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Shop Now</Link></li>
              <li><Link to="/top-deals" className="hover:text-white transition">Top Deals</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Our Blog</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition">Track Order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold text-white mb-4">Policies</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><Link to="/return-policy" className="hover:text-white transition">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms-and-services" className="hover:text-white transition">Terms of Use</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@indicartz.in</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 9088248081</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Kalyani, West Bengal</li>
            </ul>
          </div>

          {/* Seller Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Sell on IndiCartz</h4>
            <p className="text-white/80 text-sm mb-3">Start your online journey today 🚀</p>
            <Link
              to="/seller-registration"
              className="block bg-white text-primary font-semibold rounded-lg px-4 py-2 text-center hover:bg-white/90 transition"
            >
              Become a Seller
            </Link>
            <Link
              to="/seller-login"
              className="block mt-2 text-white/80 text-sm text-center hover:text-white transition"
            >
              Seller Login →
            </Link>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/70">
          © {new Date().getFullYear()} IndiCartz Pvt. Ltd. — Crafted with ❤️ in India.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
