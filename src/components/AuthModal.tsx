import React, { useState } from 'react';
import {
  X,
  LogIn,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Loader2,
  User,
  Send,
} from 'lucide-react';
import {
  auth,
  googleProvider,
} from '../utils/firebase';
import {
  signInWithPopup,
  signInAnonymously,
  updateProfile,
} from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [telegramUsername, setTelegramUsername] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Sign in with Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLoginSuccess(result.user);
      onClose();
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setErrorMsg(err.message || 'Google orqali kirishda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Telegram / Quick Name Login
  const handleTelegramOrNameLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramUsername.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    try {
      // Use Firebase Anonymous Auth or custom token
      const cred = await signInAnonymously(auth);
      const cleanName = telegramUsername.trim().replace(/^@/, '');
      await updateProfile(cred.user, {
        displayName: `@${cleanName}`,
      });
      onLoginSuccess({
        ...cred.user,
        displayName: `@${cleanName}`,
      });
      onClose();
    } catch (err: any) {
      console.error('Quick Sign-In Error:', err);
      setErrorMsg('Kirishda xatolik yuz berdi. Qayta urinib koʻring.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 sm:p-7 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Hisobingizga kiring
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Natijalaringiz, ochiq darslaringiz va XP ballaringiz doim bulutda saqlanadi
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Buttons List */}
        <div className="space-y-3">
          {/* Google Sign-In */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-sm shadow-xs transition-all cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.02h3.87c2.26-2.09 3.67-5.17 3.67-9.11z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.12C3.26 21.28 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.61H1.28C.46 8.23 0 10.06 0 12s.46 3.77 1.28 5.39l3.99-3.12z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.72 1.28 6.61l3.99 3.12c.95-2.85 3.6-4.98 6.73-4.98z"
                  />
                </svg>
                <span>Google orqali kirish</span>
              </>
            )}
          </button>

          <div className="flex items-center my-3 text-xs text-slate-400">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="px-3">yoki Telegram orqali</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Telegram / Custom Username quick sign-in */}
          <form onSubmit={handleTelegramOrNameLogin} className="space-y-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-sm">
                @
              </span>
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="Telegram foydalanuvchi nomingiz"
                className="w-full pl-8 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !telegramUsername.trim()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Telegram orqali tezkor kirish</span>
            </button>
          </form>
        </div>

        {/* Benefits List */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Duolingo kabi darslar ochilishi (A1 → A2 → B1)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Haftalik Liganing real reyting jadvali</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Streak (ketma-ketlik) va XP ballarining yoʻqolmasligi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
