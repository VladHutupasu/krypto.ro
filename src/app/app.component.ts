import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

declare let gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(translate: TranslateService, private router: Router) {
    translate.setDefaultLang("ro");
    translate.use("ro");

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag("config", "G-VMF56FPCH9", {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  ngOnInit() {
    this.scrollToTopOnRouteChange();
  }

  private scrollToTopOnRouteChange() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
