import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {



  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  public data = [];
  title = 'angulardatatables';
  pass="";
  dtOptions: DataTables.Settings = {
    pageLength: 5,
    order: [[2, 'desc'], [0, 'asc']],
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  };
  dtTrigger: Subject<any> = new Subject();
  id;
  miperfil: any = {

  };
  tipos_pregunta = environment.tipos_pregunta;
  perfiles = [];
  perfilesapp = [];
  semaforos = [];
  marca = '';
  mensaje = '';
  fecha_cierre = '';
  familias=[];


  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('userid');
  }

  ngOnInit(): void {
    console.log("formulario id", this.id);
    this.cargarperfiles();
    this.cargarperfilesapp();
    this.cargarsemaforos();
    this.cargarfamilias();
    if (this.id) {
      this.cargardatosformulario();
    }

  }
  cargarfamilias() {
    this.api.getdata('familias').subscribe((items) => {
      this.familias = items.data;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });
  }
  cargardatosformulario() {
    this.api.getdata('admin/user/info/' + this.id).subscribe((items) => {
      console.log(items);
      this.miperfil = items.data[0];
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });
  }

  agregaritem(items, posicion) {
    Swal.fire({
      title: 'Agregar pregunta',
      text: "Esta a punto de agregar una pregunta nueva, esta seguro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, agregar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {


        this.SpinnerService.show();
        this.api.postdata(items, 'formulario/agregarpregunta/' + this.id).subscribe((respuesta) => {
          this.api.notificaciones('success', 'Información cargada exitosamente');
          this.data[posicion].seleccionado = true;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
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

        //        Swal.fire('Exitoso!', 'Sesión cerrada.', 'success');
      }
    });
  }


  eliminaritem(items, posicion) {
    Swal.fire({
      title: 'Eliminar pregunta',
      text: "Esta a punto de eliminar una pregunta, esta seguro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {


        this.SpinnerService.show();
        this.api.postdata(items, 'formulario/eliminarpregunta/' + this.id).subscribe((respuesta) => {
          this.api.notificaciones('success', 'Información cargada exitosamente');

          this.data[posicion].seleccionado = false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
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

        //        Swal.fire('Exitoso!', 'Sesión cerrada.', 'success');
      }
    });
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
  cargarperfilesapp() {
    this.api.getdata('tiposPorClase?clase=perfiles_app').subscribe((items) => {
      this.perfilesapp = items.data;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
    });
  }
  cambiarpassmodal(){
    this.pass = "";
    $('#cambiarpass').modal('show');
  }

  verCarnet(){
    $('#carnet').modal('show');
  }

  cargarsemaforos() {
    this.api.getdata('tiposPorClase?clase=semaforo').subscribe((items) => {
      this.semaforos = items.data;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
    });
  }
  cambiar(){


    if (!this.pass) {

      this.api.notificaciones('warning', "La contraseña no puede estar vacia<br>");
      return;
     }

 
    let data = {
      password: this.pass
    };
    this.SpinnerService.show();
    this.api.postdata(data, 'usuario/actualizarpass/' + this.id).subscribe((respuesta) => {
      this.api.notificaciones('success', 'contraseña creada');
      $('#cambiarpass').modal('hide');
      this.SpinnerService.hide();
      this.pass="";
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
  buscarsemaforo(sem) {
    if (sem) {
      if (sem == 1) {
        return "Gris";
      }
      if (sem == 2) {
        return "Verde";
      }
      if (sem == 3) {
        return "Amarillo";
      }
      if (sem == 4) {
        return "Rojo";
      }

    }
  }
  modalmarca() {
    this.marca = this.miperfil['marca'];
    this.mensaje = this.miperfil['mensaje'];
    this.fecha_cierre = this.miperfil['fecha_marca'];

    $('#marcapersonalizada').modal('show');
  }

  actualizarmarca() {

    let mensajes = '';
    if (!this.marca) {
      mensajes = mensajes + '<br>Debe seleccionar una marca';
    }

    if (!this.mensaje) {
      mensajes = mensajes + '<br>debe indicar un mensaje para este estudiante';
    }
    if (!this.fecha_cierre) {
      mensajes = mensajes + '<br>debe seleccionar la fecha en la que quiere que se quite la marca';
    }
    
    if (mensajes) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensajes);
      return;
    }
 

    let data = {
      marca: this.marca,
      mensaje: this.mensaje,
      fecha: this.fecha_cierre
    };
    this.SpinnerService.show();
    this.api.postdata(data, 'usuario/crearmarca/' + this.id).subscribe((respuesta) => {
      this.api.notificaciones('success', 'Actualización realizada');
      $('#marcapersonalizada').modal('hide');
      this.SpinnerService.hide();
      this.cargardatosformulario();
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

  eliminarmarca() {


    let data = {
      marca: '',
      mensaje: '',
      fecha: ''
    };
    this.SpinnerService.show();
    this.api.postdata(data, 'usuario/crearmarca/' + this.id).subscribe((respuesta) => {
      this.api.notificaciones('success', 'Actualización exitosamente');
      $('#marcapersonalizada').modal('hide');
      this.SpinnerService.hide();
      this.cargardatosformulario();
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
  editarperfil() {
    Swal.fire({
      title: 'Editar datos del usuario',
      text: "Esta a punto de editar información personal del usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

/*
      cat: "Administrativo"
clasificacion: 4
color: "#E6E6E6"
correo1: null
correo2: null
correo3: null
edad: 22
email: "practicante.desarrollo@marymountbq.edu.co"
familiaid: 0
fecha_nacimiento: null
grado: "NA"
id: 1246
identificacion: "1043130339"
marca: null
mensaje: "Remember to fill out the report."
name: "Sebastian David  Cerpa  Ruiz"
p_semaforo: ""
perfil: 1
photo_url: null
primer_apellido: "Cerpa "
primer_nombre: "Sebastian David"
r_semaforo: ""
segundo_apellido: "Ruiz"
segundo_nombre: ""
semaforo: 1
uid: null
user_id: 1260



*/

let valoresnovalidos=['cat','color','fecha_nacimiento','correo1','correo2','correo3','clasificacion','edad','familiaid','grado','marca','p_semaforo','photo_url','r_semaforo','semaforo','uid','segundo_nombre','segundo_apellido','perfil_aplicacion','status','fecha_ult_reg','carnet','fecha_marca','mensaje','carnet_posterior'];

      if (result.value) {

        let mensajes = '';
        $.each(this.miperfil, function (i, val) {
          console.log("este es el id" + i + "este es el valor" + val);
          if (valoresnovalidos.indexOf(i)==-1) {
            if (!val) {
              mensajes = mensajes + '<br>El campo ' + i + ' No puede estar vacio';
            }

          }

        });
        if (mensajes) {
          this.api.notificaciones('warning', "Campos incompletos<br>" + mensajes);
          return;
        }

        this.SpinnerService.show();
        this.api.postdata(this.miperfil, 'usuario/modificar/' + this.id).subscribe((respuesta) => {
          this.api.notificaciones('success', 'usuario editado exitosamente');
          this.SpinnerService.hide();
          this.cargardatosformulario();
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
    });

  }
}
