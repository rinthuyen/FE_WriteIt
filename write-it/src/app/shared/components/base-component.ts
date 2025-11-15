import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FORM_GROUP } from '../../app.config';
import { AppNotify } from '../../utils/notify';

export abstract class BaseComponent {
  protected readonly _formGroupInject: BehaviorSubject<FormGroup> =
    inject(FORM_GROUP);
  protected readonly notify: AppNotify = inject(AppNotify);
  
  public sendFormGroup(fg:FormGroup): void{
    this._formGroupInject.next(fg);
  }

}
