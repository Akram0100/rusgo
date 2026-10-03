import React, { useState } from 'react';
import { Download, Smartphone, X, Share, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all active:translate-y-0.5 cursor-pointer"
        title="Ilovani telefon yoki kompyuterga oʻrnatish"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Oʻrnatish</span>
        <span className="sm:hidden">Ilova</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowGuide(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
        title="Ilovani oʻrnatish yoʻriqnomasi"
      >
        <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">Oʻrnatish</span>
      </button>

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-900">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Ilovani qurilmaga oʻrnatish
                </h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    Safari brauzerining pastki qismidagi{' '}
                    <span className="font-bold text-slate-900 inline-flex items-center gap-1">
                      <Share className="w-3.5 h-3.5 text-blue-600" />
                      Ulashish (Share)
                    </span>{' '}
                    tugmasini bosing.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    Menyuni pastga surib,{' '}
                    <span className="font-bold text-slate-900">
                      «Bosh ekranga qoʻshish» (Add to Home Screen)
                    </span>{' '}
                    bandini tanlang.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    Ilova telefoningiz ekranida paydo boʻladi va toʻliq ekran
                    rejimida ishlaydi!
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    Brauzeringizning yuqori oʻng burchagidagi{' '}
                    <span className="font-bold text-slate-900">
                      uch nuqta (⋮)
                    </span>{' '}
                    menyu tugmasini bosing.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">
                      «Ilovani oʻrnatish» (Install App)
                    </span>{' '}
                    yoki{' '}
                    <span className="font-bold text-slate-900">
                      «Bosh ekranga qoʻshish»
                    </span>{' '}
                    bandini tanlang.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    Ilova alohida dastur kabi oʻrnatiladi va oflayn keshda ham ishlaydi!
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Tushundim
            </button>
          </div>
        </div>
      )}
    </>
  );
};
