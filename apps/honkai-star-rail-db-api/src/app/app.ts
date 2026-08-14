import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent, NavItem } from '@honkai-star-rail-db/webkit';
@Component({
  imports: [ RouterModule, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'honkai-star-rail-db-api';

  navLinks: NavItem[]=[
    {
      label: 'Characters',
      link: 'character/list'
    },
    {
      label: 'Light Cones',
      link: 'light-cone/list'
    }
  ];
}
