import React, { useState } from 'react';
import { X, BookOpen, Volume2, Sparkles, Check, ChevronRight } from 'lucide-react';
import { GRAMMAR_RULES, GrammarRule } from '../data/grammar';
import { speakRussian } from '../utils/audio';

interface GrammarModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRuleId?: string;
}

export const GrammarModal: React.FC<GrammarModalProps> = ({
  isOpen,
  onClose,
  initialRuleId,
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(
    initialRuleId || GRAMMAR_RULES[0].id
  );

  if (!isOpen) return null;

  const currentRule: GrammarRule =
    GRAMMAR_RULES.find((r) => r.id === selectedRuleId) || GRAMMAR_RULES[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <span>Grammatika va Qoidalar</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                  A1 - A2
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Oʻzbek tilida soʻzlashuvchilar uchun sodda tushuntirishlar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category / Topic Pills */}
        <div className="flex items-center gap-2 p-3 px-6 bg-slate-50 border-b border-slate-200 overflow-x-auto scrollbar-none">
          {GRAMMAR_RULES.map((rule) => {
            const isSelected = rule.id === selectedRuleId;
            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRuleId(rule.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{rule.icon}</span>
                <span>{rule.title.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Rule Title Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-200/80">
            <div className="flex items-center gap-2 text-blue-700 font-black text-xs uppercase tracking-wider mb-1">
              <span>{currentRule.icon}</span>
              <span>{currentRule.level}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">{currentRule.title}</h2>
            <p className="text-xs font-bold text-slate-600 mt-1">{currentRule.topicUz}</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
              💡 <span className="font-semibold text-slate-700">{currentRule.summary}</span>
            </p>
          </div>

          {/* Sections */}
          {currentRule.sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{sec.heading}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {sec.explanation}
              </p>

              {/* Table (if any) */}
              {sec.table && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                      <tr>
                        {sec.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3 px-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-3 px-4 ${
                                cIdx === 0
                                  ? 'font-bold text-slate-900 bg-slate-50/50'
                                  : 'text-slate-700'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Audio Examples List */}
              {sec.examples && sec.examples.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {sec.examples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-0.5">
                        <p className="text-sm font-extrabold text-slate-900">
                          {ex.ru}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          {ex.uz}
                        </p>
                      </div>

                      <button
                        onClick={() => speakRussian(ex.audio_text, 0.95)}
                        className="p-1.5 rounded-xl bg-slate-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shrink-0 group-hover:scale-105"
                        title="Tinglash"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-3 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Duolingo metodikasi boʻyicha A1/A2 qoidalar
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
          >
            Tushundim
          </button>
        </div>
      </div>
    </div>
  );
};
