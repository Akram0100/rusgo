import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Last line of defence: without a boundary any render error (for example a malformed lesson)
 * unmounts the whole app and leaves a blank page. This shows a short message and a way back.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-xl p-6 text-center">
          <div className="text-4xl mb-3">😕</div>
          <h1 className="text-lg font-black text-slate-900">Kutilmagan xatolik yuz berdi</h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Sahifani yangilang. XP va ochilgan darslaringiz saqlanib qoladi.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-sm font-bold text-white transition-colors cursor-pointer"
          >
            Sahifani yangilash
          </button>
        </div>
      </div>
    );
  }
}
