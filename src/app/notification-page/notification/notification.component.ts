import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  simpleNotif!: FormGroup;
  SWNotif!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.simpleNotif = new FormGroup({
      notifText: new FormControl('Hi There!', Validators.required),
    });
    this.SWNotif = new FormGroup({
      header: new FormControl('Hi There!', Validators.required),
      body: new FormControl('Hi There!', Validators.required),
      image: new FormControl(true, Validators.required),
      lang: new FormControl('eng', Validators.required),
      vibration: new FormControl(true, Validators.required),
      badge: new FormControl(true, Validators.required),
      actions: new FormControl(true, Validators.required),
    });
  }

  simpleNotifSubmit() {
    Notification.requestPermission((result) => {
      console.log(result);
      if (result === 'granted') {
        new Notification(this.simpleNotif.value.notifText);
      }
    });
  }
  SWNotifSubmit() {
    console.log(this.SWNotif);
    const imgUrl = '../../../assets/images/pwa_article_1.png';
    Notification.requestPermission((result) => {
      // console.log(result);
      if (result === 'granted') {
        const options: any = {
          body: this.SWNotif.value.body,
          icon: this.SWNotif.value.body ? imgUrl : undefined,
          image: this.SWNotif.value.image ? imgUrl : undefined,
          dir: this.SWNotif.value.lang === 'eng' ? 'ltr' : 'rtl',
          lan: this.SWNotif.value.lang === 'eng' ? 'en-US' : 'fas', //pes
          vibration: this.SWNotif.value.vibration ? [100, 100, 100] : undefined,
          badge: this.SWNotif.value.badge ? imgUrl : undefined,
          tag: 'confirm-notification',
          renotify: true,
          actions: this.SWNotif.value.actions
            ? [
                { action: 'git', title: 'Github', icon: imgUrl },
                { action: 'pwa', title: 'PWA', icon: imgUrl },
              ]
            : undefined,
        };
        navigator.serviceWorker.ready.then((swreg) => {
          swreg.showNotification(this.SWNotif.value.header, options);
        });
      }
    });
  }
}
