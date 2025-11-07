import { useState } from "react";
import axios from "axios";
import { Bot, Send, Loader2, Sprout, User } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "🌱 Hi! I'm AgriPulse AI — your smart farming assistant. Ask me about crop planning, soil health, or market trends!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      // call backend
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: input,
      });

      const botReply =
        res.data.response ||
        res.data.ai_recommendation?.summary ||
        "Sorry, I couldn’t get that right now.";

      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "⚠️ Oops, something went wrong. Try again later!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-3xl mx-auto bg-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700/50 bg-slate-800/50 rounded-t-2xl">
        <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
          <Sprout size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            AgriPulse AI Chat
          </h2>
          <p className="text-xs text-slate-400">Powered by Google Gemini 🌾</p>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "justify-end" : ""
            }`}
          >
            {msg.role === "bot" && (
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/30 shrink-0">
                <Bot size={16} className="text-emerald-400" />
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-emerald-500/20 text-slate-100 border border-emerald-500/30"
                  : "bg-slate-800/70 text-slate-200 border border-slate-700/40"
              }`}
            >
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 bg-slate-800/70 rounded-lg flex items-center justify-center border border-slate-700/40 shrink-0">
                <User size={16} className="text-slate-400" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Loader2 className="animate-spin" size={16} />
            Thinking...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-800/40 rounded-b-2xl">
        <div className="flex items-center gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about crops, soil, or markets..."
            className="flex-1 resize-none px-4 py-2 bg-slate-900/70 text-slate-200 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 placeholder-slate-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="p-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
