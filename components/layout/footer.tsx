import { Container } from '@/components/layout/section-container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground font-semibold">
              Perceptras — Physical AI Perception Infrastructure
            </p>
            <p className="font-mono text-[9px] text-muted mt-1">
              Protected by reCAPTCHA. Google{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-foreground"
              >
                Terms of Service
              </a>{' '}
              apply.
            </p>
          </div>
          <p className="font-mono text-[10px] text-muted">
            &copy; {year} Perceptras. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
