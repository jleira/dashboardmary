import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { ArchivosService } from 'app/servicios/archivos.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label,Colors } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reporteporusuario',
  templateUrl: './reporteporusuario.component.html',
  styleUrls: ['./reporteporusuario.component.css']
})
export class ReporteporusuarioComponent implements OnInit {


  mostrar=false;
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

  formularios=[];

  formularios_ = [];
  fechas_ = [];

  usuarios=[];

  usuarios_ = [];

  respuestas=[];

  formid=0;
  options = {
    multiple: false
  };
  fec=false;
  form=false;
  usu=false;

  usersid=0;
  
  emcabezadoid=0;  

  constructor(
    private api: ApirestService,
    private SpinnerService: NgxSpinnerService,
    private archivo: ArchivosService
    
    ) { }

  ngOnInit(): void {

    this.cargarusuarios();
  }


  reporte(tipo=null){
    this.SpinnerService.show();
    if(tipo){
      this.api.getdata('usuariosreporte?perfil='+tipo).subscribe((items) => {
        this.SpinnerService.hide();
        let datosexcel=[];
        items.users.forEach(element => {
          let user ={
            "Nombre":element.name,
            "Semaforo":element.semaforo,
            "Edad":element.edad,
            "Rol":element.perfil_u,
            "Grado":element.grado,
            "Confirmado":element.marca?'Si':'No',
            "Fecha de Confirmacion":element.fi,
            "Fecha de Recuperacion":element.ff,
            "dias":element.dfi
          };
          datosexcel.push(user);
        });
        this.archivo.exportAsExcelFile(datosexcel,'usuarios');
      },err=>{
        this.SpinnerService.hide();
  
      });
    }else{
      this.api.getdata('usuariosreporte').subscribe((items) => {
        this.SpinnerService.hide();
        let datosexcel=[];
        items.users.forEach(element => {
          let user ={
            "Nombre":element.name,
            "Semaforo":element.semaforo,
            "Edad":element.edad,
            "Rol":element.perfil_u,
            "Grado":element.grado,
            "Confirmado":element.marca?'Si':'No',
            "Fecha de Confirmacion":element.fi,
            "Fecha de Recuperacion":element.ff,
            "dias":element.dfi
          };
          datosexcel.push(user);
        });
        this.archivo.exportAsExcelFile(datosexcel,'usuarios');
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

  
  buscarformularios($event) {
    this.usersid=$event;
    this.respuestas=[];
    this.formid=0;
    this.formularios_=[];
    this.fec=false;
    this.form=false;

    this.api.getdata('emcabezadosporusuario/'+this.usersid).subscribe((items) => {
      this.formularios = items.emcabezados;
      let formul=[];
      this.formularios.forEach((ff)=>{
        if(formul.indexOf(ff.formulario_id)==-1){
            formul.push(ff.formulario_id);
            this.formularios_.push({ id: ff.formulario_id, text: ff.nombre });
          }
      })
      this.form=true;

    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });

  }

  buscarfechas($event) {
    this.fec=false;
    this.respuestas=[];
   
    this.fechas_=[];
    this.formid=$event;
    console.log(this.formid);
    let nuevosformularios=this.formularios.filter((el)=>{
      return el.formulario_id==this.formid
    });

    this.emcabezadoid=nuevosformularios[0].emcabezado_id;

    nuevosformularios.forEach((ele)=>{
        this.fechas_.push({id:ele.emcabezado_id,text:ele.created_at.substring(0,10)})      
    })
    console.log(this.fechas_);
    this.fec=true;

  }

  setearfecha(ent){
    this.emcabezadoid=ent;
    this.respuestas=[];
   
  }

  buscarrespuestas(){
    console.log("user:",this.usersid," formulariosid ",this.formid," emcabezado_id: ",this.emcabezadoid);
    this.api.getdata('respuestasencabezado/'+this.emcabezadoid).subscribe((items) => {
      this.respuestas = items.preguntas;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
      console.log('err', err);
    });
  }

  
  cargarusuarios() {
    this.api.getdata('usuarios').subscribe((items) => {
      console.log(items);
      this.usuarios = items.data;
      this.usuarios.forEach((ele) => {
        this.usuarios_.push({ id: ele.id, text: ele.name });
      });

      this.usu=true;
    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {

        });
      }
      console.log('err', err);
    });

  }


  buscarreporte($event){
    if($event){
      this.SpinnerService.show();
      this.api.getdata('resportesform/' + this.formid + '/'+$event).subscribe((items) => {
        this.SpinnerService.hide();
        console.log(items);
        let valores=[];
        let labels=[];
        let valores2=[];
        let labels2=[];
        items.data1.forEach(element => {
          valores.push(element.Cant);
          labels.push(element.Respuesta+' - ' +element.Cant);
        });
        this.doughnutChartLabels= labels;
        this.doughnutChartData = [
          valores
        ];

        items.data2.forEach(element => {
          valores2.push(element.CantPersonas);
          labels2.push(element.CantRegistros +' frecuencia - ' +element.CantPersonas);
        });
        this.doughnutChartLabels2= labels2;
        this.doughnutChartData2 = [
          valores2
        ];
      
  
        
      },err=>{
        this.SpinnerService.hide();
        console.log(err);
        
      })
  
    }

    
  }

}
 