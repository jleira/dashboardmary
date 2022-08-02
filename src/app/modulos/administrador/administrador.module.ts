import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { DetalleformularioComponent } from './detalleformulario/detalleformulario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ProtocolosComponent } from './protocolos/protocolos.component';
import { NgSelect2Module } from 'ng-select2';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ChartsModule } from 'ng2-charts';
import { LineatiempoComponent } from './lineatiempo/lineatiempo.component';
import { CoreporteComponent } from './coreporte/coreporte.component';
import { UsuariosporseccionComponent } from './usuariosporseccion/usuariosporseccion.component';
import { TendenciasComponent } from './tendencias/tendencias.component';
import { ReporteporusuarioComponent } from './reporteporusuario/reporteporusuario.component';
import { FrecuenciaComponent } from './frecuencia/frecuencia.component';
import { ReportedeformulariosComponent } from './reportedeformularios/reportedeformularios.component';
import { ReportesgeneralComponent } from './reportesgeneral/reportesgeneral.component';
import { ReporteponderadoComponent } from './reporteponderado/reporteponderado.component';
import { FamiliasComponent } from './familias/familias.component';
import { UsuariossupervisionComponent } from './usuariossupervision/usuariossupervision.component';


@NgModule({
  declarations: [PreguntasComponent, FormulariosComponent, DetalleformularioComponent, UsuariosComponent, 
    ProgramacionComponent, NoticiasComponent, ProtocolosComponent, NotificacionesComponent, UserdetailComponent, ReportesComponent, 
    LineatiempoComponent, CoreporteComponent, UsuariosporseccionComponent, TendenciasComponent, ReporteporusuarioComponent, FrecuenciaComponent, ReportedeformulariosComponent, ReportesgeneralComponent, ReporteponderadoComponent,FamiliasComponent, UsuariossupervisionComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
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
  ],
  providers: [  ]
})
export class AdministradorModule { }
