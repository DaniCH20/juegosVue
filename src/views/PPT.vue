<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-500 via-slate-600 to-slate-500 text-white">
    <div class="container mx-auto px-6 py-10">
      <h1 class="text-4xl font-extrabold text-center mb-12">🪨📄✂ Piedra, Papel o Tijera</h1>

      <!-- BOTONES -->
      <div class="flex justify-center gap-12 mb-12">
        <button
          v-for="opcion in opciones"
          :key="opcion"
          @click="escoger(opcion)"
          class="group flex flex-col items-center transition hover:scale-110"
        >
          <img
            :src="`/img/${opcion}.png`"
            :alt="opcion"
            class="w-50 h-50 object-contain drop-shadow-lg"
          />
          <span class="mt-3 font-bold capitalize group-hover:text-pink-400">
            {{ opcion }}
          </span>
        </button>
      </div>

      <!-- RESULTADOS -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        <div class="flex flex-col items-center">
          <h3 class="mb-4 font-semibold text-slate-300">Tú</h3>
          <img
            :src="eleccionJugador ? `/img/${eleccionJugador}.png` : '/img/tu.png'"
            class="w-40 h-40 object-contain"
          />
          <h4>{{ eleccionJugador }}</h4>
        </div>

        <div class="flex flex-col items-center">
          <h3 class="mb-4 font-semibold text-slate-300">PC</h3>
          <img
            :src="eleccionPC ? `/img/${eleccionPC}.png` : '/img/pc.png'"
            class="w-40 h-40 object-contain"
          />
          <h4>{{ eleccionPC }}</h4>
        </div>
      </div>

      <!-- RESULTADO FINAL -->
      <div
        v-if="resultado"
        class="text-center text-3xl font-bold mt-6"
        :class="{
          'text-green-400': resultado.includes('Ganaste'),
          'text-red-400': resultado.includes('Perdiste'),
          'text-yellow-400': resultado.includes('Empate'),
        }"
      >
        {{ resultado }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const opciones = ['piedra', 'papel', 'tijera', 'agua', 'aire', 'fuego', 'esponja']
const reglas = {
  piedra: ['tijera', 'esponja', 'fuego'],
  papel: ['piedra', 'agua', 'aire'],
  tijera: ['papel', 'esponja', 'aire'],
  agua: ['fuego', 'piedra', 'tijera'],
  aire: ['piedra', 'agua', 'fuego'],
  fuego: ['tijera', 'esponja', 'papel'],
  esponja: ['papel', 'agua', 'aire'],
}
const eleccionJugador = ref(null)
const eleccionPC = ref(null)
const resultado = ref('')
const cargando = ref(false)
let interval
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function escoger(valor) {
  eleccionJugador.value = valor
  resultado.value = ''
  cargando.value = true

  // Animación de barajar
  interval = setInterval(() => {
    eleccionPC.value = opciones[Math.floor(Math.random() * opciones.length)]
  }, 100)

  await delay(3000)

  clearInterval(interval)
  eleccionPC.value = opciones[Math.floor(Math.random() * opciones.length)]

  const ganaJugador = reglas[eleccionJugador.value]?.includes(eleccionPC.value)
  resultado.value = ganaJugador ? '¡Ganaste!' : '¡Perdiste!'
  cargando.value = false
}
</script>
