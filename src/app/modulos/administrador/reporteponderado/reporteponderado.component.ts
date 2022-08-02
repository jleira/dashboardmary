import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reporteponderado',
  templateUrl: './reporteponderado.component.html',
  styleUrls: ['./reporteponderado.component.css']
})
export class ReporteponderadoComponent implements OnInit {
  datos = {
    estudiantes_count: []
  };
  datosestuxsemana=[];
  total_est=0;
  total_col=0;
  total_est_semana=0;
  boolest=false;
  constructor(
    private api: ApirestService,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.cargardatos();
  }

  cargardatos() {
    this.api.getdata('reporte/global').subscribe((items) => {

     
      console.log(items.estudiantes_count);
      this.datos.estudiantes_count =items.estudiantes_count;
      this.datos.estudiantes_count.forEach((el)=>{
        console.log(el);
        this.total_est=this.total_est+el.contador;
        this.total_col=this.total_col+el.contador_noest;
        let nuevoreporte={
          rowespan:0,
          categoria:'',
          grados:[],
          gradoi:'',
          canti:'',
          total:0
        }
        nuevoreporte.categoria=el.color;
        nuevoreporte.rowespan=el.estudiantesxgrado.length;
        if(nuevoreporte.rowespan>0){
          nuevoreporte.gradoi=el.estudiantesxgrado[0]['grado'];
          nuevoreporte.canti=el.estudiantesxgrado[0]['cant_est'];
          let estudiantesxgrado =el.estudiantesxgrado;
          estudiantesxgrado.forEach(element => {
            nuevoreporte.total=nuevoreporte.total+element.cant_est;
            this.total_est_semana=this.total_est_semana+element.cant_est;
          });
          estudiantesxgrado.shift();
          nuevoreporte.grados=estudiantesxgrado;
          this.datosestuxsemana.push(nuevoreporte);            
        }

      });
      console.log(this.datosestuxsemana);






      setTimeout(() => {
        this.boolest=true;
        console.log("documentacion");
      }, 500);



    }, err => {
      if (err.status == 422) {
        err.errors.forEach(element => {
        });
      }
      console.log('err', err);
    });

  }


}
