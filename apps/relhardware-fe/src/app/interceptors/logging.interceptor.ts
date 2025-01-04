import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // Loggare l'URL della richiesta
  console.log('Request URL:', req.url);

  // Loggare anche il metodo HTTP
  console.log('Request Method:', req.method);

  // Passare la richiesta al prossimo handler
  return next(req);
}
