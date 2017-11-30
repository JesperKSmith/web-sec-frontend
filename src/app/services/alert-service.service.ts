import { Injectable } from '@angular/core';
declare var swal: any;

@Injectable()
export class AlertService {

   //------------------------------------------------------------------
   success(title:string, message:string): void{
        swal(title, message, 'success');
   }
   //------------------------------------------------------------------

   error(title:string, message:string): void{
        swal(title, message, 'error');
   }
   //------------------------------------------------------------------
   info(title:string): void{
        swal(title);
   }
   //------------------------------------------------------------------

}