import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DatabasePageComponent } from './database-page/database-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { CachePageComponent } from './cache-page/cache-page.component';
import { NativeApisPageComponent } from './native-apis-page/native-apis-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutMePageComponent } from './about-me-page/about-me-page.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AnimationComponent } from './database-page/animation/animation.component';
import { DatabaseFormComponent } from './database-page/database-form/database-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DatabasePageComponent,
    NotificationPageComponent,
    CachePageComponent,
    NativeApisPageComponent,
    HomePageComponent,
    AboutMePageComponent,
    AnimationComponent,
    DatabaseFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
