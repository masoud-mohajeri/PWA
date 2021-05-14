import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMePageComponent } from './about-me-page/about-me-page.component';
import { CachePageComponent } from './cache-page/cache-page.component';
import { DatabasePageComponent } from './database-page/database-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InstallPageComponent } from './install-page/install-page.component';
import { NativeApisPageComponent } from './native-apis-page/native-apis-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { RegisterSwComponent } from './register-sw/register-sw.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'web-worker', component: DatabasePageComponent },
  { path: 'notification', component: NotificationPageComponent },
  { path: 'cache', component: CachePageComponent },
  { path: 'about-me', component: AboutMePageComponent },
  { path: 'native-features', component: NativeApisPageComponent },
  { path: 'install', component: InstallPageComponent },
  { path: 'angular', component: RegisterSwComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
