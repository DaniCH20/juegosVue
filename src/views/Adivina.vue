<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <div class="container mx-auto px-6 py-10">
      <h1 class="text-4xl font-extrabold text-center mb-12">
        Adivina el numero entre el 1 y el 10
      </h1>

      <div class="flex justify-center gap-12 mb-12">
        <input type="text" id="num" placeholder="0" v-model="eleccionJugador" />
        <button
          @click="adivinar"
          class="group flex flex-col items-center transition hover:scale-110"
        >
          Enviar
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
        <div class="flex flex-col items-center">
          <h3 class="mb-4 font-semibold text-slate-300">Tú</h3>
          <h4>{{ eleccionJugador }}</h4>
        </div>

        <div class="flex flex-col items-center">
          <h3 class="mb-4 font-semibold text-slate-300">PC</h3>
          <h4>{{ eleccionPC }}</h4>
        </div>
      </div>

      <div
        v-if="resultado"
        class="text-center text-3xl font-bold mt-6"
        :class="{
          'text-green-400': resultado.includes('Ganaste'),
          'text-red-400': resultado.includes('Perdiste'),
        }"
      >
        {{ resultado }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
const eleccionJugador = ref(null)
const eleccionPC = ref(null)
function adivinar() {
  eleccionJugador.value
  eleccionPC.value = [Math.floor(Math.random() * 10)]
}
const resultado = computed(() => {
  if (!eleccionJugador.value || !eleccionPC.value) return ''

  if (eleccionJugador.value == eleccionPC.value) return 'Ganaste'
  else return 'Perdiste'
})
</script>
