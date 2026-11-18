import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent, NavItem } from '@honkai-star-rail-db/webkit';

/**
 * Main application component for the Angular app
 */
@Component({
  imports: [ RouterModule, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  /**
   * Title of the application
   */
  protected title = 'honkai-star-rail-db-api';

  /**
   * Navigation links for the application
   */
  navLinks: NavItem[]=[
    {
      label: 'Home',
      link: 'home'
    },
    {
      label: 'Characters',
      link: 'character/list'
    },
    {
      label: 'Light Cones',
      link: 'light-cone/list'
    },
    {
      label: 'Cavern Relics',
      link: 'cavern-relic/list'
    },
    {
      label: 'Planar Ornaments',
      link: 'planar-ornament/list'
    }
  ];
}
