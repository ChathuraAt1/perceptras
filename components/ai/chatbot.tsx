'use client';

import { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

const AI_API_URL = 'https://portal.perceptras.net/api/ai/generate';

const SYSTEM_PROMPT = `You are the Perceptras AI Assistant, an expert in physical AI perception infrastructure, high-throughput video pipelines, and edge inference runtimes.
You assist developers and systems engineers with:
1. Perceptras Flow: Real-time video ingest, zero-copy DMA buffers, RTSP/GigE Vision/USB3 streaming.
2. Perceptras Accel: Compiled neural inference, INT8/FP8 quantization, layer fusion, and dynamic batching.
3. Perceptras Zone: Multi-camera extrinsic auto-calibration, 3D metric coordinate tracking, and geofence analytics.
4. Perceptras Grid: Distributed cluster orchestration, node failover, and gRPC/Kafka telemetry streaming.

Respond with concise, accurate, professional, and practical guidance. Use code blocks or bullet points when helpful.`;

const STARTER_PROMPTS = [
  'How do I connect RTSP cameras to Perceptras Flow?',
  'What hardware is needed for sub-2ms inference?',
  'How does multi-camera 3D tracking work across blind spots?',
  'Can we deploy Perceptras 100% on-premise without internet?',
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am the Perceptras AI Perception Assistant. Ask me anything about connecting camera streams, model quantization, 3D tracking, or cluster sizing.',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (userPrompt?: string) => {
    const textToSend = userPrompt || input.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userPrompt) setInput('');
    setLoading(true);

    try {
      // Prepare payload for backend API
      const conversationPayload = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.filter((m) => m.role !== 'system').map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: 'user', content: textToSend },
      ];

      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationPayload,
          max_tokens: 512,
          async: false,
        }),
      });

      const data = await response.json().catch(() => null);

      let replyContent = '';

      if (response.ok && data?.data) {
        if (typeof data.data === 'string') {
          replyContent = data.data;
        } else if (data.data?.choices?.[0]?.message?.content) {
          replyContent = data.data.choices[0].message.content;
        } else if (data.data?.response) {
          replyContent = data.data.response;
        } else {
          replyContent = JSON.stringify(data.data, null, 2);
        }
      } else {
        replyContent =
          data?.message ||
          'Unable to complete query. Please ensure your camera and node configurations match the Perceptras specifications.';
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Connection to Perceptras AI gateway timed out. For urgent inquiries, you can also reach out to our team at support@perceptras.net.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Conversation reset. What physical AI perception challenge can I help you architect today?',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 font-mono text-xs font-bold uppercase tracking-wider shadow-2xl hover:opacity-90 transition-all cursor-pointer"
        >
          <Sparkles className="h-4 w-4 animate-pulse text-emerald-400 dark:text-emerald-600" />
          <span>Perceptras AI</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl flex flex-col transition-all duration-200 ${
            isExpanded
              ? 'w-[90vw] md:w-[680px] h-[80vh] max-w-3xl'
              : 'w-[90vw] sm:w-[400px] h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <div>
                <p className="font-syne text-xs font-bold uppercase text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  Perceptras AI Assistant
                </p>
                <p className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400">Backend AI Engine // Live Gateway</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                title="Clear Conversation"
                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs bg-zinc-50/50 dark:bg-zinc-900">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="h-6 w-6 rounded-none bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] p-3 leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                      : 'bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 shadow-sm'
                  }`}
                >
                  {m.content}
                  {m.timestamp && (
                    <p
                      className={`text-[9px] mt-1.5 ${
                        m.role === 'user' ? 'text-zinc-300 dark:text-zinc-600 text-right' : 'text-zinc-400 dark:text-zinc-500'
                      }`}
                    >
                      {m.timestamp}
                    </p>
                  )}
                </div>

                {m.role === 'user' && (
                  <div className="h-6 w-6 rounded-none border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs p-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-zinc-900 dark:text-zinc-100" />
                <span>Perceptras AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          {messages.filter((m) => m.role === 'user').length < 2 && !loading && (
            <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-950 flex flex-wrap gap-1.5">
              {STARTER_PROMPTS.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="font-mono text-[10px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-300 dark:border-zinc-700 px-2 py-1 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-left cursor-pointer truncate max-w-full"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-zinc-200 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cameras, models, 3D tracking..."
              disabled={loading}
              className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 font-mono text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={loading || !input.trim()}
              className="px-3"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
