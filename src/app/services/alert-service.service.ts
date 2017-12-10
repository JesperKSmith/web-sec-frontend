import { Injectable } from '@angular/core';
declare var swal: any;

@Injectable()
export class AlertService {

    //------------------------------------------------------------------
    success(title: string, message: string): void {
        swal(title, message, 'success');
    }
    //------------------------------------------------------------------

    error(title: string, message: string): void {
        swal(title, message, 'error');
    }
    //------------------------------------------------------------------
    info(title: string): void {
        swal(title);
    }
    //------------------------------------------------------------------
    alertWithImage(title: string, message: string, image: string): void {
        swal({
            title: 'Sweet Success!',
            text: 'Wow your avatar looks great! \nThe Picture is successfully saved!',
            imageUrl: image,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Your new amazing Profile Picture',
            animation: false
        })
    }

}