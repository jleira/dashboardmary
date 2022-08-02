import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemasRoutingModule } from './sistemas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { NgSelect2Module } from 'ng-select2';
import { UsuariosComponent } from '../administrador/usuarios/usuarios.component';
import { UserdetailComponent } from '../administrador/userdetail/userdetail.component';
import { FamiliasComponent } from '../administrador/familias/familias.component';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


@NgModule({
  declarations: [UsuariosComponent,UserdetailComponent,FamiliasComponent,UsuariossupervisionComponent],
  imports: [
    CommonModule,
    SistemasRoutingModule,
    DataTablesModule,
    FormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    NgSelect2Module,
  ] 
})
export class SistemasModule { }
