import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-pharmacy.jpg";
import { Search, Clock, Shield, Zap, CheckCircle2, Package, Bell, QrCode } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Inventario en tiempo real",
      description: "Consulta la disponibilidad exacta de medicamentos al instante"
    },
    {
      icon: <Shield className="h-8 w-8 text-success" />,
      title: "Precios transparentes",
      description: "Visualiza precios, descuentos y promociones actualizados"
    },
    {
      icon: <Zap className="h-8 w-8 text-warning" />,
      title: "Apartado rápido",
      description: "Reserva tu medicamento en segundos con código QR"
    },
    {
      icon: <Package className="h-8 w-8 text-primary" />,
      title: "Sin sorpresas",
      description: "Sabrás si está disponible antes de ir a la farmacia"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Busca tu medicamento",
      description: "Ingresa el nombre del medicamento que necesitas"
    },
    {
      step: "2",
      title: "Revisa disponibilidad y precio",
      description: "Consulta inventario en tiempo real, precios y descuentos"
    },
    {
      step: "3",
      title: "Aparta con un clic",
      description: "Reserva el medicamento instantáneamente"
    },
    {
      step: "4",
      title: "Recoge en tienda",
      description: "Muestra tu código QR o ticket digital en farmacia"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                Inventario en tiempo real
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Encuentra tus medicamentos al <span className="text-primary">instante</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Consulta disponibilidad, precios y descuentos de medicamentos en tiempo real. 
                Aparta lo que necesitas sin salir de casa.
              </p>

              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="flex gap-2 p-2 bg-background rounded-lg shadow-lg border border-border">
                  <Input 
                    type="text"
                    placeholder="Buscar medicamento (ej: Paracetamol, Ibuprofeno...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                  />
                  <Button type="submit" size="lg" className="gap-2 shadow-md">
                    <Search className="h-5 w-5" />
                    Buscar
                  </Button>
                </div>
              </form>

              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Inventario actualizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Precios transparentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Apartado instant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Por qué usar Medimart?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Una plataforma diseñada para facilitar el acceso a medicamentos de forma rápida y segura
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                En solo 4 pasos puedes apartar tus medicamentos y recogerlos en farmacia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {howItWorks.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-accent/50" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/buscar">
                <Button size="lg" variant="default" className="gap-2">
                  Empezar ahora
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Account Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      Más beneficios con una cuenta
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Crea tu cuenta gratuita y accede a funciones adicionales
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Package className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">Historial de apartados</h3>
                        <p className="text-sm text-muted-foreground">Revisa tus medicamentos anteriores</p>
                      </div>
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bell className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">Alertas personalizadas</h3>
                        <p className="text-sm text-muted-foreground">Notificaciones de disponibilidad</p>
                      </div>
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <QrCode className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">QR digital</h3>
                        <p className="text-sm text-muted-foreground">Acceso rápido a tus reservas</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Link to="/registro">
                        <Button size="lg" variant="default" className="w-full sm:w-auto">
                          Crear cuenta gratis
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                          Ya tengo cuenta
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
