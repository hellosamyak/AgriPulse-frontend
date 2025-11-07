import { useState, useEffect } from "react";
import api from "../api/axios";
import CropCard from "../components/CropCard";
import {
  CloudSun,
  Droplets,
  TrendingUp,
  Newspaper,
  Sparkles,
  Wind,
  Sunrise,
  Sunset,
  CalendarDays,
  MapPin,
  Search,
  Loader2,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Bhopal");
  const [inputCity, setInputCity] = useState("Bhopal");

  // Fetch dashboard data
  const fetchDashboard = async (location) => {
    setLoading(true);
    try {
      const res = await api.get(`/dashboard?location=${location}`);
      setData(res.data);
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard(city);
  }, []);

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (!inputCity.trim()) return;
    setCity(inputCity.trim());
    fetchDashboard(inputCity.trim());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2
            size={48}
            className="text-sky-400 animate-spin mx-auto mb-4"
          />
          <p className="text-slate-400 text-lg">Fetching data for {city}...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const current = data?.weather?.current || {};
  const forecast = data?.weather?.forecast || [];
  const astro = data?.weather?.astro || {};
  const aiSummary = data?.ai_summary || "";
  const marketData = data?.market_prices || [];
  const news = data?.news || [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/25">
              <CloudSun size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100">
                AgriPulse Dashboard
              </h1>
              <p className="text-slate-400 text-sm">
                Real-time agriculture insights for{" "}
                <span className="text-sky-400">{city}</span>
              </p>
            </div>
          </div>

          {/* City Selector */}
          <form
            onSubmit={handleCitySubmit}
            className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2 focus-within:border-sky-500/50 transition-all duration-300"
          >
            <MapPin size={18} className="text-sky-400" />
            <input
              type="text"
              placeholder="Enter city (e.g. Delhi)"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="bg-transparent text-slate-200 placeholder-slate-500 outline-none w-40 sm:w-56"
            />
            <button
              type="submit"
              className="bg-sky-500/20 hover:bg-sky-600/30 border border-sky-500/30 rounded-lg p-2 transition-all duration-300"
              title="Search"
            >
              <Search size={16} className="text-sky-400" />
            </button>
          </form>
        </div>
      </div>

      {/* AI Summary */}
      <div className="mb-6 bg-linear-to-br from-sky-500/10 to-blue-600/10 backdrop-blur-sm border border-sky-500/20 rounded-2xl p-6 hover:border-sky-500/30 transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/25">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-400 mb-2">AI Advisory Summary</p>
            <p className="text-slate-200 leading-relaxed whitespace-pre-line">
              {aiSummary}
            </p>
          </div>
        </div>
      </div>

      {/* 🌾 AI Recommendations Panel */}
      {Array.isArray(data.ai_crop_insights) &&
        data.ai_crop_insights.length > 0 && (
          <div className="mt-10 bg-linear-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Sparkles size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-100">
                AI Crop Recommendations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.ai_crop_insights.map((item, idx) => (
                <CropCard
                  key={idx}
                  crop={item.crop}
                  confidence={item.confidence}
                  reason={item.reason}
                />
              ))}
            </div>
          </div>
        )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weather Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center gap-2 mb-6">
            <CloudSun size={20} className="text-sky-400" />
            <h2 className="text-lg font-semibold text-slate-200">
              Current Weather
            </h2>
          </div>

          {/* Current Conditions */}
          <div className="bg-linear-to-br from-sky-500/10 to-blue-600/10 rounded-xl p-5 border border-sky-500/20 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {current.icon && (
                  <img
                    src={current.icon}
                    alt="Weather Icon"
                    className="w-14 h-14"
                  />
                )}
                <div>
                  <p className="text-4xl font-bold text-slate-100">
                    {current.temp_c ?? "--"}°C
                  </p>
                  <p className="text-sm text-slate-400">
                    {current.condition || "N/A"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-2">
                  <Droplets size={18} className="text-sky-400" />
                  <span className="text-2xl font-bold text-sky-400">
                    {current.humidity ?? "--"}%
                  </span>
                </div>
                <p className="text-sm text-slate-400">Humidity</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 text-slate-400 text-sm">
              <div className="flex items-center gap-1">
                <Wind size={16} />
                <span>{current.wind_kph ?? "--"} km/h wind</span>
              </div>
              <div className="flex items-center gap-1">
                <Sunrise size={16} />
                <span>{astro.sunrise || "--"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Sunset size={16} />
                <span>{astro.sunset || "--"}</span>
              </div>
            </div>
          </div>

          {/* Forecast Carousel */}
          <div className="relative overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-2">
              {forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30 min-w-40 hover:border-sky-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays size={16} className="text-sky-400" />
                    <p className="text-sm text-slate-400">
                      {new Date(day.date).toLocaleDateString("en-IN", {
                        weekday: "short",
                      })}
                    </p>
                  </div>
                  <img
                    src={day.icon}
                    alt="icon"
                    className="w-10 h-10 mx-auto mb-2"
                  />
                  <p className="text-center text-lg font-semibold text-slate-200">
                    {day.avgtemp_c}°C
                  </p>
                  <p className="text-center text-slate-400 text-sm">
                    {day.condition}
                  </p>
                  <p className="text-center text-sky-400 text-xs mt-1">
                    Rain {day.daily_chance_of_rain}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Prices Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-emerald-400" />
            <h2 className="text-lg font-semibold text-slate-200">
              Market Price Distribution
            </h2>
          </div>

          {marketData.length === 0 ? (
            <p className="text-slate-500 text-sm text-center">
              No market data available for {city}.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={marketData.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="market" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="min_price" fill="#ef4444" name="Min Price" />
                <Bar dataKey="modal_price" fill="#22c55e" name="Modal Price" />
                <Bar dataKey="max_price" fill="#eab308" name="Max Price" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="bg-linear-to-br from-emerald-500/10 to-teal-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-300 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-emerald-400 mb-2">AI Crop Insight</p>
            <p className="text-slate-200 leading-relaxed whitespace-pre-line">
              {data.ai_crop_insight || "AI insight not available right now."}
            </p>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300">
        <div className="flex items-center gap-2 mb-6">
          <Newspaper size={20} className="text-violet-400" />
          <h2 className="text-lg font-semibold text-slate-200">
            Agriculture News
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((n, idx) => (
            <div
              key={idx}
              className="group p-5 bg-slate-900/50 rounded-xl border border-slate-700/30 hover:border-violet-500/30 hover:bg-slate-900/70 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-linear-to-br from-violet-500/20 to-purple-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <Newspaper size={16} className="text-violet-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-200 leading-snug group-hover:text-violet-400 transition-colors duration-300">
                  {n.headline}
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed ml-11">
                {n.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
