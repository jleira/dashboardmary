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
  selector: 'app-detalleformulario',
  templateUrl: './detalleformulario.component.html',
  styleUrls: ['./detalleformulario.component.css']
})
export class DetalleformularioComponent implements OnInit {


  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  public data = [];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {
    pageLength: 5,
    order: [[2, 'desc'], [0, 'asc']],
    language: {
      url: "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  };
  dtTrigger: Subject<any> = new Subject();
  datos_crear = {
    tipo: 0
    , nombre: ''
    , nombre_ing: ''
    , preguntas: []
  }
  id;
  tipos_pregunta = environment.tipos_pregunta;
  preguntasf = [];
  preguntasids = [];
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log("formulario id", this.id);
    if (this.id) {
      this.cargardatosformulario();
    }else{
     this.cargarpreguntas(); 
    }

  }
  cargardatosformulario() {
    this.api.getdata('preguntasformularioadmin/' + this.id).subscribe((items) => {
      console.log(items);
      this.datos_crear.nombre = items.formulario[0].nombre;
      this.datos_crear.nombre_ing = items.formulario[0].nombre_ing;
      this.preguntasf = items.preguntas;
      this.preguntasf.forEach((el) => {
        this.preguntasids.push(el.id);
      })
      this.cargarpreguntas();
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
      this.data = items.data;
      this.data.forEach(element => {
        if (this.preguntasids.indexOf(element.id) > -1) {
          element.seleccionado = true;
        } else {
          element.seleccionado = false;
        }
      });
      console.log(this.data);
      this.dtTrigger.next();
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });

  }


  crear() {
    let nuevadata = this.data.filter((ele) => {
      return ele['seleccionado'] == true
    });
    let mensaje = '';
    if (!nuevadata.length) {
      mensaje = '<br>Debe seleccionar por lo menos una pregunta';
    }
    if (!this.datos_crear.nombre) {
      mensaje = mensaje + '<br>El nombre del formulario es requerido';
    }

    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.datos_crear.preguntas = nuevadata;
    console.log(this.datos_crear);
    this.SpinnerService.show();
    this.api.postdata(this.datos_crear, 'formulario/crear').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Formulario creado');
      this.datos_crear = {
        tipo: 0
        , nombre: ''
        , nombre_ing: ''
        , preguntas: []
      }
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

  editarf(){

    let mensaje = '';
    if (!this.datos_crear.nombre) {
      mensaje = mensaje + '<br>El nombre del formulario es requerido';
    }

    if (!this.datos_crear.nombre_ing) {
      mensaje = mensaje + '<br>El nombre en ingles del formulario es requerido';
    }
    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();
    this.api.postdata(this.datos_crear, 'formulario/editar/'+this.id).subscribe((respuesta) => {
      this.api.notificaciones('success', 'Formulario editardo');
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
