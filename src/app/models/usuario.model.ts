export class Usuario {
    constructor(
        public nombre: string,    // Almacena el nombre del usuario (esta clave es obligatoria)
        public email: string,    // Almacena el email del usuario (esta clave es obligatoria)
        public password: string,    // Almacena la contraseña del usuario encriptada (esta clave es obligatoria)
        public img?: string,    // Almacena el nombre de la imagen del usuario (esta clave es opcional observa el signo de interrogación)
        public role?: string,    // Almacena el role del usuario que por defecto será 'USER_ROLE' (esta clave es opcional observa el signo de interrogación)
        public _id?: string    // Almacena el id del usuario (esta clave es opcional observa el signo de interrogación)
        ) {}
}