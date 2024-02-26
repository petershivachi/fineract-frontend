import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add basic authentication header
    const username = "mifos";
    const password = "password";
    const basicAuthHeader = "Basic " + btoa(username + ":" + password);

    const headers = {
      Authorization: basicAuthHeader,
      "fineract-platform-tenantid": "default",
    };

    request = request.clone({
      setHeaders: headers,
    });
    
    return next.handle(request);
  }

  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   // add authorization header with jwt token if available
  //   let currentUser = this.authenticationService.currentUserValue;
  //   if (currentUser && currentUser.token) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${currentUser.token}`,
  //       },
  //     });
  //   }

  //   return next.handle(request);
  // }
}
