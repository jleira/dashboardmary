import { Component, OnInit, ViewChild } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
declare var $: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  public data = [];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  };
  dtTrigger: Subject<any> = new Subject();
  datos_crear = {
    perfil: 0
    , name: ''
    , email: ''
    , password: ''
  }
  perfiles=[];
  tipos_pregunta = environment.tipos_pregunta;
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {
    console.log(this.tipos_pregunta);

  }
  ngOnInit(): void {
    this.cargarusuarios();
    this.cargarperfiles();
  }
 
  cargarperfiles() {
    this.api.getdata('tiposPorClase?clase=perfiles').subscribe((items) => {
      this.perfiles = items.data;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
    });
  }
  cargarusuarios() {
    this.api.getdata('usuarios').subscribe((items) => {
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
  crearnuevo() {
    $('#exampleModal').modal('show');
  }

  crear() {
    let mensaje;
    if (!this.datos_crear.name) {
      mensaje = '<br>Nombre es requerido';
    }
    if (!this.datos_crear.perfil) {
      mensaje = mensaje + '<br>Perfil es requerido';
    }
    if (!this.datos_crear.email) {
      mensaje = '<br>correo es requerido';
    }
    if (!this.datos_crear.password) {
      mensaje = mensaje + '<br>contraseña es requerido';
    }

    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();
    this.api.postdata(this.datos_crear, 'register').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
      console.log(respuesta);
      this.datos_crear = {
        perfil: 0
        , name: ''
        , email: ''
        , password: ''
      }
      this.SpinnerService.hide();
      this.data.push(respuesta.data);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });

      $('#exampleModal').modal('hide');
    }, err => {
      this.SpinnerService.hide();
 
      if (err.status == 410) {

        this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['error']['message']);

        return;
      }

      this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['message']);
      console.log('error', err);

    });
  }

  buscar(color){
    if(color==1){
      return "Gris";
    }
    if(color==2){
      return "Verde";
    }
    if(color==3){
      return "Amarillo";
    }
    if(color==4){
      return "Rojo";
    }
    if(color==5){
      return "Morado";
    }
  }

}
