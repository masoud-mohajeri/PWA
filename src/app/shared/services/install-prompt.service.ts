import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstallPromptService {
  promptEvent = new BehaviorSubject<any>(null);

  constructor() {
    // window.addEventListener('beforeinstallprompt', (event: any) => {
    //   event.preventDefault();
    //   this.promptEvent = event;
    //   console.log(this.promptEvent);
    // });
  }

  promptAction() {
    // console.log(this.promptEvent);
    // this.promptEvent.prompt();
    this.promptEvent.subscribe((event: any) => {
      event.prompt();
    });
  }
}
