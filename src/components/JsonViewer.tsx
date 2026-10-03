import React, { useState } from 'react';
import { LessonPackage } from '../types/lesson';
import { Copy, Check, Download, FileCode2, Volume2, Sparkles } from 'lucide-react';
import { speakRussian } from '../utils/audio';

interface JsonViewerProps {
  lessonData: LessonPackage;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ lessonData }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const jsonString = JSON.stringify(lessonData, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lessonData.lesson_id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Dars Darajasi & Mavzu
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{lessonData.topic}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {lessonData.level}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Metodika: Duolingo mikro-mashqlar
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Mashqlar Tarkibi
          </p>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {lessonData.exercises_count} ta interaktiv mashq
          </p>
          <p className="text-xs text-slate-500 mt-1">
            multiple_choice · translate_order · fill_blank
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Audio Dvigateli
          </p>
          <p className="text-lg font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Gemini 3.8 Flash-Lite TTS
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Studio-sifatli ruscha talaffuz (24kHz WAV)
          </p>
        </div>
      </div>

      {/* JSON actions header & code block */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2 text-slate-300">
            <FileCode2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-medium text-slate-200">
              {lessonData.lesson_id}.json
            </span>
            <span className="text-xs text-slate-500">
              ({jsonString.length} bayt)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Nusxalandi!' : 'JSON nusxalash'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Yuklab olish (.json)</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 overflow-x-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700">
          <pre className="font-mono text-xs text-emerald-300/90 leading-relaxed">
            <code>{jsonString}</code>
          </pre>
        </div>
      </div>

      {/* Exercise quick table breakdown with instant audio playback */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3">
          5 ta mikro-mashqning metodik tahlili
        </h3>
        <div className="space-y-3">
          {lessonData.exercises.map((ex) => (
            <div
              key={ex.id}
              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    #{ex.id} {ex.type}
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {ex.instruction}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  <span className="font-medium text-slate-700">Izoh:</span> {ex.explanation}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => speakRussian(ex.target_audio_text, 0.95)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors shadow-2xs"
                  title="Ruscha talaffuzni eshitish"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>{ex.target_audio_text}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
