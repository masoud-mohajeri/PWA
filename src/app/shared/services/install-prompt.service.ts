import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstallPromptService {
  promptEvent = new BehaviorSubject<any>(null);

  constructor() {}

  promptAction() {
    this.promptEvent.subscribe((event: any) => {
      if (!!event) {
        event.prompt();
        console.log(event);
      } else {
        console.log('install event is not available');
      }
    });
  }
}
