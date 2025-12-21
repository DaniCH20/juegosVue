<script setup></script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-5xl mx-auto px-6 py-6 text-center">
        <h1 class="text-3xl font-bold tracking-tight">🎮 Juegos en Vue.js</h1>
        <p class="mt-2 text-gray-500">Selecciona un juego para comenzar a jugar</p>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="max-w-5xl mx-auto px-6 mt-6">
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <li>
          <router-link to="/ppt" class="nav-card" active-class="nav-card-active">
            🪨 Piedra, Papel o Tijera
          </router-link>
        </li>

        <li>
          <router-link to="/adivina" class="nav-card" active-class="nav-card-active">
            🔢 Adivina el número
          </router-link>
        </li>

        <li>
          <router-link to="/ruleta" class="nav-card" active-class="nav-card-active">
            🎡 Ruleta
          </router-link>
        </li>

        <li>
          <router-link to="/michi" class="nav-card" active-class="nav-card-active">
            ❌⭕ 3 en raya
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Main content -->
    <main class="max-w-5xl mx-auto px-6 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped></style>
