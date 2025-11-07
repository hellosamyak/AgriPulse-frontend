import { useState } from "react";
import api from "../api/axios";
import {
  Image as ImageIcon,
  Upload,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function DiseaseDetect() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle image upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  // Upload + Analyze Image
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("🧠 Gemini Response:", res.data);
      setResult(res.data);
    } catch (err) {
      console.error("Upload Error:", err);
      setError(
        "Error analyzing image. Please try again or check backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const getSeverityConfig = (severity) => {
    const configs = {
      high: {
        color: "from-rose-500 to-red-600",
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/30",
      },
      medium: {
        color: "from-amber-500 to-orange-600",
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/30",
      },
      low: {
        color: "from-emerald-500 to-green-600",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
      },
    };
    return configs[severity?.toLowerCase()] || configs.low;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1linear from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/25">
            <ImageIcon size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">
              Crop Disease Detection
            </h1>
            <p className="text-slate-400 text-sm">
              AI-powered leaf analysis using Google Gemini Vision 🌿
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Upload size={20} className="text-rose-400" />
            <h2 className="text-lg font-semibold text-slate-200">
              Upload Image
            </h2>
          </div>

          {/* Upload Area */}
          <div className="relative">
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="block w-full p-8 border-2 border-dashed border-slate-600 rounded-xl hover:border-rose-500/50 transition-all duration-300 cursor-pointer bg-slate-900/30 text-center group"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-linear-to-br from-rose-500/20 to-pink-600/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload size={28} className="text-rose-400" />
                </div>
                <p className="text-slate-300 font-medium mb-1">
                  {file ? file.name : "Click to upload crop leaf image"}
                </p>
                <p className="text-slate-500 text-sm">PNG, JPG up to 10MB</p>
              </div>
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-6 relative group">
              <img
                src={preview}
                alt="Leaf Preview"
                className="relative w-full h-64 object-cover rounded-xl border border-slate-700/50 shadow-xl"
              />
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="mt-6 w-full bg-linear-to-r from-rose-500 to-pink-600 text-white px-6 py-3.5 rounded-xl font-medium hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing with Gemini...
              </>
            ) : (
              <>
                <Sparkles
                  size={20}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
                Analyze Image
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <p className="mt-4 text-sm text-rose-400 flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </p>
          )}
        </div>

        {/* Result Section */}
        {result ? (
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 size={20} className="text-emerald-400" />
              <h2 className="text-lg font-semibold text-slate-200">
                AI Diagnosis
              </h2>
            </div>

            {/* Gemini JSON Response */}
            {"detected_disease" in result ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                  <p className="text-sm text-slate-400 mb-1">
                    Detected Disease
                  </p>
                  <p className="text-xl font-semibold text-emerald-400">
                    {result.detected_disease}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                    <p className="text-sm text-slate-400 mb-1">Confidence</p>
                    <p className="text-lg font-semibold text-slate-200">
                      {result.confidence || "N/A"}
                    </p>
                  </div>

                  <div
                    className={`p-4 ${
                      getSeverityConfig(result.severity).bg
                    } rounded-xl border ${
                      getSeverityConfig(result.severity).border
                    }`}
                  >
                    <p className="text-sm text-slate-400 mb-1">
                      Severity Level
                    </p>
                    <p
                      className={`text-lg font-semibold uppercase ${
                        getSeverityConfig(result.severity).text
                      }`}
                    >
                      {result.severity || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-linear-to-br from-emerald-500/10 to-teal-600/10 rounded-xl border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
                      <AlertCircle size={20} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-400 mb-2">
                        Recommended Treatment
                      </p>
                      <p className="text-slate-200 leading-relaxed">
                        {result.recommended_treatment ||
                          "No specific treatment provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Handle Gemini free-text fallback
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                <p className="text-sm text-slate-400 mb-1">AI Response</p>
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {result.raw_response ||
                    "AI returned an unstructured response. Try again later."}
                </p>
              </div>
            )}
          </div>
        ) : (
          !loading && (
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} className="text-slate-600" />
                </div>
                <p className="text-slate-400 text-lg font-medium mb-2">
                  No Analysis Yet
                </p>
                <p className="text-slate-500 text-sm">
                  Upload an image to get AI-powered diagnosis
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
