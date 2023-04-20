import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { ArchivosService } from 'app/servicios/archivos.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label,Colors } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
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
    },
    retrieve: true
  };
  dtTrigger: Subject<any> = new Subject();

  mostrar=false;
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    [1, 1]
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: ['#273a7d','#EA5F55']
  }];
  tipo=1;

  doughnutChartLabelshs: Label[] = [];
  doughnutChartDatahs: MultiDataSet = [
    [1, 1]
  ];
  doughnutChartColorshs: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: ['#273a7d','#EA5F55']
  }];


  doughnutChartLabelsEL: Label[] = [];
  doughnutChartDataEL: MultiDataSet = [
    [1, 1]
  ];
  doughnutChartColorsEL: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: ['#273a7d','#EA5F55']
  }];

  finicial:any;
  ffinal:any;
  
  

  constructor(
    private api: ApirestService,
    private SpinnerService: NgxSpinnerService,
    private archivo: ArchivosService
    
    ) { }

    cargarformularios(){
      this.data.length
      this.cargardatos();
    }
    
  ngOnInit(): void {

  }


  cargardatos(){
    
    if(!this.finicial || !this.ffinal || typeof(this.finicial) =='undefined' || typeof(this.ffinal) =='undefined'){

      Swal.fire('Debe seleccionar una fecha inicio y una fecha fin valida!', 'OK.', 'error');
      return false;
    }
    const formData = new FormData();
    
    this.doughnutChartLabels= ['Leidos: ','No leidos'];
    this.doughnutChartData = [
      [1, 1]
    ];


    this.doughnutChartLabelshs=['Leidos: ','No leidos'];
    this.doughnutChartDatahs = [
      [1, 1]
    ];
    

    this.doughnutChartLabelsEL= ['Leidos: ','No leidos'];
    this.doughnutChartDataEL = [
      [1,1]
    ];



    formData.append('finicial', this.finicial);
    formData.append('ffinal', this.ffinal);
    formData.append('tipo', this.tipo.toString());

    this.api.postdata(formData,'reporte/semaforo').subscribe((items) => {


      const padres = items.padres[0].Cantidad

      this.doughnutChartLabels= [items.padres[0].estatus +': '+items.padres[0].Cantidad, items.padres[1].estatus +': '+items.padres[1].Cantidad];
      this.doughnutChartData = [
        [items.padres[0].Cantidad, items.padres[1].Cantidad]
      ];


      this.doughnutChartLabelshs=[items.staff[0].estatus +': '+items.staff[0].Cantidad, items.staff[1].estatus +': '+items.staff[1].Cantidad];
      this.doughnutChartDatahs = [
        [items.staff[0].Cantidad, items.staff[1].Cantidad]
      ];
      

      this.doughnutChartLabelsEL= [items.estudiantes[0].estatus +': '+items.estudiantes[0].Cantidad, items.estudiantes[1].estatus +': '+items.estudiantes[1].Cantidad];
      this.doughnutChartDataEL = [
        [items.estudiantes[0].Cantidad, items.estudiantes[1].Cantidad]
      ];

      this.data = [];
      this.data = items.tabla;
      
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);

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
    this.SpinnerService.show();
    this.archivo.exportAsExcelFile(this.data,'usuarios');

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 1000);
 /*    if(tipo){
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
    } */

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
