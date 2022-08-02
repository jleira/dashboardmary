import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { ArchivosService } from 'app/servicios/archivos.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-frecuencia',
  templateUrl: './frecuencia.component.html',
  styleUrls: ['./frecuencia.component.css']
})
export class FrecuenciaComponent implements OnInit {


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
  preguntas_ = [{id:0,text:''}];
  formid = 0;
  options = {
    multiple: false
  };
  preg = false;
  form = false;
  pregid=0;
  
  finicial='';
  ffinal='';

  constructor(
    private api: ApirestService,
    private SpinnerService: NgxSpinnerService,
    private archivo: ArchivosService

  ) { }

  ngOnInit(): void {

    this.cargarformularios();
  }



  reporte(){
    this.SpinnerService.show();
    this.api.getdata('resportesfrecexcel/' + this.formid+ '/'+this.pregid + '/'+this.finicial+ '/'+this.ffinal).subscribe((items) => {
      this.SpinnerService.hide();
        this.archivo.exportAsExcelFile(items.datos,'usuarios');
      },err=>{
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

  cargarformularios() {
    this.api.getdata('formulariosfecuencia').subscribe((items) => {
      console.log(items);
      this.formularios = items.data;
      this.formularios.forEach((ele) => {
        this.formularios_.push({ id: ele.id, text: ele.nombre });
      });

      this.form = true;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });

  }
  buscarpreguntas($event) {
    this.formid = $event;
    this.cargardatosformulario();
    console.log("hola", $event);
  }
  cargardatosformulario() {
    this.SpinnerService.show();
    this.api.getdata('preguntasformularioadmin/' + this.formid).subscribe((items) => {
      this.SpinnerService.hide();
      this.preg = false;
      this.preguntas_ = [{id:0,text:''}];
      let preg=items.preguntas.filter((pr)=>{
        return pr.rep_frecuencia=="S"
      });

      preg.forEach((el) => {
        this.preguntas_.push({ id: el.id, text: el.texto });
      });

      this.preg = true;
    }, err => {
      this.SpinnerService.hide();
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });
  }

  buscarreporte($event){
    if($event){
      this.pregid=$event;
      this.preg
    }
  }
  graficar() {
    console.log("helo",this.ffinal,this.finicial);

    if(!this.ffinal){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }

    if(!this.finicial){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar un rango de fecha" );
      return;

    }
    if(!this.pregid){
      this.api.notificaciones('warning', "Campos incompletos<br> Debe seleccionar una pregunta" );
      return;

    }
    console.log("helo",this.ffinal);
    this.SpinnerService.show();
    this.api.getdata('resportesform/' + this.formid+ '/'+this.pregid + '/'+this.finicial+ '/'+this.ffinal).subscribe((items) => {
        this.SpinnerService.hide();
        console.log(items);
        let valores = [];
        let labels = [];
        let valores2 = [];
        let labels2 = [];
        items.data1.forEach(element => {
          valores.push(element.Cant);
          labels.push(element.Respuesta + ' - ' + element.Cant);
        });
        this.doughnutChartLabels = labels;
        this.doughnutChartData = [
          valores
        ];

        items.data2.forEach(element => {
          valores2.push(element.CantPersonas);
          labels2.push('Personas con '+ element.CantRegistros + ' comorbilidad (' + element.CantPersonas+')');
        });
        this.doughnutChartLabels2 = labels2;
        this.doughnutChartData2 = [
          valores2
        ];



      }, err => {
        this.SpinnerService.hide();
        console.log(err);

      })



  }





}
