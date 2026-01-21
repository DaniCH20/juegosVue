<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

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
    <nav class="sticky top-0 z-50 bg-gradient-to-r from-[#3d6b79] to-[#4a7d8a] shadow-lg">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="flex items-center justify-between py-4">
          <!-- Logo + hamburguesa -->
          <div class="flex items-center justify-between w-full md:w-auto">
            <img
              src="/img/pc.png"
              alt="Centro Cívico"
              class="h-12 w-auto bg-white rounded-full p-1"
            />

            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden ml-4 flex flex-col gap-1.5"
              aria-label="Menu"
            >
              <span
                :class="[
                  'w-6 h-0.5 bg-white transition-all',
                  mobileMenuOpen && 'rotate-45 translate-y-2',
                ]"
              />
              <span :class="['w-6 h-0.5 bg-white transition-all', mobileMenuOpen && 'opacity-0']" />
              <span
                :class="[
                  'w-6 h-0.5 bg-white transition-all',
                  mobileMenuOpen && '-rotate-45 -translate-y-2',
                ]"
              />
            </button>
          </div>

          <!-- Menú -->
          <div
            :class="[
              'md:flex md:items-center md:gap-6',
              'absolute md:static left-0 right-0 top-full',
              'transition-all duration-300 ease-out',
              mobileMenuOpen
                ? 'flex flex-col bg-gradient-to-b from-[#3d6b79] to-[#2d5465] shadow-lg px-6 py-6 gap-4 opacity-100 translate-y-0'
                : 'hidden md:flex opacity-0 md:opacity-100 -translate-y-4 md:translate-y-0',
            ]"
          >
            <router-link to="/" class="nav-card" @click="mobileMenuOpen = false">
              Inicio
            </router-link>
            <router-link
              to="/ppt"
              class="nav-card"
              active-class="nav-card-active"
              @click="mobileMenuOpen = false"
            >
              🪨 Piedra, Papel o Tijera
            </router-link>
            <router-link
              to="/adivina"
              class="nav-card"
              active-class="nav-card-active"
              @click="mobileMenuOpen = false"
            >
              🔢 Adivina el número
            </router-link>
            <router-link
              to="/ruleta"
              class="nav-card"
              active-class="nav-card-active"
              @click="mobileMenuOpen = false"
            >
              🎡 Ruleta
            </router-link>
            <router-link
              to="/michi"
              class="nav-card"
              active-class="nav-card-active"
              @click="mobileMenuOpen = false"
            >
              ❌⭕ 3 en raya
            </router-link>
            <router-link
              to="/sobrevive"
              class="nav-card"
              active-class="nav-card-active"
              @click="mobileMenuOpen = false"
            >
              Sobrevive
            </router-link>
            <router-link
              to="/ahorcado"
              class="nav-card"
              active-class="nav-card-active"
              @click="mobileMenuOpen = false"
            >
              Ahorcado
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main -->
    <main class="px-2 py-2">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>
