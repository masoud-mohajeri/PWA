import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstallPageComponent } from './install-page/install-page.component';
import { NotificationComponent } from './notification-page/notification/notification.component';
import { RouterModule } from '@angular/router';
import { RegisterSwComponent } from './register-sw/register-sw.component';

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
    InstallPageComponent,
    NotificationComponent,
    RegisterSwComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('sw.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: location.search.includes('sw=true') }),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
