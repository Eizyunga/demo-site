import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {

  constructor(private router: Router) {
  }

  toLogIn(): void {
    this.router.navigate(['/login']);
  }
}
