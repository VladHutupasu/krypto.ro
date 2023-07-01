import { Component, Input, OnInit } from '@angular/core';
import { NumberSuffixPipe } from '@core/pipes/number-suffix.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalCoinData } from '../../models/global-coin-data.model';

@Component({
  selector: 'app-crypto-info-bar',
  templateUrl: './crypto-info-bar.component.html',
  standalone: true,
  imports: [TranslateModule, NumberSuffixPipe],
})
export class CryptoInfoBarComponent implements OnInit {
  @Input() globalCoinData!: GlobalCoinData;

  readonly skeletonSize = { width: '100px', height: '20px' };

  ngOnInit(): void {
    console.log('[dev] hey', this.globalCoinData);
  }
}
