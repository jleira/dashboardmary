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
import { AdministradorModule } from '../administrador/administrador.module';


@NgModule({
  declarations: [],
    
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
    ChartsModule,
    AdministradorModule
  ]
})
export class EnfermeriaModule { }
 

