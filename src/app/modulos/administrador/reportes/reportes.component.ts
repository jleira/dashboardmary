import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { ArchivosService } from 'app/servicios/archivos.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label,Colors } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
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

  mostrar=false;
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    [1, 1, 1, 1]
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: ['rgba(164, 164, 164,0.28)','rgba(80, 224, 13,0.28)','rgba(224, 13, 13,0.28)','rgba(236, 230, 21,0.28)']
  }];


  doughnutChartLabelshs: Label[] = [];
  doughnutChartDatahs: MultiDataSet = [
    [1, 1, 1, 1]
  ];
  doughnutChartColorshs: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: ['rgba(164, 164, 164,0.28)','rgba(80, 224, 13,0.28)','rgba(224, 13, 13,0.28)','rgba(236, 230, 21,0.28)']
  }];


  doughnutChartLabelsEL: Label[] = [];
  doughnutChartDataEL: MultiDataSet = [
    [1, 1, 1, 1]
  ];
  doughnutChartColorsEL: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: ['rgba(164, 164, 164,0.28)','rgba(80, 224, 13,0.28)','rgba(224, 13, 13,0.28)','rgba(236, 230, 21,0.28)']
  }];

  doughnutChartLabelsPS: Label[] = [];
  doughnutChartDataPS: MultiDataSet = [
    [1, 1, 1, 1]
  ];
  doughnutChartColorsPS: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: ['rgba(164, 164, 164, 0.28)','rgba(80, 224, 13, 0.28)','rgba(224, 13, 13, 0.28)','rgba(236, 230, 21, 0.28)']
  }];

  doughnutChartLabelsAD: Label[] = [];
  doughnutChartDataAD: MultiDataSet = [
    [1, 1, 1, 1]
  ];
  doughnutChartColorsAD: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: ['rgba(164, 164, 164,0.28)','rgba(80, 224, 13,0.28)','rgba(224, 13, 13,0.28)','rgba(236, 230, 21,0.28)']
  }];

  
  

  constructor(
    private api: ApirestService,
    private SpinnerService: NgxSpinnerService,
    private archivo: ArchivosService
    
    ) { }

  ngOnInit(): void {

    this.cargardatos();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }


  cargardatos(){
    this.api.getdata('reporte/semaforo').subscribe((items) => {
      this.doughnutChartLabels= ['Pendientes  '+items.gris, 'Verde '+items.verde, 'Rojo '+items.rojo, 'Amarillo '+items.amarillo];
      this.doughnutChartData = [
        [items.gris, items.verde, items.rojo, items.amarillo]
      ];


      this.doughnutChartLabelshs= ['Pendientes  '+items.data.HS.gris, 'Verde '+items.data.HS.verde, 'Rojo '+items.data.HS.rojo, 'Amarillo '+items.data.HS.amarillo];
      this.doughnutChartDatahs = [
        [items.data.HS.gris, items.data.HS.verde, items.data.HS.rojo, items.data.HS.amarillo]
      ];
      

      this.doughnutChartLabelsEL= ['Pendientes  '+items.data.EL.gris, 'Verde '+items.data.EL.verde, 'Rojo '+items.data.EL.rojo, 'Amarillo '+items.data.EL.amarillo];
      this.doughnutChartDataEL = [
        [items.data.EL.gris, items.data.EL.verde, items.data.EL.rojo, items.data.EL.amarillo]
      ];


      this.doughnutChartLabelsPS= ['Pendientes  '+items.data.PS.gris, 'Verde '+items.data.PS.verde, 'Rojo '+items.data.PS.rojo, 'Amarillo '+items.data.PS.amarillo];
      this.doughnutChartDataPS = [
        [items.data.PS.gris, items.data.PS.verde, items.data.PS.rojo, items.data.PS.amarillo]
      ];


      
      this.doughnutChartLabelsAD= ['Pendientes  '+items.data.AD.gris, 'Verde '+items.data.AD.verde, 'Rojo '+items.data.AD.rojo, 'Amarillo '+items.data.AD.amarillo];
      this.doughnutChartDataAD = [
        [items.data.AD.gris, items.data.AD.verde, items.data.AD.rojo, items.data.AD.amarillo]
      ];


      this.mostrar=true;

    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
      console.log('err', err);
    });

  }
  reporte(tipo=null){
    console.log("aqui");
    this.SpinnerService.show();
    if(tipo){
      this.api.getdata('usuariosreporte?perfil='+tipo).subscribe((items) => {
        this.SpinnerService.hide();
        this.archivo.exportAsExcelFile(items.users,'usuarios');
      },err=>{
        this.SpinnerService.hide();
  
      });
    }else{
      this.api.getdata('usuariosreporte').subscribe((items) => {
        this.SpinnerService.hide();
        this.archivo.exportAsExcelFile(items.users,'usuarios');
      },err=>{
        this.SpinnerService.hide();
  
      });
    }

  }

  reportemodal(tipo=null){
    console.log("entro a este reporte");
    this.SpinnerService.show();
    if(tipo){
      this.api.getdata('usuariosreporte?perfil='+tipo).subscribe((items) => {
        this.data = items.users;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          $('#nuevanotificacion').modal('show');

          this.SpinnerService.hide();
  
        });
  

      },err=>{
        this.SpinnerService.hide();
  
      });
    }else{
      this.api.getdata('usuariosreporte').subscribe((items) => {
        this.data = items.users;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          $('#nuevanotificacion').modal('show');

          this.SpinnerService.hide();
  
        });
      },err=>{
        this.SpinnerService.hide();
  
      });
    }

  }
  buscarmarca(idmarca){
    if(idmarca==1){
      return "Pendiente";
    }
    if(idmarca==2){
      return "Verde";
    }
    if(idmarca==3){
      return "Amarillo";
    }
    if(idmarca==3){
      return "Rojo";
    }
  }
}
