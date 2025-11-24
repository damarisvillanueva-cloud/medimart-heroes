import { Link } from "react-router-dom";
import { Pill, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Medimart "Héroes"</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistema de inventario en tiempo real para farmacias. Encuentra y aparta tus medicamentos al instante.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces rápidos</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link to="/buscar" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Buscar medicamentos
              </Link>
              <Link to="/como-funciona" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ¿Cómo funciona?
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Para farmacias</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Integración
              </Link>
              <Link to="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Precios
              </Link>
              <Link to="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Soporte
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                contacto@medimart.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +52 (55) 1234-5678
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Ciudad de México
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2024 Farmacia Medimart "Héroes". Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
