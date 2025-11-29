import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import QuantitySelector from "@/components/QuantitySelector";
import { toast } from "sonner";

const CartPage = () => {
  const { items, totalGeneral, updateQuantity, removeItem, clearCart } = useCart();
  const [isConfirming, setIsConfirming] = useState(false);
  const navigate = useNavigate();

  const handleChangeQuantity = (idMedicamento: string, newQuantity: number, stockDisponible?: number) => {
    if (stockDisponible && newQuantity > stockDisponible) {
      toast.error("No hay stock suficiente para esa cantidad.");
      return;
    }
    updateQuantity(idMedicamento, newQuantity);
  };

  const handleConfirmOrder = async () => {
    if (!items.length) {
      toast.error("El carrito está vacío. Agrega al menos un medicamento.");
      return;
    }

    for (const item of items) {
      if (item.stockDisponible && item.cantidad > item.stockDisponible) {
        toast.error(`No hay stock suficiente para ${item.nombre}.`);
        return;
      }
    }

    setIsConfirming(true);
    try {
      const pedido = {
        usuario: {
          nombre: "Paciente Demo",
        },
        medicamentos: items.map((item) => ({
          idMedicamento: item.idMedicamento,
          nombre: item.nombre,
          precioUnitario: item.precioUnitario,
          cantidad: item.cantidad,
          subtotal: item.subtotal,
        })),
        totalGeneral,
      };

      const codigoPedido = "PED-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      navigate(`/confirmacion/${codigoPedido}`, {
        state: {
          items,
          totalGeneral,
          codigoPedido,
          pedido,
        },
      });

      clearCart();
      toast.success("Pedido confirmado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al confirmar el pedido.");
    } finally {
      setIsConfirming(false);
    }
  };

  const handleClearCart = () => {
    if (!items.length) return;
    clearCart();
    toast.success("Carrito vaciado.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Carrito de compras</h1>

          {!items.length ? (
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Medicamentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.idMedicamento} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.nombre}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.precioUnitario.toFixed(2)} c/u
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.idMedicamento)}
                        >
                          Eliminar
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <QuantitySelector
                          quantity={item.cantidad}
                          onQuantityChange={(q) =>
                            handleChangeQuantity(item.idMedicamento, q, item.stockDisponible)
                          }
                          maxQuantity={item.stockDisponible ?? 99}
                          minQuantity={1}
                        />
                        <p className="font-semibold">
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total general</span>
                    <span className="text-xl font-bold">
                      ${totalGeneral.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleConfirmOrder}
                    disabled={isConfirming || !items.length}
                  >
                    {isConfirming ? "Confirmando..." : "Confirmar pedido"}
                  </Button>

                  <Button
                    className="w-full"
                    variant="outline"
                    size="sm"
                    onClick={handleClearCart}
                    disabled={!items.length}
                  >
                    Vaciar carrito
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
