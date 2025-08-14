//CREAR BASE DE DATOS PRIMERO
//use viaja_facil

//LUEGO LIMPIAR LA BASE
db.clientes.drop();
db.agentes.drop();
db.destinos.drop();
db.hoteles.drop();
db.vuelos.drop();
db.paquetes.drop();
db.itinerarios.drop();
db.preferencias.drop();
db.cotizaciones.drop();
db.pagos.drop();
db.comentarios.drop();
db.recomendaciones.drop();

//INSERTAR COLECCIONES Y REGISTROS DE EJEMPLO
db.clientes.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a1"),
        nombre: "Ana García",
        correo: "ana@example.com",
        telefono: "+506 8888-9999",
        preferencias: {
            clima: "tropical",
            presupuesto_max: 1500,
            tipo_viaje: "aventura"
        },
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a2"),
        nombre: "Carlos Martínez",
        correo: "carlos@example.com",
        telefono: "+506 7777-6666",
        preferencias: {
            clima: "templado",
            presupuesto_max: 2000,
            tipo_viaje: "familiar"
        },
        fecha_registro: new Date()
    }
]);

db.agentes.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c2a1"),
        nombre: "Laura Méndez",
        correo: "laura@viajafacil.com",
        experiencia_anios: 5,
        especialidad: "viajes familiares",
        activo: true
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c2a2"),
        nombre: "Roberto Jiménez",
        correo: "roberto@viajafacil.com",
        experiencia_anios: 8,
        especialidad: "viajes de aventura",
        activo: true
    }
]);

db.destinos.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c3a1"),
        nombre: "Monteverde",
        pais: "Costa Rica",
        clima_actual: "nublado",
        mejor_temporada: ["diciembre", "enero", "julio"]
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c3a2"),
        nombre: "Manuel Antonio",
        pais: "Costa Rica",
        clima_actual: "soleado",
        mejor_temporada: ["enero", "febrero", "marzo"]
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c3a3"),
        nombre: "Tamarindo",
        pais: "Costa Rica",
        clima_actual: "cálido",
        mejor_temporada: ["noviembre", "diciembre", "abril"]
    }
]);

db.hoteles.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c4a1"),
        nombre: "Hotel Arenal Paradise",
        ubicacion: "La Fortuna",
        estrellas: 4,
        precio_noche: 85,
        servicios: ["wifi", "piscina", "desayuno"]
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c4a2"),
        nombre: "Beach Resort Tamarindo",
        ubicacion: "Tamarindo",
        estrellas: 5,
        precio_noche: 120,
        servicios: ["spa", "restaurante", "gimnasio"]
    }
]);

db.vuelos.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c5a1"),
        origen: "San José",
        destino: "Madrid",
        aerolinea: "Iberia",
        precio: 620,
        duracion_horas: 10,
        fecha_salida: new Date("2025-08-05T22:00:00Z")
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c5a2"),
        origen: "Madrid",
        destino: "San José",
        aerolinea: "Iberia",
        precio: 600,
        duracion_horas: 10,
        fecha_salida: new Date("2025-08-15T18:00:00Z")
    }
]);

db.paquetes.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a1"),
        nombre: "Aventura en Costa Rica",
        descripcion: "Tour completo por los mejores destinos de aventura",
        destinos: ["Monteverde", "Manuel Antonio"],
        precio: 950,
        duracion_dias: 7,
        incluye: ["hotel", "vuelos", "excursiones"],
        temporada: "verano",
        personalizable: true,
        imagen_url: "https://viajafacil.com/aventura.jpg",
        cupo_disponible: 15,
        activo: true
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a2"),
        nombre: "Relax en la Playa",
        descripcion: "Vacaciones relajantes en las mejores playas",
        destinos: ["Tamarindo", "Manuel Antonio"],
        precio: 1200,
        duracion_dias: 5,
        incluye: ["hotel", "vuelos", "desayuno"],
        temporada: "todo_el_año",
        personalizable: true,
        imagen_url: "https://viajafacil.com/playa.jpg",
        cupo_disponible: 10,
        activo: true
    }
]);

db.itinerarios.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c7a1"),
        paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a1"),
        dia: 1,
        actividad: "Llegada a San José y traslado al hotel"
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c7a2"),
        paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a1"),
        dia: 2,
        actividad: "Tour por el Volcán Arenal"
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c7a3"),
        paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a2"),
        dia: 1,
        actividad: "Llegada a Liberia y traslado a Tamarindo"
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c7a4"),
        paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a2"),
        dia: 2,
        actividad: "Día libre en la playa y spa"
    }
]);

db.preferencias.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c8a1"),
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a1"),
        preferencias_clima: "tropical",
        tipos_destinos: ["playa", "montaña"],
        actividades_favoritas: ["senderismo", "snorkel"]
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c8a2"),
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a2"),
        preferencias_clima: "templado",
        tipos_destinos: ["ciudad", "campo"],
        actividades_favoritas: ["gastronomía", "museos"]
    }
]);

db.cotizaciones.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c9a1"),
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a1"),
        paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a1"),
        num_personas: 2,
        precio_final: 980,
        fecha_cotizacion: new Date(),
        estado: "pendiente",
        detalles_adicionales: "Incluir tour extra al volcán"
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1c9a2"),
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a2"),
        paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a2"),
        num_personas: 4,
        precio_final: 2200,
        fecha_cotizacion: new Date(),
        estado: "aprobada",
        detalles_adicionales: "Habitaciones con vista al mar"
    }
]);

db.pagos.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1ca01"), 
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a1"),
        monto: 980,
        metodo: "tarjeta",
        fecha_pago: new Date(),
        estado: "completado"
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1ca02"),
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a2"),
        monto: 2200,
        metodo: "transferencia",
        fecha_pago: new Date(),
        estado: "completado"
    }
]);

db.comentarios.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1cb01"),
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a1"),
        paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a1"),
        comentario: "Una experiencia inolvidable!",
        calificacion: 5,
        fecha: new Date()
    },
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1cb02"),
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a2"),
        paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a2"),
        comentario: "Las playas eran paradisíacas",
        calificacion: 4,
        fecha: new Date()
    }
]);

db.recomendaciones.insertMany([
    {
        _id: ObjectId("64d8a1b7f8a9d8c7a1b1cc01"),
        cliente_id: ObjectId("64d8a1b7f8a9d8c7a1b1c1a1"),
        temporada: "verano",
        paquetes_sugeridos: [
            {
                paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a1"),
                razon: "Aventura extrema en climas tropicales"
            },
            {
                paquete_id: ObjectId("64d8a1b7f8a9d8c7a1b1c6a2"),
                razon: "Relax en playas con buen clima"
            }
        ],
        fecha_creacion: new Date()
    }
]);

db.clientes.createIndex({ correo: 1 }, { unique: true });
db.paquetes.createIndex({ nombre: 1 });
db.destinos.createIndex({ nombre: 1 });
db.cotizaciones.createIndex({ cliente_id: 1 });
db.comentarios.createIndex({ paquete_id: 1 });
db.paquetes.createIndex({ destinos: 1 });
db.cotizaciones.createIndex({ estado: 1 });
db.pagos.createIndex({ cliente_id: 1 });
db.pagos.createIndex({ estado: 1 });

print("Base de datos creada exitosamente!");