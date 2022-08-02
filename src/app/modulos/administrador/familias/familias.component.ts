
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
declare var $: any;


@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.css']
})
export class FamiliasComponent implements OnInit {

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
  };
  datos_editar={
    name:'',
    id:0
  }
  perfiles = [];
  usuarios = [];
  tipos_pregunta = environment.tipos_pregunta;
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {
    console.log(this.tipos_pregunta);

  }
  ngOnInit(): void {
    this.cargarfamilias();
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
  cargarfamilias() {
    this.api.getdata('familias').subscribe((items) => {
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

  editarusuario(fmla){
    this.datos_editar.id=fmla.id;
    this.datos_editar.name=fmla.nombre;
    this.usuarios=[];
    this.SpinnerService.show();
    this.api.getdata('usuariosporfamilia/'+fmla.id).subscribe((items) => {
      this.usuarios=items.data
      this.SpinnerService.hide();
      $('#usuariosModal').modal('show');
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
    });


  }
  

  crear() {
    let mensaje;
    if (!this.datos_crear.name) {
      mensaje = '<br>Nombre es requerido';
    }

    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();
    this.api.postdata(this.datos_crear, 'crearfamilia').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
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

  buscar(color) {
    if (color == 1) {
      return "Gris";
    }
    if (color == 2) {
      return "Verde";
    }
    if (color == 3) {
      return "Amarillo";
    }
    if (color == 4) {
      return "Rojo";
    }
  }
  modificarfamilia(){
    let mensaje;
    if (!this.datos_editar.name) {
      mensaje = '<br>Nombre es requerido';
    }

    if (mensaje) {
      this.api.notificaciones('warning', "Campos incompletos<br>" + mensaje);
      return;
    }
    this.SpinnerService.show();
    this.api.postdata(this.datos_editar, 'editarfamilia').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
      this.datos_editar= {
        id:0, name: ''
      }
      this.SpinnerService.hide();

      this.data=respuesta.data;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
      
      $('#usuariosModal').modal('hide');
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

}
