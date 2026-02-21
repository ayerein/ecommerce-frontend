# 💻 Ecommerce Frontend - React

Esta es la interfaz de usuario de mi proyecto Ecommerce Full Stack. Está construida enfocándose en la modularidad, la experiencia de usuario y el rendimiento.

**🔗 [Ver la tienda en vivo](https://ecommerce-ayerein.netlify.app/)**

---

## 🛠️ Stack Tecnológico

* **React (Vite):** Framework principal para una experiencia de desarrollo rápida.
* **Context API:** Gestión de estado global para el flujo de compra y la sincronización de productos.
* **CSS Modules:** Estilos encapsulados por componente para evitar colisiones y facilitar el mantenimiento.
* **Hooks Personalizados:** Abstracción de lógica (ej. `useProductModal`, `useProducts`).
* **React Router DOM:** Manejo de rutas protegidas y navegación SPA.

---

## 🚀 Decisiones Técnicas y UX

* **Skeleton Loaders:** Implementé pantallas de carga personalizadas para mejorar la percepción de velocidad (Perceived Performance) mientras se obtienen los datos del backend.
* **Custom Hooks:** Toda la lógica de negocio está separada de los componentes visuales, lo que hace que el código sea testeable y reutilizable.
* **Responsive Design:** Diseño "Mobile First" asegurando que el carrito y los filtros sean 100% funcionales en cualquier dispositivo.
* **Validación de Formularios:** Gestión controlada de inputs en el panel de administración para el alta y edición de productos.

---

## 📁 Estructura de Carpetas

```text
src/
 ├── components/     # Componentes reutilizables (Botones, Skeletons, Formuarios)
 ├── context/        # Proveedores de estado (Cart, Products)
 ├── hooks/          # Lógica personalizada (useProducts, useProductModal)
 ├── layouts/        # Estructuras globales (NavBar)
 └── pages/          # Vistas principales (Shop, Admin, Cart, OrderSuccess)
