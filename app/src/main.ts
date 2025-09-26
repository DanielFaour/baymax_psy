import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http'; // Provides HttpClient
import { FormsModule } from '@angular/forms'; // For ngModel, *ngIf etc.

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(),
    FormsModule
  ]
})
  .catch((err) => console.error(err));
