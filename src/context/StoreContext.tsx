import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { empresasSeed, productosSeed, usuariosSeed } from '../utils/seedData';

/**
 * StoreContext - Manejo de estado global con Context API + useReducer
 * Almacena todos los datos de la aplicación en memoria (sin backend)
 * Patrón: Redux-like con actions y reducer para mantener inmutabilidad
 */

// ============= INTERFACES =============
// Definición de tipos para todas las entidades del sistema
export interface Empresa {
  id: string;
  nombre: string;
  ruc: string;
  direccion: string;
}

export interface Rol {
  id: string;
  nombre: 'Admin' | 'Mesero' | 'Cocinero';
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
  empresaId: string;
  rolId: string;
  direccion: string;
}

export interface Producto {
  id: string;
  nombre: string;
  empresaId: string;
  costoBase: number;
  precioVenta: number;
  inventario: number;
}

export interface Movimiento {
  id: string;
  productoId: string;
  tipo: 'ENTRADA';
  cantidad: number;
  fecha: string;
}

export interface Precio {
  id: string;
  productoId: string;
  precioVenta: number;
  fechaVigencia: string;
}

// ============= STATE =============
// Estado global de la aplicación - Todos los datos viven aquí
export interface StoreState {
  empresas: Empresa[];
  usuarios: Usuario[];
  roles: Rol[];
  productos: Producto[];
  movimientos: Movimiento[];
  precios: Precio[];
  usuarioLogueado: Usuario | null;
}

// ============= ACTIONS =============
// Acciones disponibles para modificar el estado (patrón Redux)
export type StoreAction =
  | { type: 'ADD_EMPRESA'; payload: Empresa }
  | { type: 'ADD_USUARIO'; payload: Usuario }
  | { type: 'LOGIN'; payload: Usuario }
  | { type: 'LOGOUT' }
  | { type: 'ADD_PRODUCTO'; payload: Producto }
  | { type: 'ADD_MOVIMIENTO'; payload: Movimiento }
  | { type: 'UPDATE_PRODUCTO_INVENTARIO'; payload: { productoId: string; cantidad: number } }
  | { type: 'SET_PRECIO'; payload: Precio };

// ============= INITIAL STATE =============
// Roles predefinidos del sistema (requerimiento de la prueba técnica)
const rolesIniciales: Rol[] = [
  { id: '1', nombre: 'Admin' },
  { id: '2', nombre: 'Mesero' },
  { id: '3', nombre: 'Cocinero' },
];

const initialState: StoreState = {
  empresas: empresasSeed,
  usuarios: usuariosSeed,
  roles: rolesIniciales,
  productos: productosSeed,
  movimientos: [],
  precios: [],
  usuarioLogueado: null,
};

// ============= REDUCER =============
// Reducer puro que maneja todas las actualizaciones de estado de forma inmutable
function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_EMPRESA':
      // Agrega una nueva empresa al array manteniendo inmutabilidad
      return {
        ...state,
        empresas: [...state.empresas, action.payload],
      };

    case 'ADD_USUARIO':
      return {
        ...state,
        usuarios: [...state.usuarios, action.payload],
      };

    case 'LOGIN':
      // Establece el usuario autenticado (simula sesión)
      return {
        ...state,
        usuarioLogueado: action.payload,
      };

    case 'LOGOUT':
      // Cierra sesión limpiando el usuario logueado
      return {
        ...state,
        usuarioLogueado: null,
      };

    case 'ADD_PRODUCTO':
      return {
        ...state,
        productos: [...state.productos, action.payload],
      };

    case 'ADD_MOVIMIENTO':
      return {
        ...state,
        movimientos: [...state.movimientos, action.payload],
      };

    case 'UPDATE_PRODUCTO_INVENTARIO':
      // Actualiza el inventario de un producto específico (suma cantidades)
      return {
        ...state,
        productos: state.productos.map((p) =>
          p.id === action.payload.productoId
            ? { ...p, inventario: p.inventario + action.payload.cantidad }
            : p
        ),
      };

    case 'SET_PRECIO':
      return {
        ...state,
        precios: [...state.precios, action.payload],
      };

    default:
      return state;
  }
}

// ============= CONTEXT =============
interface StoreContextType {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// ============= PROVIDER =============
// Componente que envuelve la app y provee el estado global a todos los hijos
export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// ============= HOOK =============
// Hook personalizado para acceder al store desde cualquier componente
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore debe usarse dentro de StoreProvider');
  }
  return context;
}
