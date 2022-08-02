import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color } from 'chartjs-plugin-datalabels/types/options';
import { MultiDataSet, Label,Colors } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lineatiempo',
  templateUrl: './lineatiempo.component.html',
  styleUrls: ['./lineatiempo.component.css']
})
export class LineatiempoComponent implements OnInit {



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
    private SpinnerService: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.cargarlineas();
  }
  cargarlineas(){
    this.SpinnerService.show();
    this.api.getdata('reporte/historico?dias='+this.dias).subscribe((items) => {
      this.SpinnerService.hide();
      this.lineChartData[0].data=items.datos;
      this.lineChartData[1].data=items.recuperados;
    
      this.lineChartLabels= items.fechas;
    
    },err=>{
      this.SpinnerService.hide();

    });
  }


}
