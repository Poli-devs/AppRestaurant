import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { colors, commonStyles } from '../../../styles/commonStyles';

interface UsuarioFormProps {
  onSubmit: (data: {
    nombre: string;
    email: string;
    password: string;
    direccion: string;
    empresaId: string;
    rolId: string;
  }) => Promise<{ success: boolean; error?: string }>;
  empresas: Array<{ id: string; nombre: string }>;
  roles: Array<{ id: string; nombre: string }>;
  loading?: boolean;
}

export function UsuarioForm({ onSubmit, empresas, roles, loading }: UsuarioFormProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [rolId, setRolId] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    password: '',
    direccion: '',
    empresaId: '',
    rolId: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      nombre: '',
      email: '',
      password: '',
      direccion: '',
      empresaId: '',
      rolId: '',
    };

    let isValid = true;

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
      isValid = false;
    } else if (nombre.trim().length < 3) {
      newErrors.nombre = 'Mínimo 3 caracteres';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
      isValid = false;
    }

    if (!direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
      isValid = false;
    } else if (direccion.trim().length < 5) {
      newErrors.direccion = 'Mínimo 5 caracteres';
      isValid = false;
    }

    if (!empresaId) {
      newErrors.empresaId = 'Selecciona una empresa';
      isValid = false;
    }

    if (!rolId) {
      newErrors.rolId = 'Selecciona un rol';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const resultado = await onSubmit({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        password,
        direccion: direccion.trim(),
        empresaId,
        rolId,
      });

      // Si hay error, mostrarlo en el campo correspondiente
      if (!resultado.success && resultado.error) {
        if (resultado.error.toLowerCase().includes('email')) {
          setErrors({ ...errors, email: resultado.error });
        } else {
          setErrors({ ...errors, nombre: resultado.error });
        }
      }
    }
  };

  return (
    <View style={commonStyles.formContainer}>
      {/* Nombre */}
      <Input
        label="Nombre Completo"
        value={nombre}
        onChangeText={(text) => {
          setNombre(text);
          if (errors.nombre) setErrors({ ...errors, nombre: '' });
        }}
        placeholder="Ej: Juan Pérez"
        error={errors.nombre}
      />

      {/* Email */}
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: '' });
        }}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />

      {/* Password */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contraseña *</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, errors.password && styles.inputError]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
          />
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={colors.textMuted}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          />
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>

      {/* Dirección */}
      <Input
        label="Dirección"
        value={direccion}
        onChangeText={(text) => {
          setDireccion(text);
          if (errors.direccion) setErrors({ ...errors, direccion: '' });
        }}
        placeholder="Ej: Av. Principal 123, Lima"
        error={errors.direccion}
      />

      {/* Empresa */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Empresa *</Text>
        <View style={[styles.pickerContainer, errors.empresaId && styles.inputError]}>
          <Picker
            selectedValue={empresaId}
            onValueChange={(value) => {
              setEmpresaId(value);
              if (errors.empresaId) setErrors({ ...errors, empresaId: '' });
            }}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una empresa" value="" />
            {empresas.map((empresa) => (
              <Picker.Item key={empresa.id} label={empresa.nombre} value={empresa.id} />
            ))}
          </Picker>
        </View>
        {errors.empresaId ? <Text style={styles.errorText}>{errors.empresaId}</Text> : null}
      </View>

      {/* Rol */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Rol *</Text>
        <View style={[styles.pickerContainer, errors.rolId && styles.inputError]}>
          <Picker
            selectedValue={rolId}
            onValueChange={(value) => {
              setRolId(value);
              if (errors.rolId) setErrors({ ...errors, rolId: '' });
            }}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona un rol" value="" />
            {roles.map((rol) => (
              <Picker.Item key={rol.id} label={rol.nombre} value={rol.id} />
            ))}
          </Picker>
        </View>
        {errors.rolId ? <Text style={styles.errorText}>{errors.rolId}</Text> : null}
      </View>

      {/* Botón */}
      <Button title="Crear Usuario" onPress={handleSubmit} loading={loading} />
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
  },
  eyeIcon: {
    padding: 8,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 4,
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
});
