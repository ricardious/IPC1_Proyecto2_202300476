class User {
    constructor(carnet, nombres, apellidos, genero, facultad, carrera, correo, contrasena, role) {
        this.carnet = carnet;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.genero = genero;
        this.facultad = facultad;
        this.carrera = carrera;
        this.correo = correo;
        this.contrasena = contrasena;
        this.role = role;
    }
}

export {User}
