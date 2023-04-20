import { Component, OnInit, ViewChild } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
declare var $: any;
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  public data = [];
  preg = false;
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  };
  dtTrigger: Subject<any> = new Subject();
  datos_crear = {
    id: 0,
    titulo: "",
    mensaje: ''
  }

  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {

  }

  perfiles = [];
  ngOnInit(): void {
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



  enviar() {

    let mensaje = '';
    if (!this.datos_crear.titulo) {
      mensaje = '<br>Debe agregar un titulo para la notificacion';
    }

    if (!this.datos_crear.mensaje) {
      mensaje = mensaje + '<br>Debe agregar un mensaje para la notificacion';
    }

    const perfilesN = this.perfiles.filter((item) => item.selected);

    if (perfilesN.length == 0) {
      mensaje = mensaje + '<br>Debe agregar los perfiles a quienes se notificara';
    }

    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();

    const data = {
      ...this.datos_crear,
      perfiles:perfilesN,
      user:this.api?.user?.id,
      
    }

    this.api.postdata(data, 'notificacion/enviar').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Notificaciones enviadas exitosamente');
      this.datos_crear = {
        id: 0,
        titulo: "",
        mensaje: ''
      };

      this.SpinnerService.hide();

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