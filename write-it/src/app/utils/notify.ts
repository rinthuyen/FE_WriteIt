import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class AppNotify {
  constructor(private messageService: MessageService) {}
  public toastMessage(severity: string, message: string, typeToast: string) {
    this.messageService.add({
      severity: severity,
      summary: typeToast,
      detail: message,
    });
  }
}
