import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  public data = [];
  public preguntas = [];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  };
  dtTrigger: Subject<any> = new Subject();
  datos_crear = {
    tipo: 0
    , texto: ''
    , opciones: []
  }
  tipos_pregunta = environment.tipos_pregunta;
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {
    console.log(this.tipos_pregunta);

  }
  ngOnInit(): void {
    this.cargarpreguntas();
    this.cargarformularios();
  }

  cargarformularios() {
    this.api.getdata('formularios').subscribe((items) => {
      console.log(items);
      this.data = items.data;
      this.dtTrigger.next();
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });

  }
  cargarpreguntas() {
    this.api.getdata('preguntas').subscribe((items) => {
      console.log(items);
      this.preguntas = items.data;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });

  }
  crearnuevo() {
    $('#exampleModal').modal('show');
  }
  borrarindex(index) {
    this.datos_crear.opciones.splice(index, 1);

    console.log(index);
  }

  crear() {
    let mensaje;
    if (!this.datos_crear.texto) {
      mensaje = '<br>Nombre es requerido';
    }
    if (!this.datos_crear.tipo) {
      mensaje = mensaje + '<br>Tipo de respuesta es requerido';
    }
    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();
    this.api.postdata(this.datos_crear, 'pregunta/crear').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
      this.data.push(respuesta.data);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
      this.datos_crear = {
        tipo: 0
        , texto: ''
        , opciones: []
      }
      this.SpinnerService.hide();
      $('#exampleModal').modal('hide');
    }, err => {
      this.SpinnerService.hide();
      if (err.status == 401 || err.status == 403) {
        this.api.auth.logout();
      }

      if (err.status == 410) {

        this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['error']['message']);

        return;
      }

      this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['message']);
      console.log('error', err);

    });
  }

}
