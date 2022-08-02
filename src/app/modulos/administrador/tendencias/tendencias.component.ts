import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { ArchivosService } from 'app/servicios/archivos.service';
import { ChartDataSets } from 'chart.js';
import { MultiDataSet, Label,Colors } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tendencias',
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent implements OnInit {


  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Historial de casos confirmados covid' },
    { data: [], label: 'Historial de casos recuperados covid' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Colors[  ] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(236, 44, 21,0.28)',
    },
    {
      borderColor: 'green',
      backgroundColor: 'rgba(80, 236, 21,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  
  mostrar=false;
  dias=7;

  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService,
    private archivo: ArchivosService
    ) { }

  ngOnInit(): void {
    this.cargarlineas();
  }
  cargarlineas(){
    this.SpinnerService.show();
    this.api.getdata('tendenciacontagio').subscribe((items) => {
      this.SpinnerService.hide();
      let infectados=[];
      let recuperados=[];
      let labels = [];
      let enfermos=0;
      let recuperado=0;
      items.datos.forEach(element => {
        enfermos = enfermos + Number(element.Enfermos);
        recuperado = recuperado + Number(element.Recuperados);

        console.log(enfermos);
        console.log(recuperado);
        
        infectados.push(enfermos);
        recuperados.push(recuperado);
        labels.push(element.Fecha);
      });
      this.lineChartLabels= labels;
      this.lineChartData[0].data=infectados;
      this.lineChartData[1].data=recuperados;

    
    },err=>{
      this.SpinnerService.hide();

    });
  }
  reporte(){
    this.SpinnerService.show();
      this.api.getdata('tendenciaexcelcontagio').subscribe((items) => {
        this.SpinnerService.hide();
        this.archivo.exportAsExcelFile(items.datos, 'usuarios');
      },err=>{
        this.SpinnerService.hide();
  
      });
    

  }
}
