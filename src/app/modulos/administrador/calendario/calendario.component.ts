import { Component, OnInit, ViewChild } from '@angular/core';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  
  meses = ["JAN","FEB","MAR","APR","MAY","JUN","JUL", "AUG","SEP","OCT","NOV","DEC"]
  letras = ["B", "C","D","E","F","G","H"];
  

  coloresToEnd = ['AAA','Preschool PS', 'Elementary ES', 'High School HS' , 'MACC' ,'Marymount Only' ,'All Areas', 'Free Day for Students']

  calendario=[];
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {

  }
  ngOnInit(): void {
  }

  loadFile(file) {
    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file.target.files[0]);
    fileReader.onload = (event) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array', cellStyles: true });
      const sheets = workbook.SheetNames;
      for (let indexsheet = 0; indexsheet < sheets.length; indexsheet++) {
        const sheetName = sheets[indexsheet];
        const mesName = sheetName.split(' ')[0];
        const mes = this.meses.find(item => item.indexOf(mesName) > -1 )
        if(mes){
          const anho = sheetName.split(' ')[1];
          const worksheet = workbook.Sheets[workbook.SheetNames[indexsheet]];
          let initialColum = 4;
          let diaToSave = 0;
          for (let columnIndex = 0; columnIndex < this.letras.length; columnIndex++) {
            let columnaFin=false;
            while (columnaFin ==false ) {
              const cellName = this.letras[columnIndex];//primera celda
              const cell = worksheet[cellName+ initialColum];
              if(cell?.w && cell?.w?.trim() != '' ){
                const dia = cell?.w?.trim();
                if(!isNaN(Number(dia))){
                  diaToSave = Number(dia);
                  initialColum = initialColum+1;
                }else{
                  const finalizo = this.coloresToEnd.find(item => item.indexOf(dia) > -1 )
                  if(finalizo){
                     initialColum = 4;
                     diaToSave = 0;
                     columnaFin = true;
                  }else{
                    initialColum = initialColum+1;
                    this.calendario.push({
                      evento: dia,
                      color:cell?.s?.fgColor?.rgb,
                      date:`20${anho}-${this.getmonth(mesName)}-${diaToSave< 10?('0'+diaToSave):diaToSave}`,
                      categoria:'1,2,4,5',
                      tipo:4,
                      colorHexa:cell?.s?.fgColor?.rgb? '#'+cell?.s?.fgColor?.rgb:'#FFFFF'
                    })
                  }
                }


              }else{
                initialColum = initialColum+1;
              }
            }
          }
        }
      }

    }

  }

  getmonth(month){
     const mont =  this.meses.indexOf(month) + 1;
     return mont < 10? ('0'+mont):mont; 
  }

  enviar(){
    const formData = new FormData();


    this.SpinnerService.show();
    const dataEnviar = {registros:this.calendario};

    this.api.postdata(dataEnviar, 'createevent').subscribe((respuesta) => {
      this.api.notificaciones('success', 'Información cargada exitosamente');
      this.SpinnerService.hide();
    }, err => {
      this.SpinnerService.hide();
      if (err.status == 410) {
        this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['error']['message']);
        return;
      }
      this.api.notificaciones('danger', 'Ha ocurrido un error<br>' + err['message']);
      console.log('error', err);
    });

  }



}
