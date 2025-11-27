import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { colors, commonStyles } from '../../../styles/commonStyles';

interface ProductoFormProps {
  onSubmit: (data: { nombre: string; costoBase: number; precioVenta: number; inventario: number; empresaId: string }) => void;
  empresaId: string;
  loading?: boolean;
}

export function ProductoForm({ onSubmit, empresaId, loading }: ProductoFormProps) {
  const [nombre, setNombre] = useState('');
  const [costoBase, setCostoBase] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [errors, setErrors] = useState({
    nombre: '',
    costoBase: '',
    precioVenta: '',
    cantidad: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      nombre: '',
      costoBase: '',
      precioVenta: '',
      cantidad: '',
    };

    let isValid = true;

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
      isValid = false;
    } else if (nombre.trim().length < 3) {
      newErrors.nombre = 'Mínimo 3 caracteres';
      isValid = false;
    }

    const costoNum = parseFloat(costoBase);
    if (!costoBase.trim()) {
      newErrors.costoBase = 'El costo base es requerido';
      isValid = false;
    } else if (isNaN(costoNum)) {
      newErrors.costoBase = 'Debe ser un número válido';
      isValid = false;
    } else if (costoNum <= 0) {
      newErrors.costoBase = 'Debe ser mayor a 0';
      isValid = false;
    }

    const precioNum = parseFloat(precioVenta);
    if (!precioVenta.trim()) {
      newErrors.precioVenta = 'El precio de venta es requerido';
      isValid = false;
    } else if (isNaN(precioNum)) {
      newErrors.precioVenta = 'Debe ser un número válido';
      isValid = false;
    } else if (precioNum <= 0) {
      newErrors.precioVenta = 'Debe ser mayor a 0';
      isValid = false;
    } else if (precioNum <= costoNum) {
      newErrors.precioVenta = 'Debe ser mayor al costo base';
      isValid = false;
    }

    const cantidadNum = parseInt(cantidad);
    if (!cantidad.trim()) {
      newErrors.cantidad = 'La cantidad es requerida';
      isValid = false;
    } else if (isNaN(cantidadNum)) {
      newErrors.cantidad = 'Debe ser un número válido';
      isValid = false;
    } else if (cantidadNum < 0) {
      newErrors.cantidad = 'No puede ser negativo';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        nombre: nombre.trim(),
        costoBase: parseFloat(costoBase),
        precioVenta: parseFloat(precioVenta),
        inventario: parseInt(cantidad),
        empresaId,
      });
    }
  };

  return (
    <View style={commonStyles.formContainer}>
      {/* Nombre */}
      <Input
        label="Nombre del Producto"
        value={nombre}
        onChangeText={(text) => {
          setNombre(text);
          if (errors.nombre) setErrors({ ...errors, nombre: '' });
        }}
        placeholder="Ej: Pizza Margarita"
        error={errors.nombre}
      />

      {/* Costo Base */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Costo Base *</Text>
        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <View style={styles.inputWrapper}>
            <Input
              label=""
              value={costoBase}
              onChangeText={(text) => {
                // Solo permitir números y punto decimal
                const filtered = text.replace(/[^0-9.]/g, '');
                setCostoBase(filtered);
                if (errors.costoBase) setErrors({ ...errors, costoBase: '' });
              }}
              placeholder="0.00"
              keyboardType="decimal-pad"
              error={errors.costoBase}
            />
          </View>
        </View>
      </View>

      {/* Precio de Venta */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Precio de Venta *</Text>
        <View style={styles.priceInputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <View style={styles.inputWrapper}>
            <Input
              label=""
              value={precioVenta}
              onChangeText={(text) => {
                // Solo permitir números y punto decimal
                const filtered = text.replace(/[^0-9.]/g, '');
                setPrecioVenta(filtered);
                if (errors.precioVenta) setErrors({ ...errors, precioVenta: '' });
              }}
              placeholder="0.00"
              keyboardType="decimal-pad"
              error={errors.precioVenta}
            />
          </View>
        </View>
      </View>

      {/* Cantidad (Inventario Inicial) */}
      <Input
        label="Cantidad Inicial"
        value={cantidad}
        onChangeText={(text) => {
          // Solo permitir números enteros
          const filtered = text.replace(/[^0-9]/g, '');
          setCantidad(filtered);
          if (errors.cantidad) setErrors({ ...errors, cantidad: '' });
        }}
        placeholder="Ej: 50"
        keyboardType="number-pad"
        error={errors.cantidad}
      />

      {/* Botón */}
      <Button title="Crear Producto" onPress={handleSubmit} loading={loading} />
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
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 12,
  },
  inputWrapper: {
    flex: 1,
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
