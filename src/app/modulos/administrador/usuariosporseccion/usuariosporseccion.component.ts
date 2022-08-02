import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { ArchivosService } from 'app/servicios/archivos.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuariosporseccion',
  templateUrl: './usuariosporseccion.component.html',
  styleUrls: ['./usuariosporseccion.component.css']
})
export class UsuariosporseccionComponent implements OnInit {
  mostrar = false;
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    []
  ];
  doughnutChartLabels2: Label[] = [];
  doughnutChartData2: MultiDataSet = [
    []
  ];


  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Colors[] = [{
    borderColor: ['white'],
    backgroundColor: [
      'rgba(129, 21, 236,0.28)',
      'rgba(233, 21, 236 ,0.28)',
      'rgba(80, 224, 13,0.28)',
      'rgba(224, 13, 13,0.28)',
      'rgba(236, 230, 21,0.28)',
      'rgba(21, 106, 236,1)',
      'rgba(164, 164, 164,0.28)'
    ]
  }];

  formularios = [];

  formularios_ = [{ id: 0, text: '' }];
  preguntas_ = [];
  formid = 0;
  options = {
    multiple: false
  };
  preg = false;
  form = false;



  constructor(
    private api: ApirestService,
    private SpinnerService: NgxSpinnerService,
    private archivo: ArchivosService

  ) { }

  ngOnInit(): void {

    this.cargardatos();
  }

  reportexperfil() {
    this.SpinnerService.show();
      this.api.getdata('usuariosxperfilexcel').subscribe((items) => {
        this.SpinnerService.hide();
        this.archivo.exportAsExcelFile(items.data, 'usuarios');
      }, err => {
        this.SpinnerService.hide();

      });

  }
  buscarmarca(idmarca) {
    if (idmarca == 1) {
      return "Pendiente";
    }
    if (idmarca == 2) {
      return "Verde";
    }
    if (idmarca == 3) {
      return "Amarillo";
    }
    if (idmarca == 3) {
      return "Rojo";
    }
  }


  cargardatos() {
    this.SpinnerService.show();
    this.api.getdata('usuariosseccionreporte').subscribe((items) => {
      this.SpinnerService.hide();
      let labesperfil=[];
      let valorperfil=[];
      items.perfiles.forEach(element => {
        labesperfil.push(element.Role+' - '+element.Cantidad);
        valorperfil.push(element.Cantidad);
      });

      this.doughnutChartLabels = labesperfil;
      this.doughnutChartData = [
        valorperfil
      ];

      let labesclasi=[];
      let valorclasi=[];
      items.clasificacion.forEach(element => {
        labesclasi.push(element.Departamento+' - '+element.Cantidad);
        valorclasi.push(element.Cantidad);
      });
      this.doughnutChartLabels2 = labesclasi;
      this.doughnutChartData2 = [
        valorclasi
      ];
/*        let ini=0;
      items.perfileslabels.forEach(element => {
        items.perfileslabels[ini] = element+' - '+items.perfilesValor[ini]
        ini=ini+1;
      });
      this.doughnutChartLabels = items.perfileslabels;
      this.doughnutChartData = [
        items.perfilesValor
      ];


      let ini2=0;
      items.clasificacionlabels.forEach(element => {
        items.clasificacionlabels[ini2] = element+' - '+items.clasificacionValor[ini2]

        ini2=ini2+1;
      }); 

      this.doughnutChartLabels2 = items.clasificacionlabels;
      this.doughnutChartData2 = [
        items.clasificacionValor
      ];

*/

    }, err => {
      this.SpinnerService.hide();
      console.log(err);

    })



  }



}
