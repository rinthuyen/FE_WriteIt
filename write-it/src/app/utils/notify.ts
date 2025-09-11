import { MessageService } from "primeng/api";

export class AppNotify{
    constructor(private messageService: MessageService,
){
}

   public toastMessage(severity: string, message: string, typeToast: string) {
    this.messageService.add({ severity: severity, summary: typeToast, detail: message });
  }
}