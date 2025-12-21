# 🎮 Juegos en Vue (Mini Arcade)

Proyecto personal desarrollado con **Vue 3 y Vite**, cuyo objetivo es practicar y consolidar el uso de **Pinia**, **Vue Router** y **Tailwind CSS** mediante la creación de una pequeña plataforma de mini-juegos.

La aplicación funciona como un _mini arcade_, donde cada juego es un módulo independiente pero comparte una arquitectura común.

---

## 🧩 Juegos incluidos

- 🪨 Piedra, Papel o Tijera
- 🔢 Adivina el número
- 🎡 Ruleta
- ❌⭕ Tres en raya (Michi)

---

## 🎯 Objetivos del proyecto

- Practicar Vue 3 con Composition API
- Aprender y aplicar una gestión de estado global con Pinia
- Reutilizar componentes entre distintos juegos
- Implementar una navegación clara con Vue Router
- Diseñar una interfaz consistente usando Tailwind CSS
- Construir una base escalable para añadir nuevos juegos

---

## 🛠️ Tecnologías utilizadas

- **Vue 3**
- **Vite**
- **Pinia**
- **Vue Router**
- **Tailwind CSS**
- **JavaScript (ES6+)**

---

## 💻 Requisitos previos

- Node.js (versión recomendada: 18 o superior)
- npm
- Navegador moderno (Chrome, Edge, Firefox, etc.)

---

## 🔧 Configuración recomendada del entorno

### IDE

- [Visual Studio Code](https://code.visualstudio.com/)
- Extensión recomendada:
  - [Vue - Official (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

> Se recomienda desactivar Vetur si está instalado.

### Navegador

- **Chromium (Chrome, Edge, Brave)**
  - Vue.js Devtools
  - Activar _Custom Object Formatter_ en DevTools
- **Firefox**
  - Vue.js Devtools
  - Activar _Custom Object Formatter_

---

## 🚀 Instalación del proyecto

Instalar dependencias:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Inicializar tailwind

```sh
npx tailwindcss@3 init -p
```

### Configurar postcss.config.js

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Crear archivo de estilos globales

# Crear un archivo style.css (por ejemplo en src/):

```css
@import 'tailwindcss';
```

### Importar estilos en main.js

```js
import './style.css'
```
