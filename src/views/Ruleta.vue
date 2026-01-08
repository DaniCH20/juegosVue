<script setup>
import { ref, computed, onMounted } from 'vue'
const premios = [
  { texto: 'Plants vs. Zombies™ Garden Warfare 2', img: '/img/gw2.jpg' },
  { texto: 'Fear & Hunger 2: Termina', img: '/img/fear.jpg' },
  { texto: 'Fear & Hunger - Full Version', img: '/img/fear1.jpg' },
  { texto: 'Celeste', img: '/img/celeste.jpg' },
  { texto: 'LEGO Star Wars', img: '/img/lego.jpg' },
  { texto: 'Euro Truck Simulator 2', img: '/img/euro.jpg' },
]
const rotacion = ref(0)
const girando = ref(false)

function girarRuleta() {
  if (girando.value) return

  girando.value = true

  const vueltas = Math.floor(Math.random() * 4) + 6 // 6–9 vueltas
  const anguloExtra = Math.random() * 360

  rotacion.value += vueltas * 360 + anguloExtra

  setTimeout(() => {
    girando.value = false
  }, 10000)
}
const premioSeleccionado = computed(() => {
  const anguloFinal = rotacion.value % 360
  const indice = Math.floor(((360 - anguloFinal + 30) % 360) / 60)
  return premios[indice]
})
onMounted(() => {
  console.log('Premio seleccionado:', premioSeleccionado.value)
})
const premioHover = ref(null)
</script>
<template>
  <div
    class="min-h-screen max-w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
  >
    <div class="container mx-auto px-6 py-10">
      <h1 class="text-4xl font-extrabold text-center mb-12 tracking-tight">
        🎰 Gira la ruleta y gana un juego
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- RUEDA -->
        <div class="flex justify-center">
          <div class="ruleta-container">
            <div class="ruleta" :style="{ transform: `rotate(${rotacion}deg)` }">
              <div
                v-for="(premio, i) in premios"
                :key="i"
                class="slice"
                :style="{ '--i': i }"
                @mouseenter="premioHover = premio"
                @mouseleave="premioHover = null"
              >
                <img :src="premio.img" class="slice-img" />
                <div class="overlay"></div>
                <span>{{ premio.texto }}</span>
              </div>
            </div>
            <div class="marcador"></div>
          </div>
        </div>

        <!-- INFO -->
        <div class="flex justify-center">
          <div
            class="w-full max-w-md animate-fade-in bg-slate-800/80 backdrop-blur rounded-2xl p-6 shadow-xl border border-slate-700 transition-all duration-300"
            v-if="premioHover"
          >
            <h2 class="text-2xl font-bold mb-4 text-center">
              {{ premioHover.texto }}
            </h2>

            <img :src="premioHover.img" class="rounded-xl shadow-lg mx-auto" />

            <p class="mt-4 text-slate-300 text-center text-sm">
              Pasa el cursor por la ruleta para ver información del juego.
            </p>
          </div>

          <div v-else class="w-full max-w-md text-center text-slate-400 italic">
            Pasa el cursor sobre un juego 🎮
          </div>
        </div>
      </div>

      <!-- BOTÓN -->
      <div class="flex justify-center mt-14">
        <button
          @click="girarRuleta"
          :disabled="girando"
          class="px-10 py-4 rounded-full text-lg font-bold bg-gradient-to-r from-pink-500 to-red-500 shadow-lg shadow-pink-500/40 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {{ girando ? 'Girando...' : 'Girar ruleta' }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
#columnas {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;

  align-items: center;
  gap: 20px;
}
.ruleta-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.ruleta {
  position: relative;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 8px solid #333;
  overflow: hidden;
  background-color: #333; /* Fondo oscuro por si hay micro-espacios */
}
.ruleta {
  box-shadow:
    0 0 0 8px #1f2933,
    0 30px 60px rgba(0, 0, 0, 0.7);
}

.slice {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transform-origin: 50% 50%;
  /* Rotación base de 60 grados */
  transform: rotate(calc(var(--i) * 60deg));

  /* ESTE ES EL CLIP PATH CORREGIDO PARA 60 GRADOS EXACTOS */
  /* Punto 1: Centro (50% 50%) */
  /* Punto 2: Arriba centro (50% 0%) */
  /* Punto 3: Esquina superior derecha (100% 0%) */
  /* Punto 4: El punto exacto donde terminan los 60 grados (100% 21.13%) */
  clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 21.13%);

  display: flex;
  justify-content: center;
  align-items: center;
}

.slice-img {
  position: absolute;
  /* Hacemos la imagen lo suficientemente grande para cubrir el área */
  width: 120%;
  height: 120%;
  object-fit: cover;

  /* Ajuste para centrar la imagen en la "rebanada" */
  /* La rotamos 30 grados para que el centro de la imagen coincida con el centro del ángulo */
  transform: rotate(30deg) translate(15%, -25%);
  filter: brightness(0.8);
}
.slice:hover .slice-img {
  filter: brightness(1) scale(1.05);
  transition:
    filter 0.3s,
    transform 0.3s;
}

.overlay {
  position: absolute;
  inset: 0;
  /* Un degradado sutil para que el texto resalte */
  background: linear-gradient(60deg, rgba(0, 0, 0, 0.6) 0%, transparent 40%);
  z-index: 1;
}

.slice span {
  position: absolute;
  z-index: 2;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  width: 150px;

  /* 1. Rotamos 30 grados para centrar el texto en el espacio de 60 
     2. Movemos hacia afuera (negativo en Y porque el eje cambió)
  */
  transform: rotate(30deg) translateY(-200px);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
  pointer-events: none; /* Para que no interfiera con clics */
}

.marcador {
  position: absolute;
  top: calc(50% - 350px); /* Justo arriba de la ruleta */
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 50px;
  background: #ff4757;
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  z-index: 10;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
}
.marcador {
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.7));
}
.ruleta {
  transition: transform 10s cubic-bezier(0.15, 0.85, 0.25, 1);
}
.info-juego {
  margin-top: 20px;
  text-align: center;
}

.info-juego img {
  width: 500px;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
