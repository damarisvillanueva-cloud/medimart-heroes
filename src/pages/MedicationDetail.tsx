import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuantitySelector from "@/components/QuantitySelector";
import medicationsIcon from "@/assets/medications-icon.jpg";
import { 
  Package, 
  TrendingDown, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2,
  Info
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

// Mock data - same as Search page
const mockMedications = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    description: "Analgésico y antipirético para dolor y fiebre",
    fullDescription: "El paracetamol es un medicamento analgésico y antipirético ampliamente utilizado para aliviar el dolor leve a moderado y reducir la fiebre. Actúa inhibiendo la síntesis de prostaglandinas en el sistema nervioso central.",
    price: 45.00,
    discountPrice: 35.00,
    discount: 22,
    stock: 150,
    status: "available",
    category: "Analgésicos",
    uses: ["Dolor de cabeza", "Dolor muscular", "Fiebre", "Dolor dental"],
    presentation: "Tabletas",
    activeIngredient: "Paracetamol 500mg",
    manufacturer: "Laboratorios Pharma SA"
  },
  {
    id: "2",
    name: "Ibuprofeno 400mg",
    description: "Antiinflamatorio no esteroideo para dolor e inflamación",
    fullDescription: "El ibuprofeno es un antiinflamatorio no esteroideo (AINE) que se utiliza para reducir la fiebre y tratar el dolor o la inflamación causados por diversas condiciones.",
    price: 85.00,
    discountPrice: 68.00,
    discount: 20,
    stock: 8,
    status: "low",
    category: "Antiinflamatorios",
    uses: ["Dolor de cabeza", "Artritis", "Dolor menstrual", "Inflamación"],
    presentation: "Cápsulas",
    activeIngredient: "Ibuprofeno 400mg",
    manufacturer: "Medicamentos del Norte"
  }
];

const MedicationDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const medication = mockMedications.find(med => med.id === id) || mockMedications[0];

  const handleAddToCart = () => {
    if (quantity <= 0) return;

    if (quantity > medication.stock) {
      toast.error("No hay suficiente stock disponible para esa cantidad.");
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      addItem({
        idMedicamento: medication.id,
        nombre: medication.name,
        precioUnitario: medication.discountPrice ?? medication.price,
        cantidad: quantity,
        stockDisponible: medication.stock,
      });

      toast.success(`${quantity} unidad${quantity > 1 ? 'es' : ''} agregada${quantity > 1 ? 's' : ''} al carrito`);
      setIsAdding(false);
    }, 300);
  };

  const totalPrice = medication.discountPrice 
    ? medication.discountPrice * quantity 
    : medication.price * quantity;

  const getStatusInfo = () => {
    if (medication.status === "available") {
      return {
        icon: <CheckCircle2 className="h-5 w-5" />,
        text: `${medication.stock} unidades disponibles`,
        variant: "default" as const,
        className: "bg-success"
      };
    } else if (medication.status === "low") {
      return {
        icon: <AlertTriangle className="h-5 w-5" />,
        text: `¡Últimas ${medication.stock} unidades!`,
        variant: "default" as const,
        className: "bg-warning"
      };
    } else {
      return {
        icon: <Package className="h-5 w-5" />,
        text: "Agotado",
        variant: "destructive" as const,
        className: ""
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <img src={medicationsIcon} alt={medication.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-2xl">{medication.name}</CardTitle>
                        <CardDescription className="text-base">{medication.description}</CardDescription>
                        <div className="flex items-center gap-2 pt-2">
                          <Badge variant="outline">{medication.category}</Badge>
                          <Badge variant={statusInfo.variant} className={statusInfo.className}>
                            <span className="flex items-center gap-1">
                              {statusInfo.icon}
                              {statusInfo.text}
                            </span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Descripción completa</h3>
                      <p className="text-muted-foreground">{medication.fullDescription}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Usos principales</h3>
                      <ul className="space-y-2">
                        {medication.uses.map((use, index) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-1">Presentación</h4>
                        <p className="text-muted-foreground">{medication.presentation}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Ingrediente activo</h4>
                        <p className="text-muted-foreground">{medication.activeIngredient}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-semibold mb-1">Fabricante</h4>
                        <p className="text-muted-foreground">{medication.manufacturer}</p>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Este medicamento requiere receta médica. Asegúrate de tenerla al momento de recogerlo en farmacia.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Información de compra</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Quantity Selector */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Cantidad:</span>
                        <QuantitySelector
                          quantity={quantity}
                          onQuantityChange={setQuantity}
                          maxQuantity={medication.stock}
                        />
                      </div>
                      <Separator />
                    </div>

                    <div>
                      {medication.discountPrice ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Precio unitario:</span>
                            <span className="text-sm text-muted-foreground line-through">
                              ${medication.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="default" className="bg-success gap-1">
                              <TrendingDown className="h-3 w-3" />
                              Ahorra {medication.discount}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Precio con descuento:</span>
                            <span className="text-lg font-semibold text-primary">
                              ${medication.discountPrice.toFixed(2)}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-lg">Total a pagar:</span>
                            <span className="text-3xl font-bold text-primary">
                              ${totalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Precio unitario:</span>
                            <span className="text-lg font-semibold">
                              ${medication.price.toFixed(2)}
                            </span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-lg">Total a pagar:</span>
                            <span className="text-3xl font-bold text-foreground">
                              ${totalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Apartado válido por 24 horas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Pago al recoger en tienda</span>
                      </div>
                    </div>

                    {medication.status !== "out" ? (
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={isAdding || medication.stock === 0}
                      >
                        {isAdding ? "Agregando..." : "Agregar al carrito"}
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button className="w-full" size="lg" disabled>
                          Agotado
                        </Button>
                        <Link to="/registro">
                          <Button variant="outline" className="w-full" size="sm">
                            Notificarme cuando esté disponible
                          </Button>
                        </Link>
                      </div>
                    )}

                    <p className="text-xs text-center text-muted-foreground">
                      Al apartar el medicamento recibirás un código QR para recogerlo en farmacia
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MedicationDetail;
