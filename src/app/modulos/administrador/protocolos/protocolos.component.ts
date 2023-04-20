import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApirestService } from 'app/servicios/api/apirest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
declare var $: any;


@Component({
  selector: 'app-protocolos',
  templateUrl: './protocolos.component.html',
  styleUrls: ['./protocolos.component.css']
})
export class ProtocolosComponent implements OnInit {

  link = '';
  constructor(private api: ApirestService,
    private SpinnerService: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.cosultarLink();
//    this.SpinnerService.show();
//          this.SpinnerService.hide();


  }

  cosultarLink(){
    let user:any = localStorage.getItem('currentUser');
    user = JSON.parse(user);

    this.api.getdata(`mylink/${user.id}`).subscribe((data)=>{
      this.link = data.mylink
    })
  }


 save(){
  let user:any = localStorage.getItem('currentUser');
  user = JSON.parse(user);

  const formData = new FormData();

  formData.append('mylink', this.link);

  this.SpinnerService.show();

  this.api.postdata(formData, `updatemylink/${user.id}`).subscribe(() => {
    this.SpinnerService.hide();
    Swal.fire('Exitoso!', 'link actualizado.', 'success');
  });

 }
}