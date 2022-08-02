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
    titulo_ing: "",
    posicion: 0,
    mensaje: '',
    mensaje_ing: ''
  }

  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {

  }

  perfiles = [];
  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    this.api.getdata('notificaciones').subscribe((items) => {
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
    this.datos_crear = {
      id: 0,
      titulo: "",
      titulo_ing: "",
      posicion: 0,
      mensaje: '',
      mensaje_ing: ''
    }
    $('#nuevanotificacion').modal('show');
  }

  crear() {
    let mensaje = '';
    if (!this.datos_crear.titulo) {
      mensaje = '<br>Debe agregar un titulo para la notificacion en español';
    }

    if (!this.datos_crear.titulo_ing) {
      mensaje = mensaje + '<br>Debe agregar un titulo para la notificacion en ingles';
    }

    if (!this.datos_crear.mensaje) {
      mensaje = mensaje + '<br>Debe agregar un mensaje para la notificacion en español';
    }

    if (!this.datos_crear.titulo_ing) {
      mensaje = mensaje + '<br>Debe agregar un mensaje para la notificacion en ingles';
    }


    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();
    this.api.postdata(this.datos_crear, 'notificacion/crear').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
      this.data.push(respuesta.data);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.datos_crear = {
          id: 0,
          titulo: "",
          titulo_ing: "",
          posicion: 0,
          mensaje: '',
          mensaje_ing: ''
        }
        this.SpinnerService.hide();
        $('#nuevanotificacion').modal('hide');
 
        dtInstance.destroy();
        this.dtTrigger.next();
      });
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


  cargarperfiles() {
    this.api.getdata('tiposPorClase?clase=frecuencia').subscribe((items) => {
      this.perfiles = items.data;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
    });
  }
  editar(item, pos) {
    this.SpinnerService.show();
    this.datos_crear.id = item.id;
    this.datos_crear.titulo_ing = item.titulo_ing;
    this.datos_crear.titulo = item.titulo;
    this.datos_crear.mensaje = item.mensaje;
    this.datos_crear.mensaje_ing = item.mensaje_ing;
    this.datos_crear.posicion =pos;
    $('#nuevanotificacion').modal('show');
    this.SpinnerService.hide();
  }

  actualizar() {

    Swal.fire({
      title: 'Editar',
      text: "Esta a punto de Editar esta notifacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.SpinnerService.show();
        this.api.postdata(this.datos_crear, 'notificacion/editar/' + this.datos_crear.id).subscribe((respuesta) => {
          this.api.notificaciones('success', 'Información cargada exitosamente');
          this.data[this.datos_crear.posicion] = respuesta.data;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
            this.datos_crear = {
              id: 0,
              titulo: "",
              titulo_ing: "",
              posicion: 0,
              mensaje: '',
              mensaje_ing: ''
            };

            this.SpinnerService.hide();
            $('#nuevanotificacion').modal('hide');

          });
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

        //        Swal.fire('Exitoso!', 'Sesión cerrada.', 'success');
      }
    });
  }


}