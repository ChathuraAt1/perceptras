import { Container } from '@/components/layout/section-container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Perceptras — Physical AI Perception Infrastructure
          </p>
          <p className="font-mono text-[10px] text-muted">
            &copy; {year} Perceptras. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
