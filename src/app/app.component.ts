import { Component } from '@angular/core';
import { InstallPromptService } from './shared/services/install-prompt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Database-Comparison';
  theme: 'Amber' | 'Indigo' | 'Pink' | 'Purple' = 'Purple';
  constructor(private promptService: InstallPromptService) {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      const promptEvent = event;
      // console.log(promptEvent);
      this.promptService.promptEvent.next(promptEvent);
    });
  }

  // @HostBinding('class')
  // get themeMode() {
  //   return 'mat-light-theme';
  // }
}
