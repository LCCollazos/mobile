import { Component, inject } from '@angular/core';
import { CampusApiService } from '../common/services/campus-api.service';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Title } from '@angular/platform-browser';
import { Horario } from '../common/models/Horario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  CampusApiService: CampusApiService = inject(CampusApiService)

  PeriodoSelected: any
  ComponentAcadSelected: any

  ListPeriodos: any[] = []
  ListModulosAcad: any[] = []

  isViewComponentAcad = false

  opcionSeleccionada: string = '0';
  selectedSegment: string = 'notas';

  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridDay',
    weekends: true,
    locale: esLocale,
    allDaySlot: false,
    slotMinTime: '07:00:00',
    slotMaxTime: '24:00:00',
    headerToolbar: {
      left: 'title',
      center: '',
      right: ''
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      hour12: true,
      meridiem: 'short',
    },
    eventContent: function (arg) {
      if (!arg.event.start || !arg.event.end || !arg.event.extendedProps) {
        return;
      }
      var start = arg.event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      var end = arg.event.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      var sede = arg.event.extendedProps['sede'];
      var salon = arg.event.extendedProps['salon'];
      var docente = arg.event.extendedProps['docentes'];
      return {
        html: '<div class="fc-content" style="max-height: 100% !important; overflow: auto;">' +
          '<div class="fc-title"><b>Materia : </b><br>' + arg.event.title + '</div>' +
          '<div class="fc-start"><b>Hora : </b>' + start + ' - ' + end + '</div>' +
          '<div class="fc-description"><b>Sede : </b><br>' + sede + ' - ' + salon + '</div>' +
          '<div class="fc-description"><b>Docente : </b><br>' + docente + '</div>' +
          '</div>'
      };
    },
    events: [],
    height: 'auto',

  };

  constructor() {
    if (this.ListPeriodos.length > 0) {
      const primerPeriodo = this.ListPeriodos[0];
      this.opcionSeleccionada = `${primerPeriodo.anio}-${primerPeriodo.periodo}`;
    }
  }

  ionViewDidEnter(){
    this.ListarPeriodos('90222027')
  }

  ListarPeriodos(codigo: string){
    this.CampusApiService.getProgramaPeriodos(codigo).subscribe(resp => {
      this.ListPeriodos = resp
    })
  }

  ListarComponentesAcad(codigo: string, anio: number, periodo: number){
    this.CampusApiService.getComponentesPorMatriculas(codigo, anio, periodo).subscribe(resp => {
      this.ListModulosAcad = resp
    })
  }

  SelectPeriodo(PeriodoSelected: any){
    let seleccion = PeriodoSelected.detail.value.split('-')
    if(PeriodoSelected.detail.value !== '0'){
      this.ListarComponentesAcad('90222027', seleccion[0], seleccion[1])
      this.LoadCalendarHorario('90222027', seleccion[0], seleccion[1])
    }
  }
  LoadCalendarHorario(codigo: string, anio: any, periodo: any) {
    this.CampusApiService.getHorario(codigo, anio, periodo).subscribe(
      (eventos: Horario[]) => {
        const eventosCalendar = eventos.map(evento => ({
          title: evento.materia,
          startTime: evento.inicio,
          endTime: evento.fin,
          daysOfWeek: evento.dia,
          extendedProps: {
            sede: evento.sede,
            salon: evento.salon,
            grupo: evento.grupo,
            docentes: evento.docentes
          }
        }))
        this.calendarOptions.events = eventosCalendar
      }
    )

  }

  OpenComponentAcad(item: any){
    this.ComponentAcadSelected = item
    this.isViewComponentAcad = true
  }

  BackModalComponentAcad(){
    this.isViewComponentAcad = false
  }

  updateSelectedSegment(segment: string) {
    this.selectedSegment = segment;
  }

  Refresh(event:any) { // metodo que refresca las notas.
    setTimeout(() => {
      this.SelectPeriodo(this.opcionSeleccionada)
      event.target.complete();
    }, 2000);
  }


}
