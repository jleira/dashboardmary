import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArchivosService } from 'app/servicios/archivos.service';
declare var $: any;

@Component({
  selector: 'app-reportedeformularios',
  templateUrl: './reportedeformularios.component.html',
  styleUrls: ['./reportedeformularios.component.css']
})
export class ReportedeformulariosComponent implements OnInit {

 
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

  ffinal='';
  finicial=''
  tipos_pregunta = environment.tipos_pregunta;
  constructor(private api: ApirestService,
    private archivo: ArchivosService,
    private SpinnerService: NgxSpinnerService) {
    console.log(this.tipos_pregunta);

  }
  ngOnInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  cargarformularios() {
    
    if(!this.ffinal){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }

    if(!this.finicial){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }
    
    this.SpinnerService.show();
    
    this.api.getdata('reportesgeneralesdeformularios/'+this.finicial+'/'+this.ffinal).subscribe((items) => {
      this.data = items.datos;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      
        this.SpinnerService.hide();

      });

    }, err => {
      this.SpinnerService.hide();
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });

  }


  reporte(){
    if(!this.ffinal){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }

    if(!this.finicial){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }
    

    this.SpinnerService.show();
    this.api.getdata('reportesgeneralesdeformularios/'+this.finicial+'/'+this.ffinal).subscribe((items) => {
        this.archivo.exportAsExcelFile(items.datos,'usuarios');
        this.SpinnerService.hide();
      },err=>{
        this.SpinnerService.hide();
  
      });
  }

}
