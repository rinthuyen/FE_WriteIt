import { FormGroup } from "@angular/forms";

export class AppError{
    constructor(){};
   
    public static  handleErrorMessageFormGroup(error: any, formGroup: FormGroup | undefined) :void{
        if(!formGroup){
           return;
        }
        console.log('formGroup',formGroup);
        const fieldNames: string[] = Object.keys(formGroup.controls);
        fieldNames.forEach(fieldName => {
            const messageError = error.metadata.errors[fieldName];
            if (messageError) {
                formGroup.get(fieldName)?.setErrors({ error: messageError });
            }
        });
    }
}
