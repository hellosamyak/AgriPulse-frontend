import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TrendingUp, Leaf } from "lucide-react";

/**
 * CropCard — A Bloomberg-style AI Crop Insight Card
 * Props:
 *  - crop: string (name of the crop)
 *  - confidence: number (confidence percentage)
 *  - reason: string (AI reasoning)
 */
export default function CropCard({ crop, confidence, reason }) {
  const [imageUrl, setImageUrl] = useState(null);

  // 🖼️ Fetch Unsplash image dynamically
  useEffect(() => {
    const accessKey = "CzwGufAVE59vFcNF5I79kRCGIj2XaOuaXY2JfUIUAGM"; // 🔑 Replace with your Unsplash key
    fetch(
      `https://api.unsplash.com/photos/random?query=${crop}-field&orientation=landscape&client_id=${accessKey}`
    )
      .then((res) => res.json())
      .then((data) => setImageUrl(data.urls?.small))
      .catch(() => setImageUrl(null));
  }, [crop]);

  // 🎨 Dynamic confidence color
  const getConfidenceColor = () => {
    if (confidence >= 85) return "#22c55e"; // green
    if (confidence >= 70) return "#eab308"; // amber
    return "#ef4444"; // red
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.2 }}
      className="relative bg-slate-900/60 border border-emerald-500/20 rounded-2xl overflow-hidden 
                 hover:scale-[1.03] hover:border-emerald-500/40 transition-all duration-300 
                 shadow-lg hover:shadow-emerald-500/20 backdrop-blur-sm"
    >
      {/* 🌾 Crop Image */}
      <div className="relative h-40 w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={crop}
            className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-300"
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-slate-800 text-slate-500">
            🌾 Loading image...
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent"></div>
        <h3 className="absolute bottom-3 left-4 text-xl font-semibold text-emerald-400 capitalize tracking-wide">
          {crop}
        </h3>
      </div>

      {/* 📈 Crop Details */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" />
            <span className="text-slate-400 text-sm uppercase">
              Confidence Level
            </span>
          </div>
          <div className="w-14 h-14">
            <CircularProgressbar
              value={confidence}
              text={`${confidence}%`}
              styles={buildStyles({
                textColor: getConfidenceColor(),
                pathColor: getConfidenceColor(),
                trailColor: "#1e293b",
                textSize: "32px",
              })}
            />
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-3">
          <p className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
            <Leaf size={16} className="text-emerald-400 mt-0.5" />
            {reason}
          </p>
        </div>
      </div>

      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent rounded-2xl pointer-events-none"></div>
    </motion.div>
  );
}
