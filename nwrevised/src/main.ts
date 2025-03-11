import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { MatSidenavModule } from '@angular/material/sidenav';


bootstrapApplication(AppComponent, 
  {providers:[provideHttpClient(),
    provideRouter(routes),
    MatSidenavModule
  ]}
)
  .catch((err) => console.error(err));
