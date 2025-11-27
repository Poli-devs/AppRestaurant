import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ProductoForm } from './components/ProductoForm';
import { useProducto } from './hooks/useProducto';

interface ProductoContainerProps {
  onSuccess?: () => void;
}

/**
 * Container que conecta el formulario con la lógica de negocio
 * Patrón Container/Presentational
 */
export default function ProductoContainer({ onSuccess }: ProductoContainerProps) {
  const { createProducto, loading, error, usuarioLogueado } = useProducto();
  const [key, setKey] = useState(0);

  const handleSubmit = async (data: { nombre: string; costoBase: number; precioVenta: number; inventario: number; empresaId: string }) => {
    const success = await createProducto(data);

    if (success) {
      if (typeof window !== 'undefined') {
        window.alert('✅ Producto creado correctamente');
      } else {
        Alert.alert('Éxito', 'Producto creado correctamente');
      }
      setKey(prev => prev + 1); // Resetea el formulario cambiando la key
      onSuccess?.();
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  if (!usuarioLogueado) {
    return null;
  }

  return <ProductoForm key={key} onSubmit={handleSubmit} empresaId={usuarioLogueado.empresaId} loading={loading} />;
}
