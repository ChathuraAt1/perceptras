'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Script from 'next/script';

interface RecaptchaContextType {
  executeRecaptcha: (action: string) => Promise<string>;
  isLoaded: boolean;
}

const RecaptchaContext = createContext<RecaptchaContextType>({
  executeRecaptcha: async () => '',
  isLoaded: false,
});

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!SITE_KEY) {
      setIsLoaded(true);
    }
  }, []);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      if (!SITE_KEY) {
        console.warn('reCAPTCHA site key is not configured (NEXT_PUBLIC_RECAPTCHA_SITE_KEY).');
        return 'dev-mock-recaptcha-token';
      }

      if (typeof window === 'undefined' || !window.grecaptcha) {
        console.warn('reCAPTCHA is not loaded yet.');
        return '';
      }

      return new Promise<string>((resolve) => {
        window.grecaptcha?.ready(async () => {
          try {
            const token = await window.grecaptcha?.execute(SITE_KEY, { action });
            resolve(token || '');
          } catch (err) {
            console.error('reCAPTCHA execution error:', err);
            resolve('');
          }
        });
      });
    },
    []
  );

  return (
    <RecaptchaContext.Provider value={{ executeRecaptcha, isLoaded }}>
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
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
