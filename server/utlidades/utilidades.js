const crearMensaje = (nombre, mensaje) => {
    return {
        nombre,
        mensaje,
        fecha: new Date()
    }


}



module.exports = {
    crearMensaje
}