

export class Alumno {


    constructor(
        public nombre: string,
        public apellido1: string,
        public apellido2: string,
        public cedula: string,
        public fechaNacimiento: Date,
        public direccion: string,
        public telefono: string,
        public encargado: string,
        public telefono2?: string,
        public email?: string,
        public email2?: string,
        public encargado2?: string
    ) { }

}
