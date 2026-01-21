// HISTORIAS SIN EFECTOS - solo texto
import { ref, computed, onMounted, watch } from 'vue'
export const history = ref([
  {
    id: 1,
    texto:
      'Despiertas en un callejón desconocido. No sabes cómo llegaste aquí, pero sabes que no debes quedarte mucho tiempo. Revisas tus bolsillos: solo tienes 5 soles.',
    decisiones: [100],
  },
  {
    id: 2,
    texto:
      'Sales del callejón y llegas a una calle principal. Un cartel confirma lo que temías: estás en El Callao.',
    decisiones: [101],
  },
  {
    id: 3,
    texto:
      'Entras a una tienda cercana. El dueño te mira con desconfianza mientras le preguntas cómo salir del Callao.',
    decisiones: [102],
  },
  {
    id: 4,
    texto:
      'El dueño te explica: de noche la combi cuesta 10 soles. Si esperas al amanecer, solo 2.50. No parece muy convencido de que llegues vivo a la mañana.',
    decisiones: [103],
  },
  {
    id: 5,
    texto:
      'Sales de la tienda. La noche es peligrosa y necesitas dinero rápido. Debes decidir cómo sobrevivir.',
    decisiones: [1, 2, 3],
  },
  {
    id: 6,
    texto:
      'Llegas a la avenida Argentina. Un grupo juega dados. Te ofrecen una apuesta: si ganas, 10 soles; si pierdes, pierdes todo.',
    decisiones: [4, 5],
  },
  {
    id: 7,
    texto: 'Te comes una salchipapa caliente. Recuperas energía y fuerzas para seguir.',
    decisiones: [200],
  },
  {
    id: 8,
    texto: 'Llegas al paradero. Varias personas esperan en silencio. La noche avanza.',
    decisiones: [201],
  },
  {
    id: 9,
    texto: 'La combi llega, pero el cobrador te pide 10 soles. No tienes suficiente.',
    decisiones: [6, 7, 8, 9],
  },
  {
    id: 10,
    texto: 'El cobrador anuncia que la combi está llena. Tendrás que esperar otra.',
    decisiones: [6, 7, 8, 9],
  },
  {
    id: 11,
    texto:
      'Mientras duermes alguien te roba tus pocos soles que te quedan y al despertar te das cuenta que ya no tienes dinero para pagar la combi.',
    decisiones: [3, 8, 40],
  },
  {
    id: 12,
    texto: 'Al llegar al parque te encuentras con varias grupos de personas que haces ',
    decisiones: [42, 43, 44],
  },
  {
    id: 13,
    texto:
      'Después de comer la salchipapa te sientes con más energía para seguir buscando una manera de salir de ahí.',
    decisiones: [200],
  },
  {
    id: 14,
    texto: '¡Decides unirte al juego y por suerte ganas! Ahora tienes 15 soles en total.',
    decisiones: [200],
  },
  {
    id: 15,
    texto: 'Decides no unirte al juego pero al alejarte te topas con un chamo en medio del camino.',
    decisiones: [10, 11, 12],
  },
  {
    id: 16,
    texto:
      'Decides no unirte al juego pero lastimosamente perdiste la oportunidad de ganar dinero fácil.',
    decisiones: [200],
  },
  {
    id: 17,
    texto: 'Lograste escapar a salvo pero estás agotado y no sabes a dónde ir.',
    decisiones: [200],
  },
  {
    id: 18,
    texto:
      'Le diste 5 soles, por suerte el resto te lo metiste en el culo así que no te robó todo. Lastimosamente las monedas no son para nada cómodas.',
    decisiones: [200],
  },
  {
    id: 19,
    texto:
      'Lograste defenderte con un palo que encontraste. Por suerte el chamo solo hacía servicio de Rappi.',
    decisiones: [200],
  },
  {
    id: 20,
    texto:
      'Ves un mercado cercano donde podrías encontrar trabajo temporal. Los olores de comida te recuerdan que hace horas que no comes.',
    decisiones: [13, 14, 15, 16],
  },
  {
    id: 22,
    texto:
      'Has completado el trabajo. Te duele la espalda pero tienes dinero extra en el bolsillo.',
    decisiones: [200],
  },
  {
    id: 27,
    texto:
      'Cantas en el óvalo y algunas personas te dan dinero, aunque otros te miran con desprecio.',
    decisiones: [200],
  },
  {
    id: 28,
    texto: 'Recoges botellas por un rato y las vendes. No es mucho, pero es dinero honesto.',
    decisiones: [200],
  },
  {
    id: 32,
    texto: 'El camionero acepta llevarte, pero solo hasta la mitad del camino.',
    decisiones: [200],
  },
  {
    id: 33,
    texto: 'El taxi colectivo te deja en la avenida principal. Estás más cerca de salir.',
    decisiones: [200],
  },
  {
    id: 34,
    texto: 'Intentas colarte en el bus pero el cobrador te descubre y te humilla frente a todos.',
    decisiones: [200],
  },
  {
    id: 35,
    texto: 'En la comisaría, un policía te escucha pero no puede hacer mucho. Te desea suerte.',
    decisiones: [200],
  },
  {
    id: 36,
    texto: 'Tu familiar te envía dinero por Yape. Ahora tienes más recursos para escapar.',
    decisiones: [200],
  },
  {
    id: 37,
    texto:
      'Te escondes en un edificio abandonado. Es frío y oscuro, pero al menos estás a salvo por un momento.',
    decisiones: [200],
  },
  {
    id: 38,
    texto: 'El trabajo resulta ser ilegal, pero ganas bastante dinero. Esperas no tener problemas.',
    decisiones: [200],
  },
  {
    id: 39,
    texto: 'Te alejas educadamente. Es mejor no meterse en problemas.',
    decisiones: [200],
  },
  {
    id: 40,
    texto: 'Te unes a la manifestación. Sientes que formas parte de algo, aunque te cansa.',
    decisiones: [200],
  },
  {
    id: 44,
    texto: 'Ayudas a los heridos. Los paramédicos llegan y te agradecen por tu ayuda.',
    decisiones: [200],
  },
  {
    id: 45,
    texto: 'Sigues tu camino, ignorando el accidente. Sientes un poco de culpa.',
    decisiones: [200],
  },
  {
    id: 48,
    texto: 'Ayudas al dueño de la tienda y él te agradece dándote un pago extra.',
    decisiones: [200],
  },
  {
    id: 49,
    texto: 'Compras lo que necesitas y sales rápido. No hay tiempo que perder.',
    decisiones: [200],
  },
  {
    id: 50,
    texto: 'Te quedas con el dinero. Nadie te vio, pero te sientes culpable.',
    decisiones: [200],
  },
  {
    id: 51,
    texto: 'Encuentras al dueño de la billetera. Está tan agradecido que te da una recompensa.',
    decisiones: [200],
  },
  {
    id: 52,
    texto: 'Ayudas al skater. Sus amigos te agradecen y uno te ofrece llevarte al paradero.',
    decisiones: [200],
  },
  {
    id: 53,
    texto: 'Ignoras la situación y sigues caminando. Escuchas insultos a tus espaldas.',
    decisiones: [200],
  },
  {
    id: 54,
    texto: 'Te refugias bajo un techo. La lluvia dura un buen rato.',
    decisiones: [200],
  },
  {
    id: 55,
    texto: 'Caminas bajo la lluvia. Terminas completamente mojado y empezas a estornudar.',
    decisiones: [200],
  },
  {
    id: 56,
    texto: 'Esperas el tren. Finalmente llega y tomas tu boleto.',
    decisiones: [200],
  },
  {
    id: 57,
    texto:
      'El dueño de la tienda te ve desesperado y te ofrece que le ayudes con el inventario de la tienda.',
    decisiones: [37, 41],
  },
  {
    id: 58,
    texto:
      'Al acercarte a los skaters presencias un accidente uno de los jovenes se cae y se lastima que haces .',
    decisiones: [27, 31],
  },
])
