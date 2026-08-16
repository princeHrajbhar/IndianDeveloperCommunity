"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import { getApiErrorMessage } from "@/src/lib/api/error";
import { useGoogleAuthMutation, useLazyGetMeQuery } from "@/src/lib/features/auth/auth-api";

type GoogleCredentialResponse = { credential: string; select_by?: string };
type GoogleButtonText = "signin_with" | "signup_with" | "continue_with";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize(config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            use_fedcm_for_button?: boolean;
          }): void;
          renderButton(
            parent: HTMLElement,
            options: {
              type?: "standard";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: GoogleButtonText;
              shape?: "rectangular" | "pill";
              logo_alignment?: "left" | "center";
              width?: number;
            },
          ): void;
        };
      };
    };
  }
}

export function GoogleAuthButton({
  mode,
  onAuthenticated,
}: {
  mode: "signin" | "signup";
  onAuthenticated: () => void | Promise<void>;
}) {
const clientId = "686028600171-m4ftm175uked3apemj8rdluqjb7ddkqa.apps.googleusercontent.com";

  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState("");
  const [googleAuth, googleState] = useGoogleAuthMutation();
  const [getMe, sessionState] = useLazyGetMeQuery();

  const handleCredential = useCallback(async (response: GoogleCredentialResponse) => {
    setError("");
    try {
      await googleAuth({ credential: response.credential }).unwrap();
      await getMe(undefined, false).unwrap();
      await onAuthenticated();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  }, [getMe, googleAuth, onAuthenticated]);

  useEffect(() => {
    const container = buttonRef.current;
    const googleId = window.google?.accounts.id;
    if (!scriptReady || !clientId || !container || !googleId) return;

    googleId.initialize({
      client_id: clientId,
      callback: handleCredential,
      use_fedcm_for_button: true,
    });

    const render = () => {
      const width = Math.max(220, Math.min(400, Math.floor(container.clientWidth || 320)));
      container.replaceChildren();
      googleId.renderButton(container, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: mode === "signup" ? "signup_with" : "signin_with",
        shape: "rectangular",
        logo_alignment: "left",
        width,
      });
    };

    render();
    const observer = new ResizeObserver(render);
    observer.observe(container);
    return () => observer.disconnect();
  }, [clientId, handleCredential, mode, scriptReady]);

  if (!clientId) {
    return (
      <p className="rounded-xl border border-amber-300/20 bg-amber-300/[0.05] px-4 py-3 text-xs leading-5 text-amber-100/80">
        Google sign-in is not configured yet. You can still use email and password.
      </p>
    );
  }

  const busy = googleState.isLoading || sessionState.isFetching;

  return (
    <div className="space-y-3">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => setError("Google sign-in could not be loaded. Please use email instead.")}
      />
      <div
        ref={buttonRef}
        className={`flex min-h-11 w-full justify-center overflow-hidden rounded-md ${busy ? "pointer-events-none opacity-60" : ""}`}
        aria-busy={busy}
      />
      {error ? <p className="text-xs leading-5 text-rose-300">{error}</p> : null}
    </div>
  );
}

export function AuthMethodDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-white/[0.08]" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">or use email</span>
      <span className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}
