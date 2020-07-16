import { Component, OnInit, ViewChild } from '@angular/core';
import { CryptoApiService } from 'src/app/services/crypto-api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss']
})
export class CoinsTableComponent implements OnInit {

  title = 'Top 100 criptomonezi';
  displayedColumns: string[] = ['market_cap_rank', 'name', 'market_cap', 'current_price', 'total_volume', 'circulating_supply', 'price_change_percentage_24h', 'sparkline7d'];
  dataSource = new MatTableDataSource();
  dataSourceEmpty = new Array(100);
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private cryptoAPI: CryptoApiService) { }

  ngOnInit(): void {
    this.cryptoAPI.getTop100().subscribe(coins => {
      console.log(coins);
      this.dataSource.data = coins;
      this.dataSource.sort = this.sort;
    });
  }
}
