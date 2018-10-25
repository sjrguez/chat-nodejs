const { io } = require('../server');
const { Usuarios } = require("../classes/usuarios")
const { crearMensaje } = require("../utlidades/utilidades")

const usuarios = new Usuarios()
io.on('connection', (client) => {

    client.on("entrarChat", (data, callback) => {
        console.log(`Usuario: ${data.nombre} se ha conectado`);
        if (!data.nombre || !data.sala) {
            objeto = {
                error: true,
                mensaje: "El nombre/sala es necesario!"
            }
            return callback(objeto)
        }

        client.join(data.sala)

        usuarios.agregarPersonas(client.id, data.nombre, data.sala)
        client.broadcast.to(data.sala).emit("listaPersonas", usuarios.getPersonasSalas(data.sala))
        client.broadcast.to(data.sala).emit("crearMensaje", crearMensaje("Administrador", `${data.nombre} se unio  al chat`))

        callback(usuarios.getPersonasSalas(data.sala))
    })

    client.on("crearMensaje", (data, callback) => {
        let persona = usuarios.getPersona(client.id)
        let mensaje = crearMensaje(persona.nombre, data.mensaje)
        client.broadcast.to(persona.sala).emit("crearMensaje", mensaje)

        callback(mensaje)
    })


    client.on("mensajePrivado", (data) => {

        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.para).emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje))
    })






    client.on("disconnect", () => {
        let personaBorrada = usuarios.borrarPersona(client.id)

        client.broadcast.to(personaBorrada.sala).emit("crearMensaje", crearMensaje("Administrador", `${personaBorrada.nombre} abandono el chat`))
        client.broadcast.to(personaBorrada.sala).emit("listaPersonas", usuarios.getPersonasSalas(personaBorrada.sala))
    })






});