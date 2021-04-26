import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class AudioServiceService {
  private sound: any;
  private volume: number = 0.5;
  constructor() {
    this.sound = new Howl({
      src: ['../../../assets/music/2.mp3', '../../../assets/music/1.mp3'],
    });
  }

  playSond(): void {
    this.sound.play();
  }

  pauseSond(): void {
    this.sound.pause();
  }

  changeVolum(vol: number): void {
    Howler.volume(vol);
  }

  increaceVol() {
    this.volume = this.volume + 0.1;
    if (this.volume > 1) {
      this.volume = 1;
    }
    Howler.volume(this.volume);
    console.log(this.volume);
  }

  decreaceVol() {
    this.volume = this.volume - 0.1;
    if (this.volume < 0) {
      this.volume = 0;
    }
    Howler.volume(this.volume);
    console.log(this.volume);
  }

  seek() {
    this.sound.seek(1, 5);
  }
  rate() {
    this.sound.rate(1.5);
  }

  notification() {
    let windowNavigator = window.navigator as any;
    // if ('mediaSession' in navigator) {

    // windowNavigator.mediaSession.metadata = new MediaMetadata({
    //   title: 'Never Gonna Give You Up',
    //   artist: 'Rick Astley',
    //   album: 'Whenever You Need Somebody',
    // });

    windowNavigator.mediaSession.setActionHandler('play', this.playSond);
    windowNavigator.mediaSession.setActionHandler('pause', this.pauseSond);
    windowNavigator.mediaSession.setActionHandler(
      'seekbackward',
      function () {}
    );
    windowNavigator.mediaSession.setActionHandler(
      'seekforward',
      function () {}
    );
    windowNavigator.mediaSession.setActionHandler(
      'previoustrack',
      function () {}
    );
    windowNavigator.mediaSession.setActionHandler('nexttrack', function () {});
    // }
    navigator.serviceWorker.ready.then((swreg) => {
      swreg.showNotification('sdfsdfsdf');
    });
  }
}
