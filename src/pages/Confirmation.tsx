import { useParams, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  CheckCircle2, 
  QrCode, 
  Clock, 
  MapPin, 
  Phone,
  Download,
  Share2,
  Calendar
} from "lucide-react";

const Confirmation = () => {
  const { id } = useParams();
  const location = useLocation();

  const items = (location.state as any)?.items || [];
  const totalGeneral = (location.state as any)?.totalGeneral as number | undefined;
  const codigoPedido = (location.state as any)?.codigoPedido as string | undefined;

  const quantityFromDetail = (location.state as any)?.quantity || 1;

  const unitPrice = 35.0;

  const singleReservation = {
    code: "MED-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    medication: "Paracetamol 500mg",
    quantity: quantityFromDetail,
    price: unitPrice * quantityFromDetail,
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    pharmacy: {
      name: "Farmacia Medimart Héroes - Sucursal Centro",
      address: "Av. Reforma 123, Col. Centro, Ciudad de México",
      phone: "+52 (55) 1234-5678",
      hours: "Lunes a Domingo: 8:00 AM - 10:00 PM"
    }
  };

  const handleDownloadQR = () => {
    // Simulate QR download
    alert("Descargando código QR...");
  };

  const handleShare = () => {
    // Simulate sharing
    if (navigator.share) {
      navigator.share({
        title: 'Reserva de medicamento',
        text: `Código de reserva: ${codigoPedido || singleReservation.code}`,
      });
    } else {
      alert("Código copiado al portapapeles: " + (codigoPedido || singleReservation.code));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Success Message */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground">¡Pedido confirmado!</h1>
              <p className="text-lg text-muted-foreground">
                Tu pedido está reservado y listo para recoger en farmacia
              </p>
            </div>

            {/* QR Code Card */}
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle>Tu código de reserva</CardTitle>
                <CardDescription>
                  Presenta este código QR o el número de reserva en la farmacia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code Placeholder */}
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border-2 border-primary/20">
                    <div className="text-center space-y-4">
                      <QrCode className="h-32 w-32 text-primary mx-auto" />
                      <p className="text-sm text-muted-foreground">Código QR</p>
                    </div>
                  </div>
                </div>

                {/* Reservation Code */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Código de reserva:</p>
                  <Badge variant="outline" className="text-lg py-2 px-4 font-mono">
                    {codigoPedido || singleReservation.code}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2" onClick={handleDownloadQR}>
                    <Download className="h-4 w-4" />
                    Descargar QR
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                    Compartir
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reservation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles de tu reserva</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.length > 0 ? (
                  <>
                    {items.map((item: any) => (
                      <div key={item.idMedicamento} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Medicamento:</span>
                          <span className="font-semibold">{item.nombre}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cantidad:</span>
                          <span className="font-semibold">{item.cantidad}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="font-semibold">${item.subtotal.toFixed(2)}</span>
                        </div>
                        <Separator />
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-semibold">Total a pagar:</span>
                      <span className="font-semibold text-primary text-xl">
                        ${(totalGeneral ?? 0).toFixed(2)}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medicamento:</span>
                      <span className="font-semibold">{singleReservation.medication}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cantidad:</span>
                      <span className="font-semibold">{singleReservation.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total a pagar:</span>
                      <span className="font-semibold text-primary text-xl">
                        ${singleReservation.price.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
                
                <Separator />

                <div className="flex items-start gap-2 text-sm">
                  <Clock className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Válido hasta:</p>
                    <p className="text-muted-foreground">{singleReservation.validUntil}</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p className="text-sm font-semibold">Importante:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>El pago se realiza al momento de recoger en farmacia</li>
                    <li>Presenta tu código QR o número de reserva</li>
                    <li>La reserva expira automáticamente después de 24 horas</li>
                    <li>No olvides llevar tu receta médica si es requerida</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Pharmacy Location */}
            <Card>
              <CardHeader>
                <CardTitle>Ubicación de la farmacia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{singleReservation.pharmacy.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>{singleReservation.pharmacy.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{singleReservation.pharmacy.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{singleReservation.pharmacy.hours}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <MapPin className="h-4 w-4" />
                  Ver en mapa
                </Button>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/buscar" className="flex-1">
                <Button variant="outline" className="w-full">
                  Buscar más medicamentos
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button className="w-full">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmation;
