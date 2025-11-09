import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'write-it-print-error',
  imports: [MessageModule,CommonModule],
  templateUrl: './print-error-component.html',
  styleUrl: './print-error-component.scss'
})
export class PrintErrorComponent {
   @Input("control") control:any;
   
}
