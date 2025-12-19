import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground">Clyra</span>
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
          <Link
            to="/carrito"
            className="flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
