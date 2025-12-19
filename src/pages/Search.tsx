import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuantitySelector from "@/components/QuantitySelector";
import { Search as SearchIcon, Package, AlertCircle, CheckCircle2, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

// Mock data
const mockMedications = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    description: "Analgésico y antipirético para dolor y fiebre",
    price: 45.00,
    discountPrice: 35.00,
    discount: 22,
    stock: 150,
    status: "available",
    category: "Analgésicos"
  },
  {
    id: "2",
    name: "Ibuprofeno 400mg",
    description: "Antiinflamatorio no esteroideo para dolor e inflamación",
    price: 85.00,
    discountPrice: 68.00,
    discount: 20,
    stock: 8,
    status: "low",
    category: "Antiinflamatorios"
  },
  {
    id: "3",
    name: "Amoxicilina 500mg",
    description: "Antibiótico de amplio espectro",
    price: 120.00,
    discountPrice: null,
    discount: 0,
    stock: 0,
    status: "out",
    category: "Antibióticos"
  },
  {
    id: "4",
    name: "Omeprazol 20mg",
    description: "Inhibidor de bomba de protones para problemas gástricos",
    price: 95.00,
    discountPrice: 76.00,
    discount: 20,
    stock: 45,
    status: "available",
    category: "Gastroenterología"
  }
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filteredMedications, setFilteredMedications] = useState(mockMedications);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addItem, items } = useCart();

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      const filtered = mockMedications.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMedications(filtered);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = mockMedications.filter(med => 
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMedications(filtered);
  };

  const getStatusBadge = (status: string, remainingStock: number) => {
    if (remainingStock <= 0 || status === "out") {
      return <Badge variant="destructive">Agotado</Badge>;
    }

    if (status === "low" || remainingStock <= 10) {
      return <Badge variant="default" className="bg-warning">¡Últimas {remainingStock} unidades!</Badge>;
    }

    return <Badge variant="default" className="bg-success">{remainingStock} disponibles</Badge>;
  };

  const getRemainingStock = (med: (typeof mockMedications)[number]) => {
    const cartItem = items.find(item => item.idMedicamento === med.id);
    return Math.max(med.stock - (cartItem?.cantidad ?? 0), 0);
  };

  const getQuantity = (medId: string) => quantities[medId] || 1;

  const setQuantity = (medId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [medId]: quantity }));
  };

  const handleAddToCart = (med: (typeof mockMedications)[number]) => {
    const quantity = getQuantity(med.id);
    const remainingStock = getRemainingStock(med);

    if (quantity <= 0) return;

    if (quantity > remainingStock) {
      toast.error("No hay suficiente stock disponible para esa cantidad.");
      return;
    }

    addItem({
      idMedicamento: med.id,
      nombre: med.name,
      precioUnitario: med.discountPrice ?? med.price,
      cantidad: quantity,
      stockDisponible: remainingStock,
    });

    toast.success(`${quantity} unidad${quantity > 1 ? 'es' : ''} agregada${quantity > 1 ? 's' : ''} al carrito`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Search Bar */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-6">Buscar medicamentos</h1>
              <form onSubmit={handleSearch}>
                <div className="flex gap-2 p-2 bg-card rounded-lg shadow-md border border-border">
                  <Input 
                    type="text"
                    placeholder="Buscar medicamento..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button type="submit" className="gap-2">
                    <SearchIcon className="h-4 w-4" />
                    Buscar
                  </Button>
                </div>
              </form>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredMedications.length} resultado{filteredMedications.length !== 1 ? 's' : ''} encontrado{filteredMedications.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {filteredMedications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">
                      No se encontraron medicamentos con "{searchQuery}"
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredMedications.map((med) => {
                  const remainingStock = getRemainingStock(med);

                  return (
                    <Card key={med.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <CardTitle className="text-xl">{med.name}</CardTitle>
                            <CardDescription>{med.description}</CardDescription>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{med.category}</Badge>
                              {getStatusBadge(med.status, remainingStock)}
                            </div>
                          </div>
                          
                          <div className="text-right space-y-2">
                            {med.discountPrice ? (
                              <>
                                <div className="flex items-center gap-2 justify-end">
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${med.price.toFixed(2)}
                                  </span>
                                  <Badge variant="default" className="bg-success gap-1">
                                    <TrendingDown className="h-3 w-3" />
                                    {med.discount}% OFF
                                  </Badge>
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                  ${med.discountPrice.toFixed(2)}
                                </div>
                              </>
                            ) : (
                              <div className="text-2xl font-bold text-foreground">
                                ${med.price.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {med.status !== "out" && remainingStock > 0 && (
                          <div className="mb-4 flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm font-medium">Cantidad:</span>
                            <QuantitySelector
                              quantity={getQuantity(med.id)}
                              onQuantityChange={(qty) => setQuantity(med.id, qty)}
                              maxQuantity={remainingStock || 1}
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3">
                          <Link to={`/medicamento/${med.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              Ver detalles
                            </Button>
                          </Link>
                          {med.status !== "out" && remainingStock > 0 && (
                            <Button 
                              className="flex-1"
                              onClick={() => handleAddToCart(med)}
                            >
                              Agregar al carrito
                            </Button>
                          )}
                        </div>
                        
                        {(med.status === "out" || remainingStock === 0) && (
                          <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <p>Este medicamento está agotado. Regístrate para recibir una notificación cuando vuelva a estar disponible.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
