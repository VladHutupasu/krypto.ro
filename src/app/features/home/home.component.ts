import { Component, OnInit } from '@angular/core';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { CryptoInfoBarComponent } from './components/crypto-info-bar/crypto-info-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CryptoInfoBarComponent, CoinsTableComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
