import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Horario } from '../models/Horario';

@Injectable({
  providedIn: 'root'
})
export class CampusApiService {

  constructor(private httpClient: HttpClient) { }


  getProgramaPeriodos(codigo: string): Observable<any[]>{
    return this.httpClient.get<any[]>('http://193.122.146.6:8085/ServiceAcad/Programa/Periodos/'+codigo).pipe(map(res => res))
    //return this.httpClient.get<any[]>('https://localhost:7285/Programa/Periodos/'+codigo).pipe(map(res => res))
  }

  getComponentesPorMatriculas(codigo: string, anio: number, periodo: number){
    return this.httpClient.get<any[]>('http://193.122.146.6:8085/ServiceAcad/Programa/Matriculas/'+codigo+'/'+anio+'/'+periodo).pipe(map(res => res))
  }

  getHorario(codigo: string, anio: number, periodo: number){
    return this.httpClient.get<Horario[]>('https://localhost:7285/Programa/Horario/'+codigo+'/'+anio+'/'+periodo).pipe(map(res => res))
  }





}
