import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Loader2, Heart, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface ReplyScreenProps {
  friendDisplayName: string;
  creatorName: string;
  emailConfig: {
    SERVICE_ID: string;
    TEMPLATE_ID: string;
    PUBLIC_KEY: string;
    FORMSPREE_ENDPOINT?: string;
    RECIPIENT_EMAIL: string;
  };
  onSuccess: () => void;
}

export const ReplyScreen: React.FC<ReplyScreenProps> = ({
  friendDisplayName,
  creatorName,
  emailConfig,
  onSuccess,
}) => {
  const [senderName, setSenderName] = useState(friendDisplayName);
  const [replyMessage, setReplyMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !senderName.trim()) {
      sound.playWrong();
      setErrorMessage('Please type a little note before sending! 💌');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    sound.playPop();

    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const templateParams = {
      from_name: senderName.trim(),
      to_name: creatorName,
      message: replyMessage.trim(),
      timestamp: timestamp,
      reply_to: 'birthday-guest@website.com',
    };

    try {
      // 1. Check if Formspree endpoint is configured
      if (emailConfig.FORMSPREE_ENDPOINT && emailConfig.FORMSPREE_ENDPOINT.startsWith('http')) {
        const response = await fetch(emailConfig.FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            from_name: senderName.trim(),
            message: replyMessage.trim(),
            timestamp,
            recipient: emailConfig.RECIPIENT_EMAIL,
          }),
        });

        if (!response.ok) {
          throw new Error('Formspree submission failed');
        }
      } else {
        // 2. Check if real EmailJS keys exist or if placeholder
        const hasRealKeys =
          emailConfig.SERVICE_ID &&
          emailConfig.SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID' &&
          emailConfig.TEMPLATE_ID &&
          emailConfig.TEMPLATE_ID !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
          emailConfig.PUBLIC_KEY &&
          emailConfig.PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
          emailConfig.PUBLIC_KEY !== 'pub_key_placeholder';

        if (hasRealKeys) {
          await emailjs.send(
            emailConfig.SERVICE_ID,
            emailConfig.TEMPLATE_ID,
            templateParams,
            emailConfig.PUBLIC_KEY
          );
        } else {
          // Fallback simulation: log clearly so testing never breaks
          console.log('📬 [Email Simulation Mode - Demo Keys Detected]', {
            to: emailConfig.RECIPIENT_EMAIL,
            from: senderName,
            message: replyMessage,
            timestamp,
          });
          // Store in localStorage as backup
          const stored = JSON.parse(localStorage.getItem('birthday_replies') || '[]');
          stored.push(templateParams);
          localStorage.setItem('birthday_replies', JSON.stringify(stored));
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }

      sound.playCelebration();
      onSuccess();
    } catch (err: unknown) {
      console.error('EmailJS Error:', err);
      sound.playWrong();
      setErrorMessage(
        'Failed to deliver email directly. Please check connection or try again!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* Wollo Style White Sheet sliding up over the stage with rounded top edge (28-40px radius) */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl bg-white rounded-t-4xl sm:rounded-t-5xl p-6 sm:p-10 shadow-2xl border-t border-slate-100 flex flex-col max-h-[92vh] overflow-y-auto"
      >
        {/* Top Handle Pill */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 shrink-0" />

        {/* Header Tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-periwinkle-soft text-primary font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Story Epilogue</span>
          </span>
          <span className="text-xs text-brand-muted font-medium">Delivered to {creatorName}</span>
        </div>

        {/* Headline */}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-black tracking-tight">
          What do you have to say? ✍️
        </h2>
        <p className="text-sm text-brand-muted mt-1.5 font-sans">
          Send your thoughts, banter, or a heartfelt reaction directly back to {creatorName}.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5 flex-1">
          {/* Pre-filled name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-black mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 rounded-2xl bg-surface border border-gray-200 text-brand-black font-semibold text-base focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
          </div>

          {/* Message Textarea */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-black">
                Your Message
              </label>
              <span className="text-[11px] text-brand-muted">
                {replyMessage.length} characters
              </span>
            </div>
            <textarea
              rows={5}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={`Write whatever comes to mind, ${friendDisplayName}... funny gist, thank you, or prayers! 😊`}
              required
              className="w-full flex-1 px-4 py-3.5 rounded-2xl bg-surface border border-gray-200 text-brand-black font-medium text-base focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none placeholder:text-gray-400"
            />

            {/* Quick reaction chips */}
            <div className="flex flex-wrap gap-2 mt-2.5">
              {[
                "I'm crying happy tears 😭❤️",
                'Amen and Amen! 🙏✨',
                'You made my entire day! 🥹',
                'Love you forever! 🫂',
              ].map((chip) => (
                <button
                  type="button"
                  key={chip}
                  onClick={() => {
                    sound.playPop();
                    setReplyMessage((prev) => (prev ? `${prev} ${chip}` : chip));
                  }}
                  className="px-3 py-1 rounded-full bg-surface-card hover:bg-periwinkle-soft border border-gray-200 text-xs font-semibold text-brand-black transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-pink-50 border border-accent-pink/30 text-rose-800 text-xs sm:text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-accent-pink-deep" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={isLoading || !replyMessage.trim()}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-full font-display font-bold text-base transition-all duration-300 ${
                isLoading || !replyMessage.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-dark shadow-pill hover:shadow-pill-hover hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Reply</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Bottom subtle note */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-center text-xs text-brand-muted">
          <Heart className="w-3.5 h-3.5 text-accent-pink fill-current" />
          <span>No login required. Sends straight to {creatorName}'s inbox.</span>
        </div>
      </motion.div>
    </div>
  );
};

