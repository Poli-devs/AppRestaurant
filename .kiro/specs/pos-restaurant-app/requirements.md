# Requirements Document

## Introduction

Esta aplicación es un sistema de Punto de Venta (POS) para restaurantes desarrollado en React Native. El sistema simula la lógica de negocio completa utilizando únicamente estado en memoria (sin backend), permitiendo la gestión de empresas, usuarios con roles, productos, inventario y precios. La aplicación está diseñada para demostrar competencias en manejo de estado, arquitectura modular y lógica de negocio en frontend.

## Glossary

- **Sistema**: La aplicación React Native de POS para restaurantes
- **Empresa**: Entidad que representa un restaurante o negocio que utiliza el sistema
- **Usuario**: Persona que accede al sistema con credenciales y permisos específicos
- **Rol**: Conjunto de permisos asignados a un usuario (Admin, Mesero, Cocinero)
- **Producto**: Artículo o platillo que la empresa ofrece en su menú
- **Movimiento**: Registro de entrada o salida de inventario para un producto
- **Precio**: Valor de venta asignado a un producto en una fecha específica
- **Estado en Memoria**: Datos almacenados en el estado de la aplicación usando React hooks
- **Sesión**: Estado del usuario autenticado actualmente en el sistema

## Requirements

### Requirement 1: Gestión de Empresas

**User Story:** Como administrador del sistema, quiero crear y almacenar empresas en memoria, para que puedan ser asociadas con usuarios y productos.

#### Acceptance Criteria

1. WHEN un administrador proporciona datos de empresa (nombre, RUC), THEN el Sistema SHALL crear un objeto Empresa con un ID único y agregarlo al array global de empresas
2. WHEN se crea una empresa, THEN el Sistema SHALL validar que el nombre no esté vacío y que el RUC tenga formato válido
3. WHEN se solicita la lista de empresas, THEN el Sistema SHALL retornar todos los objetos Empresa almacenados en el estado
4. WHEN se intenta crear una empresa con RUC duplicado, THEN el Sistema SHALL rechazar la operación y mantener el estado actual

### Requirement 2: Gestión de Roles

**User Story:** Como desarrollador del sistema, quiero tener roles predefinidos disponibles, para que puedan ser asignados a los usuarios durante su creación.

#### Acceptance Criteria

1. WHEN el Sistema se inicializa, THEN el Sistema SHALL proporcionar un array de roles predefinidos con ID y nombre (Admin, Mesero, Cocinero)
2. WHEN se consultan los roles disponibles, THEN el Sistema SHALL retornar la lista completa de roles sin modificaciones
3. WHEN se asigna un rol a un usuario, THEN el Sistema SHALL validar que el ID del rol exista en la lista predefinida

### Requirement 3: Gestión de Usuarios

**User Story:** Como administrador de empresa, quiero crear usuarios asociados a mi empresa con roles específicos, para que puedan acceder al sistema con permisos apropiados.

#### Acceptance Criteria

1. WHEN un administrador proporciona datos de usuario (nombre, email, password, empresaId, rolId), THEN el Sistema SHALL crear un objeto Usuario con ID único y agregarlo al array global de usuarios
2. WHEN se crea un usuario, THEN el Sistema SHALL validar que el email tenga formato válido y no esté duplicado
3. WHEN se crea un usuario, THEN el Sistema SHALL validar que la empresaId corresponda a una Empresa existente
4. WHEN se crea un usuario, THEN el Sistema SHALL validar que el rolId corresponda a un Rol existente
5. WHEN se almacena el password, THEN el Sistema SHALL almacenarlo sin encriptación en el estado

### Requirement 4: Autenticación de Usuarios

**User Story:** Como usuario registrado, quiero iniciar sesión con mi email y password, para que pueda acceder a las funcionalidades del sistema según mi rol.

#### Acceptance Criteria

1. WHEN un usuario proporciona email y password, THEN el Sistema SHALL buscar en el array de usuarios una coincidencia exacta
2. WHEN las credenciales coinciden con un usuario existente, THEN el Sistema SHALL almacenar el objeto del usuario en el estado de sesión (usuarioLogueado)
3. WHEN las credenciales no coinciden, THEN el Sistema SHALL rechazar el login y mantener el estado de sesión como null
4. WHEN un usuario cierra sesión, THEN el Sistema SHALL establecer el estado de sesión (usuarioLogueado) como null
5. WHEN un usuario está autenticado, THEN el Sistema SHALL permitir acceso a las funcionalidades según su rol

### Requirement 5: Gestión de Productos

**User Story:** Como administrador de empresa, quiero crear productos asociados a mi empresa, para que puedan ser utilizados en el sistema de inventario y ventas.

#### Acceptance Criteria

1. WHEN un usuario autenticado crea un producto (nombre, costoBase), THEN el Sistema SHALL crear un objeto Producto asociado a la empresaId del usuario logueado
2. WHEN se crea un producto, THEN el Sistema SHALL validar que el nombre no esté vacío y que el costoBase sea un número positivo
3. WHEN se crea un producto, THEN el Sistema SHALL asignar un ID único al producto
4. WHEN se consultan productos, THEN el Sistema SHALL retornar solo los productos asociados a la empresa del usuario logueado
5. WHEN se intenta crear un producto sin estar autenticado, THEN el Sistema SHALL rechazar la operación

### Requirement 6: Gestión de Movimientos de Inventario

**User Story:** Como administrador de empresa, quiero registrar movimientos de entrada de inventario para mis productos, para que pueda controlar el stock disponible.

#### Acceptance Criteria

1. WHEN un usuario autenticado registra un movimiento de ENTRADA (productoId, cantidad), THEN el Sistema SHALL crear un objeto Movimiento con tipo ENTRADA y fecha actual
2. WHEN se registra un movimiento de ENTRADA, THEN el Sistema SHALL validar que el productoId corresponda a un producto de la empresa del usuario
3. WHEN se registra un movimiento de ENTRADA, THEN el Sistema SHALL validar que la cantidad sea un número positivo
4. WHEN se registra un movimiento de ENTRADA, THEN el Sistema SHALL incrementar el inventario total del producto por la cantidad especificada
5. WHEN se consulta el inventario de un producto, THEN el Sistema SHALL calcular la suma de todas las cantidades de movimientos de ENTRADA para ese producto

### Requirement 7: Gestión de Precios de Venta

**User Story:** Como administrador de empresa, quiero definir precios de venta para mis productos, para que puedan ser utilizados en las transacciones de venta.

#### Acceptance Criteria

1. WHEN un usuario autenticado define un precio de venta (productoId, precioVenta), THEN el Sistema SHALL crear o actualizar el precio del producto con fecha de vigencia actual
2. WHEN se define un precio, THEN el Sistema SHALL validar que el productoId corresponda a un producto de la empresa del usuario
3. WHEN se define un precio, THEN el Sistema SHALL validar que el precioVenta sea un número positivo
4. WHEN se consulta el precio de un producto, THEN el Sistema SHALL retornar el precio vigente más reciente
5. WHEN un producto no tiene precio definido, THEN el Sistema SHALL indicar que el precio no está disponible

### Requirement 8: Interfaz de Usuario

**User Story:** Como usuario del sistema, quiero una interfaz clara e intuitiva para cada funcionalidad, para que pueda realizar mis tareas de manera eficiente.

#### Acceptance Criteria

1. WHEN un usuario accede a cualquier formulario, THEN el Sistema SHALL mostrar campos claramente etiquetados con validación en tiempo real
2. WHEN se completa una operación exitosamente, THEN el Sistema SHALL mostrar un mensaje de confirmación al usuario
3. WHEN ocurre un error de validación, THEN el Sistema SHALL mostrar mensajes de error específicos y comprensibles
4. WHEN un usuario navega entre pantallas, THEN el Sistema SHALL mantener la consistencia visual y de navegación
5. WHEN un usuario no está autenticado, THEN el Sistema SHALL mostrar solo las pantallas de login y registro de empresa/usuario

### Requirement 9: Persistencia de Estado en Memoria

**User Story:** Como desarrollador del sistema, quiero que todos los datos se almacenen en el estado de la aplicación, para cumplir con los requisitos de la prueba técnica sin necesidad de backend.

#### Acceptance Criteria

1. WHEN la aplicación se inicializa, THEN el Sistema SHALL crear estructuras de estado para almacenar empresas, usuarios, roles, productos, movimientos y precios
2. WHEN se realiza cualquier operación CRUD, THEN el Sistema SHALL modificar únicamente el estado en memoria sin persistencia externa
3. WHEN la aplicación se reinicia, THEN el Sistema SHALL perder todos los datos almacenados (comportamiento esperado para estado en memoria)
4. WHEN se actualiza el estado, THEN el Sistema SHALL re-renderizar los componentes afectados automáticamente
5. WHILE la aplicación está en ejecución, THEN el Sistema SHALL mantener la integridad referencial entre entidades relacionadas (empresaId, rolId, productoId)
