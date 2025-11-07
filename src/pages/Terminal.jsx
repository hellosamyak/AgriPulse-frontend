// src/pages/Terminal.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  TrendingUp,
  TrendingDown,
  Loader2,
  BarChart3,
  Sparkles,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

export default function Terminal() {
  const [commodity, setCommodity] = useState("wheat");
  const [input, setInput] = useState("wheat");
  const [city, setCity] = useState("Indore");
  const [inputCity, setInputCity] = useState("Indore");
  const [harvestDays, setHarvestDays] = useState(53);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (
    commodityName,
    harvest_days = harvestDays,
    location = city
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(
        `/terminal?commodity=${encodeURIComponent(
          commodityName
        )}&harvest_days=${harvest_days}&location=${encodeURIComponent(
          location
        )}`
      );
      setData(res.data);
    } catch (err) {
      console.error("Terminal Error:", err);
      setError(
        err?.response?.data?.detail || err.message || "Failed to fetch data"
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(commodity, harvestDays, city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCommodity(input.trim().toLowerCase());
      fetchData(input.trim().toLowerCase(), harvestDays, city);
    }
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (!inputCity.trim()) return;
    setCity(inputCity.trim());
    fetchData(commodity, harvestDays, inputCity.trim());
  };

  const handleGenerate = () => {
    fetchData(commodity, harvestDays, city);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2
            size={48}
            className="text-emerald-400 animate-spin mx-auto mb-4"
          />
          <p className="text-slate-400 text-lg">
            Generating terminal insights...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="p-4 bg-rose-900/20 border border-rose-500/20 rounded-xl text-rose-200">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    summary,
    market_data,
    price_forecast,
    recommendation,
    yield_outlook,
    price_forecast_comment,
    market_sentiment,
    optimal_market,
    ai_summary,
    ai_reason,
    location,
  } = data;

  // fallback arrays
  const sellHigh = (optimal_market?.sell_high || []).slice(0, 6);
  const buyLow = (optimal_market?.buy_low || []).slice(0, 6);

  const recAction = (recommendation?.action || "HOLD").toUpperCase();
  const recConfidence = recommendation?.confidence ?? 72;
  const recReason =
    recommendation?.reason || ai_reason || ai_summary || "No reason provided.";

  const recColor =
    recAction === "BUY" ? "emerald" : recAction === "SELL" ? "rose" : "amber";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">
              AgriPulse Decision Engine
            </h1>
            <p className="text-slate-400 text-sm">
              Commodity Terminal — {summary?.commodity} • {location}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2"
          >
            <Search size={18} className="text-emerald-400" />
            <input
              type="text"
              placeholder="commodity (e.g. wheat)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent text-slate-200 placeholder-slate-500 outline-none w-36"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition"
            >
              <Sparkles size={16} className="text-emerald-400" />
            </button>
          </form>

          <form
            onSubmit={handleCitySubmit}
            className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2"
          >
            <input
              type="text"
              placeholder="city (e.g. Indore)"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="bg-transparent text-slate-200 placeholder-slate-500 outline-none w-32"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-sky-500/10 rounded-lg hover:bg-sky-500/20 text-sky-300"
            >
              Set City
            </button>
          </form>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl">
            <div className="text-sm text-slate-400 mr-3">Harvest ready in</div>
            <input
              type="range"
              min={0}
              max={120}
              value={harvestDays}
              onChange={(e) => setHarvestDays(Number(e.target.value))}
              className="w-36"
            />
            <div className="text-slate-200 text-sm ml-3 w-12 text-right">
              {harvestDays}d
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-medium"
          >
            Generate Analysis
          </button>
        </div>
      </div>

      {/* Recommendation Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-6 p-5 rounded-2xl border ${
          recAction === "BUY"
            ? "border-emerald-400 bg-emerald-500/6"
            : recAction === "SELL"
            ? "border-rose-400 bg-rose-500/6"
            : "border-amber-400 bg-amber-500/6"
        } flex items-center justify-between`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-md ${
              recAction === "BUY"
                ? "bg-emerald-500/20"
                : recAction === "SELL"
                ? "bg-rose-500/20"
                : "bg-amber-500/20"
            }`}
          >
            <div className="text-slate-100 font-bold text-xl">{recAction}</div>
            <div className="text-xs text-slate-400">Recommendation</div>
          </div>
          <div>
            <div className="text-slate-200 font-semibold text-lg">
              {summary?.commodity} — {summary?.average_price} Rs/qt (avg)
            </div>
            <div className="text-slate-400 text-sm mt-1">{recReason}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div style={{ width: 72, height: 72 }}>
            <CircularProgressbar
              value={recConfidence}
              text={`${recConfidence}%`}
              styles={buildStyles({
                textColor:
                  recAction === "BUY"
                    ? "#22c55e"
                    : recAction === "SELL"
                    ? "#ef4444"
                    : "#f59e0b",
                pathColor:
                  recAction === "BUY"
                    ? "#22c55e"
                    : recAction === "SELL"
                    ? "#ef4444"
                    : "#f59e0b",
                trailColor: "#0f1724",
              })}
            />
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Confidence</div>
            <div className="text-slate-200 font-semibold">{recConfidence}%</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Yield Outlook */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-emerald-400" />
            <h4 className="text-lg font-semibold text-slate-200">
              Nation-wide Yield Outlook
            </h4>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-100">
              {yield_outlook?.change_percent || "—"}
            </div>
            <p className="text-slate-400 text-sm mt-2">
              {yield_outlook?.factors?.join(", ") ||
                "No major factors detected."}
            </p>
            <div className="mt-4 text-xs text-slate-400">
              {ai_summary || price_forecast_comment}
            </div>
          </div>
        </div>

        {/* Price Forecast chart */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-sky-400" />
              <h4 className="text-lg font-semibold text-slate-200">
                Price Forecast (7 days)
              </h4>
            </div>
            <div className="text-xs text-slate-400">
              {price_forecast_comment || "Model: simple trend"}
            </div>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={price_forecast}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f1724",
                    border: "1px solid #334155",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="forecast_price"
                  stroke="#34d399"
                  strokeWidth={3}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Market Sentiment */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-sky-400" />
            <h4 className="text-lg font-semibold text-slate-200">
              Market Sentiment
            </h4>
          </div>
          <div>
            <div className="text-slate-200 font-semibold capitalize">
              {market_sentiment?.overall || "neutral"}
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Keywords: {(market_sentiment?.keywords || []).join(", ") || "—"}
            </div>
            <div className="mt-4 text-sm text-slate-400">
              {ai_reason || ai_summary}
            </div>
          </div>
        </div>

        {/* Optimal Market - Sell High */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpRight size={18} className="text-emerald-400" />
            <h4 className="text-lg font-semibold text-slate-200">
              Optimal Markets — Sell High
            </h4>
          </div>
          <div className="space-y-2">
            {sellHigh.length === 0 && (
              <div className="text-slate-400 text-sm">No data</div>
            )}
            {sellHigh.map((m, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700/30"
              >
                <div>
                  <div className="text-slate-200 font-medium">{m.market}</div>
                  <div className="text-xs text-slate-500">{m.state}</div>
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <IndianRupee size={14} />
                  <div className="font-semibold">{m.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimal Market - Buy Low */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <ArrowDownRight size={18} className="text-rose-400" />
            <h4 className="text-lg font-semibold text-slate-200">
              Optimal Markets — Buy Low
            </h4>
          </div>
          <div className="space-y-2">
            {buyLow.length === 0 && (
              <div className="text-slate-400 text-sm">No data</div>
            )}
            {buyLow.map((m, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-700/30"
              >
                <div>
                  <div className="text-slate-200 font-medium">{m.market}</div>
                  <div className="text-xs text-slate-500">{m.state}</div>
                </div>
                <div className="flex items-center gap-1 text-rose-400">
                  <IndianRupee size={14} />
                  <div className="font-semibold">{m.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Markets sample table */}
      <div className="mt-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-md font-semibold text-slate-200">
            Sample Markets
          </h4>
          <div className="text-sm text-slate-400">
            Showing {Math.min(20, market_data.length)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {market_data.slice(0, 20).map((m, idx) => (
            <div
              key={idx}
              className="flex justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/30"
            >
              <div>
                <div className="text-slate-200 font-medium">{m.market}</div>
                <div className="text-xs text-slate-500">
                  {m.state} • {m.variety}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-slate-100">
                  {m.modal_price ?? "—"}
                </div>
                <div className="text-xs text-slate-500">
                  {m.unit || "Rs/Quintal"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
