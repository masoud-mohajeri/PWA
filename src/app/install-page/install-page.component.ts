import { Component, OnInit } from '@angular/core';
import { InstallPromptService } from '../shared/services/install-prompt.service';

@Component({
  selector: 'app-install-page',
  templateUrl: './install-page.component.html',
  styleUrls: ['./install-page.component.scss'],
})
export class InstallPageComponent implements OnInit {
  constructor(private promptService: InstallPromptService) {}

  ngOnInit(): void {}

  onInstallPrompt() {
    this.promptService.promptAction();
  }
}
