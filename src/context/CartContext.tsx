import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export interface CartItem {
  idMedicamento: string;
  nombre: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
  stockDisponible?: number;
}

interface CartContextValue {
  items: CartItem[];
  totalGeneral: number;
  addItem: (item: Omit<CartItem, "subtotal">) => void;
  updateQuantity: (idMedicamento: string, cantidad: number) => void;
  removeItem: (idMedicamento: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem: CartContextValue["addItem"] = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.idMedicamento === item.idMedicamento);
      const nuevaCantidad = (existing?.cantidad || 0) + item.cantidad;

      if (item.stockDisponible && nuevaCantidad > item.stockDisponible) {
        return prev;
      }

      if (existing) {
        return prev.map((i) =>
          i.idMedicamento === item.idMedicamento
            ? {
                ...i,
                cantidad: nuevaCantidad,
                subtotal: nuevaCantidad * i.precioUnitario,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          subtotal: item.cantidad * item.precioUnitario,
        },
      ];
    });
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (idMedicamento, cantidad) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.idMedicamento === idMedicamento
            ? {
                ...item,
                cantidad,
                subtotal: cantidad * item.precioUnitario,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeItem: CartContextValue["removeItem"] = (idMedicamento) => {
    setItems((prev) => prev.filter((item) => item.idMedicamento !== idMedicamento));
  };

  const clearCart = () => setItems([]);

  const totalGeneral = useMemo(
    () => items.reduce((acc, item) => acc + item.subtotal, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    totalGeneral,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return ctx;
};
