export class Medico {

    constructor(
        public nombre?: string,    //Almacena el nombre del médico (esta clave es opcional observa el signo de interrogación)
        public img?: string,    // Almacena el nombre de la imagen del médico (esta clave es opcional observa el signo de interrogación)
        public usuario?: string,    // Almacena el id del usuario que creó el médico en cuestión (esta clave es opcional observa el signo de interrogación)
        public hospital?: string,    // Almacena el id del hospital al que pertenece el mádico en cuestión (esta clave es opcional observa el signo de interrogación)
        public _id?: string    // Almacena el id del médico (esta clave es opcional observa el signo de interrogación)
    ) { }
}