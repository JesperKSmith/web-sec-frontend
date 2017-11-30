import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ValidationService {


    inputHasNumber(input: FormControl) {

        let hasNumber = /\d/.test(input.value);
        return hasNumber ? null : { needsNumber: true };
    }

    //-------------------------------------------------------

    inputHasUpperCase(input: FormControl) {
        let hasUpperCase  = /[A-Z]/.test(input.value);

        return  hasUpperCase ? null : { needsUppercase: true };
    }

}