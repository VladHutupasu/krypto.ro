import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export default class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
