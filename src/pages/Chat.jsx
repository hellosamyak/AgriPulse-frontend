import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, Send, Loader2, Sprout, User } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "🌱 Hi! I'm **AgriPulse AI** — your smart farming assistant. Ask me about crop planning, soil health, or market trends!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat", {
        message: input,
      });

      const botReply =
        res.data.response ||
        res.data.ai_recommendation?.summary ||
        "⚠️ Sorry, I couldn't get that right now.";

      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "🚨 Oops, something went wrong. Try again later!",
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
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[85vh] w-full max-w-4xl mx-auto bg-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-md shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 py-4 bg-slate-800/60 border-b border-slate-700/50">
        {/* Logo */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-900/40">
          <img
            src="/logo.png"
            alt="AgriPulse Logo"
            className="w-9 h-9 object-contain rounded-md transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          />
        </div>

        {/* Title */}
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-semibold text-white truncate">
            AgriPulse AI Chat
          </h2>
          <p className="text-xs text-slate-400 truncate">
            Powered by Google Gemini 🌾
          </p>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-slate-700/40 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 sm:gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "bot" && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/30 shrink-0">
                <Bot size={14} className="sm:w-4 sm:h-4 text-emerald-400" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[80%] lg:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                msg.role === "user"
                  ? "bg-emerald-500/20 text-slate-100 border border-emerald-500/30"
                  : "bg-slate-800/70 text-slate-200 border border-slate-700/40"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 text-slate-200 last:mb-0">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-emerald-400 font-semibold">
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 my-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1 my-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-300">{children}</li>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded text-xs">
                      {children}
                    </code>
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>

            {msg.role === "user" && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-800/70 rounded-lg flex items-center justify-center border border-slate-700/40 shrink-0">
                <User size={14} className="sm:w-4 sm:h-4 text-slate-400" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm px-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Thinking...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-slate-800/50 border-t border-slate-700/50">
        <div className="flex items-end gap-2 sm:gap-3">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about crops, soil, or markets..."
            className="flex-1 resize-none px-3 sm:px-4 py-2 bg-slate-900/80 text-slate-200 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 placeholder-slate-500 text-sm outline-none max-h-32"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="p-2.5 sm:p-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center shrink-0"
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Send size={16} className="sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
