'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Script from 'next/script';

interface RecaptchaContextType {
  executeRecaptcha: (action: string) => Promise<string>;
  isLoaded: boolean;
  siteKey: string;
}

const RecaptchaContext = createContext<RecaptchaContextType>({
  executeRecaptcha: async () => '',
  isLoaded: false,
  siteKey: '',
});

export const ENTERPRISE_RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lf_0qItAAAAAAK3wsJeE_hpHAHqYxv1uiZrZeXo';

interface GrecaptchaEnterprise {
  ready: (callback: () => void) => void;
  execute?: (siteKey: string, options: { action: string }) => Promise<string>;
  render?: (container: string | HTMLElement, parameters: Record<string, unknown>) => string;
  getResponse?: (optWidgetId?: string | number) => string;
}

interface ExtendedWindow {
  grecaptcha?: {
    ready?: (callback: () => void) => void;
    execute?: (siteKey: string, options: { action: string }) => Promise<string>;
    getResponse?: (optWidgetId?: string | number) => string;
    enterprise?: GrecaptchaEnterprise;
  };
}

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const siteKey = ENTERPRISE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      setIsLoaded(true);
    }
  }, [siteKey]);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      if (!siteKey) {
        return 'dev-mock-recaptcha-token';
      }

      const extWin = typeof window !== 'undefined' ? (window as unknown as ExtendedWindow) : null;

      if (!extWin || !extWin.grecaptcha) {
        console.warn('reCAPTCHA Enterprise is not initialized yet.');
        return '';
      }

      // 1. Check if token is already solved in widget checkbox
      const existingToken =
        extWin.grecaptcha.enterprise?.getResponse?.() ||
        extWin.grecaptcha?.getResponse?.();

      if (existingToken) {
        return existingToken;
      }

      // 2. Google reCAPTCHA Enterprise execute API
      if (extWin.grecaptcha.enterprise?.execute) {
        return new Promise<string>((resolve) => {
          extWin.grecaptcha?.enterprise?.ready(async () => {
            try {
              const token = await extWin.grecaptcha?.enterprise?.execute?.(siteKey, {
                action: action.toUpperCase(),
              });
              resolve(token || extWin.grecaptcha?.enterprise?.getResponse?.() || '');
            } catch (err) {
              console.error('reCAPTCHA Enterprise execution error:', err);
              resolve(extWin.grecaptcha?.enterprise?.getResponse?.() || '');
            }
          });
        });
      }

      // 3. Fallback to standard grecaptcha API
      return new Promise<string>((resolve) => {
        extWin.grecaptcha?.ready?.(async () => {
          try {
            const token = await extWin.grecaptcha?.execute?.(siteKey, {
              action: action.toLowerCase(),
            });
            resolve(token || extWin.grecaptcha?.getResponse?.() || '');
          } catch (err) {
            console.error('reCAPTCHA standard execution error:', err);
            resolve(extWin.grecaptcha?.getResponse?.() || '');
          }
        });
      });
    },
    [siteKey]
  );

  return (
    <RecaptchaContext.Provider value={{ executeRecaptcha, isLoaded, siteKey }}>
      {siteKey && (
        <Script
          src="https://www.google.com/recaptcha/enterprise.js"
          strategy="lazyOnload"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {children}
    </RecaptchaContext.Provider>
  );
}

export function useRecaptcha() {
  return useContext(RecaptchaContext);
}

/**
 * Enterprise reCAPTCHA widget container (renders the checkbox challenge)
 */
export function EnterpriseRecaptchaWidget({ action = 'LOGIN' }: { action?: string }) {
  const { siteKey } = useRecaptcha();
  return (
    <div className="py-2 flex justify-center">
      <div
        className="g-recaptcha"
        data-sitekey={siteKey}
        data-action={action}
      />
    </div>
  );
}
