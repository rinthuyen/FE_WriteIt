import { Component, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { InputTextModule } from 'primeng/inputtext';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgModel,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MessageModule } from 'primeng/message';

export const WRITEIT_INPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WriteItInputComponent),
  multi: true,
};

export const WRITEIT_INPUT_VALUE_VALIDATORS: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => WriteItInputComponent),
  multi: true,
};

@Component({
  selector: 'write-it-input',
  imports: [
    ClickOutsideDirective,
    InputTextModule,
    FormsModule,
    MessageModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
  providers: [WRITEIT_INPUT_VALUE_ACCESSOR],
})
export class WriteItInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder!: string;
  clicked!: boolean;
  _value!: string;
  formGroup!: FormGroup;
  private onChangeCallback: (_: any) => void = () => {};
  constructor(private fb: FormBuilder) {}

  writeValue(obj: any): void {
    this.formGroup.get('value')?.setValue(obj);
    this.formGroup.get('value')?.valueChanges.subscribe((val) => {
      this.onChangeCallback(val);
    });
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      value: new FormControl(''),
    });
    this.clicked = false;
    this._value = '';
  }

  handleClickinside() {
    this.clicked = true;
  }

  handleClickoutside() {
    this.clicked = false;
  }
}
