<template>
  <div>
    <!-- Elemento raíz único -->
    <h1 class="text-4xl font-bold mb-4">Home</h1>
    <p class="mb-4">
      Bienvenido a esta pagina de juegos simples que he creado usando
      <a href="https://vuejs.org/" class="text-blue-600 hover:underline">Vue.js</a>
      como framework principal y
      <a href="https://tailwindcss.com/" class="text-blue-600 hover:underline">Tailwind</a>
      para el diseño.
    </p>
    <p>
      Selecciona un juego del menu para comenzar a jugar.Como proyecto de personal no se vera de
      manera muy profesional ,habra varios errores para solucionar y muchas opciones por implementar
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
</script>

<style scoped></style>
