<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
            class="w-40 h-40 object-contain drop-shadow-lg"
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
        </div>

        <div class="flex flex-col items-center">
          <h3 class="mb-4 font-semibold text-slate-300">PC</h3>
          <img
            :src="eleccionPC ? `/img/${eleccionPC}.png` : '/img/pc.png'"
            class="w-40 h-40 object-contain"
          />
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

const eleccionJugador = ref(null)
const eleccionPC = ref(null)

function escoger(valor) {
  eleccionJugador.value = valor
  eleccionPC.value = opciones[Math.floor(Math.random() * opciones.length)]
}

const resultado = computed(() => {
  if (!eleccionJugador.value || !eleccionPC.value) return ''

  if (eleccionJugador.value === eleccionPC.value) return 'Empate '

  const ganaJugador =
    (eleccionJugador.value === 'piedra' && eleccionPC.value === 'tijera') ||
    (eleccionJugador.value === 'papel' && eleccionPC.value === 'piedra') ||
    (eleccionJugador.value === 'tijera' && eleccionPC.value === 'papel') ||
    (eleccionJugador.value === 'agua' && eleccionPC.value === 'papel') ||
    (eleccionJugador.value === 'agua' && eleccionPC.value === 'piedra') ||
    (eleccionJugador.value === 'viento' && eleccionPC.value === 'papel') ||
    (eleccionJugador.value === 'viento' && eleccionPC.value === 'agua') ||
    (eleccionJugador.value === 'tijera' && eleccionPC.value === 'viento') ||
    (eleccionJugador.value === 'calor' && eleccionPC.value === 'papel') ||
    (eleccionJugador.value === 'calor' && eleccionPC.value === 'tijera') ||
    (eleccionJugador.value === 'agua' && eleccionPC.value === 'calor')

  return ganaJugador ? '¡Ganaste! ' : '¡Perdiste! '
})
</script>
