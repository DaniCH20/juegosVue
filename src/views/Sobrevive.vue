<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-6">
    <!-- Header con título -->
    <header class="text-center mb-8">
      <h1
        class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent mb-2"
      >
        Sobrevive Al Callao
      </h1>
      <p class="text-gray-300">Tu objetivo es escapar del barrio</p>
    </header>

    <!-- Contenedor principal del juego -->
    <div class="max-w-6xl mx-auto">
      <!-- Panel de estado del jugador -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
        <!-- Dinero -->
        <div class="bg-gray-800 rounded-xl p-4 border-2 border-green-500 shadow-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg">
                <img src="/img/sol.png" class="w-8 h-8" alt="Dinero" />
              </div>
              <div>
                <p class="text-sm text-gray-400">Dinero</p>
                <p class="text-2xl font-bold">
                  {{ jugador.dinero }} <span class="text-sm">soles</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Energía -->
        <div class="bg-gray-800 rounded-xl p-4 border-2 border-blue-500 shadow-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div>
                <img src="/img/somos.png" class="w-8 h-8" alt="Energía" />
              </div>
              <div>
                <p class="text-sm text-gray-400">Energía</p>
                <p class="text-2xl font-bold">{{ jugador.energia }}%</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-400">Estado: {{ estadoEnergia }}</p>
              <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  class="h-full transition-all duration-500"
                  :class="{
                    'bg-red-500': jugador.energia < 30,
                    'bg-yellow-500': jugador.energia >= 30 && jugador.energia < 70,
                    'bg-green-500': jugador.energia >= 70,
                  }"
                  :style="{ width: jugador.energia + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Reputacion -->
        <div class="bg-gray-800 rounded-xl p-4 border-2 border-blue-500 shadow-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div>
                <img src="/img/like.png" class="w-8 h-8" alt="Reputacion" />
              </div>
              <div>
                <p class="text-sm text-gray-400">Reputacion</p>
                <p class="text-2xl font-bold">{{ jugador.reputacion }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tiempo -->
        <div class="bg-gray-800 rounded-xl p-4 border-2 border-purple-500 shadow-lg">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="bg-white p-2 rounded-full">
                <img src="/img/reloj.png" class="w-8 h-8" alt="Reloj" />
              </div>
              <div>
                <p class="text-sm text-gray-400">Hora</p>
                <p class="text-2xl font-bold">{{ formatoHora }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-400">Amanece: 6:00</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenedor de historia y decisiones -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Panel de narración -->
        <div class="lg:col-span-2">
          <div class="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 shadow-xl h-full">
            <div class="mb-4 flex justify-between items-center">
              <h2 class="text-xl font-bold text-yellow-400">{{}}</h2>
            </div>

            <div
              class="bg-gray-900 rounded-lg p-6 border border-gray-700 h-80 overflow-y-auto mb-4"
            >
              <img
                :src="jugador.ubicacion"
                :alt="'ubicacion'"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <!-- Panel de decisiones -->
        <div>
          <div class="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 shadow-xl h-full">
            <div class="mb-4">
              <h2 class="text-xl font-bold text-blue-400 flex items-center gap-2">
                ⚡ Decisiones
                <span class="text-sm font-normal text-gray-400">
                  ({{ decisionesDisponibles.length }} disponibles)
                </span>
              </h2>
            </div>

            <div class="space-y-3">
              <button
                v-for="decision in decisionesDisponibles"
                :key="decision.id"
                @click="tomarDecision(decision)"
                :disabled="!puedeTomarDecision(decision) || mostrandoFinal || escribiendo"
                class="w-full text-left p-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] group"
                :class="{
                  'bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-700 hover:from-blue-800 hover:to-blue-700':
                    puedeTomarDecision(decision) && !escribiendo,
                  'bg-gray-900 border border-gray-700 opacity-50 cursor-not-allowed':
                    !puedeTomarDecision(decision) || mostrandoFinal || escribiendo,
                  'animate-pulse': decision.id === decisionDestacada,
                }"
              >
                <div class="flex items-start gap-3">
                  <div class="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                    <span class="text-white">→</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-medium mb-1">{{ decision.texto }}</p>

                    <!-- Mostrar efectos de la decisión -->
                    <div v-if="decision.efectos" class="mt-2 flex flex-wrap gap-1">
                      <span
                        v-if="decision.efectos.dinero"
                        class="px-2 py-1 text-xs rounded"
                        :class="
                          decision.efectos.dinero > 0
                            ? 'bg-green-900 text-green-300'
                            : 'bg-red-900 text-red-300'
                        "
                      >
                        ☀️ {{ decision.efectos.dinero > 0 ? '+' : '' }}{{ decision.efectos.dinero }}
                      </span>
                      <span
                        v-if="decision.efectos.energia"
                        class="px-2 py-1 text-xs rounded"
                        :class="
                          decision.efectos.energia > 0
                            ? 'bg-green-900 text-green-300'
                            : 'bg-red-900 text-red-300'
                        "
                      >
                        ⚡ {{ decision.efectos.energia > 0 ? '+' : ''
                        }}{{ decision.efectos.energia }}
                      </span>
                      <span
                        v-if="decision.efectos.tiempo"
                        class="px-2 py-1 text-xs rounded bg-purple-900 text-purple-300"
                      >
                        🕐 +{{ decision.efectos.tiempo }}h
                      </span>
                    </div>

                    <!-- Mostrar requisitos -->
                    <div v-if="decision.requisito" class="mt-1">
                      <p class="text-xs text-yellow-300">
                        Requisito: {{ decision.requisito.dinero }} soles
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel de control -->

      <div class="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 shadow-xl mb-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- CONTENEDOR DE TEXTO (ALTURA FIJA) -->
          <div
            class="bg-gray-900 rounded-lg p-6 border border-gray-700 overflow-y-auto mb-4 md:w-[700px]"
          >
            <div class="space-y-4">
              <p class="text-lg leading-relaxed font-medium whitespace-pre-line break-words">
                {{ textoAnimado }}
                <span v-if="escribiendo" class="blinking-cursor">|</span>
              </p>
            </div>
          </div>

          <!-- BOTÓN -->
          <div class="flex items-center space-x-4">
            <button
              @click="reiniciarJuego"
              :disabled="escribiendo"
              class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔄 Reiniciar Juego
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de final -->
      <div
        v-if="mostrandoFinal"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full border-4 border-yellow-500 shadow-2xl"
        >
          <div class="text-center">
            <h2
              class="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent"
            >
              {{ finalActual.titulo }}
            </h2>

            <div class="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-700">
              <p class="text-lg leading-relaxed mb-6">{{ finalActual.descripcion }}</p>
              <div class="grid grid-cols-2 gap-4 text-left">
                <div class="bg-gray-800 p-4 rounded-lg">
                  <p class="text-sm text-gray-400">Dinero final</p>
                  <p class="text-2xl font-bold">{{ jugador.dinero }} soles</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                  <p class="text-sm text-gray-400">Energía final</p>
                  <p class="text-2xl font-bold">{{ jugador.energia }}%</p>
                </div>
              </div>
            </div>

            <button
              @click="reiniciarJuego"
              class="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl font-bold text-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105"
            >
              🎮 Jugar de Nuevo
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de historial -->
      <div
        v-if="mostrandoHistorial"
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      >
        <div
          class="bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto border-2 border-gray-700"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-yellow-400">📜 Historial de Partida</h3>
            <button
              @click="mostrandoHistorial = false"
              class="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="item in historial"
              :key="item.id"
              class="bg-gray-900 p-4 rounded-lg border border-gray-700"
            >
              <p class="font-medium mb-2">{{ item.texto }}</p>
              <div class="flex justify-between text-sm text-gray-400">
                <span>Escena {{ item.id }}</span>
                <span>{{ item.decisionTomada ? '✅ Decisión tomada' : '📖 Narración' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { history } from '../stores/historia.js'
import { decisions } from '../stores/deciciones.js'
import { finales } from '@/stores/finales.js'
import { imagenes } from '@/stores/imagenes.js'

// Estado del juego
const jugador = ref({
  dinero: 5,
  energia: 100,
  tiempo: 12,
  ubicacion: '/img/callejon.png',
  inventario: [],
  reputacion: 10,
})
const historiaActual = ref({})
const historiasCompletadas = ref([])
const historial = ref([])
const mostrandoFinal = ref(false)
const mostrandoHistorial = ref(false)
const finalActual = ref({})
const efectosHistoriaVisible = ref(false)
const decisionDestacada = ref(null)

// Variables para el efecto de máquina de escribir
const textoAnimado = ref('')
const escribiendo = ref(false)
let intervaloEscritura = null
const velocidadEscritura = 30 // milisegundos por carácter

// Decisiones de transición
const transiciones = [
  { id: 100, texto: 'Levantarse y caminar hacia la calle', idhistoria: 2 },
  { id: 101, texto: 'Entrar a la tienda', idhistoria: 3 },
  { id: 102, texto: 'Preguntar cómo salir de aquí', idhistoria: 4 },
  { id: 103, texto: 'Salir de la tienda y buscar opciones', idhistoria: 5 },
  { id: 200, texto: 'Ir al paradero de combis', idhistoria: 8 },
]

// Efecto de máquina de escribir
const iniciarEfectoMaquina = (textoCompleto) => {
  // Limpiar intervalo anterior si existe
  if (intervaloEscritura) {
    clearInterval(intervaloEscritura)
  }

  textoAnimado.value = ''
  escribiendo.value = true

  let indice = 0

  intervaloEscritura = setInterval(() => {
    if (indice < textoCompleto.length) {
      textoAnimado.value += textoCompleto.charAt(indice)
      indice++
    } else {
      clearInterval(intervaloEscritura)
      intervaloEscritura = null
      escribiendo.value = false
    }
  }, velocidadEscritura)
}

// Saltar animación
const saltarAnimacion = () => {
  if (intervaloEscritura) {
    clearInterval(intervaloEscritura)
    intervaloEscritura = null
  }
  textoAnimado.value = historiaActual.value.texto
  escribiendo.value = false
}

// Función para aplicar efectos
function aplicarEfectos(efectos) {
  if (efectos.dinero) {
    jugador.value.dinero += efectos.dinero
    jugador.value.dinero = Math.max(0, jugador.value.dinero)
  }

  if (efectos.energia) {
    jugador.value.energia += efectos.energia
    jugador.value.energia = Math.max(0, Math.min(100, jugador.value.energia))
  }

  if (efectos.tiempo) {
    jugador.value.tiempo += efectos.tiempo
    if (jugador.value.tiempo >= 24) {
      jugador.value.tiempo = 24
    }
  }

  if (efectos.reputacion) {
    jugador.value.reputacion += efectos.reputacion
  }

  if (efectos.ubicacion) {
    // Si efectos.ubicacion es el nombre ('Callejon', 'Tienda', etc.)
    const imagenEncontrada = imagenes.find(
      (img) => img.nombre.toLowerCase() === efectos.ubicacion.toLowerCase(),
    )
    if (imagenEncontrada) {
      jugador.value.ubicacion = imagenEncontrada.ruta
    } else {
      console.error('Nombre de imagen no encontrado:', efectos.ubicacion)
      jugador.value.ubicacion = imagenes[0].ruta // Imagen por defecto
    }
  }
}

// Función para cambiar de historia
function cambiarHistoria(id) {
  const nuevaHistoria =
    history.value.find((h) => h.id === id) || transiciones.find((t) => t.id === id)

  if (!nuevaHistoria) {
    console.error('Historia no encontrada:', id)
    return
  }

  historiaActual.value = nuevaHistoria
  historiasCompletadas.value.push(id)

  // Iniciar efecto de máquina de escribir con el texto de la nueva historia
  iniciarEfectoMaquina(nuevaHistoria.texto)

  // Verificar finales después de cambiar de historia
  setTimeout(() => {
    verificarFinales()
  }, 1000)
}

// Computed properties
const formatoHora = computed(() => {
  const hora = Math.floor(jugador.value.tiempo)
  const minutos = Math.round((jugador.value.tiempo - hora) * 60)
  return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`
})

const estadoEnergia = computed(() => {
  if (jugador.value.energia >= 70) return 'Energético'
  if (jugador.value.energia >= 40) return 'Cansado'
  if (jugador.value.energia >= 20) return 'Agotado'
  return 'Colapsando'
})

const decisionesDisponibles = computed(() => {
  const decisionIds = historiaActual.value.decisiones || []
  const todasDecisiones = [...decisions.value, ...transiciones]

  return decisionIds
    .map((id) => todasDecisiones.find((d) => d.id === id))
    .filter((decision) => {
      if (!decision) return false

      // Verificar requisitos
      if (decision.requisito) {
        if (decision.requisito.dinero && jugador.value.dinero < decision.requisito.dinero) {
          return false
        }
      }

      return true
    })
})

// Funciones del juego
function comenzarJuego() {
  jugador.value = {
    dinero: 5,
    energia: 75,
    tiempo: 12,
    ubicacion: '/img/callejon.png',
    inventario: [],
    reputacion: 0,
  }
  historiasCompletadas.value = []
  historial.value = []
  mostrandoFinal.value = false
  textoAnimado.value = ''
  escribiendo.value = false

  // Limpiar intervalo si existe
  if (intervaloEscritura) {
    clearInterval(intervaloEscritura)
    intervaloEscritura = null
  }

  // Empezar con la historia 1
  cambiarHistoria(1)

  // Agregar al historial
  agregarAlHistorial(history.value[0], false)
}

function tomarDecision(decision) {
  if (mostrandoFinal.value || escribiendo.value) return

  // Aplicar efectos de la decisión
  if (decision.efectos) {
    aplicarEfectos(decision.efectos)
  }

  // Agregar al historial
  agregarAlHistorial(decision, true)

  // Destacar la decisión temporalmente
  decisionDestacada.value = decision.id
  setTimeout(() => {
    decisionDestacada.value = null
  }, 1000)

  // Cambiar a la siguiente historia
  cambiarHistoria(decision.idhistoria)
}

function puedeTomarDecision(decision) {
  if (!decision) return false

  if (decision.requisito) {
    if (decision.requisito.dinero && jugador.value.dinero < decision.requisito.dinero) {
      return false
    }
  }

  return true
}

function verificarFinales() {
  for (const [key, final] of Object.entries(finales)) {
    if (final.condiciones(jugador.value)) {
      finalActual.value = final
      mostrandoFinal.value = true
      break
    }
  }
}

function agregarAlHistorial(item, esDecision) {
  historial.value.push({
    id: historial.value.length + 1,
    texto: item.texto,
    tipo: esDecision ? 'decision' : 'historia',
    decisionTomada: esDecision,
    timestamp: new Date().toLocaleTimeString(),
  })
}

function reiniciarJuego() {
  comenzarJuego()
}

function verHistorial() {
  mostrandoHistorial.value = true
}

// Limpiar intervalo al desmontar
onUnmounted(() => {
  if (intervaloEscritura) {
    clearInterval(intervaloEscritura)
  }
})

// Inicializar juego
onMounted(() => {
  comenzarJuego()
})

// Watchers para cambios importantes
watch(
  () => jugador.value.energia,
  (newVal) => {
    if (newVal <= 0) {
      verificarFinales()
    }
  },
)

watch(
  () => jugador.value.dinero,
  (newVal) => {
    if (newVal <= 0) {
      verificarFinales()
    }
  },
)

watch(
  () => jugador.value.tiempo,
  (newVal) => {
    if (newVal >= 24) {
      verificarFinales()
    }
  },
)
</script>

<style scoped>
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

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.blinking-cursor {
  animation: blink 1s infinite;
  color: #fbbf24;
  font-weight: bold;
  margin-left: 2px;
}

/* Personalizar scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
