import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunicacionesRoutingModule } from './comunicaciones-routing.module';
import { NoticiasComponent } from '../administrador/noticias/noticias.component';
import { ProtocolosComponent } from '../administrador/protocolos/protocolos.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { UsuariossupervisionComponent } from '../administrador/usuariossupervision/usuariossupervision.component';


@NgModule({
  declarations: [NoticiasComponent,ProtocolosComponent,UsuariossupervisionComponent],
  imports: [
    CommonModule,
    ComunicacionesRoutingModule,
    DataTablesModule,
    FormsModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
  ]
})
export class ComunicacionesModule { }
  