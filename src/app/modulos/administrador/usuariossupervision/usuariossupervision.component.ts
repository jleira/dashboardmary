import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-usuariossupervision',
  templateUrl: './usuariossupervision.component.html',
  styleUrls: ['./usuariossupervision.component.css']
})
export class UsuariossupervisionComponent implements OnInit {


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
  detalleperfil:any={};
  perfiles=[];
  tipos_pregunta = environment.tipos_pregunta;
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {
    console.log(this.tipos_pregunta);

  }
  ngOnInit(): void {
    this.cargarusuarios();
  }
 

  cargarusuarios() {
    this.api.getdata('usuarios').subscribe((items) => {
      this.data = items.data;
      this.dtTrigger.next();
    }, err => {
      if (err.status == 422) {
      }
      console.log('err', err);
    });

  }
  recargarinfo(){
    this.SpinnerService.show();
    this.api.getdata('user/detail/'+this.detalleperfil.id).subscribe((items) => {
      this.SpinnerService.hide();
      this.detalleperfil.fecha_ult_reg=items.data.fecha_ult_reg;
      this.detalleperfil.mensaje=items.data.mensaje;
      this.detalleperfil.p_semaforo=items.data.p_semaforo;
      this.detalleperfil.r_semaforo=items.data.r_semaforo;
      this.detalleperfil.semaforo=items.data.semaforo;
    }, err => {
      this.api.notificaciones('error', 'Ha ocurrido un error');
      $('#exampleModal').hide('show');

      this.SpinnerService.hide();
      if (err.status == 422) {
      }
    });
  }
  detalle(item) {
    this.SpinnerService.show();
    this.api.getdata('user/detail/'+item.id).subscribe((items) => {
      this.SpinnerService.hide();
      this.detalleperfil = items.data;
      this.detalleperfil.name=item.name;
      this.detalleperfil.marca=item.marca;
      this.detalleperfil.id=item.id;
      $('#exampleModal').modal('show');
    }, err => {
      this.api.notificaciones('error', 'Ha ocurrido un error');

      this.SpinnerService.hide();
      if (err.status == 422) {
      }
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
