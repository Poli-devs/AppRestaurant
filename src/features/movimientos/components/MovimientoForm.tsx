import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { colors, commonStyles } from '../../../styles/commonStyles';

interface MovimientoFormProps {
  onSubmit: (data: { productoId: string; tipo: 'ENTRADA'; cantidad: number }) => void;
  productos: Array<{ id: string; nombre: string }>;
  loading?: boolean;
}

export function MovimientoForm({ onSubmit, productos, loading }: MovimientoFormProps) {
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [errors, setErrors] = useState({
    productoId: '',
    cantidad: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      productoId: '',
      cantidad: '',
    };

    let isValid = true;

    if (!productoId) {
      newErrors.productoId = 'Selecciona un producto';
      isValid = false;
    }

    const cantidadNum = parseInt(cantidad);
    if (!cantidad.trim()) {
      newErrors.cantidad = 'La cantidad es requerida';
      isValid = false;
    } else if (isNaN(cantidadNum)) {
      newErrors.cantidad = 'Debe ser un número válido';
      isValid = false;
    } else if (cantidadNum <= 0) {
      newErrors.cantidad = 'Debe ser mayor a 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        productoId,
        tipo: 'ENTRADA',
        cantidad: parseInt(cantidad),
      });
    }
  };

  return (
    <View style={commonStyles.formContainer}>
      {/* Producto */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Producto *</Text>
        <View style={[styles.pickerContainer, errors.productoId && styles.inputError]}>
          <Picker
            selectedValue={productoId}
            onValueChange={(value) => {
              setProductoId(value);
              if (errors.productoId) setErrors({ ...errors, productoId: '' });
            }}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un producto" value="" />
            {productos.map((producto) => (
              <Picker.Item key={producto.id} label={producto.nombre} value={producto.id} />
            ))}
          </Picker>
        </View>
        {errors.productoId ? <Text style={styles.errorText}>{errors.productoId}</Text> : null}
      </View>

      {/* Cantidad */}
      <Input
        label="Cantidad a Ingresar"
        value={cantidad}
        onChangeText={(text) => {
          // Solo permitir números enteros
          const filtered = text.replace(/[^0-9]/g, '');
          setCantidad(filtered);
          if (errors.cantidad) setErrors({ ...errors, cantidad: '' });
        }}
        placeholder="Ej: 100"
        keyboardType="number-pad"
        error={errors.cantidad}
      />

      {/* Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 Esta cantidad se sumará al inventario actual del producto seleccionado.
        </Text>
      </View>

      {/* Botón */}
      <Button title="Registrar Entrada" onPress={handleSubmit} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d0e8ff',
  },
  infoText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
});
