import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jed Geoghegan
          </p>
          <div className="flex items-center gap-5">
            <a
              href="mailto:jedgeoghegan@gmail.com"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/adequatej"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/jed-geoghegan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
