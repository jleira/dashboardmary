import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermeriaRoutingModule } from './enfermeria-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { NgSelect2Module } from 'ng-select2';
import { ChartsModule } from 'ng2-charts';
import { PreguntasComponent } from '../administrador/preguntas/preguntas.component';
import { ReportedeformulariosComponent } from '../administrador/reportedeformularios/reportedeformularios.component';
import { FrecuenciaComponent } from '../administrador/frecuencia/frecuencia.component';
import { ReporteporusuarioComponent } from '../administrador/reporteporusuario/reporteporusuario.component';
import { TendenciasComponent } from '../administrador/tendencias/tendencias.component';
import { UsuariosporseccionComponent } from '../administrador/usuariosporseccion/usuariosporseccion.component';
import { CoreporteComponent } from '../administrador/coreporte/coreporte.component';
import { LineatiempoComponent } from '../administrador/lineatiempo/lineatiempo.component';
import { ReportesComponent } from '../administrador/reportes/reportes.component';
import { NotificacionesComponent } from '../administrador/notificaciones/notificaciones.component';
import { ProgramacionComponent } from '../administrador/programacion/programacion.component';
import { DetalleformularioComponent } from '../administrador/detalleformulario/detalleformulario.component';
import { FormulariosComponent } from '../administrador/formularios/formularios.component';
import { UserdetailComponent } from '../administrador/userdetail/userdetail.component';
import { UsuariosComponent } from '../administrador/usuarios/usuarios.component';
import { ReportesgeneralComponent } from '../administrador/reportesgeneral/reportesgeneral.component';
import { ReporteponderadoComponent } from '../administrador/reporteponderado/reporteponderado.component';
import { FamiliasComponent } from '../administrador/familias/familias.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


@NgModule({
  declarations: [PreguntasComponent, 
     
    FormulariosComponent, 
    DetalleformularioComponent, 
    ProgramacionComponent, 
    NotificacionesComponent, 
    ReportesComponent, 
    LineatiempoComponent, 
    CoreporteComponent, 
    UsuariosporseccionComponent, 
    TendenciasComponent, 
    ReporteporusuarioComponent, 
    FrecuenciaComponent, 
    ReportedeformulariosComponent,
  UserdetailComponent,
UsuariosComponent
, ReportesgeneralComponent, 
ReporteponderadoComponent,
FamiliasComponent,
UsuariossupervisionComponent
],
    
  imports: [
    CommonModule,
    EnfermeriaRoutingModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    NgSelect2Module,
    ChartsModule
  ]
})
export class EnfermeriaModule { }
 

