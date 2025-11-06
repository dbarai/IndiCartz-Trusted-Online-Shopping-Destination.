import { useCallback, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Locate, MapPin } from "lucide-react";
import clsx from "clsx";

interface DeliveryLocationProps {
  className?: string;
}

type Mode = "gps" | "pin";

const DeliveryLocation = ({ className }: DeliveryLocationProps) => {
  const [mode, setMode] = useState<Mode>("gps");
  const [inputValue, setInputValue] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Composes a readable display string from Nominatim/IndiaPost data
  const composeDisplay = useCallback((address: any) => {
    const pincode = address?.postcode || "";
    const area =
      address?.suburb ||
      address?.city_district ||
      address?.city ||
      address?.town ||
      address?.village ||
      "";
    const state = address?.state || "";
    const parts = [pincode, area, state].filter(Boolean);
    return parts.join(", ") || "Location detected";
  }, []);

  // ✅ Handle GPS-based location detection
  const handleDetectGPS = useCallback(() => {
    setError("");
    setLoading(true);
    setInputValue("Detecting...");

    if (!navigator.geolocation) {
      setLoading(false);
      setInputValue("");
      setError("GPS not supported. Please enter your PIN code.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&accept-language=en`;
          const response = await fetch(url, {
            headers: { "User-Agent": "IndiCartz/1.0" },
          });
          if (!response.ok) throw new Error("Failed to fetch location");
          const data = await response.json();
          setDisplayLocation(composeDisplay(data.address));
          setInputValue("");
        } catch (e) {
          console.error("Location detection error:", e);
          setError("Unable to detect location. Please try again or enter PIN code.");
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        console.error("Geolocation error:", geoError);
        let msg = "Unable to detect location.";
        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            msg = "Location permission denied. Please allow access or enter PIN code.";
            break;
          case geoError.POSITION_UNAVAILABLE:
            msg = "Location unavailable. Please try again or enter PIN code.";
            break;
          case geoError.TIMEOUT:
            msg = "Location timeout. Please try again or enter PIN code.";
            break;
        }
        setLoading(false);
        setError(msg);
        setInputValue("");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, [composeDisplay]);

  // ✅ Handle PIN-based lookup
  const resolvePin = useCallback(
    async (pin: string) => {
      setError("");
      const clean = pin.replace(/\D/g, "").slice(0, 6);
      if (clean.length !== 6) {
        setError("Please enter a valid 6-digit PIN code.");
        return;
      }

      setLoading(true);
      try {
        const indiaPostUrl = `https://api.postalpincode.in/pincode/${clean}`;
        const indiaPostResponse = await fetch(indiaPostUrl);
        const indiaPostData = await indiaPostResponse.json();

        if (
          indiaPostData?.[0]?.Status === "Success" &&
          indiaPostData[0]?.PostOffice?.length
        ) {
          const postOffice = indiaPostData[0].PostOffice[0];
          const display = [clean, postOffice.District, postOffice.State]
            .filter(Boolean)
            .join(", ");
          setDisplayLocation(display);
        } else {
          // Fallback to Nominatim if IndiaPost fails
          const url = `https://nominatim.openstreetmap.org/search?postalcode=${clean}&country=India&format=json&addressdetails=1&limit=1`;
          const response = await fetch(url, {
            headers: { "User-Agent": "IndiCartz/1.0" },
          });
          if (!response.ok) throw new Error("Failed to fetch by PIN");
          const data = await response.json();

          if (!data?.length) {
            setError("We couldn't find this PIN. Please check and try again.");
          } else {
            setDisplayLocation(composeDisplay(data[0].address));
          }
        }
      } catch (e) {
        console.error("PIN lookup error:", e);
        setError("Unable to find address for this PIN. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [composeDisplay]
  );

  const modeLabel = useMemo(
    () => (mode === "gps" ? "Use GPS" : "Enter PIN"),
    [mode]
  );

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-md px-3 py-2 h-10">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-white/90 text-xs hover:scale-105 transition">
            {modeLabel} <ChevronDown className="h-3 w-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setMode("gps")}>Use GPS</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMode("pin")}>Enter PIN code</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {mode === "pin" ? (
          <Input
            placeholder="Enter PIN code"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            onKeyDown={(e) => e.key === "Enter" && resolvePin(inputValue)}
            className="bg-transparent border-none h-6 text-white placeholder:text-white/70 text-sm p-0 focus-visible:ring-0 flex-1"
          />
        ) : (
          <Input
            placeholder="Use GPS to detect location"
            value={loading ? "Detecting..." : ""}
            readOnly
            className="bg-transparent border-none h-6 text-white placeholder:text-white/70 text-sm p-0 focus-visible:ring-0 flex-1"
          />
        )}

        <Button
          size="icon"
          variant="ghost"
          disabled={loading}
          className="h-6 w-6 hover:bg-white/20 flex-shrink-0"
          onClick={() =>
            mode === "pin" ? resolvePin(inputValue) : handleDetectGPS()
          }
          title={
            mode === "pin"
              ? "Find by PIN code"
              : "Detect delivery location"
          }
        >
          {mode === "pin" ? (
            <MapPin className="h-3 w-3 text-white" />
          ) : (
            <Locate className="h-3 w-3 text-white" />
          )}
        </Button>
      </div>

      {displayLocation && (
        <p className="text-xs text-white/90 px-3">
          Delivery Location: {displayLocation}
        </p>
      )}

      {error && (
        <p className="text-[11px] text-red-200 px-3">{error}</p>
      )}
    </div>
  );
};

export default DeliveryLocation;
