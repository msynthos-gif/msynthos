import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react'
import { WhatsappIcon } from './SocialIcons'
import logoImg from '../assets/logo.jpeg'

// Quick prompt suggestions to help visitors start conversations effortlessly
const QUICK_PROMPTS = [
  'Web Development 💻',
  'AI Agents & Automation 🤖',
  'UI/UX Design 🎨',
  'Pricing & Timeline ⚡',
]

const getBotReply = async (message, history = []) => {
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return (
        errorData.reply ||
        "Sorry, I'm having trouble connecting right now — please reach us on WhatsApp."
      )
    }

    const data = await response.json()
    return (
      data.reply ||
      "Sorry, I'm having trouble connecting right now — please reach us on WhatsApp."
    )
  } catch (error) {
    console.error('Chat API request error:', error)
    return "Sorry, I'm having trouble connecting right now — please reach us on WhatsApp."
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'greeting',
      sender: 'bot',
      text: "Hi! I'm here to help with web development, AI agents, design, or marketing questions. What are you looking for?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom whenever messages or typing state updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setHasUnread(false)
      // Focus input when opened on non-touch devices
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, messages, isTyping])

  const handleSendMessage = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : input
    if (!text.trim() || isTyping) return

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const currentHistory = messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text,
    }))

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const replyText = await getBotReply(userMessage.text, currentHistory)
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      const errorMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: "Sorry, I'm having trouble connecting right now — please reach us on WhatsApp.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSendMessage()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[380px] sm:w-[380px] h-[500px] max-h-[calc(100vh-6.5rem)] bg-white rounded-2xl shadow-[0_20px_50px_rgba(14,26,46,0.28)] border border-[#0E1A2E]/15 flex flex-col overflow-hidden font-sans"
            role="dialog"
            aria-modal="true"
            aria-label="Msynthos AI Chat Assistant"
          >
            {/* Header */}
            <div className="bg-[#0E1A2E] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#2D4A7A]/30 relative z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-white border border-[#2D4A7A]/40 flex items-center justify-center shadow-inner">
                    <img
                      src={logoImg}
                      alt="Msynthos Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Active Online Indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0E1A2E] rounded-full shadow-sm" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight text-white flex items-center gap-1.5">
                    Msynthos Assistant
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  </h3>
                  <p className="text-[11px] text-[#A8B2D1] flex items-center gap-1 mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Instant reply
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Chat with us on WhatsApp CTA Header Link */}
                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 text-[11px] font-semibold transition-all duration-200 hover:scale-105 shadow-sm group"
                  title="Chat directly on WhatsApp"
                  aria-label="Chat with us on WhatsApp"
                >
                  <WhatsappIcon className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden xs:inline sm:inline">WhatsApp</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#A8B2D1] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close chat window"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message History Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#F7F8FA] space-y-3.5 scrollbar-navy">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user'
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {!isUser && (
                        <div className="w-6 h-6 rounded-lg bg-[#0E1A2E] text-white flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div
                        className={`p-3 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                          isUser
                            ? 'bg-[#0E1A2E] text-white rounded-2xl rounded-tr-sm border border-[#0E1A2E]'
                            : 'bg-white text-[#1F2D44] rounded-2xl rounded-tl-sm border border-[#D9DDE3]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                    <span className="text-[10px] text-[#5C6B85] mt-1 px-1">
                      {msg.time}
                    </span>
                  </motion.div>
                )
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 max-w-[85%]"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#0E1A2E] text-white flex items-center justify-center flex-shrink-0 mb-1 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white text-[#5C6B85] px-3.5 py-2.5 rounded-2xl rounded-tl-sm border border-[#D9DDE3] shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D4A7A] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D4A7A] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D4A7A] animate-bounce" />
                  </div>
                </motion.div>
              )}

              {/* Quick Prompts Suggestions (if conversation is just starting) */}
              {messages.length <= 2 && !isTyping && (
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-[#5C6B85] mb-2 px-1">
                    Suggested topics:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[11px] font-medium bg-white hover:bg-[#0E1A2E] text-[#0E1A2E] hover:text-white border border-[#D9DDE3] hover:border-[#0E1A2E] px-2.5 py-1.5 rounded-xl transition-all duration-200 shadow-sm text-left active:scale-95"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <div className="p-3 bg-white border-t border-[#D9DDE3] flex flex-col gap-1.5">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Msynthos anything..."
                  disabled={isTyping}
                  className="flex-1 bg-[#F7F8FA] border border-[#D9DDE3] focus:border-[#2D4A7A] focus:bg-white text-[#0E1A2E] placeholder-[#5C6B85] text-xs sm:text-[13px] rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-xl bg-[#0E1A2E] hover:bg-[#1A3A6B] disabled:opacity-40 disabled:hover:bg-[#0E1A2E] text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between px-1 text-[10px] text-[#5C6B85]">
                <span>Press Enter to send</span>
                <span className="flex items-center gap-1 font-medium text-[#2D4A7A]">
                  <Sparkles className="w-2.5 h-2.5" /> Msynthos AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <motion.div
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260, delay: 0.5 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chat widget' : 'Open chat widget'}
          aria-expanded={isOpen}
          className="relative group w-14 h-14 rounded-full bg-[#0E1A2E] hover:bg-[#1A3A6B] text-white shadow-[0_8px_30px_rgba(14,26,46,0.35)] hover:shadow-[0_12px_35px_rgba(45,74,122,0.45)] border border-[#2D4A7A]/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#2D4A7A]/30"
        >
          {/* Animated Glow Halo */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2D4A7A] to-[#1A3A6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />

          {/* Unread notification ping dot when closed */}
          {!isOpen && hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
            </span>
          )}

          {/* Icon Switcher */}
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </>
  )
}
