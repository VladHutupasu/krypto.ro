import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/models/language';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {

  selectedLanguage: Language;
  languages: Language[] = [
    {
      id: 'en',
      name: 'English',
      flag: 'en20.png'
    },
    {
      id: 'ro',
      name: 'Română',
      flag: 'ro20.png'
    }
  ]


  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  setLanguage(lang: Language): void {
    this.selectedLanguage = lang;
    this.translate.use(lang.id);
  }
}
