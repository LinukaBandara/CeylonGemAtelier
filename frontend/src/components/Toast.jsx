import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback((message, type = "info", duration = 3200) => {
    const id = ++toastId;
    setToasts((prev) => [...prev.slice(-4), { id, message, type }]);
    if (duration > 0) {
      window.setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  const api = useMemo(
    () => ({
      success: (message, duration) => push(message, "success", duration),
      error: (message, duration) => push(message, "error", duration ?? 5000),
      info: (message, duration) => push(message, "info", duration),
      dismiss,
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="cga-toast-region" aria-live="polite" aria-relevant="additions">
        {toasts.map((t) => (
          <div key={t.id} className={`cga-toast cga-toast-${t.type}`} role="status">
            <span className="cga-toast-icon" aria-hidden="true">
              {t.type === "success" && <CheckCircle2 size={16} strokeWidth={1.6} />}
              {t.type === "error" && <AlertCircle size={16} strokeWidth={1.6} />}
              {t.type === "info" && <Info size={16} strokeWidth={1.6} />}
            </span>
            <span className="cga-toast-message">{t.message}</span>
            <button
              type="button"
              className="cga-toast-close"
              aria-label="Dismiss notification"
              onClick={() => dismiss(t.id)}
            >
              <X size={14} strokeWidth={1.6} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      success: () => {},
      error: () => {},
      info: () => {},
      dismiss: () => {},
    };
  }
  return ctx;
}
