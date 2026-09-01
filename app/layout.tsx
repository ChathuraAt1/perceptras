import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/ui/theme-toggle';
import { RecaptchaProvider } from '@/lib/recaptcha';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Chatbot } from '@/components/ai/chatbot';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Perceptras — Physical AI Perception Infrastructure',
  description:
    'High-performance perception infrastructure for physical AI systems. Real-time sensor fusion, edge inference, and spatial intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <RecaptchaProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Chatbot />
            </div>
          </RecaptchaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
