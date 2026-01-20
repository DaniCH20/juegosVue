import { ref, computed, onMounted, watch } from 'vue'

export const decisions = ref([
  // =========================
  // TRANSICIONES INICIALES
  // =========================
  {
    id: 100,
    texto: 'Levantarte y salir del callejón',
    idhistoria: 2,
    efectos: { tiempo: 0.25, energia: -5 },
  },
  {
    id: 101,
    texto: 'Entrar a la tienda',
    idhistoria: 3,
    efectos: { tiempo: 0.25, ubicacion: 'Tienda' },
  },
  {
    id: 102,
    texto: 'Preguntar cómo salir del Callao',
    idhistoria: 4,
    efectos: {},
  },
  {
    id: 103,
    texto: 'Salir a buscar dinero',
    idhistoria: 5,
    efectos: { tiempo: 0.25, ubicacion: 'Calle' },
  },

  // =========================
  // SUPERVIVENCIA
  // =========================
  {
    id: 1,
    texto: 'Ir al puesto de salichipapas',
    idhistoria: 7, // Cambiado de 13 a 7 para seguir la historia original
    efectos: { dinero: -2.5, energia: 30, tiempo: 0.5 },
  },
  {
    id: 2,
    texto: 'Caminar por la avenida buscando oportunidades',
    idhistoria: 6,
    efectos: { energia: -10, tiempo: 0.5, ubicacion: 'Reunidos' },
  },
  {
    id: 3,
    texto: 'Ir al mercado cercano',
    idhistoria: 20,
    efectos: { energia: -5, tiempo: 0.5, ubicacion: 'Mercado' },
  },

  // =========================
  // JUEGO DE DADOS
  // =========================
  {
    id: 4,
    texto: 'Apostar tus 5 soles en los dados',
    idhistoria: 14, // ganar
    requisito: { dinero: 5 },
    efectos: { tiempo: 0.5 },
  },
  {
    id: 5,
    texto: 'No jugar y retirarte',
    idhistoria: 15,
    efectos: { tiempo: 0.25 },
  },

  // =========================
  // ROBO
  // =========================
  {
    id: 10,
    texto: 'Correr sin mirar atrás',
    idhistoria: 17,
    efectos: { energia: -30, tiempo: 0.25, ubicacion: 'Paradero' },
  },
  {
    id: 11,
    texto: 'Pelear usando lo que encuentres',
    idhistoria: 19,
    efectos: { energia: -40, tiempo: 0.25 },
  },
  {
    id: 12,
    texto: 'Entregar el dinero',
    idhistoria: 18,
    efectos: { dinero: -5, energia: -20 },
  },

  // =========================
  // MERCADO Y TRABAJO
  // =========================
  {
    id: 13,
    texto: 'Ayudar a descargar camiones',
    idhistoria: 22,
    requisito: { energia: 40 },
    efectos: { dinero: 10, energia: -40, tiempo: 2, ubicacion: 'Mercado' },
  },
  {
    id: 14,
    texto: 'Vender comida informalmente',
    idhistoria: 22,
    efectos: { dinero: 6, energia: -20, tiempo: 1.5 },
  },
  {
    id: 15,
    texto: 'Cantar en el óvalo para pedir dinero',
    idhistoria: 27,
    efectos: { dinero: 15, reputacion: -10, tiempo: 1 },
  },
  {
    id: 16,
    texto: 'Recoger botellas para reciclar',
    idhistoria: 28,
    efectos: { dinero: 3, energia: -15, tiempo: 1 },
  },

  // =========================
  // PARADERO - DECISIONES DE ESPERA
  // =========================
  {
    id: 6,
    texto: 'Seguir esperando',
    idhistoria: 10,
    efectos: { energia: -15, tiempo: 0.5 },
  },
  {
    id: 7,
    texto: 'Dormirte para que pase más tiempo',
    idhistoria: 11,
    efectos: { energia: 20, tiempo: 2 },
  },
  {
    id: 8,
    texto: 'Ir al Parque',
    idhistoria: 12,
    efectos: { energia: -5, tiempo: 0.2 },
  },
  {
    id: 9,
    texto: 'Ir al Mercado',
    idhistoria: 9,
    efectos: { energia: -5, tiempo: 0.2 },
  },

  // =========================
  // TRANSICIONES A PARADERO
  // =========================
  {
    id: 200,
    texto: 'Ir al paradero de combis',
    idhistoria: 8,
    efectos: { tiempo: 0.25 },
  },
  {
    id: 201,
    texto: 'Esperar la combi',
    idhistoria: 9,
    efectos: { tiempo: 0.5, energia: -10, ubicacion: 'Paradero' },
  },

  // =========================
  // ALTERNATIVAS DE TRANSPORTE
  // =========================
  {
    id: 20,
    texto: 'Pedir aventón a un camionero',
    idhistoria: 32,
    efectos: { tiempo: 0.5 },
  },
  {
    id: 21,
    texto: 'Tomar un taxi colectivo (precio normal)',
    idhistoria: 33,
    requisito: { dinero: 15 },
    efectos: { dinero: -15, tiempo: 0.25 },
  },
  {
    id: 22,
    texto: 'Intentar colarte en un bus',
    idhistoria: 34,
    efectos: { tiempo: 0.5, reputacion: -5 },
  },

  // =========================
  // EMERGENCIAS
  // =========================
  {
    id: 23,
    texto: 'Ir a la comisaría a pedir ayuda',
    idhistoria: 35,
    efectos: { tiempo: 1, reputacion: 5 },
  },
  {
    id: 24,
    texto: 'Llamar a un familiar (si tienes crédito)',
    idhistoria: 36,
    efectos: { tiempo: 0.25, dinero: 20 },
  },
  {
    id: 25,
    texto: 'Esconderte en un edificio abandonado',
    idhistoria: 37,
    efectos: { energia: 10, tiempo: 1 },
  },

  // =========================
  // INTERACCIONES CON NPCs
  // =========================
  {
    id: 26,
    texto: 'Aceptar el trabajo que te ofrece un extraño',
    idhistoria: 38,
    efectos: { dinero: 30, energia: -50, tiempo: 3 },
  },
  {
    id: 27,
    texto: 'Negarte educadamente y alejarte',
    idhistoria: 39,
    efectos: { tiempo: 0.25, reputacion: 5 },
  },
  {
    id: 28,
    texto: 'Unirte a una manifestación cercana',
    idhistoria: 40,
    efectos: { tiempo: 2, energia: -30, reputacion: 10 },
  },

  // =========================
  // EVENTOS ALEATORIOS
  // =========================
  {
    id: 29,
    texto: 'Quedarte con el dinero de la billetera',
    idhistoria: 50,
    efectos: { dinero: 25, reputacion: -20 },
  },
  {
    id: 30,
    texto: 'Buscar al dueño de la billetera',
    idhistoria: 51,
    efectos: { dinero: 10, reputacion: 25, tiempo: 1 },
  },
  {
    id: 31,
    texto: 'Ayudar al skater herido',
    idhistoria: 52,
    efectos: { tiempo: 1, reputacion: 10 },
  },

  // =========================
  // CLIMA Y REFUGIO
  // =========================
  {
    id: 32,
    texto: 'Buscar refugio bajo un techo',
    idhistoria: 54,
    efectos: { tiempo: 0.5 },
  },
  {
    id: 33,
    texto: 'Seguir caminando bajo la lluvia',
    idhistoria: 55,
    efectos: { energia: -20, tiempo: 0.25 },
  },

  // =========================
  // TRANSPORTE ALTERNATIVO
  // =========================
  {
    id: 34,
    texto: 'Esperar el tren',
    idhistoria: 56,
    requisito: { dinero: 8 },
    efectos: { dinero: -8, tiempo: 1 },
  },

  // =========================
  // DECISIONES ESPECIALES
  // =========================
  {
    id: 35,
    texto: 'Ayudar a los heridos del accidente',
    idhistoria: 44,
    efectos: { tiempo: 1, reputacion: 15 },
  },
  {
    id: 36,
    texto: 'Seguir tu camino',
    idhistoria: 45,
    efectos: { tiempo: 0.25, reputacion: -5 },
  },
  {
    id: 37,
    texto: 'Ayudar con el inventario de la tienda',
    idhistoria: 48,
    efectos: { dinero: 5, tiempo: 1 },
  },
  {
    id: 38,
    texto: 'Solo comprar y salir',
    idhistoria: 49,
    efectos: { tiempo: 0.25 },
  },
  {
    id: 39,
    texto: 'Ignorar y continuar',
    idhistoria: 53,
    efectos: { tiempo: 0.25, reputacion: -10 },
  },
  {
    id: 40,
    texto: 'Volver a la Tienda',
    idhistoria: 53,
    efectos: { tiempo: 0.25, energia: -10, ubicacion: 'Tienda' },
  },
  {
    id: 41,
    texto: 'Rechazas la ayuda y vuelves al paradero ',
    idhistoria: 201,
    efectos: { tiempo: 0.25, energia: -10 },
  },
  {
    id: 42,
    texto: 'Ir a jugar con los skaters',
    idhistoria: 201,
    efectos: { tiempo: 0.25, energia: -10 },
  },
  {
    id: 43,
    texto: 'Ir donde los ancianos',
    idhistoria: 201,
    efectos: { tiempo: 0.25, energia: -10 },
  },
  {
    id: 44,
    texto: 'Ir donde los niños ',
    idhistoria: 201,
    efectos: { tiempo: 0.25, energia: -10 },
  },
  {
    id: 44,
    texto: 'Ir donde los niños ',
    idhistoria: 201,
    efectos: { tiempo: 0.25, energia: -10 },
  },
])
