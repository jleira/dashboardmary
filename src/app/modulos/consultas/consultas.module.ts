import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { AdministradorModule } from '../administrador/administrador.module';


@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    AdministradorModule
  ]
})
export class ConsultasModule { }
 