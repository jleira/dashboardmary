import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { ArchivosService } from 'app/servicios/archivos.service';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reportesgeneral',
  templateUrl: './reportesgeneral.component.html',
  styleUrls: ['./reportesgeneral.component.css']
})
export class ReportesgeneralComponent implements OnInit {
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




  reportediario(){
    if(!this.ffinal){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }

    if(!this.finicial){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }
    

    this.SpinnerService.show();
    this.api.getdata('reportesgeneralesdiario/'+this.finicial+'/'+this.ffinal).subscribe((items) => {
        this.archivo.exportAsExcelFile(items.datos,'reportediario');
        this.SpinnerService.hide();
      },err=>{
        this.SpinnerService.hide();
  
      });
  }

  reportemensual(){
    if(!this.ffinal){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }

    if(!this.finicial){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }
    

    this.SpinnerService.show();
    this.api.getdata('reportesgeneralesmensual/'+this.finicial+'/'+this.ffinal).subscribe((items) => {
        this.archivo.exportAsExcelFile(items.datos,'reportemensual');
        this.SpinnerService.hide();
      },err=>{
        this.SpinnerService.hide();
  
      });
  }
}
