export const finales = {
  exito_nocturno: {
    id: 'final1',
    titulo: '¡Escapaste de noche!',
    descripcion:
      'Lograste conseguir los 10 soles y tomaste la combi nocturna. Sales del Callao pero con menos dinero del que esperabas...  ...  ...  ...   ...   ... CRASH! El coche chocó con un poste y mueres en el acto. Fin del juego.',
    condiciones: (jugador) =>
      jugador.dinero >= 10 &&
      jugador.ubicacion == './img/paradero.png' &&
      jugador.tiempo >= 16 &&
      jugador.tiempo < 18 &&
      jugador.energia <= 40,
  },
  exito_diurno: {
    id: 'final2',
    titulo: 'Escape económico',
    descripcion:
      'Esperaste hasta la mañana y pagaste solo 2.50 soles. Sales del Callao con algo de dinero en el bolsillo pero no aguantas el cansancio y te quedas dormido... te despiertas y te das cuenta que la combi ya dio la vuelta y regresaste al Callao.',
    condiciones: (jugador) =>
      jugador.dinero >= 2.5 &&
      jugador.ubicacion == './img/paradero.png' &&
      jugador.tiempo >= 18 &&
      jugador.energia <= 50,
  },
  fracaso_robo: {
    id: 'final3',
    titulo: 'Sin un sol',
    descripcion:
      'Te robaron todo tu dinero. Te quedas atrapado en el Callao sin posibilidad de salir. Lo único que te queda es vender tus órganos pero lastimosamente la operación falla y mueres porque contrajiste SIDA.',
    condiciones: (jugador) => jugador.dinero <= 0 && jugador.tiempo >= 20 && jugador.energia <= 30,
  },
  fracaso_energia: {
    id: 'final4',
    titulo: 'Colapso físico',
    descripcion:
      'Te quedaste sin energia  y te desmayaste en la calle. Terminas en una posta medica sin un riñon , necesitaban un donante para un herido y como no te podias negar procedieron con el transplante',
    condiciones: (jugador) => jugador.energia <= 0 && jugador.tiempo >= 14,
  },
  exito_trabajo: {
    id: 'final6',
    titulo: '💼 Nuevo Comienzo',
    descripcion:
      'Encontraste un trabajo estable en el mercado. Decidiste quedarte en El Callao y construiste una nueva vida allí.Pero lastimosamente al dia siguiente de abrir tu tienda una bomba explota en tu puesto te olvidaste pagar cupo y falleces por la explosion',
    condiciones: (jugador) =>
      jugador.dinero >= 50 &&
      jugador.reputacion >= 20 &&
      jugador.tiempo >= 18 &&
      jugador.ubicacion == 'Mercado',
  },
  exito_tv: {
    id: 'final7',
    titulo: '🎬 Estrella de TV',
    descripcion:
      'El reality show fue un éxito. Ahora eres famoso sin embargo fue por salir en el programa de Andrea como cachudo',
    condiciones: (jugador) => jugador.dinero >= 1000 && jugador.tiempo >= 18,
  },
  exito_policia: {
    id: 'final8',
    titulo: '👮‍♂️ Ciudadano Ejemplar',
    descripcion:
      'Tu ayuda a la ciudadania fue tan notable que la municipalidad te ofreció trabajo. Ahora patrullas las calles como serenazgo .',
    condiciones: (jugador) =>
      jugador.reputacion >= 50 && jugador.energia >= 40 && jugador.tiempo >= 16,
  },
  fracaso_enfermedad: {
    id: 'final9',
    titulo: '🏥 Hospitalizado',
    descripcion:
      'La exposición al frío y la lluvia te hizo enfermar gravemente. Terminas en el hospital por semanas.Para cuando despiertas ves a spiderman y los vengadores en tu habitacion (El diagnostico del doctor es necrosis gangrenosa).',
    condiciones: (jugador) =>
      jugador.energia <= 10 && jugador.tiempo >= 20 && jugador.ubicacion !== './img/paradero.png',
  },
  fracaso_arresto: {
    id: 'final10',
    titulo: '🔒 Detenido',
    descripcion:
      'Tus actividades ilegales llamaron la atención de la policía. Pasas la noche en la carcel por tus acciones .Tu compañero de celda se acerca y te dice al oido "En la guerra cualquier hoyo es trinchera " ',
    condiciones: (jugador) => jugador.reputacion <= -30 && jugador.tiempo >= 18,
  },
}
