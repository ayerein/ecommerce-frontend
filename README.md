# 💻 Ecommerce Frontend - React

Esta es la interfaz de usuario de mi proyecto Ecommerce Full Stack. Está construida enfocándose en la modularidad, la experiencia de usuario y el rendimiento.

**🔗 [Ver la tienda en vivo](https://ecommerce-ayerein.netlify.app/)**

---

## 🛠️ Stack Tecnológico

* **React (Vite):** Framework principal para una experiencia de desarrollo rápida.
* **Context API:** Gestión de estado global para el flujo de compra y la sincronización de productos.
* **JWT & Cookies:** Autenticación segura mediante JSON Web Tokens almacenados en cookies firmadas (`httpOnly`).
* **CSS Modules:** Estilos encapsulados por componente para evitar colisiones y facilitar el mantenimiento.
* **Hooks Personalizados:** Abstracción de lógica (ej. `useProductModal`, `useProducts`).
* **React Router DOM:** Manejo de rutas protegidas y navegación SPA.

---

## 🔐 Autenticación y Seguridad (NUEVO)

Se implemento un sistema de usuarios utilizando **Passport.js** en el backend y una integración profunda en el frontend:

* **Persistencia de Sesión:** Gracias al endpoint `/api/sessions/current` y la estrategia "current", la sesión se mantiene activa incluso al recargar la página.
* **Merge de Carrito:** Si un usuario agrega productos como "invitado" y luego inicia sesión o se registra, el sistema transfiere automáticamente esos productos a su carrito de usuario.
* **Roles y Autorización:** Las vistas de administración están protegidas; solo los usuarios con rol `admin` pueden acceder al CRUD de productos.
* **Checkout Protegido:** Se ha implementado una restricción de seguridad que requiere que los usuarios estén autenticados para finalizar una compra. 
    * Si un invitado intenta comprar, el sistema lo invita a iniciar sesión sin perder su progreso (gracias al Merge de Carrito).
    * Esto garantiza que cada orden generada esté vinculada a un usuario real con ID único y correo verificado.
---

## 🚀 Decisiones Técnicas y UX

* **Formularios Dinámicos:** El panel de administración utiliza un componente de formulario reutilizable que detecta automáticamente si el usuario está creando o editando un producto, ajustando la interfaz y las validaciones en consecuencia.
* **Skeleton Loaders:** Implementé pantallas de carga personalizadas para mejorar la percepción de velocidad (Perceived Performance) mientras se obtienen los datos del backend.
* **Custom Hooks:** Toda la lógica de negocio está separada de los componentes visuales, lo que hace que el código sea testeable y reutilizable.
* **Responsive Design:** Diseño "Mobile First" asegurando que el carrito y los filtros sean 100% funcionales en cualquier dispositivo.
* **Validación de Formularios:** Gestión controlada de inputs en el panel de administración para el alta y edición de productos.
* **Flujo de Compra Condicional:** El botón de "Finalizar Compra" es dinámico. Cambia su comportamiento y apariencia dependiendo del estado del `UserContext`, guiando al usuario hacia el login si es necesario para completar la transacción.
* 
---

## 📁 Estructura de Carpetas

```text
src/
 ├── components/     # Componentes reutilizables (Botones, Skeletons, Formuarios)
 ├── context/        # Proveedores de estado (Cart, Products)
 ├── hooks/          # Lógica personalizada (useProducts, useProductModal)
 ├── layouts/        # Estructuras globales (NavBar)
 └── pages/          # Vistas principales (Shop, Admin, Cart, OrderSuccess)
