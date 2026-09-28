import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Settings, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Zap,
  Globe
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  isN8nLive?: boolean;
}

const DEFAULT_WEBHOOK_PROD = 'https://vennela0811.app.n8n.cloud/webhook/c19f2ea5-ce86-42a9-a02f-0a101bae8840/chat';
const DEFAULT_WEBHOOK_TEST = 'https://vennela0811.app.n8n.cloud/webhook-test/c19f2ea5-ce86-42a9-a02f-0a101bae8840/chat';

const STORAGE_KEY_CHAT = 'travelgo_chat_messages';
const STORAGE_KEY_SESSION = 'travelgo_chat_session_id';
const STORAGE_KEY_WEBHOOK = 'travelgo_n8n_webhook_url';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPromptedUser, setHasPromptedUser] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_WEBHOOK) || DEFAULT_WEBHOOK_PROD;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'connected' | 'needs_activation' | 'checking'>('connected');

  // Dedicated sessionId for n8n memory nodes
  const sessionId = useRef<string>(
    (() => {
      let sId = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!sId) {
        sId = 'tg_session_' + Math.random().toString(36).substring(2, 11);
        localStorage.setItem(STORAGE_KEY_SESSION, sId);
      }
      return sId;
    })()
  ).current;

  // Initial greeting
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHAT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: '👋 Hello! I am your **TravelGo AI Assistant**, connected to your n8n workflow. \n\nAsk me anything about comparing trains, buses, flights, prices, fastest travel routes, or discount coupons!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages]);

  // Auto prompt popup bubble once after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPromptedUser(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for custom trigger event from Navbar or Hero
  useEffect(() => {
    const handleExternalOpen = () => {
      setIsOpen(true);
      setHasPromptedUser(false);
    };
    window.addEventListener('open-travelgo-chat', handleExternalOpen);
    return () => window.removeEventListener('open-travelgo-chat', handleExternalOpen);
  }, []);

  const handleSaveWebhook = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem(STORAGE_KEY_WEBHOOK, url);
    setShowSettings(false);
  };

  // Instant built-in TravelGo knowledge base if n8n is paused or offline
  const getSmartFallbackAnswer = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes('fast') || q.includes('quick') || q.includes('flight') || q.includes('plane')) {
      return `⚡ **Fastest Option:**
For **Hyderabad → Visakhapatnam**, the fastest option is the **IndiGo Flight (6E-452)**:
- ⏱️ **Duration:** Only 1h 20m (Non-stop)
- 🛫 **Departure:** 08:15 AM → 🛬 **Arrival:** 09:35 AM
- 💵 **Price:** ₹3,850 per passenger
- 🧳 **Luggage:** 15kg check-in + 7kg cabin included`;
    }

    if (q.includes('cheap') || q.includes('lowest') || q.includes('budget') || q.includes('train')) {
      return `💰 **Cheapest & Best Value Options:**
For **Hyderabad → Visakhapatnam**:
- 🚆 **Express Train (Godavari Superfast 12728):** ₹650 (7h 45m duration, 06:30 AM departure, 42 seats left)
- 🚆 **Visakha Superfast (17016):** ₹490 overnight sleeper
- 🚌 **GreenLine Express Bus:** ₹890 (Semi-sleeper AC)`;
    }

    if (q.includes('coupon') || q.includes('promo') || q.includes('discount') || q.includes('code') || q.includes('offer')) {
      return `🎟️ **Active Promo Codes for TravelGo:**
1. **\`TRAVELGO100\`** — Flat ₹100 OFF per ticket!
2. **\`FIRSTTRIP\`** — 15% OFF your base fare for first-time bookings!
Apply either code in the coupon field during checkout before confirming.`;
    }

    if (q.includes('bus') || q.includes('volvo') || q.includes('sleeper')) {
      return `🚌 **Available Intercity Buses:**
- 🚍 **Garuda Plus Multi-Axle Volvo (TSRTC):** 20:00 → 07:30 (11h 30m) at ₹1,190
- 🚍 **Orange Travels AC Sleeper:** 21:15 → 08:45 (11h 30m) at ₹1,350
- 🚍 **GreenLine Express Bus:** 18:30 → 06:45 (12h 15m) at ₹890`;
    }

    if (q.includes('cancel') || q.includes('refund') || q.includes('policy')) {
      return `🛡️ **Cancellation & Refund Policy:**
- Free cancellation is available up to **6 hours before departure time**.
- 100% of eligible fare is automatically refunded to your original payment method (UPI / Card / NetBanking).
- You can cancel any confirmed trip in one click from the **My Bookings** tab!`;
    }

    if (q.includes('pnr') || q.includes('status') || q.includes('ticket') || q.includes('booking')) {
      return `🎫 **Viewing Your Ticket & PNR:**
All confirmed tickets are stored under **My Bookings** with your unique PNR (e.g., \`TGTR-482910\`). You can view, download, or print your digital pass anytime.`;
    }

    return `TravelGo brings trains, buses, flights, and cabs into one single comparison!
- **⚡ Fastest:** IndiGo Flight (1h 20m, ₹3,850)
- **💰 Cheapest:** Godavari Express Train (7h 45m, ₹650)
- **🎟️ Coupons:** Use \`TRAVELGO100\` for ₹100 off or \`FIRSTTRIP\` for 15% off.
How else can I assist your travel plans?`;
  };

  // Send message to n8n Webhook
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setInputMessage('');

    // Append user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          chatInput: text,
          message: text,
          action: 'sendMessage',
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setWebhookStatus('connected');
        let botReplyText = '';
        const contentType = res.headers.get('content-type') || '';
        
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (typeof data === 'string') {
            botReplyText = data;
          } else if (data.output) {
            botReplyText = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
          } else if (data.response) {
            botReplyText = typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
          } else if (data.text) {
            botReplyText = data.text;
          } else if (data.message) {
            botReplyText = data.message;
          } else if (Array.isArray(data) && data[0]?.output) {
            botReplyText = data[0].output;
          } else {
            botReplyText = JSON.stringify(data);
          }
        } else {
          botReplyText = await res.text();
        }

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReplyText || 'I processed your request!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isN8nLive: true,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // n8n returned non-200 (e.g. 404 when workflow is not Active)
        let errorData: any = {};
        try {
          errorData = await res.json();
        } catch {
          // ignore
        }

        setWebhookStatus('needs_activation');
        const fallbackText = getSmartFallbackAnswer(text);
        
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `${fallbackText}\n\n---\n*(🤖 Note: n8n workflow is currently inactive. Toggle the switch to **Active** in the top-right of your n8n editor for live AI responses).*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isN8nLive: false,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err: any) {
      // Network or CORS issue
      setWebhookStatus('needs_activation');
      const fallbackText = getSmartFallbackAnswer(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `${fallbackText}\n\n---\n*(🤖 Note: Unable to reach n8n webhook directly from browser. Check workflow activation or CORS headers).*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isN8nLive: false,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const welcome: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'bot',
      text: 'Chat history cleared! How can I help you travel today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([welcome]);
    localStorage.removeItem(STORAGE_KEY_CHAT);
  };

  const quickPrompts = [
    '⚡ Fastest to Vizag?',
    '💰 Cheapest train option',
    '🎟️ Any active coupon codes?',
    '🚌 Show sleeper buses',
  ];

  return (
    <>
      {/* Floating Chat Trigger Button & Hint Bubble */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        
        {/* Welcome preview speech bubble */}
        {!isOpen && hasPromptedUser && (
          <div className="bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-purple-200 text-xs text-slate-800 flex items-center gap-2 max-w-xs animate-in slide-in-from-bottom-2 duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-ping" />
            <span className="font-semibold">Need help finding tickets? Ask n8n AI!</span>
            <button
              onClick={() => setHasPromptedUser(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/40"
            aria-label="Open TravelGo AI Chatbot"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
            </div>

            <div className="text-left hidden sm:block">
              <span className="block text-xs font-bold leading-tight">Ask TravelGo AI</span>
              <span className="block text-[10px] text-cyan-100 font-medium">n8n Connected</span>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-lg h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-4 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-purple-800 rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-heading leading-tight flex items-center gap-1.5">
                  <span>TravelGo Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <span className="text-[10px] text-cyan-100 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  n8n webhook active
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                title="Webhook Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                title="Clear Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Webhook Settings Tray */}
          {showSettings && (
            <div className="bg-slate-50 border-b border-slate-200 p-3 text-xs animate-in slide-in-from-top-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-purple-600" />
                  n8n Webhook URL:
                </span>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://.../webhook/.../chat"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />

              <div className="flex items-center justify-between gap-1 text-[11px]">
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSaveWebhook(DEFAULT_WEBHOOK_PROD)}
                    className="text-purple-600 hover:underline cursor-pointer font-semibold"
                  >
                    Production URL
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => handleSaveWebhook(DEFAULT_WEBHOOK_TEST)}
                    className="text-blue-600 hover:underline cursor-pointer font-semibold"
                  >
                    Test URL
                  </button>
                </div>

                <button
                  onClick={() => handleSaveWebhook(webhookUrl)}
                  className="px-3 py-1 bg-purple-600 text-white font-bold text-[11px] rounded-md hover:bg-purple-700 cursor-pointer"
                >
                  Save URL
                </button>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 border border-purple-200">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <span
                    className={`block text-[9px] mt-1 text-right font-medium ${
                      msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-4 py-2 text-xs text-slate-500 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-medium text-slate-400 ml-1">n8n thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about trains, flights, tickets..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white flex items-center justify-center shadow-sm cursor-pointer transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
