import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FORM_GROUP } from '../../app.config';
import { AppNotify } from '../../utils/notify';

export abstract class BaseComponent {
  protected readonly _formGroupInject: BehaviorSubject<FormGroup> =
    inject(FORM_GROUP);
  protected readonly notify: AppNotify = inject(AppNotify);
  protected fg: FormGroup = new FormGroup({});

  public sendFormGroup(fg: FormGroup) {
    this._formGroupInject.next(fg);
  }

  private sendSubcribeFormGroup(): void {
    this._formGroupInject.next(this.fg);
  }

  protected setUpCallService(): void {}

  protected readonly submit = () => {
    this.setUpCallService();
    this.sendSubcribeFormGroup();
  };
}

export interface BaseService{
   setUpCallService(): void;
}