import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { commonStyles } from '../../../styles/commonStyles';
import { validarRUC } from '../../../utils/validators';

// Componente presentacional - Solo UI, sin lógica de negocio
interface EmpresaFormProps {
  onSubmit: (nombre: string, ruc: string, direccion: string) => Promise<{ success: boolean; error?: string }>;
  loading?: boolean;
}

export function EmpresaForm({ onSubmit, loading = false }: EmpresaFormProps) {
  const [nombre, setNombre] = useState('');
  const [ruc, setRuc] = useState('');
  const [direccion, setDireccion] = useState('');
  const [errors, setErrors] = useState<{ nombre?: string; ruc?: string; direccion?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validar = (): boolean => {
    const newErrors: { nombre?: string; ruc?: string; direccion?: string } = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!ruc.trim()) {
      newErrors.ruc = 'El RUC es requerido';
    } else if (!/^\d{13}$/.test(ruc)) {
      newErrors.ruc = 'El RUC debe tener exactamente 13 dígitos numéricos';
    } else if (!validarRUC(ruc)) {
      newErrors.ruc = 'El RUC ecuatoriano no es válido. Verifica el número';
    }

    if (!direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (direccion.trim().length < 5) {
      newErrors.direccion = 'La dirección debe tener al menos 5 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validar()) {
      setIsSubmitting(true);
      const resultado = await onSubmit(nombre, ruc, direccion);
      setIsSubmitting(false);
      
      if (!resultado.success && resultado.error) {
        // Mostrar el error en el campo correspondiente
        if (resultado.error.includes('RUC')) {
          setErrors({ ...errors, ruc: resultado.error });
        } else {
          setErrors({ ...errors, nombre: resultado.error });
        }
      }
    }
  };

  return (
    <View style={commonStyles.formContainer}>
      <Input
        label="Nombre de la Empresa"
        value={nombre}
        onChangeText={(text) => {
          setNombre(text);
          if (errors.nombre) setErrors({ ...errors, nombre: undefined });
        }}
        placeholder="Ej: Restaurante El Buen Sabor"
        error={errors.nombre}
      />

      <Input
        label="RUC (13 dígitos)"
        value={ruc}
        onChangeText={(text) => {
          setRuc(text);
          if (errors.ruc) setErrors({ ...errors, ruc: undefined });
        }}
        placeholder="1234567890001"
        keyboardType="numeric"
        maxLength={13}
        error={errors.ruc}
      />

      <Input
        label="Dirección"
        value={direccion}
        onChangeText={(text) => {
          setDireccion(text);
          if (errors.direccion) setErrors({ ...errors, direccion: undefined });
        }}
        placeholder="Ej: Av. 10 de Agosto y Colón"
        error={errors.direccion}
      />

      <Button
        title="✓ Crear Empresa"
        onPress={handleSubmit}
        loading={isSubmitting || loading}
      />
    </View>
  );
}
