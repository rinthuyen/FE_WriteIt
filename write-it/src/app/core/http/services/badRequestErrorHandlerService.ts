import { Injectable } from "@angular/core";
import { AppBaseErrorHandle } from "../models/errorHandler.model";
import { AppError } from "../../../utils/errors";
import { AppHttpErrorResponse } from "../models/ApiResponse.model";

@Injectable({providedIn:'root'})
export class BadRequestErrorHandler extends AppBaseErrorHandle{
  public  override handle(error:AppHttpErrorResponse): void {
       AppError.handleErrorMessageFormGroup(error.error, this.formGroup);
    }
}