import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withDebugTracing } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorInterceptor } from './app/interceptor/error.interceptor';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, 
  {providers:[
  provideAnimations(),
  provideHttpClient(
    withInterceptors([
      (req, next) => {
        const interceptor = new ErrorInterceptor();
        return interceptor.intercept(req, {
          handle: next
        });
      }
    ])
  ),
  importProvidersFrom(MatSnackBarModule),
    //provideRouter(routes, withDebugTracing()), //see routes in console
    provideRouter(routes), 
    provideAnimationsAsync()
  ]}
)
  .catch((err) => console.error(err));
