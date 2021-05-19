export class Hospital {

    constructor (
        public nombre: string,    // Almacena el nombre del hospital (esta clave es obligatoria)
        public img?: string,    // Almacena el nombre de la imagen del hospital (esta clave es opcional observa el signo de interrogación)
        public _id?: string    // Almacena el id del hospital (esta clave es opcional observa el signo de interrogación)
    ) { }

}
