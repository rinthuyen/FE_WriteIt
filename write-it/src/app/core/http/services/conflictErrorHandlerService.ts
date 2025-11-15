import { Injectable } from "@angular/core";
import { AppHttpErrorResponse } from "../models/ApiResponse.model";
import { AppBaseErrorHandle } from "../models/errorHandler.model";

@Injectable({providedIn:'root'})
export class ConflictErrorHandler extends AppBaseErrorHandle {
  public override handle(error: AppHttpErrorResponse): void {
            this.appNotify.toastMessage(
              'contrast',
              error.error.message ?? '',
              'Error'
            );
    }
}