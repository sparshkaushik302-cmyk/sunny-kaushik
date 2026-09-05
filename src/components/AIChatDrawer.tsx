import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Trash2, 
  Bot, 
  User, 
  ArrowRight, 
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { ChatMessage, StructuredRecommendation } from '../types/chat';
import { askShoppingAssistant } from '../services/aiService';
import { useRouter } from '../hooks/useRouter';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  'Best gadgets under ₹1,000',
  'Which kitchen products are useful?',
  'Show me today\'s deals',
  'Help me choose a gift'
];

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: 'Namaste! I am your Kanha AI Shopping Assistant. How can I help you find the right product today? You can ask about gadgets under ₹1,000, healthy kitchen cookware, deals, or genuine gift recommendations.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await askShoppingAssistant(query, [...messages, userMsg]);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: response.recommendations
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        content: 'I had a momentary hiccup communicating with the catalog. Please try again or explore our Shop tab directly!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        content: 'Chat cleared! Feel free to ask about any product, deal, or category from Kanha Bazaar.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleNavigateToProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md sm:max-w-lg h-full bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Kanha AI Shopping Assistant"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-stone-900 dark:to-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 shadow-md">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Kanha AI Assistant
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  Live
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                Ask me about products, categories and deals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClearChat}
              title="Clear conversation"
              aria-label="Clear chat history"
              className="p-2 rounded-xl text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-white/60 dark:hover:bg-stone-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close chat"
              aria-label="Close assistant"
              className="p-2 rounded-xl text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-white/60 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conversation Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[88%]">
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`rounded-2xl p-3.5 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-none border border-stone-200/50 dark:border-stone-700/50'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Structured Recommendations Cards inside Chat */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-3 w-full pl-9 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    Recommended Matches ({msg.recommendations.length})
                  </div>
                  {msg.recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3 rounded-xl bg-amber-50/60 dark:bg-stone-800/90 border border-amber-200/70 dark:border-stone-700 shadow-xs flex items-center gap-3"
                    >
                      <img
                        src={rec.image}
                        alt=""
                        className="w-14 h-14 rounded-lg object-cover bg-white flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                          {rec.category}
                        </span>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                          {rec.name}
                        </h4>
                        <p className="text-[11px] text-stone-600 dark:text-stone-300 line-clamp-1 italic mt-0.5">
                          {rec.whyMatches}
                        </p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs font-extrabold text-stone-900 dark:text-stone-50">
                            ₹{rec.price.toLocaleString('en-IN')}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleNavigateToProduct(rec.slug)}
                              className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                            >
                              Details <ArrowRight className="w-3 h-3" />
                            </button>
                            <a
                              href={rec.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="text-[10px] font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs"
                            >
                              Buy <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-stone-600 dark:text-stone-300 mt-1 px-9">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 pl-9 text-xs text-amber-600 dark:text-amber-400">
              <div className="flex items-center gap-1 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="ml-2 font-medium text-stone-600 dark:text-stone-300">Searching catalog...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        {messages.length <= 3 && (
          <div className="px-4 py-2 bg-stone-50/50 dark:bg-stone-900/50 border-t border-stone-100 dark:border-stone-800/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block mb-1.5">
              Suggested Questions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="text-xs px-2.5 py-1 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input Field */}
        <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Kanha AI about products, deals, or gifts..."
              className="flex-1 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:border-amber-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-stone-600 dark:text-stone-300 mt-2 text-center">
            Recommendations are grounded strictly in verified Kanha Bazaar catalog items.
          </p>
        </div>
      </div>
    </div>
  );
};
