import { ProviderToken } from "@angular/core";
import { AppBaseErrorHandle } from "../../core/http/models/errorHandler.model";
import { ERROR_CODE } from "../../core/http/models/statusCode.model";
import { UnAuthorizeErrorHandler } from "../../core/http/services/unAuthorizeErrorHandlerService";
import { ConflictErrorHandler } from "../../core/http/services/conflictErrorHandlerService";
import { BadRequestErrorHandler } from "../../core/http/services/badRequestErrorHandlerService";

export const ErrorHandlerCodeMapConstant: Record<ERROR_CODE, ProviderToken<AppBaseErrorHandle>> = {
    [ERROR_CODE.UN_AUTHORIZE]: UnAuthorizeErrorHandler,
    [ERROR_CODE.CONFLICT]: ConflictErrorHandler,
    [ERROR_CODE.BAD_REQUEST]: BadRequestErrorHandler
}