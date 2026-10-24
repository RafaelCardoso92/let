"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const KEY = "cookie-consent";

// Analytics only: ad signals stay denied, there are no ads on this site.
function applyConsent(granted: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function readChoice(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null; // storage blocked: show the banner so a choice can still be made this visit
  }
}

const noSubscribe = () => () => {};

/** Cookie banner driving Google Consent Mode v2. Hidden once a choice is stored. */
export function CookieConsent() {
  // "server" on the server and during hydration, so the banner never renders into static HTML.
  const stored = useSyncExternalStore(noSubscribe, readChoice, () => "server");
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    if (stored === "granted") applyConsent(true);
  }, [stored]);

  function decide(granted: boolean) {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    applyConsent(granted);
    setDecided(true);
  }

  if (decided || stored !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-2xl border border-accent/30 bg-background p-4 text-sm text-foreground shadow-2xl"
    >
      <p>
        Usamos cookies do Google Analytics para contar visitas e perceber que páginas são lidas, só se aceitar.
        Os dados são tratados pela Google por nossa conta e guardados 14 meses. Se recusar, não é criado nenhum
        cookie de análise. Sem publicidade.
      </p>
      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={() => decide(false)}
          className="min-h-11 flex-1 rounded-full border border-foreground/30 px-4 font-medium hover:border-foreground"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => decide(true)}
          className="min-h-11 flex-1 rounded-full bg-foreground px-4 font-semibold text-background hover:opacity-90"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
