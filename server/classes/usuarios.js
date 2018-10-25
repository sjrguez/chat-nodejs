// 
// 
// 
// 


class Usuarios {

    constructor() {
        this.personas = []
    }

    agregarPersonas(id, nombre, sala) {

        let persona = { id, nombre, sala }
        this.personas.push(persona)

        return this.personas
    }

    getPersona(id) {
        let persona = this.personas.filter(person => person.id == id)[0]
        return persona
    }

    getPersonas() {
        return this.personas
    }

    getPersonasSalas(sala) {
        let personaPorSala = this.personas.filter(persona => persona.sala == sala)
        return personaPorSala
    }


    borrarPersona(id) {
        let personaBorrada = this.getPersona(id)
        this.personas = this.personas.filter(persona => persona.id != id)
        return personaBorrada
    }


}




module.exports = {
    Usuarios
}