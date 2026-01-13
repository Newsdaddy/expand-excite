import { Database } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Database className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-lg font-bold">ECDB</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Features</a>
            <a href="#" className="transition-colors hover:text-foreground">Solutions</a>
            <a href="#" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © 2026 ECDB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
