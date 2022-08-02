import { Component, OnInit, ViewChild } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
declare var $: any;
import Swal from 'sweetalert2';


@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  public data = [];
  public formularios = [];
  public notificaciones = [];
  preg = false;
  title = 'angulardatatables';
  perfiles = [];

  roles = [];


  exampleData = [];
  options = {
    multiple: true
  }
  
  segmentos:any;
  dtOptions: DataTables.Settings = {
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  };
  dtTrigger: Subject<any> = new Subject();
  datos_crear = {
    id: 0,
    tipo: 0,
    estado: "1",
    posicion: 0
    , frecuencia: 0
    , item_id: 0
    , hora: ''
    ,segmentos:''
    ,ejecucion:''
  }
  opcion = {
    id: 0,
    opcion: '',
    opcion_ingles: '',
    preguntahija: '',
    amarillo: 0,
    rojo: 0,
    posicion: 0,
    estado: 1,
    color: 'na'
  }
  datosrut = {
    nombre: '',
    tipo: ''
  }

  tipos_pregunta = environment.tipos_pregunta;
  tipo_rutinas = [{ id: 1, nombre: 'Notificacion' }, { id: 2, nombre: 'Formulario' }];


  horarios = [
    { valor: '00:00:00', nombre: '12:00 AM' },
    { valor: '00:30:00', nombre: '12:30 AM' },
    { valor: '01:00:00', nombre: '1:00 AM' },
    { valor: '01:30:00', nombre: '1:30 AM' },
    { valor: '02:00:00', nombre: '2:00 AM' },
    { valor: '02:30:00', nombre: '2:30 AM' },
    { valor: '03:00:00', nombre: '3:00 AM' },
    { valor: '03:30:00', nombre: '3:30 AM' },
    { valor: '04:00:00', nombre: '4:00 AM' },
    { valor: '04:30:00', nombre: '4:30 AM' },
    { valor: '05:00:00', nombre: '5:00 AM' },
    { valor: '05:30:00', nombre: '5:30 AM' },
    { valor: '06:00:00', nombre: '6:00 AM' },
    { valor: '06:30:00', nombre: '6:30 AM' },
    { valor: '07:00:00', nombre: '7:00 AM' },
    { valor: '07:30:00', nombre: '7:30 AM' },
    { valor: '08:00:00', nombre: '8:00 AM' },
    { valor: '08:30:00', nombre: '8:30 AM' },
    { valor: '09:00:00', nombre: '9:00 AM' },
    { valor: '09:30:00', nombre: '9:30 AM' },
    { valor: '10:00:00', nombre: '10:00 AM' },
    { valor: '10:30:00', nombre: '10:30 AM' },
    { valor: '11:00:00', nombre: '11:00 AM' },
    { valor: '11:30:00', nombre: '11:30 AM' },

    { valor: '12:00:00', nombre: '12:00 PM' },
    { valor: '12:30:00', nombre: '12:30 PM' },
    { valor: '13:00:00', nombre: '1:00 PM' },
    { valor: '13:30:00', nombre: '1:30 PM' },
    { valor: '14:00:00', nombre: '2:00 PM' },
    { valor: '14:30:00', nombre: '2:30 PM' },
    { valor: '15:00:00', nombre: '3:00 PM' },
    { valor: '15:30:00', nombre: '3:30 PM' },
    { valor: '16:00:00', nombre: '4:00 PM' },
    { valor: '16:30:00', nombre: '4:30 PM' },
    { valor: '17:00:00', nombre: '5:00 PM' },
    { valor: '17:30:00', nombre: '5:30 PM' },
    { valor: '18:00:00', nombre: '6:00 PM' },
    { valor: '18:30:00', nombre: '6:30 PM' },
    { valor: '19:00:00', nombre: '7:00 PM' },
    { valor: '19:30:00', nombre: '7:30 PM' },
    { valor: '20:00:00', nombre: '8:00 PM' },
    { valor: '20:30:00', nombre: '8:30 PM' },
    { valor: '21:00:00', nombre: '9:00 PM' },
    { valor: '21:30:00', nombre: '9:30 PM' },
    { valor: '22:00:00', nombre: '10:00 PM' },
    { valor: '22:30:00', nombre: '10:30 PM' },
    { valor: '23:00:00', nombre: '11:00 PM' },
    { valor: '24:30:00', nombre: '11:30 PM' },


  ];


  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {
    console.log(this.tipos_pregunta);

  }

  ngOnInit(): void {
    this.cargarprutinas();
    this.cargarformularios();
    this.cargarNotificaciones();
    this.cargarperfiles();
    this.cargarperfilesperfil();
  }

  cargarprutinas() {
    this.api.getdata('rutinas').subscribe((items) => {
      console.log(items);
      this.data = items.form.concat(items.notificaciones);
      this.dtTrigger.next();
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });
  }

  cargarformularios() {
    this.api.getdata('formularios').subscribe((items) => {
      this.formularios = items.data;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });
  }

  cargarNotificaciones() {
    this.api.getdata('notificaciones').subscribe((items) => {
      this.notificaciones = items.data;
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
      posicion: 0,
      estado: "1",
      tipo: 0
      , hora: ''
      , frecuencia: 0
      , item_id: 0,
      segmentos:''
      ,ejecucion:''
    }
    this.preg=false;
    this.segmentos=[];
    this.preg=true;
    $('#exampleModal').modal('show');
  }
  crearopcion() {
    $('#opciones').modal('show');
  }

  crear() {
    let mensaje;
    if (!this.datos_crear.tipo) {
      mensaje = '<br>Debe escoger un tipo de rutina';
    }
    if (!this.datos_crear.item_id) {
      mensaje = mensaje + '<br>Debe escoger un formulario o notificación';
    }

    if (!this.datos_crear.frecuencia) {
      mensaje = mensaje + '<br>Debe escoger una frecuencia';
    }

    if (!this.datos_crear.hora) {
      mensaje = mensaje + '<br>Debe escoger una hora de ejecucion';
    }

    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();
    this.datos_crear.frecuencia = Number(this.datos_crear.frecuencia);
    this.datos_crear.segmentos =this.segmentos.toString();
    this.api.postdata(this.datos_crear, 'rutina/crear').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
      this.data.push(respuesta.data);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
      this.datos_crear = {
        posicion: 0,
        id: 0,
        estado: "1",
        tipo: 0
        , item_id: 0
        , hora: ''
        , frecuencia: 0,
        segmentos:''
        ,ejecucion:''
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

  cargarperfilesperfil() {
    this.api.getdata('tiposPorClase?clase=perfiles').subscribe((items) => {
      this.roles=items.data;
      this.roles.forEach((ele) => {
        this.exampleData.push({ id: ele.valor, text: ele.texto });
      });
      this.preg=true;

     console.log(this.preg,this.exampleData);
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
    });
  }


  editar(item, pos) {
    this.preg=false;
    this.SpinnerService.show();
    this.datos_crear.id = item.id_rutina;
    this.datos_crear.tipo = item.tipo;
    this.datos_crear.item_id = item.item_id;
    this.datos_crear.estado = item.estado;
    this.datos_crear.frecuencia = item.frecuencia;
    this.datos_crear.hora = item.hora_ejecucion;
    this.datos_crear.posicion = pos;
    this.datosrut.nombre = item.titulo;
    this.datosrut.tipo = item.tipo;


    if(item.segmentos){
      this.segmentos = item.segmentos.split(",");
      this.preg=true;
    }else{
      this.segmentos = [];
      this.preg=true;
    }

    
    $('#editarrutina').modal('show');
    this.SpinnerService.hide();
  }

  actualizar() {

    Swal.fire({
      title: 'Editar',
      text: "Esta a punto de Editar esta rutina!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.SpinnerService.show();
        this.datos_crear.segmentos =this.segmentos.toString();
        this.api.postdata(this.datos_crear, 'rutina/editar/' + this.datos_crear.id).subscribe((respuesta) => {
          this.api.notificaciones('success', 'Información cargada exitosamente');
          this.data[this.datos_crear.posicion] = respuesta.data;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
            this.datos_crear = {
              posicion: 0,
              id: 0,
              estado: "1",
              tipo: 0
              , hora: ''
              , item_id: 0
              , frecuencia: 0
              ,segmentos:''
              ,ejecucion:''
            };
            this.datosrut.nombre = '';
            this.datosrut.tipo = '';
   
            this.SpinnerService.hide();
            $('#editarrutina').modal('hide');

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

  eliminar() {
    Swal.fire({
      title: 'Eliminar rutina para notificacion',
      text: "Va a eliminar la rutina para la notificacion " + this.datosrut.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.SpinnerService.show();
        this.api.getdata('eliminarrutina/' + this.datos_crear.id).subscribe(() => {
          this.data.splice(this.datos_crear.posicion, 1);
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            this.SpinnerService.hide();
            dtInstance.destroy();
            this.dtTrigger.next();
            $('#editarrutina').modal('hide');

          });
          this.datos_crear = {
            posicion: 0,
            id: 0,
            estado: "1",
            tipo: 0
            , item_id: 0
            , hora: ''
            , frecuencia: 0
            ,segmentos:''
            ,ejecucion:''
          }
          this.datosrut.nombre = '';
          this.datosrut.tipo = '';
        });
      }
    },
      err => {
        Swal.fire({
          title: 'Ha ocurrido un error, intentelo nuevamente',
          text: "Intento nuevamente, en caso de persistir el error contacte al administrador",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      });

  }

  show(){
    console.log(this.datos_crear);
  }
}
