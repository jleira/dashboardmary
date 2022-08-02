import { Component, OnInit, ViewChild } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

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
    tipo: 0,
    posicion: 0
    , texto: ''
    , texto_ing: ''
    , opciones: []
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
  datosalerta={
    color:'na',
    operador:'',
    valor:''
  };
  tipos_pregunta = environment.tipos_pregunta;
  exampleData = [{ id: '', text: 'No aplica' }];
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {
    console.log(this.tipos_pregunta);

  }

  perfiles = [];
  ngOnInit(): void {
    this.cargarpreguntas();
  }

  cargarpreguntas() {
    this.api.getdata('preguntas').subscribe((items) => {
      console.log(items);
      this.data = items.data;
      this.data.forEach((ele) => {
        this.exampleData.push({ id: ele.id, text: ele.texto });
      })
      this.preg = true;
      console.log(this.exampleData);
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
      posicion: 0,
      tipo: 0
      , texto: ''
      , texto_ing: ''
      , opciones: []
    }
    this.datosalerta={
      color:'na',
      operador:'',
      valor:''
    };
    $('#exampleModal').modal('show');
  }
  crearopcion() {
    this.opcion = {
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
    
    $('#opciones').modal('show');
  }
  disopciones() {
    $('#opciones').modal('hide');
    $('#exampleModal').modal('hide');
    setTimeout(() => {
      $('#exampleModal').modal('show');

    }, 500);
  }
  editaropcion(item, pos) {
    this.opcion = item;
    this.opcion.posicion = pos;
    if (!this.opcion.amarillo && !this.opcion.rojo) {
      this.opcion.color = 'na';
    }
    if (this.opcion.amarillo && !this.opcion.rojo) {
      this.opcion.color = 'a';
    }
    if (!this.opcion.amarillo && this.opcion.rojo) {
      this.opcion.color = 'r';
    }
    $('#opciones').modal('show');
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
    let datos:any;
    datos=this.datos_crear;
        if(datos.tipo<3){
          if(this.datosalerta.color!='na'){
            datos['alerta']=this.datosalerta.color;
            datos['operador']=this.datosalerta.operador;
            datos['valor']=this.datosalerta.valor;      
          }
    }

    this.api.postdata(datos, 'pregunta/crear').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
      this.data.push(respuesta.data);
      this.preg=false;
      this.exampleData.push({ id: respuesta.data.id, text: respuesta.data.texto });
      this.preg=true;
  
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
      this.datos_crear = {
        posicion: 0,
        id: 0,
        tipo: 0
        , texto: ''
        , texto_ing: ''
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
  crearo() {
    if (this.datos_crear.id) {

      Swal.fire({
        title: 'Crear nueva opcion',
        text: "Esta aputo de agregar una opcion, este cambio se replicara inmediatamente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agrear!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {

          let mensaje;
          if (!this.opcion.opcion_ingles) {
            mensaje = '<br>texto en ingles es requerido';
          }
          if (!this.opcion.opcion) {
            mensaje = '<br>texto en español es requerido';
          }

          if (mensaje) {
            this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
            return;
          }

          if (this.opcion.color == 'a') {
            this.opcion.amarillo = 1;
            this.opcion.rojo = 0;
          }
          if (this.opcion.color == 'r') {
            this.opcion.amarillo = 0;
            this.opcion.rojo = 1;
          }
          if (this.opcion.color == 'na') {
            this.opcion.amarillo = 0;
            this.opcion.rojo = 0;
          }


          this.SpinnerService.show();
          this.api.postdata(this.opcion, 'preguntaporid/editaropcion/' + this.datos_crear.id).subscribe((respuesta) => {
            this.api.notificaciones('success', 'Información cargada exitosamente');
            this.datos_crear.opciones.push(this.opcion);
            this.opcion = {
              id: 0,
              opcion: '',
              opcion_ingles: '',
              preguntahija: '',
              amarillo: 0,
              rojo: 0,
              estado: 1,
              posicion: 0,
              color: 'na'
            }
            this.disopciones();

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

    } else {
      this.datos_crear.opciones.push(this.opcion);
      this.opcion = {
        id: 0,
        opcion: '',
        estado: 1,
        opcion_ingles: '',
        preguntahija: '',
        amarillo: 0,
        rojo: 0,
        posicion: 0,
        color: 'na'

      }

    }
    console.log(this.datos_crear);
    $('#opciones').modal('hide');
  }


  cargarperfiles() {
    this.api.getdata('tiposPorClase?clase=tipo_pregunta').subscribe((items) => {
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
    this.datos_crear.texto_ing = item.texto_ing;
    this.datos_crear.texto = item.texto;
    this.datos_crear.tipo = item.tipo;
    this.datos_crear.posicion = pos;

    this.datosalerta.color = item.alerta;
    this.datosalerta.operador = item.operador;
    this.datosalerta.valor = item.valor;



    if (this.datos_crear.tipo > 2) {
      this.api.getdata('respuestaspregunta/' + item.id).subscribe((items) => {
        this.datos_crear.opciones = items.data;
        $('#exampleModal').modal('show');
        this.SpinnerService.hide();
      }, err => {
        this.SpinnerService.hide();
      });


    } else {
      $('#exampleModal').modal('show');
      this.SpinnerService.hide();

    }
  }

  editarpreguntatext() {
    Swal.fire({
      title: 'Cambiar pregunta',
      text: "Esta a punto de cambiar el texto y tipo de pregunta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        let mensaje;
        if (!this.datos_crear.texto) {
          mensaje = '<br>texto en ingles es requerido';
        }
        if (!this.datos_crear.texto_ing) {
          mensaje = '<br>texto en español es requerido';
        }
        if (!this.datos_crear.tipo) {
          mensaje = mensaje + '<br>Tipo de respuesta es requerido';
        }
        if (mensaje) {
          this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
          return;
        }
        this.SpinnerService.show();
        let datos:any;
        datos=this.datos_crear;
            if(datos.tipo<3){
              if(this.datosalerta.color!='na'){
                datos['alerta']=this.datosalerta.color;
                datos['operador']=this.datosalerta.operador;
                datos['valor']=this.datosalerta.valor;      
              }
        }
    
    
        this.api.postdata(datos, 'pregunta/editartexto/' + this.datos_crear.id).subscribe((respuesta) => {
          this.api.notificaciones('success', 'Información cargada exitosamente');
          this.data[this.datos_crear.posicion] = respuesta.data;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
            this.datos_crear = {
              posicion: 0,
              id: 0,
              tipo: 0
              , texto: ''
              , texto_ing: ''
              , opciones: []
            }
            this.SpinnerService.hide();
            $('#exampleModal').modal('hide');

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

  editaropc() {
    Swal.fire({
      title: 'Cambiar opcion',
      text: "Esta a punto de cambiarla información de la opción seleccionada, este cambio se replicará inmediatamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        let mensaje;
        if (!this.opcion.opcion_ingles) {
          mensaje = '<br>texto en ingles es requerido';
        }
        if (!this.opcion.opcion) {
          mensaje = '<br>texto en español es requerido';
        }

        if (mensaje) {
          this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
          return;
        }

        if (this.opcion.color == 'a') {
          this.opcion.amarillo = 1;
          this.opcion.rojo = 0;
        }
        if (this.opcion.color == 'r') {
          this.opcion.amarillo = 0;
          this.opcion.rojo = 1;
        }
        if (this.opcion.color == 'na') {
          this.opcion.amarillo = 0;
          this.opcion.rojo = 0;
        }


        this.SpinnerService.show();
        this.api.postdata(this.opcion, 'pregunta/editaropcion/' + this.opcion.id).subscribe((respuesta) => {
          this.api.notificaciones('success', 'Información cargada exitosamente');
          console.log(this.opcion);
          this.opcion.estado=Number(this.opcion.estado);
          this.datos_crear.opciones[this.opcion.posicion] = this.opcion;
          this.opcion = {
            id: 0,
            opcion: '',
            opcion_ingles: '',
            preguntahija: '',
            amarillo: 0,
            rojo: 0,
            posicion: 0,
            color: 'na',
            estado:1,

          }
          this.disopciones();

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
}
