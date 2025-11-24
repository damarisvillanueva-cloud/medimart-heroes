import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pill, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Pill className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Farmacia Medimart <span className="text-primary">"Héroes"</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link to="/buscar" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Buscar Medicamentos
          </Link>
          <Link to="/como-funciona" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            ¿Cómo funciona?
          </Link>
          <Link to="/contacto" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Iniciar sesión
            </Button>
          </Link>
          <Link to="/registro">
            <Button size="sm">Registrarse</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
