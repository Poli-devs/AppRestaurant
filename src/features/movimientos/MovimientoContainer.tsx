import React, { useState } from 'react';
import { Alert } from 'react-native';
import { MovimientoForm } from './components/MovimientoForm';
import { useMovimiento } from './hooks/useMovimiento';

interface MovimientoContainerProps {
  onSuccess?: () => void;
}

/**
 * Container que conecta el formulario con la lógica de negocio
 * Patrón Container/Presentational
 */
export default function MovimientoContainer({ onSuccess }: MovimientoContainerProps) {
  const { createMovimiento, productos, loading, error } = useMovimiento();
  const [key, setKey] = useState(0);

  const handleSubmit = async (data: { productoId: string; tipo: 'ENTRADA'; cantidad: number }) => {
    const success = await createMovimiento(data);

    if (success) {
      if (typeof window !== 'undefined') {
        window.alert('✅ Entrada registrada correctamente');
      } else {
        Alert.alert('Éxito', 'Entrada registrada correctamente');
      }
      setKey((prev) => prev + 1); // Resetea el formulario cambiando la key
      onSuccess?.();
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  return <MovimientoForm key={key} onSubmit={handleSubmit} productos={productos} loading={loading} />;
}
