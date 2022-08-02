import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorentradaRoutingModule } from './supervisorentrada-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { NgSelect2Module } from 'ng-select2';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


@NgModule({
  declarations: [UsuariossupervisionComponent],
  imports: [
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
    SupervisorentradaRoutingModule    
  ]
})
export class SupervisorentradaModule { }
