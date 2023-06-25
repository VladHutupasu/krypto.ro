import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    standalone: true,
})
export class FooterComponent implements OnInit {
  currentAppVersion = environment.appVersion;

  constructor() {}

  ngOnInit(): void {}
}
