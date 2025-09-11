import { FormGroup } from "@angular/forms";

export class AppError{
    constructor(){};
   
    public static  handleErrorMessageFormGroup(error: any, formGroup: FormGroup) :void{
        const fieldNames: string[] = Object.keys(formGroup.controls);
        fieldNames.forEach(fieldName => {
            const messageError = error.metadata.errors[fieldName];
            if (messageError) {
                formGroup.get(fieldName)?.setErrors({ error: messageError });
            }
        });
    }
}
