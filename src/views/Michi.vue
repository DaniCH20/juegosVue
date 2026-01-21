<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <div class="container mx-auto px-6 py-10">
      <h1 class="text-4xl font-extrabold text-center mb-12">Tres en raya</h1>

      <div class="flex justify-center gap-12 mb-12">
        <table class="grid grid-cols-3">
          <td v-for="(opcion, index) in opciones" :key="index" class="bg-white shadow-lg border-4 border-black">
            <button @click="marcar(index)" :disabled="juegoTerminado || opcion !== 0"
              class="text-black text-4xl font-bold p-20 transition" :class="{
                'cursor-not-allowed opacity-50': juegoTerminado,
                'hover:cursor-pointer': !juegoTerminado
              }">
              {{ opcion === 0 ? '' : opcion }}
            </button>
          </td>
        </table>
      </div>

      <div v-if="resultado !== 'Procesando...'" class="text-center text-3xl font-bold mt-6" :class="{
        'text-green-400': resultado.includes('Ganaste'),
        'text-red-400': resultado.includes('Perdiste'),
      }">
        <h3>{{ resultado }}</h3>
        <button @click="reiniciar()" id="button">Deseas volver a jugar</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
const opciones = ref([0, 0, 0, 0, 0, 0, 0, 0, 0])
const pc = ref([])
const juegoTerminado = computed(() => resultado.value !== 'Procesando...')

function hacerJugadaPC() {
  let availableIndices = opciones.value
    .map((val, idx) => (val === 0 ? idx : null))
    .filter((val) => val !== null)

  if (availableIndices.length === 0) return // No hay movimientos disponibles

  let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
  opciones.value[randomIndex] = 'O'
}
const resultado = computed(() => {
  if (
    (opciones.value[0] === 'X' && opciones.value[1] === 'X' && opciones.value[2] === 'X') ||
    (opciones.value[3] === 'X' && opciones.value[4] === 'X' && opciones.value[5] === 'X') ||
    (opciones.value[6] === 'X' && opciones.value[7] === 'X' && opciones.value[8] === 'X') ||
    (opciones.value[0] === 'X' && opciones.value[3] === 'X' && opciones.value[6] === 'X') ||
    (opciones.value[1] === 'X' && opciones.value[4] === 'X' && opciones.value[7] === 'X') ||
    (opciones.value[2] === 'X' && opciones.value[5] === 'X' && opciones.value[8] === 'X') ||
    (opciones.value[0] === 'X' && opciones.value[4] === 'X' && opciones.value[8] === 'X') ||
    (opciones.value[2] === 'X' && opciones.value[4] === 'X' && opciones.value[6] === 'X')
  ) {
    return 'Ganaste'
  }
  if (
    (opciones.value[0] === 'O' && opciones.value[1] === 'O' && opciones.value[2] === 'O') ||
    (opciones.value[3] === 'O' && opciones.value[4] === 'O' && opciones.value[5] === 'O') ||
    (opciones.value[6] === 'O' && opciones.value[7] === 'O' && opciones.value[8] === 'O') ||
    (opciones.value[0] === 'O' && opciones.value[3] === 'O' && opciones.value[6] === 'O') ||
    (opciones.value[1] === 'O' && opciones.value[4] === 'O' && opciones.value[7] === 'O') ||
    (opciones.value[2] === 'O' && opciones.value[5] === 'O' && opciones.value[8] === 'O') ||
    (opciones.value[0] === 'O' && opciones.value[4] === 'O' && opciones.value[8] === 'O') ||
    (opciones.value[2] === 'O' && opciones.value[4] === 'O' && opciones.value[6] === 'O')
  ) {
    return 'Perdiste'
  }
  if (opciones.value.every((val) => val !== 0)) {
    return 'Empate'
  }

  return 'Procesando...'
})
function reiniciar() {
  opciones.value = [0, 0, 0, 0, 0, 0, 0, 0, 0]
}

function marcar(index) {
  if (juegoTerminado.value) return
  if (opciones.value[index] !== 0) return

  opciones.value[index] = 'X'
  hacerJugadaPC()
}
</script>
