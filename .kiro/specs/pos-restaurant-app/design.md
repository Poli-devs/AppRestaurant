# Design Document - POS Restaurant App

## Overview

La aplicación POS Restaurant es una solución React Native que implementa un sistema completo de punto de venta para restaurantes utilizando únicamente estado en memoria. La arquitectura sigue un patrón feature-based con separación clara entre lógica de negocio y presentación, utilizando Context API con useReducer para el manejo global del estado.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Native App                         │
├─────────────────────────────────────────────────────────────┤
│  Navigation Layer (Expo Router)                             │
│  ├─ Auth Stack (Login, Register)                            │
│  └─ Main Stack (Empresas, Usuarios, Productos, Inventario)  │
├─────────────────────────────────────────────────────────────┤
│  Feature Modules (Container/Presentational Pattern)         │
│  ├─ empresas/                                               │
│  ├─ usuarios/                                               │
│  └─ productos/                                              │
├─────────────────────────────────────────────────────────────┤
│  Global State Management (Context API + useReducer)         │
│  └─ StoreProvider (empresas, usuarios, productos, sesión)   │
├─────────────────────────────────────────────────────────────┤
│  Shared Components & Utilities                              │
│  ├─ components/ (Button, Input, Card)                       │
│  ├─ hooks/ (useAuth)                                        │
│  └─ utils/ (validators, generators)                         │
└─────────────────────────────────────────────────────────────┘
```

### State Management Architecture

Utilizaremos Context API con useReducer para manejar el estado global:

```typescript
// Estado Global
{
  empresas: Empresa[],
  usuarios: Usuario[],
  roles: Rol[],
  productos: Producto[],
  movimientos: Movimiento[],
  precios: Precio[],
  sesion: {
    usuarioLogueado: Usuario | null
  }
}
```

### Feature-Based Module Structure

Cada feature sigue el patrón Container/Presentational:

```
features/empresas/
├─ components/          # Componentes UI puros
│  └─ EmpresaForm.tsx
├─ hooks/              # Lógica específica del módulo
│  └─ useEmpresa.ts
├─ EmpresaContainer.tsx # Conecta contexto con UI
└─ EmpresaPage.tsx     # Pantalla principal
```

## Components and Interfaces

### Core Interfaces

```typescript
// Empresa
interface Empresa {
  id: string;
  nombre: string;
  ruc: string;
}

// Rol
interface Rol {
  id: string;
  nombre: 'Admin' | 'Mesero' | 'Cocinero';
}

// Usuario
interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
  empresaId: string;
  rolId: string;
}

// Producto
interface Producto {
  id: string;
  nombre: string;
  empresaId: string;
  costoBase: number;
  inventario: number;
}

// Movimiento
interface Movimiento {
  id: string;
  productoId: string;
  tipo: 'ENTRADA';
  cantidad: number;
  fecha: string;
}

// Precio
interface Precio {
  id: string;
  productoId: string;
  precioVenta: number;
  fechaVigencia: string;
}

// Estado de Sesión
interface Sesion {
  usuarioLogueado: Usuario | null;
}
```

### Context API Structure

```typescript
// Store State
interface StoreState {
  empresas: Empresa[];
  usuarios: Usuario[];
  roles: Rol[];
  productos: Producto[];
  movimientos: Movimiento[];
  precios: Precio[];
  sesion: Sesion;
}

// Actions
type StoreAction =
  | { type: 'ADD_EMPRESA'; payload: Empresa }
  | { type: 'ADD_USUARIO'; payload: Usuario }
  | { type: 'LOGIN'; payload: { email: string; password: string } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_PRODUCTO'; payload: Producto }
  | { type: 'ADD_MOVIMIENTO'; payload: Movimiento }
  | { type: 'SET_PRECIO'; payload: Precio };
```

### Component Hierarchy

```
App.tsx
└─ StoreProvider
   └─ NavigationContainer
      ├─ AuthStack (no autenticado)
      │  ├─ LoginScreen
      │  ├─ RegisterEmpresaScreen
      │  └─ RegisterUsuarioScreen
      └─ MainStack (autenticado)
         ├─ HomeScreen
         ├─ EmpresasScreen
         ├─ UsuariosScreen
         ├─ ProductosScreen
         ├─ InventarioScreen
         └─ PreciosScreen
```

## Data Models

### Relationships

```
Empresa (1) ──< (N) Usuario
Rol (1) ──< (N) Usuario
Empresa (1) ──< (N) Producto
Producto (1) ──< (N) Movimiento
Producto (1) ──< (N) Precio
```

### Data Validation Rules

1. **Empresa**
   - nombre: no vacío, mínimo 3 caracteres
   - ruc: formato numérico, 11 dígitos, único

2. **Usuario**
   - nombre: no vacío, mínimo 3 caracteres
   - email: formato válido, único
   - password: no vacío, mínimo 6 caracteres
   - empresaId: debe existir en empresas
   - rolId: debe existir en roles

3. **Producto**
   - nombre: no vacío, mínimo 3 caracteres
   - costoBase: número positivo
   - empresaId: debe existir en empresas

4. **Movimiento**
   - productoId: debe existir en productos
   - cantidad: número positivo entero
   - tipo: solo 'ENTRADA'

5. **Precio**
   - productoId: debe existir en productos
   - precioVenta: número positivo
   - fechaVigencia: fecha válida

## Correctness Properties

