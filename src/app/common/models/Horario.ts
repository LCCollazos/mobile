export class Horario{
  materia: string
  sede: string
  salon: string
  inicio: string
  fin: string
  dia: string
  grupo: string
  docentes: string

  constructor(
    materia: string,
    sede: string,
    salon: string,
    inicio: string,
    fin: string,
    dia: string,
    grupo: string,
    docentes: string
  ) {
    this.materia = materia
    this.sede = sede
    this.salon = salon
    this.inicio = inicio
    this.fin = fin
    this.dia = dia
    this.grupo = grupo
    this.docentes = docentes
  }



}
