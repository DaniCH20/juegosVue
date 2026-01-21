<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <div class="container mx-auto max-w-3xl px-4 sm:px-6 py-10 text-center">
      <h1 class="text-4xl font-extrabold text-center mb-12">
        Adivina la palabra secreta antes que te ahorquen
      </h1>
      <button
        v-if="!jugando"
        @click="jugar()"
        class="mb-8 rounded-xl bg-indigo-600 px-8 py-3 text-lg font-semibold hover:bg-indigo-500 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Jugar
      </button>
      <div class="flex justify-center mb-8">
        <img
          :src="`../img/ahorcado/ahorcado${intentosFallidos}.png`"
          :alt="palabraClave"
          class="w-40 sm:w-52 md:w-64 object-contain"
        />
      </div>
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
        <span
          v-for="(letra, index) in palabraMostrada"
          :key="index"
          class="w-10 sm:w-12 h-12 flex items-center justify-center border-b-4 border-slate-300 text-2xl sm:text-3xl font-bold"
        >
          {{ letra }}
        </span>
      </div>

      <div
        v-if="resultado"
        class="mt-6 mb-8 text-3xl font-bold"
        :class="{
          'text-green-400': resultado.includes('Ganaste'),
          'text-red-400': resultado.includes('Perdiste'),
        }"
      >
        <button @click="reiniciar()">{{ resultado }}</button>
      </div>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
        <input
          v-model="eleccionJugador"
          maxlength="1"
          type="text"
          placeholder="Letra"
          class="w-20 h-12 text-center text-xl font-bold rounded-lg border-2 border-slate-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          @click="adivinar"
          :disabled="!jugando"
          class="h-12 px-8 rounded-lg bg-emerald-600 text-lg font-semibold hover:bg-emerald-500 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { imagenes } from '@/stores/imagenes'
import { ref, computed, onMounted } from 'vue'
const mobileMenuOpen = ref(false)
const eleccionPC = ref(null)
const jugando = ref(false)
const palabraClave = ref('')
const letrasAdivinadas = ref([])
const intentosFallidos = ref(1)
const maxIntentos = 7
const eleccionJugador = ref('')
function jugar() {
  const palabras = [
    'otorrinolaringologia',
    'triceraptos',
    'velocipastor',
    'casa',
    'abuelito',
    'gallina',
    'electrodomesticos',
    'automovil',
    'estudiasonso',
    'pikachu',
    'tiburon',
    'microprocesador',
    'charizard',
    'megacaballero',
    'leftfordead',
    'fivenightsatfreddys',
    'contratenme',
    'chamba',
    'peruesclave',
    'ninachay',
  ]
  palabraClave.value = palabras[Math.floor(Math.random() * palabras.length)]
  letrasAdivinadas.value = []
  intentosFallidos.value = 1
  jugando.value = true
}
function reiniciar() {
  letrasAdivinadas.value = []
  intentosFallidos.value = 1
  jugando.value = false
}
function adivinar() {
  const letra = eleccionJugador.value?.toLowerCase()
  if (!letra || letrasAdivinadas.value.includes(letra)) return

  if (palabraClave.value.includes(letra)) {
    letrasAdivinadas.value.push(letra)
  } else {
    intentosFallidos.value++
  }

  eleccionJugador.value = ''
}
const resultado = computed(() => {
  if (!jugando.value) return ''

  const gano = palabraClave.value.split('').every((letra) => letrasAdivinadas.value.includes(letra))

  if (gano) return 'Ganaste'

  if (intentosFallidos.value >= maxIntentos) return 'Perdiste'

  return ''
})
const palabraMostrada = computed(() =>
  palabraClave.value
    .split('')
    .map((letra) => (letrasAdivinadas.value.includes(letra) ? letra : '_')),
)
</script>
