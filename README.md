# AppRestaurant

**POS Restaurant System – React Native Application**

Technical test developed for a Frontend Developer position, implementing a complete Point of Sale (POS) system for restaurants with multi-company support, role-based permissions, and inventory management.

This project is built with React Native (Expo), TypeScript, and Context API for state management, following clean architecture principles and the Container/Presentational pattern.

---

## 🎯 Project Objective

Build a complete in-memory POS application for restaurants that includes:

### Core Features (Required)
- ✅ Company management (CRUD)
- ✅ User management with role assignment
- ✅ Role-based authentication system
- ✅ Multi-company data isolation

### Advanced Features (Plus)
- ✅ Product management with pricing
- ✅ Inventory movements (ENTRY type)
- ✅ Real-time inventory tracking
- ✅ Multi-company support with permissions

---

## 📁 Project Structure

```
AppRestaurant/
│
├── app/                              # Expo Router pages
│   ├── (tabs)/                       # Tab navigation
│   │   ├── index.tsx                 # Home screen (Dashboard)
│   │   ├── explore.tsx               # Explore screen
│   │   └── _layout.tsx               # Tab layout
│   ├── _layout.tsx                   # Root layout
│   └── modal.tsx                     # Modal screen
│
├── src/
│   ├── components/                   # Reusable UI components
│   │   ├── Button.tsx                # Custom button component
│   │   ├── Input.tsx                 # Custom input with validation
│   │   ├── EmptyState.tsx            # Empty state component
│   │   ├── SortableTableHeader.tsx   # Sortable table headers
│   │   ├── Dashboard.tsx             # Main dashboard
│   │   └── MainLayout.tsx            # Layout with sidebar
│   │
│   ├── context/
│   │   └── StoreContext.tsx          # Global state management (Context API + useReducer)
│   │
│   ├── features/                     # Feature modules
│   │   ├── auth/
│   │   │   └── LoginPage.tsx         # Login screen with validation
│   │   │
│   │   ├── empresas/                 # Companies module
│   │   │   ├── EmpresaPage.tsx       # Main page
│   │   │   ├── EmpresaContainer.tsx  # Container component
│   │   │   ├── components/
│   │   │   │   ├── EmpresaForm.tsx   # Form component
│   │   │   │   └── EmpresaList.tsx   # List component
│   │   │   └── hooks/
│   │   │       └── useEmpresa.ts     # Business logic hook
│   │   │
│   │   ├── usuarios/                 # Users module
│   │   │   ├── UsuarioPage.tsx
│   │   │   ├── UsuarioContainer.tsx
│   │   │   ├── components/
│   │   │   │   ├── UsuarioForm.tsx
│   │   │   │   └── UsuarioList.tsx
│   │   │   └── hooks/
│   │   │       └── useUsuario.ts
│   │   │
│   │   ├── productos/                # Products module
│   │   │   ├── ProductoPage.tsx
│   │   │   ├── ProductoContainer.tsx
│   │   │   ├── components/
│   │   │   │   ├── ProductoForm.tsx
│   │   │   │   └── ProductoList.tsx
│   │   │   └── hooks/
│   │   │       └── useProducto.ts
│   │   │
│   │   └── movimientos/              # Inventory movements module
│   │       ├── MovimientoPage.tsx
│   │       ├── MovimientoContainer.tsx
│   │       ├── components/
│   │       │   ├── MovimientoForm.tsx
│   │       │   └── MovimientoList.tsx
│   │       └── hooks/
│   │           └── useMovimiento.ts
│   │
│   ├── hooks/
│   │   └── useTableSort.ts           # Custom hook for table sorting
│   │
│   ├── styles/
│   │   └── commonStyles.ts           # Shared styles and theme
│   │
│   └── utils/
│       ├── generators.ts             # ID generation utilities
│       ├── validators.ts             # Validation functions (RUC, email, etc.)
│       └── seedData.ts               # Initial test data
│
├── constants/
│   └── theme.ts                      # Theme configuration
│
├── package.json
└── tsconfig.json
```

---

## 🛠 Technologies Used

### Frontend
- **React Native** (Expo SDK 54)
- **TypeScript** - Type safety
- **Expo Router** - File-based routing
- **Context API + useReducer** - State management
- **React Native Picker** - Dropdown selects
- **Expo Vector Icons** - Icon library

### Architecture & Patterns
- **Clean Architecture** - Separation of concerns
- **Container/Presentational Pattern** - UI/Logic separation
- **Custom Hooks** - Reusable business logic
- **Context API** - Global state management
- **Reducer Pattern** - Predictable state updates

---

## 📦 Installation and Setup

### Prerequisites
- Node.js v20 or higher
- npm or yarn
- Expo CLI (optional)

### 1. Clone the repository

```bash
git clone https://github.com/Poli-devs/AppRestaurant.git
cd AppRestaurant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

Or with cache clearing:

```bash
npx expo start --clear
```

### 4. Run on your device

- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`
- **Web Browser**: Press `w`
- **Physical Device**: Scan QR code with Expo Go app

---

## 👥 User Roles & Permissions

### System Admin (empresaId: '1', rolId: '1')
- ✅ Create companies
- ✅ Create users for any company
- ✅ Create products for any company
- ✅ Register inventory movements
- ✅ View all system data

### Restaurant Admin (empresaId: '2+', rolId: '1')
- ❌ Cannot create companies
- ✅ Create users for their restaurant
- ✅ Create products for their restaurant
- ✅ Register inventory movements
- ✅ View only their restaurant data

### Waiter (rolId: '2') & Cook (rolId: '3')
- ❌ Cannot create companies
- ❌ Cannot create users
- ✅ Create products for their restaurant
- ✅ Register inventory movements
- ✅ View only their restaurant data

---

## 🔐 Test Credentials

### System Admin
- **Email**: admin@restaurant.com
- **Password**: 123456
- **Access**: Full system access
---

## 📱 Available Screens

| Route | Description |
|-------|-------------|
| `/` | Login screen with validation |
| Dashboard - Empresas | Company management (CRUD) |
| Dashboard - Usuarios | User management with role assignment |
| Dashboard - Productos | Product management with pricing |
| Dashboard - Movimientos | Inventory movements tracking |

---

## 🗄 Data Models

### Company (Empresa)
```typescript
{
  id: string;
  nombre: string;
  ruc: string;        // 13-digit Ecuadorian RUC with validation
  direccion: string;
}
```

### User (Usuario)
```typescript
{
  id: string;
  nombre: string;
  email: string;
  password: string;   // Unencrypted (as per requirements)
  empresaId: string;
  rolId: string;
  direccion: string;
}
```

### Role (Rol)
```typescript
{
  id: string;
  nombre: 'Admin' | 'Mesero' | 'Cocinero';
}
```

### Product (Producto)
```typescript
{
  id: string;
  nombre: string;
  empresaId: string;
  costoBase: number;
  precioVenta: number;
  inventario: number;
}
```

### Movement (Movimiento)
```typescript
{
  id: string;
  productoId: string;
  tipo: 'ENTRADA';
  cantidad: number;
  fecha: string;      // ISO format
}
```

---

## ✨ Key Features

### 🏢 Multi-Company Support
- Complete data isolation between companies
- System admin can view all data
- Restaurant admins only see their company data

### 🔐 Authentication & Authorization
- Email/password login with validation
- Role-based access control
- Personalized error messages
- Session management with Context API

### 📊 Data Management
- CRUD operations for all entities
- Real-time search and filtering
- Sortable tables (ascending/descending)
- Form validation with error messages

### 📦 Inventory Management
- Register product entries
- Automatic inventory updates
- Movement history tracking
- Real-time stock status

### 🎨 User Interface
- Clean and modern design
- Responsive layout
- Loading states
- Empty states with helpful messages
- Success/error notifications
- Modal forms with backdrop

---

## 🧪 Validation Rules

### Company (RUC)
- Must be exactly 13 digits
- Must pass Ecuadorian RUC validation algorithm
- Must be unique in the system

### User (Email)
- Must be valid email format
- Must be unique in the system
- Password minimum 6 characters

### Product
- Name minimum 3 characters
- Sale price must be greater than base cost
- Quantity cannot be negative

---

## 🎯 Technical Highlights

### State Management
- Centralized state with Context API
- Reducer pattern for predictable updates
- Immutable state updates
- Type-safe actions

### Code Organization
- Feature-based folder structure
- Separation of concerns (Container/Presentational)
- Reusable custom hooks
- Shared components and styles

### Data Validation
- Client-side validation
- Business logic validation
- Ecuadorian RUC algorithm implementation
- Email format validation

### User Experience
- Instant feedback on actions
- Loading states during operations
- Clear error messages
- Automatic form reset after success
- Search and filter capabilities
- Sortable table columns

---

## 📝 Notes

- All data is stored in memory (Context API)
- Data persists only during the session
- No backend or database required
- Passwords are stored unencrypted (as per requirements)
- RUC validation follows Ecuadorian standards

---

## 👨‍💻 Author

Autor
Luis Fernando 
Desarrollador de Software
GitHub: https://github.com/Poli-devs
www.polidevs.com
---

## 📄 License

This project was developed as a technical test for a job application.

---

## 🙏 Acknowledgments

Technical test completed for a Frontend Developer position, demonstrating skills in:
- React Native & Expo
- TypeScript
- State Management
- Clean Architecture
- UI/UX Design
- Form Validation
- Multi-company Systems
