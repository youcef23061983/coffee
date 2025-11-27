import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface Brand {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
}

interface CoffeeProduct {
  id: string;
  name: string;
  in_stock?: boolean;
}

interface EquipmentProduct {
  id: string;
  name: string;
  in_stock?: boolean;
}

interface AdvancedQRCodeGeneratorProps {
  brand: Brand;
  coffeeProducts: CoffeeProduct[];
  equipmentProducts: EquipmentProduct[];
}

export default function AdvancedQRCodeGenerator({
  brand,
  coffeeProducts,
  equipmentProducts,
}: AdvancedQRCodeGeneratorProps) {
  const [showQR, setShowQR] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "all" | "coffee" | "equipment"
  >("all");

  // Check if Web Share API is supported and callable
  const canShare = () => {
    return navigator.share && typeof navigator.share === "function";
  };

  const generateQRUrl = () => {
    const baseUrl = window.location.origin;

    const brandNameForUTM = brand.name.toLowerCase().replace(/\s+/g, "_");

    // Choose ONE of these campaign names:

    const campaignName = "brewtopia_brand_qr";

    switch (selectedTab) {
      case "coffee":
        return `${baseUrl}/${brand.id}?tab=coffee&utm_source=qr&utm_medium=qr_code&utm_campaign=${campaignName}&utm_content=${brandNameForUTM}_coffee`;
      case "equipment":
        return `${baseUrl}/${brand.id}?tab=equipment&utm_source=qr&utm_medium=qr_code&utm_campaign=${campaignName}&utm_content=${brandNameForUTM}_equipment`;
      default:
        return `${baseUrl}/${brand.id}?utm_source=qr&utm_medium=qr_code&utm_campaign=${campaignName}&utm_content=${brandNameForUTM}_all`;
    }
  };

  // Clean URL for display (without UTM parameters)
  const getDisplayUrl = () => {
    const baseUrl = window.location.origin;

    switch (selectedTab) {
      case "coffee":
        return `${baseUrl}/${brand.id}?tab=coffee`;
      case "equipment":
        return `${baseUrl}/${brand.id}?tab=equipment`;
      default:
        return `${baseUrl}/${brand.id}`;
    }
  };

  const coffeeCount = coffeeProducts.filter((p) => p.in_stock !== false).length;
  const equipmentCount = equipmentProducts.filter(
    (p) => p.in_stock !== false
  ).length;

  const handleShare = async () => {
    const shareUrl = generateQRUrl();

    if (canShare()) {
      try {
        await navigator.share({
          title: `Shop ${brand.name} on BrewTopia`,
          text: `Discover ${brand.name}'s premium ${selectedTab} collection`,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowQR(!showQR)}
        className="flex items-center gap-2 px-4 py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg"
      >
        {/* QR Code SVG Icon */}
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4z" />
          <path d="M19 19h2v2h-2zM15 15h2v2h-2zM15 19h2v2h-2zM19 15h2v2h-2z" />
        </svg>
        <span className="font-semibold">{brand.name} QR Code</span>
      </button>
      {showQR && (
        <div className="absolute top-full right-0 mt-3 bg-white p-6 rounded-2xl shadow-2xl border z-50 min-w-96">
          <div className="text-center">
            <h3 className="font-bold text-gray-900 text-lg mb-4">
              Share {brand.name}
            </h3>

            <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
              {[
                {
                  key: "all" as const,
                  label: "All",
                  count: coffeeCount + equipmentCount,
                },
                { key: "coffee" as const, label: "Coffee", count: coffeeCount },
                {
                  key: "equipment" as const,
                  label: "Equipment",
                  count: equipmentCount,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === tab.key
                      ? "bg-white text-[#8B4513] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="bg-white p-4 rounded-xl border-2 border-amber-100 mb-4 inline-block">
              <QRCodeSVG
                value={generateQRUrl()}
                size={180}
                bgColor="#ffffff"
                fgColor="#8B4513"
                level="H"
              />
            </div>

            <p className="text-sm text-gray-600 mb-2">
              Scan for {selectedTab} collection
            </p>

            <p className="text-xs text-gray-500 mb-4 break-all">
              {getDisplayUrl()}
            </p>

            <div className="flex gap-2 justify-center">
              <button
                onClick={handleShare}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                {canShare() ? "Share Link" : "Copy Link"}
              </button>
              <button
                onClick={() => setShowQR(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              📊 Includes analytics to improve your experience
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
