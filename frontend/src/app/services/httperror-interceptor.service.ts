import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, retry, retryWhen } from "rxjs/operators";
import { AlertifyService } from "./alertify.service";
import { ErrorCode } from '../enums/enums';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private alertify: AlertifyService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log("HTTP Request started");
    return next.handle(req)
    .pipe(
      retryWhen(error => this.retryRequest(error, 10)),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        console.log(error);
        this.alertify.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  //Retry the request in case of error
  retryRequest(error: Observable<unknown>, retryCount: number) : Observable<unknown> {
    return error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {
        if(count <= retryCount) {
          switch(checkErr.status) {
            case ErrorCode.serverDown :
            return of(checkErr);
            case ErrorCode.unauthorized:
              return of(checkErr);
          }
        }

        return throwError(checkErr);
      })
    )
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = "Unknown error occurred";
    if(error.error instanceof ErrorEvent) {
      //Client side error
      errorMessage = error.error.message;
    } else {
      //Server side error
      if (error.status !== 0) {
      errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }

}
