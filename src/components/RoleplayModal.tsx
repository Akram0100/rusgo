import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  Volume2,
  Mic,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  User,
  Bot
} from 'lucide-react';
import { speakRussian, playTileClick, playSuccessChime, playErrorTone } from '../utils/audio';

interface DialogueStep {
  speaker: 'npc' | 'user';
  name: string;
  ru: string;
  uz: string;
  options?: {
    text: string;
    uz: string;
    isCorrect: boolean;
  }[];
}

interface Scenario {
  id: string;
  title: string;
  topicUz: string;
  icon: string;
  steps: DialogueStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'cafe',
    title: 'В кафе (Kafeda)',
    topicUz: 'Qahva va nonushta buyurtma berish',
    icon: '☕',
    steps: [
      {
        speaker: 'npc',
        name: 'Ofitsiant',
        ru: 'Здравствуйте! Что будете заказывать?',
        uz: 'Assalomu alaykum! Nima buyurtma qilasiz?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Здравствуйте! Кофе, пожалуйста.',
        uz: 'Salom! Qahva bering, iltimos.',
        options: [
          { text: 'Здравствуйте! Кофе, пожалуйста.', uz: 'Salom! Qahva bering, iltimos.', isCorrect: true },
          { text: 'До свидания, пока.', uz: 'Xayr, koʻrishguncha.', isCorrect: false },
          { text: 'Я не знаю русский.', uz: 'Men rus tilini bilmayman.', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Ofitsiant',
        ru: 'Вам с молоком или без молока?',
        uz: 'Sizga sutli boʻlsinmi yoki sutsizmi?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'С молоком и сахаром, спасибо.',
        uz: 'Sut va shakar bilan, rahmat.',
        options: [
          { text: 'С молоком и сахаром, спасибо.', uz: 'Sut va shakar bilan, rahmat.', isCorrect: true },
          { text: 'Где находится метро?', uz: 'Metro qayerda joylashgan?', isCorrect: false },
          { text: 'Меня зовут Алишер.', uz: 'Mening ismim Alisher.', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Ofitsiant',
        ru: 'Отлично! Ваш кофе будет готов через пять минут.',
        uz: 'Ajoyib! Qahvangiz besh daqiqada tayyor boʻladi.',
      },
    ],
  },
  {
    id: 'meeting',
    title: 'Знакомство (Tanishuv)',
    topicUz: 'Yangi doʻst bilan tanishish va suhbatlashish',
    icon: '🤝',
    steps: [
      {
        speaker: 'npc',
        name: 'Maksim',
        ru: 'Привет! Как тебя зовут?',
        uz: 'Salom! Isming nima?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Привет! Меня зовут Азиз. А тебя?',
        uz: 'Salom! Mening ismim Aziz. Seniki-chi?',
        options: [
          { text: 'Привет! Меня зовут Азиз. А тебя?', uz: 'Salom! Mening ismim Aziz. Seniki-chi?', isCorrect: true },
          { text: 'Сколько это стоит?', uz: 'Bu qancha turadi?', isCorrect: false },
          { text: 'Приятного аппетита!', uz: 'Yoqimli ishtaha!', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Maksim',
        ru: 'Очень приятно! Ты откуда приехал?',
        uz: 'Juda xursandman! Qayerdan kelgansan?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Я из Узбекистана, из Ташкента.',
        uz: 'Men Oʻzbekistondanman, Toshkentdan.',
        options: [
          { text: 'Я из Узбекистана, из Ташкента.', uz: 'Men Oʻzbekistondanman, Toshkentdan.', isCorrect: true },
          { text: 'Я хочу спать.', uz: 'Men uxlamoqchiman.', isCorrect: false },
          { text: 'Спасибо, всё вкусно.', uz: 'Rahmat, hammasi mazali.', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Maksim',
        ru: 'Замечательно! Добро пожаловать!',
        uz: 'Ajoyib! Xush kelibsan!',
      },
    ],
  },
  {
    id: 'taxi',
    title: 'В такси (Taksida)',
    topicUz: 'Haydovchiga manzil aytish va hisoblashish',
    icon: '🚕',
    steps: [
      {
        speaker: 'npc',
        name: 'Haydovchi',
        ru: 'Добрый день! Куда едем?',
        uz: 'Xayrli kun! Qayerga boramiz?',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Добрый день! До вокзала, пожалуйста.',
        uz: 'Xayrli kun! Vokzalgacha, iltimos.',
        options: [
          { text: 'Добрый день! До вокзала, пожалуйста.', uz: 'Xayrli kun! Vokzalgacha, iltimos.', isCorrect: true },
          { text: 'Я люблю читать книги.', uz: 'Men kitob oʻqishni yoqtiraman.', isCorrect: false },
          { text: 'Какая сегодня погода?', uz: 'Bugun havo qanday?', isCorrect: false },
        ],
      },
      {
        speaker: 'npc',
        name: 'Haydovchi',
        ru: 'Хорошо. Мы приехали. С вас триста рублей.',
        uz: 'Yaxshi. Yetib keldik. Sizdan uch yuz rubl.',
      },
      {
        speaker: 'user',
        name: 'Siz',
        ru: 'Вот, возьмите, спасибо большое!',
        uz: 'Mana oling, katta rahmat!',
        options: [
          { text: 'Вот, возьмите, спасибо большое!', uz: 'Mana oling, katta rahmat!', isCorrect: true },
          { text: 'Где находится аптека?', uz: 'Dorixona qayerda?', isCorrect: false },
          { text: 'Меня зовут Тимур.', uz: 'Mening ismim Timur.', isCorrect: false },
        ],
      },
    ],
  },
];

interface RoleplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXp?: (amount: number) => void;
  onOpenSpeaking?: (text: string) => void;
}

export const RoleplayModal: React.FC<RoleplayModalProps> = ({
  isOpen,
  onClose,
  onAddXp,
  onOpenSpeaking,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<DialogueStep[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [wrongOption, setWrongOption] = useState<string | null>(null);

  const scenario = SCENARIOS[selectedScenarioIndex];

  // Reset dialogue
  const startScenario = (index: number) => {
    setSelectedScenarioIndex(index);
    setCurrentStepIndex(0);
    const initialNpcStep = SCENARIOS[index].steps[0];
    setCompletedSteps([initialNpcStep]);
    setIsFinished(false);
    setWrongOption(null);
    speakRussian(initialNpcStep.ru, 0.95);
  };

  useEffect(() => {
    if (isOpen) {
      startScenario(selectedScenarioIndex);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStep = scenario.steps[currentStepIndex + 1];

  const handleSelectOption = (option: { text: string; isCorrect: boolean }) => {
    playTileClick();

    if (option.isCorrect) {
      playSuccessChime();
      speakRussian(option.text, 0.95);

      // Append user's step
      const updatedSteps = [...completedSteps, { ...currentStep, ru: option.text }];

      // Check if there is next NPC step
      const nextStepIndex = currentStepIndex + 2;
      if (nextStepIndex < scenario.steps.length) {
        const nextNpcStep = scenario.steps[nextStepIndex];
        updatedSteps.push(nextNpcStep);
        setCompletedSteps(updatedSteps);
        setCurrentStepIndex(nextStepIndex);
        setTimeout(() => {
          speakRussian(nextNpcStep.ru, 0.95);
        }, 1200);
      } else {
        // Dialogue completed!
        setCompletedSteps(updatedSteps);
        setIsFinished(true);
        if (onAddXp) onAddXp(30);
      }
    } else {
      playErrorTone();
      setWrongOption(option.text);
      setTimeout(() => setWrongOption(null), 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Muloqot Simulyatori (Roleplay)
              </h3>
              <p className="text-xs text-slate-500">{scenario.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario Picker Pills */}
        <div className="flex items-center gap-2 p-3 px-6 bg-slate-50 border-b border-slate-100 overflow-x-auto scrollbar-none">
          {SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => startScenario(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer shrink-0 ${
                idx === selectedScenarioIndex
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{sc.icon}</span>
              <span>{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Dialogue Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-slate-50/40">
          {completedSteps.map((step, idx) => (
            <div
              key={idx}
              className={`flex gap-3 items-end animate-in fade-in-50 duration-300 ${
                step.speaker === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {step.speaker === 'npc' && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 shadow-xs border ${
                  step.speaker === 'user'
                    ? 'bg-emerald-600 border-emerald-600 text-white rounded-br-none'
                    : 'bg-white border-slate-200 text-slate-900 rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                    step.speaker === 'user' ? 'text-emerald-100' : 'text-slate-400'
                  }`}>
                    {step.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speakRussian(step.ru, 0.95)}
                      className={`p-1 rounded-md transition-colors ${
                        step.speaker === 'user'
                          ? 'hover:bg-emerald-500 text-white'
                          : 'hover:bg-slate-100 text-blue-600'
                      }`}
                      title="Qayta tinglash"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {onOpenSpeaking && (
                      <button
                        onClick={() => onOpenSpeaking(step.ru)}
                        className={`p-1 rounded-md transition-colors ${
                          step.speaker === 'user'
                            ? 'hover:bg-emerald-500 text-white'
                            : 'hover:bg-slate-100 text-rose-600'
                        }`}
                        title="Oʻzingiz talaffuz qilib koʻring"
                      >
                        <Mic className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-base font-extrabold">{step.ru}</p>
                <p className={`text-xs mt-1 font-medium ${
                  step.speaker === 'user' ? 'text-emerald-100' : 'text-slate-500'
                }`}>
                  {step.uz}
                </p>
              </div>

              {step.speaker === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mb-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Response Area */}
        <div className="p-4 border-t border-slate-100 bg-white">
          {isFinished ? (
            <div className="text-center py-3 animate-in zoom-in-95">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 animate-bounce" />
              </div>
              <h4 className="font-black text-lg text-slate-900">
                Muloqot muvaffaqiyatli yakunlandi!
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                Siz rus tilida toʻliq dialog qura oldingiz (+30 XP ⚡)
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => startScenario(selectedScenarioIndex)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Qayta boshlash</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                >
                  Darsga qaytish
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Navbat sizda: Quyidagi javoblardan toʻgʻrisini tanlang:</span>
              </p>

              <div className="space-y-2">
                {currentStep?.options?.map((opt, idx) => {
                  const isWrong = wrongOption === opt.text;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-3 rounded-2xl text-left border-2 transition-all cursor-pointer font-bold text-sm shadow-xs active:scale-[0.99] flex items-center justify-between ${
                        isWrong
                          ? 'bg-rose-50 border-rose-400 text-rose-900 animate-shake'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <p className="font-extrabold text-slate-900">{opt.text}</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{opt.uz}</p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
