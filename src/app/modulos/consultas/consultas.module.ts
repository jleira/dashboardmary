import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ReportesComponent } from '../administrador/reportes/reportes.component';
import { LineatiempoComponent } from '../administrador/lineatiempo/lineatiempo.component';
import { CoreporteComponent } from '../administrador/coreporte/coreporte.component';
import { UsuariosporseccionComponent } from '../administrador/usuariosporseccion/usuariosporseccion.component';
import { TendenciasComponent } from '../administrador/tendencias/tendencias.component';
import { ReporteporusuarioComponent } from '../administrador/reporteporusuario/reporteporusuario.component';
import { FrecuenciaComponent } from '../administrador/frecuencia/frecuencia.component';
import { ReportedeformulariosComponent } from '../administrador/reportedeformularios/reportedeformularios.component';
import { ReportesgeneralComponent } from '../administrador/reportesgeneral/reportesgeneral.component';
import { ReporteponderadoComponent } from '../administrador/reporteponderado/reporteponderado.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


@NgModule({
  declarations: [
    ReportesComponent, 
    LineatiempoComponent, 
    CoreporteComponent, 
    UsuariosporseccionComponent, 
    TendenciasComponent, 
    ReporteporusuarioComponent, 
    FrecuenciaComponent, 
    ReportedeformulariosComponent,
    , ReportesgeneralComponent, 
    ReporteponderadoComponent,
    UsuariossupervisionComponent
    ],
  imports: [
    CommonModule,
    ConsultasRoutingModule
  ]
})
export class ConsultasModule { }
 